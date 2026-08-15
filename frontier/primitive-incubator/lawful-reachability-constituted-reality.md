# Lawful Reachability / Constituted Reality

**Status:** incubating / project-backed hypothesis

**First proving ground:** Corpus OS issue #20

**Dependency:** Corpus OS #17 — Linear Authority / Causal Accounting

## The distinction

Most software treats observed substrate as current state: if bytes are present, they are part of reality.

This hypothesis asks for a stricter separation:

```
observed substrate
        ≠
constituted state
```

A present state becomes **constituted** only when an accountable causal path reaches it from an adopted prior state.

Three names describe different depths of the same idea:

* **Constituted Reality** — the architectural frame: observed presence and constituted existence are separable.
* **Lawful Reachability** — the mechanical primitive: derive what belongs to the present by traversing balanced causal history from an adopted root.
* **Causal Closure** — the invariant: anything claimed as current constituted state must close onto accountable causes or remain explicitly orphaned / unresolved.

Working compression:

> **Existence is observed. Reality is constituted. History is the lawful path between them.**

## Why Corpus is ready to test it

Corpus OS already has an adopted declaration root and one-shot Action Warrants. The next upstream proof, Causal Accounting, asks whether consequential attempts reconcile against attributable spent authority.

Lawful Reachability begins only after that reconciliation exists.

```
adopted root
    ↓
balanced causal record
    ↓
terminal history
    ↓
balanced causal record
    ↓
CURRENT CONSTITUTED CUT
```

The reachability layer must remain a projection. It grants no authority and reaches no host.

## First specimen

The first Corpus proof should remain in-process and synthetic.

A pure projection:

```
deriveWorldCut(root, causalRecords, observations)
```

should distinguish at least:

```
balanced completion
→ output may become constituted

warrant spent → host failed
→ history advances; no output manufactured

warrant spent → Session refused
→ distinct history advances; no output manufactured

pre-warrant / unspent
→ no consequential transition

observed ref with no causal ancestry
→ ORPHAN_OBSERVATION
```

The terminal distinction matters. Merely recording that authority was spent is insufficient: Session refusal, host failure, and completion are materially different histories and must not collapse into the same world cut.

## Orphan observation

An unsupported observation is not automatically false, corrupt, malicious, or deletable.

The bounded statement is:

> These bytes / refs are observed here, but this system cannot establish a valid causal path by which they entered the constituted world.

That allows unauthorized substrate mutation to remain legible without pretending mutation has been made impossible.

## Re-entry neighbor

This is a computational neighbor of **The Room Can Vanish; the World Remains**.

The older pattern says:

> Do not preserve every room forever. Preserve enough truthful relation that the world can make another room.

The Corpus hypothesis sharpens one possible implementation:

> Preserve enough accountable causality that the constituted present can be re-derived.

The first proof is only deterministic structural re-derivation from supplied admitted evidence. It does **not** prove that an arbitrary serialized history can authenticate itself after restart.

## Security boundary

Lawful Reachability is **tamper legibility**, not magical tamper prevention.

It may support:

> Unauthorized substrate mutation need not automatically redefine constituted state.

It does not establish:

* prevention of external mutation;
* authenticity of rewritten causal records;
* signatures or cryptographic attestation;
* distributed consensus;
* legal validity.

## Deferred consequences

If the primitive survives the first proof, two larger structures fall out naturally but remain out of scope:

**Counterfactual worlds** — explore a proposed branch without promoting possibility into history.

**Prospective reachability** — project which next states appear possible under the current constituted cut without turning the projection into a scheduler or authority source.

Neither belongs in v0.1.

## Project authority

Canonical implementation/design authority remains in Corpus OS:

* GitHub issue: https://github.com/the-static-collective/corpus-os/issues/20
* Draft design/plan PR: https://github.com/the-static-collective/corpus-os/pull/19

This GitBook page is an incubator witness, not project authority.

## Graduation boundary

Do not promote this into a shared Pattern from one Corpus specimen.

A future graduation requires a materially different second system to reproduce the useful invariant without importing Corpus-specific trust or warrant semantics.

Until then:

> **Project-backed hypothesis. Concrete proving ground. Residual fog preserved.**
