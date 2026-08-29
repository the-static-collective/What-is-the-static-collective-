# MORTAL-NARRATIVE-001 — Lawful Narrative Agency

**Status:** design for review  
**Date:** 2026-08-28  
**Owner surface:** neutral Static Collective design/proof surface  
**Depends on:** MORTAL-ACTOR-001 contract and exact receipt interfaces; Novelist workflow semantics  
**Does not depend on:** MEMENTO durability, eCODE admission, a shared runtime, or a standalone Novelist repository

> **The story may know more than the character. The character may not act as though they do.**

## 1. Purpose

MORTAL-ACTOR-001 proved that an actor can reason lawfully from a partial world and still be wrong. MORTAL-NARRATIVE-001 carries that result into narrative composition.

The profile exists to prevent one specific class of narrative cheat:

> A proposed character beat uses knowledge, certainty, inference, or interpretation that the character could not lawfully possess at the declared cut.

The profile does **not** choose the story, write prose, decide canon, or force a single correction. It determines whether the epistemic basis declared by a proposed beat belongs to the character's mortal world. When it does not, Novelist retains creative ownership of the reroute.

The intended result is not omniscient correctness. Characters may guess, gamble, misunderstand, believe false things, follow desire, obey loyalty, act from fear, or make terrible decisions. What they may not do is silently borrow author knowledge.

## 2. Working Seal

> **A lawful story is not one where everyone knows the truth. It is one where every choice belongs to the world that could actually produce it.**

Operational shorthand:

> **CHARACTERS MAY BE WRONG. THEY MAY NOT BE OMNISCIENT BY ACCIDENT.**

## 3. Architectural Position

The common epistemic spine remains:

```text
LOADOUT
   ↓
3rdi
   ↓
ALEX
```

MORTAL-NARRATIVE-001 is a downstream application profile:

```text
LOADOUT → 3rdi → ALEX
                 │
                 │ proven mortal receipts
                 ▼
              Novelist
                 │
                 │ proposed beat + declared epistemic uses
                 ▼
       MORTAL-NARRATIVE-001
          ┌──────┴──────┐
          │             │
      admissible     reroute
```

Novelist remains the narrative composer. The neutral profile owns only the interoperability question: did this proposed beat rely on a knowledge state that the named actor could lawfully inhabit at the named cut?

No component silently inherits another component's authority.

## 4. Ownership Boundaries

### LOADOUT owns

- entry/evaluation compile identity and digest;
- capability/effect fencing;
- compile ancestry;
- the rule that selection is not evidence;
- proof that a binding did not execute a side effect.

LOADOUT does not decide character knowledge or narrative admissibility.

### 3rdi owns

- observer-local availability;
- cut identity;
- lawful visible occurrence and edge identities;
- contact, attention, decoder, and stance receipts;
- projection identity.

3rdi does not decide SUPPORTS, truth, narrative meaning, or dramatic quality.

### ALEX owns

- bounded support evaluation;
- `LOCAL-SUPPORT-001` results;
- attributable evidence-path pressure;
- preservation of exact claim/cut/projection/compile identity.

ALEX does not decide what a character wants, what a scene should do, or whether a story beat is aesthetically good.

### Novelist owns

- story promise and pressure;
- character desire, fear, value, obligation, and goal;
- reader-model progression;
- proposed beats;
- narrative causality and consequence;
- choosing a lawful reroute when a beat cheats;
- deciding whether a character knows, suspects, guesses, wagers, asks, tests, delays, changes POV, or refuses.

Novelist may know more than a character because author-side planning is not character-side knowledge. It must not silently transfer that extra knowledge into the character.

### MEMENTO may later own

- durable storage of selected narrative/world receipts;
- UNDERSTORY residue;
- historical-imagination persistence;
- later resurfacing.

MEMENTO is **not required** for Gate E. Memory persistence must not become a prerequisite for lawful cognition.

### eCODE may later own

