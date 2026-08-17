# Lawful Navigation Specimen 001 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish one GitBook-synced evidence page for the landed Project0 → Corpus OS NAV specimen without manufacturing authority, constitution, or universal navigation law.

**Architecture:** Treat Project0 commit `1c4decea33e0d22babb4a48be29cf5034c9318f9` as executable authority. Add one Front Room evidence projection, expose it through existing Evidence navigation, and add one bounded link from Field Traversal & Illumination. GitHub remains source of truth; GitBook publishes through existing Git Sync.

**Tech Stack:** Markdown, GitBook Git Sync, GitHub.

## Global Constraints

- Preserve `constitutionRef: null` / `indeterminate` rather than promoting repository commits into constitutions.
- Preserve empty before/after authority refs; relevance and traversal do not manufacture authority.
- Preserve `nav-...` as experimental identity; never describe it as canonical `rect-...` receipt identity.
- `CONFORMS_TO` explains nearby-door relevance only.
- Latent Reachability is newly visible evidence only; it grants no NAV or execution authority.
- No executable NAV code, package, crawler, route planner, auto-traversal, recursive scout, or `TraversalWarrant`.
- GitHub is the Git-synced source of truth for GitBook space `HILTtUulCBDqDzXXk6RQ`.

---

### Task 1: Publish the bounded evidence specimen

**Files:**
- Create: `specimens/lawful-navigation-specimen-001.md`

**Interfaces:**
- Consumes: landed Project0 fixture/test and pinned source evidence.
- Produces: one human-readable evidence projection used by `SUMMARY.md` and the Field Traversal pattern.

- [ ] **Step 1: Re-read executable source pins**

Read the landed Project0 fixture and acceptance test at commit `1c4decea33e0d22babb4a48be29cf5034c9318f9`. Confirm the page text uses only demonstrated dispositions and source refs.

- [ ] **Step 2: Create the specimen page**

Write a concise page containing: purpose, executable source pins, nearby-door evidence, deliberate crossing declaration, before/crossing/after witness table, changed/preserved findings, newly visible Latent Reachability, receipt boundary, residual fog, and bounded verdict.

Required phrases/claims:

```text
materially_changed
constitution: indeterminate
before authority refs: []
after authority refs: []
particularity:prospective-reachability: new_after
experimental nav-... receipt; not canonical rect-...
```

- [ ] **Step 3: Read back the page and perform truth-boundary review**

Reject any prose that implies:

```text
CONFORMS_TO => permission
Latent Reachability => execution authority
repository commit => constitution
one specimen => universal navigation law
```

- [ ] **Step 4: Commit**

Commit message:

```text
docs: add lawful navigation specimen 001
```

### Task 2: Wire the specimen into the Front Room neighborhood

**Files:**
- Modify: `SUMMARY.md`
- Modify: `patterns/field-traversal-and-illumination.md`

**Interfaces:**
- Consumes: `specimens/lawful-navigation-specimen-001.md`.
- Produces: GitBook navigation entry and one bounded Pattern-to-specimen path.

- [ ] **Step 1: Add the Evidence navigation entry**

Insert exactly one line immediately after `Front Room Threshold Scan v0.1`:

```markdown
* [Lawful Navigation Specimen 001](specimens/lawful-navigation-specimen-001.md)
```

- [ ] **Step 2: Add one bounded Pattern link**

Immediately after the threshold-probing law block, add a short evidence note pointing to `../specimens/lawful-navigation-specimen-001.md`. State that the Project0 → Corpus OS specimen demonstrates one deliberate crossing whose visibility changed while authority remained unchanged. Explicitly call it a specimen, not a universal route rule.

- [ ] **Step 3: Read back both files**

Confirm the specimen path is exact, referenced once in `SUMMARY.md`, and the Pattern still keeps probing distinct from traversal.

- [ ] **Step 4: Commit**

Commit message:

```text
docs: link lawful navigation evidence
```

### Task 3: Validate publication boundary and prepare PR

**Files:**
- Verify: `docs/superpowers/specs/2026-08-16-lawful-navigation-specimen-001-design.md`
- Verify: `docs/superpowers/plans/2026-08-16-lawful-navigation-specimen-001.md`
- Verify: `specimens/lawful-navigation-specimen-001.md`
- Verify: `SUMMARY.md`
- Verify: `patterns/field-traversal-and-illumination.md`

**Interfaces:**
- Consumes: complete branch diff.
- Produces: review-ready GitHub PR that closes Front Room issue #19 on merge.

- [ ] **Step 1: Verify GitBook Git Sync state**

Confirm space `HILTtUulCBDqDzXXk6RQ` remains actively synced to `the-static-collective/What-is-the-static-collective-` `main`. Record current sync state as environment evidence only; do not claim branch publication before merge.

- [ ] **Step 2: Inspect exact branch diff**

Expected changed files: exactly five:

```text
docs/superpowers/specs/2026-08-16-lawful-navigation-specimen-001-design.md
docs/superpowers/plans/2026-08-16-lawful-navigation-specimen-001.md
specimens/lawful-navigation-specimen-001.md
SUMMARY.md
patterns/field-traversal-and-illumination.md
```

No executable code or unrelated Front Room content may change.

- [ ] **Step 3: Review for overclaim and broken paths**

Confirm all relative links resolve to existing repository files and scan the complete diff for authority/constitution/universalization drift.

- [ ] **Step 4: Open a draft PR**

Use a body that includes source pins, scope, validation, GitBook boundary, explicit non-goals, and:

```text
Closes #19
```

Do not merge without a separate exact-head landing decision.
