# Human Witness Relay v0 Core Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a tiny credential-free Node.js relay core that validates one human witness event, binds it to exact execution identity, and emits deterministic routing packets without mutating any project or claiming project authority.

**Architecture:** Implement the relay as neutral coordination tooling in `What-is-the-static-collective-`, not inside Haunted Toaster or Autodiscography Vault. This placement is required so the current under-test heads remain unchanged. The core accepts structured witness input, validates exact-head and secret-exclusion rules, assigns deterministic event identity, then delegates rendering to an explicitly registered adapter; it performs no GitHub/GitBook writes itself.

**Tech Stack:** Node.js 22+, CommonJS, built-in `node:test`, `node:assert`, `node:crypto`; no runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-08-17-human-witness-relay-v0-design.md`

## Global Constraints

- Human observation, project-local disposition, and cross-project projection remain distinct facts.
- `headSha` is mandatory and must be a 40-character lowercase hexadecimal Git commit identity.
- Human text must remain inspectable exactly as entered; normalization may not strengthen it.
- The relay transports evidence; it never closes a project gate, merges, releases, deploys, or mutates another repository.
- Unknown repositories/gates fail closed.
- No cookie, authorization header, bearer token, signed provider URL, reusable session material, browser storage, or password may persist in a relay event or packet.
- No central database, daemon, queue, service, telemetry stream, user-profile system, or global narrator is introduced.
- v0 has exactly two proving adapters: Haunted Toaster and Autodiscography Vault.
- The relay implementation must stay outside the exact product heads currently awaiting human witness.
- No third-party package is added for v0.

---

## File Structure

- `tools/human-witness-relay/constants.cjs` — schema string, dispositions, forbidden key names, stable error codes.
- `tools/human-witness-relay/validate.cjs` — pure event validation and forbidden-material scan.
- `tools/human-witness-relay/event-id.cjs` — canonical deterministic identity from semantically stable fields.
- `tools/human-witness-relay/route.cjs` — explicit adapter registry and fail-closed adapter resolution.
- `tools/human-witness-relay/index.cjs` — small public API that composes validation, identity, and routing.
- `tools/human-witness-relay/cli.cjs` — JSON-in / JSON-out local command surface; no network access.
- `tools/human-witness-relay/fixtures/pass.json` — valid pass transport specimen.
- `tools/human-witness-relay/fixtures/fail.json` — valid fail transport specimen.
- `tools/human-witness-relay/fixtures/ambiguous.json` — valid ambiguous transport specimen.
- `tests/human-witness-relay-core.test.cjs` — core transport, security, exact-head, determinism, and routing tests.

Adapters are added by the two follow-on plans and registered only after their tests exist.

---

### Task 1: Define the transport contract and validator

**Files:**
- Create: `tools/human-witness-relay/constants.cjs`
- Create: `tools/human-witness-relay/validate.cjs`
- Create: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Produces: `SCHEMA`, `DISPOSITIONS`, `ERRORS`, `validateHumanWitnessEventV0(input)`.
- `validateHumanWitnessEventV0(input)` returns `{ ok: true, event }` or `{ ok: false, errors: [{ code, path }] }`; it never throws for ordinary invalid input.

- [ ] **Step 1: Write the failing validator tests**

```js
const test = require("node:test");
const assert = require("node:assert/strict");
const { validateHumanWitnessEventV0 } = require("../tools/human-witness-relay/validate.cjs");

function validEvent(overrides = {}) {
  return {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/the-haunted-toaster",
      pullRequest: 146,
      headSha: "944169c7f7bbd821f51fa8e404302cbaa8f4a342",
      gateId: "elastic-topology-response-v1-field-witness/quiet-spacious",
      artifactRefs: ["artifact:windows-portable"],
      buildRefs: ["workflow:32057926247"],
    },
    witness: {
      observedAt: "2026-08-17T22:00:00-05:00",
      observerRef: "human:local-owner",
      observation: "quiet one breathes without losing the frame",
      disposition: "pass",
    },
    evidenceRefs: [],
    provenance: { captureSurface: "chat", relayPolicy: "human-witness-relay-v0" },
    ...overrides,
  };
}

test("accepts a bounded event bound to an exact head", () => {
  const result = validateHumanWitnessEventV0(validEvent());
  assert.equal(result.ok, true);
  assert.equal(result.event.witness.observation, "quiet one breathes without losing the frame");
});

test("missing exact head fails closed", () => {
  const event = validEvent();
  delete event.subject.headSha;
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "WITNESS_EXECUTION_IDENTITY_MISSING"));
});

