# LOADOUT — PHASELIFT / RECONSTITUTE-001 Landing Checkpoint

**Observed landing:** 2026-08-30

This is a bounded projection of project-owned state. **LOADOUT is authoritative.** If this page disagrees with the repository, its landed code, tests, receipts, or local documentation, the repository wins.

## Landed executable surface

LOADOUT PR #9, **PHASELIFT: land RECONSTITUTE-001 receiver proof**, landed from exact feature head `fb7b5ed19cef838357cff2303f466c0a1b5a5c44` as merge commit `d5693d8b6650bcff0145f140f24c11f1b0160bb2`.

The landed receiver-side proof adds:

* a pinned Project0 PHASELIFT fixture and provenance;
* a receiver-local `LIFT / DEGRADED / HOLD / REFUSE` threshold;
* an attributable world-birth receipt;
* a hostile reconstitution matrix;
* an evaluation receipt;
* the machine-facing `loadout reconstitute` command.

Exact-head LOADOUT `test` workflow runs `33297364565` and `33297017850` completed successfully on `fb7b5ed19cef838357cff2303f466c0a1b5a5c44` before landing.

## Authority boundary

The receiver may constitute a new local world from attributable source material. That does **not** transport the source world's authority into the receiver.

```
source provenance != receiver authorization
reconstitution != identity transfer
world birth != inherited authority
```

The source remains historical evidence. Local authorization remains local.

## Provenance

* Canonical repository: `the-static-collective/LOADOUT`
* PR: `#9`
* Exact tested head: `fb7b5ed19cef838357cff2303f466c0a1b5a5c44`
* Landing merge: `d5693d8b6650bcff0145f140f24c11f1b0160bb2`

This checkpoint records the landing. It does not enlarge the executable contract beyond what LOADOUT itself landed.
