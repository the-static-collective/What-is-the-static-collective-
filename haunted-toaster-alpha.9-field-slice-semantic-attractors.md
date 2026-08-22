---
description: >-
  alpha.9 field evidence for ghost topology, productive awkwardness, Listener
  anchor recovery, CONVERGE repair, and the next semantic-attractor frontier.
---

# Haunted Toaster — alpha.9 Field Slice: Semantic Attractors

## Status

**Field finding / design frontier.** This page does not authorize implementation by itself.

Implementation authority remains in the Haunted Toaster repository. Current code, accepted receipts, and GitHub issues outrank this notebook page when they disagree.

The important alpha.9 result is no longer simply that the Toaster has more shapes. The new visual vocabulary is beginning to carry **meaning**.

## What the first alpha.9 field runs say

### 1. Ghost topology has crossed from effect into language

The first alpha.9 specimens have now human-witnessed all three Topology Arc outcomes:

* **dissolve** — `elastic-spine` haunted by `cathedral-fan`;
* **scar** — `elastic-spine` haunted by `echo-tunnel`, leaving material residue;
* **succession** — `cathedral-fan` haunted by `elastic-spine`.

The user specifically reports the topology ghosting and shifting as one of the strongest parts of the build.

This matters because the shapes are no longer reading as interchangeable geometry. `elastic-spine`, `cathedral-fan`, and `echo-tunnel` are beginning to behave like a visual vocabulary with recognizable character.

Sparsity appears to be part of why it works. One apparition can feel consequential. Turning every section into a topology swap would flatten the mechanic back into ordinary scene transitions.

### 2. Productive awkwardness is a creative asset

The **Porchlight Siegeproof** specimen was compelling partly because its visual systems did not always agree politely.

Its base creature combined:

```
cathedral-fan
pulse motion
drift camera
gate-weave material
dust atmosphere
```

Then the Possession Arc moved through:

```
24s  camera: drift -> orbit
64s  palette: split-complement -> duotone
80s  motion: pulse -> still
```

The 80-second move is especially instructive: the music enters a release while motion becomes still and the camera keeps orbiting.

That is not smooth agreement. It is **temporary disagreement between intelligible behaviors**.

Working law:

> **Awkwardness is not noise. Awkwardness is temporary disagreement between otherwise intelligible behaviors.**

A future semantic system must preserve this. Meaning coherence should not make every axis literal, synchronized, or obedient.

### 3. The elastic-spine / lyric collision is the semantic-attractor specimen

In Porchlight Siegeproof, the Topology Arc records:

```
source: cathedral-fan
ghost: elastic-spine
entrance: 62.403s
peak: 64.000s
release: 65.597s
outcome: succession
```

Human field witness places the elastic-spine arrival directly on the sung line:

> **This is the fracture that becomes the spine.**

That feels authored because the visual vocabulary and the lyric meaning correspond almost perfectly.

But the truth boundary is important: the exported canonical subtitle track does **not** contain that line. It ends one admitted cue at `63.040s` and does not begin the next until `68.900s`.

So alpha.9 did not semantically trigger the elastic-spine from that lyric. The topology event was driven by the section/contrast boundary and happened to land on an unusually strong meaning-match.

That accident is more useful than pretending the system already understood it. It gives us a precise target:

> **Make moments like this more likely without making them compulsory.**

### 4. Listener anchor-context recovery has a promising field witness

A separate alpha.9 run, **SUDO FREE flow**, records:

* 39 lyric lines;
* 35 matched cues;
* 3 human-corrected anchors;
* zero timing warnings.

The human report was that re-listening with the Listener after giving it an anchor appeared to work substantially better.

This matters to semantic attraction because timing truth must come first. A meaning-aware visual system is only useful if it knows **when** a meaning is actually admitted.

Working authority law remains:

> **Confidence is evidence. Human anchors are authority.**

### 5. CONVERGE exposed a separate alpha.9 bug

The human workflow:

```
generate six
-> select creature
-> CONVERGE
```

produced no visible result.

Repository inspection found a plausible cause: the selected parent is passed as `parentIndex`, but CONVERGE's coverage history is built from `acceptedHistory`, which is only updated after **Use selected timeline**. A fresh selected parent can therefore be absent from the frontier history, allowing the deterministic frontier tie-breaker to select the parent's own projection and produce a no-op or near-no-op.

This has been split into GitHub issue **#133** rather than mixed with semantic-attractor work.

## The semantic seed already exists

A key discovery during this field slice is that the Toaster is **not starting semantic response from zero**.

alpha.9 already contains a narrow deterministic mechanism:

```
lyric-resonance-atmosphere-v1
```

It consumes **timed lyric cues only** and uses a small local lexicon across four atmosphere families:

```
smoke
rain
dust
firefly
```

Terms are grouped into exact / strong / related neighborhoods with bounded weights, event durations, and cooldowns. The resolved resonance plan is attached upstream to the canonical `ResolvedTimeline`, participates in timeline/family hashing, and is consumed by the atmosphere renderer as bounded resonance bursts.

A field specimen proves the path is live:

```
SUDO FREE flow
admitted lyric term: "dirt"
semantic family: dust
resonance intensity: 0.45
policy: lyric-resonance-atmosphere-v1
source: timestamped-lrc
```

