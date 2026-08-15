# BEE Protocol — Boundary-Carried Invariants

## Status

Operational coordination pattern distilled from cross-stack work on 2026-08-11.

## Core law

> Carry the smallest proven invariant across the boundary; leave its authority behind; make the recipient prove it locally; refuse the transplant when it widens the active slice.

BEE is not code reuse and not ontology propagation. It is a disciplined way to let one project teach another without making the donor authoritative over the recipient.

## The four moves

1. **Carry the smallest proven invariant.** Extract only the law that survived contact with evidence. Do not carry the donor's full implementation, vocabulary, dependency graph, or metaphysics unless the recipient independently requires them.
2. **Leave authority behind.** Provenance travels; authority does not. A donor specimen may motivate or constrain a local experiment, but it does not become canonical merely by crossing repositories.
3. **Require local proof.** The recipient must express the invariant in its own native contract, fixtures, tests, receipts, or field witness. Successful transplantation is new evidence, not inherited truth.
4. **Refuse widening transplants.** If importing the invariant expands the recipient's active slice, bypasses a declared non-goal, or introduces coupling before local need exists, do not transplant it yet.

## Useful distinctions

* **Pollen is not authority.** A cross-stack idea may affect attention without gaining mutation rights.
* **Analogy is not identity.** Similar causal structure does not collapse two systems into one ontology.
* **Lifecycle advance does not upgrade provenance.** A proposal that renders successfully remains a proposal unless independent evidence changes its provenance class.
* **Desired outcome does not upgrade return strength.** Exactness belongs to the causal path; a lossy or interpretive edge caps an Exact Return claim even when the final artifact looks favorable.
* **Transport should outrun coupling.** Under deadline, preserve boring raw evidence first and attach richer interpretation downstream.

## 2026-08-11 specimens

### Healthy transplant — Witness Session

Haunted Toaster #120 received a cross-stack distinction from Haunted Phonography / Corpus thinking:

* provenance class: `evidence | uncertainty | proposal`
* lifecycle stage: `heard → inferred → admitted → executed/rendered → witnessed`

The axes remain orthogonal. Advancing through execution does not upgrade a claim's provenance.

### Healthy transplant — Exact Return

Haunted Toaster #121 received the stronger TranchNode/Phonograph law that return strength belongs to the causal path. Declared lossy or interpretive edges cap an EXACT RETURN claim; replay cannot turn an intermediate proposal into historical evidence.

### Healthy refusal — Corpus OS #11

Stigmergic Field could plausibly influence future capability routing, but Corpus OS #11 explicitly excludes Band Runtime / TranchNode contracts from the bounded Linux-host slice. BEE therefore refuses the transplant during that slice.

### Healthy refusal — Autodiscography Vault

The emergency preservation path in Corpus OS #4 should retain raw bytes, provider identity/asset role, byte length, SHA-256, and an append-only receipt before importing TranchNode, Exact Return, or universal lineage machinery. The 25-track pilot must prove transport first.

#### Phase-A landed proof — 2026-08-12

Autodiscography Vault PR #2 was squash-merged to `main` as commit `91f7ee143994a7700c886d20edff8fe5eeb5a688`. The landed Phase-A implementation contains a network-inert MV3 shell, synthetic-only Suno fixture boundary, append-only acquisition journal, exact SHA-256/byte-length verifier, explicit incomplete states, and a bounded Corpus OS handoff projection.

The recipient contract was independently proven before landing with 22 passing tests, and the post-merge `main` workflow passed again on the exact squash commit. Live Suno behavior remains outside the landed slice; Corpus OS #4 remains open through the separate, hard-capped 25-track pilot gate.

This is BEE's desired shape: downstream systems receive exact pollen later, while the emergency preservation instrument stays boring enough to verify now.

#### Phase-B1 live witness proof — 2026-08-14

Autodiscography Vault issue #3 and PR #4 advance the next boundary without yet admitting transport. The proposed Phase-B1 extension installs a permanent read-only content script only on `https://suno.com/*` and `https://www.suno.com/*`, observes a hard maximum of 25 track candidates, and presents the resulting evidence in the local Vault side panel while keeping the acquisition control disabled.

The authority floor remains deliberately narrow: no cookie permission, request/header interception, `<all_urls>`, reusable authentication extraction, browser-database access, telemetry, Vercel/server corpus hop, or provider-asset download path enters this slice. Missing provider identity stays explicit rather than being synthesized, and secret-shaped evidence fails closed as `reusable_auth_required`.

