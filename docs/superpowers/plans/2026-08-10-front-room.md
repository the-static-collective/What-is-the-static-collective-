# Front Room Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a stable GitBook Front Room that orients fresh conversations without automatically retrieving the wider corpus.

**Architecture:** GitHub remains canonical. A new `start-here/front-room.md` provides the stable landmark, `SUMMARY.md` defines the reader route, and the root README exposes the doorway without becoming the room itself. Existing GitBook Git Sync imports `main` after merge.

**Tech Stack:** Markdown, GitBook Git Sync, GitHub.

## Global Constraints

- Orientation is not retrieval.
- GitBook is a projection, not authority.
- The Front Room must not force unrelated conversations into Collective context.
- Unresolved and contested material remains explicit.
- Internal `docs/superpowers/` files stay out of reader navigation.

---

### Task 1: Build the stable Front Room

**Files:**
- Create: `start-here/front-room.md`
- Modify: `README.md`

**Interfaces:**
- Consumes: existing Patterns, Witness, Notes, Specimens, Receipts, and Glossary pages.
- Produces: stable route `/start-here/front-room` and a canonical conversation-entry instruction.

- [ ] **Step 1:** Create the Front Room with the orientation law, bounded door cards, entry protocol, traversal receipt, and failure conditions.
- [ ] **Step 2:** Add a visible `Enter the Front Room` doorway near the top of the repository README.
- [ ] **Step 3:** Re-fetch both files and verify every relative door target exists in the current repository.
- [ ] **Step 4:** Commit the documentation changes on the isolated branch.

### Task 2: Shape GitBook navigation and publish the specimen

**Files:**
- Create: `SUMMARY.md`

**Interfaces:**
- Consumes: `start-here/front-room.md` and existing repository shelves.
- Produces: deliberate GitBook navigation with the Front Room first and internal planning files omitted.

- [ ] **Step 1:** Create `SUMMARY.md` with the Front Room first, then orientation, field/pattern pages, evidence, incubation, and vocabulary.
- [ ] **Step 2:** Compare the feature branch with `main`; confirm changes are documentation-only and bounded to the intended files.
- [ ] **Step 3:** Open and merge a pull request to `main` because the user explicitly approved publishing this experiment.
- [ ] **Step 4:** Verify GitBook Git Sync completes successfully.
- [ ] **Step 5:** Search GitBook for `The Front Room` and `Orientation is not retrieval`; confirm the rendered path is `start-here/front-room`.
- [ ] **Step 6:** Record the exact Custom Instructions text for the human to paste into ChatGPT, since this toolset cannot mutate ChatGPT Custom Instructions directly.