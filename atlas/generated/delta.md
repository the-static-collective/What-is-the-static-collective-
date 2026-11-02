---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-01T14:16:56+00:00**  
To: **2026-11-02T17:02:48+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 2 |
| Branches removed | 0 |
| Branch heads moved | 3 |
| PRs entering open set | 2 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** JAR-VIS / [experiment/node-zero-garden-static-live-001](https://github.com/the-static-collective/JAR-VIS/tree/experiment/node-zero-garden-static-live-001) → `bc5f08a374`
* **+ branch** webZ / [experiment/mit-infinite-fabricator-suitcase-001](https://github.com/the-static-collective/webZ/tree/experiment/mit-infinite-fabricator-suitcase-001) → `6f8a39e783`
* **↪ head** JAR-VIS / main: [dfe535318a](https://github.com/the-static-collective/JAR-VIS/commit/dfe535318ab57b63526310e72f355d69fafc0e76) → [aa793a9d5b](https://github.com/the-static-collective/JAR-VIS/commit/aa793a9d5bc9913accfbb961b17a05fd4712d1e6)
* **↪ head** static-field / main: [2d4433864e](https://github.com/the-static-collective/static-field/commit/2d4433864e8e31275e56766522c090007e0d522b) → [d9f8cf23ac](https://github.com/the-static-collective/static-field/commit/d9f8cf23acb29fd5ef3ac9db62e5abeba9a6be82)
* **↪ head** What-is-the-static-collective- / main: [2e1416f45e](https://github.com/the-static-collective/What-is-the-static-collective-/commit/2e1416f45ecab12f21b4743b5ac64363e4f3433d) → [d43102fc62](https://github.com/the-static-collective/What-is-the-static-collective-/commit/d43102fc62cdb2b6e6d2e41c793fd2893093de58)

## Open pull-request set

* **+ open PR** [JAR-VIS #47 — Experiment: NODE ZERO local Garden exchange + Static Live bulletin](https://github.com/the-static-collective/JAR-VIS/pull/47)
* **+ open PR** [webZ #226 — INFINITE-FABRICATOR-SUITCASE-001 — physical-output port for MIT Living Suitcase (HOLD only)](https://github.com/the-static-collective/webZ/pull/226)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
