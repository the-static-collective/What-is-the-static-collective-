# Listener vNext — Anchor Islands & Bounded Re-entry

**Status:** Approved architectural slice / implementation not yet admitted\
**Canonical project issue:** Haunted Toaster #199

The current Listener should not be replaced with a bigger recognizer merely because alignment remains imperfect. Field evidence points to a different problem: **continuity under partial evidence**.

## 2026-08-22 field recheck — regression ungressed

A temporary field report raised the possibility that the current packaged Re-listen path had stopped preserving existing human anchors. GitHub #203 captured that concern as a trust blocker while it was still uncertain.

A follow-up human witness then ran Re-listen again and observed that the existing human anchors **held exactly**.

The suspected regression did not reproduce. #203 was closed as not reproduced / not planned.

This does **not** claim that Listener vNext has been implemented, and it does not erase the architectural reasons for Anchor Islands. It simply preserves the narrower current truth:

```
machine may reconsider machine-owned timing
human anchor remains exact
```

The scare was useful because it restated the invariant under pressure. The field recheck confirmed the current build still obeyed it.

Compression:

> **Regression, ungressed.**

## Reframing

The old conceptual shape is too close to:

```
line 1 → choose match → advance cursor → line 2 → choose match → advance cursor
```

That makes one plausible wrong chorus occurrence capable of dragging the rest of the song into the wrong world.

The next shape is:

```
canonical lyrics
    ↓
transcript witness
    ↓
candidate placements
    ↓
plausible branches / explicit unresolved
    ↓
admission
    ↓
trusted landmarks + human anchors
    ↓
ANCHOR ISLANDS
    ↓
bounded propagation / bounded re-entry
    ↓
constituted lyric timeline
    ↓
receipt
```

## eCODEsystem invariants carried in

These are conceptual lineage, not cross-project runtime authority.

### Anchors narrow lawful freedom

A human timing anchor is authority. Machine confidence is evidence.

Later inference should route around an anchor rather than casually overwrite it. Strong landmarks narrow the lawful search space without determining every remaining cue.

### Ambiguity may fork

Repeated chorus/refrain material may have multiple plausible occurrences. The Listener should be allowed to preserve a small deterministic set of candidate locations until neighboring sequence, structure, or anchors distinguish them.

Similarity discovers possibilities. It does not constitute timing truth.

### Repair propagates inside a bounded envelope

A correction should re-contextualize the machine-owned span between the nearest human anchors or song boundaries. Recovery can propagate while evidence remains useful and then terminate explicitly.

Useful terminal states include:

* recovered;
* damped;
* refused;
* exhausted;
* unresolved.

No silent disappearance.

### Current projection is not witnessed history

Re-listen may change the current machine-owned timing projection. It should not erase how the timeline got there.

Conceptually:

```
machine proposed 91.7
human anchored   93.4
re-listen tried  93.2
anchor held      93.4
```

The current cue may change. The causal history remains attributable.

### Unresolved is a legitimate state

If evidence cannot support timing, preserve the gap. Completeness is not permission to invent.

## Core primitives

### Anchor Island

A trusted temporal landmark plus the uncertain territory immediately around it.

Potential landmarks:

* explicit human tap/edit — authoritative;
* unusually strong machine placement — useful landmark, still subordinate to human correction;
* song start/end — hard boundaries.

### Bounded Span

The interval between nearest authoritative anchors/boundaries. Re-listen operates inside that span rather than blindly rerunning the entire song.

### Ambiguity Fork

A bounded deterministic set of plausible placements for repeated or low-information text. Branches remain evidence until later context admits one or leaves them unresolved.

### Bounded Re-entry

Recover a missing earlier/interior region from a trustworthy later landmark without pretending the missing territory was continuously known.

Founding example: the chronically missed first line.

```
0:00
 ? ? ? ?
first trusted lyric landmark
```

After the normal pass, search backward only inside that opening interval. If the evidence remains weak, leave the line REVIEW/UNPLACED.

### Context Borrowing

Short/low-information lyric lines may temporarily borrow neighboring lexical context for matching only. Canonical lyric text is never merged or rewritten merely to help search.

## First implementation sequence

1. **Opening Backfill / bounded re-entry** — give the missing first line a right-hand landmark rather than globally weakening matcher thresholds.
2. **Anchor-island Re-listen** — partition repair around human anchors/song boundaries; reconsider only machine-owned evidence inside affected spans.
3. **Repeated-section ambiguity forks** — compare small lyric sequences and preserve alternate chorus occurrences until enough context distinguishes them.
4. **Alignment event history** — expose held / recovered / moved / lost / unresolved outcomes with attributable old → new evidence.

## First-pass objective

Do not optimize only for “place all lines immediately.”

Test a different goal:

> **Find the minimum set of high-information temporal landmarks that makes the rest of the song cheaply and truthfully recoverable.**

Good landmark evidence may include:

* distinctive longer phrases;
* first occurrences rather than repeated refrains;
* section-opening phrases;
* strong vocal islands;
* declared structure as a soft prior;
* existing human anchors.

Then reconstruct inward between landmarks.

## Product compression

> **Survey → establish landmarks → partition → reconstruct → preserve fog.**

The human should not feel like they are correcting dozens of isolated subtitle mistakes. A few well-placed anchors should reshape the territory the Listener is allowed to search.

## Acceptance classes

The first executable work should include at least:

1. a clean control that already aligns well and must not regress;
2. a missed-opening specimen;
3. a repeated-chorus specimen where a wrong occurrence cannot cascade the rest of the song;
4. a human-correction specimen where a small anchor set materially reduces neighboring unresolved work without moving any human anchor.

## Authority boundary

* canonical lyric text remains unchanged;
* human anchor times remain exact;
* machine confidence never promotes itself into human authority;
* ambiguity may remain branched or unresolved;
* recovery cannot cross an authoritative anchor boundary;
* reconsidered machine evidence remains inspectable in history;
* final SRT/VTT/render consume only the admitted canonical cue track;
* no renderer, candidate-generation, VisualScore, or ResolvedTimeline authority change belongs in this slice.

## Project lineage

* Lyric Foundry #59
* anchor-guided recovery #85
* conservative machine admission #100
* Gold Star Listener mining #113
* current-main Listener hardening #186/#190/#192
* packaged field closure #193
* temporary non-reproduced regression report #203
* canonical next issue #199

GitHub issue #199 remains implementation/design authority for this next Listener frontier.
