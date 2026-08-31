# ORCHARD + PICKER v0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first executable ORCHARD + PICKER slice: a local, deterministic delight layer that turns an already-attributed field into inspectable fruit cards, baskets, replayable rides, and seeded surprise through one shared browser/CLI core.

**Architecture:** ORCHARD v0 is incubated under `orchard/` in this repository because the connected GitHub surface cannot create a new repository. That location is a transport constraint, not an ownership collapse: ORCHARD remains a distinct thin organ and the Front Room remains orientation-only. The implementation is dependency-free ECMAScript modules shared by Node 22 and a static browser bench; owner adapters, network access, cross-repo mutation, research routing, and make-routing remain deferred.

**Tech Stack:** Node.js 22 built-ins only, ECMAScript modules, `node:test`, static HTML/CSS/browser JavaScript, headless Chromium for visual QA.

**Spec:** `docs/superpowers/specs/2026-08-31-orchard-picker-delight-layer-design.md`

## Global Constraints

- `THE JOY WAS ALREADY APPROVED.`
- Delight may simplify the encounter; it may not silently simplify provenance.
- `presentation != authority`
- `selection != support`
- `interesting != true`
- `fruit card != source artifact`
- `basket != canon`
- `route != admission`
- `replay != causal proof`
- `surprise != randomness without bounds`
- `delight != erasure`
- ORCHARD must not replace the Front Room, LOADOUT routing/fencing, Maxhinal, MEMENTO admission, or owner-local semantics.
- v0 consumes an already-attributed input field and performs no network access or repository mutation.
- `research` and `make` remain human-visible future intents but are not executable v0 modes.
- Production code uses no third-party runtime dependency.
- Human and CLI benches use the same core modules and compatible record formats.
- Ride continuation is append-only; prior operations never change.
- Seeded surprise is reproducible against the same field digest.

---

## File map

- `orchard/package.json` — local scripts and Node version contract.
- `orchard/README.md` — organ boundary, incubation note, usage, and non-collapses.
- `orchard/src/canonical.mjs` — stable stringify, deterministic digest, seeded pseudo-random primitive.
- `orchard/src/contracts.mjs` — validation and constructors for intent, fruit-card, basket, and ride records.
- `orchard/src/picker.mjs` — deterministic PICKER modes over attributed field records.
- `orchard/src/ride.mjs` — append-only ride continuation, basket operations, and replay projection.
- `orchard/src/index.mjs` — public shared-core exports.
- `orchard/cli.mjs` — Node CLI adapter over the shared core.
- `orchard/bench/index.html` — static human bench shell.
- `orchard/bench/app.mjs` — browser adapter over the shared core.
- `orchard/bench/styles.css` — delight-layer visual presentation only; no semantics.
- `orchard/fixtures/field.json` — attributed demonstration field including live, stale, unfinished, refused, and same-endpoint/different-journey specimens.
- `orchard/tests/contracts.test.mjs` — record-law tests.
- `orchard/tests/picker.test.mjs` — deterministic mode tests.
- `orchard/tests/ride.test.mjs` — append-only, basket, and replay tests.
- `orchard/tests/cli.test.mjs` — CLI parity and portable ride tests.
- `orchard/tests/browser-contract.test.mjs` — static bench/core-sharing contract tests.

---

### Task 1: Establish ORCHARD boundary and record contracts

**Files:**
- Create: `orchard/package.json`
- Create: `orchard/README.md`
- Create: `orchard/src/contracts.mjs`
- Create: `orchard/tests/contracts.test.mjs`

**Interfaces:**
- Produces: `validateIntent(record)`, `validateFruitCard(record)`, `validateBasket(record)`, `validateRide(record)`, and `assertValidRecord(kind, record)`.
- Contract validators return `{ ok: true, value }` or `{ ok: false, errors: string[] }`; they never mutate input.

- [ ] **Step 1: Write failing contract tests**

