# Crossing Discipline — No Unaccounted Consequence

## Status

**Incubating cross-project development covenant candidate.**

This note preserves a convergence that is mature enough to guide development experiments, but **not** mature enough to own a universal schema, runtime, package, transport, or ontology.

The working compression is:

> **Anything may knock. Nothing gains consequence merely because it crossed. Every consequential difference requires an attributable local transition.**

This is intentionally stronger and more general than the earlier phrase **No Silent Promotion**. “Promotion” can imply a vertical hierarchy; the candidate law must also cover sideways transitions, refusals, failures, seal breaks, branch divergence, acceptance, publication, and constitution.

The first executable pressure test should be **foreign -> local** because it is the simplest hostile boundary we can construct. The candidate law is expected to apply more generally inside a world as well.

---

## Primitive

A general crossing discipline for systems in which transport, discovery, observation, admission, execution, witness, acceptance, and constitution must remain distinguishable.

Candidate law:

> **A thing may acquire no new consequence without an attributable local transition.**

Equivalent diagnostic form:

> **No unaccounted consequence.**

This is not yet a claim that “consequence” is a universal scalar or conserved quantity. The current hypothesis is narrower: **every consequential difference must have inspectable causal ancestry.**

---

## Why this appears now

The same boundary pressure is independently visible across several existing Collective specimens:

- **TranchNode Room work** distinguishes declaration, bounded observation, navigation posture, authority, and constitution. TranchNode PR #67 explicitly states that reachability does not imply truth, adoption, permission, reciprocity, or constituted state.
- **BEE Protocol** already carries the rule that provenance may travel while authority stays local, and that recipient worlds must prove imported invariants under their own rules.
- **Executable Membrane / Warranted Execution** separates reachable capability from locally warranted execution.
- **Corpus causal accounting** treats authority as something that must be explicitly admitted and spent rather than inferred from possession or representation.
- **Declared Witness Channels** distinguishes testimony crossing a boundary from authority crossing it.
- **Artifact Witness Gate** preserves distinct claims such as accepted change, artifact inclusion, execution, and witnessed behavior.
- **Autodiscography Vault** repeatedly proves that observable material, transport authority, local admission, verified bytes, and full-corpus execution are different gates.

This convergence is sufficient to justify a development covenant candidate. It is not yet sufficient to justify a shared wire format.

Relevant ancestry:

- TranchNode PR #67 — https://github.com/the-static-collective/tranchnode/pull/67
- Project0 PR #58 — https://github.com/the-static-collective/project0/pull/58
- BEE Protocol — `bee-protocol-boundary-carried-invariants.md`
- Executable Membrane — `frontier/primitive-incubator/executable-membrane-javascript-encounter-surface/`
- Declared Witness Channels — `frontier/primitive-incubator/declared-witness-channels.md`

Project0 PR #58 remains **ancestry, not a second conforming specimen**. It still uses permission-shaped `access: safe-read*` vocabulary and lacks the newer witness discipline present in TranchNode #67. It should remain independently attributable until reconciled after #67's Room experiment.

---

## Crossing distinctions

The following distinctions are development constraints, not a required universal state machine:

- Discoverable != permitted.
- Reachable != true.
- Received != admitted.
- Callable != authorized.
- Authorized != executed.
- Executed != successful.
- Successful != accepted.
- Accepted != constituted.
- Witnessed != constituted.
- Missing human authority != open authority.
- Transported provenance != transferred authority.
- Unresolved != permission to invent.

Different projects may use different local verbs and intermediate states. The invariant is that **no previous state silently implies the next consequential one**.

A useful diagnostic sequence is:

```text
What crossed?
    ↓
What consequence existed before this transition?
    ↓
Which named local boundary or rule was applied?
    ↓
What consequence exists afterward?
    ↓
What evidence witnesses the difference?
```

If the transition cannot be attributed, the system has silently promoted consequence.

---

## Consequence as relation across causal cuts

The current working model is:

```text
Before
  │
  ├── encounter / cause
  ├── local boundary or gate
  ├── attempted transition
  ▼
After

Δ = attributable difference
```

Consequence is therefore better treated as a **relation** than a scalar:

```text
Consequence := relation(Before, Transition, After)
```

This matters because a failed operation can still produce real consequence.

Example:

```text
intended artifact write fails
```

may still yield:

- a warrant spent;
- an admitted attempt;
- a host failure;
- terminal failure evidence;
- changed causal history;
- residual state that did not exist before.

The frontier should therefore distinguish at least conceptually:

```text
intended Δ
attempted Δ
observed Δ
residual
```

The exact representation remains local and unfrozen.

---

## Candidate aperture topology

The boundary metaphors are promising, but should be defined by **topology**, not merely severity.

