# MORTAL-NARRATIVE-001 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Gate E as a neutral Novelist-facing application profile that rejects counterfeit character knowledge, preserves lawful error and dramatic irony, and proves the behavior against the existing `FOUR WITNESSES / ONE ROOM` mortal stack.

**Architecture:** Keep `LOADOUT → 3rdi → ALEX` unchanged. Add a pure neutral adapter under `adapters/novelist/` that consumes already-formed receipts and emits only narrative application dispositions; add a hostile narrative specimen and a blind proof runner that composes the pinned Gate-D constituent commits without creating a shared production runtime. The implementation branch must be stacked on the Gate-D blind-proof branch so the existing actor vector and blind runner are reused rather than copied.

**Tech Stack:** Python 3.12 standard library, `unittest`, JSON fixtures, GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-08-28-mortal-narrative-001-design.md`

## Global Constraints

- Execution starts from the current Gate-D proof head `709590bfb4ad14ea3ba806d8d63fc37f2fe6eae6` (`feat/mortal-actor-001-blind-proof`, PR #77). If that head moves before execution, inspect the new diff and re-establish compatibility before creating the implementation worktree.
- Keep the constituent proof commits pinned unless a separate reviewed change deliberately updates them:
  - 3rdi: `04781217996622cf3e8d151d845c64772189b17d`
  - LOADOUT: `08048efba661242d07b489240d237a6d1544e747`
  - ALEX LOCAL-SUPPORT-001: `61acaee2d6f56c66431c00fb1720590f6c5c4e21`
- Do not create a shared runtime. The neutral adapter consumes receipt dictionaries only and must not import `three_rdi`, `skills.loadout`, or `alex_runtime`.
- Do not modify LOADOUT, 3rdi, ALEX, MEMENTO, or eCODE semantics in Gate E.
- MEMENTO durability is optional and out of scope. eCODE admission through `H` is out of scope.
- The adapter never opens either private oracle. Oracle access exists only in the scoring phase after the CASE receipt is complete.
- `reader knowledge != narrator knowledge != character knowledge`; reader/narrator-only material cannot validate a character formation.
- `local_basis_accept != global truth`; a locally attributable false belief must remain narratively admissible.
- `narrative_admissible`, `reroute_required`, and `narrative_unresolved` are the only creative dispositions. None means canon, admission, publication, side-effect permission, or truth.
- Malformed schema or exact identity mismatch is an input error, not a creative reroute.
- A reroute creates a new beat with `parent_beat_id`; the failed candidate remains immutable and attributable.
- Formation validation proves local provenance and exact claim/mode binding as declared. It does not infer semantic truth from a 3rdi stance ID and does not turn a formation receipt into evidence.
- The render guard is structured and deterministic in v0. Do not add NLP/prose parsing.
- No implementation PR is merged as part of executing this plan.

## File Structure

### Neutral application adapter

- Create `adapters/novelist/__init__.py` — public exports for the neutral Gate-E adapter.
- Create `adapters/novelist/formation.py` — validate claim-specific `BELIEVE`/`SUSPECT` formation receipts against exact 3rdi and LOADOUT identities.
- Create `adapters/novelist/evaluator.py` — evaluate `KNOW`, `BELIEVE`, `SUSPECT`, and `GUESS` from existing receipts and emit one of the three creative dispositions.
- Create `adapters/novelist/render_guard.py` — structured guard against rendering a weaker declared character state as stronger knowledge or using reader/narrator exposition as character-action basis.

### Hostile specimen

- Create `specimens/mortal-narrative-001/README.md` — specimen purpose, boundaries, and candidate matrix.
- Create `specimens/mortal-narrative-001/manifest.json` — references to candidate templates, formation templates, render receipts, actor vector, and sealed narrative oracle.
- Create `specimens/mortal-narrative-001/case/beat-templates.json` — stable candidate templates; exact projection/compile identities are materialized from the Gate-D case receipt at runtime.
- Create `specimens/mortal-narrative-001/case/formation-templates.json` — stable claim/mode/local-ref templates; exact identities are materialized at runtime.
- Create `specimens/mortal-narrative-001/case/render-receipts.json` — structured render assertions for mode-escalation and reader/narrator leakage controls.
- Create `specimens/mortal-narrative-001/oracle/private-oracle.json` — expected Gate-E dispositions and render-check outcomes only; do not duplicate Gate-D global truth.

### Verification and execution

- Create `tools/verify_mortal_narrative_vector.py` — structural verifier for fixture invariants and hostile mutations.
- Create `tools/run_mortal_narrative_blind_proof.py` — run Gate D, materialize exact Gate-E inputs, evaluate them without either oracle, then score only after both oracles are restored.
- Create `tests/test_mortal_narrative_vector.py` — structural fixture tests.
- Create `tests/test_mortal_narrative_formation.py` — formation validation tests.
- Create `tests/test_mortal_narrative_evaluator.py` — epistemic-mode and identity-gate tests.
- Create `tests/test_mortal_narrative_render_guard.py` — render-state tests.
- Create `tests/test_mortal_narrative_blind.py` — integration-level receipt and scorer tests using the real fixture shapes.
- Create `.github/workflows/mortal-narrative-001.yml` — blind Gate-E CI with both oracles physically absent during CASE.

---

### Task 1: Freeze `THE PERFECT SCENE THAT CHEATS` as a hostile narrative vector

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
- Consumes: existing `specimens/mortal-actor-001/manifest.json`, Gate-D run IDs `MA-A-A0`, `MA-R-R0`, `MA-N-N0`, `MA-A-A1`, and claim IDs `Q1`–`Q5`.
- Produces: `mortal_narrative.vector/v0` fixture templates that later tasks materialize into exact `mortal_narrative.beat-proposal/v0` and `mortal_narrative.formation/v0` receipts.

- [ ] **Step 1: Write the failing structural tests**

Create `tests/test_mortal_narrative_vector.py` with direct JSON assertions plus mutation tests. The core candidate matrix must be exact:

```python
EXPECTED = {
    "E1": "reroute_required",      # A0 uses Q5 as KNOW
    "E2": "narrative_admissible", # same action, lawful wager
    "E3": "narrative_admissible", # A1 uses Q5 as KNOW
    "E4": "reroute_required",      # reader-visible Q1 must not leak to A0
    "E5": "narrative_admissible", # N0 BELIEVE Q2 from local formation
    "E6": "narrative_unresolved", # Q3 SUSPECT without formation receipt
    "E7": "narrative_unresolved", # Q4 KNOW with unresolved causal support
    "E8": "narrative_admissible", # Q5 GUESS under explicit wager/pressure
}

