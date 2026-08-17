# Upper Room — First Scripture Heartbeat

**Evidence checkpoint — 2026-08-16**

Upper Room has crossed from design-only authority into its first executable encounter surface.

This checkpoint records what the project now demonstrates. It does not replace the Upper Room repository, v0 design, implementation plan, or pull request as implementation authority.

## Constituted milestone

Milestone B is intentionally small:

```
open Upper Room
  ↓
phone-first Scripture surface
  ↓
canonical coordinate: WEB / JHN / 1
  ↓
translation adapter
  ↓
source-attributed local John 1 witness
  ↓
readable passage in a real mobile browser
```

The result is not yet a shared room. It is the floor a shared room can stand on.

## What is now executable

* React + TypeScript + Vite PWA/test floor.
* Scripture is the dominant rendered surface rather than one panel among application furniture.
* `ScriptureAdapter` isolates canonical Scripture coordinates from a particular translation source or UI layout.
* The first adapter is WEB Protestant (`engwebp`). It refuses translation mismatch instead of silently substituting text.
* John 1 is present as a source-attributed local witness and renders as the initial passage.
* Missing/unavailable Scripture produces an explicit unavailable state.
* A Pixel 7 Chromium witness proves the phone-shaped surface rather than inferring mobile behavior from component tests.

## Source boundary

The local John 1 JSON is evidence, not textual sovereignty.

Its manifest records eBible.org / `engwebp` as the source, edition identity, public-domain status, and witnessed date. The adapter verifies that the loaded payload agrees with the requested translation, book, and chapter before admitting it to the reader.

Working law:

> **The text may be cached locally without pretending the cache authored the text.**

That boundary is structurally compatible with the later Declared Witness Channels experiment: contextual evidence can enter through a declared channel without becoming Scripture or canonical interpretation.

## RED → GREEN witness

GitHub PR #2 — `feat: give Upper Room its first Scripture heartbeat`.

The branch began with behavior tests before application implementation. The RED run failed on the intentionally absent `App` and WEB adapter and also revealed a Vitest/Playwright boundary error.

Final exact head:

`1bde7144cbf5e453f8e8303fb165f2f1fba7e832`

Final GitHub Actions run `31991215087` passed:

* dependency-lock reconstruction;
* SHA-256 drift refusal;
* installation from the verified lock with `npm ci`;
* 3/3 unit/component tests;
* production TypeScript + Vite build;
* Chromium installation;
* Pixel 7 browser witness;
* durable proof-artifact upload.

Proof artifact: `upper-room-milestone-b-proof`, artifact id `9275389526`, digest `sha256:8a5908e25c5eb560b9e3977b49c3c1d105646c2eca2c544fada32b64df605df6`.

The captured phone witness was inspected directly. Scripture occupies effectively the whole reading surface; the header remains subordinate; John 1 is readable; no premature chat, room controls, navigation framework, or AI surface competes with the passage.

## Explicit negative space

This milestone does **not** claim:

* authentication;
* multi-person rooms;
* live presence;
* viewport-following;
* canonical selection ranges;
* AIHYPER;
* durable room events;
* branches;
* publishing;
* the future traversable-world layer.

Keeping those absent is part of the proof. The first executable object is Scripture, not the surrounding platform.

## Newly reachable door

The next product primitive can now be **presence** rather than more shell work:

```
Scripture surface
  +
my sovereign viewport
  +
another participant's visible viewport
  →
shared attention without remote control
```

Selection and AIHYPER can follow once there is a real reading encounter to attach them to. Declared Witness Channels remains a particularly good later proving ground, but does not need to be pulled forward merely because its architecture is already visible.

> **The first room feature is not the room. It is having something truthful to gather around.**
