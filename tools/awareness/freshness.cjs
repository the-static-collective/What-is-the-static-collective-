const { ERRORS, NON_AUTHORITY } = require("./constants.cjs");

const REPOSITORY_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;
const SHA_RE = /^[a-f0-9]{40}$/;

function invalidComparison(path) {
  const err = new Error("Awareness comparison is invalid");
  err.code = ERRORS.COMPARISON_INVALID;
  err.path = path;
  return err;
}

function isIsoInstant(value) {
  if (typeof value !== "string" || !value.trim()) return false;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) && /(?:Z|[+-]\d{2}:\d{2})$/.test(value);
}

function validateInput(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) throw invalidComparison("");
  if (typeof input.projectionId !== "string" || !input.projectionId.trim()) throw invalidComparison("projectionId");
  if (typeof input.canonicalSource !== "string" || !REPOSITORY_RE.test(input.canonicalSource)) throw invalidComparison("canonicalSource");
  if (typeof input.sourceScope !== "string" || !input.sourceScope.trim()) throw invalidComparison("sourceScope");
  if (!isIsoInstant(input.checkedAt)) throw invalidComparison("checkedAt");
  if (typeof input.comparisonOk !== "boolean") throw invalidComparison("comparisonOk");
  if (!Array.isArray(input.evidenceRefs) || input.evidenceRefs.some((ref) => typeof ref !== "string")) throw invalidComparison("evidenceRefs");
}

function normalized(input, disposition) {
  return {
    projectionId: input.projectionId,
    canonicalSource: input.canonicalSource,
    sourceScope: input.sourceScope,
    witnessedSourceCut: SHA_RE.test(input.witnessedSourceCut ?? "") ? input.witnessedSourceCut : null,
    comparedSourceCut: SHA_RE.test(input.comparedSourceCut ?? "") ? input.comparedSourceCut : null,
    checkedAt: input.checkedAt,
    comparisonOk: input.comparisonOk,
    evidenceRefs: [...input.evidenceRefs],
    disposition,
    nonAuthority: NON_AUTHORITY,
  };
}

function compareProjectionFreshness(input) {
  validateInput(input);
  const witnessedValid = SHA_RE.test(input.witnessedSourceCut ?? "");
  const comparedValid = SHA_RE.test(input.comparedSourceCut ?? "");
  if (!input.comparisonOk || !witnessedValid || !comparedValid) {
    return normalized(input, "unverified");
  }
  return normalized(input, input.witnessedSourceCut === input.comparedSourceCut ? "fresh" : "stale");
}

module.exports = { compareProjectionFreshness };
