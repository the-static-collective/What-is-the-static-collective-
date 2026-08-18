# Human Witness Relay v0 — design

## Status

Approved concept; design-only slice. Runtime implementation is intentionally deferred until this written contract is reviewed.

## Problem

Several Static Collective projects now reach a point where automated checks are green but one bounded human action remains necessary before the next lawful step can proceed.

Today those actions are high-value but low-leverage: a person performs the test, then the result is manually re-described into a pull request, issue, project-status projection, GitBook witness, or follow-on implementation packet.

That makes the human the message bus.

The first two proving grounds are already live:

1. Haunted Toaster PR #146 requires a three-specimen packaged field witness against one exact implementation head.
2. Autodiscography Vault PR #9 requires one real signed-in Suno WAV preservation witness against one exact implementation head.

The design goal is to let one human observation enter once and become reusable evidence everywhere it lawfully belongs without creating a new central authority.

## Governing law

> One human observation enters once and gets routed many times. It does not have to be retold many times.

The relay transports evidence. It does not manufacture authority.

A human witness can influence or satisfy an owning project's gate only through that project's own admission/disposition rules.

## Core distinction

The relay must preserve three different things:

```text
human observation
    !=
project-local disposition
    !=
cross-project projection
```

A person may report:

> Dense specimen retained internal structure and did not wash out.

The Haunted Toaster project may then decide that this satisfies one field criterion for PR #146.

A GitBook projection may later record that the renderer trust gate was witnessed.

Those are related events, not one interchangeable fact.

## Architectural shape

```text
                 HUMAN ACT
                    |
          exact head + exact artifact
                    |
                    v
              WITNESS EVENT
         +----------+----------+
         |          |          |
       PASS       FAIL      AMBIGUOUS
         |          |          |
         v          v          v
 project-local   isolate     preserve
 disposition       seam         fog
         |          |          |
         +----------+----------+
                    |
                    v
             CANONICAL EVIDENCE
                GitHub first
                    |
        +-----------+------------+
        v           v            v
 PR Completion   PROJECT_     GitBook
 exact-head      STATUS       witness
 readiness       projection   projection
        |
        v
       NEXT
    LAWFUL DOOR
```

The diagram is descriptive, not an authority chain. Each target remains free to refuse, narrow, or reinterpret an incoming witness according to its own contract.

## v0 transport object

Introduce a small portable envelope conceptually named `HumanWitnessEvent`.

Exact implementation language and file placement belong to the implementation plan. The semantic shape is:

```ts
interface HumanWitnessEventV0 {
  schema: "static-collective/human-witness-event/v0";

  subject: {
    repository: string;
    pullRequest?: number;
    issue?: number;
    headSha: string;
    gateId: string;
    artifactRefs?: string[];
    buildRefs?: string[];
  };

  witness: {
    observedAt: string;
    observerRef: string;
    observation: string;
    disposition: "pass" | "fail" | "ambiguous";
  };

  evidenceRefs: string[];

  provenance: {
    captureSurface: string;
    relayPolicy: "human-witness-relay-v0";
  };
}
```

This is a transport envelope only.

### Required semantics

- `headSha` is mandatory. A witness must bind to exact executable state.
- `gateId` names the project-owned criterion or gate being witnessed.
- `artifactRefs` and `buildRefs` are optional because not every witness is artifact-backed, but when a packaged build or receipt exists it should be referenced.
- `observation` preserves the human's own bounded report. It should not be silently rewritten into a stronger claim.
- `disposition` is the human/relay classification of the observed event, not proof that the owning project's gate has closed.
- `evidenceRefs` point to concrete receipts, screenshots, logs, files, workflow artifacts, or other bounded supporting material when available.
- `captureSurface` records where the observation entered, such as chat, CLI, local witness form, or repository comment.
- No credential, reusable session material, signed URL, authorization header, cookie, token, or private browser state may enter the envelope.

## Why the envelope is intentionally small

Do not create a universal ontology for all field evidence.

The relay needs only enough structure to answer:

- What exact thing was tested?
- Against what exact executable state?
- Which project-owned gate did the observation concern?
- What did the human actually observe?
- What supporting evidence exists?
- Where did the observation enter?

Everything else belongs in the owning project or a later projection.

## Routing boundary

The relay may perform deterministic routing based on declared target metadata.

Conceptually:

```text
HumanWitnessEvent
    -> target adapter
    -> project-owned evidence surface
    -> project-owned disposition
    -> optional projections
```

### Allowed v0 destinations

1. **Owning GitHub PR / issue** — primary evidence sink for the executable project.
2. **PR Completion readiness input** — only after project-local criteria say the witness satisfies the required gate and exact-head freshness remains valid.
3. **Machine-readable project-status projection** — only after the owning project records a new state worth projecting.
4. **GitBook witness/projection** — only after project-owned evidence exists; GitBook must not become the first or sole authority for executable claims.
5. **Follow-on engineering handoff** — fail/ambiguous events may seed a bounded bug/repair issue, preserving the original witness and exact head.

