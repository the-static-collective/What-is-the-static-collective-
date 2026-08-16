# Project0 — Floor 1.1 Reference Kernel Witness

**Status:** landed implementation witness — 2026-08-16

Project-owned GitHub remains canonical for implementation, tests, issues, and merge state. This GitBook page is a projection of that landed state, not implementation authority.

## Project authority

* GitHub issue: https://github.com/the-static-collective/project0/issues/2
* Pull request: https://github.com/the-static-collective/project0/pull/33
* Approved implementation head: `357dd9a75e0fd94adfdcf1ba01bb257ec8d7deee`
* Landed squash commit on `main`: `ba8f8988e20e793ba6dfe1d1737ef629b9c8be78`
* Design spec: `docs/superpowers/specs/2026-08-16-floor-1.1-reference-kernel-design.md`
* Implementation plan: `docs/superpowers/plans/2026-08-16-floor-1.1-reference-kernel.md`

## What became executable

Project0 now has a deterministic, model-independent Floor 1.1 reference kernel layered above the already-settled canonical-addressing floor:

* canonical TypeScript contracts for the frozen nine node kinds, relationships, disclosure policies, receipts, and authority requests;
* runtime validation with stable refusal reason codes;
* append-only in-memory receipt history;
* bounded authority by recipient, capability, scope, purpose, explicit evaluation time, disclosure policy, lineage, and invocation exhaustion;
* immutable `LeaseGrant` semantics with successful use represented by append-only `LeaseConsumption` receipts;
* exact replay of an already-recorded consumption remains idempotent, including after authority is exhausted;
* pipeline admission remains mechanically independent from epistemic disposition;
* an offline conformance CLI emits `pass`, `fail`, or `unsupported` with attributable evidence refs.

The canonical-addressing implementation itself was not changed by this slice.

## Verification witness

At the approved PR head, GitHub Actions completed the full `npm run verify:all` gate:

* TypeScript typecheck/build: pass;
* Node test suite: **91 / 91 pass**;
* independent Python RFC 8785 / canonical-addressing fixture verification: pass;
* offline Floor 1.1 conformance CLI: pass.

The conformance surface currently demonstrates stable node identity, receipt round trip, valid bounded authority, scope refusal, authority exhaustion, and admission/disposition orthogonality.

## Explicit non-claims

This witness does **not** claim that the broader conformance field is finished.

Issues #3, #6, and #10 remain follow-on evidence work. The current CLI deliberately reports sealed plurality, repair scar, and monument/build-beside fixture families as `unsupported` rather than manufacturing success.

The current kernel validates immediate non-root grant lineage; it does not silently invent a complete recursive delegation or transfer profile.

## Field consequence

Before this slice, Project0's semantic law existed primarily as written contract plus settled canonical identity. After this slice, a meaningful portion of that law can be executed offline and produce deterministic evidence about whether an object, receipt history, authority use, or pipeline admission satisfies the reference contract.

The key shift is:

```
meaning contract
      ↓
canonical identity
      ↓
runtime validation
      ↓
append-only history
      ↓
bounded authority
      ↓
mechanical admission
      ↓
conformance evidence
```

That makes later fixture work additive evidence against an executable floor instead of another architecture selection problem.
