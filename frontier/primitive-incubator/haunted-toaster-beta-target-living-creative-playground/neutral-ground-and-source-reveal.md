# Neutral Ground & Source Reveal

Status: **project-backed BETA renderer frontier; semantic implementation gated behind the current renderer trust/stabilization line**

Canonical project issue: [Haunted Toaster #163](https://github.com/the-static-collective/the-haunted-toaster/issues/163)

Preparatory executable slice: [PR #165](https://github.com/the-static-collective/the-haunted-toaster/pull/165) — refuse unknown/missing garment identity instead of silently becoming Porchlight.

## Field law

The BETA Toaster should have **no aesthetic resting position**.

Porchlight, Open Field, Wire Orchard, Absolute Residual, clean, grain, photocopy, palette treatment, Atmosphere, and future textures remain lawful material. None should exist as a compulsory aesthetic floor before the accepted candidate is expressed.

> **No default aesthetic. No mandatory filter. No mandatory image destruction. Untreated source is equally lawful.**

A supplied image may be consumed almost completely, partially revealed, locally revealed, briefly revealed, or left clear. Clear visibility is a capability, not a target or quota.

> **Do not teach the Toaster to reveal the image. Remove the rule that prevents it from revealing the image.**

## Current project evidence

Current `main` already hides Open Field from normal front-panel furniture, but the internal renderer still uses it as a compulsory garment:

* renderer state initializes `presetId` as `openField`;
* the Open Field render preset still carries fixed palette, grain, blend mode, image opacity, and hue drift;
* the legacy/shared base filter always creates a procedural garment;
* a supplied image is always blended into that garment at preset opacity/mode;
* the blended result is always hue-treated afterward;
* unknown garment ids currently fall through to Porchlight.

The practical consequence is stronger than a style preference: a genuinely clear supplied image is **unreachable by construction** in the current compositor.

## BETA boundary

The renderer-semantic repair must not be stacked into the current elastic-topology / Track 0 trust line. Historical accepted artifacts retain their pinned renderer meaning.

Once that renderer ancestor is trusted and landed, the BETA path should introduce an explicitly versioned neutral-ground/source-treatment law whose decisions are canonical and replayable upstream of execution.

The first bounded operator should prove only enough to make source visibility lawful across the full range from assimilation to clarity, with preview/production parity and compact receipt/compiler evidence.

No user-facing “show image” slider is required. No candidate must reveal the source merely to prove the capability.

## Relationship to candidate ecology

Issue #147 already removes the privileged candidate/default mood from initial six-up composition. Issue #163 removes the corresponding **renderer-side gravitational floor**.

Together they form one stronger law:

```
no privileged candidate
+ no compulsory garment
= genuinely open initial possibility space
```

Memory and Toastmood pressure may later influence search, but influence must not quietly reconstruct a constitutional default.

## Proof criterion

A packaged BETA witness should eventually show that the same lawful engine can, without a new mandatory control:

```
source image
  → devour it
  → partially reveal it
  → leave it clear
```

while exact recorded authority reproduces the chosen treatment and historical renderer policies remain unchanged.

## Authority note

GitHub issue #163 owns implementation scope and acceptance. GitHub PRs, code, tests, receipts, and current renderer evidence outrank this page. This page preserves the frontier meaning and sequencing boundary only.
