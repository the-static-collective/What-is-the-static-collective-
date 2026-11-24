---
description: "Machine-observed topology changes between two public Git atlas captures."
---

# DELTA — What moved?

This lens reports set and pointer changes between the previous persisted public
snapshot and the newest changed snapshot. It does **not** interpret why a branch
moved or disappeared, and a PR leaving the open set does not by itself prove
whether it merged, closed, or became unavailable.

From: **2026-11-23T19:14:02+00:00**  
To: **2026-11-24T18:52:57+00:00**

| Observed event | Count |
| --- | ---: |
| Repositories added | 2 |
| Repositories removed | 0 |
| Branches added | 22 |
| Branches removed | 0 |
| Branch heads moved | 7 |
| PRs entering open set | 3 |
| PRs leaving open set | 1 |

## Repository set

* **+ repo** [fileport](https://github.com/the-static-collective/fileport)
* **+ repo** [staticID](https://github.com/the-static-collective/staticID)

## Branch set and pointer movement

* **+ branch** fileport / [feature/fileport-003-static-id](https://github.com/the-static-collective/fileport/tree/feature/fileport-003-static-id) → `478df6b98c`
* **+ branch** fileport / [feature/intranet-fileport-v1](https://github.com/the-static-collective/fileport/tree/feature/intranet-fileport-v1) → `b69034b316`
* **+ branch** fileport / [feature/neon-first-multicloud-002](https://github.com/the-static-collective/fileport/tree/feature/neon-first-multicloud-002) → `4ac8bdf9fa`
* **+ branch** fileport / [fix/static-id-callback-diagnostics](https://github.com/the-static-collective/fileport/tree/fix/static-id-callback-diagnostics) → `3313e8ae12`
* **+ branch** fileport / [fix/static-id-token-transport](https://github.com/the-static-collective/fileport/tree/fix/static-id-token-transport) → `ed0cc8c7c1`
* **+ branch** fileport / [fix/static-id-workers-jwks](https://github.com/the-static-collective/fileport/tree/fix/static-id-workers-jwks) → `6e6b3a4a4e`
* **+ branch** fileport / [main](https://github.com/the-static-collective/fileport/tree/main) → `215276fb74`
* **+ branch** HUMKIN / [feat/robot-radio-discovery-001](https://github.com/the-static-collective/HUMKIN/tree/feat/robot-radio-discovery-001) → `f3d5d4e098`
* **+ branch** HUMKIN / [feature/static-id-consent-multiple-apps](https://github.com/the-static-collective/HUMKIN/tree/feature/static-id-consent-multiple-apps) → `e9854c52ba`
* **+ branch** HUMKIN / [fix/pages-artifact-index-wait](https://github.com/the-static-collective/HUMKIN/tree/fix/pages-artifact-index-wait) → `52a05541ba`
* **+ branch** Jubilee-treasury / [experiment/mooncrater-001-common-harvest](https://github.com/the-static-collective/Jubilee-treasury/tree/experiment/mooncrater-001-common-harvest) → `bbe39a8dc7`
* **+ branch** reLATTE / [feat/humkin-suno-listening-review-001](https://github.com/the-static-collective/reLATTE/tree/feat/humkin-suno-listening-review-001) → `315f5270b2`
* **+ branch** SIA / [feature/fishbone-003-local-operator](https://github.com/the-static-collective/SIA/tree/feature/fishbone-003-local-operator) → `a040f0c98b`
* **+ branch** SIA / [fix/fishbone-003-manual-notes](https://github.com/the-static-collective/SIA/tree/fix/fishbone-003-manual-notes) → `9aaefa07eb`
* **+ branch** staticID / [feature/application-onboarding-002](https://github.com/the-static-collective/staticID/tree/feature/application-onboarding-002) → `9848fc6e84`
* **+ branch** staticID / [feature/application-registry-003](https://github.com/the-static-collective/staticID/tree/feature/application-registry-003) → `c89a5d3017`
* **+ branch** staticID / [feature/static-id-001-oauth-bridge](https://github.com/the-static-collective/staticID/tree/feature/static-id-001-oauth-bridge) → `45a964bea0`
* **+ branch** staticID / [feature/village-gate-004](https://github.com/the-static-collective/staticID/tree/feature/village-gate-004) → `8d866e54ad`
* **+ branch** staticID / [fix/callback-diagnostics](https://github.com/the-static-collective/staticID/tree/fix/callback-diagnostics) → `8cf6110ff2`
* **+ branch** staticID / [fix/token-exchange-transport](https://github.com/the-static-collective/staticID/tree/fix/token-exchange-transport) → `e703d81958`
* **+ branch** staticID / [fix/workers-jwks-fetch](https://github.com/the-static-collective/staticID/tree/fix/workers-jwks-fetch) → `d6f36e5510`
* **+ branch** staticID / [main](https://github.com/the-static-collective/staticID/tree/main) → `259787c50d`
* **↪ head** HUMKIN / main: [4e7e166be8](https://github.com/the-static-collective/HUMKIN/commit/4e7e166be8f45bc83afd2f10f3915a27bf189d76) → [2afc79b7c5](https://github.com/the-static-collective/HUMKIN/commit/2afc79b7c58f7fc9e3b0405773810c35b8a5ca63)
* **↪ head** JAR-VIS / main: [80f1c01e3e](https://github.com/the-static-collective/JAR-VIS/commit/80f1c01e3efb4c724f282ddb915f5ad647f8efb7) → [b061f7c029](https://github.com/the-static-collective/JAR-VIS/commit/b061f7c029c8e97cd928e99bb5227a90ffe958bd)
* **↪ head** Jubilee-treasury / main: [922639ef84](https://github.com/the-static-collective/Jubilee-treasury/commit/922639ef84fcf773dbf179d8d9966b0db1247424) → [550093f2a9](https://github.com/the-static-collective/Jubilee-treasury/commit/550093f2a97a24b35a542fa47dab7115e071b1a2)
* **↪ head** SIA / main: [c4e628f9df](https://github.com/the-static-collective/SIA/commit/c4e628f9df161bb80340b651c389ef65f8b2a093) → [041c2ab682](https://github.com/the-static-collective/SIA/commit/041c2ab682195a787a478b08f98ca211cab8f610)
* **↪ head** What-is-the-static-collective- / main: [159b5edf1a](https://github.com/the-static-collective/What-is-the-static-collective-/commit/159b5edf1af7bafd27d2ef4673809e86326ff73d) → [e97e858a19](https://github.com/the-static-collective/What-is-the-static-collective-/commit/e97e858a19ee2eb094e956c180c99bdf1baaaa27)
* **↪ head** willowlab / feature/static-fileport-neon-001: [0b6bba4040](https://github.com/the-static-collective/willowlab/commit/0b6bba40405abb502856664c36917cbe46c14a33) → [52bdf7f13c](https://github.com/the-static-collective/willowlab/commit/52bdf7f13c209ecec5065329f13ffce7756f3d9b)
* **↪ head** willowlab / feature/willow-partner-sprint-002: [572611daa4](https://github.com/the-static-collective/willowlab/commit/572611daa42cbf44d4a02de2a4eb74843e87b51d) → [de5eb5acd9](https://github.com/the-static-collective/willowlab/commit/de5eb5acd971bb8466c8e012949b4b33b450fe6f)

## Open pull-request set

* **+ open PR** [HUMKIN #204 — ROBOT RADIO 001 — read-only discovery porch for human and machine listeners](https://github.com/the-static-collective/HUMKIN/pull/204)
* **+ open PR** [Jubilee-treasury #48 — MOONCRATER 001–010 — Common Harvest through THE FEAST](https://github.com/the-static-collective/Jubilee-treasury/pull/48)
* **+ open PR** [reLATTE #181 — HUMKIN × Suno Listening 001 — signed evidence HOLD for robot radio](https://github.com/the-static-collective/reLATTE/pull/181)
* **− open-set PR** [HUMKIN #203 — TOWER 012 · native OAuth MCP for ChatGPT Station Desk + owner-safe cloud controls](https://github.com/the-static-collective/HUMKIN/pull/203)

The machine-readable companion is [delta.json](delta.json).
For current status, follow the project source; DELTA is a witness of movement,
not a verdict about disposition or authority.
