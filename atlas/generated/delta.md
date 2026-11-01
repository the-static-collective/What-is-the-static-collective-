---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-31T13:38:33+00:00**  
To: **2026-11-01T14:16:56+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 10 |
| Branches removed | 0 |
| Branch heads moved | 4 |
| PRs entering open set | 7 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** CANNON / [experiment/first-knock-001-human-door](https://github.com/the-static-collective/CANNON/tree/experiment/first-knock-001-human-door) → `8e6dcd617e`
* **+ branch** GrO / [experiment/useful-later-001](https://github.com/the-static-collective/GrO/tree/experiment/useful-later-001) → `8a5387786e`
* **+ branch** GrO / [experiment/useful-later-relatte-export-001](https://github.com/the-static-collective/GrO/tree/experiment/useful-later-relatte-export-001) → `08adcfe645`
* **+ branch** reLATTE / [experiment/possibility-crossings-001](https://github.com/the-static-collective/reLATTE/tree/experiment/possibility-crossings-001) → `5fabf889da`
* **+ branch** webZ / [experiment/hey-response-grammar-001](https://github.com/the-static-collective/webZ/tree/experiment/hey-response-grammar-001) → `fafd4d4191`
* **+ branch** webZ / [experiment/living-cards-001](https://github.com/the-static-collective/webZ/tree/experiment/living-cards-001) → `274b5e043a`
* **+ branch** webZ / [experiment/question-arcade-p5-001](https://github.com/the-static-collective/webZ/tree/experiment/question-arcade-p5-001) → `da8073bbab`
* **+ branch** webZ / [experiment/spam-musubi-002](https://github.com/the-static-collective/webZ/tree/experiment/spam-musubi-002) → `7aaa5d111f`
* **+ branch** webZ / [feature/poke-001-signal-handshake](https://github.com/the-static-collective/webZ/tree/feature/poke-001-signal-handshake) → `7a6eb97149`
* **+ branch** webZ / [feature/wanted-demand-first-001](https://github.com/the-static-collective/webZ/tree/feature/wanted-demand-first-001) → `3ef3c9064e`
* **↪ head** GrO / main: [86798d9bae](https://github.com/the-static-collective/GrO/commit/86798d9baed2e697af5700fc3c27b8c3444b19f0) → [dcf2a6adb3](https://github.com/the-static-collective/GrO/commit/dcf2a6adb3a5596efb79f893a54854eff1a95b0c)
* **↪ head** JAR-VIS / main: [cd289032b0](https://github.com/the-static-collective/JAR-VIS/commit/cd289032b0b2dd8787fa2d62b85be1233c8d404d) → [dfe535318a](https://github.com/the-static-collective/JAR-VIS/commit/dfe535318ab57b63526310e72f355d69fafc0e76)
* **↪ head** reLATTE / main: [39038d66b1](https://github.com/the-static-collective/reLATTE/commit/39038d66b15f43559c48c7da8b8a40a76b883ff0) → [d69a863943](https://github.com/the-static-collective/reLATTE/commit/d69a863943e071346527eafc79a63ef332d524af)
* **↪ head** What-is-the-static-collective- / main: [1104a30d42](https://github.com/the-static-collective/What-is-the-static-collective-/commit/1104a30d424e5512a08181dd19993d01b59d837c) → [2e1416f45e](https://github.com/the-static-collective/What-is-the-static-collective-/commit/2e1416f45ecab12f21b4743b5ac64363e4f3433d)

## Open pull-request set

* **+ open PR** [CANNON #91 — FIRST-KNOCK-001 — one human sentence → offline printable card (no contact claims)](https://github.com/the-static-collective/CANNON/pull/91)
* **+ open PR** [webZ #220 — POKE-001: one signal, one echo, no obligation](https://github.com/the-static-collective/webZ/pull/220)
* **+ open PR** [webZ #221 — HEY-001: one-click human response grammar → portable unsigned draft](https://github.com/the-static-collective/webZ/pull/221)
* **+ open PR** [webZ #222 — SPAM-MUSUBI-002: compost troll noise into safe test recipes; make PLAY first-class](https://github.com/the-static-collective/webZ/pull/222)
* **+ open PR** [webZ #223 — WANTED-001/002: buyer-first reverse auction and play-credit laboratory](https://github.com/the-static-collective/webZ/pull/223)
* **+ open PR** [webZ #224 — QUESTION ARCADE 001: teachable idle game → synthetic community HOLD crossing](https://github.com/the-static-collective/webZ/pull/224)
* **+ open PR** [webZ #225 — Living Cards 001: one real thing → shareable card → reply → reported action → return](https://github.com/the-static-collective/webZ/pull/225)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
