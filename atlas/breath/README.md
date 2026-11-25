# Breath Atlas 026 — exact-branch evidence lens (experimental)

The [Living Git Map](../README.md) owns public Git topology and open-PR observation. **Breath Atlas 026** layers exact-commit source inspection over that existing source. It is **not a separate crawler, deployment inventory, repository taxonomy, certification service, or authority over donor projects**.

The parent public snapshot was captured **2026-10-22T12:58:16+00:00**, containing **86 verified-public repos, 2,026 Git refs and 953 open PRs**. This 026 slice deliberately selects **four** of those public branch heads. The accounts-accessible 102-candidate survey from CANNON 025 was **not ingested**; its visibility was not established at the same public-only gate.

## What is actually inspected

- `planZ`, Phaselift: exact `phaselift/engine.mjs` code and checked-in `engine.test.mjs`, no execution claim.
- `webZ`, Abundent NEEDS release experiment: exact `app/dial.mjs`, no browser/deployment claim.
- `WITNESS`, audio Bible experiment: exact CANON-001 text, documentary only.
- Haunted Blender, 008p: exact branch ref and Git comparison; code contents **not** inspected in this slice.

These are **four branch observations, not four proven runnable integrations**. All tests *of donor code* remain NOT_RUN; linked PR status is open-at-capture only, never merge disposition.

## Run offline

Requires **Python 3.11+** and only standard-library modules.

```sh
python3 -m unittest discover -s tests -p 'test_breath_atlas.py' -v
python3 scripts/breath_atlas_render.py \
  --snapshot atlas/generated/public-index.json \
  --focus atlas/breath/focus-v0.json \
  --observations atlas/breath/observations-v0.json \
  --comparisons atlas/breath/compare-fixtures-v0.json \
  --output /tmp/breath-atlas-026
python3 scripts/breath_atlas_render.py \
  --snapshot atlas/generated/public-index.json \
  --focus atlas/breath/focus-v0.json \
  --observations atlas/breath/observations-v0.json \
  --comparisons atlas/breath/compare-fixtures-v0.json \
  --output /tmp/breath-atlas-026 --check
```

The renderer produces a SHA-addressed, source-linked Markdown inspection page and a machine-readable JSON. `--check` refuses changed or absent generated files. The GitHub PR workflow runs the same bounded proof and **does not execute any donor project**.

Do not place new source observations in these files unless the exact repo/branch commit has been re-checked against a **verified-public** snapshot. The head SHA is not a deployment guarantee; a passing 026 test checks the inspector, not a community act.

If the daily topology snapshot advances, previously selected exact commits remain historical addresses. The `focus` file must be reviewed and explicitly repinned: the public renderer intentionally **HOLDs** rather than silently migrating source evidence to a new head.

## Next proof gates

Review branch source and compare actual changes, inspect linked PR ancestry, perform independently reproducing donor tests in separate isolated environments, then ask source owners whether any capability may be proposed for a real community context. A Coalition interaction, Waseca partner relationship, and Abundent production endpoint cannot be inferred from this software.

**Status:** Experimental read-only lens / source observation; no canon admission or live integrations.