Create `orchard/tests/contracts.test.mjs` with focused tests proving:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateIntent,
  validateFruitCard,
  validateBasket,
  validateRide,
} from '../src/contracts.mjs';

test('intent mode cannot authorize effects', () => {
  const result = validateIntent({
    schema: 'orchard.intent/v0',
    intent_id: 'intent-1',
    human_text: 'find something weird',
    mode: 'weird',
    input_refs: ['source:a'],
    constraints: {},
    created_at: '2026-08-31T23:00:00Z',
    authorize_effects: true,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /authorize_effects/);
});

test('fruit card requires attributable sources and authority none', () => {
  const result = validateFruitCard({
    schema: 'orchard.fruit-card/v0',
    fruit_id: 'fruit-1',
    label: 'A fruit',
    kind: 'artifact',
    summary: 'Useful thing',
    source_refs: [],
    owner: 'ALEX',
    freshness: 'current',
    status: 'usable',
    available_actions: ['basket'],
    receipt_refs: [],
    authority_claim: 'none',
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /source_refs/);
});

test('basket is a local selection set, not canon', () => {
  const result = validateBasket({
    schema: 'orchard.basket/v0',
    basket_id: 'basket-1',
    fruit_refs: ['fruit-1'],
    created_at: '2026-08-31T23:00:00Z',
    canon: true,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /canon/);
});

test('ride exposes append-only operation list', () => {
  const result = validateRide({
    schema: 'orchard.ride/v0',
    ride_id: 'ride-1',
    intent_ref: 'intent-1',
    field_digest: 'field-abc',
    shown_fruit_refs: [],
    chosen_fruit_refs: [],
    route_receipt_refs: [],
    operations: [],
    residuals: [],
    refusals: [],
    created_at: '2026-08-31T23:00:00Z',
  });
  assert.equal(result.ok, true);
});
```

- [ ] **Step 2: Run RED**

Run from `orchard/`:

```bash
node --test tests/contracts.test.mjs
```

Expected: FAIL because `src/contracts.mjs` does not exist.

- [ ] **Step 3: Implement minimal validators**

Create `src/contracts.mjs` with explicit allowed/required fields for the four v0 schemas. Reject unknown authority-bearing fields such as `authorize_effects`, `canon`, `supported`, and `evidence` where they would imply promotion. Require non-empty `source_refs` and `authority_claim === 'none'` on fruit cards.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/contracts.test.mjs
```

Expected: all contract tests PASS.

- [ ] **Step 5: Add package and boundary README**

Create `package.json`:

```json
{
  "name": "static-collective-orchard-incubator",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "engines": { "node": ">=22" },
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "check": "npm test"
  }
}
```

README must state: `ORCHARD != Front Room`, `ORCHARD != LOADOUT`, incubation path != final repository ownership, no network/server/auth/database, and the v0 executable mode list.

- [ ] **Step 6: Commit**

Commit message: `feat(orchard): establish v0 record contracts`.

---

### Task 2: Add canonical field identity and deterministic PICKER modes

**Files:**
- Create: `orchard/src/canonical.mjs`
- Create: `orchard/src/picker.mjs`
- Create: `orchard/fixtures/field.json`
- Create: `orchard/tests/picker.test.mjs`

**Interfaces:**
- Produces: `stableStringify(value)`, `digestValue(value)`, `seededUnit(seed, counter)`, `fieldDigest(field)`, `pick(mode, field, options)`.
- `pick()` returns `{ field_digest, mode, seed, selected, residuals, refusals, ranking_receipt }` without mutating `field`.

- [ ] **Step 1: Write failing picker tests**

Tests must prove:
- `fieldDigest()` ignores object key insertion order but changes when field content changes.
- `good-with-this` returns a bounded relevant set and preserves source refs.
- `weird` prefers structural distance metadata rather than random choice.
- `resume` prefers records with explicit `continuity_ref` or `reentry_ref` and fresher timestamps.
- `unfinished` surfaces `unresolved`, `blocked`, `draft`, `residual`, and `pressure` statuses.
- `surprise` returns the same ordered fruit IDs for the same seed + field digest and a different order for a materially different seed.
- refused records remain in `refusals`; they are never silently rerouted into selected fruit.

Representative test:

```js
test('surprise is reproducible for the same seed and field', () => {
  const a = pick('surprise', field, { seed: 'banana-elves', limit: 3 });
  const b = pick('surprise', field, { seed: 'banana-elves', limit: 3 });
  assert.deepEqual(a.selected.map(x => x.fruit_id), b.selected.map(x => x.fruit_id));
  assert.equal(a.field_digest, b.field_digest);
});
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/picker.test.mjs
```

Expected: FAIL because canonical and picker modules are absent.

- [ ] **Step 3: Implement deterministic primitives**

Implement stable recursive key ordering, a non-cryptographic deterministic FNV-1a-style digest explicitly labeled as drift identity rather than tamper evidence, and a seed/counter unit interval generator derived from that digest.

- [ ] **Step 4: Implement PICKER modes**

Use only declared metadata from each field candidate. Never infer hidden causal paths. Ranking receipts must list the scoring factors actually used for every selected candidate. Default result limit: `3`; hard maximum: `7`.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/picker.test.mjs
```

Expected: all picker tests PASS.

- [ ] **Step 6: Commit**

Commit message: `feat(orchard): add deterministic picker modes`.

---

### Task 3: Implement baskets, append-only rides, and replay

**Files:**
- Create: `orchard/src/ride.mjs`
- Create: `orchard/tests/ride.test.mjs`

**Interfaces:**
- Produces: `createBasket(fruitRefs, options)`, `continueBasket(parent, additions, options)`, `createRide(intent, fieldDigest, options)`, `appendRideOperation(ride, operation)`, `projectReplay(ride, fruitById)`.
- All continuation functions return new objects; parent records remain byte-equivalent after calls.

- [ ] **Step 1: Write failing immutability/replay tests**

Prove:
- continuing a basket leaves the parent unchanged and sets `parent_basket_ref`;
- appending a ride operation leaves all prior operation objects unchanged;
- replay shows only witnessed operation/receipt order;
- two fruit cards with the same visible target but different receipt journeys remain separate replay paths;
- missing history is represented as `missing` and never synthesized.

- [ ] **Step 2: Run RED**

```bash
node --test tests/ride.test.mjs
```

Expected: FAIL because `src/ride.mjs` does not exist.

- [ ] **Step 3: Implement minimal immutable operations**

Use `structuredClone`-safe plain records, copy arrays before append, and include explicit operation IDs. `projectReplay` may render `input -> selection -> operation -> fruit` only when corresponding refs exist.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/ride.test.mjs
```

Expected: all ride tests PASS.

- [ ] **Step 5: Commit**

Commit message: `feat(orchard): add baskets rides and replay`.

---

### Task 4: Publish one shared core and CLI bench

**Files:**
- Create: `orchard/src/index.mjs`
- Create: `orchard/cli.mjs`
- Create: `orchard/tests/cli.test.mjs`

**Interfaces:**
- `src/index.mjs` re-exports all public v0 functions.
- CLI commands:
  - `node cli.mjs pick --mode <mode> --field <path> [--seed <seed>] [--limit <n>]`
  - `node cli.mjs ride --mode <mode> --field <path> [--seed <seed>]`
  - `node cli.mjs continue --ride <path> --operation <json>`
- JSON is written to stdout; diagnostics go to stderr; success exit `0`, invalid input exit `2`.

- [ ] **Step 1: Write failing CLI tests**

Use `spawnSync(process.execPath, [...])` against the real CLI. Prove:
- CLI `pick surprise` matches direct core selection for the same seed;
- invalid mode exits `2` with an actionable diagnostic;
- `ride` output validates as `orchard.ride/v0`;
- `continue` preserves original operations exactly and appends one new operation.

- [ ] **Step 2: Run RED**

```bash
node --test tests/cli.test.mjs
```

Expected: FAIL because CLI/public index is absent.

- [ ] **Step 3: Implement CLI adapter only**

CLI parses arguments and file JSON, calls shared-core functions, and serializes results. It must contain no ranking or record semantics of its own.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/cli.test.mjs
```

Expected: all CLI tests PASS.

- [ ] **Step 5: Commit**

Commit message: `feat(orchard): add shared core cli bench`.

---

### Task 5: Build the human PICKER bench with provenance under the peel

**Files:**
- Create: `orchard/bench/index.html`
- Create: `orchard/bench/app.mjs`
- Create: `orchard/bench/styles.css`
- Create: `orchard/tests/browser-contract.test.mjs`

**Interfaces:**
- Browser adapter imports only `../src/index.mjs` for ORCHARD semantics.
- Required UI IDs: `field-input`, `intent-doors`, `fruit-grid`, `basket`, `ride-strip`, `provenance-drawer`, `status-line`.
- v0 executable doors: `good-with-this`, `weird`, `resume`, `unfinished`, `surprise`.
- `research` and `make` may appear only as visibly dormant/future doors with explanatory text and no click handler that invokes work.

- [ ] **Step 1: Write failing browser-contract tests**

Read the static files with Node and prove:
- required UI IDs exist;
- app imports `../src/index.mjs` and does not duplicate picker scoring constants;
- dormant `research` and `make` controls are marked `aria-disabled="true"`;
- page copy contains `THE JOY WAS ALREADY APPROVED` and a concise provenance affordance such as `How did this get here?`;
- no remote `<script src="http...">`, stylesheet CDN, fetch/XHR, or websocket code exists.

- [ ] **Step 2: Run RED**

```bash
node --test tests/browser-contract.test.mjs
```

Expected: FAIL because bench files are absent.

- [ ] **Step 3: Implement bench shell and adapter**

Human flow:
1. paste/load an attributed field JSON;
2. choose one intent door;
3. receive at most 3 default fruit cards;
4. add fruit to basket;
5. open `How did this get here?` for source refs + ranking receipt + replay;
6. see append-only ride strip update.

Visual requirements:
- one calm landing panel rather than dashboard chrome;
- fruit-card hierarchy prioritizes label/summary/status over owner anatomy;
- lifecycle labels `SEED`, `GROWING`, `FORMED`, `USABLE`, `COMPOSTED/RESEEDED` are presentation metadata only;
- refusal/unresolved states look intentional rather than error-red;
- keyboard focus is visible; buttons have accessible names; drawer uses semantic `<details>` or equivalent native disclosure.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/browser-contract.test.mjs
```

Expected: browser contract tests PASS.

- [ ] **Step 5: Headless visual smoke**

From `orchard/` run:

```bash
python3 -m http.server 8765 >/tmp/orchard-http.log 2>&1 &
SERVER_PID=$!
chromium --headless --no-sandbox --disable-gpu --window-size=1440,1000 \
  --screenshot=/tmp/orchard-picker-v0.png http://127.0.0.1:8765/bench/
kill $SERVER_PID
python3 - <<'PY'
from PIL import Image
img = Image.open('/tmp/orchard-picker-v0.png')
assert img.width == 1440 and img.height == 1000
print(img.size)
PY
```

Expected: Chromium exits `0`; screenshot exists at 1440×1000 with the bench visible.

- [ ] **Step 6: Commit**

Commit message: `feat(orchard): add human picker bench`.

---

### Task 6: Add hostile fixtures for the architectural boundaries

**Files:**
- Modify: `orchard/fixtures/field.json`
- Modify: `orchard/tests/contracts.test.mjs`
- Modify: `orchard/tests/picker.test.mjs`
- Modify: `orchard/tests/ride.test.mjs`

**Interfaces:**
- No new public API required.

- [ ] **Step 1: Add failing hostile tests**

Cover five required specimens from the spec:
1. refusal is preserved and not routed around;
2. missing provenance candidate cannot become a fruit card;
3. same endpoint / different journey remains distinguishable;
4. stale field drift changes field digest and continuation reports drift;
5. seeded surprise reproduces exactly on unchanged field.

Also add a control proving ranking metadata never sets `support`, `evidence`, `authority`, or `canon`.

- [ ] **Step 2: Run RED**

```bash
npm test
```

Expected: at least one new hostile assertion FAILS before its handling is added.

- [ ] **Step 3: Add the smallest required handling**

Do not add owner adapters or future orchestration. Add only local refusal, provenance, drift, and journey distinctions required by the failing tests.

- [ ] **Step 4: Run GREEN**

```bash
npm test
```

Expected: all tests PASS with no warnings.

- [ ] **Step 5: Commit**

Commit message: `test(orchard): harden delight boundary fixtures`.

---

### Task 7: Full validation and PR evidence

**Files:**
- Modify: `orchard/README.md` only if validation reveals an undocumented command or boundary.
- Modify: PR body, not production semantics.

**Interfaces:**
- Produces validation evidence only.

- [ ] **Step 1: Run full deterministic test contract**

```bash
cd orchard
npm test
npm run check
```

Expected: both commands PASS.

- [ ] **Step 2: Run representative CLI specimens**

```bash
node cli.mjs pick --mode surprise --field fixtures/field.json --seed banana-elves --limit 3
node cli.mjs pick --mode unfinished --field fixtures/field.json
node cli.mjs ride --mode weird --field fixtures/field.json --seed peach-pit
```

Expected: valid JSON, `authority_claim: "none"` on fruit cards, stable field digest, explicit refusals/residuals where applicable.

- [ ] **Step 3: Re-run headless browser smoke and inspect screenshot**

Use the Task 5 server/Chromium command. Verify the screenshot shows the landing panel, intent doors, and empty/loaded-field instructions without clipped controls at 1440×1000.

- [ ] **Step 4: Compare implementation to spec**

Check that v0 does not contain:
- network calls;
- server/database/auth code;
- cross-repository mutation;
- automatic GitHub merge/publication;
- MEMENTO admission;
- research/make execution;
- master index behavior;
- inferred replay paths.

- [ ] **Step 5: Commit any validation-only doc correction**

If no file changed, do not create an empty commit. If README needed correction, use `docs(orchard): record validated v0 usage`.

---

### Task 8: Review and completion loop

**Files:** PR metadata/comments only unless review finds a valid in-scope defect.

**Interfaces:** none.

- [ ] **Step 1: Open implementation PR from `feature/orchard-picker-v0` to `main`**

PR body must include:
- approved spec path;
- exact executable mode list;
- deferred `research` / `make` owner adapters;
- test commands and pass counts;
- screenshot evidence path/description;
- explicit statement that `orchard/` is an incubation location because repository creation is unavailable through the connected surface.

- [ ] **Step 2: Run conservative automated-review loop if the repository reviewer is configured**

Use Develoop `gh-autoreview-resolve`: establish current head, checks, existing threads, and review configuration; request at most the bounded review needed for this PR; classify every finding against the approved ORCHARD scope.

- [ ] **Step 3: Resolve only valid in-scope feedback**

For each valid finding: reproduce, write a failing regression test, implement minimal fix, rerun focused + full tests, commit, reply with evidence, resolve thread.

- [ ] **Step 4: Final PR-completion gate**

Verify exact head, green required checks, zero unresolved in-scope threads, no merge conflict, and no scope drift. Do not report ready based on partial pagination or stale review evidence.

- [ ] **Step 5: Merge only after verified completion**

User has authorized the implementation lifecycle and previously used squash-style consolidated landings for this project stream; use squash only if repository state still permits it and the exact head is unchanged at merge time.
