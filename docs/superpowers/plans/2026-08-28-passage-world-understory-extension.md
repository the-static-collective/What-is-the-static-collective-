# PASSAGE-WORLD-001 UNDERSTORY Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** After the core PASSAGE-WORLD proof is green, demonstrate that MEMENTO/UNDERSTORY can durably preserve ROAD-B contact/decoder/stance residue and later activate it as a new occurrence without rewriting the earlier historical cut.

**Architecture:** Build directly on MEMENTO PR #3's existing UNDERSTORY record families and Historical Imaginations machinery. The extension imports the already-proven ROAD-B owner receipts only as attributed source references, records one historical contact state, then records one later activation/decoder/stance descendant. Existing records remain byte-stable. MEMENTO does not become required for PASSAGE-WORLD core conformance and does not decide passage identity.

**Tech Stack:** Node.js, existing MEMENTO ESM scripts, `node:test`, JSON/Markdown records.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- Gate H starts only after the core blind proof is green.
- `old trace + new activation = new occurrence referencing old trace`.
- Later activation must never rewrite ROAD-B0 as if later decoder/stance state was already present.
- MEMENTO remains optional and non-authoritative for PASSAGE-WORLD.
- `3rdi projection != MEMENTO write != MEMENTO admission`.
- No passage-equivalence verdict belongs in MEMENTO.

---

## Target Repository and File Map

**Repo:** `the-static-collective/MEMENTO`, based on PR #3 or its merged successor.

- Create: `understory/contacts/contact-passage-road-b0-0001.json`
- Create: `understory/activations/activation-passage-road-b1-0001.json`
- Create: `understory/decoders/decoder-passage-road-b1-0001.json`
- Create: `understory/stances/stance-passage-road-b1-0001.json`
- Create: `historical-imaginations/instances/passage-road-b0/WORLD.md`
- Create: `historical-imaginations/instances/passage-road-b1/WORLD.md`
- Create: `historical-imaginations/edges/hi-edge-passage-road-b-reentry-0001.json`
- Modify: `historical-imaginations/registry.json`
- Create: `test/passage-world-understory.test.mjs`
- Modify: `docs/understory-historical-imaginations-receipt.md`

No new runtime module is planned unless the existing PR #3 APIs cannot represent the required descendant reference without mutation.

---

### Task 1: Freeze historical non-rewrite in RED

**Files:**
- Create: `test/passage-world-understory.test.mjs`

**Interfaces:**
- Consumes existing UNDERSTORY loaders/validators from `scripts/lib/understory.mjs` and Historical Imaginations helpers from `scripts/lib/historical-imaginations.mjs`.
- Produces a test expectation that ROAD-B0 remains byte-stable after ROAD-B1 activation is added.

- [ ] **Step 1: Write the failing historical-cut test**

Read the planned ROAD-B0 contact file and hash exact bytes:

```js
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');

const before = await readFile('understory/contacts/contact-passage-road-b0-0001.json');
const beforeDigest = sha256(before);
```

Then load ROAD-B1 activation/decoder/stance records and re-read ROAD-B0. Assert:

```js
assert.equal(sha256(after), beforeDigest);
assert.equal(JSON.parse(after).decoder_ref ?? null, null);
assert.equal(JSON.parse(after).stance_ref ?? null, null);
```

The exact field checks may use the established PR #3 schema names exposed by its record validator; do not add decoder/stance fields to the old contact merely for this test.

- [ ] **Step 2: Run RED**

```bash
node --test test/passage-world-understory.test.mjs
```

Expected: FAIL because the PASSAGE-WORLD UNDERSTORY records do not exist.

- [ ] **Step 3: Commit RED**

```bash
git add test/passage-world-understory.test.mjs
git commit -m "test: freeze passage UNDERSTORY non-rewrite"
```

---

### Task 2: Record ROAD-B0 contact as historical residue

**Files:**
- Create: `understory/contacts/contact-passage-road-b0-0001.json`
- Create: `historical-imaginations/instances/passage-road-b0/WORLD.md`
- Modify: `test/passage-world-understory.test.mjs`

- [ ] **Step 1: Create one contact through the existing record vocabulary**

Use the same required keys and schema version as `understory/contacts/contact-same-room-a0-0001.json`. Bind its source references to:

```text
PASSAGE-WORLD-001
ROAD-B0
3rdi projection digest for ROAD-B0
carrier-e2
```

Do not include any ROAD-B1 decoder or stance reference.

- [ ] **Step 2: Create the ROAD-B0 historical imagination instance**

`WORLD.md` states only what ROAD-B0 could lawfully hold: E2 contact exists; the later decoder/stance descendant does not yet exist at this cut.

- [ ] **Step 3: Validate**

```bash
node scripts/validate.mjs
node --test test/passage-world-understory.test.mjs
```

Expected: contact/ROAD-B0 assertions pass; activation assertions remain RED.

- [ ] **Step 4: Commit**

```bash
git add understory/contacts/contact-passage-road-b0-0001.json historical-imaginations/instances/passage-road-b0/WORLD.md test/passage-world-understory.test.mjs
git commit -m "feat: preserve ROAD-B0 contact residue"
```

---

### Task 3: Add ROAD-B1 as descendant activation, not mutation

**Files:**
- Create: `understory/activations/activation-passage-road-b1-0001.json`
- Create: `understory/decoders/decoder-passage-road-b1-0001.json`
- Create: `understory/stances/stance-passage-road-b1-0001.json`
- Create: `historical-imaginations/instances/passage-road-b1/WORLD.md`
- Create: `historical-imaginations/edges/hi-edge-passage-road-b-reentry-0001.json`
- Modify: `test/passage-world-understory.test.mjs`

- [ ] **Step 1: Create the activation record**

Use the exact schema/required fields established by `understory/activations/activation-same-room-a1-0001.json`. Its ancestry must point to the ROAD-B0 contact/association lineage and the later 3rdi ROAD-B1 projection receipt.

- [ ] **Step 2: Create decoder and stance descendants**

Use the exact record shapes from PR #3's existing decoder and stance specimens. Their source/formation refs point forward from the activation; no back-edit to the old contact is allowed.

- [ ] **Step 3: Create Historical Imaginations re-entry edge**

The edge links `passage-road-b0 -> passage-road-b1` and carries attributable source refs. It must not state that the two worlds are identical; the relation is historical re-entry/descendance under the existing allowed vocabulary.

- [ ] **Step 4: Test descendant-only knowledge**

Assert ROAD-B1 contains activation/decoder/stance refs, ROAD-B0 does not, and the original ROAD-B0 contact byte digest remains unchanged.

- [ ] **Step 5: Verify and commit**

```bash
node scripts/validate.mjs
node --test test/passage-world-understory.test.mjs
node --test

git add understory/activations understory/decoders understory/stances historical-imaginations/instances/passage-road-b1 historical-imaginations/edges/hi-edge-passage-road-b-reentry-0001.json test/passage-world-understory.test.mjs
git commit -m "feat: activate passage residue as descendant"
```

---

### Task 4: Register and document the optional extension

**Files:**
- Modify: `historical-imaginations/registry.json`
- Modify: `docs/understory-historical-imaginations-receipt.md`

- [ ] **Step 1: Add the two instance IDs and one edge to the existing registry shape**

Use the same sorted/order convention already enforced by MEMENTO validation. Do not create a new PASSAGE registry.

- [ ] **Step 2: Add the bounded conclusion**

Document:

```text
ROAD-B0 contact survived.
ROAD-B1 activated it through a new attributable occurrence.
The old cut did not gain hindsight.
```

Also state:

```text
MEMENTO durability != passage identity
MEMENTO re-entry != authority
core PASSAGE-WORLD conformance does not depend on this extension
```

- [ ] **Step 3: Run full verification**

```bash
npm test
npm run validate
```

If `package.json` exposes only `test` plus direct validation, run instead:

```bash
node --test
node scripts/validate.mjs
```

Use the commands actually present on the prerequisite branch and record them in the implementation receipt.

- [ ] **Step 4: Commit**

```bash
git add historical-imaginations/registry.json docs/understory-historical-imaginations-receipt.md
git commit -m "docs: receipt optional passage UNDERSTORY"
```

## Completion Gate

Gate H is complete when the later decoder/stance activation exists only as a descendant occurrence, the ROAD-B0 contact remains byte-identical and hindsight-free, repository validation stays green, and MEMENTO makes no claim about PASSAGE-WORLD equivalence or authority.