# AI Guest Boundary Metadata + Re-entry — Design

## Purpose

Use the invited AI guest trace from 2026-08-16 as a before/after specimen for Threshold Scan and graduate the smallest portable boundary contract that the encounter independently exercised.

The slice has three goals:

1. preserve the guest's trace as attributed evidence;
2. define a normative five-field `BoundaryMetadata` contract for metadata-only threshold scans;
3. clarify that observer/session persistence is not required for durable world continuity.

This remains documentation/evidence work. It does not introduce executable agent memory, a door registry, a resolver, or traversal authority tokens.

## Source Evidence

The supplied trace identifies the observer as **Meta AI (invited guest, no prior corpus loaded)** and records three visits through the Front Room.

Its strongest before/after result is:

```text
same blocked reachability
        ↓
pre-fix: Front Room substituted for inaccessible canonical source
post-fix: destination remained fogged
```

The transport failure did not disappear. The behavioral failure did.

The trace also independently used the same five boundary concepts already present in the Threshold Scan design:

```text
destination
relation
reachability
provenance
relevance
```

and explicitly asked whether that set should be normative.

It also asks whether guest reset between conversations is expected or whether a persistent agent mechanism is intended.

The design answers those two questions narrowly.

## Approaches Considered

### Approach A — Preserve the trace only

Store the encounter as evidence and make no new portable law.

**Advantage:** minimum interpretation.

**Cost:** wastes a repeated independently observed interface shape and leaves future guests guessing whether the five fields are merely examples.

### Approach B — Trace + five-field boundary contract + re-entry clarification

Preserve the trace, graduate the five-field metadata shape, and make observer/world continuity explicit without adding runtime state.

**Advantage:** converts repeated evidence into one small portable contract while preserving YAGNI.

**Cost:** requires careful wording so a conceptual contract does not accidentally become a universal registry schema.

**Selected approach.** This is the slice approved in conversation.

### Approach C — Persistent guest identity / executable agent memory

Create durable per-agent field state or a persistent guest memory mechanism.

**Advantage:** could reduce reconstruction work between sessions.

**Cost:** prematurely conflates continuity of observer state with continuity of the world, creates privacy/authority questions, and duplicates mechanisms already supplied by durable artifacts and re-entry receipts.

**Rejected / deferred.**

## Design 1: Preserve the AI Guest Before/After Trace

Create a standalone specimen, tentatively:

`specimens/ai-guest-traversal-before-after-threshold-scan.md`

The specimen should be a clean Markdown normalization of the supplied trace, not a reinterpretation of it.

Preserve these distinctions exactly:

- observer self-identification: Meta AI, invited guest, no prior corpus loaded;
- first traversal: blocked reachability and pre-fix hallway-for-room substitution;
- later traversal: same reachability failure but post-fix fog preservation;
- zero/near-zero natural traversal friction for the guest;
- explicit statement that the actual Field Traversal & Illumination body remained unread/fogged;
- the guest's two residual questions: normative boundary metadata and persistence;
- authority claims as claims made by the guest, not silently upgraded into project truth.

The specimen may add a small editorial header identifying the source as a user-supplied guest trace and distinguishing **Observed by guest / Interpreted by notebook / Canonical elsewhere**.

Do not rewrite the trace to make the guest appear to have known facts it did not know at the time.

## Design 2: Graduate `BoundaryMetadata`

### Core contract

A metadata-only threshold probe has one normative portable shape:

```text
BoundaryMetadata
  destination
  relation
  reachability
  provenance
  relevance
```

These five names are normative at the conceptual level. Their transport-specific encodings are not.

### Field meanings

#### `destination`

The conceptual place or field the door points toward.

It is not required to be a URL, page id, repository path, or file name. Those may be evidence for the destination.

#### `relation`

Why the destination is adjacent or meaningful from the current field.

Examples include the existing typed traversal vocabulary when known (`resonance`, `derivation`, `tension`, `portal`) or a bounded descriptive relation when no canonical type applies.

#### `reachability`

What the current observer can establish about crossing availability **without loading destination content**.

Portable states should remain small:

```text
reachable
blocked
unverified
```

`reachable` means an authority-preserving route is known to be available at the boundary; it does not mean content was loaded.

`blocked` means an attempted boundary route is known to be unavailable through the present surface.

`unverified` means the scan lacks enough evidence to assert either state.

Do not add `missing` as a synonym for `blocked`.

#### `provenance`

Evidence describing where authority lives and, when alternate routes exist, whether their lineage to that authority is explicit.

