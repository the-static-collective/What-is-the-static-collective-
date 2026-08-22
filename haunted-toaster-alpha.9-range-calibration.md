# Haunted Toaster — alpha.9 Range Calibration

> **Status:** project-backed field note; non-authoritative. Executable authority remains the Haunted Toaster repository, issue #136, PR #137, tests, receipts, and accepted build evidence.

## Field trigger

Alpha.9 field testing exposed a calibration problem rather than a shortage of creative range. The six-up could generate materially different creatures, but Primitive Field identity (`structure` + `dynamics`) was hidden from the chooser; `cathedral-fan` repeatedly read like Spiral; and MADD CLOWN/STOMP tended to occupy a continuously excited \~8.5/10 region.

The Jubilee Engine packaged witness sharpened the diagnosis: a valid alpha.9 specimen combined `cathedral-fan`, `lattice`, `magnetic`, firefly, orbit, pulse, and several numeric axes at or near their maximum. The result was lawful and expressive, but it demonstrated how multiple independent axes can simultaneously spend headroom.

This continues an earlier Haunted Toaster field finding: dense songs can spend response headroom too early, while restraint can remain a first-class aesthetic lane.

## Calibration laws

* **Semantic distance is not amplitude.** A creature can be deeply strange while numerically restrained.
* **STOMP should maximize semantic distance, not amplitude.**
* **MADD CLOWN should maximize surprise, not continuous excitation.**
* **Do not lower the ceiling.** Preserve 1.0 / 10-out-of-10 states; make lower and middle states meaningful again.
* **Coverage before randomness now includes base creature identity.** The relevant base tuple is `(topology, primitive structure, primitive dynamics)`.

## Executable authority

* GitHub issue: `the-static-collective/the-haunted-toaster#136`
* Implementation PR: `the-static-collective/the-haunted-toaster#137`
* PR base: `fix/magnetic-crop-invariant` / PR #134
* Exact implementation head: `a77e7241ee334b6140565fd02f1794e7e5e96fb5`

PR #137 does **not** authorize merging, tagging, releasing, or promoting alpha.9.

### Base-diverse six-up

Raster-4 selection now prefers unseen base identities, then unseen primitive structures/dynamics, before secondary expressive affinity. Preview evidence exposes the authoritative topology/structure/dynamics so a human can identify `magnetic` before choosing a render.

### Cathedral Fan

`cathedral-fan-v3` no longer starts from Spiral's polar vectorscope source. Its source is a narrow Cartesian/lissajous blade, split into a three-part fan with negative space and bounded rotation.

### Headroom

Visual-language-v2 retains its historical midrange lift for replay compatibility. Raster-4 introduces a separate response path that preserves middle values and exact 0/1 endpoints. The same policy split applies to atmosphere response so weather does not silently re-inflate the mids.

### STOMP / MADD CLOWN

Raster-4 STOMP still selects from the existing lawful deterministic pool. It does not rewrite accepted scores after selection. Its six roles carry a deterministic intensity contour from restrained mutant through rail-rider peak while semantic-distance requirements remain authoritative. MADD CLOWN still delegates to seeded STOMP rather than gaining a second chaos engine.

## RED → GREEN evidence

### Calibration RED

GitHub Actions run `31920562600`, head `70eb0a6c247bfb575c22d84bc03bb4f8db922a79`:

* 298 tests total
* 292 existing tests passed
* exactly six new failures: base identity coverage, preview observability, chooser legibility, Cathedral Fan source geometry, raster-4 response shaping, and STOMP contour evidence

### Atmosphere RED

GitHub Actions run `31920918472`, head `5075868cdc8cbab4ec02534d033b65a0352ee49d`:

* 297 / 298 tests passed
* sole failure: raster-4 atmosphere returned the historical lifted `0.3875` for raw `0.25`

### Final GREEN

GitHub Actions run `31921074556`, exact head `a77e7241ee334b6140565fd02f1794e7e5e96fb5`:

* Full Measure check: **145 scripts**
* tests: **298 / 298 pass**
* 12-second render smoke: **PASS, 0 ms duration delta**
* optional image + MP3 stream-copy smoke: **PASS**
* candidate six-up smoke: **PASS**
* runtime dependency audit: **0 vulnerabilities**
* canonical browser witness: **PASS**
* Vercel status: **success**

### Windows human-test package

PR run `31921178537` completed its renderer proof, canonical browser witness, and Windows build successfully; release publishing remained skipped.

* Artifact: `Haunted-Toaster-Windows-31921178537`
* Artifact id: `9256447845`
* Artifact digest: `sha256:d78ebadaebf3ca5f19bdd627c5f54fc69c1cf98eb664a5f0ef7bdce4cf8ffe5f`
* Artifact is bound to exact PR head `a77e7241ee334b6140565fd02f1794e7e5e96fb5`
* Packaged executables: `Haunted-Toaster-0.5.0-alpha.9-x64-Setup.exe` and `Haunted-Toaster-0.5.0-alpha.9-x64-Portable.exe`

The Windows job builds GitHub's PR merge-ref (`d91c6d61d20efb0b8b98269b08c08480c13ad2f6`), which is the exact #137 head merged into its #134 base for integration proof.

## Related magnetic field evidence

PR #134 / issue #116 now have a full native Windows `magnetic` witness: the repaired alpha.9 package completed a 281.9-second accepted render using `magnetic + lattice + cathedral-fan`, far beyond the former \~4.44-second crash boundary.

That witness closes the field-evidence gap for the magnetic crop repair but does **not** itself authorize landing or promotion.

## Human field question for #137

Use the Portable executable for the fastest qualitative pass unless installer behavior itself is under test:

1. Does the six-up make topology + structure/dynamics legible, and do the six feel like more fundamentally different starting creatures?
2. Does Cathedral Fan now read as a fan/rib/blade geometry rather than Spiral with extra copies?
3. Does MADD CLOWN/STOMP expose meaningful quiet/restraint/medium/hot contrast instead of clustering the family around \~8.5/10?
