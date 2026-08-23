---
description: >-
  Project-backed beta architecture for first-class Video, one persistent local
  VSPantry, ToastPack/HDToastPack digestion, and receipt-backed developmental
  Toaster Memory.
---

# Video Source, VSPantry & Receipt-Backed Memory

Status: **project-backed beta architecture; Video/VSPantry Slice A is landed, bulk-import observability is proven, and Slice D has a machine-green executable draft under PR #222 with the real foreign-material field witness still pending**

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

### Live folder-intake observability — issue #177

Packaged BETA testing showed that the existing folder importer was functioning but could appear dead while serially hashing, probing, and admitting a large source folder. Issue #177 repairs the **observability**, not the ingestion law.

The existing flat serial operation now exposes truthful progress through the existing VSPantry status surface:

```
selected folder
    ↓
supported files discovered
    ↓
current file index + filename
    ↓
completed admitted / duplicate / refused counts
    ↓
terminal catalogue size
```

Counts report completed work only; they never claim admission before the corresponding specimen operation has finished. The import action is marked busy only while that folder intake is active.

The progress relay is presentation testimony. It does **not** change specimen IDs, hashing, ffprobe evidence, deduplication, catalogue semantics, traversal depth, Video generation authority, `VisualScore`, `ResolvedTimeline`, or production renderer behavior. The scan remains flat and serial; recursion and concurrency remain separate future decisions.

TDD provenance is explicit. The RED head `59da730ad944c3b9c922f204e0c8a723228ac01c` ran as Actions `32327606711`: 408 established tests passed and exactly four new #177 contracts failed at the intended importer → IPC → preload → UI seams.

The final BETA field-package head is `3554f4d5f28d311e67eb9e9c872514656fcc52cd`. Actions run `32328302222` passed consolidated application proof, runtime dependency audit, render/candidate smoke, and the Chromium renderer witness, including a dedicated transient VSPantry import-progress witness. The unsigned Windows package also passed.

Windows field artifact:

* `Haunted-Toaster-Windows-32328302222`
* artifact id `9392238914`
* size `424,862,239` bytes
* digest `sha256:2eb92086c2a9b41a8070a988a9e954a0eda775748c421f8c25e95b46711e10c9`
* contains distinct `Haunted-Toaster-0.5.0-alpha.8-x64-Portable.exe` and `Haunted-Toaster-0.5.0-alpha.8-x64-Setup.exe`

The field package also carries the current-main Listener zero-lead / suspicious-long-gap hardening from PR #190; that Listener work remains mechanically separate from VSPantry authority.

Implementation and package authority: Haunted Toaster issue #177 and PR #192. This section is only the durable project-backed projection.

## ToastPack

A **ToastPack** is not a folder of videos. It is a pre-read, mapped, integrated visual expansion pack produced from VSPantry specimens.

Its versioned deterministic analysis can describe useful visual evidence such as luminance, representative palette, motion magnitude, scene change, edge density, temporal texture, and bounded topology/material/motion affinities.

The same specimen bytes under the same analysis policy must yield the same analysis identity.

### Specimen Pulse — attached audio as influence, not soundtrack

Some admitted short Video specimens carry attached audio. Haunted Toaster issue #183 preserves the project-owned design for treating that audio as a deterministic **Specimen Pulse v1** rather than discarding it or mixing it into the song.

The intended boundary is:

```
admitted VSPantry specimen
  + attached audio when actually present
        ↓
Specimen Pulse v1
  clip-relative deterministic witness
  authority: influence-only
        ↓
proposal / search influence when admitted

and later, behind renderer trust:

accepted foreign-material derivation
        ↓
Ghosted Topology Coupling v1
        ↓
existing Ghost Topology / resonant-overlap law
        ↓
accepted timeline → shared preview / production render
```

The source song remains the global musical clock and the only ordinary master-audio source. Specimen audio does **not** enter the final mux, does not gain Listener or lyric-timing authority, and does not become ambient renderer decision state.

