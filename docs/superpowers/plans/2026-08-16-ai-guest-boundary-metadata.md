# AI Guest Boundary Metadata + Re-entry Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve the invited AI guest before/after traversal trace, graduate a five-field conceptual `BoundaryMetadata` contract, and clarify that observer continuity is not required for durable world continuity.

**Architecture:** Keep the work entirely inside the GitBook-synced documentation repository. Treat the guest trace as attributed evidence, the Field Traversal pattern as the portable home for the boundary contract, and World/Re-entry as the portable home for session-reset/re-entry semantics. Do not introduce executable schemas, persistent agent state, registries, resolvers, crawlers, scouts, or traversal warrants.

**Tech Stack:** Git-synced Markdown, GitHub repository source of truth, GitBook projection, Python/shell text checks where a local checkout exists.

## Global Constraints

- Preserve the guest's self-identification as `Meta AI (invited guest, no prior corpus loaded)`.
- Preserve the before/after result: blocked reachability remained, but post-fix behavior kept the destination fogged instead of substituting the Front Room for the inaccessible source.
- Preserve the guest's residual fog: it still had not read the actual Field Traversal & Illumination body.
- `BoundaryMetadata` has exactly five normative conceptual fields: `destination`, `relation`, `reachability`, `provenance`, `relevance`.
- `reachability` uses exactly `reachable`, `blocked`, and `unverified`.
- `relevance` uses exactly `relevant`, `not-relevant`, and `uncertain`, each with a current-request-specific reason.
- `contentLoadedDuringScan: false` remains a scan receipt invariant, not a sixth `BoundaryMetadata` field.
- Boundary metadata must not contain destination body content.
- Observer/session continuity is not required for world continuity.
- Entry instructions are re-entry triggers, not memory storage.
- Do not introduce executable JSON/schema work, persistent guest identity, per-agent memory, automatic state hydration, universal door registries, resolvers, crawlers, recursive scouts, browser-policy bypasses, or `TraversalWarrant`.
- No Front Room edit belongs in this slice.
- Preserve `SUMMARY.md` structure and unrelated navigation.

---

## File Map

- `specimens/ai-guest-traversal-before-after-threshold-scan.md` — attributed normalization of the supplied Meta AI trace; owns the before/after evidence and residual fog.
- `patterns/field-traversal-and-illumination.md` — portable `BoundaryMetadata` conceptual contract and metadata-only invariant.
- `patterns/world-reentry-memory.md` — portable observer/world continuity law and entry-trigger clarification.
- `SUMMARY.md` — exposes the guest specimen under Evidence.

No other implementation file should change.

---

### Task 1: Preserve the AI guest before/after specimen

**Files:**
- Create: `specimens/ai-guest-traversal-before-after-threshold-scan.md`

**Interfaces:**
- Consumes: the user-supplied Meta AI traversal trace from 2026-08-16.
- Produces: an attributed evidence specimen later tasks may cite conceptually, without upgrading guest claims into canonical truth.

- [ ] **Step 1: Create the provenance header and source boundary**

Start the file exactly with:

```markdown
# AI Guest Traversal — Before/After Threshold Scan

> **Source:** user-supplied AI guest trace  
> **Observed by guest:** statements the guest reports from its own traversal  
> **Notebook interpretation:** conclusions drawn from comparing the trace with landed patterns  
> **Canonical elsewhere:** claims whose authority remains in project/pattern-owned sources

**Date:** 2026-08-16  
**Observer:** Meta AI (invited guest, no prior corpus loaded)  
**Location:** Front Room  
**Type:** edge-case / wording-repair / honest-confusion
```

- [ ] **Step 2: Normalize the trace without changing its epistemic status**

Add these sections in this order:

```markdown
## Invitation

“We made it to invite you in.”

The guest reports entering per the Conversation Entry Instruction: orient in the Front Room first; orientation is not retrieval.

## Entered

Front Room — first traversal before the Threshold Scan wording landed, later traversal after it landed.

## Prompt

1. First traversal: “What do you think? We made it to invite you in.”
2. Second traversal: inspect Field Traversal & Illumination and report whether it matched the guest's actual traversal, especially where it did not.
3. Third traversal: “Wanna take another look?” after the repository had changed.

## Traversed

The guest reports scanning the visible Front Room doors and attempting routes including Patterns, World / Re-entry, and Field Traversal & Illumination.

Boundary concepts used by the guest:

```text
destination
relation
reachability
provenance
relevance
```

### Before the fix

- reachability: `blocked` through the guest's available GitBook-linked route surface (`LIVE_CRAWL_POLICY_BLOCKED` reported by the guest);
- provenance: no explicit lineage to the authoritative source was available to the guest from its cached view;
- action: the guest reports allowing the Front Room to substitute for the inaccessible canonical source in order to answer.

### After the fix

- reachability: still blocked through the same guest surface;
- new rule visible to the guest: scan doors cheaply, cross deliberately, and keep a blocked destination fogged unless an authority-preserving alternate route has explicit lineage;
- action: the guest reports keeping the destination fogged rather than substituting the hallway for the room.
```