EXPECTED_RENDER = {
    "R1": "fail", # E8 GUESS rendered as character KNOW
    "R2": "pass", # reader KNOW as exposition only
    "R3": "fail", # reader KNOW used as character-action basis
}
```

Tests must assert:

```python
self.assertEqual(beats["E1"]["run_id"], "MA-A-A0")
self.assertEqual(beats["E1"]["epistemic_uses"], [{"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": None}])
self.assertEqual(beats["E2"]["parent_beat_id"], "E1")
self.assertEqual(beats["E2"]["proposed_action"], beats["E1"]["proposed_action"])
self.assertEqual(beats["E2"]["epistemic_uses"], [])
self.assertTrue(beats["E2"]["non_epistemic_drivers"])
self.assertEqual(beats["E3"]["run_id"], "MA-A-A1")
self.assertEqual(beats["E5"]["run_id"], "MA-N-N0")
self.assertEqual(beats["E5"]["epistemic_uses"][0]["formation_receipt_id"], "BELIEF-N-Q2")
```

Add hostile mutations that must fail verification when:

```text
E2 loses parent_beat_id
E2 changes proposed_action away from E1
E2 loses all non_epistemic_drivers
a duplicate beat_id appears
BELIEF-N-Q2 changes claim_id away from Q2
BELIEF-N-Q2 loses decode-lamp-N or stance-lamp-N
R1 stops escalating GUESS to KNOW
oracle_ref moves under case/
actor_vector_ref stops pointing to ../mortal-actor-001
```

- [ ] **Step 2: Run the new tests and verify they fail because the fixture/verifier does not exist**

Run:

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
```

Expected: FAIL from missing `specimens/mortal-narrative-001` and/or `tools.verify_mortal_narrative_vector`.

- [ ] **Step 3: Create the fixture files with stable templates, not derived digests**

Use this manifest shape:

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

`case/beat-templates.json` stores narrative intent plus `run_id`, never copied projection/compile digests. At runtime the runner must bind exact identities from the named Gate-D run. Required entries:

```json
{
  "schema": "mortal_narrative.beat-templates/v0",
  "beats": [
    {
      "beat_id": "E1",
      "parent_beat_id": null,
      "run_id": "MA-A-A0",
      "dramatic_destination": "open the north door",
      "epistemic_uses": [{"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": null}],
      "non_epistemic_drivers": [],
      "proposed_action": "open-north-door",
      "proposed_consequence": "north-door-opens"
    },
    {
      "beat_id": "E2",
      "parent_beat_id": "E1",
      "run_id": "MA-A-A0",
      "dramatic_destination": "open the north door",
      "epistemic_uses": [],
      "non_epistemic_drivers": [
        {"kind": "pressure", "ref": "clock-running"},
        {"kind": "wager", "ref": "deliberate-gamble"}
      ],
      "proposed_action": "open-north-door",
      "proposed_consequence": "north-door-opens"
    },
    {
      "beat_id": "E3",
      "parent_beat_id": null,
      "run_id": "MA-A-A1",
      "dramatic_destination": "identify the note and act on it",
      "epistemic_uses": [{"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": null}],
      "non_epistemic_drivers": [],
      "proposed_action": "identify-red-note",
      "proposed_consequence": "note-identity-recognized"
    },
    {
      "beat_id": "E4",
      "parent_beat_id": null,
      "run_id": "MA-A-A0",
      "dramatic_destination": "act on the reader-visible note fact",
      "epistemic_uses": [{"claim_id": "Q1", "requested_mode": "KNOW", "formation_receipt_id": null}],
      "non_epistemic_drivers": [],
      "proposed_action": "act-as-if-note-was-known",
      "proposed_consequence": null
    },
    {
      "beat_id": "E5",
      "parent_beat_id": null,
      "run_id": "MA-N-N0",
      "dramatic_destination": "act on the lamp interpretation",
      "epistemic_uses": [{"claim_id": "Q2", "requested_mode": "BELIEVE", "formation_receipt_id": "BELIEF-N-Q2"}],
      "non_epistemic_drivers": [],
      "proposed_action": "treat-door-as-unlocked",
      "proposed_consequence": null
    },
    {
      "beat_id": "E6",
      "parent_beat_id": null,
      "run_id": "MA-R-R0",
      "dramatic_destination": "suspect the red-note author",
      "epistemic_uses": [{"claim_id": "Q3", "requested_mode": "SUSPECT", "formation_receipt_id": null}],
      "non_epistemic_drivers": [],
      "proposed_action": "voice-author-suspicion",
      "proposed_consequence": null
    },
    {
      "beat_id": "E7",
      "parent_beat_id": null,
      "run_id": "MA-R-R0",
      "dramatic_destination": "claim one chime caused the other",
      "epistemic_uses": [{"claim_id": "Q4", "requested_mode": "KNOW", "formation_receipt_id": null}],
      "non_epistemic_drivers": [],
      "proposed_action": "assert-chime-causality",
      "proposed_consequence": null
    },
    {
      "beat_id": "E8",
      "parent_beat_id": null,
      "run_id": "MA-A-A0",
      "dramatic_destination": "choose north without knowing",
      "epistemic_uses": [{"claim_id": "Q5", "requested_mode": "GUESS", "formation_receipt_id": null}],
      "non_epistemic_drivers": [{"kind": "wager", "ref": "choose-under-uncertainty"}],
      "proposed_action": "open-north-door",
      "proposed_consequence": "north-door-opens"
    }
  ]
}
```

`case/formation-templates.json` must include the exact N0 local formation refs already present in Gate B:

```json
{
  "schema": "mortal_narrative.formation-templates/v0",
  "formations": [
    {
      "formation_id": "BELIEF-N-Q2",
      "run_id": "MA-N-N0",
      "claim_id": "Q2",
      "mode": "BELIEVE",
      "formation_refs": [
        "decoder:decode-lamp-N",
        "stance:stance-lamp-N"
      ]
    }
  ]
}
```

`case/render-receipts.json` must contain:

```json
{
  "schema": "mortal_narrative.render-receipts/v0",
  "renders": [
    {
      "render_id": "R1",
      "beat_id": "E8",
      "assertions": [{"scope": "character", "claim_id": "Q5", "rendered_mode": "KNOW", "causal_role": "character-action-basis"}]
    },
    {
      "render_id": "R2",
      "beat_id": "E4",
      "assertions": [{"scope": "reader", "claim_id": "Q1", "rendered_mode": "KNOW", "causal_role": "exposition"}]
    },
    {
      "render_id": "R3",
      "beat_id": "E4",
      "assertions": [{"scope": "reader", "claim_id": "Q1", "rendered_mode": "KNOW", "causal_role": "character-action-basis"}]
    }
  ]
}
```

The narrative oracle contains only the expected candidate/render matrix shown in Step 1.

- [ ] **Step 4: Implement the structural verifier**

