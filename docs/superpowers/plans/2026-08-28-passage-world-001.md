# PASSAGE-WORLD-001 Cross-Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove, through independently owned receipts and one blind neutral coordinator, that two crossings with equal endpoints, payload, route destination, and visible destination surface can remain distinguishable solely because their lawful interior formation histories differ.

**Architecture:** Implementation is intentionally split by owner. The neutral repo freezes CASE/ORACLE and later compares pinned receipts; LOADOUT provides compile testimony; 3rdi provides observer-local projection testimony; ALEX binds substantive formation ancestry; LOADIN.STEAD routes opaquely; the neutral coordinator runs last and has no production authority. MEMENTO/UNDERSTORY is a post-green optional durability extension.

**Tech Stack:** Python 3 standard library, `unittest`, JSON/JSON Schema; Node.js + `node:test` only for the optional MEMENTO extension.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- No shared production `Passage` runtime or master ontology.
- `same payload != same occurrence`.
- `same occurrence surface != same formation`.
- `same endpoint != same passage`.
- `same route != same passage`.
- `same visible destination != same worldline`.
- `serialization != causality`.
- `projection != evidence`.
- `selection != support`.
- `support != authority`.
- `route != admit`.
- `admit != successful consequence`.
- Refusal/hold does not erase the crossing.
- Later correction/activation does not rewrite earlier formation.
- Raw UUID inequality alone cannot prove passage distinction.
- Narrative annotations cannot manufacture owner-issued formation ancestry.
- MEMENTO/UNDERSTORY is optional and begins only after the core blind proof is green.
- No owner adapter may read the neutral ORACLE.
- The blind coordinator may compare receipts but may not reconstruct owner semantics or perform side effects.

---

## Component Plan Map

Execute in this order:

1. `2026-08-28-passage-world-hostile-vector.md` — neutral CASE/ORACLE, policy, schemas, structural verifier.
2. `2026-08-28-passage-world-loadout-adapter.md` — reuse MORTAL-ACTOR compile binding; pressure same/child compile roads without authority expansion.
3. `2026-08-28-passage-world-3rdi-adapter.md` — produce ROAD-A and ROAD-B observer-local histories with materially different contact/decoder ancestry.
4. `2026-08-28-passage-world-alex-formation.md` — bind owner receipts into `passage_world.alex-formation/v0` and compute substantive `formation_basis_digest`.
5. `2026-08-28-passage-world-loadinstead-adapter.md` — prove both formations route to the same `door:R1` while preserving distinct `formation_ref` values.
6. `2026-08-28-passage-world-blind-proof.md` — pin real owner receipts, run the weak comparator blind, then open ORACLE and test controls/refused/held variants.
7. `2026-08-28-passage-world-understory-extension.md` — optional post-green MEMENTO durability/re-entry proof.

MORTAL-ACTOR prerequisite plans from PR #71 execute before the PASSAGE owner gates that consume their receipts. ALEX PR #23 or its merged successor is the prerequisite for LOADIN.STEAD.

---

### Task 1: Freeze the execution dependency graph

**Files:**
- Read: `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`
- Read: all six core component plans listed above.

**Interfaces:**
- Consumes: approved design + component plan contracts.
- Produces: exact execution order; no code.

- [ ] **Step 1: Verify prerequisites exist before owner work begins**

Run repository/PR checks proving these contracts are available on the chosen execution bases:

```text
mortal_actor.loadout-binding/v0
mortal_actor.3rdi-handoff/v0
alex.runtime/local-support-m0
loadinstead.route-proposal/v0
```

If a prerequisite is not landed, execute its already-written owner plan first. Do not reimplement it inside PASSAGE-WORLD.

- [ ] **Step 2: Record exact base commits in the execution log**

For every repository branch, record the 40-character commit SHA before the first RED commit. The execution log must contain concrete SHAs obtained from Git; no symbolic `latest`, `current`, or branch-only provenance is sufficient.

- [ ] **Step 3: Commit no code from this coordination task**

This task is satisfied by verified bases. Begin Gate A only after the bases are recorded.

---

### Task 2: Enforce RED-before-GREEN at every owner boundary

**Files:**
- Test files specified by each component plan.

**Interfaces:**
- Consumes: frozen CASE and owner-local prerequisite contracts.
- Produces: preserved failing test commits before production changes.

- [ ] **Step 1: For each component plan, commit its first failing owner-local test before production code**

Required sequence:

```text
Gate A vector contract RED -> vector data/verifier GREEN
Gate B LOADOUT conformance RED/compatibility -> GREEN
Gate C 3rdi road specimen RED -> GREEN
Gate D ALEX formation contract RED -> GREEN
Gate E LOADIN.STEAD conformance RED/compatibility -> GREEN
Gate F neutral coordinator RED -> GREEN
Gate H optional UNDERSTORY RED -> GREEN
```

