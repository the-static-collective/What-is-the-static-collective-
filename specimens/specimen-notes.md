# Specimen Notes

A lightweight human field-test record.

Machine receipts answer questions such as **what happened, what version ran, what artifacts were produced, and whether the pipeline accepted them**. Specimen notes preserve a different class of evidence: **what the encounter felt like to use, what surprised the operator, and what emerged that the machine did not know to measure**.

Use both when possible. Neither replaces the other.

## Template

```
Specimen:
Date:
Project / build:
Related machine receipt(s):

What surprised me?

What felt alive?

What felt fake?

What did I touch manually?

What did I expect to happen?

What actually happened?

What emerged that we did not design?

Classification:
[ ] bug
[ ] limitation
[ ] new primitive
[ ] successful behavior worth preserving
[ ] unclear / needs another specimen

Smallest next action:
```

## Guidance

### What surprised me?

Record departures from expectation, including good ones. Surprise is often the earliest evidence that either the mental model is wrong or the system has acquired a genuinely interesting capability.

### What felt alive?

Describe moments where the system appeared responsive, coherent, expressive, or appropriately surprising. Avoid translating the feeling into architecture too quickly; preserve the observation first.

### What felt fake?

Record behavior that felt canned, forced, cosmetically random, misleading, overfit, or disconnected from the source evidence.

### What did I touch manually?

Record interventions, corrections, anchors, retries, overrides, selections, and workarounds. Manual action is evidence about where the machine currently requires human judgment.

### What did I expect to happen?

State the operator's prior mental model. This makes later disagreement between design intent and field behavior inspectable.

### What actually happened?

Describe the observed behavior without repairing it in hindsight.

### What emerged that we did not design?

Preserve useful accidents, unexpected compositions, new interaction patterns, and strange behavior before deciding whether they are features.

### Bug, limitation, or new primitive?

Classify only after recording the observation. A bug violates an intended law. A limitation marks a boundary of the present implementation. A new primitive suggests the observation exposes a reusable capability the architecture does not yet name.

## Short form

When a full note would become friction, record only:

```
Surprise:
Alive:
Fake:
Manual touch:
Emergence:
Classification:
Next:
```

A short honest specimen is more useful than a perfect template nobody fills out.

***

## 2026-08-11 — Haunted Toaster alpha.7: expressive vocabulary / Listener calibration

### Specimen: Across the Baby Gate

**Project / build:** Haunted Toaster `0.5.0-alpha.7`

**Operator witness:** “incredible. extremely artful. like, metatron's baby matrix.”

**Machine evidence:** quad-mirror topology; torus structure; seismic dynamics; photocopy material; locked/still opening. Possession Arc spent three categorical changes across the song: camera `locked → drift`, motion `still → drift`, then material `photocopy → gate-weave` for Final form.

**Lyric evidence:** 38/38 matched; 0 machine review flags; 4 human corrections.

**Alive:** The result read as a coherent visual theorem that was gradually altered rather than as a pile of effects.

**Manual touch:** Four lyric placements were corrected by the human despite complete machine coverage and no review flags.

**Emergence:** A complete match count is not sufficient evidence of calibrated Listener confidence. Human correction can function as a counter-witness to prior machine confidence.

**Classification:** successful visual behavior worth preserving + Listener calibration specimen.

### Specimen: concentrate\_water down

**Project / build:** Haunted Toaster `0.5.0-alpha.7`

**Operator witness:** “this version toasts.”

**Machine evidence:** quad-mirror topology; scope structure; advect dynamics; smoke atmosphere; gate-weave material; fracture motion; orbit camera. Possession Arc changed camera `orbit → push` at the first major lift, palette `analogous → split-complement` at peak energy, then motion `fracture → orbit` for Final form. Smoke produced 60 atmosphere events.

**Lyric evidence:** 32/32 matched; 7 review flags; 0 human corrections.

**Alive:** The same renderer generation produced a materially different coherent creature: contained smoky turbulence that ultimately resolved into orbit.

**Manual touch:** No lyric corrections required.

**Emergence:** This is a healthier uncertainty specimen than nominally perfect coverage with missed human corrections. The machine surfaced doubt without forcing repair.

**Classification:** successful behavior worth preserving.

### Cross-specimen illumination

Across Gold Star, Across the Baby Gate, and concentrate\_water down, the strongest repeated observation is:

> **The visual vocabulary is becoming expressive, not merely combinatorial.**

The system is producing distinguishable visual grammars rather than repeatedly decorating one underlying animation. Sparse Possession Arc changes are reading as composition / dramaturgy: the creature establishes an identity, then spends only a few categorical violations across time.

The Listener comparison is equally useful:

* `38/38 + 0 review + 4 human corrections` suggests overconfidence / missed distrust.
* `32/32 + 7 review + 0 human corrections` suggests uncertainty was surfaced without unnecessary repair.

This supports proof-listen / Witness Session work that treats human correction as evidence about **where machine confidence was miscalibrated**, rather than merely trying to increase total match coverage.

**Preservation verdict:** alpha.7 toasts. Continue mining specimens before destabilizing this renderer generation.

**Related GitHub:** https://github.com/the-static-collective/the-haunted-toaster/issues/113