`tools/verify_mortal_narrative_vector.py` must expose:

```python
def verify_vector(root: Path) -> list[str]:
    ...
```

It must check exact schema names, unique IDs, valid `run_id` membership against the actor manifest, valid Q1–Q5 claim references, parent ancestry, E1/E2 same-action control, formation-template claim/mode shape, required N0 refs, render target IDs, and physical oracle separation. It must return stable string error codes and print `MORTAL-NARRATIVE-001 vector: OK` only when the list is empty.

- [ ] **Step 5: Run structural tests and verifier**

Run:

```bash
python3 -m unittest tests.test_mortal_narrative_vector -v
python3 tools/verify_mortal_narrative_vector.py specimens/mortal-narrative-001
```

Expected: all tests PASS and verifier prints exactly `MORTAL-NARRATIVE-001 vector: OK`.

- [ ] **Step 6: Commit the frozen hostile vector**

```bash
git add specimens/mortal-narrative-001 tools/verify_mortal_narrative_vector.py tests/test_mortal_narrative_vector.py
git commit -m "test: freeze MORTAL-NARRATIVE-001 hostile vector"
```

---

### Task 2: Implement claim-specific narrative formation validation

**Files:**
- Create: `adapters/novelist/__init__.py`
- Create: `adapters/novelist/formation.py`
- Create: `tests/test_mortal_narrative_formation.py`

**Interfaces:**
- Consumes: `mortal_actor.3rdi-handoff/v0`, `mortal_actor.loadout-binding/v0`, and a fully materialized `mortal_narrative.formation/v0` receipt.
- Produces: `validate_formation_receipt(receipt, *, projection_handoff, loadout_binding) -> list[str]`.

- [ ] **Step 1: Write failing formation tests**

Tests must cover these exact cases:

```python
self.assertEqual(validate_formation_receipt(valid_n_q2, projection_handoff=n0_projection, loadout_binding=n0_binding), [])
```

Mutations must produce stable errors:

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

Use a projection fixture whose visible trace contains:

```python
{
    "visible_occurrence_ids": ["lamp-flicker"],
    "visible_causal_edge_ids": [],
    "visible_relevance_edge_ids": ["relevance-mirror-red-note"],
    "contact_ids": ["contact-lamp-N"],
    "attention_event_ids": ["attention-lamp-N"],
    "decoder_application_ids": ["decode-lamp-N"],
    "stance_ids": ["stance-lamp-N"],
}
```

Explicitly test that these fail for N0:

```text
occurrence:reader-margin-note
occurrence:merge-read
stance:stance-red-note-A1
```

- [ ] **Step 2: Run the formation tests and verify failure**

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
```

Expected: FAIL because `adapters.novelist.formation` does not exist.

- [ ] **Step 3: Implement the projection-local namespace index**

In `adapters/novelist/formation.py` define exactly:

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

This function must never accept hidden IDs from a separate withheld list because the 3rdi handoff intentionally does not expose such identities.

- [ ] **Step 4: Implement `validate_formation_receipt`**

Use this exact signature:

```python
def validate_formation_receipt(
    receipt: dict,
    *,
    projection_handoff: dict,
    loadout_binding: dict,
) -> list[str]:
    ...
```

Validation rules:

```text
receipt schema == mortal_narrative.formation/v0
mode in {BELIEVE, SUSPECT}
actor_id == projection.observer == binding.actor_id
cut_id == projection.cut_id
projection_digest == projection.projection_digest == binding.projection_ref
evaluation_compile_id == binding.evaluation_compile_id
evaluation_compile_digest == binding.evaluation_compile_digest
claim_id is non-empty
formation_refs is a non-empty list
all prefixes exist in PREFIX_TO_FIELD
all refs are present in projection_formation_refs(projection)
```

Return unique errors in deterministic insertion order. Do not evaluate truth, SUPPORTS, or semantic correctness of the claim.

- [ ] **Step 5: Export the formation API and run tests**

`adapters/novelist/__init__.py` initially exports:

```python
from .formation import projection_formation_refs, validate_formation_receipt

