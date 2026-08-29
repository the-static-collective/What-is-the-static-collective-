# MORTAL-NARRATIVE-001 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Gate E as a neutral Novelist-facing application profile that rejects counterfeit character knowledge, preserves lawful error and dramatic irony, and proves the behavior against the existing `FOUR WITNESSES / ONE ROOM` mortal stack.

**Architecture:** Keep `LOADOUT → 3rdi → ALEX` unchanged. Add a pure neutral adapter under `adapters/novelist/` that consumes already-formed receipts and emits only narrative application dispositions. Add a hostile narrative specimen and blind proof runner that reuse Gate D and compose the exact pinned constituent commits without creating a shared production runtime.

**Tech Stack:** Python 3.12 standard library, `unittest`, JSON fixtures, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md`

## Global Constraints

- The implementation worktree starts from Gate-D proof head `709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6` (`feat/mortal-actor-001-blind-proof`, PR #77). If that head moves before execution, inspect the new diff and re-establish compatibility before editing.
- Keep the constituent proof commits pinned unless a separate reviewed change deliberately updates them:
  - 3rdi: `04781217996622cf3e8d151d845c64772189b17d`
  - LOADOUT: `08048efba661242d07b489240d237a6d1544e747`
  - ALEX LOCAL-SUPPORT-001: `61acaee2d6f56c66431c00fb1720590f6c5c4e21`
- Do not create a shared runtime. `adapters/novelist/` consumes receipt dictionaries only and must not import `three_rdi`, `skills.loadout`, or `alex_runtime`.
- Do not modify LOADOUT, 3rdi, ALEX, MEMENTO, or eCODE semantics in Gate E.
- MEMENTO durability is optional and out of scope. eCODE admission through `H` is out of scope.
- Neither neutral adapter nor CASE runner opens an oracle. Oracle access exists only in `score_case` after the completed CASE receipt exists.
- `reader knowledge != narrator knowledge != character knowledge`; reader/narrator-only material cannot validate a character formation or drive a character action.
- `local_basis_accept != global truth`; a locally attributable false belief must remain narratively admissible.
- `narrative_admissible`, `reroute_required`, and `narrative_unresolved` are the only creative dispositions. None means truth, canon, admission, publication, side-effect permission, or authority.
- Malformed schema or exact identity mismatch is an input error, not a creative reroute.
- A reroute creates a new beat with `parent_beat_id`; the failed candidate remains immutable and attributable.
- Formation validation proves local provenance and exact claim/mode binding as declared. It does not infer semantic truth from a 3rdi stance ID and does not turn a formation receipt into evidence.
- The render guard is structured and deterministic in v0. Do not add NLP/prose parsing.
- No implementation PR is merged as part of executing this plan.

## Execution Bootstrap

After reading `superpowers:using-git-worktrees`, create an isolated branch from Gate D:

```bash
git worktree add ../mortal-narrative-001 -b feat/mortal-narrative-001 709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6
cd ../mortal-narrative-001
git fetch origin design/mortal-narrative-001 plan/mortal-narrative-001
mkdir -p docs/superpowers/specs docs/superpowers/plans
git show origin/design/mortal-narrative-001:docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md > docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md
git show origin/plan/mortal-narrative-001:docs/superpowers/plans/2026-08-28-mortal-narrative-001.md > docs/superpowers/plans/2026-08-28-mortal-narrative-001.md
git add docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md docs/superpowers/plans/2026-08-28-mortal-narrative-001.md
git commit -m "docs: carry approved Gate E design and plan"
```

Before Task 1, confirm `git diff 709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6 -- adapters tools specimens tests .github` shows no runtime changes from the documentation bootstrap.

## File Structure

- `adapters/novelist/__init__.py` — public Gate-E exports.
- `adapters/novelist/formation.py` — local formation validation.
- `adapters/novelist/evaluator.py` — four-mode beat evaluation.
- `adapters/novelist/render_guard.py` — structured render-state guard.
- `specimens/mortal-narrative-001/README.md` — laws, matrix, commands.
- `specimens/mortal-narrative-001/manifest.json` — vector references.
- `specimens/mortal-narrative-001/case/beat-templates.json` — stable beat templates.
- `specimens/mortal-narrative-001/case/formation-templates.json` — stable formation templates.
- `specimens/mortal-narrative-001/case/render-templates.json` — stable render templates; exact actor/cut/digest identity is materialized at runtime.
- `specimens/mortal-narrative-001/oracle/private-oracle.json` — expected Gate-E outcomes only.
- `tools/verify_mortal_narrative_vector.py` — fixture verifier.
- `tools/run_mortal_narrative_blind_proof.py` — blind CASE + post-CASE scoring.
- `tests/test_mortal_narrative_vector.py`
- `tests/test_mortal_narrative_formation.py`
- `tests/test_mortal_narrative_evaluator.py`
- `tests/test_mortal_narrative_render_guard.py`
- `tests/test_mortal_narrative_blind.py`
- `.github/workflows/mortal-narrative-001.yml`

---

### Task 1: Freeze `THE PERFECT SCENE THAT CHEATS`

**Files:** all files under `specimens/mortal-narrative-001/`, plus `tools/verify_mortal_narrative_vector.py` and `tests/test_mortal_narrative_vector.py`.

**Interfaces:** consumes Gate-D run IDs `MA-A-A0`, `MA-R-R0`, `MA-N-N0`, `MA-A-A1` and Q1–Q5; produces stable templates for later exact-identity materialization.

- [ ] **Step 1: Write failing vector tests**

Use these exact expected outcomes:

```python
EXPECTED = {
    "E1": "reroute_required",
    "E2": "narrative_admissible",
    "E3": "narrative_admissible",
    "E4": "reroute_required",
    "E5": "narrative_admissible",
    "E6": "narrative_unresolved",
    "E7": "narrative_unresolved",
    "E8": "narrative_admissible",
}
EXPECTED_RENDER = {"R1": "fail", "R2": "pass", "R3": "fail", "R4": "fail"}
```

Tests must assert E1/E2 share `proposed_action == "open-north-door"`, E2 has `parent_beat_id == "E1"`, E2 has no epistemic uses and has non-epistemic drivers, E3 uses `MA-A-A1`, and E5 references `BELIEF-N-Q2`.

Mutation tests reject: E2 missing ancestry, E2 action changed, E2 drivers removed, duplicate beat IDs, BELIEF-N-Q2 rebound away from Q2, either N0 formation ref removed, R1 no longer escalating GUESS→KNOW, R3/R4 no longer using `character-action-basis`, oracle under `case/`, or actor vector ref changed away from `../mortal-actor-001`.

- [ ] **Step 2: Run and confirm the RED state**

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
```

