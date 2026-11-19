# Branch ecology · A repo is a whole tree, not a porch

At the dated public capture there were **2,026 public branch refs** versus **86 default-branch addresses**. That ratio explains why default READMEs alone can materially underdescribe the terrain. It does **not** prove 2,026 ongoing efforts, functioning implementations or adopted designs.

## Read the anatomy

- **Default branch:** discoverability, landing surface, possibly older README.
- **Independent experimental branch:** exploratory work that may never reach default.
- **Stacked PR branch:** a child whose true parent is *another experimental branch*.
- **Open pull request:** a proposed delta for a named base; review, tests and receiving owner still matter.
- **Historical/superseded ref:** valuable archaeological evidence; not necessarily active work.
- **Selected exact commit:** only its owner can give project-/scope-local authority.

## Live examples inspected October 22

| Source | Witnessed branch | Actual base | What that *does not* prove |
| --- | --- | --- | --- |
| [CANNON #29](https://github.com/the-static-collective/CANNON/pull/29) | experiment/stack-squared-025-community-breath-field | experiment/stack-squared-024-living-commons | Neither branch is a main merge or coalition launch |
| [CANNON #28](https://github.com/the-static-collective/CANNON/pull/28) | experiment/stack-squared-024-living-commons | experiment/stack-squared-023-ai-relatte-hold | Synthetic composition is not adopted integration |
| [planZ #27](https://github.com/the-static-collective/planZ/pull/27) | plan/community-breath-field-025 | main | A plan is not a partner commitment |
| [webZ #68](https://github.com/the-static-collective/webZ/pull/68) | feature/field-002-observation-to-card | release/field-cards-reconciled-001 | A descendant field workflow is not merged into main |
| [webZ #67](https://github.com/the-static-collective/webZ/pull/67) | release/field-cards-reconciled-001 | release/needs-001-abundent-live | Production ancestry and main ancestry are different questions |
| [STATIC OS #90](https://github.com/the-static-collective/static-os/pull/90) | experiment/singing-sigil-f1-physical-coupon | experiment/bandcamp-field-score-001-singing-sigil | Digital coupon preflight is not a field trial |
| [Static Live #43](https://github.com/the-static-collective/static-live/pull/43) | experiment/church-commons-005-two-laptop-field-kit | experiment/church-commons-004-ghot-external-adapter | A field-kit branch is not a church installation |
| [LemonPRESS #35](https://github.com/the-static-collective/lemonPRESS/pull/35) | experiment/reletter-001 | experiment/translation-relay-001 | A synthetic render does not grant source-pixel rights |
| [Story DNA #4](https://github.com/the-static-collective/story-dna/pull/4) | experiment/keep-a-place-song-to-panel-001 | feat/visual-continuity-004 | A held story lineage is not a released comic |
| [VidMage #21](https://github.com/the-static-collective/vidmage/pull/21) | feature/paula-domain-017-ph-abundent | feature/paula-dual-host-016 | DNS/AWS decisions were explicitly not executed |

## The historical branch matters

The *same visible idea* can survive on different refs with different evidence, owners, permissions and future consequences. A 'latest' PR title is an **entry point**; the owning files, exact parent and tests determine what is actually present. Reconcile main changes, stacked work, closed-but-surviving refs and field receipts separately.

**Next audit instrument:** build a per-repo matrix of default SHA, open PR heads, child bases, source-owned status files, test commands, deployment receipts, and unresolved review gates. The existing atlas solves branch discovery; this extra matrix would solve **semantic disposition**, but must never auto-canonize.
