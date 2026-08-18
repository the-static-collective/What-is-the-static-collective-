# Human Witness Relay v0 — Autodiscography Vault Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a neutral relay adapter that converts the one-real-WAV human preservation witness for Autodiscography Vault PR #9 into exact-head project evidence without changing the Vault branch, leaking session material, or treating a browser download alone as successful preservation.

**Architecture:** The adapter lives beside the neutral relay core in `What-is-the-static-collective-`. It recognizes only the PR #9 one-real-WAV gate, requires stable provider-track/run references plus receipt/hash evidence references, and renders a project-native evidence packet that keeps human observation separate from machine admission evidence. The adapter never touches Chrome credentials, provider URLs, local browser storage, or the Vault implementation branch.

**Tech Stack:** Node.js 22+, CommonJS, built-in `node:test`; neutral relay core from `2026-08-17-human-witness-relay-core.md`.

**Spec:** `docs/superpowers/specs/2026-08-17-human-witness-relay-v0-design.md`

## Global Constraints

- Baseline target is Autodiscography Vault PR #9 head `0232ddf0e59e1b8148538a3c97b3527a76a8d008`; live use must re-read PR #9 and fail closed if its current head differs from the artifact/extension state witnessed.
- PR #9 remains draft until its existing mandatory human WAV gate is satisfied by project-owned evidence.
- The relay implementation must not be added to the Vault branch before the witness, because moving the head would invalidate the exact witness target.
- A successful browser Download → WAV action is not successful preservation by itself.
- Human observation and machine verification remain distinct.
- Required machine evidence still belongs to Vault: WAV container sanity, final SHA-256, byte length, durable destination, durable journal, and no-session-material boundary.
- The relay must never persist exact signed URL/query/fragment, referrer, cookie, authorization header, token, reusable session material, or browser storage.
- Provider track identity is represented as a stable reference `provider-track:<id>` in `evidenceRefs`; run identity, when available, is `run:<id>`.
- Final machine proof references use stable refs such as `receipt:<path-or-id>`, `sha256:<64hex>`, `bytes:<integer>`, and `vault-artifact:<stable-relative-ref>`; private absolute paths are not required.
- No 25-track/full-corpus transport, stems, endpoint reconstruction, hidden download automation, or new browser authority is introduced.

---

## File Structure

- `tools/human-witness-relay/adapters/vault.cjs` — gate recognition, stable-ref parsing, evidence completeness reporting, packet rendering.
- `tests/human-witness-relay-vault.test.cjs` — exact-head, stable-reference, secret-exclusion, human/machine distinction, and pending-admission tests.
- `tools/human-witness-relay/fixtures/vault-wav-pass.json` — synthetic pass fixture with all required stable evidence reference kinds.
- `tools/human-witness-relay/fixtures/vault-wav-fail.json` — fail fixture.
- `tools/human-witness-relay/fixtures/vault-wav-ambiguous.json` — ambiguous fixture with intentionally incomplete machine refs.

---

### Task 1: Define exact Vault gate recognition and stable evidence refs

**Files:**
- Create: `tools/human-witness-relay/adapters/vault.cjs`
- Create: `tests/human-witness-relay-vault.test.cjs`

**Interfaces:**
- Produces: `VAULT_REPOSITORY`, `VAULT_PR`, `VAULT_GATE_ID`, `isVaultWitnessEvent(event)`, `parseVaultEvidenceRefs(event)`.
- `VAULT_GATE_ID = "phase-b2c-one-real-wav-preservation"`.
- `parseVaultEvidenceRefs(event)` returns:

```js
{
  providerTrackId: string | null,
  runId: string | null,
  receiptRef: string | null,
  sha256: string | null,
  byteLength: number | null,
  vaultArtifactRef: string | null,
}
```

- [ ] **Step 1: Write failing recognition/ref tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const {
  isVaultWitnessEvent,
  parseVaultEvidenceRefs,
} = require("../tools/human-witness-relay/adapters/vault.cjs");

