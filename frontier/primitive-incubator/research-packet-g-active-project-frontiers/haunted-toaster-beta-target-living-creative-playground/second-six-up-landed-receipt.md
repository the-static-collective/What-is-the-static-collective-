# Second Six-Up — Landed Receipt

Status: **landed on `main`**

Project PR: [Haunted Toaster #189](https://github.com/the-static-collective/the-haunted-toaster/pull/189)

Landed squash commit: `c5c90b39c973df2986048828098c5c73bc5d0a52`

Verified feature head: `d5b86dd1622facaebfbf53a3088112fde219e986`

## What landed

The candidate room now presents the current six creatures first. Choosing one deals exactly six deterministic, addressed next-move proposals:

* `EXPAND`
* `MUTATE`
* `CONVERGE`
* `STOMP`
* `CROSS` × one suggested current-family partner
* `CROSS` × a second suggested current-family partner

`DEAL SIX MORE` changes proposal identity only. It does not regenerate the current family, change candidate selection, bind a winner, or spend render authority.

## Authority boundary

Proposal dealing remains a deterministic **renderer-local projection**. It did not add a new preload or IPC authority path.

Choosing a proposal delegates to the already-authoritative candidate operations. `CROSS` remains exact two-parent current-family execution. Locks remain absolute. `Use selected timeline` remains the separate human production-binding act.

The canonical execution chain remains unchanged:

`VisualScore → ResolvedTimeline → preview → render → sidecars → receipt`

## Landing witness

Before landing, exact head `d5b86dd…` passed the ready-state renderer/application proof, Chromium witness, runtime dependency audit, and Windows package build.

Windows artifact: `Haunted-Toaster-Windows-32315904526`

Artifact id: `9388139863`

Artifact digest: `sha256:c27b3fdb348ced7c9013260c4aac7b0b33eb8e3e698387f223847d3eb5dd8431`

No tag or release was created as part of the landing.

## Field meaning

The landed slice makes one beta principle executable:

> **Proposal can become richer without authority becoming broader.**

The six-up is now not only a population of creatures, but a bounded doorway into lawful next acts without returning to a large mode toolbar.
