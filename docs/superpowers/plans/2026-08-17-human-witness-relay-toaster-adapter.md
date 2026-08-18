# Human Witness Relay v0 — Haunted Toaster Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a neutral relay adapter that converts Haunted Toaster PR #146 human field observations into exact-head, specimen-specific GitHub evidence packets without modifying the under-test Toaster branch or deciding that its field gate is closed.

**Architecture:** The adapter lives with the neutral relay tooling in `What-is-the-static-collective-`. It recognizes only the three declared PR #146 specimen gate IDs, renders a project-native Markdown evidence packet, and emits an advisory next-door proposal only when project admission is explicitly supplied from project-owned evidence. The adapter never edits Haunted Toaster, never changes candidate/render state, and never substitutes browser proof for the packaged Electron witness required by Toaster operating law.

**Tech Stack:** Node.js 22+, CommonJS, built-in `node:test`; neutral relay core from `2026-08-17-human-witness-relay-core.md`.

**Spec:** `docs/superpowers/specs/2026-08-17-human-witness-relay-v0-design.md`

## Global Constraints

- Baseline witness target is Haunted Toaster PR #146 head `944169c7f7bbd821f51fa8e404302cbaa8f4a342`; execution must re-read the PR before live use and refuse stale-head routing if the head has moved.
- The adapter is not added to `the-haunted-toaster`; doing so before the witness would invalidate exact-head identity.
- The three required specimens remain independent evidence: `quiet-spacious`, `dense-mastered-distorted`, `linear-positive-control`.
- Human observation text is preserved verbatim.
- Human `pass` means only that the observer classified that specimen as pass; it does not mark PR #146 ready to merge.
- Existing Toaster law remains intact: packaged Electron proof is required for packaged/native behavior; production renderer is UI authority; accepted candidates are not regenerated merely to chase taste.
- The adapter cannot merge, release, tag, rebuild, regenerate, or mutate candidate state.
- No new GitHub credential handling is added to relay code. Posting the emitted packet is a separate connected-tool action.

---

## File Structure

- `tools/human-witness-relay/adapters/toaster.cjs` — gate recognition, specimen parsing, packet rendering.
- `tests/human-witness-relay-toaster.test.cjs` — exact-head, specimen, observation-preservation, stale-head, and gate-closure boundary tests.
- `tools/human-witness-relay/fixtures/toaster-quiet-pass.json` — synthetic-shaped adapter fixture using the real declared gate identity but `SYNTHETIC:` observation.
- `tools/human-witness-relay/fixtures/toaster-dense-fail.json` — fail fixture.
- `tools/human-witness-relay/fixtures/toaster-linear-ambiguous.json` — ambiguous fixture.

---

### Task 1: Define exact Toaster gate recognition

**Files:**
- Create: `tools/human-witness-relay/adapters/toaster.cjs`
- Create: `tests/human-witness-relay-toaster.test.cjs`

**Interfaces:**
- Produces: `TOASTER_REPOSITORY`, `TOASTER_PR`, `TOASTER_SPECIMENS`, `isToasterWitnessEvent(event)`, `toasterSpecimenFor(event)`.
- Recognized gate IDs are exactly:
  - `elastic-topology-response-v1-field-witness/quiet-spacious`
  - `elastic-topology-response-v1-field-witness/dense-mastered-distorted`
  - `elastic-topology-response-v1-field-witness/linear-positive-control`

- [ ] **Step 1: Write failing recognition tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  isToasterWitnessEvent,
  toasterSpecimenFor,
} = require("../tools/human-witness-relay/adapters/toaster.cjs");

function event(gateId) {
  return {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/the-haunted-toaster",
      pullRequest: 146,
      headSha: "944169c7f7bbd821f51fa8e404302cbaa8f4a342",
      gateId,
      artifactRefs: ["artifact:windows-portable"],
      buildRefs: ["workflow:32057926247"],
    },
    witness: {
      observedAt: "2026-08-17T22:00:00-05:00",
      observerRef: "human:local-owner",
      observation: "SYNTHETIC: specimen observation",
      disposition: "pass",
    },
    evidenceRefs: [],
    provenance: { captureSurface: "chat", relayPolicy: "human-witness-relay-v0" },
  };
}

