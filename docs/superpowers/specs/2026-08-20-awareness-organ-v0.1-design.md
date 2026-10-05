# Awareness Organ v0.1 — The Eye Has No Hands

**Status:** approved architectural design — 2026-08-20

## Context

The first Constituted World Atlas reconstructed the Static Collective across 59 visible repositories, GitBook, open and closed-unmerged pull requests, issues, project status manifests, and exact repository heads. Its central architectural finding was not a new platform: it found a federation of locally constituted worlds connected by non-authoritative witness membranes.

The same audit exposed a concrete missing capability. Several project-owned status manifests were stale, GitBook was fresher than some sources while stale about others, and current project state could only be reconstructed through another deliberate traversal. The ecosystem already has **Projection Freshness Witness**, but does not yet apply that law to its own whole-world awareness.

This design names the next organ **Awareness**.

> **Awareness senses the relationship between a witness and its declared source. It does not govern the source.**

The working nickname is **The Eye Has No Hands**.

## Goal

Create the smallest ecosystem-level capability that can truthfully answer questions such as:

- Which declared projections are fresh, stale, or unverified against their named source scope?
- Which observed surfaces are landed, candidate, projected, witnessed, human-gated, or fog at a dated cut?
- Which source cuts were actually compared?
- Which important human gates currently require attention?
- Where do GitBook/project-status projections drift from project-owned canonical state?

The output is a **dated witness**, not a live authority plane.

## Constitutional invariant

> **Possibility may be visible. Testimony may travel. Authority stays local. Consequence is recorded. Re-entry remains attributable. Awareness may observe all of those relationships without acquiring any of their authority.**

## Relationship to existing laws

### Projection Is Witness

Establishes that a reader-visible projection may improve visibility without becoming canonical.

### Projection Freshness Witness

Establishes that a projection making current-state claims should name its canonical source scope, witnessed cut, compared cut, disposition, observation time, and non-authority.

Awareness is **not a replacement** for either pattern. It is a bounded organ that composes them across a declared ecosystem slice.

### Human Witness Relay

The relay transports attributable human observation to project-local adapters. Awareness may expose that a human gate exists or that a relay event has or has not been observed. It cannot manufacture the human observation, admit the event for the destination project, or close the gate.

## Architecture

```text
project-owned canonical sources
        +
reader-visible projections
        +
human-gate declarations / witnessed events
        ↓
scoped comparison
        ↓
awareness dispositions
        ↓
dated World Cut
        ↓
human / agent attention
```

There is deliberately no arrow from Awareness back into project state.

## Awareness dispositions

Awareness v0.1 should preserve existing evidence language rather than minting a new ontology. At minimum it must be able to report:

- `fresh` — a projection's witnessed source cut matches the compared cut within its declared scope;
- `stale` — the projection remains truthful history but the named source scope has advanced;
- `unverified` — no trustworthy current comparison was performed;
- `landed` — evidence is present on the project default branch at the World Cut;
- `candidate` — evidence is present only on an open PR or non-default branch;
- `projected` — prose/design/issue intent without corresponding landed execution;
- `witnessed` — bound to a real human or field encounter; orthogonal to landedness;
- `human-gated` — a project-defined crossing currently requires human judgment/action;
- `fog` — evidence is incomplete, conflicting, private, stale beyond safe interpretation, or otherwise insufficient for a stronger claim.

These are observations at a cut, not globally canonical state labels. Projects remain free to use their own local vocabulary.

## World Cut

A **World Cut** is the primary durable output of Awareness.

A World Cut SHOULD record:

1. observation/evidence cut time;
2. observer identity or method;
3. declared source scope;
4. exact source cuts where cheaply available;
5. awareness dispositions and supporting evidence;
6. unresolved fog and known blind spots;
7. human-held gates observed at the cut;
8. explicit non-authority;
9. integrity data for the preserved witness.

World Cuts are immutable. Later observations create later cuts.

## Founding specimen — World Cut 001

The returned `Constituted World Atlas — August 2026` is the founding specimen. It is preserved byte-for-byte under `evidence/world-cuts/2026-08-20-constituted-world-atlas.md`.