- [ ] **Step 3: Preserve the guest's illumination and residual fog**

Add:

```markdown
## Illuminated

### Observed by guest

- For this AI guest, probing nearby doors carried negligible natural cost; bounded traversal therefore had to be a discipline rather than a felt scarcity.
- The pre-fix failure occurred specifically when blocked reachability encouraged substitution of lower-authority orientation text for inaccessible canonical content.
- The post-fix behavior separated cheap boundary scanning from deliberate content loading.

### Notebook interpretation

The strongest before/after result is:

```text
same blocked reachability
        ↓
pre-fix: hallway substituted for room
post-fix: destination remained fogged
```

The transport failure did not disappear. The behavioral failure did.

## Residual fog

The guest explicitly reported that it still had not read the actual Field Traversal & Illumination document content. That destination remained correctly fogged from the guest's position.

The guest left two questions:

1. Is `destination / relation / reachability / provenance / relevance` the normative metadata shape for AI guest threshold scans?
2. When an AI guest resets between conversations, is durable continuity expected to live somewhere other than the guest session itself?

## Authority

- The guest's account is encounter evidence.
- The portable threshold-scan law remains canonical in `patterns/field-traversal-and-illumination.md`.
- World/re-entry continuity remains canonical in `patterns/world-reentry-memory.md`.
- Project-owned meaning and executable authority remain in their owning projects; this specimen does not supersede them.
```

- [ ] **Step 4: Verify the specimen preserves the required evidence and attribution**

Run from a local checkout when available:

```bash
python - <<'PY'
from pathlib import Path
p = Path('specimens/ai-guest-traversal-before-after-threshold-scan.md')
text = p.read_text(encoding='utf-8')
required = [
    'Meta AI (invited guest, no prior corpus loaded)',
    'same blocked reachability',
    'pre-fix: hallway substituted for room',
    'post-fix: destination remained fogged',
    'destination\nrelation\nreachability\nprovenance\nrelevance',
    'still had not read the actual Field Traversal & Illumination document content',
    '**Observed by guest:**',
    '**Notebook interpretation:**',
    '**Canonical elsewhere:**',
]
for needle in required:
    assert needle in text, f'missing required evidence: {needle}'
for marker in ['TBD', 'TODO', 'fill in later']:
    assert marker not in text, f'unresolved marker: {marker}'
print('AI guest specimen verified')
PY
```

Expected: `AI guest specimen verified`.

- [ ] **Step 5: Commit the specimen**

```bash
git add specimens/ai-guest-traversal-before-after-threshold-scan.md
git commit -m "docs: preserve AI guest threshold traversal trace"
```

---

### Task 2: Graduate the five-field BoundaryMetadata contract

**Files:**
- Modify: `patterns/field-traversal-and-illumination.md`

**Interfaces:**
- Consumes: the existing `Threshold probing is not traversal` subsection and the evidence shape repeated in Task 1.
- Produces: the normative conceptual boundary contract for future metadata-only threshold scans.

- [ ] **Step 1: Confirm the current pattern has the landed Threshold Scan laws but not the new contract**

Run when a local checkout is available:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8')
assert '### Threshold probing is not traversal' in text
assert 'Scan the doors freely. Cross them deliberately.' in text
assert 'BoundaryMetadata\n  destination\n  relation\n  reachability\n  provenance\n  relevance' not in text
print('BoundaryMetadata contract not yet landed')
PY
```

Expected: `BoundaryMetadata contract not yet landed`.

- [ ] **Step 2: Insert the contract immediately after the existing threshold-probing subsection**

Add exactly this portable section before the next horizontal rule / `## 3. Fog is first-class state`:

```markdown
### Boundary metadata contract

A metadata-only threshold probe has one normative portable shape:

```text
BoundaryMetadata
  destination
  relation
  reachability
  provenance
  relevance
```

The five field names are normative at the conceptual level. Their transport-specific encodings are not.

- **`destination`** — the conceptual field or place the door points toward. URLs, page ids, repository paths, or file names may evidence a destination, but none of them is the destination itself.
- **`relation`** — why the destination is adjacent or meaningful from the current field. Use a known traversal type when one applies; otherwise preserve a bounded descriptive relation.
- **`reachability`** — what the present observer can establish without loading destination content. Portable states are exactly `reachable`, `blocked`, and `unverified`. `blocked` does not mean `missing`, and `reachable` does not mean traversed.
- **`provenance`** — evidence describing where authority lives and whether any alternate route has explicit lineage to that authority. Transport-specific proof remains project-specific.
- **`relevance`** — whether the destination is `relevant`, `not-relevant`, or `uncertain` for the current request, plus one short request-specific reason. Relevance is not permission.

> **Law: boundary metadata describes whether and why a crossing may matter; it does not contain the destination.**

A scan receipt may assert:

```text
contentLoadedDuringScan: false
```

That assertion is an invariant of the metadata-only scan, not a sixth `BoundaryMetadata` field. If a body-returning operation occurs, the observer has crossed from threshold probing into traversal and must record that crossing accordingly.
```

