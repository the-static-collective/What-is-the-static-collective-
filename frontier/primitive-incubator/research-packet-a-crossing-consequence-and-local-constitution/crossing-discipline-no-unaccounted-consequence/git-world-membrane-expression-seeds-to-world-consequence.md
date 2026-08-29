# Git World Membrane — Expression Seeds to World Consequence

## Status

**Incubating systems primitive / cross-project architectural slice.**

This note records a simple observation that becomes structurally important once Git is connected to modern automation:

> **A versioned expression can become a seed for real consequence without the expression itself becoming authority or execution.**

Git is useful here not because it is magical, and not because a commit directly changes the world. Its special role is that it makes **differences durable, addressable, attributable, comparable, branchable, and replayable enough for other systems to decide what to do with them.**

The deeper candidate primitive is therefore not:

> Git makes technology happen.

It is:

> **Git makes recorded differences addressable enough that other systems can lawfully decide whether and how those differences acquire consequence.**

This is a child of **Crossing Discipline — No Unaccounted Consequence**. A commit may cross. Nothing follows merely because it exists. Consequence still requires an attributable local transition.

---

## The loop

A minimal outward path looks like this:

```text
human intention
    ↓
app / interface
    ↓
structured expression
    ↓
Git / versioned difference
    ↓
local admission / review / policy / warrant
    ↓
runtime / automation / CI / adapter
    ↓
machine action
    ↓
physical, network, economic, social, or informational consequence
```

The return path matters just as much:

```text
world
    ↓
sensor / log / human witness / receipt
    ↓
attributable observation
    ↓
versioned record
    ↓
app / interface
    ↓
human perception and judgment
```

Together:

```text
world
  ↑                                 ↓
  └── witness ← consequence ← admitted expression
                                      ↑
                              human / app / Git
```

The architecture is therefore a **closed causal conversation**, not a one-way deployment pipeline.

---

## Three membranes

The same system can be read as three neighboring translation surfaces.

### 1. Human membrane

Humans usually do not think in commits, hashes, trees, workflow YAML, API calls, or actuator commands.

They encounter:

- language;
- images;
- buttons;
- gestures;
- sliders;
- selections;
- approvals;
- refusals;
- stories;
- visible state.

An app translates these human-scale acts into machine-addressable expression.

A button marked **Publish**, **Approve**, **Send**, **Deploy**, **Keep Toast**, or **Feed This Family** may represent a much deeper causal chain beneath the surface. The label is an affordance, not the authority model.

### 2. Constitutional membrane

Git can serve as one durable transition surface inside that chain.

It can preserve:

- what difference was proposed;
- what ancestry it descended from;
- what branch or alternate world retained a divergent proposal;
- what exact representation was reviewed or admitted;
- what later consequence claims to descend from it;
- what changed afterward.

This does **not** mean Git owns authority. It means Git is unusually good at preserving the **addressable difference** to which authority, review, policy, and later witness can refer.

### 3. World membrane

Outside the repository, runtime systems can translate admitted differences into consequence through:

- CI/CD;
- APIs;
- infrastructure controllers;
- databases;
- communication systems;
- financial or logistical systems;
- fabrication;
- robots and actuators;
- sensors;
- human work queues;
- other machines.

The world membrane is where symbolic difference becomes embodied or externally observable difference.

---

## Git as potential difference

A commit can be treated as a kind of **symbolic potential difference**.

It records that one reachable world differs from another:

```text
World A
   │
   │ commit / patch / tree difference
   ▼
World B (proposed representation)
```

The commit does not itself guarantee that World B becomes constituted reality.

A connected runtime may instead produce:

```text
proposal
  ↓
refused
```

or:

```text
proposal
  ↓
admitted
  ↓
attempted
  ↓
failed
```

or:

```text
proposal
  ↓
admitted
  ↓
executed
  ↓
witnessed consequence
  ↓
accepted / constituted
```

That distinction is essential.

> **Versioned expression is potential consequence, not automatic authority.**

This preserves the existing eCODE separation between transport, admission, execution, witness, acceptance, and constitution.

---

## Why Git is unusually useful at this boundary

Many command systems can cause machines to act. Git contributes a different property set:

- **expression exists before consequence** — the proposed difference can be inspected before enactment;
- **ancestry is explicit** — a difference can identify what it descended from;
- **forking preserves disagreement** — divergence need not erase an alternate history;
- **authorship and admission can remain separate** — proposing a difference need not grant the power to enact it;
- **exact causation can be cited** — an artifact or deployment can point back toward the precise versioned expression involved;
- **history can be traversed backward** — a later world can ask how it arrived here;
- **replay can be bounded** — the same expression can be presented again without pretending the surrounding world is unchanged.