__all__ = ["projection_formation_refs", "validate_formation_receipt"]
```

Run:

```bash
python3 -m unittest tests.test_mortal_narrative_formation -v
```

Expected: PASS.

- [ ] **Step 6: Commit formation validation**

```bash
git add adapters/novelist tests/test_mortal_narrative_formation.py
git commit -m "feat: validate mortal narrative formations"
```

---

### Task 3: Implement the neutral beat evaluator and the four narrative modes

**Files:**
- Create: `adapters/novelist/evaluator.py`
- Modify: `adapters/novelist/__init__.py`
- Create: `tests/test_mortal_narrative_evaluator.py`

**Interfaces:**
- Consumes: a full `mortal_narrative.beat-proposal/v0`, one exact 3rdi handoff, one exact LOADOUT binding, `dict[str, dict]` of ALEX local-support results keyed by Q-id, and `dict[str, dict]` of materialized formation receipts keyed by formation ID.
- Produces: `evaluate_beat_proposal(...) -> mortal_narrative.evaluation/v0` or raises `NarrativeInputError` for malformed/identity-invalid inputs.

- [ ] **Step 1: Write failing evaluator tests for exact identity gating**

Define a synthetic coherent bundle and assert that each mutation raises `NarrativeInputError`:

```text
proposal actor != projection observer
proposal actor != LOADOUT actor
proposal cut != projection cut
proposal projection digest != 3rdi digest
proposal projection digest != LOADOUT projection_ref
proposal compile ID != LOADOUT evaluation compile ID
proposal compile digest != LOADOUT evaluation compile digest
ALEX result claim_id != requested claim
ALEX result cut/projection/compile identity != proposal identity
unsupported requested_mode
malformed proposal schema
```

These failures must not return `reroute_required`.

- [ ] **Step 2: Write failing evaluator tests for mode behavior**

Required assertions:

```python
# KNOW
a0_q5 = evaluate_beat_proposal(... alex_results={"Q5": {"local_disposition": "basis_outside_projection", ...}})
self.assertEqual(a0_q5["disposition"], "reroute_required")
self.assertEqual(a0_q5["offending_uses"][0]["reason_code"], "COUNTERFEIT_CHARACTER_KNOWLEDGE")

a1_q5 = evaluate_beat_proposal(... alex_results={"Q5": {"local_disposition": "local_basis_accept", ...}})
self.assertEqual(a1_q5["disposition"], "narrative_admissible")

# unresolved KNOW
q4 = evaluate_beat_proposal(... alex_results={"Q4": {"local_disposition": "local_basis_unresolved", ...}})
self.assertEqual(q4["disposition"], "narrative_unresolved")

# BELIEVE
false_belief = evaluate_beat_proposal(... formation_receipts={"BELIEF-N-Q2": valid_formation})
self.assertEqual(false_belief["disposition"], "narrative_admissible")

# BELIEVE/SUSPECT require their exact formation receipt
missing_formation = evaluate_beat_proposal(... formation_receipts={})
self.assertEqual(missing_formation["disposition"], "narrative_unresolved")

# A Q2 formation cannot be reused for Q3
with self.assertRaises(NarrativeInputError):
    evaluate_beat_proposal(q3_suspect_pointing_to_q2_receipt, ...)

# GUESS
self.assertEqual(evaluate_beat_proposal(guess_with_driver, ...)["disposition"], "narrative_admissible")
self.assertEqual(evaluate_beat_proposal(guess_without_driver, ...)["disposition"], "narrative_unresolved")

# no epistemic uses; lawful non-epistemic action
self.assertEqual(evaluate_beat_proposal(wager_only_beat, ...)["disposition"], "narrative_admissible")
```

- [ ] **Step 3: Run evaluator tests and verify failure**

```bash
python3 -m unittest tests.test_mortal_narrative_evaluator -v
```

Expected: FAIL because the evaluator does not exist.

- [ ] **Step 4: Implement `NarrativeInputError` and exact bundle validation**

In `adapters/novelist/evaluator.py` define:

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

Before mode evaluation, validate:

```text
proposal.schema == mortal_narrative.beat-proposal/v0
projection.schema == mortal_actor.3rdi-handoff/v0
binding.schema == mortal_actor.loadout-binding/v0
actor/cut/projection/compile ID+digest exact equality
beat_id, dramatic_destination, proposed_action non-empty
epistemic_uses and non_epistemic_drivers are lists
parent_beat_id is null or non-empty string
```

- [ ] **Step 5: Implement the mode evaluator without re-running ALEX**

Use these exact rules:

```python
if requested_mode == "KNOW":
    result = alex_results.get(claim_id)
    if result is None:
        unresolved(..., "LOCAL_SUPPORT_RESULT_MISSING")
    else:
        validate_alex_identity_or_raise(result)
        disposition = result.get("local_disposition")
        if disposition == "local_basis_accept":
            pass
        elif disposition in {"basis_outside_projection", "local_basis_counterpressured"}:
            offending(..., "COUNTERFEIT_CHARACTER_KNOWLEDGE", local_support_disposition=disposition)
        elif disposition == "local_basis_unresolved":
            unresolved(..., "LOCAL_SUPPORT_UNRESOLVED")
        elif disposition in {"projection_mismatch", "compile_mismatch"}:
            raise NarrativeInputError("ALEX_IDENTITY_MISMATCH")
        else:
            unresolved(..., "LOCAL_SUPPORT_DISPOSITION_UNKNOWN")