test("unknown disposition is rejected", () => {
  const event = validEvent();
  event.witness.disposition = "pretty-good";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "WITNESS_DISPOSITION_INVALID"));
});
```

Add explicit tests for malformed SHA, empty observation, missing `gateId`, and non-ISO `observedAt`.

- [ ] **Step 2: Run the focused test to verify RED**

```bash
node --test tests/human-witness-relay-core.test.cjs
```

Expected: FAIL because `validate.cjs` does not exist.

- [ ] **Step 3: Implement constants and minimal validation**

`constants.cjs` exports exactly:

```js
const SCHEMA = "static-collective/human-witness-event/v0";
const DISPOSITIONS = new Set(["pass", "fail", "ambiguous"]);
const ERRORS = Object.freeze({
  IDENTITY_MISSING: "WITNESS_EXECUTION_IDENTITY_MISSING",
  EVENT_INVALID: "WITNESS_EVENT_INVALID",
  DISPOSITION_INVALID: "WITNESS_DISPOSITION_INVALID",
  FORBIDDEN_MATERIAL: "WITNESS_FORBIDDEN_MATERIAL",
  TARGET_UNKNOWN: "WITNESS_TARGET_UNKNOWN",
});
module.exports = { SCHEMA, DISPOSITIONS, ERRORS };
```

`validate.cjs` validates only the approved semantic floor, returns a copied event rather than mutating input, and preserves `witness.observation` verbatim.

- [ ] **Step 4: Run focused tests to verify GREEN**

```bash
node --test tests/human-witness-relay-core.test.cjs
```

Expected: PASS for Task 1 tests.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/constants.cjs tools/human-witness-relay/validate.cjs tests/human-witness-relay-core.test.cjs
git commit -m "feat: validate human witness relay events"
```

---

### Task 2: Reject forbidden credential and session material

**Files:**
- Modify: `tools/human-witness-relay/constants.cjs`
- Modify: `tools/human-witness-relay/validate.cjs`
- Modify: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Produces: `findForbiddenMaterial(value)` returning `{ path, key }[]` without echoing forbidden values.
- `validateHumanWitnessEventV0` returns `WITNESS_FORBIDDEN_MATERIAL` for any forbidden field.

- [ ] **Step 1: Add failing secret-exclusion tests**

```js
test("rejects secret-shaped fields without echoing their values", () => {
  const event = validEvent();
  event.provenance.authorizationHeader = "Bearer super-secret-value";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  const serialized = JSON.stringify(result);
  assert.match(serialized, /WITNESS_FORBIDDEN_MATERIAL/);
  assert.doesNotMatch(serialized, /super-secret-value/);
});

test("rejects signed-url/session shaped keys recursively", () => {
  const event = validEvent();
  event.subject.extra = { cookie: "abc", signedUrl: "https://provider.invalid/x?sig=secret" };
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.equal(result.errors.filter((e) => e.code === "WITNESS_FORBIDDEN_MATERIAL").length, 2);
});
```

Forbidden key matching is case-insensitive for `cookie`, `cookies`, `authorization`, `authorizationHeader`, `bearerToken`, `token`, `password`, `session`, `sessionId`, `browserStorage`, `localStorage`, `signedUrl`, `finalUrl`, and `referrer`. Do not reject stable opaque IDs merely because their values are high entropy.

- [ ] **Step 2: Verify RED**

```bash
node --test tests/human-witness-relay-core.test.cjs
```

Expected: FAIL because forbidden-material scanning is absent.

- [ ] **Step 3: Implement recursive key-only detection**

`findForbiddenMaterial` reports structural path + forbidden key name only. It never returns or embeds the corresponding value.

- [ ] **Step 4: Verify GREEN**

Run the focused test command again; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/constants.cjs tools/human-witness-relay/validate.cjs tests/human-witness-relay-core.test.cjs
git commit -m "feat: reject forbidden witness material"
```

---

### Task 3: Add deterministic event identity

**Files:**
- Create: `tools/human-witness-relay/event-id.cjs`
- Modify: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Produces: `humanWitnessEventId(event): string` formatted `hwv0_<64 lowercase hex>`.
- Identity input includes schema, repository, PR/issue number, head SHA, gate ID, artifact/build refs in given order, observedAt, observerRef, exact observation text, disposition, evidence refs in given order, and capture surface.

- [ ] **Step 1: Add failing determinism tests**

```js
test("event identity is deterministic and observation-sensitive", () => {
  const { humanWitnessEventId } = require("../tools/human-witness-relay/event-id.cjs");
  const a = validEvent();
  const b = JSON.parse(JSON.stringify(a));
  assert.equal(humanWitnessEventId(a), humanWitnessEventId(b));
  b.witness.observation += "!";
  assert.notEqual(humanWitnessEventId(a), humanWitnessEventId(b));
});
```

Also prove object insertion-order differences outside ordered arrays do not change identity.

- [ ] **Step 2: Verify RED**

Run the focused test; expected module-not-found failure.

- [ ] **Step 3: Implement canonical serialization + SHA-256**

Use `node:crypto`. Build the identity object explicitly in the documented field order; do not generic-sort arbitrary user objects.

- [ ] **Step 4: Verify GREEN**

Run the focused test; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/event-id.cjs tests/human-witness-relay-core.test.cjs
git commit -m "feat: identify witness events deterministically"
```

---

### Task 4: Add fail-closed adapter routing

**Files:**
- Create: `tools/human-witness-relay/route.cjs`
- Modify: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Produces: `adapterKey(event): string`, `resolveWitnessAdapter(event, registry)`.
- Registry shape: `Map<string, { render(event, { eventId }): object }>`.
- Adapter key is `${repository}#${gateId}`; prefix/wildcard support is intentionally absent in core v0.

