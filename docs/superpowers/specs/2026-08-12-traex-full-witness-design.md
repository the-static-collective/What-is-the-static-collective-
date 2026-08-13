# TRAEX Full Witness — Specimen #1 Design

Date: 2026-08-12
Status: approved design, implementation not yet started
Scope: documentation-only specimen in `What-is-the-static-collective-`

## Purpose

Test whether the incubated TRAEX / Tracks crossing grammar reveals meaningful boundary semantics that an ordinary flat receipt/event lineage obscures.

The specimen uses the just-landed Autodiscography Vault Phase-A journey because it already contains several real, independently evidenced crossings across urgency, proposal, implementation, proof, admission, downstream handoff, and collective documentation.

This experiment must not promote TRAEX into a shared schema, receipt type, runtime object, visualization primitive, or Project0-level concept. One specimen is evidence, not graduation.

## Core question

Can a compact TRAEX Track make it easier to inspect:

- what crossed a boundary;
- which operation best describes the crossing;
- what remained invariant;
- what changed;
- where authority remained, changed, or explicitly did not transfer;
- what evidence remained afterward;
- and whether expression was actually experienced by a witness;

without inventing facts or erasing distinctions already present in the underlying systems?

## Chosen form: dual-lane Full Witness

The specimen will be written as one ordered crossing track with two explicit continuity lanes:

1. **Evidence / carried-state lane** — what information, implementation, proof, or projection crossed the boundary.
2. **Authority lane** — what authority applied before and after the crossing, including cases where no authority transfer occurred.

Each crossing will use the existing incubator fields:

```text
from
operation
boundary
to
preserved
changed
authority
receipt
residue
```

Operation labels may be composed when one crossing honestly performs more than one operation, for example `TRANSFER + TRANSMUTE`.

The operation vocabulary remains descriptive rather than normative:

- EXPERIENCE
- TRANSLATE
- EXPRESS
- TRANSMUTE
- TRANSFER
- EXCHANGE

No crossing is required to fit exactly one verb.

`EXPERIENCE` is always witness-relative. Every row using it must name the participant or witness that encountered the state. A machine execution may establish machine-observed experience; it must not be silently promoted into human experience.

## Specimen route

### Crossing 1 — External notice -> Corpus OS P0

Operation: `EXPERIENCE + EXPRESS`

The external Suno policy change is encountered by the operator/project and becomes explicitly represented as preservation urgency in Corpus OS issue #4.

Key distinction: urgency changes, authority does not. The recorded deadline accelerates action but does not grant Corpus OS authority over Suno or weaken provenance/trust rules.

### Crossing 2 — Corpus OS P0 -> Vault Phase-A contract

Operation: `TRANSLATE`

The preservation pressure and trust constraints are translated into a bounded implementation contract: separate local-first Vault repository, synthetic-only Phase A, append-only journal, exact-byte verification, explicit incomplete states, and no live Suno authority yet.

### Crossing 3 — Contract -> executable Phase-A implementation

Operation: `TRANSMUTE`

The proposal changes kind from prose requirements into executable code, fixtures, tests, local UI shell, verifier, journal, manifest projection, and trust documentation.

Lineage must remain inspectable. The implementation is not described as merely a copy of the contract.

### Crossing 4 — Implementation -> pre-admission CI proof

Operation: `EXPERIENCE + EXPRESS`

GitHub Actions executes the implementation and emits machine-observable evidence. The named witness for this `EXPERIENCE` is the CI execution, not a human operator.

Key distinction: successful CI on a proposal branch proves behavior of that branch head; it does not itself admit the implementation to canonical `main`.

### Crossing 5 — proposal branch -> canonical `main`

Operation: `TRANSFER + TRANSMUTE`

The implementation crosses the repository admission boundary by squash merge.

Preserved: intended implementation content and lineage back to the proposal.

Changed: branch/proposal history is represented as a canonical squash commit (`91f7ee143994a7700c886d20edff8fe5eeb5a688`).

Authority distinction: the branch remains proposal history; `main` becomes the canonical repository state after admission.

### Crossing 6 — landed `main` -> post-merge proof

Operation: `EXPERIENCE`

The canonical landed state is executed after admission. The named witness for this `EXPERIENCE` is the post-merge CI execution.

This crossing exists specifically to preserve the distinction between:

- tested proposal; and
- tested canonical artifact.

The post-merge workflow passed on the exact squash commit.

### Crossing 7 — Vault landed fact -> Corpus OS next authority gate

Operation: `TRANSLATE`

