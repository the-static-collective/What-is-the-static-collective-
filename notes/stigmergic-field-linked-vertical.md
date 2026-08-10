# Stigmergic Field linked vertical

Status: **graduated v0.1 specimen; implementation landed**

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

Implementation:

- issue: https://github.com/the-static-collective/tranchnode/issues/37
- PR: https://github.com/the-static-collective/tranchnode/pull/38
- merged commit: `dbec3437cae567d5455c48c19a1bdefaeb8b640d`

TranchNode owns the generic field contract, event-distance decay, aggregation, canonical ordering, trace attribution, fingerprints, and the invariant that field output carries `authority: "none"`.

It did **not** gain new ontology kinds in v0.1.

### 2. Band Runtime — the bees

Implementation:

- issue: https://github.com/the-static-collective/band-runtime/issues/15
- PR: https://github.com/the-static-collective/band-runtime/pull/16
- merged commit: `116e1318f82a6162c665879cd5258788ab0ab755`

Band Runtime remains downstream of the finalized TranchNode fixture. It owns event interpretation and the behavioral specimen, but it does not copy TranchNode decay, aggregation, canonicalization, trace-addressing, or fingerprint logic.

The proved target is:

> Multiple sovereign participants redistributed activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remained attributable and non-authoritative.

### 3. This notebook — the field book

This repository preserves the origin, portable pattern, implementation pointers, specimen, and human verdict.

Graduated records:

- [Stigmergic Field pattern](../patterns/stigmergic-field.md)
- [Stigmergic Field v0.1 specimen](../specimens/stigmergic-field-v0.1.md)

The original bee entry in `notes/primitive-incubator.md` remains historical evidence. The notebook does not become canonical over TranchNode or Band Runtime.

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

## What v0.1 taught us

The executable fixture sharpened two parts of the initial idea:

- saturation became pressure from a **third distinct positive witness**, not raw event count;
- return became **repeated positive recognition**, so a later negative reversal remains tension rather than being mislabeled as renewed attraction.

Those refinements are specimen evidence, not universal law.

## Promotion rule

Project0 receives no ontology change in v0.1.

The executable specimen now exists, but one bounded cross-repository proof is not enough to promote new constitutional vocabulary. The next question is whether the same smaller law survives a materially different domain without importing Band Runtime-specific semantics.

Until then, this is a graduated portable pattern with canonical implementations elsewhere, not Project0 constitutional truth.