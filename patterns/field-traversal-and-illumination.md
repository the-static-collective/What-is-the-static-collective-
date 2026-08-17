# Field Traversal and Illumination

A knowledge system does not need to pretend that every meaningful relation is already visible.

Sometimes the important unit is not a remembered object or a graph edge. It is a **field of awareness**: the temporarily active constellation of evidence, assumptions, tensions, unresolved questions, salient relationships, and possible next moves from which an observer is presently reasoning.

The portable pattern is:

> **Make fields addressable. Make transitions receipt-bearing. Let traversal illuminate previously fogged structure without pretending the structure was already known.**

This turns memory from a store of things into a map of **becoming aware**.

---

## 1. A field is more than a node

A conventional graph often models:

```text
thing -> relation -> thing
```

A field-aware system may instead model:

```text
field -> traversal -> field
```

A field can include:

- what is presently known or strongly evidenced;
- what is salient enough to affect reasoning now;
- live tensions or contradictions;
- unresolved questions;
- nearby possibilities;
- protected anchors;
- provenance and supporting artifacts;
- the current frontier of exploration.

The same underlying object may participate in many fields without those fields being collapsed into one canonical meaning.

A bee in an entomology field, a distributed-systems field, and a Static Collective architecture field may be the same referent while carrying very different active relationships.

**Law:** shared referent does not imply shared field state.

---

## 2. Traversal is an epistemic event

Moving from one field to another is not merely opening another document.

A meaningful traversal can disclose structure that was not visible from the prior field:

- a previously unnoticed neighboring field;
- a stronger relation between known elements;
- a contradiction visible only at the new resolution;
- a possible route that becomes reachable from the new position;
- evidence that a presumed relation is false;
- a new frontier worth exploring.

The traversal therefore deserves its own receipt.

A useful minimal shape is:

```text
TraversalReceipt
  fromField
  toField
  relationType
  trigger
  evidenceRefs[]
  revealed[]
  confidenceDelta[]
  unresolved[]
  observer
  occurredAt
```

The receipt does **not** prove that every revealed relation is true. It proves that a particular transition made those relations visible enough to inspect.

**Law:** traversal may reveal a claim; traversal alone does not canonize it.

### Threshold probing is not traversal

Some observers—especially software agents—can test many nearby routes at negligible technical cost. That makes unrestricted retrieval easy, but it also creates a useful boundary operation: inspect whether a door exists, how it relates to the current field, and where its authority lives **without loading the destination field itself**.

```text
visible doors
    ↓
metadata-only threshold scan
    ↓
reachability + lineage + relevance
    ↓
deliberate crossing
```

> **Scan the doors freely. Cross them deliberately.**

A threshold probe may inspect destination identity, declared relation, projection/source references, reachability metadata, provenance, and present-request relevance. It does not ingest destination body text, snippets from inside the destination, or neighboring destination content.

**Law:** probing a threshold does not count as entering the room.

**Law:** a visible or reachable field does not, by itself, authorize traversal into it.

**Law:** when traversal cost approaches zero, boundedness must come from declared relevance or governance rather than assumed scarcity.

**Law:** frictionless reachability is useful for surveying boundaries, not for silently expanding context.

Executable evidence now includes [Lawful Navigation Specimen 001](../specimens/lawful-navigation-specimen-001.md), a bounded Project0 → Corpus OS crossing in which the field materially changes while authority remains unchanged. It is one specimen of deliberate traversal, not a universal route rule.

---

## 3. Fog is first-class state

An honest map distinguishes absence of knowledge from negative knowledge.

Useful visibility states may include:

- **bright** — repeatedly traversed and strongly evidenced;
- **dim** — partially explored or weakly evidenced;
- **fogged** — plausible or reachable, but not yet inspected;
- **contested** — multiple incompatible illuminations remain live;
- **dark** — no known route from the present field.

These are observer- and time-relative states, not universal declarations about reality.

```text
VisibilityState(field, observer, time)
  coverage
  confidence
  recency
  provenance
  unresolvedFrontier[]
```

The useful question becomes not only:

> What does the system know?

but also:

> What has become visible from where this observer has actually been?

**Law:** unexplored territory must remain distinguishable from disproven territory.

---

## 4. Typed field links

Not every traversal means the same thing. A small portable vocabulary is enough to begin:

### Resonance

Two fields exhibit a sufficiently similar underlying pattern that inspecting one can illuminate the other.

### Derivation

Entering the later field was materially produced by reasoning from the earlier field.

### Tension

The fields expose claims, constraints, or interpretations that cannot presently be reconciled without loss.

### Portal

A concept, artifact, or relation inside one field reliably reconstructs enough context to enter another field.

A portal is stronger than an ordinary hyperlink. It is not merely:

> open this artifact

but:

> recover the bounded conceptual neighborhood in which this artifact or idea made sense.

**Law:** links should preserve the kind of transition they represent, not merely destination identity.

---

## 5. Illumination may persist without becoming authority

A traversal can leave durable residue:

```text
A
  -> traversed by analogy X
  -> exposed B and C
  -> revealed tension D
  -> increased confidence in relation A<->B
  -> opened possible route B->E
  -> left F unresolved
```

That residue is valuable because later observers can see not only the destination but the path by which the destination became reachable.

However, visibility, evidence, authorship, and authority remain separate.

A frequently traversed path may be highly visible and still wrong. A novel path may be weakly evidenced and still useful. A human anchor may remain authoritative even when many automated traversals suggest alternatives.

**Law:** illumination changes visibility; it does not silently transfer authority.

A projection may be unavailable even when the destination still exists through another authority-preserving route. An alternate route is lawful only when provenance establishes the relationship between the projection and the canonical source.

**Law:** route substitution is lawful only when provenance preserves the authority relationship.

**Law:** an inaccessible authoritative source does not transfer its authority to the nearest cache, summary, orientation page, or reconstruction.

> A locked door does not make the hallway the room.

---

## 6. Different observers may lawfully hold different maps

Two observers can inhabit the same corpus and possess different epistemic terrain because their traversal histories differ.

That difference should not automatically be normalized away.

Instead, systems may preserve:

```text
observer A -> field F -> visibility map VA
observer B -> field F -> visibility map VB
```

The maps can later be compared, merged provisionally, or left distinct.

This permits disagreement, specialization, surprise, and discovery without pretending that one centralized graph already contains every meaningful relation.

**Law:** shared corpus does not require identical awareness state.

---

## 7. Reconstruction must be bounded and receipt-bearing

A portal or remembered field should not claim to restore an observer's exact prior consciousness.

A safer and more useful operation is **bounded reconstruction**:

1. identify the target field;
2. recover its anchors and evidence;
3. recover salient tensions and unresolved frontier;
4. recover the traversal receipts that materially shaped it;
5. state what could not be reconstructed;
6. issue a reconstruction receipt.

A field of awareness may be temporary, and the observer need not remain continuously present. Durable residue can still survive as field snapshots, traversal receipts, evidence references, and unresolved frontier. A later reconstruction may use that residue, but it must not imply continuity of consciousness that was not actually preserved.

This makes a field revisitable without pretending that memory is perfect.

**Law:** reconstruction should preserve uncertainty about what was not recovered.

---

## 8. Smallest executable slice

Do not begin by building a universal cognitive graph.

The smallest credible implementation only needs three durable objects:

```text
FieldSnapshot
TraversalReceipt
VisibilityState
```

A first specimen can prove the pattern with two or three fields:

```text
bee communication
    --resonance-->
distributed signal field
    --derivation-->
TranchNode / collective-memory architecture
```

For each traversal, preserve:

- the source field snapshot;
- the trigger for traversal;
- newly visible relations;
- evidence supporting those relations;
- unresolved or contested claims;
- the resulting frontier.

Then test whether a later observer can reconstruct the reasoning path without being handed the original conversation.

That is enough to prove or falsify the primitive.

---

## 9. Likely project graduations

This pattern is intentionally project-neutral, but several Static Collective systems are natural proving grounds.

### TranchNode

Treat field snapshots and traversal receipts as addressable nodes/edges with explicit provenance, confidence, and scope. The key experiment is whether topology can represent **visibility from a position** rather than only globally declared relations.

### Corpus OS

Treat field reconstruction as a navigational operation over corpus evidence: recover anchors, tensions, unresolved frontier, and traversal history for a bounded case or concept. The key experiment is whether a corpus can expose **how a conclusion became reachable**, not merely retrieve supporting documents.

### Band Runtime

Treat participant awareness as a projection rather than shared hidden state. Different participants may illuminate different relationships in the same event field without any participant owning the canonical groove.

These project implementations, if built, should become canonical in their own repositories. This file retains only the portable pattern.

---

## 10. Tests for the pattern

Before calling an implementation field-aware, ask:

1. Can it represent what is unresolved without inventing an edge?
2. Can two observers hold different visibility maps over the same evidence?
3. Does traversing a relation produce inspectable residue?
4. Can the system distinguish `revealed` from `accepted as true`?
5. Can a later observer reconstruct why a destination became reachable?
6. Can evidence revise or extinguish a previously illuminated relation?
7. Does visibility remain distinct from authority?
8. Can the system name its current frontier instead of pretending the map is complete?

If those properties hold, the system is doing more than hyperlinking memory.

It is preserving **epistemic terrain and the history by which that terrain became visible**.
