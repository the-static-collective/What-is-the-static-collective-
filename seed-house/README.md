---
description: "STATIC SEED v2: portable homes, project rooms, attachable workbenches, and consent-aware crossings."
icon: house
---

# STATIC SEED · House of Houses

**Status:** v0.2.0 portable plugin source and tested optional local registry companion. This directory is not the Static Collective Front Room, a hosted service, or a claim that fellowSHIP cloud rooms are deployed.

[**Start without a ZIP**](GIT-QUICKSTART.md) · [Plugin source](plugin/README.md) · [House architecture](plugin/docs/HOUSE-OF-HOUSES.md) · [Pilot](plugin/docs/PILOT.md) · [Release verification](RELEASE-NOTES.md)

## Start with one room; grow as needed

```text
OWNER'S HOUSE
├─ HOME: Cleaning Business
│  └─ ROOM: Operations  →  business-desk
├─ HOME: Story World
│  └─ ROOM: Canon       →  storyship + memento
└─ HOME: Publishing
   └─ ROOM: Book One   →  lemonpress

Selected relationship  →  CROSSING PROPOSAL  →  receiving-owner decision
```

Each home owns its own records and decisions. Rooms have bounded purposes; workbenches can be attached or detached without changing ownership or inheriting tool permission. Crossings are proposed references, not background sync or shared credentials. Multiple homes can grow without modifying existing IDs.

## Available now

- Eleven ChatGPT skills under [`plugin/skills/`](plugin/skills/), including housekeeper, room-maker and workbench.
- Copy-and-paste [no-install starter prompt](plugin/portable-starter-prompt.txt).
- An owner-editable [House Registry example](plugin/templates/HOUSE-REGISTRY.example.json), room charter and crossing packet.
- Optional Python standard-library [local CLI](plugin/toolkit/seed_house.py) with [five tests](plugin/tests/test_seed_house.py).

## Not claimed

No authenticated multi-user rooms, live friend invitations, automatic personal memory, customer CRM, connected database, house synchronization, permission enforcement, or actual cross-account data movement. Such a host would be a separate, consent-based implementation with independent testing and security design.

**Sources:** fellowSHIP's [vision](https://github.com/the-static-collective/fellowSHIP/blob/main/VISION.md), the [Static Workbench](https://github.com/the-static-collective/static-workbench) and each referenced organ remain separate source owners. The child seed exports **methods**, not their private histories or authority.
