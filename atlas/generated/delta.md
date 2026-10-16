---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-15T12:39:46+00:00**  
To: **2026-10-16T12:24:39+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 1 |
| Repositories removed | 0 |
| Branches added | 3 |
| Branches removed | 0 |
| Branch heads moved | 1 |
| PRs entering open set | 3 |
| PRs leaving open set | 0 |

## Repository set

* **+ repo** [story-dna](https://github.com/the-static-collective/story-dna)

## Branch set and pointer movement

* **+ branch** SIA / [feat/story-dna-relationship-passenger-002](https://github.com/the-static-collective/SIA/tree/feat/story-dna-relationship-passenger-002) → `e17df81515`
* **+ branch** webZ / [experiment/needs-001-first-crossing](https://github.com/the-static-collective/webZ/tree/experiment/needs-001-first-crossing) → `b68810cd5e`
* **+ branch** webZ / [release/needs-001-abundent-live](https://github.com/the-static-collective/webZ/tree/release/needs-001-abundent-live) → `65539f065d`
* **↪ head** What-is-the-static-collective- / main: [91f83f3bcf](https://github.com/the-static-collective/What-is-the-static-collective-/commit/91f83f3bcf24334f3e4e1191dfefac807549114b) → [9e8fc876bc](https://github.com/the-static-collective/What-is-the-static-collective-/commit/9e8fc876bc4465033d3605ef91326a015497e216)

## Open pull-request set

* **+ open PR** [SIA #5 — STORY DNA 002 — relationship passenger prototype (incubation)](https://github.com/the-static-collective/SIA/pull/5)
* **+ open PR** [webZ #63 — NEEDS-001: first crossing for What Can We Do Today?](https://github.com/the-static-collective/webZ/pull/63)
* **+ open PR** [webZ #64 — Release candidate: bring NEEDS-001 to the Abundent garden](https://github.com/the-static-collective/webZ/pull/64)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
