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
- `patterns/field-traversal-and-illumination.md` — portable laws: probe vs traversal, frictionless boundary parallelism, lineage-preserving alternate routes, temporary field/durable residue clarification from the prior Metta design where still missing.
- `README.md` — compact Front Room instruction for threshold scanning and blocked-authority behavior; must not become a registry or index.
- `SUMMARY.md` — exposes the new specimen under Evidence.

No other file should change unless verification proves one is strictly required.

---

### Task 1: Capture the seven-door metadata-only specimen

**Files:**
- Create: `specimens/front-room-threshold-scan-v0.1.md`

**Interfaces:**
- Consumes: the seven existing Front Room doors declared in `README.md`; GitBook page-list metadata; GitBook space Git Sync metadata.
- Produces: a durable `ThresholdScanReceipt` specimen containing one row/record per door and `contentLoadedDuringScan: false` only if the scan phase used no body-returning reads.

- [ ] **Step 1: Start an evidence run if Riqor runtime is available**

Run from the repository root:

```bash
riqor run start --goal "prove the Front Room seven-door threshold scan without loading destination bodies" --path evidence-loop --profile assured
riqor run status --json
```

Expected: one active repository-scoped run. If the local Riqor runtime is unavailable, record that limitation in the PR notes and continue with the concrete repository/GitBook evidence below; do not block the documentation specimen on Riqor availability.

- [ ] **Step 2: Freeze the seven declared doors from the Front Room without following them**

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

Do not open or read any destination file as part of this step.

- [ ] **Step 3: Perform the scan with metadata/listing surfaces only**

Using the connected GitBook tool surface:

1. Read the space metadata (`getSpaceById` or equivalent) and record:
   - space id;
   - Git Sync repository;
   - Git Sync branch;
   - sync operation state;
   - revision id / observation timestamp if available.
2. List page metadata (`listPages` or equivalent) and identify the GitBook page metadata corresponding to each of the seven Front Room door targets.
3. For every destination record only metadata fields such as:
   - GitBook page id;
   - GitBook path/slug;
   - Git-backed source path (`git.path`) where exposed;
   - whether that projection is represented in the current page map.
4. Do **not** call `get_page`, `fetch_file`, semantic search, webpage open, or any other body-returning operation for a destination during this scan phase.

If a destination cannot be matched from metadata alone, record its projection/source state as `fogged` or `unverified`; do not fetch its body to resolve the ambiguity.

- [ ] **Step 4: Write the specimen from observed metadata**

Create `specimens/front-room-threshold-scan-v0.1.md` with this exact structural contract:

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

Record the observed GitBook Git Sync source, branch, sync state, and observation time/revision. State explicitly that this proves the observed projection/source lineage for this specimen only.

## ThresholdScanReceipt

| Door | Relation | GitBook projection | Canonical Git source | Projection state | Source lineage | Relevance | Admitted crossing |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Patterns | portable laws / structures | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| Witness | durable breadcrumbs | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| Frontier | unresolved questions / tensions | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| Incubator | pre-project / pre-law ideas | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| Evidence | specimens / encounters | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| Vocabulary | shared language | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |
| World / Re-entry | reconstructible world continuity | <observed metadata> | <observed git.path> | <state> | <verified/unverified> | <judgment + reason> | no |

## What the scan did not do

State that the scan did not read destination bodies, recursively scan child doors, infer missing page content, or treat reachability as permission.

## Residual fog

Record every unverified or surface-dependent condition, including any projection that could not be tested without a body read.

## Verdict

State only what the metadata proves. Do not claim that a rendered page is publicly reachable unless that was established through a non-body metadata surface.
```

Replace every angle-bracket placeholder with observed values before committing. Do not leave `TBD`, `TODO`, or speculative certainty.

- [ ] **Step 5: Verify the specimen contains all seven doors and the no-content-loaded assertion**

Run:

```bash
python - <<'PY'
from pathlib import Path
p = Path('specimens/front-room-threshold-scan-v0.1.md')
text = p.read_text(encoding='utf-8')
for name in ['Patterns','Witness','Frontier','Incubator','Evidence','Vocabulary','World / Re-entry']:
    assert name in text, f'missing {name}'
