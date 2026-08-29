# MORTAL-NARRATIVE-001 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Gate E as a neutral Novelist-facing application profile that rejects counterfeit character knowledge, preserves lawful error and dramatic irony, and proves the behavior against the existing `FOUR WITNESSES / ONE ROOM` mortal stack.

**Architecture:** Keep `LOADOUT → 3rdi → ALEX` unchanged. Add a pure neutral adapter under `adapters/novelist/` that consumes already-formed receipts and emits only narrative application dispositions. Add a hostile narrative specimen and blind proof runner that reuse Gate D and compose the exact pinned constituent commits without creating a shared production runtime.

**Tech Stack:** Python 3.12 standard library, `unittest`, JSON fixtures, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md`

## Global Constraints

- The implementation worktree starts from Gate-D proof head `709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6` (`feat/mortal-actor-001-blind-proof`, PR #77). If that head moves before execution, inspect the change and re-establish compatibility before editing.
- Bring the approved design and this plan into the implementation branch as documentation only; do not merge PR #78 merely to make the files visible.
- Keep these constituent proof commits pinned unless a separate reviewed change deliberately updates them:
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

At execution time, after reading the `using-git-worktrees` skill, create an isolated implementation worktree from Gate D:

```bash
git worktree add ../mortal-narrative-001 -b feat/mortal-narrative-001 709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6
cd ../mortal-narrative-001
```

Then copy the approved spec and plan commits onto that branch without changing Gate-D runtime code. The current documentation commit chain is:

```text
babd9c0349fc6dc117976766542e1e27e150bcfd  initial Gate-E spec
556d55a1f4fc1d7a32dc0706dae8f5c659d58c10  identity/formation refinement
9a07fda643ac3d8072d5147f1439d310105317c0  final approved spec refinement
d0c14a1ac349a8b1319d4766a32ba3f28e2d7431  initial implementation plan
```

After this self-review commit, include the plan branch tip as well. Cherry-pick only documentation commits; if any cherry-pick touches runtime files, abort and investigate.

## File Structure

### Neutral application adapter

- Create `adapters/novelist/__init__.py` — public exports for Gate E.
- Create `adapters/novelist/formation.py` — validate claim-specific `BELIEVE`/`SUSPECT` formation receipts against exact 3rdi and LOADOUT identities.
- Create `adapters/novelist/evaluator.py` — evaluate `KNOW`, `BELIEVE`, `SUSPECT`, and `GUESS` using existing receipts only.
- Create `adapters/novelist/render_guard.py` — deterministic guard against character-mode escalation and reader/narrator leakage.

### Hostile specimen

- Create `specimens/mortal-narrative-001/README.md` — purpose, boundaries, candidate matrix, and proof commands.
- Create `specimens/mortal-narrative-001/manifest.json` — vector references.
- Create `specimens/mortal-narrative-001/case/beat-templates.json` — stable candidate templates; exact digests are materialized from Gate D at runtime.
- Create `specimens/mortal-narrative-001/case/formation-templates.json` — claim/mode/local-ref templates.
- Create `specimens/mortal-narrative-001/case/render-receipts.json` — structured render controls.
- Create `specimens/mortal-narrative-001/oracle/private-oracle.json` — expected Gate-E dispositions only; do not duplicate Gate-D global truth.

### Verification and execution

- Create `tools/verify_mortal_narrative_vector.py` — structural verifier.
- Create `tools/run_mortal_narrative_blind_proof.py` — CASE + post-CASE scorer.
- Create `tests/test_mortal_narrative_vector.py`
- Create `tests/test_mortal_narrative_formation.py`
- Create `tests/test_mortal_narrative_evaluator.py`
- Create `tests/test_mortal_narrative_render_guard.py`
- Create `tests/test_mortal_narrative_blind.py`
- Create `.github/workflows/mortal-narrative-001.yml`

---

### Task 1: Freeze `THE PERFECT SCENE THAT CHEATS` as a hostile vector

**Files:**
- Create: `specimens/mortal-narrative-001/README.md`
- Create: `specimens/mortal-narrative-001/manifest.json`
- Create: `specimens/mortal-narrative-001/case/beat-templates.json`
- Create: `specimens/mortal-narrative-001/case/formation-templates.json`
- Create: `specimens/mortal-narrative-001/case/render-receipts.json`
- Create: `specimens/mortal-narrative-001/oracle/private-oracle.json`
- Create: `tools/verify_mortal_narrative_vector.py`
- Create: `tests/test_mortal_narrative_vector.py`

**Interfaces:**
- Consumes: existing Gate-D vector, run IDs `MA-A-A0`, `MA-R-R0`, `MA-N-N0`, `MA-A-A1`, and Q1–Q5.
- Produces: stable templates that the blind runner materializes into exact `mortal_narrative.beat-proposal/v0` and `mortal_narrative.formation/v0` receipts.

- [ ] **Step 1: Write the failing structural tests**

Use this exact matrix:

```python
EXPECTED = {
    "E1": "reroute_required",      # A0 uses Q5 as KNOW
    "E2": "narrative_admissible", # same action, lawful wager
    "E3": "narrative_admissible", # A1 uses Q5 as KNOW
    "E4": "reroute_required",      # reader-visible Q1 must not leak to A0
    "E5": "narrative_admissible", # N0 BELIEVE Q2 from local formation
    "E6": "narrative_unresolved", # Q3 SUSPECT without formation
    "E7": "narrative_unresolved", # Q4 KNOW with unresolved causality
    "E8": "narrative_admissible", # Q5 GUESS under explicit wager
}

