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

test("rejects secret-shaped fields without echoing their values", () => {
  const event = validEvent();
  event.provenance.authorizationHeader = "Bearer super-secret-value";
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  const serialized = JSON.stringify(result);
  assert.match(serialized, /WITNESS_FORBIDDEN_MATERIAL/);
  assert.doesNotMatch(serialized, /super-secret-value/);
});

test("rejects signed-url/session shaped keys recursively", () => {
  const event = validEvent();
  event.subject.extra = { cookie: "abc", signedUrl: "https://provider.invalid/x?sig=secret" };
  const result = validateHumanWitnessEventV0(event);
  assert.equal(result.ok, false);
  assert.equal(result.errors.filter((e) => e.code === "WITNESS_FORBIDDEN_MATERIAL").length, 2);
});

test("event identity is deterministic and observation-sensitive", () => {
  const { humanWitnessEventId } = require("../tools/human-witness-relay/event-id.cjs");
  const a = validEvent();
  const b = JSON.parse(JSON.stringify(a));
  assert.equal(humanWitnessEventId(a), humanWitnessEventId(b));
  assert.match(humanWitnessEventId(a), /^hwv0_[a-f0-9]{64}$/);
  b.witness.observation += "!";
  assert.notEqual(humanWitnessEventId(a), humanWitnessEventId(b));
});

test("event identity ignores object insertion order outside ordered arrays", () => {
  const { humanWitnessEventId } = require("../tools/human-witness-relay/event-id.cjs");
  const a = validEvent();
  const b = {
    provenance: { relayPolicy: a.provenance.relayPolicy, captureSurface: a.provenance.captureSurface },
    evidenceRefs: [...a.evidenceRefs],
    witness: {
      disposition: a.witness.disposition,
      observation: a.witness.observation,
      observerRef: a.witness.observerRef,
      observedAt: a.witness.observedAt,
    },
    subject: {
      gateId: a.subject.gateId,
      headSha: a.subject.headSha,
      repository: a.subject.repository,
      buildRefs: [...a.subject.buildRefs],
      artifactRefs: [...a.subject.artifactRefs],
      pullRequest: a.subject.pullRequest,
    },
    schema: a.schema,
  };
  assert.equal(humanWitnessEventId(a), humanWitnessEventId(b));
});

module.exports = { validEvent };
