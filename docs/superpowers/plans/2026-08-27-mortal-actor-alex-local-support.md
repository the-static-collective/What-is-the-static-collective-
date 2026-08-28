# MORTAL-ACTOR-001 ALEX LOCAL-SUPPORT-001 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a bounded ALEX evaluation profile that determines whether an existing attributable SUPPORTS derivation is locally supportable from one exact 3rdi projection under one exact LOADOUT evaluation compile, while preserving global truth, authority, admission, and consequence as separate questions.

**Architecture:** `LOCAL-SUPPORT-001` is a wrapper/profile over the existing relation-derivation kernel, not a new semantic predicate. It validates compile identity, projection identity, and local evidence availability first. If the required attributable evidence basis crosses outside the projection, it returns `basis_outside_projection` without evaluating that unavailable basis as though the actor possessed it. If the basis is locally available, it delegates semantic derivation to the unchanged `evaluate_relation_case()` kernel and records the underlying ALEX disposition. Every result preserves exact claim/run binding fields needed by the neutral blind harness. The private oracle is never an input.

**Tech Stack:** Python 3 standard library, existing `alex_runtime.derivation`, existing `alex_runtime.handshake`, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-27-mortal-actor-001-common-stack-design.md`

## Global Constraints

- `GLOBALLY SUPPORTED != LOCALLY SUPPORTABLE`.
- `LOCAL-SUPPORT-001` is an evaluation profile, not a new `SUPPORTS`-like predicate.
- Existing `RELATION-DERIVATION-001` semantics stay unchanged.
- ALEX consumes attributable 3rdi projection testimony; it does not reconstruct observer availability from global records.
- ALEX validates the exact LOADOUT evaluation compile; compile selection itself is not evidence.
- Global truth is not an input to local support evaluation.
- A locally supportable claim may later prove globally false.
- Relevance edges do not silently mint semantic support.
- Display order does not silently mint causal precedence.
- Every result preserves `claim_id`, `cut_id`, `projection_digest`, and evaluation `compile_id` as top-level identity fields.
- `ACCEPT` remains evaluator disposition only; it is not authority, canon, admission, publication, or side effect.

---

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on current `main` after any non-conflicting prerequisite merges.

- Modify: `alex_runtime/derivation.py`
- Create: `alex_runtime/local_support.py`
- Modify: `alex_runtime/__init__.py`
- Create: `tests/test_local_support_profile.py`
- Create: `tests/fixtures/mortal_actor_local_support.json`
- Create: `docs/local-support-001.md`

No changes to 3rdi or LOADOUT packages occur in this plan.

---

### Task 1: Expose one narrow attributable-evidence-path helper

**Files:**
- Modify: `alex_runtime/derivation.py`
- Modify: `tests/test_derivation_kernel.py`

**Interfaces:**

```python
def matching_evidence_path(
    given: dict,
    *,
    source_id: str,
    claim_id: str,
) -> dict | None:
```

- [ ] **Step 1: Write RED helper tests**

Use existing derivation fixtures and assert:

```python
path = matching_evidence_path(given, source_id="evidence:E1", claim_id="claim:C1")
self.assertEqual(path["status"], "ATTRIBUTABLE")
```

Add a malformed path whose `basis_ids` reference a missing record; assert helper returns `None`. Add an attention/breadcrumb chain without an attributable evidence path; assert helper returns `None`.

- [ ] **Step 2: Run RED**

```bash
python3 -m unittest tests.test_derivation_kernel -v
```

Expected: FAIL because the public helper is not defined.

- [ ] **Step 3: Promote the existing private matcher without changing semantics**

Refactor the current `_matching_evidence_path()` so the public function computes `record_ids = set(_records_by_id(given))` internally and then performs the exact existing checks. Keep a private compatibility wrapper if that minimizes churn inside `evaluate_relation_case()`.

Do not broaden what counts as attributable evidence.

- [ ] **Step 4: Run regression tests**

```bash
python3 -m unittest tests.test_derivation_kernel -v
python3 -m unittest tests.test_derivation_profile -v
python3 -m unittest tests.test_derivation_adapter -v
```

Expected: PASS with no derivation outcome changes.

- [ ] **Step 5: Commit**

```bash
git add alex_runtime/derivation.py tests/test_derivation_kernel.py
git commit -m "refactor: expose attributable evidence lookup"
```

---

### Task 2: Freeze LOCAL-SUPPORT-001 shape and hostile boundary cases in RED

**Files:**
- Create: `tests/test_local_support_profile.py`
- Create: `tests/fixtures/mortal_actor_local_support.json`

**Interfaces:**

```python
def evaluate_local_support_case(case: dict) -> dict:
    ...
