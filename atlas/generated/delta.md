---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-09-25T21:30:39.983Z**  
To: **2026-09-26T12:13:26+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 2 |
| Repositories removed | 0 |
| Branches added | 9 |
| Branches removed | 0 |
| Branch heads moved | 1 |
| PRs entering open set | 1 |
| PRs leaving open set | 0 |

## Repository set

* **+ repo** [cUps](https://github.com/the-static-collective/cUps)
* **+ repo** [WITNESS](https://github.com/the-static-collective/WITNESS)

## Branch set and pointer movement

* **+ branch** cUps / [main](https://github.com/the-static-collective/cUps/tree/main) → `ef798028ba`
* **+ branch** Dogram / [research/APERTURE-PARTITION-LATTICE-001](https://github.com/the-static-collective/Dogram/tree/research/APERTURE-PARTITION-LATTICE-001) → `9e5ad1efe4`
* **+ branch** What-is-the-static-collective- / [feat/development-event-001](https://github.com/the-static-collective/What-is-the-static-collective-/tree/feat/development-event-001) → `121d14ac3f`
* **+ branch** What-is-the-static-collective- / [feat/living-git-map-20260925](https://github.com/the-static-collective/What-is-the-static-collective-/tree/feat/living-git-map-20260925) → `313606c8a6`
* **+ branch** What-is-the-static-collective- / [feat/living-map-delta-relations-001](https://github.com/the-static-collective/What-is-the-static-collective-/tree/feat/living-map-delta-relations-001) → `a984e905d1`
* **+ branch** What-is-the-static-collective- / [feat/visibility-aperture-001](https://github.com/the-static-collective/What-is-the-static-collective-/tree/feat/visibility-aperture-001) → `283586415e`
* **+ branch** What-is-the-static-collective- / [fix/git-atlas-return-links-20260925](https://github.com/the-static-collective/What-is-the-static-collective-/tree/fix/git-atlas-return-links-20260925) → `5c9650df71`
* **+ branch** WITNESS / [genesis/community-audio-bible-001](https://github.com/the-static-collective/WITNESS/tree/genesis/community-audio-bible-001) → `7634e15aa4`
* **+ branch** WITNESS / [main](https://github.com/the-static-collective/WITNESS/tree/main) → `81a343802f`
* **↪ head** What-is-the-static-collective- / main: [517beb2985](https://github.com/the-static-collective/What-is-the-static-collective-/commit/517beb29854aecf8bf45ae55b70ff6a2bd820dca) → [a45bdabece](https://github.com/the-static-collective/What-is-the-static-collective-/commit/a45bdabece4176a8a9a9ed5be8152cff60e3e6fc)

## Open pull-request set

* **+ open PR** [WITNESS #1 — GENESIS-001: community audio Bible witness layer](https://github.com/the-static-collective/WITNESS/pull/1)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
