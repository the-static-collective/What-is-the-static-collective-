# Haunted Toaster — UI Witness Loop & Toastmoods Migration

## Why this exists

The Haunted Toaster has repeatedly exposed a completion gap between intended interface change and witnessed packaged behavior. The recurring failure is not merely forgotten CSS. It is **split interface authority across multiple surfaces**:

```
GitBook intent
  -> renderer HTML
  -> CSS
  -> renderer state/controllers
  -> preload / IPC
  -> packaged Electron artifact
  -> human-visible appliance behavior
```

Each arrow is evidence-bearing. None is implied by the previous one.

Current `main` already contains a small specimen of this drift: Starting Field runtime state is Open Field, while raw render-slate HTML still carries a Porchlight default that JavaScript repairs after boot. Earlier Listener work exposed larger versions of the same problem: source-level behavior could be present while the packaged appliance remained stale or non-functional.

The design response is therefore:

> **Make sight part of the build system.**

## Core law

The renderer interface should have one semantic authority and multiple witnesses.

A browser witness may prove presentation and deterministic interaction states. A packaged Electron witness may prove inclusion, preload/IPC execution, and appliance behavior. Neither should silently claim the other's boundary.

```
one interface authority
  -> browser witness on each relevant PR
  -> packaged witness when artifact/runtime boundaries matter
```

This is the Haunted Toaster's first concrete specialization of the broader Artifact Witness Gate:

```
accepted change
  -> intended-main ancestry
  -> artifact inclusion
  -> artifact execution
  -> witnessed behavior
```

## Browser UI Witness

Create a non-authoritative browser harness that renders the **actual renderer assets** with a deterministic fake `window.fullMeasure` bridge.

The harness is not a web edition of the Toaster. It owns no generation law and no product semantics. Its job is to make canonical renderer states visible and reproducible at a commit SHA.

Canonical witness states should stay small and useful:

* empty appliance;
* song loaded / render ready;
* Starting Field or Toast Feel selected;
* six-up open;
* Listener setup/editor;
* rendering;
* completed result;
* failure/refusal.

Animations and timing should be frozen for visual comparison. The viewport should represent the real desktop appliance family rather than generic responsive-web breakpoints.

## Vercel role

The existing Vercel project already receives Git-linked deployments for Toaster commits and PRs, but currently publishes no usable renderer surface. Use that existing deployment stream as the browser witness window.

A useful witness page should visibly include build identity such as commit SHA and renderer/profile generation, then expose the canonical states above.

Vercel remains a **witness surface**, not execution authority for the local-first Electron instrument.

## Visual proof law

Semantic tests remain stronger than screenshots for behavior. Screenshots remain stronger than semantic tests for appearance.

For relevant PRs:

```
semantic renderer tests
  + deterministic UI specimen screenshots
  + expected visual delta declaration
  + packaged proof when required
```

Baseline images may change only when the PR explicitly intends a visual change.

A stale, hidden, overlapping, misleading, or visually regressed control should therefore become evidence attached to the change that caused it rather than something discovered several releases later.

## Stop storing UI truth in furniture

Before Toastmoods, remove remaining places where application ontology is inferred from DOM furniture.

Current examples include Starting Field selection being discovered from `.garment-card` elements and display names being read back out of rendered text.

Introduce one versioned Starting Field / Toast Feel interface manifest that describes only the available doors:

* stable identity;
* display name;
* short invitation language;
* icon/art identity;
* ordinary bias vs MADD CLOWN semantic class;
* contract version;
* compatibility / ancestry metadata where needed.

The manifest must **not** contain renderer execution law. Generation remains authoritative over what a selected identity means.

The DOM is rendered from the manifest. The slate reads from the same selection state. Candidate generation and final render receive the same identity. Receipts retain the selected identity/version. Tests enumerate the same registry.

CSS should style interface roles such as `.toast-feel`, `.starting-field-choice`, and `.is-selected` rather than acting as ontology authority.

## Toastmoods / Seven Toast Feels

