---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-08T14:17:16+00:00**  
To: **2026-11-09T17:28:04+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 3 |
| Branches removed | 0 |
| Branch heads moved | 2 |
| PRs entering open set | 3 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** MOTIF / [experiment/adapter-invention-001-20261108](https://github.com/the-static-collective/MOTIF/tree/experiment/adapter-invention-001-20261108) → `08885797fb`
* **+ branch** MOTIF / [experiment/cartridge-ring-015-conditional-real-test-followups](https://github.com/the-static-collective/MOTIF/tree/experiment/cartridge-ring-015-conditional-real-test-followups) → `cdaa414ea1`
* **+ branch** MOTIF / [experiment/thought-031-evidence-relay-compositional-pidgin](https://github.com/the-static-collective/MOTIF/tree/experiment/thought-031-evidence-relay-compositional-pidgin) → `724ea2fe4b`
* **↪ head** JAR-VIS / main: [24098af23d](https://github.com/the-static-collective/JAR-VIS/commit/24098af23d479de861644b8faf95634f0c16f812) → [57db641aaf](https://github.com/the-static-collective/JAR-VIS/commit/57db641aafbaf1d6f34ee2cb7082ea860b3aff71)
* **↪ head** What-is-the-static-collective- / main: [c6e63dd449](https://github.com/the-static-collective/What-is-the-static-collective-/commit/c6e63dd44943cc5053c0b5b5300d676eb4541581) → [6a26d0b3c4](https://github.com/the-static-collective/What-is-the-static-collective-/commit/6a26d0b3c473fc70008aa1963a18935e896d939e)

## Open pull-request set

* **+ open PR** [MOTIF #208 — RING-015: real source triage and conditional second tests; FULL-only remains stronger on measured costs](https://github.com/the-static-collective/MOTIF/pull/208)
* **+ open PR** [MOTIF #209 — ADAPTER-INVENTION-001: synthesize and test a real typed cartridge bridge](https://github.com/the-static-collective/MOTIF/pull/209)
* **+ open PR** [MOTIF #210 — THOUGHT-031 (draft): preload relevant evidence and experiment with parameterized optional pidgin](https://github.com/the-static-collective/MOTIF/pull/210)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
