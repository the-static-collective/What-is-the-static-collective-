# Amber Cells — Preserve, Isolate, React Deliberately

> **Status:** Freeport-local security refinement. Incubating; not shared doctrine.

## Compression

```
UNKNOWN
  ↓
AMBER
  ↓
SEPARATION
  ↓
OBSERVATION
  ↓
DELIBERATE REACTION
```

The candidate maxim is:

> **Preserve first. Isolate second. React deliberately.**

And the sharper pressure law is:

```
potential may persist
reactivity must be locally granted
propagation must be harder than deactivation
```

## Amber means dormant, not destroyed

`Amber` is the Freeport metaphor for preserving a foreign specimen in an inert, attributable form.

A specimen in amber may retain:

* exact bytes or a canonical inert representation;
* stable identity / content address;
* source provenance;
* foreign claims as claims;
* enough structure for inspection, comparison, translation, and later replay.

It should not thereby retain:

* ambient execution;
* native callbacks or runtime handles;
* destination credentials;
* propagation capability;
* local authority.

```
preserved != active
preserved != trusted
preserved != admitted
```

The point is not to destroy the unknown. It is to preserve it **without preserving its ability to act**.

## Separation means co-residence is not interaction

A Freeport should not default to one ambient commons.

```
FOREIGN A -> AMBER CELL A
FOREIGN B -> AMBER CELL B

CELL A -X- CELL B
```

Two individually non-consequential foreign specimens may become consequential when composed.

Examples include:

* data + interpreter;
* callback half + callback half;
* reference + missing capability;
* parser-safe fragment + parser-safe fragment that becomes ambiguous when concatenated;
* inert object + foreign decoder that gives the object new executable meaning.

Therefore:

```
co-residence != permission to interact
```

and:

```
foreign + foreign
-> foreign-derived
-> still not local
```

If two cells are allowed to interact, that interaction is itself a crossing and should have its own named gate and receipt.

## Reaction must be deliberate

A lawful interaction should specify:

```
initiator
+
input cells
+
declared transform
+
allowed projections
+
activation window
+
termination condition
```

Anything produced by that interaction receives new ancestry rather than silently inheriting the status of either parent.

```
A + B -> C

C ancestry = {A, B, interaction receipt}
C admission = none
C authority = none
```

A destination may later petition to import C through its own gate.

## Deactivation should outrun propagation

The Freeport should prefer a topology in which temporary reactivity naturally falls back into dormancy before a second unaccounted consequence can occur.

Candidate engineering pressure:

```
deactivation rate > propagation rate
```

This is not literal chemical kinetics. It means the system should make the safe return path structurally easier and more automatic than continued consequence.

A temporary activation lease should therefore expire or re-cap the specimen unless a separately named next crossing is admitted.

## New boundary discovered

FREEPORT 001 focused primarily on:

```
foreign -> local
```

This refinement adds another consequential membrane:

```
foreign -> foreign
```

Whenever contact between two foreign specimens can create a third material state, that contact deserves the same No Silent Promotion discipline as any other consequential crossing.

## Smallest hostile specimen

Use two fixtures:

```
A alone -> inert
B alone -> inert
A + B -> consequential if composed
```

Then test:

1. separate residence — no discovery, composition, or consequence;
2. unauthorized interaction — named refusal and no material exchange;
3. authorized bounded interaction — only declared projection crosses and result becomes `foreign-derived`;
4. deactivation race — temporary activation cannot silently propagate twice.

Canonical executable pressure lives in:

`the-static-collective/What-is-the-static-collective-#62` — **FREEPORT 002 — Amber cells / interaction as a crossing**.

## Anti-collapse laws

```
preservation != activation
co-residence != interaction
interaction != admission
foreign-derived != local
dormant != harmless
reactive != authorized
quenching != erasure
termination != loss of history
```

## Relation to radical chemistry

The chemistry analogy remains bounded.

Useful transferable pressures are:

* high reactivity can be useful when spatially and temporally controlled;
* dormant species can preserve future potential without remaining continuously active;
* propagation is a distinct phase from initiation;
* termination and quenching are active control operations;
* compartmentalization changes which reactions are reachable.

What does **not** follow is that software objects literally behave like chemical radicals or that Freeport should copy chemical kinetics.

The analogy earns its keep only where it generates falsifiable security tests.

## Promotion gate

Do not promote `amber`, `cell`, or `reaction` into shared vocabulary merely because the metaphor is productive.

Require:

1. FREEPORT 002 executable evidence;
2. at least one real foreign-to-foreign composition hazard;
3. evidence that isolation changes the security outcome;
4. explicit receipts for authorized interaction and deactivation;
5. one materially different consumer before considering a portable invariant.

Until then, the strongest local statement is:

> **Unknown material may remain preserved and inspectable without being active; co-resident foreign material may not interact without a named crossing; every deliberate reaction must remain attributable and separately admitted.**

**Authority effect:** none. This page refines Freeport security posture and does not grant new execution, admission, or authority.
