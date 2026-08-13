# TRAEX Full Witness Specimen #1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce the first evidence-backed TRAEX specimen from the landed Autodiscography Vault Phase-A journey, compare it against the flat lineage, and record whether TRAEX exposes a meaningful boundary distinction without promoting TRAEX beyond incubation.

**Architecture:** This slice is documentation-only. One new specimen file records an eight-crossing dual-lane track where evidence/carried state and authority are inspected separately; the existing TRAEX incubator note receives only a pointer to the specimen. Source facts remain authoritative in their owning GitHub/GitBook surfaces, and the specimen is a projection over those facts rather than a new source of truth.

**Tech Stack:** Markdown + Git history + GitHub/GitBook source evidence.

## Global Constraints

- Documentation-only: no runtime repository, parser, validator, provider adapter, receipt schema, `Track` object, visualization, or dependency changes.
- TRAEX remains incubated after this slice; one specimen cannot satisfy the two-domain graduation gate.
- Use the existing crossing fields exactly: `from`, `operation`, `boundary`, `to`, `preserved`, `changed`, `authority`, `receipt`, `residue`.
- Operation labels may be composed when a crossing honestly performs more than one operation.
- `EXPERIENCE` is witness-relative. Every `EXPERIENCE` claim must name the participant or machine execution that encountered the state.
- Machine-observed experience must never be promoted into human experience.
- Authority must never be inferred from movement alone.
- Missing evidence must remain `unwitnessed`, `unknown`, or explicitly unresolved rather than being completed by inference.
- GitHub/project-owned evidence remains authoritative over the specimen and over any GitBook expression of that evidence.
- No change to Autodiscography Vault Phase A, Corpus OS authority rules, BEE boundaries, TranchNode, Exact Return, or Project0.
- Required negative assertion: `expressed != necessarily experienced`.

---

## File Structure

- Create: `specimens/traex-autodiscography-vault-phase-a.md`
  - Evidence ledger, flat lineage, eight crossings, dual-lane analysis, deliberate non-crossing, comparison, and verdict.
- Modify: `frontier/primitive-incubator/traex-tracks-crossing-grammar.md`
  - Add only a pointer to Specimen #1; keep graduation criteria unchanged.
- Inspect only: `docs/superpowers/specs/2026-08-12-traex-full-witness-design.md`
- Inspect only: `specimens/README.md`
- Re-fetch before use:
  - `the-static-collective/corpus-os#4`
  - `the-static-collective/autodiscography-vault#1`
  - `the-static-collective/autodiscography-vault#2`
  - pre-merge `phase-a-proof` run `31621357334` on `17df15d991e8488cc35040b0c80954d223a11e1e`
  - squash commit `91f7ee143994a7700c886d20edff8fe5eeb5a688`
  - post-merge `phase-a-proof` run `31654804681`, run #3, on that exact squash commit
  - Corpus OS #4 landed comment `5274440575`
  - GitBook BEE page carrying the Phase-A landed proof

---

### Task 1: Establish the evidence ledger and comparison baseline

**Files:**
- Create: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: approved design plus source evidence listed above.
- Produces: an evidence-first specimen skeleton with no crossing interpretation yet.

- [ ] **Step 1: Re-fetch every source before writing factual claims.**

Verify:

```text
Corpus OS #4 remains the preservation program and records the Sept 3, 2026 deadline.
Vault #1 is closed as the bounded Phase-A contract.
Vault PR #2 merged from head 17df15d991e8488cc35040b0c80954d223a11e1e.
Pre-merge proof run 31621357334 completed successfully.
Squash commit is 91f7ee143994a7700c886d20edff8fe5eeb5a688.
Post-merge run 31654804681 / #3 completed successfully on that exact squash SHA.
Corpus OS #4 comment 5274440575 advances only to the hard-capped 25-track pilot.
GitBook BEE page contains the landed Phase-A proof; if it cannot be verified, Crossing 8 must say so explicitly.
```

- [ ] **Step 2: Create the specimen header.**

Use:

```markdown
# Specimen: TRAEX Full Witness — Autodiscography Vault Phase A

## Question

Can the incubated TRAEX crossing grammar reveal boundary semantics in the Vault Phase-A journey that the ordinary event/receipt lineage obscures, without inventing authority or witness experience?

## Status

Specimen #1. Documentation-only. TRAEX remains incubated regardless of verdict.

## Method

This specimen is a projection over existing evidence. It does not replace project authority, receipts, Git history, CI results, or GitBook documentation.

The track keeps two continuities visible at every crossing:

- **evidence / carried state** — what moved, changed representation, or became observable;
- **authority** — what authority applied before and after the crossing, including explicit non-transfer.
```

