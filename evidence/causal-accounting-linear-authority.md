---
description: >-
  Project-backed Corpus OS evidence for linear authority consumption and causal
  reconciliation; repository implementation remains canonical.
---

# Causal Accounting / Linear Authority

**Status:** project-backed executable specimen — **landed** in Corpus OS through PR #21 on 2026-08-15.

**Canonical authority:** `the-static-collective/corpus-os`, issue #17, merged PR #21, repository tests, and adopted runtime boundaries.

This GitBook page is a non-authoritative Evidence witness. It no longer belongs in Primitive Incubator as an unborn primitive.

## Primitive

Executable authority behaves as a linear resource at the consequence boundary: it may be issued, inspected, and spent, but copying its representation does not reproduce authority.

Causal Accounting is the derived proof that every consequence-producing attempt presented to the boundary reconciles to exactly one attributable spent authority path, while every spent path retains an inspectable terminal disposition.

The key separation is:

```
spent authority != terminal history
```

`spent` says the warrant cannot be reused. It does **not** say whether the attempt was refused by Session, failed in the host, or completed.

## Landed specimen

Corpus OS PR #21 proves the bounded in-process reconciliation shape:

```
adopted declaration cut
        ↓
genuine issued Action Warrant
        ↓
resource state: unspent | spent
        ↓
terminal evidence when spent
        ↓
unspent | session-refused | host-failed | completed
        ↓
balanced history OR explicit anomaly
```

Terminal launch receipts carry a causal evidence binding copied from the already-consumed genuine warrant. That binding is evidence only; it does not become executable authority.

The landed anomaly vocabulary includes:

* `ORPHAN_EFFECT`
* `DOUBLE_SPEND`
* `SUBSTITUTED_CONSEQUENCE`
* `BROKEN_LINEAGE`
* `MISSING_DISPOSITION`

A rejected second spend is not itself a second consequence. Supplied evidence of two terminal consequences attributed to one genuine warrant becomes `DOUBLE_SPEND`.

## What remains invariant

* Copied warrant representation does not become causal authority.
* Resource consumption and terminal history remain separate facts.
* Reconciliation is a pure derived view.
* Anomalies remain visible rather than being repaired into apparent consistency.
* The vocabulary describes computational integrity only; it makes no legal-validity, fraud, financial-accounting, or jurisdiction-specific claim.
* No durable ledger, signing scheme, canonical JSON law, network authority, or token semantics are implied.

## Downstream evidence

The originally proposed handoff to Lawful Reachability is no longer merely future work: Corpus OS PR #22 subsequently landed the bounded `Lawful Reachability / Constituted Reality` projection downstream of Causal Accounting.

That later proof does not retroactively widen this specimen. It confirms that balanced causal history can be consumed by another owner-local derivation while preserving the original accounting boundary.

## Promotion receipt

```
origin: Primitive Incubator / Causal Accounting / Linear Authority
what survived: linear authority consumption + explicit terminal causal accounting
what failed or was discarded: none required for the bounded landed specimen
materially different specimens: one Corpus OS implementation so far
new home: Evidence
canonical authority: Corpus OS PR #21 / merge c4bfff2e837c74f1364fb2046ded40dc507ce8aa
residual fog: portability to a materially different second system remains unproved
```

**Disposition:** `PROJECT-BACKED -> EVIDENCE`, not yet a cross-project Pattern.

Canonical links:

* https://github.com/the-static-collective/corpus-os/issues/17
* https://github.com/the-static-collective/corpus-os/pull/21
* https://github.com/the-static-collective/corpus-os/pull/22
