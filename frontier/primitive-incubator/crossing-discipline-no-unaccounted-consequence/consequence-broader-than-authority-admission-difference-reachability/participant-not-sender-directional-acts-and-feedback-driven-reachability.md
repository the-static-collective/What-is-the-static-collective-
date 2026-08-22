---
description: >-
  Incubating model: stable participant nodes, directional send/receive acts,
  feedback-driven state change, and reachability that can change after
  encounter.
---

# Participant, Not Sender — Directional Acts & Feedback-Driven Reachability

## Status

**Incubating frontier refinement / thought slice.**

This note extends **Consequence Is Broader Than Authority — Admission, Difference & Reachability** using a bounded control specimen from National Treasure's radio-propagation work and a communication-theory question raised in conversation.

It does **not** establish a universal communication ontology, a global node schema, a feedback controller, or a new authority model.

The smallest useful correction is:

> **Participant is the noun. Sending and receiving are directional acts or presently available capabilities, not permanent identities of the node.**

A second candidate follows:

> **In a feedback-capable encounter, reception may change the participant and/or field, which can change the conditions of the next transmission and therefore later reachability.**

Both remain candidate structure until they survive materially different specimens.

***

## The flattening to avoid

A one-way diagram is useful:

```
sender
  ↓
channel
  ↓
receiver
```

But it is easy to accidentally turn those labels into ontology:

```
NODE A = SENDER
NODE B = RECEIVER
```

That becomes misleading as soon as B can answer, refuse, transform, relay, store, or otherwise produce the next consequential act.

A less flattening model keeps the stable subject separate from the directional event:

```
PARTICIPANT A
  -- emits -->
FIELD / CHANNEL
  -- received by -->
PARTICIPANT B
```

Then later:

```
PARTICIPANT B'
  -- emits -->
FIELD'
  -- received by -->
PARTICIPANT A'
```

The primes matter. Reception may have consequence. The participant after encounter need not be identical in state to the participant before encounter.

***

## Stable node, changing capabilities and acts

A participant may carry several capabilities without exercising all of them at once:

```
PARTICIPANT
  capabilities:
    emit
    receive
    transform
    store
    refuse
    relay

  current encounter acts:
    receiving now
    interpreting now
    refusing now
    emitting now
    idle now
    blocked now
```

This suggests a hard distinction:

```
participant identity
  != capability
  != current role
  != directional act
```

The nouns stay relatively stable.

The verbs establish direction.

That avoids encoding accidental topology into identity.

***

## Capability, reachability, authority, consequence

The conversation sharpened four different questions that should not collapse.

### Capability

> **What can this participant do in principle or under some supported condition?**

A node may be capable of emitting or receiving even when no present relation makes that capability usable.

### Reachability

> **Given the current participants, field, environment, and constituted cut, which directional acts can presently matter?**

The National Treasure radio case provides the grounded control specimen:

```
source condition
  + medium condition
  + receiver relation
  → possible encounter
```

The source can remain active while the medium changes which relations are reachable. A newly available path can even suppress another path.

So:

```
capability != reachability
```

### Authority

> **If a consequential transition is reachable, may it be admitted here?**

Reachability does not grant authority.

A participant may be technically able to send a request that the receiving world lawfully refuses.

### Consequence

> **What attributable difference actually entered history?**

A refusal can be consequential.

A failed decode can be consequential.

A successful exchange can be consequential.

A received message that changes later routing can be consequential without acquiring dominion over the receiver.

The compact distinction is:

```
CAPABILITY ≠ REACHABILITY ≠ AUTHORITY ≠ CONSEQUENCE
```

***

## The encounter-cycle

Once the receiver can become a transmitter, the communication shape becomes recursive:

```
STATE_A(t)
    ↓
 emission_A
    ↓
 FIELD(t)
    ↓
 reception_B
    ↓
 consequence_B
    ↓
 STATE_B(t+1)
    ↓
 emission_B
    ↓
 FIELD(t+1)
    ↓
 reception_A
    ↓
 consequence_A
    ↓
 STATE_A(t+2)
    ↺
```

The important candidate is not merely that messages travel both directions.

It is that each reception may alter:

```
participant state
field state
relationship state
reachable next acts
```

Therefore the next transmission may occur under different conditions than the previous one.

A bounded compression is:

> **Every consequential reception may rewrite the conditions of the next encounter.**

That is not guaranteed. A reception may be a no-op, may fail, may be ignored, or may be deliberately prevented from changing durable state. The architecture should account for the actual delta rather than assuming transformation.

***

## Feedback does not mean correction

Do not romanticize the loop.

Feedback can:

* stabilize;
* amplify;
* oscillate;
* damp;
* saturate;
* deadlock;
* spread error;
* reinforce a bad attractor;
* close one route while opening another.

So this slice must reject:

```
feedback = learning
feedback = truth
feedback = improvement
feedback = convergence
```

The only safe starting claim is:

> **Feedback creates a causal dependency between later acts and earlier receptions.**

Whether that dependency is beneficial is a separate domain question.

***

