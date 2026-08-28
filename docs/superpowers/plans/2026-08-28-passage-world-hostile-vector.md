# PASSAGE-WORLD-001 Hostile Vector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Freeze `TWO ROADS / ONE DOOR` as a neutral CASE/ORACLE test vector before any participating runtime is adapted, so the stack cannot learn the expected passage verdict from the fixture it executes.

**Architecture:** The neutral Static Collective repository owns only the synthetic CASE, comparison policy, sealed ORACLE, schemas, and a structural verifier. Owner semantics stay in LOADOUT, 3rdi, ALEX, LOADIN.STEAD, and the synthetic destination gate. The CASE fixes source room `R0`, destination room `R1`, payload `{kind:"token", value:"022100"}`, and two lawful roads whose endpoint/payload/surface are equal while their interior receipt ancestry differs.

**Tech Stack:** JSON, JSON Schema draft 2020-12, Python 3 standard library, `unittest`.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- `same payload != same occurrence`.
- `same endpoint != same passage`.
- `same route != same passage`.
- `serialization != causality`.
- CASE contains no expected verdict or oracle-only labels.
- Raw UUID inequality is not passage evidence.
- The neutral repository must not implement LOADOUT, 3rdi, ALEX, or LOADIN.STEAD semantics.
- Every owner receipt is referenced by provenance manifest; copied fixture receipts are immutable evidence, not a shared runtime.
- Destination admission remains synthetic and local to this proof.

---

## File Map

- Create: `specimens/passage-world-001/README.md`
- Create: `specimens/passage-world-001/manifest.json`
- Create: `specimens/passage-world-001/case/world.json`
- Create: `specimens/passage-world-001/case/comparison-policy.json`
- Create: `specimens/passage-world-001/case/door-registry.json`
- Create: `specimens/passage-world-001/oracle/private-oracle.json`
- Create: `specimens/passage-world-001/schema/manifest.schema.json`
- Create: `specimens/passage-world-001/schema/policy.schema.json`
- Create: `tools/verify_passage_world_vector.py`
- Create: `tests/test_passage_world_vector.py`

---

### Task 1: Freeze CASE/ORACLE separation in RED

**Files:**
- Create: `tests/test_passage_world_vector.py`
- Create: `specimens/passage-world-001/schema/manifest.schema.json`
- Create: `specimens/passage-world-001/schema/policy.schema.json`

- [ ] **Step 1: Write failing path and shape tests**

Use:

```python
ROOT = Path(__file__).resolve().parents[1]
VECTOR = ROOT / "specimens" / "passage-world-001"
MANIFEST = VECTOR / "manifest.json"
WORLD = VECTOR / "case" / "world.json"
POLICY = VECTOR / "case" / "comparison-policy.json"
DOORS = VECTOR / "case" / "door-registry.json"
ORACLE = VECTOR / "oracle" / "private-oracle.json"
```

Require all five files to exist, with `WORLD`, `POLICY`, and `DOORS` below `case/`, while `ORACLE.parent.name == "oracle"`.

Require manifest top-level keys exactly:

```text
schema
vector_id
world_ref
policy_ref
door_registry_ref
oracle_ref
roads
receipt_slots
```

and values:

```text
schema = passage_world.vector-manifest/v0
vector_id = TWO-ROADS-ONE-DOOR-001
world_ref = case/world.json
policy_ref = case/comparison-policy.json
door_registry_ref = case/door-registry.json
oracle_ref = oracle/private-oracle.json
```

- [ ] **Step 2: Run RED**

```bash
python3 -m unittest tests.test_passage_world_vector -v
```

Expected: FAIL because vector payloads do not exist.

- [ ] **Step 3: Define strict schemas**

`manifest.schema.json` must reject additional properties and require road IDs `ROAD-A` and `ROAD-B`.

Each road declares only stable neutral coordinates:

```json
{
  "road_id": "ROAD-A",
  "source_surface": "R0",
  "destination_surface": "R1",
  "payload_ref": "payload:022100",
  "receipt_slot_ids": ["loadout:A", "3rdi:A", "alex:A", "loadinstead:A", "gate:A"]
}
```

`policy.schema.json` requires `schema`, `policy_id`, `ignored_fields`, `exact_fields`, and `conservative_on_unknown`.

- [ ] **Step 4: Commit the RED contract**

```bash
git add tests/test_passage_world_vector.py specimens/passage-world-001/schema
git commit -m "test: freeze PASSAGE-WORLD vector contract"
```

---

### Task 2: Freeze the boring world and comparison policy

**Files:**
- Create: `specimens/passage-world-001/case/world.json`
- Create: `specimens/passage-world-001/case/comparison-policy.json`
- Create: `specimens/passage-world-001/case/door-registry.json`
- Create: `specimens/passage-world-001/manifest.json`
- Modify: `tests/test_passage_world_vector.py`

- [ ] **Step 1: Create the world CASE**

Use exactly:

```json
{
  "schema": "passage_world.synthetic-world/v0",
  "world_id": "two-roads-one-door",
  "source_surface": "R0",
  "destination_surface": "R1",
  "payloads": [{"id":"payload:022100","kind":"token","value":"022100"}],
  "destination_projection": {"surface_id":"R1","render":"ROOM-R1"}
}
```