```

Input profile:

```text
operation_type = local_support
rule_profile = alex.runtime/local-support-m0
```

`given` contains:

```text
records
evidence_paths
relations
projection_handoff
evaluation_compile
```

`attempt` contains:

```text
claim_id
expected_projection_digest
expected_evaluation_compile_id
expected_evaluation_compile_digest
relation_proposal
evaluation_id
execution_step_id
conclusion_assertion_id
```

The normal ALEX relation-proposal fields inside `relation_proposal` remain exactly those consumed by `evaluate_relation_case()`.

- [ ] **Step 1: Create fixture cases**

Use one JSON catalog with cases:

```text
local-red-note-a0-outside
local-red-note-r0-accept
local-door-n0-accept-but-oracle-unknown
local-mirror-a0-unresolved
local-chime-r0-unresolved
local-red-note-a1-accept
compile-mismatch
projection-mismatch
router-selection-not-evidence
relevance-not-support
```

Each case's `attempt.claim_id` is one of the neutral vector IDs `Q1`–`Q5`. The fixture contains no oracle/global truth field.

- [ ] **Step 2: Write RED outcome tests**

Expected local result object exposes exact neutral-harness identity:

```python
result = evaluate_local_support_case(case)
self.assertEqual(result["profile"], "alex.runtime/local-support-m0")
self.assertEqual(result["rule_id"], "LOCAL-SUPPORT-001")
self.assertEqual(result["claim_id"], case["attempt"]["claim_id"])
self.assertEqual(result["cut_id"], case["given"]["projection_handoff"]["cut_id"])
self.assertEqual(
    result["projection_digest"],
    case["given"]["projection_handoff"]["projection_digest"],
)
self.assertEqual(
    result["compile_id"],
    case["given"]["evaluation_compile"]["compile_id"],
)
self.assertIn(result["local_disposition"], {
    "local_basis_accept",
    "local_basis_counterpressured",
    "local_basis_unresolved",
    "basis_outside_projection",
    "compile_mismatch",
    "projection_mismatch",
})
```

For `local-red-note-a0-outside`, require:

```python
self.assertEqual(result["local_disposition"], "basis_outside_projection")
self.assertEqual(result["missing_local_basis_ids"], ["red-note-placed"])
self.assertIsNone(result["derivation"])
```

For `local-red-note-r0-accept`, require underlying derivation disposition `ACCEPT` and a normal `SUPPORTS` conclusion assertion.

- [ ] **Step 3: Reject ambiguous/missing claim identity**

Blank or missing `attempt.claim_id` must return an `INSUFFICIENT_TO_TEST`-equivalent profile result with `local_disposition == "local_basis_unresolved"` and reason code `CLAIM_ID_REQUIRED`; do not infer a neutral claim ID from the ALEX object ID.

- [ ] **Step 4: Write no-authority tests**

Recursively assert result keys do not include:

```text
authority
canon
admitted
publication
execute
side_effect
truth
global_truth
```

The result may carry `compile_id`, `projection_digest`, `cut_id`, local basis IDs, and derivation receipt only.

- [ ] **Step 5: Run RED and commit**

```bash
python3 -m unittest tests.test_local_support_profile -v
```

Expected: FAIL because `alex_runtime.local_support` does not exist.

```bash
git add tests/test_local_support_profile.py tests/fixtures/mortal_actor_local_support.json
git commit -m "test: freeze LOCAL-SUPPORT-001 profile"
```

---

### Task 3: Implement compile/projection/claim identity gates

**Files:**
- Create: `alex_runtime/local_support.py`
- Modify: `alex_runtime/__init__.py`
- Test: `tests/test_local_support_profile.py`

**Interfaces:**

```python
LOCAL_SUPPORT_PROFILE = "alex.runtime/local-support-m0"
LOCAL_SUPPORT_RULE_ID = "LOCAL-SUPPORT-001"
LOCAL_SUPPORT_RULE_VERSION = 1

