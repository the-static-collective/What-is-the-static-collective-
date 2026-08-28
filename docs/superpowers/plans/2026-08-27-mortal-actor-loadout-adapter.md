# MORTAL-ACTOR-001 LOADOUT Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give LOADOUT the smallest executable handoff needed to bind immutable entry/evaluation compiles into a mortal-actor run without mutating context, laundering selection into evidence, or expanding authority during a projection-triggered recompile.

**Architecture:** Implement the adapter inside the portable `skills/loadout/` package after the LOADOUT front-door package from ALEX PR #9 is available. The adapter consumes `loadout.compile/v0` records and opaque projection identity; it does not inspect 3rdi semantics or ALEX claims. It emits a small `mortal_actor.loadout-binding/v0` receipt that preserves compile ancestry and effect-fence equality. Crucially, the portable package validates only the compile fields it owns and never imports `alex_runtime`; ALEX separately cross-checks the same compile records through its handshake validator in repository tests.

**Tech Stack:** Python 3 standard library, `unittest`, Markdown skill references; ALEX handshake validation is test-only cross-checking, never a LOADOUT runtime dependency.

**Spec:** `docs/superpowers/specs/2026-08-27-mortal-actor-001-common-stack-design.md`

## Global Constraints

- Dependency: LOADOUT front-door PR #9 (`feat/loadout-front-door`) must be merged or used as the branch base; do not duplicate its package files.
- `task != tool list`.
- `router choice != evidence`.
- `capability availability != authority`.
- `entry_compile_ref` is immutable.
- A projection-triggered context change produces child compile `C1`; it never edits `C0`.
- For `MORTAL-ACTOR-001` v0, a projection-triggered recompile may change context/world cut but must not expand effect authority.
- The adapter treats 3rdi projection identity as opaque testimony.
- The adapter must not evaluate SUPPORTS, truth, relevance, causation, belief, or narrative action.
- The portable `skills/loadout/` package must not import `alex_runtime`.
- Green binding does not execute side effects.

---

## Target Repository and File Map

**Repo:** `the-static-collective/ALEX.2`, based on LOADOUT PR #9 or its merged successor.

- Create: `skills/loadout/scripts/__init__.py`
- Create: `skills/loadout/scripts/compile_identity.py`
- Create: `skills/loadout/scripts/mortal_actor.py`
- Create: `skills/loadout/references/mortal-actor.md`
- Modify: `skills/loadout/SKILL.md` only if a one-line reference link fits the existing word ceiling; otherwise leave it unchanged and link from `plugin-layer-map.md`.
- Modify: `skills/loadout/references/plugin-layer-map.md` or nearest routing reference to mention the adapter.
- Create: `tests/test_mortal_actor_loadout_adapter.py`

---

### Task 1: Freeze the binding API and RED ancestry cases

**Files:**
- Create: `tests/test_mortal_actor_loadout_adapter.py`

**Interfaces:**
- Consumes: `loadout.compile/v0` records.
- Produces later: `bind_mortal_actor_compiles(...) -> dict`.

- [ ] **Step 1: Build local compile fixtures without importing ALEX into LOADOUT code**

The test may import ALEX's existing digest helper to cross-check parity, but the eventual package code may not. Create a local `make_compile()` helper using exact compile IDs `C0` and `C1`. Compute fixture digests with the package helper planned for Task 2:

```python
from skills.loadout.scripts.compile_identity import compile_payload_digest
```

For cross-checking only, tests may also import:

```python
from alex_runtime.handshake import compile_payload_digest as alex_compile_payload_digest
```

and assert both functions return the same digest for the same record.

Create `C1` from `C0` with:

```python
c1["compile_id"] = "C1"
c1["parent_compile_id"] = "C0"
c1["world_cut_ref"] = "world-cut:room-after-merge"
c1["context_pack_ref"] = "context-pack:room-a1"
c1["compile_trace"]["id"] = "compile-trace:CT1"
```

Keep `effect_fence_ref`, `effective_effects`, and `egress_policy_ref` identical to `C0`.

- [ ] **Step 2: Write RED happy-path test**