assert '`contentLoadedDuringScan`: false' in text
for bad in ['TBD', 'TODO', '<observed', '<state>', '<verified', '<judgment']:
    assert bad not in text, f'placeholder remains: {bad}'
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
- Consumes: the evidence boundary proved by `specimens/front-room-threshold-scan-v0.1.md` and the approved Threshold Scan design.
- Produces: portable prose laws distinguishing threshold probe from traversal, positive frictionless boundary use, lawful route substitution, and the prior inaccessible-authority / temporary-field clarifications if not already present.

- [ ] **Step 1: Assert the current pattern has not already gained the new laws**

Run:

```bash
python - <<'PY'
from pathlib import Path
text = Path('patterns/field-traversal-and-illumination.md').read_text(encoding='utf-8')
for phrase in [
    'Scan the doors freely. Cross them deliberately.',
    'probing a threshold does not count as entering the room',
    'route substitution is lawful only when provenance preserves the authority relationship',
]:
    assert phrase.lower() not in text.lower(), f'already present: {phrase}'
print('new threshold laws not yet present')
PY
```

Expected: `new threshold laws not yet present`. If any phrase is already present because another approved change landed first, re-read the current file and make only the missing additions; do not duplicate prose.

- [ ] **Step 2: Add a focused subsection after traversal-as-epistemic-event**

Add this content, adapting only nearby heading numbering if required:

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

Add concise prose equivalent to:

```markdown
A projection may be unavailable even when the destination still exists through another authority-preserving route. An alternate route is lawful only when provenance establishes the relationship between the projection and the canonical source.

**Law:** route substitution is lawful only when provenance preserves the authority relationship.

**Law:** an inaccessible authoritative source does not transfer its authority to the nearest cache, summary, orientation page, or reconstruction.

> A locked door does not make the hallway the room.
```

Do not describe caches or summaries as fallback authorities.

- [ ] **Step 4: Clarify temporary field vs durable residue in bounded reconstruction**

Add one compact paragraph to the existing reconstruction section:

```markdown
A field of awareness may be temporary, and the observer need not remain continuously present. Durable residue can still survive as field snapshots, traversal receipts, evidence references, and unresolved frontier. A later reconstruction may use that residue, but it must not imply continuity of consciousness that was not actually preserved.
```

- [ ] **Step 5: Verify all required laws are present exactly once**

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

- [ ] **Step 6: Commit the portable law update**

```bash
git add patterns/field-traversal-and-illumination.md
git commit -m "docs: define threshold scan traversal law"
```

---

### Task 3: Add the compact Front Room instruction and navigation entry

**Files:**
- Modify: `README.md`
- Modify: `SUMMARY.md`

**Interfaces:**
- Consumes: portable laws from Task 2 and the specimen path from Task 1.
- Produces: a small orientation-level threshold instruction and one Evidence navigation entry; no new registry or expanded door inventory.

- [ ] **Step 1: Add one compact threshold-scan hint after the existing orientation hint or rule-of-entry block**

Add a short block equivalent to:

```markdown
{% hint style="info" %}
**Scan the doors freely. Cross them deliberately.**

When many nearby doors are cheap to probe, inspect only their boundary metadata first: destination, relation, reachability, provenance, and relevance. Do not load destination content until the current request makes a crossing relevant.

If a relevant projection is blocked, use another route only when its lineage to the authoritative source is explicit. Otherwise keep the destination fogged. A locked door does not make the hallway the room.
{% endhint %}
```

Do not add page ids, GitHub paths, URLs, a door registry table, or per-door fallback instructions to the Front Room.

- [ ] **Step 2: Preserve the existing six rule-of-entry steps and door inventory unchanged**

Run after editing:

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
print('Front Room original entry rules and seven doors preserved')
PY
```

Expected: `Front Room original entry rules and seven doors preserved`.

- [ ] **Step 3: Add the specimen to the Evidence section of `SUMMARY.md`**

Add exactly one entry after `Specimen Notes`:

```markdown
* [Front Room Threshold Scan v0.1](specimens/front-room-threshold-scan-v0.1.md)
```

Do not reorganize unrelated navigation.

- [ ] **Step 4: Verify navigation target exists and appears once**

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

### Task 4: Verify the complete documentation slice and prepare the implementation PR

**Files:**
- Verify only: `specimens/front-room-threshold-scan-v0.1.md`
- Verify only: `patterns/field-traversal-and-illumination.md`
- Verify only: `README.md`
- Verify only: `SUMMARY.md`

**Interfaces:**
- Consumes: Tasks 1–3.
- Produces: fresh repository/GitBook evidence for PR readiness; no landing mutation.

- [ ] **Step 1: Run repository whitespace and placeholder checks**

```bash
git diff --check main...HEAD
rg -n "TBD|TODO|<observed|<state>|<verified|<judgment" \
  specimens/front-room-threshold-scan-v0.1.md \
  patterns/field-traversal-and-illumination.md \
  README.md \
  SUMMARY.md && exit 1 || true
