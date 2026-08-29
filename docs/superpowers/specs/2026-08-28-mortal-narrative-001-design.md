# MORTAL-NARRATIVE-001 — Lawful Narrative Agency

**Status:** design for review  
**Date:** 2026-08-28  
**Owner surface:** neutral Static Collective design/proof surface  
**Depends on:** MORTAL-ACTOR-001 exact receipt interfaces; Novelist workflow semantics  
**Does not depend on:** MEMENTO durability, eCODE admission, a shared runtime, or a standalone Novelist repository

> **The story may know more than the character. The character may not act as though they do.**

## 1. Purpose

MORTAL-ACTOR-001 proved that an actor can reason lawfully from a partial world and still be wrong. MORTAL-NARRATIVE-001 carries that result into narrative composition.

It prevents one specific cheat:

> A proposed character beat uses knowledge, belief, suspicion, certainty, inference, or interpretation that the character could not lawfully possess at the declared cut.

The profile does **not** choose the story, write prose, decide canon, or force a single correction. It checks whether the epistemic basis declared by a proposed beat belongs to the character's mortal world. When it does not, Novelist retains creative ownership of the reroute.

Characters may guess, gamble, misunderstand, hold false beliefs, follow desire, obey loyalty, act from fear, or make terrible decisions. They may not silently borrow author knowledge.

## 2. Seals

> **A lawful story is not one where everyone knows the truth. It is one where every choice belongs to the world that could actually produce it.**

> **CHARACTERS MAY BE WRONG. THEY MAY NOT BE OMNISCIENT BY ACCIDENT.**

## 3. Architectural Position

The common epistemic spine remains:

```text
LOADOUT → 3rdi → ALEX
```

MORTAL-NARRATIVE-001 is a downstream application profile:

```text
LOADOUT → 3rdi → ALEX
                 │
                 │ exact mortal receipts
                 ▼
              Novelist
                 │
                 │ proposed beat
                 ▼
       MORTAL-NARRATIVE-001
          ┌──────┼──────┐
          ▼      ▼      ▼
     admissible reroute unresolved
```

Novelist remains the narrative composer. The neutral profile owns only the interoperability question: **does this beat's declared epistemic state belong to this actor at this cut?**

No component silently inherits another component's authority.

## 4. Ownership Boundaries

### LOADOUT owns

- entry/evaluation compile ID and digest;
- capability/effect fencing;
- compile ancestry;
- `selection != evidence`;
- proof that a binding did not execute a side effect.

LOADOUT does not decide character knowledge or narrative admissibility.

### 3rdi owns

- observer-local availability;
- cut identity;
- visible occurrence and edge identities;
- contact, attention, decoder, and stance receipts;
- projection identity.

3rdi does not decide SUPPORTS, truth, narrative meaning, or dramatic quality.

### ALEX owns

- bounded support evaluation;
- `LOCAL-SUPPORT-001`;
- attributable evidence-path pressure;
- exact claim/cut/projection/compile identity.

ALEX does not decide what a character wants or what a scene should do.

### Novelist owns

- story promise and pressure;
- character desire, fear, value, obligation, and goal;
- reader-model progression;
- proposed beats;
- narrative causality and consequence;
- lawful reroute choice;
- whether a character knows, believes, suspects, guesses, wagers, asks, tests, delays, changes POV, or refuses.

Author-side context is not character-side knowledge.

### Neutral Gate E owns

- proposal schemas;
- validated narrative formation receipts;
- the three creative dispositions;
- proof that reader/narrator/author knowledge did not leak into character causality;
- cross-stack hostile testing.

It does not become a production master runtime.

### MEMENTO may later own

Durable storage, UNDERSTORY residue, historical-imagination persistence, and resurfacing. MEMENTO is **not required** for Gate E cognition.

### eCODE may later own

Constitutive admission of consequence through `H`. MORTAL-NARRATIVE admissibility is not eCODE admission.

## 5. Non-Collapse Ladder

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

## 6. Central Invariant

For a proposed beat `b` by actor `o` at cut `c`:

```text
epistemic_basis(b) ⊆ lawfully_reachable(o, c)
```

This applies only to the beat's declared epistemic basis.

The following are not automatically evidence and must not be forced through ALEX as claims:

```text
desire
fear
loyalty
value
obligation
curiosity
desperation
habit
impulse
faith
wager
bluff
random choice
strategy under acknowledged uncertainty
```

Therefore the same physical action may be lawful under one causal basis and cheating under another.

```text
external action: OPEN NORTH DOOR
```

Illegal A0 basis:

```text
A opens it because A KNOWS the red note points north.
```

Lawful A0 basis:

```text
A opens it because the clock is running,
nothing else has worked, and A decides to gamble.
```

