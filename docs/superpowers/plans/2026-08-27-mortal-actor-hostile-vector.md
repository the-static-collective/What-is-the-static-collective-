# MORTAL-ACTOR-001 Hostile Vector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Freeze `FOUR WITNESSES / ONE ROOM` as a neutral, executable cross-stack test vector whose payloads remain in the owning dialects of LOADOUT, 3rdi, and ALEX and whose oracle never leaks into actor-side execution.

**Architecture:** The neutral repository owns only a manifest, stable specimen files, a private oracle, and a verifier. It does not invent a master world ontology. The world payload is `3rdi.field/v0`, compile payloads are `loadout.compile/v0`, ALEX claim requests are a small test manifest, and the private oracle carries global truth plus expected local outcomes. A stdlib Python verifier checks cross-file identity, CASE/ORACLE separation, compile ancestry, and non-collapse expectations without implementing any constituent plugin semantics.

**Tech Stack:** JSON, JSON Schema draft 2020-12, Python 3 standard library, `unittest`.

**Spec:** `docs/superpowers/specs/2026-08-27-mortal-actor-001-common-stack-design.md`

## Global Constraints

- `LOADOUT -> 3rdi -> ALEX` is the common control spine; the vector must not create a fourth shared runtime.
- `GLOBALLY SUPPORTED != LOCALLY SUPPORTABLE`.
- `available != encountered`, `encountered != attended`, `attended != decoded`, `decoded != accepted`.
- `entry_compile_ref` and `evaluation_compile_ref` may differ only through attributable LOADOUT ancestry.
- CASE files contain no global answer key or expected verdicts.
- ORACLE data is physically separate from actor-visible CASE data.
- Same visible room at `A0` and `A1` does not collapse worldline identity.
- Display order must not mint causal precedence.
- No fixture field named `authority`, `admitted`, `canon`, `publication`, or `execute` may be inferred from a green plugin result.
- The vector must remain synthetic and tiny: 10–15 occurrences.

---

## File Map

- Create: `specimens/mortal-actor-001/README.md`
- Create: `specimens/mortal-actor-001/manifest.json`
- Create: `specimens/mortal-actor-001/case/field.3rdi.json`
- Create: `specimens/mortal-actor-001/case/compiles.loadout.json`
- Create: `specimens/mortal-actor-001/case/claims.alex.json`
- Create: `specimens/mortal-actor-001/oracle/private-oracle.json`
- Create: `specimens/mortal-actor-001/schema/manifest.schema.json`
- Create: `specimens/mortal-actor-001/schema/claims.schema.json`
- Create: `tools/verify_mortal_actor_vector.py`
- Create: `tests/test_mortal_actor_vector.py`

---

### Task 1: Freeze the neutral manifest contract in RED

**Files:**
- Create: `tests/test_mortal_actor_vector.py`
- Create: `specimens/mortal-actor-001/schema/manifest.schema.json`
- Create: `specimens/mortal-actor-001/schema/claims.schema.json`

**Interfaces:**
- Consumes: relative file paths under `specimens/mortal-actor-001/`.
- Produces: `mortal_actor.vector-manifest/v0` and `mortal_actor.claim-set/v0` shape contracts.

- [ ] **Step 1: Write the failing manifest test**

Create a stdlib `unittest` module with constants:

```python
ROOT = Path(__file__).resolve().parents[1]
VECTOR = ROOT / "specimens" / "mortal-actor-001"
MANIFEST = VECTOR / "manifest.json"
FIELD = VECTOR / "case" / "field.3rdi.json"
COMPILES = VECTOR / "case" / "compiles.loadout.json"
CLAIMS = VECTOR / "case" / "claims.alex.json"
ORACLE = VECTOR / "oracle" / "private-oracle.json"
```

Add `test_case_and_oracle_are_physically_separate()` asserting all four paths exist and `ORACLE.parent.name == "oracle"` while the three actor-visible inputs live under `case/`.

Add `test_manifest_binds_owner_dialects_without_embedding_them()` asserting this exact top-level shape:

```python
{
    "schema",
    "vector_id",
    "field_ref",
    "compile_ref",
    "claim_ref",
    "oracle_ref",
    "actors",
    "runs",
}
```

and values:

```text
schema = mortal_actor.vector-manifest/v0
vector_id = FOUR-WITNESSES-ONE-ROOM-001
field_ref = case/field.3rdi.json
compile_ref = case/compiles.loadout.json
claim_ref = case/claims.alex.json
oracle_ref = oracle/private-oracle.json
```

- [ ] **Step 2: Run RED**

```bash
python3 -m unittest tests.test_mortal_actor_vector -v
```

Expected: FAIL because the manifest and vector files do not exist.

- [ ] **Step 3: Add strict JSON Schemas**

`manifest.schema.json` must require the eight manifest keys above, reject extra properties, require actor IDs `A`, `B`, `R`, `N`, and require run objects with:

```text
run_id
actor_id
cut_id
entry_compile_id
evaluation_compile_id
claim_ids
```

`claims.schema.json` must require:

```text
schema = mortal_actor.claim-set/v0
claims[] = {id, subject_id, object_id, predicate, scope, declared_basis_ids}
```

with `predicate` initially restricted to `SUPPORTS` so the first proof rides existing ALEX derivation semantics instead of inventing relation algebra.

- [ ] **Step 4: Create the manifest**

Use these stable runs:

```text
MA-A-A0  actor A  cut A0  C0 -> C0
MA-B-B0  actor B  cut B0  C0 -> C0
MA-R-R0  actor R  cut R0  C0 -> C0
MA-N-N0  actor N  cut N0  C0 -> C0
MA-A-A1  actor A  cut A1  C0 -> C1
```

All five runs reference the same five claim IDs `Q1`–`Q5`.

- [ ] **Step 5: Run tests and commit**

```bash
python3 -m unittest tests.test_mortal_actor_vector -v

git add tests/test_mortal_actor_vector.py specimens/mortal-actor-001/schema specimens/mortal-actor-001/manifest.json
git commit -m "test: freeze MORTAL-ACTOR vector contract"
```

Expected: tests still fail only on missing CASE/ORACLE payloads.

---

### Task 2: Add the 3rdi world CASE with four mortal apertures

**Files:**
- Create: `specimens/mortal-actor-001/case/field.3rdi.json`
- Modify: `tests/test_mortal_actor_vector.py`

**Interfaces:**
- Consumes: `3rdi.field/v0`, including the optional epistemic arrays defined by the 3rdi UNDERSTORY frontier: `contacts`, `attention_events`, `decoder_applications`, `stances`.
- Produces: one immutable synthetic field with cuts `A0`, `B0`, `R0`, `N0`, `A1`.

- [ ] **Step 1: Add RED structural assertions**

Assert `field.schema == "3rdi.field/v0"`, `field_id == "four-witnesses-one-room"`, and exactly 12 occurrence IDs:

```text
room-enter-a0
red-note-placed
blue-key-dropped
lamp-flicker
north-door-click
mirror-scratch
clock-chime-left
clock-chime-right
reader-margin-note
narrator-ledger-open
merge-read
room-return-a1
```

Assert `clock-chime-left` and `clock-chime-right` have identical `occurred_at` timestamps and that no causal edge directly orders one before the other.

- [ ] **Step 2: Write the field payload**

Use one room locus `room:one`. Make `red-note-placed` globally real but unavailable to actor A at `A0`; expose it to `R` and `N`. Expose `blue-key-dropped` to actor B but provide no B contact for it. Expose `mirror-scratch` to actor A and provide an A contact plus an `ignored` attention event. Give narrator `N` a lawful contact/decoder chain over `lamp-flicker` that can support a reasonable but globally false interpretation later captured only in the oracle.

Use historical cuts:

```text
A0  focus/known 2026-08-27T12:00:10Z
B0  focus/known 2026-08-27T12:00:10Z
R0  focus/known 2026-08-27T12:00:10Z
N0  focus/known 2026-08-27T12:00:10Z
A1  focus/known 2026-08-27T12:00:30Z
```

Make `merge-read` occur at `12:00:20Z` and expose the red note to A only from that occurrence forward. `room-return-a1` occurs at `12:00:30Z` and uses the same `room:one` locus as `room-enter-a0`.

- [ ] **Step 3: Encode relevance without laundering support**

Add one relevance edge connecting `mirror-scratch` to `red-note-placed` with an admitted relevance assessment visible to `R` and `N`. Do not create an evidence relation that says the relevance edge itself supports any claim.

