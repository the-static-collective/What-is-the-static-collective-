# Awareness Organ v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a one-shot, read-only Awareness tool that compares declared project-status witnesses with exact current source cuts, preserves human-gate observations without dispositioning them, and emits deterministic machine-readable + human-readable World Cut artifacts with integrity receipts.

**Architecture:** Implement Awareness as a neutral sibling under `tools/awareness/`, not inside Human Witness Relay and not inside any project repository. The pure core validates declared source scopes, applies Projection Freshness Witness semantics (`fresh | stale | unverified`), and builds immutable World Cut values; a thin GitHub adapter performs read-only `gh api` GETs for exact default-branch heads and `PROJECT_STATUS.json`. The CLI runs once, optionally accepts explicit human-gate observations as evidence input, writes only to an explicitly named local output directory, and never mutates GitHub, GitBook, project manifests, gates, merges, releases, or promotions.

**Tech Stack:** Node.js 22+, CommonJS, built-in `node:test`, `node:assert`, `node:crypto`, `node:child_process`, `node:fs`, `node:path`; GitHub CLI `gh` for live read-only collection; no runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-08-20-awareness-organ-v0.1-design.md`

## Global Constraints

- Awareness senses the relationship between a witness and its declared source; it does not govern the source.
- Freshness is always relative to a declared source scope.
- `fresh` requires a trustworthy exact comparison inside that scope.
- Missing, failed, malformed, or unavailable comparison becomes `unverified`, never `fresh`.
- Activity outside the declared source scope cannot freshen or stale the projection.
- Stale witness remains truthful history; Awareness never rewrites the source projection to make it current.
- Awareness may record `landed`, `candidate`, `projected`, `witnessed`, `human-gated`, and `fog` observations only when supplied or evidenced at the cut; it does not invent a global ontology from them.
- Human-gate observation is evidence input only. Awareness never closes, admits, refuses, merges, releases, or otherwise dispositions a gate.
- World Cuts are immutable outputs. A later run creates a later cut; it never overwrites an earlier preserved cut.
- No daemon, hidden polling loop, global database, master narrator, universal event bus, telemetry stream, automatic documentation fixer, or central authority service.
- No third-party Node package for v0.1.
- Live GitHub access is GET-only through `gh api`; the adapter must not accept arbitrary method flags or mutation endpoints.
- The default CLI behavior writes JSON to stdout only. Local files are written only when `--out-dir <directory>` is explicitly supplied.
- The tool does not edit `PROJECT_STATUS.json`, `project-state.md`, GitBook content, or `evidence/world-cuts/` by itself. Preservation into the repository remains an explicit human/agent Git operation after review.

---

## File Structure

- `tools/awareness/constants.cjs` — schema names, allowed freshness dispositions, stable errors, non-authority text.
- `tools/awareness/scope.cjs` — pure validation/normalization of declared source scopes.
- `tools/awareness/freshness.cjs` — pure Projection Freshness Witness comparison.
- `tools/awareness/canonical.cjs` — stable recursive object-key canonicalization and SHA-256 helpers.
- `tools/awareness/world-cut.cjs` — deterministic World Cut construction and artifact integrity.
- `tools/awareness/render.cjs` — deterministic Markdown projection of a World Cut.
- `tools/awareness/github.cjs` — read-only GitHub CLI adapter with injectable request function for tests.
- `tools/awareness/audit.cjs` — orchestration from declared scope + optional gate observations into one World Cut.
- `tools/awareness/cli.cjs` — one-shot CLI; stdout by default; explicit local output directory optional.
- `tools/awareness/scopes/constitutional-core-v0.json` — declared five-project `PROJECT_STATUS` mesh: Project0, TranchNode, Corpus OS, Full Measure, Founder Node.
- `tools/awareness/fixtures/comparison-matrix.json` — deterministic fresh/stale/unverified + out-of-scope negative-control fixture.
- `tools/awareness/fixtures/human-gates.json` — synthetic human-gate evidence proving visibility without authority.
- `tests/awareness-freshness.test.cjs` — scope and freshness semantics.
- `tests/awareness-world-cut.test.cjs` — determinism, immutability, rendering, integrity.
- `tests/awareness-github.test.cjs` — GET-only collection, `PROJECT_STATUS` extraction, failure-to-fog behavior.
- `tests/awareness-cli.test.cjs` — one-shot process behavior, stdout/output-dir boundary, no mutation verbs.

Human Witness Relay remains unchanged. Awareness may later consume relay-produced evidence, but v0.1 does not import or modify `tools/human-witness-relay/*`.

---

### Task 1: Define and falsify scoped freshness

**Files:**
- Create: `tools/awareness/constants.cjs`
- Create: `tools/awareness/scope.cjs`
- Create: `tools/awareness/freshness.cjs`
- Create: `tools/awareness/fixtures/comparison-matrix.json`
- Create: `tests/awareness-freshness.test.cjs`

**Interfaces:**
- Produces `SCOPE_SCHEMA = "static-collective/awareness-scope/v0"`.
- Produces `FRESHNESS = new Set(["fresh", "stale", "unverified"])`.
- Produces `validateAwarenessScope(input)` returning `{ ok: true, scope }` or `{ ok: false, errors: [{ code, path }] }`.
- Produces `compareProjectionFreshness(input)` returning one normalized comparison record.

The comparison input shape is exactly:

```js
{
  projectionId: "project0-project-status",
  canonicalSource: "the-static-collective/project0",
  sourceScope: "main",
  witnessedSourceCut: "61811dafc63fdef264aa8cbfa91cb2ecfe443476",
  comparedSourceCut: "498de6f5201ddabe3287a1e26a0fb9a7d46da628",
  checkedAt: "2026-08-20T22:00:00Z",
  comparisonOk: true,
  evidenceRefs: ["PROJECT_STATUS.json", "github:default-branch-head"],
}
```

The result preserves those fields and adds `disposition` and `nonAuthority`.

- [ ] **Step 1: Write the failing freshness tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  compareProjectionFreshness,
} = require("../tools/awareness/freshness.cjs");

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
  const result = compareProjectionFreshness({
    ...base,
    comparedSourceCut: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
  });
  assert.equal(result.disposition, "stale");
});

test("failed comparison cannot collapse to fresh", () => {
  const result = compareProjectionFreshness({
    ...base,
    comparisonOk: false,
    comparedSourceCut: null,
  });
  assert.equal(result.disposition, "unverified");
});

test("unrelated newer activity is not an input to scoped freshness", () => {
  const result = compareProjectionFreshness({
    ...base,
    unrelatedNewerCut: "ffffffffffffffffffffffffffffffffffffffff",
  });
  assert.equal(result.disposition, "fresh");
  assert.equal(Object.hasOwn(result, "unrelatedNewerCut"), false);
});
```

Also test malformed repository name, blank `sourceScope`, malformed 40-char lowercase SHA when a cut is present, non-ISO `checkedAt`, and duplicate projection IDs in one scope.

- [ ] **Step 2: Run RED**

```bash
node --test tests/awareness-freshness.test.cjs
```

Expected: FAIL because the Awareness modules do not exist.

- [ ] **Step 3: Implement constants and scope validation**

`constants.cjs` exports exactly:

```js
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
```

`scope.cjs` accepts only an object with this floor:

```js
{
  schema: "static-collective/awareness-scope/v0",
  id: "constitutional-core-v0",
  projections: [
    {
      id: "project0-project-status",
      kind: "project-status-v1",
      repository: "the-static-collective/project0",
      sourceScope: "main",
      statusPath: "PROJECT_STATUS.json"
    }
  ]
}
```

Do not add wildcard repository discovery in v0.1.

- [ ] **Step 4: Implement the freshness function**

Core logic must be structurally equivalent to:

```js
function compareProjectionFreshness(input) {
  if (!input.comparisonOk || !input.comparedSourceCut) {
    return normalized(input, "unverified");
  }
  return normalized(
    input,
    input.witnessedSourceCut === input.comparedSourceCut ? "fresh" : "stale",
  );
}
```

`normalized()` copies only the approved fields and adds `nonAuthority`; it must not copy arbitrary extra fields such as unrelated activity.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/awareness-freshness.test.cjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/awareness/constants.cjs tools/awareness/scope.cjs tools/awareness/freshness.cjs tools/awareness/fixtures/comparison-matrix.json tests/awareness-freshness.test.cjs
git commit -m "feat: compare awareness freshness by declared scope"
```

---

### Task 2: Build immutable World Cut values and integrity artifacts

**Files:**
- Create: `tools/awareness/canonical.cjs`
- Create: `tools/awareness/world-cut.cjs`
- Create: `tools/awareness/render.cjs`
- Create: `tools/awareness/fixtures/human-gates.json`
- Create: `tests/awareness-world-cut.test.cjs`

**Interfaces:**
- Produces `canonicalJson(value): string` with recursively sorted object keys and preserved array order.
- Produces `sha256(text): string` as 64 lowercase hex.
- Produces `createWorldCut(input): object`.
- Produces `renderWorldCutMarkdown(worldCut): string`.
- Produces `buildWorldCutArtifacts(worldCut): { json, markdown, receipt }`.

`createWorldCut(input)` accepts:

```js
{
  observedAt: "2026-08-20T22:30:00Z",
  observer: { kind: "tool", name: "awareness-v0.1" },
  scope: { id: "constitutional-core-v0" },
  repositories: [],
  projections: [],
  humanGates: [],
  observations: [],
  fog: [],
}
```

It returns:

```js
{
  schema: "static-collective/world-cut/v0",
  worldCutId: "wcv0_<64hex>",
  observedAt,
  observer,
  scope,
  repositories,
  projections,
  humanGates,
  observations,
  fog,
  nonAuthority: "...",
  integrity: { bodySha256: "<64hex>" },
}
```

`bodySha256` and `worldCutId` are computed from the canonical body **before** `worldCutId` and `integrity` are inserted, preventing circular hashing.

- [ ] **Step 1: Write failing deterministic World Cut tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  createWorldCut,
  buildWorldCutArtifacts,
} = require("../tools/awareness/world-cut.cjs");

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

test("same semantic body yields same World Cut identity", () => {
  const a = createWorldCut(specimen());
  const b = createWorldCut(specimen());
  assert.equal(a.worldCutId, b.worldCutId);
  assert.match(a.worldCutId, /^wcv0_[a-f0-9]{64}$/);
});

test("human gate remains visible without project disposition", () => {
  const cut = createWorldCut(specimen());
  assert.equal(cut.humanGates[0].disposition, "human-gated");
  assert.equal(cut.humanGates[0].projectDisposition, "not-attempted");
  assert.doesNotMatch(JSON.stringify(cut), /satisfied|merge approved|release approved/i);
});

test("artifact receipt hashes final JSON and markdown independently", () => {
  const artifacts = buildWorldCutArtifacts(createWorldCut(specimen()));
  assert.match(artifacts.receipt.jsonSha256, /^[a-f0-9]{64}$/);
  assert.match(artifacts.receipt.markdownSha256, /^[a-f0-9]{64}$/);
  assert.notEqual(artifacts.receipt.jsonSha256, artifacts.receipt.markdownSha256);
});
```

Also prove object insertion-order independence, array-order sensitivity, and that changing `observedAt` creates a different World Cut identity.

- [ ] **Step 2: Run RED**

```bash
node --test tests/awareness-world-cut.test.cjs
```

Expected: FAIL because modules are absent.

- [ ] **Step 3: Implement canonicalization and World Cut construction**

Use `node:crypto` SHA-256. Freeze the returned top-level object and its direct arrays with `Object.freeze`; do not mutate input arrays.

- [ ] **Step 4: Implement deterministic Markdown rendering**

The renderer must include, in this order:

```text
# Ecosystem World Cut
World Cut ID
Observed at
Observer
Scope
Non-authority
## Repository heads
## Projection freshness
## Human-held gates
## Other observations
## Fog
## Integrity
```

Empty sections render `- none observed at this cut` rather than disappearing.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/awareness-world-cut.test.cjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/awareness/canonical.cjs tools/awareness/world-cut.cjs tools/awareness/render.cjs tools/awareness/fixtures/human-gates.json tests/awareness-world-cut.test.cjs
git commit -m "feat: build immutable awareness world cuts"
```

---

### Task 3: Add the read-only GitHub collector for the five-project status mesh

**Files:**
- Create: `tools/awareness/github.cjs`
- Create: `tools/awareness/scopes/constitutional-core-v0.json`
- Create: `tests/awareness-github.test.cjs`

**Interfaces:**
- Produces `ghGetJson(apiPath, options = {}): object`.
- Produces `readProjectStatusProjection(entry, client): Promise|object` as synchronous code is acceptable if the whole adapter remains deterministic per request set.
- Produces `collectProjectionComparisons(scope, { requestJson, checkedAt }): { repositories, projections, fog }`.

The committed scope file contains exactly these five entries:

```json
{
  "schema": "static-collective/awareness-scope/v0",
  "id": "constitutional-core-v0",
  "projections": [
    {"id":"project0-project-status","kind":"project-status-v1","repository":"the-static-collective/project0","sourceScope":"main","statusPath":"PROJECT_STATUS.json"},
    {"id":"tranchnode-project-status","kind":"project-status-v1","repository":"the-static-collective/tranchnode","sourceScope":"main","statusPath":"PROJECT_STATUS.json"},
    {"id":"corpus-os-project-status","kind":"project-status-v1","repository":"the-static-collective/corpus-os","sourceScope":"main","statusPath":"PROJECT_STATUS.json"},
    {"id":"full-measure-project-status","kind":"project-status-v1","repository":"the-static-collective/full-measure-world-layer","sourceScope":"main","statusPath":"PROJECT_STATUS.json"},
    {"id":"founder-node-project-status","kind":"project-status-v1","repository":"the-static-collective/founder-node","sourceScope":"main","statusPath":"PROJECT_STATUS.json"}
  ]
}
```

For each entry the collector performs only:

```text
GET /repos/{owner}/{repo}
GET /repos/{owner}/{repo}/commits/{default_branch}
GET /repos/{owner}/{repo}/contents/PROJECT_STATUS.json?ref={default_branch}
```

It extracts `observedMainCommit` only when `schema === "static-collective.project-status.v1"`, `repository` matches the scope entry, and `defaultBranch` matches the GitHub repository default branch.

- [ ] **Step 1: Write failing adapter tests with an injected fake client**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  collectProjectionComparisons,
} = require("../tools/awareness/github.cjs");

function fakeClient(table) {
  return (path) => {
    if (!(path in table)) throw Object.assign(new Error("missing fixture"), { code: "fixture-miss" });
    return table[path];
  };
}

test("project status compares observedMainCommit to exact default branch head", () => {
  const scope = {
    schema: "static-collective/awareness-scope/v0",
    id: "fixture",
    projections: [{
      id: "project0",
      kind: "project-status-v1",
      repository: "the-static-collective/project0",
      sourceScope: "main",
      statusPath: "PROJECT_STATUS.json",
    }],
  };
  const result = collectProjectionComparisons(scope, {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient({
      "/repos/the-static-collective/project0": { default_branch: "main" },
      "/repos/the-static-collective/project0/commits/main": { sha: "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb" },
      "/repos/the-static-collective/project0/contents/PROJECT_STATUS.json?ref=main": {
        content: Buffer.from(JSON.stringify({
          schema: "static-collective.project-status.v1",
          repository: "the-static-collective/project0",
          defaultBranch: "main",
          observedMainCommit: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        })).toString("base64"),
        encoding: "base64",
      },
    }),
  });
  assert.equal(result.projections[0].disposition, "stale");
});
```

Add tests proving:
- matching head => `fresh`;
- failed commit lookup => `unverified` + fog entry;
- malformed/mismatched `PROJECT_STATUS` => `unverified`, never throw away the whole World Cut;
- a fake unrelated branch with a newer SHA is never queried and cannot change the result;
- request adapter never receives POST/PATCH/PUT/DELETE semantics.

- [ ] **Step 2: Run RED**

```bash
node --test tests/awareness-github.test.cjs
```

Expected: FAIL because `github.cjs` is absent.

- [ ] **Step 3: Implement `ghGetJson` as GET-only**

Use:

```js
spawnSync("gh", ["api", apiPath], { encoding: "utf8" })
```

Do not accept caller-provided `-X`, `--method`, `-f`, `-F`, GraphQL mutation text, or arbitrary extra CLI flags. A non-zero process result throws `AWARENESS_GITHUB_READ_FAILED` containing endpoint + exit status only; do not echo authentication output or environment values.

- [ ] **Step 4: Implement tolerant collection**

Each projection is isolated. If one source fails, append a `fog` record:

```js
{
  source: "the-static-collective/project0#main",
  code: "AWARENESS_GITHUB_READ_FAILED",
  note: "current comparison unavailable",
}
```

and return that projection as `unverified`. Continue with the remaining declared sources.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/awareness-github.test.cjs
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/awareness/github.cjs tools/awareness/scopes/constitutional-core-v0.json tests/awareness-github.test.cjs
git commit -m "feat: collect read-only project status cuts"
```

---

### Task 4: Compose the one-shot audit and CLI without acquiring hands

**Files:**
- Create: `tools/awareness/audit.cjs`
- Create: `tools/awareness/cli.cjs`
- Create: `tests/awareness-cli.test.cjs`

**Interfaces:**
- Produces `runAwarenessAudit({ scope, observedAt, gateObservations, requestJson }): worldCut`.
- CLI usage:

```bash
node tools/awareness/cli.cjs \
  --scope tools/awareness/scopes/constitutional-core-v0.json \
  [--gates path/to/human-gates.json] \
  [--observed-at 2026-08-20T23:00:00Z] \
  [--out-dir /tmp/world-cut-002]
```

Without `--out-dir`, stdout is one JSON object:

```js
{
  worldCut,
  artifacts: {
    jsonSha256,
    markdownSha256,
    receiptSha256,
  }
}
```

With `--out-dir`, create exactly three new files:

```text
world-cut.json
world-cut.md
integrity.json
```

If any target already exists, exit `2` with `AWARENESS_OUTPUT_EXISTS`; never overwrite.

- [ ] **Step 1: Write failing orchestration/CLI tests**

Use `spawnSync(process.execPath, [cli, ...])` and a fixture mode exposed only as `--fixture <path>` so tests need no network.

Prove:
- a fixture run exits `0` and contains fresh, stale, and unverified projections;
- a synthetic human gate remains `human-gated` with `projectDisposition: "not-attempted"`;
- stdout mode creates no files;
- explicit output directory creates exactly three files;
- rerunning into the same directory exits `2` instead of overwriting;
- CLI source contains no mutation subcommands such as `gh pr merge`, `gh issue close`, `git push`, `git commit`, or GitBook write calls;
- no interval/timer/watch option exists.

- [ ] **Step 2: Run RED**

```bash
node --test tests/awareness-cli.test.cjs
```

Expected: FAIL because orchestration and CLI are absent.

- [ ] **Step 3: Implement audit composition**

`runAwarenessAudit` performs:

```text
validate scope
→ collect repository heads + project-status comparisons
→ validate/copy optional human-gate observations
→ create World Cut
→ return World Cut
```

Gate observation input floor:

```js
{
  schema: "static-collective/awareness-human-gates/v0",
  gates: [{
    gateId: "autodiscography-vault/one-real-wav",
    subject: "the-static-collective/autodiscography-vault#9",
    disposition: "human-gated",
    projectDisposition: "not-attempted",
    evidenceRefs: ["https://github.com/the-static-collective/autodiscography-vault/pull/9"]
  }]
}
```

Only `human-gated` + `not-attempted` are accepted by this v0.1 input lane. Any attempt to submit `satisfied`, `admitted`, `merge-approved`, or equivalent fails validation; Awareness is not a project disposition surface.

- [ ] **Step 4: Implement CLI output boundary**

`--observed-at` is optional in normal use and defaults to `new Date().toISOString()`. Tests always pass it explicitly for determinism. `--fixture` supplies a complete collector result and is rejected if combined with live GitHub-only options that would blur evidence provenance.

- [ ] **Step 5: Run focused + full tests**

```bash
node --test tests/awareness-*.test.cjs
node --test tests/*.test.cjs
```

Expected: all Awareness tests pass; existing Human Witness Relay tests remain green.

- [ ] **Step 6: Commit**

```bash
git add tools/awareness/audit.cjs tools/awareness/cli.cjs tests/awareness-cli.test.cjs
git commit -m "feat: add one-shot awareness world cut CLI"
```

---

### Task 5: Produce World Cut 002 as the executable proving specimen

**Files:**
- Create after the live run: `evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.json`
- Create after the live run: `evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.md`
- Create after the live run: `evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.integrity.json`
- Modify: `evidence/world-cuts/README.md`

**Interfaces:**
- Consumes the exact CLI from Task 4.
- Produces the first deterministic post-Atlas World Cut without editing World Cut 001.

- [ ] **Step 1: Re-read the intended human gate before including it**

Use Autodiscography Vault PR #9 as the preferred founding real gate because World Cut 001 identified it as explicitly human-held. Verify its current PR body/state and exact head. If the project no longer declares the one-real-WAV human gate, do **not** preserve it as current; instead run without that gate and add a fog note that the formerly observed gate changed since World Cut 001.

The gate observation file used for the live run must contain only evidence established by that fresh read and must retain `projectDisposition: "not-attempted"`.

- [ ] **Step 2: Run the live five-project cut into a temporary directory**

```bash
rm -rf /tmp/awareness-world-cut-002
node tools/awareness/cli.cjs \
  --scope tools/awareness/scopes/constitutional-core-v0.json \
  --gates /tmp/awareness-world-cut-002-gates.json \
  --out-dir /tmp/awareness-world-cut-002
```

If no current gate file is justified, omit `--gates`.

Expected: exit `0`; three artifacts created; zero source mutations.

- [ ] **Step 3: Verify promotion-gate evidence without forcing the result**

Inspect the generated cut and record the actual result:

```bash
node - <<'NODE'
const fs = require('node:fs');
const cut = JSON.parse(fs.readFileSync('/tmp/awareness-world-cut-002/world-cut.json', 'utf8'));
const dispositions = new Set(cut.projections.map((x) => x.disposition));
console.log(JSON.stringify({
  worldCutId: cut.worldCutId,
  dispositions: [...dispositions].sort(),
  humanGates: cut.humanGates.length,
  fog: cut.fog.length,
}, null, 2));
NODE
```

Required for **Awareness promotion**, not merely implementation completion:
- at least one `fresh` projection;
- at least one `stale` or `unverified` projection;
- at least one real human-held gate, if still project-declared.

If the live world does not naturally provide those specimens, preserve the honest cut anyway and leave the corresponding promotion gate open. Do not manipulate source state to manufacture the matrix.

- [ ] **Step 4: Verify artifact integrity**

Recompute SHA-256 from disk and compare every value to `integrity.json`:

```bash
sha256sum \
  /tmp/awareness-world-cut-002/world-cut.json \
  /tmp/awareness-world-cut-002/world-cut.md
```

Use a tiny Node command on Windows if `sha256sum` is unavailable. Any mismatch blocks preservation.

- [ ] **Step 5: Copy, never overwrite, into evidence**

Copy the three verified files to the exact `evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.*` paths. Abort if any destination already exists.

Update `evidence/world-cuts/README.md` with the World Cut ID, observed time, byte lengths, SHA-256 values, scope ID, and the sentence:

> **World Cut 002 was produced by the deterministic Awareness v0.1 observer; its currentness findings belong to that cut and do not amend World Cut 001.**

- [ ] **Step 6: Run full regression tests after preservation-only changes**

```bash
node --test tests/*.test.cjs
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.json evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.md evidence/world-cuts/2026-08-20-awareness-v0.1-world-cut-002.integrity.json evidence/world-cuts/README.md
git commit -m "evidence: preserve Awareness World Cut 002"
```

---

### Task 6: Review boundaries, project GitBook, and stop before landing

**Files:**
- Modify only if implementation evidence requires wording correction: `docs/superpowers/specs/2026-08-20-awareness-organ-v0.1-design.md`
- Update existing GitBook change request #116 after GitHub branch content is stable.

**Interfaces:**
- Consumes the completed code, tests, and World Cut 002 evidence.
- Produces review-ready GitHub/GitBook projections; does not merge either surface.

- [ ] **Step 1: Self-review against every spec promotion gate**

Record a matrix in PR #26 conversation or body with each gate as `met` or `open`, evidence-linked. Implementation completion does not imply promotion. In particular, do not mark the human-gate or fresh/stale specimen gate met unless World Cut 002 actually contains them.

- [ ] **Step 2: Run Riqor from the real repository checkout**

```bash
riqor run start --goal "Verify Awareness v0.1 stays read-only, scoped, fail-closed, and non-authoritative while producing deterministic World Cuts" --path evidence-loop --profile assured
node --test tests/awareness-*.test.cjs
node --test tests/*.test.cjs
riqor run status --json
riqor run complete --json
```

If Riqor is unavailable in the execution environment, report it as an environmental limitation; do not synthesize a pass.

- [ ] **Step 3: Request focused code review**

Review focus:

```text
1. Can any failed comparison become fresh?
2. Can unrelated source activity affect a declared scope?
3. Can any code path mutate GitHub/GitBook/project state?
4. Can the human-gate input acquire project disposition authority?
5. Can a previous World Cut be overwritten by normal CLI use?
6. Are output hashes deterministic and independently verifiable?
```

Fix every valid in-scope finding and rerun the full test suite after the final mutation.

- [ ] **Step 4: Update GitBook CR #116 as projection only**

Add a child page or update the Awareness page with:
- exact GitHub PR/head;
- World Cut 002 ID and integrity refs;
- actual promotion-gate matrix;
- explicit statement that GitBook remains projection, not source authority.

Do not paste a second editable copy of either World Cut artifact into GitBook.

- [ ] **Step 5: Stop at verified ready-to-land**

PR #26 and GitBook CR #116 remain unmerged. PR Completion must bind any later landing approval to the then-current exact head SHA. A prior architectural approval does not authorize merge of the implementation head.

---

## Self-Review Checklist

- Spec coverage: one-shot observer, exact source cuts, project-status freshness, human-gate visibility, machine + Markdown outputs, integrity, immutable later cuts, no authority, no daemon, no source mutation, failure-to-unverified, and out-of-scope negative control all have explicit tasks/tests.
- Scope boundary: v0.1 is intentionally the five-project `PROJECT_STATUS` mesh, not all 59 repositories. Whole-account inventory remains a Work/Atlas-scale traversal until a separately approved scope expansion proves useful.
- Human Witness Relay boundary: no relay file is modified; gate evidence composes through data only.
- No placeholder behavior: live uncertainty is handled by fail-closed rules (`unverified`/`fog`) rather than invented facts.
- Type/name consistency: `validateAwarenessScope`, `compareProjectionFreshness`, `createWorldCut`, `buildWorldCutArtifacts`, `collectProjectionComparisons`, and `runAwarenessAudit` retain the same names through all tasks.
- Historical integrity: World Cut 001 is never modified by implementation or test setup.
