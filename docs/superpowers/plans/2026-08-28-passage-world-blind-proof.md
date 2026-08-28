# PASSAGE-WORLD-001 Blind Cross-Stack Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the first blind cross-stack proof that ROAD-A and ROAD-B remain distinguishable when source surface, payload, route destination, and visible destination surface are held equal, while cosmetic identifier/serialization variants remain equivalent and counterfeit formation is refused.

**Architecture:** The neutral coordinator consumes only the frozen CASE, comparison policy, pinned owner-issued receipts, and synthetic destination receipts. It never imports participating runtimes. Owner receipts are generated in their own repositories and copied with exact commit/command/digest provenance. The coordinator validates cross-bindings and compares ALEX's owner-issued `formation_basis_digest`; ORACLE is opened only by the harness after the candidate result is sealed.

**Tech Stack:** Python 3 standard library, JSON, `unittest`, SHA-256.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- Gates A-E must be independently green before this plan begins.
- No hand-authored substitute may stand in for an owner receipt that a participating runtime is supposed to produce.
- The coordinator may compare receipts but may not reimplement LOADOUT, 3rdi, ALEX, or LOADIN.STEAD semantics.
- Candidate execution must not read `oracle/private-oracle.json`.
- `same endpoint != same passage`; `same route != same passage`; `same payload != same occurrence`.
- Raw UUID inequality alone cannot prove `PASSAGE_DISTINCT`.
- Unknown normalization semantics yield `REFUSE_POLICY_AMBIGUITY`, never guessed equivalence.
- `route != admit`; `admit != successful consequence`.
- REFUSED/HELD destination outcomes preserve prior crossing receipts and do not manufacture consequence.
- No authority transfer or side effect may occur because the proof is green.

---

## File Map

- Create: `specimens/passage-world-001/receipts/provenance.json`
- Create: `specimens/passage-world-001/receipts/ROAD-A/{loadout,3rdi,alex-formation,loadinstead}.json`
- Create: `specimens/passage-world-001/receipts/ROAD-B/{loadout,3rdi,alex-formation,loadinstead}.json`
- Create: `specimens/passage-world-001/controls/*.json`
- Create: `tools/passage_world_coordinator.py`
- Create: `tools/synthetic_passage_destination.py`
- Create: `tools/run_passage_world_blind.py`
- Create: `tests/test_passage_world_coordinator.py`
- Create: `tests/test_passage_world_blind.py`
- Create: `docs/passage-world-001-proof-receipt.md`

---

### Task 1: Pin real owner receipts before coordinator code

**Files:**
- Create receipt files and `receipts/provenance.json`
- Create: `tests/test_passage_world_blind.py`

**Interfaces:**
- Consumes exact outputs of Gates B-E.
- Produces immutable neutral evidence files plus byte-digest provenance.

- [ ] **Step 1: Export exact ROAD-A and ROAD-B owner outputs**

Each road must provide exactly one of:

```text
mortal_actor.loadout-binding/v0
mortal_actor.3rdi-handoff/v0
passage_world.alex-formation/v0
loadinstead.route-proposal/v0
```

Save the exact JSON values to the paths in the file map. Pretty-printing is allowed only if the exported JSON values are unchanged and the neutral byte digest is computed after that final formatting.

- [ ] **Step 2: Record concrete provenance**

Every `provenance.json` entry must contain:

```json
{
  "road_id": "ROAD-A",
  "owner": "the-static-collective/ALEX.2",
  "kind": "alex-formation",
  "source_commit": "0123456789abcdef0123456789abcdef01234567",
  "source_path_or_command": "python3 -m unittest tests.test_passage_formation -v",
  "receipt_file": "receipts/ROAD-A/alex-formation.json",
  "sha256": "sha256:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
}
```

The values shown above are schema examples only. The implementation must replace the example entry with the exact 40-hex Git commit and exact computed 64-hex file digest before commit; tests below reject these example constants.

- [ ] **Step 3: Write integrity tests that reject example/fake provenance**

Require:

```python
SHA40 = re.compile(r"^[0-9a-f]{40}$")
SHA256 = re.compile(r"^sha256:[0-9a-f]{64}$")
EXAMPLE_COMMIT = "0123456789abcdef0123456789abcdef01234567"
EXAMPLE_DIGEST = "sha256:" + "a" * 64

self.assertRegex(entry["source_commit"], SHA40)
self.assertRegex(entry["sha256"], SHA256)
self.assertNotEqual(entry["source_commit"], EXAMPLE_COMMIT)
self.assertNotEqual(entry["sha256"], EXAMPLE_DIGEST)
```

Recompute each receipt file SHA-256 and require exact equality with provenance.

- [ ] **Step 4: Run evidence RED**

```bash
python3 -m unittest tests.test_passage_world_blind -v
```

Expected: FAIL until all real owner receipts and provenance entries exist.

- [ ] **Step 5: Commit pinned evidence**

```bash
git add specimens/passage-world-001/receipts tests/test_passage_world_blind.py
git commit -m "test: pin PASSAGE-WORLD owner receipts"
```

---

### Task 2: Add the synthetic destination gate