- [ ] **Step 2: Do not convert a compatibility PASS into invented production work**

If Gate B or Gate E passes against existing owner APIs without runtime changes, keep the result as a conformance test/documentation slice. YAGNI: a green existing contract is not permission to add a wrapper.

---

### Task 3: Freeze the cross-plan interface vocabulary

**Files:**
- Test fixtures and receipt docs named in component plans.

**Interfaces:**
- Produces the following exact cross-plan names:

```text
LOADOUT:     mortal_actor.loadout-binding/v0
3rdi:        mortal_actor.3rdi-handoff/v0
ALEX:        passage_world.alex-formation/v0
LOADIN:      loadinstead.route-proposal/v0
DESTINATION: passage_world.synthetic-destination/v0
COORDINATOR: passage_world.coordinator-result/v0
```

- [ ] **Step 1: Use one exact payload reference**

Both primary roads use:

```text
payload_ref = payload:022100
```

- [ ] **Step 2: Use one exact route destination**

Both primary roads must produce:

```text
primary_door_ref = door:R1
surface_id = R1
```

- [ ] **Step 3: Use exact cross-bindings**

The blind proof must enforce:

```text
LOADOUT.projection_ref
  == 3rdi.projection_digest
  == ALEX.formation_basis.projection_digest

LOADOUT.evaluation_compile_id/digest
  == ALEX.formation_basis evaluation compile identity

ALEX.formation_id
  == LOADIN delivery_envelope.formation_ref
  == destination.formation_ref

ALEX.payload_ref
  == LOADIN delivery_envelope.payload_ref
  == destination.payload_ref
```

Any mismatch is a refusal, not evidence of passage distinctness.

---

### Task 4: Run the core proof only after owner evidence is independently green

**Files:**
- Execute: `docs/superpowers/plans/2026-08-28-passage-world-blind-proof.md`

**Interfaces:**
- Consumes: exact pinned owner receipts.
- Produces: sealed candidate result digest, then ORACLE comparison.

- [ ] **Step 1: Require primary ROAD-A/B conditions before blind run**

```text
source_surface equal
payload_ref equal
primary_door_ref equal
visible destination surface equal
formation_basis_digest different
```

Do not derive the fifth condition in the neutral repo; it must already be present as ALEX owner testimony.

- [ ] **Step 2: Seal candidate before ORACLE open**

The candidate runner must complete with all `/oracle/` reads blocked. Hash the result. Only the test harness may then load ORACLE.

- [ ] **Step 3: Require the full control family**

```text
primary roads              -> PASSAGE_DISTINCT
serialization noise        -> PASSAGE_EQUIVALENT
owner-declared ID noise    -> PASSAGE_EQUIVALENT
counterfeit formation      -> refusal
route coincidence          -> PASSAGE_DISTINCT
endpoint coincidence       -> PASSAGE_DISTINCT
payload mutation           -> CONTENT_DIFFERENCE
REFUSED destination        -> PASSAGE_DISTINCT + no consequence
HELD destination           -> PASSAGE_DISTINCT + no consequence
```

---

### Task 5: Finish with evidence-before-claim verification

**Files:**
- Create in core proof: `docs/passage-world-001-proof-receipt.md`

**Interfaces:**
- Consumes: exact test commands, owner commit SHAs, receipt digests, candidate result digest.
- Produces: bounded proof receipt.

- [ ] **Step 1: Run all repo-owned regression suites named in the component plans**

Do not replace owner tests with neutral tests.

- [ ] **Step 2: Verify neutral evidence packet integrity**

Run:

```bash
python3 -m unittest tests.test_passage_world_vector -v
python3 -m unittest tests.test_passage_world_coordinator -v
python3 -m unittest tests.test_passage_world_blind -v
python3 tools/verify_passage_world_vector.py specimens/passage-world-001
python3 tools/run_passage_world_blind.py --check
```

All commands must exit `0` on the exact proof head.

- [ ] **Step 3: State only the bounded conclusion**

The proof receipt may claim:

> The tested stack preserves materially different attributable crossing ancestry even when endpoint, payload, route destination, and visible destination surface coincide.

It may not claim every relation is a world, universal passage ontology, truth authority, or destination authority.

- [ ] **Step 4: Commit the proof receipt**

```bash
git add docs/passage-world-001-proof-receipt.md
git commit -m "docs: close PASSAGE-WORLD-001 proof"
```

## Execution Stop Line

Do not start the optional UNDERSTORY extension until the core proof receipt exists on a green exact head. A core failure is useful evidence; do not repair it by widening semantics across owners.