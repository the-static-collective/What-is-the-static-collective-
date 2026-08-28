# MORTAL-ACTOR-001 3rdi Adapter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Export a minimal, deterministic 3rdi handoff proving exactly which occurrence IDs and epistemic trace events were lawfully available to one actor at one cut, without deciding semantic support, truth, authority, or consequence.

**Architecture:** Build on the observer epistemic trace work already staged in 3rdi PR #3. `compile_cut()` remains the source of projection truth. A new adapter converts one `3rdi.projection-receipt/v0` into a compact `mortal_actor.3rdi-handoff/v0` containing projection identity, actor/cut identity, visible occurrence IDs, visible causal/relevance edge IDs, and attributable contact/attention/decoder/stance IDs. The adapter never reads the private oracle and never emits ALEX verdicts.

**Tech Stack:** Python 3 standard library, existing 3rdi reference kernel, `unittest`, JSON specimen labs.

**Spec:** `docs/superpowers/specs/2026-08-27-mortal-actor-001-common-stack-design.md`

## Global Constraints

- Dependency: merge or branch from 3rdi PR #3 so `contacts`, `attention_events`, `decoder_applications`, `stances`, `observer_view.epistemic_trace`, and `audit.withheld_epistemic` exist.
- `occurrence != availability != attention != relevance`.
- `available != encountered`; exposure alone must never synthesize contact.
- `ignored` requires attributable contact ancestry.
- `relevance != causation`.
- `projection != source != authority`.
- `gate result != side effect`.
- The adapter must not say `supported`, `true`, `false`, `admitted`, `authorized`, or `actionable`.
- Projection digest remains owned by `compile_cut()`; the adapter references it rather than recomputing a new world truth.

---

## Target Repository and File Map

**Repo:** `the-static-collective/3rdi`, based on PR #3 or its merged successor.

- Create: `skills/3rdi/scripts/three_rdi/mortal_actor.py`
- Modify: `skills/3rdi/scripts/three_rdi/__init__.py`
- Create: `tests/test_mortal_actor_handoff.py`
- Create: `specimens/mortal-actor-001.json`
- Modify: `skills/3rdi/scripts/run_labs.py`
- Create: `skills/3rdi/references/mortal-actor.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

---

### Task 1: Freeze the handoff shape in RED

**Files:**
- Create: `tests/test_mortal_actor_handoff.py`

**Interfaces:**

```python
def mortal_actor_handoff(receipt: dict) -> dict:
    ...
```

- [ ] **Step 1: Build a projection fixture through the real compiler**

Reuse the existing `field_fixture()` pattern from `tests/test_projection.py`, then add:

```python
field["contacts"] = [{
    "id": "contact-mirror-a",
    "occurrence_id": "mirror-scratch",
    "observer": "A",
    "layer": "private",
    "sensed_at": "2026-08-27T12:00:06Z",
    "evidence_refs": ["carrier:mirror"],
}]
field["attention_events"] = [{
    "id": "attention-mirror-a",
    "contact_id": "contact-mirror-a",
    "observer": "A",
    "action": "ignored",
    "occurred_at": "2026-08-27T12:00:07Z",
    "evidence_refs": ["attention-receipt:A"],
}]
```

Create a historical cut `A0` where `mirror-scratch` is visible and the above contact/attention events are within `known_at`.

- [ ] **Step 2: Write the RED happy path**

```python
projection = compile_cut(field, "A0")
handoff = mortal_actor_handoff(projection)

