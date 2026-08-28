# PASSAGE-WORLD-001 LOADIN.STEAD Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the existing LOADIN.STEAD router can send two same-payload occurrences with different ALEX formation refs to the same destination while preserving each formation ref and refusing to collapse routing into admission.

**Architecture:** Reuse ALEX PR #23's `loadout_runtime.loadinstead.route_bit()` unchanged if possible. PASSAGE-WORLD supplies two valid `ecode.route-bit/v0` records with identical `payload_ref`, `source_world`, `consequence_class`, compile authority class, and destination registry, but distinct `formation_ref`. The router should return the same `primary_door_ref` while each route proposal and delivery envelope retains its own formation testimony.

**Tech Stack:** Python 3 standard library, existing `loadout_runtime/loadinstead.py`, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Prerequisite

ALEX PR #23 (`LOADIN.STEAD door router m0`) must be merged or used as the branch base. The current API already validates `formation_ref` and copies it into the delivery envelope; this plan begins as a conformance test rather than a requested router feature.

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on PR #23 or its merged successor.

- Create: `tests/test_passage_world_loadinstead.py`
- Create: `tests/fixtures/passage_world/loadinstead-roads.json`
- Create: `docs/loadinstead-passage-world.md`

No router production file is scheduled for modification unless RED exposes an actual loss of formation testimony.

---

### Task 1: Freeze two same-door route bits in RED

**Files:**
- Create: `tests/fixtures/passage_world/loadinstead-roads.json`
- Create: `tests/test_passage_world_loadinstead.py`

- [ ] **Step 1: Create one exact door registry**

Use one available destination door:

```json
{
  "schema": "loadinstead.door/v0",
  "door_id": "door:R1",
  "owner_world": "synthetic:R1",
  "role": "destination",
  "accepts_classes": ["passage-token"],
  "protocol": "fixture-only",
  "capability_ref": "capability:synthetic-r1",
  "status": "available"
}
```

- [ ] **Step 2: Create ROAD-A and ROAD-B route bits**

Both use:

```text
schema = ecode.route-bit/v0
source_world = synthetic:R0
consequence_class = passage-token
payload_ref = payload:022100
witness_classes = []
```

Each uses its exact LOADOUT evaluation compile ref.

Set:

```text
ROAD-A formation_ref = sha256:<formation A id>
ROAD-B formation_ref = sha256:<formation B id>
```

Use valid 64-hex SHA-256 refs generated from the ALEX formation receipts; do not invent a semantic label in `formation_ref`.

- [ ] **Step 3: Write the route assertions**

```python
proposal_a = route_bit(bit_a, doors)
proposal_b = route_bit(bit_b, doors)

self.assertEqual(proposal_a["disposition"], "ROUTED")
self.assertEqual(proposal_b["disposition"], "ROUTED")
self.assertEqual(proposal_a["primary_door_ref"], "door:R1")
self.assertEqual(proposal_b["primary_door_ref"], "door:R1")
self.assertEqual(proposal_a["delivery_envelopes"][0]["payload_ref"], "payload:022100")
self.assertEqual(proposal_b["delivery_envelopes"][0]["payload_ref"], "payload:022100")
self.assertNotEqual(
    proposal_a["delivery_envelopes"][0]["formation_ref"],
    proposal_b["delivery_envelopes"][0]["formation_ref"],
)
```

- [ ] **Step 4: Assert the hard routing boundary**

For both proposals:

```python
self.assertEqual(proposal["admission_status"], "NOT_ATTEMPTED")
self.assertFalse(proposal["authority_transferred"])
self.assertEqual(proposal["delivery_envelopes"][0]["authority"], "none")
```

- [ ] **Step 5: Run RED/compatibility check**

```bash
python3 -m unittest tests.test_passage_world_loadinstead -v
```

Expected before PR #23 is available: import failure. Expected after prerequisite: PASS unless the current router loses formation testimony.

- [ ] **Step 6: Commit**

```bash
git add tests/fixtures/passage_world/loadinstead-roads.json tests/test_passage_world_loadinstead.py
git commit -m "test: route two passage roads through one door"
```

---

### Task 2: Pressure route coincidence and cosmetic identity noise

**Files:**
- Modify: `tests/test_passage_world_loadinstead.py`

- [ ] **Step 1: Prove route coincidence is lawful**

Both roads must select the same destination door despite distinct `formation_ref`. The router must not report ambiguity merely because histories differ.

- [ ] **Step 2: Prove bit identity noise is independent**

Clone ROAD-A, change only `bit_id` and `occurred_at` to another lawful fixture occurrence, and route again. Require the same destination and preserved formation ref. `route_id` may differ; no assertion may interpret that difference as passage distinction.

- [ ] **Step 3: Prove registry ordering is not semantic**

Add one unrelated non-matching door and route with registry orders `[R1, unrelated]` and `[unrelated, R1]`. Require equal disposition/primary destination/delivery envelope semantic fields. `registry_digest` may differ if the current router intentionally hashes raw registry order; PASSAGE-WORLD must not treat that digest as passage identity.

- [ ] **Step 4: Prove unavailable owner remains a route finding, not admission**

Mark `door:R1` unavailable and require `UNROUTABLE` plus `DOOR_UNAVAILABLE` rejection. The route bit's formation ref still exists in input testimony; no synthetic admission/refusal receipt is created by LOADIN.STEAD.

- [ ] **Step 5: Verify**

```bash
python3 -m unittest tests.test_passage_world_loadinstead -v
python3 -m unittest tests.test_loadinstead_router -v
```

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add tests/test_passage_world_loadinstead.py
git commit -m "test: keep route coincidence distinct from passage identity"
```

---

### Task 3: Document the outward-hand boundary

**Files:**
- Create: `docs/loadinstead-passage-world.md`

- [ ] **Step 1: Write the reference**

Use:

```text
LOADIN.STEAD decides which declared door fits the bit.
It does not decide whether two bits traveled the same history.
```

Document:

```text
same route != same passage
route_id != passage identity
formation_ref is testimony, not a router verdict
route != admit
```

- [ ] **Step 2: Run full regression suite**

```bash
python3 -m unittest discover -s tests -v
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add docs/loadinstead-passage-world.md
git commit -m "docs: define LOADIN.STEAD passage boundary"
```

## Completion Gate

Gate E is complete when both same-payload roads route to `door:R1`, each delivery envelope preserves its distinct exact formation ref, route coincidence does not erase ancestry, and `admission_status` remains `NOT_ATTEMPTED` with zero authority transfer.