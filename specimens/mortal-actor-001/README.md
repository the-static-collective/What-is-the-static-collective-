# FOUR WITNESSES / ONE ROOM

`MORTAL-ACTOR-001` neutral hostile vector.

This directory owns only a synthetic CASE, a sealed ORACLE, and structural cross-stack invariants. It does not own LOADOUT, 3rdi, or ALEX semantics.

Core control: `LOADOUT -> 3rdi -> ALEX`

Core law: **No actor may act from a world they never inhabited.**

The CASE contains owner-dialect inputs only. `oracle/private-oracle.json` contains global truth and expected local outcomes and must never be read by an actor-side adapter. The blind harness may open it only after all CASE receipts have been emitted.

Run:

```bash
python3 -m unittest tests.test_mortal_actor_vector -v
python3 tools/verify_mortal_actor_vector.py specimens/mortal-actor-001
```