- [ ] **Step 3: Add `## Evidence ledger`.**

For each source, record the exact issue/PR/run/commit identity and what fact it establishes. Mark the later TRAEX verb classification as interpretation rather than machine-recorded fact.

- [ ] **Step 4: Add `## Flat lineage`.**

Use this baseline unless fresh evidence requires a factual correction:

```text
Corpus OS issue #4
-> Vault issue #1 / Phase-A contract
-> Vault PR #2
-> pre-merge CI
-> squash merge
-> post-merge CI
-> Corpus OS landed note
-> GitBook update
```

State that this answers **what happened** and is the baseline TRAEX must outperform in inspection value.

- [ ] **Step 5: Verify the skeleton.**

```bash
grep -n '^## Question\|^## Status\|^## Method\|^## Evidence ledger\|^## Flat lineage' specimens/traex-autodiscography-vault-phase-a.md
git diff --check
```

Expected: all five headings found; no whitespace errors.

- [ ] **Step 6: Commit.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: establish TRAEX Vault evidence ledger"
```

---

### Task 2: Write the eight-crossing dual-lane track

**Files:**
- Modify: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: Task 1 evidence ledger.
- Produces: eight crossing records using the existing nine-field grammar.

- [ ] **Step 1: Add `## TRAEX track` and define the field order once.**

```text
from
operation
boundary
to
preserved
changed
authority
receipt
residue
```

- [ ] **Step 2: Crossing 1 — external notice -> Corpus OS P0.**

```text
operation: EXPERIENCE + EXPRESS
named experiencer: human operator/project receiving the notice
key distinction: urgency changes; authority does not
```

Do not claim Corpus OS gained authority over Suno.

- [ ] **Step 3: Crossing 2 — Corpus OS P0 -> Vault Phase-A contract.**

```text
operation: TRANSLATE
preserved: deadline, provenance, resumability, verification, secret-handling, provider-boundary rules
changed: program urgency becomes repository-specific Phase-A scope and hard non-goals
authority: no live-provider authority is added
```

- [ ] **Step 4: Crossing 3 — contract -> executable Phase-A implementation.**

```text
operation: TRANSMUTE
preserved: bounded Phase-A intent and trust constraints
changed: prose requirements become code, fixtures, tests, verifier, journal, manifest projection, local MV3 shell, and docs
```

- [ ] **Step 5: Crossing 4 — implementation -> pre-admission CI proof.**

```text
operation: EXPERIENCE + EXPRESS
named experiencer: GitHub Actions run 31621357334
preserved: proposal head 17df15d991e8488cc35040b0c80954d223a11e1e
changed: executable proposal gains emitted pass/fail evidence
authority: successful CI does not admit to main
```

- [ ] **Step 6: Crossing 5 — proposal branch -> canonical main.**

```text
operation: TRANSFER + TRANSMUTE
preserved: intended implementation content and inspectable PR lineage
changed: proposal history is represented as squash commit 91f7ee143994a7700c886d20edff8fe5eeb5a688
authority: main becomes canonical repository state; proposal history remains proposal evidence
```

- [ ] **Step 7: Crossing 6 — landed main -> post-merge proof.**

```text
operation: EXPERIENCE
named experiencer: GitHub Actions run 31654804681 / #3
preserved: exact landed squash SHA 91f7ee143994a7700c886d20edff8fe5eeb5a688
changed: admitted state gains post-admission execution evidence
authority: CI observes canonical state; it does not create repository authority
```

State explicitly: **tested proposal != tested canonical artifact**.

- [ ] **Step 8: Crossing 7 — Vault landed fact -> Corpus OS next gate.**

```text
operation: TRANSLATE
preserved: Phase-A completion evidence and trust boundary
changed: implementation fact becomes a governance decision: next step is only the separately reviewed, hard-capped 25-track pilot
authority: no authority transfers between Vault and Corpus OS
```

Preserve the BEE boundary: export pollen without importing TranchNode, Exact Return, semantic equivalence, lineage inference, or a universal receipt ontology.

- [ ] **Step 9: Crossing 8 — project fact -> GitBook collective memory.**

If the GitBook source is freshly verified:

```text
operation: EXPRESS
preserved: landed Phase-A fact, exact squash SHA, bounded next gate
changed: project evidence becomes a navigable documentation projection
authority: GitBook gains no source authority over the underlying project evidence
```

If it is not freshly verifiable, record the receipt as `unwitnessed` or `unverified in this execution` instead of filling the gap by inference.

- [ ] **Step 10: Add the deliberate non-crossing.**

```markdown
## Deliberate non-crossing — expression != experience

The existence of the GitBook projection proves expression only. This specimen does not claim a later human `EXPERIENCE` crossing unless a named witness encounter is separately evidenced.

> expressed != necessarily experienced
```

- [ ] **Step 11: Run structural validation.**

```bash
python - <<'PY'
from pathlib import Path
text = Path('specimens/traex-autodiscography-vault-phase-a.md').read_text()
assert text.count('### Crossing ') == 8
for field in ['from', 'operation', 'boundary', 'to', 'preserved', 'changed', 'authority', 'receipt', 'residue']:
    assert text.lower().count(field) >= 8, field
assert 'expressed != necessarily experienced' in text
assert '31621357334' in text
assert '31654804681' in text
assert '17df15d991e8488cc35040b0c80954d223a11e1e' in text
assert '91f7ee143994a7700c886d20edff8fe5eeb5a688' in text
print('TRAEX structure: PASS')
PY

git diff --check
```

Expected: `TRAEX structure: PASS` and no diff errors.

- [ ] **Step 12: Commit.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: map Vault Phase A as TRAEX full witness"
```

---

### Task 3: Compare the track with the flat lineage and record the verdict

**Files:**
- Modify: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: completed flat lineage and eight-crossing track.
- Produces: a bounded verdict on whether TRAEX added inspection value.

- [ ] **Step 1: Add `## What TRAEX exposes beyond the flat lineage`.**

Evaluate, rather than assume, these candidate distinctions:

```text
pre-merge CI proof != canonical admission
branch -> main may be both transfer and transmutation
post-merge CI witnesses a different authority-bearing state from proposal CI
Vault -> Corpus OS may be translation without authority transfer
GitBook may be expression without becoming source authority
expression != experience
```

Keep only distinctions genuinely supported by the completed specimen.

- [ ] **Step 2: Add `## What TRAEX does not prove`.**

Include:

```text
one specimen does not establish a universal crossing ontology
operation labels are interpretive rather than machine-discovered
no shared schema or runtime primitive has been justified
crossings are not required to have exactly one verb
artifact existence does not prove observer-relative human experience
the track itself creates no authority
```

- [ ] **Step 3: Add `## Verdict` and select exactly one outcome from the evidence.**

```text
useful — at least one meaningful boundary distinction became easier to inspect
decorative — the flat lineage conveyed the same distinctions equally well
distorting — the grammar required semantic lies or hid authority distinctions
```

Do not preselect the outcome.

- [ ] **Step 4: Reassert the graduation boundary.**

Include this exact sentence:

```text
Specimen #1 cannot graduate TRAEX. A materially different second-domain specimen is still required by issue #7 and the incubator note.
```

- [ ] **Step 5: Verify the verdict section.**

```bash
python - <<'PY'
from pathlib import Path
text = Path('specimens/traex-autodiscography-vault-phase-a.md').read_text()
assert '## Verdict' in text
assert 'Specimen #1 cannot graduate TRAEX' in text
section = text.split('## Verdict', 1)[1].lower()
selected = [word for word in ['useful', 'decorative', 'distorting'] if section.startswith('\n\n**' + word) or section.startswith('\n\n' + word)]
assert len(selected) == 1, selected
print('TRAEX verdict guards: PASS')
PY

git diff --check
```

Expected: `TRAEX verdict guards: PASS` and no diff errors.

- [ ] **Step 6: Commit.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: record TRAEX specimen verdict"
```

---

### Task 4: Link Specimen #1 back to the incubator without promoting it

**Files:**
- Modify: `frontier/primitive-incubator/traex-tracks-crossing-grammar.md`

**Interfaces:**
- Consumes: completed Specimen #1.
- Produces: discoverability while preserving the original graduation gate.

- [ ] **Step 1: Add `## Specimens` before `## Residual fog`.**

Use:

```markdown
## Specimens

- [`Specimen #1 — Autodiscography Vault Phase A`](../../specimens/traex-autodiscography-vault-phase-a.md) tests the crossing grammar against one real multi-boundary journey.

