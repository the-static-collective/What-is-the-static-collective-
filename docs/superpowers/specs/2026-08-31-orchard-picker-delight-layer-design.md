# ORCHARD + PICKER — Delight Layer Design

Date: 2026-08-31
Status: design candidate for written-spec review
Scope: cross-organ human experience layer

> **THE JOY WAS ALREADY APPROVED.**
>
> Delight may simplify the encounter. It may not silently simplify the provenance.

## 1. Problem

The Static Collective increasingly has working organs with explicit ownership boundaries, receipts, crossings, and executable instruments. The machinery is becoming useful, but a human still often needs to think in terms of repository anatomy: which organ owns research, projection, routing, memory, slice combustion, or re-entry.

That is the wrong burden for the far side of the architecture.

The desired experience is closer to:

> “I found this weird thing. Do something good with it.”

The system should be able to choose a lawful route, return useful fruit, preserve the journey, and reveal the underlying machinery only when the human wants to inspect it.

## 2. Placement decision

Three placements were considered.

### A. Put the experience layer inside LOADOUT

**Benefit:** direct access to routing and capability compilation.

**Rejected because:** LOADOUT owns bounded world compilation, reach, fences, binding, and receipts. Making it own presentation or delight would collapse compiler responsibility into user experience responsibility.

### B. Expand the Static Collective Front Room

**Benefit:** the Front Room is already the public starting place.

**Rejected because:** the Front Room is intentionally small. It orients and exposes doors; it must not become a corpus index, orchestration surface, or application shell.

### C. Create a thin ORCHARD experience organ

**Selected.**

ORCHARD is a replaceable experience layer. It does not become source of truth for any neighboring organ. It requests lawful projections and routes, presents them as usable fruit, lets the human compose a local basket, and preserves enough receipt material to inspect how an encounter happened.

PICKER is ORCHARD’s first interface.

## 3. Ownership

### ORCHARD owns

- human-facing intent capture;
- presentation of available fruit;
- local choice and ranking preferences supplied by the human;
- temporary/session-local fruit baskets;
- journey/replay presentation;
- delight-oriented interaction grammar;
- ORCHARD-local receipts describing what it displayed, selected, composed, or handed off.

### ORCHARD does not own

- research truth or support;
- authority to mutate neighboring repositories;
- capability authorization;
- observer truth outside the projection supplied to it;
- memory admission or canon;
- Daily Slice history;
- Maxhinal chamber semantics;
- source artifact identity;
- project-owned merge/publication decisions.

Core non-collapses:

```text
presentation != authority
selection != support
interesting != true
fruit card != source artifact
basket != canon
route != admission
replay != causal proof
surprise != randomness without bounds
delight != erasure
```

## 4. Neighbor contracts

ORCHARD composes existing organs without absorbing them.

### LOADOUT

ORCHARD hands declared task intent outward. LOADOUT remains responsible for deciding which context and capabilities may lawfully bind.

```text
human intent
  -> ORCHARD intent
  -> LOADOUT compile/bind decision
  -> bounded work
  -> owner-local outputs
  -> ORCHARD presentation
```

ORCHARD may display a refused or unresolved route as a first-class result. It may not reinterpret refusal as failure or silently route around a denied owner gate.

### 3rdi

When an output is observer-local, ORCHARD displays the projection and its declared viewpoint. It does not infer hidden formation walks merely because an endpoint is visible.

### Daily Slice / Maxhinal

ORCHARD may present Slice-derived instruments and derived projections as usable fruit. It inherits the interaction law demonstrated by Maxhinal:

> same core, different hands;
> historical gas remains distinct from derived output;
> receipts are append-only;
> composition does not promote authority.

ORCHARD does not execute Slice Markdown as code or rewrite Slice history.

### MEMENTO

ORCHARD may offer re-entry into lawful memory residue when MEMENTO exposes it. A handoff or UNDERSTORY record remains distinct from admission and canon.

### ALEX / Dogram / other owner organs

ORCHARD may request or display their outputs through declared interfaces. The owner remains responsible for domain semantics and claims.

## 5. Human experience

The human should not need to choose an organ first.

