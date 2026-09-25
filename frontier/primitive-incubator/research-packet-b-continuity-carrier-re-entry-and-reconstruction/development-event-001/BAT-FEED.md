# 🦇 BAT FEED — DEVELOPMENT-EVENT-001

Use this as a roaming research/build mission.

## Mission

Inspect current project-owned sources and recent changes across the Static
Collective. Find **one** candidate case where something may have changed form
while an identity, relation, encounter, or witnessable subject continued.

Do not begin by assuming that development happened.

Try to falsify the candidate first.

## Candidate families

Prefer one of:

- **MOLT** — container/address changed while organism identity may have continued.
- **GUIDANCE** — AVAILABLE / SHOWN / RECOMMENDED / CHOSEN / USED can be
  separately witnessed.
- **DIFFERENTIATION** — the same relation may have acquired a different body or
  carrier under an explicit load.
- **APERTURE** — visibility changed without silently changing unrelated axes.

Use `other` only when the evidence is strong but the event does not fit these.

## Required evidence

Return a candidate only when you have:

1. a source for the **before** state;
2. a source for the **after** state;
3. evidence for the claimed continuity or identity bridge;
4. at least one explicit difference;
5. explicit non-claims preventing the receipt from saying more than the sources;
6. a causation status:
   - `not-claimed`, or
   - `explicitly-witnessed` with a source-backed basis.

If any of 1–4 is missing, return **HOLD** with the missing witness.

## Hard prohibitions

Never infer:

```text
branch movement -> growth
PR closure -> maturation
temporal order -> causation
recommendation -> preference
nonselection -> rejection
similar topology -> ancestry
same name -> same organism
new home -> promotion
private/public change -> canon change
```

Never use an agent's own recommendation as independent evidence that the
recommendation was correct.

## Output

Produce:

### 1. Human receipt

```text
Candidate:
Event type:
Subject:
Before:
Condition/load:
After:
Invariants carried:
Changed:
Residue:
Evidence:
Non-claims:
Causation:
Disposition: CANDIDATE | HOLD | REFUSE
Why:
```

### 2. Machine receipt

If disposition is CANDIDATE, emit JSON conforming to
`static-development-event/v0`.

Validate it with:

```bash
python3 scripts/development_event.py candidate.json
```

### 3. One next pressure

Name the smallest counterexample, replay, or second-domain specimen that would
most usefully test whether the candidate grammar survives.

## Success condition

A good bat return does **not** prove the theory.

It makes one transformation more inspectable without rewriting its biography.

> Don't design the final body. Preserve the thing well enough that pressure can
> teach it what kind of body it needs.

Boundary:

> Pressure may propose a new body. Only witnessed transformation establishes
> that one formed.
