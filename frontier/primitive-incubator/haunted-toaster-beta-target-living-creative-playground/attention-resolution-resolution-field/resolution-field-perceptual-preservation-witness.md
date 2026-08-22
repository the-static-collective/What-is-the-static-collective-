# Resolution Field — Perceptual Preservation Witness

**Status:** human field PASS after alpha repair; all supported scales remain distinct and usable\
**Project:** Haunted Toaster PR #201 / repair PR #205\
**Field closure:** 2026-08-22

## What failed first

The original packaged witness proved that Atmosphere could be generated, receipted, routed through Resolution Field, and still become nearly invisible in the final composite.

Two controlled Dust specimens used the same song, selected creature, score address, resolved timeline, and Atmosphere payload. The only intended witness variable was Resolution scale:

| Specimen | Resolution scale | Internal atmosphere canvas | Dust events | Atmosphere content SHA-256                                         |
| -------- | ---------------: | -------------------------: | ----------: | ------------------------------------------------------------------ |
| `RUN4`   |           `0.25` |                  `480×270` |          85 | `c4ada45fa06628fb0e9f6d5cecd642331682574c6e8fd5a6c3d25236a7513210` |
| `RUN4.5` |            `0.5` |                  `960×540` |          85 | `c4ada45fa06628fb0e9f6d5cecd642331682574c6e8fd5a6c3d25236a7513210` |

Receipts said the Dust existed. Human witness said it did not survive perceptually.

That distinction remains important:

> **The receipt can prove that Dust existed in computation. Only the encounter can prove that Dust survived into experience.**

## Failure boundary

The carrier path copied `stage0`, cleared alpha only, rendered semi-transparent ASS particles into that carrier, then overlaid the result as straight alpha.

A synthetic probe showed severe attenuation even at `1.0`, which isolated the bug from ordinary spatial downsampling.

The repair in PR #205 changed the carrier contract rather than brightening Atmosphere by decree:

```
stage0
  ↓ split
base                     carrier
                           ↓
                    clear full RGBA
                           ↓
                       downscale
                           ↓
                    render Atmosphere
                           ↓
                        upscale
                           ↓
base + carrier ───────→ premultiplied overlay
```

The carrier now begins with zero RGB and zero alpha, and overlay semantics pay the Atmosphere opacity once.

Portable distinction:

> **Resolution loss was character. Alpha loss was corruption.**

The repair removes the corruption while preserving the character.

## Repaired human witness

The repaired packaged branch was then witnessed on the same Open E source at all three supported scales:

| Scale  | Human read                             | Verdict |
| ------ | -------------------------------------- | ------- |
| `1.0`  | crisp, discrete marks; **pencil**      | PASS    |
| `0.5`  | intermediate mark identity             | PASS    |
| `0.25` | softer, more dispersed; **spraypaint** | PASS    |

The important result is not that reduced scales imitate native scale. They do not.

The human verdict was stronger:

> **All three settings looked good. They were distinctly different, and they all worked.**

The `0.25` specimen was especially useful because its softness and dispersion felt intentional rather than damaged.

## Resolution Field is mark-making, not quality

The field comparison changes the meaning of the control.

It should not be framed as:

```
1.0 = good quality
0.5 = medium quality
0.25 = degraded quality
```

A better model is:

```
1.0  → pencil
0.5  → brush / marker
0.25 → spraypaint
```

Resolution changes the scale at which a mark retains its identity.

At native scale, individual particles remain particular. At lower internal scale, nearby marks merge into a more distributed medium. Rain can move from “here are rain particles” toward “the air is wet.”

> **1.0 draws particles. 0.25 draws weather.**

That is a material-state axis, not merely an optimization knob.

## Cost witness

Across the controlled `0.25 / 0.5 / 1.0` comparison, final files remained effectively the same size because the final transport stayed `1920×1080` H.264. Render-time differences were small relative to the total render duration.

For this specimen, Resolution Field therefore proved itself primarily as an **aesthetic / materiality lever**, not a meaningful compression control.

## Per-layer lawful spectra

The next useful generalization is not one global “quality” slider. It is a back-of-the-Toaster materiality control where each visual layer declares its own lawful spectrum.

Potential examples:

```
ATMOSPHERE   .25 ───────── 1.0
TYPOGRAPHY   .25 ───────── 1.0
MATERIAL     .25 ───────── 1.0
TOPOLOGY     .25 ───────── 1.0
RESIDUE      .25 ───────── 1.0
```

Each layer should eventually declare:

* minimum lawful scale;
* supported steps/range;
* invariants that must survive;
* expected perceptual consequence.

This is future render work, not a widening of PR #201.

### Typography note

Current #201 intentionally keeps baked typography native. Field discussion suggests a future lawful spectrum may also allow typography down to `0.25`.

That does not require pretending baked typography is the accessibility layer. The sidecar SRT/VTT track preserves linguistic recoverability; baked type is free to act as visual material.

> **Protect the language, not necessarily the letters.**

Again: this is a future seam, not a current implementation claim.

## Human gate closure

Resolution Field now satisfies the intended human witness:

* Atmosphere is perceptible at `1.0`, `0.5`, and `0.25`;
* all three scales are visually usable;
* reduced scales remain recognizably within the same Atmosphere family;
* final geometry remains native;
* the repaired alpha path no longer erases the effect;
* scale differences read as lawful material character rather than failure.

This closes the Resolution Field perceptual-preservation gate.

## Compression

> **An effect has not survived a transformation merely because its instructions survived.**

And after repair:

> **A lawful Resolution spectrum does not need one winner. It needs every admitted setting to remain visibly itself while becoming materially distinct.**
