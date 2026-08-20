# Haunted Toaster #192 — Landed Field Package

Status: **landed project-backed evidence; human usability witness remains open**

Haunted Toaster PR #192 landed on 2026-08-20 UTC as squash merge `133e514c48d1f1ff041b5e0af21dcc14e6ed56f8`.

The landed slice combines two mechanically separate changes:

* current-main Listener hardening: automatic placement lead is zero by default, explicit lead overrides remain legal, and weak placements after a suspicious >=20 second gap remain unresolved so later lyrics can recover;
* VSPantry folder-intake observability: the existing flat serial importer emits truthful discovered/processing/completed progress through the existing status surface.

Exact reviewed/package head: `3554f4d5f28d311e67eb9e9c872514656fcc52cd`.

GitHub Actions run `32328302222` passed the consolidated application proof, runtime dependency audit, canonical Chromium renderer witness, and Windows Setup + Portable package build. The Windows artifact was `Haunted-Toaster-Windows-32328302222`, artifact id `9392238914`, digest `sha256:2eb92086c2a9b41a8070a988a9e954a0eda775748c421f8c25e95b46711e10c9`.

The progress relay is presentation testimony only. It does not change specimen identity, hashing, ffprobe evidence, deduplication, catalogue semantics, traversal depth, Video generation authority, `VisualScore`, `ResolvedTimeline`, or production renderer behavior. Progress is sent only to the invoking renderer, and completed counts are emitted after the corresponding work completes.

PR #190 and historical PR #186 were closed as superseded implementation lanes after #192 landed. Their RED -> GREEN lineage remains evidence; they are not parallel authority branches.

## Preserved fog

Issue #177 remains open until a human packaged run establishes the UX claim that a long folder import is visibly understandable rather than merely machine-correct. Landing #192 does **not** manufacture that human witness.

This landing also does not satisfy the separate renderer-trust human gate carried by the older #155 line, does not authorize a tag/release/promotion, and does not admit Video into render authority.

GitHub issue/spec/code/tests and the exact landed merge remain implementation authority. This page is a bounded projection only.