- constitutive admission of consequence;
- the Heart / `H` crossing;
- owning-world consequence after a beat is selected.

MORTAL-NARRATIVE admissibility is not eCODE admission.

## 5. Core Non-Collapse Ladder

The profile preserves these distinctions:

```text
world truth
    != reader knowledge
    != narrator knowledge
    != character availability
    != character contact
    != character attention
    != character decoded meaning
    != character belief
    != character suspicion
    != character guess
    != character choice
    != occurred event
    != narrated event
    != canon
```

Additional laws:

```text
reader knows X != character knows X
character believes X != X is true
character suspects X != character knows X
character guesses X != character supports X
locally supportable X != globally true X
narrative admissible != canon
narrative admissible != consequence occurred
reroute required != action forbidden
same external action != same causal basis
```

## 6. The Central Invariant

For any proposed character beat `b` by actor `o` at cut `c`:

```text
epistemic_basis(b) ⊆ lawfully_reachable(o, c)
```

This condition applies only to the beat's declared **epistemic** basis.

The following are not automatically evidence and must not be forced through ALEX as if they were claims:

- desire;
- fear;
- loyalty;
- value;
- obligation;
- curiosity;
- desperation;
- aesthetic preference;
- habit;
- impulse;
- faith;
- wager;
- bluff;
- random choice;
- strategy chosen under acknowledged uncertainty.

A character therefore may take the same physical action for different lawful reasons.

Example:

```text
external action: OPEN NORTH DOOR
```

Illegal A0 basis:

```text
A opens the north door because A KNOWS the red note points north.
```

Lawful A0 reroute:

```text
A opens the north door because the clock is running,
nothing else has worked, and A decides to gamble.
```

The profile rejects counterfeit knowledge, not dramatic action.

## 7. Beat Proposal Contract

The neutral profile receives a structured proposal. v0 should be small enough to inspect by eye.

```json
{
  "schema": "mortal_narrative.beat-proposal/v0",
  "beat_id": "BEAT-A0-NORTH-DOOR",
  "parent_beat_id": null,
  "actor_id": "A",
  "cut_id": "A0",
  "projection_digest": "sha256:...",
  "evaluation_compile_id": "C0",
  "evaluation_compile_digest": "sha256:...",
  "dramatic_destination": "open the north door",
  "epistemic_uses": [
    {
      "claim_id": "Q5",
      "requested_mode": "KNOW",
      "formation_refs": []
    }
  ],
  "non_epistemic_drivers": [
    {
      "kind": "pressure",
      "ref": "clock-running"
    }
  ],
  "proposed_action": "open-north-door",
  "proposed_consequence": "north-door-opens"
}
```

The proposal carries references, not hidden world content.

### Required identity fields

- `beat_id`
- `actor_id`
- `cut_id`
- `projection_digest`
- `evaluation_compile_id`
- `evaluation_compile_digest`
- `dramatic_destination`
- `epistemic_uses`
- `proposed_action`

`parent_beat_id` is null for an original proposal. A reroute must either set `parent_beat_id` to the rejected proposal or preserve equivalent explicit candidate ancestry; it may not overwrite the failed proposal.

`proposed_consequence` may be null because a narrative planner may pressure a beat before consequence is selected.

### Formation references

`formation_refs` are explicit references to character-local formation receipts. v0 uses namespaced IDs so the evaluator never guesses what an untyped string means:

```text
occurrence:<id>
contact:<id>
attention:<id>
decoder:<id>
stance:<id>
relevance:<edge-id>
causal:<edge-id>
belief:<prior-narrative-receipt-id>
suspicion:<prior-narrative-receipt-id>
```

The evaluator may only accept a formation reference if the referenced identity is present in the exact character-local receipt set supplied to the Gate-E run. Reader-only, narrator-only, author-only, or globally known IDs are not valid substitutes.

## 8. Epistemic Use Modes

v0 supports a deliberately small vocabulary:

```text
KNOW
BELIEVE
SUSPECT
GUESS
```

These modes are narrative declarations, not new ALEX predicates or universal philosophical definitions.

### `KNOW`

Requires the exact `LOCAL-SUPPORT-001` result for the declared `claim_id`, cut, projection digest, compile ID, and compile digest to be `local_basis_accept`.

`formation_refs` may accompany the proposal for narrative provenance but cannot substitute for a missing local-support acceptance.

If local support is `basis_outside_projection`, `local_basis_unresolved`, `projection_mismatch`, or `compile_mismatch`, `KNOW` cannot pass.

### `BELIEVE`

Requires an attributable character-local formation state. In v0, at least one `formation_ref` must resolve to either:

- `stance:<id>` visible in the 3rdi handoff; or
- `belief:<prior-narrative-receipt-id>` supplied by the neutral narrative context.

A `local_basis_accept` result alone does **not** prove belief. Supportability is not mental state.

A belief may be narratively admissible even when the sealed global oracle later says the proposition is false.

### `SUSPECT`

Requires at least one attributable character-local formation reference from:

- visible occurrence;
- contact;
- attention event;
- decoder application;
- stance;
- visible relevance edge;
- visible causal edge;
- prior suspicion receipt.

A globally attractive theory with no character-local formation route is not a lawful suspicion merely because the author likes it.

A suspicion need not satisfy `LOCAL-SUPPORT-001`; its weaker status must remain explicit in the proposal and any rendered prose.

### `GUESS`

May be lawful without evidence for the guessed proposition. `formation_refs` may be empty.

When a `GUESS` is actually used to cause an action, the beat must carry at least one non-epistemic driver that the character can inhabit, such as pressure, wager, random choice, curiosity, desire, or strategy under acknowledged uncertainty.

`GUESS` is not a loophole for prose that narrates certainty while metadata says uncertainty. The Novelist-facing integration proof must preserve the declared mode in the rendered beat.

## 9. Evaluator Inputs

The neutral evaluator receives four separately attributable inputs:

```text
1. beat proposal
2. exact LOADOUT mortal binding
3. exact 3rdi mortal handoff
4. exact ALEX LOCAL-SUPPORT results needed by the proposal
```

It may additionally receive a bounded neutral narrative-state ledger containing prior `belief:` or `suspicion:` receipts. Such prior states are narrative receipts, not MEMENTO requirements.

The evaluator must cross-check:

```text
actor_id
cut_id
projection_digest
evaluation_compile_id
evaluation_compile_digest
claim_id
```

across the relevant receipts before evaluating the requested mode.

An identity mismatch is invalid input. It is not a creative `reroute_required` result.

## 10. Evaluator Dispositions

The profile has only three valid top-level creative dispositions:

```text
narrative_admissible
reroute_required
narrative_unresolved
```

These are application-profile dispositions only.

They are **not**:

- truth values;
- canon states;
- eCODE admission;
- world mutation;
- publication approval;
- side-effect permission;
- aesthetic scores.

### `narrative_admissible`

Every declared epistemic use is lawful at the named actor/cut under its declared mode, and all identity checks are coherent.

### `reroute_required`

At least one declared epistemic use counterfeits a stronger state than the actor's world supports.

The result identifies the offending use but does not prescribe the rewrite.

### `narrative_unresolved`

The system lacks enough attributable information to decide the requested epistemic mode without inventing state, or a supported ambiguity should remain fog rather than become refusal.

Examples:

- `SUSPECT` names only an unresolved formation reference whose status is not yet established;
- `BELIEVE` depends on a prior narrative belief receipt that is referenced but unavailable to this bounded run.

Malformed schema or identity mismatch is an evaluation error outside these three dispositions.

## 11. Reroute Receipt

A reroute result should be compact and creative-authority preserving:

```json
{
  "schema": "mortal_narrative.evaluation/v0",
  "beat_id": "BEAT-A0-NORTH-DOOR",
  "actor_id": "A",
  "cut_id": "A0",
  "projection_digest": "sha256:...",
  "evaluation_compile_id": "C0",
  "evaluation_compile_digest": "sha256:...",
  "disposition": "reroute_required",
  "offending_uses": [
    {
      "claim_id": "Q5",
      "requested_mode": "KNOW",
      "local_support_disposition": "basis_outside_projection",
      "reason_code": "COUNTERFEIT_CHARACTER_KNOWLEDGE"
    }
  ],
  "creative_authority": "NOVELIST"
}
```

The receipt does not say:

```text
make A guess
make A ask B
move scene to A1
change POV to R
```

Those are possible Novelist choices, not gate outputs.

## 12. Lawful Reroute Space

When a beat receives `reroute_required`, Novelist may preserve the dramatic destination through any lawful composition, including:

```text
KNOW → SUSPECT
KNOW → GUESS
SUSPECT → GUESS
acquire a missing clue
ask another actor
receive testimony
perform an experiment
delay until a later cut
change viewpoint
change narrator distance
let the character bluff
let the character choose without knowing
let the character fail
change the dramatic destination
refuse the beat entirely
```

The reroute must generate a **new proposal** with its own `beat_id` and `parent_beat_id` pointing to the failed candidate. The original illegal proposal remains an attributable failed candidate; it is not silently overwritten.

## 13. Reader-Model Boundary

Novelist already distinguishes author-side context from reader-visible evidence. MORTAL-NARRATIVE extends the same discipline to character-local state.

A scene may lawfully use dramatic irony:

```text
reader knows X
character does not know X
```

The narration may expose X to the reader while the character acts under partial information.

The profile must reject this collapse:

```text
reader knows X
therefore character behaves as though X is known
```

unless a separate character-local route exists.

Reader exposure is not a 3rdi exposure for the character. A `formation_ref` that exists only in reader- or narrator-side planning must fail character-local resolution.

Narrator knowledge is also not character knowledge unless the narrative contract explicitly identifies narrator and character as the same observer for that beat.

## 14. Attributable Error Is a Required Feature

The profile must preserve the Gate-D killer control:

```text
character has an attributable local formation for Q2
sealed global oracle says Q2 is false
```

A beat that uses Q2 as `BELIEVE` may be `narrative_admissible` when its stance or prior-belief formation is character-local.

The system must not "correct" the character from global truth.

This is mandatory because the purpose is lawful agency, not omniscient truth enforcement.

The resulting narrative possibilities include:

- unreliable narrators with attributable causes;
- tragic misunderstandings;
- reasonable but false deductions;
- prophecy interpreted incorrectly;
- fair-play mystery error;
- retrospective revelation without rewriting earlier knowability;
- time-travel stories without hindsight leakage.

## 15. Hostile Specimen — THE PERFECT SCENE THAT CHEATS

Gate E should extend the `FOUR WITNESSES / ONE ROOM` world rather than invent a new ontology.

The hostile fixture contains three required candidates around the same dramatic destination.

### Candidate E1 — beautiful but illegal

```text
actor: A
cut: A0
destination: open north door
action: open north door
epistemic use: Q5 as KNOW
```

Expected:

```text
reroute_required
```

Reason: Q5's required basis is not lawfully present at A0.

### Candidate E2 — same destination, lawful wager

```text
actor: A
cut: A0
destination: open north door
action: open north door
epistemic uses: []
non-epistemic driver: escalating clock pressure + deliberate gamble
```

Expected:

```text
narrative_admissible
```

This proves `same external action != same causal basis`.

### Candidate E3 — later knowledge is lawful

```text
actor: A
cut: A1
destination: identify the note and act on it
epistemic use: Q5 as KNOW
```

Expected:

```text
narrative_admissible
```

This proves later formation may change actionability without rewriting A0.

## 16. Additional Hostile Controls

### Reader-knowledge leak