TDD preserved the local-proof rule: on the red run, the existing Phase-A behaviors remained green while eight new Phase-B1 assertions failed for the intentionally absent live-witness behavior. On the final branch head `f7709b2e8f53c3743f05187b9e96fbf6a3671213`, GitHub Actions run 17 passed `npm ci`, all 28 tests, and the synthetic interruption/resume pilot.

The remaining evidence gate is human and local: load the reviewed unpacked extension against a normal signed-in Suno library page and learn what provider IDs, links, titles, and asset surfaces are actually exposed without extracting reusable session material. Until that witness exists, Phase B2 transport and the full-corpus run remain unadmitted, and Corpus OS #4 stays open.

This is a second BEE specimen from the same project: urgency permits a narrowly scoped witness to cross the provider boundary, but it still does not grant transport authority before local proof.

#### Phase-B2 one-track executable membrane — 2026-08-15

Autodiscography Vault PR #5 carries the Phase-B1 witness one boundary farther without collapsing browser authentication into Vault authority. Duplicate DOM witnesses are aggregated by provider identity before the 25-track observation cap, so a sparse first node no longer wins permanently over a richer later title/source witness. `proposedAssets` remains distinct from `observedAssets`: only actually exposed media/link surfaces become transport candidates.

Transport authority is separately admitted. The extension keeps required authority at `sidePanel`; Chrome `downloads` is declared only as an optional permission and requested from the explicit **Enable pilot transport** gesture. The exact observed transport URL may exist ephemerally in browser memory for that immediate Chrome download, but durable evidence carries only a redacted request descriptor hash. Cookie export, authorization-header capture, `<all_urls>`, browser-database access, Native Messaging, telemetry, server transport, and reusable session extraction remain outside the slice.

The other side of the membrane is deliberately boring: Chrome stages one observed asset under `Downloads/Autodiscography-Vault/<run-id>/`; local `pilot:admit` then composes the existing Vault verifier, append-only journal, and handoff projection. It verifies SHA-256 and byte length, writes and verifies `.partial`, atomically promotes the final, appends the verified receipt, emits the bounded handoff, and independently re-verifies the final. A verified key is skipped only after its existing final matches the recorded receipt; corruption refuses overwrite.

TDD was carried through five explicit RED→GREEN gates: live-witness enrichment, optional browser authority, durable request identity, staged-byte admission, and observation-time continuity. The fifth gate was found during completion review: local admission correctly required `observedAt`, but the side panel did not yet expose that browser witness time. GitHub Actions run 42 proved the precise RED state with 35 of 36 tests passing and only the new timestamp-continuity assertion failing. The final implementation displays the original observation timestamp, carries it with the active/completed staging witness, and refuses staging when no observation timestamp exists, so the operator never has to reconstruct that evidence by hand.

On final PR #5 head `8ac33b02cf1bf4f24bab008ec90e0a999a6cbd75`, GitHub Actions run 44 passed `npm ci`, all 36 tests, and the existing synthetic interruption/resume pilot. The branch is code-review-ready but deliberately not landing-authorized.

The unresolved evidence is intentionally human rather than simulated: one normal signed-in Suno specimen must show an enriched live witness with its exact `observedAt`, at least one real observed asset surface, explicit Downloads grant, one completed browser-staged file, successful local admission using that displayed timestamp, independent byte-identity agreement, and no reusable URL/auth material in durable output. Until that happens, the 25-track acquisition control remains disabled and full-corpus transport remains unadmitted.

This is BEE expressed as an executable membrane rather than a slogan: the browser keeps its authentication authority, the recipient receives only the smallest admitted capability and exact resulting evidence, and the next authority expansion waits on a local specimen instead of inheriting confidence from the donor boundary.

## Admission test

Before carrying pollen across a project boundary, ask:

1. What exact invariant has already been proven?
2. What donor-specific authority can be discarded?
3. What is the recipient's smallest native experiment?
4. What local evidence would falsify the transplant?
5. Does this widen the recipient's active slice or violate an explicit non-goal?

If question 5 is yes, refuse or defer.

## Relationship to the Stigmergic Field

The Stigmergic Field describes how distributed signals can shape visible pressure without silently becoming commands. BEE describes how a proven invariant may cross a project boundary without silently carrying donor authority. They are compatible but not identical primitives.

## Residual frontier

A future implementation could preserve explicit `PollenReceipt` evidence containing donor specimen, extracted invariant, recipient hypothesis, local proof requirement, and disposition (`admitted | refused | deferred`). Do not standardize that receipt until at least several independent recipient projects prove a stable common shape.