### Forbidden v0 behavior

- no central witness database that becomes authoritative over projects;
- no automatic merge or release because a witness says `pass`;
- no silent gate closure;
- no automatic weakening of project criteria;
- no model-generated replacement for the human observation;
- no cross-project mutation triggered solely by an inferred relationship;
- no secret/session capture;
- no requirement that every project adopt the envelope before the first proof.

## Project adapters

v0 proves the relay through exactly two project-specific adapters or equivalent translation paths.

### Adapter A — Haunted Toaster PR #146

Target gate: packaged elastic-topology-response field witness.

Required specimen identities:

1. quiet / spacious;
2. dense / mastered / distorted;
3. Linear positive control.

Each observation must bind to the exact PR head/build artifact under test.

The relay should support multiple events for one gate because the three specimens are independently meaningful.

The Toaster adapter may translate those events into the PR's existing field criteria, but the relay itself must not decide that the renderer trust gate is closed.

A fail or ambiguous result must remain attached to the exact specimen and should be usable as the evidence packet for a renderer-repair issue without mixing the future beta candidate-ecology work into that repair.

### Adapter B — Autodiscography Vault PR #9

Target gate: one-real-WAV human preservation witness.

The event must bind at minimum to:

- exact PR head;
- provider track identity already exposed by the live witness surface;
- run identity where available;
- selected Vault root / admitted artifact reference without leaking sensitive local secrets;
- final receipt/hash evidence.

The human observation and machine verification remain distinct.

A successful event may support the project-local conclusion that the one-WAV gate passed only after the existing RIFF/WAVE or RF64/WAVE admission, SHA-256, byte-length, durable-journal, destination, and no-session-material criteria are also satisfied.

The relay must never treat a successful browser download alone as successful preservation.

## Data flow

### Capture

The first useful implementation should accept a low-friction human report rather than require a large form.

Examples:

```text
"dense one: way better; still gets huge but never turns into a white field"
```

or

```text
"WAV landed on E:, receipt and independent hash match"
```

The capture layer may ask for or infer only metadata that is already deterministically available from the active test context, such as current PR, exact head, known build, or armed gate.

It must never fabricate missing execution identity.

### Normalize

Normalize the event into the small transport envelope while preserving the original human text.

If exact identity cannot be established, disposition is not upgraded; the event remains incomplete/ambiguous and must not be routed as satisfying a gate.

### Route

Send the event to the owning project's evidence surface first.

Only after the owning project records a disposition may downstream projections update.

### Illuminate

After a project-local state changes, derive the smallest next lawful door.

Examples:

```text
Toaster renderer trust witnessed
  -> beta candidate ecology implementation may begin
```

```text
Vault one-WAV gate witnessed
  -> reserved live-boundary adjudication now has a real specimen
```

The next-door projection is advisory. It does not authorize implementation, merge, release, or cross-repo authority transfer.

## Error and ambiguity handling

### Missing exact head

Refuse gate-satisfying routing with a stable reason equivalent to:

```text
WITNESS_EXECUTION_IDENTITY_MISSING
```

The observation may still be preserved as unattributed field evidence.

### Head moved after witness

The witness remains valid evidence for the old head but is stale for landing the new head.

PR Completion must require a fresh exact-head readiness determination and may require a new human witness if the changed files touch the witnessed behavior.

### Conflicting human observations

Preserve both. Do not average them into consensus.

The owning project decides whether another specimen or adjudication is required.

### Missing supporting artifact

A human observation may still be valid qualitative evidence, but any criterion requiring a receipt, hash, screenshot, or build identity remains unsatisfied.

### Fail

A fail event must not be converted into a broad redesign automatically.

Create or update the smallest project-owned repair seam that explains the witnessed failure, carrying:

- exact head;
- exact specimen;
- original observation;
- supporting evidence refs;
- known acceptance criterion violated.

### Ambiguous

Preserve fog. Do not retry until something passes merely to close the gate.

The owning project decides the next discriminating test.

## Security and privacy

The relay is an evidence router, not a telemetry system.

v0 must remain local/project-scoped enough that it does not require a new account, cloud database, browser credential, provider session, or user-profile service.

Never place in a witness event:

- cookies;
- authorization headers;
- bearer tokens;
- signed provider URLs when a stable non-secret identity exists;
- browser databases;
- passwords;
- reusable session identifiers;
- private absolute paths unless explicitly required and safe.

Prefer hashes, stable artifact IDs, repository refs, run IDs, relative paths, and project-owned receipts.

## Relationship to existing Collective patterns

### Witness Session

Human Witness Relay is transport/routing across a bounded human gate.

Witness Session remains the richer time-indexed distinction among heard, inferred, admitted, rendered, and witnessed evidence inside an execution experience.