function event(overrides = {}) {
  return {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/autodiscography-vault",
      pullRequest: 9,
      headSha: "0232ddf0e59e1b8148538a3c97b3527a76a8d008",
      gateId: "phase-b2c-one-real-wav-preservation",
      artifactRefs: ["vault-artifact:audio/song.wav"],
      buildRefs: [],
    },
    witness: {
      observedAt: "2026-08-17T22:00:00-05:00",
      observerRef: "human:local-owner",
      observation: "SYNTHETIC: WAV landed and the receipt matched the independent check",
      disposition: "pass",
    },
    evidenceRefs: [
      "provider-track:track-123",
      "run:run-456",
      "receipt:receipts/run-456.audio_wav.json",
      `sha256:${"a".repeat(64)}`,
      "bytes:123456",
      "vault-artifact:audio/song.wav",
    ],
    provenance: { captureSurface: "chat", relayPolicy: "human-witness-relay-v0" },
    ...overrides,
  };
}

test("recognizes only Vault PR 9 one-real-WAV gate", () => {
  assert.equal(isVaultWitnessEvent(event()), true);
  const wrong = event();
  wrong.subject.gateId = "full-corpus-wav";
  assert.equal(isVaultWitnessEvent(wrong), false);
});

test("parses stable Vault evidence refs without provider URLs", () => {
  const refs = parseVaultEvidenceRefs(event());
  assert.equal(refs.providerTrackId, "track-123");
  assert.equal(refs.runId, "run-456");
  assert.equal(refs.byteLength, 123456);
  assert.match(refs.sha256, /^[a-f0-9]{64}$/);
});
```

- [ ] **Step 2: Verify RED**

```bash
node --test tests/human-witness-relay-vault.test.cjs
```

Expected: FAIL because adapter module does not exist.

- [ ] **Step 3: Implement strict recognition and ref parsing**

Reject duplicate singleton refs of the same kind as ambiguous rather than silently picking one. Ignore unrelated evidence refs only if they are non-secret and stable. Do not parse or accept provider `http://` or `https://` URLs as track identity.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/vault.cjs tests/human-witness-relay-vault.test.cjs
git commit -m "feat: recognize Vault one-WAV witness evidence"
```

---

### Task 2: Report machine-evidence completeness without manufacturing success

**Files:**
- Modify: `tools/human-witness-relay/adapters/vault.cjs`
- Modify: `tests/human-witness-relay-vault.test.cjs`

**Interfaces:**
- Produces: `vaultMachineEvidenceStatus(event)` returning:

```js
{
  complete: boolean,
  present: string[],
  missing: string[],
}
```

Required stable evidence kinds for `complete: true` are provider track, receipt, SHA-256, byte length, and Vault artifact reference. Run ID is optional because the approved design says "where available".

Important: `complete: true` means only that the relay has references to the required project evidence classes. It does not prove those references are truthful or that Vault admission succeeded.

- [ ] **Step 1: Write failing completeness tests**

```js
test("complete refs still do not become project success", () => {
  const status = vaultMachineEvidenceStatus(event());
  assert.equal(status.complete, true);
});

test("browser success without receipt/hash/destination remains incomplete", () => {
  const incomplete = event();
  incomplete.evidenceRefs = ["provider-track:track-123", "run:run-456"];
  incomplete.subject.artifactRefs = [];
  const status = vaultMachineEvidenceStatus(incomplete);
  assert.equal(status.complete, false);
  assert.deepEqual(status.missing.sort(), ["byteLength", "receiptRef", "sha256", "vaultArtifactRef"].sort());
});
```

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because status function is absent.

- [ ] **Step 3: Implement evidence-class completeness only**

Do not open files, hash artifacts, inspect WAV bytes, or access the browser in the relay. Those checks remain Vault's authority and must be cited via stable evidence refs.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/vault.cjs tests/human-witness-relay-vault.test.cjs
git commit -m "feat: report Vault witness evidence completeness"
```

