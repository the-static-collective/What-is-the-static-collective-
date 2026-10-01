# PUBLIC REVEAL CROSSING 001 — Relay Garden Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing local ORCHARD runtime with Relay Garden 001 so a stranger can choose a bounded public door, explicitly cross it, make one local attributable thing, receive a receipt, and immediately receive new selectable doors without any descendant executing or publishing itself.

**Architecture:** Keep the existing dependency-free Node 22 / browser ESM ORCHARD core and add Relay Garden as an isolated submodule plus a dedicated static public surface. The existing PICKER, basket, and ride semantics remain unchanged; Relay Garden reuses canonical digest/append-only patterns but owns its own proposal → selection → crossing → make → receipt → Chance Set state machine. First-slice makes are local text artifacts only; publication remains a disposition/proposal, never a network side effect.

**Tech Stack:** Node.js 22+, dependency-free ECMAScript modules, `node:test`, static HTML/CSS/browser JavaScript, browser `localStorage`, GitHub Actions + GitHub Pages for the public static surface.

**Spec:** `docs/superpowers/specs/2026-10-01-public-reveal-crossing-001-design.md`

## Global Constraints

- **EVERYONE GETS A DOOR.**
- **EVERYTHING MADE MAKES ANOTHER DOOR.**
- `DOOR != CROSSING`
- `SEED != SELECTION`
- `CREATION != AUTHORITY`
- `MAKE != PUBLISH`
- `PUBLISH != CANON`
- `FAILURE != NOTHING`
- A completed make must yield at least one bounded next chance.
- No generated door may select, cross, publish, or canonize itself.
- Maximum machine-proposed visible next doors per make: **3**.
- Maximum first-screen starter doors: **5**; this plan uses **3**.
- No contribution count, streak, timer, scarcity mechanic, or reputation multiplier.
- At least one starter path must work with no account, ordinary keyboard/touch input, and no media upload; all three v0 starters satisfy this.
- First-slice output is local by default. `publication_proposed` means proposal only; there is no publish API in v0.
- Source/project authority remains outside ORCHARD; Relay Garden records are projections and local receipts.
- Existing `orchard/src/picker.mjs`, `orchard/src/ride.mjs`, and PICKER bench behavior must not regress.
- Production Relay Garden code adds no third-party runtime dependency and makes no network request.
- Public copy must be re-checked against source repos immediately before launch.

## Existing Runtime Baseline

ORCHARD already exists on `main` under `orchard/` with:

- deterministic canonical digest helpers;
- record validators;
- PICKER modes;
- baskets and append-only rides;
- CLI parity;
- a static human bench;
- dependency-free Node 22 tests.

Relay Garden is therefore an extension of an existing runtime, not a new project scaffold.

## File Map

**Create**
- `orchard/src/relay-garden/contracts.mjs` — Relay Garden v0 validators.
- `orchard/src/relay-garden/catalog.mjs` — three curated starter doors and current source-status metadata.
- `orchard/src/relay-garden/chances.mjs` — deterministic bounded next-door derivation.
- `orchard/src/relay-garden/session.mjs` — proposal → selection → crossing → make → receipt state machine.
- `orchard/src/relay-garden/bundle.mjs` — local persistence/export parsing.
- `orchard/src/relay-garden/index.mjs` — Relay Garden public exports.
- `orchard/tests/relay-garden-contracts.test.mjs`
- `orchard/tests/relay-garden-session.test.mjs`
- `orchard/tests/relay-garden-chances.test.mjs`
- `orchard/tests/relay-garden-catalog.test.mjs`
- `orchard/tests/relay-garden-bundle.test.mjs`
- `orchard/tests/relay-garden-browser-contract.test.mjs`
- `orchard/relay-garden/index.html`
- `orchard/relay-garden/app.mjs`
- `orchard/relay-garden/styles.css`
- `.github/workflows/relay-garden-pages.yml`
- `evidence/relay-garden-001-public-opening.md`