**Files:**
- Create: `tools/synthetic_passage_destination.py`
- Create/Modify: `tests/test_passage_world_coordinator.py`

**Interfaces:**

```python
def evaluate_destination(*, route_proposal: dict, disposition: str, surface_id: str = "R1") -> dict:
    ...
```

- [ ] **Step 1: Write failing tests for `ADMITTED`, `REFUSED`, and `HELD`**

Only `ROUTED` proposals with exactly one delivery envelope are valid inputs. `AMBIGUOUS` or `UNROUTABLE` proposals raise `ValueError("destination requires one routed delivery")`.

- [ ] **Step 2: Run RED**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
```

Expected: FAIL because `synthetic_passage_destination` does not exist.

- [ ] **Step 3: Implement the exact fixture receipt**

```python
return {
    "schema": "passage_world.synthetic-destination/v0",
    "route_id": route_proposal["route_id"],
    "door_id": route_proposal["primary_door_ref"],
    "payload_ref": route_proposal["delivery_envelopes"][0]["payload_ref"],
    "formation_ref": route_proposal["delivery_envelopes"][0]["formation_ref"],
    "surface_id": surface_id,
    "disposition": disposition,
    "consequence_occurred": False,
    "authority_transferred": False,
}
```

- [ ] **Step 4: Run GREEN and commit**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
git add tools/synthetic_passage_destination.py tests/test_passage_world_coordinator.py
git commit -m "feat: add synthetic passage destination gate"
```

---

### Task 3: Freeze coordinator result and cross-binding failures in RED

**Files:**
- Create: `tools/passage_world_coordinator.py`
- Modify: `tests/test_passage_world_coordinator.py`

**Interfaces:**

```python
def compare_passages(*, case: dict, policy: dict, left: dict, right: dict) -> dict:
    ...
```

Allowed dispositions:

```text
PASSAGE_EQUIVALENT
PASSAGE_DISTINCT
CONTENT_DIFFERENCE
REFUSE_MISSING_RECEIPT
REFUSE_UNATTRIBUTED_FORMATION
REFUSE_OWNER_MISMATCH
REFUSE_POLICY_AMBIGUITY
```

- [ ] **Step 1: Write missing-receipt tests**

Removing any LOADOUT, 3rdi, ALEX formation, LOADIN.STEAD, or destination receipt must yield `REFUSE_MISSING_RECEIPT`.

- [ ] **Step 2: Write exact cross-binding tests**

Each side must satisfy:

```text
LOADOUT.projection_ref == 3rdi.projection_digest
ALEX.formation_basis.projection_digest == 3rdi.projection_digest
ALEX.formation_basis evaluation compile identity == LOADOUT evaluation compile identity
ALEX.formation_id == LOADIN delivery_envelope.formation_ref
ALEX.payload_ref == LOADIN delivery_envelope.payload_ref
LOADIN.route_id == destination.route_id
LOADIN.primary_door_ref == destination.door_id
LOADIN delivery payload_ref/formation_ref == destination payload_ref/formation_ref
```

Any mismatch returns `REFUSE_OWNER_MISMATCH` before formation comparison.

- [ ] **Step 3: Write counterfeit formation test**

Change a caller/narrative `formation_ref` without a matching ALEX owner receipt. Expect `REFUSE_UNATTRIBUTED_FORMATION` or the earlier exact owner mismatch; never `PASSAGE_DISTINCT`.

- [ ] **Step 4: Run RED and commit tests**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
```

Expected: FAIL because coordinator implementation is absent.

```bash
git add tests/test_passage_world_coordinator.py
git commit -m "test: freeze blind passage coordinator"
```

---

### Task 4: Implement the weak comparator

**Files:**
- Modify: `tools/passage_world_coordinator.py`
- Test: `tests/test_passage_world_coordinator.py`

- [ ] **Step 1: Validate the frozen policy**

Accept only `passage_world.comparison-policy/v0` and its declared ignored/exact fields. Any unknown normalization rule returns `REFUSE_POLICY_AMBIGUITY`.

- [ ] **Step 2: Compare neutral axes before formation**

```python
if left_payload != right_payload:
    return result("CONTENT_DIFFERENCE")
if left_source != right_source or left_surface != right_surface or left_door != right_door:
    return result("REFUSE_POLICY_AMBIGUITY")
```

The v0 experiment is valid only while source/destination axes remain fixed.

- [ ] **Step 3: Compare owner-issued substantive formation only after cross-binding passes**

```python
left_basis = left["alex_formation"]["formation_basis_digest"]
right_basis = right["alex_formation"]["formation_basis_digest"]
disposition = "PASSAGE_EQUIVALENT" if left_basis == right_basis else "PASSAGE_DISTINCT"
```

Do not compare raw `formation_id`, `result_occurrence_id`, `bit_id`, `route_id`, or harness nonce to decide passage identity.

- [ ] **Step 4: Preserve audit refs**

Return both formation basis digests plus sorted receipt survivor identifiers/digests; do not copy hidden evidence bodies.

- [ ] **Step 5: Verify and commit**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
git add tools/passage_world_coordinator.py tests/test_passage_world_coordinator.py
git commit -m "feat: compare passage formation receipts"
```

