---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-09-30T13:40:59+00:00**  
To: **2026-10-01T14:27:19+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 1 |
| Repositories removed | 0 |
| Branches added | 22 |
| Branches removed | 0 |
| Branch heads moved | 2 |
| PRs entering open set | 2 |
| PRs leaving open set | 0 |

## Repository set

* **+ repo** [lemonPRESS](https://github.com/the-static-collective/lemonPRESS)

## Branch set and pointer movement

* **+ branch** BananaSpork / [feat/1201-door-001](https://github.com/the-static-collective/BananaSpork/tree/feat/1201-door-001) → `22e283460d`
* **+ branch** BananaSpork / [feat/banana-relay-001](https://github.com/the-static-collective/BananaSpork/tree/feat/banana-relay-001) → `36c3d3cc50`
* **+ branch** lemonPRESS / [genesis/crawler-press-001](https://github.com/the-static-collective/lemonPRESS/tree/genesis/crawler-press-001) → `ad11175034`
* **+ branch** lemonPRESS / [instrument/nunumath-playground-001](https://github.com/the-static-collective/lemonPRESS/tree/instrument/nunumath-playground-001) → `d78593f70f`
* **+ branch** lemonPRESS / [library/little-free-library-001](https://github.com/the-static-collective/lemonPRESS/tree/library/little-free-library-001) → `96fac7d23d`
* **+ branch** lemonPRESS / [main](https://github.com/the-static-collective/lemonPRESS/tree/main) → `02feb44542`
* **+ branch** lemonPRESS / [press/archive](https://github.com/the-static-collective/lemonPRESS/tree/press/archive) → `34e93c395e`
* **+ branch** lemonPRESS / [press/crawler](https://github.com/the-static-collective/lemonPRESS/tree/press/crawler) → `f64357768c`
* **+ branch** lemonPRESS / [press/digital](https://github.com/the-static-collective/lemonPRESS/tree/press/digital) → `f6f7dc1c82`
* **+ branch** lemonPRESS / [press/physical](https://github.com/the-static-collective/lemonPRESS/tree/press/physical) → `89fda6c7b1`
* **+ branch** lemonPRESS / [release/free-library-001-archive](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-001-archive) → `c9f1c85a6f`
* **+ branch** lemonPRESS / [release/free-library-001-crawler](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-001-crawler) → `ffc573e4cc`
* **+ branch** lemonPRESS / [release/free-library-001-digital](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-001-digital) → `f94fc50071`
* **+ branch** lemonPRESS / [release/free-library-001-main](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-001-main) → `4adb5ba467`
* **+ branch** lemonPRESS / [release/free-library-001-physical](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-001-physical) → `a329edf38d`
* **+ branch** lemonPRESS / [release/free-library-002-archive](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-002-archive) → `2fc3b976e9`
* **+ branch** lemonPRESS / [release/free-library-002-crawler](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-002-crawler) → `56bce38f84`
* **+ branch** lemonPRESS / [release/free-library-002-digital](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-002-digital) → `15dd44bf0b`
* **+ branch** lemonPRESS / [release/free-library-002-main](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-002-main) → `fffffe9d59`
* **+ branch** lemonPRESS / [release/free-library-002-physical](https://github.com/the-static-collective/lemonPRESS/tree/release/free-library-002-physical) → `803fd8bd4e`
* **+ branch** lemonPRESS / [work/haunted-library-001-crawler](https://github.com/the-static-collective/lemonPRESS/tree/work/haunted-library-001-crawler) → `6d88fa77dd`
* **+ branch** lemonPRESS / [work/haunted-library-001-main](https://github.com/the-static-collective/lemonPRESS/tree/work/haunted-library-001-main) → `3dbc855c1a`
* **↪ head** BananaSpork / main: [4d857a99d9](https://github.com/the-static-collective/BananaSpork/commit/4d857a99d9caa14058cceb45379e3657ca1004c9) → [6738230a85](https://github.com/the-static-collective/BananaSpork/commit/6738230a8557060dd59aabc19caf21826806d16f)
* **↪ head** What-is-the-static-collective- / main: [c74f6acbeb](https://github.com/the-static-collective/What-is-the-static-collective-/commit/c74f6acbebba127602c45428e754557053755fb9) → [445bab9106](https://github.com/the-static-collective/What-is-the-static-collective-/commit/445bab9106d5a8cf7c1acac45b3f2808d2c61394)

## Open pull-request set

* **+ open PR** [lemonPRESS #13 — HOW TO READ A HAUNTED LIBRARY — crawler edition 001](https://github.com/the-static-collective/lemonPRESS/pull/13)
* **+ open PR** [lemonPRESS #14 — Admit HOW TO READ A HAUNTED LIBRARY as LP-HL-001](https://github.com/the-static-collective/lemonPRESS/pull/14)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