---

### Task 3: Render the Vault project evidence packet

**Files:**
- Modify: `tools/human-witness-relay/adapters/vault.cjs`
- Modify: `tests/human-witness-relay-vault.test.cjs`

**Interfaces:**
- Produces: `renderVaultEvidencePacket(event, { eventId })` returning:

```js
{
  destination: {
    kind: "github-pr-comment",
    repository: "the-static-collective/autodiscography-vault",
    pullRequest: 9,
  },
  markdown,
  projectDisposition: "pending-project-admission",
  machineEvidence,
  nextDoor: null,
}
```

- `eventId` is required and is supplied by core after deterministic identity generation. The adapter does not recompute identity.

- [ ] **Step 1: Write failing packet tests**

Prove Markdown contains:
- deterministic event ID supplied by core;
- exact PR head;
- provider track stable ID;
- run ID when present;
- human disposition;
- exact human observation text;
- a machine-evidence section listing present/missing evidence classes;
- receipt/hash/byte-length/artifact refs when present;
- explicit statement that browser download alone is insufficient;
- `Project gate disposition: pending project admission`.

Prove it does not contain `gate closed`, `merge approved`, signed provider URLs, authorization/cookie/token/session material, or a claim that WAV sanity/hash equality was performed by the relay.

Example assertion:

```js
test("renders Vault evidence without manufacturing project admission", () => {
  const packet = renderVaultEvidencePacket(event(), { eventId: `hwv0_${"b".repeat(64)}` });
  assert.match(packet.markdown, /hwv0_b{64}/);
  assert.match(packet.markdown, /0232ddf0e59e1b8148538a3c97b3527a76a8d008/);
  assert.match(packet.markdown, /provider track:.*track-123/i);
  assert.match(packet.markdown, /SYNTHETIC: WAV landed/);
  assert.match(packet.markdown, /pending project admission/i);
  assert.doesNotMatch(packet.markdown, /gate closed|merge approved/i);
  assert.equal(packet.projectDisposition, "pending-project-admission");
  assert.equal(packet.nextDoor, null);
});
```

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because renderer is absent.

- [ ] **Step 3: Implement stable Markdown rendering**

Use exactly this semantic section shape:

```markdown
### Human Witness Relay v0 — one-real-WAV preservation specimen

- Event: `<event id>`
- Exact head: `<sha>`
- Provider track: `<stable id>`
- Run: `<stable id or not supplied>`
- Human disposition: `<pass|fail|ambiguous>`
- Observed at: `<timestamp>`

**Human observation (verbatim)**

> ...

**Machine evidence references**

- receipt: ...
- sha256: ...
- byte length: ...
- vault artifact: ...
- evidence class coverage: complete|incomplete
- missing classes: ...

Browser download completion alone does not establish successful Vault preservation.
Project gate disposition: **pending project admission**.
This relay packet does not itself verify WAV container sanity, hash equality, byte length, durable destination, or journal safety and does not authorize merge or wider transport.
```

Reject a missing or malformed `eventId` instead of emitting an unattributed packet.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/vault.cjs tests/human-witness-relay-vault.test.cjs
git commit -m "feat: render Vault witness evidence packets"
```

---

### Task 4: Enforce exact-head freshness

**Files:**
- Modify: `tools/human-witness-relay/adapters/vault.cjs`
- Modify: `tests/human-witness-relay-vault.test.cjs`

**Interfaces:**
- Produces: `assertVaultHeadFresh(event, currentHeadSha)` with equality-only semantics.

- [ ] **Step 1: Write failing stale-head test**

```js
test("Vault witness does not satisfy a moved PR head", () => {
  assert.throws(
    () => assertVaultHeadFresh(event(), "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb"),
    (error) => error.code === "WITNESS_HEAD_STALE",
  );
});
```

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure.

- [ ] **Step 3: Implement equality-only freshness**

Historical evidence remains preserved for the old head; live readiness routing refuses the moved head.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/adapters/vault.cjs tests/human-witness-relay-vault.test.cjs
git commit -m "feat: enforce Vault witness head freshness"
```

