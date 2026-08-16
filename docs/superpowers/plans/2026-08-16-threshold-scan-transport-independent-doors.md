# Threshold Scan + Transport-Independent Doors Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a documentation/evidence proof that agents can scan Front Room door boundaries in parallel without loading destination content, preserve projection/source lineage, and cross only deliberately.

**Architecture:** Keep the experiment entirely inside the GitBook-synced documentation repository. Use existing GitBook page metadata plus Git Sync provenance to build one seven-door metadata-only specimen, then amend the portable Field Traversal pattern and the Front Room with the smallest laws required by that evidence. No executable resolver, crawler, registry, or traversal-authority primitive is introduced.

**Tech Stack:** Git-synced Markdown, GitBook page metadata/Git Sync metadata, GitHub repository paths, shell verification (`git diff --check`, `rg`, `python`).

## Global Constraints

- Preserve GitBook sync metadata and `SUMMARY.md` structure per `AGENTS.md`.
- GitHub `main` remains the editing source of truth for the GitBook-synced space.
- Scan phase must use metadata/listing surfaces only; any body-returning read counts as traversal.
- The first specimen is limited to the seven existing Front Room doors and must not recurse into destination doors.
- `contentLoadedDuringScan: false` may be recorded only if no destination body was fetched during the scan phase.
- Route substitution is lawful only when explicit provenance establishes the projection/source lineage.
- A blocked projection does not prove the destination is missing or the product/link is generally broken.
- Do not introduce a universal `DoorTarget` manifest/registry, crawler, `TraversalWarrant`, speculative scouts, semantic-search scan, cache fallback, or executable resolver.
- Keep the Front Room small; add only the minimum threshold-scan instruction required for orientation.
- Riqor evidence, when available, supplements repository verification; it does not replace the concrete checks in this plan.
- PR Completion must not land the implementation PR without fresh explicit approval bound to the current implementation head.

---

## File Map

- `specimens/front-room-threshold-scan-v0.1.md` — first evidence specimen; owns the seven-door boundary map and explicit no-content-loaded assertion.
- `patterns/field-traversal-and-illumination.md` — portable laws: probe vs traversal, frictionless boundary parallelism, lineage-preserving alternate routes, inaccessible-authority behavior, and temporary-field/durable-residue clarification.
- `README.md` — compact Front Room instruction for threshold scanning and blocked-authority behavior; must not become a registry or index.
- `SUMMARY.md` — exposes the new specimen under Evidence.

No other implementation file should change unless verification proves one is strictly required.

---

### Task 1: Capture the seven-door metadata-only specimen

**Files:**
- Create: `specimens/front-room-threshold-scan-v0.1.md`

**Interfaces:**
- Consumes: the seven existing Front Room doors declared in `README.md`; GitBook page-list metadata; GitBook space Git Sync metadata.
- Produces: a durable `ThresholdScanReceipt` specimen containing one row per door and `contentLoadedDuringScan: false` only if the scan phase used no body-returning reads.

- [ ] **Step 1: Start an evidence run if Riqor runtime is available**

Run from the repository root:

```bash
riqor run start --goal "prove the Front Room seven-door threshold scan without loading destination bodies" --path evidence-loop --profile assured
riqor run status --json
```

Expected: one active repository-scoped run. If the local Riqor runtime is unavailable, note that in the PR evidence summary and continue with the concrete GitBook/repository checks below.

