# House of Houses — STATIC SEED v2 contract

**Status:** packaged workflow and optional local CLI; not an authenticated multi-user platform. Inspiration from [fellowSHIP's VISION](https://github.com/the-static-collective/fellowSHIP/blob/main/VISION.md) is *vision*, not evidence of a deployed permission or room service. Related [Static Workbench](https://github.com/the-static-collective/static-workbench) and [MEMENTO](https://github.com/the-static-collective/MEMENTO) remain independently owned tools.

## Vocabulary

- **HOUSE**: one owner's workspace index; can contain any number of homes. It is not a universal database or an authority over other people's worlds.
- **HOME**: one independent domain or project with a privacy boundary and owner (cleaning, storyworld, press, research, or a custom purpose).
- **ROOM**: bounded workspace inside a home, with goal, visibility posture, and assigned workbenches. A room in another home is not the same room, even if their names match.
- **WORKBENCH**: portable method or tool profile attached to a room; an attachment grants neither credentials nor effectful authority. An owner may add new types later.
- **CARD**: short portable receipt with source, status, interpretation, decision, and next step.
- **CROSSING PACKET**: reviewed, selective proposal referencing material between rooms/homes. It carries no source data and remains unadmitted until the receiving owner decides.

## Lifecycle

`SEED → HOUSE → HOME → ROOM → SELECT WORKBENCH → WORK → RETURN CARD`.

New homes and rooms can be created, renamed, archived or forked without altering unrelated homes. Re-use the same method in many rooms while keeping each room's identity, receipt history, and source constraints distinct. Deleting a link does not rewrite past crossings. Archiving is reversible; deletion needs separate explicit authority.

## Non-collapses

`home name != canonical ID` · `room label != room identity` · `attached != authorized` · `proposed share != grant` · `visible in a browser != authenticated` · `receipt != stored history` · `fictional canon != client record` · `published != all rights cleared` · `copy != same occurrence` · `source != projection`.

## Permission-aware proposal

A room-to-room relationship requires: source home+room; target home+room; exact selected references; stated purpose; proposed scope; expiry or review date; source owner's review; target's separate decision. The local CLI can emit this packet only; no transport, login, enforcement, revocation or recipient authentication exists. Never insert customer details, private manuscripts or secrets into a public repo, public card, or demonstrator.

## Plug-in and local runtime distinction

ChatGPT **skills** route reasoning; a skills-only plugin cannot create real database records or remote permissions merely by responding. `toolkit/seed_house.py` is an optional dependency-free local CLI that can save a JSON registry and produce proposed crossing packets when explicitly invoked. It has no network access and cannot securely operate shared accounts. A future fellowSHIP-style shared host is separately scoped and requires explicit opt-in and field testing.

## Growth without a central ruler

Start with one room. Add a home when ownership/data boundary matters; add a room when work has a distinct purpose and participants; attach a new workbench when a repeatable method is needed; propose a crossing rather than mirroring all information. An external friend is a distinct owner, not a tenant automatically inherited from the original Static Collective.
