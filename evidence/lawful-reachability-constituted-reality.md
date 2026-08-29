# Lawful Reachability / Constituted Reality

**Status:** first Corpus specimen landed / project-backed hypothesis retained

**First proving ground:** Corpus OS issue #20 — completed by PR #22

**Upstream dependency:** Corpus OS #17 — Linear Authority / Causal Accounting — satisfied

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

## First Corpus specimen — landed

Corpus OS now carries the first bounded implementation on `main`.

The landed projection is shaped around:

```
deriveWorldCut(root, causalRecords, observations)
```

and preserves the distinctions required by the original hypothesis:

```
balanced completion
→ accountable output refs may become constituted

warrant spent → host failed
→ history advances; no output manufactured

warrant spent → Session refused
→ distinct history advances; no output manufactured

pre-warrant / unspent
→ no consequential transition

observed ref with no causal ancestry
→ ORPHAN_OBSERVATION
```

The implementation also fails closed on contradictory or unattributed balanced records, carries upstream Causal Accounting anomalies forward as unresolved/non-constituting evidence, and rejects authority-cut lineage crossings.

The world cut remains a pure derived projection. It grants no authority, reaches no host, repairs no history, and carries `legalValidity: "unclaimed"`.

## What the specimen proves — and does not

The Corpus result demonstrates that observed substrate need not automatically redefine constituted state inside this bounded runtime model.

It does **not** establish:

* prevention of external mutation;
* authenticity of rewritten or arbitrarily persisted causal records;
* signatures or cryptographic attestation;
* distributed consensus;
* legal validity.

This remains **tamper legibility**, not magical tamper prevention.

## Orphan observation

An unsupported observation is not automatically false, corrupt, malicious, or deletable.

The bounded statement is:

> These bytes / refs are observed here, but this system cannot establish a valid causal path by which they entered the constituted world.

That allows unauthorized substrate mutation to remain legible without pretending mutation has been made impossible.

## Re-entry neighbor

This is a computational neighbor of **The Room Can Vanish; the World Remains**.

The older pattern says:

> Do not preserve every room forever. Preserve enough truthful relation that the world can make another room.

The Corpus specimen sharpens one possible implementation:

> Preserve enough accountable causality that the constituted present can be re-derived.

The landed proof is deterministic structural re-derivation from supplied admitted evidence. It does **not** prove that an arbitrary serialized history can authenticate itself after restart.

## Deferred consequences

With the first projection now executable, two downstream structures are mechanically imaginable but remain deliberately unimplemented:

**Counterfactual worlds** — explore a supplied proposed branch without promoting possibility into constituted history.

**Prospective reachability** — project which next states appear possible under the current constituted cut without turning the projection into a scheduler or authority source.

Neither is automatically authorized by the first specimen. Each requires its own bounded design and proof.

## Project authority

Canonical implementation/design authority remains in Corpus OS:

* GitHub issue: https://github.com/the-static-collective/corpus-os/issues/20
* Design / implementation-plan PR: https://github.com/the-static-collective/corpus-os/pull/19
* Landed implementation PR: https://github.com/the-static-collective/corpus-os/pull/22
* Implementation head: `7314fedf240cf9036fff4f88c2cd718fbd1b066c`
* Landed merge commit: `71e17db5b5d5e50e8eeeba4c3168f4dcb9a9744c`

This GitBook page is a project-backed witness, not implementation authority.

## Graduation boundary

Do not promote this into a shared Pattern from one Corpus specimen.

A future graduation requires a materially different second system to reproduce the useful invariant without importing Corpus-specific trust or warrant semantics.

Until then:

> **First specimen landed. Project-backed hypothesis. Residual fog preserved.**