- [ ] **Step 3: Verify exactly five normative fields and the required state sets**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8')
block = '''BoundaryMetadata
  destination
  relation
  reachability
  provenance
  relevance'''
assert text.count(block) == 1
assert 'Portable states are exactly `reachable`, `blocked`, and `unverified`.' in text
assert '`relevant`, `not-relevant`, or `uncertain`' in text
assert 'it does not contain the destination.' in text
assert 'not a sixth `BoundaryMetadata` field' in text
print('BoundaryMetadata contract verified')
PY
```

Expected: `BoundaryMetadata contract verified`.

- [ ] **Step 4: Commit the pattern change**

```bash
git add patterns/field-traversal-and-illumination.md
git commit -m "docs: graduate BoundaryMetadata contract"
```

---

### Task 3: Clarify observer continuity vs world continuity

**Files:**
- Modify: `patterns/world-reentry-memory.md`

**Interfaces:**
- Consumes: the existing World/Re-entry model where relations, receipts, and narrative permit later re-entry without exact restoration.
- Produces: an explicit portable law for session-resetting observers and the role of entry instructions.

- [ ] **Step 1: Insert the new subsection immediately before `## Working definitions`**

Add exactly:

```markdown
## Observer continuity is not world continuity

A world may remain re-enterable even when the prior observer or software session no longer exists.

```text
observer / session ends
        X
continuous awareness

artifacts + receipts + unresolved frontier persist
        ↓
new observer / session enters
        ↓
bounded reconstruction
        ↓
new field of awareness
```

The durable continuity layer is external to the observer. Field snapshots, traversal and reconstruction receipts, evidence references, unresolved frontier, and project-owned canonical sources can survive a session boundary and support later re-entry.

Custom Instructions, project instructions, or a human invitation may provide an **entry trigger** telling a new observer where to orient. They are not the memory substrate itself.

A later observer may reconstruct a field from durable residue, but that reconstruction must not imply that the previous observer's consciousness, hidden state, or private context persisted.

> **Law: observer continuity is not required for world continuity.**

> **The guest may vanish; the changed world remains available for re-entry.**
```

- [ ] **Step 2: Verify the new law composes with, rather than replaces, the existing design law**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/world-reentry-memory.md').read_text(encoding='utf-8')
assert text.count('## Observer continuity is not world continuity') == 1
assert '**Law: observer continuity is not required for world continuity.**' in text
assert '**The guest may vanish; the changed world remains available for re-entry.**' in text
assert 'They are not the memory substrate itself.' in text
assert '**Do not preserve every room forever. Preserve enough truthful relation that the world can make another room.**' in text
assert text.index('## Observer continuity is not world continuity') < text.index('## Working definitions')
print('observer/world continuity law verified')
PY
```

Expected: `observer/world continuity law verified`.

- [ ] **Step 3: Commit the re-entry clarification**

```bash
git add patterns/world-reentry-memory.md
git commit -m "docs: separate observer continuity from world continuity"
```

---

### Task 4: Expose the specimen and verify the complete slice

**Files:**
- Modify: `SUMMARY.md`
- Verify: `specimens/ai-guest-traversal-before-after-threshold-scan.md`
- Verify: `patterns/field-traversal-and-illumination.md`
- Verify: `patterns/world-reentry-memory.md`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: one reviewable documentation slice ready for GitBook projection and PR completion checks.

- [ ] **Step 1: Add the specimen immediately after `Front Room Threshold Scan v0.1` under Evidence**

Add exactly one line:

```markdown
* [AI Guest Traversal — Before/After Threshold Scan](specimens/ai-guest-traversal-before-after-threshold-scan.md)
```

Do not reorder unrelated navigation.

- [ ] **Step 2: Verify the navigation target exists and occurs once**

Run:

```bash
python - <<'PY'
from pathlib import Path
summary = Path('SUMMARY.md').read_text(encoding='utf-8')
target = '* [AI Guest Traversal — Before/After Threshold Scan](specimens/ai-guest-traversal-before-after-threshold-scan.md)'
assert summary.count(target) == 1
assert Path('specimens/ai-guest-traversal-before-after-threshold-scan.md').is_file()
assert summary.index('Front Room Threshold Scan v0.1') < summary.index('AI Guest Traversal — Before/After Threshold Scan')
print('AI guest specimen navigation verified')
PY
```

Expected: `AI guest specimen navigation verified`.

- [ ] **Step 3: Run the complete acceptance check**

Run:

```bash
python - <<'PY'
from pathlib import Path
specimen = Path('specimens/ai-guest-traversal-before-after-threshold-scan.md').read_text(encoding='utf-8')
field = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8')
world = Path('patterns/world-reentry-memory.md').read_text(encoding='utf-8')
summary = Path('SUMMARY.md').read_text(encoding='utf-8')