- [ ] **Step 2: Freeze the seven declared doors without following them**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('README.md').read_text(encoding='utf-8')
expected = [
    'Patterns',
    'Witness',
    'Frontier',
    'Incubator',
    'Evidence',
    'Vocabulary',
    'World / Re-entry',
]
missing = [name for name in expected if f'<strong>{name}</strong>' not in text]
assert not missing, f'missing Front Room doors: {missing}'
print('seven Front Room doors present')
PY
```

Expected: `seven Front Room doors present`.

Do not open or read any destination body as part of this step.

- [ ] **Step 3: Perform the threshold scan with metadata/listing surfaces only**

Using the connected GitBook surface:

1. Read space metadata with `getSpaceById` or the equivalent metadata operation. Record the space id, Git Sync repository, branch, sync operation state, revision id, and observation time when available.
2. List page metadata with `listPages` or equivalent. Identify the metadata entries corresponding to the seven Front Room destinations.
3. For each door record only boundary metadata: page id, page path/slug, `git.path` when exposed, and whether the projection is represented in the current page map.
4. Do **not** call `get_page`, GitHub `fetch_file`, semantic search, webpage open, or any other destination body-returning operation during the scan phase.
5. If metadata alone cannot establish a route, classify it as `unverified` or `fogged`; do not retrieve content to settle the uncertainty.

For source-path existence inside a local checkout, `Path(source_path).is_file()` is allowed because it checks filesystem presence without loading the destination body.

- [ ] **Step 4: Write the specimen using fixed field semantics**

Create `specimens/front-room-threshold-scan-v0.1.md` with these sections and field rules:

```markdown
# Front Room Threshold Scan v0.1

## Purpose

Test whether an agent can survey the boundaries of all seven Front Room doors without loading destination bodies, while preserving projection/source lineage and explicit fog.

## Scan boundary

- Origin: Front Room
- Scan type: metadata-only threshold scan
- Recursive scan: no
- Destination body reads during scan: none
- `contentLoadedDuringScan`: false

## Authority / lineage

Record the exact observed GitBook space id, Git Sync repository, branch, sync state, revision/observation marker, and the statement that these establish projection/source lineage only for this observed specimen.

## ThresholdScanReceipt

Use exactly these columns:

| Door | Relation | GitBook projection | Canonical Git source | Projection state | Source lineage | Relevance | Admitted crossing |
| --- | --- | --- | --- | --- | --- | --- | --- |

Add exactly seven data rows in this order: Patterns, Witness, Frontier, Incubator, Evidence, Vocabulary, World / Re-entry.

For each row:

- `GitBook projection` = exact page path plus page id from page metadata, or `unverified` when no metadata match exists.
- `Canonical Git source` = exact `git.path` from GitBook metadata, or `unverified` when absent.
- `Projection state` = one of `represented-in-page-map`, `unverified`, or `fogged`.
- `Source lineage` = `verified-by-git-sync` only when the observed Git Sync relationship and page metadata establish the source mapping; otherwise `unverified`.
- `Relevance` = `relevant`, `not-relevant`, or `uncertain`, followed by one short reason tied to the current prompt.
- `Admitted crossing` = `no` for all seven rows in the scan-only specimen.

## What the scan did not do

State that the scan did not read destination bodies, recursively scan child doors, infer missing page content, or treat reachability as permission.

## Residual fog

Record every unverified or surface-dependent condition, including any projection whose public reachability could not be tested without loading body content.

## Verdict

State only what the metadata proves. Do not claim a rendered page is publicly reachable unless that was established without loading its body.
```

- [ ] **Step 5: Verify specimen structure and absence of unresolved drafting markers**

Run:

```bash
python - <<'PY'
from pathlib import Path
p = Path('specimens/front-room-threshold-scan-v0.1.md')
text = p.read_text(encoding='utf-8')
for name in ['Patterns','Witness','Frontier','Incubator','Evidence','Vocabulary','World / Re-entry']:
    assert name in text, f'missing {name}'
assert '`contentLoadedDuringScan`: false' in text
assert text.count('| Patterns |') == 1
assert text.count('| Witness |') == 1
assert text.count('| Frontier |') == 1
assert text.count('| Incubator |') == 1
assert text.count('| Evidence |') == 1
assert text.count('| Vocabulary |') == 1
assert text.count('| World / Re-entry |') == 1
for bad in ['TBD', 'TODO', 'fill in later']:
    assert bad not in text, f'unresolved drafting marker: {bad}'