The specimen is evidence for or against the grammar, not promotion. The two-domain graduation gate above remains unchanged.
```

- [ ] **Step 2: Verify the graduation language still requires both a second materially different system and a meaningful distinction over flat lineage.**

- [ ] **Step 3: Verify the branch remains documentation-only.**

```bash
test -f specimens/traex-autodiscography-vault-phase-a.md
git diff --name-only main...HEAD
```

Expected changed paths are limited to:

```text
docs/superpowers/specs/2026-08-12-traex-full-witness-design.md
docs/superpowers/plans/2026-08-12-traex-full-witness.md
specimens/traex-autodiscography-vault-phase-a.md
frontier/primitive-incubator/traex-tracks-crossing-grammar.md
```

- [ ] **Step 4: Commit.**

```bash
git add frontier/primitive-incubator/traex-tracks-crossing-grammar.md
git commit -m "docs: link TRAEX specimen one"
```

---

### Task 5: Final verification and open a review proposal

**Files:**
- Inspect: full branch diff against `main`
- Create: draft PR from `agent/traex-full-witness-design` to `main`
- Update externally after PR creation: issue #7 with a pointer; keep it open

**Interfaces:**
- Produces: a reviewable documentation-only proposal with no hidden TRAEX promotion.

- [ ] **Step 1: Run final checks.**

```bash
git diff --check main...HEAD
git diff --name-only main...HEAD

python - <<'PY'
from pathlib import Path
spec = Path('specimens/traex-autodiscography-vault-phase-a.md').read_text()
inc = Path('frontier/primitive-incubator/traex-tracks-crossing-grammar.md').read_text()
assert spec.count('### Crossing ') == 8
assert 'expressed != necessarily experienced' in spec
assert 'Specimen #1 cannot graduate TRAEX' in spec
assert 'at least two materially different systems' in inc
assert '../../specimens/traex-autodiscography-vault-phase-a.md' in inc
print('TRAEX final verification: PASS')
PY
```

Expected: `TRAEX final verification: PASS`; no diff errors; only approved documentation paths changed.

- [ ] **Step 2: Manually audit every `EXPERIENCE` claim.**

Expected witnesses:

```text
Crossing 1 -> human operator/project receiving the notice
Crossing 4 -> GitHub Actions run 31621357334
Crossing 6 -> GitHub Actions run 31654804681
GitBook existence -> no human EXPERIENCE claim unless separately evidenced
```

- [ ] **Step 3: Manually audit authority.**

Confirm:

```text
external urgency grants no provider authority
CI grants no admission authority
squash merge changes canonical repository state
post-merge CI observes but does not create authority
Vault -> Corpus OS transfers no authority
GitBook expression gains no source authority
TRAEX track itself gains no authority
```

- [ ] **Step 4: Inspect the complete diff.**

```bash
git diff --stat main...HEAD
git diff main...HEAD -- docs/superpowers/specs/2026-08-12-traex-full-witness-design.md docs/superpowers/plans/2026-08-12-traex-full-witness.md specimens/traex-autodiscography-vault-phase-a.md frontier/primitive-incubator/traex-tracks-crossing-grammar.md
```

- [ ] **Step 5: Open a draft PR.**

Title:

```text
Specimen: test TRAEX against Autodiscography Vault Phase A
```

Body:

```markdown
## Summary
- records TRAEX Specimen #1 from the real Vault Phase-A crossing chain
- separates evidence movement from authority movement
- compares the track with the ordinary flat lineage
- preserves observer-relative experience and explicitly distinguishes expression from experience
- leaves TRAEX incubated; no schema/runtime promotion

## Evidence anchors
- Vault PR #2 head: `17df15d991e8488cc35040b0c80954d223a11e1e`
- pre-merge proof: run `31621357334`
- landed squash commit: `91f7ee143994a7700c886d20edff8fe5eeb5a688`
- post-merge proof: run `31654804681`
- Corpus OS #4 remains the next authority gate

## Boundary
Documentation only. No Vault, Corpus OS, TranchNode, Exact Return, Project0, receipt-schema, or runtime changes.

Closes no incubator issue: #7 must remain open until the two-domain graduation gate is satisfied.
```

- [ ] **Step 6: Comment on issue #7 with the specimen/PR pointer and leave the issue open.**

State that Specimen #1 tests the grammar but cannot satisfy the two-domain graduation gate by itself.

- [ ] **Step 7: Stop at review.**

Do not merge without a separate PR-completion review and explicit landing approval for the exact reviewed head.
