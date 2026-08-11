# Haunted Toaster — Listener UX Parity Gap

Field note: the packaged Full Measure Listener UX still appears essentially unchanged despite several attempted Listener UX improvements.

This should be treated as an **integration / packaging parity problem**, not as proof that the UX ideas themselves failed.

> **A merged Listener UX PR is not field proof. The packaged appliance is the witness.**

## Known seams

### PR #98 — transport UX

PR #98 merged to `main` and intended to expose visible transport improvements such as obvious waveform seeking, drag scrubbing, current / duration display, and keyboard seeking.

Field observation: those changes have not presented themselves as expected in the packaged Listener.

That means we need a direct source → packaged-appliance parity audit rather than relying on source/JSDOM proof alone.

### PR #112 — re-listen hardening

PR #112 was merged into the `agent/lyric-resonance` base rather than `main`. Its own PR notes that it should be retargeted to `main` after #111 lands.

Therefore the current Gold Star / `main` lineage should not be assumed to contain that Listener hardening work merely because GitHub reports #112 as merged.

## Required order of operations

Before stacking the new Listener ideas on top — short-line context, vocal-biased second pass, human-anchor re-contextualization, wrong-chorus recovery, and Western-song structural priors — first make sure the Listener UX already attempted can actually reach the packaged human.

Audit and prove:

1. Which renderer/UI entrypoint and assets the Windows package actually serves.
2. Whether #98 is present, overwritten, omitted from packaging, or wired to a non-active surface.
3. Re-land/retarget useful #112 changes deliberately onto current `main`.
4. Produce a packaged Windows proof where the intended UX is visibly testable by a human.
5. Add a lightweight parity witness so future Listener UX cannot be declared landed when only source tests changed.

## Acceptance witness

The packaged Listener should make the following visibly verifiable:

* waveform seeking is obvious;
* drag scrubbing works;
* current / duration is visible;
* keyboard seeking works when Listener owns focus;
* human anchor/re-listen UX reflects explicit anchor evidence;
* re-listen feedback exposes held / recovered / lost / unresolved outcomes;
* unresolved lyrics remain unresolved unless evidence improves.

## Relationship to current field mining

Continue collecting data on:

* short-line alignment failures;
* confident-but-wrong chorus/refrain placement;
* human-anchor contextual recovery;
* vocal-biased recovery;
* `[verse]`, `[chorus]`, `[bridge]`, and related structural tags;
* inferred low-end/transient/vocal control lanes.

But treat **Listener UX parity as an integration prerequisite** before implementing the next Listener architecture.

GitHub tracking: Haunted Toaster issue **#114**. Related design/field checkpoint: **#113**.
