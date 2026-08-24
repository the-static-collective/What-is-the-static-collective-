---
description: "Candidate continuity pattern: a shared causal score sung at staggered phases, with receipts returning as later conditions."
---

# Causal Canon — Trust the Process

{% hint style="info" %}
**Status: candidate / incubating.** This page is a durable projection of the 2026-08-24 Daily Slice. The Daily Slice remains the canonical historical record; this page does not promote the candidate into an adopted law.
{% endhint %}

Canonical slice: [Trust the process — the causal canon](https://github.com/the-static-collective/the-daily-slice/blob/main/slices/2026/08/2026-08-24/trust-the-process-causal-canon.md)

## The move

Start with the causal progression:

```text
receive
  ↓
interpret
  ↓
propose
  ↓
test
  ↓
admit / refuse
  ↓
receipt
  ↓
carry forward
  ↓
receive again
```

Now stop reading it as one pipeline.

Sing it as a round.

```text
VOICE A    receive → interpret → propose → test → admit/refuse → receipt → carry → receive
VOICE B              receive → interpret → propose → test → admit/refuse → receipt → carry → receive
VOICE C                        receive → interpret → propose → test → admit/refuse → receipt → carry → receive
VOICE D                                  receive → interpret → propose → test → admit/refuse → receipt → carry → receive
```

Each local voice stays causally ordered. The larger field can occupy many causal phases at once.

That gives a candidate form of **asynchronous coherence**: the system does not need everybody in the same state. It needs their different states to remain in lawful relation.

## The visual grammar

A useful diagram has two primary directions:

- horizontal motion = **local causality**;
- staggered entry = **successive embodiment of the shared form**.

Then add crossing lines for receipts that return as later conditions:

```text
α:  RECEIVE → INTERPRET → PROPOSE → TEST → ADMIT → RECEIPT ─────────────┐
                                                   │                    │
β:      RECEIVE → INTERPRET → PROPOSE → TEST → REFUSE → RECEIPT        │
                              ▲                       │                  │
                              │                       ▼                  │
γ:          RECEIVE → INTERPRET → PROPOSE → TEST → ADMIT → RECEIPT     │
                  ▲                                                    │
                  └────────────────────────────────────────────────────┘
```

The repeated score supplies continuity. Different performances supply development. The admit/refuse fork prevents repetition from becoming automatic recursion.

The picture should not contain one privileged conductor node. The shared structure is visible because the voices remain mutually legible.

```text
same score ≠ same singer
same singer ≠ same state
same state ≠ same consequence
```

Viewed down the time axis, the cycle is better pictured as a helix than a circle. Each revolution resembles the previous one but occurs after history has changed.

> **The trustworthy process is not a circle. It is a round sung down a helix.**

## The musical grammar

Each causal function can become a musical function.

### Receive

Open, sparse, unfinished. It must leave room for encounter.

### Interpret

Transform what was received without erasing ancestry. Repetition, inversion, rhythmic displacement, or reharmonization are natural operations here.

### Propose

Reach beyond what has already been established. A melodic leap fits the function.

### Test

Apply actual pressure. Another voice, harmony, meter, or constraint should be able to resist the proposal.

### Admit / refuse

Both branches get cadences.

Refusal must not become silence, because silence would erase the event. A refusal says: **this path did not enter, and that fact entered history.**

```text
                  ┌─ ADMIT ──┐
TEST ─────────────┤           ├─ RECEIPT
                  └─ REFUSE ─┘
```

### Receipt

A small, durable musical mark. Enough to say **this happened** and remain attributable later.

### Carry forward

Foreground can become accompaniment. Yesterday's melody can become today's bass note. Historical consequence does not need to remain foreground in order to remain active.

### Receive again

The opening returns over accumulated history.

Same invitation. Changed world.

## A first compositional specimen

Enter each new voice when the previous voice reaches **propose**:

```text
1          2          3          4          5          6          7          8

A  RECEIVE  INTERPRET  PROPOSE    TEST       ADMIT      RECEIPT    CARRY      RECEIVE
B                      RECEIVE    INTERPRET   PROPOSE    TEST       REFUSE     RECEIPT
C                                            RECEIVE    INTERPRET  PROPOSE     TEST
D                                                                  RECEIVE    INTERPRET
```

At measure 7, one voice carries history, another tests, another proposes, another receives.

One vertical slice through the piece reveals several causal ages at once.

Then stop making it a strict round. Let earlier receipts alter later voices.

```text
FORM + HISTORY + LOCAL ENCOUNTER → PERFORMANCE
```

Therefore:

```text
same causal melody + different history → different lawful performance
```

The score does not contain the future performance. It carries enough structure for another performance to happen.

## Formal sketch

Let one causal cycle contain ordered states

\[
C=(R,I,P,T,D,W,F)
\]

with receive, interpret, propose, test, decision, witness, and carry-forward respectively, and

\[
D\in\{\text{admit},\text{refuse}\}.
\]

A local traversal can be written

\[
x_{n,k+1}=f_k(x_{n,k},H_t)
\]

where \(n\) identifies a voice or lineage, \(k\) its current phase, and \(H_t\) the available history.

With phase offset \(\tau\),

\[
k_n(t)=(t-n\tau)\bmod |C|.
\]

The whole field at time \(t\) is therefore a collection of locally ordered voices occupying different phases:

\[
S(t)=\{x_{n,k_n(t)}\}_{n=1}^{N}.
\]

History enters when earlier witness becomes part of later conditions:

\[
H_{t+1}=H_t\cup W_t
\]

and

\[
R_{n+1}=g(E_{n+1},H_t),
\]

where \(E\) is the new encounter.

The candidate invariant is not identical output. It is lawful transformation plus attributable consequence:

\[
R\prec I\prec P\prec T\prec D\prec W\prec F
\]

with

\[
D\Rightarrow W
\]

and

\[
W_t\subseteq H_{t+1}.
\]

Admission and refusal both leave witness. Witness remains eligible to become later history.

## Candidate principle

### The Causal Canon Principle

> **A process can maintain global continuity without global simultaneity when local participants traverse a shared causal form at different temporal phases, preserve attributable consequences, and allow those consequences to condition later traversals.**

Compression:

> **Coherence does not require everybody to be in the same place. It requires their different places to remain in lawful relation.**

Smaller:

> **Same song. Different measure. Shared history.**

## Research floor

The principle itself is not established science. The analogy has a real floor beneath it.

- Bigand reports above-chance implicit learning of unfamiliar canon structure by musicians and nonmusicians. [DOI 10.1196/annals.1284.041](https://doi.org/10.1196/annals.1284.041)
- Ravignani and colleagues show rhythmic material becoming more structured across experimental transmission generations. [DOI 10.1111/nyas.13610](https://doi.org/10.1111/nyas.13610)
- Wood and colleagues report a professional quartet converging toward greater coordination similarity with less measured interpersonal information flow while learning unfamiliar music. [DOI 10.1111/nyas.14858](https://doi.org/10.1111/nyas.14858)
- Buehler's MusicSwarm study reports coherent long-form composition emerging from decentralized agents using shared traces, local memory, peer interaction, and consensus. [DOI 10.1002/aisy.202501253](https://doi.org/10.1002/aisy.202501253)

These sources support pieces beneath the analogy. They do not establish the Causal Canon Principle as a law.

## Nearby doors

This candidate bears directly on:

- [Causal Accounting / Linear Authority](causal-accounting-linear-authority.md)
- [Continuity Witness — Shared Questions, Local Answers](continuity-witness-shared-questions-local-answers/README.md)
- [The Room Can Vanish; the World Remains](../../patterns/world-reentry-memory/README.md)
- STORYSHIP, where continuity may depend on reproducible re-entry rather than frozen identity;
- Groove Rooms, where time-addressed contributions already behave like staggered voices in one shared temporal object;
- Autodisco, where successive generations may hear attributable residue from earlier generations;
- Haunted Toaster, whose proposal → test → human admission → receipt → mutation loop already resembles one local verse.

## LSD hatch

A civilization trying to preserve something for a thousand years might archive an object and hope the object survives.

The round suggests a second strategy: preserve a **way of entering**.

Teach each generation how to receive, interpret, propose, test, admit or refuse, leave a receipt, and hand consequence forward.

Then continuity does not depend only on a frozen message surviving unchanged. It can also depend on the next singer entering lawfully.

A dead archive says:

> Repeat me.

A living round says:

> Enter here.

The useful test hiding inside the speculation is concrete:

> **What minimum score must survive for a later participant to re-enter without requiring the original performer?**

## Promotion boundary

This page should remain in the Primitive Incubator until project-native specimens show that the candidate does more than organize metaphor.

A promotion case should demonstrate at least:

1. locally ordered causal progression;
2. multiple staggered participants or lineages;
3. receipts that remain attributable across phases;
4. earlier receipts conditioning later traversals;
5. no requirement for one persistent interpreter or global synchronous state;
6. a failure case showing what breaks when one of those conditions is removed.

Until then:

> **Trust the process** does not mean trust the outcome.
>
> It means build a process whose history remains true enough for the next voice to know where to come in.