**Modify**
- `orchard/src/index.mjs` — re-export Relay Garden namespace/functions.
- `orchard/README.md` — describe Relay Garden mode and public/local boundary.
- `README.md` — add one public “Make something” door only after the deployed page is verified.

## Review Focus

These are the five failure classes most likely to hurt a real visitor and are pinned to tasks below:

1. **Whitespace, oversized, or HTML-looking text input** must not create an invalid receipt or execute markup; Task 2 and Task 6 test this.
2. **Duplicate completion/replay** must not produce a second artifact from one crossing; Task 2 tests this.
3. **Refused publication or failed continuation** must still leave at least one lawful local next chance without fabricating success; Task 3 tests this.
4. **Corrupt/stale local browser state** must fail closed without silently clearing history or publishing anything; Task 5 tests this.
5. **Stale source-status copy** must remain visibly dated and must never imply that an external owner project is executable/current beyond the verified evidence; Task 4 and Task 8 test this.

---

### Task 1: Add Relay Garden record contracts

**Files:**
- Create: `orchard/src/relay-garden/contracts.mjs`
- Create: `orchard/src/relay-garden/index.mjs`
- Create: `orchard/tests/relay-garden-contracts.test.mjs`
- Modify: `orchard/src/index.mjs`

**Interfaces:**
- Produces:
  - `validateRelayDoor(record)`
  - `validateRelayArtifact(record)`
  - `validateMakeReceipt(record)`
  - `validateChanceSet(record)`
  - `validateRelaySession(record)`
  - `assertRelayRecord(kind, record)`
- Validators return `{ ok: true, value }` or `{ ok: false, errors: string[] }` and never mutate input.

- [ ] **Step 1: Write failing contract tests**

Add tests named:

```text
door requires human selection authority and crossing_authority false
make receipt distinguishes local visibility from publication disposition
chance set refuses more than three machine proposed doors
chance set doors cannot carry selection or crossing authority
session requires available doors and append-only artifact/receipt arrays
```

Use exact schema names:

```text
relay-garden.door/v0
relay-garden.artifact/v0
relay-garden.make-receipt/v0
relay-garden.chance-set/v0
relay-garden.session/v0
```

- [ ] **Step 2: Run RED**

Run:

```bash
cd orchard
node --test tests/relay-garden-contracts.test.mjs
```

Expected: FAIL because the Relay Garden contract module does not exist.

- [ ] **Step 3: Implement the validators**

Exact door invariants:

```text
selection_authority === "human"
crossing_authority === false
source_refs.length >= 1
requirements is an array
visibility in ["local", "public-source"]
```

Exact publication dispositions:

```text
local_only
held_for_review
refused
publication_proposed
```

`publication_proposed` must remain compatible only with local artifact visibility in v0.

- [ ] **Step 4: Add the Relay Garden module boundary**

Create `orchard/src/relay-garden/index.mjs` and re-export the Task 1 contract API from it.

Add exactly this namespace boundary to `orchard/src/index.mjs` without renaming existing PICKER exports:

```js
export * as relayGarden from './relay-garden/index.mjs';
```

