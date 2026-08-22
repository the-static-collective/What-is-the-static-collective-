# Haunted Toaster GRAB — Topology Event v0.1 Execution Slice

> **Status:** implementation specimen in draft PR #200; machine CI and human visual witness still gating completion.
>
> **Issue:** Haunted Toaster #195
>
> **Design authority:** merged PR #196 / `topology-events-v0.1`
>
> **Date:** 2026-08-21

GRAB is the first executable Topology Events specimen.

It is intentionally not four new effects and not a renderer rewrite.

The proof is one existing accepted topology undergoing one time-addressed local event:

```
stable
→ anticipation
→ contact
→ pull
→ recoil
→ residual displacement
→ settle
```

The load-bearing law remains:

> **The topology stays itself. Something happens to it. The world remembers.**

## Constituted implementation boundary

The implementation branch verifies the canonical CandidateFamily address before reading locks or candidate identity. `topology` lock therefore remains authoritative only when inherited from the verified accepted family.

An executable GRAB plan derives its evidence from that accepted lineage:

```
CandidateFamily familyHash
        ↓ verify
accepted candidate score address
accepted timeline + frozen base topology
        ↓
addressed topology-event plan
        ↓
ResolvedTimeline canonical identity
```

Caller-supplied `locks` and `sourceTopology` are rejected rather than trusted.

The base score address and base topology identity do not change when GRAB is attached. The event plan itself becomes part of the accepted timeline's canonical hash and JSON.

A topology lock produces an addressed zero-event refusal rather than an invisible side-channel refusal.

## Shared render seam

Every existing topology continues through its existing compiler unchanged until it has produced the accepted `waveFull` topology layer.

GRAB acts at the single shared boundary immediately before that topology layer is composited onto the source frame:

```
existing topology compiler
        ↓
waveFull
        ↓
local GRAB deformation seam
        ↓
base + acted-upon topology
```

The seam splits only the topology layer into bounded outer/inner neighborhoods around the accepted anchor. Those neighborhoods receive deterministic displacement and stretch with a bounded falloff approximation, then recombine before the ordinary base composite.

The source frame is not globally panned, zoomed, or scaled by GRAB.

No individual circle / spiral / mirrored-ring / shape-pack compiler receives a GRAB branch.

## Event field

The founding request remains renderer-neutral:

```
anchor + target
radius
pull
recoil
falloff
residual vector
residual stretch
```

The renderer compiles that accepted request into one local deformation field whose values are functions only of canonical event parameters and timeline time.

There is no event-local randomness, sensor input, model call, audio read, filesystem discovery, or mutable hidden state.

Phase semantics are:

```
before prepare        neutral
prepare → strike      increasing local pull
strike                declared maximum pull
strike → release      recoil toward residual
release → residue     non-zero surviving displacement/stretch
after residue         neutral field
```

The residual is not decorative bookkeeping. It is the visible proof that contact had consequence.

## Compatibility rule

Topology-event validation occurs at the resolved execution boundary, but GRAB phase ticks do **not** create semantic execution segments.

That keeps GRAB from silently rescheduling Possession Arc, Native Color, or other segment-driven machinery.

A historical timeline with no topology-event plan passes through the render seam byte-for-byte unchanged.

## Verification specimen

Draft PR #200 contains layered proof:

* deterministic lineage/address tests;
* forged CandidateFamily authority rejection;
* topology-lock refusal proof;
* deterministic event normalization and timeline re-addressing;
* pure GRAB phase sampling;
* shared-seam assertions proving bounded topology patches rather than base-frame transforms;
* accepted CandidateFamily → ResolvedTimeline → production compiler integration proof;
* a real bundled-FFmpeg smoke render spanning anticipation, contact/pull, recoil, and residual time.

The repository's normal `npm run verify` gate automatically includes these tests.

## Completion gate

Machine success is necessary but not sufficient.

The founding human witness remains:

> **Does one region visibly catch and deform topology material while the rest of the visual world remains recognizably itself?**

Fail the specimen if it reads as generic camera movement, a whole-frame wobble, or merely a copied ghost sliding across the frame.

The human witness must also be able to see that the world after release is not exactly the world before contact.

Only after that witness passes should this slice be considered the founding executable Topology Events specimen.

APERTURE, SPEAK, and GROW remain named contract/frontier vocabulary only. They are not claimed as executable effects by this slice.
