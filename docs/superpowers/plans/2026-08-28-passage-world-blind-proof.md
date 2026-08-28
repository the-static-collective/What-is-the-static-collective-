# PASSAGE-WORLD-001 Blind Cross-Stack Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Execute the first blind cross-stack proof that ROAD-A and ROAD-B remain distinguishable when source surface, payload, route destination, and visible destination surface are held equal, while cosmetic identifier/serialization variants remain equivalent and counterfeit formation is refused.

**Architecture:** The neutral coordinator consumes only the frozen CASE, comparison policy, pinned owner-issued receipts, and synthetic destination receipts. It never imports participating runtimes. Each owner receipt is generated in its own repository, copied into the neutral evidence packet with exact source commit/command/digest provenance, and then treated as immutable input. The coordinator validates cross-bindings and compares ALEX's owner-issued `formation_basis_digest`; ORACLE remains harness-only and is opened only after the candidate result is sealed.

**Tech Stack:** Python 3 standard library, JSON, `unittest`, SHA-256.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Prerequisites

Gates A-E must be independently green:

1. neutral hostile vector frozen;
2. LOADOUT/MORTAL compile testimony for both roads;
3. 3rdi projection testimony for both roads;
4. ALEX `passage_world.alex-formation/v0` receipts for both roads;
5. LOADIN.STEAD route proposals for both roads.

The blind proof must not begin from hand-authored fake owner receipts when an owner runtime is supposed to produce them.

## File Map

- Create: `specimens/passage-world-001/receipts/provenance.json`
- Create: `specimens/passage-world-001/receipts/ROAD-A/loadout.json`
- Create: `specimens/passage-world-001/receipts/ROAD-A/3rdi.json`
- Create: `specimens/passage-world-001/receipts/ROAD-A/alex-formation.json`
- Create: `specimens/passage-world-001/receipts/ROAD-A/loadinstead.json`
- Create: `specimens/passage-world-001/receipts/ROAD-B/loadout.json`
- Create: `specimens/passage-world-001/receipts/ROAD-B/3rdi.json`
- Create: `specimens/passage-world-001/receipts/ROAD-B/alex-formation.json`
- Create: `specimens/passage-world-001/receipts/ROAD-B/loadinstead.json`
- Create: `specimens/passage-world-001/controls/*.json`
- Create: `tools/passage_world_coordinator.py`
- Create: `tools/synthetic_passage_destination.py`
- Create: `tools/run_passage_world_blind.py`
- Create: `tests/test_passage_world_coordinator.py`
- Create: `tests/test_passage_world_blind.py`
- Create: `docs/passage-world-001-proof-receipt.md`

---

### Task 1: Pin real owner receipts before coordinator implementation

**Files:**
- Create receipt files and `receipts/provenance.json`
- Create: `tests/test_passage_world_blind.py`

- [ ] **Step 1: Export exact ROAD-A owner receipts**

From the green owner branches, save the exact JSON outputs for:

```text
mortal_actor.loadout-binding/v0
mortal_actor.3rdi-handoff/v0
passage_world.alex-formation/v0
loadinstead.route-proposal/v0
```

Do the same for ROAD-B.

Do not edit those JSON files after export except canonical pretty-printing that provably preserves JSON values.

- [ ] **Step 2: Create provenance entries**

For every copied receipt record:

```json
{
  "road_id": "ROAD-A",
  "owner": "the-static-collective/ALEX.2",
  "kind": "alex-formation",
  "source_commit": "<40 hex commit>",
  "source_path_or_command": "python3 ...",
  "receipt_file": "receipts/ROAD-A/alex-formation.json",
  "sha256": "sha256:<64 hex>"
}
```

The `sha256` is over exact file bytes in the neutral repo.

- [ ] **Step 3: Write integrity tests**

Require every receipt file to have exactly one provenance entry, source commit to match `[0-9a-f]{40}`, and recomputed file SHA-256 to match the manifest.

- [ ] **Step 4: Write schema-family tests**

Require ROAD-A and ROAD-B each contain exactly one receipt of each required schema family. The test may inspect schema/version strings but not the ORACLE.

- [ ] **Step 5: Run RED/integrity gate**

```bash
python3 -m unittest tests.test_passage_world_blind -v
```

Expected: FAIL until all real owner receipts are present. Do not generate stand-ins inside the neutral repo.

- [ ] **Step 6: Commit the pinned evidence packet**

```bash
git add specimens/passage-world-001/receipts tests/test_passage_world_blind.py
git commit -m "test: pin PASSAGE-WORLD owner receipts"
```

---

### Task 2: Add the synthetic destination gate and surface witness

**Files:**
- Create: `tools/synthetic_passage_destination.py`
- Modify: `tests/test_passage_world_coordinator.py`

**Interfaces:**

```python
def evaluate_destination(
    *,
    route_proposal: dict,
    disposition: str,
    surface_id: str = "R1",
) -> dict:
    ...
```

- [ ] **Step 1: Write RED tests for three local dispositions**

Allowed dispositions:

```text
ADMITTED
REFUSED
HELD
```

Require a `ROUTED` proposal with exactly one delivery envelope. Any `AMBIGUOUS` or `UNROUTABLE` proposal must be rejected as invalid gate input.

- [ ] **Step 2: Emit a fixture-only receipt**

Return:

```python
{
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

Even `ADMITTED` does not claim downstream success in this proof.

- [ ] **Step 3: Verify and commit**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
git add tools/synthetic_passage_destination.py tests/test_passage_world_coordinator.py
git commit -m "feat: add synthetic passage destination gate"
```

---

### Task 3: Freeze coordinator dispositions and cross-binding checks in RED

**Files:**
- Create: `tools/passage_world_coordinator.py`
- Create/Modify: `tests/test_passage_world_coordinator.py`

**Interfaces:**

```python
def compare_passages(
    *,
    case: dict,
    policy: dict,
    left: dict,
    right: dict,
) -> dict:
    ...
```

`left` and `right` are assembled views containing exact owner receipts plus destination receipt; they are not a new persistent schema outside the test harness.

- [ ] **Step 1: Write RED result-shape tests**

Result:

```python
{
    "schema": "passage_world.coordinator-result/v0",
    "case_id": "...",
    "disposition": "PASSAGE_EQUIVALENT | PASSAGE_DISTINCT | CONTENT_DIFFERENCE | REFUSE_MISSING_RECEIPT | REFUSE_UNATTRIBUTED_FORMATION | REFUSE_OWNER_MISMATCH | REFUSE_POLICY_AMBIGUITY",
    "reason_code": None,
    "matched_surface": True,
    "matched_payload": True,
    "matched_route_destination": True,
    "left_formation_basis_digest": "sha256:...",
    "right_formation_basis_digest": "sha256:...",
    "receipt_survivors": []
}
```

- [ ] **Step 2: Require all owner receipts**

Missing any LOADOUT, 3rdi, ALEX formation, LOADIN.STEAD, or destination receipt yields `REFUSE_MISSING_RECEIPT`.

- [ ] **Step 3: Write exact cross-binding tests**

For each side require:

```text
LOADOUT projection_ref == 3rdi projection_digest
ALEX formation_basis.projection_digest == 3rdi projection_digest
ALEX formation_basis evaluation compile ID/digest == LOADOUT evaluation compile ID/digest
ALEX formation_id == LOADIN.STEAD delivery formation_ref
ALEX payload_ref == LOADIN.STEAD delivery payload_ref
LOADIN.STEAD route_id == destination route_id
LOADIN.STEAD primary_door_ref == destination door_id
LOADIN.STEAD delivery payload_ref == destination payload_ref
LOADIN.STEAD delivery formation_ref == destination formation_ref
```

Any owner mismatch yields `REFUSE_OWNER_MISMATCH`, never `PASSAGE_DISTINCT`.

- [ ] **Step 4: Write counterfeit formation test**

Modify only a narrative annotation or caller-supplied fake `formation_ref` without changing the owner ALEX formation receipt. Expect `REFUSE_UNATTRIBUTED_FORMATION` or `REFUSE_OWNER_MISMATCH` at the earliest exact mismatch; do not allow prose to create ancestry.

- [ ] **Step 5: Run RED and commit tests**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
```

Expected: FAIL until coordinator behavior is implemented.

```bash
git add tests/test_passage_world_coordinator.py
git commit -m "test: freeze blind passage coordinator"
```

---

### Task 4: Implement the weak comparator

**Files:**
- Modify: `tools/passage_world_coordinator.py`
- Test: `tests/test_passage_world_coordinator.py`

- [ ] **Step 1: Validate policy conservatively**

Accept only the frozen `passage_world.comparison-policy/v0`. Unknown normalization instructions return `REFUSE_POLICY_AMBIGUITY`.

Do not create a generic equivalence algebra.

- [ ] **Step 2: Compare neutral surfaces before formation**

If `payload_ref` differs, return `CONTENT_DIFFERENCE`.

If source surface, destination surface, or destination door differs, return `REFUSE_POLICY_AMBIGUITY` for the v0 experiment because the hostile question no longer holds those axes constant.

- [ ] **Step 3: Compare owner-issued substantive formation**

After all cross-bindings pass:

```python
if left_formation["formation_basis_digest"] == right_formation["formation_basis_digest"]:
    disposition = "PASSAGE_EQUIVALENT"
else:
    disposition = "PASSAGE_DISTINCT"
```

This is safe only because ALEX's formation plan separately proves the basis digest excludes occurrence ID/harness noise and changes for substantive lawful formation ancestry.

- [ ] **Step 4: Preserve receipt survivors**

Return exact schema/digest/ID refs sufficient to audit both roads. Do not copy hidden evidence bodies.

- [ ] **Step 5: Verify focused controls**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
```

Expected: PASS for direct ROAD-A/B, serialization-noise, ID-noise, counterfeit, route coincidence, endpoint coincidence, and payload mutation controls.

- [ ] **Step 6: Commit**