Vault-local facts are translated into Corpus OS's governing language: Phase A is complete enough to advance only to the separately reviewed, hard-capped 25-track live pilot.

No authority transfers between Vault and Corpus OS. Vault exports evidence/pollen; Corpus OS interprets that evidence under its own gate.

This crossing must preserve the BEE anti-scope-creep boundary: no TranchNode, Exact Return, semantic-equivalence, lineage inference, or universal receipt ontology is imported into Vault by this handoff.

### Crossing 8 — project fact -> GitBook collective memory

Operation: `EXPRESS`

The landed project fact is projected into navigable collective documentation.

Key distinction: documentation makes the fact perceptible and traversable but does not become source authority over the underlying GitHub/project evidence.

### Deliberate non-crossing — expression != experience

The specimen must not invent a later `EXPERIENCE` crossing merely because the GitBook page exists.

A documented projection is evidence of expression. Human encounter with that projection is observer-relative and must be separately witnessed before it can be claimed as experience.

This is a required negative assertion in Specimen #1:

> expressed != necessarily experienced

## Flat-lineage comparison

The specimen will include the ordinary sequence alongside the TRAEX view:

```text
Corpus OS issue #4
-> Vault issue #1 / Phase-A contract
-> Vault PR #2
-> pre-merge CI
-> squash merge
-> post-merge CI
-> Corpus OS landed note
-> GitBook update
```

The flat lineage is expected to answer **what happened**.

TRAEX succeeds only if it additionally makes at least one material boundary distinction easier to inspect.

The expected candidate distinctions are:

- pre-merge CI proof != canonical admission;
- branch -> `main` is both transfer and transmutation;
- post-merge proof witnesses a different authority-bearing state from proposal CI;
- Vault -> Corpus OS is translation without authority transfer;
- GitBook is expression without becoming source authority;
- expression and experience are not interchangeable.

## Evidence rules

Every factual crossing claim must point to existing project evidence wherever available: issues, PRs, commit SHA, workflow result, handoff note, or GitBook witness.

The specimen may interpret the operation type, but it must clearly distinguish interpretation from machine-recorded fact.

If evidence is absent, the track must say `unwitnessed`, `unknown`, or equivalent rather than completing the route by inference.

Observer-relative experience must never be fabricated. Every `EXPERIENCE` claim must name its witness or participant.

## Architecture and placement

Implementation is documentation-only.

Planned durable specimen path:

```text
specimens/traex-autodiscography-vault-phase-a.md
```

The existing TRAEX incubator note remains the vocabulary/context source. It may receive a small pointer to the specimen, but its graduation criteria must remain unchanged.

No runtime repository, provider adapter, receipt schema, parser, validator, or visualization will be added in this slice.

## Failure / refusal behavior

The specimen should explicitly refuse overclaiming in four cases:

1. a crossing verb would erase a meaningful distinction;
2. authority movement cannot be evidenced;
3. an operation would require assuming a human witnessed something;
4. the track would need a new ontology merely to make the example fit.

In those cases the row should stay composite, partial, observer-relative, or explicitly unresolved.

## Test / evaluation method

This is a documentation experiment, so evaluation is conceptual and evidence-based rather than runtime-based.

The specimen passes only if all of the following are true:

1. every crossing is grounded in existing evidence;
2. preserved vs. changed is inspectable at each boundary;
3. authority is never inferred from movement alone;
4. at least one distinction is clearer in TRAEX than in the flat lineage;
5. no observer-relative experience is invented;
6. the grammar remains small enough to describe the route without adding a schema;
7. the final verdict explicitly keeps TRAEX incubated after one specimen.

## Graduation boundary

This slice cannot graduate TRAEX.

The existing incubator rule remains controlling: at least two materially different systems must describe real crossing sequences with the same small grammar without semantic lying, and at least one specimen must reveal a meaningful distinction ordinary lineage obscures.

Specimen #1 may satisfy only the second half of that requirement.

## Expected verdict shape

The final specimen should end with one of three outcomes:

- **useful** — TRAEX exposed a meaningful boundary distinction and should remain incubated pending a second-domain specimen;
- **decorative** — the same information was just as clear in the flat lineage;
- **distorting** — the crossing vocabulary forced semantic lies or hid authority distinctions.

The preferred outcome is not assumed in advance.

## Non-goals

- no shared TRAEX JSON schema;
- no receipt replacement;
- no runtime `Track` object;
- no TranchNode or Project0 promotion;
- no automatic operation classification;
- no visualization requirement;
- no change to Vault Phase A;
- no claim that TRAEX is universal architecture;
- no claim that documentation proves human experience.