Do not collapse them.

### Projection Is Witness / Projection Freshness

Downstream status pages and GitBook notes are projections of project-owned evidence. They need freshness/provenance, not authority over the project.

### Field Traversal & Illumination

The relay operationalizes one concrete part of the traversal pattern:

```text
encounter
  -> new illumination
  -> changed reachable world
```

The observation changes which doors are worth presenting, not which doors are automatically crossed.

### Potential Energy Routing

A human gate is a charged capacitor. The relay routes the released evidence into the next stalled machine without making the relay the machine's owner.

## Implementation boundary

The first implementation must remain intentionally small.

Recommended v0 implementation order after design approval:

1. Define and test the portable event schema/validator in the smallest neutral home that does not claim project authority.
2. Add one deterministic target-routing function with explicit project adapters.
3. Implement Haunted Toaster #146 adapter against existing PR evidence conventions.
4. Implement Vault #9 adapter against existing witness/receipt conventions.
5. Add one project-status projection hook only where an existing `PROJECT_STATUS.json` mechanism already exists.
6. Add GitBook projection after project-owned evidence is recorded.
7. Prove one pass, one fail, and one ambiguous fixture before using the relay on a real human action.
8. Use the next real Toaster and Vault human actions as the founding live specimens.

Do not build a dashboard, database, queue, daemon, web service, or generalized plugin architecture in v0.

## Testing strategy

### Pure transport tests

- valid event with exact head passes validation;
- missing head cannot satisfy routing;
- original observation text is preserved byte-for-byte or through an explicit normalized field plus raw field;
- unknown disposition is rejected;
- secret-shaped forbidden fields are rejected or redacted before persistence;
- event identity is deterministic when deterministic identity is promised.

### Routing tests

- Toaster event routes only to Toaster adapter/evidence target;
- Vault event routes only to Vault adapter/evidence target;
- unknown repository/gate fails closed;
- adapter output cannot silently change the incoming observation;
- project-local disposition remains distinct from human `disposition`;
- downstream projection does not occur before project-owned evidence exists.

### Exact-head tests

- witness for head A cannot satisfy readiness for head B;
- unchanged exact head can reuse its recorded witness;
- a moved head preserves historical witness evidence but marks readiness stale.

### Live proof

Prove:

1. one real Toaster packaged observation enters once and becomes project evidence plus an updated next-door projection;
2. one real Vault WAV observation enters once and becomes project evidence plus an updated next-door projection;
3. no human retyping is required between those surfaces beyond any genuinely missing project-owned metadata;
4. no merge/release occurs automatically;
5. no secret/session material appears in relay artifacts.

## Acceptance criteria

Human Witness Relay v0 is successful when all of the following are true:

1. A human observation can be bound to an exact repository, gate, head SHA, and available artifact/build evidence.
2. The original human observation remains separately inspectable from machine/project interpretation.
3. `pass | fail | ambiguous` transport disposition does not itself close a project gate.
4. The owning project can deterministically translate the event into its native evidence/disposition surface.
5. A witness for one head cannot satisfy another head's landing readiness.
6. A fail event can seed a bounded repair handoff without losing specimen identity.
7. An ambiguous event preserves unresolved state rather than being converted into success/failure by the relay.
8. Project-owned GitHub evidence exists before any GitBook success projection.
9. Existing project-status projections may update only from project-owned recorded state.
10. PR Completion retains exact-head readiness and explicit per-PR landing confirmation semantics.
11. No central witness authority, database, global narrator, or hidden scheduler is introduced.
12. No credential/session material is persisted.
13. The real Toaster #146 and Vault #9 human gates can be used as founding specimens without widening either project's authority model.
14. After each project-local disposition, the system can expose a bounded next lawful door while clearly marking it as advisory.

## Non-goals

- universal evidence ontology;
- global human identity system;
- reputation/scoring of witnesses;
- consensus engine;
- autonomous cross-project execution;
- automatic merge, release, or deployment;
- background monitoring daemon;
- centralized telemetry;
- new graph database;
- new Project0 relationship kinds;
- replacing repository-native receipts or acceptance criteria;
- replacing PR Completion;
- making GitBook authoritative over executable state;
- dashboard/UI work before the transport proves useful.

## Stop conditions

Stop and return to design if implementation would require:

- a central service to decide whether project gates are satisfied;
- weakening exact-head binding;
- copying project-specific constitutional logic into the relay;
- persisting browser/provider session material;
- treating GitBook projection as project authority;
- allowing a human `pass` string to trigger merge/release directly;
- silently reconciling conflicting observations;
- inventing missing build/artifact identity;
- requiring unrelated projects to adopt the relay for the first two specimens.

## Founding compression

> Human action is scarce. Evidence should compound.

A test should not merely answer one question. When lawfully routed, it should close the local loop, preserve what happened, and illuminate the next reachable door without making the router sovereign over any of them.
