# Tranchish v0 — Speakable Code / Readable Receipts

**Status:** feasibility spike / incubator note\
**Project authority:** TranchNode issue #61 and PR #62\
**Seed utterance:** `open cellar door`

## The question

Can a code language be natively human-speakable without letting natural-language ambiguity become execution authority?

The Tranchish spike proposes a deliberately severe target:

```
human speech
    ↓
canonical Tranchish
    ↓
typed proposal
    ↓
separately constituted authority
    ↓
attempted consequence
    ↓
terminal receipt
```

And the return path matters just as much:

```
receipt / history
    ↓
canonical Tranchish
    ↓
a sentence a human can read aloud
```

> **Anything the machine can execute should be possible for a human to say. Anything the machine has done should be possible for a human to read aloud.**

This is a design target, not an implementation claim.

## Why the first sentence is `open cellar door`

Unlike `Hello, World!`, this sentence asks a represented world to change.

That immediately exposes the real constitutional questions:

* Which cellar door?
* Is it already open?
* Is the sentence a proposal, an admitted act, or a report?
* Does the speaker possess relevant authority?
* If authority exists, is it still spendable?
* Was an attempt actually made?
* Did the host perform the consequence?
* Was the result witnessed?
* What receipt distinguishes refusal from failure from success?

The grammar succeeds only if those differences survive without making the language miserable to speak.

## First hard rule

> **Imperative mood proposes. It does not authorize.**

So:

```
open cellar door
```

should initially mean something like:

```
proposal:
  action: open
  target: cellar-door
  authority: none
```

The exact typed representation is not frozen. The authority boundary is.

A sentence may be executable **in form** while remaining only a proposal **in authority**.

## Neighboring doors

This should not quietly absorb work that already has owners.

**Human Terminal** translates existing bounded application operations into basic human language. Its design explicitly says it is not a universal Static Collective command language. Tranchish is lower-level: can a canonical representation itself be both speakable and machine-deterministic?

**Intent Stroke** already proves a related constitutional shape for gesture:

```
gesture != traversal authority
utterance != execution authority
```

**TRAEX / Crossing Grammar** may eventually describe crossings that Tranchish can speak, but Tranchish must not flatten transfer, translation, transmutation, expression, experience, and exchange merely to make the language smaller.

## Candidate kernel

The first vocabulary should be tiny and useful rather than comprehensive.

Candidate action roots:

```
open
close
attach
detach
branch
join
name
adopt
propose
witness
infer
refuse
fail
spend
supersede
reconcile
```

Candidate relation words:

```
under    authority / warrant
from     provenance
at       position / address
to       relational target
as       declared role / type
because  explicit causal explanation
```

No punctuation-only semantics should be required for meaning a human must be able to say.

## Semantic classes that must remain different

The surface syntax is provisional, but these classes are not allowed to collapse:

**Proposal**

```
open cellar door
```

World unchanged merely because the sentence parses.

**Admitted transition**

A later form may name separately constituted authority, perhaps conceptually:

```
cellar door may open under warrant ember seven
```

`may` is only a candidate. If it proves overloaded, it should be rejected. Grammar never mints the warrant it names.

**Witnessed consequence**

```
witness cellar door opened
```

A past-tense claim is not automatically witness evidence.

**Refusal**

```
refuse open cellar door because warrant spent
```

The proposed transition did not acquire a lawful path to consequence.

**Failure**

```
open cellar door failed because hinge blocked
```

An admitted/attempted consequence did not complete. Failure must not be rewritten as refusal.

**Unresolved**

```
cellar door unresolved
```

The language must be able to say it does not know which referent or parse is valid.

## One-way leniency

A promising normalization law is:

> **Input may be generous. Output must be canonical.**

A human could say:

```
could you open up the cellar door using ember seven
```

Only when the declared context yields exactly one canonical meaning may an interpreter normalize it.

If two valid meanings remain, the result is unresolved. A model does not get to choose the most plausible interpretation merely because it is confident.

## Living language without executable drift

The spike keeps two membranes.

### Wild Tranchish

Humans may freely coin, compound, distort, joke, and mutate words:

```
deephaunt
inslice
ghost-attach
afterwitness
soft-open
```

Wild vocabulary may be culturally real without being executable.

### Canonical Tranchish

Only meanings precise enough to normalize deterministically may enter the executable vocabulary. A wild word may later be explicitly adopted as a canonical root or alias; frequency, fashion, or model familiarity is not sufficient.

> **The language may evolve freely. Execution may not.**

A future lexicon would therefore witness usage rather than automatically legislate executable meaning.

## The Cellar Door matrix

Every serious Tranchish candidate should survive the same pressure test:

1. **No authority** — valid proposal; world unchanged.
2. **Valid separately constituted authority** — admission can be represented; the owning runtime still verifies and performs consequence.
3. **Spent / invalid authority** — explicit refusal; no fabricated consequence.
4. **Unknown referent** — unresolved; do not guess which door.
5. **Host / destination failure** — attempted consequence remains distinct from refusal.
6. **Already open** — equal final state must not erase whether the fact was known before admission or discovered during execution.
7. **Ambiguous ordinary input** — normalize only when one canonical parse survives.
8. **Receipt return** — terminal history can be rendered back into human-speakable canonical language without losing refusal / failure / success / unresolved distinctions.

## Smallest next proof

Do not build a production parser yet.

The next useful specimen is 6–10 fixture sentences covering the Cellar Door matrix. For each sentence, record:

```
utterance
canonical_form
parse_status
semantic_class
action
target
authority_ref
provenance_refs
expected_world_effect
terminal_class
canonical_return_sentence
residual_unresolved
```

Then test two things:

**Speakability:** can a human naturally say and understand the canonical sentence?

**Determinacy:** do independent parsers/readers given the same declared context reach the same typed interpretation—or the same explicit unresolved result?

Only after that should Tranchish graduate into an executable parser or cross-project protocol design.

## What this does not claim

The spike does not establish:

* a universal Static Collective command language;
* a replacement for Human Terminal, Garden, Intent Stroke, or donor-owned contracts;
* free-form LLM-to-shell execution;
* ambient voice authority;
* automatic crossing or destination admission;
* a new Project0 ontology;
* a second canonicalizer or identity law;
* an AI model as final parser authority;
* legal validity;
* production grammar stability.

## Project authority

Canonical project-owned preservation lives in:

* TranchNode issue #61 — `Probe Tranchish v0 — a human-speakable constitutional code language`
* TranchNode PR #62 — `docs: preserve Tranchish v0 language spike`
* `docs/TRANCHISH_V0_SPIKE.md`

This page is a portable incubator projection. It should remain thinner than the repository and should not outrank later project evidence.

## Governing compression

> **Speakable code. Readable receipts. Representation is not authority.**

And the first words remain:

```
open cellar door
```
