# Haunted Toaster — Gold Star Field Checkpoint

A field checkpoint captured before changing the response law again.

## Why preserve this moment

The **Gold Star** run (`6. Dreamstate Divide.wav`) was the strongest visual result yet. It is useful not merely as a successful render, but as a reference creature: the current composer can already make something nuanced, changing, internally active, and surprising without collapsing into random scene-switching.

Known-good build:

* Full Measure `0.5.0-alpha.7`
* commit `1472ddb061c471884f9f01be1f3355edc96cdee6`
* frozen GitHub reference branch: `archive/gold-star-renderer-alpha7`
* 26 lyric lines; 26 matched; 2 human corrections
* six ordinary timeline patches
* three Possession Arc transitions
* six color-drift stops
* quad-mirror topology
* firefly atmosphere

**Preservation law:** experimental response changes must retain a clean route back to this renderer behavior.

A future implementation may expose the preserved renderer as an advanced/backend compatibility profile, but the first act is simpler: keep the exact known-good tree alive while experiments continue.

## What not to disturb

The current six-up diversity is working unusually well. It now creates the feeling of an ongoing exchange: another six suggests another route rather than six cosmetic variants of the same answer.

Do not rewrite the diversity engine as part of the next experiments unless field evidence specifically indicts it.

## Compression Pressure

A mastered song with a narrow surviving dynamic range should not automatically produce visually flat low-energy behavior.

Derive a deterministic bounded **Compression Pressure** from measured dynamic spread (conceptually, inverse percentile RMS spread rather than an attempt to infer the literal mastering compressor settings).

Compression Pressure should do two things at once:

1. **Raise the internal response floor.** A heavily squashed song stays more continuously alive during nominally low-energy passages.
2. **Magnify local surviving deltas.** Small remaining dynamic changes receive larger meaningful internal gestures because those changes may carry more of the song's available expressive information.

Constraints:

* true silence remains zero;
* preserve upper headroom;
* smooth the measurement so sub-second/RMS jitter does not become nervous twitching;
* primarily influence topology and primitive-field response;
* keep camera secondary to internal motion;
* wide-dynamic recordings should preserve real hush and large peak contrast.

Working law:

> **When little dynamic information survives, listen harder to what survived.**

### Branch thought: event salience and inferred control lanes

For loud or highly compressed songs, obvious musical events such as snare, kick, and bass hits should remain **significantly visible** instead of disappearing into a permanently raised activity floor.

Explore analysis-only inferred control lanes rather than literal separated stems:

* low-end / bass-pressure evidence;
* transient / percussion evidence;
* vocal-presence evidence;
* sustained harmonic/body evidence;
* optional high-frequency/noise/air evidence.

These lanes are control evidence, not a claim that true stems have been recovered.

## Listener: short-line context

Repeated field behavior suggests lyric line length or lexical distinctiveness may be a major predictor of Listener success.

Observed working hypothesis:

* short lines fail disproportionately;
* longer phrases align much more reliably.

The scrubber should not rewrite or merge canonical lyrics. Instead, short/low-information lines may temporarily borrow bounded neighboring lexical context **for matching only**. Recovered timing is then projected back onto the original line.

Constraints:

* canonical lyric text stays unchanged;
* human anchors remain authoritative;
* contextual evidence is bounded to neighboring lines;
* weak evidence remains unresolved rather than gaining invented timing;
* record line length / context-use evidence so the hypothesis can be tested instead of silently baked in forever.

## Listener: anchor-context re-listen, vocal-biased recovery, and musical structure

This is deliberately a **deferred hardening slice**. Mine more field data before fixing thresholds, retry-window sizes, or section heuristics.

### Authority law

> **Confidence is evidence. Human anchors are authority.**

A machine placement may be highly confident and still land in the wrong repeated chorus or refrain. When a human corrects a cue, that correction changes the Listener's temporal context and should reopen nearby **machine-owned** placements for another chance.

Re-listen behavior:

* human-adjusted cues become hard temporal anchors;
* another human anchor must never be moved by re-listen;
* the corrected anchor re-contextualizes the machine-owned span on both sides until the nearest human anchors or song boundaries;
* prior machine confidence does not immunize a placement from reconsideration inside that newly bounded span;
* receipts should preserve old → new placement evidence and the reason for re-listen.

### Voice-biased second pass

Second-pass recovery should be surgical rather than replacing the current Listener:

* build a temporary **vocal-salience lens** for the bounded retry window;
* emphasize likely human-vocal intelligibility while reducing obvious low-bass/extreme-high interference where useful;
* use this for unresolved/review lines and for machine-owned neighbors reopened by a human anchor correction;
* do not call the result a true vocal stem;
* accept a new placement only when sequence/context evidence improves; otherwise remain unresolved.

Short-line contextualization and the vocal-biased lens should compose: a short line may borrow bounded neighboring lexical context while the Listener re-hears the correct human-anchored region.

