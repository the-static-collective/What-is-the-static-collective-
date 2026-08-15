# Projection Freshness Witness

**Status:** Portable pattern — graduated from two materially different projection specimens on 2026-08-15.

## Law

> **A witness can age without becoming a lie. Make the age visible.**

A reader-visible projection may truthfully describe a source state it once witnessed while no longer describing the current state of that source. Freshness is therefore distinct from truth, provenance, and authority.

The portable refinement is:

> **Freshness is always relative to a declared source scope.**

A projection is not simply `fresh`. It is fresh, stale, or unverified **against a named canonical source scope and cut**.

## Minimum convention

A current-state projection should make these distinctions visible when they matter:

```text
Projection: <reader-visible witness>
Canonical source: <project-owned authority>
Source scope: <main | release | pull request | branch | other declared cut>
Witnessed source cut: <exact ref/state when available>
Compared source cut: <exact current ref/state when checked>
Disposition: fresh | stale | unverified
Checked at: <observation time, not truth time>
Non-authority: <what this projection cannot decide>
```

This is a documentation pattern, **not a frozen universal serialization schema**. A project may express these fields as prose, a metadata block, a receipt field, or another local representation so long as the distinctions remain mechanically or reader-visibly legible.

## Dispositions

### `fresh`

The projection's witnessed source cut matches the current cut **within the declared source scope** at the time of comparison.

Freshness grants no mutation, merge, release, execution, or canonical authority.

### `stale`

The projection truthfully witnessed an earlier cut, but the canonical source has advanced within that same declared scope.

Stale does not mean fabricated. Preserve useful historical witness rather than silently rewriting it away.

### `unverified`

No trustworthy current comparison has been performed, or the exact source scope/cut needed for comparison is unavailable.

Unknown must not collapse to fresh.

## Why source scope is load-bearing

The second proving specimen exposed a failure that a simple commit badge cannot solve.

Haunted Toaster had multiple simultaneous Vercel preview deployments. The browser witness for PR #131 was generated from commit:

`fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`

Canonical GitHub PR #131 still named that exact SHA as its current head. Therefore the browser projection was **fresh for source scope `PR #131 / agent/alpha9-recovery`**.

At the same time, a newer Vercel deployment existed for unrelated PR #134 / `fix/magnetic-crop-invariant`.

That newer activity did **not** make PR #131's witness stale, because it occurred outside PR #131's declared source scope. Nor did PR #131's fresh preview become evidence that Haunted Toaster `main`, the released appliance, or the packaged-human test gate had advanced.

So:

```text
newest deployment overall
        ≠
current cut for this projection's source scope
```

## Proving specimens

### 1. jublEchat GitBook checkpoint — stale

A GitBook-synced checkpoint described jublEchat PR #2 while its persistence boundary was still open and the PR remained draft/open. Canonical GitHub later merged PR #2 at final head:

`2cfa7e0f925f5cead3aaeed6683bb831d1b062ba`

The old checkpoint remained truthful history but became stale as a current-state projection. Adding an explicit freshness block made the earlier witness, current comparison, and authority boundary simultaneously legible.

### 2. Haunted Toaster browser/Vercel witness — fresh in PR scope

The Toaster browser witness is generated from production renderer assets and embeds its generating Git commit. Vercel independently records the deployment's branch, PR, and Git SHA.

The PR #131 deployment and current PR #131 head matched exactly, while a newer unrelated branch deployment existed. The pattern therefore survived a materially different generated browser/deployment surface and gained the necessary **source scope** constraint.

## Core laws

1. **Freshness is scoped.** Name the canonical source scope before declaring a disposition.
2. **Freshness is not authority.** A matching current cut never grants the projection source authority.
3. **Stale is not false history.** Preserve earlier truthful witness where useful.
4. **Unverified is valid.** Absence of comparison is not freshness.
5. **Exact cuts beat timestamps.** Prefer commit, PR head, release, event cut, or equivalent identity when cheaply available.
6. **Newer elsewhere is irrelevant.** Activity outside the declared scope cannot freshen or stale the projection.
7. **The canonical source decides current state.** Projection metadata cannot overrule it.
8. **No hidden polling is required.** Explicit traversal-time comparison is sufficient unless a project independently proves a need for automation.
9. **No universal clock claim.** `checked at` records the observation time, not when truth itself became valid.
10. **Non-authority should be visible where confusion is plausible.** Polished or executable-looking projections particularly need this boundary.

## When to use it

Use Projection Freshness Witness where a projection makes a claim about **current** project, PR, branch, release, deployment, generated dashboard, or implementation state.

Evergreen conceptual pages generally do not need commit badges merely because this pattern exists.

## Negative controls

A freshness design is suspect if it:

- marks the newest deployment globally as current for every branch;
- treats a fresh preview as authority to merge, release, or mutate;
- deletes stale history rather than identifying its witnessed cut;
- reports `fresh` when no current comparison was performed;
- uses only a timestamp when an exact source-state identifier is available;
- silently switches source scope between checks;
- requires a central database, watcher, or registry before one projection can be temporally honest.

## Relationship to Projection Is Witness

**Projection Is Witness** establishes the authority distinction: a projection can improve visibility without becoming canonical.

**Projection Freshness Witness** adds the temporal distinction: a non-authoritative projection should make clear which source state and scope it witnessed when it makes current-state claims.

They compose, but they are not the same law.

## What graduation does not authorize

Graduation does **not** authorize:

- a shared `@static/freshness` package;
- a universal runtime protocol;
- a global polling service;
- a central freshness database or authority plane;
- automatic truth determination;
- mandatory freshness metadata on every Collective artifact.

The pattern has graduated because the invariant traveled. Infrastructure has not.
