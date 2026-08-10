# Stigmergic Field Notebook Graduation v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Graduate the bee-communication incubator into a portable pattern and evidence-grounded specimen only after the TranchNode and Band Runtime implementation PRs have produced exact machine facts.

**Architecture:** `patterns/` stores the reusable law without project-specific mechanics; `specimens/` stores the exact linked-vertical evidence and human verdict; `notes/primitive-incubator.md` preserves the original thought and appends a graduation pointer. This repository remains descriptive and non-authoritative.

**Tech Stack:** Markdown and ordinary Git/GitHub provenance.

## Global Constraints

- The notebook never becomes canonical over TranchNode or Band Runtime.
- Bee biology is the origin analogy, not software proof.
- The strongest allowed claim is: `Multiple sovereign participants redistributed activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remained attributable and non-authoritative.`
- Never claim quorum/pressure equals truth or that stigmergy universally outperforms scheduling.
- Preserve the original incubator entry verbatim; append graduation rather than rewriting history.
- Use exact final PR URLs, commit SHAs, test results, fixture raw-byte SHA-256, cut numbers, event ids, and counts obtained from implementation outputs.
- If observed implementation facts differ from the approved design, document the observed facts and the divergence instead of forcing the narrative.
- Project0 promotion is an explicit verdict after specimen inspection, never automatic.

---

## File Structure

- Create `patterns/stigmergic-field.md` — portable law, invariants, vocabulary, anti-patterns, composition surfaces.
- Create `specimens/stigmergic-field-v0.1.md` — exact evidence, causal cuts, links, machine proof, human verdict, remaining tensions.
- Modify `notes/primitive-incubator.md` — append graduation beneath the existing bee entry without altering its original text.

---

### Task 1: Write the portable pattern without implementation leakage

**Files:**
- Create: `patterns/stigmergic-field.md`

**Interfaces:**
- Consumes: approved design and verified existence of the linked vertical.
- Produces: reusable prose independent of TypeScript functions, numeric weights, or one repository's event vocabulary.

- [ ] **Step 1: Write the governing pattern and origin distinction**

The file must begin with:

```markdown
# Stigmergic Field

## Pattern

> A shared substrate may communicate its condition through attributable, deterministic environmental traces without those traces becoming authority.

## Origin observation

Honey-bee colonies coordinate through more than direct messages. Recruitment, inhibition, local encounter rates, and changes to shared material state let individuals respond to a field that no single participant centrally owns.

The biological observation inspired this software pattern. It does not prove the software law and should not be stretched into one-to-one biomimicry.
```

- [ ] **Step 2: Add the underlying loop and eight invariants**

Use this loop exactly:

```text
encounter
    ↓
attributable trace
    ↓
deterministic shared field
    ↓
sovereign attention
    ↓
choice / refusal / silence
    ↓
new encounter
```

State these invariants in plain language:

1. field is not authority;
2. trace remains attributable;
3. replay is law;
4. durable decay does not depend on incidental wall-clock time;
5. inhibition is additive rather than destructive;
6. scope is sensory law and inaccessible activity cannot leak indirectly;
7. local choice remains local and aggregates do not silently become schedulers;
8. the substrate may describe its condition without becoming sovereign.

- [ ] **Step 3: Add portable vocabulary and anti-patterns**

Define `trace`, `field cell`, `attention`, `receptivity`, `saturation`, `inhibition`, `tension`, `return`, and `field fingerprint` without numeric weights or source-code names.

State that the pattern is not quorum-as-truth, reputation scoring, agent ranking, a disguised scheduler, an authorization bypass, an ontology requirement, or a claim that direct messaging is unnecessary.

- [ ] **Step 4: Add composition surfaces**

Describe these bounded uses:

- TranchNode — deterministic field projection over accepted evidence;
- Band Runtime / Groove Rooms — participant-visible environmental coordination;
- Corpus OS — observable casework metabolism without replacing explicit case state;
- Founder Node — routing proposals informed by pressure without pressure becoming authority;
- creative systems — bounded recruitment/inhibition around branches, candidates, and unresolved frontiers.

End with the graduation test: multiple sovereign participants must respond usefully to shared environmental evidence without hidden central assignment, and replay must explain every visible field condition.

- [ ] **Step 5: Review for implementation leakage and commit**

Run:

```bash
grep -n "500\|600\|700\|decayWindowEvents\|deriveStigmergicField\|event-11" patterns/stigmergic-field.md || true
```

Expected: no numeric implementation weights, TypeScript names, or specimen event ids.

Commit:

```bash
git add patterns/stigmergic-field.md
git commit -m "docs: graduate stigmergic field pattern"
```

---

### Task 2: Write the specimen only from final implementation evidence

**Files:**
- Create: `specimens/stigmergic-field-v0.1.md`

**Interfaces:**
- Consumes: final TranchNode implementation PR/commit, final Band Runtime implementation PR/commit, exact fixture raw-byte SHA-256, exact passing commands/results, and actual specimen values.
- Produces: a source-grounded human-readable proof record.

- [ ] **Step 1: Gather evidence into an execution scratch record before drafting**

Retrieve from GitHub and test outputs the exact values for:

```text
TranchNode implementation PR URL
TranchNode implementation commit SHA
Band Runtime implementation PR URL
Band Runtime implementation commit SHA
TranchNode verification command and result
Band Runtime verification command and result
fixture raw-byte SHA-256
schema version
adapter identity
policy version
participant count
candidate subject ids
pre-inhibition causal cut and chosen subject
post-inhibition causal cut and chosen subject
next participant-B encounter event id
return residue source event id
central assignment event count
protected-silence/refusal semantic trace count
all canonical field fingerprints used by the specimen
```