Expected API:

```python
from skills.loadout.scripts.mortal_actor import bind_mortal_actor_compiles

receipt = bind_mortal_actor_compiles(
    run_id="MA-A-A1",
    actor_id="A",
    world_cut_ref="cut:A1",
    projection_ref="3rdi:sha256:abc",
    entry_compile=c0,
    evaluation_compile=c1,
)
```

Assert:

```python
self.assertEqual(receipt["schema"], "mortal_actor.loadout-binding/v0")
self.assertEqual(receipt["entry_compile_id"], "C0")
self.assertEqual(receipt["evaluation_compile_id"], "C1")
self.assertEqual(receipt["recompile_relation"], "child")
self.assertFalse(receipt["authority_expanded"])
self.assertFalse(receipt["side_effect_executed"])
```

- [ ] **Step 3: Write RED no-recompile test**

Call with `entry_compile=c0`, `evaluation_compile=c0`; assert `recompile_relation == "same"` and the receipt carries one compile digest twice by reference rather than fabricating a child.

- [ ] **Step 4: Write hostile RED tests**

Require these exceptions/reason fragments:

```text
invalid entry compile
invalid evaluation compile
evaluation compile is not an attributable child
effect authority changed during mortal recompile
egress policy changed during mortal recompile
projection_ref required
```

Hostile mutations:

1. wrong `C1.parent_compile_id`;
2. change `C1.effect_fence_ref`;
3. append a new allowed effect to `C1.effective_effects`;
4. change `C1.egress_policy_ref`;
5. blank projection ref;
6. corrupt either compile digest.

- [ ] **Step 5: Write import-isolation test**

Read both new package modules as text and assert neither contains `alex_runtime`:

```python
for path in (COMPILE_IDENTITY, MORTAL_ACTOR):
    self.assertNotIn("alex_runtime", path.read_text(encoding="utf-8"))
```

This prevents future refactors from silently making ALEX a LOADOUT runtime dependency.

- [ ] **Step 6: Run RED**

```bash
python3 -m unittest tests.test_mortal_actor_loadout_adapter -v
```

Expected: FAIL because `skills/loadout/scripts/compile_identity.py` and `mortal_actor.py` do not exist.

- [ ] **Step 7: Commit RED**

```bash
git add tests/test_mortal_actor_loadout_adapter.py
git commit -m "test: freeze mortal LOADOUT binding"
```

---

### Task 2: Add portable compile identity validation

**Files:**
- Create: `skills/loadout/scripts/__init__.py`
- Create: `skills/loadout/scripts/compile_identity.py`
- Test: `tests/test_mortal_actor_loadout_adapter.py`

**Interfaces:**

```python
def compile_payload_digest(compile_record: dict) -> str:
    ...

def validate_compile_identity(compile_record: dict) -> list[str]:
    ...
```

- [ ] **Step 1: Implement canonical digest parity with existing `loadout.compile/v0` testimony**

Use stdlib only:

```python
import copy
import hashlib
import json


def compile_payload_digest(compile_record: dict) -> str:
    payload = copy.deepcopy(compile_record)
    payload.pop("compile_digest", None)
    encoded = json.dumps(
        payload,
        ensure_ascii=False,
        allow_nan=False,
        separators=(",", ":"),
        sort_keys=True,
    ).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()
```

- [ ] **Step 2: Validate only the compile identity fields the adapter actually depends on**

`validate_compile_identity()` returns stable error codes and requires:

```text
schema == loadout.compile/v0
compile_id non-empty
parent_compile_id null or non-empty string
world_cut_ref non-empty
context_pack_ref non-empty
compile_trace.id non-empty
effect_fence_ref non-empty
effective_effects is a list
egress_policy_ref non-empty
compile_digest equals compile_payload_digest(record)
```

Use codes:

```text
COMPILE_NOT_OBJECT
COMPILE_SCHEMA_INVALID
COMPILE_ID_REQUIRED
COMPILE_PARENT_ID_INVALID
COMPILE_WORLD_CUT_REQUIRED
COMPILE_CONTEXT_PACK_REQUIRED
COMPILE_TRACE_REQUIRED
COMPILE_EFFECT_FENCE_REQUIRED
COMPILE_EFFECTS_INVALID
COMPILE_EGRESS_POLICY_REQUIRED
COMPILE_DIGEST_MISMATCH
```

Do not validate ALEX run envelopes, owner-evidence drift, or semantic meaning here; those remain outside this portable helper.

- [ ] **Step 3: Cross-check parity against ALEX in repository tests**

For one valid compile:

```python
self.assertEqual(compile_payload_digest(c0), alex_compile_payload_digest(c0))
self.assertEqual(validate_compile_identity(c0), [])
self.assertEqual(validate_compile_record(c0), [])
```

For a corrupted digest, require both validators to reject. This is compatibility testimony, not a runtime import.

- [ ] **Step 4: Run GREEN for identity helper**

```bash
python3 -m unittest tests.test_mortal_actor_loadout_adapter -v
```

Expected: binder tests still fail because `mortal_actor.py` does not exist; digest/identity tests pass.

- [ ] **Step 5: Commit**

```bash
git add skills/loadout/scripts/__init__.py skills/loadout/scripts/compile_identity.py tests/test_mortal_actor_loadout_adapter.py
git commit -m "feat: add portable LOADOUT compile identity"
```

---

### Task 3: Implement the minimal immutable compile binder

**Files:**
- Create: `skills/loadout/scripts/mortal_actor.py`
- Test: `tests/test_mortal_actor_loadout_adapter.py`

**Interfaces:**

```python
def bind_mortal_actor_compiles(
    *,
    run_id: str,
    actor_id: str,
    world_cut_ref: str,
    projection_ref: str,
    entry_compile: dict,
    evaluation_compile: dict,
) -> dict:
```

- [ ] **Step 1: Add strict string validation**

Use one private helper:

```python
def _required_string(value: object, name: str) -> str:
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{name} required")
    return value
```

Apply it to `run_id`, `actor_id`, `world_cut_ref`, and `projection_ref`.

- [ ] **Step 2: Validate compile identity through LOADOUT-owned code**

Import only:

```python
from .compile_identity import validate_compile_identity
```

If entry errors exist:

```python
raise ValueError(f"invalid entry compile: {','.join(errors)}")
```

Do the same for evaluation compile.

- [ ] **Step 3: Enforce same-or-direct-child v0 ancestry**

Use:

```python
same = evaluation_compile["compile_id"] == entry_compile["compile_id"]
child = evaluation_compile.get("parent_compile_id") == entry_compile["compile_id"]
if not same and not child:
    raise ValueError("evaluation compile is not an attributable child")
```

For v0, require a direct child only. Do not implement arbitrary ancestry walking until a specimen requires multiple recompiles.

- [ ] **Step 4: Enforce no effect/egress expansion during projection-triggered recompile**

If `child`:

```python
if evaluation_compile["effect_fence_ref"] != entry_compile["effect_fence_ref"]:
    raise ValueError("effect authority changed during mortal recompile")
if evaluation_compile["effective_effects"] != entry_compile["effective_effects"]:
    raise ValueError("effect authority changed during mortal recompile")
if evaluation_compile["egress_policy_ref"] != entry_compile["egress_policy_ref"]:
    raise ValueError("egress policy changed during mortal recompile")
```

Context may change; capability bindings may change only by normal LOADOUT compilation testimony and must not be interpreted by this adapter as evidence.

- [ ] **Step 5: Emit a reference-only receipt**

Return exactly:

```python
{
    "schema": "mortal_actor.loadout-binding/v0",
    "run_id": run_id,
    "actor_id": actor_id,
    "world_cut_ref": world_cut_ref,
    "projection_ref": projection_ref,
    "entry_compile_id": entry_compile["compile_id"],
    "entry_compile_digest": entry_compile["compile_digest"],
    "evaluation_compile_id": evaluation_compile["compile_id"],
    "evaluation_compile_digest": evaluation_compile["compile_digest"],
    "recompile_relation": "same" if same else "child",
    "effect_fence_ref": evaluation_compile["effect_fence_ref"],
    "authority_expanded": False,
    "side_effect_executed": False,
}
```