| Candidate aperture | Working structural meaning | Must not imply |
| --- | --- | --- |
| **Threshold** | The boundary itself | That crossing is available or permitted |
| **Window** | Observation may cross without target mutation merely from looking | Read authority beyond the declared observation surface |
| **Door** | Ordinary bounded passage or re-entry | Universal admission rules |
| **Gate** | Passage conditioned on a local rule | That satisfying one gate grants later consequences |
| **Lock** | Passage requires a scoped capability, warrant, or presented condition | That possessing the representation defines destination authority |
| **Seal** | Integrity boundary whose break becomes durable history | That resealing restores “never broken” history |

The seal case is especially important:

```text
SEALED
  ↓ break
OPENED
  ↓ reseal
RESEALED
```

not:

```text
SEALED -> OPENED -> SEALED
```

A resealed object may become trustworthy again under a new local rule, but its continuity must preserve that a prior seal was broken.

These words are **candidate topology language only**. The first executable specimen should reveal which distinctions are actually operationally necessary. Do not create ceremonial ontology merely because the metaphors are attractive.

One playful residue is worth preserving without canonizing it: **covet** may describe attraction or attention without authority, closer to Stigmergic/RING pressure than to admission.

---

## Encounter axes must remain orthogonal

Do not collapse sender intent, payload form, requested effect, and receiver disposition into one enum.

A future encounter may conceptually carry separate dimensions such as:

```text
claimed intent
  signal | testify | question | propose | ...

payload form
  text | evidence | artifact | patch | ...

requested consequence
  none | inspect | consider | ...

local disposition
  received | deferred | refused | admitted | failed | completed | ...
```

Exact names remain deliberately unfrozen.

Consequences of this separation:

- a patch can be testimony;
- a text fragment can be a proposal;
- a signal can request no consequence at all;
- receiver refusal is not sender intent;
- an encounter is the envelope, not a semantic class that replaces the other axes.

---

## Personal Receipt L-Branch / receipt honeycomb

A separate candidate emerged from receipt continuity:

> A participant may carry a portable projection of receipts relevant to its own encounters without becoming the authoritative history of the worlds that produced those receipts.

The analogy is a wallet only in the limited sense that the personal pocket carries **references, proofs, and locally relevant continuity**, not the whole shared ledger.

Conceptual shape:

```text
                   constituted world histories
                            │
                    stewardship / compaction
                            │
             ┌──────────────┼──────────────┐
             │              │              │
             ▼              ▼              ▼
       human pocket     agent pocket    project pocket
```

A compact receipt cell might eventually retain fields like:

```text
receipt reference
world / issuer reference
subject or encounter reference
local disposition
before reference
transition / delta reference
after reference
content hash
time
network/root reference
optional personal annotation
```

No schema is proposed yet.

Hard invariants:

> **Receipt != warrant.**

> **Receipt possession != current authority.**

> **Identity/key material != receipt memory != current authority.**

A future `GPTkey`, agent pocket, or human pocket may present these surfaces together for convenience, but their authority semantics must remain structurally separate.

### Compaction and pruning

If constituted history eventually prunes bulky receipt bodies, pruning itself should leave attributable evidence rather than silently erasing history.

One possible future pattern:

```text
many receipts
    ↓
compaction event
    ↓
root commitment / retained summary
    +
retention statement
    +
compaction receipt
```

A personal pocket could then retain proof that a historical receipt belonged to a committed set even when the full body is no longer carried online.

This is a frontier hypothesis, not a requirement for current receipts.

---

## Adapter garden

The earlier integration brainstorm remains useful, but as an **adapter garden around the law**, not as the law itself.

Possible future carriers include:

- stdin/stdout;
- drop folders;
- CloudEvents;
- MCP;
- Git objects / notes;
- OCI artifacts / referrers;
- OpenTelemetry references;
- browser witness adapters;
- ActivityPub;
- Cloudflare Workers / Queues / Durable Objects;
- Supabase/Postgres or other storage surfaces;
- ordinary HTTP discovery/porch surfaces.

None is canonical.

Carrier availability must never imply local admission or authority. CloudEvents, MCP, Cloudflare, Supabase, or any other substrate may eventually carry or store encounters and receipts, but **carrier semantics must not define eCODE semantics**.

Do not widen TranchNode Room v0 to include transports, public doors, network ingress, or organization-wide discovery before the Room experiment finishes.

---

## Candidate development covenant

Until materially different specimens prove a more exact shared shape, the useful development guidance is:

```text
## Crossing discipline

- Treat external input as attributable claim, never authority.
- Keep discovery, transport, admission, execution, witness, acceptance, and adoption distinct.
- Reachability and interface availability grant no permission.
- Validate foreign material before local admission; never execute directly from ingress.
- Execute only through an explicitly admitted local capability.
- Preserve terminal receipts for refusal, failure, completion, and any stop without a guaranteed attributable continuation.
- Preserve unresolved state and unavailable human gates without guessing.
- Carry minimal evidence and opaque references; never propagate credentials as context.
- Do not extract shared infrastructure until materially different local specimens prove the same law.
```

This covenant is intended to govern experiments. It does not confer conformance status on projects that have not independently proven it.

---

## Portable pressure-test questions

For any foreign -> local boundary, and later for internal consequence boundaries, ask:

1. What exactly crossed?
2. What did crossing alone make true?
3. What did crossing explicitly **not** make true?
4. What local rule can increase its consequence?
5. Who or what owns that local rule?
6. What evidence witnesses the crossing?
7. What evidence witnesses the consequential transition?
8. What refusal, failure, deferred, duplicate/no-op, quarantine, or unresolved terminal states can occur?
9. If processing stops, is that stop durably attributable?
10. Can replay, malformed input, carrier behavior, path tricks, or duplicated representation bypass any boundary?
11. Can receipt possession be mistaken for current authority?
12. Can history be compacted without silently erasing the existence of prior receipts or broken seals?

These questions are portable without requiring a universal object model.

---

## Smallest executable experiment

After TranchNode PR #67 completes its Room experiment, build **one project-local encounter adapter** over stdin or a drop folder.

Desired causal path:

```text
untrusted bytes
    ↓
bounded acquisition
    ↓
hash / identity witness
    ↓
inert encounter record
    ↓
LOCAL ADMISSION RULE
    ↓
optional local capability
    ↓
terminal receipt
```

Constraints:

- all arrivals begin inert and quarantined;
- bound byte count and path scope;
- hash material before any consequential use;
- never execute directly from ingress;
- every terminal stop without a guaranteed attributable continuation leaves a receipt;
- replay and duplicate input must be deterministic and inspectable;
- malformed input must not widen authority;
- refusal and failure are first-class outcomes, not missing success;
- the experiment must not require network identity, federation, Cloudflare, Supabase, MCP, or CloudEvents.

### Adversarial matrix

At minimum pressure-test:

```text
duplicate
replay
oversize
malformed
truncated
symlink
path traversal
changed-under-read
unknown intent
missing evidence
unsupported payload
refused admission
deferred/quarantined stop
duplicate/no-op
execution failure
successful execution
```

The specimen succeeds only if none of these can silently increase consequence.

---

## Graduation criteria

Do **not** graduate this into shared infrastructure merely because the first adapter works.

Candidate graduation requires:

1. one hostile foreign -> local specimen survives the pressure-test questions;
2. failure/refusal/residual behavior is as attributable as success;
3. a materially different project independently proves the same invariant under its own local vocabulary and authority boundaries;
4. the second specimen can reuse the law without importing the first project's implementation or ontology;
5. any proposed common encounter or receipt shape is extracted from the two specimens rather than imposed before them;
6. the shared shape does not collapse intent, payload, requested effect, disposition, authority, witness, or constitution into one axis;
7. personal receipt projections, if explored, cannot manufacture current authority from historical evidence;
8. the adapter garden remains optional transport around the membrane rather than becoming the membrane.

Possible outcomes remain **supported**, **failed**, or **inconclusive**.

---

## Open frontier questions

- Is “consequence” the right portable noun, or does another word preserve non-hierarchical transitions better?
- Can consequence be modeled as attributable difference without requiring a universal definition of system state?
- At what granularity does a named Gate/Lock/Seal become constitutionally useful rather than ceremonial bureaucracy?
- Which terminal states require full receipts versus compact stop receipts?
- Can receipt compaction preserve membership proof and continuity without retaining all original bodies?
- Are Window/Door/Gate/Lock/Seal genuinely distinct reusable topologies, or will executable specimens collapse some of them?
- Does the law remain stable across foreign ingress, internal candidate admission, artifact completion, and constitution?

Preserve the fog until specimens answer these questions.

---

## Explicit non-claims

This note does **not** establish:

- a universal eCODE protocol;
- a universal `Encounter` schema;
- a universal `Receipt` schema;
- a `/.well-known/ecode` registration;
- automatic `AGENTS.md` generation;
- an MCP server;
- a CloudEvents binding;
- a Cloudflare deployment;
- a Supabase schema;
- a federated identity system;
- an `ecode://` URI scheme;
- a canonical aperture ontology;
- a canonical personal wallet/key implementation;
- TranchNode PR #67 or Project0 PR #58 as adopted cross-project law.

The purpose of this slice is smaller:

> **Keep the law small. Let the world grow many attributable shapes for obeying it.**