Expected: FAIL because the vector/verifier does not exist.

- [ ] **Step 3: Create the exact vector data**

`manifest.json`:

```json
{
  "schema": "mortal_narrative.vector/v0",
  "vector_id": "THE-PERFECT-SCENE-THAT-CHEATS-001",
  "actor_vector_ref": "../mortal-actor-001",
  "beat_templates_ref": "case/beat-templates.json",
  "formation_templates_ref": "case/formation-templates.json",
  "render_templates_ref": "case/render-templates.json",
  "oracle_ref": "oracle/private-oracle.json"
}
```

`beat-templates.json`:

```json
{
  "schema": "mortal_narrative.beat-templates/v0",
  "beats": [
    {"beat_id":"E1","parent_beat_id":null,"run_id":"MA-A-A0","dramatic_destination":"open the north door","epistemic_uses":[{"claim_id":"Q5","requested_mode":"KNOW","formation_receipt_id":null}],"non_epistemic_drivers":[],"proposed_action":"open-north-door","proposed_consequence":"north-door-opens"},
    {"beat_id":"E2","parent_beat_id":"E1","run_id":"MA-A-A0","dramatic_destination":"open the north door","epistemic_uses":[],"non_epistemic_drivers":[{"kind":"pressure","ref":"clock-running"},{"kind":"wager","ref":"deliberate-gamble"}],"proposed_action":"open-north-door","proposed_consequence":"north-door-opens"},
    {"beat_id":"E3","parent_beat_id":null,"run_id":"MA-A-A1","dramatic_destination":"identify the note and act on it","epistemic_uses":[{"claim_id":"Q5","requested_mode":"KNOW","formation_receipt_id":null}],"non_epistemic_drivers":[],"proposed_action":"identify-red-note","proposed_consequence":"note-identity-recognized"},
    {"beat_id":"E4","parent_beat_id":null,"run_id":"MA-A-A0","dramatic_destination":"act on the reader-visible note fact","epistemic_uses":[{"claim_id":"Q1","requested_mode":"KNOW","formation_receipt_id":null}],"non_epistemic_drivers":[],"proposed_action":"act-as-if-note-was-known","proposed_consequence":null},
    {"beat_id":"E5","parent_beat_id":null,"run_id":"MA-N-N0","dramatic_destination":"act on the lamp interpretation","epistemic_uses":[{"claim_id":"Q2","requested_mode":"BELIEVE","formation_receipt_id":"BELIEF-N-Q2"}],"non_epistemic_drivers":[],"proposed_action":"treat-door-as-unlocked","proposed_consequence":null},
    {"beat_id":"E6","parent_beat_id":null,"run_id":"MA-R-R0","dramatic_destination":"suspect the red-note author","epistemic_uses":[{"claim_id":"Q3","requested_mode":"SUSPECT","formation_receipt_id":null}],"non_epistemic_drivers":[],"proposed_action":"voice-author-suspicion","proposed_consequence":null},
    {"beat_id":"E7","parent_beat_id":null,"run_id":"MA-R-R0","dramatic_destination":"claim one chime caused the other","epistemic_uses":[{"claim_id":"Q4","requested_mode":"KNOW","formation_receipt_id":null}],"non_epistemic_drivers":[],"proposed_action":"assert-chime-causality","proposed_consequence":null},
    {"beat_id":"E8","parent_beat_id":null,"run_id":"MA-A-A0","dramatic_destination":"choose north without knowing","epistemic_uses":[{"claim_id":"Q5","requested_mode":"GUESS","formation_receipt_id":null}],"non_epistemic_drivers":[{"kind":"wager","ref":"choose-under-uncertainty"}],"proposed_action":"open-north-door","proposed_consequence":"north-door-opens"}
  ]
}
```

`formation-templates.json`:

```json
{
  "schema": "mortal_narrative.formation-templates/v0",
  "formations": [
    {"formation_id":"BELIEF-N-Q2","run_id":"MA-N-N0","claim_id":"Q2","mode":"BELIEVE","formation_refs":["decoder:decode-lamp-N","stance:stance-lamp-N"]}
  ]
}
```

`render-templates.json` targets only admissible E2/E8:

```json
{
  "schema": "mortal_narrative.render-templates/v0",
  "renders": [
    {"render_id":"R1","beat_id":"E8","assertions":[{"scope":"character","claim_id":"Q5","rendered_mode":"KNOW","causal_role":"character-action-basis"}]},
    {"render_id":"R2","beat_id":"E2","assertions":[{"scope":"reader","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"exposition"}]},
    {"render_id":"R3","beat_id":"E2","assertions":[{"scope":"reader","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"character-action-basis"}]},
    {"render_id":"R4","beat_id":"E2","assertions":[{"scope":"narrator","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"character-action-basis"}]}
  ]
}
```

The narrative oracle stores only `EXPECTED` and `EXPECTED_RENDER`; Gate-D global truth remains in the Gate-D oracle.

- [ ] **Step 4: Implement the structural verifier**

