---
description: >-
  Haunted Toaster frontier projection: keep the output canvas fixed while
  allowing deterministic internal resolution to follow attention, protection,
  topology, scene demand, and lawful mark-making.
---

# Attention Resolution / Resolution Field

Status: **bounded implementation exists in draft lineage; promotion remains human-gated**

Canonical project issue: [Haunted Toaster #197](https://github.com/the-static-collective/the-haunted-toaster/issues/197)

Canonical project design: [`2026-08-21-attention-resolution-design.md`](https://github.com/the-static-collective/the-haunted-toaster/blob/main/docs/superpowers/specs/2026-08-21-attention-resolution-design.md)

Current bounded implementation: [Haunted Toaster #201](https://github.com/the-static-collective/the-haunted-toaster/pull/201)

Current Atmosphere preservation repair: [Haunted Toaster #205](https://github.com/the-static-collective/the-haunted-toaster/pull/205)

Detailed first field witness: Resolution Field — Perceptual Preservation Witness

## Seed

The file-size problem opened a more useful door.

Haunted Toaster does not need every part of every frame to receive the same spatial precision. The final video can remain a normal fixed-size canvas while selected intermediate layers are rendered smaller and enlarged before composition.

That gives the renderer a new possible law:

> **Resolution can express attention.**
>
> Important things receive pixels. Peripheral things may relinquish them.

The Toaster may know that something exists without insisting on knowing it at full precision.

## Keep the canvas; vary the attention

The crucial distinction is between **output resolution** and **internal resolution**.

```
fixed accepted output canvas
        ↓
critical image        → native precision
protected typography → native precision
smoke / dust / bloom  → reduced internal precision when admitted
background / motion   → potentially reduced precision when admitted
        ↓
upscale reduced layers
        ↓
compose on the fixed accepted canvas
        ↓
ordinary encoded video
```

Nothing here requires a video to change dimensions mid-stream.

Instead, some parts of the world may temporarily surrender information before returning to the common canvas.

## Why this belongs in the beta ecology

The beta target already says:

> **Do not make the human specify more. Give the Toaster more lawful degrees of freedom to decide differently.**

Resolution Field fits that law only if it remains bounded by the existing execution constitution.

It cannot become a hidden encoder trick that improvises outside the accepted artifact chain. Resolution decisions must remain deterministic, inspectable, replayable, lock-safe, and shared by preview and final render.

This therefore sits downstream of creative recognition but upstream of concrete renderer execution:

```
accepted visual state
      ↓
resolved lawful resolution policy
      ↓
preview + render share the same semantics
      ↓
retained evidence says what relinquished precision
```

## Sacrifice ladder

A first policy should be conservative.

Things already tolerant of blur, entropy, or visual diffusion may relinquish pixels first:

* smoke;
* dust;
* rain;
* glow / bloom;
* grain and film debris;
* displacement fields;
* already-distorted textures;
* sufficiently peripheral or high-motion imagery.

Protected material stays exact unless explicitly admitted otherwise:

* typography;
* locked anchors;
* declared focal subjects;
* detail-critical linework;
* any renderer path that cannot prove safe reduction.

This is not a universal ontology. It is a first sacrifice order for experimentation.

## First proof: small before spooky

The first implementation should **not** be scene-wide adaptive resolution.

Use one isolated atmosphere/effect lane and permit only three internal linear scales:

```
1.00
0.50
0.25
```

Render the effect smaller, enlarge it back onto the native canvas, keep critical layers native, and compare the result against a full-resolution control.

The witness should report:

* render cost;
* output bytes;
* visible quality;
* retained evidence of the chosen scale;
* preview/render parity;
* legacy compatibility;
* any path that had to refuse reduction and remain native.

Pixel-count reduction is not assumed to map linearly to encoded file size. The experiment exists to measure what actually happens.

## First field lesson — execution is not survival

The first packaged Dust witness passed structural execution and failed perceptual preservation. The receipts truthfully proved Atmosphere generation, Resolution scale, graph execution, and native output geometry while the human truthfully reported that Dust had effectively disappeared.

That specimen is preserved in the child witness page rather than collapsed into this overview.

Its portable law is now part of the Resolution boundary:

> **A receipt can prove that an effect existed in computation without proving that the effect survived into experience.**

When reduced precision changes a visible medium, perceptual preservation is therefore a distinct witness obligation rather than an inference from successful execution.

## Field refinement — resolution is mark-making

The Atmosphere preservation repair made the comparison useful again. A controlled repaired package held source, score address, timeline hash, Atmosphere content hash, and resonance events constant while varying only the internal Resolution Field scale.

The human witness preferred `.25` to `.5`: the lower-resolution Dust felt softer and more dispersed.

A useful field metaphor emerged:

* `1.0` = **pencil** — discrete marks retain identity;
* `.5` = intermediate mark-making;
* `.25` = **spraypaint** — neighboring marks disperse and merge, beginning to read as a medium rather than individual particles.

This sharpens the original Attention Resolution idea. Lower internal resolution is not necessarily a cheaper or worse copy of the same effect. Under a lawful bounded compositor, it can become a distinct rendering medium.

The stronger working law is:

> **Internal resolution is both precision allocation and mark-making.**

That finding does not authorize automatic aesthetic judgment. It identifies a real creative degree of freedom that future accepted creative state may lawfully control if the project later admits such a policy.

## The creative door beyond optimization

If the bounded proof works, resolution becomes expressive rather than merely economical.

### Possession collapse

A possession arc could progressively lose spatial precision until the world appears unable to hold itself together.

### Memory residue

A topology transition might briefly resemble an overhandled JPEG or a half-remembered image before resolving again.

### Lyric focus

A lyric arrival could cause the image to resolve around it while the periphery remains coarse.

### Protected object

One subject could remain perfectly exact while the surrounding world relinquishes pixels.

### Motion economy

Frantic motion may need less spatial detail; stillness may call detail back into the world.

At that point, resolution is no longer a quality setting. It is another field the Toaster can inhabit.

## Naming split

**Attention Resolution** names the human-facing intuition: precision follows attention.

**Resolution Field** names the deeper primitive: spatial precision may vary across layers or bounded time under explicit law.

Keeping both names is useful because the first explains the experience while the second leaves room for implementation to evolve.

## Boundary

This frontier projection does not authorize code by itself.

Haunted Toaster issue #197 and the landed project design own the primitive. PR #201 owns the current bounded Resolution implementation; PR #205 owns the current Atmosphere alpha-preservation repair. Both remain subordinate to their explicit project-side human/provenance gates.

Scene-wide adaptive behavior, automated quality judgment, renderer-local improvisation, typography downscaling, or retroactive reinterpretation of old artifacts remain outside the admitted world.

The field finding that `.25` may be aesthetically preferable to `.5` is evidence of a creative degree of freedom, not permission for the renderer to choose secretly.

## Compression

> **Locks decide what must remain exact. Resolution law decides what may lawfully become coarse. Field witness proves whether the resulting mark survived into experience.**

The interesting outcome is not merely a smaller render. It is a renderer that can spend precision where the world says precision matters — and can let surrendered precision become a visible medium rather than only a cost reduction.