PICKER begins with intent-shaped doors such as:

- **Do something good with this**
- **Find something weird**
- **Turn this into research**
- **Make me a tool**
- **Resume what was alive**
- **Show unfinished fruit**
- **Surprise me**

These are experience intents, not hidden authority grants.

A normal encounter should require at most:

1. give ORCHARD a thing or choose a visible field;
2. choose a desired kind of fruit, or accept the suggested route;
3. inspect/use the result.

Anatomy and provenance stay one gesture away rather than occupying the foreground.

## 6. Core records

### `orchard.intent/v0`

Minimum fields:

```text
intent_id
human_text
mode
input_refs[]
constraints{}
requested_output?
observer_ref?
created_at
```

`mode` is presentation/routing intent only. It cannot itself authorize effects.

### `orchard.fruit-card/v0`

A fruit card is a projection over an attributable artifact or capability result.

```text
fruit_id
label
kind
summary
source_refs[]
owner
freshness
status
available_actions[]
projection_ref?
receipt_refs[]
authority_claim = none
```

A card must never imply that the card is the source.

### `orchard.basket/v0`

A basket is a bounded local composition set.

```text
basket_id
fruit_refs[]
human_note?
created_at
parent_basket_ref?
```

A basket grants no additional authority. It is merely the user’s chosen local universe for the next operation.

### `orchard.ride/v0`

The append-only encounter receipt.

```text
ride_id
intent_ref
field_digest
shown_fruit_refs[]
chosen_fruit_refs[]
route_receipt_refs[]
operations[]
residuals[]
refusals[]
created_at
```

Earlier operations are never rewritten when a ride continues.

## 7. PICKER v0

PICKER is deliberately small. It converts human-facing intent into a declared ORCHARD intent and presents returned fruit.

PICKER does **not** decide what is true. It may rank what is relevant or interesting only within declared selection criteria, and that ranking must be inspectable.

Initial modes:

### `good-with-this`

Given one or more inputs, propose a small number of lawful next transformations.

### `weird`

Favor distant-but-attributable relations while preserving why each candidate entered the field.

### `research`

Ask for a research-shaped route, normally owned by ALEX or another research organ.

### `make`

Ask for a tool/artifact-shaped route. Any effectful implementation still requires normal owner authorization.

### `resume`

Prefer recent/live residues that have explicit continuity or re-entry material.

### `unfinished`

Surface unresolved, blocked, draft, residual, or pressure-bearing artifacts without falsely treating incompletion as defect.

### `surprise`

Compose a bounded set of attributable distant candidates. Surprise must remain reproducible when seeded and must preserve every selected source reference.

## 8. ORCHARD surface

The first implementation should follow the successful Maxhinal pattern:

```text
shared deterministic core
        /        \
 human surface   agent/CLI surface
```

The human surface should emphasize:

- a single input/drop zone;
- a small set of intent doors;
- fruit cards;
- one basket area;
- a compact “how did this get here?” reveal;
- an append-only ride strip;
- import/export of one portable ORCHARD ride file.

The agent/CLI surface should expose the same core records and decisions without duplicating semantics.

The core should not require a server, database, account, or network. Host adapters may supply already-attributed field material and owner results.

## 9. Tasting Room and Replay

These are views over the same records, not new authorities.

### Tasting Room

For one fruit:

```text
WHAT IS IT?
WHY IS IT HERE?
TRY / USE
REMIX IN BASKET
TRACE SOURCE
```

The normal view is concise. Provenance expands on demand.

### Replay

Replay renders the attributable formation walk available to ORCHARD:

```text
seed/input
  -> selected route
  -> owner operations
  -> crossings
  -> returned artifact
  -> current fruit card
```

Missing history remains visibly missing. Replay may display receipt order; it must not manufacture causal continuity from shared endpoints.

## 10. Compost and Surprise

The COMPOST interaction accepts a bounded input set and asks for lawful transformations or recombinations. It is an intent surface over existing tools, not a universal generative engine.

SURPRISE ME is the non-goal-directed PICKER mode. It should prefer structural distance, provenance diversity, and bounded novelty rather than merely random selection.