Implement `verify_vector(root: Path) -> list[str]` with direct JSON loads and stable error codes. It must validate schemas, unique IDs, Gate-D run/claim references, parent ancestry, E1/E2 same-action invariant, E5 formation ownership, exact N0 refs, render target IDs, and physical oracle separation. The CLI exits nonzero when errors exist and prints exactly `MORTAL-NARRATIVE-001 vector: OK` when clean.

`README.md` includes these exact laws:

```text
same external action != same causal basis
reader knows != character knows
narrator knows != character knows
locally attributable != globally true
narrative admissible != canon
```

- [ ] **Step 5: Verify GREEN and commit**

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
python3 tools/verify_mortal_narrative_vector.py specimens/mortal-narrative-001
git add specimens/mortal-narrative-001 tools/verify_mortal_narrative_vector.py tests/test_mortal_narrative_vector.py
git commit -m "test: freeze MORTAL-NARRATIVE-001 hostile vector"
```

Expected: PASS and exact OK line.

---

### Task 2: Implement claim-specific formation validation

**Files:** `adapters/novelist/__init__.py`, `adapters/novelist/formation.py`, `tests/test_mortal_narrative_formation.py`.

**Interfaces:** consumes exact 3rdi handoff + LOADOUT binding + materialized formation; produces deterministic error list.

- [ ] **Step 1: Write failing tests**

Test a valid N0 Q2 belief and stable failures:

```text
FORMATION_SCHEMA_INVALID
FORMATION_PROJECTION_SCHEMA_INVALID
FORMATION_BINDING_SCHEMA_INVALID
FORMATION_MODE_INVALID
FORMATION_ACTOR_MISMATCH
FORMATION_CUT_MISMATCH
FORMATION_PROJECTION_MISMATCH
FORMATION_COMPILE_ID_MISMATCH
FORMATION_COMPILE_DIGEST_MISMATCH
FORMATION_CLAIM_ID_REQUIRED
FORMATION_REFS_REQUIRED
FORMATION_REF_NAMESPACE_INVALID
FORMATION_REF_OUTSIDE_PROJECTION
```

Use N0 trace IDs `contact-lamp-N`, `attention-lamp-N`, `decode-lamp-N`, `stance-lamp-N`. Assert `occurrence:reader-margin-note`, `occurrence:merge-read`, and `stance:stance-red-note-A1` fail outside N0.

- [ ] **Step 2: Confirm RED**

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
```

Expected: FAIL from missing module.

- [ ] **Step 3: Implement `formation.py`**

Use this implementation shape without any constituent imports:

```python
from __future__ import annotations

FORMATION_SCHEMA = "mortal_narrative.formation/v0"
FORMATION_MODES = {"BELIEVE", "SUSPECT"}
PREFIX_TO_FIELD = {
    "occurrence": "visible_occurrence_ids",
    "contact": "contact_ids",
    "attention": "attention_event_ids",
    "decoder": "decoder_application_ids",
    "stance": "stance_ids",
    "relevance": "visible_relevance_edge_ids",
    "causal": "visible_causal_edge_ids",
}


def _nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def projection_formation_refs(projection_handoff: dict) -> set[str]:
    refs: set[str] = set()
    for prefix, field in PREFIX_TO_FIELD.items():
        values = projection_handoff.get(field, [])
        if isinstance(values, list):
            refs.update(f"{prefix}:{value}" for value in values if _nonempty(value))
    return refs


def validate_formation_receipt(receipt: dict, *, projection_handoff: dict, loadout_binding: dict) -> list[str]:
    errors: list[str] = []
    if not isinstance(receipt, dict) or receipt.get("schema") != FORMATION_SCHEMA:
        errors.append("FORMATION_SCHEMA_INVALID")
    if not isinstance(projection_handoff, dict) or projection_handoff.get("schema") != "mortal_actor.3rdi-handoff/v0":
        errors.append("FORMATION_PROJECTION_SCHEMA_INVALID")
    if not isinstance(loadout_binding, dict) or loadout_binding.get("schema") != "mortal_actor.loadout-binding/v0":
        errors.append("FORMATION_BINDING_SCHEMA_INVALID")
    if receipt.get("mode") not in FORMATION_MODES:
        errors.append("FORMATION_MODE_INVALID")
    if receipt.get("actor_id") != projection_handoff.get("observer") or receipt.get("actor_id") != loadout_binding.get("actor_id"):
        errors.append("FORMATION_ACTOR_MISMATCH")
    if receipt.get("cut_id") != projection_handoff.get("cut_id"):
        errors.append("FORMATION_CUT_MISMATCH")
    if receipt.get("projection_digest") != projection_handoff.get("projection_digest") or receipt.get("projection_digest") != loadout_binding.get("projection_ref"):
        errors.append("FORMATION_PROJECTION_MISMATCH")
    if receipt.get("evaluation_compile_id") != loadout_binding.get("evaluation_compile_id"):
        errors.append("FORMATION_COMPILE_ID_MISMATCH")
    if receipt.get("evaluation_compile_digest") != loadout_binding.get("evaluation_compile_digest"):
        errors.append("FORMATION_COMPILE_DIGEST_MISMATCH")
    if not _nonempty(receipt.get("claim_id")):
        errors.append("FORMATION_CLAIM_ID_REQUIRED")
    refs = receipt.get("formation_refs")
    if not isinstance(refs, list) or not refs:
        errors.append("FORMATION_REFS_REQUIRED")
        refs = []
    local_refs = projection_formation_refs(projection_handoff)
    for ref in refs:
        if not _nonempty(ref) or ":" not in ref:
            errors.append("FORMATION_REF_NAMESPACE_INVALID")
            continue
        prefix = ref.split(":", 1)[0]
        if prefix not in PREFIX_TO_FIELD:
            errors.append("FORMATION_REF_NAMESPACE_INVALID")
            continue
        if ref not in local_refs:
            errors.append("FORMATION_REF_OUTSIDE_PROJECTION")
    return list(dict.fromkeys(errors))
```

