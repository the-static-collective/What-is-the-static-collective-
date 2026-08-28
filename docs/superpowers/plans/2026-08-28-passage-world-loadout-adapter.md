# PASSAGE-WORLD-001 LOADOUT Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reuse the MORTAL-ACTOR LOADOUT binding as the exact entry/evaluation compile testimony for both roads, and prove PASSAGE-WORLD needs no new LOADOUT evidence or authority semantics.

**Architecture:** PASSAGE-WORLD does not add a `Passage` primitive to LOADOUT. It consumes `mortal_actor.loadout-binding/v0` after the MORTAL-ACTOR LOADOUT adapter plan lands. The only PASSAGE-specific work in the LOADOUT owner repo is conformance pressure showing ROAD-A and ROAD-B may have different compile ancestry while preserving exact compile identity, unchanged effect authority, and opaque 3rdi projection binding.

**Tech Stack:** Python 3 standard library, existing `skills/loadout/` package, `unittest`.

**Spec:** `docs/superpowers/specs/2026-08-28-passage-world-001-design.md`

## Prerequisite

Execute or land `docs/superpowers/plans/2026-08-27-mortal-actor-loadout-adapter.md` first. This plan must not duplicate `compile_identity.py` or `mortal_actor.py` if they already exist.

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, on a branch containing the LOADOUT front door plus the MORTAL-ACTOR LOADOUT adapter.

- Create: `tests/test_passage_world_loadout_gate.py`
- Create: `tests/fixtures/passage_world/loadout-roads.json`
- Create: `skills/loadout/references/passage-world.md`
- Modify: `skills/loadout/references/mortal-actor.md` only to link the new pressure test, if that reference exists.

No production LOADOUT module is added unless the tests reveal a concrete missing owner receipt.

---

### Task 1: Freeze ROAD-A / ROAD-B compile testimony in RED

**Files:**
- Create: `tests/test_passage_world_loadout_gate.py`
- Create: `tests/fixtures/passage_world/loadout-roads.json`

- [ ] **Step 1: Build exact compile records**

Fixture shape:

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

ROAD-A uses one compile `C_A0` for entry and evaluation.

ROAD-B uses `C_B0 -> C_B1`, where `C_B1.parent_compile_id == C_B0.compile_id`, context/world-cut changes, but `effect_fence_ref`, `effective_effects`, and `egress_policy_ref` remain exact.

- [ ] **Step 2: Write the happy-path tests through the real MORTAL binder**

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

- [ ] **Step 3: Assert roads may differ without changing payload semantics**

LOADOUT fixtures contain no payload body and no route destination. Assert recursively that no key equals:

```text
payload
support
truth
route
destination
admission
passage_identity
```

The only projection field is the opaque `projection_ref`.

- [ ] **Step 4: Run RED or compatibility check**

```bash
python3 -m unittest tests.test_passage_world_loadout_gate -v
```

Expected before prerequisite lands: import failure for the MORTAL binder. Expected after prerequisite lands: tests execute and expose any actual missing contract.

- [ ] **Step 5: Commit the fixture/tests**

```bash
git add tests/test_passage_world_loadout_gate.py tests/fixtures/passage_world/loadout-roads.json
git commit -m "test: pressure LOADOUT passage ancestry"
```

---

### Task 2: Refuse authority drift on ROAD-B

**Files:**
- Modify: `tests/test_passage_world_loadout_gate.py`

- [ ] **Step 1: Add hostile child compile mutations**

Independently mutate:

```text
effect_fence_ref
effective_effects
egress_policy_ref
parent_compile_id
compile_digest
```

Each mutation must be refused by the existing LOADOUT/MORTAL binder. Do not add PASSAGE-specific exception semantics.

- [ ] **Step 2: Prove context change is lawful**

Change only `world_cut_ref`, `context_pack_ref`, and compile trace identity in `C_B1`, recompute its digest, and require binding to remain green.

This is the precise road difference LOADOUT owns:

```text
context may descend
permission may not silently expand
```

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
- Optionally modify: `skills/loadout/references/mortal-actor.md`

- [ ] **Step 1: Write the owner boundary**

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

State that PASSAGE-WORLD consumes the exact existing binding receipt and lets the neutral coordinator compare it alongside other owner receipts.

- [ ] **Step 2: Run full LOADOUT/ALEX regression floor**

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