---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-27T13:11:52+00:00**  
To: **2026-10-28T14:01:15+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 5 |
| Branches removed | 0 |
| Branch heads moved | 2 |
| PRs entering open set | 0 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** webZ / [fix/pages-fallback-independent-of-custom-domain-002](https://github.com/the-static-collective/webZ/tree/fix/pages-fallback-independent-of-custom-domain-002) → `866e865b6e`
* **+ branch** webZ / [infra/github-pages-custom-domain-proof-001](https://github.com/the-static-collective/webZ/tree/infra/github-pages-custom-domain-proof-001) → `dbded76973`
* **+ branch** webZ / [infra/vercel-budget-portable-publishing-001](https://github.com/the-static-collective/webZ/tree/infra/vercel-budget-portable-publishing-001) → `bb0997c662`
* **+ branch** webZ / [ops/pages-domain-verification-20261027](https://github.com/the-static-collective/webZ/tree/ops/pages-domain-verification-20261027) → `2611f34e1f`
* **+ branch** webZ / [release/enable-pages-backup-001](https://github.com/the-static-collective/webZ/tree/release/enable-pages-backup-001) → `54245ac506`
* **↪ head** webZ / main: [eebf23dacb](https://github.com/the-static-collective/webZ/commit/eebf23dacb2f5fff91cf568d13f1909f401ed0b9) → [089988ebbf](https://github.com/the-static-collective/webZ/commit/089988ebbf4c5b52b88181c2cd916c8d09395644)
* **↪ head** What-is-the-static-collective- / main: [0340eaeab2](https://github.com/the-static-collective/What-is-the-static-collective-/commit/0340eaeab23bc9eaf5caaa72ac5e6fe20cd904fb) → [c07db0ddef](https://github.com/the-static-collective/What-is-the-static-collective-/commit/c07db0ddef1f84ac338e6671f626e5cf14409a60)

## Open pull-request set

No pull requests entered or left the open set in this delta.

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
