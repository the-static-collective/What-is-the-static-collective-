# PASSAGE-WORLD-001 3rdi Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce two independently valid observer-local projection receipts for the same source/destination experiment such that ROAD-A and ROAD-B differ materially in lawful epistemic formation while 3rdi remains a pure projection organ.

**Architecture:** Build after 3rdi PR #3 and the MORTAL-ACTOR 3rdi adapter. Reuse `compile_cut()` and `mortal_actor.3rdi-handoff/v0`; do not create a PASSAGE ontology inside 3rdi. The PASSAGE-specific specimen holds the source field stable while ROAD-A uses direct evidence availability/contact and ROAD-B reaches the same eventual token through a later carrier contact plus decoder/stance descendant history.

**Tech Stack:** Python 3 standard library, existing 3rdi reference kernel, `unittest`, JSON specimens.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Prerequisites

- 3rdi PR #3 or equivalent owner-approved epistemic trace support: `contacts`, `attention_events`, `decoder_applications`, `stances`, and observer-local compilation.
- MORTAL-ACTOR 3rdi handoff plan, so the owner can export a compact projection identity without semantic support verdicts.

## Target Repository and File Map

**Repo:** `the-static-collective/3rdi`, based on the prerequisite branches/merges above.

- Create: `specimens/passage-world-001.json`
- Create: `tests/test_passage_world_projection.py`
- Modify: `skills/3rdi/scripts/run_labs.py`
- Create: `skills/3rdi/references/passage-world.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

No new production projection algorithm is planned.

---

### Task 1: Freeze the two lawful apertures in RED

**Files:**
- Create: `specimens/passage-world-001.json`
- Create: `tests/test_passage_world_projection.py`

- [ ] **Step 1: Create one field with two cuts over one carrier world**

Use stable IDs:

```text
field_id: passage-world-001
occurrences:
  source-room-r0
  evidence-e1
  carrier-e2
  token-formation-point
  destination-room-r1
cuts:
  ROAD-A
  ROAD-B0
  ROAD-B1
```

ROAD-A must lawfully expose `evidence-e1` and include an attributable contact before the token-formation point.

ROAD-B0 must withhold `evidence-e1` and expose `carrier-e2`. It has a contact with `carrier-e2` but not the later decoder result.

ROAD-B1 is a descendant knowledge cut that preserves the ROAD-B0 contact and adds an attributable decoder application plus stance over `carrier-e2`.

The underlying occurrence identities stay fixed across cuts.

- [ ] **Step 2: Write RED projection assertions**

```python
road_a = compile_cut(field, "ROAD-A")
road_b0 = compile_cut(field, "ROAD-B0")
road_b1 = compile_cut(field, "ROAD-B1")

self.assertNotEqual(road_a["projection_digest"], road_b1["projection_digest"])
self.assertNotIn("evidence-e1", ids(road_b0["observer_view"]["occurrences"]))
self.assertIn("evidence-e1", ids(road_a["observer_view"]["occurrences"]))
```

Require ROAD-B0's epistemic trace to contain the E2 contact but no decoder application; ROAD-B1 must preserve that contact and add the decoder/stance descendants.

- [ ] **Step 3: Assert no hindsight rewrite**

Serialize ROAD-B0 observer output and assert no ROAD-B1 decoder projection ref appears anywhere in it.

- [ ] **Step 4: Run RED**

```bash
python3 -m unittest tests.test_passage_world_projection -v
```

Expected before prerequisite compilation support exists: FAIL at the missing epistemic-trace output. Do not weaken the specimen to avoid that dependency.

- [ ] **Step 5: Commit the specimen/test first**

```bash
git add specimens/passage-world-001.json tests/test_passage_world_projection.py
git commit -m "test: freeze PASSAGE-WORLD 3rdi roads"
```

---

### Task 2: Export ROAD-A and ROAD-B through the existing MORTAL handoff

**Files:**
- Modify: `tests/test_passage_world_projection.py`

- [ ] **Step 1: Use real compiled receipts**

```python
handoff_a = mortal_actor_handoff(compile_cut(field, "ROAD-A"))
handoff_b = mortal_actor_handoff(compile_cut(field, "ROAD-B1"))
```

Require:

```text
handoff_a.schema == mortal_actor.3rdi-handoff/v0
handoff_b.schema == mortal_actor.3rdi-handoff/v0
projection_digest A != B
field_id A == B
observer/cut identities preserved
```

- [ ] **Step 2: Prove substantive ancestry differs, not just IDs**

Require ROAD-A handoff to carry contact ancestry for E1 and ROAD-B handoff to carry contact + decoder + stance ancestry for E2.

Assert the sets are materially different after removing harness-only IDs:

```python
self.assertNotEqual(
    normalized_epistemic_signature(handoff_a),
    normalized_epistemic_signature(handoff_b),
)
```

`normalized_epistemic_signature()` belongs in the test only; do not add a universal equivalence helper to 3rdi.

- [ ] **Step 3: Prove availability alone does not become contact**

Add a visible distractor occurrence to both cuts without contact. It may appear in `visible_occurrence_ids`; it must not appear in `contact_ids`.

- [ ] **Step 4: Verify**

```bash
python3 -m unittest tests.test_passage_world_projection -v
python3 -m unittest tests.test_mortal_actor_handoff -v
python3 -m unittest tests.test_projection -v
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add tests/test_passage_world_projection.py
git commit -m "test: expose distinct lawful passage apertures"
```

---

### Task 3: Add a deterministic PASSAGE-WORLD lab without payload semantics

**Files:**
- Modify: `skills/3rdi/scripts/run_labs.py`

- [ ] **Step 1: Add `run_passage_world_lab()`**

The lab returns only:

```json
{
  "id": "PASSAGE-WORLD-3RDI-001",
  "status": "pass",
  "road_a_projection_digest": "sha256:...",
  "road_b_projection_digest": "sha256:...",
  "same_field": true,
  "road_a_direct_contact": true,
  "road_b_decoder_descendant": true,
  "road_b0_not_rewritten": true
}
```

Do not include the final token payload, route destination, ALEX support, or PASSAGE verdict.

- [ ] **Step 2: Register the lab and verify**

```bash
python3 skills/3rdi/scripts/run_labs.py --check
python3 -m unittest discover -s tests -v
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add skills/3rdi/scripts/run_labs.py
git commit -m "test: add PASSAGE-WORLD 3rdi lab"
```

---

### Task 4: Document the 3rdi ownership boundary

**Files:**
- Create: `skills/3rdi/references/passage-world.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

- [ ] **Step 1: Add the reference**

Use:

```text
3rdi witnesses how the aperture differed.
It does not decide whether the resulting crossings are identical.
```

Preserve:

```text
availability != contact
contact != attention
decoder != projection
projection difference != passage difference by itself
projection != evidence != authority
```

- [ ] **Step 2: Record the consumer contract**

State that PASSAGE-WORLD may compare exact `projection_digest` plus the handoff's attributable epistemic identity lists. It may not infer hidden observer state from absent events.

- [ ] **Step 3: Full verification and commit**

```bash
python3 -m unittest discover -s tests -v
python3 skills/3rdi/scripts/run_labs.py --check

git add skills/3rdi/references/passage-world.md skills/3rdi/references/receipt-contract.md
git commit -m "docs: define 3rdi passage boundary"
```

## Completion Gate

Gate C is complete when one stable field yields two lawful, reproducible projection histories with materially different contact/decoder ancestry, ROAD-B0 remains historically untouched by ROAD-B1, and 3rdi has made no claim about support, routing, admission, or passage identity.