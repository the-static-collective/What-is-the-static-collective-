# Primitive Incubator

A place for strange ideas to germinate before they become roadmap obligations.

Recording an idea here does **not** mean we have decided to build it. The purpose is to preserve the observation long enough to discover whether there is a reusable primitive underneath it.

## Template

```
Primitive:

Felt possibility:

Existing analogue:

What must stay invariant:

Smallest experiment:

What would make this graduate:
```

Optional questions:

* Is this actually a new primitive, or a composition of things we already have?
* What part of the idea is phenomenon, and what part is aesthetic costume?
* Does it need authority, or only the ability to propose?
* What evidence would tell us the experiment failed?
* Where would the canonical implementation belong if it succeeds?

***

## Incubating: bee communication field

**Primitive:**\
Bee quorum / waggle / scent field

**Felt possibility:**\
Distributed creative coordination in which no single participant has to own the whole plan. Direction, confidence, local state, and collective readiness emerge from several weak signals becoming mutually legible.

**Existing analogue:**\
TranchNode-style event/evidence fields; proposal and recognition systems; multi-participant creative frontiers.

**What must stay invariant:**\
No hidden authority. Signals may influence attention or convergence without silently becoming commands. The system must preserve who emitted which evidence and distinguish local observation from collective resolution.

**Smallest experiment:**\
Represent three independent signal channels for one candidate direction: vector/direction, confidence/intensity, and local corroboration. Let several participants emit signals and derive a visible quorum state without permitting the quorum calculation itself to mutate source events.

**What would make this graduate:**\
A specimen where distributed signals produce a useful coordination decision that is inspectable, replayable, and meaningfully different from a central chooser.

### Graduated: Stigmergic Field v0.1 — 2026-08-10

Status: **graduated to a portable pattern and linked executable specimen**.

The experiment changed the original quorum-shaped framing in a useful way. The first proved primitive is not “quorum decides.” It is **environmental field state can become replayably legible without the field gaining authority**.

* TranchNode owns the deterministic field projection and compatibility contract.
* Band Runtime owns the coordinatorless encounter proof.
* This notebook owns only the portable pattern, origin memory, and specimen record.
* The original quorum experiment above remains historical evidence; it is not retroactively canonical.

Notebook records:

* Stigmergic Field pattern
* Stigmergic Field v0.1 specimen

Canonical implementation PRs:

* TranchNode: https://github.com/the-static-collective/tranchnode/pull/38
* Band Runtime: https://github.com/the-static-collective/band-runtime/pull/16

***

## Incubating: atmosphere field

**Primitive:**\
Smoke / rain / dust / firefly as one atmosphere family

**Felt possibility:**\
A reusable field layer describing what moves through a creative world rather than what the world is made of.

**Existing analogue:**\
Particle systems, vector fields, sparse autonomous agents, renderer overlays, and Haunted Toaster's orthogonal creative axes.

**What must stay invariant:**\
Atmosphere remains independent from garment/material identity. A material choice must not secretly determine an atmosphere, and an atmosphere must remain composable with multiple garments, topologies, motions, cameras, and typography systems.

**Smallest experiment:**\
Define one common atmosphere interface with density, direction or drift, persistence, depth behavior, and event responsiveness; implement two deliberately different families against it, such as rain and firefly.

**What would make this graduate:**\
One renderer specimen showing the same garment with two atmospheres and the same atmosphere with two garments, without special-case architecture.

***

## Incubating: ghost

**Primitive:**\
Residual presence after a source, participant, state, or event is no longer directly present

**Felt possibility:**\
Systems that can preserve meaningful traces of what happened without pretending the original thing is still active.

**Existing analogue:**\
Receipts, residual render state, provenance traces, rejected proposals, abandoned branches, afterimages, and causal history.

**What must stay invariant:**\
A ghost cannot acquire the authority of the thing that produced it. Residue may witness prior presence; it must not counterfeit current presence.

**Smallest experiment:**\
Take one state transition that normally erases a visible element and preserve a clearly marked, non-authoritative residual trace with provenance back to the event that created it.

**What would make this graduate:**\
A specimen where the residual trace improves understanding or expression while remaining impossible to confuse with current authoritative state.

***

## Incubating: artifact witness gate

**Primitive:**\
A staged completion witness from accepted change to human-observed artifact behavior

**Felt possibility:**\
Artifact-producing systems need a stronger meaning of “done” than source merge. A change can be accepted in review yet miss the intended main lineage, miss the built artifact, fail to execute inside that artifact, or execute without presenting the intended behavior to the human.

A useful provisional chain is:

```
accepted change
  -> intended-main ancestry
  -> artifact inclusion
  -> artifact execution
  -> witnessed behavior
```

Each arrow is evidence-bearing. None is implied by the previous one.

**Existing analogue:**\
Haunted Toaster exposed several distinct specimens in one product family: a Listener change merged into a stacked branch rather than `main`; source-level UX present on `main` but not initially witnessed in the packaged appliance; later package-entrypoint and sandbox regressions that required artifact/runtime-specific proof. The broader analogue includes APKs, native binaries, rendered media, bootable images, and generated MIDI where source correctness alone cannot establish what the recipient actually receives.

