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
  - Responsibility: evidence ledger, flat lineage, eight TRAEX crossings, authority/evidence comparison, deliberate non-crossing, evaluation, and verdict.
- Modify: `frontier/primitive-incubator/traex-tracks-crossing-grammar.md`
  - Responsibility: add a compact pointer to Specimen #1 and preserve the existing graduation criteria unchanged.
- Inspect only: `docs/superpowers/specs/2026-08-12-traex-full-witness-design.md`
  - Responsibility: approved design authority for this implementation slice.
- Inspect only: `specimens/README.md`
  - Responsibility: repository convention for portable/cross-project specimens.
- External source evidence, inspect only:
  - `the-static-collective/corpus-os#4`
  - `the-static-collective/autodiscography-vault#1`
  - `the-static-collective/autodiscography-vault#2`
  - Vault pre-merge `phase-a-proof` run `31621357334` on head `17df15d991e8488cc35040b0c80954d223a11e1e`
  - Vault squash commit `91f7ee143994a7700c886d20edff8fe5eeb5a688`
  - Vault post-merge `phase-a-proof` run `31654804681`, run #3, on exact squash commit
  - Corpus OS #4 landed comment `5274440575`
  - GitBook BEE page containing the Phase-A landed proof; re-fetch the current page/revision before asserting Crossing 8.

---

### Task 1: Build the specimen evidence ledger and flat lineage

**Files:**
- Create: `specimens/traex-autodiscography-vault-phase-a.md`
- Inspect: `docs/superpowers/specs/2026-08-12-traex-full-witness-design.md`
- Inspect: `specimens/README.md`
- Inspect external evidence listed in File Structure.

**Interfaces:**
- Consumes: approved TRAEX design and existing project evidence.
- Produces: a source-grounded specimen skeleton that later crossing analysis can reference without repeating provenance discovery.

- [ ] **Step 1: Re-fetch every machine/project source before writing factual claims.**

Verify at minimum:

```text
Corpus OS #4: open; records Sept 3, 2026 deadline and "deadline changes urgency, not authority"
Vault #1: closed completed; Phase-A bounded contract
Vault PR #2: merged; head 17df15d991e8488cc35040b0c80954d223a11e1e
pre-merge proof: run 31621357334, completed success
squash commit: 91f7ee143994a7700c886d20edff8fe5eeb5a688
post-merge proof: run 31654804681 / #3, main, exact squash SHA, completed success
Corpus OS #4 comment 5274440575: advances only to hard-capped 25-track pilot
GitBook BEE page: contains Phase-A landed proof, or mark that expression unwitnessed if it cannot be verified
```

Expected: every fact used in the specimen has a directly inspectable source. Do not substitute memory for a failed fetch.

- [ ] **Step 2: Create the specimen header and method section.**

Start `specimens/traex-autodiscography-vault-phase-a.md` with these sections:

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

- [ ] **Step 3: Add an evidence ledger.**

Create `## Evidence ledger` with one bullet/table entry per verified source. Include exact issue/PR numbers, exact commit SHA, workflow run IDs, and GitBook page/revision identity when available. Label TRAEX operation assignments as **interpretation**, not machine-recorded facts.

- [ ] **Step 4: Add the ordinary flat lineage before the TRAEX analysis.**

Use exactly this sequence unless fresh evidence requires a factual correction:

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

State that the flat lineage answers **what happened** and acts as the comparison baseline.

- [ ] **Step 5: Validate the skeleton before adding interpretations.**

Run locally if a checkout is available:

```bash
grep -n '^## Question\|^## Status\|^## Method\|^## Evidence ledger\|^## Flat lineage' specimens/traex-autodiscography-vault-phase-a.md
git diff --check
```

Expected: all five sections are present; `git diff --check` returns no errors.

- [ ] **Step 6: Commit the evidence-first skeleton.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: establish TRAEX Vault evidence ledger"
```

---

### Task 2: Write the eight-crossing dual-lane TRAEX track

**Files:**
- Modify: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: Task 1 evidence ledger and the approved operation assignments.
- Produces: the actual TRAEX Specimen #1 track using the incubator's nine crossing fields.

- [ ] **Step 1: Add `## TRAEX track` and define the row shape once.**

