# Reusable card contract

A small card should be readable by a stranger or a future session without reconstructing an entire conversation.

**Work Card:** card_id (local), project_owner, project_type, objective, known_sources, statuses, boundary/permissions, proposal, exact next test, success condition, last observed date, open questions.

**Return Card:** question, original source cut, what was actually done, what was merely proposed, changed assumptions, verified result, held gaps, owner decision, next experiment, save location when actually written. Never state “saved” without a destination and observable write result.

**Crossing Card:** sender, receiver, scoped material, consent/right-to-share, source fingerprints (optional), transformations, omitted/redacted fields, receiver gate: `HOLD|REFUSE|ADMIT`, and acknowledgement. Without receiver evidence, gate = HOLD.

**Publication Card:** source identity, author/rights holder, edition surface (physical/digital/crawler/archive), transformation summary, approval state, proof state, public release state, revision relation and obligations.

**Story Canon Card:** world, source scene, viewpoint/observer, four clocks where relevant, claim and status `CANON|RUMOR|PROPOSED|CONTRADICTION|UNKNOWN`, author decision and unresolved consequence.

IDs may be generated within a conversation for convenience but are not globally unique or registered. File hashes should only be reported when computed from actual bytes. No invented citations, signatures or deployment evidence.
