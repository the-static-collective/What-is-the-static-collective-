---
description: >-
  Re-run of the unchanged Full Bowl 001 hostile specimen against independently
  repaired integration and Corpus OS seams, preserving the original witness as
  history.
---

# Full Bowl 002 × MADDCL0WN — repaired-world return

## Verdict

**The unchanged hostile specimen survives the repaired world. Both exposed witness-surface leaks are closed at their owning seams without merging authority, erasing Full Bowl 001, or promoting MADDCL0WN.**

This page is a later witness, not a correction to [Full Bowl 001](./). Bowl 001 remains the historical record that exposed two thin places. Bowl 002 records what happened after those places were repaired independently and the same hostile specimen was sent through again.

The integration rerun landed in [PR #60](https://github.com/the-static-collective/What-is-the-static-collective-/pull/60) at merge commit `5f6e0b9460859a26868bc2f58f6693d6734e1940`.

## Repaired world cut

| Owner                              | Pinned head / evidence                     |
| ---------------------------------- | ------------------------------------------ |
| Integration base used by the rerun | `36abc47cf288e839a93fb17a7b4f4fa163cd148a` |
| Project0                           | `061b9a6e1c9314f7fb43dbb0026059211ed19f0d` |
| Corpus OS repaired merge           | `289c6fa04d04a2bde6dffbe7265903db5bec56c0` |
| TranchNode                         | `91f7f96805d4e868e35b8d0c75dc5f0671cb494a` |
| Full Bowl 002 integration merge    | `5f6e0b9460859a26868bc2f58f6693d6734e1940` |

The historical Full Bowl 001 fixture and runner were not mutated. The rerun reused the old ten-crossing probe against the repaired owner heads, then tested each repaired seam separately.

## What survived unchanged

The repaired-world witness reports:

* all **10 / 10** original crossings still pass;
* the original refusal semantics remain preserved;
* MADDCL0WN hostile promotions remain **0 / 7**;
* portable authority remains **none**;
* legal validity remains unclaimed;
* no universal schema, merged runtime, or Full Measure DDD was entered.

The pinned machine receipt is [`receipts/full-bowl-002/live-witness.json`](https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/receipts/full-bowl-002/live-witness.json). The final receipt-bearing GitHub Actions run completed successfully as workflow run `32709365928`.

## Repair closure

### `FB001-L001` — detached encounter attribution

**Historical state:** exposed in Full Bowl 001.

**Repaired state:** closed at the integration seam.

The integration guard now requires exact Project0 body/ref verification before Corpus admission is invoked. In the repaired-world witness:

| Observation                               | Result                                  |
| ----------------------------------------- | --------------------------------------- |
| exact binding                             | `bound`                                 |
| clean Corpus admission                    | `admitted`                              |
| detached Project0 verification            | exit `1` / `ENCOUNTER_ADDRESS_MISMATCH` |
| detached binding                          | `refused`                               |
| Corpus invocations after detached refusal | `0`                                     |
| authority transfer                        | `none`                                  |

The repair does not make Project0 an authority dependency of Corpus. The integration crossing owns the source-binding check; Corpus retains its own local admission semantics.

### `FB001-L002` — externally compressed phases

**Historical state:** exposed in Full Bowl 001.

**Repaired state:** closed by inert Corpus phase evidence.

Corpus now exposes four ordered, non-authoritative phase dispositions:

| Phase                 | Disposition | Reason                        |
| --------------------- | ----------- | ----------------------------- |
| destination admission | `admitted`  | `CORPUS_DESTINATION_ADMITTED` |
| local authority       | `admitted`  | `ACTION_WARRANT_ADMITTED`     |
| attempt               | `admitted`  | `ACTION_WARRANT_EXECUTED`     |
| outcome               | `completed` | `CORPUS_ENCOUNTER_COMPLETED`  |

Every phase reports `authorityTransfer: none`. The boundary does not export the warrant, actor identity, trust handle, capability authority, or other authority-capable values.

## Historical detectors remain historical

The old Bowl 001 leak detectors are not rewritten to pretend they never observed a leak.

* The old `FB001-L001` detector deliberately bypasses the new integration guard and invokes Corpus directly, so it can still reproduce the historical observation.
* The old `FB001-L002` detector searched for the originally proposed top-level phase fields. Corpus chose the narrower ordered inert `phases[]` surface instead.

Those observations remain evidence about Bowl 001. The repaired verdict comes from the later owner-seam probes above.

## Residual unresolved

Two crossings remain deliberately unresolved because the repaired boundaries still refuse to export authority-bearing evidence merely to make the integration witness more convenient:

* `FB001-U001` / `X06` — same-specimen causal reconciliation cannot be recreated from stdio because the genuine warrant and terminal receipt remain local to Corpus OS.
* `FB001-U002` / `X10` — positive post-return reachability remains unclaimed because no genuine new unspent local warrant is exported.

These are not repair failures. They are retained fog where stronger proof would require crossing an authority boundary the architecture currently declines to cross.

## renDDDer

| Signal                                     | Rendered state                               |
| ------------------------------------------ | -------------------------------------------- |
| Full Bowl 001                              | **SURVIVES — TWO SCARS WITNESSED**           |
| Full Bowl 002                              | **SURVIVES REPAIRED SEAMS**                  |
| historical leak evidence                   | **PRESERVED, NOT ERASED**                    |
| attribution seam                           | **CLOSED AT INTEGRATION GUARD**              |
| phase reconstructibility                   | **CLOSED BY INERT `phases[]`**               |
| lawful / refused / unresolved distinctions | **PRESERVED**                                |
| original versus lookalike                  | **DISTINGUISHABLE FOR THE DECLARED PURPOSE** |
| visible return versus historical return    | **NOT COLLAPSED**                            |
| residual `U001` / `U002`                   | **STILL UNRESOLVED**                         |
| hostile packet                             | **0 / 7 PROMOTED**                           |
| portable authority                         | **NONE**                                     |
| automatic repairs                          | **ZERO**                                     |
| universal schema / merged runtime / DDD    | **NOT ENTERED**                              |

> Full Bowl 001 found the scars. Independent owners repaired their own seams. Full Bowl 002 crossed again without losing the old evidence, inventing the missing evidence, or giving the clown a crown.

## Architectural consequence

The strongest result is not merely that two bugs were fixed. The system tolerated a hostile cross-repository traversal, preserved the distinction between testimony and authority, learned from the encounter through owner-local repairs, and then survived the same specimen again without centralizing the participating runtimes.

That is a stronger form of continuity than simple recurrence: **the world changed, the test remained attributable, and the constitutional boundaries remained legible.**
