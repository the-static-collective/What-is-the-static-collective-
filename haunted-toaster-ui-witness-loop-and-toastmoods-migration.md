# Haunted Toaster — UI Witness Loop & Toastmoods Migration

## Implementation status

The migration is implemented on [GitHub PR #126](https://github.com/the-static-collective/the-haunted-toaster/pull/126) at test head `e83a6512be1b845a553a74dc3f9f0488f4082a65`.

The browser witness is generated from the production renderer, Vercel is Ready, and eight reviewed Chromium baselines now cover:

* empty;
* song ready;
* Toast Feel selected;
* six-up open;
* Listener editor;
* rendering;
* completion;
* refusal/failure.

The final CI job compares pixels without updating snapshots. The six-up state also asserts that sticky actions do not overlap any candidate card. The rendering state asserts that all seven Toast Feel controls are disabled.

## Core law

The renderer interface has one semantic authority and multiple witnesses.

```
production renderer authority
  -> deterministic browser witness
  -> packaged Windows witness when native boundaries matter
```

The browser witness remains non-authoritative. It owns no generation law or product semantics.

## Toastmoods cutover

The normal front panel now contains exactly seven canonical Toast Feels:

* Low & Slow
* Porch Ghost
* Wire Heat
* Ash Bloom
* Burnt Halo
* Risky Hybrid
* MADD CLOWN CRAZY SLOTS

The six ordinary Feels are equal-size bounded pressure fields. The larger seventh action delegates maximum lawful surprise to the existing seeded STOMP outer rail.

> **Toast Feel biases the creature. It does not dictate the creature.**

The previous garment presets remain internal compatibility ancestry. They are no longer the ordinary visible starting furniture.

## Interface authority

* `src/full-measure/src/toast-feels.cjs` is the sole Toast Feel vocabulary.
* Main exposes copies through `app:toast-feels`.
* Preload exposes `getToastFeels()`.
* `toast-feel-controller.js` renders the manifest and publishes stable identity.
* Candidate generation and final render consume the same `toastFeelId`.
* Receipts retain exact Toast Feel and Native Color evidence.
* `witness-dist/` is generated and must never be edited.

## Correct future update order

The operational checklist is maintained in GitHub at `docs/UI_CHANGE_PROTOCOL.md`:

1. Change the owning domain or bridge contract first.
2. Add a failing focused test at that boundary.
3. Update the production renderer.
4. Update deterministic witness fixtures only when the real bridge contract changes.
5. Run semantic proof and real-browser comparison.
6. Inspect every intentional changed screenshot before updating baselines.
7. Run packaged Electron proof whenever preload, IPC, native dialogs, local files, or packaged behavior changed.

Creative identity must never be inferred from DOM copy, CSS classes, icon art, or furniture. Future wild modes should compose recorded seeded policies; they must not add ambient randomness or a second chaos engine.

## Current proof record

```
UI impact: visual + behavioral + bridge
browser witness: PASS @ e83a6512be1b845a553a74dc3f9f0488f4082a65
visual delta: expected and reviewed
packaged witness required: yes
packaged witness: build PASS; field interaction pending
GitBook ontology changed: no
```

## Release boundary

PR #126 is ready for testing, not landing. No merge, alpha.8 tag, or GitHub release has been created. Final promotion still requires the exact packaged field specimen and explicit landing approval.
