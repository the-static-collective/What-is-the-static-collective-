# PASSAGE-WORLD-001 ALEX Formation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give ALEX one bounded formation receipt that binds the exact LOADOUT compile testimony, 3rdi projection testimony, and ALEX derivation that formed a new occurrence, so equal payloads can retain different lawful formation ancestry without ALEX becoming a routing or passage-identity authority.

**Architecture:** Add `passage_world.alex-formation/v0` as an ALEX-owned receipt over already-produced owner testimonies. It validates cross-binding and computes a `formation_basis_digest` from substantive formation ancestry. The digest deliberately excludes the result occurrence ID and harness-only wrapper IDs, preventing raw identity noise from masquerading as formation difference. `formation_id` remains an exact carrier identity for the receipt itself. LOADIN.STEAD later carries `formation_ref` opaquely.

**Tech Stack:** Python 3 standard library, existing `alex_runtime.digests.sha256_json`, existing ALEX derivation/local-support machinery, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Prerequisites

- ALEX Gate 2 `RELATION-DERIVATION-001` is already on `main`.
- Execute/land `MORTAL-ACTOR-001 ALEX LOCAL-SUPPORT-001` before this plan, or provide an owner-equivalent result with the same frozen identity fields: `claim_id`, `cut_id`, `projection_digest`, `compile_id`, `compile_digest`, local disposition, and underlying derivation receipt.
- Execute/land the MORTAL LOADOUT and 3rdi handoff adapters so ALEX consumes owner testimony rather than recreating their semantics.

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on the prerequisite branches/merges.

- Create: `alex_runtime/passage_formation.py`
- Modify: `alex_runtime/__init__.py`
- Create: `tests/test_passage_formation.py`
- Create: `tests/fixtures/passage_world/formation-roads.json`
- Create: `docs/passage-world-001.md`

No routing, destination admission, or shared coordinator code belongs in ALEX.

---

### Task 1: Freeze the formation receipt contract in RED

**Files:**
- Create: `tests/test_passage_formation.py`
- Create: `tests/fixtures/passage_world/formation-roads.json`

**Interfaces:**

```python
def bind_passage_formation(
    *,
    road_id: str,
    loadout_binding: dict,
    projection_handoff: dict,
    local_support_result: dict,
    result_occurrence: dict,
) -> dict:
    ...
```

- [ ] **Step 1: Create ROAD-A and ROAD-B fixture inputs**

Each road contains:

```text
loadout_binding.schema = mortal_actor.loadout-binding/v0
projection_handoff.schema = mortal_actor.3rdi-handoff/v0
local_support_result.profile = alex.runtime/local-support-m0
result_occurrence = {id, payload_ref}
```

Both `result_occurrence.payload_ref` values equal `payload:022100`.

ROAD-A and ROAD-B use different lawful `projection_digest` and different attributable ALEX derivation/evidence ancestry. ROAD-B may use a child evaluation compile.

- [ ] **Step 2: Write RED happy-path assertions**

```python
formation_a = bind_passage_formation(**road_a)
formation_b = bind_passage_formation(**road_b)

self.assertEqual(formation_a["schema"], "passage_world.alex-formation/v0")
self.assertEqual(formation_b["schema"], "passage_world.alex-formation/v0")
self.assertEqual(formation_a["payload_ref"], formation_b["payload_ref"])
self.assertNotEqual(
    formation_a["formation_basis_digest"],
    formation_b["formation_basis_digest"],
)
self.assertFalse(formation_a["authority_transferred"])
self.assertFalse(formation_b["authority_transferred"])
```

- [ ] **Step 3: Prove occurrence ID alone cannot change basis digest**

Clone ROAD-A and change only `result_occurrence.id`. Require:

```python
self.assertEqual(
    original["formation_basis_digest"],
    renamed_occurrence["formation_basis_digest"],
)
self.assertNotEqual(original["formation_id"], renamed_occurrence["formation_id"])
```

