# Resolution Field — Perceptual Preservation Witness

**Status:** field witness — structural execution passed; perceptual preservation failed

**Project:** Haunted Toaster PR #201\
**Build head:** `2c2b45523e84a69a7b4bdb8b13885f782f6f4e98`

## Specimen

Two packaged renders used the same song, selected creature, score address, resolved timeline, and Dust atmosphere. The only intended witness variable was Resolution Field scale.

| Specimen | Resolution scale | Internal atmosphere canvas | Dust events | Atmosphere content SHA-256                                         |
| -------- | ---------------: | -------------------------: | ----------: | ------------------------------------------------------------------ |
| `RUN4`   |           `0.25` |                  `480×270` |          85 | `c4ada45fa06628fb0e9f6d5cecd642331682574c6e8fd5a6c3d25236a7513210` |
| `RUN4.5` |            `0.5` |                  `960×540` |          85 | `c4ada45fa06628fb0e9f6d5cecd642331682574c6e8fd5a6c3d25236a7513210` |

The receipts correctly recorded:

* `kind: dust`;
* 85 generated atmosphere events;
* the same generated `atmosphere.ass` content in both runs;
* the requested Resolution Field scale;
* restoration to the native `1920×1080` output canvas.

The human field witness reported a materially different fact:

> **Dust was not visibly present in either rendered video.**

These statements do not contradict each other. They witness different layers of the event.

## Paired witness

```
machine receipt
Dust was generated and routed through Resolution Field.

human encounter
Dust did not survive as a perceptible part of the rendered image.
```

The receipt therefore retains authority over generation, addressing, scale selection, graph execution, and output geometry. It does **not** by itself prove perceptual survival.

This specimen promotes a stronger renderer gate:

> **An effect has not survived a transformation merely because its instructions and execution evidence survived.**

For visual material, execution proof and perceptual-preservation proof are separate obligations.

## Failure boundary

The two specimens carry identical Dust generation evidence, so the observed failure is downstream of atmosphere generation.

Current PR #201 Resolution Field architecture isolates Atmosphere by:

```
stage0
  ↓ split
base                     carrier
                           ↓
                     convert to RGBA
                           ↓
                      alpha = 0
                           ↓
                       downscale
                           ↓
                     render ASS dust
                           ↓
                        upscale
                           ↓
base + carrier ───────→ overlay
```

A local synthetic probe of this same carrier/composite pattern produced the following maximum visible particle intensities:

| Path              | Max particle intensity |
| ----------------- | ---------------------: |
| direct Atmosphere |                    102 |
| Resolution `1.0`  |                     16 |
| Resolution `0.5`  |                     15 |
| Resolution `0.25` |                      5 |

This diagnostic evidence strongly indicates that the transparent-carrier/composite path attenuates Atmosphere before spatial reduction is even considered, while lower resolution further damages very small sparse particles.

The current leading mechanism is repeated alpha attenuation across ASS rendering and later overlay composition. Treat that mechanism as a repair hypothesis until the corrected path is proven by the same paired witness.

## What the field test changed

Before this specimen, the first proof could reasonably ask:

> Can an Atmosphere lane be downscaled, restored to native geometry, and rendered successfully?

That proof passed mechanically.

The field witness changes the question to:

> Can the lane relinquish spatial precision **without relinquishing its perceptual existence**?

That question currently fails.

## New invariants

### 1. Receipt existence is not perceptual existence

`eventCount > 0`, a content hash, a successful FFmpeg graph, and a Resolution Field receipt prove computational history. They do not prove that a human-observable effect remains present.

### 2. Sacrifice requires survival

A layer may relinquish precision only while preserving the characteristic that made the layer worth rendering.

For Dust, Smoke, Rain, Firefly, or similar effects, "safe reduction" therefore includes a perceptual floor, not only valid geometry and successful execution.

### 3. Native scale is a control, not an automatic success

The synthetic probe showed significant attenuation even at Resolution `1.0`. A `1.0` Resolution pass is useful because it isolates carrier/composite semantics from spatial downsampling.

### 4. Human witness closes claims machines cannot make

The machine correctly said, "85 Dust events existed in the render plan and executed through this graph."

The human correctly said, "I could not see Dust."

The architecture improves when both remain attributable rather than forcing one to overwrite the other.

### 5. A no-op witness must identify itself

If Atmosphere is `none`, selecting `0.25` or `0.5` does not exercise Resolution Field because there is no Atmosphere file to reduce. The witness surface should make that distinction explicit so an operator cannot accidentally count a no-op as a Resolution proof.

## Repair gate

Resolution Field should not be considered human-passed until a repaired packaged specimen demonstrates all of the following:

* an Atmosphere-bearing candidate is selected;
* the receipt proves that Atmosphere was generated;
* Resolution Field evidence proves the requested `1.0`, `0.5`, or `0.25` path;
* final geometry and SAR remain native and valid;
* protected typography remains native;
* the human witness can actually perceive the Atmosphere;
* reduced scales remain recognizably the same atmosphere family rather than disappearing or becoming a different phenomenon.

A useful A/B witness is therefore:

```
same score + same timeline + same Atmosphere content
        ↓
1.0 control
0.5 reduced
0.25 reduced
        ↓
receipt comparison + human comparison
```

## Compression

> **The receipt can prove that Dust existed in computation. Only the encounter can prove that Dust survived into experience.**

Resolution law is therefore not merely permission to throw pixels away. It is a bounded promise that what relinquishes precision remains sufficiently itself to be witnessed.
