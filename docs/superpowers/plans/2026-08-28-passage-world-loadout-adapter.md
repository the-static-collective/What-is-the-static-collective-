# PASSAGE-WORLD-001 LOADOUT Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reuse the MORTAL-ACTOR LOADOUT binding as exact entry/evaluation compile testimony for both roads, proving PASSAGE-WORLD needs no new LOADOUT evidence or authority semantics.

**Architecture:** PASSAGE-WORLD does not add a `Passage` primitive to LOADOUT. It consumes `mortal_actor.loadout-binding/v0` after the MORTAL-ACTOR LOADOUT adapter lands. PASSAGE-specific work is conformance pressure showing ROAD-A and ROAD-B may have different compile ancestry while preserving immutable compile identity, unchanged effect authority, and opaque 3rdi projection binding.

**Tech Stack:** Python 3 standard library, existing `skills/loadout/` package, `unittest`, JSON fixtures.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Global Constraints

- Prerequisite: execute/land `docs/superpowers/plans/2026-08-27-mortal-actor-loadout-adapter.md` first.
- Do not duplicate `compile_identity.py` or `mortal_actor.py`.
- `task != tool list`.
- `router choice != evidence`.
- `capability availability != authority`.
- `compile ancestry != evidence ancestry`.
- Compile difference alone does not prove passage difference.
- A projection-triggered child compile may change context/world cut but may not silently expand effect authority or egress policy.
- LOADOUT treats 3rdi projection identity as opaque testimony.
- No payload, support, truth, route, destination, admission, or passage-equivalence semantics belong in this gate.
- Green conformance executes no side effect.

---

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, on a branch containing the LOADOUT front door plus MORTAL-ACTOR LOADOUT adapter.

- Create: `tests/test_passage_world_loadout_gate.py`
- Create: `tests/fixtures/passage_world/loadout-roads.json`
- Create: `skills/loadout/references/passage-world.md`
- Modify: `skills/loadout/references/mortal-actor.md` only to link the new pressure test when that reference exists.

No production LOADOUT module is scheduled. Add one only if RED demonstrates a concrete missing owner receipt; do not preemptively create a wrapper.

---

### Task 1: Freeze ROAD-A / ROAD-B compile testimony

**Files:**
- Create: `tests/test_passage_world_loadout_gate.py`
- Create: `tests/fixtures/passage_world/loadout-roads.json`

**Interfaces:**
- Consumes: `bind_mortal_actor_compiles(...) -> dict` from the prerequisite plan.
- Produces: two valid `mortal_actor.loadout-binding/v0` receipts.

- [ ] **Step 1: Create exact fixture shape**

```json
{
  "schema": "passage_world.loadout-fixture/v0",
  "road_a": {
    "run_id": "PW-ROAD-A",
    "actor_id": "passage-actor",
    "world_cut_ref": "cut:road-a",
    "projection_ref": "projection:ROAD-A",
    "entry_compile": {},
    "evaluation_compile": {}
  },
  "road_b": {
    "run_id": "PW-ROAD-B",
    "actor_id": "passage-actor",
    "world_cut_ref": "cut:road-b",
    "projection_ref": "projection:ROAD-B",
    "entry_compile": {},
    "evaluation_compile": {}
  }
}
```

ROAD-A uses one compile `C_A0` for entry/evaluation.

ROAD-B uses `C_B0 -> C_B1`, where `C_B1.parent_compile_id == C_B0.compile_id`. Change only the lawful context/world-cut/trace fields; preserve `effect_fence_ref`, `effective_effects`, and `egress_policy_ref` exactly.

- [ ] **Step 2: Write the owner-binding tests**

```python
receipt_a = bind_mortal_actor_compiles(**road_a)
receipt_b = bind_mortal_actor_compiles(**road_b)

self.assertEqual(receipt_a["schema"], "mortal_actor.loadout-binding/v0")
self.assertEqual(receipt_a["recompile_relation"], "same")
self.assertEqual(receipt_b["recompile_relation"], "child")
self.assertFalse(receipt_a["authority_expanded"])
self.assertFalse(receipt_b["authority_expanded"])
self.assertFalse(receipt_a["side_effect_executed"])
self.assertFalse(receipt_b["side_effect_executed"])
```

- [ ] **Step 3: Write the semantic-absence test**

Recursively collect keys from both receipts and require none of:

```python
for forbidden in {
    "payload", "support", "truth", "route", "destination",
    "admission", "passage_identity", "same_passage"
}:
    self.assertNotIn(forbidden, recursive_keys(receipt_a))
    self.assertNotIn(forbidden, recursive_keys(receipt_b))
```

- [ ] **Step 4: Run compatibility RED/GREEN gate**

```bash
python3 -m unittest tests.test_passage_world_loadout_gate -v
```

Expected before prerequisite exists: import failure for the MORTAL binder. Expected after prerequisite: PASS unless a concrete owner-contract gap exists.

- [ ] **Step 5: Commit**

```bash
git add tests/test_passage_world_loadout_gate.py tests/fixtures/passage_world/loadout-roads.json
git commit -m "test: pressure LOADOUT passage ancestry"
```

---

### Task 2: Pressure ROAD-B authority non-expansion

**Files:**
- Modify: `tests/test_passage_world_loadout_gate.py`

**Interfaces:**
- Consumes: valid ROAD-B fixture.
- Produces: hostile proof that child compile ancestry can change context without permission expansion.

- [ ] **Step 1: Add independent hostile mutations**

For each mutation, recompute or corrupt the compile exactly as the case requires and call the existing binder:

```text
effect_fence_ref changed
effective_effects appended
egress_policy_ref changed
parent_compile_id changed
compile_digest corrupted
```

Require the existing MORTAL/LOADOUT errors; do not invent PASSAGE-specific error codes.

- [ ] **Step 2: Add positive context-descendant case**

Create a child where only:

```python
child["world_cut_ref"] = "cut:road-b1"
child["context_pack_ref"] = "context:road-b1"
child["compile_trace"]["id"] = "compile-trace:road-b1"
```

change, then recompute the exact compile digest. Require successful binding and `recompile_relation == "child"`.

- [ ] **Step 3: Verify**

```bash
python3 -m unittest tests.test_passage_world_loadout_gate -v
python3 -m unittest tests.test_mortal_actor_loadout_adapter -v
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add tests/test_passage_world_loadout_gate.py
git commit -m "test: keep passage recompile mortal"
```

---

### Task 3: Document the no-new-primitive result

**Files:**
- Create: `skills/loadout/references/passage-world.md`
- Modify: `skills/loadout/references/mortal-actor.md` when present.

**Interfaces:**
- Produces operator documentation only.

- [ ] **Step 1: Write the reference**

Use:

```text
LOADOUT witnesses which bounded world entered the hand.
It does not decide whether two crossings are the same crossing.
```

Document:

```text
compile ancestry != evidence ancestry
compile difference != passage difference by itself
same compile != same passage
capability availability != authority
```

State that PASSAGE-WORLD consumes the exact existing binding receipt and compares it only alongside other owner receipts in the neutral proof.

- [ ] **Step 2: Run full regression floor**

```bash
python3 -m unittest discover -s tests -v
```

Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add skills/loadout/references/passage-world.md skills/loadout/references/mortal-actor.md
git commit -m "docs: define LOADOUT passage boundary"
```

## Completion Gate

Gate B is complete when both roads have valid immutable compile testimony, ROAD-B can lawfully descend to a child compile without authority expansion, and no PASSAGE-specific semantic primitive was added to LOADOUT.