This preserves exact occurrence identity while preventing it from being mistaken for substantive formation difference.

- [ ] **Step 4: Write RED cross-binding failures**

Require exact reason fragments for:

```text
LOADOUT_BINDING_INVALID
PROJECTION_HANDOFF_INVALID
LOCAL_SUPPORT_RESULT_INVALID
PROJECTION_BINDING_MISMATCH
COMPILE_BINDING_MISMATCH
CUT_BINDING_MISMATCH
RESULT_OCCURRENCE_INVALID
LOCAL_SUPPORT_NOT_FORMED
```

`LOCAL_SUPPORT_NOT_FORMED` covers `basis_outside_projection`, unresolved, counterpressured, or mismatch outcomes. The first passage proof uses only results actually formed through an accepted local basis.

- [ ] **Step 5: Run RED and commit**

```bash
python3 -m unittest tests.test_passage_formation -v
```

Expected: FAIL because `alex_runtime.passage_formation` does not exist.

```bash
git add tests/test_passage_formation.py tests/fixtures/passage_world/formation-roads.json
git commit -m "test: freeze passage formation receipt"
```

---

### Task 2: Implement strict owner-receipt cross-binding

**Files:**
- Create: `alex_runtime/passage_formation.py`
- Modify: `alex_runtime/__init__.py`
- Test: `tests/test_passage_formation.py`

- [ ] **Step 1: Validate minimal owner shapes only**

Require LOADOUT binding fields:

```text
schema
projection_ref
evaluation_compile_id
evaluation_compile_digest
authority_expanded == false
side_effect_executed == false
```

Require 3rdi handoff fields:

```text
schema
projection_digest
cut_id
observer
visible_occurrence_ids
contact_ids
attention_event_ids
decoder_application_ids
stance_ids
```

Require local-support fields:

```text
profile
claim_id
cut_id
projection_digest
compile_id
compile_digest
local_disposition
receipt_survivors
```

Do not re-evaluate projection visibility or support semantics here.

- [ ] **Step 2: Enforce exact cross-bindings**

For the PASSAGE fixture, require:

```python
loadout_binding["projection_ref"] == projection_handoff["projection_digest"]
local_support_result["projection_digest"] == projection_handoff["projection_digest"]
local_support_result["cut_id"] == projection_handoff["cut_id"]
local_support_result["compile_id"] == loadout_binding["evaluation_compile_id"]
local_support_result["compile_digest"] == loadout_binding["evaluation_compile_digest"]
```

Any mismatch refuses before formation hashing.

- [ ] **Step 3: Require an actually formed local result**

For v0 require:

```text
local_disposition == local_basis_accept
```

and an underlying derivation evaluation with `disposition == ACCEPT` plus non-empty `conclusion_assertion_id`.

This does not mean globally true; it means the occurrence's declared research-side formation was locally lawful.

- [ ] **Step 4: Run focused tests**

```bash
python3 -m unittest tests.test_passage_formation -v
```

Expected: shape/binding cases pass; digest tests may remain RED until Task 3.

- [ ] **Step 5: Commit**

```bash
git add alex_runtime/passage_formation.py alex_runtime/__init__.py tests/test_passage_formation.py
git commit -m "feat: bind passage owner receipts"
```

---

### Task 3: Compute substantive formation basis separately from carrier identity

**Files:**
- Modify: `alex_runtime/passage_formation.py`
- Test: `tests/test_passage_formation.py`

- [ ] **Step 1: Define the exact substantive basis payload**

Build:

```python
basis = {
    "entry_compile_id": loadout_binding["entry_compile_id"],
    "entry_compile_digest": loadout_binding["entry_compile_digest"],
    "evaluation_compile_id": loadout_binding["evaluation_compile_id"],
    "evaluation_compile_digest": loadout_binding["evaluation_compile_digest"],
    "projection_digest": projection_handoff["projection_digest"],
    "cut_id": projection_handoff["cut_id"],
    "observer": projection_handoff["observer"],
    "contact_ids": sorted(projection_handoff["contact_ids"]),
    "attention_event_ids": sorted(projection_handoff["attention_event_ids"]),
    "decoder_application_ids": sorted(projection_handoff["decoder_application_ids"]),
    "stance_ids": sorted(projection_handoff["stance_ids"]),
    "claim_id": local_support_result["claim_id"],
    "derivation_evaluation_id": local_support_result["derivation"]["evaluation"]["evaluation_id"],
    "derivation_ruleset_digest": local_support_result["derivation"]["evaluation"]["ruleset_digest"],
    "derivation_input_ids": sorted(local_support_result["derivation"]["evaluation"]["input_ids"]),
    "conclusion_assertion_id": local_support_result["derivation"]["evaluation"]["conclusion_assertion_id"],
}
```

Do not include `road_id`, `result_occurrence.id`, harness nonce, route ID, destination ID, or narrative annotations.

- [ ] **Step 2: Hash the basis with the existing ALEX digest helper**

```python
formation_basis_digest = sha256_json(basis)
```

- [ ] **Step 3: Emit the exact receipt**

Return:

```python
receipt = {
    "schema": "passage_world.alex-formation/v0",
    "road_id": road_id,
    "result_occurrence_id": result_occurrence["id"],
    "payload_ref": result_occurrence["payload_ref"],
    "formation_basis": basis,
    "formation_basis_digest": formation_basis_digest,
    "authority_transferred": False,
    "admission_status": "NOT_ATTEMPTED",
}
receipt["formation_id"] = sha256_json(receipt)
```

- [ ] **Step 4: Add serialization-noise control**

Shuffle input list/member order while preserving semantic lists. Require identical `formation_basis_digest`.

- [ ] **Step 5: Add substantive mutation controls**

Independently change a lawful projection digest, decoder application identity, evaluation compile digest, or derivation input basis. Recompute valid owner receipts and require `formation_basis_digest` to change.

- [ ] **Step 6: Verify GREEN**

```bash
python3 -m unittest tests.test_passage_formation -v
python3 -m unittest tests.test_local_support_profile -v
python3 -m unittest tests.test_derivation_kernel -v
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add alex_runtime/passage_formation.py tests/test_passage_formation.py
git commit -m "feat: receipt substantive passage formation"
```

---

### Task 4: Prove no semantic inflation or authority leakage

**Files:**
- Modify: `tests/test_passage_formation.py`
- Create: `docs/passage-world-001.md`

- [ ] **Step 1: Add forbidden-key scan**

The top-level formation receipt must not contain:

```text
truth
canon
admitted
destination
route
passage_verdict
same_passage
```

It may carry `admission_status: NOT_ATTEMPTED` only as an explicit negative boundary.

- [ ] **Step 2: Prove same payload through two lawful bases remains distinguishable**

ROAD-A and ROAD-B must both pass owner validation and carry identical `payload_ref`, while `formation_basis_digest` differs.

This is ALEX's core PASSAGE-WORLD contribution.

- [ ] **Step 3: Document**

Use:

```text
ALEX receipts how this result became supportable.
It does not decide where the result goes or whether two passages are globally identical.
```

State that `formation_basis_digest` is a scoped research-formation witness, not universal identity.

- [ ] **Step 4: Full suite and commit**

```bash
python3 -m unittest discover -s tests -v

git add tests/test_passage_formation.py docs/passage-world-001.md
git commit -m "docs: define ALEX passage formation boundary"
```

## Completion Gate

Gate D is complete when ALEX can bind the exact compile/projection/derivation ancestry for two same-payload result occurrences, substantive formation changes alter `formation_basis_digest`, cosmetic occurrence identity alone does not, and the receipt carries zero routing/admission/passage-equivalence authority.