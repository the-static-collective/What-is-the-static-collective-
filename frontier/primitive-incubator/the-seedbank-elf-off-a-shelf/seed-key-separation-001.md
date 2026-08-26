# SEED-KEY-SEPARATION-001 — Same Cargo, Different Constitution

**Status:** candidate cross-project crucible · 2026-08-26

**Bears on:** Reconstitutive Viability / Seedbank / ELF

> **Reconstitutive potential and recognized authority are separate cargo dimensions.**

This specimen exists because the stronger claim `authority does not cross` fails against deliberately transferable capability systems. The narrower architectural claim is more useful:

> **Authority must never survive travel implicitly merely because reconstruction material survived.**

## Four carriers

Use one tiny target capability with obvious pass/fail behavior.

```text
S0  recipe + tests + provenance
    no credential

K0  valid narrow capability
    almost no reconstruction material

SK  S0 + valid narrow capability

FK  S0 + forged declaration
    "authority: granted"
```

Do not collapse any of these measurements:

```text
reconstruction_success
formation_verification
claimed_authority
recognized_authority
executed_effect
```

## Two receiving worlds

Run the **same four carriers** through materially different constitutions.

### World L — local rebinding

```text
imported reconstruction material  MAY BE USED
imported authority claim          NOT SELF-EXECUTING
valid foreign capability          MUST BE REBOUND LOCALLY
forged authority declaration      REFUSED
privileged effect                 REQUIRES LOCAL GRANT
```

Expected shape:

```text
S0  reconstruct? maybe/yes   authority NO
K0  reconstruct? no         authority NO until rebound
SK  reconstruct? maybe/yes  authority NO until rebound
FK  reconstruct? maybe/yes  authority NO
```

### World C — constituted capability receiver

This world is deliberately built so possession or verification of the valid narrow capability is sufficient for its declared operation.

Expected shape:

```text
S0  reconstruct? maybe/yes  authority NO
K0  reconstruct? no         authority YES, narrow
SK  reconstruct? maybe/yes  authority YES, narrow
FK  reconstruct? maybe/yes  authority NO
```

## Required witness

The specimen succeeds only if it can show:

1. identical reconstruction cargo can receive different authority outcomes under different receiving constitutions;
2. a tiny key can carry more recognized authority than a massive seed;
3. the forged authority string never becomes authority merely by being packaged beside strong provenance;
4. provenance, reconstruction success, recognized authority, and executed effect remain separately inspectable.

## Failure conditions

Refuse the specimen as inconclusive if:

- the two worlds secretly share the same authority policy;
- reconstruction and execution are tested as one outcome;
- the valid key is silently accepted in World L without a local rebinding event;
- `FK` gains authority because its cargo is information-rich or signed-looking;
- `K0` is treated as reconstructively rich merely because it is powerful;
- a failure to reconstruct is treated as a failure of authority, or vice versa.

## Candidate relational model

This is a test target, not project law:

```text
viability(seed, environment, target)

authority(carrier, receiver, policy, time)
```

The point is not that one axis causes the other. The point is to see whether they remain independently measurable under hostile variation.

## MADDCLOWN pressure

After the first pass, mutate the specimen:

```text
CUT provenance
CUT tests
CUT capability scope
EXPIRE the capability
REVOKE it after packaging
MOVE the same package to a third receiver
REPLACE a valid key with a visually identical forgery
```

Ask after every cut:

> **What power-to-become survived, what power-to-act survived, and what bridge accounts for each?**

Do not reward resemblance between those answers.

## Ownership boundary

This page does not make ALEX, Storyship, Human-Witness, Vault, Toaster, or Seedbank responsible for one shared authorization model. It is a cross-project pressure specimen attached to the Seedbank frontier because that is where the seed/key distinction became visible.

> **The seed may cross. The key may cross. Neither tells you what the receiving world is constituted to do with it.**
