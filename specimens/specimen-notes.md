# Specimen Notes

A lightweight human field-test record.

Machine receipts answer questions such as **what happened, what version ran, what artifacts were produced, and whether the pipeline accepted them**. Specimen notes preserve a different class of evidence: **what the encounter felt like to use, what surprised the operator, and what emerged that the machine did not know to measure**.

Use both when possible. Neither replaces the other.

## Template

```text
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

```text
Surprise:
Alive:
Fake:
Manual touch:
Emergence:
Classification:
Next:
```

A short honest specimen is more useful than a perfect template nobody fills out.
