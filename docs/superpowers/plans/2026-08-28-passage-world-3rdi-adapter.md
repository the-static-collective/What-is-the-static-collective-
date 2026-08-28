# PASSAGE-WORLD-001 3rdi Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce two independently valid observer-local projection receipts over one synthetic carrier world such that ROAD-A and ROAD-B differ materially in lawful epistemic formation while 3rdi remains pure projection.

**Architecture:** Build after 3rdi PR #3 and the MORTAL-ACTOR 3rdi adapter. Reuse `compile_cut()` plus `mortal_actor.3rdi-handoff/v0`; do not create a PASSAGE ontology inside 3rdi. ROAD-A uses direct evidence availability/contact; ROAD-B reaches its later formation through a carrier contact followed by decoder/stance descendant history.

**Tech Stack:** Python 3 standard library, existing 3rdi reference kernel, `unittest`, JSON specimens.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- Prerequisite: 3rdi PR #3 or equivalent owner-approved support for `contacts`, `attention_events`, `decoder_applications`, `stances`, and observer-local compilation.
- Prerequisite: MORTAL-ACTOR 3rdi handoff plan, producing `mortal_actor.3rdi-handoff/v0`.
- `occurrence != availability != attention != relevance`.
- `available != encountered`; exposure alone never synthesizes contact.
- Decoder/stance changes create descendant projection history; they do not rewrite the earlier cut.
- `projection != source != evidence != authority`.
- 3rdi does not evaluate SUPPORTS, truth, routing, admission, or passage equivalence.
- Projection digest remains owned by `compile_cut()`.
- Projection difference alone does not prove passage difference.
- No hidden state outside the lawful projection may leak into ROAD-A or ROAD-B output.

---

## Target Repository and File Map

**Repo:** `the-static-collective/3rdi`, based on the prerequisites above.

- Create: `specimens/passage-world-001.json`
- Create: `tests/test_passage_world_projection.py`
- Modify: `skills/3rdi/scripts/run_labs.py`
- Create: `skills/3rdi/references/passage-world.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

No new production projection algorithm is scheduled.

---

### Task 1: Freeze the two lawful apertures

**Files:**
- Create: `specimens/passage-world-001.json`
- Create: `tests/test_passage_world_projection.py`

**Interfaces:**
- Consumes: `compile_cut(field: dict, cut_id: str) -> dict`.
- Produces: projection receipts for `ROAD-A`, `ROAD-B0`, `ROAD-B1`.

- [ ] **Step 1: Create one field with stable occurrence identity**

Use:

```text
field_id = passage-world-001
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

ROAD-A lawfully exposes `evidence-e1` and includes an attributable contact before `token-formation-point`.

ROAD-B0 withholds `evidence-e1`, exposes `carrier-e2`, and contains attributable contact with E2 but no later decoder result.

ROAD-B1 is a descendant knowledge cut preserving ROAD-B0 contact and adding an attributable decoder application plus stance over E2.

- [ ] **Step 2: Write projection tests**

```python
road_a = compile_cut(field, "ROAD-A")
road_b0 = compile_cut(field, "ROAD-B0")
road_b1 = compile_cut(field, "ROAD-B1")

self.assertNotEqual(road_a["projection_digest"], road_b1["projection_digest"])
self.assertIn("evidence-e1", visible_ids(road_a))
self.assertNotIn("evidence-e1", visible_ids(road_b0))
self.assertIn("carrier-e2", visible_ids(road_b0))
```

ROAD-B0 epistemic trace contains E2 contact but no decoder application. ROAD-B1 preserves that contact and adds decoder/stance descendants.

- [ ] **Step 3: Write no-hindsight-rewrite test**

```python
road_b0_json = json.dumps(road_b0, sort_keys=True)
self.assertNotIn("decoder-road-b1", road_b0_json)
self.assertNotIn("stance-road-b1", road_b0_json)
```

- [ ] **Step 4: Run RED/compatibility gate**

```bash
python3 -m unittest tests.test_passage_world_projection -v
```

Expected before epistemic-trace prerequisite exists: FAIL at the missing trace support. Expected after prerequisite: PASS if existing compilation is sufficient.

- [ ] **Step 5: Commit**

```bash
git add specimens/passage-world-001.json tests/test_passage_world_projection.py
git commit -m "test: freeze PASSAGE-WORLD 3rdi roads"
```

---

