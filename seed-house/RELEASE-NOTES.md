# STATIC SEED v0.2.0 — release and verification

Date: 2026-11-22

## Delivered

- Retained the original eight source-grounded skills and added `housekeeper`, `room-maker` and `workbench`.
- Added independent HOME / ROOM / WORKBENCH grammar, local-first House Registry template, room charter, proposed crossing template, revised starter prompt and explicit owner gates.
- Added a dependency-free Python local companion for creating homes and rooms, attaching/detaching workbenches, archiving homes, validation and proposal-only crossing exports.
- Added the optional companion's tests, and direct GitHub browse / no-ZIP onboarding.

## Observed test evidence

In an isolated local Python run, `python -m unittest discover -s tests -v` passed **5 tests**. These covered dynamic creation of four homes, separate rooms, attachment/detachment, duplicate rejection without file modification, archive behavior, proposal-only packet export, invalid-room rejection, and read-only show/validate behavior.

**Not tested or implemented:** cross-person authentication, external invitations, shared-room networking, hosted APIs, permissions enforcement, browser UI, GitBook publishing, third-party integrations, real customer-data handling, or automated ChatGPT skill routing on a second account.

## Provenance and status boundaries

This is a portable design/implementation **interpretation** informed by:
- [fellowSHIP VISION](https://github.com/the-static-collective/fellowSHIP/blob/main/VISION.md) — project-owned vision, not proof of cloud-room deployment.
- [Static Workbench](https://github.com/the-static-collective/static-workbench) — independent local desk and source-aware tooling.
- [MEMENTO](https://github.com/the-static-collective/MEMENTO) — durable attributed memory boundaries.
- [MOTIF](https://github.com/the-static-collective/MOTIF) — testable reasoning and counterexamples.
- [LOADOUT](https://github.com/the-static-collective/LOADOUT) — bounded capability attachment.
- [STORYSHIP](https://github.com/the-static-collective/STORYSHIP) and [lemonPRESS](https://github.com/the-static-collective/lemonPRESS) — crossings and editions.

No private repository, customer record or licensed manuscript was incorporated into the public package. A transfer or installed skill does not grant authority or real-world integration rights.
