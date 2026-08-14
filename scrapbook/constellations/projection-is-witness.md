# Projection Is Witness

**Status:** Constellation / exploratory

## Ingredients

* GitHub as the canonical repository history for the Static Collective notebook.
* GitBook as a Git-synced published projection of that repository.
* Witness: something that records, attests to, or preserves evidence without necessarily possessing authority.
* Authority: the right to make a state-changing decision count as canonical within a defined scope.

## Resonances

The current GitHub → GitBook relationship behaves like a concrete witness/authority separation:

```
GitHub
canonical artifact + provenance
        ↓ projection
GitBook
orientation + visibility + traversal
```

GitBook can make a relationship easier to see without becoming the thing that makes the underlying claim true.

A projection can therefore be epistemically useful while remaining subordinate to its source.

## Tensions

A published projection can look more polished, legible, and authoritative than the source that generated it. Presentation authority can be mistaken for canonical authority.

Bidirectional editing makes the distinction more subtle: a GitBook edit can legitimately flow back into Git, but only because the Git workflow records and accepts the mutation. The rendered page itself is not the authority mechanism.

## Field failure: a witness can age

On August 14, 2026, ecosystem traversal exposed a concrete temporal failure in this projection model.

The GitBook page **jublEchat — Witness Parity Checkpoint** still described PR #2 as draft/open with the production persistence boundary unresolved. Canonical GitHub had already advanced: `the-static-collective/jublEchat#2` was merged at head `2cfa7e0f925f5cead3aaeed6683bb831d1b062ba`, merge commit `1d0e04691b13d9bc34ce89b08030bcd0a964f055`.

The older checkpoint is not fabricated history. It is a once-useful witness whose **witnessed source state is not obvious to the reader**.

That adds a temporal distinction:

```
truth of earlier observation
        ≠
current freshness of projection
        ≠
canonical authority
```

Candidate primitive: **Projection Freshness Witness** — a small statement of which canonical source state a projection last witnessed and whether a current comparison marks it `fresh`, `stale`, or `unverified`.

Current implementation issue: https://github.com/the-static-collective/What-is-the-static-collective-/issues/10

Working law:

> **A witness can age without becoming a lie. Make the age visible.**

Do not infer a global sync engine from this specimen. First prove the distinction on a small number of current-state checkpoints.

## Possible traversal

```
canonical source
    --projection-->
reader-visible surface
    --illumination-->
newly noticed relation
    --proposal-->
source change
```

This closes a loop without collapsing the roles.

Traversal can also reveal that the projection itself has become stale:

```
projection
    --compare to canonical source-->
fresh | stale | unverified
```

That freshness result is witness evidence. It does not transfer authority to the projection or to the process that performed the comparison.

## Illumination

The GitBook experiment is not merely documentation about witness and authority. The publishing architecture itself may be a specimen of that distinction.

That suggests a broader question:

> Can projections be designed explicitly as witnesses—optimized for visibility, orientation, reconstruction, and temporal honesty—without inheriting the authority of their substrates?

## Residual fog

* When a projection rearranges source material into a new sequence, how much interpretive responsibility does it acquire?
* At what point does synthesis become a new authored artifact rather than a projection?
* How should a reader see the boundary between canonical source, generated projection, and exploratory arrangement?
* Which projection classes need an explicit freshness witness, and which evergreen conceptual pages do not?
* When a stale projection is historically useful, should it be updated in place, superseded by a descendant, or retained with an explicit temporal marker?

## Promotion routes

If this distinction remains useful across GitBook, renderers, timeline projections, dashboards, and other systems, it may deserve a portable pattern for **non-authoritative projections**.

Projection Freshness Witness should graduate separately only after a materially different projection surface demonstrates the same temporal failure mode.

For now, GitHub/GitBook is the proof-shaped example, not proof of universality.