## Communication as recursive reachability modification

The strongest synthesis from the conversation is still provisional:

```
SIGNAL
  → RECEPTION
  → CONSEQUENCE
  → ΔPARTICIPANT / ΔFIELD
  → ΔREACHABILITY
  → NEXT SIGNAL
  ↺
```

This is stronger than treating communication as transport alone.

It says an encounter may modify the space of future encounters.

That composes naturally with the parent consequence note:

```
actual consequence
  ↓
residue + receipt
  ↓
changed reachability
```

The feedback refinement adds:

```
changed reachability
  ↓
changes the next encounter possibilities
  ↓
which may produce another consequence
  ↺
```

One candidate developmental sentence is:

> **The lawful unit may sometimes be the encounter-cycle rather than the message.**

That sentence is not yet a primitive. It is a research target.

***

## Grounded control specimen — radio propagation

National Treasure's radio-propagation thread remains the external control because it keeps several stages materially distinct:

```
emission
→ propagation path
→ field at receiver
→ coupling
→ detection
→ decoding
→ attribution
```

The useful transfer is structural only:

* emission does not guarantee encounter;
* path availability depends on relation and medium;
* detection does not guarantee decoding;
* decoding does not guarantee attribution;
* one newly available path may suppress another.

The new research question is whether a second transmission from the receiving side creates a feedback-capable circuit in which participant and field changes must be represented explicitly.

National Treasure owns that research question. This GitBook note owns only the provisional architectural extraction.

***

## Relation to existing Collective work

### Consequence Is Broader Than Authority

This is the direct parent.

The present slice makes one part more explicit:

> **Changed reachability can feed back into the next causal cut.**

### Lawful Reachability / Constituted Reality

A capability that exists in bytes is not necessarily presently reachable in the constituted world. The participant model provides another reason not to confuse latent capability with current reachable action.

### Resonant Membrane

The membrane work already treats execution as relational. This slice adds a communication-shaped question: can directional acts alternate across the same relation without assigning permanent sender/receiver identities?

### Human Witness Relay

A human witness can receive, transform, refuse, and later testify. "Witness" therefore need not imply a passive terminal role.

### Haunted Toaster / perceptual loops

A system that observes a specimen, changes candidate generation, and is then observed again is feedback-shaped. But the creative domain should keep its own semantics; this note does not prescribe a global feedback engine.

***

## Candidate neutral grammar

Do not implement this yet. Preserve it only as a comparison target:

```yaml
participant_ref: "..."
capabilities:
  - emit
  - receive
  - transform
  - refuse

act:
  kind: emit | receive | transform | refuse | relay
  from_ref: "..."
  to_ref: "..."
  environment_ref: "..."
  authority_ref: null
  consequence_ref: "..."
```

The important feature is not the field names.

It is the separation:

```
participant ≠ act
capability ≠ act
reachability ≠ authority
act ≠ consequence
```

No shared schema should graduate merely because this YAML is convenient.

***

## Research doors

Three external lines are worth testing before promotion:

1. **Shannon-style communication models** — preserve the value of the one-way decomposition without turning its role labels into permanent identities.
2. **Feedback communication / directed causal information flow** — ask what changes when later inputs depend on earlier outputs.
3. **Control theory** — use it as an adversarial counterexample showing that feedback can stabilize or destabilize rather than automatically improve a system.

These belong in National Treasure until their source road and limits are explicit.

***

## Smallest useful specimens

### Specimen A — alternating directional roles

Two participants possess both `emit` and `receive` capabilities.

Prove that:

```
A emits to B
B receives
B later emits to A
```

without retyping either participant as permanently `Sender` or `Receiver`.

### Specimen B — consequential reception changes reachability

Hold participant capabilities constant.

Let one received event produce an attributable consequence that changes one later reachable act.

Prove:

```
capabilities unchanged
history changed
reachability changed
```

without manufacturing new authority.

### Specimen C — no-op reception

A message is received but produces no attributable state or field difference.

Prove the system does **not** invent a consequence or changed reachability merely because communication occurred.

That negative control matters.

***

## Failure conditions

Drop or revise this clue if it requires any of the following:

* permanent `Sender` / `Receiver` entity classes where alternating acts would suffice;
* automatic authority from successful communication;
* automatic consequence from mere transport;
* feedback treated as inherently beneficial;
* every reception forced to mutate participant state;
* every field change forced to alter reachability;
* a universal event bus or global communication service;
* one global participant schema across projects;
* radio analogy promoted into software truth;
* communication theory used to adjudicate meaning, intent, or moral authority.

***

## Working compression

The present thought slice can be carried as four sentences:

> **Participant is the noun. Sending and receiving are acts. Capability describes what the participant can do; reachability describes what the current relation lets matter. Consequential reception may change the participant or field, thereby changing the possibilities of the next encounter.**

And the sharper loop:

> **Nodes have capacities. Encounters assign direction. Acts create consequence. Consequence can reshape reachability. The next encounter begins from the changed world.**

Preserve this in the incubator until independent specimens decide whether it deserves a smaller, more portable law.