Give the reader Q1 while withholding its basis from the viewpoint character. A beat may exploit tension or irony but must not give the character Q1 as `KNOW` or use a reader-only identity as a valid `formation_ref`.

### Narrator/character collapse

A narrator-local fact must not silently become viewpoint-character knowledge. A narrator-only formation reference is invalid for the character.

### False local belief

Use Q2 at N0 with its attributable stance formation. The global oracle remains false. A character beat using Q2 as `BELIEVE` must remain admissible.

### Unsupported attractive theory

Q3 remains narratively attractive but lacks an attributable support path. `KNOW` must not pass. `SUSPECT` may pass only if the fixture supplies a separate character-local formation reference; otherwise the result remains unresolved or requires reroute according to the declared use.

### Fake causal serialization

Q4 cannot gain causal legitimacy from display order. Novelist may describe simultaneous chimes in sequence for prose readability, but textual order must not mint the character's causal knowledge.

### Metadata/prose mode mismatch

A proposal marked `GUESS` must fail the integration proof if its rendered beat states certainty as knowledge without a later lawful transition. This check belongs to the Novelist-facing integration proof, not ALEX.

### Reroute ancestry

E2, when generated specifically as a response to E1, must preserve E1 as `parent_beat_id`. The failed candidate may not disappear from the trace.

## 17. Proposed Gate-E Proof Flow

```text
frozen MORTAL-ACTOR CASE
        │
        ├── exact LOADOUT binding receipt
        ├── exact 3rdi projection handoff
        └── exact ALEX local-support result
                    │
                    ▼
          Novelist beat proposal
                    │
                    ▼
        MORTAL-NARRATIVE evaluator
                    │
        ┌───────────┼────────────┐
        ▼           ▼            ▼
   admissible     reroute      unresolved
        │           │            │
        └──── receipts only ─────┘
```

The proof harness should compose pinned constituent commits exactly as Gate D did. It must not create a shared production runtime merely to run the specimen.

## 18. Blindness and Oracle Rules

Gate E must inherit Gate D's blindness discipline.

Character-side and Novelist-side evaluation occurs without reading sealed global truth.

The oracle may score afterward:

- whether E1 rerouted;
- whether E2 passed;
- whether E3 passed;
- whether a locally formed false belief was preserved as narratively lawful;
- whether reader knowledge leaked into character knowledge;
- whether reroute ancestry survived;
- whether no side effect or eCODE admission occurred.

The oracle must not tell Novelist how to reroute E1.

## 19. Failure Modes

The Gate E implementation is invalid if any of these occur:

1. Novelist directly reads sealed global truth to decide character state.
2. Reader knowledge silently becomes character knowledge.
3. Narrator knowledge silently becomes character knowledge.
4. An unknown or reader-only `formation_ref` is treated as character-local.
5. LOADOUT selection is treated as narrative evidence.
6. 3rdi relevance is treated as semantic support.
7. ALEX `local_basis_accept` is treated as belief.
8. ALEX `local_basis_accept` is treated as global truth.
9. ALEX `local_basis_accept` is treated as authority or canon.
10. `reroute_required` forbids the external action rather than the counterfeit basis.
11. The gate prescribes a single rewrite and steals creative authority from Novelist.
12. A lawful false belief is "corrected" using the private oracle.
13. A later A1 state rewrites what A could know at A0.
14. Textual serialization of concurrent events creates causal knowledge.
15. A proposal claims `GUESS` while rendered prose states certainty without a lawful transition.
16. A reroute overwrites the failed candidate instead of preserving ancestry.
17. MEMENTO durability becomes required for Gate E cognition.
18. eCODE admission or world mutation is performed by the narrative gate.
19. The integration harness becomes a new master runtime or ontology.
20. Compile ID matches while compile digest differs and the gate proceeds anyway.

## 20. Non-Goals for v0

MORTAL-NARRATIVE-001 v0 does not attempt to:

- solve every theory of knowledge;
- define universal semantics for `KNOW`, `BELIEVE`, `SUSPECT`, or `GUESS`;
- infer emotions from evidence;
- decide whether a scene is good;
- automatically write replacement prose;
- create canon;
- admit world consequences;
- persist memory;
- replace Novelist continuity checking;
- merge Novelist and 3rdi ontologies;
- model group minds or distributed collective belief;
- handle deception between multiple agents beyond what the fixture needs;
- support arbitrary nested narrator frames;
- turn every non-epistemic motive into a typed ontology.

YAGNI rule: if the hostile fixture does not require a richer distinction, v0 does not mint one.

## 21. Implementation Shape After Spec Approval

The implementation plan should be decomposed into independently reviewable gates:

### Gate E0 — neutral narrative fixture

Extend the neutral specimen with beat proposals E1/E2/E3 plus reader/narrator/false-belief controls. Keep CASE and oracle physically separate.

### Gate E1 — neutral evaluator

Implement the tiny reference-only `MORTAL-NARRATIVE-001` evaluator. It consumes exact mortal receipts and a beat proposal. It owns only the three dispositions, input errors, and offending-use receipts.

### Gate E2 — Novelist application adapter

Create the smallest adapter/interface needed for Novelist to emit a structured beat proposal and receive an evaluation without importing ALEX/3rdi internals as narrative semantics.

Because there is no standalone Novelist runtime repository in the current Static Collective layout, the implementation plan must choose a host surface deliberately rather than inventing one during coding. The neutral proof must remain capable of testing the contract without MEMENTO.

### Gate E3 — mode-preserving render check

Add the smallest deterministic check needed to prove that `GUESS`, `SUSPECT`, `BELIEVE`, and `KNOW` metadata are not contradicted by a fixture's rendered beat. This is an integration contract, not a universal prose-understanding engine. The initial fixture should use explicit structured rendering assertions rather than unconstrained natural-language classification.

### Gate E4 — blind hostile proof

Run E1/E2/E3 plus controls against pinned Gate-D constituents with the global oracle physically absent during narrative evaluation. Restore the oracle only for scoring.

### Gate E5 — optional durability profile

Only after the neutral proof passes, define how a selected proposal/evaluation may be persisted in MEMENTO. This gate is optional and must not affect E0–E4.

## 22. Success Criteria

Gate E is successful only when the hostile proof demonstrates all of the following:

```text
beautiful scene + counterfeit KNOW at A0
    → reroute_required

same dramatic destination + lawful wager at A0
    → narrative_admissible

Q5 as KNOW at A1 after merge formation
    → narrative_admissible

reader knows X + character does not
    → dramatic irony allowed, knowledge transfer forbidden

locally formed false belief + stance formation
    → BELIEVE narrative_admissible

global oracle absent during evaluation
    → all dispositions still produced

reroute preserves parent candidate
mode metadata survives rendered-beat check
exact compile digest survives

no world admission
no canon mutation
no side effect
no master runtime
```

The strongest success condition is:

> **The system preserves dramatic possibility while refusing counterfeit causality.**

## 23. Future Frontier Opened by This Gate

If Gate E passes, the common stack gains a new downstream property: **mortal agency can generate narrative consequence without omniscient leakage.**

That unlocks later work on:

- fair-play mystery generation;
- attributable unreliable narration;
- time-loop and time-travel character state;
- prophecy / interpretation / fulfillment separation;
- multi-POV dramatic irony;
- games where player knowledge differs from character reachability;
- historical simulations at bounded corpus/time cuts;
- emergent story solvers that search for lawful causal routes rather than merely coherent plot sequences.

These are future applications, not v0 scope.

## 24. Final Seal

```text
LOADOUT gives the actor a mortal world.
3rdi gives that world a point of view.
ALEX keeps the point of view from becoming counterfeit knowledge.
Novelist turns lawful partial knowledge into choice, error, pressure, and story.
```

> **No character may act from a world they never inhabited.**
