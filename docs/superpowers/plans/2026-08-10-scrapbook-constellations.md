# Scrapbook Constellations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a non-authoritative `scrapbook/constellations/` shelf that preserves meaningful adjacency between artifacts without claiming equivalence, and use spatial memory as one of its first exploratory specimens.

**Architecture:** GitHub remains canonical. The scrapbook is a horizontal exploration layer across existing notes, witness breadcrumbs, patterns, specimens, and systems. GitBook projects the resulting Markdown after merge through the existing Git Sync connection.

**Tech Stack:** Markdown, Git, GitBook Git Sync, Mermaid diagrams where useful.

## Global Constraints

- A constellation preserves adjacency without claiming equivalence.
- A scrapbook entry is exploratory and non-authoritative unless separately promoted through evidence.
- Existing project repositories remain canonical for implementation-specific truth.
- `witness/` remains the continuity/memento shelf; `scrapbook/` is active arrangement and cross-link exploration.
- Spatial-memory ideas are presented as a plausible mnemonic/cognitive design analogy, not as a universal cognitive law.
- The repository must remain legible as plain Markdown without GitBook.

---

### Task 1: Define the scrapbook shelf

**Files:**
- Create: `scrapbook/README.md`
- Create: `scrapbook/constellations/README.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing notebook shelf model.
- Produces: a stable distinction between witness, scrapbook, pattern, and project-owned authority.

- [ ] Create `scrapbook/README.md` with the governing rule, promotion boundary, and relationship to `witness/`.
- [ ] Create `scrapbook/constellations/README.md` with the reusable constellation template: ingredients, resonances, tensions, possible traversal, illumination, residual fog, promotion routes.
- [ ] Add `scrapbook/` to the root README shelves list.
- [ ] Verify every statement keeps scrapbook material explicitly non-authoritative.

### Task 2: Seed the first constellation set

**Files:**
- Create: `scrapbook/constellations/projection-is-witness.md`
- Create: `scrapbook/constellations/memory-is-terrain.md`
- Create: `scrapbook/constellations/ghosts-receipts-and-witnesses.md`
- Create: `scrapbook/constellations/metaphor-as-portal.md`
- Create: `scrapbook/constellations/bounded-weirdness.md`
- Create: `scrapbook/constellations/two-kinds-of-evidence.md`
- Create: `scrapbook/constellations/authority-narrows-as-proof-grows.md`
- Create: `scrapbook/constellations/space-sequence-story.md`

**Interfaces:**
- Consumes: `patterns/`, `witness/`, `specimens/`, `notes/`, GitBook/GitHub projection observations.
- Produces: eight concrete examples of horizontal arrangement without premature promotion.

- [ ] Give every entry explicit `Status: Constellation / exploratory` language.
- [ ] Link each entry to the existing source artifacts that motivated it.
- [ ] Include at least one unresolved tension or residual fog section per entry.
- [ ] In `space-sequence-story.md`, distinguish the familiar human method-of-loci observation from the speculative software analogy: concepts as places, traversal as route, sequence as story, recall as re-entry.
- [ ] In `space-sequence-story.md`, identify a falsifiable GitBook experiment: compare arbitrary alphabetical/taxonomic navigation against a meaningful route with stable landmarks and encounter order.

### Task 3: Expose the scrapbook to GitBook intentionally

**Files:**
- Create: `SUMMARY.md`

**Interfaces:**
- Consumes: existing repository pages plus new scrapbook pages.
- Produces: reader-oriented GitBook navigation without moving canonical files.

- [ ] Make the root README the first page.
- [ ] Add top-level groups for `Patterns`, `Scrapbook`, `Evidence`, `Witness`, and `Vocabulary` without exposing `docs/superpowers/` as reader navigation.
- [ ] Place the eight constellation pages under the `Scrapbook` group in a deliberate sequence rather than alphabetical order.
- [ ] Use `Space → Sequence → Story` as a navigation-design hypothesis: start with orientation, move through memory/terrain, then evidence/authority, then metaphor and creative weirdness.
- [ ] Verify every `SUMMARY.md` path exists on the branch.

### Task 4: Review the experiment boundary

**Files:**
- Modify: PR #3 description only if needed to reflect the expanded documentation experiment.

**Interfaces:**
- Consumes: complete branch diff.
- Produces: a reviewable PR whose scope matches the actual changes.

- [ ] Compare `agent/hyperlinked-awareness-fields` against `main`.
- [ ] Confirm no project implementation files changed.
- [ ] Confirm no GitBook API content edits bypassed Git Sync.
- [ ] Confirm spatial memory remains labeled hypothesis/analogy where software claims begin.
- [ ] Update PR #3 body to describe the scrapbook and GitBook information-architecture experiment.
