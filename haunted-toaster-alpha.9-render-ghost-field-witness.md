# Haunted Toaster — alpha.9 Render Ghost Field Witness

> **Status:** project-backed field witness, not implementation authority. GitHub issue #136 and PR #137 remain authoritative for the executable repair.

## Field witness — 2026-08-16

Packaged alpha.9 testing exposed three large-scale render ghosts:

* **Echo Tunnel and Circle frequently collapse into the same perceptual neighborhood.**
* **Cathedral Fan and Spiral frequently collapse into the same perceptual neighborhood.**
* **Highly compressed / distorted guitar can push the topology toward a sustained white, washed-out, overexposed field.**

The useful law emerging from the witness is:

> **Difference should survive pressure.**

A topology should remain recognizably itself under dense musical pressure, distinct topology names should produce distinct morphological behavior, and musical intensity should not erase the visual information by accumulating into white.

## Specimen context

The immediate packaged witness used alpha.9 / `visual-language-v3` and selected `cathedral-fan`. Its accepted score was already at several simultaneous numeric ceilings, including motion amplitude `1`, motion variance `1`, material imperfection `1`, and palette contrast bias `1`. The atmosphere compiler likewise recorded full response energy.

This does not prove that maximum numeric axes alone caused the whiteout. It does make the specimen a useful pressure case for tracing where repeated bright geometry is accumulated by the render graph.

## Root-cause trace

PR #137 had already isolated the Cathedral Fan / Spiral collapse: the older Cathedral compiler inherited Spiral's polar source vocabulary. The calibration branch replaces that source with a narrow Cartesian / lissajous blade so Cathedral can read as ribs and fan architecture rather than a rotated spiral family.

The new field witness exposed the analogous Echo Tunnel seam. Source inspection showed `echo-tunnel-v3` beginning from the same full-frame vectorscope vocabulary as Circle, then cloning that geometry at roughly 72% and 48% scale, perfectly concentric, before combining all three layers with `screen` blending.

The same inspection found that both Cathedral Fan and Echo Tunnel combined repeated bright topology layers with `blend=all_mode=screen`. Under dense sustained audio, that is structurally capable of turning additional geometry into additional luminance pressure instead of additional readable structure.

So the two new symptoms shared a renderer seam:

```
same bright source vocabulary
        +
repeated geometry
        +
additive screen compositing
        ↓
identity collapse + luminance accumulation
```

## Repair under PR #137

The bounded repair keeps alpha.9's deterministic authority and leaves legacy raster / visual-language-v1/v2 semantics alone.

### Cathedral Fan

* Keeps the new non-polar narrow-blade source introduced by the calibration work.
* Gives the center and side ribs explicit bounded alpha.
* Replaces screen-additive composition with alpha-preserving overlays.
* Retains the fan/rib negative-space vocabulary rather than lowering the global creative ceiling.

### Echo Tunnel

* Keeps three explicit depth planes, but gives them descending opacity with depth.
* Moves the nested planes toward an off-center vanishing axis rather than keeping them perfectly concentric.
* Greatly reduces whole-stack orbit so recession, not circular rotation, becomes the protected identity.
* Replaces screen-additive composition with bounded alpha overlays.

The intent is not to make the Toaster quieter. It is to prevent pressure from destroying morphological information.

## TDD and machine witness

The repair was captured test-first on PR #137.

**RED** — commit `dc4fddff9ff7484da93889ce7cce5e3a58a3cbcf`, Actions run `31944673414`:

* new regression contract rejects screen-additive layered composition for Cathedral Fan and Echo Tunnel;
* new Echo Tunnel contract requires explicit depth falloff and rejects perfectly concentric nested planes;
* the consolidated renderer proof failed on the new contract before production code changed.

**GREEN** — commit `bfb837ad74084bd2e55fe91f3a6a0df4fe70d4d3`, Actions run `31944776307`:

* full workflow concluded **success**;
* consolidated renderer proof passed, including actual FFmpeg frame production;
* runtime dependency audit passed;
* canonical browser renderer witness passed;
* Windows installer and portable build passed;
* Windows artifact upload passed;
* release publication was skipped as intended.

Windows test artifact: `Haunted-Toaster-Windows-31944776307`, artifact id `9263028991`, digest `sha256:09f8e18a011a626724068569d023c02d68d3c884b80ee53b99b3a84e5169106b`.

Human packaged testing remains necessary before claiming that the perceptual whiteout itself is resolved. The automated proof establishes the renderer invariant and removes the identified additive-compositing mechanism; it does not substitute for eyes on a dense-guitar specimen.

## Next field test

Use the Windows artifact from run `31944776307` and inspect:

1. Echo Tunnel versus Circle — recession / vanishing-axis behavior should remain legible.
2. Cathedral Fan versus Spiral — rib / blade / fan identity should remain legible.
3. A highly compressed or distorted-guitar source — topology should retain structure and internal contrast instead of remaining continuously white or overexposed.
4. The wider six-up — preserve genuine creature-level diversity rather than merely different labels.

## Authority and links

* GitHub issue #136 — alpha.9 calibration contract: https://github.com/the-static-collective/the-haunted-toaster/issues/136
* GitHub PR #137 — executable repair stack: https://github.com/the-static-collective/the-haunted-toaster/pull/137

This GitBook page preserves the field meaning and the inferred renderer law. GitHub preserves the executable state, tests, commits, and landing authority.