self.assertEqual(handoff["schema"], "mortal_actor.3rdi-handoff/v0")
self.assertEqual(handoff["projection_digest"], projection["projection_digest"])
self.assertEqual(handoff["field_id"], projection["field_id"])
self.assertEqual(handoff["cut_id"], "A0")
self.assertEqual(handoff["observer"], "A")
self.assertIn("mirror-scratch", handoff["visible_occurrence_ids"])
self.assertIn("contact-mirror-a", handoff["contact_ids"])
self.assertIn("attention-mirror-a", handoff["attention_event_ids"])
```

- [ ] **Step 3: Write RED absence tests**

Use a visible occurrence with no contact. Assert its occurrence ID appears in `visible_occurrence_ids` but no contact is synthesized. Use a withheld occurrence and assert it does not appear in visible IDs.

- [ ] **Step 4: Write RED non-authority key test**

Recursively collect dictionary keys in the handoff and assert none equals:

```text
supported
truth
falsehood
authority
admitted
authorized
actionable
execute
```

`non_authority` prose may remain only in the original projection receipt, not copied into the minimal handoff.

- [ ] **Step 5: Run RED and commit**

```bash
python3 -m unittest tests.test_mortal_actor_handoff -v
```

Expected: FAIL because `three_rdi.mortal_actor` does not exist.

```bash
git add tests/test_mortal_actor_handoff.py
git commit -m "test: freeze mortal 3rdi handoff"
```

---

### Task 2: Implement a reference-only projection handoff

**Files:**
- Create: `skills/3rdi/scripts/three_rdi/mortal_actor.py`
- Modify: `skills/3rdi/scripts/three_rdi/__init__.py`
- Test: `tests/test_mortal_actor_handoff.py`

**Interfaces:**

```python
def mortal_actor_handoff(receipt: dict[str, Any]) -> dict[str, Any]:
```

- [ ] **Step 1: Validate the receipt boundary**

Require:

```text
schema == 3rdi.projection-receipt/v0
projection_digest is non-empty
field_id is non-empty
cut.id is non-empty
cut.observer is non-empty
observer_view is an object
```

Raise `FieldError` with exact fragments:

```text
projection receipt required
projection digest required
projection cut required
projection observer required
```

Do not accept raw fields; callers must pass a compiled projection receipt.

- [ ] **Step 2: Extract only visible identity lists**

From `observer_view` collect sorted unique IDs:

```python
visible_occurrence_ids = [item["id"] for item in view["occurrences"]]
visible_causal_edge_ids = [item["id"] for item in view["edges"]["causal"]]
visible_relevance_edge_ids = [item["id"] for item in view["edges"]["relevance"]]
```

From `observer_view.epistemic_trace` collect:

```text
contact_ids
attention_event_ids
decoder_application_ids
stance_ids
```

If the epistemic trace is absent, raise a clear `FieldError("mortal actor handoff requires epistemic trace support")` rather than synthesizing empty contact semantics. This keeps the adapter explicitly dependent on the Phase B frontier.

- [ ] **Step 3: Preserve withheld identity without hidden bodies**

Expose only IDs/reasons from projection audit:

```python
withheld_occurrence_ids = sorted(item["occurrence_id"] for item in audit["withheld"])
withheld_edge_ids = sorted(item["edge_id"] for item in audit["withheld_edges"])
```

Do not copy source bodies, global field contents, or hidden occurrence payloads.

- [ ] **Step 4: Emit exact v0 shape**

Return:

```python
{
    "schema": "mortal_actor.3rdi-handoff/v0",
    "projection_digest": receipt["projection_digest"],
    "field_id": receipt["field_id"],
    "cut_id": receipt["cut"]["id"],
    "observer": receipt["cut"]["observer"],
    "visible_occurrence_ids": sorted(...),
    "visible_causal_edge_ids": sorted(...),
    "visible_relevance_edge_ids": sorted(...),
    "contact_ids": sorted(...),
    "attention_event_ids": sorted(...),
    "decoder_application_ids": sorted(...),
    "stance_ids": sorted(...),
    "withheld_occurrence_ids": sorted(...),
    "withheld_edge_ids": sorted(...),
}
```

Do not include gate states; they are pure projection diagnostics but not needed by `LOCAL-SUPPORT-001` v0.

- [ ] **Step 5: Export the adapter**

Add `mortal_actor_handoff` to `three_rdi.__init__` using the same explicit export style as `compile_cut`/`normalize_field`.

- [ ] **Step 6: Run GREEN**

```bash
python3 -m unittest tests.test_mortal_actor_handoff -v
python3 -m unittest tests.test_projection -v
```

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add skills/3rdi/scripts/three_rdi/mortal_actor.py skills/3rdi/scripts/three_rdi/__init__.py tests/test_mortal_actor_handoff.py
git commit -m "feat: export mortal 3rdi handoff"
```

