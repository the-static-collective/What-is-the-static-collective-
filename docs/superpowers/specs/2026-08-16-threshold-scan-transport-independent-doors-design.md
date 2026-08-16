# Threshold Scan + Transport-Independent Doors — Design

## Purpose

Turn the frictionless reachability exposed by Metta's first guest traversal into a bounded capability instead of treating it only as a risk.

The core move is:

> **Scan the doors freely. Cross them deliberately.**

A Front Room door should identify a destination independently of any one transport or rendering surface. An agent may cheaply inspect the boundary conditions of visible doors in parallel, but a threshold scan must not silently ingest the rooms behind them.

This design builds directly on the approved Metta Traversal Boundedness design and keeps its restraint: no `TraversalWarrant`, universal crawler, or executable authority system is introduced here.

## Current Evidence

The present Front Room exposes seven doors through GitBook/Git-synced Markdown. The underlying `README.md` contains ordinary links to project-relative source paths.

During investigation of the Field Traversal & Illumination door:

- GitBook's current page map contained the page at `patterns/field-traversal-and-illumination`;
- the page had a stable GitBook page id and an underlying Git path of `patterns/field-traversal-and-illumination.md`;
- the GitBook space reported successful Git Sync import from `the-static-collective/What-is-the-static-collective-` `main`;
- one connector read surface failed when addressing that page by path while the same page was readable by page id;
- the canonical GitHub source file was directly readable.

This proves a **surface-dependent traversal failure** in the observed tooling. It does **not** prove that the published GitBook page, Markdown link, or GitBook product is generally broken.

The design therefore separates destination identity from transport reachability.

## Design Laws

### 1. Door identity is not a URL

A door identifies a conceptual destination. URLs, page ids, repository paths, and rendered projections are ways to reach or represent that destination.

```text
Door
  identity
  relation
  preferredProjection
  canonicalSource
```

A transport failure may block one projection without erasing the destination.

> **Law: projection identity and destination identity must remain distinct.**

### 2. Threshold probing is not traversal

A **threshold probe** may inspect only boundary metadata needed to decide whether a crossing is available and relevant.

Allowed threshold information includes:

- destination label / identity;
- declared relation from the current room;
- known projection reference;
- canonical source reference;
- reachability state;
- projection/source freshness or lineage evidence when available;
- current-request relevance judgment and its reason.

A threshold probe must not ingest:

- destination body text;
- search snippets from inside the destination;
- neighboring destination content;
- inferred summaries presented as if retrieved;
- automatically expanded context bundles.

A body-returning read is a traversal for the purposes of this experiment, even if the caller intended only to test reachability. The first specimen must therefore use metadata/listing surfaces for scan-phase reachability checks. If destination content is loaded, `contentLoadedDuringScan: false` cannot be claimed.

> **Law: probing a threshold does not count as entering the room.**

### 3. Frictionless parallelism belongs at the boundary

An agent may probe all visible thresholds in parallel because the scan returns only boundary state.

```text
Front Room
    ↓
parallel threshold probes
    ↓
small boundary map
    ↓
relevance decision
    ↓
one or more deliberate crossings
```

This uses low traversal cost productively without turning cheap reachability into automatic context expansion.

> **Law: frictionless reachability is useful for surveying boundaries, not for silently expanding context.**

### 4. Alternative routes require lineage evidence

If a preferred projection is inaccessible, a scan may identify another route only when the relationship between the routes is explicit enough to preserve authority.

For the current GitBook space, Git Sync metadata establishes that GitBook is importing from the GitHub repository's `main` branch. Therefore a blocked GitBook projection can lawfully point the observer to the corresponding GitHub source path without treating a random cache as authoritative.

This is not generic fallback behavior.

```text
preferred projection blocked
    ↓
verify explicit source/projection lineage
    ↓
canonical source reachable? ── yes → eligible crossing route
    │
    no
    ↓
keep destination fogged
```

> **Law: route substitution is lawful only when provenance preserves the authority relationship.**

A cache, generated summary, search result, or reconstruction does not become authoritative merely because the preferred projection failed.

### 5. Scan results are receipts, not permissions

A threshold scan may recommend a relevant crossing. It does not itself authorize or perform the crossing.

A minimal receipt is:

```text
ThresholdScanReceipt
  origin
  prompt
  observer
  scannedAt
  doors[]
    destination
    relation
    projectionState
    canonicalSourceState
    lineageState
    relevance
    relevanceReason
  admittedCrossings[]
  contentLoadedDuringScan: false
  residualFog[]
```

`admittedCrossings[]` records what the current conversation or operator selected after the scan. It must not be populated merely because a door was reachable.

## Transport-Independent Door Shape