### Basic Western-song structural prior

The Listener should understand common Western song structure as a **soft prior**, never as compulsory form.

Structural lyric tags such as `[verse]`, `[verse 2]`, `[chorus]`, `[pre-chorus]`, `[bridge]`, `[intro]`, `[outro]`, and similar tags should survive scrub/preparation as **non-rendered structural evidence** instead of being discarded before they can help alignment.

Build three structural witnesses:

1. **Declared structure** from lyric tags.
2. **Inferred structure** from audio recurrence, section boundaries, phrase/pulse regularity, and related measured evidence.
3. **Human anchors** as temporal authority.

Working law:

> **Tags suggest the map. Audio tests the map. Human anchors place the map.**

Prefer a hybrid structural representation:

* canonical audio structure can remain neutral (`A / B / C / A′` or equivalent);
* familiar labels such as Verse / Chorus / Bridge attach as declared or best-effort semantic annotations;
* disagreements between tag and audio remain explicit evidence rather than a silent overwrite;
* atypical forms — through-composed, drone, prog, live jam, and other structures — remain legal.

Wrong-chorus recovery is a primary target: repeated lyric/audio regions should be distinguished by sequence position and neighboring human anchors, not acoustic similarity alone.

A future renderer may also benefit from the structural map — for example, a returning chorus could return visually as a **descendant rather than a reset** — but Listener authority and renderer behavior should remain separate concerns.

### Data to mine before implementation

Use upcoming field runs to collect:

* line length / lexical distinctiveness versus match outcome;
* confident-but-wrong repeated-section placements;
* whether human anchor corrections improve neighboring machine placements;
* lyric tag availability and reliability;
* audio recurrence agreement with declared Verse / Chorus / Bridge tags;
* whether a vocal-biased retry improves difficult lines;
* low-end/transient inferred-lane usefulness for Listener recovery and visual event salience.

Do not tune this machinery from one specimen. Let thresholds emerge from receipts and field evidence.

## Seven Toast Feels

The current visible Porchlight / Wire Orchard / Absolute Residual trio feels too narrow: a three-color rainbow.

Explore a new visible starting-field layer of **Seven Toast Feels**:

* six small custom toast icons with moods visibly burnt into them;
* one larger seventh toast representing the true **MADD CLOWN CRAZY SLOTS** state;
* each of the six moods biases generation rather than dictating a preset;
* the seventh should likely reuse the existing lawful STOMP / outer-rail machinery rather than inventing renderer randomness.

Ontology:

> **Toast Feel biases the creature. It does not dictate the creature.**

Naming should remain suggestive but partly mysterious. Names such as **Risky hybrid** are useful precisely because they point somewhere without fully explaining themselves. To an outsider they are allowed to sound like potential nonsense. That ambiguity is part of the invitation.

## Field specimen — Crooked Handle

The **Crooked Handle** run (`6. Crooked Handle.wav`) is a second strong checkpoint on the same preserved alpha.7 renderer. Subjectively it was another standout video despite being a quieter, more relaxed song.

Build/result evidence:

* Full Measure `0.5.0-alpha.7`
* commit `1472ddb061c471884f9f01be1f3355edc96cdee6`
* 162.48 second PCM WAV source
* accepted output
* full timeline covered
* continuous filter graph
* Witness Window verified
* output duration delta: 46 ms

### Listener result

This was an especially strong recognition specimen:

* 52 lyric lines
* **52 / 52 matched**
* 2 review
* **0 human corrections**

This strengthens the case that the current recognition/alignment path can already be package-worthy when the specimen cooperates. Mine the failures before changing recognition itself.

### Renderer result

The most interesting fact is that the resolved timeline spent **zero ordinary mutation entropy**:

* ordinary patch count: 0
* entropy spent: 0

Yet the higher-level composition laws still created substantial movement and development:

* spiral topology
* lattice / swarm primitive field
* smoke atmosphere
* base motion `still`, amplitude about `0.425`
* base temporal density `frozen`
* three Possession Arc transitions
* five color-drift stops
* motion `still → fracture` at 45s
* palette `analogous → garment` at 125s
* camera `push → orbit` at 146s
* lyric resonance found `rain` and produced one rain-family resonance event inside the smoke atmosphere

The result is useful evidence that the renderer does not require constant mutation to avoid boredom. Its existing structural laws can carry a restrained initial state into a vivid result.

### Dynamic-range evidence

Crooked Handle supports the Compression Pressure hypothesis while also arguing **against rushing a renderer change**.

Its section analysis contains substantial internal contrast:

* Opening: `0.3087`
* Lift: `0.7579`
* Release: `0.5641`
* Lift: `0.8447`
* Release: `0.5065`
* Final form: `0.8521`

