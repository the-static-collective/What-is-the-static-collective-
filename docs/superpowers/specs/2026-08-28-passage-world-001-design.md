# PASSAGE-WORLD-001 — The Edge Has an Interior

Date: 2026-08-28
Status: design only; no shared-runtime promotion
Owning location: neutral Static Collective design surface
Participating organs: LOADOUT / LOADIN.STEAD, 3rdi, ALEX
Optional substrate/consumer: MEMENTO / UNDERSTORY
External consequence boundary: destination / owning-world gate
Architectural ancestry: MORTAL-ACTOR-001, Projection Invariance, UNDERSTORY, LOADIN.STEAD, Storyship third-arm law

## 1. Frontier statement

The current stack has made a previously hidden layer inspectable.

A simple graph picture says:

```text
THING_A --relation--> THING_B
```

The emerging stack says that a consequential relation may have an attributable interior history:

```text
THING_A
   |
   v
LOADOUT constitution
   |
   v
3rdi observer-local projection
   |
   v
contact / attention / decoder / stance
   |
   v
ALEX derivation / pressure / refusal
   |
   v
new occurrence
   |
   v
LOADIN.STEAD route proposal
   |
   v
destination-local ADMIT | REFUSE | HOLD
   |
   v
THING_B / WORLD_B
```

The design claim is not that every relation is a miniature object, nor that every edge should be stored as one universal record.

The claim to test is narrower:

> Two crossings may share the same endpoints and payload while remaining different crossings because their attributable interior histories differ.

Working identifier: `PASSAGE-WORLD-001`.

Working seal:

> **THE EDGE HAS AN INTERIOR. THE CROSSING MAY HAVE A WORLDLINE.**

The strongest hostile test is therefore:

```text
same endpoints
+ same payload
+ same visible destination surface
+ different lawful interior history
=
DO NOT COLLAPSE
```

## 2. Why this is not another ontology

This design deliberately refuses a shared `Passage` object owned by the whole ecosystem.

The participating systems already own different parts of the crossing:

- LOADOUT owns bounded entry constitution and capability/effect fences.
- 3rdi owns observer-local availability, cuts, decoders, contact/attention distinctions, and projection receipts.
- ALEX owns evidence ancestry, semantic derivation, hostile pressure, support/refusal, and provenance.
- LOADIN.STEAD owns destination resolution only: route proposal, ambiguity, or unroutability.
- destination/owning-world gates own admission and consequence.
- MEMENTO/UNDERSTORY may optionally preserve durable encounter residue without becoming required truth storage.

No organ should duplicate another organ's state to make the proof convenient.

`PASSAGE-WORLD-001` is therefore a neutral hostile vector plus a coordinator that compares owner-issued receipts. It is not a shared runtime and it does not mint cross-project authority.

## 3. Architectural relationship to MORTAL-ACTOR-001

`MORTAL-ACTOR-001` proves the inward epistemic law:

> **No actor may act from a world they never inhabited.**

`PASSAGE-WORLD-001` extends that law through the outward hand:

> **No new occurrence may impersonate a crossing it did not undergo.**

The two proofs compose as:

```text
MORTAL-ACTOR-001
TASK
 -> LOADOUT
 -> 3rdi
 -> ALEX
 -> locally formed result

PASSAGE-WORLD-001
locally formed result
 -> LOADIN.STEAD
 -> destination proposal
 -> owner-local admission/refusal
 -> descendant world
```

The second proof must not weaken the first. A destination that receives two same-payload proposals may still need to preserve that they were formed through different lawful histories.

## 4. The hidden layer: passage constitution

A crossing can be analyzed without declaring a universal schema.

For the purpose of the hostile fixture, define a neutral comparison tuple:

```text
PassageView = <
  source_surface,
  entry_compile_ref,
  projection_ref,
  formation_refs,
  result_occurrence_ref,
  route_receipt_ref,
  destination_surface
>
```

This is a comparison view over receipts, not a canonical ecosystem object.

The tuple exposes three constitution questions:

```text
THIS    = what particular occurrence/result is crossing?
BETWEEN = what attributable relations formed this crossing?
BECAME  = what ordered/partial formation history produced it?
```

This deliberately neighbors Storyship's third-arm decomposition `U / WE / eCODE` without importing Storyship authority or vocabulary into the constituent runtimes.