This slice should use a minimal conceptual shape, not a new registry framework:

```text
DoorTarget
  destination
  relation
  preferredProjection
  canonicalSource
```

For the Front Room first specimen, existing GitBook page metadata plus Git Sync metadata can provide the projection/source mapping. Do not create a universal manifest, resolver service, database, or schema package yet.

If repeated specimens later show that mappings need durable machine-readable representation, that can graduate separately.

## First Specimen: Front Room Seven-Door Scan

The first proof is limited to the seven existing Front Room doors:

- Patterns;
- Witness;
- Frontier;
- Incubator;
- Evidence;
- Vocabulary;
- World / Re-entry.

The specimen should perform a metadata-only scan and preserve, for each door:

1. the conceptual destination;
2. the current GitBook projection reference if present;
3. the Git-synced GitHub source path if present;
4. whether each route was reachable through the available tool surface;
5. whether projection/source lineage was verified;
6. whether the current prompt made the door relevant;
7. whether a crossing was actually admitted;
8. explicit confirmation that no destination body was loaded during the scan.

The first specimen must not recursively scan doors inside those destinations.

## Proposed Documentation Slice

After this design is approved in written form, implementation should remain documentation/evidence scoped:

1. amend `patterns/field-traversal-and-illumination.md` with the probe/traverse distinction and the positive use of frictionless boundary scanning;
2. add a compact Threshold Scan paragraph to the Front Room without making the room larger than necessary;
3. add a first specimen, tentatively `specimens/front-room-threshold-scan-v0.1.md`;
4. expose that specimen in `SUMMARY.md`;
5. preserve Metta's blocked-path behavior as evidence motivating the experiment, without rewriting her original encounter.

No executable resolver or crawling code is required for this first proof.

## Data Flow

```text
current request
    ↓
Front Room orientation
    ↓
visible DoorTargets
    ↓
metadata-only Threshold Scan
    ↓
reachability + lineage + relevance map
    ↓
deliberate crossing selection
    ↓
content retrieval / traversal
    ↓
TraversalReceipt
```

The threshold scan stops before content retrieval. A later traversal remains a separate epistemic event with its own receipt.

## Error and Fog Handling

The scan must preserve these distinctions:

- destination exists != preferred projection reachable;
- projection blocked != destination missing;
- source reachable != source automatically relevant;
- same title != same lineage;
- alternative route != lawful substitute unless lineage is verified;
- probe != traversal;
- recommendation != permission;
- metadata observed != content understood.

When no authority-preserving route can be verified, the result is not an inferred reconstruction. The destination remains fogged.

## Acceptance Criteria

The design is successfully implemented when:

1. Field Traversal & Illumination explicitly distinguishes threshold probing from traversal;
2. the positive law `Scan the doors freely. Cross them deliberately.` is represented without weakening bounded traversal;
3. the Front Room allows a bounded metadata-only threshold scan while remaining an orientation surface, not a corpus index;
4. the seven-door specimen records projection, canonical source, lineage, reachability, relevance, and admitted crossing states;
5. the specimen records `contentLoadedDuringScan: false` or an equivalent explicit assertion and no body-returning read occurred during the scan phase;
6. a blocked projection can point to an authority-preserving canonical route only when lineage is evidenced;
7. unverified alternatives remain fogged rather than being promoted;
8. no universal door registry, crawler, `TraversalWarrant`, or executable resolver is introduced;
9. GitBook remains Git-synced from the GitHub repository as the single editing source of truth for this slice.

## Verification Strategy

Because this slice is documentation/evidence only, verification should be concrete and narrow:

- inspect all seven Front Room door targets in the current GitBook page map;
- verify corresponding Git paths where GitBook exposes them;
- verify Git Sync source and successful import state;
- use metadata/listing operations only for scan-phase source/projection reachability checks;
- review the specimen against the no-content-loaded rule;
- validate Markdown links / GitBook navigation after merge;
- confirm the Front Room did not grow into a general index.

Riqor's role is evidence discipline: focused verification after mutations and no completion claim beyond the observed proof. PR Completion should shepherd the resulting PR to verified readiness but must not land it without fresh explicit approval for the implementation PR head.

## Deferred Frontier

Explicitly defer:

- a universal `DoorTarget` registry or manifest;
- automatic recursive threshold scanning;
- speculative multi-hop scouts;
- `TraversalWarrant` or consumable traversal authority;
- content-bearing semantic search during threshold scan;
- automatic cache fallback;
- cross-agent persistent field identity;
- browser/security-policy bypass mechanisms.

A later **Scout Field** experiment becomes eligible only after Threshold Scan proves that broad cheap probing can remain genuinely non-retrieval.
