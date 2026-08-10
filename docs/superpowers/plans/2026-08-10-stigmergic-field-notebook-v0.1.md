# Stigmergic Field Notebook Graduation v0.1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Graduate the existing bee-communication incubator entry into a portable Static Collective pattern and a machine-grounded proof specimen after the TranchNode and Band Runtime implementation PRs exist.

**Architecture:** Keep this repository descriptive, mnemonic, and non-authoritative. `patterns/` captures the reusable law independent of implementation details; `specimens/` records what the linked vertical actually proved; `notes/primitive-incubator.md` retains the origin and points forward rather than being erased or rewritten as if the experiment had always been settled.

**Tech Stack:** Markdown, ordinary Git provenance, GitHub links to the final TranchNode and Band Runtime PRs/commits, exact machine facts copied from verified implementation outputs.

## Global Constraints

- This repository never becomes canonical over TranchNode field math or Band Runtime encounter law.
- The bee observation remains inspiration/analogy, not evidence that the software implementation is correct.
- The strongest allowed claim is: `Multiple sovereign participants redistributed activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remained attributable and non-authoritative.`
- Do not claim stigmergy universally outperforms scheduling.
- Do not claim quorum or aggregate pressure equals truth.
- Preserve the original incubator entry and its uncertainty; mark graduation by explicit forward links rather than deleting history.
- Include exact final implementation PR URLs and the exact TranchNode fixture raw-byte SHA-256 from the implementation record.
- Include the exact Band Runtime proof facts: 3 participants; `direction-x` and `direction-y`; cut 10 prefers X; cut 11 prefers Y after inhibition; `event-12-b-rings-y` is the next B encounter; `event-14-b-rings-y-again` leaves return residue; zero central assignment events; zero protected-silence/refusal semantic traces.
- If any of those facts differ after implementation, write the observed verified values instead and explain the divergence. Never force the narrative to match this plan.
- A Project0 promotion recommendation is a verdict, not an automatic consequence of passing tests.

---

## File Structure

- Create `patterns/stigmergic-field.md` — portable law, vocabulary, invariants, anti-patterns, and cross-domain uses.
- Create `specimens/stigmergic-field-v0.1.md` — exact linked-vertical setup, machine receipts, observable cuts, outcome, human verdict, and unresolved tensions.
- Modify `notes/primitive-incubator.md` — keep the original bee entry, append graduation status and links to the new pattern/specimen plus canonical implementation repos.
- Do not modify project-owned technical documentation here.

---

### Task 1: Write the portable stigmergic field pattern

**Files:**
- Create: `patterns/stigmergic-field.md`

**Interfaces:**
- Consumes: approved design plus final TranchNode/Band Runtime implementation facts.
- Produces: a project-independent pattern future repositories can cite without importing implementation baggage.

- [ ] **Step 1: Create the pattern with the exact governing statement and boundaries**

Write `patterns/stigmergic-field.md` with this structure and wording as the floor:

```markdown
# Stigmergic Field

## Pattern

> A shared substrate may communicate its condition through attributable, deterministic environmental traces without those traces becoming authority.

## Origin observation

Honey-bee colonies coordinate through more than direct messages. Recruitment, inhibition, local encounter rates, shared material state, and other environmental traces let individuals respond to a field that no single bee centrally owns.

The biological observation inspired this software pattern. It does not prove the software law and should not be stretched into one-to-one biomimicry.

## Underlying phenomenon

The useful phenomenon is **stigmergic coordination**: one participant changes a shared substrate; that changed substrate becomes observable to later participants; those participants make their own decisions; their decisions leave further traces.

```text
encounter
    ↓
attributable trace
    ↓
deterministic shared field
    ↓
sovereign attention
    ↓
choice / refusal / silence
    ↓
