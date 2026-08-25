# Human Witness — Encounter Evidence Membrane

**Status:** project-backed architecture seed; landed in `the-static-collective/Human-Witness` on 2026-08-25.

Repository: https://github.com/the-static-collective/Human-Witness

Landed seed commit: `42ac68a2673c135acc2df2b788748596021709ce`

## Defining law

> **Witness the human act locally. Let the larger graph determine what that act changes.**

Human Witness is a small reusable membrane for attributable human encounters with exact instruments. It exists because a state such as `document.signed = true` collapses several independently important occurrences: what exact artifact was presented, who declared themselves to be acting, in what capacity, what act or refusal occurred, what evidence exists for that occurrence, and what some downstream authority later decided the occurrence meant.

Human Witness preserves the encounter without claiming the downstream judgment.

## Distributed ownership

The surrounding architecture already has the other responsibilities:

```
Upper Room
encounter / continuity grammar
        ↓
Formation Trace
artifact-formation provenance
        ↓
Human Witness
attributable human act / refusal
        ↓
Corpus OS
trust admission / warrant / session /
causal accounting / constituted reality
        ↓
domain layers such as Jubilee Authority Kit
instrument-specific semantics
```

These are neighboring bounded contexts, not stages that silently inherit each other's authority.

## Human Witness owns

* exact subject reference and digest/version;
* presentation evidence sufficient to identify what was presented;
* actor declaration;
* declared acting capacity;
* explicit human act or refusal;
* local sequence and time;
* Formation Trace references where relevant;
* optional external-attestation references;
* a sealed encounter receipt.

## Human Witness does not own

* authenticated identity;
* legal capacity;
* legal validity or enforceability;
* trust or contract formation conclusions;
* Corpus OS Trust admission;
* Action Warrant issuance;
* Session execution;
* constituted downstream consequence;
* continuous behavioral surveillance.

A receipt can become evidence in another system. It does not silently become that system's authority.

## Candidate occurrence vocabulary

```
ACKNOWLEDGE
DECLARE
ASSENT
SIGN
WITNESS
ACCEPT_CAPACITY
REFUSE
REVOKE
```

These are occurrence labels rather than universal legal conclusions. Profiles may narrow them or refuse them.

## First proof target

The first executable specimen should stay synthetic and jurisdiction-neutral:

1. bind one exact artifact by digest;
2. record presentation;
3. record a declared actor and capacity;
4. record `ASSENT` or `REFUSE`;
5. seal a deterministic receipt;
6. consume that receipt through an adapter without changing its evidence;
7. prove that no legal-validity or executable-authority field is manufactured.

A second specimen should demonstrate that `SIGN` is merely another attributable human occurrence rather than a magic state transition.

## Current repository bones

```
Human-Witness/
├─ README.md
├─ AGENTS.md
├─ docs/superpowers/specs/
├─ core/
├─ schemas/
├─ adapters/
└─ specimens/
```

No runtime, persistence layer, cryptographic signature scheme, authentication mechanism, or jurisdiction-specific profile has been chosen yet. That restraint is deliberate: the encounter law should survive its first falsifiable specimen before implementation technology hardens the model.