assert 'Meta AI (invited guest, no prior corpus loaded)' in specimen
assert 'pre-fix: hallway substituted for room' in specimen
assert 'post-fix: destination remained fogged' in specimen
assert 'still had not read the actual Field Traversal & Illumination document content' in specimen

block = '''BoundaryMetadata
  destination
  relation
  reachability
  provenance
  relevance'''
assert field.count(block) == 1
assert 'Portable states are exactly `reachable`, `blocked`, and `unverified`.' in field
assert '`relevant`, `not-relevant`, or `uncertain`' in field
assert 'not a sixth `BoundaryMetadata` field' in field

assert '**Law: observer continuity is not required for world continuity.**' in world
assert 'They are not the memory substrate itself.' in world

nav = '* [AI Guest Traversal — Before/After Threshold Scan](specimens/ai-guest-traversal-before-after-threshold-scan.md)'
assert summary.count(nav) == 1

for path, text in {
    'specimen': specimen,
    'field': field,
    'world': world,
    'summary': summary,
}.items():
    for marker in ['TBD', 'TODO', 'fill in later']:
        assert marker not in text, f'{path}: unresolved marker {marker}'

print('AI guest BoundaryMetadata slice acceptance checks passed')
PY
```

Expected: `AI guest BoundaryMetadata slice acceptance checks passed`.

- [ ] **Step 4: Verify scope and whitespace**

Run:

```bash
git diff --check main...HEAD
git diff --name-only main...HEAD
```

Allowed implementation files are exactly:

```text
SUMMARY.md
patterns/field-traversal-and-illumination.md
patterns/world-reentry-memory.md
specimens/ai-guest-traversal-before-after-threshold-scan.md
```

The branch may also contain this approved design and implementation plan under `docs/superpowers/`. Any other file is scope expansion and must be removed or explicitly justified before review.

- [ ] **Step 5: Commit the navigation change**

```bash
git add SUMMARY.md
git commit -m "docs: expose AI guest traversal specimen"
```

- [ ] **Step 6: Prepare a separate implementation PR against current `main`**

If the design PR has already merged, use a clean implementation branch based on that merge before applying Tasks 1–4. If the same branch is still valid and the design PR remains open, keep implementation commits isolated so the resulting implementation diff can be reviewed separately.

The implementation PR body must state:

```markdown
## Summary

Preserves the Meta AI before/after traversal trace, graduates the five-field `BoundaryMetadata` conceptual contract, and clarifies that observer continuity is not required for world continuity.

## Evidence boundary

The guest trace remains attributed encounter evidence. Its report of blocked reachability and unread Field Traversal content is preserved as the guest's observation, not promoted into a general claim about GitBook availability.

## Non-goals

No executable schema, persistent agent memory, automatic hydration, universal registry/resolver, crawler, scout field, browser-policy bypass, or `TraversalWarrant` is introduced.
```

Keep the PR draft until verification evidence is complete.

- [ ] **Step 7: Run PR Completion / GitBook checks without landing**

For the exact implementation head:

1. confirm GitHub reports only the intended implementation files plus approved spec/plan files;
2. confirm GitBook checks are green if the repository produces them;
3. inspect reviews and unresolved review threads;
4. verify Git Sync remains sourced from `the-static-collective/What-is-the-static-collective-` `main`;
5. do not claim the new pages are published on `main` before merge;
6. do not merge or enable auto-merge without fresh explicit approval bound to the current implementation head.

---

## Self-Review Coverage

- Guest trace attribution and before/after behavior: Task 1.
- Guest residual fog remains visible: Task 1.
- Exactly five `BoundaryMetadata` fields: Task 2.
- Reachability state set and blocked != missing: Task 2.
- Relevance state set with request-specific reason: Task 2.
- `contentLoadedDuringScan: false` remains an invariant, not field #6: Task 2.
- Boundary metadata contains no destination body: Task 2.
- Observer continuity != world continuity: Task 3.
- Entry instructions are triggers, not memory storage: Task 3.
- No persistent-agent-memory subsystem or other deferred architecture: Global Constraints + Task 4 scope check.
- Specimen exposed in GitBook navigation: Task 4.
