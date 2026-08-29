# Artifact Resurrection — Exact Return

Status: **incubating cross-stack primitive**

> **Preserve causes. Regenerate consequences.**

## Primitive

A portable reconstruction receipt that can be carried to a capable node and used as the authoritative entrypoint for making an artifact exist again.

The receipt is not merely retrospective evidence that an artifact once existed. It names the causal graph required to reconstruct it, declares the strongest return claim that can be proven, and carries the bounded capability to request that reconstruction.

The Haunted Toaster is a natural first executor and proving ground, but it should **not** own the cross-stack law.

## Felt possibility

The Collective already preserves many of the pieces needed for a deeper artifact model:

* canonical identities;
* immutable source evidence;
* accepted specifications and timelines;
* human-authoritative decisions;
* deterministic transforms;
* renderer/build identity;
* provenance and receipt graphs;
* witnessed output.

Taken together, an artifact can sometimes be treated as a **projection of preserved causes** rather than the only durable thing worth keeping.

A large rendered artifact may be disposable if the irreducible source material and the exact causal graph needed to reconstruct it remain available.

This suggests a conservation law:

> **Preserve irreducible state. Preserve authority. Preserve the path. Recompute what is merely consequence.**

## Receipt as portable capability

The responsible portability boundary is the receipt itself.

Possession of a valid reconstruction receipt authorizes a holder or node to **request the reconstruction described by that receipt**.

It does **not** create ambient authority over every dependency named by the receipt.

A protected dependency must be one of:

1. already present or embedded;
2. publicly or lawfully addressable immutable evidence;
3. reachable through its own admitted capability or lease;
4. unavailable, in which case the reconstruction must degrade or refuse truthfully.

A reconstruction receipt therefore behaves like a portable capability without becoming a skeleton key.

## Cross-stack shape

### Project0 — identity

Project0 provides canonical identity and relationship semantics for artifacts, receipts, dependencies, descendants, and result lineage.

Its question is:

> **What exactly is being requested, and what exactly does this receipt refer to?**

### TranchNode — preserved evidence

TranchNode provides immutable/content-addressed source evidence and replayable dependency state.

Its question is:

> **Do we possess the exact preserved thing this causal edge names?**

### Corpus OS — admission and authority

Corpus OS preserves admitted artifacts, human decisions, branches, interpretations, disagreement, and exact routes back to source evidence.

Its question is:

> **Which state and decisions count, under whose authority, and what may this node lawfully use?**

### Haunted Toaster — resolver / executor / witness

The Toaster walks the receipt graph, resolves dependencies, verifies identities, restores accepted state, executes the reconstruction, witnesses the result, compares it against the promised return class, and emits a new result receipt.

Its question is:

> **Can these preserved causes manifest this artifact again, and what did we actually get?**

No project should silently absorb another project's authority simply because reconstruction is convenient.

## Reconstruction graph

Conceptually:

```
reconstruction receipt
├── source identities
│   ├── immutable artifact
│   └── another reconstruction receipt
├── accepted specification / state
├── ordered transformations
├── dependency identities
├── execution environment
├── human-authoritative decisions
├── declared nondeterministic boundaries
└── expected result identity / equivalence claim
```

Resolution may recurse:

```
receipt A
  -> artifact B
       -> receipt B
            -> immutable primitive C
  -> artifact D
       -> immutable network object
```

Every leaf must eventually resolve to exactly one of:

* an immutable primitive;
* another reconstructible receipt;
* a declared irreducible external fact.

**No hidden fourth category.**

## Return classes

### EXACT RETURN

The reconstruction proves the strongest claim:

```
expected artifact identity == observed artifact identity
```

Same canonical inputs plus the declared deterministic environment produce the expected bytes/hash.

### LAWFUL RETURN

The accepted specification and causal structure return, but byte identity is either not meaningful or not guaranteed.

The receipt must define the equivalence witness. It may not simply call a near-enough result “the same thing.”

### PARTIAL RETURN

One or more irreducible dependencies cannot be recovered. Everything still reconstructible may return, but the missing boundary must be named explicitly.

A failed `EXACT RETURN` must never silently downgrade itself into `LAWFUL RETURN`. That requires a new explicit disposition.

## Reconstruction result receipt