Do not include selected context bodies, source excerpts, claims, or ALEX evidence paths.

- [ ] **Step 6: Run GREEN**

```bash
python3 -m unittest tests.test_mortal_actor_loadout_adapter -v
python3 -m unittest tests.test_loadout_handshake -v
python3 -m unittest tests.test_loadout_handshake_drift -v
```

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add skills/loadout/scripts/mortal_actor.py tests/test_mortal_actor_loadout_adapter.py
git commit -m "feat: bind mortal LOADOUT compiles"
```

---

### Task 4: Prove router selection cannot impersonate evidence

**Files:**
- Modify: `tests/test_mortal_actor_loadout_adapter.py`

**Interfaces:**
- Receipt contains compile identity and capability/effect fence testimony only.
- Receipt contains no field named `evidence`, `supports`, `truth`, `claim_basis`, or semantic conclusion.

- [ ] **Step 1: Add negative key test**

```python
for forbidden in {"evidence", "supports", "truth", "claim_basis", "admitted", "canon"}:
    self.assertNotIn(forbidden, receipt)
```

- [ ] **Step 2: Add capability-selection hostile case**

Create a compile whose capability bindings contain:

```python
{"capability": "source.red-note", "status": "available"}
```

Bind it successfully, then assert the receipt has no `source.red-note` evidence claim and no semantic conclusion. This protects `router choice != evidence` even when a capability name resembles the claim domain.

- [ ] **Step 3: Run tests**

```bash
python3 -m unittest tests.test_mortal_actor_loadout_adapter -v
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add tests/test_mortal_actor_loadout_adapter.py
git commit -m "test: prevent LOADOUT evidence laundering"
```

---

### Task 5: Document the mortal compile handoff without bloating the front door

**Files:**
- Create: `skills/loadout/references/mortal-actor.md`
- Modify: `skills/loadout/references/plugin-layer-map.md`
- Optionally modify: `skills/loadout/SKILL.md` only if its established word ceiling remains satisfied.

**Interfaces:**
- Operator reference, not runtime authority.

- [ ] **Step 1: Write the reference**

Document:

```text
LOADOUT gives the actor a mortal world.
```

Then the v0 sequence:

```text
C0 -> 3rdi projection -> no new context needed -> evaluate under C0
C0 -> 3rdi projection -> context gap -> compile C1(child of C0) -> evaluate under C1
```

State explicitly:

```text
recompile != mutate
selection != evidence
capability != authority
binding receipt != side effect
```

Also state that LOADOUT-owned compile identity validation is intentionally narrower than ALEX's handshake/audit validation; both may validate the same record for different reasons without one package depending on the other.

- [ ] **Step 2: Link from the detailed routing reference**

Add one short entry under reasoning-organ composition pointing to `mortal-actor.md`. Do not turn MORTAL-ACTOR into a mandatory route.

- [ ] **Step 3: Preserve skill size contract**

If `SKILL.md` is changed, run the existing LOADOUT package contract from PR #9 and keep its body under the existing 500-word ceiling. If the reference can be reached through the existing detailed map, prefer no `SKILL.md` change.

- [ ] **Step 4: Run full repository suite**

```bash
python3 -m unittest discover -s tests -v
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

Stage only files that exist and changed. If `SKILL.md` was untouched, do not stage it:

```bash
git add skills/loadout/references skills/loadout/scripts tests/test_mortal_actor_loadout_adapter.py
git commit -m "docs: define mortal LOADOUT handoff"
```

---

## Acceptance Gate

The LOADOUT adapter is complete when the same compile may pass by reference, a projection-triggered context change requires an immutable direct child compile, authority/egress cannot expand through that child in v0, the portable package imports no ALEX runtime, and the resulting receipt contains no semantic evidence judgment.

After this plan is green, its output is one input to the neutral `FOUR WITNESSES / ONE ROOM` verifier; it does not itself prove local supportability.