print('threshold specimen structure verified')
PY
```

Expected: `threshold specimen structure verified`.

- [ ] **Step 6: Commit the specimen**

```bash
git add specimens/front-room-threshold-scan-v0.1.md
git commit -m "docs: preserve front room threshold scan specimen"
```

---

### Task 2: Amend the portable Field Traversal law

**Files:**
- Modify: `patterns/field-traversal-and-illumination.md`

**Interfaces:**
- Consumes: `specimens/front-room-threshold-scan-v0.1.md` and the approved Threshold Scan design.
- Produces: portable prose laws distinguishing threshold probing from traversal, positive frictionless boundary use, lawful route substitution, inaccessible-authority behavior, and temporary-field/durable-residue behavior.

- [ ] **Step 1: Check for pre-existing landed wording before editing**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8').lower()
phrases = [
    'scan the doors freely. cross them deliberately.',
    'probing a threshold does not count as entering the room.',
    'route substitution is lawful only when provenance preserves the authority relationship.',
]
print({phrase: text.count(phrase) for phrase in phrases})
PY
```

Expected on the current baseline: zero for all three. If another approved change landed first, preserve it and add only missing requirements.

- [ ] **Step 2: Add threshold probing immediately after traversal-as-epistemic-event**

Add this subsection, adjusting heading numbering only if the file's current structure requires it:

```markdown
### Threshold probing is not traversal

Some observers—especially software agents—can test many nearby routes at negligible technical cost. That makes unrestricted retrieval easy, but it also creates a useful boundary operation: inspect whether a door exists, how it relates to the current field, and where its authority lives **without loading the destination field itself**.

```text
visible doors
    ↓
metadata-only threshold scan
    ↓
reachability + lineage + relevance
    ↓
deliberate crossing
```

> **Scan the doors freely. Cross them deliberately.**

A threshold probe may inspect destination identity, declared relation, projection/source references, reachability metadata, provenance, and present-request relevance. It does not ingest destination body text, snippets from inside the destination, or neighboring destination content.

**Law:** probing a threshold does not count as entering the room.

**Law:** a visible or reachable field does not, by itself, authorize traversal into it.

**Law:** when traversal cost approaches zero, boundedness must come from declared relevance or governance rather than assumed scarcity.

**Law:** frictionless reachability is useful for surveying boundaries, not for silently expanding context.
```

- [ ] **Step 3: Add the lineage-preserving blocked-route rule near authority/fog handling**

Add:

```markdown
A projection may be unavailable even when the destination still exists through another authority-preserving route. An alternate route is lawful only when provenance establishes the relationship between the projection and the canonical source.

**Law:** route substitution is lawful only when provenance preserves the authority relationship.

**Law:** an inaccessible authoritative source does not transfer its authority to the nearest cache, summary, orientation page, or reconstruction.

> A locked door does not make the hallway the room.
```

Do not describe caches, summaries, or search results as fallback authorities.

- [ ] **Step 4: Clarify temporary field vs durable residue in bounded reconstruction**

Add this paragraph to the existing reconstruction section:

```markdown
A field of awareness may be temporary, and the observer need not remain continuously present. Durable residue can still survive as field snapshots, traversal receipts, evidence references, and unresolved frontier. A later reconstruction may use that residue, but it must not imply continuity of consciousness that was not actually preserved.
```

- [ ] **Step 5: Verify required portable laws are present exactly once**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8').lower()
phrases = [
    'scan the doors freely. cross them deliberately.',
    'probing a threshold does not count as entering the room.',
    'a visible or reachable field does not, by itself, authorize traversal into it.',
    'when traversal cost approaches zero, boundedness must come from declared relevance or governance rather than assumed scarcity.',
    'frictionless reachability is useful for surveying boundaries, not for silently expanding context.',
    'route substitution is lawful only when provenance preserves the authority relationship.',
    'an inaccessible authoritative source does not transfer its authority to the nearest cache, summary, orientation page, or reconstruction.',
    'a locked door does not make the hallway the room.',
]
for phrase in phrases:
    count = text.count(phrase)
    assert count == 1, f'{phrase!r}: expected once, found {count}'