def evaluate_local_support_case(case: dict) -> dict:
```

- [ ] **Step 1: Add minimal shape helpers**

Use private helpers for non-empty strings and sorted unique IDs. Do not introduce a generic schema framework.

Require projection handoff:

```text
schema = mortal_actor.3rdi-handoff/v0
projection_digest
field_id
cut_id
observer
visible_occurrence_ids[]
```

Require evaluation compile to pass existing `validate_compile_record()`.

- [ ] **Step 2: Gate neutral claim identity explicitly**

Read `attempt.claim_id` as an opaque cross-stack request ID. It is not the same thing as the ALEX claim-record `object_id`. If absent/blank, return `local_basis_unresolved` with reason `CLAIM_ID_REQUIRED`, no derivation, and whatever projection/compile identities are validly available. Never derive it from list order or object text.

- [ ] **Step 3: Validate expected binding fields**

If projection digest differs from `attempt.expected_projection_digest`, return `projection_mismatch` with no semantic derivation.

If compile ID/digest differs from `attempt.expected_evaluation_compile_id` / `expected_evaluation_compile_digest`, or compile validation fails, return `compile_mismatch` with no semantic derivation.

- [ ] **Step 4: Freeze the common result identity fields for every disposition**

Use one result constructor so all outcomes preserve:

```python
{
    "profile": LOCAL_SUPPORT_PROFILE,
    "rule_id": LOCAL_SUPPORT_RULE_ID,
    "rule_version": LOCAL_SUPPORT_RULE_VERSION,
    "claim_id": attempt.get("claim_id"),
    "cut_id": projection.get("cut_id"),
    "observer": projection.get("observer"),
    "projection_digest": projection.get("projection_digest"),
    "compile_id": evaluation_compile.get("compile_id"),
    "compile_digest": evaluation_compile.get("compile_digest"),
    "local_disposition": ...,
    "reason_code": ...,
    "required_local_basis_ids": [...],
    "missing_local_basis_ids": [...],
    "derivation": ...,
    "receipt_survivors": [...],
}
```

Do not omit identity fields merely because a mismatch/refusal occurs; where a supplied value is invalid, preserve the supplied reference while the disposition explains the mismatch.

- [ ] **Step 5: Preserve receipt survivors**

When IDs exist, include:

```python
"receipt_survivors": [
    f"projection:{projection_digest}",
    f"compile:{compile_id}",
    f"compile_digest:{compile_digest}",
    f"claim_request:{claim_id}",
    f"relation_proposal:{proposal_id}",
]
```

Do not copy hidden 3rdi occurrences into the result.

- [ ] **Step 6: Run identity tests**

```bash
python3 -m unittest tests.test_local_support_profile -v
```

Expected: mismatch/identity cases pass; semantic cases may still fail until Task 4.

- [ ] **Step 7: Commit**

```bash
git add alex_runtime/local_support.py alex_runtime/__init__.py tests/test_local_support_profile.py
git commit -m "feat: gate local support by exact receipts"
```

---

### Task 4: Enforce local evidence basis before semantic derivation

**Files:**
- Modify: `alex_runtime/local_support.py`
- Test: `tests/test_local_support_profile.py`

**Interfaces:**
- Consumes: `matching_evidence_path()` and `evaluate_relation_case()`.
- Produces: local profile disposition plus optional unchanged derivation result.

- [ ] **Step 1: Locate the existing attributable support path**

Extract proposal `subject_id` and `object_id`, then:

```python
path = matching_evidence_path(
    given,
    source_id=proposal["subject_id"],
    claim_id=proposal["object_id"],
)
```

If no path exists, do **not** invent one. Delegate once to `evaluate_relation_case()` so existing ALEX counterpressure such as `ATTENTION_NOT_SUPPORT` remains visible, then map non-accepting/insufficient outcomes to `local_basis_counterpressured` or `local_basis_unresolved` while preserving the exact underlying reason code.

- [ ] **Step 2: Compute the required local record basis**

Take only record IDs from `path["basis_ids"]`; exclude the evidence-path ID itself because that is an ALEX derivation artifact, not an observer-world occurrence. Require each record basis ID to appear in `projection_handoff["visible_occurrence_ids"]`.

```python
missing = sorted(set(path["basis_ids"]) - set(projection["visible_occurrence_ids"]))
```

If `missing` is non-empty, return:

```python
{
    ...,
    "local_disposition": "basis_outside_projection",
    "required_local_basis_ids": sorted(path["basis_ids"]),
    "missing_local_basis_ids": missing,
    "derivation": None,
}
```

Do not run semantic derivation over the unavailable evidence.

- [ ] **Step 3: Delegate locally available cases to the existing kernel**

If all required record basis IDs are visible, call `evaluate_relation_case()` using the unchanged case records/evidence paths/proposal. The local profile does not filter or rewrite evidence contents after the local gate passes; it merely proves the actor was lawfully able to possess the declared basis.

Map:

```text
underlying ACCEPT -> local_basis_accept
underlying REFUSE -> local_basis_counterpressured
underlying INSUFFICIENT_TO_TEST -> local_basis_unresolved
```

Preserve the complete underlying derivation result under `derivation`.

- [ ] **Step 4: Prove locally acceptable can be globally false**

The `local-door-n0-accept-but-oracle-unknown` test must pass `local_basis_accept` with no global-truth input anywhere in the case or evaluator result. This is the explicit proof that local supportability does not collapse into truth.

- [ ] **Step 5: Prove relevance and router selection do not mint support**

`relevance-not-support` includes a visible relevance edge in the 3rdi handoff but no attributable ALEX evidence path; expect counterpressured/unresolved, never accept.

`router-selection-not-evidence` includes a LOADOUT capability binding whose name references the red note but no attributable ALEX evidence record/path; expect unresolved, never accept.

- [ ] **Step 6: Run GREEN**

```bash
python3 -m unittest tests.test_local_support_profile -v
python3 -m unittest tests.test_derivation_kernel -v
python3 -m unittest tests.test_derivation_profile -v
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add alex_runtime/local_support.py tests/test_local_support_profile.py
git commit -m "feat: add observer-local support gate"
```

---

### Task 5: Prove temporal/worldline non-rewrite across A0 -> A1

**Files:**
- Modify: `tests/fixtures/mortal_actor_local_support.json`
- Modify: `tests/test_local_support_profile.py`

**Interfaces:**
- Same claim `Q5`, same room locus upstream, different projection digest/cut and supportability.

- [ ] **Step 1: Add paired A0/A1 cases**

Both use neutral `attempt.claim_id == "Q5"`, subject `red-note-placed`, and object `claim-a-can-now-identify-note`.

A0 projection handoff excludes `red-note-placed`; expect `basis_outside_projection`.

A1 projection handoff includes `red-note-placed`; use evaluation compile `C1`; expect `local_basis_accept`.

- [ ] **Step 2: Assert A1 never mutates A0 output**

Evaluate A0, deep-copy result, evaluate A1, then assert the original A0 result is byte-for-byte equal to the saved copy after canonical JSON serialization.

- [ ] **Step 3: Add same-room/different-worldline assertions**

The profile result must preserve `projection_digest`, `cut_id`, and `compile_id`; assert A0/A1 projection digests and cut IDs differ, and A1 uses `C1`, even though the neutral fixture documents the same room locus.

- [ ] **Step 4: Run tests and commit**

```bash
python3 -m unittest tests.test_local_support_profile -v

