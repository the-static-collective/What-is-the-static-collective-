# Collective Memory Design

## Purpose

Turn this repository into the Static Collective's public notebook and durable small-artifact memory layer without replacing the canonical homes of established projects.

The governing rule is:

> If it deserves to survive the conversation, but does not deserve a repository, it belongs here.

## Role in the wider system

This repository sits between ephemeral conversation and project-specific architecture:

```text
conversation
    ↓
fragment / note
    ↓
observed pattern
    ↓
specimen / receipt
    ↓
project, when warranted
```

It is not a catch-all wiki and not an alternate source of truth for project implementation. TranchNode law stays in TranchNode. Haunted Toaster implementation stays in Haunted Toaster. This repository preserves portable observations, concepts, language, proofs, and small artifacts that can later inform those projects.

## Information architecture

Six lightweight shelves:

- `notes/` — observations, shower thoughts, incubating ideas, and field notes.
- `patterns/` — reusable laws, architectures, methods, and maxims.
- `fragments/` — small code, text, data, prompts, or other gist-like artifacts.
- `specimens/` — concrete examples and human field-test records that taught us something.
- `receipts/` — evidence worth preserving when no project-specific receipt store is more appropriate.
- `glossary/` — shared vocabulary whose meaning should travel across projects without importing implementation baggage.

Each shelf gets a tiny `README.md` describing what belongs there and what does not.

## Seed artifacts

### `patterns/creative-field-laws.md`

Portable creative architecture laws discovered across Toaster, Lab, and adjacent work. These laws describe invariants, not implementation details, and should be suitable as context for any collaborator or model inventing a new creative axis.

Initial laws:

- weirdness can expand without reducing trust
- source is evidence, not a cage
- garments describe what the world is made of; atmosphere describes what moves through it
- unresolved is not permission to invent
- converge produces a frontier child, not breeding
- preserve anchors; mutate lawful freedom
- coverage before randomness

### `notes/primitive-incubator.md`

A low-friction shower-thought catcher for ideas before they become roadmap obligations. It records the primitive, felt possibility, existing analogue, invariants, and smallest experiment.

### `glossary/static-collective-vocabulary.md`

Short portable definitions for recurring terms such as `anchor`, `ghost`, `receipt`, `witness`, `frontier`, `garment`, `atmosphere`, `possession`, `resolved timeline`, `proposal`, `authority`, `field`, `compost`, and `ancestor`.

Definitions should capture Collective-wide meaning while avoiding project-specific implementation claims.

### `patterns/creative-handoff.md`

A reusable handoff packet for turning a weird idea into a lawful primitive through the progression:

```text
observation
    ↓
underlying phenomenon
    ↓
reusable primitive
    ↓
existing architecture it composes with
    ↓
smallest executable slice
    ↓
proof specimen
```

### `specimens/specimen-notes.md`

A human field-test template recording phenomenological evidence alongside machine receipts. It asks what surprised the operator, what felt alive or fake, what was touched manually, what was expected, what emerged, and whether the observation is a bug, limitation, or new primitive.

## README

The root README remains the public front door answering "What is the Static Collective?" It preserves the existing thesis that music is the laboratory for broader human-AI creative infrastructure, then explains the repository's notebook/memory role and how to decide where an artifact belongs.

## Constraints

- Keep the repository legible without tooling or a build step.
- Prefer Markdown and plain files.
- Do not create schemas, bots, issue automation, or taxonomy enforcement yet.
- Do not duplicate project-owned implementation documentation.
- Favor short durable artifacts over exhaustive documentation.
- Make provenance visible through ordinary Git history rather than introducing a second receipt mechanism.
