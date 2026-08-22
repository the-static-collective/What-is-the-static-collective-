# Autodiscography Vault — Phase B2C WAV Preservation

## Status

**Implementation candidate; human WAV specimen pending.**

Repository: `the-static-collective/autodiscography-vault`

* Issue #8: Phase B2C — prove one full-song WAV preservation path
* PR #9: Phase B2C — prove one full-song WAV preservation path
* Exact candidate head: `0232ddf0e59e1b8148538a3c97b3527a76a8d008`
* GitHub Actions run #82: **55/55 tests passed** and synthetic interruption/resume pilot passed
* This GitBook change request remains draft until a real signed-in full-song WAV crosses the boundary.

## Governing compression

> Preserve the best available full-song source bytes first; keep browser auth ephemeral; admit only verified local bytes.

## What the candidate now proves automatically

The already-proven Phase-B2 membrane remains intact: authentication stays in the signed-in browser while durable authority begins from completed local bytes.

Phase B2C adds two honest WAV evidence paths without inventing provider capability:

1. **Observed DOM WAV surface.** A real `.wav` path or WAV MIME exposed by the page may be classified as `audio_wav`; query/fragment material remains ephemeral and durable request identity is the existing redacted descriptor hash.
2. **User-triggered browser WAV.** The operator explicitly arms **Witness one WAV** for one observed track, then uses Suno's normal Download → WAV action. The extension binds only a future WAV-shaped Chrome download to that one-shot arm. Bound state does not retain `url`, `finalUrl`, or `referrer`. If a second matching WAV races before terminal state, the witness fails closed as `wav_witness_ambiguous`.

At terminal completion, the arm closes before asynchronous local-path lookup, preventing a second download from entering the completed specimen window. This race was found during owner review: run #81 reproduced it as the sole failure at 54/55; run #82 proves the correction at 55/55.

## Local admission

`pilot:admit` remains the durable authority boundary.

For `assetRole=audio_wav`, the staged file must pass a bounded RIFF/WAVE or RF64/WAVE container sanity check before a verified receipt can be written. Exact SHA-256 and byte length, `.partial` verification, atomic promotion, append-only journal, handoff projection, and independent final re-verification remain unchanged.

When a user-triggered browser WAV has no honest safe request descriptor, `requestDescriptorSha256` is omitted rather than fabricated. The durable acquisition contract already permits this.

The operator may choose an external-drive `--vault-root`; the browser receives no direct filesystem authority to that drive.

## Temporary Windows handoff

The side panel resolves Chrome's actual completed local filename and combines it with the selected Vault root and bounded witness fields into a copyable one-line PowerShell `pilot:admit` command.

This is explicitly **proof ceremony**, not the intended final workflow. A later local companion should remove manual PowerShell admission while reusing the same verifier/journal/handoff boundary.

## Authority that still does not cross

Phase B2C adds no cookies, request-header interception, `<all_urls>`, Native Messaging, clipboard extension permission, browser storage, telemetry, server acquisition, hidden endpoint reconstruction, stems, 25-track acquisition, or full-corpus run.

`downloads` remains optional-only authority requested from the explicit user gesture.

## Human gate

The candidate is not yet a proved WAV transport until one normal signed-in specimen establishes:

1. real provider track ID and exact observation timestamp;
2. explicit Downloads grant and one-track WAV arm;
3. operator uses Suno's normal Download → WAV action;
4. exactly one real full-song WAV reaches completed staging;
5. local `audio_wav` admission succeeds under the chosen Vault root/external drive;
6. RIFF/WAVE or RF64/WAVE sanity passes;
7. independent final SHA-256 and byte length equal the receipt;
8. durable journal/handoff contain no reusable URL/auth/session material;
9. the 25-track/full-corpus control remains disabled.

Only after that specimen may bounded multi-song WAV preservation be designed. This draft must not be promoted to witnessed proof before then.
