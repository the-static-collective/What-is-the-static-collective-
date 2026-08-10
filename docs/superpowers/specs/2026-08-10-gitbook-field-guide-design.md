# GitBook Field Guide Experiment — Design

Date: 2026-08-10
Status: design only; implementation gated on review

## Purpose

Create a public GitBook projection of `the-static-collective/What-is-the-static-collective-` without creating a second source of truth.

The experiment should test whether the Collective's emerging memory model can become visible in navigation itself: not merely pages linked to pages, but **fields, traversals, evidence, and frontier** arranged so that moving through the site reveals conceptual structure.

The first specimen should be small enough to reverse easily and rich enough to teach us something.

## Governing law

> GitBook is a projection, not the substrate.

GitHub remains canonical for repository history, provenance, implementation-owned documentation, and portable notebook artifacts. Project repositories remain canonical for project-specific truth. GitBook provides orientation, traversal, synthesis, and publication.

No GitBook page may silently outrank the canonical source it summarizes.

## Architecture

```text
conversation / observation
        ↓
Static Collective notebook repository
        ↓
reviewed Git commit / PR
        ↓
GitBook Git Sync projection
        ↓
reader traversal
        ↓
newly visible relation / tension / frontier
        ↓
optional new notebook observation
```

The final arrow is intentional. The published guide is not only output; it is also a specimen surface where navigation may expose structure worth capturing back in the notebook.

## Site shape: one site, one space, one canonical repository

Start with one public GitBook site and one GitBook space synced to `the-static-collective/What-is-the-static-collective-`.

Do not create separate spaces for every project yet. That would prematurely turn conceptual relationships into product silos.

The first space should behave as an atlas over the notebook, with project repositories linked outward as canonical implementation sources.

Working site title:

**The Static Collective Field Guide**

## Navigation experiment

The navigation should model an epistemic map rather than mirror the repository tree.

Proposed first structure:

```text
START HERE
├── What is the Static Collective?
├── The Wager
└── How to Read This Place

FIELDS
├── Creative Systems
├── Distributed Signal Systems
├── Human + Agent Collaboration
└── Provenance & Authority

TRAVERSALS
├── Field Traversal & Illumination
├── Creative Handoff
├── Resonance
├── Derivation
├── Tension
└── Portal

SYSTEMS
├── Project0
├── TranchNode
├── Corpus OS
├── Band Runtime
├── Haunted Toaster
└── TranchNOSE

EVIDENCE
├── Specimens
├── Receipts
└── Witness Notebook

FRONTIER
├── Primitive Incubator
├── Unresolved Questions
└── Things Trying to Become Projects

VOCABULARY
└── Static Collective Vocabulary
```

This is intentionally not a 1:1 representation of `notes/`, `patterns/`, `specimens/`, etc. The repository organizes durable artifacts by type; GitBook organizes the reader's route through meaning.

## Mapping the memory model onto the site

### FieldSnapshot → landing page

A field page should reconstruct a bounded conceptual neighborhood rather than attempt to summarize the entire Collective.

Each field page should contain:

- what is currently salient in this field
- protected anchors
- live tensions
- unresolved frontier
- relevant systems
- supporting specimens / receipts
- nearby fields that can be reached from here

A field page is a projection, not a claim that the field is complete.

### TraversalReceipt → explicit transition page or block

When one field meaningfully illuminates another, preserve the route.

Minimum traversal representation:

```text
source field
    ↓ typed traversal
why this transition became plausible
    ↓
destination field
    ↓
what became visible that was not visible before
```

Initial traversal types remain:

- resonance
- derivation
- tension
- portal

Where useful, traversal pages should link to the originating notebook pattern or specimen.

### VisibilityState → page-level frontier cues

GitBook should make epistemic status visible without pretending uncertainty is failure.

The first specimen can encode visibility with ordinary prose/callouts rather than custom software:

- **bright** — repeatedly traversed and well supported
- **dim** — partially explored or weakly supported
- **fogged** — plausible adjacency, not yet examined
- **contested** — multiple incompatible interpretations remain live
- **dark** — no known route from the present field

The visibility label must remain observer-/time-relative. It must never be rendered as a universal truth score.

## First concrete traversal specimen

Use the already observed path:

```text
Bee Communication
    --resonance-->
Distributed Signal Field
    --derivation-->
TranchNode / Collective Memory Architecture
```

The GitBook version should show:

1. the source field before traversal
2. the typed transition
3. what relation became newly visible
4. which evidence supports the transition
5. what remains fogged afterward

Success condition: another reader can reconstruct why the destination became reachable without needing the original conversation transcript.

## Page template experiment

Field pages should use a consistent but lightweight structure:

```text
# Field Name

## Present configuration
What is salient here now?

## Anchors
What should not be casually overwritten?

## Tensions
What does not yet reconcile cleanly?

## Evidence
Which specimens, receipts, or canonical sources support this field?

## Nearby fields
Which transitions are presently visible from here?

## Frontier
What remains fogged, contested, or unexplored?
```

Traversal pages/blocks should use:

```text
# Source → Destination
Type: resonance | derivation | tension | portal

## From
What field configuration did we leave?

## Why this route appeared
What made the transition reachable?

## Illumination
What became visible through traversal?

## Evidence
What supports the transition?

## Residual fog
What remains unresolved?
```

## GitBook-native presentation

Use GitBook features only where they clarify the map:

- `SUMMARY.md` for intentional navigation
- cards for nearby-field / system portals
- hints for visibility states and canonical-source warnings
- Mermaid for compact field/traversal diagrams
- expandable details for deep provenance that would otherwise clutter the route
- reusable includes for the "projection, not authority" notice

Do not decorate every page merely because GitBook supports rich blocks.

## Data flow and authority

1. A durable idea lands in GitHub through the existing review workflow.
2. Git Sync projects the accepted Markdown into GitBook.
3. GitBook readers traverse a reader-oriented information architecture.
4. GitBook UI edits, if enabled, must flow back through Git commits/change review rather than becoming hidden authority.
5. Any implementation-specific claim links to its owning repository.
6. Any law or portable pattern links to its notebook source.
7. Any evidentiary claim should link to a specimen, receipt, or other supporting artifact where available.

## Failure modes to watch

### Navigation becomes taxonomy

Failure: we merely rename folders as fields.

Countermeasure: every field page must expose tensions, nearby routes, and frontier, not only list documents.

### Hyperlinks become fake semantics

Failure: every cross-link is called a traversal.

Countermeasure: reserve typed traversals for transitions that actually reveal a relation, contradiction, derivation, or reconstructive portal.

### GitBook becomes authority

Failure: published prose drifts from source and readers cannot tell what is canonical.

Countermeasure: canonical-source links and the projection law appear throughout the guide; implementation truth remains project-owned.

### The map pretends completeness

Failure: absent links are interpreted as proof that no relation exists.

Countermeasure: preserve fog/frontier explicitly and timestamp or contextualize field snapshots when needed.

### Multi-space fragmentation too early

Failure: each project becomes its own isolated documentation island.

Countermeasure: one-space atlas first; split only after actual navigation evidence shows distinct audiences or versioning needs.

## Validation

This is a documentation/information-architecture experiment. Validation is observational.

The first specimen earns continuation if:

1. a reader can move from a field to another and explain why the route exists
2. canonical source remains obvious
3. unresolved territory remains visible rather than flattened
4. the same project can appear meaningfully in multiple fields without duplication becoming confusing
5. the navigation reveals at least one relation or tension that was less obvious in the repository tree
6. GitHub remains usable without GitBook
7. GitBook remains rebuildable from GitHub

## Implementation boundary after approval

The smallest implementation should be:

1. add GitBook-ready `SUMMARY.md`
2. add only the minimum new landing/field pages needed to support the structure
3. add a reusable projection/authority notice
4. include the bee → distributed signal → TranchNode traversal specimen
5. create one GitBook organization/site/space only after confirming the target organization container
6. wire Git Sync in the GitBook UI (the one unavoidable manual step)
7. publish only after previewing the rendered structure

Do not migrate project documentation, duplicate repositories, or build custom software in this first vertical.

## Open observation

The central question is not whether GitBook can host our docs.

It is whether a reader-oriented projection of fields and traversals causes **new structure to become visible through use**.

If that happens, the guide itself becomes a specimen of traversal-based memory rather than merely a publishing surface.
