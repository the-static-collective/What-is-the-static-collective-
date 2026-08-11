# alpha.7 Field Verdict — Build Forward From Here

The alpha.7 field run has crossed an important threshold: the visual composer no longer needs to prove that it can make genuinely strong work. The next version should build from the known-good renderer rather than treating that renderer as an unresolved experiment.

> **alpha.7 has earned the right to become the thing we build forward from, instead of the thing we keep proving.**

## What the field run proved

Across unrelated songs, the renderer produced strong specimens from several different macro grammars: spiral, circle, mirrored-ring, quad-mirror, Atmosphere, Primitive Field, Possession Arc, Color Drift, restrained camera, stillness, pulse, orbit, fracture, material shifts, and chromatic shifts.

The recurring strength was not constant novelty. It was **staged structural development**:

* withhold first;
* let topology and Atmosphere establish identity;
* spend material, palette, motion, and camera changes at meaningful boundaries;
* preserve enough contrast for later events to matter;
* let residue and restraint carry sections between large decisions.

This strengthens the existing law:

> **Cool is an event with preparation and consequence.**

## The entropy observation, corrected

Several of the best alpha.7 specimens used:

```
ordinary patchCount = 0
entropySpent = 0
```

That initially looked like a direct quality signal. It is not.

**Thirteenth Circle** was the necessary counterexample: it also used zero ordinary patch entropy, but its `linear-v1` topology did not have enough behavioral vocabulary to make restraint interesting.

Conversely, **let no one go** was strongly successful with a modest amount of ordinary patching.

So the durable law is:

> **Low meddling is excellent when the base grammar is expressive. Restraint cannot rescue an under-articulated topology.**

And:

> **Ordinary patch entropy is support, not a quality target.**

The goal is not zero entropy. The goal is a composition coherent enough that local mutation is only used when it helps the larger phrase.

This is also why **Linear v2 / Elastic Spine** matters: Linear should remain simple in topology while gaining enough internal behavior to make quiet and restraint expressive.

## The Listener is now the obvious weak instrument

The same field run repeatedly produced strong visual artifacts from partial lyric evidence. That is encouraging for renderer robustness, but it also exposed a serious epistemic problem in Listener metrics.

Observed behavior included:

* many canonical lyric lines left unmatched;
* some cues labeled `matched` landing at the wrong musical moment;
* good renders surviving even when only a minority of supplied lyric lines were admitted;
* semantically correct lyric text potentially becoming temporally wrong downstream evidence.

Therefore:

> **Matched is not the same as correctly placed.**

> **A Listener match is a hypothesis about timing, not timing authority.**

The future evidence model should distinguish conceptually:

```
recognized text
  -> candidate placement
  -> trusted placement
  -> human anchor
```

Exact schema names may differ. The distinction is the important part.

### Human correction should become measurable evidence

A corrected cue should preserve more than a boolean or count.

At minimum retain:

```
machineStartMs
humanStartMs
deltaMs = humanStartMs - machineStartMs
```

This allows field evidence to answer whether the Listener is systematically early or late and whether correction magnitude correlates with short lines, repeated sections, vocal density, or other conditions.

Do not tune a global offset from one specimen. Mine the distribution first.

### Semantic timing guardrail

Lyric Resonance makes the distinction especially important:

> **Lyric meaning may be correct while lyric timing is untrustworthy.**

A correctly recognized word attached to the wrong moment can create a perfectly lawful Atmosphere response at the wrong musical time.

Semantic lyric features must therefore continue to depend on admitted timed evidence rather than recognition alone.

The product goal for the next Listener pass is not to pretend recognition is better than it is. It is to make the Listener **teachable, inspectable, and non-destructive**.

## Reproducible native render crash

One selected alpha.7 candidate produced a reproducible native FFmpeg failure on Windows. Two retries of the same candidate died with exit code `3221225477` at approximately the same media time, around 4.2 seconds. A different candidate on the same appliance/input path rendered successfully.

Treat this as a candidate/filter-graph interaction until isolated.

The immediate flaw is diagnostic: current failure cleanup removes the generated filter graph and temporary evidence, while the surfaced process error retains only a small stderr tail.

The first fix should therefore be **evidence preservation, not renderer behavior change**.

A compact failed-render bundle should retain:

```
failure.json
render.ffgraph
visual-score.json
resolved-timeline.json
ffmpeg-args.json
ffmpeg.stderr.log
```

with build identity, hashes, compiler identities, source media probe metadata, exit code, and last rendered media time.

Do not preserve a huge partial video by default.

> **Preserve the failed performance before trying to teach it not to fail.**

## v-next boundary

The next version should remain deliberately narrow.

### Near-term release line

1. **Hold the alpha.7 renderer and six-up diversity as known-good behavior.**
2. **Harden the Listener review/correction surface and timing evidence.**
3. **Add Toast Feels as a richer bias/mood entry surface.**
4. **Preserve failed-render crash evidence and isolate the native FFmpeg seam.**
5. **Package the next candidate only after those seams are stable.**

### Do not collapse the research stack into one release

The deeper composition work remains valid and should continue deliberately:

* Compression Pressure
* dynamic camera response
* Native Color Witness / Chromatic Decompression
* Haunted Memory
* Fallible Witness / Witness Fidelity
* Closed Witness Loop
* Linear v2 / Elastic Spine
* Visual Phrasing / tension and release

These are not discarded. They are **staged**.

The known-good renderer is now valuable enough that new expressive laws should earn their way in without destabilizing the field-proven behavior.

## Final field law

The visual machine is no longer waiting for permission to be called a composer. The work now is to make its listening, failure evidence, and human teaching surface catch up with what the renderer can already do.
