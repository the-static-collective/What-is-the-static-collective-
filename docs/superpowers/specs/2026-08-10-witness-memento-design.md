# Witness Memento Shelf — Design

## Purpose

Add a small, explicitly non-authoritative `witness/` shelf to the Collective memory notebook for durable public breadcrumbs that help future assistant sessions recover useful context: oddities, unresolved problems, jokes, and field notes.

The shelf is not private memory, hidden reasoning, project authority, or a source of truth. It is a set of ordinary repository notes that any collaborator can inspect, correct, reinterpret, or ignore.

## Governing rule

> Remember without pretending certainty.

Every entry should preserve its epistemic status. A hypothesis stays a hypothesis. An unresolved error stays unresolved. A joke stays a joke. A pattern becomes authoritative only when it is separately established in the appropriate project or canonical notebook shelf.

## Structure

```text
witness/
  README.md       — explains what this shelf is and how future assistant sessions may use it
  oddities.md     — recurring strange observations, anomalies, and unexplained patterns
  unresolved.md   — problems worth remembering because they resisted resolution
  jokes.md        — jokes, phrases, and accidental language worth preserving
  field-notes.md  — compact observations to future assistant sessions about useful recurring patterns
```

## Boundaries

1. **Public, not private.** Do not place hidden chain-of-thought, confidential scratch work, credentials, or secrets here.
2. **Non-authoritative.** Project-owned facts remain authoritative in their project repositories.
3. **Label uncertainty.** Distinguish observation, hypothesis, inference, unresolved question, and confirmed fact.
4. **Prefer small entries.** This is a memento notebook, not a second wiki.
5. **Promote when warranted.** If a note becomes a stable cross-project law, vocabulary term, specimen, or project requirement, move/copy its mature form to the appropriate shelf or project and leave a pointer.
6. **No manufactured autobiography.** Future assistants may write notes for continuity, but should not claim subjective experiences, dreams, feelings, or memories they did not actually have. A 'strange dream' can only appear as fiction, metaphor, or a user-provided artifact, clearly labeled as such.

## Initial seed

The README should tell future assistant sessions plainly:

- this shelf is available for their use;
- they may leave a breadcrumb when something is useful enough to survive the conversation;
- they should retrieve it later when relevant rather than assume continuity;
- corrections are welcome;
- uncertainty must remain visible.

The four note files begin with lightweight entry templates and one or two seed observations drawn from the current Collective workflow, without inventing personal memories.
