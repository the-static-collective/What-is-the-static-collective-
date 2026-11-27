---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-26T17:43:13+00:00**  
To: **2026-11-27T17:27:13+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 12 |
| Branches removed | 0 |
| Branch heads moved | 3 |
| PRs entering open set | 11 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** 100pies / [gh-pages](https://github.com/the-static-collective/100pies/tree/gh-pages) → `ce87bf3414`
* **+ branch** convergent-codec / [research/organism-021](https://github.com/the-static-collective/convergent-codec/tree/research/organism-021) → `2b92c93e8c`
* **+ branch** fileport / [integration/harvest-return-050](https://github.com/the-static-collective/fileport/tree/integration/harvest-return-050) → `87fc3d802b`
* **+ branch** HUMKIN / [feature/humkin-transmission-ledger-001](https://github.com/the-static-collective/HUMKIN/tree/feature/humkin-transmission-ledger-001) → `e49315d40f`
* **+ branch** HUMKIN / [proposal/archive-janitor-001](https://github.com/the-static-collective/HUMKIN/tree/proposal/archive-janitor-001) → `c782a508e7`
* **+ branch** HUMKIN / [proposal/station-operating-desk-001](https://github.com/the-static-collective/HUMKIN/tree/proposal/station-operating-desk-001) → `32c77cf698`
* **+ branch** HUMKIN / [proposal/tower-unified-desk-002](https://github.com/the-static-collective/HUMKIN/tree/proposal/tower-unified-desk-002) → `1188184c18`
* **+ branch** JAR-VIS / [integration/harvest-return-050](https://github.com/the-static-collective/JAR-VIS/tree/integration/harvest-return-050) → `ab8f07b114`
* **+ branch** planZ / [experiment/caravan-genesis-node-alive-007](https://github.com/the-static-collective/planZ/tree/experiment/caravan-genesis-node-alive-007) → `537f71e2f8`
* **+ branch** reLATTE / [integration/postmark-review-001](https://github.com/the-static-collective/reLATTE/tree/integration/postmark-review-001) → `c87a04d96a`
* **+ branch** static-os / [experiment/caravan-008-embodiment](https://github.com/the-static-collective/static-os/tree/experiment/caravan-008-embodiment) → `bcfc0f329d`
* **+ branch** webZ / [integration/suitcase-context-003](https://github.com/the-static-collective/webZ/tree/integration/suitcase-context-003) → `0a0311db59`
* **↪ head** HUMKIN / main: [10ffb553a7](https://github.com/the-static-collective/HUMKIN/commit/10ffb553a73710fff02ab241069b4b1f5c55cb7d) → [b436289c98](https://github.com/the-static-collective/HUMKIN/commit/b436289c9809e716b4857fe405d4ae0e7d0773b6)
* **↪ head** JAR-VIS / main: [6942a723e3](https://github.com/the-static-collective/JAR-VIS/commit/6942a723e3fcd79695399ce293374ce4cf5037df) → [0e958aac27](https://github.com/the-static-collective/JAR-VIS/commit/0e958aac27edd05eb408fa1e8a29c97f5b210f24)
* **↪ head** What-is-the-static-collective- / main: [e2f940486b](https://github.com/the-static-collective/What-is-the-static-collective-/commit/e2f940486bdcc80e4a2d26563d60384f2f4132d0) → [d32d2b22e9](https://github.com/the-static-collective/What-is-the-static-collective-/commit/d32d2b22e9628d392a51eb9e968aab5ce774ec0c)

## Open pull-request set

* **+ open PR** [convergent-codec #2 — ORGANISM 021 — integrated codec ablation and runtime admission gates](https://github.com/the-static-collective/convergent-codec/pull/2)
* **+ open PR** [fileport #9 — HARVEST 050: verify downloaded artifact bytes locally](https://github.com/the-static-collective/fileport/pull/9)
* **+ open PR** [HUMKIN #210 — HUMKIN ESCALATION 001–003 — Ledger, Dial and Switchyard](https://github.com/the-static-collective/HUMKIN/pull/210)
* **+ open PR** [HUMKIN #211 — ARCHIVE JANITOR 001 — bounded automatic Supabase copy reclamation](https://github.com/the-static-collective/HUMKIN/pull/211)
* **+ open PR** [HUMKIN #212 — TOWER — Operating Desk 001: consolidate Station Manager](https://github.com/the-static-collective/HUMKIN/pull/212)
* **+ open PR** [HUMKIN #213 — TOWER 002 — Unified Radio House operating desk and crate workspaces](https://github.com/the-static-collective/HUMKIN/pull/213)
* **+ open PR** [JAR-VIS #79 — HARVEST 050: local held recovery return reader](https://github.com/the-static-collective/JAR-VIS/pull/79)
* **+ open PR** [planZ #49 — CARAVAN 007 — NODE ALIVE: land Genesis and physical field runbook](https://github.com/the-static-collective/planZ/pull/49)
* **+ open PR** [reLATTE #182 — POSTMARK review — native stateless opaque-file crossing](https://github.com/the-static-collective/reLATTE/pull/182)
* **+ open PR** [static-os #100 — CARAVAN 008 — EMBODIMENT: optional STATIC OS community mission](https://github.com/the-static-collective/static-os/pull/100)
* **+ open PR** [webZ #258 — SUITCASE-CONTEXT-003 — exact signed disposition relationship checks](https://github.com/the-static-collective/webZ/pull/258)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