new encounter
```

## Invariants

1. **Field is not authority.** Pressure, attraction, saturation, inhibition, latency, and tension may influence attention but cannot compel action or rewrite history.
2. **Trace is attributable.** Aggregate state must remain decomposable into the accepted events that produced it.
3. **Replay is law.** The same accepted evidence, causal cut, policy, and adapter identity must reproduce the same field.
4. **Decay cannot smuggle wall-clock authority.** Durable meaning changes by declared causal/event relation, not incidental runtime timing.
5. **Inhibition is additive, not destructive.** A stop-like signal reduces recruitment pressure while preserving the positive traces and history it responds to.
6. **Scope is sensory law.** Inaccessible activity must not leak through counts, pressure, fingerprints, latency, or absence/presence side channels.
7. **Local choice remains local.** No aggregate score silently becomes a scheduler, rank, consensus engine, or assignment service.
8. **The substrate may speak without becoming sovereign.** Derived field state describes conditions; participants remain responsible for response.

## Minimal vocabulary

- **trace** — attributable residue derived from accepted evidence;
- **field cell** — one subject/channel aggregate with contributor lineage;
- **attention** — recent concentration of activity;
- **receptivity** — recent evidence of willingness/capacity for more activity;
- **saturation** — recent evidence of load or diminishing need for recruitment;
- **inhibition** — evidence against increasing recruitment pressure;
- **tension** — unresolved friction, contradiction, or need;
- **return** — independent revisitation or re-engagement;
- **field fingerprint** — content identity of one declared field projection, not identity or truth of the world outside it.

## What this pattern is not

It is not:

- quorum-as-truth;
- reputation scoring;
- hidden agent ranking;
- a central scheduler with softer branding;
- a license to infer inaccessible activity;
- an ontology requirement;
- a claim that direct messages are unnecessary.

## Where it composes

- **TranchNode:** deterministic field projection over accepted evidence.
- **Band Runtime / Groove Rooms:** participant-visible environmental coordination during encounters.
- **Corpus OS:** observable casework metabolism such as neglected, saturated, repeatedly returned-to, or unresolved regions without replacing explicit case state.
- **Founder Node:** routing proposals informed by field pressure without promoting field pressure into authority.
- **Creative systems:** bounded recruitment/inhibition around branches, artifacts, candidates, or unresolved creative frontiers.

## Graduation test

A stigmergic implementation earns the name only when multiple sovereign participants can respond usefully to shared environmental evidence without a hidden central assignment, and replay can explain why every visible field condition existed.

See [`../specimens/stigmergic-field-v0.1.md`](../specimens/stigmergic-field-v0.1.md) for the first linked-vertical proof.
```

- [ ] **Step 2: Review the pattern for implementation leakage**

Search the file for TranchNode source filenames, TypeScript function names, numeric channel weights, or test-only chooser formulas. Remove them. The pattern should survive if the implementation language or exact weights change.

- [ ] **Step 3: Commit the pattern**

```bash
git add patterns/stigmergic-field.md
git commit -m "docs: graduate stigmergic field pattern"
```

---

### Task 2: Write the proof specimen from verified implementation evidence

**Files:**
- Create: `specimens/stigmergic-field-v0.1.md`

**Interfaces:**
- Consumes: final TranchNode implementation PR URL/commit, final Band Runtime implementation PR URL/commit, exact fixture raw-byte SHA-256, passing test outputs, and verified proof facts.
- Produces: a human-readable specimen that separates machine evidence, interpretation, and unresolved questions.

- [ ] **Step 1: Gather exact implementation evidence before writing prose**

From the finalized TranchNode and Band Runtime branches/PRs, record:

```text
TranchNode implementation PR URL
TranchNode implementation commit SHA
TranchNode fixture raw-byte SHA-256
Band Runtime implementation PR URL
Band Runtime implementation commit SHA
TranchNode verification command/result
Band Runtime verification command/result
adapter identity
schema version
policy version
participant count
candidate subject ids
cut 10 preferred subject
cut 11 preferred subject
next B encounter event id
return residue source event id
central assignment event count
protected-silence/refusal semantic trace count
```

Do not write the specimen until every value is available from an actual tool/test result. If an implementation PR is still draft, label it draft accurately rather than implying merge.