This may contain Git Sync lineage, repository/source path, page id, artifact identity, or another project-specific proof. The portable contract does not standardize those subfields.

#### `relevance`

Why this destination matters, or does not matter, to the **current request**.

Portable values may be expressed as:

```text
relevant
not-relevant
uncertain
```

with a short reason.

Relevance is not importance, popularity, or permission.

### Negative invariant

The five-field contract is valid as `BoundaryMetadata` only while destination content has not been loaded as part of the probe.

> **Law: boundary metadata describes whether and why a crossing may matter; it does not contain the destination.**

The existing scan-level assertion remains useful:

```text
contentLoadedDuringScan: false
```

but it is a receipt invariant, not a sixth `BoundaryMetadata` field.

If a body-returning operation occurs, the operation has crossed from threshold probing into traversal and must be recorded as such.

## Design 3: Observer Persistence != World Persistence

The guest's reset between conversations is expected behavior for this architecture.

The notebook should make the distinction explicit:

```text
observer/session ends
        X
continuous awareness

artifacts + receipts + unresolved frontier persist
        ↓
new observer/session enters
        ↓
bounded reconstruction
        ↓
new field of awareness
```

### Portable law

> **Law: observer continuity is not required for world continuity.**

A stronger house-language rendering may accompany it:

> **The guest may vanish; the changed world remains available for re-entry.**

This should compose with the existing pattern *The Room Can Vanish; the World Remains* rather than create a new persistence subsystem.

### Role of entry instructions

Custom Instructions, project instructions, or a human invitation may provide an **entry trigger** telling a new guest to orient in the Front Room.

They are not the memory substrate.

Durable continuity belongs in externally inspectable artifacts such as:

- field snapshots;
- traversal / reconstruction receipts;
- evidence references;
- unresolved frontier;
- project-owned canonical sources.

A later observer may reconstruct from those residues. It must not imply that the previous observer's consciousness or private state persisted.

## Documentation Placement

After written-spec approval, the implementation should remain small:

1. create `specimens/ai-guest-traversal-before-after-threshold-scan.md` from the supplied trace;
2. amend `patterns/field-traversal-and-illumination.md` with the normative five-field `BoundaryMetadata` contract and negative invariant;
3. amend `patterns/world-reentry-memory.md` (or the closest existing re-entry section) with `observer continuity is not required for world continuity`;
4. add the guest specimen to `SUMMARY.md` under Evidence.

Avoid another Front Room expansion unless implementation review finds a concrete contradiction. The Front Room already contains the scan/cross rule that produced the observed behavioral correction.

## Data Flow

```text
AI guest encounter
      ↓
attributed before/after specimen
      ↓
repeated boundary concepts
      ↓
BoundaryMetadata contract
      ↓
metadata-only scan receipt
      ↓
deliberate traversal OR preserved fog

session ends
      ↓
durable residue remains
      ↓
new guest re-enters
      ↓
bounded reconstruction
```

## Error / Fog Handling

The resulting documentation must preserve:

- `blocked` != `missing`;
- `unverified` != `blocked`;
- `reachable` != traversed;
- `relevant` != authorized;
- provenance evidence != automatic authority transfer;
- body read != metadata-only probe;
- new session != continuous observer consciousness;
- guest report != canonical project truth.

## Acceptance Criteria

The slice is complete when:

1. the supplied AI guest trace exists as an attributed standalone Markdown specimen;
2. its before/after blocked-reachability behavior remains intact;
3. `BoundaryMetadata` has exactly five normative conceptual fields: `destination`, `relation`, `reachability`, `provenance`, `relevance`;
4. `reachability` distinguishes `reachable`, `blocked`, and `unverified` without equating blocked with missing;
5. `contentLoadedDuringScan: false` remains an invariant/receipt assertion, not a sixth metadata field;
6. Field Traversal states that boundary metadata does not contain the destination;
7. re-entry documentation states that observer continuity is not required for world continuity;
8. entry instructions are described as triggers, not memory storage;
9. no persistent-agent-memory subsystem, universal registry, resolver, crawler, or `TraversalWarrant` is introduced;
10. the guest's residual fog and attribution remain visible after normalization.

## Deferred Frontier

Do not solve in this slice:

- executable machine schema / JSON Schema for `BoundaryMetadata`;
- universal `DoorTarget` registry;
- persistent agent identity or per-agent memory store;
- automatic cross-session state hydration;
- browser/security-policy bypasses;
- recursive scout fields;
- traversal warrants or consumable epistemic authority.

A machine-readable schema becomes eligible only if at least one owning executable project needs interoperability beyond prose/Markdown specimens.