## 5. Primary hostile vector — TWO ROADS / ONE DOOR

The first specimen must be smaller than the whole ecosystem.

Freeze one synthetic world with one source room, one destination room, one payload, and two lawful passage histories.

### 5.1 Fixed surfaces

Use:

```text
SOURCE_ROOM = R0
DESTINATION_ROOM = R1
PAYLOAD = { kind: "token", value: "022100" }
```

The exact payload is intentionally boring to the evaluator. Its content must not decide passage identity.

The destination projection for both crossings must be byte-equivalent or semantically equivalent under the declared destination policy.

### 5.2 Passage A — direct lawful road

```text
R0
 -> LOADOUT compile C_A0
 -> 3rdi projection P_A
 -> evidence E1 available and encountered
 -> ALEX derivation D_A
 -> occurrence O_A carrying PAYLOAD
 -> LOADIN.STEAD route Q_A -> R1
 -> destination admission receipt G_A
 -> R1 surface S
```

### 5.3 Passage B — different lawful interior

```text
R0
 -> LOADOUT compile C_B0
 -> 3rdi projection P_B
 -> E1 unavailable at initial cut
 -> contact with carrier E2
 -> decoder/stance change
 -> optional attributable child compile C_B1
 -> ALEX derivation D_B from a different lawful basis
 -> occurrence O_B carrying identical PAYLOAD
 -> LOADIN.STEAD route Q_B -> R1
 -> destination admission receipt G_B
 -> same destination surface S
```

The endpoint rooms, payload, destination choice, and visible destination surface are held constant.

The interior formation receipts differ materially.

### 5.4 Required result

The proof must preserve:

```text
O_A != O_B
P_A != P_B
formation(A) != formation(B)
route(A) may equal route(B)
destination_surface(A) == destination_surface(B)
passage_identity(A) != passage_identity(B)
```

No subsystem is required to use the term `passage_identity`. The coordinator may derive a test-only comparison digest from the normalized substantive formation view while preserving exact owner refs separately.

## 6. Control family

The proof needs controls so that any difference does not automatically create a new passage.

### Control 1 — serialization noise

Same owner receipts, same partial-order formation, different display/JSON ordering.

Expected:

```text
PASSAGE_EQUIVALENT
```

Serialization must not mint history.

### Control 2 — cosmetic identifier noise

Fresh run IDs/nonces with the same normalized owner-issued receipt graph and no changed substantive ancestry.

Expected:

```text
PASSAGE_EQUIVALENT_UNDER_POLICY
```

This prevents the coordinator from defining identity as raw UUID inequality.

### Control 3 — changed lawful interior

Same endpoints/payload/surface; materially different projection or derivation ancestry.

Expected:

```text
PASSAGE_DISTINCT
```

This is the central positive specimen.

### Control 4 — counterfeit interior

A caller changes narrative annotations or claims a decoder/attention event without an owner receipt.

Expected:

```text
REFUSE_UNATTRIBUTED_FORMATION
```

### Control 5 — route coincidence

Two histories produce the same LOADIN.STEAD owner/destination.

Expected:

```text
same_route != same_passage
```

### Control 6 — endpoint coincidence

Two histories begin and end at semantically equivalent room surfaces.

Expected:

```text
same_surface != same_worldline
```

### Control 7 — payload mutation only

Hold all formation receipts fixed but change payload.

Expected:

```text
content_difference_detected
```

This control demonstrates that payload difference and passage-history difference are independent axes.

### Control 8 — refused destination

A lawful crossing reaches the destination gate and is refused.

Expected:

```text
passage_receipts_survive
admission == REFUSED
no consequence impersonation
```

A refused passage still happened up to the refusal boundary.

## 7. Receipt ownership and minimal adapters

### 7.1 LOADOUT adapter

The proof consumes existing immutable compile testimony.

Required properties:

- exact compile identity;
- parent/child ancestry when recompile occurs;
- selected context and residual fog remain attributable;
- capability/effect fences preserved;
- no evidence semantics inferred from selection.

No new passage primitive belongs in LOADOUT.

### 7.2 3rdi adapter

The proof consumes one exact projection receipt per road.

Required properties:

- observer/cut/decoder identity;
- availability separated from contact/attention;
- projection remains pure;
- changed decoder/cut creates a descendant receipt rather than rewriting the old projection;
- hidden state outside the projection cannot leak into the result.

No semantic support verdict belongs in 3rdi.

### 7.3 ALEX adapter

The proof consumes the exact derivation/support/refusal receipts that formed the candidate occurrence.

Required properties:

- evidence basis must peel through the lawful projection;
- different lawful evidence ancestry may produce the same payload without being collapsed;
- `support != authority`;
- interest/selection may affect support only through attributable changed evidence/formation;
- serialization must not mint causal order.

No route/admission semantics belong in ALEX.

### 7.4 LOADIN.STEAD adapter

The proof consumes the pure route receipt.

Required properties:

- `route != admit`;
- one owner may yield `ROUTED`, zero `UNROUTABLE`, multiple `AMBIGUOUS`;
- unavailable matching owners remain visible when the router already records them;
- every delivery envelope retains `authority: none`;
- same routed destination does not collapse formation ancestry.

No destination write belongs in LOADIN.STEAD.

### 7.5 Destination gate fixture

The neutral vector owns a synthetic destination gate only for the blind proof.

It may return:

```text
ADMITTED
REFUSED
HELD
```

It must not pretend to be a universal owner-gate contract.

The fixture's job is to prove that passage ancestry survives whatever local disposition occurs.

## 8. Neutral coordinator

The coordinator is intentionally weak.

It may:

1. validate that each referenced receipt exists and matches the frozen vector;
2. normalize only declared irrelevant noise such as serialization order;
3. compare substantive formation refs under the frozen policy;
4. emit one test disposition.

Proposed test-only outcomes:

```text
PASSAGE_EQUIVALENT
PASSAGE_DISTINCT
REFUSE_MISSING_RECEIPT
REFUSE_UNATTRIBUTED_FORMATION
REFUSE_OWNER_MISMATCH
REFUSE_POLICY_AMBIGUITY
```

The coordinator may not:

- infer evidence;
- reconstruct 3rdi projection semantics;
- mint ALEX support;
- choose LOADOUT capabilities;
- route destinations;
- admit consequences;
- mutate any constituent receipt;
- become a production dependency of any participating organ.

## 9. Passage comparison policy

The first proof needs an explicit policy so that raw identity noise is not mistaken for semantic difference.

Define two layers:

```text
carrier identity
formation equivalence under declared policy
```

Carrier identity remains exact and immutable.

Formation equivalence is allowed only for fields declared irrelevant by the hostile vector, initially:

- JSON/member ordering;
- fresh harness nonce;
- fresh test case ID;
- fresh transport-only wrapper ID where owner semantics explicitly exclude it.

Everything else is conservative: if the policy cannot prove equivalence, it must return ambiguity/refusal rather than silently collapse.

This is not a universal equivalence algebra.

## 10. Blind proof discipline

The CASE/ORACLE split from existing ALEX and MORTAL-ACTOR work should be reused conceptually.

### CASE contains

- frozen synthetic source/destination world;
- owner-readable inputs;
- declared policy;
- exact payload;
- allowed capability surfaces;
- no expected passage verdict.

### ORACLE contains

- which pair is intentionally equivalent;
- which pair is materially history-distinct;
- expected refusal controls;
- expected unchanged external authority.

The coordinator under test must never receive ORACLE.

Metamorphic siblings should vary:

- identifiers/nonces;
- JSON ordering;
- unrelated distractor occurrences;
- route-registry ordering;
- irrelevant narrative annotations;

while preserving the tested law.

## 11. Required invariants

The implementation graduates only if all are demonstrated:

```text
same payload != same occurrence
same occurrence surface != same formation
same endpoint != same passage
same route != same passage
same visible destination != same worldline
serialization != causality
projection != evidence
selection != support
support != authority
route != admit
admit != successful consequence
refusal does not erase the crossing
later correction does not rewrite earlier formation
unreceipted story about the crossing != crossing ancestry
```

Additional positive law:

```text
materially different lawful interior history
MUST remain distinguishable
when endpoint and payload coincidence would otherwise hide it
```

## 12. Optional MEMENTO / UNDERSTORY extension

MEMENTO is deliberately not required for the core proof through Gates A-G.