---

### Task 5: Add pass/fail/ambiguous fixtures and exact adapter registration

**Files:**
- Create: `tools/human-witness-relay/fixtures/vault-wav-pass.json`
- Create: `tools/human-witness-relay/fixtures/vault-wav-fail.json`
- Create: `tools/human-witness-relay/fixtures/vault-wav-ambiguous.json`
- Modify: `tools/human-witness-relay/index.cjs`
- Modify: `tests/human-witness-relay-vault.test.cjs`

**Interfaces:**
- Register exactly `the-static-collective/autodiscography-vault#phase-b2c-one-real-wav-preservation`.
- Registered adapter exposes `render(event, { eventId })` and calls `renderVaultEvidencePacket(event, { eventId })`.
- Fixtures start human observation with `SYNTHETIC:` and use no real provider credentials or URLs.

- [ ] **Step 1: Write failing fixture/registration tests**

Prove:
- pass fixture has complete evidence-class refs but remains pending project admission;
- fail fixture preserves fail exactly and remains pending project admission;
- ambiguous fixture lists missing machine evidence classes rather than inventing them;
- core `eventId` appears in rendered Markdown;
- all three route only to Vault adapter;
- none emits a next door before project admission.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/human-witness-relay-core.test.cjs tests/human-witness-relay-vault.test.cjs
```

Expected: FAIL because fixtures/registration are absent.

- [ ] **Step 3: Add fixtures and registry entry**

Use stable synthetic refs only. Do not include actual local absolute paths.

- [ ] **Step 4: Run full adapter verification**

```bash
node --test tests/human-witness-relay-core.test.cjs tests/human-witness-relay-vault.test.cjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/index.cjs tools/human-witness-relay/fixtures/vault-wav-*.json tests/human-witness-relay-vault.test.cjs
git commit -m "test: prove Vault witness relay adapter"
```

---

## Live Vault Founding Specimen Procedure

This procedure occurs only after the adapter implementation is green.

1. Re-read Vault PR #9 and record its current exact head.
2. Confirm the extension/build being used corresponds to that same head. If not, preserve any human observation as historical/ambiguous evidence but do not route it as satisfying the live gate.
3. Human performs the existing project-owned ceremony: explicit optional Downloads grant, arm exactly one track, use Suno's normal Download → WAV action, complete local admission.
4. Let Vault perform its own RIFF/WAVE or RF64/WAVE sanity, SHA-256, byte-length, durable-destination, journal, and no-session-material checks.
5. Capture the human's natural-language observation once.
6. Normalize one `HumanWitnessEventV0` containing stable provider-track/run/receipt/hash/byte-length/artifact refs only; do not copy browser session state into the relay.
7. Run core + Vault adapter to render the PR #9 evidence packet.
8. Post the packet to PR #9 using the connected GitHub tool.
9. Re-read project-owned evidence. Only Vault's own criteria may convert the gate to satisfied and allow the draft PR to become ready for review.
10. GitBook CR #51 may be reconciled only after project-owned human proof exists.
11. PR Completion still requires exact-head readiness and explicit per-PR landing confirmation before merge.

## Vault Adapter Completion Gate

Report:
- relay implementation commit SHA;
- Vault adapter test result;
- current PR #9 head at proof time;
- confirmation Vault repository received no code changes from relay implementation;
- emitted synthetic pass/fail/ambiguous packet summaries;
- credential/session scan result: no forbidden material persisted;
- whether the real one-WAV specimen has been routed yet;
- if real: project-owned PR evidence reference and which mandatory Vault criteria remain unsatisfied, if any.