Integrity:

```text
bytes   59724
sha256  8c7a96cc3eee004a3fb56691e0b11c5577c77efee44642c9772abe95151e707d
gitblob 421b1d9614c5571da4c8b69d6b8f39430baa3363
```

Its findings include:

- the larger **Constitutional Encounter Loop** beyond the earlier Continuity Triangle;
- Continuity Witness and the proven core of Refusal Topology crossing promotion thresholds;
- proposal ≠ authority appearing as constitutional law in practice;
- Projection Freshness being mature enough for ecosystem application;
- several stale project-status projections and GitBook drift;
- the Human Witness Relay being constituted but not yet live-witnessed;
- the Toaster frontier requiring semantic reconciliation rather than sequential merging of green ancestry;
- the extraction rule: **extract the repeated question or conformance corpus before extracting the answer**.

These are findings of World Cut 001, not permanent truths of later cuts.

## v0.1 executable expression

The first implementation SHOULD be a **one-shot, read-only Ecosystem World Cut generator**.

It may:

- enumerate a declared canonical repository set;
- read exact default-branch heads;
- read declared `PROJECT_STATUS` witnessed cuts where present;
- read a bounded set of GitBook/current-state projections;
- record known human gates from declared project surfaces;
- compare exact cuts where possible;
- emit a dated machine-readable witness plus a human-readable projection;
- hash the outputs.

It must not:

- run as a daemon by default;
- silently poll continuously;
- mutate any repository or projection;
- auto-refresh `PROJECT_STATUS`;
- close, merge, release, or promote;
- infer `fresh` when comparison fails;
- treat the newest activity anywhere as current for every source scope;
- become a global current-state database;
- outrank any project-owned canonical source.

## Observer neutrality

Awareness is an architectural role, not one model or vendor. A World Cut may be produced by:

- a deterministic local auditor;
- a bounded human traversal;
- a high-effort Work audit;
- another future observer that preserves the same evidence and non-authority boundaries.

No observer becomes canonical merely because it can see many sources.

## Work as observatory

World Cut 001 is also a proving specimen for a practical routing lesson: whole-world, long-context reasoning is most valuable when the hard task is **integration and adjudication across already-existing local evidence**, not ordinary implementation.

This is an operational observation, not a model requirement or constitutional dependency. Product names, credit systems, and available reasoning levels may change. The durable lesson is:

> **Use expensive whole-context reasoning when the world-map itself is the hard problem; return bounded implementation to ordinary execution lanes.**

The current conversational compression—“Chat discovers; Deep Research excavates; Codex builds; Work integrates worlds”—may be useful operator shorthand, but is intentionally non-normative.

## Failure modes

Awareness v0.1 fails if it:

- becomes the place projects must ask what their own current state is;
- turns staleness into automatic correction;
- confuses visibility with authority;
- deletes stale history rather than dating it;
- hides failed or partial comparisons;
- centralizes local admission or human consent;
- assumes recurrence means a primitive deserves promotion;
- edits old World Cuts to keep them looking current.

## Promotion gates

Do not graduate Awareness from the incubator until at least:

1. World Cut 001 is preserved with verified integrity;
2. one deterministic one-shot auditor produces a later World Cut from declared source scopes;
3. a later cut correctly identifies at least one fresh and one stale or unverified projection without mutating either;
4. at least one human-held gate is exposed without being closed or dispositioned by Awareness;
5. comparison of two World Cuts demonstrates that historical witness can remain inspectable while currentness changes;
6. a hostile test proves that missing comparison cannot collapse to `fresh`;
7. a hostile test proves that newer activity outside a declared source scope cannot stale an otherwise matching projection.

## Non-goals

Awareness v0.1 does not create:

- a global ontology;
- a universal event bus;
- a master narrator;
- a central authority service;
- a daemon or continuously correct dashboard;
- an automatic documentation fixer;
- a cross-project merge/release controller;
- a model/vendor dependency.

## Governing compression

> **The world may be locally governed and still become globally observable. The eye may know where the map is stale without acquiring hands to redraw the territory.**