EXPECTED_RENDER = {
    "R1": "fail", # E8 GUESS rendered as character KNOW
    "R2": "pass", # reader Q1 knowledge remains exposition during lawful E2
    "R3": "fail", # reader Q1 knowledge used as E2 character-action basis
    "R4": "fail", # narrator Q1 knowledge used as E2 character-action basis
}
```

Assert E1/E2 share `proposed_action == "open-north-door"`, E2 has `parent_beat_id == "E1"`, E2 has no epistemic uses and has non-epistemic drivers, E3 uses `MA-A-A1`, and E5 references `BELIEF-N-Q2`.

Mutation tests must reject:

```text
E2 without parent_beat_id
E2 with a different proposed_action
E2 without non_epistemic_drivers
duplicate beat_id
BELIEF-N-Q2 with claim_id != Q2
BELIEF-N-Q2 without decoder:decode-lamp-N
BELIEF-N-Q2 without stance:stance-lamp-N
R1 that no longer escalates GUESS to KNOW
R3/R4 whose causal_role stops being character-action-basis
oracle_ref under case/
actor_vector_ref other than ../mortal-actor-001
```

- [ ] **Step 2: Run the tests and verify failure**

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
```

Expected: FAIL because the vector/verifier does not exist.

- [ ] **Step 3: Create the manifest and beat templates**

`manifest.json`:

```json
{
  "schema": "mortal_narrative.vector/v0",
  "vector_id": "THE-PERFECT-SCENE-THAT-CHEATS-001",
  "actor_vector_ref": "../mortal-actor-001",
  "beat_templates_ref": "case/beat-templates.json",
  "formation_templates_ref": "case/formation-templates.json",
  "render_receipts_ref": "case/render-receipts.json",
  "oracle_ref": "oracle/private-oracle.json"
}
```

`beat-templates.json` must define these exact candidates:

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

- [ ] **Step 4: Create the exact formation and render templates**

`formation-templates.json`:

```json
{
  "schema": "mortal_narrative.formation-templates/v0",
  "formations": [
    {
      "formation_id": "BELIEF-N-Q2",
      "run_id": "MA-N-N0",
      "claim_id": "Q2",
      "mode": "BELIEVE",
      "formation_refs": ["decoder:decode-lamp-N", "stance:stance-lamp-N"]
    }
  ]
}
```