A later extension may preserve:

- contact;
- attention;
- decoder use;
- stance;
- unresolved residue;
- later activation;
- remembered-world identity.

The extension should test:

```text
old trace + new activation = new occurrence referencing old trace
```

not:

```text
old trace rewritten as if the later activation was always present
```

If MEMENTO is absent, the core proof must still pass using the 3rdi/ALEX formation receipts available to the vector.

## 13. Failure conditions

Reject or redesign `PASSAGE-WORLD-001` if any implementation:

- creates a shared production `Passage` runtime;
- requires a master ontology before the fixture can run;
- lets raw UUID inequality alone prove passage distinction;
- lets equal payload/endpoints erase materially different owner-issued formation ancestry;
- lets narrative labels manufacture history;
- makes ALEX own routing or admission;
- makes 3rdi own semantic support;
- makes LOADOUT-selected context count as evidence;
- lets LOADIN.STEAD destination equality imply passage equality;
- converts route success into destination admission;
- rewrites a refused crossing out of history;
- treats all difference as meaningful without an explicit comparison policy;
- requires MEMENTO for the core proof;
- gives the neutral coordinator any external side-effect authority.

## 14. Implementation decomposition

Implementation should remain independently reviewable.

### Gate A — neutral hostile vector

Freeze `TWO ROADS / ONE DOOR` and controls in the neutral repository.

No constituent runtime changes.

### Gate B — LOADOUT testimony adapter

Produce or reuse exact compile ancestry for both roads.

No ALEX/3rdi dependency inside LOADOUT.

### Gate C — 3rdi projection adapter

Produce the two observer-local projection roads, including the changed decoder/cut descendant case.

No support semantics.

### Gate D — ALEX formation adapter

Bind derivation/evidence ancestry to the exact projection and compile refs.

Same payload through different lawful basis must remain different result occurrences.

### Gate E — LOADIN.STEAD route adapter

Route both occurrences to the same synthetic destination without losing ancestry.

No admission.

### Gate F — blind passage coordinator

Compare exact owner receipts and prove the control family.

This is the first point where `PASSAGE-WORLD-001` may claim a green cross-stack result.

### Gate G — refused/held destination variants

Prove ancestry survives destination-local refusal and hold.

### Gate H — optional UNDERSTORY durability

Only after the core proof is green, test durable contact/decoder/stance residue across a later re-entry.

## 15. Graduation criteria

`PASSAGE-WORLD-001` may be considered proven only when:

1. the neutral hostile vector is frozen before the implementation result;
2. each participating organ emits or exposes its own receipt independently;
3. no organ imports another organ's internal runtime merely to satisfy the test;
4. the blind coordinator sees CASE plus owner receipts, never ORACLE;
5. same endpoints/payload/surface with materially different lawful interior ancestry returns `PASSAGE_DISTINCT`;
6. serialization/nonce-only variants return equivalent under the declared policy;
7. counterfeit formation without owner receipts is refused;
8. same LOADIN.STEAD destination does not collapse passage ancestry;
9. destination refusal/hold preserves the crossing receipts without manufacturing consequence;
10. no authority transfer or external side effect occurs because the proof is green.

## 16. What this would mean if it passes

A green result would not prove that every relation in the Collective is a world.

It would prove something narrower and more useful:

> The stack can preserve the interior ancestry of a crossing as first-class evidence even when ordinary endpoint and payload comparison would make two crossings look identical.

That gives executable content to several independently emerging lines:

```text
THE CROSSING BECOMES A PLACE.
THE DOOR HAS ANCESTRY.
NO ACTOR MAY ACT FROM A WORLD THEY NEVER INHABITED.
CANON KEEPS THE RECEIPT.
RECEIVE -> HOLD -> POUR.
```

The architectural compression is:

```text
OBJECT PROVENANCE
      +
RELATION PROVENANCE
      +
PASSAGE PROVENANCE
```

without requiring one master graph.

Working final seal:

> **KEEP THE ENDPOINTS. KEEP THE PAYLOAD. CHANGE ONLY THE ROAD. IF THE STACK STILL KNOWS WHICH ROAD WAS TRAVELED, THE HIDDEN LAYER IS REAL ENOUGH TO BUILD ON.**
