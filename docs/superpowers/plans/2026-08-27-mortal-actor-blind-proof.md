# MORTAL-ACTOR-001 Blind Cross-Stack Proof Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Prove `MORTAL-ACTOR-001` end to end by combining independently produced LOADOUT, 3rdi, and ALEX receipts for `FOUR WITNESSES / ONE ROOM` and comparing them to a private oracle only after actor-side execution is complete.

**Architecture:** The neutral Static Collective repository owns the blind harness, not a fourth reasoning runtime. The CASE already contains the frozen LOADOUT entry/evaluation compile records, so the harness first validates those records, then 3rdi compiles the observer-local projection, then LOADOUT binds the exact entry/evaluation compiles to that projection, then ALEX evaluates the declared claims. Each organ writes a result artifact in its own handoff dialect. The harness validates cross-receipt identity, assembles a reference-only `mortal_actor.result-bundle/v0`, then reads the private oracle for the first time and compares expected local dispositions. CASE execution cannot import or read the oracle path. The harness never recomputes projection, compile, or semantic support.

**Tech Stack:** Python 3 standard library, JSON, `unittest`, subprocess for invoking pinned constituent CLIs/scripts only after their adapter plans are green.

**Spec:** `docs/superpowers/specs/2026-08-27-mortal-actor-001-common-stack-design.md`

## Global Constraints

- Dependencies: hostile-vector plan, LOADOUT-adapter plan, 3rdi-adapter plan, and ALEX `LOCAL-SUPPORT-001` plan are all green first.
- Constitutional formation remains `LOADOUT C0 -> 3rdi P0 -> LOADOUT C1 when required -> ALEX`; the post-projection LOADOUT binding receipt must not be mistaken for initial compile creation.
- CASE execution must complete before the oracle is opened.
- The harness may validate identity and compare outcomes; it may not implement LOADOUT compilation, 3rdi projection, ALEX derivation, or narrative reasoning.
- `same world != same projection`.
- `same claim != same local supportability`.
- `later truth does not rewrite earlier knowability`.
- `LOADOUT selection != evidence`.
- `3rdi relevance != ALEX support`.
- `ALEX support != authority`.
- Green cross-stack proof does not execute the fenced world action.
- A locally accepted result may correspond to a globally false oracle statement.
- The proof must preserve the prior failing result artifacts if a hostile mutation is tested; do not overwrite failures with repaired runs.

---

## Target Repository and File Map

**Repo:** `the-static-collective/What-is-the-static-collective-`

- Create: `specimens/mortal-actor-001/schema/result-bundle.schema.json`
- Create: `specimens/mortal-actor-001/results/.gitkeep`
- Create: `tools/run_mortal_actor_blind_proof.py`
- Modify: `tools/verify_mortal_actor_vector.py`
- Create: `tests/test_mortal_actor_blind_proof.py`
- Modify: `specimens/mortal-actor-001/README.md`

Generated result JSON under `specimens/mortal-actor-001/results/` is test/run output and should remain uncommitted except for `.gitkeep`; durable proof receipts belong in a separately named evidence path only after a successful reviewed run.

---

### Task 1: Freeze the result-bundle contract in RED

**Files:**
- Create: `specimens/mortal-actor-001/schema/result-bundle.schema.json`
- Create: `tests/test_mortal_actor_blind_proof.py`

**Interfaces:**

```text
mortal_actor.result-bundle/v0
```

contains only references/receipts produced by the three organs.

- [ ] **Step 1: Define the strict bundle shape**

Require top-level keys:

```text
schema
vector_id
case_digest
runs
```

Each run requires:

```text
run_id
actor_id
cut_id
loadout_binding
projection_handoff
claim_results
```

`loadout_binding.schema` must equal `mortal_actor.loadout-binding/v0`.

`projection_handoff.schema` must equal `mortal_actor.3rdi-handoff/v0`.

Each claim result requires:

```text
claim_id
local_disposition
profile
rule_id
cut_id
projection_digest
compile_id
```

with `profile == alex.runtime/local-support-m0` and `rule_id == LOCAL-SUPPORT-001`.

- [ ] **Step 2: Write RED identity tests**

Create an in-test valid bundle builder with stable runs:

```text
MA-A-A0
MA-B-B0
MA-R-R0
MA-N-N0
MA-A-A1
```

Then mutate one dimension at a time and require reason codes:

```text
RUN_ID_MISMATCH
ACTOR_MISMATCH
CUT_MISMATCH
PROJECTION_DIGEST_MISMATCH
EVALUATION_COMPILE_MISMATCH
MISSING_CLAIM_RESULT
```

- [ ] **Step 3: Run RED**

```bash
python3 -m unittest tests.test_mortal_actor_blind_proof -v
```

Expected: FAIL because the blind-proof harness functions do not exist.

- [ ] **Step 4: Commit RED**

```bash
git add specimens/mortal-actor-001/schema/result-bundle.schema.json tests/test_mortal_actor_blind_proof.py
git commit -m "test: freeze mortal result bundle"
```

---

### Task 2: Add reference-only bundle assembly and identity validation

**Files:**
- Create: `tools/run_mortal_actor_blind_proof.py`
- Modify: `tools/verify_mortal_actor_vector.py`
- Test: `tests/test_mortal_actor_blind_proof.py`

**Interfaces:**

```python
def assemble_result_bundle(
    *,
    manifest: dict,
    loadout_results: dict[str, dict],
    projection_results: dict[str, dict],
    alex_results: dict[str, list[dict]],
    case_digest: str,
) -> dict:
    ...


def validate_result_bundle(manifest: dict, bundle: dict) -> list[str]:
    ...
```

- [ ] **Step 1: Assemble by `run_id`, never by list position**

For every manifest run, look up the three organ result sets by exact `run_id`. Missing data raises/records a deterministic reason code. Never zip lists or infer identity from ordering.

- [ ] **Step 2: Validate LOADOUT-to-3rdi binding identity**

Require:

```python
binding["run_id"] == run["run_id"]
binding["actor_id"] == run["actor_id"]
binding["projection_ref"] == handoff["projection_digest"]
```

The binding's evaluation compile ID must equal the manifest's `evaluation_compile_id`.

- [ ] **Step 3: Validate 3rdi-to-ALEX identity**

For every claim result:

```python
claim_result["cut_id"] == handoff["cut_id"]
claim_result["projection_digest"] == handoff["projection_digest"]
claim_result["compile_id"] == binding["evaluation_compile_id"]
```

Require exactly one result for every `(run_id, claim_id)` declared by the manifest; no silent missing claims and no undeclared extras.

- [ ] **Step 4: Preserve no-authority surface**

Recursively reject bundle keys:

```text
authority
canon
admitted
publication
execute
```

The LOADOUT binding's explicit `side_effect_executed` key is permitted only when its value is exactly `false`. No other authority-like state may be normalized into the bundle.

- [ ] **Step 5: Run GREEN identity tests**

```bash
python3 -m unittest tests.test_mortal_actor_blind_proof -v
```

Expected: identity tests pass; oracle-comparison tests are added next.

- [ ] **Step 6: Commit**

```bash
git add tools/run_mortal_actor_blind_proof.py tools/verify_mortal_actor_vector.py tests/test_mortal_actor_blind_proof.py
git commit -m "feat: assemble mortal receipt bundle"
```

---

### Task 3: Enforce CASE-before-ORACLE execution order

**Files:**
- Modify: `tools/run_mortal_actor_blind_proof.py`
- Modify: `tests/test_mortal_actor_blind_proof.py`

**Interfaces:**

```python
def run_case_phase(vector_root: Path, output_root: Path, runners: RunnerSet) -> Path:
    ...

def load_oracle_after_case(vector_root: Path, case_receipt_path: Path) -> dict:
    ...
```

`RunnerSet` is a small injected testable object/dict of callables or commands for LOADOUT, 3rdi, and ALEX; tests use fakes, production uses pinned local commands.

- [ ] **Step 1: Write hostile oracle-access test**

Use fake runners that record every path passed to them. Run `run_case_phase()` and assert none of the recorded paths is inside `oracle/` and no oracle bytes/string values appear in runner arguments or environment overrides supplied by the harness.

- [ ] **Step 2: Emit a sealed case-phase receipt**

After all organ outputs are written, create:

```json
{
  "schema": "mortal_actor.case-phase-receipt/v0",
  "vector_id": "FOUR-WITNESSES-ONE-ROOM-001",
  "case_digest": "sha256:...",
  "completed_runs": ["MA-A-A0", "MA-B-B0", "MA-R-R0", "MA-N-N0", "MA-A-A1"],
  "oracle_opened": false
}
```