Later tasks extend the same namespace rather than adding Relay Garden symbols directly to ORCHARD's top-level export surface.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/relay-garden-contracts.test.mjs
npm test
```

Expected: new tests PASS and all existing ORCHARD tests remain PASS.

- [ ] **Step 6: Commit**

```bash
git add orchard/src/relay-garden/contracts.mjs orchard/src/relay-garden/index.mjs orchard/src/index.mjs orchard/tests/relay-garden-contracts.test.mjs
git commit -m "feat(orchard): add relay garden contracts"
```

---

### Task 2: Implement explicit selection, crossing, and one local make

**Files:**
- Create: `orchard/src/relay-garden/session.mjs`
- Create: `orchard/tests/relay-garden-session.test.mjs`
- Modify: `orchard/src/relay-garden/index.mjs`
- Modify: `orchard/src/index.mjs`

**Interfaces:**
- Consumes: Relay record validators from Task 1 and `digestValue(value)` from `orchard/src/canonical.mjs`.
- Produces:
  - `createRelaySession(starterDoors, options?) -> RelaySessionV0`
  - `selectRelayDoor(session, doorId, options?) -> RelaySessionV0`
  - `crossSelectedRelayDoor(session, { kind: "human_selection", crossed_at? }) -> RelaySessionV0`
  - `completeRelayMake(session, { body, publication_disposition }, options?) -> { session, artifact, receipt }`

- [ ] **Step 1: Write failing state-machine tests**

Tests must prove:

```text
proposal does not imply selection
selection does not imply crossing
crossing does not itself create an artifact
make before crossing is refused
one crossed door can complete exactly one make
second completion without a new selection/crossing is refused
whitespace-only input is refused
per-door max_length is enforced
"<script>alert(1)</script>" is stored as inert text data, not interpreted
receipt fruit is derived from the completed artifact
receipt keeps source refs and publication disposition
```

Use injected `created_at` values in tests so fixtures are deterministic.

- [ ] **Step 2: Run RED**

```bash
node --test tests/relay-garden-session.test.mjs
```

Expected: FAIL because the state-machine module is absent.

- [ ] **Step 3: Implement the state machine**

`createRelaySession()` starts with `active: null`, empty artifacts/receipts/chance sets, and cloned starter doors.

`selectRelayDoor()` may select only an available door.

`crossSelectedRelayDoor()` requires an existing selected door and exact proof kind `human_selection`.

`completeRelayMake()`:
- validates the active door's text constraints;
- creates one `relay-garden.artifact/v0`;
- creates one `relay-garden.make-receipt/v0`;
- sets artifact visibility to `local`;
- preserves requested publication disposition separately;
- appends records rather than rewriting older records;
- clears the active crossing after completion.

Do not derive next doors in this task.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/relay-garden-session.test.mjs
npm test
```

Expected: all tests PASS.

- [ ] **Step 5: Commit**

```bash
git add orchard/src/relay-garden/session.mjs orchard/src/relay-garden/index.mjs orchard/src/index.mjs orchard/tests/relay-garden-session.test.mjs
git commit -m "feat(orchard): add explicit relay garden crossing"
```

---

### Task 3: Turn every completed make into a bounded Chance Set

**Files:**
- Create: `orchard/src/relay-garden/chances.mjs`
- Create: `orchard/tests/relay-garden-chances.test.mjs`
- Modify: `orchard/src/relay-garden/session.mjs`
- Modify: `orchard/src/relay-garden/index.mjs`

**Interfaces:**
- Consumes: one valid make receipt, its source door, and artifact.
- Produces:
  - `deriveChanceSet(receipt, artifact, sourceDoor, options?) -> ChanceSetV0`
  - `completeRelayMake(...)` now returns `{ session, artifact, receipt, chanceSet }`.
- Generated doors are normal `relay-garden.door/v0` records and become selectable in the returned session.

- [ ] **Step 1: Write failing chance tests**

Tests must prove:

```text
every completed fixture make produces at least one next door
machine proposal count is 1..3
generated doors carry selection_authority human and crossing_authority false
no generated door is selected or crossed automatically
generated door source_refs include the parent artifact and receipt
choosing a generated door requires a fresh select and cross cycle
two generations preserve the first receipt byte-for-byte
the Pet Sitter fixture yields multiple lawful projections (continue + translate + witness)
refused publication yields a compost/repair or hold-and-name-gap door
unknown artifact kind still yields hold-and-name-gap rather than zero doors
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/relay-garden-chances.test.mjs
```

Expected: FAIL because chance derivation is absent.

- [ ] **Step 3: Implement deterministic chance derivation**

Chance classes supported in v0:

```text
continue
translate
repair
witness
branch
return
compost
hold-and-name-gap
```

