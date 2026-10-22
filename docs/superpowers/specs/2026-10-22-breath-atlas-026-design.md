# STACK² 026 — THE BREATH ATLAS
## Branch-first capability archaeology, public-safe design

**Design status:** DRAFT FOR OWNER REVIEW. **Date:** 2026-10-22. **Owner of this document:** The Static Collective public Living Git Map. **Implementation status:** DESIGN ONLY; this branch changes no source code, no source repositories, no CI, and no public-generated atlas snapshots.

> A repository is land. A branch is a road. An actual implementation, reproducible test, or witnessed use may establish what traveled it. A README is a signpost—not a substitute for walking the road.

## 1. Human intent and success criteria

The human wants to uncover *every still-useful component across the Collective's Git history*, especially work that survives on nondefault branches rather than stale root READMEs, and explore voluntary combinations that may help the community (Greater Mankato Coalition of Care, Waseca community-food possibilities, local culture). The outcome must be a **living, navigable evidence atlas of branch-level capabilities**, not another centralized program claiming to own projects or a 2,000-branch mass merge.

The first successful slice lets a human ask:

1. What branches still exist in this *verified public* repository and which exact commit does each point to?
2. Which code, executable fixtures, tests, and artifacts have we **actually inspected** on one selected branch?
3. Is this claim only a name/README inference, direct source observation, successful reproducible execution, or an independently documented real-world act?
4. Which branch/PR relationships have been established and which remain UNKNOWN?
5. What possible connection could help a particular human community request—without falsely asserting ready integration or permission?

A public viewer may access exact source links and see UNKNOWN/HOLD. All new output can be recomputed deterministically from a bounded source snapshot and accepted inspection records.

## 2. Discovery: the existing atlas already exists

The project-owner source is `What-is-the-static-collective-`, which currently includes:

- `scripts/refresh_git_atlas.py`: public-only GitHub repository, branch and *open* PR collector; validates public visibility and rejects off-owner repos; emits public topology, delta and relations.
- `atlas/generated/public-index.json`: observed at **2026-10-22T12:58:16+00:00**; **86 verified public repositories**, **2,026 branch refs**, **953 open PRs**.
- `atlas/generated/delta.json` and `delta.md`: exact ref/pointer/open-PR changes between captures, not inferred merge state.
- `atlas/relations.json`: curated, explicitly source-linked cross-repo relation claims, not automatic adoption.
- `atlas/README.md`: human navigation shelves; a *map*, not owning-project code authority.
- `tests/test_refresh_git_atlas.py` and `.github/workflows/refresh-git-atlas.yml`: contract tests and scheduled collector.

Another experimental census, in CANNON's STACK² 025 branch, surveyed **102 accessible candidate repository addresses and 2,132 refs**. That larger list came from account-accessible repositories, **not a verified public-only query**. A comparison against this atlas's public inventory found **17 candidate addresses not present in the public snapshot**; snapshot absence alone does not determine visibility. **DO NOT ingest, copy, render, publish, or link that candidate-only set into the public Atlas.** Resolve individual repos by current authoritative public visibility checks first. Previously committed publicly accessible candidate metadata needs a separate privacy review; modifying the latest branch cannot erase earlier Git history.

### Correction to our earlier approach

`community-breath-census.json` in CANNON 025 contains partial default-README observations and speculative lanes. These are NOT a project-capability catalog. This design uses the *verified public Living Git Map as a bounded observation floor*, never the 102 candidate census as a public feed.

## 3. Approaches evaluated

**A — Enrich the existing Living Git Map (SELECTED).** Reuse its public-only collector, known snapshot schema, GitBook navigation, delta machinery, provenance controls, and tests. Add a strictly separate evidence overlay. Advantages: no competing global index and less privacy risk; smallest operational scope. Tradeoff: public-scope by default; private work requires a separate, nonpublishing local design.

**B — Build the atlas within CANNON.** Direct access to eight-organ synthetic composition and the 025 branch scans. Advantage: proximity to the community experiment. Disadvantages: CANNON's public branch already contains a mixed-visibility candidate inventory; new authority confusion; duplicate indexes. CANNON may propose **candidate crossings downstream**, but does not own the source inventory.

**C — Create a new all-purpose atlas app/repository.** Advantage: independent web UI and freedom of implementation. Disadvantages: third repository index, duplicate rate-limited GitHub crawling, poor provenance and larger security review. Reject for initial slice.

**Decision:** The public Living Git Map owns **discovery**; branch-owning repos own **facts and tests**; planZ owns **plans**; CANNON may own a **proposed composition**; a future local community steward decides whether a real crossing occurs.

## 4. First implementation slice: SOURCE / BRANCH / WITNESS

The first build is intentionally **three independent Python modules**, one public-safe JSON projection and one GitBook-compatible Markdown report. No webapp, dependency resolver, agent swarm, cloud service or new database.

### 4.1 Inputs

