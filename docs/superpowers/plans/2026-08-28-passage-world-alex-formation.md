# PASSAGE-WORLD-001 ALEX Formation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give ALEX one bounded formation receipt that binds exact LOADOUT compile testimony, 3rdi projection testimony, and ALEX derivation for a new occurrence, so equal payloads can retain different lawful formation ancestry without ALEX becoming routing or passage-identity authority.

**Architecture:** Add `passage_world.alex-formation/v0` as an ALEX-owned receipt over already-produced owner testimonies. It validates cross-binding and computes `formation_basis_digest` from substantive formation ancestry. The digest excludes result occurrence ID and harness-only wrapper IDs, preventing raw identity noise from masquerading as formation difference. `formation_id` remains exact carrier identity and is later carried opaquely as LOADIN.STEAD `formation_ref`.

**Tech Stack:** Python 3 standard library, existing `alex_runtime.digests.sha256_json`, ALEX derivation/local-support machinery, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- ALEX Gate 2 `RELATION-DERIVATION-001` remains unchanged.
- Prerequisite: MORTAL-ACTOR `LOCAL-SUPPORT-001` or owner-equivalent exact local-support receipt with `claim_id`, `cut_id`, `projection_digest`, `compile_id`, `compile_digest`, local disposition, and derivation receipt.
- Prerequisite: MORTAL LOADOUT and 3rdi handoff receipts; ALEX consumes them rather than recreating owner semantics.
- `projection != evidence`; `selection != support`; `support != authority`.
- Same payload through different lawful evidence/projection ancestry must remain distinguishable.
- Result occurrence ID alone may change exact carrier identity but must not change `formation_basis_digest`.
- Serialization/member ordering must not mint causal history.
- Interest/selection may affect support only through attributable changed evidence/formation.
- No route, destination, admission, consequence, global-truth, or passage-equivalence semantics belong in this receipt.
- `admission_status` remains `NOT_ATTEMPTED`; `authority_transferred` remains `False`.

---

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on prerequisite branches/merges.

- Create: `alex_runtime/passage_formation.py`
- Modify: `alex_runtime/__init__.py`
- Create: `tests/test_passage_formation.py`
- Create: `tests/fixtures/passage_world/formation-roads.json`
- Create: `docs/passage-world-001.md`

---

### Task 1: Freeze the formation receipt contract

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

Each road contains exact owner receipts:

```text
loadout_binding.schema = mortal_actor.loadout-binding/v0
projection_handoff.schema = mortal_actor.3rdi-handoff/v0
local_support_result.profile = alex.runtime/local-support-m0
result_occurrence = {id, payload_ref}
```

Both result occurrences use `payload_ref = payload:022100`. ROAD-A/B use materially different lawful projection/derivation ancestry; ROAD-B may use a child evaluation compile.

- [ ] **Step 2: Write RED happy path**

```python
formation_a = bind_passage_formation(**road_a)
formation_b = bind_passage_formation(**road_b)

self.assertEqual(formation_a["schema"], "passage_world.alex-formation/v0")
self.assertEqual(formation_b["schema"], "passage_world.alex-formation/v0")
self.assertEqual(formation_a["payload_ref"], formation_b["payload_ref"])
self.assertNotEqual(formation_a["formation_basis_digest"], formation_b["formation_basis_digest"])
self.assertFalse(formation_a["authority_transferred"])
self.assertFalse(formation_b["authority_transferred"])
```

- [ ] **Step 3: Write occurrence-ID noise control**

Clone ROAD-A and change only `result_occurrence.id`. Require equal `formation_basis_digest` but different exact `formation_id`.

- [ ] **Step 4: Write RED binding failures**

Require stable reason codes:

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

**Interfaces:**
- Produces: validated owner binding before hashing.

- [ ] **Step 1: Validate minimal owner shapes**

Require LOADOUT:

```text
schema
projection_ref
evaluation_compile_id
evaluation_compile_digest
authority_expanded == false
side_effect_executed == false
```

Require 3rdi:

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

Require local-support:

```text
profile
claim_id
cut_id
projection_digest
compile_id
compile_digest
local_disposition
receipt_survivors
derivation
```

- [ ] **Step 2: Enforce exact binding equations**

```python
if loadout_binding["projection_ref"] != projection_handoff["projection_digest"]:
    raise ValueError("PROJECTION_BINDING_MISMATCH")
if local_support_result["projection_digest"] != projection_handoff["projection_digest"]:
    raise ValueError("PROJECTION_BINDING_MISMATCH")
if local_support_result["cut_id"] != projection_handoff["cut_id"]:
    raise ValueError("CUT_BINDING_MISMATCH")
if local_support_result["compile_id"] != loadout_binding["evaluation_compile_id"]:
    raise ValueError("COMPILE_BINDING_MISMATCH")
if local_support_result["compile_digest"] != loadout_binding["evaluation_compile_digest"]:
    raise ValueError("COMPILE_BINDING_MISMATCH")
```

- [ ] **Step 3: Require a locally formed result**

For v0 require `local_disposition == "local_basis_accept"`, underlying derivation evaluation `disposition == "ACCEPT"`, and non-empty `conclusion_assertion_id`. Otherwise raise `LOCAL_SUPPORT_NOT_FORMED`.

This is not a global-truth claim; it is an exact formation condition for the research-side occurrence.

- [ ] **Step 4: Run focused tests and commit**

```bash
python3 -m unittest tests.test_passage_formation -v
```

Expected: shape/binding tests pass; digest tests remain RED until Task 3.

```bash
git add alex_runtime/passage_formation.py alex_runtime/__init__.py tests/test_passage_formation.py
git commit -m "feat: bind passage owner receipts"
```

---

### Task 3: Separate substantive formation basis from carrier identity

**Files:**
- Modify: `alex_runtime/passage_formation.py`
- Test: `tests/test_passage_formation.py`

**Interfaces:**
- Produces: `formation_basis_digest: str`, `formation_id: str`.

- [ ] **Step 1: Build the exact basis payload**

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

- [ ] **Step 2: Hash basis and exact receipt**

```python
formation_basis_digest = sha256_json(basis)
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
return receipt
```

- [ ] **Step 3: Add serialization-noise control**

Shuffle input JSON/member/list order where semantics are set-like and require equal `formation_basis_digest` after explicit sorting.

- [ ] **Step 4: Add substantive mutation controls**

Independently change a valid projection digest, decoder application identity, evaluation compile digest, or derivation input basis. Require `formation_basis_digest` to change.

- [ ] **Step 5: Verify GREEN and commit**

```bash
python3 -m unittest tests.test_passage_formation -v
python3 -m unittest tests.test_local_support_profile -v
python3 -m unittest tests.test_derivation_kernel -v
```

Expected: PASS.

```bash
git add alex_runtime/passage_formation.py tests/test_passage_formation.py
git commit -m "feat: receipt substantive passage formation"
```

---

### Task 4: Prove no semantic inflation

**Files:**
- Modify: `tests/test_passage_formation.py`
- Create: `docs/passage-world-001.md`

**Interfaces:**
- Produces bounded docs plus negative-key proof.

- [ ] **Step 1: Add forbidden-key scan**

```python
for forbidden in {
    "truth", "canon", "admitted", "destination", "route",
    "passage_verdict", "same_passage"
}:
    self.assertNotIn(forbidden, recursive_keys(formation))
```

The explicit negative field `admission_status = NOT_ATTEMPTED` is allowed; no positive admission field is.

- [ ] **Step 2: Prove same payload/different lawful bases**

ROAD-A and ROAD-B must both pass owner validation, carry identical `payload_ref`, and have different `formation_basis_digest` values.

- [ ] **Step 3: Document owner boundary**

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

Gate D is complete when ALEX binds exact compile/projection/derivation ancestry for two same-payload result occurrences, substantive formation changes alter `formation_basis_digest`, cosmetic occurrence identity alone does not, and the receipt carries zero routing/admission/passage-equivalence authority.