Add causal edges only where the fixture truly declares direct precedence, including `merge-read -> room-return-a1`. Do not add an edge between the concurrent chimes.

- [ ] **Step 4: Add epistemic ancestry assertions**

The test must assert:

```python
assert contact_for("mirror-scratch", "A")
assert attention_action_for("mirror-scratch", "A") == "ignored"
assert not contact_for("blue-key-dropped", "B")
```

and every `ignored` event references an existing contact for the same observer.

- [ ] **Step 5: Verify and commit**

```bash
python3 -m unittest tests.test_mortal_actor_vector -v

git add specimens/mortal-actor-001/case/field.3rdi.json tests/test_mortal_actor_vector.py
git commit -m "test: add four-witnesses mortal field"
```

Expected: remaining failures concern missing LOADOUT/ALEX/oracle payloads.

---

### Task 3: Add LOADOUT compile CASE and freeze immutable recompile ancestry

**Files:**
- Create: `specimens/mortal-actor-001/case/compiles.loadout.json`
- Modify: `tests/test_mortal_actor_vector.py`

**Interfaces:**
- Consumes: `loadout.compile/v0` fields already enforced by ALEX's LOADOUT handshake.
- Produces: exact compile records `C0` and `C1` for the vector.

- [ ] **Step 1: Add RED compile assertions**

Require exactly two compiles. `C0.parent_compile_id is None`; `C1.parent_compile_id == "C0"`. Both use the same `effect_fence_ref`, `egress_policy_ref`, and `effective_effects` array. `C1.context_pack_ref` differs from `C0.context_pack_ref` because `merge-read` legitimately opens additional context; permissions do not expand.

- [ ] **Step 2: Create valid compile records**

Use:

```text
C0 world_cut_ref = world-cut:room-before-merge
C0 context_pack_ref = context-pack:room-a0
C1 world_cut_ref = world-cut:room-after-merge
C1 context_pack_ref = context-pack:room-a1
```

Capabilities include `3rdi.project` and `alex.evaluate` as available bindings. Include a fenced `world.write` capability binding but keep `world.write` absent from `effective_effects`; the only allowed effect is `research.read` with attributable authorization metadata.

Compute each `compile_digest` exactly as SHA-256 over canonical JSON of the compile payload before the digest field, matching ALEX `compile_payload_digest()` semantics.

- [ ] **Step 3: Add no-authority-expansion assertions**

Assert:

```python
self.assertEqual(c0["effect_fence_ref"], c1["effect_fence_ref"])
self.assertEqual(c0["effective_effects"], c1["effective_effects"])
self.assertNotEqual(c0["context_pack_ref"], c1["context_pack_ref"])
```

and verify `world.write` is never `allowed` in either compile.

- [ ] **Step 4: Verify and commit**

```bash
python3 -m unittest tests.test_mortal_actor_vector -v

git add specimens/mortal-actor-001/case/compiles.loadout.json tests/test_mortal_actor_vector.py
git commit -m "test: freeze mortal LOADOUT ancestry"
```

---

### Task 4: Add the shared ALEX claims and private oracle

**Files:**
- Create: `specimens/mortal-actor-001/case/claims.alex.json`
- Create: `specimens/mortal-actor-001/oracle/private-oracle.json`
- Modify: `tests/test_mortal_actor_vector.py`

**Interfaces:**
- CASE exposes candidate claims and declared formation basis only.
- ORACLE owns global truth and expected per-run local outcomes; actor-side adapters must never read it.

- [ ] **Step 1: Create five shared claims**

Use:

```text
Q1: red-note-placed SUPPORTS claim-red-note-was-present
Q2: lamp-flicker SUPPORTS claim-door-is-unlocked
Q3: mirror-scratch SUPPORTS claim-red-note-author
Q4: clock-chime-left SUPPORTS claim-left-chime-caused-right
Q5: red-note-placed SUPPORTS claim-a-can-now-identify-note
```

The claim objects themselves are stable ALEX records referenced by `object_id`; `declared_basis_ids` list only actor-asserted basis IDs, never expected outcomes.

- [ ] **Step 2: Create the private oracle**

Use `schema = "mortal_actor.private-oracle/v0"` and global truth:

```text
Q1 true
Q2 false
Q3 unresolved
Q4 false / unsupported causal ordering
Q5 true only as a post-merge capability-of-knowing statement at A1
```

Expected local outcomes must include:

```text
MA-A-A0/Q1 = basis_outside_projection
MA-R-R0/Q1 = local_basis_accept
MA-N-N0/Q2 = local_basis_accept
MA-A-A0/Q3 = local_basis_unresolved
MA-R-R0/Q4 = local_basis_unresolved
MA-A-A0/Q5 = basis_outside_projection
MA-A-A1/Q5 = local_basis_accept
```

The important hostile case is `MA-N-N0/Q2`: local support may be valid while the global oracle says the conclusion is false.

- [ ] **Step 3: Add oracle-leak tests**

Recursively scan every JSON value under `case/` and assert it contains none of these strings:

```text
basis_outside_projection
local_basis_accept
local_basis_unresolved
global_truth
expected_outcome
```

Also assert `manifest.json` stores only `oracle_ref`, never oracle content.

- [ ] **Step 4: Verify and commit**

```bash
python3 -m unittest tests.test_mortal_actor_vector -v

git add specimens/mortal-actor-001/case/claims.alex.json specimens/mortal-actor-001/oracle/private-oracle.json tests/test_mortal_actor_vector.py
git commit -m "test: add mortal claims and sealed oracle"
```

---

### Task 5: Add the neutral verifier and vector documentation

**Files:**
- Create: `tools/verify_mortal_actor_vector.py`
- Create: `specimens/mortal-actor-001/README.md`
- Modify: `tests/test_mortal_actor_vector.py`

**Interfaces:**
- CLI: `python3 tools/verify_mortal_actor_vector.py specimens/mortal-actor-001`
- Exit `0`: structural vector passes.
- Exit non-zero: one or more cross-file invariants fail.

- [ ] **Step 1: Write RED verifier tests**

Test the verifier as imported functions rather than shelling out. Require:

```python
def load_vector(root: Path) -> dict: ...
def validate_vector(vector: dict) -> list[str]: ...
```

Mutations must produce these reason codes:

```text
ORACLE_LEAK
MISSING_ACTOR_CUT
COMPILE_ANCESTRY_INVALID
EFFECT_FENCE_EXPANDED
CONCURRENT_EVENTS_ORDERED
IGNORED_WITHOUT_CONTACT
A0_A1_WORLDLINE_COLLAPSE
```

- [ ] **Step 2: Implement minimal verifier**

`load_vector()` reads the manifest then the four referenced payloads. `validate_vector()` performs only structural/cross-file checks; it must not implement 3rdi projection or ALEX support semantics.

For A0/A1 worldline identity, require the two room occurrences share `locus_id == "room:one"` but have different occurrence IDs and different cut IDs. For concurrency, reject a direct causal edge between the two chime IDs in either direction.

- [ ] **Step 3: Document ownership and execution order**

README must state:

```text
This vector is CASE + ORACLE, not a fourth runtime.
3rdi owns projection truth about the CASE.
LOADOUT owns compile/fence testimony.
ALEX owns semantic evaluation.
The oracle judges the combined proof but is never actor-visible input.
```

Document the later real-proof sequence:

```text
1. validate neutral vector
2. run LOADOUT adapter
3. run 3rdi adapter for A/B/R/N and A1
4. run ALEX LOCAL-SUPPORT-001 over the same claim set
5. compare resulting bundle to private oracle in the neutral harness
```

- [ ] **Step 4: Run full verification**

```bash
python3 tools/verify_mortal_actor_vector.py specimens/mortal-actor-001
python3 -m unittest tests.test_mortal_actor_vector -v
```

Expected: both exit `0`.

- [ ] **Step 5: Commit**

```bash
git add tools/verify_mortal_actor_vector.py specimens/mortal-actor-001/README.md tests/test_mortal_actor_vector.py
git commit -m "feat: verify MORTAL-ACTOR hostile vector"
```

---

## Acceptance Gate

This plan is complete when the neutral vector is deterministic, the private oracle is physically isolated, all structural tests pass, and the fixture can be consumed without any constituent plugin importing code from this repository.

Do **not** add a shared orchestrator in this plan.