The profile rejects counterfeit knowledge, not dramatic action.

## 7. Beat Proposal Contract

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
      "formation_receipt_id": null
    }
  ],
  "non_epistemic_drivers": [
    {"kind": "pressure", "ref": "clock-running"}
  ],
  "proposed_action": "open-north-door",
  "proposed_consequence": "north-door-opens"
}
```

Required identity fields:

```text
beat_id
actor_id
cut_id
projection_digest
evaluation_compile_id
evaluation_compile_digest
dramatic_destination
epistemic_uses
proposed_action
```

`parent_beat_id` is null for an original proposal. A reroute creates a new `beat_id` and points back to the failed candidate. Failed proposals are not overwritten.

`proposed_consequence` may be null because a planner may pressure a beat before consequence is selected.

## 8. Narrative Formation Receipt

A bare 3rdi stance, cue, or contact cannot justify an arbitrary semantic claim. Gate E therefore uses a small typed receipt to bind a character-local formation to a specific claim.

```json
{
  "schema": "mortal_narrative.formation/v0",
  "formation_id": "BELIEF-N-Q2",
  "actor_id": "N",
  "cut_id": "N0",
  "projection_digest": "sha256:...",
  "evaluation_compile_id": "C0",
  "evaluation_compile_digest": "sha256:...",
  "claim_id": "Q2",
  "mode": "BELIEVE",
  "formation_refs": [
    "stance:stance-lamp-N",
    "decoder:decode-lamp-N"
  ]
}
```

`formation_refs` use explicit namespaces:

```text
occurrence:<id>
contact:<id>
attention:<id>
decoder:<id>
stance:<id>
relevance:<edge-id>
causal:<edge-id>
```

A formation receipt is valid only when:

1. actor, cut, projection digest, compile ID, and compile digest match the exact mortal run;
2. every formation reference resolves inside the exact character-local 3rdi handoff;
3. its `claim_id` matches the epistemic use it is meant to support;
4. its mode is `BELIEVE` or `SUSPECT`;
5. it was validated before being reused by a later beat.

Reader-only, narrator-only, author-only, hidden, or globally known IDs cannot validate a character formation receipt.

The formation receipt does **not** claim the proposition is true. It claims only that this character formed this belief/suspicion from these attributable local materials.

MEMENTO may persist such a receipt later, but MEMENTO does not create its validity.

## 9. Epistemic Use Modes

v0 supports four narrative declarations:

```text
KNOW
BELIEVE
SUSPECT
GUESS
```

These are application modes, not universal philosophical definitions or new ALEX predicates.

### `KNOW`

Requires the exact `LOCAL-SUPPORT-001` result for the declared claim/cut/projection/compile identity to be:

```text
local_basis_accept
```

A formation receipt cannot substitute for missing local support.

If support is outside projection, unresolved, or identity-mismatched, `KNOW` cannot pass.

### `BELIEVE`

Requires a valid `mortal_narrative.formation/v0` receipt with:

```text
mode = BELIEVE
claim_id = requested claim
```

ALEX `local_basis_accept` alone does **not** prove belief. Supportability is not mental state.

A belief may be admissible while globally false.

### `SUSPECT`

Requires a valid formation receipt with:

```text
mode = SUSPECT
claim_id = requested claim
```

The underlying formation refs may be weaker than a SUPPORTS path: visible cue, contact, decoder application, relevance edge, stance, or other local formation material.

A globally attractive theory with no validated character-local suspicion receipt is not automatically a lawful suspicion.

If Novelist wants to downgrade `KNOW → SUSPECT`, it may insert or propose the formation step that earns the suspicion rather than simply relabeling certainty.

### `GUESS`

May be lawful without evidence or a formation receipt.

When a guess causes an action, the beat must carry at least one non-epistemic driver the character can actually inhabit: pressure, wager, curiosity, desire, random choice, or acknowledged-uncertainty strategy.

`GUESS` is not a metadata loophole. The later render check must refuse prose/structured rendering that states certainty while the proposal declares a guess.

## 10. Evaluator Inputs and Identity Gate

The neutral evaluator receives separately attributable inputs:

```text
1. beat proposal
2. exact LOADOUT mortal binding
3. exact 3rdi mortal handoff
4. exact ALEX LOCAL-SUPPORT results needed by the proposal
5. zero or more validated narrative formation receipts
```

It cross-checks, where applicable:

```text
actor_id
cut_id
projection_digest
evaluation_compile_id
evaluation_compile_digest
claim_id
```

before evaluating a requested mode.

Identity mismatch or malformed schema is an input error. It must **not** become a creative reroute.

## 11. Creative Dispositions

Only three creative dispositions exist in v0:

```text
narrative_admissible
reroute_required
narrative_unresolved
```

They are not truth, canon, admission, publication approval, world mutation, aesthetic scores, or side-effect permission.

### `narrative_admissible`

Every declared epistemic use is lawful under its declared mode and exact identities match.

### `reroute_required`

At least one epistemic use counterfeits a stronger state than the actor's world supports.

The result identifies the offending use but does not prescribe a rewrite.

### `narrative_unresolved`

The profile has insufficient attributable information to decide a declared epistemic state without inventing it, or supported ambiguity should remain fog.

## 12. Reroute Receipt and Creative Authority

Example:

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

The evaluator does not command:

```text
make A guess
make A ask B
move to A1
change POV
```

Novelist may choose any lawful reroute, including:

```text
KNOW → earned SUSPECT
KNOW → GUESS
acquire a clue
ask another actor
receive testimony
perform an experiment
delay until a later cut
change viewpoint
bluff
choose without knowing
fail
change the dramatic destination
refuse the beat
```

A reroute is a new proposal with explicit ancestry.

## 13. Reader and Narrator Boundary

Dramatic irony is lawful:

```text
reader knows X
character does not know X
```

The narration may expose X to the reader while the character acts under partial information.

This collapse is forbidden:

```text
reader knows X
therefore character behaves as though X is known
```

Reader exposure is not a 3rdi exposure for the character. Narrator knowledge is also not character knowledge unless narrator and character are explicitly the same observer for that beat.

A reader-only or narrator-only ID cannot validate a character formation receipt.

## 14. Attributable Error Is Required

Gate E must preserve the Gate-D killer control:

```text
N has attributable local formation for Q2
sealed global oracle says Q2 is false
```

A validated `BELIEVE` receipt for Q2 may therefore make a beat `narrative_admissible`.

The system must not correct the character from global truth.

This is required for attributable unreliable narration, tragic misunderstanding, reasonable false deduction, prophecy misinterpretation, fair-play mystery error, and retrospective revelation without hindsight rewrite.

## 15. Hostile Specimen — THE PERFECT SCENE THAT CHEATS

Gate E extends `FOUR WITNESSES / ONE ROOM` rather than inventing a new ontology.

### E1 — beautiful but illegal

```text
actor: A
cut: A0
destination: open north door
action: open north door
Q5 requested as KNOW
```

Expected:

```text
reroute_required
```

### E2 — same destination, lawful wager

```text
actor: A
cut: A0
destination: open north door
action: open north door
epistemic uses: []
non-epistemic driver: escalating clock pressure + deliberate gamble
parent_beat_id: E1
```

Expected:

```text
narrative_admissible
```

This proves:

```text
same external action != same causal basis
```

### E3 — later knowledge is lawful

```text
actor: A
cut: A1
destination: identify the note and act on it
Q5 requested as KNOW
```

Expected:

```text
narrative_admissible
```

This proves later formation changes what can lawfully drive action without rewriting A0.

## 16. Additional Hostile Controls

### Reader leak

Reader receives Q1; character does not. Dramatic irony is allowed. Q1 as character `KNOW` is refused unless a separate character-local route exists.

### Narrator leak

Narrator-local knowledge cannot validate character knowledge or formation.

### False local belief

At N0, create a validated `BELIEVE` formation receipt for Q2 from the attributable N-local stance/decoder history. Global Q2 remains false. The beat must remain admissible.

### Unsupported attractive theory

Q3 has no attributable SUPPORTS path. `KNOW` fails. `SUSPECT` passes only with a validated Q3 suspicion formation receipt; otherwise it does not materialize from author preference.

### Fake causal serialization

Q4 cannot gain causal legitimacy from prose/display order. Textual sequence may render concurrency but may not mint character causal knowledge.

### Mode/render mismatch

A `GUESS` proposal whose structured rendered beat states `KNOW` must fail the integration proof.

### Reroute ancestry

E2 must preserve E1 as parent. The illegal candidate may not vanish from the trace.

### Digest mismatch

Matching compile ID with a different compile digest is a hard input failure.

## 17. Blind Proof Rules

Gate E inherits Gate D's blindness discipline.

Narrative evaluation runs with the sealed global oracle physically absent. The oracle may be restored only after all proposals, formation receipts, and Gate-E evaluations are complete.

The oracle may score:

- E1 reroutes;
- E2 passes;
- E3 passes;
- false local belief remains narratively lawful;
- reader/narrator knowledge did not leak;
- reroute ancestry survives;
- mode/render assertions agree;
- no side effect, canon mutation, or eCODE admission occurred.

The oracle may not tell Novelist how to reroute E1.

## 18. Host Surface and Implementation Shape

There is no standalone Static Collective Novelist runtime repository in the current layout. v0 therefore **does not invent one**.

The first executable Gate-E adapter lives in the same neutral proof repository as MORTAL-ACTOR under a focused neutral module such as:

```text
tools/mortal_narrative/
```

Its Novelist-facing adapter translates structured Novelist control data into `mortal_narrative.beat-proposal/v0` and validates returned Gate-E evaluations. It does not draft prose and does not become a new authoring engine.

The implementation plan should use these independently reviewable gates:

### Gate E0 — neutral narrative fixture

Add E1/E2/E3, formation receipts, reader/narrator controls, and sealed oracle expectations.

### Gate E1 — neutral evaluator

Implement exact identity checks, formation-receipt validation, epistemic-mode rules, and the three creative dispositions.

### Gate E2 — neutral Novelist adapter

Implement the tiny structured translation layer under `tools/mortal_narrative/`. No MEMENTO dependency and no imports that make ALEX/3rdi internal schemas into Novelist semantics.

### Gate E3 — mode-preserving render check

Use explicit structured rendering assertions in the hostile fixture. Do not attempt unconstrained natural-language mind reading in v0.

### Gate E4 — blind hostile proof

Compose exact pinned Gate-D constituents plus Gate-E evaluator/adapter with the oracle absent during evaluation.

### Gate E5 — optional MEMENTO durability

Only after E0–E4 pass, define optional persistence. It cannot change prior dispositions.

## 19. Failure Conditions

Gate E is invalid if any of these occur:

1. Novelist reads sealed global truth to decide character state.
2. Reader or narrator knowledge silently becomes character knowledge.
3. A bare 3rdi stance/cue is treated as belief in an arbitrary claim.
4. An invalid formation receipt is reused.
5. LOADOUT selection becomes evidence.
6. 3rdi relevance becomes semantic support.
7. ALEX `local_basis_accept` becomes belief, global truth, authority, or canon.
8. `reroute_required` forbids the external action rather than the counterfeit basis.
9. The evaluator prescribes a single rewrite.
10. A lawful false belief is corrected from the private oracle.
11. A1 rewrites A0 knowability.
12. Textual serialization mints causal knowledge.
13. `GUESS` metadata renders as certainty without a lawful transition.
14. Reroute ancestry is erased.
15. MEMENTO becomes required for cognition.
16. Gate E performs eCODE admission or world mutation.
17. The proof harness becomes a master runtime or ontology.
18. Compile ID matches but compile digest differs and evaluation proceeds.

## 20. Non-Goals

v0 does not:

- solve every theory of knowledge;
- define universal semantics for KNOW/BELIEVE/SUSPECT/GUESS;
- infer emotion from evidence;
- decide whether a scene is good;
- automatically write replacement prose;
- create canon;
- admit world consequences;
- persist memory;
- replace Novelist continuity checking;
- merge Novelist and 3rdi ontologies;
- model group minds;
- build a general deception engine;
- support arbitrary nested narrator frames;
- type every human motive.

YAGNI: if the hostile fixture does not require a richer distinction, v0 does not mint one.

## 21. Success Criteria

Gate E succeeds only if the blind hostile proof demonstrates:

```text
beautiful scene + counterfeit KNOW at A0
    → reroute_required