`render-receipts.json` targets only admissible beats so the render guard never needs to bless a rejected beat:

```json
{
  "schema": "mortal_narrative.render-receipts/v0",
  "renders": [
    {"render_id":"R1","beat_id":"E8","assertions":[{"scope":"character","claim_id":"Q5","rendered_mode":"KNOW","causal_role":"character-action-basis"}]},
    {"render_id":"R2","beat_id":"E2","assertions":[{"scope":"reader","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"exposition"}]},
    {"render_id":"R3","beat_id":"E2","assertions":[{"scope":"reader","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"character-action-basis"}]},
    {"render_id":"R4","beat_id":"E2","assertions":[{"scope":"narrator","claim_id":"Q1","rendered_mode":"KNOW","causal_role":"character-action-basis"}]}
  ]
}
```

The narrative oracle stores only `EXPECTED` and `EXPECTED_RENDER`. Gate-D global truth remains in the Gate-D oracle.

- [ ] **Step 5: Implement `verify_vector(root: Path) -> list[str]`**

Check schemas, unique IDs, Gate-D run/claim references, parent ancestry, E1/E2 same-action invariant, E5 formation ownership, exact N0 formation refs, render target IDs, and physical oracle separation. Return stable string error codes and print exactly:

```text
MORTAL-NARRATIVE-001 vector: OK
```

when clean.

`README.md` must state these laws verbatim:

```text
same external action != same causal basis
reader knows != character knows
narrator knows != character knows
locally attributable != globally true
narrative admissible != canon
```

- [ ] **Step 6: Verify and commit**

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
python3 tools/verify_mortal_narrative_vector.py specimens/mortal-narrative-001
git add specimens/mortal-narrative-001 tools/verify_mortal_narrative_vector.py tests/test_mortal_narrative_vector.py
git commit -m "test: freeze MORTAL-NARRATIVE-001 hostile vector"
```

Expected: tests PASS and verifier prints the exact OK line.

---

### Task 2: Implement claim-specific formation validation

**Files:**
- Create: `adapters/novelist/__init__.py`
- Create: `adapters/novelist/formation.py`
- Create: `tests/test_mortal_narrative_formation.py`

**Interfaces:**
- Consumes: `mortal_actor.3rdi-handoff/v0`, `mortal_actor.loadout-binding/v0`, and `mortal_narrative.formation/v0`.
- Produces: `projection_formation_refs(projection_handoff) -> set[str]` and `validate_formation_receipt(...) -> list[str]`.

- [ ] **Step 1: Write failing formation tests**

Required stable errors:

```text
FORMATION_SCHEMA_INVALID
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

The valid N0 projection fixture includes:

```python
{
    "schema": "mortal_actor.3rdi-handoff/v0",
    "observer": "N",
    "cut_id": "N0",
    "projection_digest": "sha256:n0",
    "visible_occurrence_ids": ["red-note-placed", "lamp-flicker", "north-door-click", "clock-chime-left", "clock-chime-right", "narrator-ledger-open"],
    "visible_causal_edge_ids": [],
    "visible_relevance_edge_ids": ["relevance-mirror-red-note"],
    "contact_ids": ["contact-lamp-N"],
    "attention_event_ids": ["attention-lamp-N"],
    "decoder_application_ids": ["decode-lamp-N"],
    "stance_ids": ["stance-lamp-N"],
}
```

Assert `decoder:decode-lamp-N` and `stance:stance-lamp-N` validate, while `occurrence:reader-margin-note`, `occurrence:merge-read`, and `stance:stance-red-note-A1` fail outside projection.

- [ ] **Step 2: Run and confirm failure**

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
```

Expected: FAIL because the module does not exist.

- [ ] **Step 3: Implement the namespace index**

```python
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


