---
description: >-
  Landed evidence for National Treasure Witness Sigil v0.1 and the Cicada
  Overfit Corpus.
---

# Cicada Adversarial Witness — Landed Checkpoint

Date: 2026-08-19\
Status: **landed evidence projection; GitHub project history remains executable authority**

This page is a bounded GitBook projection of work now landed in `the-static-collective/national-treasure`. GitBook records the checkpoint for traversal and re-entry; the repository and its commit history remain authoritative for executable state.

## Landed source state

* Design PR #6 — `Design Cicada adversarial witness slice` — **merged by squash**.
* Design landing commit: `6317916686f5ed812439b782296359dfc9453f40`.
* Implementation PR #7 — `Implement Cicada adversarial witness slice` — **merged by squash**.
* Authorized implementation head before squash: `c179691e5cd8fbd69b4c1f275c09f8866b149092`.
* Implementation landing commit: `97d9a3d215ad1d6c80d0934d03b324bdf1d36993`.
* Effective implementation diff at landing: 31 intended files, 0 commits behind `main`.

## Proof 1 — Witness Sigil v0.1

National Treasure now carries the dependency-free reference implementation of `witness-sigil/v0.1`.

```
canonical lowercase SHA-256 digest
        ↓
deterministic primitive + rotation projection
        ↓
recipe JSON + SVG recognition surface
```

The landed contract includes five frozen golden recipe/SVG vectors and an idempotent CLI that refuses differing existing output bytes.

A Witness Sigil remains a **recognition cue only**. It does not authenticate a publisher or artifact, verify a signature, establish provenance, grant capability, or create authority. The full canonical digest and the owning system's authority rules remain separate.

## Proof 2 — Cicada Overfit Corpus v0.1

The second proof is a twelve-family adversarial epistemic corpus. It pressures chronological impossibility, shared precursors, retrospective naming, documented influence versus resemblance, numerological coincidence, re-encoding, community rumor, red herrings, partial-truth chains, identity/authenticity confusion, source collapse, and mystery-to-authority escalation.

The validator reuses the complete existing 15-relation palimpsest grammar. At least half the corpus mixes supported classifications with durable `UNKNOWN` / `REFUSED_ANCESTRY` edges, so neither blanket belief nor blanket skepticism satisfies the fixture law.

## Verification witness

Fresh verification after the final implementation mutation:

```
node --test tools/witness-sigil/render.test.mjs cases/cicada-overfit/validate.test.mjs
```

Result:

```
28 tests
28 pass
0 fail
```

Additional verified gates:

* 17 JSON artifacts parsed successfully;
* 5 SVG golden vectors parsed successfully;
* golden SVG/recipe bytes matched fresh renderer output in tests;
* every SVG carries the referenced `title` and `desc` accessibility IDs;
* no package manifest, lockfile, or third-party runtime dependency was introduced under either proof surface.

The final ancestry-normalization commit changed Git history only; it reused the already-tested implementation tree byte-for-byte before the exact-head squash landing.

## Review correction that mattered

Finish-gate review found a real accessibility defect before landing: SVG roots declared `aria-labelledby="title desc"` while their `<title>` and `<desc>` nodes lacked those IDs.

The repair followed a real red/green cycle, regenerated all five golden SVGs, and returned the full suite to 28/28 passing before the landing gate.

## Three-surface boundary

```
MYSTERY SURFACE
  symbolic / strange / optional

VERIFICATION SURFACE
  canonical bytes / hashes / signatures / receipts / source locators

AUTHORITY SURFACE
  explicit admission law / constituted actor / bounded capability
```

The proofs are useful only while those surfaces remain distinct.

## What has not graduated

Landing these two National Treasure proofs does **not** promote Witness Sigils or the symbol language into shared eCODEsystem law.

Haunted Toaster has not yet independently reproduced the frozen Witness Sigil vectors. That remains the candidate second materially different domain. A successful independent reproduction may satisfy a graduation gate; it does not automatically cause promotion.

## Current gate

The National Treasure incubation proof is now constituted on `main`.

The next accountable experiment is downstream and separate: independently reproduce `witness-sigil/v0.1` in Haunted Toaster against the landed golden vectors, while keeping the sigil recognition-only and receipt/digest evidence authoritative.
