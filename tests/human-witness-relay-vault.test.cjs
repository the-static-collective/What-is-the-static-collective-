const test = require("node:test");
const assert = require("node:assert/strict");
const {
  isVaultWitnessEvent,
  parseVaultEvidenceRefs,
} = require("../tools/human-witness-relay/adapters/vault.cjs");

function event(overrides = {}) {
  const base = {
    schema: "static-collective/human-witness-event/v0",
    subject: {
      repository: "the-static-collective/autodiscography-vault",
      pullRequest: 9,
      headSha: "0232ddf0e59e1b8148538a3c97b3527a76a8d008",
      gateId: "phase-b2c-one-real-wav-preservation",
      artifactRefs: ["vault-artifact:audio/song.wav"],
      buildRefs: [],
    },
    witness: {
      observedAt: "2026-08-18T00:15:00-05:00",
      observerRef: "human:local-owner",
      observation: "SYNTHETIC: WAV landed and the receipt matched the independent check",
      disposition: "pass",
    },
    evidenceRefs: [
      "provider-track:track-123",
      "run:run-456",
      "receipt:receipts/run-456.audio_wav.json",
      `sha256:${"a".repeat(64)}`,
      "bytes:123456",
      "vault-artifact:audio/song.wav",
    ],
    provenance: { captureSurface: "fixture", relayPolicy: "human-witness-relay-v0" },
  };
  return { ...base, ...overrides };
}

test("recognizes only Vault PR 9 one-real-WAV gate", () => {
  assert.equal(isVaultWitnessEvent(event()), true);
  const wrongGate = event();
  wrongGate.subject.gateId = "full-corpus-wav";
  assert.equal(isVaultWitnessEvent(wrongGate), false);
  const wrongPr = event();
  wrongPr.subject.pullRequest = 10;
  assert.equal(isVaultWitnessEvent(wrongPr), false);
});

test("parses stable Vault evidence refs without provider URLs", () => {
  const refs = parseVaultEvidenceRefs(event());
  assert.equal(refs.providerTrackId, "track-123");
  assert.equal(refs.runId, "run-456");
  assert.equal(refs.receiptRef, "receipts/run-456.audio_wav.json");
  assert.equal(refs.byteLength, 123456);
  assert.match(refs.sha256, /^[a-f0-9]{64}$/);
  assert.equal(refs.vaultArtifactRef, "audio/song.wav");
});

test("duplicate singleton evidence refs fail as ambiguous", () => {
  const duplicate = event();
  duplicate.evidenceRefs.push("provider-track:track-999");
  assert.throws(
    () => parseVaultEvidenceRefs(duplicate),
    (error) => error.code === "WITNESS_EVIDENCE_AMBIGUOUS",
  );
});

test("provider URLs are not accepted as provider track identity", () => {
  const unsafe = event();
  unsafe.evidenceRefs = unsafe.evidenceRefs.filter((ref) => !ref.startsWith("provider-track:"));
  unsafe.evidenceRefs.push("provider-track:https://suno.invalid/song?id=secret");
  assert.throws(
    () => parseVaultEvidenceRefs(unsafe),
    (error) => error.code === "WITNESS_EVIDENCE_INVALID",
  );
});

test("complete refs still do not become project success", () => {
  const { vaultMachineEvidenceStatus } = require("../tools/human-witness-relay/adapters/vault.cjs");
  const status = vaultMachineEvidenceStatus(event());
  assert.equal(status.complete, true);
  assert.deepEqual(status.missing, []);
});

test("browser success without receipt hash bytes and destination remains incomplete", () => {
  const { vaultMachineEvidenceStatus } = require("../tools/human-witness-relay/adapters/vault.cjs");
  const incomplete = event();
  incomplete.evidenceRefs = ["provider-track:track-123", "run:run-456"];
  incomplete.subject.artifactRefs = [];
  const status = vaultMachineEvidenceStatus(incomplete);
  assert.equal(status.complete, false);
  assert.deepEqual(status.missing.sort(), ["byteLength", "receiptRef", "sha256", "vaultArtifactRef"].sort());
  assert.ok(status.present.includes("providerTrackId"));
});

