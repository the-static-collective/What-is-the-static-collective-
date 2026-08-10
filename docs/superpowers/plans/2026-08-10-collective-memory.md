# Collective Memory Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the repository into the Static Collective's lightweight public notebook and durable small-artifact memory layer, seeded with five immediately useful creative-memory documents.

**Architecture:** Preserve the root README as the public explanation of the Collective while adding six plain-file shelves for notes, patterns, fragments, specimens, receipts, and glossary entries. Project-specific implementation remains authoritative in its own repository; this repo holds portable observations and small artifacts that should survive conversation.

**Tech Stack:** Markdown, Git, GitHub.

## Global Constraints

- Keep the repository legible without tooling or a build step.
- Prefer Markdown and plain files.
- Do not add schemas, bots, issue automation, or taxonomy enforcement.
- Do not duplicate project-owned implementation documentation.
- Favor short durable artifacts over exhaustive documentation.
- Use ordinary Git history as provenance.

---

### Task 1: Establish the notebook shelves

**Files:**
- Create: `notes/README.md`
- Create: `patterns/README.md`
- Create: `fragments/README.md`
- Create: `specimens/README.md`
- Create: `receipts/README.md`
- Create: `glossary/README.md`

**Interfaces:**
- Consumes: the six shelf definitions in the design spec.
- Produces: stable locations for future small artifacts.

- [ ] **Step 1: Create each shelf README with a one-paragraph scope and boundary.**
- [ ] **Step 2: Verify every shelf is discoverable from the repository tree.**
- [ ] **Step 3: Confirm none of the shelf descriptions claims authority over project-specific implementation.**

### Task 2: Seed portable creative laws and handoff method

**Files:**
- Create: `patterns/creative-field-laws.md`
- Create: `patterns/creative-handoff.md`

**Interfaces:**
- Consumes: recurring architectural observations from Haunted Toaster, Lab, and adjacent work.
- Produces: model/collaborator context that can travel between projects without implementation baggage.

- [ ] **Step 1: Encode the seven initial creative-field laws as concise named laws with implications.**
- [ ] **Step 2: Encode the observation → phenomenon → primitive → composition → slice → specimen handoff progression.**
- [ ] **Step 3: Verify both documents distinguish invariants from implementation choices.**

### Task 3: Seed the primitive incubator and shared vocabulary

**Files:**
- Create: `notes/primitive-incubator.md`
- Create: `glossary/static-collective-vocabulary.md`

**Interfaces:**
- Consumes: raw creative observations and recurring cross-project language.
- Produces: a low-friction pre-roadmap capture format and portable semantic definitions.

- [ ] **Step 1: Add the primitive-incubator template with fields for primitive, felt possibility, existing analogue, invariant, and smallest experiment.**
- [ ] **Step 2: Seed the incubator with bee communication and atmosphere-family examples without converting them into commitments.**
- [ ] **Step 3: Define anchor, ghost, receipt, witness, frontier, garment, atmosphere, possession, resolved timeline, proposal, authority, field, compost, and ancestor in project-neutral language.**
- [ ] **Step 4: Verify definitions do not silently introduce implementation requirements.**

### Task 4: Seed human specimen evidence

**Files:**
- Create: `specimens/specimen-notes.md`

**Interfaces:**
- Consumes: a human operator's experience of a field test.
- Produces: phenomenological evidence complementary to machine receipts.

- [ ] **Step 1: Create a reusable specimen-note template covering surprise, aliveness, falseness, manual intervention, expectation, emergence, and classification.**
- [ ] **Step 2: Explicitly distinguish human specimen notes from machine receipts.**
- [ ] **Step 3: Verify the template is short enough to use after every render or trial.**

### Task 5: Rewrite the public front door

**Files:**
- Modify: `README.md`

**Interfaces:**
- Consumes: the existing thesis that music is the laboratory and the new collective-memory structure.
- Produces: a concise explanation of both the Static Collective and this repository's role.

- [ ] **Step 1: Preserve the existing core thesis about human-AI creative infrastructure and music as test cases.**
- [ ] **Step 2: Add the governing rule: "If it deserves to survive the conversation, but does not deserve a repository, it belongs here."**
- [ ] **Step 3: Document the conversation → memory → project progression and link the six shelves plus five seed artifacts.**
- [ ] **Step 4: State the boundary that established projects retain their own canonical implementation documentation.**

### Task 6: Validate the complete slice

**Files:**
- Inspect: repository tree and branch diff.

**Interfaces:**
- Consumes: Tasks 1–5.
- Produces: a reviewable GitHub pull request.

- [ ] **Step 1: Compare `main` with `agent/collective-memory-notebook`.**
- [ ] **Step 2: Confirm all promised files exist and no unrelated files changed.**
- [ ] **Step 3: Open a draft pull request summarizing purpose, structure, seeds, and validation.**
