---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-02T17:02:48+00:00**  
To: **2026-11-03T15:05:30+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 3 |
| Branches removed | 0 |
| Branch heads moved | 3 |
| PRs entering open set | 2 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** reLATTE / [experiment/lantern-commons-002-living-society](https://github.com/the-static-collective/reLATTE/tree/experiment/lantern-commons-002-living-society) → `c4982fa720`
* **+ branch** the-haunted-pol-ish-roids / [integration/mac-porch-photo-quarry-001](https://github.com/the-static-collective/the-haunted-pol-ish-roids/tree/integration/mac-porch-photo-quarry-001) → `5f2cff1675`
* **+ branch** the-haunted-pol-ish-roids / [integration/photo-quarry-crossing-001](https://github.com/the-static-collective/the-haunted-pol-ish-roids/tree/integration/photo-quarry-crossing-001) → `e3ee49a6fd`
* **↪ head** JAR-VIS / main: [aa793a9d5b](https://github.com/the-static-collective/JAR-VIS/commit/aa793a9d5bc9913accfbb961b17a05fd4712d1e6) → [3e02cdfe9f](https://github.com/the-static-collective/JAR-VIS/commit/3e02cdfe9f2713963a25a87caf644a318f8728e2)
* **↪ head** the-haunted-pol-ish-roids / main: [75f0ed5db8](https://github.com/the-static-collective/the-haunted-pol-ish-roids/commit/75f0ed5db8d79de37d58957d5bc09d7992a5b9d8) → [2bc1f32809](https://github.com/the-static-collective/the-haunted-pol-ish-roids/commit/2bc1f32809004ae7fb6bed1abfb2c4d0ab4628a3)
* **↪ head** What-is-the-static-collective- / main: [d43102fc62](https://github.com/the-static-collective/What-is-the-static-collective-/commit/d43102fc62cdb2b6e6d2e41c793fd2893093de58) → [d7f7820775](https://github.com/the-static-collective/What-is-the-static-collective-/commit/d7f782077515dac183efef4c3829302898f22957)

## Open pull-request set

* **+ open PR** [reLATTE #135 — LANTERN COMMONS 002 — living Minecraft society / Cartridge Forge integration contract](https://github.com/the-static-collective/reLATTE/pull/135)
* **+ open PR** [the-haunted-pol-ish-roids #7 — Mac Porch 001: local Photo Quarry host adapter and field-proof gate](https://github.com/the-static-collective/the-haunted-pol-ish-roids/pull/7)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
