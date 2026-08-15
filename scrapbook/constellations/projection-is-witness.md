# Projection Is Witness

**Status:** Constellation / exploratory. Temporal companion **Projection Freshness Witness** graduated as a portable pattern on 2026-08-15 after a second materially different proving specimen.

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

The older checkpoint is not fabricated history. It is a once-useful witness whose **witnessed source state was not obvious to the reader**.

That adds a temporal distinction:

```
truth of earlier observation
        ≠
current freshness of projection
        ≠
canonical authority
```

Working law:

> **A witness can age without becoming a lie. Make the age visible.**

The jublEchat checkpoint now carries an explicit `STALE` freshness block while retaining its earlier observation rather than rewriting history.

## Second specimen: browser witness across simultaneous branches

On August 15, 2026, the same distinction was tested against a materially different surface: the **Haunted Toaster browser witness deployed through Vercel**.

The browser witness generator embeds the exact Git commit used to generate the projection. Haunted Toaster PR #131 named current head:

`fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`

The relevant READY Vercel deployment for PR #131 recorded that same SHA and branch `agent/alpha9-recovery`.

At the same time, a newer READY Vercel deployment existed for unrelated PR #134 / `fix/magnetic-crop-invariant`.

That negative control exposed the missing constraint: **freshness is relative to a declared source scope**.

The PR #131 browser witness is fresh for scope `PR #131 / agent/alpha9-recovery`; the newer PR #134 deployment is irrelevant to that comparison. The fresh preview also does not become a claim that Haunted Toaster `main`, the released appliance, or PR #131's packaged-human field gate has advanced.

Therefore:

```
newest thing visible
        ≠
current cut for this projection's declared source scope
```

## Graduation

The temporal distinction now reproduces across:

1. a Git-synced documentation projection that became stale; and
2. a generated browser/deployment projection that remains fresh inside one PR/branch scope while newer unrelated deployments exist.

That is enough to graduate **Projection Freshness Witness** as a portable documentation pattern without promoting a runtime, package, watcher, database, or central authority plane.

See [`Projection Freshness Witness`](../../patterns/projection-freshness-witness.md).

The portable refinement is:

> **A projection making a current-state claim should say not only what it witnessed, but which canonical source scope and cut it witnessed.**

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

Traversal can also reveal temporal drift:

```
projection + declared source scope
    --compare to canonical source cut-->
fresh | stale | unverified
```

That freshness result is witness evidence. It does not transfer authority to the projection or to the process that performed the comparison.

## Illumination

The GitBook experiment is not merely documentation about witness and authority. The publishing architecture itself is a specimen of that distinction.

The Toaster specimen shows the law is not confined to documentation. A generated preview can also be epistemically useful, temporally scoped, and non-authoritative at the same time.

That sharpens the broader question:

> Can projections be designed explicitly as witnesses—optimized for visibility, orientation, reconstruction, and temporal honesty—without inheriting the authority of their substrates?

## Residual fog

* When a projection rearranges source material into a new sequence, how much interpretive responsibility does it acquire?
* At what point does synthesis become a new authored artifact rather than a projection?
* How should a reader see the boundary between canonical source, generated projection, and exploratory arrangement?
* Which projection classes need an explicit freshness witness, and which evergreen conceptual pages do not?
* When a stale projection is historically useful, when should it be updated in place, superseded by a descendant, or retained with an explicit temporal marker?
* Which source scopes beyond branch, PR, main, and release require project-local vocabulary rather than shared terminology?

## Boundary

Projection Freshness Witness has graduated because the **invariant traveled**. That does not justify a universal synchronization engine or mandatory commit badge on every projection.

Projection Is Witness remains the broader exploratory constellation. Its temporal child is now a portable pattern; the rest of the projection/authority question remains open terrain.
