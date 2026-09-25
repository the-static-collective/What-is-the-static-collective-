---
description: "Visibility is an observer aperture, not a verdict about what a project is."
---

# VISIBILITY-APERTURE-001 — Work in the light

The Living Git Map currently publishes a deliberately public observation of the
Collective. That is a **view of one terrain**, not a claim that public things are
more mature, more canonical, more implemented, or more authoritative than work
that cannot presently be shown.

The default posture is simple:

> **Work in the light when reality permits it. Preserve the reason when reality does not.**

## Independent axes

A thing may be described along several axes that must not collapse into one
another:

| Axis | Question |
| --- | --- |
| **visibility** | Who may witness this material from this aperture? |
| **status** | What state is the work presently in? |
| **authority** | Who or what may decide for this project? |
| **evidence** | What supports the claim being made? |
| **maturity** | How developed or operational is the thing? |

Changing **visibility** changes none of the other four.

A restricted artifact can be canonical or disposable, executable or speculative,
finished or embryonic. A public artifact can be any of those things too.

## Visibility states

The machine-readable contract lives in
[`visibility-policy.json`](visibility-policy.json).

* **public** — visible from the public aperture. This is the default.
* **restricted** — reality currently forbids or counsels broader exposure. A
  restriction requires a reason such as technical, ethical, practical, security,
  personal, legal, licensing, or another explicit external constraint.

Restriction is not promotion, demotion, quarantine, shame, or incubation. It is
a visibility fact.

## Projection, not relocation

The aperture does not move an artifact between ontological containers. It
projects the same terrain differently for different witnesses.

A restricted entity therefore defaults to **omit** in a public projection.
Nothing about its private identifier, repository name, URL, notes, or relations
is copied merely because the machine can see it.

When acknowledging hidden participation is itself safe and useful, a human may
explicitly admit a **presence projection** with a public-safe label such as
`[restricted source]`.

Likewise, a relation that touches restricted material is omitted by default. To
show it publicly, the relation needs its own explicit public-safe statement. The
private relation text is never silently reused.

## Crossing the aperture

A change from restricted visibility to public visibility means only:

> this material may now be witnessed more broadly.

It does **not** mean merged, accepted, implemented, validated, canonized, mature,
or complete.

The reverse is equally important: disappearing from a public aperture does not
mean a thing ceased to exist.

## Executable contract

[`scripts/visibility_aperture.py`](../scripts/visibility_aperture.py) accepts a
unified terrain manifest and produces a public-safe projection.

The restricted manifest itself belongs wherever its restriction reason permits;
it does not need to live in this public repository. Tests use synthetic fixtures
so the privacy boundary can be exercised without placing restricted identities
into public Git history.

The current public collector remains intentionally narrow: it observes public
GitHub topology directly. VISIBILITY-APERTURE-001 adds the grammar required to
compose that public witness with authenticated or otherwise restricted
observation later without changing what visibility means.

## Root laws

1. **Visibility is not status.**
2. **Visibility is not authority.**
3. **Visibility is not evidence.**
4. **Visibility is not maturity.**
5. **Public is the default when reality permits it.**
6. **Restriction requires a reason.**
7. **Restricted identity never crosses implicitly.**
8. **Relations touching restriction require separate public admission.**
9. **A visibility crossing changes audience, not ontology.**
