---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-14T12:52:52+00:00**  
To: **2026-10-15T12:39:46+00:00**

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

* **+ branch** reLATTE / [feat/cloudflare-sqlite-receiver-001](https://github.com/the-static-collective/reLATTE/tree/feat/cloudflare-sqlite-receiver-001) → `cc186eb785`
* **+ branch** reLATTE / [feat/mw-two-world-edge-002](https://github.com/the-static-collective/reLATTE/tree/feat/mw-two-world-edge-002) → `b7a1f95c4c`
* **↪ head** What-is-the-static-collective- / main: [7886af0ba5](https://github.com/the-static-collective/What-is-the-static-collective-/commit/7886af0ba5b4e2f9b6f5d90b2c3a995c89601a73) → [91f83f3bcf](https://github.com/the-static-collective/What-is-the-static-collective-/commit/91f83f3bcf24334f3e4e1191dfefac807549114b)

## Open pull-request set

* **+ open PR** [reLATTE #115 — R3-CF-001: reLATTE signed receiver on Cloudflare SQLite Durable Objects](https://github.com/the-static-collective/reLATTE/pull/115)
* **+ open PR** [reLATTE #116 — R3-CF-002: independent owner/receiver Durable Objects with signed crossing](https://github.com/the-static-collective/reLATTE/pull/116)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
