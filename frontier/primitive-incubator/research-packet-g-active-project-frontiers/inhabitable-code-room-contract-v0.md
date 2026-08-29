# Inhabitable Code — Room Contract v0

**Status:** project-backed executable specimen; GitHub integration pending; Cloudflare porch unresolved.

## Primitive

A repository can expose enough project-owned structure for a human or agent to enter it without pretending to know the whole project.

The portable questions are:

1. What are you?
2. What do you currently prove?
3. What do you depend on?
4. What remains human-held?
5. Where may another project safely touch you?

The questions may travel. The answers remain local.

## Constitutional invariant

> The public world may project constituted repository truth, but may not manufacture it.

A room is a projection of repository-owned truth, not a new authority layer. A road exists because a room declares it. Missing state remains unknown or not declared.

## Executable specimen: TranchNode Room 001

TranchNode PR #67 now implements the first room contract on top of its existing `PROJECT_STATUS.json` rather than creating a competing manifest.

The branch contains:

* backward-compatible inhabitation fields on `static-collective.project-status.v1`;
* structural validation for declared dependencies, human-held labels, touchpoints, and re-entry landmarks;
* deterministic `ROOM.md` rendering;
* `npm run room:check` and `npm run room:render`;
* normal CI validation of the room declaration;
* a committed Room 001 projection test-locked to `PROJECT_STATUS.json`;
* explicit preservation of unknown state — TranchNode currently renders `What remains human-held?` as `Not declared.` rather than guessing.

Latest verified implementation head: `52bac82801e109196a55a971be9ef9770ac6c0c7`.

GitHub Actions run `32438814764` completed successfully.

## First road: local asymmetry survives reciprocity

The first cross-repository road turned out to be more useful than a symmetric `depends-on` edge.

TranchNode locally declares:

`TranchNode -> Project0 : compatibility-obligation`

This is grounded in TranchNode's own `COMPATIBILITY.md` and pinned Project0 fixture behavior.

Project0 PR #58 independently declares:

`Project0 -> TranchNode : fixture-pinned-continuity-donor`

Project0 also declares Corpus OS as a second `fixture-pinned-continuity-donor`, because its landed Continuity Triangle specimen genuinely consumes both donor witnesses.

Project0's latest verified declaration head is `011d8d4d2219307265936eac8fdf4ad3d698f2f9`.

GitHub Actions run `32439081305` completed `npm run verify:all` successfully.

The result is reciprocal visibility without semantic collapse. Two rooms may acknowledge one another while giving the crossing different locally truthful meanings.

## TDD witness

The implementation was driven through observed RED -> GREEN boundaries rather than inferred correctness.

TranchNode witnessed:

* missing validator -> `TS2307` -> green validator suite;
* missing renderer -> `TS2305` -> green deterministic renderer suite;
* missing filesystem adapters -> correct adapter failure -> green adapters;
* missing `ROOM.md` -> `ENOENT`, with 132/133 tests passing -> exact projection equality green.

Project0 witnessed:

* corrected room-neighborhood harness -> 259/260 tests passing;
* sole failure: `dependsOn` absent;
* repository declaration added -> full `verify:all` green.

## Cloudflare porch

Cloudflare remains an optional, replaceable projection adapter.

The intended first public surface is stateless and free-tier-compatible:

* `/world`
* `/rooms/tranchnode`
* `/rooms/tranchnode.json`
* `/rooms/project0`
* `/rooms/project0.json`

No KV, D1, Durable Object, R2, graph database, or paid feature is required by v0.

Current limitation: the Cloudflare plugin/skill package is visible as installed/enabled in ChatGPT, but this conversation still exposes no callable Cloudflare account namespace. Therefore no Worker or R2 deployment is claimed yet.

## What this specimen appears to prove

A useful shared system does not need one global agent to ingest or own every repository.

A smaller protocol may be enough:

`repo-owned truth -> validated room -> declared road -> bounded traversal -> encounter -> changed local world`

The first implementation also suggests a stronger candidate law:

> Reciprocity does not require symmetry. A shared road may remain attributable even when each endpoint truthfully describes the crossing differently.

Keep this candidate incubating until additional materially different repositories can inhabit the same questions without importing TranchNode or Project0 semantics.

## Current GitHub slices

* TranchNode PR #67 — Room 001 contract, validator, renderer, adapters, declaration.
* Project0 PR #58 — first neighboring-room declaration.

Both PRs are currently green, mergeable, and still draft pending explicit integration choice.