Rules are local deterministic templates selected by source-door kind and publication disposition. No AI call and no network call.

If no stronger template applies, emit exactly one `hold-and-name-gap` door.

- [ ] **Step 4: Compose chance generation into completion**

After a valid make, append the Chance Set and its proposed doors to the returned session, then clear the active crossing.

No descendant action occurs.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/relay-garden-chances.test.mjs tests/relay-garden-session.test.mjs
npm test
```

Expected: all tests PASS, including a two-generation loop.

- [ ] **Step 6: Commit**

```bash
git add orchard/src/relay-garden/chances.mjs orchard/src/relay-garden/session.mjs orchard/src/relay-garden/index.mjs orchard/tests/relay-garden-chances.test.mjs
git commit -m "feat(orchard): make creation open another door"
```

---

### Task 4: Add the three current starter doors

**Files:**
- Create: `orchard/src/relay-garden/catalog.mjs`
- Create: `orchard/tests/relay-garden-catalog.test.mjs`

**Interfaces:**
- Produces: `starterRelayDoors() -> RelayDoorV0[]`.
- Every call returns clones so callers cannot mutate the canonical catalog.

- [ ] **Step 1: Re-check owner-source evidence before writing fixtures**

Read current versions of:

```text
README.md
CONTRIBUTING.md
the-pet-sitter-featured-story-seed/README.md
the-static-collective/the-haunted-toaster README.md
```

Record `verified_at` using the execution date and preserve owner-local status wording.

Exact source URLs:

```text
https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/the-pet-sitter-featured-story-seed/README.md
https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/README.md
https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/CONTRIBUTING.md
https://github.com/the-static-collective/the-haunted-toaster/blob/main/README.md
```

Current 2026-10-01 baseline:
- Pet Sitter: featured original story seed; concept / not screenplay.
- Front Room / Leave a Trace: public orientation and low-friction contribution surfaces.
- Haunted Toaster: README says BETA 0.0.0 is carried by draft PR #275 and `main` remains authority.

If these facts changed, update the catalog copy to the current evidence rather than preserving this baseline.

- [ ] **Step 2: Write failing catalog tests**

The first screen must expose exactly three starter doors:

```text
pet-sitter.continue-one-beat
front-room.repair-one-doorway
haunted-toaster.witness-one-claim
```

Tests assert for each:
- at least one public source URL;
- explicit owner;
- `verified_at`;
- local text input only;
- min length `1`;
- max length no greater than `1200`;
- no account requirement;
- no upload requirement;
- no network/external mutation permission;
- human selection authority / no crossing authority.

- [ ] **Step 3: Run RED**

```bash
node --test tests/relay-garden-catalog.test.mjs
```

Expected: FAIL because catalog does not exist.

- [ ] **Step 4: Implement the catalog**

Starter intent:

1. **Continue The Pet Sitter** — make one bounded story beat from the featured seed.
2. **Repair one doorway** — name one confusion or wording repair in the Front Room/Leave a Trace surfaces.
3. **Witness one Haunted Toaster claim** — write one concrete test, question, or edge case against the current public product claim; this does not run or alter the Toaster.

Each door must say plainly that the local make does not edit or publish to the owning repository.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/relay-garden-catalog.test.mjs
npm test
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add orchard/src/relay-garden/catalog.mjs orchard/tests/relay-garden-catalog.test.mjs
git commit -m "feat(orchard): add relay garden starter doors"
```

---

### Task 5: Persist the local world and export a portable receipt bundle

**Files:**
- Create: `orchard/src/relay-garden/bundle.mjs`
- Create: `orchard/tests/relay-garden-bundle.test.mjs`

**Interfaces:**
- Produces:
  - `createRelayBundle(session, options?) -> RelayBundleV0`
  - `parseRelayBundle(jsonText) -> { ok: true, bundle } | { ok: false, error, raw }`
  - `loadRelayBundle(storage, key?) -> LoadResult`
  - `saveRelayBundle(storage, bundle, key?) -> void`
