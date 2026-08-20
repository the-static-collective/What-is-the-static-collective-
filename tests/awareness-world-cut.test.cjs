const test = require("node:test");
const assert = require("node:assert/strict");
const { canonicalJson, sha256 } = require("../tools/awareness/canonical.cjs");
const {
  createWorldCut,
  buildWorldCutArtifacts,
} = require("../tools/awareness/world-cut.cjs");
const { renderWorldCutMarkdown } = require("../tools/awareness/render.cjs");

function specimen() {
  return {
    observedAt: "2026-08-20T22:30:00Z",
    observer: { kind: "tool", name: "awareness-v0.1" },
    scope: { id: "fixture" },
    repositories: [],
    projections: [],
    humanGates: [{
      gateId: "fixture/human-gate",
      subject: "fixture",
      disposition: "human-gated",
      evidenceRefs: ["fixture:evidence"],
      projectDisposition: "not-attempted",
    }],
    observations: [],
    fog: [],
  };
}

test("canonical JSON ignores object insertion order and preserves array order", () => {
  assert.equal(canonicalJson({ b: 2, a: 1 }), canonicalJson({ a: 1, b: 2 }));
  assert.notEqual(canonicalJson({ a: [1, 2] }), canonicalJson({ a: [2, 1] }));
});

test("sha256 returns lowercase hex", () => {
  assert.match(sha256("hello"), /^[a-f0-9]{64}$/);
});

test("same semantic body yields same World Cut identity", () => {
  const a = createWorldCut(specimen());
  const b = createWorldCut(specimen());
  assert.equal(a.worldCutId, b.worldCutId);
  assert.match(a.worldCutId, /^wcv0_[a-f0-9]{64}$/);
});

test("object insertion order does not change World Cut identity", () => {
  const a = specimen();
  const b = {
    fog: a.fog,
    observations: a.observations,
    humanGates: a.humanGates,
    projections: a.projections,
    repositories: a.repositories,
    scope: { id: "fixture" },
    observer: { name: "awareness-v0.1", kind: "tool" },
    observedAt: a.observedAt,
  };
  assert.equal(createWorldCut(a).worldCutId, createWorldCut(b).worldCutId);
});

test("array order remains identity-sensitive", () => {
  const a = specimen();
  a.observations = [{ id: "a" }, { id: "b" }];
  const b = specimen();
  b.observations = [{ id: "b" }, { id: "a" }];
  assert.notEqual(createWorldCut(a).worldCutId, createWorldCut(b).worldCutId);
});

test("changing observedAt creates a different World Cut identity", () => {
  const a = specimen();
  const b = specimen();
  b.observedAt = "2026-08-20T22:31:00Z";
  assert.notEqual(createWorldCut(a).worldCutId, createWorldCut(b).worldCutId);
});

test("human gate remains visible without project disposition authority", () => {
  const cut = createWorldCut(specimen());
  assert.equal(cut.humanGates[0].disposition, "human-gated");
  assert.equal(cut.humanGates[0].projectDisposition, "not-attempted");
  assert.doesNotMatch(JSON.stringify(cut), /satisfied|merge approved|release approved/i);
});

test("World Cut construction does not mutate caller arrays and freezes direct arrays", () => {
  const input = specimen();
  const originalGate = input.humanGates[0];
  const cut = createWorldCut(input);
  assert.notEqual(cut.humanGates, input.humanGates);
  assert.equal(input.humanGates[0], originalGate);
  assert.equal(Object.isFrozen(cut), true);
  for (const key of ["repositories", "projections", "humanGates", "observations", "fog"]) {
    assert.equal(Object.isFrozen(cut[key]), true, key);
  }
});

test("artifact receipt hashes final JSON and markdown independently", () => {
  const artifacts = buildWorldCutArtifacts(createWorldCut(specimen()));
  assert.match(artifacts.receipt.jsonSha256, /^[a-f0-9]{64}$/);
  assert.match(artifacts.receipt.markdownSha256, /^[a-f0-9]{64}$/);
  assert.match(artifacts.receipt.receiptSha256, /^[a-f0-9]{64}$/);
  assert.notEqual(artifacts.receipt.jsonSha256, artifacts.receipt.markdownSha256);
  assert.equal(artifacts.receipt.jsonSha256, sha256(artifacts.json));
  assert.equal(artifacts.receipt.markdownSha256, sha256(artifacts.markdown));
});

test("markdown renders required sections in stable order including empty sections", () => {
  const markdown = renderWorldCutMarkdown(createWorldCut({ ...specimen(), humanGates: [] }));
  const headings = [
    "# Ecosystem World Cut",
    "## Repository heads",
    "## Projection freshness",
    "## Human-held gates",
    "## Other observations",
    "## Fog",
    "## Integrity",
  ];
  let last = -1;
  for (const heading of headings) {
    const index = markdown.indexOf(heading);
    assert.ok(index > last, `${heading} should appear in order`);
    last = index;
  }
  assert.match(markdown, /World Cut ID:/);
  assert.match(markdown, /Observed at:/);
  assert.match(markdown, /Observer:/);
  assert.match(markdown, /Scope:/);
  assert.match(markdown, /Non-authority:/);
  assert.ok((markdown.match(/- none observed at this cut/g) || []).length >= 5);
});

test("markdown is insertion-order independent for object observations", () => {
  const a = specimen();
  a.observations = [{ b: 2, a: 1 }];
  const b = specimen();
  b.observations = [{ a: 1, b: 2 }];
  const cutA = createWorldCut(a);
  const cutB = createWorldCut(b);
  assert.equal(cutA.worldCutId, cutB.worldCutId);
  assert.equal(renderWorldCutMarkdown(cutA), renderWorldCutMarkdown(cutB));
});
