# Haunted Toaster — Magnetic Crop Invariant Isolation

**Checkpoint:** 2026-08-15\
**Canonical implementation authority:** GitHub issue [#116](https://github.com/the-static-collective/the-haunted-toaster/issues/116) and repair PR [#134](https://github.com/the-static-collective/the-haunted-toaster/pull/134)\
**Parent alpha.9 test/package gate:** [#131](https://github.com/the-static-collective/the-haunted-toaster/pull/131)

This checkpoint records the transition from a recurring native-crash hypothesis to an executable renderer invariant and bounded repair. It does **not** close the appliance-level witness gate.

## Field convergence

Four independently preserved packaged Windows failures now converge on the same primitive dynamics compiler and nearly the same native death window:

* Humble Genius — `dynamics-magnetic-v1`, native `0xC0000005`, about 4.27 s;
* Banana Elf — `dynamics-magnetic-v1`, native `0xC0000005`, about 4.20 s;
* Self Writing Code — `dynamics-magnetic-v1`, native `0xC0000005`, about 4.29 s;
* DOOM JESUS — `dynamics-magnetic-v1`, native `0xC0000005`, frame 80 / 4.266667 s.

The specimens differ materially in song, source image, topology, primitive structure, camera/motion/material state, and atmosphere. `dynamics-magnetic-v1` is the repeated frame-zero-active seam.

The recurring `swscaler` deprecated-pixel-format warnings remain spectators rather than the root-cause verdict: successful renders use the same broad media/transport path, while the process disappears without a normal FFmpeg filter error.

## The violated invariant

Before the repair, magnetic dynamics emitted a fixed pre-expansion of `1.1×` followed by a per-frame oscillator:

```
0.94 + 0.06*sin(t*0.83)
```

The oscillator reaches a minimum scale of:

```
0.94 - 0.06 = 0.88
```

Therefore the minimum effective source size was only:

```
1.1 * 0.88 = 0.968
```

At a 1920×1080 Witness Window, the dynamic source could contract to approximately:

```
1858.56 × 1045.44
```

while FFmpeg was still commanded to crop a fixed 1920×1080 frame.

The first downward crossing of the crop boundary occurs at approximately **4.44 seconds**, tightly matching the repeated packaged native deaths at roughly 4.20–4.29 seconds.

The stronger law is therefore:

> **Any time-varying source feeding a fixed crop must prove its minimum animated dimensions remain at least as large as that crop.**

## TDD isolation

Repair branch: `fix/magnetic-crop-invariant`\
Repair PR: [#134](https://github.com/the-static-collective/the-haunted-toaster/pull/134)

### RED

Head `ece72ceca94d55db8db0731f9a91dbf518f1ce51`, Actions run `31880108079`:

* Full Measure source check: 144 scripts passed;
* 291 existing tests passed;
* exactly one new regression failed;
* failure: `magnetic minimum width 1858.5599999999997 must cover crop width 1920`.

The test observes the emitted production magnetic program and proves its oscillator lower bound cannot shrink either dimension beneath the fixed crop.

### GREEN

Repair head `eef20b3c681908565a87d23d7fe1ad590f1d2815`:

* Full Measure source check: 144 scripts passed;
* tests: **292/292 passed**;
* `magnetic dynamics never shrinks below the fixed crop`: PASS;
* full 12-second production render smoke: PASS with 0 ms duration delta;
* optional-image + MP3 stream-copy smoke: PASS;
* candidate six-up smoke: PASS;
* runtime dependency audit at high threshold: 0 vulnerabilities;
* browser renderer witness: PASS.

## Bounded repair

The magnetic oscillator and its visual grammar remain unchanged. Only the required pre-expansion is derived from the known lower bound plus a 1% crop safety floor:

```js
const minimumScale = 0.94 - 0.06;
const cropSafety = 1.01;
const expansion = cropSafety / minimumScale;
```

This preserves:

* `dynamics-magnetic-v1` compiler identity;
* the existing `0.94 + 0.06*sin(t*0.83)` breathing law;
* the existing magnetic x/y movement;
* score/timeline meaning and replay semantics.

It does **not** introduce a topology ban, random retry, candidate suppression, `swscaler` workaround, or second renderer policy.

## Packaged repair candidate

Ready-for-review Actions run `31880364609` proved PR merge ref `c39422bff3e3e05f278f1e07c6efae3b72d578a5`, composed from repair head `eef20b3c681908565a87d23d7fe1ad590f1d2815` over current alpha.9 head `fd0861f2a4e61d5f5bf753e7e2f6d4b928033804`.

The run passed renderer verification, browser witness, and Windows packaging. GitHub release publication was skipped as intended.

Windows artifact:

* `Haunted-Toaster-Windows-31880364609`;
* artifact id `9245899543`;
* digest `sha256:b67f442bc090c6ea254d3600a556759a1703264f0fabf4e78af10c5f3b37f9e5`;
* `Haunted-Toaster-0.5.0-alpha.9-x64-Setup.exe`;
* `Haunted-Toaster-0.5.0-alpha.9-x64-Portable.exe`.

This is a **machine package witness**, not yet the native causal field witness.

## Remaining appliance witness

Source/CI proof now establishes both the invalid invariant and the bounded code repair. Native Windows causality remains deliberately open until a human runs the repaired package with a `magnetic` candidate beyond the former \~4.44-second danger boundary—preferably through a complete render.

Until that witness exists:

* keep issue #116 open;
* keep PR #134 unmerged pending the desired integration decision;
* do not claim the historical `0xC0000005` failure closed at the appliance layer;
* do not merge, tag, or release alpha.9 merely because the repair branch is green.

The next evidence should be a **magnetic packaged render**, not another random non-magnetic success.

## Field law

The original failure-evidence investment paid off exactly as intended:

> **Preserve the failed performance before trying to teach it not to fail.**

The preserved score, timeline, graph, FFmpeg arguments, stderr, build identity, and progress evidence made a recurring native crash reducible to one executable geometric invariant rather than a speculative FFmpeg workaround.