So the next semantic slice is not:

> invent lyric meaning inside the renderer.

It is:

> **generalize an existing lawful Lyric Resonance primitive into cross-vocabulary semantic attraction.**

## Semantic Attractors

Working product law:

> **Lyrics do not command the picture. Meaning bends the field.**

The desired flow is:

```
canonical admitted timed cue
  -> versioned semantic evidence
  -> bounded affinity against existing visual vocabulary
  -> ordinary lawful resolver / arc policy
  -> accepted ResolvedTimeline
  -> shared preview + production execution
  -> receipt / Witness Session evidence
```

The semantic layer should never call a renderer effect directly.

### Bias, never command

Bad:

```
lyric contains "spine"
-> force elastic-spine immediately
```

Desired:

```
trusted cue expresses fracture / structure / body
+ a lawful topology event window already exists
+ elastic-spine is legal under garment + locks
+ history / sparsity budget has room
  -> elastic-spine affinity rises
  -> ordinary deterministic Topology Arc still chooses the outcome
```

The resolver may still choose something else.

### First semantic neighborhoods worth testing

**Structure / body**

`spine`, `bone`, `body`, `nerve`, `rib`, `skeleton`

Potential affinities: `elastic-spine`, structural primitive fields.

**Fracture / rupture**

`fracture`, `break`, `crack`, `split`, `shatter`, `tear`

Potential affinities: fracture motion, `split-horizon`, scar/residue outcomes, disturbed materials.

**Ghost / memory / residue**

`ghost`, `echo`, `memory`, `remember`, `residue`, `haunt`, `afterimage`

Potential affinities: topology apparition, `echo-tunnel`, scars, haunted typography.

**Opening / ascent / bloom**

`lift`, `rise`, `open`, `bloom`, `ascend`, `unfold`

Potential affinities: `cathedral-fan`, opening/expansion behavior, chromatic decompression.

**Stillness / holding**

`still`, `hold`, `wait`, `stop`, `remain`

Potential affinities: still motion, held camera, or deliberately tense disagreement with another active axis.

These are a starting vocabulary, not an ontology commitment.

## Why Topology Arc should be the first expansion target

Atmosphere Lyric Resonance already proves a small timed semantic effect.

Topology Arc is now the strongest next consumer because field testing has shown that the shape vocabulary itself carries human-readable meaning.

The semantic layer should preferably influence **which topology answers an already-lawful event window**, rather than creating more topology windows.

That preserves the alpha.9 lesson:

> apparition matters because apparition is rare.

## Guardrails

1. **Admitted timing only.** Semantic attraction may act at a canonical Listener-admitted cue or an explicit human anchor/correction that has entered the canonical lyric clock.
2. **Unresolved text owns no clock.** GitHub #97 may let unresolved words influence non-temporal creative state, but that path cannot schedule a semantic event in time.
3. **No renderer-local text inspection.** Semantic evidence resolves upstream and becomes canonical timeline evidence.
4. **Locks remain absolute.** A lyric cannot talk its way around a topology lock.
5. **Garment constraints remain absolute.** Meaning does not make an illegal visual response legal.
6. **Sparsity remains compositional authority.** Semantic evidence should rank lawful opportunities, not manufacture an effect for every interesting word.
7. **Productive awkwardness remains legal.** Meaning coherence is not total agreement.
8. **Determinism remains inspectable.** Same cue, policy, score/history, locks, and seed must produce the same semantic evidence and decision.
9. **Cloud inference is not required.** The current local lexicon is already a valid v0 substrate. Richer pinned local semantics can be evaluated later if literal neighborhoods prove too brittle.

## Relationship to current GitHub authority

* **#132 — Semantic Attractors v0**: new design/implementation frontier.
* **#133 — CONVERGE no-op regression**: separate bug slice.
* **#127 — Mutation Lattice / Shape Pack / Ghost Topology**: owns the topology vocabulary and apparition mechanics.
* **#59 — Lyric Foundry**: owns lyric preparation, anchors, and cue admission.
* **#97 — unresolved lyric influence**: owns non-temporal creative influence from unresolved text.
* **#120 — Witness Session**: future evidence chain from heard -> inferred -> admitted -> rendered -> witnessed.
* **#48 — Possession Arc**: categorical dramaturgy/history that semantic affinity may later influence without replacing.

## Field verdict

alpha.9 has produced four distinct findings worth preserving:

1. **Topology apparitions are a keeper.** The shapes have enough identity to read as events rather than mere layouts.
2. **Productive awkwardness is a feature.** Temporary disagreement can be cooler than total coherence.
3. **Anchor-context re-listening deserves continued field mining.** Human correction appears capable of improving the Listener without turning it into a subtitle editor.
4. **Semantic attraction is now reachable.** The atmosphere-only Lyric Resonance primitive already proves the narrow law; the fracture/spine coincidence shows why expanding that law into the rest of the visual vocabulary could matter.

The next semantic question is therefore not:

> Can the Toaster recognize words?

It is:

> **Can meaning become one bounded compositional pressure among music, history, Toast Feel, locks, topology, possession, color, and surprise?**

That is the frontier.