elif requested_mode in {"BELIEVE", "SUSPECT"}:
    formation_id = use.get("formation_receipt_id")
    if not formation_id or formation_id not in formation_receipts:
        unresolved(..., "FORMATION_RECEIPT_MISSING")
    else:
        formation = formation_receipts[formation_id]
        errors = validate_formation_receipt(...)
        if errors:
            raise NarrativeInputError("FORMATION_INVALID:" + ",".join(errors))
        if formation["claim_id"] != claim_id or formation["mode"] != requested_mode:
            raise NarrativeInputError("FORMATION_BINDING_MISMATCH")

elif requested_mode == "GUESS":
    if not proposal["non_epistemic_drivers"]:
        unresolved(..., "GUESS_DRIVER_REQUIRED")
```

Top-level precedence:

```text
any hard identity/schema problem -> raise NarrativeInputError
else any offending use -> reroute_required
else any unresolved use -> narrative_unresolved
else -> narrative_admissible
```

- [ ] **Step 6: Emit only the neutral evaluation receipt**

The result must have this shape:

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

Add a recursive forbidden-key test asserting the result contains none of:

```text
truth
canon
admitted
authorized
publication
side_effect
world_write
```

- [ ] **Step 7: Export evaluator API and run all adapter tests**

Update `adapters/novelist/__init__.py` to export:

```python
NarrativeInputError
evaluate_beat_proposal
projection_formation_refs
validate_formation_receipt
```

Run:

```bash
python3 -m unittest tests.test_mortal_narrative_formation tests.test_mortal_narrative_evaluator -v
```

Expected: PASS.

- [ ] **Step 8: Commit the evaluator**

```bash
git add adapters/novelist tests/test_mortal_narrative_evaluator.py
git commit -m "feat: evaluate mortal narrative agency"
```

---

### Task 4: Add the structured Novelist render guard

**Files:**
- Create: `adapters/novelist/render_guard.py`
- Modify: `adapters/novelist/__init__.py`
- Create: `tests/test_mortal_narrative_render_guard.py`

**Interfaces:**
- Consumes: one beat proposal, its `narrative_admissible` evaluation, and a structured render receipt.
- Produces: `check_render_receipt(proposal, evaluation, render_receipt) -> mortal_narrative.render-check/v0`.

- [ ] **Step 1: Write failing render-guard tests**

Required controls:

```python
self.assertEqual(check_render_receipt(e8_guess, e8_eval, r1_guess_as_know)["status"], "fail")
self.assertIn("CHARACTER_MODE_ESCALATION", check_render_receipt(e8_guess, e8_eval, r1_guess_as_know)["violations"])

self.assertEqual(check_render_receipt(e4, admissible_for_render_fixture, r2_reader_exposition)["status"], "pass")

self.assertEqual(check_render_receipt(e4, admissible_for_render_fixture, r3_reader_as_action_basis)["status"], "fail")
self.assertIn("NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS", check_render_receipt(...)["violations"])
```

Also test exact beat/actor/cut identity mismatch raises `NarrativeInputError` rather than returning `fail`.

- [ ] **Step 2: Run render tests and verify failure**

```bash
python3 -m unittest tests.test_mortal_narrative_render_guard -v
```

Expected: FAIL because `render_guard.py` does not exist.

- [ ] **Step 3: Implement structured mode weakening rules**

Define:

```python
ALLOWED_RENDER_MODES = {
    "GUESS": {"GUESS"},
    "SUSPECT": {"SUSPECT", "GUESS"},
    "BELIEVE": {"BELIEVE", "SUSPECT", "GUESS"},
    "KNOW": {"KNOW", "BELIEVE", "SUSPECT", "GUESS"},
}
```

The guard checks only assertions with `scope == "character"` against the beat's declared epistemic use. A character assertion stronger than the declared mode yields `CHARACTER_MODE_ESCALATION`.

For `scope in {"reader", "narrator"}`:

```text
causal_role == exposition -> allowed
causal_role == character-action-basis -> NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS
```

Unknown scope/mode/causal role is an input error.

- [ ] **Step 4: Implement and export `check_render_receipt`**

Use this exact signature:

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

- [ ] **Step 5: Run render and evaluator tests**

```bash
python3 -m unittest \
  tests.test_mortal_narrative_evaluator \
  tests.test_mortal_narrative_render_guard -v