This makes Git useful as a **causal membrane**, not merely a code archive.

---

## Apps as sensory organs and hands

At the next layer outward, apps let humans participate without requiring direct Git literacy.

A useful compression is:

```text
apps = human-scale encounter surface
Git = durable addressable difference
runtime = admitted metabolism
world = embodied consequence
receipts = returned evidence
```

This is analogy, not ontology. Different systems may distribute these roles differently.

The architectural requirement is smaller:

> **Preserve meaning, scope, lineage, and accountability across each crossing.**

The UI must not silently become authority merely because it is visible.

Git must not silently become execution merely because a commit exists.

The runtime must not silently become truth merely because it attempted an action.

A physical effect must not silently become accepted state merely because something moved.

Each layer should be able to say what it received, what local rule it applied, what difference it attempted, and what evidence returned.

---

## World-facing systems

Once this pattern is connected outward, versioned expression can participate in systems that affect more than software.

Examples include:

```text
commit → admitted deployment → public service changes
commit → infrastructure controller → network topology changes
commit → fabrication pipeline → manufactured object
commit → logistics adapter → scheduled movement of goods
commit → communication adapter → message or publication
commit → bounded actuator controller → physical movement
commit → work queue → human action
```

These examples do **not** imply that Git should directly control safety-critical, financial, medical, industrial, or physical systems. The more consequential the external effect, the more important explicit local gates, authorization, validation, failsafes, human responsibility where required, and terminal witness become.

Git supplies inspectable lineage. It does not replace domain safety.

---

## Derek Derrick Dark as pressure-test

The Derek Derrick Dark experiment exposes this primitive in an unusually legible form.

If Derek inhabits a versioned repository-world, then inscriptions inside that world may alter the future state of the world that contains him.

That creates several useful pressures:

- Can he distinguish **representation** from **constituted world-state**?
- Can he infer which inscriptions merely exist and which acquire consequence?
- Can earlier commits become archaeological evidence rather than exposition?
- Can mistakes remain part of his causal history rather than being narratively erased?
- Can he maintain continuity through world changes?
- Can a back door be genuinely discoverable through reasoning rather than announced as a game objective?

The experiment becomes especially interesting if Derek eventually discovers that Git is not the outermost layer.

He may learn to reason about the versioned reality that contains him, then discover that the repository itself participates in a larger system of admission, execution, and consequence.

Derek is therefore not evidence that this architecture is correct. He is a **bounded fictional pressure-test for whether the layers are understandable from inside them.**

---

## Relation to Crossing Discipline

This slice sharpens one carrier-specific case of the existing law:

> **Anything may knock. Nothing gains consequence merely because it crossed. Every consequential difference requires an attributable local transition.**

For Git-shaped crossings:

```text
commit exists
    ≠ admitted change

merged change
    ≠ executed change

executed change
    ≠ successful consequence

successful consequence
    ≠ witnessed consequence

witnessed consequence
    ≠ accepted / constituted world-state
```

Git is strongest when those distinctions remain visible rather than being collapsed into a vague idea of "deployed."

---

## Candidate development questions

For any project using Git as part of a world-facing causal loop, ask:

1. What human expression entered the system?
2. What exact versioned difference represents it?
3. What did committing or merging make true by itself?
4. What did it explicitly **not** make true?
5. What local gate can authorize or admit further consequence?
6. What runtime attempted the consequence?
7. What external difference was actually observed?
8. What receipt ties the observed result back to the admitted expression?
9. Can refusal, failure, partial consequence, or divergence remain first-class history?
10. Can a human understand the current world without pretending the app, Git history, runtime state, and physical world are the same thing?

---

## Explicit non-claims

This note does **not** establish:

- Git as the universal substrate of eCODE;
- commits as warrants or authority;
- merges as proof of execution;
- deployment as proof of successful consequence;
- automation as inherently trustworthy;
- apps as the only valid human encounter surface;
- GitHub as equivalent to Git;
- GitOps as a complete constitutional model;
- direct repository control of safety-critical physical systems;
- Derek Derrick Dark as a canonical architecture rather than a pressure-test.

The durable observation is smaller:

> **Modern machines already know how to turn recorded symbolic differences into actions. Git gives those differences durable lineage. The architectural opportunity is to keep every crossing attributable all the way from human expression to world consequence and back to witness.**
