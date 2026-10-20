const { ERRORS, NON_AUTHORITY } = require("./constants.cjs");
const { validateAwarenessScope } = require("./scope.cjs");
const { compareProjectionFreshness } = require("./freshness.cjs");
const { collectProjectionComparisons } = require("./github.cjs");
const { createWorldCut } = require("./world-cut.cjs");

const SHA_RE = /^[a-f0-9]{40}$/;
const GATE_SCHEMA = "static-collective/awareness-human-gates/v0";

function inputError(path) {
  const error = new Error("Awareness input is invalid");
  error.code = ERRORS.SCOPE_INVALID;
  error.path = path;
  return error;
}

function isIsoInstant(value) {
  return typeof value === "string" && Number.isFinite(Date.parse(value)) && /(?:Z|[+-]\d{2}:\d{2})$/.test(value);
}

function validateGateObservations(input) {
  if (input == null) return [];
  if (!input || typeof input !== "object" || input.schema !== GATE_SCHEMA || !Array.isArray(input.gates)) {
    throw inputError("gateObservations");
  }
  return input.gates.map((gate, index) => {
    const path = `gateObservations.gates[${index}]`;
    if (!gate || typeof gate !== "object") throw inputError(path);
    if (typeof gate.gateId !== "string" || !gate.gateId.trim()) throw inputError(`${path}.gateId`);
    if (typeof gate.subject !== "string" || !gate.subject.trim()) throw inputError(`${path}.subject`);
    if (gate.disposition !== "human-gated") throw inputError(`${path}.disposition`);
    if (gate.projectDisposition !== "not-attempted") throw inputError(`${path}.projectDisposition`);
    if (!Array.isArray(gate.evidenceRefs) || gate.evidenceRefs.some((ref) => typeof ref !== "string")) throw inputError(`${path}.evidenceRefs`);
    return {
      gateId: gate.gateId,
      subject: gate.subject,
      disposition: "human-gated",
      projectDisposition: "not-attempted",
      evidenceRefs: [...gate.evidenceRefs],
      nonAuthority: NON_AUTHORITY,
    };
  });
}

function normalizeCollectorResult(scope, collectorResult, checkedAt) {
  const raw = collectorResult && typeof collectorResult === "object" ? collectorResult : {};
  const declared = new Map(scope.projections.map((entry) => [entry.id, entry]));
  const rawProjections = Array.isArray(raw.projections) ? raw.projections : [];
  const byId = new Map(rawProjections.map((projection) => [projection?.projectionId, projection]));
  const missingFog = [];
  const projections = scope.projections.map((entry) => {
    const projection = byId.get(entry.id);
    if (!projection || projection.canonicalSource !== entry.repository || projection.sourceScope !== entry.sourceScope) {
      missingFog.push({
        source: `${entry.repository}#${entry.sourceScope}`,
        code: ERRORS.GITHUB_READ_FAILED,
        note: "collector projection unavailable",
      });
      return compareProjectionFreshness({
        projectionId: entry.id,
        canonicalSource: entry.repository,
        sourceScope: entry.sourceScope,
        witnessedSourceCut: null,
        comparedSourceCut: null,
        checkedAt,
        comparisonOk: false,
        evidenceRefs: [],
      });
    }
    return compareProjectionFreshness({
      projectionId: entry.id,
      canonicalSource: entry.repository,
      sourceScope: entry.sourceScope,
      witnessedSourceCut: projection.witnessedSourceCut ?? null,
      comparedSourceCut: projection.comparedSourceCut ?? null,
      checkedAt,
      comparisonOk: projection.comparisonOk === true,
      evidenceRefs: Array.isArray(projection.evidenceRefs) ? projection.evidenceRefs.filter((ref) => typeof ref === "string") : [],
    });
  });

  const repositories = (Array.isArray(raw.repositories) ? raw.repositories : [])
    .filter((entry) => entry && [...declared.values()].some((decl) => decl.repository === entry.repository))
    .map((entry) => ({
      repository: entry.repository,
      defaultBranch: typeof entry.defaultBranch === "string" ? entry.defaultBranch : null,
      headSha: SHA_RE.test(entry.headSha ?? "") ? entry.headSha : null,
    }));

  const fog = [
    ...(Array.isArray(raw.fog) ? raw.fog : []).map((entry) => ({
      source: typeof entry?.source === "string" ? entry.source : "unknown",
      code: typeof entry?.code === "string" ? entry.code : "AWARENESS_FOG",
      note: typeof entry?.note === "string" ? entry.note : "unresolved",
    })),
    ...missingFog,
  ];

  return { repositories, projections, fog };
}

function runAwarenessAudit({ scope: scopeInput, observedAt, gateObservations = null, requestJson, collectorResult } = {}) {
  if (!isIsoInstant(observedAt)) throw inputError("observedAt");
  const validation = validateAwarenessScope(scopeInput);
  if (!validation.ok) {
    const error = inputError("scope");
    error.errors = validation.errors;
    throw error;
  }
  const scope = validation.scope;
  const collected = collectorResult
    ? normalizeCollectorResult(scope, collectorResult, observedAt)
    : collectProjectionComparisons(scope, { requestJson, checkedAt: observedAt });
  const humanGates = validateGateObservations(gateObservations);
  return createWorldCut({
    observedAt,
    observer: { kind: "tool", name: "awareness-v0.1" },
    scope: { id: scope.id },
    repositories: collected.repositories,
    projections: collected.projections,
    humanGates,
    observations: [],
    fog: collected.fog,
  });
}

module.exports = { runAwarenessAudit, validateGateObservations, normalizeCollectorResult };