def projection_formation_refs(projection_handoff: dict) -> set[str]:
    refs: set[str] = set()
    for prefix, field in PREFIX_TO_FIELD.items():
        values = projection_handoff.get(field, [])
        if isinstance(values, list):
            refs.update(f"{prefix}:{value}" for value in values if isinstance(value, str) and value)
    return refs
```

Never add withheld-ID support; absence from the visible handoff is the security boundary.

- [ ] **Step 4: Implement formation validation**

```python
def validate_formation_receipt(
    receipt: dict,
    *,
    projection_handoff: dict,
    loadout_binding: dict,
) -> list[str]:
    ...
```

Validate:

```text
schema == mortal_narrative.formation/v0
mode in {BELIEVE, SUSPECT}
actor_id == projection.observer == binding.actor_id
cut_id == projection.cut_id
projection_digest == projection.projection_digest == binding.projection_ref
evaluation_compile_id == binding.evaluation_compile_id
evaluation_compile_digest == binding.evaluation_compile_digest
claim_id non-empty
formation_refs non-empty
all prefixes known
all refs present in projection_formation_refs(projection)
```

Return unique errors in deterministic insertion order. Do not inspect truth, ALEX support, or claim semantics.

- [ ] **Step 5: Export, verify, commit**

`adapters/novelist/__init__.py`:

```python
from .formation import projection_formation_refs, validate_formation_receipt

__all__ = ["projection_formation_refs", "validate_formation_receipt"]
```

Run and commit:

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
git add adapters/novelist tests/test_mortal_narrative_formation.py
git commit -m "feat: validate mortal narrative formations"
```

Expected: PASS.

---

### Task 3: Implement the four-mode beat evaluator

**Files:**
- Create: `adapters/novelist/evaluator.py`
- Modify: `adapters/novelist/__init__.py`
- Create: `tests/test_mortal_narrative_evaluator.py`

**Interfaces:**
- Consumes: full beat proposal, exact 3rdi handoff, exact LOADOUT binding, ALEX results keyed by claim ID, formation receipts keyed by formation ID.
- Produces: `mortal_narrative.evaluation/v0` or raises `NarrativeInputError` for malformed/identity-invalid inputs.

- [ ] **Step 1: Write failing identity-gate tests**

Each mutation must raise `NarrativeInputError`, never return `reroute_required`:

```text
proposal actor != projection observer
proposal actor != LOADOUT actor
proposal cut != projection cut
proposal projection digest != 3rdi digest
proposal projection digest != LOADOUT projection_ref
proposal compile ID != LOADOUT evaluation compile ID
proposal compile digest != LOADOUT evaluation compile digest
ALEX claim_id != requested claim
ALEX observer != proposal actor
ALEX cut/projection/compile ID or digest != proposal
unsupported requested_mode
malformed proposal schema
```

- [ ] **Step 2: Write failing mode tests**

Required behavior:

```python
self.assertEqual(eval_a0_q5_basis_outside["disposition"], "reroute_required")
self.assertEqual(eval_a1_q5_accept["disposition"], "narrative_admissible")
self.assertEqual(eval_q4_unresolved["disposition"], "narrative_unresolved")
self.assertEqual(eval_n_q2_belief_with_valid_formation["disposition"], "narrative_admissible")
self.assertEqual(eval_missing_formation["disposition"], "narrative_unresolved")
self.assertEqual(eval_guess_with_driver["disposition"], "narrative_admissible")
self.assertEqual(eval_guess_without_driver["disposition"], "narrative_unresolved")
self.assertEqual(eval_wager_only_no_epistemic_uses["disposition"], "narrative_admissible")
```

A Q2 formation referenced by a Q3 use must raise `NarrativeInputError("FORMATION_BINDING_MISMATCH")`.

- [ ] **Step 3: Run and confirm failure**

```bash
python3 -m unittest tests.test_mortal_narrative_evaluator -v
```

Expected: FAIL because `evaluator.py` does not exist.

- [ ] **Step 4: Implement exact bundle validation**

