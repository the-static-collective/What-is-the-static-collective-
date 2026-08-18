# Human Terminal — Basic-Human Operator Membrane v0.1

**Status:** project-backed design candidate; no implementation proof yet; not universal protocol authority

## Why this appeared now

[Boot the House — Composed Proof v0.1](boot-the-house-composed-proof-v0.1.md) changed the shape of the problem.

The ecosystem no longer lacks a crossing mechanism. A real composed machine specimen now connects:

```text
Full Measure Garden
  -> TranchNode intent decoding
  -> explicit human crossing confirmation
  -> Project0 encounter verification
  -> Corpus OS destination-local disposition
  -> Full Measure residue
  -> changed world projection
```

The newly visible gap is simpler and more human:

> **How does a person understand what this machinery can presently see and do without learning every repository, route, adapter, or CLI command?**

Human Terminal is the first proposed answer.

## Governing claim

> **Human language may project reachable operations; only existing bounded application contracts may perform them. Suggestion is not authority.**

The interface may translate current system state into basic human language. It may suggest likely next moves. It may explain why a door is visible. It may show the evidence underneath an explanation.

It may not turn a suggestion into permission merely because the suggestion was plausible.

## Intended role

Human Terminal is not a new shell with ambient power.

It is a **Full Measure-owned operator/navigation projection** over the existing Boot the House application seams.

The first visible questions are deliberately ordinary:

```text
Where am I?
What doors are nearby?
Why is this door here?
What can I safely do?
Enter a crossing.
What happened last time?
Show me the evidence.
What needs me?
```

Those phrases are human-facing affordances, not new constitutional verbs.

## The three-layer boundary

The proposed architecture keeps interpretation, operation, and authority separate:

```text
human phrase
    ↓
interpreted operator intent
    ↓
bounded Full Measure operation
    ↓
existing donor/runtime machinery
```

The interpreter may propose a known intent. A deterministic Full Measure layer decides which existing application operation that intent corresponds to. The donor systems continue to own their own semantics and authority.

There is no intended fallback from unknown language to arbitrary `exec`, shell interpolation, repository mutation, or donor-specific freeform execution.

## Garden and Terminal are different doors

**Garden** remains the inhabited/world interface.

It is where a person experiences the field, gestures toward a route, explicitly confirms a crossing, and witnesses a changed world.

**Human Terminal** is the operator/navigation interface.

It is where a person can ask what the field currently knows, why a door appears, what moves are presently available, and what evidence explains a prior outcome.

The Terminal must not become a shortcut around the Garden's crossing law.

## Suggested moves carry no authority

A useful move projection might look conceptually like:

```text
MOVE
  label: "Inspect why Corpus is nearby"
  effect: read-only
  evidence: [...]
  source: fixture | live
  authority: none
```

Or:

```text
MOVE
  label: "Enter this crossing"
  effect: requires human confirmation
  evidence: [...]
  authority: none
```

The important part is not the wording. The important part is that **visibility remains distinct from permission**.

This preserves the same distinction already present in Founder Node / Pollen Scout:

```text
relevance
  != authority
```

and the same distinction already proved by Boot the House:

```text
gesture
  != candidate
  != confirmed crossing
  != destination admission
```

## Truth must survive translation into basic human

A human-facing interface is allowed to simplify vocabulary. It is not allowed to flatten known differences.

The existing world runtime distinguishes:

* admitted;
* refused;
* indeterminate;
* destination failed;
* pre-destination validation failed.

Human Terminal should explain those states in ordinary language while keeping their difference intact.

Likewise, nearby doors should continue to expose whether they are live, fixture-backed, unavailable, reachable, blocked, or unknown when the underlying evidence knows that distinction.

## Evidence before explanation

The Terminal may explain a door only from evidence the current projection actually carries.

The intended direction is:

```text
basic human explanation
    ↓
structured Full Measure projection
    ↓
source / receipt refs
```

not:

```text
model familiarity
    ↓
confident explanation
    ↓
retrofit evidence later
```

This matters because the interface will often be the easiest place for a human to encounter the constitutional machinery. Convenience cannot become a competing source of truth.

## First bounded implementation candidate

Full Measure issue #18 and draft PR #19 preserve the project-owned design.

The proposed first implementation does **not** require new donor adapters. It starts with read-only operator intents over the existing Full Measure `worldRuntimeClient`:

```text
orient
list-nearby-doors
explain-door
inspect-residue
```

Then `list-safe-moves` can be derived from witnessed state.

Only after those are proven should `begin-crossing` appear as a narrow handoff into the already-landed Boot the House confirmation flow.

## Relationship to nearby-door discovery

Human Terminal should work against the current truthfully labeled fixture-backed `NearbyDoorSource`.

When Full Measure later replaces that source with the Founder Node bounded adapter, the operator layer should consume the same Full Measure door projection rather than learning Founder Node internals.

```text
fixture door source
      ↓
Full Measure projection
      ↓
Human Terminal

later

Founder Node door source
      ↓
Full Measure projection
      ↓
Human Terminal
```

That seam is one of the main reasons to build the operator layer in Full Measure rather than as a separate ecosystem service.

## What this is not

This proposal does not establish:

* an autonomous agent shell;
* a universal Static Collective command language;
* a master repository graph;
* a central credentials plane;
* freeform LLM-to-shell execution;
* direct mutation of TranchNode, Project0, Corpus OS, or Founder Node;
* automatic crossing;
* a replacement for the Garden;
* a new canonical receipt or identity system.

## Why it may matter beyond the first UI

Many infrastructure organs should probably never grow their own giant dashboards.

A shared operator membrane could eventually let a person ask simple questions across increasingly capable machinery without forcing each constitutional organ to become a product UI.

The pattern would be:

```text
complex bounded machinery
        ↓
truthful application projection
        ↓
basic human language
        ↓
deliberate human choice
```

If that survives implementation, Human Terminal may become a useful interface pattern beyond Boot the House.

It has not earned that generalization yet.

## Project authority

Current project-owned authority lives in:

* Full Measure issue #18 — `Human Terminal v0.1 — basic-human operator membrane over Boot the House`
* Full Measure draft PR #19 — `docs: design Human Terminal operator membrane`
* Full Measure design file — `docs/superpowers/specs/2026-08-17-human-terminal-v0.1-design.md`

This GitBook page is a portable frontier projection of that design. The repository remains authoritative for implementation scope and changes.

## Governing compression

> **The Human Terminal may tell a person what the House can presently see and what doors it can presently offer. It may never pretend that seeing a door is permission to walk through it.**