test("recognizes only the three declared PR 146 specimens", () => {
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/quiet-spacious")), true);
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/unknown")), false);
});

test("extracts the declared specimen identity", () => {
  assert.equal(
    toasterSpecimenFor(event("elastic-topology-response-v1-field-witness/dense-mastered-distorted")),
    "dense-mastered-distorted",
  );
});
```

- [ ] **Step 2: Run and verify RED**

```bash
node --test tests/human-witness-relay-toaster.test.cjs
```

Expected: FAIL because adapter module does not exist.

- [ ] **Step 3: Implement strict recognition**

Reject wrong repository, wrong PR number, and any gate ID outside the three constants. Do not accept prefixes or fuzzy aliases.

- [ ] **Step 4: Verify GREEN**

Run the focused test; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/toaster.cjs tests/human-witness-relay-toaster.test.cjs
git commit -m "feat: recognize Toaster field witness specimens"
```

---

### Task 2: Render project-native evidence without closing the gate

**Files:**
- Modify: `tools/human-witness-relay/adapters/toaster.cjs`
- Modify: `tests/human-witness-relay-toaster.test.cjs`

**Interfaces:**
- Produces: `renderToasterEvidencePacket(event)` returning:

```js
{
  destination: {
    kind: "github-pr-comment",
    repository: "the-static-collective/the-haunted-toaster",
    pullRequest: 146,
  },
  markdown,
  projectDisposition: "pending-project-admission",
  nextDoor: null,
}
```

- [ ] **Step 1: Write failing packet tests**

Prove the rendered Markdown contains:
- exact head SHA;
- exact specimen identity;
- human disposition;
- exact observation text;
- artifact/build/evidence refs when present;
- explicit statement `Project gate disposition: pending project admission`.

Also prove it does **not** contain `merge approved`, `gate closed`, `release`, or a fabricated project disposition.

Example assertion:

```js
test("renders witness as evidence, not authority", () => {
  const packet = renderToasterEvidencePacket(event("elastic-topology-response-v1-field-witness/quiet-spacious"));
  assert.match(packet.markdown, /944169c7f7bbd821f51fa8e404302cbaa8f4a342/);
  assert.match(packet.markdown, /SYNTHETIC: specimen observation/);
  assert.match(packet.markdown, /pending project admission/i);
  assert.doesNotMatch(packet.markdown, /gate closed|merge approved/i);
  assert.equal(packet.projectDisposition, "pending-project-admission");
  assert.equal(packet.nextDoor, null);
});
```

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because renderer is absent.

- [ ] **Step 3: Implement Markdown renderer**

Use a stable section shape:

```markdown
### Human Witness Relay v0 — packaged field specimen

- Event: `<event id supplied by core>`
- Exact head: `<sha>`
- Specimen: `<specimen>`
- Human disposition: `<pass|fail|ambiguous>`
- Observed at: `<timestamp>`
- Build refs: ...
- Artifact refs: ...
- Evidence refs: ...

**Human observation (verbatim)**

> ...

Project gate disposition: **pending project admission**.
This witness does not itself authorize merge, release, regeneration, or gate closure.
```

