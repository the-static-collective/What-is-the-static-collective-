---
description: >-
  A dated projection of National Treasure's LC-004 independently sampled Greek
  reference corpus and translation-carry pressure surface.
---

# National Treasure — LC-004 Greek Control Deck

**Projection date:** 2026-09-22\
**Project authority:** [the-static-collective/national-treasure](https://github.com/the-static-collective/national-treasure)\
**Merge:** [a6f1533](https://github.com/the-static-collective/national-treasure/commit/a6f1533537f88e837ba1560731d23645676a5b52)\
**Research notebook:** [LC-004 — The Greek Control Deck](https://github.com/the-static-collective/national-treasure/blob/main/threads/linguistic-carry/LC-004-independent-reference.md)

## What became executable

LC-004 moves the Red Letter / Linguistic Carry work beyond an eight-saying proof corpus. It adds a reproducible 512-verse Greek control deck from the public-domain Robinson-Pierpont 2018 Byzantine Textform:

* 256 Gospel verses;
* 256 non-Gospel New Testament verses;
* exact upstream commit pin;
* SHA-256 receipts for all 27 input TEI files and the generated artifact;
* all eight Red Letter target locators excluded before sampling;
* tamper and contamination gates;
* separate word, within-verse window, and observed-letter IID null models.

The selection is deterministic SHA-256 ranking under a declared seed. It is a reproducible pseudo-random sample, not a claim of universal statistical representativeness.

## The useful finding

For `Σήμερον` (normalized `σημερον`, seven letters, Milesian value 473), the control deck finds five value matches among 705 attested same-length words. Four are `σημερον`; the fifth is unrelated `ασθενης`.

That is the point of the control surface:

> recurrence can be observed; numerical collision can be observed; neither observation supplies an interpretation.

The measured rate also changes across word, character-window, IID-character, Gospel, and non-Gospel models. LC-004 preserves that model sensitivity instead of compressing it into one magic-looking probability.

## Authority and boundary

This page is orientation, not corpus authority. The repository manifest, generator, tests, and committed reference artifact own the executable claim.

LC-004 does **not** introduce Syriac, reconstruct Aramaic, recover an oral transcript, establish authorial intent, or assign theological meaning to a number. The next gate is a separately sourced Syriac witness pack. An attested Peshitta reading must remain a textual witness; any Aramaic retroversion must enter as a different, explicitly hypothetical node class.

> **The control deck does not solve the mystery. It stops the target from grading its own test.**
