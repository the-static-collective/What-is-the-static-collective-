# jublEchat — Witness Parity Checkpoint

**Status:** partial foundation repair; production persistence boundary remains open.

This checkpoint records prerequisite work for **Find Nearby Growth**. It does not declare the feature or the production witness path complete.

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

## What remains open

The Express/database transaction still needs to persist the **exact record that was signed**: same event identity, artifact identity, timestamp, version number, and explicit evidence arrays.

The current repository connector refuses writes to SQL migration files, including a schema-only migration. The connected Supabase account exposed in this session does not contain the jublEchat project, so applying the database change out-of-band would not be lawful evidence of a jublEchat repair.

Therefore PR #2 remains a draft and issue #1 remains open.

## Dependency law for Nearby Growth

Do not build production Nearby Growth on this evidence until the authoritative write path proves:

`server-signed event == database-persisted event == canonical replay event`

After that floor is mechanically witnessed, Nearby Growth can remain a read-only projection over explicit lineage, active friction, human/graph links, and preserved alternate trajectories before any semantic-proximity lane is added.
