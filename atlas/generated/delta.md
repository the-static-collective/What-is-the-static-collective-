---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-10-18T12:03:50+00:00**  
To: **2026-10-19T14:40:35+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 0 |
| Repositories removed | 0 |
| Branches added | 13 |
| Branches removed | 0 |
| Branch heads moved | 2 |
| PRs entering open set | 11 |
| PRs leaving open set | 0 |

## Repository set

No repository membership changes in this delta.

## Branch set and pointer movement

* **+ branch** GHoT / [experiment/worship-stage-organ-001](https://github.com/the-static-collective/GHoT/tree/experiment/worship-stage-organ-001) → `d59dc91a0a`
* **+ branch** Jubilee-treasury / [experiment/penny-box-001-church-participation](https://github.com/the-static-collective/Jubilee-treasury/tree/experiment/penny-box-001-church-participation) → `bb05d90c12`
* **+ branch** Jubilee-treasury / [experiment/penny-box-002-physical-digital-identity](https://github.com/the-static-collective/Jubilee-treasury/tree/experiment/penny-box-002-physical-digital-identity) → `495424cea6`
* **+ branch** reLATTE / [experiment/horizon-agent-commons-001](https://github.com/the-static-collective/reLATTE/tree/experiment/horizon-agent-commons-001) → `71edde9a67`
* **+ branch** reLATTE / [experiment/horizon-mcp-readonly-002](https://github.com/the-static-collective/reLATTE/tree/experiment/horizon-mcp-readonly-002) → `ed39b59715`
* **+ branch** reLATTE / [experiment/hymnal-crossing-002](https://github.com/the-static-collective/reLATTE/tree/experiment/hymnal-crossing-002) → `6b1bf6b734`
* **+ branch** static-live / [experiment/church-commons-001-recoverable-mirrors](https://github.com/the-static-collective/static-live/tree/experiment/church-commons-001-recoverable-mirrors) → `f9ddc2430d`
* **+ branch** static-live / [experiment/church-commons-002-verified-failover](https://github.com/the-static-collective/static-live/tree/experiment/church-commons-002-verified-failover) → `7c0c95328b`
* **+ branch** static-live / [experiment/church-commons-003-signed-withdrawal-leases](https://github.com/the-static-collective/static-live/tree/experiment/church-commons-003-signed-withdrawal-leases) → `76b526d352`
* **+ branch** static-live / [experiment/church-commons-004-ghot-external-adapter](https://github.com/the-static-collective/static-live/tree/experiment/church-commons-004-ghot-external-adapter) → `6472ffed4f`
* **+ branch** static-live / [experiment/church-commons-005-two-laptop-field-kit](https://github.com/the-static-collective/static-live/tree/experiment/church-commons-005-two-laptop-field-kit) → `d9dc4d94ee`
* **+ branch** static-live / [experiment/living-hymnal-001-church-adapters](https://github.com/the-static-collective/static-live/tree/experiment/living-hymnal-001-church-adapters) → `a45e85e36e`
* **+ branch** the-haunted-phonography / [experiment/vault-phonograph-hymnal-001](https://github.com/the-static-collective/the-haunted-phonography/tree/experiment/vault-phonograph-hymnal-001) → `7ffec3d122`
* **↪ head** reLATTE / main: [dcc8cdca84](https://github.com/the-static-collective/reLATTE/commit/dcc8cdca84c440aa4294134f020fb7095bf87f24) → [7016dadcaf](https://github.com/the-static-collective/reLATTE/commit/7016dadcafc335d7ad8dccc26f4d6e0769dcf28c)
* **↪ head** What-is-the-static-collective- / main: [6a2d925aa5](https://github.com/the-static-collective/What-is-the-static-collective-/commit/6a2d925aa59e8dda608249ccedd6b497ec14f174) → [749f8be0c3](https://github.com/the-static-collective/What-is-the-static-collective-/commit/749f8be0c32b0c35b495501c5eb6ff8b3a8bdca0)

## Open pull-request set

* **+ open PR** [GHoT #131 — WORSHIP-STAGE-001 — GHoT capability for Static Live rehearsal checks](https://github.com/the-static-collective/GHoT/pull/131)
* **+ open PR** [Jubilee-treasury #24 — PENNY BOX 001 — small things count: physical box, community need board, steward receipts](https://github.com/the-static-collective/Jubilee-treasury/pull/24)
* **+ open PR** [Jubilee-treasury #25 — PENNY BOX 002 — one physical-and-digital identity, QR-ready poster and mobile commons board](https://github.com/the-static-collective/Jubilee-treasury/pull/25)
* **+ open PR** [reLATTE #117 — Living Hymnal 002 — signed lyric crossing, independently admitted or refused](https://github.com/the-static-collective/reLATTE/pull/117)
* **+ open PR** [static-live #38 — Living Hymnal 001 — church-portable song garden × reLATTE × Static Live](https://github.com/the-static-collective/static-live/pull/38)
* **+ open PR** [static-live #39 — CHURCH COMMONS 001 — three-process signed public mirrors and origin-loss recovery](https://github.com/the-static-collective/static-live/pull/39)
* **+ open PR** [static-live #40 — CHURCH COMMONS 002 — independently verified mirror gateway and no-rollback HOLD](https://github.com/the-static-collective/static-live/pull/40)
* **+ open PR** [static-live #41 — CHURCH COMMONS 003 — church-owned withdrawal and short-lived signed publication leases](https://github.com/the-static-collective/static-live/pull/41)
* **+ open PR** [static-live #42 — CHURCH COMMONS 004 — execute leased public Hymnal status as actual GHoT capability](https://github.com/the-static-collective/static-live/pull/42)
* **+ open PR** [static-live #43 — CHURCH COMMONS 005 — two-laptop SSH field kit for independently hosted signed lyrics](https://github.com/the-static-collective/static-live/pull/43)
* **+ open PR** [the-haunted-phonography #27 — VAULT-PHONO-001 — verified Suno WAV → evidenced musical mutation → Static Live object](https://github.com/the-static-collective/the-haunted-phonography/pull/27)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