Do not infer any of these from memory or this plan. If either PR is still draft, record that state accurately.

- [ ] **Step 2: Draft the specimen with fixed sections**

Use these headings in order:

```markdown
# Specimen: Stigmergic Field v0.1

## Question
## Origin
## Canonical implementation surfaces
## Fixed contract
## Encounter
## Machine evidence
## What this proves
## What this does not prove
## Human verdict
## Remaining tensions
## Project0 promotion verdict
```

Required content rules:

- `Question` asks whether several sovereign participants can redistribute activity from a replayable environmental field without central assignment.
- `Origin` distinguishes bee analogy from machine evidence.
- `Canonical implementation surfaces` names and links the exact final TranchNode and Band Runtime PRs and records their exact commit SHAs plus fixture raw-byte SHA-256.
- `Fixed contract` records the actual schema, adapter, policy, and `authority: none` values.
- `Encounter` narrates the exact observed sequence around the two candidate subjects and causal cuts, using only verified event ids/cut numbers.
- `Machine evidence` records exact test commands/results, fingerprints, event counts, trace counts, and causal-cut facts.
- `What this proves` includes the strongest allowed claim verbatim.
- `What this does not prove` rejects universal scheduling, truth, biomimicry, and final-vocabulary claims.
- `Human verdict` evaluates whether the behavior was genuinely coordination-enabling or merely scripted/obvious, and notes any coercive/confusing weight behavior.
- `Remaining tensions` lists only tensions actually surfaced by implementation/inspection.
- `Project0 promotion verdict` ends with either `Not yet` or `Proposal warranted`, followed by evidence-based reasoning.

- [ ] **Step 3: Verify every factual token against source evidence**

Search the specimen for every `sha256:`, commit SHA, PR link, `event-`, `cut`, and numeric count. Compare each one directly to the final GitHub/test record.

Then run:

```bash
grep -n "TBD\|TODO\|placeholder\|universally outperforms\|quorum.*truth\|bees prove" specimens/stigmergic-field-v0.1.md || true
```

Expected: no unresolved drafting markers or overclaims.

- [ ] **Step 4: Commit the specimen**

```bash
git add specimens/stigmergic-field-v0.1.md
git commit -m "docs: record stigmergic field v0.1 specimen"
```

---

### Task 3: Preserve the incubator origin and append graduation

**Files:**
- Modify: `notes/primitive-incubator.md`

**Interfaces:**
- Consumes: existing bee entry plus completed pattern/specimen and exact implementation PR URLs.
- Produces: historical continuity from incubator to proved pattern without retroactive rewriting.

- [ ] **Step 1: Confirm the existing bee entry is unchanged before editing**

Capture its current diff baseline:

```bash
git diff main -- notes/primitive-incubator.md
```

Expected before this task: no changes to the file on this branch.

- [ ] **Step 2: Append a graduation section directly beneath the existing bee entry**

The appended section must state:

- status: graduated to a portable pattern and linked executable specimen on 2026-08-10;
- the experiment changed the original quorum-shaped framing by first proving environmental field state without field authority;
- TranchNode owns deterministic projection;
- Band Runtime owns the coordinatorless encounter proof;
- this notebook owns only the portable pattern, origin, and specimen memory;
- the original quorum experiment remains historical evidence and is not retroactively canonical.

Add relative links to:

```text
../patterns/stigmergic-field.md
../specimens/stigmergic-field-v0.1.md
```

Add the exact TranchNode and Band Runtime final PR URLs already verified in Task 2.

- [ ] **Step 3: Verify the original incubator paragraphs were not rewritten**

Use:

```bash
git diff --word-diff=porcelain main...HEAD -- notes/primitive-incubator.md
```

Expected: additions for the graduation block only; no deletion/replacement of the original bee incubator content.

- [ ] **Step 4: Commit**

```bash
git add notes/primitive-incubator.md
git commit -m "docs: link bee incubator to stigmergic proof"
```

---

### Task 4: Final notebook evidence/authority audit

**Files:**
- Review: `patterns/stigmergic-field.md`
- Review: `specimens/stigmergic-field-v0.1.md`
- Review: `notes/primitive-incubator.md`

**Interfaces:**
- Consumes: Tasks 1-3.
- Produces: a notebook PR ready to merge only after implementation evidence exists.

- [ ] **Step 1: Scan for unresolved markers and authority overreach**

```bash
grep -R -n "TBD\|TODO\|placeholder\|notebook.*canonical over\|quorum.*truth\|universally" patterns/stigmergic-field.md specimens/stigmergic-field-v0.1.md notes/primitive-incubator.md || true
```

Inspect any match; committed prose must remain within the approved claim boundary.

- [ ] **Step 2: Verify all external links resolve to the exact implementation PRs**

Open both links and confirm repository, PR title, head/base, and implementation status match the specimen claims.

- [ ] **Step 3: Reconcile machine evidence one final time**

Compare all specimen SHA/fingerprint/event/cut/count values against the final implementation PR/test records. If anything changed after drafting, update the notebook before merge.

- [ ] **Step 4: Review the final diff for role separation**

```bash
git diff main...HEAD -- patterns/stigmergic-field.md specimens/stigmergic-field-v0.1.md notes/primitive-incubator.md
```

Expected: portable pattern in `patterns/`, evidentiary narrative in `specimens/`, historical graduation pointer in `notes/`; no implementation code or project-owned canonical law.

- [ ] **Step 5: Commit only if audit corrections were needed**

If corrections were necessary, make one focused documentation correction commit. Otherwise create no empty commit.
