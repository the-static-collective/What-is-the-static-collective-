const test = require("node:test");
const assert = require("node:assert/strict");
const {
  isToasterWitnessEvent,
  toasterSpecimenFor,
} = require("../tools/human-witness-relay/adapters/toaster.cjs");

function event(gateId, disposition = "pass") {
  return {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/the-haunted-toaster",
      pullRequest: 146,
      headSha: "944169c7f7bbd821f51fa8e404302cbaa8f4a342",
      gateId,
      artifactRefs: ["artifact:windows-portable"],
      buildRefs: ["workflow:32057926247"],
    },
    witness: {
      observedAt: "2026-08-18T00:05:00-05:00",
      observerRef: "human:local-owner",
      observation: "SYNTHETIC: specimen observation",
      disposition,
    },
    evidenceRefs: ["evidence:synthetic-toaster"],
    provenance: { captureSurface: "fixture", relayPolicy: "human-witness-relay-v0" },
  };
}

test("recognizes only the three declared PR 146 specimens", () => {
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/quiet-spacious")), true);
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/dense-mastered-distorted")), true);
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/linear-positive-control")), true);
  assert.equal(isToasterWitnessEvent(event("elastic-topology-response-v1-field-witness/unknown")), false);
});

test("rejects wrong repository and PR", () => {
  const wrongRepo = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  wrongRepo.subject.repository = "synthetic/not-toaster";
  assert.equal(isToasterWitnessEvent(wrongRepo), false);
  const wrongPr = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  wrongPr.subject.pullRequest = 999;
  assert.equal(isToasterWitnessEvent(wrongPr), false);
});

test("extracts the declared specimen identity", () => {
  assert.equal(
    toasterSpecimenFor(event("elastic-topology-response-v1-field-witness/dense-mastered-distorted")),
    "dense-mastered-distorted",
  );
  assert.equal(toasterSpecimenFor(event("elastic-topology-response-v1-field-witness/unknown")), null);
});

test("renders witness as evidence, not authority", () => {
  const { renderToasterEvidencePacket } = require("../tools/human-witness-relay/adapters/toaster.cjs");
  const witness = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  const eventId = `hwv0_${"a".repeat(64)}`;
  const packet = renderToasterEvidencePacket(witness, { eventId });
  assert.match(packet.markdown, /hwv0_a{64}/);
  assert.match(packet.markdown, /944169c7f7bbd821f51fa8e404302cbaa8f4a342/);
  assert.match(packet.markdown, /quiet-spacious/);
  assert.match(packet.markdown, /Human disposition: `pass`/);
  assert.match(packet.markdown, /SYNTHETIC: specimen observation/);
  assert.match(packet.markdown, /workflow:32057926247/);
  assert.match(packet.markdown, /artifact:windows-portable/);
  assert.match(packet.markdown, /evidence:synthetic-toaster/);
  assert.match(packet.markdown, /pending project admission/i);
  assert.doesNotMatch(packet.markdown, /gate closed|merge approved/i);
  assert.equal(packet.projectDisposition, "pending-project-admission");
  assert.equal(packet.nextDoor, null);
  assert.deepEqual(packet.destination, {
    kind: "github-pr-comment",
    repository: "the-static-collective/the-haunted-toaster",
    pullRequest: 146,
  });
});

test("Toaster evidence renderer requires a deterministic event id", () => {
  const { renderToasterEvidencePacket } = require("../tools/human-witness-relay/adapters/toaster.cjs");
  const witness = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  assert.throws(
    () => renderToasterEvidencePacket(witness, {}),
    (error) => error.code === "WITNESS_EVENT_ID_INVALID",
  );
});

test("a witness for head A cannot route as current evidence for head B", () => {
  const { assertToasterHeadFresh } = require("../tools/human-witness-relay/adapters/toaster.cjs");
  const eventA = event("elastic-topology-response-v1-field-witness/quiet-spacious");
  const currentHeadSha = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
  assert.throws(
    () => assertToasterHeadFresh(eventA, currentHeadSha),
    (error) => {
      assert.equal(error.code, "WITNESS_HEAD_STALE");
      assert.equal(error.witnessHeadSha, eventA.subject.headSha);
      assert.equal(error.currentHeadSha, currentHeadSha);
      assert.doesNotMatch(error.message, /SYNTHETIC: specimen observation/);
      return true;
    },
  );
});

test("exact matching Toaster head is fresh", () => {
  const { assertToasterHeadFresh } = require("../tools/human-witness-relay/adapters/toaster.cjs");
  const witness = event("elastic-topology-response-v1-field-witness/linear-positive-control");
  assert.equal(assertToasterHeadFresh(witness, witness.subject.headSha), true);
});

test("Toaster pass fail and ambiguous fixtures route through exact registered keys", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const { defaultRegistry, prepareWitnessRoutingPacket } = require("../tools/human-witness-relay/index.cjs");
  const fixtureDir = path.join(__dirname, "../tools/human-witness-relay/fixtures");
  const names = [
    "toaster-quiet-pass.json",
    "toaster-dense-fail.json",
    "toaster-linear-ambiguous.json",
  ];
  const packets = names.map((name) => {
    const fixture = JSON.parse(fs.readFileSync(path.join(fixtureDir, name), "utf8"));
    const packet = prepareWitnessRoutingPacket(fixture, defaultRegistry);
    assert.match(fixture.witness.observation, /^SYNTHETIC:/);
    assert.match(packet.routing.markdown, new RegExp(packet.eventId));
    assert.match(packet.routing.markdown, new RegExp(fixture.subject.headSha));
    assert.match(packet.routing.markdown, new RegExp("Human disposition: `" + fixture.witness.disposition + "`"));
    assert.equal(packet.routing.projectDisposition, "pending-project-admission");
    assert.equal(packet.routing.nextDoor, null);
    return packet;
  });
  assert.equal(packets.length, 3);
});

test("Toaster default registry does not use wildcard routing", () => {
  const { defaultRegistry, prepareWitnessRoutingPacket } = require("../tools/human-witness-relay/index.cjs");
  const unknown = event("elastic-topology-response-v1-field-witness/unknown");
  assert.throws(
    () => prepareWitnessRoutingPacket(unknown, defaultRegistry),
    (error) => error.code === "WITNESS_TARGET_UNKNOWN",
  );
});

module.exports = { event };
