# jublEchat — Witness Parity Checkpoint

> **Projection freshness**
>
> - **Disposition:** `STALE` as a current-state checkpoint; retained as truthful historical witness.
> - **Canonical source:** `the-static-collective/jublEchat` GitHub PR #2 / repository history.
> - **Source scope:** PR #2 — witness-parity prerequisite repair.
> - **Witnessed source cut:** the earlier draft/open repair state described below; the page did not record an exact head SHA at observation time.
> - **Compared source cut:** PR #2 merged at final head `2cfa7e0f925f5cead3aaeed6683bb831d1b062ba`, merge commit `1d0e04691b13d9bc34ce89b08030bcd0a964f055`.
> - **Checked:** 2026-08-15.
> - **Non-authority:** this checkpoint and its GitBook projection do not decide PR, repository, or runtime state.

**Historical status at the witnessed cut:** partial foundation repair; production persistence boundary remained open.

This checkpoint records prerequisite work for **Find Nearby Growth**. The body below is intentionally preserved as the state witnessed at that earlier cut rather than silently rewritten into present tense.

## Current note — prerequisite subsequently closed

Canonical GitHub later advanced beyond this checkpoint. PR #2 merged after proving exact signed/persisted/replayed identity parity and durable explicit Still Alive evidence. The prerequisite described below is therefore satisfied in current repository history.

Nearby Growth may now build as a read-only projection over explicit lineage/friction evidence, subject to its own issue, tests, and review. This note does not retroactively make the older checkpoint false; it makes the temporal boundary visible.

## What the repair branch now proves structurally

### Canonical integrity input

The event hash treats `_signature_hash` as the result slot rather than input to itself. During hashing, that field is normalized to the empty signing value.

Payload objects are recursively canonicalized by sorted object keys so a PostgreSQL `jsonb` round trip cannot invalidate an otherwise identical record merely by changing object-key order. Array order remains meaningful and is preserved.

### Explicit evidence payloads

Pure authoritative payload builders preserve these fields unchanged:

* `preserved_tensions`
* `unresolved_questions`
* `abandoned_paths`

No semantic inference is introduced. These remain explicit human/history evidence.

### Focused contract specimens

The repair branch now contains tests specifying that:

* a freshly signed event must replay as secure;
* changing signed content must fail integrity verification;
* object-key ordering must not change the hash;
* explicit Still Alive arrays must survive authoritative payload construction.

The original replay defect was reproduced directly: the signing input and replay input produced different hashes because replay included the stored signature value. Canonicalization removes that self-reference.

## What remained open at this witnessed cut

The Express/database transaction still needed to persist the **exact record that was signed**: same event identity, artifact identity, timestamp, version number, and explicit evidence arrays.

The repository connector available during this earlier pass refused writes to SQL migration files, including a schema-only migration. The connected Supabase account exposed in that session did not contain the jublEchat project, so applying the database change out-of-band would not have been lawful evidence of a jublEchat repair.

**At that earlier cut**, PR #2 therefore remained a draft and issue #1 remained open. Canonical GitHub history later superseded that current-state claim by merging PR #2.

## Dependency law for Nearby Growth

The original gate was:

`server-signed event == database-persisted event == canonical replay event`

That gate is now satisfied by the merged PR #2 evidence. Nearby Growth can remain a read-only projection over explicit lineage, active friction, human/graph links, and preserved alternate trajectories before any semantic-proximity lane is added.