### Task 2: Export both roads through the existing MORTAL handoff

**Files:**
- Modify: `tests/test_passage_world_projection.py`

**Interfaces:**
- Consumes: `mortal_actor_handoff(receipt: dict) -> dict`.
- Produces: two `mortal_actor.3rdi-handoff/v0` receipts.

- [ ] **Step 1: Generate handoffs from real compiled receipts**

```python
handoff_a = mortal_actor_handoff(compile_cut(field, "ROAD-A"))
handoff_b = mortal_actor_handoff(compile_cut(field, "ROAD-B1"))

self.assertEqual(handoff_a["schema"], "mortal_actor.3rdi-handoff/v0")
self.assertEqual(handoff_b["schema"], "mortal_actor.3rdi-handoff/v0")
self.assertEqual(handoff_a["field_id"], handoff_b["field_id"])
self.assertNotEqual(handoff_a["projection_digest"], handoff_b["projection_digest"])
```

- [ ] **Step 2: Prove substantive epistemic ancestry differs**

In the test only, define:

```python
def epistemic_signature(handoff):
    return {
        "contacts": tuple(sorted(handoff["contact_ids"])),
        "attention": tuple(sorted(handoff["attention_event_ids"])),
        "decoders": tuple(sorted(handoff["decoder_application_ids"])),
        "stances": tuple(sorted(handoff["stance_ids"])),
    }
```

Require `epistemic_signature(handoff_a) != epistemic_signature(handoff_b)`.

ROAD-A must include E1 contact ancestry. ROAD-B must include E2 contact plus decoder/stance ancestry.

- [ ] **Step 3: Prove visibility does not synthesize contact**

Add one visible distractor to both cuts with no contact event. Require it in `visible_occurrence_ids` and absent from any contact ancestry mapping/ID.

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

### Task 3: Add a deterministic 3rdi lab

**Files:**
- Modify: `skills/3rdi/scripts/run_labs.py`

**Interfaces:**
- Produces: `run_passage_world_lab() -> dict` with projection-only diagnostics.

- [ ] **Step 1: Write lab test/registration first**

Require the registered lab result to contain only:

```python
{
    "id": "PASSAGE-WORLD-3RDI-001",
    "status": "pass",
    "road_a_projection_digest": road_a["projection_digest"],
    "road_b_projection_digest": road_b["projection_digest"],
    "same_field": True,
    "road_a_direct_contact": True,
    "road_b_decoder_descendant": True,
    "road_b0_not_rewritten": True,
}
```

It must not expose final token payload, route destination, ALEX support, or passage verdict.

- [ ] **Step 2: Run RED**

```bash
python3 skills/3rdi/scripts/run_labs.py --check
```

Expected: FAIL because the lab is not registered.

- [ ] **Step 3: Implement `run_passage_world_lab()` using the specimen/compiler only**

No ALEX or LOADIN import is allowed.

- [ ] **Step 4: Run GREEN**

```bash
python3 skills/3rdi/scripts/run_labs.py --check
python3 -m unittest discover -s tests -v
```

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add skills/3rdi/scripts/run_labs.py
git commit -m "test: add PASSAGE-WORLD 3rdi lab"
```

---

### Task 4: Document the owner boundary

**Files:**
- Create: `skills/3rdi/references/passage-world.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

**Interfaces:**
- Produces documentation only.

- [ ] **Step 1: Write the reference**

Use:

```text
3rdi witnesses how the aperture differed.
It does not decide whether the resulting crossings are identical.
```

Document:

```text
availability != contact
contact != attention
decoder != projection
projection difference != passage difference by itself
projection != evidence != authority
```

- [ ] **Step 2: State the consumer contract**

PASSAGE-WORLD may consume exact `projection_digest` and the handoff's attributable epistemic identity lists. It may not infer hidden observer state from absent events.

- [ ] **Step 3: Verify and commit**

```bash
python3 -m unittest discover -s tests -v
python3 skills/3rdi/scripts/run_labs.py --check

git add skills/3rdi/references/passage-world.md skills/3rdi/references/receipt-contract.md
git commit -m "docs: define 3rdi passage boundary"
```

## Completion Gate

Gate C is complete when one stable field yields two lawful, reproducible projection histories with materially different contact/decoder ancestry, ROAD-B0 remains historically untouched by ROAD-B1, and 3rdi has made no claim about support, routing, admission, or passage identity.