- [ ] **Step 2: Create the specimen with explicit evidence/interpretation separation**

Write `specimens/stigmergic-field-v0.1.md` with this structure:

```markdown
# Specimen: Stigmergic Field v0.1

## Question

Can several sovereign participants redistribute activity using a replayable shared environmental field without a central assignment mechanism?

## Origin

This specimen grew from a bee-communication field note: recruitment, inhibition, local encounter state, and changes to shared substrate can coordinate a colony without one participant owning the complete plan.

The bee analogy supplied the question. The machine specimen supplies the software evidence.

## Canonical implementation surfaces

- **TranchNode:** [exact final implementation PR link] — owns generic deterministic field projection.
- **Band Runtime:** [exact final implementation PR link] — owns the event adapter and coordinatorless encounter proof.
- **Fixture content address:** `sha256:...` — exact raw bytes of the TranchNode v0.1 cross-repository contract.

Project0 was intentionally unchanged.

## Fixed contract

- schema: `stigmergic-field/v0.1`
- adapter: `band-runtime/stigmergic-adapter@0.1`
- policy: `band-runtime-field-policy/v0.1`
- authority: `none`

## Encounter

Three participants — A, B, and C — encountered two candidate directions: `direction-x` and `direction-y`.

The accepted sequence first concentrated recognition around X. The third positive recognition of X produced saturation residue. An explicit clip rejection then produced inhibition without erasing the earlier attention/receptivity history.

At the canonical causal cut immediately before inhibition, the test-local participant policy preferred X. At the next causal cut, after inhibition became visible, the same local policy preferred Y. No assignment event existed.

Participant B's next accepted encounter was with Y. A later independent revisit of Y left `return` residue. A later negative recognition of X remained visible as `tension` rather than deleting X's prior history.

## Machine evidence

Record the exact verified facts here as a compact table or bullets. Include causal cut numbers, event ids, fingerprints, test command results, fixture content address, assignment count, and protected-silence/refusal trace count.

## What this proves

> Multiple sovereign participants redistributed activity using shared, replayable environmental evidence without a central assignment, while every environmental condition remained attributable and non-authoritative.

The proof is narrow. It demonstrates one coordinatorless redistribution specimen and the integrity of its evidence path.

## What this does not prove

- that stigmergy is better than scheduling in every domain;
- that aggregate pressure is true or wise;
- that every collaboration should avoid explicit coordination;
- that the bee colony and the software system are structurally identical;
- that the six v0.1 channels are the final vocabulary;
- that the pattern belongs in Project0 yet.

## Human verdict

Write the observed verdict after inspecting the actual passing specimen. Distinguish:

- genuinely coordination-enabling behavior;
- behavior that merely restated an obvious scripted sequence;
- surprising field effects;
- coercive or overly strong weights;
- confusing semantics;
- anything the machine tests passed but a human would not yet trust.

## Remaining tensions

Record concrete unresolved questions surfaced by the specimen. Candidates include whether saturation should arise from a threshold, whether latency deserves its own derived relation, whether inhibition channels should be domain-specific, and whether cross-implementation conformance needs packaging instead of fixture exchange.

## Project0 promotion verdict

End with exactly one of:

- **Not yet:** more specimens are needed before extracting shared law.
- **Proposal warranted:** the specimen demonstrated a portable invariant worth presenting to Project0, while keeping implementation vocabulary downstream.
```

The bracketed descriptions above are instructions for execution, not text to commit. Replace them with actual verified evidence before committing; the committed specimen must contain no brackets, `TBD`, `TODO`, or invented values.

- [ ] **Step 3: Validate every factual claim against machine evidence**

For every number, event id, fingerprint, PR link, and pass/fail statement in the specimen, compare it to the final implementation outputs. Remove any claim that cannot be directly grounded.

- [ ] **Step 4: Commit the specimen**

```bash
git add specimens/stigmergic-field-v0.1.md
git commit -m "docs: record stigmergic field v0.1 specimen"
```

---

### Task 3: Preserve the incubator history and mark explicit graduation

