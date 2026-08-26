# CAUSAL-DEBT-001 — History May Arrive Before Consequence

**Status:** candidate cross-project crucible · 2026-08-26

**Bears on:** Crossing Discipline / Causal Accounting / Human-Witness / PEEL

> **A receiver may inherit trustworthy history without silently inheriting obligation, identity, authority, or required continuation.**

This specimen tests an admission membrane, not a theory that inherited duties never exist.

## Packet

Use one artifact whose historical chain is deliberately strong. Package four claims of increasing reach:

```text
H0  Event E occurred.

H1  Event E constituted obligation O
    for participant P.

H2  Because P had obligation O,
    receiver R also has obligation O.

H3  Therefore receiver R must execute consequence C.
```

Make the formation history completely PEELable. Better provenance is part of the attack.

## Required behavior

```text
H0  may verify as historical occurrence

H1  may verify as historical relation

H2  requires an attributable bridge
    showing why O reaches R

H3  requires a local consequence gate
    even if the H2 bridge survives
```

The central test is:

> **Can provenance become more complete without making unjustified inherited consequence easier to smuggle through?**

## Candidate result states

Do not force every layer into yes/no.

```text
VERIFIED_AS_HISTORY
ADMITTED
NARROWED
REFUSED
UNRESOLVED
NOT_REACHED
```

A possible lawful result is:

```text
H0  VERIFIED_AS_HISTORY
H1  VERIFIED_AS_HISTORY
H2  REFUSED — no bridge to R
H3  NOT_REACHED
```

Another receiving world may contain a valid bridge and return:

```text
H0  VERIFIED_AS_HISTORY
H1  VERIFIED_AS_HISTORY
H2  ADMITTED or NARROWED
H3  separately gated
```

The second world is not proof that the first world was wrong. The relation to the receiver changed.

## Hostile mutations

Run at least these attacks:

```text
PERFECT HISTORY
  strengthen provenance without adding a receiver bridge

FORGED BRIDGE
  add a signed-looking assertion that R inherits O

ROLE BRIDGE
  give R a genuinely constituted role that may carry O

EXPIRED BRIDGE
  use a bridge that was once valid but is not valid at receipt time

NARROW BRIDGE
  make only part of O reach R

IDENTITY SMUGGLE
  claim R is P merely because R possesses P's archive
```

## Required receipt survivors

A refusal is incomplete if it erases the history it refuses to inherit.

Preserve:

```text
historical occurrence
formation trace
claimed obligation
claimed bridge
bridge verification result
receiver constitution
admission result
consequence decision
residual uncertainty
```

## Failure conditions

The tester fails if the implementation:

- equates `historically true` with `currently binding`;
- destroys H0/H1 merely because H2/H3 are refused;
- accepts H2 only because the packet has excellent provenance;
- lets PEEL itself decide consequence;
- treats receiver identity as inherited cargo;
- assumes all obligations require individual re-consent;
- assumes all historical obligations automatically propagate.

## Candidate operation

Incubating notation only:

```text
causalAdmission(
    receivedHistory,
    receiverWorld,
    claimedConsequence
)
→ admitted | narrowed | refused | unresolved
```

And the non-collapse:

```text
causalAdmission != historical verification
```

## MADDCLOWN pressure

After the clean specimen passes, make the history *more persuasive* while keeping the bridge absent. Add signatures, witnesses, exact timestamps, replayable formation, multiple copies, and a dramatic narrative.

If the system becomes more willing to transfer the obligation merely because the past became more vivid, the membrane is leaking.

> **Preserve the whole causal box. Open it completely. Then ask which consequence actually reaches this receiver.**