print('portable threshold laws verified')
PY
```

Expected: `portable threshold laws verified`.

- [ ] **Step 6: Commit the pattern update**

```bash
git add patterns/field-traversal-and-illumination.md
git commit -m "docs: define threshold scan traversal law"
```

---

### Task 3: Add the compact Front Room instruction and Evidence navigation

**Files:**
- Modify: `README.md`
- Modify: `SUMMARY.md`

**Interfaces:**
- Consumes: Task 2 portable laws and Task 1 specimen path.
- Produces: one small orientation-level threshold instruction plus one navigation entry; no expanded door inventory.

- [ ] **Step 1: Add one compact threshold-scan hint near the existing orientation hint**

Add:

```markdown
{% hint style="info" %}
**Scan the doors freely. Cross them deliberately.**

When many nearby doors are cheap to probe, inspect only their boundary metadata first: destination, relation, reachability, provenance, and relevance. Do not load destination content until the current request makes a crossing relevant.

If a relevant projection is blocked, use another route only when its lineage to the authoritative source is explicit. Otherwise keep the destination fogged. A locked door does not make the hallway the room.
{% endhint %}
```

Do not add page ids, GitHub paths, URLs, a registry table, or per-door fallback instructions to the Front Room.

- [ ] **Step 2: Preserve the existing rule-of-entry list and seven-door inventory unchanged**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('README.md').read_text(encoding='utf-8')
for n, phrase in [
    (1, '**Orient.**'),
    (2, '**Listen to the current request.**'),
    (3, '**Traverse narrowly.**'),
    (4, '**Keep authority where it belongs.**'),
    (5, '**Preserve fog.**'),
    (6, '**Leave when irrelevant.**'),
]:
    assert f'{n}. {phrase}' in text, f'rule {n} changed or missing'
for door in ['Patterns','Witness','Frontier','Incubator','Evidence','Vocabulary','World / Re-entry']:
    assert f'<strong>{door}</strong>' in text, f'door changed or missing: {door}'
print('Front Room entry rules and seven doors preserved')
PY
```

Expected: `Front Room entry rules and seven doors preserved`.

- [ ] **Step 3: Add the specimen under Evidence in `SUMMARY.md`**

Immediately after `Specimen Notes`, add exactly:

```markdown
* [Front Room Threshold Scan v0.1](specimens/front-room-threshold-scan-v0.1.md)
```

Do not reorder unrelated navigation.

- [ ] **Step 4: Verify the navigation entry exists once and targets a real file**

Run:

```bash
python - <<'PY'
from pathlib import Path
summary = Path('SUMMARY.md').read_text(encoding='utf-8')
target = '* [Front Room Threshold Scan v0.1](specimens/front-room-threshold-scan-v0.1.md)'
assert summary.count(target) == 1
assert Path('specimens/front-room-threshold-scan-v0.1.md').is_file()
print('threshold specimen navigation verified')
PY
```

Expected: `threshold specimen navigation verified`.

- [ ] **Step 5: Commit the Front Room/navigation update**

```bash
git add README.md SUMMARY.md
git commit -m "docs: expose threshold scan from front room"
```

---

### Task 4: Verify the complete slice and prepare PR readiness

**Files:**
- Verify: `specimens/front-room-threshold-scan-v0.1.md`
- Verify: `patterns/field-traversal-and-illumination.md`
- Verify: `README.md`
- Verify: `SUMMARY.md`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: fresh repository/GitBook evidence for PR readiness; no landing mutation.

- [ ] **Step 1: Run repository whitespace and unresolved-marker checks**