- `atlas/generated/public-index.json`: authoritative **bounded existing** public repo/ref/open PR snapshot (do not rescan the whole org in this module).
- `atlas/breath/focus-v0.json`: an allowlist of ~4–8 specifically chosen **public** repo/branch names and exact expected head SHAs derived from the snapshot. Example field pilots may consider webZ, BananaSpork, planZ, CANNON, static-live, and Haunted Blender; mere suggestions confer no classification.
- `atlas/breath/observations-v0.json`: **human- or operator-reviewed** inspection observations, each with exact repo name, branch name, commit SHA, file path, content hash if independently fetched, observation method and timestamp, declared uncertainty.
- `atlas/breath/relations-v0.json`: optional **proposals**, with evidence pointers for comparisons and cross-branch relations. No automatic partner/adopter edge.
- Optional `atlas/breath/compare-fixtures-v0.json` holds **exact** GitHub compare replies for focus refs, supplied during separate bounded read-only inspection. It is not required to render a valid HOLD result.

No access tokens, personal information, unverified private repo names, automatic remote-API calls, hidden secrets or local nonpublic material in committed public fixtures.

### 4.2 Modules and responsibilities

**`scripts/breath_atlas_contract.py`** owns strict validation: public repo allowlist, snapshot version, exact SHA pin, visible branch membership, safe path/URL construction, observation method vocabulary, refusal of unrecognized fields, duplicate/colliding IDs, incompatible commit provenance and stale observation. It emits structured **REFUSE / HOLD** errors without altering source data. One valid object is not an authorization decision.

**`scripts/breath_atlas_project.py`** owns deterministic pure derivation: does not fetch remote URLs, read arbitrary paths or execute donor code. Outputs an evidence index with each branch's exact source link, attached matching open PRs, observed source-file signals, unresolved questions and proposed relations. Missing file inspection => `CONTENT_NOT_INSPECTED`; missing run => `TEST_NOT_RUN`; unresolved PR => `PR_DISPOSITION_UNKNOWN`.

**`scripts/breath_atlas_render.py`** renders `atlas/breath/generated/public-branch-capabilities.json` and `atlas/breath/generated/README.md`. The human-facing page must display the evidence ladder and scoped coverage in its introduction. Each claim links to a public file pinned to a SHA, not merely a branch ref whose head can move.

**No module** owns external changes, auto-acceptance, live deployment, or admission into CANNON.

### 4.3 Data contract

```text
RepositoryObservation
  owner, name, visibility='public', capture_id
       ↓
BranchHead
  ref, exact_head_sha, captured_at
       ↓
Inspection
  inspected_commit_sha, file_path, content_sha_or_null,
  evidence_class (CODE / TEST / FIXTURE / DOC / ASSET / BUILD / CI),
  method (EXACT_SOURCE_READ / COMPARE_FILESTAT / VERIFIED_TEST_OUTPUT),
  source_locator, observation_time, note, uncertainty
       ↓
CapabilityCandidate
  human-readable bounded claim + inspected evidence IDs
  (PROPOSED / SOURCE_OBSERVED / TESTED_IN_DECLARED_ENV / FIELD_WITNESSED)
       ↓
Owner disposition (kept outside auto-projection)
  owner, locally declared scope, acceptance/refusal,
  exact source, separate receipt.
```

A capability is **not silently asserted** from `branch.name`, `README.md`, stars, PR counts, file counts, commit counts, CI badge or semantic similarity. A branch with 345 commits is not more mature than one with 1.

A `TESTED_IN_DECLARED_ENV` claim requires actual command, toolchain, timestamp, successful exit, source ref and inspectable evidence. A `FIELD_WITNESSED` claim requires separate human source and consent to publication; the first implementation slice will not generate these claims automatically.

**Important:** candidate labels are epistemic status only, not acceptance, release readiness or adoption.

### 4.4 Relation vocabulary and source ancestry

Keep at least three separable relationships:
- **Git ancestry:** `ahead`, `behind`, `diverged`, `equivalent_tip`, `UNKNOWN`, with exact compared SHAs and compare capture source.
- **PR relation:** `open_head_exact_match`, `open_other_head`, `NO_MATCHING_OPEN_PR`, `UNKNOWN_CLOSED_OR_MERGED_HISTORY`. Never infer merge status from absence from open PR set.
- **Capability relation:** `candidate_adapter`, `described_dependency`, `tested_crossing`, `conflict`, `UNKNOWN`, with independent evidence and owning-source status. Human proposal does not automatically set `tested_crossing`.

A report must preserve multiple incompatible experiments and **must not pick a winning branch**. The same branch may support many claims; one capability may have separate implementations across branches.

### 4.5 Minimal outputs for first acceptance

- Focus inventory with up to eight selected public repos and a finite inspected-branch budget (initially **at most 24 branch heads**, selected deliberately).
- For every focus branch: permalink to exact SHA, file-level evidence if inspected, latest snapshot observation time, matching open PRs if any, explicit uninspected fields.
- A **branch comparison panel** driven only by explicitly provided compare fixtures, never fabricated from default names.
- A **community-fit worksheet** with only `OFFER`, `NEED`, `BUILD` themes and *proposed* capabilities; all human-partner, money, personal-data and deployment fields remain unpopulated unless separately authorized.
- Both machine JSON and readable Markdown, deterministic byte-for-byte given the same inputs, with SHA-256 digest and source snapshot hash.

