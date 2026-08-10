# Specimen: Stigmergic Field v0.1

## Question

Can several sovereign participants redistribute activity from a replayable environmental field without a central assignment, while every visible environmental condition remains attributable and non-authoritative?

## Origin

The originating observation came from honey-bee coordination: recruitment, inhibition, local encounter rates, shared material state, and other weak signals can jointly shape behavior without a single bee owning the complete plan.

That biological observation is the analogy that prompted the experiment. The evidence below is software evidence. Bee behavior does not prove the software law.

## Canonical implementation surfaces

### TranchNode — deterministic field law

- PR: https://github.com/the-static-collective/tranchnode/pull/38
- merged commit: `dbec3437cae567d5455c48c19a1bdefaeb8b640d`
- role: deterministic, attributable, authority-free field projection over accepted evidence

The TranchNode implementation owns event-distance decay, source binding, aggregation, canonical ordering, trace identity, projection fingerprints, future-evidence rejection, and scope checks.

### Band Runtime — coordinatorless encounter proof

- PR: https://github.com/the-static-collective/band-runtime/pull/16
- merged commit: `116e1318f82a6162c665879cd5258788ab0ab755`
- role: map committed runtime encounters into the frozen field contract and prove behavior without copying TranchNode field math

### Frozen compatibility fixture

Exact raw fixture SHA-256:

`sha256:5c05959b4a340e5a7f9f81f69323cf81c8b9fcc0cda852263a96ebcd538bdd97`

The vendored Band Runtime fixture and the merged TranchNode fixture share Git blob SHA:

`630e15f7e255e3de065f9ef66c64f203291a0a95`

## Fixed contract

```text
schema:    stigmergic-field/v0.1
adapter:   band-runtime/stigmergic-adapter@0.1
policy:    band-runtime-field-policy/v0.1
authority: none
```

The six observed field channels are:

```text
attention
receptivity
saturation
inhibition
tension
return
```

No field channel grants authority.

## Encounter

The canonical linked specimen contains three participants — A, B, and C — and two candidate subjects:

```text
direction-x
direction-y
```

The relevant accepted sequence is:

```text
event-5-propose-x
event-6-propose-y
event-7-c-rings-y
event-8-b-rings-x
event-9-c-rings-x
event-10-a-rings-x
event-11-reject-x
event-12-b-rings-y
event-13-c-no-x
event-14-b-rings-y-again
```

At causal cut **10**, the canonical projected field makes the test-local participant choice rule prefer `direction-x`.

At causal cut **11**, `event-11-reject-x` adds explicit inhibition to X without deleting X's prior positive evidence. Under the same local choice rule, preference flips to `direction-y`.

The next participant-B encounter is:

`event-12-b-rings-y`

No `participant -> subject` assignment event exists in the specimen. The participant choice rule is test-local and non-authoritative; it reads the frozen projected field rather than creating or modifying it.

At cut **14**:

- `event-13-c-no-x` remains attributable as X tension;
- `event-14-b-rings-y-again` remains attributable as Y receptivity plus Y return.

Two implementation facts sharpened the original prose:

1. **Saturation is triggered by the third distinct positive witness on a target, not the third raw positive event.** X receives positive recognition from B, C, and A and saturates; Y receives C, B, then B again and does not.
2. **Return is repeated positive recognition by the same participant/target pair.** B's later positive recognition of Y produces return; C's later `no` on X remains tension only and is not mislabeled as renewed attraction.

## Machine evidence

### TranchNode

The pull-request GitHub Actions workflow ran Node 22, installed dependencies, and executed:

```text
npm run check
```

Result on the implementation head before merge: **PASS**.

The TranchNode tests cover deterministic replay, input-order independence, event-distance decay, expiry boundaries, attribution-preserving aggregation, inhibition without erasure, future evidence rejection, scope mismatch, source conflicts, trace identity, fingerprint tamper detection, fixture replay, and raw fixture-byte pinning.

Canonical field fingerprints used by the linked specimen:

```text
cut 10  sha256:48ca9a9561e05dfef5127d7e3b6e74d7878e1d86af6985d00cbe3a0cfd8993f4
cut 11  sha256:7e9c6b3476573dad2f269c4a1f901307f0322e6234ad0b9d6ffaa01b680e75ae
cut 12  sha256:af99bf59d7bca57c69894707cfbcadc43b16dcca6809dccc7e4a08ac2fb389bc
cut 14  sha256:a7124282afb4817c288bf07e9d888a25fe9743cf39f12059f1cb8a018b84d312
```

### Band Runtime

Final bounded verification recorded on PR #16:

- strict TypeScript compilation of the adapter against the current Band Runtime event/store contracts: **PASS**;
- red → green harness: the pre-implementation check failed because the adapter did not exist; the final full linked verifier passed;
- full linked sequence: **14 committed source events → exactly 12 fixture-conformant trace bodies**;
- timestamp-shift invariance: **PASS**;
- `EventStore` serialize/deserialize replay parity: **PASS**;
- uncommitted/forged sequence rejection: **PASS**;
- protected-silence and refusal-only boundary specimen: **0 stigmergic traces**;
- central assignment events in the canonical specimen: **0**;
- anti-cheat sentinel: an inserted assignment-shaped record is rejected.

Band Runtime had no GitHub Actions workflow at landing, and the execution environment could not install Vitest from the package registry. The repository-native `npm test && npm run typecheck` suite was therefore not run in that environment. The PR records this limitation rather than treating the bounded harness as a substitute for evidence that was not collected.

## What this proves

> Multiple sovereign participants redistributed activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remained attributable and non-authoritative.

More narrowly, the specimen proves that:

- environmental pressure can be derived from accepted history without becoming authority;
- inhibition can change later attention without deleting prior evidence;
- causal-cut replay can explain the exact field visible at each decision point;
- Band Runtime can consume TranchNode's frozen compatibility surface without implementing a second field engine;
- a participant can change local preference after field conditions change without a central assignment record;
- protected silence and refusal can remain semantically non-recruiting.

## What this does not prove

This specimen does **not** prove that:

- stigmergic coordination universally outperforms scheduling;
- quorum or field pressure is truth;
- bee communication maps one-to-one onto software coordination;
- these six field channels are final or universal vocabulary;
- the test-local participant choice rule should become production policy;
- environmental pressure should override explicit authority, consent, or case state;
- Project0 must adopt a new ontology primitive.

## Human verdict

**The specimen is coordination-enabling, not merely decorative.** The useful behavior is the causal hinge: the same local reader prefers X at cut 10 and Y at cut 11 after attributable inhibition enters the shared field, and the following Band Runtime encounter proceeds toward Y without any assignment event.

The proof is still deliberately narrow. The choice rule is test-local, and the event-to-trace semantics are authored policy rather than discovered universal law. The implementation was most informative where the executable fixture corrected our initial intuition: independent witnesses matter differently from repeated activity, and a negative revisit should not be mislabeled as return.

That is evidence that the field abstraction is doing real conceptual work rather than simply renaming a queue or popularity score.

## Remaining tensions

1. **Signal semantics are still domain-shaped.** Distinct-witness saturation and positive-only return worked for this specimen, but need unrelated specimens before being treated as broadly portable defaults.
2. **Behavioral verification is stronger than repository automation.** TranchNode had a full pull-request CI gate; Band Runtime did not yet have GitHub Actions, and its native Vitest suite was not run in the constrained execution environment used for this slice.
3. **One bounded coordination encounter is not a population study.** The specimen proves possibility and replayability, not performance, resilience, or usefulness across many rooms and workloads.
4. **Field visibility and authorization need continued separation.** TranchNode proves scope rejection/non-leak at the projection boundary; future multi-room specimens should exercise different lawful views of the same larger history.

## Project0 promotion verdict

**Not yet.**

The Stigmergic Field has earned status as a portable pattern with an executable cross-repository specimen. It has not yet earned Project0-level constitutional vocabulary.

Before promotion, the same smaller law should survive at least one materially different domain without importing Band Runtime-specific semantics, and it should become clearer which part is truly shared law versus a composition of existing concepts: accepted evidence, deterministic projection, bounded scope, non-authority, and sovereign local response.

Until then, Project0 should remain unchanged. The notebook records the pattern; TranchNode and Band Runtime remain canonical for the implementation facts.