Use this exact field order for every crossing:

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

Each crossing may be a compact table or a labeled block, but the nine fields must remain independently inspectable.

- [ ] **Step 2: Write Crossing 1 — external notice -> Corpus OS P0.**

Use:

```text
operation: EXPERIENCE + EXPRESS
named experiencer: human operator/project receiving the notice
boundary: external provider policy -> project-governed preservation record
key distinction: urgency changes; authority does not
```

Do not claim Corpus OS gained authority over Suno.

- [ ] **Step 3: Write Crossing 2 — Corpus OS P0 -> Vault Phase-A contract.**

Use:

```text
operation: TRANSLATE
boundary: program-level preservation pressure -> bounded Vault implementation contract
preserved: deadline, provenance, resumability, verification, secret-handling, provider-boundary rules
changed: prose urgency becomes repository-specific Phase-A scope and hard non-goals
authority: no new live-provider authority
```

- [ ] **Step 4: Write Crossing 3 — contract -> executable Phase-A implementation.**

Use:

```text
operation: TRANSMUTE
boundary: normative/prose contract -> executable repository artifact
preserved: bounded Phase-A intent and trust constraints
changed: requirements become code, fixtures, tests, verifier, journal, manifest projection, local MV3 shell, docs
```

Do not describe this as mere transfer; representation and kind changed materially.

- [ ] **Step 5: Write Crossing 4 — implementation -> pre-admission CI proof.**

Use:

```text
operation: EXPERIENCE + EXPRESS
named experiencer: GitHub Actions phase-a-proof run 31621357334
boundary: executable proposal head -> machine-observed proof
preserved: exact proposal head identity 17df15d991e8488cc35040b0c80954d223a11e1e
changed: executable state gains emitted pass/fail evidence
authority: successful CI does not admit to main
```

- [ ] **Step 6: Write Crossing 5 — proposal branch -> canonical main.**

Use:

```text
operation: TRANSFER + TRANSMUTE
boundary: proposed branch state -> repository admission/canonical main
preserved: intended implementation content and inspectable lineage to PR #2
changed: branch history is represented as squash commit 91f7ee143994a7700c886d20edff8fe5eeb5a688
authority: main becomes canonical repository state; proposal history remains proposal evidence
```

This is a primary candidate for a distinction the flat lineage obscures.

- [ ] **Step 7: Write Crossing 6 — landed main -> post-merge proof.**

Use:

```text
operation: EXPERIENCE
named experiencer: GitHub Actions phase-a-proof run 31654804681 / #3
boundary: admitted canonical state -> machine-observed canonical proof
preserved: exact squash SHA 91f7ee143994a7700c886d20edff8fe5eeb5a688
changed: admitted state gains post-admission execution evidence
authority: proof observes canonical state; it does not create repository authority
```

Explicitly contrast this with Crossing 4: **tested proposal != tested canonical artifact**.

- [ ] **Step 8: Write Crossing 7 — Vault landed fact -> Corpus OS next gate.**

Use:

```text
operation: TRANSLATE
boundary: Vault-local landed proof -> Corpus OS program/governance interpretation
preserved: Phase-A completion evidence and trust boundary
changed: implementation fact becomes a gate decision: next step is only the separately reviewed, hard-capped 25-track pilot
authority: no authority transfers between Vault and Corpus OS
```

Preserve the BEE rule: export pollen; do not absorb TranchNode, Exact Return, semantic equivalence, lineage inference, or a universal receipt ontology.

- [ ] **Step 9: Write Crossing 8 — project fact -> GitBook collective memory.**

Use only if the GitBook page/revision is freshly verified:

```text
operation: EXPRESS
boundary: project-owned evidence -> navigable collective documentation
preserved: landed Phase-A fact, exact squash SHA, bounded next gate
changed: project evidence becomes a readable/navigation-oriented projection
authority: GitBook gains no source authority over the underlying GitHub/project evidence
```

If the GitBook witness cannot be fetched, keep the row but set its receipt/evidence status to `unwitnessed` or `unverified in this execution`; do not fabricate the crossing proof.

- [ ] **Step 10: Add the deliberate non-crossing.**

Add:

```markdown
## Deliberate non-crossing — expression != experience

The existence of the GitBook projection proves expression only. This specimen does not claim a later human `EXPERIENCE` crossing unless a named witness encounter is separately evidenced.

> expressed != necessarily experienced
```

- [ ] **Step 11: Run structural validation.**

Use a deterministic local check if available:

```bash
python - <<'PY'
from pathlib import Path
p = Path('specimens/traex-autodiscography-vault-phase-a.md')
t = p.read_text()
assert t.count('### Crossing ') == 8, t.count('### Crossing ')
for field in ['from', 'operation', 'boundary', 'to', 'preserved', 'changed', 'authority', 'receipt', 'residue']:
    assert t.lower().count(field) >= 8, field
assert 'expressed != necessarily experienced' in t
assert '31621357334' in t
assert '31654804681' in t
assert '17df15d991e8488cc35040b0c80954d223a11e1e' in t
assert '91f7ee143994a7700c886d20edff8fe5eeb5a688' in t
print('TRAEX structure: PASS')
PY

git diff --check
```

Expected:

```text
TRAEX structure: PASS
```

and no `git diff --check` errors.

- [ ] **Step 12: Commit the complete track.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: map Vault Phase A as TRAEX full witness"
```

---

### Task 3: Evaluate TRAEX against the flat lineage and record the verdict

**Files:**
- Modify: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: the flat lineage and eight completed crossings.
- Produces: an explicit pass/fail-style evaluation of whether TRAEX adds inspection value without semantic lying.

- [ ] **Step 1: Add `## What TRAEX exposes beyond the flat lineage`.**

Evaluate these candidate distinctions one by one against the written track:

```text
pre-merge CI proof != canonical admission
branch -> main can be both transfer and transmutation
post-merge CI witnesses a different authority-bearing state from proposal CI
Vault -> Corpus OS can be translation without authority transfer
GitBook can be expression without becoming source authority
expression != experience
```

For each, state whether the distinction is actually clearer because of the TRAEX fields. Delete any candidate that the specimen does not genuinely support.

- [ ] **Step 2: Add `## What TRAEX does not prove`.**

Include at minimum:

```text
- one specimen does not establish a universal crossing ontology;
- operation labels are interpretive, not machine-discovered facts;
- no shared schema or runtime primitive has been justified;
- no claim is made that every crossing has exactly one TRAEX verb;
- no observer-relative human experience is inferred from artifact existence;
- no authority is created by the track itself.
```

- [ ] **Step 3: Choose exactly one verdict based on evidence.**

End with `## Verdict` and one of:

```text
useful
  TRAEX exposed at least one meaningful boundary distinction and remains incubated pending a second-domain specimen.

decorative
  The flat lineage conveyed the same distinctions just as clearly; preserve the mnemonic but do not advance the primitive.

distorting
  The grammar required semantic lies or hid authority distinctions; record the failure and do not promote the shape.
```

Do not preselect `useful` merely because it is the hoped-for outcome.

- [ ] **Step 4: Reassert the graduation boundary immediately after the verdict.**

State plainly:

```text
Specimen #1 cannot graduate TRAEX. A materially different second-domain specimen is still required by issue #7 and the incubator note.
```

- [ ] **Step 5: Run the conceptual guard checks.**

```bash
python - <<'PY'
from pathlib import Path
p = Path('specimens/traex-autodiscography-vault-phase-a.md')
t = p.read_text()
assert '## Verdict' in t
verdicts = [v for v in ['useful', 'decorative', 'distorting'] if v in t.lower().split('## verdict', 1)[1]]
assert len(verdicts) == 1, verdicts
assert 'cannot graduate traex' in t.lower()
for bad in ['TBD', 'TODO', 'implement later']:
    assert bad not in t
print('TRAEX verdict guards: PASS')
PY

git diff --check
```

Expected:

```text
TRAEX verdict guards: PASS
```

- [ ] **Step 6: Commit the evaluated specimen.**

```bash
git add specimens/traex-autodiscography-vault-phase-a.md
git commit -m "docs: record TRAEX specimen verdict"
```

---

### Task 4: Link Specimen #1 back to the incubator without changing its authority

