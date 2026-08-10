# Creative Handoff

A reusable packet for handing a strange idea to another human or model without asking them to jump directly from inspiration to implementation.

The job is to find the lawful primitive underneath the idea.

## The progression

```text
observation
    ↓
underlying phenomenon
    ↓
reusable primitive
    ↓
existing architecture it composes with
    ↓
smallest executable slice
    ↓
proof specimen
```

Do not skip directly from observation to feature request unless the primitive is already known.

## 1. Observation

State what was actually noticed.

Good observations are concrete enough to distinguish evidence from interpretation.

Examples:

- Bees appear to coordinate direction and collective readiness through several signal channels rather than one central commander.
- Smoke, rain, dust, and fireflies all seem different aesthetically but share the idea of something moving through the world.
- A rejected proposal can remain useful as history even though it must not affect canonical state.

Ask:

- What did we actually see, hear, feel, or measure?
- Which part is direct evidence?
- Which part is our interpretation?

## 2. Underlying phenomenon

Strip away the costume and identify the behavior that makes the observation interesting.

Examples:

- distributed signaling and quorum
- advected or autonomous field phenomena
- residual presence without current authority

Ask:

- If the aesthetic skin disappeared, what behavior would remain?
- Could the same phenomenon appear in another domain?

## 3. Reusable primitive

Name the smallest concept that could express the phenomenon more than once.

A primitive should be broader than one effect but narrower than a universal abstraction.

Ask:

- Can this express at least two genuinely different cases?
- Does it have one coherent responsibility?
- Which invariants belong to the primitive itself?

If the answer is really several primitives bundled together, split them before proceeding.

## 4. Existing architecture it composes with

Find the nearest lawful home before inventing another subsystem.

Ask:

- Which existing field, event, proposal, renderer, topology, motion, material, authority, or receipt mechanism already solves part of this?
- Is the new primitive orthogonal to those systems or secretly duplicating them?
- What must remain independently variable?

Prefer composition over replacement when the existing architecture is sound.

## 5. Smallest executable slice

Design the least implementation capable of testing the primitive itself.

The slice should answer one architectural question, not attempt to demonstrate the entire future vision.

Ask:

- What is the smallest thing we can run, render, replay, or inspect?
- What can be omitted without making the test meaningless?
- What would failure look like?

Do not require production polish for a primitive to prove its law.

## 6. Proof specimen

Name the artifact or encounter that would establish whether the primitive earned its place.

A proof specimen should expose both the creative gain and the trust boundary.

Ask:

- What result would be impossible or awkward without this primitive?
- What invariant could the experiment accidentally violate?
- What machine receipt should exist?
- What human specimen note should be recorded?

## Handoff template

```text
Observation:

What is evidence vs interpretation:

Underlying phenomenon:

Candidate primitive:

Existing architecture it composes with:

Invariant(s) that must survive:

Smallest executable slice:

Failure condition:

Proof specimen:

Canonical project if it graduates:
```

## Compact instruction for a collaborator

> Here is a weird idea. Do not turn it directly into a feature. Identify the underlying phenomenon, propose the smallest reusable primitive that expresses it, show what existing architecture it composes with, protect the relevant invariants, and define the smallest executable slice plus a proof specimen. Preserve uncertainty where the evidence is incomplete.