```

Expected: `git diff --check` exits 0; `rg` finds no plan placeholders in the implementation files.

- [ ] **Step 2: Verify the diff is limited to the intended four implementation files plus the approved spec/plan files already on the branch**

Run:

```bash
git diff --name-only main...HEAD
```

Expected implementation changes:

```text
README.md
SUMMARY.md
patterns/field-traversal-and-illumination.md
specimens/front-room-threshold-scan-v0.1.md
```

The branch may also contain the already-approved design and this implementation plan under `docs/superpowers/`. Any other changed file is scope expansion and must be removed or explicitly justified before review.

- [ ] **Step 3: Re-run a metadata-only GitBook verification after the final mutation**

Using GitBook metadata/listing operations only:

1. confirm the space is still Git-synced from `the-static-collective/What-is-the-static-collective-` `main`;
2. confirm current sync state is not reported as failed;
3. list page metadata and ensure the existing seven Front Room destination pages remain represented where they were represented before;
4. do not fetch destination body text as part of this verification.

If the branch is not yet merged, do not claim the new specimen is published in GitBook. Only verify source-side structure pre-merge.

- [ ] **Step 4: Complete the Riqor evidence run if one was started**

Run:

```bash
riqor run status --json
riqor run complete --json
```

Expected: no pending verification after the final mutation. If Riqor is unavailable, retain the limitation note and rely on the concrete checks above; do not fabricate Riqor evidence.

- [ ] **Step 5: Review the final diff line-by-line for minimality**

Run:

```bash
git diff --stat main...HEAD
git diff main...HEAD -- README.md SUMMARY.md patterns/field-traversal-and-illumination.md specimens/front-room-threshold-scan-v0.1.md
```

For every changed line, ask whether it is required by the approved Threshold Scan slice. Remove any unrelated wording cleanup, navigation reorganization, extra fallback mechanisms, or speculative future architecture.

- [ ] **Step 6: Push/update the implementation PR and invoke PR Completion readiness checks**

Push the feature branch normally. Keep the PR draft until the implementation diff and evidence are complete. PR Completion should then observe CI/review state and bring the exact head to verified readiness.

Do **not** merge, enable auto-merge, or enter a merge queue without fresh explicit approval for the current implementation head SHA.

- [ ] **Step 7: Post-merge GitBook confirmation after explicit landing approval**

Only after the implementation PR is actually merged:

1. confirm Git Sync reports a successful import containing the merged commit;
2. list GitBook pages and confirm `Front Room Threshold Scan v0.1` appears under the expected navigation structure;
3. verify the Front Room page still presents the same seven doors and the compact threshold-scan hint;
4. if the published projection cannot be verified through the available surface, report it as residual fog rather than claiming publication success.

---

## Self-Review Coverage

- Spec requirement: distinguish destination from transport — covered by Task 1 lineage fields and Task 2 route law.
- Spec requirement: probe != traversal — covered by Task 1 metadata-only procedure and Task 2 explicit law.
- Spec requirement: exploit frictionless parallelism only at boundaries — covered by Task 1 seven-door scan and Task 2 positive law.
- Spec requirement: lineage-preserving alternate routes — covered by Task 1 authority metadata and Task 2 route-substitution law.
- Spec requirement: scan receipt is not permission — specimen records `Admitted crossing` separately; no body reads occur in Task 1.
- Spec requirement: seven-door first proof only — Task 1 explicitly forbids recursion.
- Spec requirement: keep Front Room small — Task 3 adds one compact hint and does not change the door inventory.
- Spec requirement: no universal registry/crawler/warrant/resolver — enforced by Global Constraints and final minimality review.
- Spec requirement: GitBook remains Git-synced from GitHub source of truth — verified in Task 4.
- Prior Metta amendment: inaccessible authority and temporary field/durable residue — incorporated in Task 2 without inventing executable enforcement.