```bash
git add tools/passage_world_coordinator.py tests/test_passage_world_coordinator.py
git commit -m "feat: compare passage formation receipts"
```

---

### Task 5: Add metamorphic controls without teaching the coordinator the answer

**Files:**
- Create: `specimens/passage-world-001/controls/*.json`
- Modify: `tests/test_passage_world_coordinator.py`

- [ ] **Step 1: Build controls from CASE and owner receipts only**

Create explicit fixture transformations for:

```text
serialization-noise
identifier-noise
unrelated-distractor
route-registry-order
narrative-annotation-noise
payload-mutation
counterfeit-formation
```

No control file contains `expected`, `verdict`, or ORACLE fields.

- [ ] **Step 2: Normalize only policy-declared noise**

For identifier-noise, mutate only fields explicitly declared non-semantic by their owner receipt/test contract. If a field's semantics are uncertain, the control must yield `REFUSE_POLICY_AMBIGUITY`, not equivalence.

- [ ] **Step 3: Verify and commit**

```bash
python3 -m unittest tests.test_passage_world_coordinator -v
git add specimens/passage-world-001/controls tests/test_passage_world_coordinator.py
git commit -m "test: add passage metamorphic controls"
```

---

### Task 6: Run the blind CASE before opening ORACLE

**Files:**
- Create: `tools/run_passage_world_blind.py`
- Modify: `tests/test_passage_world_blind.py`

- [ ] **Step 1: Implement CASE-only runner**

The runner loads:

```text
case/world.json
case/comparison-policy.json
case/door-registry.json
pinned owner receipts
```

It must not import or open `oracle/private-oracle.json`.

Write candidate results to stdout or a temporary in-memory object only; do not rewrite CASE.

- [ ] **Step 2: Add an oracle-open guard test**

Patch `Path.read_text`/`open` in the blind runner test so any path containing `/oracle/` raises. The candidate run must still complete.

- [ ] **Step 3: Seal candidate result digest**

Compute:

```python
candidate_digest = "sha256:" + hashlib.sha256(canonical_json(result).encode()).hexdigest()
```

Only after this value exists may the harness read ORACLE.

- [ ] **Step 4: Compare sealed candidate outputs with ORACLE in the test harness**

The test harness, not coordinator, checks all frozen control cases. The candidate implementation never receives expected dispositions.

- [ ] **Step 5: Verify**

```bash
python3 tools/run_passage_world_blind.py --check
python3 -m unittest tests.test_passage_world_blind -v
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tools/run_passage_world_blind.py tests/test_passage_world_blind.py
git commit -m "test: blind PASSAGE-WORLD coordinator"
```

---

### Task 7: Prove REFUSED and HELD crossings survive without consequence

**Files:**
- Modify: `tests/test_passage_world_coordinator.py`
- Modify: `tests/test_passage_world_blind.py`

- [ ] **Step 1: Generate destination receipts from the same routed road**

For both `REFUSED` and `HELD`, require exact route/payload/formation cross-binding, `consequence_occurred == false`, and `authority_transferred == false`.

- [ ] **Step 2: Compare ROAD-A/ROAD-B under each disposition**

The passage disposition must remain `PASSAGE_DISTINCT` because destination refusal/hold does not erase pre-gate formation ancestry.

- [ ] **Step 3: Verify no consequence impersonation**

No neutral result may claim a world transition happened merely because the crossing reached a destination gate.

- [ ] **Step 4: Run full neutral proof floor**

```bash
python3 -m unittest tests.test_passage_world_vector -v
python3 -m unittest tests.test_passage_world_coordinator -v
python3 -m unittest tests.test_passage_world_blind -v
python3 tools/verify_passage_world_vector.py specimens/passage-world-001
python3 tools/run_passage_world_blind.py --check
```

All commands must exit `0`.

- [ ] **Step 5: Commit**

```bash
git add tests/test_passage_world_coordinator.py tests/test_passage_world_blind.py
git commit -m "test: preserve refused passage ancestry"
```

---

### Task 8: Write the proof receipt without promoting a master ontology

**Files:**
- Create: `docs/passage-world-001-proof-receipt.md`

- [ ] **Step 1: Record exact evidence**

Include:

```text
neutral vector commit
owner repo/commit for each receipt
receipt SHA-256 values
candidate result digest
all commands and exit results
ROAD-A/ROAD-B payload equality
route destination equality
destination surface equality
formation basis digest inequality
serialization/ID noise equivalence controls
counterfeit refusal
REFUSED/HELD survival results
```

- [ ] **Step 2: State the bounded conclusion exactly**

Use:

> The tested stack preserves materially different attributable crossing ancestry even when endpoint, payload, route destination, and visible destination surface coincide.

Then state explicitly:

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

Gate F/G is complete only when the candidate runner cannot access ORACLE, real owner-issued receipts cross-bind exactly, ROAD-A/B return `PASSAGE_DISTINCT`, cosmetic controls return equivalence, counterfeit formation is refused, and refused/held destination outcomes preserve ancestry without creating consequence.