Do not encode `PASSAGE_DISTINCT`, `equivalent`, `different road`, or any expected conclusion.

- [ ] **Step 2: Create the comparison policy**

Use:

```json
{
  "schema": "passage_world.comparison-policy/v0",
  "policy_id": "PW-POLICY-001",
  "ignored_fields": [
    "harness_nonce",
    "test_case_id",
    "transport_wrapper_id",
    "json_member_order"
  ],
  "exact_fields": [
    "source_surface",
    "destination_surface",
    "payload_ref"
  ],
  "conservative_on_unknown": true
}
```

The verifier must treat `transport_wrapper_id` as ignorable only when the corresponding owner receipt explicitly marks it non-semantic. Otherwise return policy ambiguity later; do not strip it automatically.

- [ ] **Step 3: Create one declared destination door**

`door-registry.json` contains exactly one available destination door for consequence class `passage-token`, owner world `synthetic:R1`, protocol `fixture-only`, and no witness door. This guarantees both roads can lawfully route to the same destination without router tie-breaking.

- [ ] **Step 4: Add anti-oracle tests**

Recursively scan every JSON value under `case/` and reject these strings:

```text
PASSAGE_DISTINCT
PASSAGE_EQUIVALENT
REFUSE_UNATTRIBUTED_FORMATION
expected_verdict
oracle
```

Exception: `manifest.oracle_ref` may contain the path string `oracle/private-oracle.json`; no oracle content may be embedded.

- [ ] **Step 5: Verify and commit**

```bash
python3 -m unittest tests.test_passage_world_vector -v
git add specimens/passage-world-001/case specimens/passage-world-001/manifest.json tests/test_passage_world_vector.py
git commit -m "test: freeze two-roads one-door CASE"
```

Expected: failures remain only for the missing private oracle and verifier.

---

### Task 3: Seal the private oracle and control family

**Files:**
- Create: `specimens/passage-world-001/oracle/private-oracle.json`
- Modify: `tests/test_passage_world_vector.py`

- [ ] **Step 1: Encode pair outcomes only in ORACLE**

Use `schema = passage_world.private-oracle/v0` and these cases:

```text
PW-DIRECT-A-B             -> PASSAGE_DISTINCT
PW-SERIALIZATION-NOISE    -> PASSAGE_EQUIVALENT
PW-ID-NOISE               -> PASSAGE_EQUIVALENT
PW-COUNTERFEIT-FORMATION  -> REFUSE_UNATTRIBUTED_FORMATION
PW-ROUTE-COINCIDENCE      -> PASSAGE_DISTINCT
PW-ENDPOINT-COINCIDENCE   -> PASSAGE_DISTINCT
PW-PAYLOAD-MUTATION       -> CONTENT_DIFFERENCE
PW-DESTINATION-REFUSED    -> PASSAGE_DISTINCT
PW-DESTINATION-HELD       -> PASSAGE_DISTINCT
```

For the refused/held cases, also require `consequence_occurred == false` and `passage_receipts_survive == true`.

- [ ] **Step 2: Prove UUID noise is not sufficient**

The ORACLE's `PW-ID-NOISE` case must use fresh `bit_id`, `route_id`, harness nonce, and wrapper identity while referring to an owner-normalized receipt graph declared equivalent. This is the positive control against `different ID => different passage`.

- [ ] **Step 3: Commit**

```bash
git add specimens/passage-world-001/oracle tests/test_passage_world_vector.py
git commit -m "test: seal PASSAGE-WORLD oracle"
```

---

### Task 4: Add structural verifier without passage semantics

**Files:**
- Create: `tools/verify_passage_world_vector.py`
- Modify: `tests/test_passage_world_vector.py`

**Interfaces:**

```python
def load_vector(root: Path) -> dict: ...
def validate_vector(vector: dict) -> list[str]: ...
```

- [ ] **Step 1: Write RED mutation tests**

Require stable reason codes:

```text
ORACLE_LEAK
ROAD_MISSING
ROAD_SURFACE_MISMATCH
PAYLOAD_MISMATCH
POLICY_INVALID
DOOR_REGISTRY_INVALID
RECEIPT_SLOT_DUPLICATE
```

- [ ] **Step 2: Implement only cross-file structural checks**

The verifier may compare references and exact neutral fields. It must not inspect what a projection means, decide evidence support, or run routing logic.

- [ ] **Step 3: Verify**

```bash
python3 -m unittest tests.test_passage_world_vector -v
python3 tools/verify_passage_world_vector.py specimens/passage-world-001
```

Expected: both exit `0`.

- [ ] **Step 4: Document and commit**

`README.md` states: **the vector is frozen before owner adapters execute; green structure is not PASSAGE-WORLD conformance.**

```bash
git add tools/verify_passage_world_vector.py tests/test_passage_world_vector.py specimens/passage-world-001/README.md
git commit -m "feat: verify PASSAGE-WORLD hostile vector"
```

## Completion Gate

The hostile vector is complete when CASE/ORACLE are physically separate, the boring endpoints/payload/surface are frozen, the comparison policy explicitly names only irrelevant noise, and no owner semantics have been copied into the neutral verifier.