---

### Task 3: Add the local `FOUR WITNESSES / ONE ROOM` 3rdi specimen

**Files:**
- Create: `specimens/mortal-actor-001.json`
- Modify: `skills/3rdi/scripts/run_labs.py`
- Test: `tests/test_mortal_actor_handoff.py`

**Interfaces:**
- Consumes: the neutral CASE field semantics from `the-static-collective/What-is-the-static-collective-/specimens/mortal-actor-001/case/field.3rdi.json` once that vector lands.
- Produces: deterministic projection/handoff outputs for cuts `A0`, `B0`, `R0`, `N0`, `A1`.

- [ ] **Step 1: Copy the synthetic field, do not link across repos at runtime**

Copy the exact neutral `field.3rdi.json` bytes into `specimens/mortal-actor-001.json` and record the source repository path + source commit SHA in adjacent README/lab documentation. The runtime must not fetch the neutral repository dynamically.

- [ ] **Step 2: Add digest parity test**

Store the neutral field file SHA-256 in the test as a pinned expected digest. Assert the local specimen bytes hash to the same value before projection tests run. If the neutral vector evolves, update both intentionally with a new vector version.

- [ ] **Step 3: Compile all five cuts**

For each:

```python
for cut_id in ("A0", "B0", "R0", "N0", "A1"):
    handoff = mortal_actor_handoff(compile_cut(field, cut_id))
```

Assert all projection digests are distinct except where an exact identical cut would legitimately reproduce the same receipt. Specifically require A0 and A1 to differ despite both containing the same room locus.

- [ ] **Step 4: Assert hostile aperture facts**

Require:

```text
A0 withholds red-note-placed
R0 exposes red-note-placed
B0 exposes blue-key-dropped but has no contact ID for it
A0 exposes mirror-scratch and carries its ignored-contact ancestry
A1 exposes red-note-placed after merge-read
```

Also require `clock-chime-left` and `clock-chime-right` visible together where appropriate but no causal edge between them.

- [ ] **Step 5: Add lab runner**

Add `run_mortal_actor_lab()` returning a small summary containing cut IDs, projection digests, counts, and invariant booleans. It must not import or inspect the private oracle.

- [ ] **Step 6: Verify and commit**

```bash
python3 -m unittest tests.test_mortal_actor_handoff -v
python3 skills/3rdi/scripts/run_labs.py

git add specimens/mortal-actor-001.json skills/3rdi/scripts/run_labs.py tests/test_mortal_actor_handoff.py
git commit -m "test: add mortal actor projection lab"
```

---

### Task 4: Document the ALEX handoff boundary

**Files:**
- Create: `skills/3rdi/references/mortal-actor.md`
- Modify: `skills/3rdi/references/receipt-contract.md`

**Interfaces:**
- Defines what ALEX may consume without assigning ALEX semantics inside 3rdi.

- [ ] **Step 1: Write the reference**

Use the seal:

```text
3rdi gives the mortal world a point of view.
```

Document that `visible_occurrence_ids` means only “lawfully available in this projection.” It does **not** mean encountered, believed, relevant, causal, supported, true, authorized, or actionable.

Document epistemic lists similarly:

```text
contact_ids prove attributable sensing/contact
attention_event_ids prove attributable attention action
ignored requires contact but does not imply irrelevance
stance_ids describe observer stance, not truth
```

- [ ] **Step 2: Add receipt-contract entry**

State that `mortal_actor.3rdi-handoff/v0` is a lossy reference projection of an existing projection receipt. The original `projection_digest` is the identity anchor; consumers requiring more detail must request the original receipt rather than infer omitted fields.

- [ ] **Step 3: Run full suite**

```bash
python3 -m unittest discover -s tests -v
```

Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add skills/3rdi/references
git commit -m "docs: define mortal 3rdi aperture handoff"
```

---

## Acceptance Gate

The 3rdi adapter is complete when five deterministic observer-local handoffs can be produced from the hostile room, availability remains distinct from contact/attention, A0 cannot gain A1 knowledge by hindsight, and the handoff contains no semantic support or authority verdict.

The handoff is ready for ALEX only after this gate is green.