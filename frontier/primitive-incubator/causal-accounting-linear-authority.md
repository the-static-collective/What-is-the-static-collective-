# Causal Accounting / Linear Authority

Status: **project-backed executable specimen; Corpus OS PR #21 pending review/merge**.

This notebook record is a non-authoritative reflection of the Corpus OS implementation. The repository, tests, issue #17, and adopted runtime boundaries remain canonical for the project.

## Primitive

Executable authority behaves as a linear resource at the consequence boundary: it may be issued, inspected, and spent, but copying its representation does not reproduce authority.

Causal Accounting is the derived proof that every consequence-producing attempt presented to the boundary reconciles to exactly one attributable spent authority path, while every spent path retains an inspectable terminal disposition.

The key separation discovered during implementation is:

```
spent authority
      !=
terminal history
```

`spent` says the warrant cannot be reused. It does **not** say whether the attempt was refused by Session, failed in the host, or completed.

## Project-backed specimen

Corpus OS #17 now proves an in-process reconciliation shape:

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

Terminal launch receipts carry a causal evidence binding copied from the already-consumed genuine warrant: trust id, authority cut, subject, capability id/operation/owner, Trust request id, and bounded operation input. That binding is evidence only; it does not become executable authority.

## Anomaly vocabulary

The current executable specimen detects or represents, without repairing:

* `ORPHAN_EFFECT` — consequence evidence without an attributable genuine spent warrant in the reconciliation cut;
* `DOUBLE_SPEND` — more than one terminal consequence attributed to one warrant;
* `SUBSTITUTED_CONSEQUENCE` — consequence evidence no longer matches the subject/capability/operation/owner/request/input admitted by the warrant;
* `BROKEN_LINEAGE` — receipt evidence names a different trust or adopted authority cut;
* `MISSING_DISPOSITION` — the warrant is spent but supplied history omits its terminal attempt evidence.

A rejected second spend is not itself a second consequence. One original terminal receipt plus a replay refusal remains balanced; fabricated evidence of two terminal consequences becomes `DOUBLE_SPEND`.

## What must stay invariant

* Copied warrant representation must never become causal authority.
* Resource consumption and terminal history must remain separate facts.
* Reconciliation is a pure view and must not mutate declarations, warrants, receipts, or evidence ordering.
* Anomalies remain visible rather than being repaired into apparent consistency.
* The anomaly vocabulary describes computational integrity only; it does not make legal-validity, fraud, financial-accounting, or jurisdiction-specific claims.
* No durable ledger, signing scheme, canonical JSON law, network authority, or token semantics are smuggled into this proof.

## Handoff frontier

This specimen is the accounting substrate for Corpus OS #20, **Lawful Reachability / Constituted Reality**.

\#20 may consume balanced causal history and terminal dispositions to ask which present state is lawfully reachable. It must not redefine what balanced history means, and this notebook record does not pre-authorize that implementation.

Canonical project links:

* Corpus OS issue #17: https://github.com/the-static-collective/corpus-os/issues/17
* Corpus OS PR #21: https://github.com/the-static-collective/corpus-os/pull/21
* Lawful Reachability issue #20: https://github.com/the-static-collective/corpus-os/issues/20