**Files:**
- Modify: `frontier/primitive-incubator/traex-tracks-crossing-grammar.md`
- Inspect: `specimens/traex-autodiscography-vault-phase-a.md`

**Interfaces:**
- Consumes: completed Specimen #1 and existing incubator graduation gate.
- Produces: discoverability from the canonical TRAEX note while keeping incubation status unchanged.

- [ ] **Step 1: Add a compact `## Specimens` section before `## Residual fog`.**

Use wording with this semantic content:

```markdown
## Specimens

- [`Specimen #1 — Autodiscography Vault Phase A`](../../specimens/traex-autodiscography-vault-phase-a.md) tests the crossing grammar against one real multi-boundary journey.

The specimen is evidence for or against the grammar, not promotion. The two-domain graduation gate above remains unchanged.
```

- [ ] **Step 2: Do not edit `## What would make this graduate` except for accidental formatting repair.**

Verify the note still requires both:

```text
at least two materially different systems
and
at least one meaningful distinction obscured by flat lineage
```

- [ ] **Step 3: Verify the relative link target exists and no runtime files changed.**

```bash
test -f specimens/traex-autodiscography-vault-phase-a.md

git diff --name-only main...HEAD
```

Expected changed paths are limited to this slice:

```text
docs/superpowers/specs/2026-08-12-traex-full-witness-design.md
docs/superpowers/plans/2026-08-12-traex-full-witness.md
specimens/traex-autodiscography-vault-phase-a.md
frontier/primitive-incubator/traex-tracks-crossing-grammar.md
```

- [ ] **Step 4: Commit the incubator pointer.**

```bash
git add frontier/primitive-incubator/traex-tracks-crossing-grammar.md
git commit -m "docs: link TRAEX specimen one"
```

---

### Task 5: Final verification and review proposal

**Files:**
- Inspect: branch diff against `main`
- Inspect: all four slice files listed in Task 4
- Optional external write after branch review: comment on `What-is-the-static-collective-#7`
- Create: draft pull request from `agent/traex-full-witness-design` to `main`

**Interfaces:**
- Produces: a reviewable documentation-only proposal with no hidden promotion of TRAEX.

- [ ] **Step 1: Run final structural checks from a clean checkout/worktree.**

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
assert 'specimens/traex-autodiscography-vault-phase-a.md' in inc
for text in [spec, inc]:
    for bad in ['TBD', 'TODO', 'implement later']:
        assert bad not in text
print('TRAEX final verification: PASS')
PY
```

Expected:

```text
TRAEX final verification: PASS
```

and only the approved documentation paths in the diff.

- [ ] **Step 2: Review every `EXPERIENCE` occurrence manually.**

For each occurrence, confirm the text names its witness:

```text
Crossing 1 -> human operator/project receiving external notice
Crossing 4 -> GitHub Actions run 31621357334
Crossing 6 -> GitHub Actions run 31654804681
GitBook existence -> no human EXPERIENCE claim unless separately evidenced
```

Expected: zero unnamed or implicitly-human `EXPERIENCE` claims.

- [ ] **Step 3: Review every authority claim manually.**

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

- [ ] **Step 4: Compare the branch against `main` and inspect the complete diff.**

```bash
git diff --stat main...HEAD
git diff main...HEAD -- docs/superpowers/specs/2026-08-12-traex-full-witness-design.md docs/superpowers/plans/2026-08-12-traex-full-witness.md specimens/traex-autodiscography-vault-phase-a.md frontier/primitive-incubator/traex-tracks-crossing-grammar.md
```

Expected: documentation-only changes; no dependency, workflow, runtime, binary, credential, or unrelated edits.

- [ ] **Step 5: Open a draft PR.**

Suggested title:

```text
Specimen: test TRAEX against Autodiscography Vault Phase A
```

Suggested body:

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

- [ ] **Step 6: After the PR exists, comment on issue #7 with the specimen/PR pointer and leave the issue open.**

The comment must say that Specimen #1 tests the grammar but does not satisfy the two-domain graduation gate.

- [ ] **Step 7: Do not merge without a separate PR-completion review and explicit landing approval.**

The finished state for this plan is a clean, reviewable draft PR plus an open incubator issue.