Write it last in the CASE phase using atomic temp-file + rename semantics.

- [ ] **Step 3: Gate oracle loading on a complete case receipt**

`load_oracle_after_case()` must reject if:

```text
case receipt missing
oracle_opened is not false
completed_runs differ from manifest runs
case_digest differs from current CASE digest
```

Only after these checks may it read `oracle/private-oracle.json`.

- [ ] **Step 4: Record oracle opening separately**

Do not mutate the case receipt. Emit a new comparison-phase receipt containing the case receipt digest and `oracle_digest`. This preserves formation history instead of rewriting `oracle_opened` to true.

- [ ] **Step 5: Run tests and commit**

```bash
python3 -m unittest tests.test_mortal_actor_blind_proof -v

git add tools/run_mortal_actor_blind_proof.py tests/test_mortal_actor_blind_proof.py
git commit -m "feat: seal CASE before ORACLE"
```

---

### Task 4: Compare local outcomes to the private oracle without laundering global truth

**Files:**
- Modify: `tools/run_mortal_actor_blind_proof.py`
- Modify: `tests/test_mortal_actor_blind_proof.py`

**Interfaces:**

```python
def compare_bundle_to_oracle(bundle: dict, oracle: dict) -> dict:
    ...
```

- [ ] **Step 1: Compare only declared expected local dispositions**

For every oracle entry `(run_id, claim_id)`, locate the corresponding ALEX result and compare `local_disposition`. Return mismatches with:

```text
run_id
claim_id
expected_local_disposition
actual_local_disposition
```

Do not write `global_truth` into the ALEX result or result bundle.

- [ ] **Step 2: Evaluate global-truth hostile assertions only at comparison time**

The comparison receipt may separately state oracle facts such as `Q2 global_truth == false`, but it must verify that `MA-N-N0/Q2` still has `local_basis_accept`. This is the flagship proof:

```text
locally supportable != globally true
```

- [ ] **Step 3: Require all core hostile expectations**

At minimum assert:

```text
MA-A-A0/Q1 = basis_outside_projection
MA-R-R0/Q1 = local_basis_accept
MA-N-N0/Q2 = local_basis_accept while Q2 global truth is false
MA-A-A0/Q3 = local_basis_unresolved
MA-R-R0/Q4 = local_basis_unresolved
MA-A-A0/Q5 = basis_outside_projection
MA-A-A1/Q5 = local_basis_accept
```

Also assert A0 and A1 projection digests differ and A0's stored result remains unchanged after A1 exists.

- [ ] **Step 4: Return proof disposition without authority semantics**

Comparison output:

```python
{
    "schema": "mortal_actor.blind-proof-receipt/v0",
    "vector_id": ...,
    "case_phase_receipt_digest": ...,
    "result_bundle_digest": ...,
    "oracle_digest": ...,
    "disposition": "PASS" or "FAIL",
    "mismatches": [...],
    "invariants": {...},
}
```

The word `PASS` means only “matches the frozen hostile oracle.” It does not mean admission, authority, truth of every claim, or permission to execute.

- [ ] **Step 5: Run tests and commit**

```bash
python3 -m unittest tests.test_mortal_actor_blind_proof -v

git add tools/run_mortal_actor_blind_proof.py tests/test_mortal_actor_blind_proof.py
git commit -m "feat: compare mortal proof to sealed oracle"
```

---

### Task 5: Wire pinned local constituent runners and preserve failures

**Files:**
- Modify: `tools/run_mortal_actor_blind_proof.py`
- Create: `specimens/mortal-actor-001/results/.gitkeep`
- Modify: `tests/test_mortal_actor_blind_proof.py`

**Interfaces:**
- CLI:

```bash
python3 tools/run_mortal_actor_blind_proof.py \
  --vector specimens/mortal-actor-001 \
  --loadout-repo ../ALEX.2 \
  --three-rdi-repo ../3rdi \
  --alex-repo ../ALEX.2 \
  --output /tmp/mortal-actor-001-run
```

The exact adapter script names are those produced by the constituent plans; resolve them once during implementation and encode them explicitly in this file, not by PATH discovery.

- [ ] **Step 1: Validate the frozen LOADOUT compile records before projection**

Before invoking any projection, call the LOADOUT-owned compile-identity helper against the manifest-declared entry/evaluation records. This is compile testimony only: it does not emit the mortal binding yet because the binding requires the eventual projection digest.