A quieter/chiller song with usable internal contrast already **popped** under the current response law. This suggests the existing renderer is sensitive to relative musical shape.

However, normalized section energy alone does not prove the proposed mastering-aware Compression Pressure formula. Before calibrating low-floor lift or local-delta magnification, compare absolute surviving dynamic spread — for example RMS percentile spread — across multiple loud/squashed and quiet/dynamic specimens.

### Package-release implication

Crooked Handle narrows the near-term package scope:

1. **Hold the renderer.** Preserve Gold Star / Crooked Handle behavior.
2. Prioritize **Listener UI and re-listen ergonomics**.
3. Prioritize **Seven Toast Feels / Toast Moods**.
4. Keep Compression Pressure, inferred control lanes, structural Listener priors, and vocal-biased re-listen in the field-data queue until more receipts accumulate.

This specimen strengthens the package-release case more than it argues for another visual feature.

## Field specimen — Air Moved / “Dr. Spaceman” case

The **Air Moved** run (`5. Air Moved.wav`) is a useful contrast specimen. Subjectively it was **simple but nice** and felt like a louder song, but its visual dynamic range felt flatter than Crooked Handle. Treat the loudness classification as field observation until receipts expose absolute loudness / dynamic-spread measurements directly.

Build/result evidence:

* Full Measure `0.5.0-alpha.7`
* commit `1472ddb061c471884f9f01be1f3355edc96cdee6`
* 261.04 second PCM WAV source
* accepted output
* full timeline covered
* continuous filter graph
* Witness Window verified
* output duration delta: 40 ms

### Listener result: useful partial knowledge

The lyric result was partial rather than complete:

* 78 input lyric lines
* 20 matched / timed
* 8 review
* 0 human corrections
* 20 subtitle cues in the final output
* provenance mode: `listened-partial`

The important appliance result is that the unmatched remainder **did not interfere**. The run could still proceed as effectively a one-click process with only the known timing represented. This is a useful positive specimen for the existing “prefer unresolved over invented timing” law.

### Dynamic-response finding

Air Moved makes the loud-song / dynamic-range hypothesis more concrete.

Its base VisualScore began with:

* motion grammar: `fracture`
* motion amplitude: **`1.0`**
* motion variance: `0.04`
* transient density: `0.849181`
* topology: linear
* primitive field: branches / oscillation

The resolved timeline then kept **fracture motion across the entire 261-second song**. Its three Possession Arc transitions were spent elsewhere:

1. camera `locked → drift` at 31s;
2. palette `garment → analogous` at 77s;
3. material `photocopy → grain` at 204s.

Color Drift still supplied seven section-relative stops, so the video was not static. But the main motion axis entered at its nominal amplitude ceiling and never gained another categorical motion state.

This suggests a specific failure mode worth testing:

> **A loud or dense song may enter the renderer already near the motion ceiling. It can remain visually active yet feel dynamically flat because peaks and discrete hits have too little remaining headroom.**

That refines Compression Pressure into three separate response responsibilities:

1. **baseline continuous activity** — avoid dead-looking low-energy passages;
2. **local/event salience** — snare, kick, bass, and other surviving attacks should punctuate visibly;
3. **peak headroom** — do not spend the entire response range merely establishing that the song is loud.

Do not solve this by globally reducing the renderer. Crooked Handle showed that the current mapping can exploit spacious musical contrast extremely well. Instead, mine whether dense/loud specimens repeatedly saturate motion early and whether inferred transient / low-end control lanes can preserve discrete event punctuation above a bounded baseline.

### Data-mining implication

The current specimen sequence now suggests a useful comparison set:

* **Crooked Handle:** quieter / more spacious field impression → strong visual contrast and pronounced POP.
* **Air Moved:** louder / denser field impression → visually good, but flatter dynamic range; base motion already `fracture @ 1.0`.

This is increasingly consistent with the Compression Pressure hypothesis, but normalized section-energy values still cannot prove mastering compression. Add absolute surviving dynamic-spread evidence before calibrating the response law.

### Release implication

No release-scope expansion is justified by this specimen. The near-term line remains:

**hold renderer → fix Listener UI → Toast Moods → package candidate**

Compression Pressure, inferred control lanes, structural Listener priors, and vocal-biased re-listen remain in the evidence-mining queue.

## Field verdict

Gold Star, Crooked Handle, and Air Moved argue for preserving the current visual composer while improving the interfaces and evidence around it.

The new contrast case adds a targeted hypothesis rather than a reason to rewrite the renderer: **dense songs may be spending response headroom too early.**

Near-term priorities remain:

* better Listener UI and re-listen ergonomics;
* Toast Moods / Seven Toast Feels;
* preserved six-up diversity;
* durable known-good renderer checkpoint;
* continued field mining before Compression Pressure or deeper Listener behavior is tuned.

GitHub implementation / tracking slice: Haunted Toaster issue **#113**.
