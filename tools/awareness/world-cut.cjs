const { WORLD_CUT_SCHEMA, NON_AUTHORITY } = require("./constants.cjs");
const { canonicalJson, sha256 } = require("./canonical.cjs");
const { renderWorldCutMarkdown } = require("./render.cjs");

function copyValue(value) {
  if (Array.isArray(value)) return value.map(copyValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, nested]) => [key, copyValue(nested)]));
  }
  return value;
}

function freezeDirectArrays(value) {
  for (const key of ["repositories", "projections", "humanGates", "observations", "fog"]) {
    Object.freeze(value[key]);
  }
  return Object.freeze(value);
}

function createWorldCut(input) {
  const body = {
    schema: WORLD_CUT_SCHEMA,
    observedAt: input.observedAt,
    observer: copyValue(input.observer),
    scope: copyValue(input.scope),
    repositories: copyValue(input.repositories ?? []),
    projections: copyValue(input.projections ?? []),
    humanGates: copyValue(input.humanGates ?? []),
    observations: copyValue(input.observations ?? []),
    fog: copyValue(input.fog ?? []),
    nonAuthority: NON_AUTHORITY,
  };
  const bodySha256 = sha256(canonicalJson(body));
  return freezeDirectArrays({
    ...body,
    worldCutId: `wcv0_${bodySha256}`,
    integrity: Object.freeze({ bodySha256 }),
  });
}

function buildWorldCutArtifacts(worldCut) {
  const json = `${JSON.stringify(worldCut, null, 2)}\n`;
  const markdown = renderWorldCutMarkdown(worldCut);
  const receiptBody = {
    schema: "static-collective/world-cut-integrity/v0",
    worldCutId: worldCut.worldCutId,
    bodySha256: worldCut.integrity.bodySha256,
    jsonSha256: sha256(json),
    markdownSha256: sha256(markdown),
  };
  const receipt = Object.freeze({
    ...receiptBody,
    receiptSha256: sha256(canonicalJson(receiptBody)),
  });
  return { json, markdown, receipt };
}

module.exports = { createWorldCut, buildWorldCutArtifacts };