- Default storage key: `static-collective.relay-garden.v0`.
- Schema: `relay-garden.bundle/v0`.

- [ ] **Step 1: Write failing persistence tests**

Prove:

```text
round-trip preserves receipts and chance sets
reload does not auto-select or auto-cross a door
unknown bundle schema fails closed
malformed JSON returns raw text and does not delete the stored value
corrupt local state never changes publication disposition
saving a later generation preserves all earlier receipts
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/relay-garden-bundle.test.mjs
```

Expected: FAIL.

- [ ] **Step 3: Implement bundle helpers**

Use the browser `Storage` shape only (`getItem` / `setItem`), so tests can use a tiny in-memory fake.

Do not automatically clear unreadable data.

- [ ] **Step 4: Run GREEN**

```bash
node --test tests/relay-garden-bundle.test.mjs
npm test
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add orchard/src/relay-garden/bundle.mjs orchard/tests/relay-garden-bundle.test.mjs
git commit -m "feat(orchard): persist relay garden local history"
```

---

### Task 6: Build the stranger-facing Relay Garden surface

**Files:**
- Create: `orchard/relay-garden/index.html`
- Create: `orchard/relay-garden/app.mjs`
- Create: `orchard/relay-garden/styles.css`
- Create: `orchard/tests/relay-garden-browser-contract.test.mjs`
- Modify: `orchard/README.md`

**Interfaces:**
- Browser imports Relay Garden functions from `../src/index.mjs`.
- Required DOM IDs:
  - `starter-doors`
  - `active-door`
  - `cross-button`
  - `make-form`
  - `make-body`
  - `publication-disposition`
  - `receipt-panel`
  - `chance-set`
  - `trace-panel`
  - `leave-button`
  - `export-button`
  - `status-line`

- [ ] **Step 1: Write failing browser-contract tests**

Static contract tests must prove:

```text
headline contains "We made this. Now you get to make something."
first screen has no more than five starter-door mount points and uses the three catalog doors
select and cross are separate controls/states
make form is unavailable before crossing
publication copy says proposal/disposition and not publication success
receipt view contains "That changed the world a little."
next-door view contains "What can exist now"
provenance/trace is one gesture away
there is an explicit Leave action with no penalty/streak copy
app contains no fetch, XMLHttpRequest, WebSocket, EventSource, or remote script URL
user artifact body is rendered through textContent/DOM text nodes, never assigned to innerHTML
```

- [ ] **Step 2: Run RED**

```bash
node --test tests/relay-garden-browser-contract.test.mjs
```

Expected: FAIL because the public surface does not exist.

- [ ] **Step 3: Implement the public flow**

Exact visible sequence:

```text
WE MADE THIS. NOW YOU GET TO MAKE SOMETHING.
  -> choose one starter door
  -> show selection
  -> CROSS THIS DOOR
  -> reveal one text maker
  -> MAKE
  -> THAT CHANGED THE WORLD A LITTLE.
  -> receipt
  -> WHAT CAN EXIST NOW
  -> 1..3 selectable next doors
```

A generated next door re-enters the exact same selection/crossing/make loop.

Default publication disposition is `local_only`. The selector may offer all four v0 dispositions, but the UI must say none of them publishes from this page.

Persist after every successful state mutation. Export downloads the full bundle as JSON.

If stored state is corrupt, show a HOLD message and offer a separate “Start a fresh local garden” action; do not erase stored raw data automatically.

- [ ] **Step 4: Add minimal responsive/accessibility behavior**

Requirements:
- semantic buttons/labels;
- visible keyboard focus;
- no color-only truth state;
- touch targets usable on a narrow mobile viewport;
- `aria-live="polite"` status;
- source links open as ordinary links without being fetched by the app.

- [ ] **Step 5: Run GREEN**