The current visible Porchlight / Wire Orchard / Absolute Residual trio is preserved as ancestry and compatibility, but it is too narrow to remain the primary visible starting metaphor.

Replace it with **Seven Toast Feels**:

* six small custom burnt-toast mood icons;
* each ordinary Toast Feel is a broad deterministic bias / pressure field;
* one larger seventh toast represents **MADD CLOWN CRAZY SLOTS** / maximum lawful surprise;
* the seventh should reuse existing lawful STOMP / outer-rail machinery rather than inventing unreceipted randomness;
* names may remain suggestive, playful, and partially mysterious.

Ontology:

> **Toast Feel biases the creature. It does not dictate the creature.**

Do not implement the seven feels as seven replacement presets. Porchlight, Wire Orchard, and Absolute Residual may contribute ancestry or priors, but a Toast Feel should pressure multiple lawful creative axes without specifying a finished appearance.

## Migration sequence

### Slice 1 — UI Witness Gate

* browserable renderer harness using real renderer assets;
* deterministic fake bridge and canonical states;
* Vercel build publishes the witness instead of a 404/no-output surface;
* screenshot proof in CI for UI-sensitive PRs;
* fix obvious static/runtime vocabulary drift such as stale Garment/Porchlight defaults;
* no creative renderer behavior changes.

### Slice 2 — Starting Field decoupling

* create one interface/domain manifest;
* remove lifecycle dependence on `.garment-card` or DOM-derived names;
* rename visible generic vocabulary from Garment where appropriate to Starting Field / Toast Feel;
* preserve existing Open Field and ancestor behavior exactly;
* keep compatibility artifacts unchanged.

### Slice 3 — `ToastFeel v1` contract

* define bounded deterministic bias semantics;
* keep accepted VisualScore / ResolvedTimeline authority intact;
* record chosen Toast Feel identity/version and enough resolved evidence for replay;
* ordinary feels bias existing axes rather than selecting complete looks;
* define MADD CLOWN as a distinct semantic class backed by existing lawful surprise machinery.

### Slice 4 — Toastmoods furniture

* six small mood toasts plus one larger seventh toast;
* preserve the current haunted instrument shell unless a deliberate visual delta is approved;
* prove hover, selection, keyboard focus, disabled/rendering state, six-up handoff, slate display, and witness states visually;
* no hidden coupling between icon appearance and generation semantics.

### Slice 5 — Cutover + packaged witness

* retire Porchlight / Wire Orchard / Absolute Residual from the normal visible starting surface;
* preserve their constraints/lineage for old artifacts and compatibility;
* build Windows appliance from the accepted head;
* prove the selected Toast Feel is visible, interactive, consumed by six-up and final render, and represented in receipt/build identity;
* retain a clean route back to the Gold Star renderer behavior.

## PR Completion specialization

For Toaster PRs touching renderer UI, preload/main UI wiring, or exposed features, add a repository-specific UI Witness result rather than changing generic PR-completion semantics.

Suggested completion fields:

```
UI impact: none | behavioral | visual | bridge
browser witness: PASS/FAIL @ commit
visual delta: expected | none | unexplained
packaged witness required: yes | no
packaged witness: PASS/FAIL/not-required
GitBook ontology changed: yes | no
```

Human witness is required only where perception, device environment, or artifact-specific presentation cannot be characterized better mechanically.

## Release boundary

Preserve the Gold Star renderer and six-up diversity while this work lands.

Near-term line:

```
hold renderer
  -> UI Witness Gate
  -> Listener UI stability
  -> Starting Field decoupling
  -> ToastFeel contract
  -> Toastmoods UI
  -> packaged witness
  -> package candidate
```

Do not let this migration absorb Compression Pressure, deeper Listener architecture, Native Color Witness, Fallible Witness, or other compositional experiments. Those remain separate slices.

## Working verdict

The Toaster should stop relying on humans to remember that an interface change must appear everywhere.

Instead:

> **The interface carries its own witness trail.**

A change that claims to alter what the human can see should automatically produce something that can be seen, compared, and traced back to the exact source and artifact that produced it.
