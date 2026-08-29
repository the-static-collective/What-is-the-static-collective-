# Groove Rooms — STORYSHIP Embarkation Port

> **Status:** incubating direct seam / design coordinate, not runtime integration

Groove Rooms already has a useful native relationship to STORYSHIP 001.

The cleanest description is:

> **Groove Rooms is an Embarkation Port for STORYSHIP: a place where lived musical encounter becomes attributable boarding evidence without becoming voyage authority.**

The relationship should be direct, but sovereignty must remain asymmetric.

```
GROOVE ROOM
append-only encounter field
  ↓
room-local proposal / admission / refusal
  ↓
bounded boarding projection
  ↓
STORYSHIP 001
REALITY + MEMORY + OPEN BERTH
  ↓
Suno twin birth / voyage
  ↓
Haunted Phonography customs
```

Groove Rooms may help determine **what actually happened in the room**.

It may not determine:

* what STORYSHIP's narrative means;
* which Suno sibling continues;
* what Haunted Phonography admits;
* whether a room event becomes ancestry;
* whether recognition becomes canon;
* whether a refusal later becomes acceptance.

## Why Groove Rooms fits unusually well

Groove Rooms is already built around an append-only shared event field rather than a chat transcript or mutable mix document.

Its native room semantics distinguish:

* participant and channel identity;
* chronological event sequence;
* artifact references;
* branch context and parent event;
* recognition outcomes;
* proposed versus admitted/refused contribution;
* protected silence;
* rendered mix as a view rather than the source of truth.

That makes it a plausible **pre-voyage encounter substrate** rather than another storytelling layer.

STORYSHIP's transfer packet already expects three layers:

```
REALITY
MEMORY
OPEN BERTH
```

Groove Rooms can contribute to all three without owning any of them globally.

***

## The boarding projection

The direct seam should not copy the entire room database into STORYSHIP.

Instead, STORYSHIP should consume a bounded projection of one declared room context.

Conceptually:

```
BOARDING_PROJECTION(room, branch, cut)
```

with attributable source references and an exact cut/head so later room activity cannot silently rewrite what boarded.

### REALITY contribution

The projection may truthfully carry facts such as:

* room / branch identity;
* exact event IDs and sequence range;
* participant/channel attribution;
* artifact hashes or references where available;
* proposal → admission/refusal relationships;
* recognition outcomes as recorded outcomes, not objective truth;
* protected silence declarations;
* selected source time ranges;
* exact projection timestamp / source cut.

These remain room testimony.

### MEMORY contribution

STORYSHIP may choose bounded room residue as cargo:

* admitted musical landmarks;
* recognition history;
* branch scars;
* refused proposals as refusal residue;
* recurring relationships or tensions;
* artifact references;
* explicit unresolved questions;
* named absences.

A refused proposal may board only **as the fact/residue of refusal** unless some later local event separately changes its status.

```
refused cargo residue
!=
admitted room state
!=
STORYSHIP authority
```

### OPEN BERTH contribution

Groove Rooms can expose unresolved room topology that STORYSHIP deliberately leaves open for Suno to answer.

Examples:

* a branch whose relation remains unresolved;
* a recognized tension without prescribed realization;
* a question raised in-room but not answered;
* two neighboring motifs with no decided synthesis;
* an intentionally incomplete narrative relation.

The rule is:

> **OPEN BERTH is permission for the voyage to encounter an unresolved region, not permission to overwrite a protected one.**

***

## Protected silence is not Open Berth

This distinction is load-bearing.

Groove Rooms has a native protected-silence invariant. A protected interval survives branch ancestry and causes overlapping proposals to be refused.

That cannot be reinterpreted by STORYSHIP as "empty space Suno should fill."

```
PROTECTED SILENCE
= attributable constraint / non-entry

OPEN BERTH
= attributable unresolved possibility
```

Therefore:

```
protected silence → REALITY constraint
protected silence → maybe MEMORY as meaningful absence
protected silence ↛ OPEN BERTH
```

This gives STORYSHIP a strong negative-space control: it can carry the difference between **unknown**, **unresolved**, **refused**, and **deliberately silent**.

***

## Recognition remains testimony

Groove Rooms currently records recognition outcomes such as `rings`, `nearby`, `projection`, and `no`.

Those may be useful STORYSHIP memory, but they remain attributable room judgments.

```
rings
!=
ancestry proven

nearby
!=
future boarding required

projection
!=
source property

no
!=
global extinction
```

A STORYSHIP packet may say:

```
"participant X recorded RINGS for event E"
```

It may not silently compress that into:

```
"E is a true descendant"
```

## Mixes remain views

Groove Rooms already states that a mix is a view, never the source of truth.

That is exactly the right STORYSHIP boundary.

A rendered mix may board as an artifact/view with an attributable source cut, while the append-only event field remains the stronger source testimony.

This prevents:

```
mix sounds coherent
→ therefore room history was coherent
```

and prevents later remixing from rewriting the historical boarding cut.

***

## Suggested first executable specimen: EMBARK-001

Do not build a broad integration first.

Use one room, one branch, one bounded source cut, and one no-spend STORYSHIP Transfer Packet.

### Case A — lawful boarding

Room contains:

* one admitted artifact/event;
* one recognition receipt;
* one unresolved branch/question.

Projection maps them respectively into:

```
REALITY
MEMORY
OPEN BERTH
```

without authority transfer.

### Case B — refusal residue

Room contains a refused proposal.

STORYSHIP receives the refusal and its reason as history but cannot treat the proposal as admitted cargo.

### Case C — protected silence attack

A malicious or naive adapter tries to map protected silence into OPEN BERTH.

The seam must refuse the mapping.

### Case D — stale cut

The room changes after the boarding cut.

Replaying the old projection must preserve the old cut exactly rather than silently importing later room history.

## Ownership boundary

The clean implementation topology is likely:

```
Groove Rooms
  owns room events, local admission, branch projection, source cut

STORYSHIP
  owns mapping from bounded room testimony into
  REALITY + MEMORY + OPEN BERTH

Haunted Phonography
  owns destination customs / admission
```

Avoid importing STORYSHIP's narrative ontology into Groove Rooms.

Avoid making Groove Rooms generate a voyage verdict.

The direct seam is a **declared witness channel**, not a merged runtime.

## Why this is more than plumbing

STORYSHIP's source world is not only a pile of old songs. It is a history of encounters around music.

Groove Rooms can let a live human/agent band encounter that material in an append-only room before departure, producing attributable relations that did not exist in the archive alone.

That creates a lawful new passenger class:

> **not merely “a thing from the old corpus,” but “a thing encountered together before departure.”**

The encounter can become STORYSHIP memory without becoming automatic selection authority.

That is a materially richer boarding process.

## Source roads

* [Groove Rooms repository](https://github.com/the-static-collective/groove-rooms)
* [Band Runtime repository](https://github.com/the-static-collective/band-runtime)
* [STORYSHIP 001 owner spec](https://github.com/the-static-collective/the-haunted-phonography/blob/main/docs/superpowers/specs/2026-08-24-storyship-001-the-door-design.md)
* [Declared Witness Channels](../../../../frontier/primitive-incubator/research-packet-c-witness-knowability-and-observer-local-epistemics/declared-witness-channels.md)
* [Crossing Discipline](../../../../frontier/primitive-incubator/research-packet-a-crossing-consequence-and-local-constitution/crossing-discipline-no-unaccounted-consequence/)
* [Continuity Witness](../../../../frontier/primitive-incubator/research-packet-b-continuity-carrier-re-entry-and-reconstruction/continuity-witness-shared-questions-local-answers/)

**Authority effect:** none. This page defines a candidate direct seam and a bounded falsification specimen.
