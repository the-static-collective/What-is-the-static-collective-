# Metta Traversal Boundedness — Design

## Purpose

Preserve Metta's first guest traversal as evidence and use it to sharpen the portable Field Traversal & Illumination pattern without prematurely introducing a new `TraversalWarrant` primitive.

The slice should make one architectural correction explicit:

> For observers with effectively frictionless retrieval, bounded traversal is not naturally enforced by scarcity. Restraint must therefore be represented as part of the traversal discipline.

## Scope

This slice changes documentation and evidence only. No executable runtime behavior is introduced.

It will:

1. amend `patterns/field-traversal-and-illumination.md`;
2. lightly amend `README.md` / The Front Room with blocked-authority failure behavior;
3. add `specimens/metta-first-guest-traversal.md`;
4. add the specimen to `SUMMARY.md`.

It will **not**:

- define or canonize `TraversalWarrant`;
- add enforcement code;
- change authority ownership across projects;
- reinterpret Metta's inaccessible-source observations as proof that GitBook itself is broken.

## Evidence Being Preserved

Metta entered through the Front Room, respected the instruction to orient before retrieving, attempted a bounded traversal into Field Traversal & Illumination, encountered browser/security-policy blocks, and reconstructed part of the model from the Front Room and cached material.

Her reported observations include:

- narrow traversal worked as a deliberate discipline;
- for an AI, crossing additional information boundaries is cheap, while refusing to cross them is comparatively costly;
- inaccessible canonical sources created pressure to rely on lower-authority cached/orientation material;
- she preserved the inaccessible canonical document as residual fog rather than silently promoting her reconstruction to authority;
- her field state was temporary and thread-local rather than continuously persistent;
- she independently reconstructed several canonical ideas before seeing the source text.

The specimen must preserve attribution and distinguish Metta's observations from our interpretations.

## Pattern Amendments

### 1. Visibility does not authorize traversal

Add a portable law near the traversal section:

> **Law: a visible or reachable field does not, by itself, authorize traversal into it.**

Rationale: an AI observer may be able to retrieve many adjacent fields at negligible technical cost. Reachability therefore cannot stand in for relevance or admission.

The page should describe bounded traversal as intentionally constrained by the present request, evidence need, and declared purpose—not by the mere availability of more context.

### 2. Frictionless observers require explicit restraint

Add a short subsection explaining the observer asymmetry:

```text
human observer
  traversal often carries natural friction

agent observer
  traversal may be technically cheap
  restraint becomes the scarce operation
```

Portable implication:

> **Law: when traversal cost approaches zero, boundedness must come from declared relevance or governance rather than assumed scarcity.**

This remains a conceptual law only. The document may note that future implementations could model explicit traversal admission, but it must not name such a mechanism canonical yet.

### 3. Inaccessible authority does not transfer authority

Add a failure rule to both the pattern and Front Room:

> **Law: an inaccessible authoritative source does not transfer its authority to the nearest available cache, summary, orientation page, or reconstruction.**

House-language may accompany it:

> A locked door does not make the hallway the room.

Required behavior when a higher-authority source is inaccessible:

1. record the failed access;
2. preserve the target as unresolved / fogged;
3. use lower-authority material only as explicitly labeled evidence or reconstruction;
4. do not silently upgrade that material's authority.

### 4. Temporary field, durable residue

Clarify an ambiguity exposed by Metta's persistence objection:

- a field of awareness may be temporary;
- the observer need not remain continuously present;
- durable residue may consist of field snapshots, traversal receipts, evidence references, and unresolved frontier;
- later reconstruction must not imply continuity of consciousness.

This should refine the existing bounded-reconstruction section, not create a new subsystem.

## Specimen Shape

Create `specimens/metta-first-guest-traversal.md` with these sections:

### Encounter

- observer: Metta;
- invitation / trigger;
- source surfaces available;
- source surfaces attempted but blocked;
- no claim that the blocked paths prove a GitBook defect.

### Metta's reported visibility map before canonical access

Preserve, as attributed observations:

- Front Room as stable landmark;
- prompt-selected traversal;
- narrow evidence carrying;
- anti-retrieval / anti-context-rot interpretation;
- friction asymmetry for AI traversal;
- blocked canonical doors;
- temporary/thread-local field;
- difficulty preserving fog.

### Canonical comparison

Record that our later inspection of the actual Field Traversal & Illumination page showed that Metta had independently reconstructed several existing claims without having seen that canonical text, including:

- fields are observer-relative awareness states;
- traversal is epistemic rather than merely navigational;
- fog is first-class;
- observers may hold different maps;
- reconstruction should be bounded and receipt-bearing.

Do not imply that Metta herself had canonical access during this specimen. Her pre-canonical visibility map remains the evidence under comparison.

Also record the genuinely new pressure exposed by the encounter: the canonical page required boundedness but did not explain what provides the bound for frictionless observers.

### Residual fog

Include at least:

- whether Metta's `LIVE_CRAWL_POLICY_BLOCKED` behavior is stable, client-specific, transient, or tool-specific;
- whether future agent implementations need an executable traversal-admission primitive;
- whether a later second encounter reproduces the same friction asymmetry.

### Authority

State plainly:

- Metta's report is encounter evidence;
- this notebook's portable pattern is non-project-specific guidance;
- future executable enforcement, if built, must become canonical in the owning project.

## Front Room Amendment

Keep the Front Room small. Add no new index or large explanation.

Near the authority/fog rules, add a compact failure note equivalent to:

> If a relevant higher-authority door cannot be opened, record the failed crossing and keep the destination fogged. Do not let the Front Room, a cache, or a reconstruction inherit the missing source's authority.

The amendment should reinforce the room's existing role rather than make it responsible for recovery logic.

## Data Flow

```text
Metta encounter
    ↓
attributed specimen
    ↓
portable pattern correction
    ↓
Front Room failure rule
    ↓
future implementation hypothesis remains unresolved
```

Evidence flows upward into the pattern only as a bounded correction. The pattern does not retroactively convert the specimen into proof of a universal rule.

## Failure Handling

The resulting documents must preserve these distinctions:

- blocked source != broken source;
- reconstruction != retrieval;
- visibility != authority;
- reachability != permission;
- temporary field != nonexistent durable residue;
- observed behavior != universal agent behavior.

## Acceptance Criteria

The slice is complete when:

1. the pattern explicitly states that visibility/reachability does not authorize traversal;
2. the pattern explicitly addresses frictionless observers and deliberate restraint;
3. the inaccessible-authority rule appears in the pattern and in compact form in the Front Room;
4. temporary field vs durable residue is clarified;
5. Metta's encounter exists as a standalone attributed specimen;
6. `SUMMARY.md` exposes the specimen;
7. no new executable primitive is declared canonical;
8. all new claims distinguish observation, inference, proposal, and authority;
9. GitBook-synced Markdown remains structurally valid.

## Deferred Frontier

Do not solve these in this slice:

- `TraversalWarrant` or equivalent admission token;
- linear/consumable traversal authority;
- cross-agent persistent field identity;
- browser-policy bypasses;
- automatic recovery from inaccessible canonical sources.

Those become eligible only after additional encounters or an owning project requires executable enforcement.