Every attempt produces a **new** receipt. Reconstruction extends history; it never rewrites the old event.

Example exact result:

```
requested: project0:artifact:...
requested-class: EXACT
resolved-dependencies: 47/47
recursive-reconstructions: 8
execution: deterministic
expected: sha256:...
observed: sha256:...
verdict: EXACT RETURN
```

Example lawful result:

```
verdict: LAWFUL RETURN
equivalence-witness: PASS
byte-identity: DIFFERENT
reason: declared encoder implementation variance
```

Example partial result:

```
verdict: PARTIAL RETURN
missing-irreducible-source: physical microphone capture
all-downstream-reconstructible-state: preserved
```

## What must stay invariant

* **Receipt ≠ artifact.** It is evidence plus bounded reconstruction capability/instruction.
* **Receipt ≠ universal authority.** Dependency authority remains explicit and scoped.
* Human-authoritative decisions remain explicit; they cannot be regenerated as though inference were equivalent to acceptance.
* Nondeterminism is declared where it enters.
* Reconstruction cannot claim stronger identity than its witness proves.
* Canonical evidence stays in its project-owned authority domain rather than being copied into convenient fake local authority.
* Recursive resolution must be cycle-safe, depth-bounded, tamper-evident, and fail closed on unresolved canonical identity.
* A reconstructed artifact receives a new result receipt linked to the receipt that requested it.

## Smallest experiment

Do **not** start with arbitrary files or live network traversal.

Use one existing Haunted Toaster specimen whose current evidence already binds most of the causal graph:

* source audio hash;
* source image/art identity where available;
* accepted VisualScore;
* accepted ResolvedTimeline;
* renderer/build identity;
* output hash.

Build one local `Exact Return` proof in which the **receipt is the sole reconstruction entrypoint**.

The resolver should:

1. accept the receipt;
2. resolve every required dependency by canonical identity from a tiny local fixture store;
3. reject absent or mismatched required dependencies;
4. replay accepted render state without reopening creative generation;
5. hash the resulting artifact;
6. emit a reconstruction-result receipt;
7. claim `EXACT RETURN` only when expected and observed identities match.

The local fixture resolver should expose the neutral interface that TranchNode, Corpus OS, or another network node could later implement.

## Required proof specimens

The first slice should deliberately demonstrate:

1. **complete graph** → exact return;
2. **tampered source** → refusal;
3. **missing dependency** → explicit unresolved/partial result, never fabricated substitution;
4. **creative machinery absent** → reconstruction still succeeds because accepted state, not renewed creativity, is authoritative.

## Non-goals for the first experiment

* universal arbitrary-file decomposition;
* peer discovery;
* network transport protocol;
* automatic garbage collection of regenerable artifacts;
* generalized capability delegation;
* reconstruction of mutable third-party AI services;
* direct TranchNode or Corpus OS integration code;
* changing Toaster render semantics.

Those belong downstream only if the primitive survives the local proof.

## Deeper implication

If the primitive graduates, durable storage can begin distinguishing between:

```
IRREDUCIBLE STATE
must be preserved

RECONSTRUCTIBLE CONSEQUENCE
may be regenerated
```

That reframes storage, archival, deployment, creative provenance, software builds, media rendering, and long-term preservation.

A 900 MB rendered video may eventually be less important to conserve than a few megabytes of source material plus a complete, authority-preserving causal graph.

The artifact becomes **potential manifestation** held by the receipt and its reachable evidence network.

## Graduation signal

This becomes a portable Collective primitive when at least two materially different artifact-producing systems can consume the same neutral reconstruction-receipt contract through project-specific adapters without erasing their distinct authority/provenance semantics.

Possible second specimens include:

* Haunted Phonograph MIDI/audio;
* APK/native application builds;
* deterministic documents or datasets;
* bootable/system images;
* other artifact pipelines with independently witnessable return identity.

## Working vocabulary

**Artifact Resurrection** — the broader family of exact, lawful, and partial return.

**Exact Return** — the strongest reconstruction operation and verdict.

**Reconstruction Receipt** — the portable data/capability primitive.

The core law remains:

> **Preserve causes. Regenerate consequences.**

## Current project slice

Haunted Toaster issue #121 — https://github.com/the-static-collective/the-haunted-toaster/issues/121
