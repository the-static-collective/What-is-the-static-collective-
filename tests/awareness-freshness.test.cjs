const test = require("node:test");
const assert = require("node:assert/strict");
const { compareProjectionFreshness } = require("../tools/awareness/freshness.cjs");
const { validateAwarenessScope } = require("../tools/awareness/scope.cjs");

const base = {
  projectionId: "fixture",
  canonicalSource: "the-static-collective/project0",
  sourceScope: "main",
  witnessedSourceCut: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  comparedSourceCut: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  checkedAt: "2026-08-20T22:00:00Z",
  comparisonOk: true,
  evidenceRefs: [],
};

test("matching exact cuts are fresh inside one declared scope", () => {
  assert.equal(compareProjectionFreshness(base).disposition, "fresh");
});

test("different exact cuts are stale inside one declared scope", () => {
  const result = compareProjectionFreshness({ ...base, comparedSourceCut: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" });
  assert.equal(result.disposition, "stale");
});

test("failed comparison cannot collapse to fresh", () => {
  const result = compareProjectionFreshness({ ...base, comparisonOk: false, comparedSourceCut: null });
  assert.equal(result.disposition, "unverified");
});

test("unrelated newer activity is not an input to scoped freshness", () => {
  const result = compareProjectionFreshness({ ...base, unrelatedNewerCut: "ffffffffffffffffffffffffffffffffffffffff" });
  assert.equal(result.disposition, "fresh");
  assert.equal(Object.hasOwn(result, "unrelatedNewerCut"), false);
});

test("comparison result preserves only approved fields plus disposition and nonAuthority", () => {
  const result = compareProjectionFreshness({ ...base, arbitrary: "do-not-copy" });
  assert.deepEqual(Object.keys(result).sort(), [
    "canonicalSource", "checkedAt", "comparedSourceCut", "comparisonOk", "disposition",
    "evidenceRefs", "nonAuthority", "projectionId", "sourceScope", "witnessedSourceCut",
  ].sort());
});

test("malformed comparison repository fails closed", () => {
  assert.throws(
    () => compareProjectionFreshness({ ...base, canonicalSource: "project0" }),
    (error) => error.code === "AWARENESS_COMPARISON_INVALID",
  );
});

test("blank sourceScope fails closed", () => {
  assert.throws(
    () => compareProjectionFreshness({ ...base, sourceScope: "  " }),
    (error) => error.code === "AWARENESS_COMPARISON_INVALID",
  );
});

test("malformed source cut degrades comparison to unverified", () => {
  const result = compareProjectionFreshness({ ...base, witnessedSourceCut: "ABC123" });
  assert.equal(result.disposition, "unverified");
  assert.equal(result.witnessedSourceCut, null);
});

test("non-ISO checkedAt fails closed", () => {
  assert.throws(
    () => compareProjectionFreshness({ ...base, checkedAt: "yesterday-ish" }),
    (error) => error.code === "AWARENESS_COMPARISON_INVALID",
  );
});

test("valid awareness scope is normalized", () => {
  const result = validateAwarenessScope({
    schema: "static-collective/awareness-scope/v0",
    id: "constitutional-core-v0",
    projections: [{
      id: "project0-project-status",
      kind: "project-status-v1",
      repository: "the-static-collective/project0",
      sourceScope: "main",
      statusPath: "PROJECT_STATUS.json",
    }],
  });
  assert.equal(result.ok, true);
  assert.equal(result.scope.projections[0].repository, "the-static-collective/project0");
});

test("duplicate projection IDs in one scope are rejected", () => {
  const entry = {
    id: "same",
    kind: "project-status-v1",
    repository: "the-static-collective/project0",
    sourceScope: "main",
    statusPath: "PROJECT_STATUS.json",
  };
  const result = validateAwarenessScope({
    schema: "static-collective/awareness-scope/v0",
    id: "fixture",
    projections: [entry, { ...entry, repository: "the-static-collective/tranchnode" }],
  });
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.path === "projections[1].id"));
});
