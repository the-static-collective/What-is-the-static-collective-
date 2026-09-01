# ORCHARD v0 — incubation bench

> **THE JOY WAS ALREADY APPROVED.**

ORCHARD is the Static Collective's thin human-experience organ. PICKER is its first interface: give it an already-attributed field, state the kind of fruit you want, and receive useful projections without needing to operate the underlying repo anatomy first.

This `orchard/` subtree is an **incubation location**, not a claim that ORCHARD belongs to the Front Room repository. The connected GitHub surface used for this slice cannot create a new repository. The boundary remains explicit so the organ can move without changing its contracts.

## Non-collapses

```text
ORCHARD != Front Room
ORCHARD != LOADOUT
presentation != authority
selection != support
interesting != true
fruit card != source artifact
basket != canon
route != admission
replay != causal proof
delight != erasure
```

## v0 executable modes

- `good-with-this`
- `weird`
- `resume`
- `unfinished`
- `surprise`

`research` and `make` are future human intents. They are not executable until lawful owner adapters exist.

## Runtime boundary

v0 is local and dependency-free. It has no network calls, server, database, account, authentication layer, cross-repository mutation, automatic publication, or MEMENTO admission. It consumes attributed records supplied to it and emits ORCHARD-local projections and append-only receipts with `authority_claim: none`.

## Development

```bash
npm test
npm run check
```

## Use the CLI bench

All commands are adapters over the shared core in `src/index.mjs`; the CLI owns no ranking semantics.

```bash
node cli.mjs pick --mode surprise --field fixtures/field.json --seed banana-elves --limit 3
node cli.mjs pick --mode unfinished --field fixtures/field.json
node cli.mjs ride --mode weird --field fixtures/field.json --seed peach-pit
```

Portable rides can be continued without rewriting prior operations:

```bash
node cli.mjs continue --ride ride.json --operation '{"type":"basket","fruit_ref":"fruit-maxhinal"}'
```

When a caller supplies `current_field_digest` to the shared ride continuation and it differs from the ride's original digest, ORCHARD preserves the original digest and appends a `field-drift` residual. The current `fnv1a32-*` digest is deterministic drift identity only; it is **not** cryptographic tamper evidence.

## Use the human bench

Serve this directory with any local static-file server and open `/bench/`. For example:

```bash
python3 -m http.server 8765
```

Then open the local `bench/` path in a browser. The bench reads attributed JSON through the browser's local file picker or drag/drop. It does not fetch remote material. `research` and `make` are intentionally visible but disabled until lawful owner adapters exist.

The provenance reveal is one gesture away through **How did this get here?**; the simple surface never changes the underlying authority boundary.