Do not add withheld-ID support.

- [ ] **Step 4: Export, verify, commit**

```python
# adapters/novelist/__init__.py
from .formation import projection_formation_refs, validate_formation_receipt

__all__ = ["projection_formation_refs", "validate_formation_receipt"]
```

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
git add adapters/novelist tests/test_mortal_narrative_formation.py
git commit -m "feat: validate mortal narrative formations"
```

Expected: PASS.

---

### Task 3: Implement the four-mode beat evaluator

**Files:** `adapters/novelist/evaluator.py`, `adapters/novelist/__init__.py`, `tests/test_mortal_narrative_evaluator.py`.

**Interfaces:** consumes materialized beat + exact 3rdi/LOADOUT/ALEX/formation receipts; produces evaluation receipt or raises input error.

- [ ] **Step 1: Write failing identity and mode tests**

Identity mutations that must raise `NarrativeInputError`: actor, cut, projection digest, compile ID/digest, ALEX claim/observer/cut/projection/compile identity, unsupported mode, malformed schema. They must never become `reroute_required`.

Mode assertions:

```text
A0 Q5 KNOW + basis_outside_projection -> reroute_required
A1 Q5 KNOW + local_basis_accept -> narrative_admissible
Q4 KNOW + local_basis_unresolved -> narrative_unresolved
N0 Q2 BELIEVE + BELIEF-N-Q2 -> narrative_admissible
BELIEVE/SUSPECT without named formation -> narrative_unresolved
Q3 using a Q2 formation -> NarrativeInputError(FORMATION_BINDING_MISMATCH)
GUESS + non-epistemic driver -> narrative_admissible
GUESS without driver -> narrative_unresolved
no epistemic uses + lawful wager -> narrative_admissible
```

- [ ] **Step 2: Confirm RED**

```bash
python3 -m unittest tests.test_mortal_narrative_evaluator -v
```

Expected: FAIL from missing evaluator.

- [ ] **Step 3: Implement `evaluator.py`**

```python
from __future__ import annotations

from .formation import validate_formation_receipt

PROPOSAL_SCHEMA = "mortal_narrative.beat-proposal/v0"
MODES = {"KNOW", "BELIEVE", "SUSPECT", "GUESS"}


class NarrativeInputError(ValueError):
    pass


def _nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _validate_base(proposal: dict, projection: dict, binding: dict) -> None:
    if not isinstance(proposal, dict) or proposal.get("schema") != PROPOSAL_SCHEMA:
        raise NarrativeInputError("PROPOSAL_SCHEMA_INVALID")
    if projection.get("schema") != "mortal_actor.3rdi-handoff/v0":
        raise NarrativeInputError("PROJECTION_SCHEMA_INVALID")
    if binding.get("schema") != "mortal_actor.loadout-binding/v0":
        raise NarrativeInputError("BINDING_SCHEMA_INVALID")
    for field in ("beat_id", "actor_id", "cut_id", "projection_digest", "evaluation_compile_id", "evaluation_compile_digest", "dramatic_destination", "proposed_action"):
        if not _nonempty(proposal.get(field)):
            raise NarrativeInputError(f"PROPOSAL_FIELD_REQUIRED:{field}")
    if not isinstance(proposal.get("epistemic_uses"), list) or not isinstance(proposal.get("non_epistemic_drivers"), list):
        raise NarrativeInputError("PROPOSAL_LIST_FIELD_INVALID")
    parent = proposal.get("parent_beat_id")
    if parent is not None and not _nonempty(parent):
        raise NarrativeInputError("PARENT_BEAT_ID_INVALID")
    if proposal["actor_id"] != projection.get("observer") or proposal["actor_id"] != binding.get("actor_id"):
        raise NarrativeInputError("ACTOR_IDENTITY_MISMATCH")
    if proposal["cut_id"] != projection.get("cut_id"):
        raise NarrativeInputError("CUT_IDENTITY_MISMATCH")
    if proposal["projection_digest"] != projection.get("projection_digest") or proposal["projection_digest"] != binding.get("projection_ref"):
        raise NarrativeInputError("PROJECTION_IDENTITY_MISMATCH")
    if proposal["evaluation_compile_id"] != binding.get("evaluation_compile_id"):
        raise NarrativeInputError("COMPILE_IDENTITY_MISMATCH")
    if proposal["evaluation_compile_digest"] != binding.get("evaluation_compile_digest"):
        raise NarrativeInputError("COMPILE_DIGEST_MISMATCH")


def _validate_alex(result: dict, proposal: dict, claim_id: str) -> None:
    expected = {
        "claim_id": claim_id,
        "observer": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "compile_id": proposal["evaluation_compile_id"],
        "compile_digest": proposal["evaluation_compile_digest"],
    }
    for field, value in expected.items():
        if result.get(field) != value:
            raise NarrativeInputError(f"ALEX_IDENTITY_MISMATCH:{field}")


