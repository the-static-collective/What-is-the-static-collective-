---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-19T14:40:35+00:00**  
To: **2026-10-20T12:43:08+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 2 |
| Branches removed | 0 |
| Branch heads moved | 1 |
| PRs entering open set | 2 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** BananaSpork / [feat/penny-box-help-slip-bridge-001](https://github.com/the-static-collective/BananaSpork/tree/feat/penny-box-help-slip-bridge-001) → `8a21fd9f86`
* **+ branch** planZ / [feat/phaselift-001-living-phase-board](https://github.com/the-static-collective/planZ/tree/feat/phaselift-001-living-phase-board) → `52183eafe0`
* **↪ head** What-is-the-static-collective- / main: [749f8be0c3](https://github.com/the-static-collective/What-is-the-static-collective-/commit/749f8be0c32b0c35b495501c5eb6ff8b3a8bdca0) → [653028ccfb](https://github.com/the-static-collective/What-is-the-static-collective-/commit/653028ccfb968524221b6a9517d7a235eb55f41d)

## Open pull-request set

* **+ open PR** [BananaSpork #16 — PENNY BOX -&gt; Garden: bounded candidate-to-HOLD bridge (001)](https://github.com/the-static-collective/BananaSpork/pull/16)
* **+ open PR** [planZ #22 — PHASELIFT-001 — integrity-first living phase board](https://github.com/the-static-collective/planZ/pull/22)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
