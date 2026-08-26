# Narrative Solver — Write the Movie With the Graph

Status: **Primitive Incubator / narrative architecture slice**

This note preserves a small possibility that becomes plausible only after the Free Event Graph is rich enough to carry actual narrative consequence rather than merely tags or references.

> **A movie may be composed as a lawful path through a densely populated narrative graph.**

The graph stores possibilities. A solver composes candidate paths under declared narrative pressures. A human still chooses the movie.

## Primitive

Conceptually:

```
Free Narrative Graph
        ↓
constraints / pressures
        ↓
candidate traversals
        ↓
human selection / mutation
        ↓
NarrativeScore
        ↓
screenplay / edit / soundtrack projections
```

The solver does **not** own the graph, the world, or narrative truth. It proposes traversals through already-addressed material.

A candidate movie can therefore be treated as an ordered composition of typed narrative relations:

```
M = mₙ ∘ ... ∘ m₃ ∘ m₂ ∘ m₁
```

where the `m` terms may be encounters, revelations, refusals, returns, recognitions, transformations, echoes, causal consequences, or other typed narrative relations.

## What the graph must contain

A dense graph is not enough if it stores only adjacency or semantic similarity.

Useful narrative nodes may include:

* character states;
* rooms / worlds;
* songs;
* images;
* motifs;
* questions;
* objects;
* memories;
* relationships;
* unresolved tensions.

Useful edges must carry **narrative physics**, not merely hyperlinks:

```
Derek --REFUSES--> door

REFUSAL
  creates → scar
  reveals → clue
  changes → Derek
  changes → world
  enables-later → recognition
```

The useful threshold is consequence-bearing reachability: prior traversal changes what later paths are available, legible, costly, meaningful, or forbidden.

## Narrative structures as constraint dialects

Narrative traditions should be treated as optional compositional dialects, not universal story law.

For example:

```
solve(world, under=HERO_SPIRAL)
solve(world, under=THRILLER)
solve(world, under=DREAM_LOGIC)
solve(world, under=SAVE_THE_CAT)
```

`SAVE_THE_CAT` here is deliberately illustrative and mildly offensive to the seriousness of the page. The actual architectural point is that several distinct constraint sets may traverse the same world and produce genuinely different candidate movies without rewriting the source graph.

The solver must preserve which constraint set and version produced each candidate.

## Hero Spiral as the first useful constraint

The recently incubated Hero Spiral gives a particularly strong first narrative law:

```
Find A₀ and A₁ such that:

LOCATION(A₀) ≡ LOCATION(A₁)
HERO(A₀)     ≠ HERO(A₁)
WORLD(A₀)    ≠ WORLD(A₁)
TRACE(A₀)    ≠ TRACE(A₁)

and preferably:

REACHABLE(A₁) ⊃ REACHABLE(A₀)
```

This asks the solver to locate a recognizable return that contains attributable transformation rather than a decorative callback.

Other future pressures might include:

```
motif recurrence:
first appearance  → possibility
second appearance → recognition
third appearance  → consequence

causal ancestry:
every major reveal must have at least one inspectable prior ancestor

escape discipline:
no escape relation becomes traversable before the worldline that makes it legible exists
```

These are examples, not a frozen narrative grammar.

## Human role

The purpose is not to automate taste out of filmmaking.

A dense graph may admit an enormous number of lawful paths. Many will be boring, obvious, tonally wrong, or technically valid but artistically dead.

The human role moves upward:

```
choose laws / pressures
preserve forbidden collapses
recognize useful candidates
mutate / reject / combine
admit one traversal as the movie
```

The solver expands and makes inspectable the possibility field. It does not acquire final artistic authority.

## Relation to existing Collective work

This slice composes with existing work without replacing it:

* **Collective Dreamstate / Free Event Graph** supplies a candidate shared graph substrate while keeping graph-local proposal separate from execution authority.
* **Pocket Web Hypermath** suggests typed links, path composition, path-sensitive equivalence, and worldline receipts.
* **Hero Spiral** supplies one narrative constraint in which return preserves coordinate while participant/world state continues changing.
* **Space → Sequence → Story** warns that narrative can fabricate coherence by smoothing gaps or alternatives.
* **World Re-entry** treats narrative as continuity across changed worlds rather than merely an output format.
* **Haunted Toaster** supplies a useful architectural analogue: possibility field → bounded composition → resolved timeline → artifact → witness.

The analogy to Toaster is structural, not authority transfer. A future movie solver should not inherit renderer-specific concepts merely because the pipeline rhymes.

## What must stay invariant

1. **The graph remains richer than any solved movie.** A selected path does not erase neighboring alternatives.
2. **Narrative coherence is not causal proof.** A satisfying route may not invent missing ancestry.
3. **Constraint dialects remain declared and versioned.** No hidden beat sheet silently becomes universal law.
4. **Human selection remains explicit.** Candidate ranking is not admission.
5. **Receipts preserve the route.** If two candidate movies reach the same ending by different paths, the difference remains inspectable.
6. **The solver does not manufacture authority.** Reachable, narratively attractive, or high-scoring does not mean permitted or constituted.
7. **The source graph is not flattened into one outline.** Solving a path leaves the possibility field available for later traversal.

## Smallest witness

Do **not** begin with a feature-length screenplay or a screenplay generator.

Use one deliberately tiny consequence-bearing graph and ask for three candidate traversals under a small declared pressure set:

```
one tiny graph
+ one Hero Spiral constraint
+ one motif-recurrence constraint
+ one causal-ancestry constraint
→ three candidate story paths
```

Each candidate should expose:

* ordered node / edge path;
* constraint set and version;
* why each chosen transition is legal;
* at least one alternative path not taken;
* one Hero Spiral return if satisfiable;
* one motif whose meaning changes through recurrence;
* one causal chain showing why a later beat was enabled;
* a deterministic receipt sufficient to replay the same candidate.

No prose screenplay generation is required for the witness.

## Failure conditions

Reject or redesign the primitive if the solver:

* fabricates causal ancestry to satisfy a desired beat;
* collapses the source graph into one canonical story;
* treats ranking as artistic or constitutional authority;
* quietly imports one storytelling framework as universal law;
* rewards callbacks that do not change consequence or reachability;
* hides rejected/alternative paths needed to understand the chosen one;
* requires a global ontology before a small local narrative graph can be traversed;
* cannot explain why a generated beat follows from the graph and declared constraints.

## Intended proving ground

`thestaticcollectivethemovie` is the obvious future proving ground once the graph is mature enough.

The first movie-specific use should still remain small: one scene sequence or short passage whose structure is solved from the graph and then written/rendered by ordinary creative means.

## Graduation

This deserves promotion only after a small executable witness proves that:

```
free graph
+ declared narrative constraints
→ multiple lawful candidate traversals
```

while preserving alternatives, causality, path identity, receipts, and human admission.

A second materially different constraint dialect should then generate a meaningfully different traversal through the same graph without changing the underlying world.

## Working seal

> **Do not write the movie into the graph.**
>
> **Let the graph contain a world rich enough that several movies can be found inside it.**

## Related incubator slice

[D\&D\&D — The Player Is the Continuity Witness](/broken/pages/ddd-d-and-d-and-d-the-player-is-the-continuity-witness) turns the declared-dialect idea into a playable Derek pressure-test: different bounded Dungeon Masters can traverse and interpret the same consequence-bearing world graph while a single player's receipts preserve path continuity and contested evidence.