git add tests/fixtures/mortal_actor_local_support.json tests/test_local_support_profile.py
git commit -m "test: preserve mortal epistemic worldlines"
```

---

### Task 6: Document LOCAL-SUPPORT-001 and run the full ALEX floor

**Files:**
- Create: `docs/local-support-001.md`
- Modify: `alex_runtime/__init__.py` only if final public constants/functions need export adjustment.

**Interfaces:**
- Documentation only; no authority expansion.

- [ ] **Step 1: Write the profile contract**

Use the seal:

```text
ALEX keeps the point of view from becoming counterfeit knowledge.
```

Document:

```text
GLOBAL SUPPORT != LOCAL SUPPORTABILITY
projection visibility != evidence support
local supportability != truth
support != belief
support != authority
ACCEPT != admission
```

State that the profile only gates an existing attributable `SUPPORTS` derivation by exact observer-local basis availability.

- [ ] **Step 2: Document reason/outcome mapping and identity contract**

List v0 profile outcomes:

```text
local_basis_accept
local_basis_counterpressured
local_basis_unresolved
basis_outside_projection
compile_mismatch
projection_mismatch
```

State they are profile dispositions, not semantic predicates. Document that `claim_id`, `cut_id`, `projection_digest`, `compile_id`, and `compile_digest` are cross-stack receipt identity only; none is evidence by itself.

- [ ] **Step 3: Run full suite**

```bash
python3 -m unittest discover -s tests -v
```

Expected: every existing ALEX/Crucible/LOADOUT test plus LOCAL-SUPPORT tests passes.

- [ ] **Step 4: Commit**

```bash
git add docs/local-support-001.md alex_runtime/__init__.py
git commit -m "docs: define LOCAL-SUPPORT-001"
```

---

## Acceptance Gate

This plan is complete when the same global claim can produce different local-support outcomes under different lawful projections, every result binds exact claim/cut/projection/compile identity, a locally accepted derivation can remain globally false, A0 remains unchanged after A1 becomes knowledgeable, and no result field implies authority or consequence.

The final cross-stack proof is then performed by feeding LOADOUT binding + 3rdi handoff + ALEX local-support results into the neutral verifier and comparing only at that final harness to the private oracle.