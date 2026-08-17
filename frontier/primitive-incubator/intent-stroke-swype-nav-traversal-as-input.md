# Intent Stroke / Swype NAV — Traversal as Input

**Status:** Incubating / executable specimen

## Primitive

> **Traversal itself can be input.**

Instead of requiring an observer to name every destination or edge exactly, preserve an approximate continuous gesture through a declared conceptual field and decode it against bounded, explicit candidate traversals.

```
approximate stroke
    ↓
declared field topology
    ↓
deterministic candidate ranking
    ↓
explicit ambiguity
    ↓
later human / lawful admission outside the decoder
```

The originating analogue is gesture typing: a continuous imperfect path can be interpreted from its shape, order, endpoints, and a finite vocabulary of plausible destinations without treating every crossed symbol as selected.

This is closely adjacent to [Field Traversal & Illumination](../../patterns/field-traversal-and-illumination.md), but adds a distinct possibility: the traversal need not only be recorded after navigation. Its **shape may itself be a navigational proposal**.

[Metaphor as Portal](../../scrapbook/constellations/metaphor-as-portal.md) is a useful sibling: metaphor can act as semantic compression for reconstructing a conceptual neighborhood; Intent Stroke asks whether a characteristic path can act as topological compression.

## What must stay invariant

```
crossed anchor != selected anchor
near anchor != asserted relation
ranked candidate != accepted traversal
accepted traversal != authority
collision != decoder failure
```

Additional constraints:

* preserve the raw stroke independently from its interpretation;
* preserve the exact field layout used for decoding;
* keep decoder identity/version attributable;
* return every declared candidate, not merely the leader;
* preserve exact equal-cost leaders as unresolved ambiguity;
* keep the decoding non-authoritative;
* do not mutate topology merely because a route resembles the gesture;
* reuse existing canonical addressing rather than inventing another identity floor.

## Smallest experiment

TranchNode issue [#40](https://github.com/the-static-collective/tranchnode/issues/40) and implementation PR [#41](https://github.com/the-static-collective/tranchnode/pull/41) contain the first bounded proof.

The v0.1 specimen uses:

* one fixed two-dimensional field layout;
* independently addressed integer-coordinate strokes;
* explicitly declared traversal templates;
* deterministic integer interpolation;
* dynamic time warping with Manhattan distance;
* explicit endpoint cost;
* stable candidate ordering;
* canonical fingerprinting of the non-authoritative decoding.

The fixture asks four things only:

1. Can an approximate stroke rank the intended declared traversal first?
2. Can a small perturbation preserve that lead?
3. Does reversing the gesture materially change the ranking?
4. Can two geometrically identical candidate routes remain an explicit collision instead of being falsely resolved?

GitHub Actions records the TDD transition: the characterization failed while the production module was absent, then the repository-native `npm run check` passed on implementation head `526a3af023748f61dd67d220258ede4dfeee23a1`.

## What this does not establish

The specimen does **not** establish that:

* geometric resemblance proves human intent;
* the leading candidate is true;
* a traversal grants authority;
* the Collective should be globally spatialized;
* an LLM or embedding model is required;
* a gesture should create a Door, Threshold, permission, adoption, or topology mutation;
* the decoder belongs in Project0;
* a UI has been justified yet.

The geometry is deliberately crude because the first question is architectural, not ergonomic.

## Felt possibility

If the primitive survives use, navigation could eventually become less like selecting addresses and more like **drawing an intention through epistemic terrain**.

A later gesture vocabulary might distinguish operations such as tap, hold, circle, backtrack, and lift. Those semantics are intentionally absent from v0.1; they should be earned by observed use rather than invented into law.

## Graduation test

This primitive earns a stronger pattern only if repeated observers can use approximate gestures to recover useful bounded traversal candidates while the system continues to preserve:

* raw evidence;
* ambiguity;
* provenance;
* observer choice;
* authority boundaries;
* reproducible decoding.

If the system must hide ambiguity, infer undeclared topology, or silently turn resemblance into assertion to feel useful, the primitive has failed.

> **Swype NAV is not “gesture decides where you meant to go.” It is “gesture proposes which declared journeys most resemble the path you actually drew.”**
