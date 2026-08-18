---
description: >-
  Project-backed beta architecture for first-class Video, one persistent local
  VSPantry, ToastPack/HDToastPack digestion, and receipt-backed developmental
  Toaster Memory.
---

# Video Source, VSPantry & Receipt-Backed Memory

Status: **project-backed beta architecture; Slice A is proven in Haunted Toaster PR #157 and ready for review**

Canonical project design: `docs/superpowers/specs/2026-08-17-video-source-pantry-toastpacks-memory-design.md`

Executable Slice A plan: `docs/superpowers/plans/2026-08-17-persistent-video-source-vspantry.md`

Project implementation authority remains in GitHub. This page is an orientation and durable field projection.

## The field

Video becomes a first-class source beside Song, Image, and Lyrics:

```
Song    → temporal / musical evidence
Image   → chromatic / spatial evidence
Lyrics  → semantic / language evidence
Video   → temporal / visual evidence
```

A Video is source evidence and material. It is not a second timeline and does not become renderer authority merely because it exists.

## One persistent VSPantry

Each local Toaster/user owns one persistent **VSPantry**, shared across songs and sessions.

When a human adds a Video, **Add to VSPantry** is on by default. It may be unchecked for an ephemeral session-only encounter.

Pantry identity is content-based rather than path-based:

```
raw video bytes
  ↓ SHA-256 + byte length
stable specimen identity
  ↓
probe evidence + path observations
  ↓
canonical local VSPantry catalogue
```

Filename, filesystem enumeration order, import order, and admission time do not become generation authority. Re-importing identical bytes is idempotent.

The first intake stage stays deliberately cheap so a harvest of hundreds of short Flow clips can enter without requiring deep analysis up front.

## ToastPack

A **ToastPack** is not a folder of videos. It is a pre-read, mapped, integrated visual expansion pack produced from VSPantry specimens.

Its versioned deterministic analysis can describe useful visual evidence such as luminance, representative palette, motion magnitude, scene change, edge density, temporal texture, and bounded topology/material/motion affinities.

The same specimen bytes under the same analysis policy must yield the same analysis identity.

## HDToastPack

**HDToastPack** is the same conceptual contract at a higher capability/fidelity tier: longer clips, richer detail, and more expensive precomputation where flagship material warrants it.

It does not create a parallel authority system.

## Receipt-backed Toaster Memory

The Toaster's developmental memory should grow from witnessed history rather than an opaque taste model.

```
completed encounter / render
        ↓
canonical sidecar receipt
        ↓
local Toaster receipt archive / index
        ↓
derived encounter history
        ↓
coverage + diversity memory
        ↓
future search pressure
```

The original sidecar remains authoritative for its artifact. The Toaster may store or index a durable local copy so memory can be rebuilt and traversed easily.

Memory may learn inspectable facts such as which specimens and visual neighborhoods were recently used, which topology/material/motion combinations have been explored, and which pack regions remain underrepresented.

Memory influences search. **It does not rewrite historical analysis, mutate an accepted timeline, or become render authority.**

## Constitutional separation

```
VSPantry
= what admitted video specimens exist

ToastPack / HDToastPack
= what has been deterministically understood and prepared

Receipt archive
= what witnessed encounters actually happened

Toaster Memory
= what developmental state can be derived from those receipts

Candidate generation
= what may happen next

Accepted ResolvedTimeline
= what actually will happen in a render
```

That separation is the core law of the whole loaf.

## Executable slices

### Slice A — Video + VSPantry

Persistent first-class Video source, default-on Pantry admission, content addressing, ffprobe evidence, deterministic catalogue, cheap bulk folder intake, and UI/browser witness. **No renderer or generation semantic change.**

Implementation: Haunted Toaster PR #157 — **proven and ready for review**.

### Slice A proof

Final project proof ran against the PR merge result in GitHub Actions run `32096137746`.

Application witness:

* Full Measure check passed across 150 scripts;
* Node test suite: **294/294 passed**;
* production render smoke proof passed;
* six-up candidate smoke proof passed;
* production runtime dependency audit: **0 vulnerabilities**.

Browser witness:

* Playwright: **9/9 passed**;
* eight established canonical states remain stable;
* a dedicated Video/VSPantry witness proves the live source controls, default-on Pantry checkbox, compact checkbox geometry, one-video admission, folder dedupe accounting, and Clear Video behavior.

Authority-boundary proof:

* no files under `src/full-measure/src/render/` changed;
* no files under `src/full-measure/src/generation/` changed;
* `executionForRender()` remains Video-unaware;
* Video remains session/pantry evidence until the renderer-facing slice is separately admitted.

### Slice B — Receipt Archive + Toaster Memory v1

Persist/index canonical sidecar receipts and derive rebuildable, inspectable encounter/coverage memory.

### Slice C — ToastPack / HDToastPack

Build deterministic versioned analysis manifests over Pantry specimens.

### Slice D — foreign-material-v1

Only after the renderer trust line settles: shared preview/production media-input planning plus one deterministic assimilation primitive. Imported video remains foreign visual DNA metabolized by Haunted Toaster rather than stock footage placed on a timeline.

### Slice E — population feeding

Let Pantry/Pack/Memory evidence contribute to lawful six-up diversity and later CROSS/MOLT/HAUNT inheritance and influence.

## Beta relationship

This extends the Living Creative Playground rather than creating a separate product surface.

The long-term effect is a Toaster that develops a visual education:

```
new Toaster
  ↓
encounters visual specimens
  ↓
builds Pantry
  ↓
digests packs
  ↓
creates and witnesses work
  ↓
remembers explored territory
  ↓
searches more developmentally on the next encounter
```

The goal is not automatic taste selection. It is **developmental diversity grounded in actual witnessed history**.

## Authority note

GitHub design/specification, current project issues, code, tests, accepted timelines, and receipts outrank this page for implementation truth. GitBook preserves the project-backed shape and traversal path.