- [ ] **Step 1: Add failing routing tests**

```js
test("unknown target fails closed", () => {
  const { resolveWitnessAdapter } = require("../tools/human-witness-relay/route.cjs");
  assert.throws(
    () => resolveWitnessAdapter(validEvent(), new Map()),
    (error) => error.code === "WITNESS_TARGET_UNKNOWN",
  );
});

test("explicit target resolves only its declared adapter", () => {
  const { adapterKey, resolveWitnessAdapter } = require("../tools/human-witness-relay/route.cjs");
  const event = validEvent();
  const adapter = { render: (_event, { eventId }) => ({ kind: "fixture", eventId }) };
  const registry = new Map([[adapterKey(event), adapter]]);
  assert.equal(resolveWitnessAdapter(event, registry), adapter);
});
```

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because `route.cjs` is absent.

- [ ] **Step 3: Implement explicit routing**

Unknown targets throw an `Error` carrying `code = ERRORS.TARGET_UNKNOWN`; error text may name repository/gate but must not include witness observation text.

- [ ] **Step 4: Verify GREEN**

Run focused tests; expected PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/route.cjs tests/human-witness-relay-core.test.cjs
git commit -m "feat: route witness events explicitly"
```

---

### Task 5: Compose the public API and local JSON CLI

**Files:**
- Create: `tools/human-witness-relay/index.cjs`
- Create: `tools/human-witness-relay/cli.cjs`
- Modify: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Produces: `prepareWitnessRoutingPacket(input, registry)` returning:

```js
{
  eventId,
  event,
  adapterKey,
  projectDisposition: "pending-project-admission",
  routing: adapter.render(event, { eventId }),
}
```

- CLI reads one JSON event from stdin and writes one JSON packet to stdout. Diagnostics go to stderr. Exit `0` for valid routed input; exit `2` for invalid/unroutable input.
- Until adapters are installed, CLI supports `--validate-only`, which omits routing and returns validated event + event ID.

- [ ] **Step 1: Add failing API/CLI tests**

Use `node:child_process.spawnSync` to prove:
- validate-only succeeds for a valid event;
- missing head exits `2`;
- stdout never contains a forbidden secret supplied in invalid input;
- `projectDisposition` is always `pending-project-admission` from core;
- the deterministic core `eventId` is the same ID passed to `adapter.render(event, { eventId })`.

- [ ] **Step 2: Verify RED**

Run focused tests; expected failure because public API/CLI are absent.

- [ ] **Step 3: Implement minimal composition and CLI**

Compute `eventId` exactly once in core, call `adapter.render(event, { eventId })`, and place the returned object under `routing`. The CLI must not import HTTP, GitHub, GitBook, filesystem persistence, browser APIs, or credential helpers.

- [ ] **Step 4: Verify GREEN**

```bash
node --test tests/human-witness-relay-core.test.cjs
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/index.cjs tools/human-witness-relay/cli.cjs tests/human-witness-relay-core.test.cjs
git commit -m "feat: add local witness relay command surface"
```

---

### Task 6: Add pass/fail/ambiguous founding fixtures and prove full core

**Files:**
- Create: `tools/human-witness-relay/fixtures/pass.json`
- Create: `tools/human-witness-relay/fixtures/fail.json`
- Create: `tools/human-witness-relay/fixtures/ambiguous.json`
- Modify: `tests/human-witness-relay-core.test.cjs`

**Interfaces:**
- Fixtures are transport-only and use synthetic repository/gate identities so they cannot be mistaken for real field proof.

- [ ] **Step 1: Add fixture tests**

Load all three fixtures and prove each validates, each receives a different event ID, and no fixture contains `projectDisposition: "satisfied"`, merge instructions, release instructions, credentials, or provider URLs.

- [ ] **Step 2: Verify RED**

Run focused tests; expected fixture-not-found failure.

- [ ] **Step 3: Add the three fixtures**

Use observations clearly prefixed `SYNTHETIC:` and synthetic SHA values such as 40 repeated hex characters.

- [ ] **Step 4: Run full core verification**

```bash
node --test tests/human-witness-relay-core.test.cjs
node tools/human-witness-relay/cli.cjs --validate-only < tools/human-witness-relay/fixtures/pass.json
```

Expected: all tests PASS; CLI emits `eventId`, exact synthetic observation, and `projectDisposition: "pending-project-admission"`.

- [ ] **Step 5: Commit**

```bash
git add tools/human-witness-relay/fixtures tests/human-witness-relay-core.test.cjs
git commit -m "test: prove witness relay transport dispositions"
```

---

## Core Completion Gate

Before starting either project adapter, report:

- exact implementation commit SHA;
- `node --test tests/human-witness-relay-core.test.cjs` result;
- validate-only CLI result;
- dependency impact: none;
- network authority: none;
- project mutation authority: none;
- credential/session persistence: none;
- confirmation that Toaster PR #146 head and Vault PR #9 head were not modified by this work.

Do not claim the relay is live until at least one project adapter is green and a real human witness has been routed to a project-owned evidence surface.