```bash
node --test tests/relay-garden-browser-contract.test.mjs
npm test
npm run check
```

Expected: all tests PASS.

- [ ] **Step 6: Manual two-generation smoke**

Serve `orchard/` locally and verify:

```text
starter -> select -> cross -> make -> receipt -> generated door
generated door -> select -> cross -> make -> second receipt
reload -> both receipts still present
export -> JSON contains both generations
leave -> no streak, warning, or penalty
```

- [ ] **Step 7: Commit**

```bash
git add orchard/relay-garden orchard/README.md orchard/tests/relay-garden-browser-contract.test.mjs
git commit -m "feat(orchard): add relay garden public crossing"
```

---

### Task 7: Add hostile proof for authority, refusal, and recursion

**Files:**
- Modify: `orchard/tests/relay-garden-session.test.mjs`
- Modify: `orchard/tests/relay-garden-chances.test.mjs`
- Modify: `orchard/tests/relay-garden-bundle.test.mjs`
- Modify: `orchard/tests/relay-garden-browser-contract.test.mjs`

**Interfaces:** No new public API unless a failing test exposes a missing local invariant.

- [ ] **Step 1: Add adversarial tests**

Required hostile cases:

```text
a generated door carrying crossing_authority true is rejected
a publication_proposed receipt remains local
a refused publication still gets a next chance
an empty template table falls back to hold-and-name-gap
a caller cannot complete a make twice from one crossing
a restored bundle cannot resume a stale crossed state as an automatic act
HTML-looking body round-trips as inert text
contribution count/history length never enters selection or crossing checks
```

- [ ] **Step 2: Run RED**

```bash
cd orchard
npm test
```

Expected: at least one hostile assertion FAILS before the minimal hardening is added.

- [ ] **Step 3: Fix only the failing boundary**

Do not add social, ranking, AI generation, publication, auth, or server behavior.

- [ ] **Step 4: Run full GREEN**

```bash
npm test
npm run check
```

Expected: full ORCHARD suite PASS.

- [ ] **Step 5: Commit**

```bash
git add orchard/src orchard/tests
git commit -m "test(orchard): harden relay garden boundaries"
```

---

### Task 8: Make the surface publicly reachable without changing its authority

**Files:**
- Create: `.github/workflows/relay-garden-pages.yml`
- Modify: `README.md` only after deployment verification.
- Create: `evidence/relay-garden-001-public-opening.md`

**Interfaces:**
- Pages staging directory: `pages-out/`.
- Staging contains only `orchard/relay-garden/` and `orchard/src/` plus `.nojekyll`; tests, fixtures, CLI, and repository docs are not uploaded.
- Target path after deployment: `/relay-garden/`.
- Expected GitHub.com project-site URL shape: `https://the-static-collective.github.io/What-is-the-static-collective-/relay-garden/`.

- [ ] **Step 1: Add the Pages workflow**

Use the GitHub-documented current actions verified during planning:

```text
actions/checkout@v6
actions/setup-node@v7
actions/configure-pages@v5
actions/upload-pages-artifact@v4
actions/deploy-pages@v4
```

Build job:
- checkout;
- Node 22;
- `cd orchard && npm test && npm run check`;
- recreate `pages-out/`;
- copy `orchard/relay-garden/` to `pages-out/relay-garden/`;
- copy `orchard/src/` to `pages-out/src/`;
- create `pages-out/.nojekyll`;
- configure Pages;
- upload `pages-out/`.

The deployed `relay-garden/app.mjs` keeps its `../src/index.mjs` import, which resolves inside this staged layout.

Deploy job:
- depends on build;
- environment `github-pages`;
- permissions `pages: write`, `id-token: write`;
- deploy uploaded artifact.

- [ ] **Step 2: Verify repository Pages source**

GitHub Pages must use **GitHub Actions** as its publishing source.

If the connected surface cannot change that repository setting, stop the launch step here and report exactly this one required owner action. Do not add a Front Room “live” link until deployment is verified.

