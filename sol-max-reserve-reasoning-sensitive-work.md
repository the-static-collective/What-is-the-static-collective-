# Sol Max Reserve — Reasoning-Sensitive Work

Status: **operational planning convention**

> **Reserve the deepest reasoning for decisions whose mistakes propagate farther than their implementations.**

This page does not create a new authority layer, model requirement, or execution bottleneck. It is a routing convention for deciding when a task should be deliberately escalated to a fresh, high-effort reasoning pass instead of being handed directly to an ordinary implementation agent.

## The reserve rule

Most difficult work should **not** be reserved.

Ordinary agents should continue to own bounded implementation when the contract is already clear: tests, fixtures, CI repairs, local adapters, package work, documentation updates, mechanical migrations, and PR completion.

Escalate a slice to the Sol Max reserve when a wrong answer could silently change the meaning of several systems at once.

Strong indicators include:

* the decision crosses **three or more repository-owned authorities**;
* it touches canonical identity, ontology, provenance, authority, or version-boundary law;
* the hard question is whether two systems share one primitive or merely resemble one another;
* the outcome would mint a new shared package, schema, protocol, or constitutional vocabulary;
* an irreversible migration or semantic compatibility boundary is being chosen;
* causal/falsification reasoning matters more than implementation volume;
* executable specimens now exist and the remaining task is **adjudication**, not construction.

A single indicator may be enough when blast radius is high. Two or more should strongly favor escalation.

## Reserved lanes

| Reserved lane                                         | Entry condition                                                                                                                     | Sol Max task                                                                                                                                                                                           | Exit condition                                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| **Autodiscography Vault live-boundary adjudication**  | Phase A is landed and the first live 25-track pilot can be observed                                                                 | Audit the authenticated-browser/local-execution boundary, refusals, resumability, evidence leakage, Corpus handoff, and whether the live specimen actually supports the Executable Membrane hypothesis | A bounded verdict: keep local, revise boundary, or admit the pilot; implementation returns to ordinary agents |
| **Executable Membrane / BEE / TRAEX separation**      | At least one real Vault crossing receipt exists                                                                                     | Decide what is genuinely shared among execution surface, carried invariant, crossing grammar, and receipt—without collapsing them into one framework                                                   | Explicit relationship map and a decision to graduate, defer, or keep separate                                 |
| **Exact Return neutral contract**                     | One real receipt-addressed reconstruction succeeds locally and a materially different second producer is available                  | Extract the smallest cross-producer reconstruction law while preserving project-owned authority and truthful EXACT / LAWFUL / PARTIAL claims                                                           | Neutral contract or a reasoned refusal to genericize                                                          |
| **Project0 / TranchNode semantic version boundaries** | A proposal would alter frozen identity/ontology/authority meaning or requires a concept the current floor cannot represent honestly | Produce contradiction matrix, migration/blast-radius analysis, and the smallest lawful version boundary                                                                                                | Version decision is explicit before implementation begins                                                     |
| **TranchNOSE causal no-cheating adjudication**        | Simulator/hardware evidence is ready to support a causal claim                                                                      | Separate predictability from causal sufficiency; challenge leakage, counterfactuals, ablations, and falsification logic                                                                                | Bounded claim language and required controls are fixed before interpretation is promoted                      |
| **Portable-pattern graduation audit**                 | Two materially different executable specimens claim the same primitive                                                              | Compare invariants, authority seams, failure modes, and semantic lies required by unification                                                                                                          | `graduate`, `keep local`, `split`, or `insufficient evidence` verdict                                         |

## Not reserved

Do **not** spend the reserve merely because a task is large, annoying, or technically advanced.

Examples that normally stay in ordinary execution lanes:

* Vault implementation after its live-boundary contract is frozen;
* fixture and adversarial-test construction under an accepted schema;
* bounded Linux host-port work in Corpus OS;
* Haunted Phonograph Specimen 001 after its evidence/proposal contract is fixed;
* Haunted Toaster CI hygiene, packaging, and ordinary renderer repairs;
* PR review remediation, conflict resolution, check reruns, and evidence collection;
* mechanical implementation of a design that already has clear ownership and acceptance criteria.

The reserve is a **constitutional court, not a coder of last resort**.

## Invocation packet

A reserved reasoning pass should begin from evidence rather than conversational memory. Supply, where applicable:

1. exact repository, issue/PR, branch, and head SHA;
2. current canonical docs and invariants;
3. executable fixtures, receipts, or field specimens;
4. the conflicting interpretations or abstractions under consideration;
5. explicit non-goals and authority boundaries;
6. the concrete decision that must be made.

Do not ask the reserve to rediscover the entire ecosystem from vibes when exact evidence exists.

## Required output

A reserved pass should return a small decision artifact rather than an enormous implementation patch:

```
verdict
  = admit | keep-local | defer | split | version-boundary-required

because
  = evidence + invariant analysis

blast radius
  = repositories / contracts affected

preserved distinctions
  = what must not collapse

next executable slice
  = smallest ordinary-agent handoff

unresolved fog
  = what the evidence still cannot support
```

When useful, include a contradiction matrix or falsification conditions.

## Relationship to PR Completion

PR Completion remains an execution/landing discipline, not the Sol Max reserve.

A PR may be mechanically ready while the resulting artifact or semantic abstraction is not yet witnessed. Conversely, a Sol Max verdict does not authorize a merge. Landing remains bound to the repository's current head, checks, reviews, protections, and explicit landing decision.

The two systems meet at the handoff:

```
reserved adjudication
  -> bounded implementation issue
  -> ordinary implementation / tests
  -> PR completion
  -> artifact or field witness where required
  -> possible later graduation audit
```

## Current ordering — 2026-08-12

The first reserve slot should be held for the **Autodiscography Vault live-boundary adjudication** because the external preservation deadline is real and the first live crossing can produce evidence useful to several later questions without requiring those later abstractions to be built now.

The next strongest reserve candidates are:

1. Project0 / TranchNode semantic version-boundary decisions when they become blocking;
2. Exact Return neutralization after a second materially different artifact producer exists;
3. TranchNOSE causal adjudication before experimental claims are promoted;
4. portable-pattern graduation audits after two-domain evidence exists.

TRAEX itself remains incubated until specimens force the question.

## Governing compression

> **Use ordinary intelligence to build the bridge. Use the reserve when deciding whether two shores should share a law.**