The adapter function itself need not know event ID; allow a second optional `context.eventId` argument or let the core inject it before final rendering. Pick one interface and keep it consistent in all tests.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/toaster.cjs tests/human-witness-relay-toaster.test.cjs
git commit -m "feat: render Toaster witness evidence packets"
```

---

### Task 3: Enforce exact-head freshness at live routing time

**Files:**
- Modify: `tools/human-witness-relay/adapters/toaster.cjs`
- Modify: `tests/human-witness-relay-toaster.test.cjs`

**Interfaces:**
- Produces: `assertToasterHeadFresh(event, currentHeadSha)`.
- Returns `true` only for equality; otherwise throws an error with `code = "WITNESS_HEAD_STALE"` and fields `witnessHeadSha`, `currentHeadSha`.

- [ ] **Step 1: Write failing stale-head tests**

```js
test("a witness for head A cannot route as current evidence for head B", () => {
  const eventA = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  assert.throws(
    () => assertToasterHeadFresh(eventA, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"),
    (error) => error.code === "WITNESS_HEAD_STALE",
  );
});
```

Also prove stale error text does not include the human observation.

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because freshness function is absent.

- [ ] **Step 3: Implement equality-only freshness**

No ancestor/rebase heuristic is allowed. Historical witness remains valid for its historical head, but live routing against the PR must fail closed when current head differs.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/toaster.cjs tests/human-witness-relay-toaster.test.cjs
git commit -m "feat: enforce Toaster witness head freshness"
```

---

### Task 4: Add three disposition fixtures and adapter registration

**Files:**
- Create: `tools/human-witness-relay/fixtures/toaster-quiet-pass.json`
- Create: `tools/human-witness-relay/fixtures/toaster-dense-fail.json`
- Create: `tools/human-witness-relay/fixtures/toaster-linear-ambiguous.json`
- Modify: `tools/human-witness-relay/index.cjs`
- Modify: `tests/human-witness-relay-toaster.test.cjs`

**Interfaces:**
- Core registry gains the three exact Toaster adapter keys.
- Each fixture observation begins `SYNTHETIC:` and therefore cannot be mistaken for real field proof.

- [ ] **Step 1: Write failing fixture + routing tests**

Prove each fixture:
- validates through core;
- resolves to Toaster adapter;
- renders its exact disposition without changing `projectDisposition` from pending;
- retains exact PR #146 head in the packet;
- emits no `nextDoor` before project admission.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/human-witness-relay-core.test.cjs tests/human-witness-relay-toaster.test.cjs
```

Expected: FAIL because fixtures/registration are absent.

- [ ] **Step 3: Add fixtures and exact registry entries**

Use no wildcard routing. Register all three keys explicitly.

- [ ] **Step 4: Run full adapter verification**

```bash
node --test tests/human-witness-relay-core.test.cjs tests/human-witness-relay-toaster.test.cjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/index.cjs tools/human-witness-relay/fixtures/toaster-*.json tests/human-witness-relay-toaster.test.cjs
git commit -m "test: prove Toaster witness relay adapter"
```

---

## Live Toaster Founding Specimen Procedure

This procedure occurs only after the adapter implementation is green.

1. Re-read Haunted Toaster PR #146 and record its current head SHA.
2. If current head is not the head of the packaged artifact actually being tested, stop with stale/missing identity; do not route as gate-satisfying evidence.
3. Human tests the packaged Windows artifact for one of the three specimen lanes.
4. Capture the human's natural-language observation once.
5. Normalize it into `HumanWitnessEventV0`, preserving the original text exactly.
6. Run core + Toaster adapter to produce the GitHub PR comment packet.
7. Post that emitted packet to PR #146 using the connected GitHub tool; the relay code itself remains credential-free.
8. Re-read PR #146 project evidence. Only a project-owned explicit admission may change the project gate state.
9. If admitted and all required project criteria are satisfied, hand the exact current PR head to PR Completion for a new readiness determination.
10. PR Completion still requires explicit per-PR landing confirmation bound to the exact head before any merge.

## Toaster Adapter Completion Gate

Report:
- relay implementation commit SHA;
- Toaster adapter test result;
- current PR #146 head at proof time;
- confirmation Toaster repository received no code changes from the relay implementation;
- exact emitted packet for each synthetic disposition;
- whether a real packaged witness has been routed yet;
- if real: URL/reference to the project-owned PR evidence comment and remaining project-local uncertainty.