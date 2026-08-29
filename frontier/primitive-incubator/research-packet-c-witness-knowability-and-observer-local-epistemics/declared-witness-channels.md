# Declared Witness Channels

**Status:** Incubating / project-neutral hypothesis; no shared package or runtime owner.

## Primitive

A **Declared Witness Channel** is a bounded, attributable route by which one system may offer testimony to another without becoming ambient omniscience or silently acquiring authority in the receiving system.

The useful shape is not "connect every memory source." It is:

```
source-owned evidence
  -> declared witness channel
  -> bounded witness packet
  -> receiving projection / proposal
```

The channel says what the source can testify about, which source state or causal cut the testimony represents, who owns that testimony, and what authority the testimony explicitly does **not** carry.

## Felt possibility

Several Collective systems are beginning to want historical or neighboring context without wanting a global brain.

**Haunted Memory — Composition With History** already names possible bounded witness sources such as Autodiscography, Corpus OS, Idea Grove, Band Runtime, Formation Trace, and Full Measure. Its law is explicit: these must enter as declared witness channels, not invisible omniscience.

Upper Room exposes the same pressure from another direction. Scripture can remain the canonical coordinate while participant presence, lexical context, cross-references, historical material, and AI-assisted interpretation may become useful neighboring testimony. The danger is not context itself. The danger is context arriving without a visible provenance/authority boundary.

This suggests a small portable question:

> **Can a system receive useful testimony from another field while making it mechanically obvious what was witnessed, by whom, from which source state, and with what non-authority?**

## What the channel must preserve

A first characterization should keep at least these distinctions visible:

* **source owner** — which project/domain owns the underlying evidence;
* **source state / causal cut** — what version, snapshot, event range, or bounded state was witnessed;
* **scope** — what the testimony is about;
* **evidence refs** — how the receiver can trace back to source material where allowed;
* **witness role** — observation, projection, participant testimony, historical context, etc.;
* **non-authority** — what the channel cannot decide, mutate, canonize, or infer;
* **disclosure boundary** — what was deliberately omitted or inaccessible;
* **freshness** — when current-state relevance matters, whether the source state has been checked recently enough to claim current relevance.

The receiver may derive a proposal from the testimony. It may not silently relabel the testimony as receiver-owned fact or authority.

## Candidate packet — deliberately unfrozen

A specimen may discover something approximately like:

```ts
interface WitnessPacket {
  sourceOwner: string;
  sourceRef: string;
  sourceCut: string;
  witnessKind: string;
  scope: string[];
  evidenceRefs: string[];
  observed: unknown;
  nonAuthority: string[];
  disclosure?: {
    omitted: string[];
    reason?: string;
  };
  freshnessRef?: string;
}
```

This is **not** a proposed shared schema yet. Do not create `@static/witness`, a universal MCP protocol, or a new Project0 ontology kind from this note.

## First proving ground: Upper Room

Upper Room is a good candidate for the first local specimen because its authority boundary is unusually clear:

```
Scripture text/address = canonical textual coordinate
participant action      = participant-owned witness
AIHYPER context         = explicit invoked proposal/context surface
```

A tiny experiment could attach one explicit witness packet to one Scripture selection.

Example:

1. a participant selects one passage;
2. they explicitly invoke AIHYPER;
3. one declared source supplies bounded context — for example a cross-reference set or lexical/historical note;
4. the resulting context visibly names its source, cut/version where meaningful, and non-authority;
5. AI synthesis may use that packet to propose connections;
6. the Scripture text remains unchanged and the proposal cannot masquerade as canonical interpretation.

No MMO layer, world renderer, shared memory bus, or automatic retrieval is required.

## Negative controls

The first specimen should fail if:

* the receiver can consume source context without naming the source;
* the channel grants mutation or canonical authority merely because it carries evidence;
* current-state claims are made from an unknown/stale source cut without saying so;
* private or protected source material leaks merely because a neighboring system has a channel;
* source-specific semantics are flattened into a universal packet field that lies about their meaning;
* AI synthesis is back-written as though the source itself asserted the synthesis;
* the receiver must ingest an entire source corpus to gain one bounded piece of testimony.

## Relationship to nearby primitives

### Haunted Memory

Declared Witness Channels may become the ingress boundary by which historical context enters composition. Haunted Memory remains responsible for what that testimony means inside its own creative domain.

### Witness Session

Witness Session preserves multiple testimonies over one time-indexed execution. Declared Witness Channels concern how testimony crosses a system boundary. They may compose later, but they are not the same primitive.

### BEE Protocol

BEE asks which invariants survive a boundary crossing. A witness channel may carry evidence across a boundary, but the channel should not be collapsed into BEE until specimens prove that the same law is actually doing both jobs.

### TRAEX

TRAEX tracks crossings and what changed/persisted across them. A witness channel could later become one type of crossing recorded by TRAEX. TRAEX remains incubated and should not be pulled forward merely to describe this experiment.

### Projection Freshness Witness

When a witness packet makes a claim about current project state, freshness may be one piece of its evidence. Freshness is not required for timeless source evidence, and it remains a separate concern from authority.

## Graduation gate

Do not promote this beyond a project-local contract until **two materially different domains** prove the same small boundary without semantic lying.

A credible route is:

1. Upper Room proves one explicit context witness crossing;
2. Haunted Memory later consumes one bounded historical witness source;
3. compare the two contracts;
4. disposition: `graduate | keep-local | split | insufficient-evidence`.

If the two domains require materially different semantics, keep them separate.

## Current executable ownership

**None.**

This is an incubator note, not authorization to create infrastructure. The next lawful move is one bounded project-local specimen.

## Governing compression

> **Context may cross the boundary. Authority does not hitchhike with it.**