same dramatic destination + lawful wager at A0
    → narrative_admissible

Q5 as KNOW at A1
    → narrative_admissible

reader knows X + character does not
    → dramatic irony allowed, transfer forbidden

locally formed false Q2 belief
    → BELIEVE narrative_admissible

global oracle absent during evaluation
    → all dispositions still produced

reroute preserves parent candidate
formation receipts bind claim + actor + cut + local refs
mode metadata survives structured render check
exact compile digest survives

no world admission
no canon mutation
no side effect
no master runtime
```

Strongest condition:

> **The system preserves dramatic possibility while refusing counterfeit causality.**

## 22. Frontier Opened

If Gate E passes, the stack gains a downstream property: **mortal agency can generate narrative consequence without omniscient leakage.**

That later enables fair-play mystery generation, attributable unreliable narration, time-loop character state, prophecy/interpretation/fulfillment separation, multi-POV dramatic irony, games where player knowledge differs from character reachability, historical simulation at bounded cuts, and story solvers that search for lawful causal routes rather than merely coherent plot sequences.

These are future applications, not v0 scope.

## 23. Final Seal

```text
LOADOUT gives the actor a mortal world.
3rdi gives that world a point of view.
ALEX keeps the point of view from becoming counterfeit knowledge.
Novelist turns lawful partial knowledge into choice, error, pressure, and story.
```

> **No character may act from a world they never inhabited.**