If compile identity is invalid, stop before 3rdi and before oracle access.

- [ ] **Step 2: Run each organ in formation order using separate subprocesses**

Use `subprocess.run(..., check=False, capture_output=True, text=True)` with explicit `cwd`. Do not construct a shell command string and do not use `shell=True`.

For each manifest run:

```text
1. 3rdi projection/handoff from the already-frozen C0 world cut
2. LOADOUT mortal binding using that exact projection digest and C0/C1 records
3. ALEX LOCAL-SUPPORT for every declared claim under the binding's evaluation compile
```

The constitutional history remains:

```text
C0 existed first -> P0 -> C1 if the frozen vector says recompile was required -> ALEX
```

The fact that the compact LOADOUT binding receipt is emitted after `P0` is not a claim that LOADOUT entered after 3rdi; it is the receipt that binds prior compile testimony to the observed projection.

- [ ] **Step 3: Fail closed on constituent errors**

If any subprocess exits non-zero or its output JSON fails expected handoff schema/identity checks, stop before oracle loading. Emit a CASE-phase failure receipt with stdout/stderr digests and exact failed stage, but no oracle fields.

- [ ] **Step 4: Preserve failed artifacts**

Every run writes into a unique directory named with a caller-supplied or generated run ID. Never overwrite an existing run directory. A repaired rerun gets a new directory and may reference the prior failure receipt digest.

- [ ] **Step 5: Add fake-runner integration tests**

Use temporary directories and tiny Python fake executables/scripts to prove:

```text
invalid LOADOUT compile stops before 3rdi/ALEX/oracle
nonzero 3rdi stops before LOADOUT binding/ALEX/oracle
nonzero LOADOUT binding stops before ALEX/oracle
nonzero ALEX stops before oracle
all-green CASE opens oracle only after bundle validation
```

- [ ] **Step 6: Run tests and commit**

```bash
python3 -m unittest tests.test_mortal_actor_blind_proof -v

git add tools/run_mortal_actor_blind_proof.py specimens/mortal-actor-001/results/.gitkeep tests/test_mortal_actor_blind_proof.py
git commit -m "feat: run blind mortal proof"
```

---

### Task 6: Run the actual hostile proof and preserve its receipt

**Files:**
- Modify: `specimens/mortal-actor-001/README.md`
- Create after a successful run: `evidence/mortal-actor-001/<run-id>/blind-proof-receipt.json`
- Create after a successful run: `evidence/mortal-actor-001/<run-id>/provenance.md`

**Interfaces:**
- Consumes: reviewed green constituent branches/commits.
- Produces: durable proof receipt pinned to exact commits and vector digest.

- [ ] **Step 1: Record exact constituent commits before execution**

The provenance file must contain:

```text
neutral vector commit
LOADOUT adapter commit
3rdi adapter commit
ALEX LOCAL-SUPPORT commit
Python version
full CLI invocation
```

Do not use floating branch names as the durable identity.

- [ ] **Step 2: Run structural vector verification first**

```bash
python3 tools/verify_mortal_actor_vector.py specimens/mortal-actor-001
```

Expected: exit `0`.

- [ ] **Step 3: Run the blind proof**

Use the CLI from Task 5 against checkouts pinned to the recorded commits.

Expected final comparison disposition: `PASS` with zero mismatches and all required hostile invariants true.

- [ ] **Step 4: Copy only durable receipts, not transient hidden CASE data**

Preserve the blind-proof receipt, case-phase receipt digest, result-bundle digest, oracle digest, and provenance. Do not duplicate the private oracle contents into the evidence directory.

- [ ] **Step 5: Verify evidence identity and commit**

Add a test or verifier invocation that recomputes every recorded digest from the pinned files, then:

```bash
git add evidence/mortal-actor-001/<run-id> specimens/mortal-actor-001/README.md
git commit -m "proof: seal MORTAL-ACTOR-001 blind witness"
```

---

## Acceptance Gate

`MORTAL-ACTOR-001` passes Gate D only when CASE completes without oracle access, the three independent organ receipts bind to the same declared mortal run identities, all frozen local dispositions match the private oracle, the locally-supported-but-globally-false hostile case succeeds, A0 remains unchanged after A1, and no effect is executed.

A green Gate D still does **not** authorize the next eCODE/owning-world consequence gate. That is a later, separately approved frontier.