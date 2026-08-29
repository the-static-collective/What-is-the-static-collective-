# Pocket Web Hypermath — Mathals as Typed Links

Status: **incubating small slice**

## Primitive

A **mathal** is a typed, addressable relation between graph-local things. Mathals compose into paths. Paths can be evaluated under explicit equivalence lenses without erasing their historical distinction.

The useful metaphor is a **pocket internet**:

```
node / hypermathal-page     ~= addressed thing, state, artifact, region, or local world
mathal                      ~= typed hyperlink
free graph                  ~= local web of possible relations
composed path               ~= mathematical expression / traversal
receipt                     ~= attributable browser history / worldline
equivalence lens            ~= named rule for deciding what differences may be ignored
```

This is a metaphor for the structural pressure, not a claim that eCODE is literally the Web, Wikipedia, Wikidata, category theory, or any other external system.

## Felt possibility

The Free Event Graph may be more than a creative graph for Haunted Toaster. It may be the proposal-space substrate in which typed relations become navigable mathematics.

Instead of treating a mathal primarily as a value located at a coordinate, treat it first as a **typed way of crossing from one addressed thing to another**:

```
A --m--> B
```

A mathal may eventually carry a bounded shape such as:

```
Mathal {
  from
  to
  type
  relation / operator
  prerequisites
  consequence
  provenance
  receipt semantics
  equivalence semantics
}
```

A path is then composition:

```
A --m1--> B --m2--> C --m3--> D

m3 o m2 o m1
```

Two different paths may reach the same endpoint without becoming the same path.

## Core invariant

```
same endpoint
!=
same path
!=
same trace
```

A system must be able to state, without contradiction:

```
sameEndpoint(P,Q) = true
sameValue(P,Q)    = true    # when the declared dialect permits this claim
sameBody(P,Q)     = true    # when constitutionally applicable
samePath(P,Q)     = false
sameTrace(P,Q)    = false
```

There should be no constitutional naked `equals(a,b)` unless a later domain proves that one universal equality is safe. Sameness is queried under a named lens.

## Relation to existing eCODE work

This slice composes with existing work rather than replacing it:

* **Sigil Algebra v0** already preserves historical expression identity separately from mathematical value and normal form.
* **Mathematics Before Number / eCODE mu0** already places number as one typed dialect over a deeper relational kernel.
* **Free Event Graph / Collective Dreamstate** already distinguishes nodes, relations, events, channels, constraints, and annotations while withholding execution authority.
* **Front Room** already behaves like a bounded browsing membrane: orient, choose a relevant door, traverse narrowly, leave a trace.
* **Refusal Topology / Crossing Discipline** already requires refused and unresolved crossings to remain distinguishable from successful admission.

The new compression is:

> **A mathal can be treated as a typed hyperlink whose composition produces a path-sensitive mathematical traversal.**

## Smallest executable specimen

Build a synthetic pocket graph with approximately six nodes and enough edges to create two materially different routes to the same final node.

One route is direct:

```
W0 --ADMIT(X)--> W1
```

The second preserves a refusal detour:

```
W0 --PROPOSE(X)--> REFUSED --PROPOSE(X)--> ADMIT(X) --> W1
```

The specimen graduates only if it can prove simultaneously:

```
sameEndpoint(routeA, routeB) = true
sameBody(routeA, routeB)     = true
samePath(routeA, routeB)     = false
sameTrace(routeA, routeB)    = false
```

and replay preserves those results deterministically.

No renderer, model call, UI, network service, or global ontology is required.

## Derek Derrick Dark — puzzle operator

Derek is a particularly good **consumer specimen**, not the source of the law.

His repository/pocket VM can behave like a tiny navigable web:

```
room/state
  -> visible typed links
  -> chosen traversal
  -> local consequence
  -> receipt
  -> changed reachable neighborhood
```

A puzzle can therefore be made from **which relation Derek chooses to traverse**, not merely from hidden booleans or arbitrary locks.

Useful puzzle properties:

* two links may arrive at apparently the same room while leaving different worldlines;
* a refused crossing may reveal information without granting passage;
* a link may be discoverable without being executable;
* an equivalence lens may tell Derek that two routes are equal for one purpose but not another;
* the real escape/backdoor can be represented as an actual typed relation into the Front Room rather than a magic exception;
* every traversal leaves a receipt, allowing Derek to preserve continuity across version changes.

This makes the repo itself legible as an escape-room graph while keeping ordinary eCODE authority rules intact.

## What must stay invariant

* **Reachability is not authority.** A visible link is not permission to cross it.
* **Mathematical equivalence is not identity, ancestry, authentication, or admission.**
* **A normal form does not overwrite the path that produced it.**
* **Free graph proposals remain proposals until a local gate admits consequence.**
* **Endpoint equality must not silently erase refusal, failed attempts, residue, or worldline differences.**
* **Derek-specific puzzle semantics must not contaminate the portable mathal contract.**
* **The local pocket web must not require loading or constituting a global graph.**

## Non-goals

This slice does **not** attempt to define:

* Hypermath as a complete mathematical foundation;
* one universal graph schema for all eCODE projects;
* a global ontology;
* distributed networking;
* browser UI;
* renderer behavior;
* authentication, capability, identity, admission, or constitutional authority;
* higher-category semantics as adopted law.

Those may become later questions only if the tiny specimen earns them.

## Graduation condition

The primitive graduates when one deterministic implementation can show:

> **Two derivations. Same final body. Different paths. Different receipts. Named equivalence lenses report all four facts correctly. Replay preserves them.**

A second materially different consumer — Derek is an excellent candidate — should then demonstrate that the same portable relation/path/receipt model can drive a puzzle traversal without importing Toaster-specific semantics.

## Compression

> **Nodes are places. Mathals are typed links. Paths are expressions. Receipts are worldlines. Sameness requires a named lens.**