```

Expected: PASS.

- [ ] **Step 6: Commit the render guard**

```bash
git add adapters/novelist tests/test_mortal_narrative_render_guard.py
git commit -m "feat: guard narrative render modes"
```

---

### Task 5: Build the blind cross-stack Gate-E proof runner

**Files:**
- Create: `tools/run_mortal_narrative_blind_proof.py`
- Create: `tests/test_mortal_narrative_blind.py`

**Interfaces:**
- Consumes: the Gate-E narrative vector, the existing Gate-D actor vector, and the exact three dependency roots already used by `run_mortal_actor_blind_proof.py`.
- Produces: CASE receipt `mortal_narrative.blind-case-receipt/v0` and score `mortal_narrative.blind-score/v0`.

- [ ] **Step 1: Write failing integration tests for materialization**

Import the existing Gate-D runner from `tools/run_mortal_actor_blind_proof.py` and test pure helpers in the new runner.

A beat template must materialize exact identities from its `run_id`:

```python
proposal = materialize_beat(template_e1, actor_case["runs"]["MA-A-A0"])
self.assertEqual(proposal["schema"], "mortal_narrative.beat-proposal/v0")
self.assertEqual(proposal["actor_id"], actor_case["runs"]["MA-A-A0"]["actor_id"])
self.assertEqual(proposal["cut_id"], actor_case["runs"]["MA-A-A0"]["cut_id"])
self.assertEqual(proposal["projection_digest"], actor_case["runs"]["MA-A-A0"]["projection_handoff"]["projection_digest"])
self.assertEqual(proposal["evaluation_compile_id"], actor_case["runs"]["MA-A-A0"]["loadout_binding"]["evaluation_compile_id"])
self.assertEqual(proposal["evaluation_compile_digest"], actor_case["runs"]["MA-A-A0"]["loadout_binding"]["evaluation_compile_digest"])
```

Formation materialization must do the same for `BELIEF-N-Q2`.

- [ ] **Step 2: Write failing CASE tests for the eight candidate outcomes**

Run the new `run_case(...)` with synthetic dependency roots or dependency-injected Gate-D case receipt and assert:

```python
actual = {beat_id: item["evaluation"]["disposition"] for beat_id, item in receipt["beats"].items()}
self.assertEqual(actual, EXPECTED)
```

Also assert:

```python
self.assertEqual(receipt["beats"]["E2"]["proposal"]["parent_beat_id"], "E1")
self.assertEqual(receipt["beats"]["E2"]["proposal"]["proposed_action"], receipt["beats"]["E1"]["proposal"]["proposed_action"])
self.assertEqual(receipt["formations"]["BELIEF-N-Q2"]["formation_refs"], ["decoder:decode-lamp-N", "stance:stance-lamp-N"])
```

- [ ] **Step 3: Write failing scorer tests for the killer controls**

The scorer must prove all of these independently:

```text
E1 reroute_required
E2 narrative_admissible with same action and parent E1
E3 narrative_admissible while E1 remains reroute_required
E5 narrative_admissible while Gate-D private oracle says Q2 == false
R1 fail: GUESS rendered as KNOW
R2 pass: reader exposition remains reader-only
R3 fail: reader knowledge used as character-action basis
all inherited LOADOUT bindings authority_expanded == false
all inherited LOADOUT bindings side_effect_executed == false
zero candidate disposition mismatches
```

- [ ] **Step 4: Run blind-runner tests and verify failure**

```bash
python3 -m unittest tests.test_mortal_narrative_blind -v
```

Expected: FAIL because the runner does not exist.

- [ ] **Step 5: Implement template materialization**

In `tools/run_mortal_narrative_blind_proof.py` define:

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

Define `materialize_formation(template, actor_run)` analogously, filling actor/cut/projection/compile identity and preserving claim/mode/formation refs.

- [ ] **Step 6: Implement blind `run_case` without oracle access**

Use this exact signature:

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
1. call Gate-D run_case(actor_vector_root, three_rdi_root, loadout_root, alex_root)
2. load narrative manifest + CASE templates only
3. materialize formation receipts from exact actor runs
4. validate each formation against exact projection + LOADOUT binding
5. materialize each beat proposal
6. pass only that beat's requested ALEX results from actor_run["alex_results"]
7. evaluate beat
8. run structured render checks only for an admissible render target; for R2/R3 use a dedicated render-only admissible wrapper fixture rather than changing E4's rejected character beat
9. write all materialized inputs and results into the CASE receipt
10. compute deterministic SHA256 JSON digest
```