- [ ] **Step 3: Verify the live page**

Confirm the deployed URL loads the Relay Garden surface and that relative module imports resolve.

Record:
- deployment run URL/ID;
- exact commit SHA;
- public URL;
- verification date.

- [ ] **Step 4: Add the Front Room door**

Only after Step 3 succeeds, add one prominent entry in the Front Room 60-second table or immediate first-contact section:

```text
Make something -> Relay Garden
```

Do not expand the Front Room into an application shell.

- [ ] **Step 5: Write the dated opening witness**

`evidence/relay-garden-001-public-opening.md` must distinguish:
- what is executable;
- what is local-only;
- what is proposal-only;
- which three source doors were verified;
- exact deployment evidence;
- remaining limits;
- `MAKE != PUBLISH`;
- `PUBLIC != CANON`.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/relay-garden-pages.yml README.md evidence/relay-garden-001-public-opening.md
git commit -m "feat: open relay garden public crossing"
```

If Pages could not be enabled/verified, commit only the tested workflow and launch-readiness evidence; do not commit a false live link.

---

### Task 9: Stranger-path launch gate

**Files:**
- Modify: `evidence/relay-garden-001-public-opening.md` with observed results only.
- Modify product files only for defects demonstrated by the walkthrough.

**Interfaces:** Produces launch evidence, not new product semantics.

- [ ] **Step 1: Run the skeptical-stranger walkthrough**

Use one clean browser profile and enter from the Front Room.

Test the six suspicions from the spec:

```text
AI sludge
vaporware
inside joke
incomprehensible GitHub dump
unrelated experiment pile
overstated executability
```

For each, record only concrete confusion/evidence failures, not taste objections.

- [ ] **Step 2: Run the no-account first make**

From a clean browser:
- open Relay Garden;
- choose a starter;
- cross;
- enter ordinary text;
- make;
- inspect receipt;
- select a generated next door.

Expected: no sign-in, upload, or repository knowledge required.

- [ ] **Step 3: Run refusal and leave controls**

Create one `refused` publication disposition.

Expected:
- artifact still exists locally;
- receipt says refused;
- at least one local next door exists;
- nothing is published.

Use Leave.

Expected: no penalty, streak-loss copy, or notification pressure.

- [ ] **Step 4: Re-check source freshness**

Re-read the three source surfaces and update dated copy if anything moved between implementation start and launch.

- [ ] **Step 5: Run final verification**

```bash
cd orchard
npm test
npm run check
```

Expected: PASS on the exact launch head.

- [ ] **Step 6: Update opening witness**

Add the exact launch head SHA, test result, deployment result, and any residual fog. Never call a manual observation automated proof.

- [ ] **Step 7: Commit only if evidence changed**

```bash
git add evidence/relay-garden-001-public-opening.md
git commit -m "docs: record relay garden opening witness"
```

Do not create an empty commit.

---

## Execution Order and Review Gates

1. Tasks 1–3 establish the constitutional engine.
2. Task 4 pins real public starter sources.
3. Task 5 makes continuity durable without a server.
4. Task 6 creates the public human encounter.
5. Task 7 attacks authority and recursion failures.
6. Task 8 exposes the surface publicly only after deployment proof.
7. Task 9 performs the final skeptical-stranger gate.

Each task ends in a separately reviewable commit. A reviewer may reject a task without invalidating earlier accepted tasks.

## Completion Definition

The implementation is complete only when:

- the existing ORCHARD suite and all Relay Garden tests pass on the exact final head;
- a stranger can make one local artifact without an account;
- selection and crossing are visibly separate;
- every completed v0 make yields 1–3 selectable next doors;
- a generated door can be crossed only through a new explicit human cycle;
- refusal still yields lawful local possibility;
- no make is automatically published;
- no public visibility implies canon;
- the Front Room links only to a verified live surface;
- the dated opening witness names both evidence and remaining limits.
