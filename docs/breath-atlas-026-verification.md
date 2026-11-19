# Breath Atlas 026 — verification record

**Date:** 2026-10-22. **Scope:** first bounded, read-only public Git branch evidence slice on draft PR #101. **Human authority:** none inferred. **Public publication:** not deployed on Abundent or any production website.

## Implemented on isolated review branch

- `scripts/breath_atlas_contract.py`: validates public snapshot, exact branch pins, bounded focus/observations/comparisons, safe source paths, unique evidence IDs, and explicit test reports.
- `scripts/breath_atlas_project.py`: pure branch evidence overlay; matching open PR requires local repo+branch+SHA. Source observation never creates a test or deployment claim.
- `scripts/breath_atlas_render.py`: offline deterministic Markdown/JSON projection; `--check` fails on drift.
- `atlas/breath/*.json`: four exact public branch refs, four exact source-file observations, two separate Git comparison observations.
- `.github/workflows/breath-atlas-026.yml`: builds and checks the report without executing donor code; publishes a temporary PR review artifact.
- `tests/test_breath_atlas.py`: 21 boundary/contract/projection/rendering tests, including private visibility rejection, stale pins, unsafe paths, null fork head, lying test records, PR uncertainty and deterministic replay.

## Verification observed

Local isolated Python 3.13 test environment (miniature four-repository **public-source-derived** snapshot, not the entire Git Map):

```
python3 -m unittest discover -s tests -v
Ran 21 tests ... OK

python3 scripts/breath_atlas_render.py --snapshot atlas/generated/public-index.json \
  --focus atlas/breath/focus-v0.json \
  --observations atlas/breath/observations-v0.json \
  --comparisons atlas/breath/compare-fixtures-v0.json \
  --output atlas/breath/generated
# branches=4, observations=4

python3 scripts/breath_atlas_render.py [same arguments] --check
# check=true
```

**GitHub Actions on full checked-in public snapshot** (Python 3.11):

- [Breath Atlas 026 verification, run 39825467571](https://github.com/the-static-collective/What-is-the-static-collective-/actions/runs/39825467571): **success**.
- [Original Living Git Map contract checks, run 39825467701](https://github.com/the-static-collective/What-is-the-static-collective-/actions/runs/39825467701): **success**.
- Breath workflow emitted **breath-atlas-026-public-evidence** review artifact (Markdown+JSON), temporary retention; not a production-hosted Atlas.

Both remote workflows correspond to commit `a8d2c893d7f12009f3db14d01bf3c7f2f39a22bf`. A later documentation-only commit requires its own checks if regarded as an exact head verification.

## Reproducible limits

- The first evidence lens covers **four public branch heads**, not the whole 2,026-ref public map or the 2,132-ref account-accessible research inventory.
- Four source loci and two compare records were actually read at exact commits. No donor application test or local source build was run.
- `SOURCE_OBSERVED` means source text inspected, not successful execution. A checked-in test file is not a passing test.
- No merged/closed pull request history was researched. Open PRs are valid only at the recorded snapshot time, and only exact head SHA matches are attached.
- Public-only scope excludes account-accessible repositories without independently verified public visibility. No CANNON 025 mixed-visibility source names or contents are ingested.
- The renderer uses the existing atlas snapshot and purposely refuses stale focus pins when the baseline refreshes; manual reconciliation is needed.
- CI green verifies the **Atlas observer and its contracts**, not compatibility of source-native organs, a working community service, an organizational relationship, or human permission.

## Decision gate

Draft PR review and explicit owner adoption are still required. No merge, publication, automatic cross-repo edits, deployment or community assistance is performed by this branch.