**Files:**
- Modify: `notes/primitive-incubator.md`

**Interfaces:**
- Consumes: the existing `Incubating: bee communication field` entry plus Tasks 1-2.
- Produces: an append-only-style historical pointer showing what the idea became without erasing its earlier formulation.

- [ ] **Step 1: Leave the original bee incubator text intact**

Do not rewrite the existing `Primitive`, `Felt possibility`, `Existing analogue`, `What must stay invariant`, `Smallest experiment`, or `What would make this graduate` text.

- [ ] **Step 2: Append a graduation block directly beneath that entry**

Add:

```markdown
### Graduation — Stigmergic Field v0.1

**Status:** Graduated to a portable pattern and linked executable specimen on 2026-08-10.

The first implementation deliberately changed the incubator shape in one important way: rather than beginning with a quorum calculation, it proved **environmental field state without field authority**. TranchNode owns deterministic field projection; Band Runtime owns the coordinatorless encounter proof; this notebook preserves the portable pattern and specimen.

- Pattern: [`../patterns/stigmergic-field.md`](../patterns/stigmergic-field.md)
- Specimen: [`../specimens/stigmergic-field-v0.1.md`](../specimens/stigmergic-field-v0.1.md)
- TranchNode: use the exact final implementation PR link recorded in the specimen
- Band Runtime: use the exact final implementation PR link recorded in the specimen

The original quorum-shaped experiment remains above as historical evidence of where the thought began. Graduation does not retroactively make that first framing canonical.
```

Before committing, replace the final two descriptive lines with actual Markdown links to the exact final implementation PRs already recorded in the specimen. Do not use placeholders.

- [ ] **Step 3: Verify notebook authority language remains intact**

Search:

```bash
grep -R "canonical.*notebook\|notebook.*authority\|quorum.*truth" notes/primitive-incubator.md patterns/stigmergic-field.md specimens/stigmergic-field-v0.1.md || true
```

Inspect matches and ensure none claim this repository outranks project-owned implementation or that quorum/pressure establishes truth.

- [ ] **Step 4: Commit the graduation pointer**

```bash
git add notes/primitive-incubator.md
git commit -m "docs: link bee incubator to stigmergic field proof"
```

---

### Task 4: Final notebook evidence audit

**Files:**
- Review: `patterns/stigmergic-field.md`
- Review: `specimens/stigmergic-field-v0.1.md`
- Review: `notes/primitive-incubator.md`

**Interfaces:**
- Consumes: all prior notebook tasks plus final implementation records.
- Produces: a notebook PR whose claims are fully grounded and whose role remains explicitly non-canonical.

- [ ] **Step 1: Scan for placeholders or invented certainty**

Run:

```bash
grep -R -n "TBD\|TODO\|exact final\|sha256:\.\.\.\|\[exact\|universally\|proves bees" patterns/stigmergic-field.md specimens/stigmergic-field-v0.1.md notes/primitive-incubator.md || true
```

Expected: no unresolved placeholders and no overclaiming language.

- [ ] **Step 2: Verify links resolve to the intended repositories/PRs**

Check every external implementation link manually. The TranchNode link must point to the final Stigmergic Field implementation PR; the Band Runtime link must point to the final adapter/specimen PR.

- [ ] **Step 3: Verify exact machine facts one final time**

Compare the specimen against the final implementation test/PR records. In particular confirm the raw fixture SHA-256, cut numbers, preferred subjects, event ids, assignment count, and protected-silence/refusal trace count.

- [ ] **Step 4: Review the diff as a notebook, not a product spec**

Run:

```bash
git diff main...HEAD -- notes/primitive-incubator.md patterns/stigmergic-field.md specimens/stigmergic-field-v0.1.md
```

Expected: the pattern is portable, the specimen is evidentiary, and the incubator retains history. No implementation code or project-owned technical law belongs in this repository.

- [ ] **Step 5: Commit only if the audit required corrections**

If corrections were required, make one focused documentation correction commit. Otherwise do not create an empty commit.