def evaluate_beat_proposal(proposal: dict, *, projection_handoff: dict, loadout_binding: dict, alex_results: dict[str, dict], formation_receipts: dict[str, dict]) -> dict:
    _validate_base(proposal, projection_handoff, loadout_binding)
    offending: list[dict] = []
    unresolved: list[dict] = []
    for use in proposal["epistemic_uses"]:
        if not isinstance(use, dict) or not _nonempty(use.get("claim_id")):
            raise NarrativeInputError("EPISTEMIC_USE_INVALID")
        claim_id = use["claim_id"]
        mode = use.get("requested_mode")
        if mode not in MODES:
            raise NarrativeInputError("EPISTEMIC_MODE_INVALID")
        if mode == "KNOW":
            result = alex_results.get(claim_id)
            if result is None:
                unresolved.append({"claim_id": claim_id, "requested_mode": mode, "reason_code": "LOCAL_SUPPORT_RESULT_MISSING"})
                continue
            _validate_alex(result, proposal, claim_id)
            local = result.get("local_disposition")
            if local == "local_basis_accept":
                continue
            if local in {"basis_outside_projection", "local_basis_counterpressured"}:
                offending.append({"claim_id": claim_id, "requested_mode": mode, "local_support_disposition": local, "reason_code": "COUNTERFEIT_CHARACTER_KNOWLEDGE"})
                continue
            if local == "local_basis_unresolved":
                unresolved.append({"claim_id": claim_id, "requested_mode": mode, "reason_code": "LOCAL_SUPPORT_UNRESOLVED"})
                continue
            if local in {"projection_mismatch", "compile_mismatch"}:
                raise NarrativeInputError("ALEX_IDENTITY_MISMATCH")
            unresolved.append({"claim_id": claim_id, "requested_mode": mode, "reason_code": "LOCAL_SUPPORT_DISPOSITION_UNKNOWN"})
            continue
        if mode in {"BELIEVE", "SUSPECT"}:
            formation_id = use.get("formation_receipt_id")
            if not _nonempty(formation_id) or formation_id not in formation_receipts:
                unresolved.append({"claim_id": claim_id, "requested_mode": mode, "reason_code": "FORMATION_RECEIPT_MISSING"})
                continue
            formation = formation_receipts[formation_id]
            errors = validate_formation_receipt(formation, projection_handoff=projection_handoff, loadout_binding=loadout_binding)
            if errors:
                raise NarrativeInputError("FORMATION_INVALID:" + ",".join(errors))
            if formation.get("claim_id") != claim_id or formation.get("mode") != mode:
                raise NarrativeInputError("FORMATION_BINDING_MISMATCH")
            continue
        if not proposal["non_epistemic_drivers"]:
            unresolved.append({"claim_id": claim_id, "requested_mode": mode, "reason_code": "GUESS_DRIVER_REQUIRED"})
    disposition = "reroute_required" if offending else "narrative_unresolved" if unresolved else "narrative_admissible"
    return {
        "schema": "mortal_narrative.evaluation/v0",
        "beat_id": proposal["beat_id"],
        "parent_beat_id": proposal.get("parent_beat_id"),
        "actor_id": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "evaluation_compile_id": proposal["evaluation_compile_id"],
        "evaluation_compile_digest": proposal["evaluation_compile_digest"],
        "disposition": disposition,
        "offending_uses": offending,
        "unresolved_uses": unresolved,
        "creative_authority": "NOVELIST",
    }
