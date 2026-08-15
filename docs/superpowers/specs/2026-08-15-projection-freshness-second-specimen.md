# Projection Freshness Witness — Second Specimen and Graduation Design

**Status:** approved design

**Issue:** #10

## Question

Can the temporal law discovered in the stale jublEchat GitBook checkpoint survive a materially different projection surface without importing GitBook-specific semantics?

The second specimen is the Haunted Toaster browser witness deployed through Vercel. It is generated from production renderer assets, embeds the generating Git commit, and remains explicitly non-authoritative for production rendering.

## Existing law from specimen one

A projection may remain truthful about an earlier observation while becoming stale about current canonical state.

> **A witness can age without becoming a lie. Make the age visible.**

The jublEchat checkpoint proves that `truth of earlier observation`, `current freshness`, and `canonical authority` are distinct.

## New falsifier exposed by specimen two

Vercel can host several simultaneous preview deployments for different branches and pull requests. Therefore comparing a projection to the newest deployment or newest repository commit is not a valid freshness test.

At the observed cut:

- Haunted Toaster `main` remains alpha.8 at `a0dfa4f45c79d1e4b7d54805943e36c0d86321b2`;
- PR #131 declares source scope `pull_request:131 / branch:agent/alpha9-recovery` and current head `fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`;
- the relevant Vercel browser-witness deployment is READY from that exact PR #131 head;
- a newer unrelated Vercel deployment exists for PR #134 / `fix/magnetic-crop-invariant`.

Thus the PR #131 projection is **fresh within its declared PR/branch scope** even though it is neither the newest deployment overall nor authoritative for `main` or the released appliance.

This makes **source scope** load-bearing.

## Minimum portable witness

Do not freeze a universal serialized schema. The minimum reader-visible convention is:

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

`reason` may be included when the disposition is not obvious.

## Laws

1. **Freshness is scoped.** A projection is never simply "fresh"; it is fresh relative to a declared canonical source scope.
2. **Freshness is not authority.** Matching the current source cut does not let the projection mutate, release, merge, or canonize anything.
3. **Stale is not false history.** Earlier accurate observations remain historical witnesses.
4. **Unverified is valid.** Unknown comparison state must not collapse to fresh.
5. **Exact cuts beat timestamps.** When a commit, release, PR head, or equivalent cut is cheaply available, use it.
6. **Newer elsewhere is irrelevant.** Activity outside the declared source scope cannot make a projection fresh or stale.
7. **The source decides current state.** Projection metadata cannot overrule the project authority named by the scope.
8. **No hidden polling.** Explicit traversal-time comparison is sufficient for v0.
9. **No universal clock.** `checked at` records when the comparison happened, not when truth became valid.
10. **Non-authority remains visible.** Especially for generated/browser surfaces, freshness must not masquerade as executable or release authority.

## Specimen matrix

### Specimen A — jublEchat GitBook checkpoint

- Projection: `jublechat-witness-parity-checkpoint.md` / published GitBook page.
- Canonical source: jublEchat GitHub PR #2 + main.
- Source scope: PR #2 / prerequisite witness-parity repair.
- Witnessed cut: earlier draft/open state (exact earlier head may be unrecoverable from the page itself).
- Compared cut: PR #2 merged at final head `2cfa7e0f925f5cead3aaeed6683bb831d1b062ba`, merge commit `1d0e04691b13d9bc34ce89b08030bcd0a964f055`.
- Disposition: `stale`.
- Non-authority: GitBook/checkpoint does not decide PR or repository state.

### Specimen B — Haunted Toaster browser/Vercel witness

- Projection: Vercel browser witness generated from Toaster renderer assets.
- Canonical source: Haunted Toaster GitHub PR #131 for this preview scope.
- Source scope: PR #131 / `agent/alpha9-recovery`.
- Witnessed cut: deployment commit `fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`.
- Compared cut: current PR #131 head `fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`.
- Disposition: `fresh` for PR #131 scope.
- Non-authority: it is not a claim about `main`, release state, packaged human witness, or renderer authority.
- Negative control: newer PR #134 Vercel deployments do not stale PR #131 because they are outside its declared scope.

## Graduation decision

If both specimens remain truthful under the minimum convention above, Projection Freshness Witness has crossed the issue #10 graduation gate: one documentation projection and one generated browser/deployment projection reproduce the same distinction, while the second specimen adds the necessary `source scope` constraint.

Graduation means a **portable documentation pattern**, not a shared runtime, package, registry, database, watcher, or protocol.

## Non-goals

- background freshness polling;
- automatic truth determination;
- a central freshness service;
- treating the latest deployment as universal current state;
- making GitBook or Vercel authoritative;
- requiring freshness metadata on timeless conceptual pages;
- changing Haunted Toaster renderer or release behavior;
- resolving PR #131's independent packaged-human test gate.

## Failure conditions

Do not graduate if:

- the convention cannot distinguish PR/branch scope from main/release scope;
- newest unrelated activity changes disposition;
- a fresh witness gains authority by implication;
- stale history must be deleted to become legible;
- the two specimens require incompatible meanings of `fresh | stale | unverified`.
