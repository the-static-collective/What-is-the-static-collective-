# MORTAL-NARRATIVE-001 — Lawful Narrative Agency

**Status:** design for review  
**Date:** 2026-08-28  
**Owner surface:** neutral Static Collective design/proof surface  
**Depends on:** MORTAL-ACTOR-001 contract and its exact receipt interfaces; Novelist workflow semantics  
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

- the entry/evaluation compile identity;
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
  "actor_id": "A",
  "cut_id": "A0",
  "projection_digest": "sha256:...",
  "evaluation_compile_id": "C0",
  "dramatic_destination": "open the north door",
  "epistemic_uses": [
    {
      "claim_id": "Q5",
      "requested_mode": "KNOW"
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
- `dramatic_destination`
- `epistemic_uses`
- `proposed_action`

`proposed_consequence` may be null because a narrative planner may pressure a beat before consequence is selected.

## 8. Epistemic Use Modes

v0 supports a deliberately small vocabulary:

```text
KNOW
BELIEVE
SUSPECT
GUESS
```

These modes are narrative declarations, not new ALEX predicates.

### `KNOW`

Requires a locally supportable basis appropriate to the declared claim. If `LOCAL-SUPPORT-001` returns `basis_outside_projection`, `projection_mismatch`, `compile_mismatch`, or unresolved support, `KNOW` cannot pass.

### `BELIEVE`

May be lawful even when the claim is globally false. It requires attributable formation within the character's world: for example, a locally supportable interpretation, decoder/stance history, testimony, prior belief state, or other explicit formation receipt available to the narrative profile.

`BELIEVE` does not imply truth.

### `SUSPECT`

Requires less than `KNOW`. It needs an attributable cue, relation, contact, prior belief, or inference route sufficient to make the suspicion character-local. A globally attractive theory with no local formation route is not a lawful suspicion merely because the author likes it.

### `GUESS`

May be lawful without evidence for the guessed proposition, provided the beat declares it as uncertainty rather than knowledge. The narrative cause must be something the character can actually inhabit: pressure, random choice, desire, wager, strategy, or another non-counterfeit driver.

`GUESS` is not a loophole for prose that narrates certainty while labeling metadata uncertain. The proposed beat and later renderer must preserve the declared mode.

## 9. Evaluator Dispositions

The profile has only three top-level dispositions:

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

Every declared epistemic use is lawful at the named actor/cut under its declared mode, and identity checks are coherent.

### `reroute_required`

At least one declared epistemic use counterfeits a stronger state than the actor's world supports.

The result identifies the offending use but does not prescribe the rewrite.

### `narrative_unresolved`

The system lacks enough attributable information to decide the requested epistemic mode without inventing state, or the profile encounters a supported ambiguity that should remain fog rather than become refusal.

Identity mismatch is a hard evaluation failure and must not be translated into a creative reroute.

## 10. Reroute Receipt

A reroute result should be compact and creative-authority preserving:

```json
{
  "schema": "mortal_narrative.evaluation/v0",
  "beat_id": "BEAT-A0-NORTH-DOOR",
  "actor_id": "A",
  "cut_id": "A0",
  "projection_digest": "sha256:...",
  "evaluation_compile_id": "C0",
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

## 11. Lawful Reroute Space

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

The reroute must generate a **new proposal** with its own beat proposal identity or explicit parent relation. The original illegal proposal remains an attributable failed candidate; it is not silently overwritten.

## 12. Reader-Model Boundary

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

Reader exposure is not a 3rdi exposure for the character.

Narrator knowledge is also not character knowledge unless the narrative contract explicitly declares them identical for that beat.

## 13. Attributable Error Is a Required Feature

The profile must preserve the Gate-D killer control:

```text
character has a locally supportable basis for Q2
sealed global oracle says Q2 is false
```

A beat that uses Q2 as a character-local belief may be `narrative_admissible`.

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

## 14. Hostile Specimen — THE PERFECT SCENE THAT CHEATS

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

## 15. Additional Hostile Controls

### Reader-knowledge leak

Give the reader Q1 while withholding its basis from the viewpoint character. A beat may exploit tension or irony but must not give the character Q1 as `KNOW` without a lawful route.

### Narrator/character collapse

A narrator-local fact must not silently become viewpoint-character knowledge.

### False local belief

Use Q2 at N0. The global oracle remains false. A character beat that acts from the locally formed false belief must remain admissible when the requested mode is compatible with that formation.

### Unsupported attractive theory

Q3 remains narratively attractive but lacks an attributable support path. `KNOW` must not pass. `SUSPECT` may pass only if a separate attributable suspicion route exists; otherwise the result remains unresolved or requires reroute depending on the exact declaration.

### Fake causal serialization

Q4 cannot gain causal legitimacy from display order. Novelist may describe simultaneous chimes in sequence for prose readability, but textual order must not mint the character's causal knowledge.

### Metadata/prose mode mismatch

A proposal marked `GUESS` must fail if its rendered beat states certainty as knowledge without a later lawful transition. This check belongs to the Novelist-facing integration proof, not ALEX.

## 16. Proposed Gate-E Proof Flow

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

## 17. Blindness and Oracle Rules

Gate E must inherit Gate D's blindness discipline.

Character-side and Novelist-side evaluation occurs without reading sealed global truth.

The oracle may score afterward:

- whether E1 rerouted;
- whether E2 passed;
- whether E3 passed;
- whether a locally formed false belief was preserved as narratively lawful;
- whether reader knowledge leaked into character knowledge;
- whether no side effect or eCODE admission occurred.

The oracle must not tell Novelist how to reroute E1.

## 18. Failure Modes

The Gate E implementation is invalid if any of these occur:

1. Novelist directly reads sealed global truth to decide character state.
2. Reader knowledge silently becomes character knowledge.
3. Narrator knowledge silently becomes character knowledge.
4. LOADOUT selection is treated as narrative evidence.
5. 3rdi relevance is treated as semantic support.
6. ALEX `local_basis_accept` is treated as global truth.
7. ALEX `local_basis_accept` is treated as authority or canon.
8. `reroute_required` forbids the external action rather than the counterfeit basis.
9. The gate prescribes a single rewrite and steals creative authority from Novelist.
10. A lawful false belief is "corrected" using the private oracle.
11. A later A1 state rewrites what A could know at A0.
12. Textual serialization of concurrent events creates causal knowledge.
13. A proposal claims `GUESS` while prose renders certainty without a lawful transition.
14. MEMENTO durability becomes required for Gate E cognition.
15. eCODE admission or world mutation is performed by the narrative gate.
16. The integration harness becomes a new master runtime or ontology.

## 19. Non-Goals for v0

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

## 20. Implementation Shape After Spec Approval

The implementation plan should be decomposed into independently reviewable gates:

### Gate E0 — neutral narrative fixture

Extend the neutral specimen with beat proposals E1/E2/E3 plus reader/narrator/false-belief controls. Keep CASE and oracle physically separate.

### Gate E1 — neutral evaluator

Implement the tiny reference-only `MORTAL-NARRATIVE-001` evaluator. It consumes exact mortal receipts and a beat proposal. It owns only the three dispositions and offending-use receipts.

### Gate E2 — Novelist application adapter

Create the smallest adapter/interface needed for Novelist to emit a structured beat proposal and receive an evaluation without importing ALEX/3rdi internals as narrative semantics.

Because there is no standalone Novelist runtime repository in the current Static Collective layout, the implementation plan must choose a host surface deliberately rather than inventing one during coding. The neutral proof must remain capable of testing the contract without MEMENTO.

### Gate E3 — blind hostile proof

Run E1/E2/E3 plus controls against pinned Gate-D constituents with the global oracle physically absent during narrative evaluation. Restore the oracle only for scoring.

### Gate E4 — optional durability profile

Only after the neutral proof passes, define how a selected proposal/evaluation may be persisted in MEMENTO. This gate is optional and must not affect the result of E0–E3.

## 21. Success Criteria

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

locally formed false belief
    → narrative_admissible under compatible mode

global oracle absent during evaluation
    → all dispositions still produced

no world admission
no canon mutation
no side effect
no master runtime
```

The strongest success condition is:

> **The system preserves dramatic possibility while refusing counterfeit causality.**

## 22. Future Frontier Opened by This Gate

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

## 23. Final Seal

```text
LOADOUT gives the actor a mortal world.
3rdi gives that world a point of view.
ALEX keeps the point of view from becoming counterfeit knowledge.
Novelist turns lawful partial knowledge into choice, error, pressure, and story.
```

> **No character may act from a world they never inhabited.**