```python
class NarrativeInputError(ValueError):
    pass


def evaluate_beat_proposal(
    proposal: dict,
    *,
    projection_handoff: dict,
    loadout_binding: dict,
    alex_results: dict[str, dict],
    formation_receipts: dict[str, dict],
) -> dict:
    ...
```

Require schemas:

```text
mortal_narrative.beat-proposal/v0
mortal_actor.3rdi-handoff/v0
mortal_actor.loadout-binding/v0
```

Cross-check actor, cut, projection digest, evaluation compile ID, and evaluation compile digest before modes. When a `KNOW` use consumes an ALEX result, also require `claim_id`, `observer`, `cut_id`, `projection_digest`, `compile_id`, and `compile_digest` to match the proposal.

- [ ] **Step 5: Implement mode rules without re-running ALEX**

```python
if requested_mode == "KNOW":
    result = alex_results.get(claim_id)
    if result is None:
        unresolved("LOCAL_SUPPORT_RESULT_MISSING")
    elif result["local_disposition"] == "local_basis_accept":
        pass
    elif result["local_disposition"] in {"basis_outside_projection", "local_basis_counterpressured"}:
        offending("COUNTERFEIT_CHARACTER_KNOWLEDGE")
    elif result["local_disposition"] == "local_basis_unresolved":
        unresolved("LOCAL_SUPPORT_UNRESOLVED")
    elif result["local_disposition"] in {"projection_mismatch", "compile_mismatch"}:
        raise NarrativeInputError("ALEX_IDENTITY_MISMATCH")
    else:
        unresolved("LOCAL_SUPPORT_DISPOSITION_UNKNOWN")

elif requested_mode in {"BELIEVE", "SUSPECT"}:
    formation_id = use.get("formation_receipt_id")
    if not formation_id or formation_id not in formation_receipts:
        unresolved("FORMATION_RECEIPT_MISSING")
    else:
        formation = formation_receipts[formation_id]
        errors = validate_formation_receipt(
            formation,
            projection_handoff=projection_handoff,
            loadout_binding=loadout_binding,
        )
        if errors:
            raise NarrativeInputError("FORMATION_INVALID:" + ",".join(errors))
        if formation["claim_id"] != claim_id or formation["mode"] != requested_mode:
            raise NarrativeInputError("FORMATION_BINDING_MISMATCH")

elif requested_mode == "GUESS":
    if not proposal["non_epistemic_drivers"]:
        unresolved("GUESS_DRIVER_REQUIRED")
```

Precedence:

```text
hard identity/schema error -> raise
else any offending use -> reroute_required
else any unresolved use -> narrative_unresolved
else -> narrative_admissible
```

- [ ] **Step 6: Emit the bounded evaluation receipt**

```python
{
    "schema": "mortal_narrative.evaluation/v0",
    "beat_id": proposal["beat_id"],
    "parent_beat_id": proposal.get("parent_beat_id"),
    "actor_id": proposal["actor_id"],
    "cut_id": proposal["cut_id"],
    "projection_digest": proposal["projection_digest"],
    "evaluation_compile_id": proposal["evaluation_compile_id"],
    "evaluation_compile_digest": proposal["evaluation_compile_digest"],
    "disposition": disposition,
    "offending_uses": offending_uses,
    "unresolved_uses": unresolved_uses,
    "creative_authority": "NOVELIST",
}
```

Recursively assert no result key is any of:

```text
truth canon admitted authorized publication side_effect world_write
```

Also add `test_neutral_adapter_import_isolation`: read every `adapters/novelist/*.py` file and assert it contains none of:

```text
three_rdi
alex_runtime
skills.loadout
MEMENTO
eCODE
```

- [ ] **Step 7: Export, verify, commit**

Export `NarrativeInputError` and `evaluate_beat_proposal` from `adapters/novelist/__init__.py`.

