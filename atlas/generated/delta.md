---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-27T17:27:13+00:00**  
To: **2026-11-28T16:10:13+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 0 |
| Branches removed | 0 |
| Branch heads moved | 3 |
| PRs entering open set | 0 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **↪ head** HUMKIN / main: [b436289c98](https://github.com/the-static-collective/HUMKIN/commit/b436289c9809e716b4857fe405d4ae0e7d0773b6) → [3f244e5334](https://github.com/the-static-collective/HUMKIN/commit/3f244e53341b7efc7fcf7bd28cd2b6eda3a90e5c)
* **↪ head** JAR-VIS / main: [0e958aac27](https://github.com/the-static-collective/JAR-VIS/commit/0e958aac27edd05eb408fa1e8a29c97f5b210f24) → [5133ad9702](https://github.com/the-static-collective/JAR-VIS/commit/5133ad97029d28f4710c1935832f3cf66918effa)
* **↪ head** What-is-the-static-collective- / main: [d32d2b22e9](https://github.com/the-static-collective/What-is-the-static-collective-/commit/d32d2b22e9628d392a51eb9e968aab5ce774ec0c) → [f1bd4aecd4](https://github.com/the-static-collective/What-is-the-static-collective-/commit/f1bd4aecd41c0b1f2669988fc1f96b193eb41188)

## Open pull-request set

No pull requests entered or left the open set in this delta.

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