test("renders Vault evidence without manufacturing project admission", () => {
  const { renderVaultEvidencePacket } = require("../tools/human-witness-relay/adapters/vault.cjs");
  const witness = event();
  const eventId = `hwv0_${"b".repeat(64)}`;
  const packet = renderVaultEvidencePacket(witness, { eventId });
  assert.match(packet.markdown, /hwv0_b{64}/);
  assert.match(packet.markdown, /0232ddf0e59e1b8148538a3c97b3527a76a8d008/);
  assert.match(packet.markdown, /Provider track: `track-123`/i);
  assert.match(packet.markdown, /Run: `run-456`/i);
  assert.match(packet.markdown, /SYNTHETIC: WAV landed/);
  assert.match(packet.markdown, /receipt: `receipts\/run-456\.audio_wav\.json`/i);
  assert.match(packet.markdown, /byte length: `123456`/i);
  assert.match(packet.markdown, /evidence class coverage: `complete`/i);
  assert.match(packet.markdown, /browser download completion alone does not establish successful Vault preservation/i);
  assert.match(packet.markdown, /pending project admission/i);
  assert.doesNotMatch(packet.markdown, /gate closed|merge approved/i);
  assert.doesNotMatch(packet.markdown, /https?:\/\//i);
  assert.doesNotMatch(packet.markdown, /relay verified|relay performed/i);
  assert.equal(packet.projectDisposition, "pending-project-admission");
  assert.equal(packet.nextDoor, null);
  assert.equal(packet.machineEvidence.complete, true);
});

test("Vault evidence renderer requires deterministic event id", () => {
  const { renderVaultEvidencePacket } = require("../tools/human-witness-relay/adapters/vault.cjs");
  assert.throws(
    () => renderVaultEvidencePacket(event(), {}),
    (error) => error.code === "WITNESS_EVENT_ID_INVALID",
  );
});

test("Vault witness does not satisfy a moved PR head", () => {
  const { assertVaultHeadFresh } = require("../tools/human-witness-relay/adapters/vault.cjs");
  const witness = event();
  const currentHeadSha = "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb";
  assert.throws(
    () => assertVaultHeadFresh(witness, currentHeadSha),
    (error) => {
      assert.equal(error.code, "WITNESS_HEAD_STALE");
      assert.equal(error.witnessHeadSha, witness.subject.headSha);
      assert.equal(error.currentHeadSha, currentHeadSha);
      assert.doesNotMatch(error.message, /SYNTHETIC: WAV landed/);
      return true;
    },
  );
});

test("exact matching Vault head is fresh", () => {
  const { assertVaultHeadFresh } = require("../tools/human-witness-relay/adapters/vault.cjs");
  const witness = event();
  assert.equal(assertVaultHeadFresh(witness, witness.subject.headSha), true);
});

test("Vault pass fail and ambiguous fixtures route through the exact registered key", () => {
  const fs = require("node:fs");
  const path = require("node:path");
  const { defaultRegistry, prepareWitnessRoutingPacket } = require("../tools/human-witness-relay/index.cjs");
  const fixtureDir = path.join(__dirname, "../tools/human-witness-relay/fixtures");
  const pass = JSON.parse(fs.readFileSync(path.join(fixtureDir, "vault-wav-pass.json"), "utf8"));
  const fail = JSON.parse(fs.readFileSync(path.join(fixtureDir, "vault-wav-fail.json"), "utf8"));
  const ambiguous = JSON.parse(fs.readFileSync(path.join(fixtureDir, "vault-wav-ambiguous.json"), "utf8"));
  const passPacket = prepareWitnessRoutingPacket(pass, defaultRegistry);
  const failPacket = prepareWitnessRoutingPacket(fail, defaultRegistry);
  const ambiguousPacket = prepareWitnessRoutingPacket(ambiguous, defaultRegistry);

  assert.equal(passPacket.routing.machineEvidence.complete, true);
  assert.equal(passPacket.routing.projectDisposition, "pending-project-admission");
  assert.match(passPacket.routing.markdown, new RegExp(passPacket.eventId));
  assert.match(passPacket.routing.markdown, /Human disposition: `pass`/);

  assert.equal(failPacket.routing.projectDisposition, "pending-project-admission");
  assert.match(failPacket.routing.markdown, /Human disposition: `fail`/);
  assert.equal(failPacket.routing.nextDoor, null);

  assert.equal(ambiguousPacket.routing.machineEvidence.complete, false);
  assert.match(ambiguousPacket.routing.markdown, /Human disposition: `ambiguous`/);
  assert.match(ambiguousPacket.routing.markdown, /missing classes:/i);
  assert.equal(ambiguousPacket.routing.nextDoor, null);
});

test("Vault default registry does not route adjacent gates", () => {
  const { defaultRegistry, prepareWitnessRoutingPacket } = require("../tools/human-witness-relay/index.cjs");
  const adjacent = event();
  adjacent.subject.gateId = "phase-b2c-full-corpus-wav";
  assert.throws(
    () => prepareWitnessRoutingPacket(adjacent, defaultRegistry),
    (error) => error.code === "WITNESS_TARGET_UNKNOWN",
  );
});

module.exports = { event };