```bash
python3 -m unittest tests.test_mortal_narrative_formation tests.test_mortal_narrative_evaluator -v
git add adapters/novelist tests/test_mortal_narrative_evaluator.py
git commit -m "feat: evaluate mortal narrative agency"
```

Expected: PASS.

---

### Task 4: Add the structured Novelist render guard

**Files:**
- Create: `adapters/novelist/render_guard.py`
- Modify: `adapters/novelist/__init__.py`
- Create: `tests/test_mortal_narrative_render_guard.py`

**Interfaces:**
- Consumes: one beat proposal, its admissible evaluation, and one structured render receipt.
- Produces: `mortal_narrative.render-check/v0`.

- [ ] **Step 1: Write failing render tests**

Required controls:

```python
self.assertEqual(check_render_receipt(e8, e8_admissible, r1)["status"], "fail")
self.assertIn("CHARACTER_MODE_ESCALATION", check_render_receipt(e8, e8_admissible, r1)["violations"])
self.assertEqual(check_render_receipt(e2, e2_admissible, r2)["status"], "pass")
self.assertEqual(check_render_receipt(e2, e2_admissible, r3)["status"], "fail")
self.assertEqual(check_render_receipt(e2, e2_admissible, r4)["status"], "fail")
```

R3 and R4 must contain `NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS`.

Beat/actor/cut identity mismatch must raise `NarrativeInputError`.

- [ ] **Step 2: Run and confirm failure**

```bash
python3 -m unittest tests.test_mortal_narrative_render_guard -v
```

Expected: FAIL because `render_guard.py` does not exist.

- [ ] **Step 3: Implement deterministic weakening rules**

```python
ALLOWED_RENDER_MODES = {
    "GUESS": {"GUESS"},
    "SUSPECT": {"SUSPECT", "GUESS"},
    "BELIEVE": {"BELIEVE", "SUSPECT", "GUESS"},
    "KNOW": {"KNOW", "BELIEVE", "SUSPECT", "GUESS"},
}
```

Character assertions may not render stronger than declared. Reader/narrator assertions with `causal_role == "exposition"` are allowed; either with `causal_role == "character-action-basis"` fails. Unknown scope/mode/causal role is an input error.

- [ ] **Step 4: Implement the guard**

```python
def check_render_receipt(
    proposal: dict,
    evaluation: dict,
    render_receipt: dict,
) -> dict:
    ...
```

Require `evaluation["disposition"] == "narrative_admissible"`; otherwise raise `NarrativeInputError("RENDER_REQUIRES_ADMISSIBLE_BEAT")`.

Return:

```python
{
    "schema": "mortal_narrative.render-check/v0",
    "render_id": render_receipt["render_id"],
    "beat_id": proposal["beat_id"],
    "status": "pass" if not violations else "fail",
    "violations": violations,
}
```

- [ ] **Step 5: Export, verify, commit**

```bash
python3 -m unittest tests.test_mortal_narrative_evaluator tests.test_mortal_narrative_render_guard -v
git add adapters/novelist tests/test_mortal_narrative_render_guard.py
git commit -m "feat: guard narrative render modes"
```

Expected: PASS.

---

### Task 5: Build the blind cross-stack Gate-E runner

**Files:**
- Create: `tools/run_mortal_narrative_blind_proof.py`
- Create: `tests/test_mortal_narrative_blind.py`

**Interfaces:**
- Consumes: Gate-E narrative vector, Gate-D actor vector, and exact dependency roots.
- Produces: `mortal_narrative.blind-case-receipt/v0` and `mortal_narrative.blind-score/v0`.

- [ ] **Step 1: Write failing materialization tests**

