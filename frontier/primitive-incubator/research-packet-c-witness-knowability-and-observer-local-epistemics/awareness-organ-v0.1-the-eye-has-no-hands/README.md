# Awareness Organ v0.1 — The Eye Has No Hands

> **Status:** CANDIDATE · implemented and reviewed in GitHub draft PR #26. Awareness remains incubating; implementation completion is not primitive promotion.

Source/review surface: [GitHub PR #26](https://github.com/the-static-collective/What-is-the-static-collective-/pull/26)\
Exact implementation head: `24510a03b22e092c7ce3d537b75b437d2fa6f2af`

## Finding

The first whole-world audit exposed a missing organ between local project authority and reader-visible projection:

> **Awareness senses the relationship between a witness and its declared source. It does not govern the source.**

The ecosystem has deliberately local authority, while projections age at different speeds. A `PROJECT_STATUS` can truthfully describe an earlier main, GitBook can be fresher about one project while stale about another, a PR can be machine-ready but human-held, and missing/conflicting evidence can remain fog.

Awareness makes those relationships visible without resolving them by force.

## Implemented v0.1 shape

```
project-owned canonical sources
        +
reader-visible projections
        +
human-gate observations
        ↓
scoped comparison
        ↓
fresh / stale / unverified + fog
        ↓
immutable dated World Cut
        ↓
human / agent attention
```

There is deliberately **no arrow back into project state**.

The implementation is a one-shot CommonJS tool under `tools/awareness/`. It validates explicit source scopes, performs read-only source-cut comparison, preserves partial failure as `unverified`/fog, records human gates without dispositioning them, and emits deterministic JSON + Markdown artifacts with SHA-256 receipts.

Default CLI output is stdout. Local files are written only to an explicitly named output directory and existing targets are never overwritten.

## The hand boundary

Awareness may read exact heads, compare declared cuts, expose drift, preserve unresolved fog, show human-held gates, and emit a dated witness.

It may **not**:

* mutate project state;
* auto-refresh `PROJECT_STATUS`;
* merge or release;
* close or disposition a human gate;
* promote a primitive;
* poll continuously or become a daemon;
* treat newest activity anywhere as current for every scope;
* become a global current-state database or master narrator;
* outrank project-owned canonical sources.

## World Cut 001

The original `Constituted World Atlas — August 2026` remains preserved unchanged as **World Cut 001**. Its stale claims, mistakes, fog, and exact evidence cut belong to the witness rather than being silently rewritten.

## World Cut 002 — first executable specimen

World Cut 002 was produced at `2026-08-20T23:31:44Z` over the declared `constitutional-core-v0` five-project status mesh.

World Cut ID:

`wcv0_456c4b94dcd4c8d24cf7bfb639b32f8ab7ec4460f4fb13135f34c96fe7e438c1`

Actual result:

* **5 stale** projections;
* **0 fresh** projections;
* **0 unverified** projections;
* one real human-held gate: Autodiscography Vault PR #9 one-real-WAV gate, preserved as `human-gated / not-attempted`;
* one explicit environment fog record: this run replayed fresh GitHub connector evidence through the deterministic fixture lane because the runtime could not execute the live `gh api` subprocess.

The all-stale result is evidence, not a defect to cosmetically fix. No source was changed to manufacture the `fresh` specimen required for promotion.

## Promotion-gate matrix

| Gate                                                                                        | Status                                        |
| ------------------------------------------------------------------------------------------- | --------------------------------------------- |
| World Cut 001 preserved with verified integrity                                             | **met**                                       |
| deterministic one-shot observer emits a later World Cut                                     | **met via fixture/replay lane**               |
| later cut naturally contains both fresh and stale/unverified                                | **open — Cut 002 has five stale, zero fresh** |
| human-held gate remains visible without project disposition                                 | **met — Vault #9**                            |
| explicit Cut 001 → Cut 002 comparison proves changing currentness without rewriting history | **open**                                      |
| failed comparison cannot become `fresh`                                                     | **met by hostile test**                       |
| activity outside declared source scope cannot stale another projection                      | **met by hostile test**                       |
| live GitHub adapter exercised end-to-end                                                    | **open / environmental**                      |
| Riqor assured run                                                                           | **open / environmental**                      |

Final locally available Awareness suite: **40/40 passing**.

**Promotion verdict:** the implementation candidate is review-ready; **Awareness remains in the Primitive Incubator**.

## Relationship to existing organs

**Projection Is Witness** provides the authority boundary. **Projection Freshness Witness** provides scoped temporal honesty. **Human Witness Relay** carries attributable human evidence but cannot manufacture or close the underlying gate.

Awareness composes those abilities across a declared ecosystem slice. It does not replace them.

## Governing compression

> **The world may be locally governed and still become globally observable. The eye may know where the map is stale without acquiring hands to redraw the territory.**