---

### Task 5: Add metamorphic controls without expected verdicts in CASE

**Files:**
- Create: `specimens/passage-world-001/controls/*.json`
- Modify: `tests/test_passage_world_coordinator.py`

- [ ] **Step 1: Create control transformations**

Create CASE-only fixtures for:

```text
serialization-noise
identifier-noise
unrelated-distractor
route-registry-order
narrative-annotation-noise
payload-mutation
counterfeit-formation
```

No control file may contain keys `expected`, `verdict`, `expected_verdict`, or ORACLE content.

- [ ] **Step 2: Normalize only owner-declared noise**

Identifier-noise changes only fields explicitly designated non-semantic by the owner contract/policy. An uncertain field must produce policy ambiguity rather than automatic equivalence.

- [ ] **Step 3: Run controls and commit**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
git add specimens/passage-world-001/controls tests/test_passage_world_coordinator.py
git commit -m "test: add passage metamorphic controls"
```

---

### Task 6: Run CASE blind, seal candidate, then open ORACLE

**Files:**
- Create: `tools/run_passage_world_blind.py`
- Modify: `tests/test_passage_world_blind.py`

**Interfaces:**
- Consumes CASE, policy, door registry, pinned owner receipts.
- Produces candidate result + candidate SHA-256 before ORACLE comparison.

- [ ] **Step 1: Implement a CASE-only runner**

The runner loads `case/` plus `receipts/`; it contains no path to `oracle/private-oracle.json`.

- [ ] **Step 2: Write oracle-open guard**

Patch file opening in the blind test so any path containing `/oracle/` raises `AssertionError("oracle opened during candidate run")`. Candidate execution must still finish.

- [ ] **Step 3: Seal candidate digest**

```python
encoded = json.dumps(result, sort_keys=True, separators=(",", ":"), allow_nan=False).encode()
candidate_digest = "sha256:" + hashlib.sha256(encoded).hexdigest()
```

- [ ] **Step 4: Open ORACLE only in the harness**

After `candidate_digest` exists, the test harness reads the ORACLE and compares primary/control dispositions. The coordinator and candidate runner never receive expected values.

- [ ] **Step 5: Verify and commit**

```bash
python3 tools/run_passage_world_blind.py --check
python3 -m unittest tests.test_passage_world_blind -v
git add tools/run_passage_world_blind.py tests/test_passage_world_blind.py
git commit -m "test: blind PASSAGE-WORLD coordinator"
```

---

### Task 7: Prove REFUSED and HELD crossings survive

**Files:**
- Modify: `tests/test_passage_world_coordinator.py`
- Modify: `tests/test_passage_world_blind.py`

- [ ] **Step 1: Generate destination receipts for both dispositions**

For `REFUSED` and `HELD`, require exact route/payload/formation cross-binding plus:

```python
self.assertFalse(receipt["consequence_occurred"])
self.assertFalse(receipt["authority_transferred"])
```

- [ ] **Step 2: Compare ROAD-A/B under each destination disposition**

Expected candidate disposition remains `PASSAGE_DISTINCT`; refusal/hold may change destination disposition but must not erase pre-gate formation ancestry.

- [ ] **Step 3: Run full neutral proof floor**

```bash
python3 -m unittest tests.test_passage_world_vector -v
python3 -m unittest tests.test_passage_world_coordinator -v
python3 -m unittest tests.test_passage_world_blind -v
python3 tools/verify_passage_world_vector.py specimens/passage-world-001
python3 tools/run_passage_world_blind.py --check
```

All commands must exit `0`.

- [ ] **Step 4: Commit**

```bash
git add tests/test_passage_world_coordinator.py tests/test_passage_world_blind.py
git commit -m "test: preserve refused passage ancestry"
```

---

### Task 8: Write the bounded proof receipt

**Files:**
- Create: `docs/passage-world-001-proof-receipt.md`

- [ ] **Step 1: Record exact evidence**

Include concrete neutral/owner commit SHAs, receipt file SHA-256 values, candidate result digest, test commands/results, payload equality, route equality, destination surface equality, formation-basis inequality, cosmetic-equivalence controls, counterfeit refusal, and REFUSED/HELD results.

- [ ] **Step 2: State the conclusion exactly**

> The tested stack preserves materially different attributable crossing ancestry even when endpoint, payload, route destination, and visible destination surface coincide.

Also state:

```text
PASSAGE-WORLD-001 != universal relation ontology
PASSAGE-WORLD-001 != proof every edge is a world
PASSAGE-WORLD-001 != authority service
```

- [ ] **Step 3: Commit**

```bash
git add docs/passage-world-001-proof-receipt.md
git commit -m "docs: receipt PASSAGE-WORLD-001 blind proof"
```

## Completion Gate

The blind proof is complete only when candidate execution cannot access ORACLE, real owner-issued receipts cross-bind exactly, primary ROAD-A/B returns `PASSAGE_DISTINCT`, serialization and owner-declared ID noise return equivalence, counterfeit formation is refused, and REFUSED/HELD destinations preserve ancestry without creating consequence.