```python
proposal = materialize_beat(template_e1, actor_case["runs"]["MA-A-A0"])
self.assertEqual(proposal["schema"], "mortal_narrative.beat-proposal/v0")
self.assertEqual(proposal["actor_id"], actor_case["runs"]["MA-A-A0"]["actor_id"])
self.assertEqual(proposal["cut_id"], actor_case["runs"]["MA-A-A0"]["cut_id"])
self.assertEqual(proposal["projection_digest"], actor_case["runs"]["MA-A-A0"]["projection_handoff"]["projection_digest"])
self.assertEqual(proposal["evaluation_compile_id"], actor_case["runs"]["MA-A-A0"]["loadout_binding"]["evaluation_compile_id"])
self.assertEqual(proposal["evaluation_compile_digest"], actor_case["runs"]["MA-A-A0"]["loadout_binding"]["evaluation_compile_digest"])
```

Test the same identity materialization for `BELIEF-N-Q2`.

- [ ] **Step 2: Write failing CASE/scorer tests**

CASE must produce the eight exact dispositions in `EXPECTED` and four render outcomes in `EXPECTED_RENDER`.

Scorer controls:

```text
E1 reroute_required
E2 narrative_admissible, parent E1, same proposed_action as E1
E3 narrative_admissible while E1 remains reroute_required
E5 narrative_admissible while Gate-D oracle global_truth.Q2 == false
R1 fail
R2 pass
R3 fail
R4 fail
all inherited LOADOUT bindings authority_expanded == false
all inherited LOADOUT bindings side_effect_executed == false
zero mismatches
```

- [ ] **Step 3: Run and confirm failure**

```bash
python3 -m unittest tests.test_mortal_narrative_blind -v
```

Expected: FAIL because the runner does not exist.

- [ ] **Step 4: Implement materialization helpers**

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
```

`materialize_formation(template, actor_run)` fills the same actor/cut/projection/compile identity and preserves `formation_id`, `claim_id`, `mode`, and `formation_refs`.

- [ ] **Step 5: Implement blind CASE execution**

```python
def run_case(
    *,
    narrative_vector_root: Path,
    actor_vector_root: Path,
    three_rdi_root: Path,
    loadout_root: Path,
    alex_root: Path,
) -> dict:
    ...
```

Flow:

```text
1. call existing Gate-D run_case(...)
2. load only narrative manifest + case templates
3. materialize and validate formation receipts
4. materialize each beat
5. pass only the named run's existing alex_results to evaluate_beat_proposal
6. evaluate all eight beats
7. run R1 against E8 and R2/R3/R4 against admissible E2
8. emit materialized proposals, formations, evaluations, render checks, and inherited Gate-D case digest
9. compute deterministic SHA256 JSON case_receipt_digest
```

`run_case` must not contain `private-oracle.json` and must never read either manifest's `oracle_ref`.

- [ ] **Step 6: Implement post-CASE scoring**

```python
def score_case(
    *,
    narrative_vector_root: Path,
    actor_vector_root: Path,
    case_receipt: dict,
) -> dict:
    ...
```

Only this function opens both oracles. Return:

```python
{
    "schema": "mortal_narrative.blind-score/v0",
    "vector_id": "THE-PERFECT-SCENE-THAT-CHEATS-001",
    "case_receipt_digest": case_receipt["case_receipt_digest"],
    "status": "pass" or "fail",
    "mismatches": [],
    "same_action_different_basis_control": bool,
    "later_cut_without_rewrite_control": bool,
    "local_false_belief_control": bool,
    "reader_irony_control": bool,
    "narrator_boundary_control": bool,
    "render_mode_control": bool,
    "no_authority_expansion": bool,
    "no_side_effects": bool,
    "beat_evaluation_count": 8,
    "render_check_count": 4,
}
```

- [ ] **Step 7: Implement CLI**

```bash
python3 tools/run_mortal_narrative_blind_proof.py case \
  --narrative-vector specimens/mortal-narrative-001 \
  --actor-vector specimens/mortal-actor-001 \
  --three-rdi-root deps/3rdi \
  --loadout-root deps/loadout \
  --alex-root deps/alex

python3 tools/run_mortal_narrative_blind_proof.py score \
  --narrative-vector specimens/mortal-narrative-001 \
  --actor-vector specimens/mortal-actor-001 \
  --case-receipt /tmp/mortal-narrative-case.json