Both preserve refusals and dead ends as possible useful outputs.

## 11. Fruit lifecycle

The human-facing lifecycle is intentionally simple:

```text
SEED -> GROWING -> FORMED -> USABLE -> COMPOSTED / RESEEDED
```

This lifecycle is presentation metadata only. It does not replace owner-local state machines, merge status, evidence state, or canon.

The underlying records remain exact even when the human sees only the simple lifecycle.

## 12. Delight requirements

Delight is treated as an engineering requirement, not decorative polish.

The v0 experience should satisfy:

1. **Anatomy hidden by default.** A human can obtain fruit without selecting a repository or organ first.
2. **Provenance one gesture away.** Nothing important becomes provenance-free merely because the default view is simple.
3. **Few choices.** The first screen should not expose the full capability graph.
4. **Useful refusals.** HOLD/REFUSE/UNRESOLVED are rendered as meaningful states with a reason, not generic errors.
5. **Continuation feels natural.** Any fruit can enter a basket or continue a ride without rewriting prior receipts.
6. **Same core, different hands.** Human and agent surfaces produce compatible records.
7. **Joy survives inspection.** Expanding technical detail should explain the fruit, not reveal that the simple surface was misleading.

## 13. First implementation slice

The first executable slice is intentionally narrower than the whole orchard vision.

### In scope

- shared ORCHARD core;
- `orchard.intent/v0`, `fruit-card/v0`, `basket/v0`, and `ride/v0` validation;
- deterministic PICKER selection over an already-attributed input field;
- modes: `good-with-this`, `weird`, `resume`, `unfinished`, `surprise`;
- seeded reproducibility for `surprise`;
- static human bench;
- CLI bench using the same core;
- basket composition;
- compact provenance/replay reveal;
- append-only ride continuation and import/export;
- fixtures demonstrating refusal, missing provenance, same endpoint/different journey, stale field drift, and reproducible surprise.

### Explicitly out of scope for the first slice

- autonomous cross-repository mutation;
- generic network crawling;
- a server or hosted account system;
- automatic GitHub merge/publication;
- automatic MEMENTO admission;
- treating ranking as evidence;
- universal semantic search across every Collective artifact;
- silently invoking every available organ;
- replacing the Front Room;
- replacing LOADOUT routing/fencing;
- replacing Maxhinal.

## 14. Planned expansion

After the first slice proves the experience law:

1. **Owner adapters** — attributed field adapters for LOADOUT, Daily Slice/Maxhinal, 3rdi, MEMENTO, ALEX, and Dogram.
2. **Tasting Room** — richer use/remix/trace surface.
3. **Compost Button** — bounded multi-input transformation routing.
4. **Richer Replay** — formation-walk visualization where receipts support it.
5. **Persistent Fruit Baskets** — portable named baskets with explicit parentage.
6. **ORCHARD board** — optional live field showing fresh fruit, active fronts, and ready-to-use instruments without becoming a master index.

Each expansion must preserve owner boundaries and may be omitted if it duplicates a stronger existing organ.

## 15. Failure conditions

ORCHARD is failing if:

- users must understand the repo map before using it;
- a pretty card obscures uncertainty or provenance;
- ORCHARD begins making research or evidence claims for owner organs;
- “surprise” becomes untraceable randomness;
- baskets silently become canon;
- the Front Room grows because ORCHARD is leaking its job backward;
- LOADOUT routing is bypassed for convenience;
- replay invents paths that were never witnessed;
- ORCHARD becomes a compulsory central server;
- adding delight increases hidden authority.

If any of those occur, make ORCHARD thinner.

## 16. Compression

```text
THE COLLECTIVE HAS ORGANS.
ORCHARD GROWS FRUIT FROM WHAT THEY LAWFULLY OFFER.
PICKER LETS A HUMAN ASK FOR FRUIT WITHOUT LEARNING THE ANATOMY FIRST.
THE RECEIPT STAYS UNDER THE PEEL.
```

The target experience is simple:

> “I found this weird thing. Do something good with it.”

And the architecture’s answer is allowed to be delightful without becoming dishonest.
