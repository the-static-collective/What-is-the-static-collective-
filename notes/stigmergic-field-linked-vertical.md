# Stigmergic Field linked vertical

Status: **approved design; implementation in progress**

Origin: the observation that honey-bee coordination is not one communication channel but a layered field: dance, contact, vibration, chemical traces, environmental state, inhibition, and even latency. The software translation is **not** “copy bee behavior.” It is:

> A shared substrate may communicate its condition through attributable, deterministic environmental traces without those traces becoming authority.

## The linked vertical

```text
accepted encounters
       |
       v
TranchNode
  deterministic field projection
  attention / receptivity / saturation
  inhibition / tension / return
  authority = none
       |
       v
Band Runtime
  participants sense field state
  participants choose locally
  no central assignment
       |
       v
replayable specimen
       |
       v
Collective notebook
  origin / portable pattern / verdict
```

### 1. TranchNode — the comb

Implementation issue:

- https://github.com/the-static-collective/tranchnode/issues/37

Approved design landed in TranchNode PR #36.

TranchNode owns the generic field contract, event-distance decay, aggregation, canonical ordering, trace attribution, fingerprints, and the invariant that field output carries `authority: "none"`.

It does **not** gain new ontology kinds in v0.1.

### 2. Band Runtime — the bees

Implementation issue:

- https://github.com/the-static-collective/band-runtime/issues/15

Band Runtime is intentionally downstream of the finalized TranchNode fixture. It owns event interpretation and the behavioral specimen, but it may not copy TranchNode decay, aggregation, canonicalization, trace-addressing, or fingerprint logic.

The proof target is concrete:

> Multiple sovereign participants redistribute activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remains attributable and non-authoritative.

### 3. This notebook — the field book

This repository preserves the origin, portable pattern, implementation pointers, specimen, and eventual human verdict.

The original bee entry in `notes/primitive-incubator.md` remains historical evidence. When the linked vertical lands, the idea may graduate into:

- `patterns/stigmergic-field.md`
- `specimens/stigmergic-field-v0.1.md`

The notebook does not become canonical over TranchNode or Band Runtime.

## Governing distinctions

```text
history != field pressure
pressure != command
quorum != truth
inhibition != deletion
latency != failure
residue != authority
same fingerprint != same worldview
```

The useful loop is:

```text
immutable event
    -> deterministic environmental residue
    -> sovereign attention
    -> local action / refusal / silence
    -> new immutable event
```

There is no required bee CEO in the middle.

## First proof boundary

The v0.1 specimen must demonstrate all of the following:

- replay-stable field state;
- decay by accepted-event distance rather than wall clock;
- source-attributable pressure;
- visible inhibition without erasure;
- no inaccessible-scope side channel;
- no hidden scheduler or ranker;
- at least three participants and two candidate directions;
- a participant choosing an under-attended/receptive direction using only allowed local state plus visible field state;
- an anti-cheat test that rejects an inserted central assignment;
- preservation of refusal and protected silence.

## Promotion rule

Project0 receives no ontology change in v0.1.

Only after the executable specimen exists should the stack ask whether a smaller portable law has earned Project0-level status.

Until then, this is a witnessed pattern under test, not constitutional truth.