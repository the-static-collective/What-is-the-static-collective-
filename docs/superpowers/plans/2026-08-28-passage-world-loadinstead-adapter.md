# PASSAGE-WORLD-001 LOADIN.STEAD Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove the existing LOADIN.STEAD router can send two same-payload occurrences with different ALEX formation refs to the same destination while preserving each formation ref and keeping routing separate from admission.

**Architecture:** Reuse ALEX PR #23's `loadout_runtime.loadinstead.route_bit()` unchanged unless RED exposes a concrete loss. PASSAGE-WORLD supplies two valid `ecode.route-bit/v0` records with identical `payload_ref`, source world, consequence class, and destination registry, but distinct exact ALEX `formation_id` values carried as `formation_ref`. Both should resolve to the same `primary_door_ref` while preserving formation testimony.

**Tech Stack:** Python 3 standard library, existing `loadout_runtime/loadinstead.py`, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- Prerequisite: ALEX PR #23 (`LOADIN.STEAD door router m0`) merged or used as execution base.
- `route != admit`.
- `same route != same passage`.
- `route_id != passage identity`.
- `formation_ref` is opaque owner testimony; LOADIN.STEAD does not inspect ALEX formation semantics.
- Same routed destination must not erase distinct formation refs.
- Every delivery envelope retains `authority: none`.
- Every proposal retains `admission_status: NOT_ATTEMPTED` and `authority_transferred: false`.
- Registry ordering or raw route ID difference cannot by itself establish passage difference.
- No destination write, consequence, semantic support, or passage-equivalence verdict belongs in this gate.

---

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on PR #23 or merged successor.

- Create: `tests/test_passage_world_loadinstead.py`
- Create: `tests/fixtures/passage_world/loadinstead-roads.json`
- Create: `docs/loadinstead-passage-world.md`

No production router modification is scheduled.

---

### Task 1: Freeze two same-door route bits

**Files:**
- Create: `tests/fixtures/passage_world/loadinstead-roads.json`
- Create: `tests/test_passage_world_loadinstead.py`

**Interfaces:**
- Consumes: `route_bit(bit_record: dict, doors: list[dict]) -> dict`.
- Produces: two `loadinstead.route-proposal/v0` receipts.

- [ ] **Step 1: Create one exact destination door**

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

Set `formation_ref` to the exact ALEX `formation_id` produced for the corresponding road; `sha256_json` returns the required `sha256:<64-hex>` form.

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

- [ ] **Step 4: Assert hard routing boundary**

```python
for proposal in (proposal_a, proposal_b):
    self.assertEqual(proposal["admission_status"], "NOT_ATTEMPTED")
    self.assertFalse(proposal["authority_transferred"])
    self.assertEqual(proposal["delivery_envelopes"][0]["authority"], "none")
```

- [ ] **Step 5: Run compatibility gate**

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

### Task 2: Pressure route coincidence and identity noise

**Files:**
- Modify: `tests/test_passage_world_loadinstead.py`

**Interfaces:**
- Produces conformance controls only.

- [ ] **Step 1: Prove route coincidence is lawful**

Both roads select `door:R1` despite distinct formation refs. The router must not report ambiguity merely because histories differ.

- [ ] **Step 2: Prove bit identity noise is independent**

Clone ROAD-A and change only `bit_id` plus `occurred_at` to another lawful fixture occurrence. Require same destination and preserved formation ref. `route_id` may differ; no assertion interprets that as passage distinction.

- [ ] **Step 3: Prove registry order does not define passage identity**

Add one unrelated non-matching door and route `[R1, unrelated]` and `[unrelated, R1]`. Require equal disposition, primary destination, payload, and formation-ref delivery semantics. `registry_digest`/`route_id` may differ under the current raw registry hash and are explicitly excluded from passage identity.

- [ ] **Step 4: Prove unavailable door is a routing finding only**

Mark `door:R1` unavailable. Require `UNROUTABLE` plus `DOOR_UNAVAILABLE`; no destination admission/refusal receipt is created.

- [ ] **Step 5: Verify and commit**

```bash
python3 -m unittest tests.test_passage_world_loadinstead -v
python3 -m unittest tests.test_loadinstead_router -v

git add tests/test_passage_world_loadinstead.py
git commit -m "test: keep route coincidence distinct from passage identity"
```

---

### Task 3: Document the outward-hand boundary

**Files:**
- Create: `docs/loadinstead-passage-world.md`

**Interfaces:**
- Produces documentation only.

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
formation_ref = owner testimony, not router verdict
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

Gate E is complete when both same-payload roads route to `door:R1`, each delivery envelope preserves its distinct exact formation ref, route coincidence does not erase ancestry, and admission remains `NOT_ATTEMPTED` with zero authority transfer.