---
title: "CONTINUITY RETURN 001 — Never Lose the Thread"
description: "Reviewable protocol for cross-chat, cross-repository re-entry. Proposal, not project canon."
---

# CONTINUITY RETURN 001 — Never Lose the Thread

**Observed:** 2026-11-19  
**Status:** PROPOSED / owner review required  
**Owner of this record:** Static Collective Witness Notebook  
**Authority:** none over any project's state, tests, decisions, or private information  
**Scope:** public cross-project continuity. Private work stays in its own authorized source.

## Why this exists

A conversation can reach a foundational decision in the morning and lose it by afternoon. Persisting more prose is not enough: the next conversation must discover the right artifact, distinguish current from superseded state, and verify what actually shipped.

The existing [Witness Notebook](README.md) already says that external notes are **not automatically retrieved**. The [Front Room](../README.md) orients without becoming project truth. The [Living Git Map](../atlas/README.md) describes repo terrain, not execution state. MEMENTO and MOTIF already offer source-grounded return and reasoning methods. The missing operation is a routine **save → discover → verify → re-enter → update** circuit.

### Evidence at this cut

- Public Git inventory at 2026-11-19T16:32:54Z: **92 public repos, 3,127 branch refs, 1,739 open PRs**. This is a public-only aperture: [dated inventory](../atlas/generated/README.md).
- A concrete same-day distinction: [HUMKIN PR #166](https://github.com/the-static-collective/HUMKIN/pull/166) was **open** when examined, whereas [HUMKIN PR #165](https://github.com/the-static-collective/HUMKIN/pull/165) was **merged**. Neither fact alone proves deployed behavior or a successful device test.
- [MEMENTO architecture](https://github.com/the-static-collective/MEMENTO/blob/main/docs/architecture.md) forbids retrieved context from silently becoming admitted state.
- [MOTIF](https://github.com/the-static-collective/MOTIF/blob/main/README.md) has a Reasoning Spine and separate source/test/merge gates; a branch, conjecture, and run are not interchangeable.
- The current [GitBook site](https://the-static-collective.gitbook.io/the-static-collective-docs/) is Git-synced to this repository. GitBook is a navigational projection, not an independent source of truth.

These observations motivate the protocol; they do not establish why a particular chat model drifted.

## The smallest useful continuity packet

For any named project, **use its existing canonical status contract first** (Project0 already has PROJECT_STATUS.json). Do not create a second authoritative status system. Where no equivalent exists, propose a small `continuity/current.json` with:

- **Identity:** stable project id, owning repo, branch/commit, visibility, `observed_at`, `checked_at`.
- **Foundational constraints:** invariants and explicit human corrections; link to exact source/decision, never silently rewrite.
- **Current state by lane:** planned / draft PR / merged / deployed / fixture-tested / field-tested / disputed / unknown.
- **Active work:** issue or PR numbers plus current states and an exact current-source link.
- **Unresolved tension:** competing explanations, failed tests, missing evidence, what would settle them.
- **Next permitted move:** the smallest actionable step, its owner, and its prerequisite.
- **Supersession:** reference to the previous packet and what changed, not destructive replacement of history.

A human-readable `CONTINUE.md` may be **generated from** that state. An `AGENTS.md` or short README pointer may say where to retrieve it. Neither duplicate is a new authority.

## When to write a unit

Create or update a bounded handoff when any of these happens:

1. The human states or corrects a foundational constraint.
2. A decision changes the direction of a project.
3. A PR, branch, commit, deployment, or field test changes the actual status.
4. An experiment discovers a counterexample or useful unresolved question.
5. A work session ends or crosses an environment where its context may vanish.

Do **not** record every thought or a private chain of reasoning. Prefer one useful receipt over a transcript dump. A write must succeed on a known surface and be read back before claiming persistence.

## Re-entry protocol for a fresh chat

1. **SELECT:** Receive the actual present project or question. No universal 100-repo preload.
2. **ORIENT:** Visit the GitBook Front Room only if the Static Collective is relevant; identify one or two source-owned doors.
3. **RETRIEVE:** Read the project-owned status and latest bounded handoff, then relevant PRs/commits/tests and, only when needed, MEMENTO/Drive historical sources.
4. **DIFF:** Compare saved `observed_at`, commit and PR states with current sources. Any old state is a lead, not a guarantee.
5. **REPORT:** State `known / changed / held / next` and distinguish proposed, merged, deployed, and field-tested.
6. **ACT + RECEIPT:** Perform authorized bounded work; leave a short linked delta in the owning source. Never claim a future session has already retrieved it.

The fresh chat's first substantive answer should demonstrate re-entry through a source pin, not say only “I remember.”

## Source ownership

| Surface | Proper job | Must not do |
| --- | --- | --- |
| Project repo / project-owned Drive doc | Canonical decisions, status, artifacts, exact tests | Have its truth overwritten by a shared index |
| GitBook / Living Git Map | Public doorways, source-linked topology, freshness and unresolved pointers | Expose private work; infer deployment from branches |
| MEMENTO Return Ticket | Dated historical return, four-clock provenance, uncertainty and changes (`admission:none`) | Auto-admit a crossing or invent an earlier witness |
| MOTIF Proof Node | Hypotheses, alternatives, falsifiers, outcomes and method reuse | Claim native execution from a manual analysis |
| ChatGPT project instructions | Trigger the source retrieval workflow in each relevant chat | Guarantee that every source is already loaded |
| Automations / GHoT work units | Periodic stale-check and targeted event receipts where actually configured | Turn monitoring into unsupervised broad writes/merges |

## Prototype and verification

Begin with three owner-approved pilots: (a) high-velocity HUMKIN, (b) MEMENTO and MOTIF as separate memory/reasoning owners, (c) one small project. Use existing status files where possible. Create a minimal `CONTINUE.md` pointer and validation test for each. Then run **blind fresh-chat re-entry**:

- Ask a new chat to identify each pilot's current invariants, last actual test, active PR, and next permitted action.
- Score whether it opens the right source without the human repasting context.
- Compare answer to live evidence; count false deployment claims, missed corrections, stale PR states, privacy leaks, and time to first useful action.
- Deliberately change one PR state and one user correction between checkpoints and repeat within hours.
- If it fails, fix the discovery/verification circuit before adding more notes.

Target metrics to test, not outcomes already obtained: **0 invented field-test claims, 0 lost explicit corrections in the tested packets, and a useful sourced first action within two minutes**.

## Open questions (HELD)

- Which repo or service should own the *event router* and trigger per-project updates without a global privileged writer?
- Which existing project status formats should be adapted instead of replaced?
- Can GitBook imports and a targeted hourly index-check remain inexpensive enough for the actual repository and PR volume?
- What private/public partition and human review gate should govern cross-project descriptions?
- Which ChatGPT Project instruction/source setup most reliably initiates retrieval in a fresh chat? Platform memory is helpful but not exhaustive.

**Suggested next authorized move:** review this as a witness note, then pilot read-only re-entry from current HUMKIN/MEMENTO/MOTIF sources. Only after successful replay propose owner-local status-file PRs. Preserve older snapshots, and reject any attempt to turn this witness note into project canon by citation alone.

**Status at creation:** a proposed design; no automatic capture, cross-chat retrieval hook, deployment, schedule, or native MOTIF test has been installed by this document.