The useful visual metaphor is a drop shadow: primary topology is the object; the specimen pulse may cast a weaker displaced topology projection; bounded overlap may create interference, drag, echo, or residue without replacing the primary geometry.

The first safe slice is analysis only: bounded energy/envelope, transient/onset, coarse spectral-pressure, flux/noisiness, and pulse/periodicity evidence where local deterministic tooling can support those claims honestly. No true-stem, beat, meter, or semantic-audio claims are required.

A later **Ghosted Topology Coupling v1** belongs behind the renderer-trust and foreign-material execution gates. It should reuse existing Ghost Topology machinery rather than create another topology system.

If a human monitoring path is ever exposed, **monitor gain** and **influence gain** remain separate. Quiet audition is not the authority or strength of the analysis, and neither may alter the final song master.

Implementation authority: Haunted Toaster issue #183. This GitBook section is only the durable field projection.

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

Implementation: Haunted Toaster PR #157 — landed foundation. Issue #177 / PR #192 adds live bulk-import observability without widening that authority.

### Slice A proof

The original project proof ran against the PR #157 merge result in GitHub Actions run `32096137746`.

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

Current BETA field proof for #177 is recorded above and supersedes silence-as-progress in the folder-import UX while preserving these same authority boundaries.

### Slice B — Receipt Archive + Toaster Memory v1

Persist/index canonical sidecar receipts and derive rebuildable, inspectable encounter/coverage memory.

### Slice C — ToastPack / HDToastPack

Build deterministic versioned analysis manifests over Pantry specimens.

The analysis family may include the analysis-only **Specimen Pulse v1** from Haunted Toaster #183 when attached audio is actually present. This adds clip-relative influence evidence only; it does not widen renderer or master-audio authority.

### Slice D — foreign-material-v1

PR #222 is now the first executable renderer-facing crossing for this slice. One admitted Video binding is converted upstream into a deterministic `foreign-material-v1` plan and then consumed by the same shared preview/production graph through one `clip-luma-texture-v1` assimilation operator.

The authority law remains unchanged:

```
admitted Video specimen
  ↓ content identity + Frame Reservoir evidence
foreign-material-v1 plan
  ↓ bounded by accepted ResolvedTimeline
clip-luma-texture-v1
  ↓ same shared preview / production graph
Haunted Toaster pixels + receipt evidence
```

The plan is content-identity-bound: admitted SHA-256 + byte length, probe evidence, clip-analysis identity, placement/sampling policy, and assimilation policy participate in the stable recorded plan. Local filename and filesystem path are transport context only and do not alter plan identity. Raw Video does not become a second timeline or renderer decision authority.

The no-video path remains an exact no-op at this seam. Receipt evidence records the source specimen/hash, clip-analysis hash, assimilation policy, placement/sampling evidence, and the compiled operator evidence.

Machine proof is green on PR #222 head `f4a575db65d1bdb9cc5e7b462c30226660d4b804`. GitHub Actions run `32615247440` passed the consolidated application proof, runtime dependency audit, render/candidate smoke proof, production renderer witness build, canonical witness-state comparison, and renderer witness proof.

This is **not yet field-proven**. Keep PR #222 draft until one real 5–10 second admitted specimen against a longer song proves preview/final parity, lawful contribution beyond the source clip duration, receipt/replay identity, recognizably Haunted Toaster assimilation rather than stock-video cutaway behavior, and exact restoration of the established no-video path when Video is removed.

A compatible follow-on may admit #183's **Ghosted Topology Coupling v1** through this execution boundary, reusing existing Ghost Topology/resonant-overlap semantics. Specimen Pulse availability alone is not permission to execute it.

### Slice E — population feeding

Let Pantry/Pack/Memory evidence contribute to lawful six-up diversity and later CROSS/MOLT/HAUNT inheritance and influence.

Specimen Pulse is a natural optional influence-only provider for this stage: a candidate may consume or ignore it, but availability does not imply consumption, ancestry, or renderer authority.

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
