# Front Room Design

## Purpose

Create a stable GitBook landmark that a fresh conversation can use for orientation before traversing deeper Static Collective context.

The Front Room is not a memory dump, search result, authority source, or project status page. It is a small spatial index that establishes position, exposes a bounded set of doors, and preserves the distinction between orientation and retrieval.

## Governing laws

1. **Orientation is not retrieval.** Entering the room does not load the corpus.
2. **Position before context volume.** A fresh conversation should know where it is before deciding what to inspect.
3. **Traverse only relevant doors.** The user's current request determines which neighboring field, if any, should be entered.
4. **Authority remains project-owned.** The room and GitBook are projections; current evidence and canonical project repositories outrank them.
5. **Fog survives entry.** Unresolved, contested, and unknown material must not be silently completed.
6. **Unrelated conversations may leave immediately.** The room must not force Static Collective context onto prompts that do not need it.

## Stable location

The canonical GitBook route is:

`/start-here/front-room`

The repository README remains the durable explanation of the Collective. The Front Room is a separate landmark so its address can remain stable while the world behind its doors changes.

## Room contents

The page contains:

- a short orientation statement;
- the `Orientation is not retrieval` law;
- a bounded set of door cards into Patterns, Witness, Frontier, Incubator, Evidence, Vocabulary, and the World/Re-entry pattern;
- an entry protocol for fresh conversations;
- a canonical conversation-entry instruction suitable for ChatGPT Custom Instructions or Project instructions;
- a minimal traversal receipt shape;
- explicit failure conditions.

## Navigation experiment

Add `SUMMARY.md` so GitBook navigation becomes a deliberate route rather than a mirror of the repository filesystem. The Front Room appears first, followed by the repository explanation, then conceptual shelves grouped as field, evidence, incubation, and vocabulary.

Internal `docs/superpowers/` planning files remain in Git but are intentionally omitted from reader navigation.

## Success criteria

After merge and Git Sync:

1. GitBook renders `The Front Room` at `start-here/front-room`.
2. The Front Room is the first item in deliberate GitBook navigation.
3. Door links resolve to existing pages.
4. Search can retrieve the room by its title and by `Orientation is not retrieval`.
5. The page contains no claim that GitBook is authoritative or that every conversation must retrieve Collective context.

## First experiment

Use the following instruction in a future fresh conversation:

> At the beginning of a new conversation, when GitBook is available, enter the Static Collective Front Room first. Use it only to orient yourself: establish the nearby fields, important unresolved frontiers, and useful doors into deeper context. Orientation is not retrieval. Traverse outward only when the user's request makes a neighboring field relevant. Current evidence and project-owned canonical sources outrank the room. Preserve provenance, uncertainty, and unresolved fog, and do not force unrelated conversations into Static Collective context.

Observe whether the conversation reaches relevant prior ideas with less context loading and better preservation of why one idea leads to another.