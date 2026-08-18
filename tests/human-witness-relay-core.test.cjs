const test = require("node:test");
const assert = require("node:assert/strict");
const {
  validateHumanWitnessEventV0,
} = require("../tools/human-witness-relay/validate.cjs");

function validEvent(overrides = {}) {
  const base = {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/the-haunted-toaster",
      pullRequest: 146,
      headSha: "944169c7f7bbd821f51fa8e404302cbaa8f4a342",
      gateId: "elastic-topology-response-v1-field-witness/quiet-spacious",
      artifactRefs: ["artifact:windows-portable"],
      buildRefs: ["workflow:32057926247"],
    },
    witness: {
      observedAt: "2026-08-17T22:00:00-05:00",
      observerRef: "human:local-owner",
      observation: "quiet one breathes without losing the frame",
      disposition: "pass",
    },
    evidenceRefs: [],
    provenance: {
      captureSurface: "chat",
      relayPolicy: "human-witness-relay-v0",
    },
  };
  return { ...base, ...overrides };
}

test("accepts a bounded event bound to an exact head", () => {
  const result = validateHumanWitnessEventV0(validEvent());
  assert.equal(result.ok, true);
  assert.equal(result.event.witness.observation, "quiet one breathes without losing the frame");
});

test("missing exact head fails closed", () => {
  const event = validEvent();
  delete event.subject.headSha;
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "WITNESS_EXECUTION_IDENTITY_MISSING"));
});

test("malformed exact head is rejected", () => {
  const event = validEvent();
  event.subject.headSha = "ABC123";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.path === "subject.headSha"));
});

test("unknown disposition is rejected", () => {
  const event = validEvent();
  event.witness.disposition = "pretty-good";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.code === "WITNESS_DISPOSITION_INVALID"));
});

test("empty observation is rejected", () => {
  const event = validEvent();
  event.witness.observation = "";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.path === "witness.observation"));
});

test("missing gate id is rejected", () => {
  const event = validEvent();
  delete event.subject.gateId;
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.path === "subject.gateId"));
});

test("non ISO observedAt is rejected", () => {
  const event = validEvent();
  event.witness.observedAt = "yesterday-ish";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.ok(result.errors.some((error) => error.path === "witness.observedAt"));
});

module.exports = { validEvent };
