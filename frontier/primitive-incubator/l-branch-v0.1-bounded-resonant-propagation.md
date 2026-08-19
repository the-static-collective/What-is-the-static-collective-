# L-Branch v0.1 — Bounded Resonant Propagation

Status: **Frontier / green executable candidate on Project0 PR #47; not yet landed**

## The field law

> **Beetle stores the shape. Bumblebee makes the shape ring.**

The useful systems translation is not that software should imitate insects literally. It is that **structure can participate in motion**.

A conventional command chain looks like:

```
command
  ↓
operation
  ↓
result
```

L-Branch asks whether one admitted excitation can lawfully produce several local transformations because the already-declared structure determines what becomes eligible next:

```
admitted excitation
      ↓
local eligibility
      ↓
step record
      ↓
new local evidence
      ↓
next eligible step
      ↓
...
      ↓
damping / refusal / exhaustion / completion
```

The branch is allowed to **ring**. It is not allowed to enlarge its own sovereignty.

## Candidate law

> **Difficulty may expand search amplitude; it must not expand sovereignty.**

A harder problem may justify more declared work before admission:

* more steps;
* wider candidate frontier;
* deeper bounded exploration.

It does not justify new authority, disclosure, capability, scope, or participants appearing after the branch begins.

## Influence without authority

The pollen metaphor compresses a separate law:

> **Encounter may alter future susceptibility without becoming a command.**

A prior recognition, refusal, tension, witness, or encounter may change which candidate becomes eligible in a later branch. That influence remains attributable.

It does **not** become execution authority.

Conceptually:

```
without influence R
  candidate C → ineligible
  authority   → [A]

with influence R
  candidate C → eligible
  authority   → [A]
```

The changed property is susceptibility, not sovereignty.

## Refusal topology becomes mechanical

L-Branch distinguishes:

* a route never considered;
* a route considered and found ineligible;
* a route refused for missing authority;
* a route refused by disclosure/scope law;
* a route that was eligible but not reached before budget exhaustion.

Those are different historical facts.

A refusal may later influence attention or evaluation through an explicit reference, but it does not silently become permanent policy or new authority.

## Bounded branch envelope

Before propagation starts, the branch must already declare enough to reconstruct its bounds:

* immutable starting snapshot;
* admitted excitation;
* declared purpose;
* fixed participants/topology;
* evaluator identity/version;
* policy/disclosure context;
* available authority refs;
* finite work budget;
* deterministic continuation and terminal rules.

Every step remains inside that envelope.

The v0.1 terminal states are:

```
completed
  explicit terminal condition reached

damped
  budget remains, but no candidate can continue

refused
  a required transition cannot lawfully proceed

exhausted
  lawful continuation exists, but declared work budget is spent

inadmissible
  the branch declaration itself is invalid
```

No silent disappearance is a valid terminal state.

## Relationship to existing primitives

L-Branch joins existing lines; it does not rename them.

### Resonance Seeds

A Resonance Seed may shape susceptibility without dictating one final realization:

```
Seed
  ↓ shapes field
L-Branch
  ↓ bounded movement
Realization
  ↓
Recognition
  ↓ may influence a later branch
```

Earlier identities remain independently addressable.

### Resonant Tension

Project0 issue #30 owns the executable remainder of the deterministic resonance evaluator recovered from historical PR #17.

L-Branch may eventually use that evaluator as one local eligibility step. It must not absorb or redefine it.

`productive_dissonance` remains a valid result. Propagation is not required to force convergence.

### World Encounter

World Encounter may carry attributable testimony across a boundary while destination authority stays local.

A later L-Branch may consult that encounter as influence. Successful transport does not transfer source authority into the branch.

### BEE Protocol

**BEE remains Boundary-Carried Invariants.**

“Bumblebee” is only the biological analogy for L-Branch. It is not a renamed BEE protocol.

### Pollen Scout

**Pollen Scout remains Founder Node's evidenced-nearby-growth projection.**

The pollen metaphor here does not convert Pollen Scout into a generic transport or execution layer.

## First falsifiable proof

The executable candidate on Project0 PR #47 now contains the fixed topology:

```
excitation E
     ↓
A becomes eligible
     ↓
B becomes eligible because A now exists in branch-local history
     ↓
C is attempted but refused because required authority is absent
     ↓
no further lawful candidate
     ↓
damped
```

Its frozen fixture family also proves:

1. adding prior recognition `R` changes eligibility while authority stays byte-identical;
2. increasing declared work budget exposes more lawful search while authority/policy stay unchanged;
3. repeated execution from identical canonical inputs yields identical branch, step, refusal, and terminal identities;
4. attempted refusal remains distinguishable from an unattempted candidate;
5. source fixture records remain unchanged;
6. hostile accessor entries in declarations or candidate arrays are rejected without executing them.

The candidate remains deliberately local and deterministic: no model, network, scheduler, database, queue, UI, hidden global state, or ambient agent loop is required.

## Executable candidate evidence — 2026-08-19

Project0 PR #47 is currently open, non-draft, and mergeable at head:

`9d5cec6b95321355a09b256f2029012c160e6e2b`

GitHub Actions run #138 executed the full repository gate:

```
npm run verify:all
```

Observed result:

* TypeScript compile check: PASS;
* Node/TypeScript tests: 168 passed, 0 failed;
* Python canonical fixture verification: PASS;
* conformance CLI: PASS;
* dependency audit during `npm ci`: 0 vulnerabilities.

The Actions job checked the PR merge ref against the then-current `main`, not merely the feature branch in isolation.

This is **project-backed executable candidate evidence**, not a claim that the work has landed on `main`, become a tagged contract, or graduated into a universal Static Collective Pattern.

## Downstream possibilities after proof

Potential later embodiments include:

* **Haunted Toaster** — candidate-family mutations where recognition, discarded lineage, or prior composition alters future susceptibility without becoming a command;
* **Haunted Phonograph** — motifs that excite bounded harmonic/rhythmic transformations;
* **Founder Node** — field pressure that changes visible nearby moves without dispatch authority;
* **Corpus OS** — refusal history that changes navigational attention without rewriting case authority.

These are possible adopters, not evidence that the law has already graduated.

## Project authority

Canonical design / implementation authority remains in Project 0:

* GitHub issue: https://github.com/the-static-collective/project0/issues/46
* Executable candidate PR: https://github.com/the-static-collective/project0/pull/47
* Current candidate head: `9d5cec6b95321355a09b256f2029012c160e6e2b`
* Design spec: `docs/superpowers/specs/2026-08-19-l-branch-v0.1-bounded-resonant-propagation-design.md`
* Implementation plan: `docs/superpowers/plans/2026-08-19-l-branch-v0.1-bounded-resonant-propagation.md`

This GitBook page is a public frontier projection. It does not turn a green PR into landed Project0 state, and it does not freeze L-Branch as a universal law.

## Residual fog

The first implementation candidate resolves the initial questions about declaration/step/terminal addressed-record shape, finite continuation bounds, deterministic replay, influence/authority separation, and refusal preservation.

Still unresolved:

* whether the exact experimental record shapes should survive unchanged beyond `p0.l-branch/0.1`;
* how L-Branch composes with executable #30 resonance evaluation without coupling the primitives;
* how real downstream capability execution should bind Project0 lease-consumption receipts while preserving this propagation boundary;
* whether repeated independent specimens eventually justify graduating any portion into a portable Pattern.
