const SCOPE_SCHEMA = "static-collective/awareness-scope/v0";
const WORLD_CUT_SCHEMA = "static-collective/world-cut/v0";
const FRESHNESS = new Set(["fresh", "stale", "unverified"]);
const ERRORS = Object.freeze({
  SCOPE_INVALID: "AWARENESS_SCOPE_INVALID",
  COMPARISON_INVALID: "AWARENESS_COMPARISON_INVALID",
  GITHUB_READ_FAILED: "AWARENESS_GITHUB_READ_FAILED",
  STATUS_INVALID: "AWARENESS_PROJECT_STATUS_INVALID",
  OUTPUT_EXISTS: "AWARENESS_OUTPUT_EXISTS",
});
const NON_AUTHORITY = "observation only; does not mutate, merge, release, promote, admit, refuse, or supersede project-owned authority";
module.exports = { SCOPE_SCHEMA, WORLD_CUT_SCHEMA, FRESHNESS, ERRORS, NON_AUTHORITY };