**What must stay invariant:**\
Generic PR completion should not pretend to know every artifact's runtime semantics. Each producing repository may add its own witness gates. “Merged,” “included,” “executed,” and “human-witnessed” remain distinct claims. Human witness is required only where the behavior is inherently perceptual, device-specific, environment-specific, or otherwise not mechanically characterized; it must not become ritual evidence where automation is stronger.

**Smallest experiment:**\
In one artifact-producing repository, make the completion chain explicit and intentionally break each seam once: wrong target ancestry, omitted packaged asset, packaged runtime failure, and behavior that executes but is not actually presented. Require a legible failed gate for each specimen without changing generic PR-completion semantics.

**What would make this graduate:**\
Two or more materially different artifact-producing repositories can use the same gate vocabulary while keeping their repository-specific proof adapters separate, and the stronger completion law catches a real false-positive “done” state that ordinary merge/CI status would have accepted.

***

## Incubating: declared-freedom descendant

**Primitive:**\
Deterministic descendant generation that preserves ancestry and declares exactly which freedom was spent

**Felt possibility:**\
Several creative and substrate systems now produce lawful neighboring descendants from a preserved ancestor under deterministic pressure. The common structure may be smaller than either product's trigger semantics:

```
preserved parent
+ declared resolver / generation policy
+ allowed dimensions
+ optional deterministic seed
  -> independently addressed descendant proposal(s)
  -> explicit changed-dimension evidence
```

**Existing analogue:**\
TranchNode #29 defines a `BloomReceipt` after a refused proposal: the refusal remains true, protected state remains unchanged, and a neighboring proposal may be generated under a declared resolver. Haunted Toaster STOMP generates materially different lawful descendants from a selected ancestor under a deterministic “surprise me harder” pressure and records parent, seeds, locks, semantic breaks, distances, and threshold relaxation.

These are family resemblances, not synonyms. **Lawful bloom is refusal-conditioned; STOMP is boredom/user-pressure conditioned.** Treating STOMP as a bloom would erase a meaningful trigger and authority distinction.

**What must stay invariant:**\
The parent remains immutable and independently addressable. Descendants begin as descendants/proposals rather than retroactive edits. Policy, seed where relevant, constraints, and changed dimensions remain inspectable. Ordinary admission still applies. The reason generation was invoked belongs to the calling layer and must not be fabricated by the generic descendant contract.

**Smallest experiment:**\
Do not share code yet. Characterize the smallest neutral receipt shape against a synthetic parent and bounded allowed-dimension set, then map one existing STOMP specimen and one future lawful-bloom specimen onto it. The mapping fails if it must lie about refusal, boredom, authority, or admission to make the shapes match.

**What would make this graduate:**\
Executable specimens in at least two domains show that the same ancestry + deterministic-pressure + changed-dimension contract can be reused without erasing their distinct trigger/authority semantics. Only then consider a shared receipt/helper boundary.

***

## Incubating: witness session

**Primitive:**\
A shared, time-indexed evidence session spanning Listener, human correction, score intent, render execution, and final Witness Window observation

**Felt possibility:**\
The Toaster currently has several distinct truths that can accidentally look like one truth:

```
heard -> inferred -> admitted -> rendered -> witnessed
```

A Witness Session would preserve the seams rather than collapse them. At a given timestamp the Listener can say what it heard, the score can say what it intended, the renderer can say what it executed, and the Witness Window can say what actually escaped into the observable artifact.

The session's job is not to choose which witness is “right.” Its job is to remember the difference.

> **The Listener remembers what was heard.**\
> **The score remembers what was intended.**\
> **The Witness Window remembers what actually escaped.**\
> **The session remembers the difference.**

**Existing analogue:**\
Haunted Toaster already has Listener session evidence such as prior placements, human anchors, and re-listen deltas. The Witness Window already closes the render graph through a single final observable video aperture. The Artifact Witness Gate separately distinguishes accepted source, artifact inclusion, execution, and human-witnessed behavior. Witness Session may be the runtime/evidence analogue joining these ideas without giving any one subsystem hidden authority.

The immediate field specimen is lyric timing: a run may report complete lyric coverage while the opening sequence still has implausible temporal geometry. A proof-listen that shares session evidence could challenge the opening without loosening the matcher globally.

**What must stay invariant:**\
The Listener must not own the Witness Window, and the Witness Window must not become a semantic Listener. Each subsystem contributes testimony under its own authority boundary. Human corrections remain explicit anchors. Later evidence may corroborate or contradict earlier evidence without silently rewriting history. The Witness Window remains a simple final aperture; the session is the bridge.

**Smallest experiment:**\
For one Haunted Toaster render, produce a compact time-indexed session record containing: first-pass Listener placements/confidence, human anchors, proof-listen disposition, admitted lyric timing, score-triggered visual events, and final Witness Window evidence. Demonstrate one timestamp where these layers agree and one suspicious region where the proof-listen requests re-examination. No automatic rejection or self-watching is required yet.

**What would make this graduate:**\
The shared session localizes a real discrepancy that a flat “matched/rendered/accepted” receipt would have hidden, while preserving independent testimony and authority boundaries. A second domain can then reuse the same evidence-session shape without importing Toaster-specific semantics.

**Current project slice:**\
Haunted Toaster issue #120 — https://github.com/the-static-collective/the-haunted-toaster/issues/120

**Possible later depth:**\
A closed-loop observer could proof-listen or proof-watch the finished artifact and reject output when witnessed behavior contradicts admitted intent. That is deliberately beyond the incubator experiment.
