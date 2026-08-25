# Autodiscography Vault — Phase B2C WAV Preservation

## Status

**Human WAV field witness passed; Phase B2C landed.**

Repository: `the-static-collective/autodiscography-vault`

* Issue #8: **closed / completed** after the real one-WAV human gate passed.
* PR #9: **merged** after exact-head verification.
* Human-witness head before merge: `62913dbebeccc356da591d45ef9bdcba07cbda36`
* Merge commit: `ccb7604be11febd181d5ee5841165902864aae20`
* GitHub Actions run #88: full `npm test` and `npm run synthetic:pilot` passed on the exact witness head.
* GitBook CR #51 remains the historical Phase-B2C design record; this reconciliation records the later real field proof.

## Governing compression

> Preserve the best available full-song source bytes first; keep browser auth ephemeral; admit only verified local bytes.

## What the implementation proves

The already-proven Phase-B2 membrane remains intact: authentication stays in the signed-in browser while durable authority begins from completed local bytes.

Phase B2C supports two honest WAV evidence paths without inventing provider capability:

1. **Observed DOM WAV surface.** A real `.wav` path or WAV MIME exposed by the page may be classified as `audio_wav`; query/fragment material remains ephemeral and durable request identity is the existing redacted descriptor hash.
2. **User-triggered browser WAV.** The operator explicitly arms **Witness one WAV** for one observed track, then uses Suno's normal Download → WAV action. The extension binds only a future WAV-shaped Chrome download to that one-shot arm. Bound state does not retain `url`, `finalUrl`, or `referrer`. If a second matching WAV races before terminal state, the witness fails closed as `wav_witness_ambiguous`.

At terminal completion, the arm closes before asynchronous local-path lookup, preventing a second download from entering the completed specimen window. This race was found during owner review: run #81 reproduced it as the sole failure at 54/55; run #82 proved that correction at 55/55.

## Real human WAV witness

A normal signed-in Suno specimen crossed the full boundary on 2026-08-25.

* Provider track ID: `19f162ac-69ff-4aca-b740-3d5a79b21c29`
* Observation timestamp: `2026-08-25T03:03:33.156Z`
* Run: `suno-b2-20260825T030350830Z-2027095a`
* Staged specimen: `Weback Chant (2).wav`
* Admitted role: `audio_wav`
* Receipt state: `verified`
* Final relative Vault path: `assets/19f162ac-69ff-4aca-b740-3d5a79b21c29/audio_wav.wav`
* Byte length: `24944812`
* SHA-256: `d7672022147ad8ae22bdb01455eedd4b16deef16888cd86d747ae79b65dc9dec`
* Independent operator PowerShell SHA-256 matched the receipt exactly.
* Independent operator byte length matched the receipt exactly.
* The specimen was admitted under an operator-selected external-drive Vault root without granting the browser direct filesystem authority to that drive.
* The durable acquisition journal and handoff were inspected and contained no signed URL/query/fragment, referrer, cookie, authorization header, token, session material, browser storage, or raw metadata.
* The 25-track/full-corpus acquisition gate remained closed.

This satisfies the mandatory one-real-WAV human gate.

## Field-discovered omission seam

The successful specimen exposed one final representation mismatch: the acquisition receipt correctly omitted a nonexistent browser-WAV `requestDescriptorSha256`, while the handoff projection represented the same absence as `null`.

The seam was closed under an explicit RED → GREEN cycle:

* run #86: RED at 56/57; only the new WAV descriptor-omission regression failed;
* run #87: the production fix made that regression green and exposed one stale test that still expected the old `null` representation;
* run #88: the reconciled exact head passed the full test suite and synthetic pilot.

A user-triggered browser WAV with no honest safe request descriptor now keeps that field absent in the durable handoff rather than fabricating or null-filling it.

## Local admission

`pilot:admit` remains the durable authority boundary.

For `assetRole=audio_wav`, the staged file must pass a bounded RIFF/WAVE or RF64/WAVE container sanity check before a verified receipt can be written. Exact SHA-256 and byte length, `.partial` verification, atomic promotion, append-only journal, handoff projection, and independent final re-verification remain unchanged.

When a user-triggered browser WAV has no honest safe request descriptor, `requestDescriptorSha256` is omitted rather than fabricated. The durable acquisition contract permits this.

The operator may choose an external-drive `--vault-root`; the browser receives no direct filesystem authority to that drive.

## Temporary Windows handoff

The side panel resolves Chrome's actual completed local filename and combines it with the selected Vault root and bounded witness fields into a copyable one-line PowerShell `pilot:admit` command.

This is explicitly **proof ceremony**, not the intended final workflow. A later local companion should remove manual PowerShell admission while reusing the same verifier/journal/handoff boundary.

## Authority that still does not cross

Phase B2C adds no cookies, request-header interception, `<all_urls>`, Native Messaging, clipboard extension permission, browser storage, telemetry, server acquisition, hidden endpoint reconstruction, stems, 25-track acquisition, or full-corpus run.

`downloads` remains optional-only authority requested from the explicit user gesture.

## Gate result and next boundary

The one-real-WAV gate is now witnessed rather than proposed: provider identity, one-shot arm, normal Suno WAV action, completed staging, external-root admission, WAV sanity, exact independent hash/length verification, durable secret inspection, and the closed 25-track/full-corpus control all survived contact with the real specimen.

Bounded multi-song WAV preservation may now be designed as a separate next slice. This Phase B2C landing does **not** itself authorize 25-track or full-corpus acquisition.