## 5. Refresh strategy, cost and privacy

- The existing Git Map scheduled workflow remains the **sole public topology producer**; 026 must not introduce another concurrent full-org GitHub sweeper.
- Step 1 reads its latest validated snapshot; step 2 builds a bounded focus plan; step 3 uses a separate **manual/approved** inspect step to fetch selected exact file contents and compare evidence; step 4 rerenders offline.
- A previously selected branch that moves to a new SHA becomes `STALE_PIN_HOLD`. Never reuse its source inspection as though it covered the new tip; old evidence stays addressable by exact commit.
- API 403/404/rate-limit, hidden repo, oversized response and truncated pagination become explicit HOLD with retained old observations, never fabricated emptiness.
- Public filtering is mandatory **before enumeration and rendering**. A public projection must never use private repo **names** or branch refs merely because connected account tooling could read them.
- Treat source README statements as editorial testimony, not authority to run code or claim field readiness. Preserve both source and why an inference was made.
- Do not copy personal need narratives, participant contact information, project secrets or private snapshots into public output.

## 6. Tests and acceptance gates

Using Python 3.11+ built-ins and the existing repo test conventions, add `tests/test_breath_atlas.py` with fixtures designed to fail before the implementation:

1. Private/missing-visibility repo is rejected; cannot cross from mixed CANNON 025 candidates into the public map by accident.
2. An observed branch must be present in the exact public snapshot and use its exact head SHA.
3. Uninspected branch yields UNKNOWN, not SOURCE_OBSERVED.
4. A branch that moved produces STALE_PIN_HOLD; old evidence persists with its original SHA.
5. A PR on a different head SHA must not be represented as an exact match; absence of an open PR never means merged.
6. Two proposals for the same capability preserve both source lineages and disagreements.
7. A documentation file cannot alone produce TESTED_IN_DECLARED_ENV.
8. A synthetic successful test run can generate only a **synthetic/fixture** claim and never a real field witness.
9. Unknown fields, unsafe paths and duplicate evidence IDs fail closed.
10. Rendering is deterministic, input-reproducible, and no external HTTP, CI or donor execution is performed.
11. Bounded focus selection never silently expands to every repo/branch.
12. `python3 -m unittest discover -s tests -v` and public collector tests still pass. Existing `atlas/generated/` content stays untouched in this slice.

### Independent visual/readability check
A human should be able to find an exact branch, inspect its evidence, and identify uncertainty and the next safe action within two minutes. The reader must not mistake source-code presence for deployment.

## 7. Delivery sequence and boundaries

**Design gate (now):** owner reviews this document. No 026 implementation yet.

**Plan gate:** Superpowers implementation plan after design approval; tasks should be small (contract + hostile tests → pure projector + tests → renderer + smoke verification → bounded inspected focus).

**Implementation gate:** isolated feature branch in `What-is-the-static-collective-`; no code copied into or mutated within donor repositories; no operation that executes donor software.

**Human proof gate:** choose one community-relevant capability *from real inspected source and tests*, propose one source-native crossing for local owner review, then independently test its actual field usefulness.

The first 026 slice is **not** a new crawler, an automated full-code auditor, a readiness certification, a public identity catalog, a deployment service, an AI-agent orchestration layer or a promise that every branch currently functions.

## 8. Residual uncertainties to preserve

- The exact subset of account-visible 102 candidates eligible for the public lens is **unverified**; the observed 86-public snapshot is the approved discovery boundary, not a claim that other work does not exist.
- The snapshot's 953 open PRs do not cover closed/merged PR history; branch → PR disposition remains UNKNOWN until a bounded additional look-up.
- Some branch refs may point at shared commits or stacked dependency sequences; ref count does not equal independent implementations.
- Source freshness and actual passing test results are mostly unexamined.
- The public 025 branch's candidate-only evidence requires separate visibility/privacy review before any reuse.
- User's intended next build may prioritize a specific cluster, but this spec does not force a long-term category taxonomy.

## 9. Constitutional invariant

```text
REF != SOURCE CONTENT
SOURCE CONTENT != WORKING IMPLEMENTATION
WORKING IMPLEMENTATION != FIELD PROOF
FIELD PROOF != HUMAN CONSENT
PUBLIC DISCOVERY != ADMISSION
PR STATUS != CODE MATURITY
CORRELATED IDEAS != SHARED AUTHORITY

THE CODE MAY BE IN THE BRANCH.
THE AUTHORITY STILL BELONGS TO ITS OWNER.
```

**User review request:** Confirm or correct this design, particularly the decision to extend the existing *public Living Git Map* first while keeping unverified/private branch archaeology separate.