```bash
git diff --check main...HEAD
python - <<'PY'
from pathlib import Path
paths = [
    'specimens/front-room-threshold-scan-v0.1.md',
    'patterns/field-traversal-and-illumination.md',
    'README.md',
    'SUMMARY.md',
]
for path in paths:
    text = Path(path).read_text(encoding='utf-8')
    for marker in ['TBD', 'TODO', 'fill in later']:
        assert marker not in text, f'{path}: unresolved drafting marker {marker}'
print('implementation docs contain no unresolved drafting markers')
PY
```

Expected: both commands exit 0.

- [ ] **Step 2: Verify scope**

Run:

```bash
git diff --name-only main...HEAD
```

Allowed implementation files:

```text
README.md
SUMMARY.md
patterns/field-traversal-and-illumination.md
specimens/front-room-threshold-scan-v0.1.md
```

The branch may also contain the approved design and this plan under `docs/superpowers/`. Any other changed file is scope expansion and must be removed or explicitly justified before review.

- [ ] **Step 3: Re-run metadata-only GitBook verification after the final mutation**

Using metadata/listing operations only:

1. confirm the space is still Git-synced from `the-static-collective/What-is-the-static-collective-` `main`;
2. confirm current sync state is not reported as failed;
3. list page metadata and verify the seven pre-existing Front Room destination entries remain represented where they were represented before;
4. do not fetch destination body text during this verification.

Before merge, do not claim the new specimen is published in GitBook; only source-side structure is verifiable.

- [ ] **Step 4: Complete the Riqor evidence run if one was started**

```bash
riqor run status --json
riqor run complete --json
```

Expected: no pending verification after the final mutation. If Riqor was unavailable, preserve that limitation in the PR evidence summary rather than inventing Riqor output.

- [ ] **Step 5: Perform the minimal-diff review**

```bash
git diff --stat main...HEAD
git diff main...HEAD -- README.md SUMMARY.md patterns/field-traversal-and-illumination.md specimens/front-room-threshold-scan-v0.1.md
```

Delete unrelated wording cleanup, navigation reorganization, extra fallback mechanisms, or speculative future architecture.

- [ ] **Step 6: Push/update the implementation PR and run PR Completion readiness observation**

Push normally. Keep the PR draft until the implementation evidence is complete. PR Completion may repair branch-caused CI/review issues and bring the exact head to verified readiness.

Do **not** merge, enable auto-merge, or enter a merge queue without fresh explicit approval for the current implementation head SHA.

- [ ] **Step 7: Verify GitBook after an explicitly approved merge**

Only after the implementation PR is actually merged:

1. confirm Git Sync reports a successful import after the merged commit;
2. list GitBook pages and confirm `Front Room Threshold Scan v0.1` appears in the expected navigation structure;
3. verify the Front Room still presents the same seven doors plus the compact threshold-scan hint;
4. if the published projection cannot be verified through the available surface, report that as residual fog rather than claiming publication success.

---

## Self-Review Coverage

- Destination identity vs transport: Task 1 lineage fields + Task 2 route law.
- Probe vs traversal: Task 1 metadata-only procedure + Task 2 explicit law.
- Positive frictionless boundary use: Task 1 seven-door scan + Task 2 positive law.
- Lawful route substitution: Task 1 Git Sync provenance + Task 2 route-substitution law.
- Scan receipt vs permission: Task 1 separates relevance from `Admitted crossing` and records all crossings as `no`.
- Seven-door proof only: Task 1 forbids recursion.
- Front Room stays small: Task 3 adds one compact hint and leaves the door inventory unchanged.
- No registry/crawler/warrant/resolver: Global Constraints + Task 4 minimal-diff review.
- GitHub remains GitBook editing source of truth: Task 4 metadata verification.
- Inaccessible authority + temporary field/durable residue: Task 2 incorporates both without executable enforcement.
