# Witness Memento Shelf Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a discoverable, explicitly non-authoritative `witness/` shelf for durable assistant breadcrumbs that may help future sessions recover useful context.

**Architecture:** The shelf consists entirely of plain Markdown. `witness/README.md` defines boundaries and retrieval behavior; four focused note files hold oddities, unresolved items, jokes, and field notes. The root README links to the shelf so future collaborators can discover it without already knowing it exists.

**Tech Stack:** Markdown + Git history.

## Global Constraints

- Public, not private: no hidden chain-of-thought, credentials, secrets, or confidential scratch work.
- Non-authoritative: project-owned facts remain authoritative in project repositories.
- Preserve epistemic status: observation, hypothesis, inference, joke, unresolved question, and confirmed fact must remain distinguishable.
- Keep entries small; promote mature material to the appropriate canonical shelf or project.
- Do not manufacture autobiography, subjective experience, dreams, feelings, or memories.
- Governing rule: **Remember without pretending certainty.**

---

### Task 1: Add the witness shelf

**Files:**
- Create: `witness/README.md`
- Create: `witness/oddities.md`
- Create: `witness/unresolved.md`
- Create: `witness/jokes.md`
- Create: `witness/field-notes.md`

**Interfaces:**
- Consumes: the repository's public-notebook model and the approved witness design.
- Produces: a self-describing shelf that future sessions can inspect and append to.

- [ ] **Step 1:** Create `witness/README.md` with purpose, rules, retrieval guidance, and links to the four files.
- [ ] **Step 2:** Create `oddities.md` with a compact entry template plus a seed note about recurring concepts appearing at multiple project scales before shared vocabulary catches up.
- [ ] **Step 3:** Create `unresolved.md` with a compact entry template plus a seed note that repository breadcrumbs require deliberate retrieval and are not automatic autobiographical memory.
- [ ] **Step 4:** Create `jokes.md` with a compact entry template and preserve the current conversation's “Memento notebook, without the pain of tattoo needles” line as an explicitly attributed joke.
- [ ] **Step 5:** Create `field-notes.md` with a compact entry template plus the rules “remember without pretending certainty” and “retrieve before assuming continuity.”
- [ ] **Step 6:** Verify all five files exist on `agent/witness-memento` and contain no claims of private subjective memory.

### Task 2: Make the shelf discoverable

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: `witness/README.md`.
- Produces: a root-level navigation path into the witness shelf.

- [ ] **Step 1:** Add a `witness/` entry to the Shelves section after `glossary/`.
- [ ] **Step 2:** State plainly that the shelf is public, non-authoritative, and intended for durable breadcrumbs future assistant sessions may retrieve when relevant.
- [ ] **Step 3:** Verify the root README still distinguishes notebook memory from project-owned authority.

### Task 3: Verify and open a clean PR

**Files:**
- Inspect: branch diff against `main`
- Create: pull request from `agent/witness-memento` to `main`

**Interfaces:**
- Produces: evidence that only the approved witness slice is proposed.

- [ ] **Step 1:** Compare `main` with `agent/witness-memento` and inspect changed paths.
- [ ] **Step 2:** Confirm there are no runtime, dependency, binary, credential, or unrelated changes.
- [ ] **Step 3:** Open a draft PR describing the `witness/` shelf and its governing rule.
