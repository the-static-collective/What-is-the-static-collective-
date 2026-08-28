# PASSAGE-WORLD-001 hostile vector

`TWO ROADS / ONE DOOR` is a neutral synthetic CASE/ORACLE harness for testing whether attributable interior formation can remain distinguishable when source surface, destination surface, payload, and destination render are held fixed.

The vector is frozen **before owner adapters execute**. The `case/` directory contains only neutral coordinates and comparison policy. The expected outcomes live only under `oracle/`.

The verifier at `tools/verify_passage_world_vector.py` checks cross-file structure, frozen surfaces/payload, policy shape, door-registry shape, receipt-slot uniqueness, and oracle leakage. It does **not** implement LOADOUT compilation, 3rdi projection, ALEX derivation, LOADIN.STEAD routing, destination admission, or PASSAGE-WORLD semantics.

A green structural verification proves only that the hostile vector is internally well formed. It is **not** PASSAGE-WORLD conformance.

`transport_wrapper_id` appears in the neutral comparison policy because a later owner receipt may explicitly mark such a wrapper as non-semantic. The neutral verifier does not strip or normalize that field by itself; the blind coordinator must treat undeclared owner semantics conservatively.