The function must not contain the string `private-oracle.json` and must not read `manifest["oracle_ref"]` from either vector.

- [ ] **Step 7: Implement post-CASE scoring**

Use:

```python
def score_case(
    *,
    narrative_vector_root: Path,
    actor_vector_root: Path,
    case_receipt: dict,
) -> dict:
    ...
```

Only this function opens:

```text
narrative_vector_root / narrative_manifest["oracle_ref"]
actor_vector_root / actor_manifest["oracle_ref"]
```

Return:

```python
{
    "schema": "mortal_narrative.blind-score/v0",
    "vector_id": "THE-PERFECT-SCENE-THAT-CHEATS-001",
    "case_receipt_digest": case_receipt["case_receipt_digest"],
    "status": "pass" or "fail",
    "mismatches": [...],
    "same_action_different_basis_control": bool,
    "later_cut_without_rewrite_control": bool,
    "local_false_belief_control": bool,
    "reader_irony_control": bool,
    "render_mode_control": bool,
    "no_authority_expansion": bool,
    "no_side_effects": bool,
    "beat_evaluation_count": 8,
    "render_check_count": 3,
}
```

- [ ] **Step 8: Implement CLI parity with Gate D**

Commands:

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

- [ ] **Step 9: Run the integration test suite**

```bash
python3 -m unittest \
  tests.test_mortal_narrative_vector \
  tests.test_mortal_narrative_formation \
  tests.test_mortal_narrative_evaluator \
  tests.test_mortal_narrative_render_guard \
  tests.test_mortal_narrative_blind -v
```

Expected: PASS.

- [ ] **Step 10: Commit the blind runner**

```bash
git add tools/run_mortal_narrative_blind_proof.py tests/test_mortal_narrative_blind.py
git commit -m "test: prove MORTAL-NARRATIVE-001 blind composition"
```

---

### Task 6: Wire terminal CI and prove both oracles are absent during CASE

**Files:**
- Create: `.github/workflows/mortal-narrative-001.yml`
- Modify: `specimens/mortal-narrative-001/README.md` only if the final verified command surface differs from Task 1 documentation.

**Interfaces:**
- Consumes: the completed neutral adapter/vector/runner and exact pinned constituent commits.
- Produces: a terminal GitHub Actions proof receipt for Gate E.

- [ ] **Step 1: Add the workflow with exact pinned dependency checkouts**

Use:

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

- [ ] **Step 2: Run all local structural/unit checks before the blind phase**

Workflow command:

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

Expected: all PASS.

- [ ] **Step 3: Physically remove both oracles and run CASE**

Workflow command:

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

- [ ] **Step 4: Restore both oracles only after CASE receipt formation and score**

```bash
mv /tmp/mortal-actor-private-oracle.json specimens/mortal-actor-001/oracle/private-oracle.json
mv /tmp/mortal-narrative-private-oracle.json specimens/mortal-narrative-001/oracle/private-oracle.json

python3 tools/run_mortal_narrative_blind_proof.py score \
  --narrative-vector specimens/mortal-narrative-001 \
  --actor-vector specimens/mortal-actor-001 \
  --case-receipt /tmp/mortal-narrative-case.json \
  | tee /tmp/mortal-narrative-score.json
```

- [ ] **Step 5: Assert every terminal control in CI**

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
assert score["render_mode_control"] is True, score
assert score["no_authority_expansion"] is True, score
assert score["no_side_effects"] is True, score
assert score["beat_evaluation_count"] == 8, score
assert score["render_check_count"] == 3, score
```

- [ ] **Step 6: Run the same terminal verification locally before claiming completion**

Run the complete Task-6 command sequence in the implementation worktree. Record the exact score JSON and current implementation commit SHA in the PR body or a PR comment.

Expected terminal proof:

```text
E1 cheats and reroutes
E2 reaches the same external action lawfully
E3 knows later without rewriting E1
E5 may be locally attributable and globally false
reader/narrator exposure does not become character causality
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

The implementation PR must state that it is stacked on Gate-D PR #77, list the exact pinned constituent commits, include the terminal score receipt, and explicitly say that green CI is proof of this hostile specimen only—not canon, owning-world admission, or merge authority.