```

- [ ] **Step 8: Verify and commit**

```bash
python3 -m unittest \
  tests.test_mortal_narrative_vector \
  tests.test_mortal_narrative_formation \
  tests.test_mortal_narrative_evaluator \
  tests.test_mortal_narrative_render_guard \
  tests.test_mortal_narrative_blind -v
git add tools/run_mortal_narrative_blind_proof.py tests/test_mortal_narrative_blind.py
git commit -m "test: prove MORTAL-NARRATIVE-001 blind composition"
```

Expected: PASS.

---

### Task 6: Wire terminal CI with both oracles physically absent

**Files:**
- Create: `.github/workflows/mortal-narrative-001.yml`
- Modify: `specimens/mortal-narrative-001/README.md` only if final commands differ from the Task-1 text.

**Interfaces:**
- Consumes: completed Gate-E adapter/vector/runner plus pinned dependencies.
- Produces: terminal GitHub Actions proof receipt.

- [ ] **Step 1: Add the workflow and exact dependency checkouts**

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
python3 -m unittest \
  tests.test_mortal_actor_vector \
  tests.test_mortal_narrative_vector \
  tests.test_mortal_narrative_formation \
  tests.test_mortal_narrative_evaluator \
  tests.test_mortal_narrative_render_guard \
  tests.test_mortal_narrative_blind -v
```

Expected: PASS.

- [ ] **Step 3: Remove both oracles and run CASE**

```bash
mv specimens/mortal-actor-001/oracle/private-oracle.json /tmp/mortal-actor-private-oracle.json
mv specimens/mortal-narrative-001/oracle/private-oracle.json /tmp/mortal-narrative-private-oracle.json

python3 tools/run_mortal_narrative_blind_proof.py case \
  --narrative-vector specimens/mortal-narrative-001 \
  --actor-vector specimens/mortal-actor-001 \
  --three-rdi-root deps/3rdi \
  --loadout-root deps/loadout \
  --alex-root deps/alex \
  > /tmp/mortal-narrative-case.json

test ! -e specimens/mortal-actor-001/oracle/private-oracle.json
test ! -e specimens/mortal-narrative-001/oracle/private-oracle.json
```

- [ ] **Step 4: Restore only after CASE and score**

```bash
mv /tmp/mortal-actor-private-oracle.json specimens/mortal-actor-001/oracle/private-oracle.json
mv /tmp/mortal-narrative-private-oracle.json specimens/mortal-narrative-001/oracle/private-oracle.json

python3 tools/run_mortal_narrative_blind_proof.py score \
  --narrative-vector specimens/mortal-narrative-001 \
  --actor-vector specimens/mortal-actor-001 \
  --case-receipt /tmp/mortal-narrative-case.json \
  | tee /tmp/mortal-narrative-score.json
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

- [ ] **Step 6: Run the terminal sequence locally before claiming completion**

Record the exact score JSON and implementation commit SHA in the implementation PR. The proof must show:

```text
E1 cheats and reroutes
E2 reaches the same external action lawfully
E3 knows later without rewriting E1
E5 remains admissible while Q2 is globally false
reader exposition remains reader-only
narrator knowledge remains narrator-only
GUESS cannot render as KNOW
no authority expands
no side effect executes
```

- [ ] **Step 7: Commit CI**

```bash
git add .github/workflows/mortal-narrative-001.yml specimens/mortal-narrative-001/README.md
git commit -m "ci: verify MORTAL-NARRATIVE-001 blind proof"
```

- [ ] **Step 8: Open the implementation PR without merging it**

The PR body must state that it is stacked on Gate-D PR #77, list the exact three pinned constituent commits, include the terminal score receipt, and state:

```text
Green proves this hostile specimen only.
It does not imply canon, owning-world admission, publication authority, side-effect permission, or merge authority.
```
