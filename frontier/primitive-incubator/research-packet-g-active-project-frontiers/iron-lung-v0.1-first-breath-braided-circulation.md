# Iron Lung v0.1 — First Breath / Braided Circulation

> **Status:** first executable Iron Lung specimen landed; project-backed hypothesis retained.
>
> **Canonical implementation authority:** `the-static-collective/iron-lung`, issue #1 and landed PR #2.

Iron Lung v0.1 is a local boundary-and-transformation instrument whose first executable specimen is **its own birth**. It records how an incomplete project-birth braid can circulate, discover bounded repair capabilities, ascend a proposal-only Continuity Spine fork, receive an explicit present selection, produce an immutable descendant, and become structurally assimilable without allowing metaphor, future preference, or interpretation to impersonate evidence or authority.

## Core invariant — always three strands

Every braid carries exactly three distinct strands:

1. **Substance** — what crossed.
2. **Lineage** — what it remains continuous with.
3. **Authority** — what movement or change was permitted and witnessed.

The three-strand shape is itself invariant. `none`, `unknown`, `refused`, `strained`, and `broken` are represented explicitly rather than by silently dropping a strand.

This keeps three questions separate during movement:

```
What crossed?
What is it continuous with?
By what authority may it move or change?
```

A braid may be damaged and still be circulable. Damage remains visible state.

## Circulation is not assimilation

Iron Lung preserves three distinct boundaries:

```
transport != admission != assimilation
```

A strained, broken, unknown, or refused braid can still reach the relevant repair surface. The vascular layer discovers admitted capability matches; it does not perform repair and it does not choose among multiple lawful routes.

That gives the local rule:

> **The vascular system may route toward repair; it may not manufacture repair.**

## Capability-based repair manifold

Organs advertise bounded repair capabilities. A capability is not routable merely because it exists; its capability ID must be separately admitted.

Given one braid state, circulation returns the full bounded set of currently admitted matching routes:

```
braid -> admitted capability discovery -> no route | one route | multiple routes
```

There is no central repair brain in v0.1. When there are multiple lawful routes, the complete choice-set ascends rather than being silently collapsed.

## Continuity Spine boundary

A multi-route fork becomes **proposal space** and is sent up the Continuity Spine.

The Spine may:

* see the full offered route set;
* rank every offered route;
* annotate why one path better preserves continuity, invariants, or the proposed attractor.

The Spine may **not**:

* select a route;
* grant authority;
* convert a proposed future into present evidence.

The executable boundary returns `proposal_only` even when ranking is structurally valid.

> **Future constrains proposal, never evidence.**

A separate present-route selection object carries the chosen route, present authority reference, and witness references. Rank 1 never selects itself.

## Repair creates descendants

Repair does not rewrite the damaged braid. A successful bounded repair emits a new braid whose `parentId` points to the ancestor.

For the birth specimen:

```
braid:iron-lung:birth:0
  substance: intact
  lineage: broken
  authority: intact

        |
        | selected lineage repair
        v

braid:iron-lung:birth:1
  parentId: braid:iron-lung:birth:0
  substance: intact
  lineage: intact
  authority: intact
```

Lineage repair must preserve every known prior lineage reference. Authority changes require an explicit authority-change reference carried by the resulting authority strand. Malformed repair results fail as domain findings rather than escaping through an exception.

After repair, circulation is recomputed from the descendant state rather than inherited from the ancestor.

## Own-birth first breath

The pinned first-breath fixture begins with:

* intact substance referencing the Iron Lung repository and issue #1;
* broken lineage referencing the originating conversation and the Continuity Spine projection;
* intact human design-approval authority;
* two separately admitted lineage-repair capabilities;
* a proposal-only Spine ranking of those two routes;
* explicit present selection of the project-backed lineage route;
* a witnessed repair observation that preserves prior lineage and adds project-backed references;
* an assimilation policy requiring intact substance, lineage, and authority plus the implementation and repair witnesses;
* a separate pneuma annotation whose status is always `interpretive`.

The resulting receipt records:

```
initial circulation: multiple_routes
Spine status:        proposal_only
selected route:      project-backed lineage repair
descendant:          braid:iron-lung:birth:1
descendant flow:     no_route
assimilation:        assimilable
pneuma:              interpretive
```

## Executable proof

PR #2 was reviewed at exact feature head:

`5cf3aa09602ddfe03bc10ce3424f9bc5a51a6a86`

GitHub Actions run #22 proved:

* TypeScript compile/check succeeded;
* **23 tests passed, 0 failed**;
* the first-breath CLI replay ran twice;
* the two receipts were byte-identical under `cmp`.

The exact-head boundary pass also caught one real defect before landing: malformed repair input could reach lineage semantics before structural validation and throw a `TypeError`. A regression test made that failure explicit; the repair path was tightened so the result strand is normalized through braid validation before lineage or authority semantics are evaluated. The final exact-head run is green.

PR #2 was squash-merged into `main` as:

`5ff1f30f077ba3c1b23393706e4d15e974acd98f`

Issue #1 is closed as completed.

## Pneuma boundary

Iron Lung keeps a second, explicitly interpretive layer for the originating breath/spirit hypothesis:

> Breath/spirit is an interpretive hypothesis about received possibility; no literal field depends on it.

Pneuma may preserve hypotheses and questions. It cannot be submitted as evidence, witness, route selection, authority, thermodynamic measurement, or assimilation input. The literal evaluators do not import the pneuma module, and the pneuma module does not import the literal evaluators.

So the project can ask spiritually interesting questions without pretending it measured an answer.

## Relationship to Continuity Spine

```
Continuity Spine: how the self may become through time
Iron Lung:       what crosses the membrane while becoming is possible
```

Ascending flow reports what actually happened and updates the self-model. Descending flow contains prospective constraints and preferences. The two remain distinct.

## Authority boundary

GitBook is a bounded project-backed projection, not implementation authority. The canonical executable definitions remain in Iron Lung.

This specimen does **not** establish:

* a universal vascular schema;
* cross-repository circulation authority;
* autonomous repair or selection;
* a generic service mesh;
* a thermodynamic simulator;
* proof or disproof of Spirit;
* theology as measurement.

It also does **not** promote **Braided Transfer** or **Repair Manifold** to a shared Pattern. A second materially different system must reproduce the deeper invariant locally before any cross-project law is claimed.

## Residual frontier

The next useful questions remain intentionally open:

* Can a materially different project reproduce the three-strand transfer invariant locally?
* What is the smallest capability-registration witness another organ actually needs?
* How should multi-organ sequential repair preserve route history without becoming a workflow engine?
* Can a temporal/vascular visualization expose strain and branching without acquiring authority?
* What becomes the minimum local analogue of pressure, replenishment, or capacity without smuggling thermodynamic claims into metaphor?

**First breath landed. Three strands intact. Future visible; selection still belongs to the present.**