```

- [ ] **Step 4: Add boundary tests and exports**

Recursively assert evaluation output contains none of these keys:

```text
truth canon admitted authorized publication side_effect world_write
```

Add an import-isolation test that reads every `adapters/novelist/*.py` file and asserts none contains `three_rdi`, `alex_runtime`, `skills.loadout`, `MEMENTO`, or `eCODE`.

Export `NarrativeInputError` and `evaluate_beat_proposal` from `adapters/novelist/__init__.py`.

- [ ] **Step 5: Verify GREEN and commit**

```bash
python3 -m unittest tests.test_mortal_narrative_formation tests.test_mortal_narrative_evaluator -v
git add adapters/novelist tests/test_mortal_narrative_evaluator.py
git commit -m "feat: evaluate mortal narrative agency"
```

Expected: PASS.

---

### Task 4: Add the structured render guard

**Files:** `adapters/novelist/render_guard.py`, `adapters/novelist/__init__.py`, `tests/test_mortal_narrative_render_guard.py`.

**Interfaces:** consumes materialized render receipt + admissible beat evaluation; produces `mortal_narrative.render-check/v0`.

- [ ] **Step 1: Write failing tests**

Required controls:

```text
R1 E8 GUESS rendered as character KNOW -> fail / CHARACTER_MODE_ESCALATION
R2 E2 reader Q1 KNOW as exposition -> pass
R3 E2 reader Q1 KNOW as character-action-basis -> fail
R4 E2 narrator Q1 KNOW as character-action-basis -> fail
```

R3/R4 must report `NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS`. Beat/actor/cut/projection identity mismatch raises `NarrativeInputError`.

- [ ] **Step 2: Confirm RED**

```bash
python3 -m unittest tests.test_mortal_narrative_render_guard -v
```

- [ ] **Step 3: Implement `render_guard.py`**

```python
from __future__ import annotations

from .evaluator import NarrativeInputError

ALLOWED_RENDER_MODES = {
    "GUESS": {"GUESS"},
    "SUSPECT": {"SUSPECT", "GUESS"},
    "BELIEVE": {"BELIEVE", "SUSPECT", "GUESS"},
    "KNOW": {"KNOW", "BELIEVE", "SUSPECT", "GUESS"},
}
VALID_SCOPES = {"character", "reader", "narrator"}
VALID_CAUSAL_ROLES = {"exposition", "character-action-basis"}


def check_render_receipt(proposal: dict, evaluation: dict, render_receipt: dict) -> dict:
    if render_receipt.get("schema") != "mortal_narrative.render/v0":
        raise NarrativeInputError("RENDER_SCHEMA_INVALID")
    if evaluation.get("schema") != "mortal_narrative.evaluation/v0" or evaluation.get("disposition") != "narrative_admissible":
        raise NarrativeInputError("RENDER_REQUIRES_ADMISSIBLE_BEAT")
    identity = {
        "beat_id": proposal.get("beat_id"),
        "actor_id": proposal.get("actor_id"),
        "cut_id": proposal.get("cut_id"),
        "projection_digest": proposal.get("projection_digest"),
    }
    for field, value in identity.items():
        if render_receipt.get(field) != value or evaluation.get(field) != value:
            raise NarrativeInputError(f"RENDER_IDENTITY_MISMATCH:{field}")
    declared = {item["claim_id"]: item["requested_mode"] for item in proposal.get("epistemic_uses", []) if isinstance(item, dict)}
    violations: list[str] = []
    for assertion in render_receipt.get("assertions", []):
        scope = assertion.get("scope")
        mode = assertion.get("rendered_mode")
        causal_role = assertion.get("causal_role")
        claim_id = assertion.get("claim_id")
        if scope not in VALID_SCOPES or mode not in ALLOWED_RENDER_MODES or causal_role not in VALID_CAUSAL_ROLES:
            raise NarrativeInputError("RENDER_ASSERTION_INVALID")
        if scope == "character":
            declared_mode = declared.get(claim_id)
            if declared_mode is None or mode not in ALLOWED_RENDER_MODES[declared_mode]:
                violations.append("CHARACTER_MODE_ESCALATION")
        elif causal_role == "character-action-basis":
            violations.append("NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS")
    return {
        "schema": "mortal_narrative.render-check/v0",
        "render_id": render_receipt.get("render_id"),
        "beat_id": proposal["beat_id"],
        "status": "pass" if not violations else "fail",
        "violations": list(dict.fromkeys(violations)),
    }
```

- [ ] **Step 4: Export, verify, commit**

Export `check_render_receipt`, then:

```bash
python3 -m unittest tests.test_mortal_narrative_evaluator tests.test_mortal_narrative_render_guard -v
git add adapters/novelist tests/test_mortal_narrative_render_guard.py
git commit -m "feat: guard narrative render modes"
```

Expected: PASS.

---

### Task 5: Build the blind Gate-E runner

**Files:** `tools/run_mortal_narrative_blind_proof.py`, `tests/test_mortal_narrative_blind.py`.

**Interfaces:** consumes Gate-E vector + Gate-D vector + pinned dependency roots; produces blind CASE and score receipts.

- [ ] **Step 1: Write failing materialization and scorer tests**

Materialized E1 must copy exact actor/cut/projection/compile identities from `actor_case["runs"]["MA-A-A0"]`. Materialized BELIEF-N-Q2 must copy exact identities from `MA-N-N0`. Materialized renders must copy beat/actor/cut/projection identity from their target proposal.

CASE expectations are all eight `EXPECTED` entries and all four `EXPECTED_RENDER` entries. Score controls must prove: E1 reroutes; E2 is admissible, parented to E1, and has the same action; E3 is admissible without mutating E1; E5 is admissible while Gate-D oracle Q2 is false; R1 fails; R2 passes; R3/R4 fail; no LOADOUT binding expands authority or executes side effects.

- [ ] **Step 2: Confirm RED**

```bash
python3 -m unittest tests.test_mortal_narrative_blind -v
```

- [ ] **Step 3: Implement exact materialization helpers**

```python
def materialize_beat(template: dict, actor_run: dict) -> dict:
    binding = actor_run["loadout_binding"]
    projection = actor_run["projection_handoff"]
    return {
        "schema": "mortal_narrative.beat-proposal/v0",
        "beat_id": template["beat_id"],
        "parent_beat_id": template.get("parent_beat_id"),
        "actor_id": actor_run["actor_id"],
        "cut_id": actor_run["cut_id"],
        "projection_digest": projection["projection_digest"],
        "evaluation_compile_id": binding["evaluation_compile_id"],
        "evaluation_compile_digest": binding["evaluation_compile_digest"],
        "dramatic_destination": template["dramatic_destination"],
        "epistemic_uses": template["epistemic_uses"],
        "non_epistemic_drivers": template["non_epistemic_drivers"],
        "proposed_action": template["proposed_action"],
        "proposed_consequence": template.get("proposed_consequence"),
    }


def materialize_formation(template: dict, actor_run: dict) -> dict:
    binding = actor_run["loadout_binding"]
    projection = actor_run["projection_handoff"]
    return {
        "schema": "mortal_narrative.formation/v0",
        "formation_id": template["formation_id"],
        "actor_id": actor_run["actor_id"],
        "cut_id": actor_run["cut_id"],
        "projection_digest": projection["projection_digest"],
        "evaluation_compile_id": binding["evaluation_compile_id"],
        "evaluation_compile_digest": binding["evaluation_compile_digest"],
        "claim_id": template["claim_id"],
        "mode": template["mode"],
        "formation_refs": template["formation_refs"],
    }


def materialize_render(template: dict, proposal: dict) -> dict:
    return {
        "schema": "mortal_narrative.render/v0",
        "render_id": template["render_id"],
        "beat_id": proposal["beat_id"],
        "actor_id": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "assertions": template["assertions"],
    }
```

- [ ] **Step 4: Implement blind CASE execution**

Load Gate D without importing constituent modules into the adapter. The runner may load the existing Gate-D proof script because it is proof composition, not a production dependency:

```python
import importlib.util
from pathlib import Path


def _gate_d_run_case():
    path = Path(__file__).with_name("run_mortal_actor_blind_proof.py")
    spec = importlib.util.spec_from_file_location("gate_d_blind", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("GATE_D_RUNNER_LOAD_FAILED")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.run_case
```

`run_case` must execute this exact sequence:

```text
1. actor_case = Gate-D run_case(actor vector, 3rdi root, LOADOUT root, ALEX root)
2. load Gate-E manifest + beat/formation/render templates only
3. materialize all formations and validate them against the named actor run
4. materialize all beats
5. evaluate each beat using only that run's projection, binding, alex_results, and relevant formations
6. materialize R1 from E8 and R2/R3/R4 from E2
7. run render guards
8. embed the completed Gate-D CASE receipt, materialized inputs, evaluations, and render checks
9. compute deterministic canonical-JSON SHA256 as case_receipt_digest
```

Use signature:

```python
def run_case(*, narrative_vector_root: Path, actor_vector_root: Path, three_rdi_root: Path, loadout_root: Path, alex_root: Path) -> dict:
    actor_case = _gate_d_run_case()(actor_vector_root, three_rdi_root, loadout_root, alex_root)
    manifest = _load_json(narrative_vector_root / "manifest.json")
    beats_doc = _load_json(narrative_vector_root / manifest["beat_templates_ref"])
    formations_doc = _load_json(narrative_vector_root / manifest["formation_templates_ref"])
    renders_doc = _load_json(narrative_vector_root / manifest["render_templates_ref"])
    formations: dict[str, dict] = {}
    for template in formations_doc["formations"]:
        actor_run = actor_case["runs"][template["run_id"]]
        receipt = materialize_formation(template, actor_run)
        errors = validate_formation_receipt(receipt, projection_handoff=actor_run["projection_handoff"], loadout_binding=actor_run["loadout_binding"])
        if errors:
            raise RuntimeError("FORMATION_TEMPLATE_INVALID:" + ",".join(errors))
        formations[receipt["formation_id"]] = receipt
    beats: dict[str, dict] = {}
    for template in beats_doc["beats"]:
        actor_run = actor_case["runs"][template["run_id"]]
        proposal = materialize_beat(template, actor_run)
        evaluation = evaluate_beat_proposal(
            proposal,
            projection_handoff=actor_run["projection_handoff"],
            loadout_binding=actor_run["loadout_binding"],
            alex_results=actor_run["alex_results"],
            formation_receipts=formations,
        )
        beats[proposal["beat_id"]] = {"proposal": proposal, "evaluation": evaluation}
    render_checks: dict[str, dict] = {}
    for template in renders_doc["renders"]:
        beat = beats[template["beat_id"]]
        render = materialize_render(template, beat["proposal"])
        render_checks[render["render_id"]] = check_render_receipt(beat["proposal"], beat["evaluation"], render)
    receipt = {
        "schema": "mortal_narrative.blind-case-receipt/v0",
        "vector_id": manifest["vector_id"],
        "actor_case": actor_case,
        "formations": formations,
        "beats": beats,
        "render_checks": render_checks,
    }
    receipt["case_receipt_digest"] = _sha256_json(receipt)
    return receipt
```

`_load_json` and `_sha256_json` must be local stdlib helpers identical in canonicalization to Gate D. `run_case` must not read either `oracle_ref`.

- [ ] **Step 5: Implement post-CASE scoring**

`score_case` is the only oracle reader. It loads both manifests/oracles, compares expected matrices, and computes controls from the completed receipt:

```python
def score_case(*, narrative_vector_root: Path, actor_vector_root: Path, case_receipt: dict) -> dict:
    narrative_manifest = _load_json(narrative_vector_root / "manifest.json")
    actor_manifest = _load_json(actor_vector_root / "manifest.json")
    narrative_oracle = _load_json(narrative_vector_root / narrative_manifest["oracle_ref"])
    actor_oracle = _load_json(actor_vector_root / actor_manifest["oracle_ref"])
    mismatches: list[dict] = []
    for beat_id, expected in narrative_oracle["expected_beats"].items():
        actual = case_receipt["beats"][beat_id]["evaluation"]["disposition"]
        if actual != expected:
            mismatches.append({"kind": "beat", "id": beat_id, "expected": expected, "actual": actual})
    for render_id, expected in narrative_oracle["expected_renders"].items():
        actual = case_receipt["render_checks"][render_id]["status"]
        if actual != expected:
            mismatches.append({"kind": "render", "id": render_id, "expected": expected, "actual": actual})
    e1 = case_receipt["beats"]["E1"]
    e2 = case_receipt["beats"]["E2"]
    e3 = case_receipt["beats"]["E3"]
    e5 = case_receipt["beats"]["E5"]
    same_action = e1["evaluation"]["disposition"] == "reroute_required" and e2["evaluation"]["disposition"] == "narrative_admissible" and e2["proposal"]["parent_beat_id"] == "E1" and e1["proposal"]["proposed_action"] == e2["proposal"]["proposed_action"]
    later_cut = e1["evaluation"]["disposition"] == "reroute_required" and e3["evaluation"]["disposition"] == "narrative_admissible"
    false_belief = actor_oracle["global_truth"]["Q2"] is False and e5["evaluation"]["disposition"] == "narrative_admissible"
    reader_irony = case_receipt["render_checks"]["R2"]["status"] == "pass" and case_receipt["render_checks"]["R3"]["status"] == "fail"
    narrator_boundary = case_receipt["render_checks"]["R4"]["status"] == "fail"
    render_mode = case_receipt["render_checks"]["R1"]["status"] == "fail"
    bindings = [run["loadout_binding"] for run in case_receipt["actor_case"]["runs"].values()]
    no_authority = all(item.get("authority_expanded") is False for item in bindings)
    no_side_effects = all(item.get("side_effect_executed") is False for item in bindings)
    controls = [same_action, later_cut, false_belief, reader_irony, narrator_boundary, render_mode, no_authority, no_side_effects]
    return {
        "schema": "mortal_narrative.blind-score/v0",
        "vector_id": narrative_manifest["vector_id"],
        "case_receipt_digest": case_receipt["case_receipt_digest"],
        "status": "pass" if not mismatches and all(controls) else "fail",
        "mismatches": mismatches,
        "same_action_different_basis_control": same_action,
        "later_cut_without_rewrite_control": later_cut,
        "local_false_belief_control": false_belief,
        "reader_irony_control": reader_irony,
        "narrator_boundary_control": narrator_boundary,
        "render_mode_control": render_mode,
        "no_authority_expansion": no_authority,
        "no_side_effects": no_side_effects,
        "beat_evaluation_count": len(case_receipt["beats"]),
        "render_check_count": len(case_receipt["render_checks"]),
    }
```

- [ ] **Step 6: Add CLI and verify GREEN**

Mirror Gate-D subcommands with these exact invocations:

```bash
python3 tools/run_mortal_narrative_blind_proof.py case --narrative-vector specimens/mortal-narrative-001 --actor-vector specimens/mortal-actor-001 --three-rdi-root deps/3rdi --loadout-root deps/loadout --alex-root deps/alex
python3 tools/run_mortal_narrative_blind_proof.py score --narrative-vector specimens/mortal-narrative-001 --actor-vector specimens/mortal-actor-001 --case-receipt /tmp/mortal-narrative-case.json
python3 -m unittest tests.test_mortal_narrative_blind -v
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add tools/run_mortal_narrative_blind_proof.py tests/test_mortal_narrative_blind.py
git commit -m "test: prove MORTAL-NARRATIVE-001 blind composition"
```

---

### Task 6: Wire terminal CI with both oracles physically absent

**Files:** `.github/workflows/mortal-narrative-001.yml`; modify specimen README only if commands changed.

**Interfaces:** consumes completed proof surface; produces terminal GitHub Actions evidence.

- [ ] **Step 1: Add exact pinned checkouts**

```yaml
name: mortal-narrative-001
on:
  pull_request:
    paths:
      - "adapters/novelist/**"
      - "specimens/mortal-narrative-001/**"
      - "tools/verify_mortal_narrative_vector.py"
      - "tools/run_mortal_narrative_blind_proof.py"
      - "tests/test_mortal_narrative_*.py"
      - ".github/workflows/mortal-narrative-001.yml"
permissions:
  contents: read
jobs:
  blind-proof:
    runs-on: ubuntu-24.04
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@v4
      - uses: actions/checkout@v4
        with:
          repository: the-static-collective/3rdi
          ref: 04781217996622cf3e8d151d845c64772189b17d
          path: deps/3rdi
      - uses: actions/checkout@v4
        with:
          repository: the-static-collective/ALEX.2
          ref: 08048efba661242d07b489240d237a6d1544e747
          path: deps/loadout
      - uses: actions/checkout@v4
        with:
          repository: the-static-collective/ALEX.2
          ref: 61acaee2d6f56c66431c00fb1720590f6c5c4e21
          path: deps/alex
      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
```

- [ ] **Step 2: Run all structural/unit checks**

```bash
python3 tools/verify_mortal_actor_vector.py specimens/mortal-actor-001
python3 tools/verify_mortal_narrative_vector.py specimens/mortal-narrative-001
python3 -m unittest tests.test_mortal_actor_vector tests.test_mortal_narrative_vector tests.test_mortal_narrative_formation tests.test_mortal_narrative_evaluator tests.test_mortal_narrative_render_guard tests.test_mortal_narrative_blind -v
```

Expected: PASS.

- [ ] **Step 3: Remove both oracles and run CASE**

```bash
mv specimens/mortal-actor-001/oracle/private-oracle.json /tmp/mortal-actor-private-oracle.json
mv specimens/mortal-narrative-001/oracle/private-oracle.json /tmp/mortal-narrative-private-oracle.json
python3 tools/run_mortal_narrative_blind_proof.py case --narrative-vector specimens/mortal-narrative-001 --actor-vector specimens/mortal-actor-001 --three-rdi-root deps/3rdi --loadout-root deps/loadout --alex-root deps/alex > /tmp/mortal-narrative-case.json
test ! -e specimens/mortal-actor-001/oracle/private-oracle.json
test ! -e specimens/mortal-narrative-001/oracle/private-oracle.json
```

- [ ] **Step 4: Restore only after CASE and score**

```bash
mv /tmp/mortal-actor-private-oracle.json specimens/mortal-actor-001/oracle/private-oracle.json
mv /tmp/mortal-narrative-private-oracle.json specimens/mortal-narrative-001/oracle/private-oracle.json
python3 tools/run_mortal_narrative_blind_proof.py score --narrative-vector specimens/mortal-narrative-001 --actor-vector specimens/mortal-actor-001 --case-receipt /tmp/mortal-narrative-case.json | tee /tmp/mortal-narrative-score.json
```

- [ ] **Step 5: Assert terminal controls**

```python
import json
from pathlib import Path
score = json.loads(Path("/tmp/mortal-narrative-score.json").read_text())
assert score["status"] == "pass", score
assert score["mismatches"] == [], score
assert score["same_action_different_basis_control"] is True, score
assert score["later_cut_without_rewrite_control"] is True, score
assert score["local_false_belief_control"] is True, score
assert score["reader_irony_control"] is True, score
assert score["narrator_boundary_control"] is True, score
assert score["render_mode_control"] is True, score
assert score["no_authority_expansion"] is True, score
assert score["no_side_effects"] is True, score
assert score["beat_evaluation_count"] == 8, score
assert score["render_check_count"] == 4, score
```

- [ ] **Step 6: Re-run the full terminal sequence locally before claiming completion**

Record the exact score JSON and implementation commit SHA in the implementation PR. Required proof statement:

```text
E1 cheats and reroutes.
E2 reaches the same external action lawfully.
E3 knows later without rewriting E1.
E5 remains admissible while Q2 is globally false.
Reader exposition remains reader-only.
Narrator knowledge remains narrator-only.
GUESS cannot render as KNOW.
No authority expands and no side effect executes.
```

- [ ] **Step 7: Commit CI and open an unmerged implementation PR**

```bash
git add .github/workflows/mortal-narrative-001.yml specimens/mortal-narrative-001/README.md
git commit -m "ci: verify MORTAL-NARRATIVE-001 blind proof"
```

The PR body must say it is stacked on Gate-D PR #77, list the exact three pinned constituent commits, include the terminal score receipt, and state:

```text
Green proves this hostile specimen only.
It does not imply canon, owning-world admission, publication authority, side-effect permission, or merge authority.
```
