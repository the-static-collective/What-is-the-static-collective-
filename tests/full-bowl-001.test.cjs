const assert = require("node:assert/strict");
const { spawnSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const test = require("node:test");

const {
  FullBowlValidationError,
  createFixtureReceipt,
  validateFixture,
} = require("../tools/full-bowl-001/core.cjs");

const fixturePath = path.join(
  __dirname,
  "../tools/full-bowl-001/fixtures/full-bowl-001.json",
);
const receiptPath = path.join(
  __dirname,
  "../receipts/full-bowl-001/live-witness.json",
);
const graphPacketPath = path.join(
  __dirname,
  "../receipts/full-bowl-001/free-graph.packet.json",
);

function fixture() {
  return JSON.parse(fs.readFileSync(fixturePath, "utf8"));
}

function mutationError(mutator) {
  const value = fixture();
  mutator(value);
  assert.throws(
    () => validateFixture(value),
    (error) => error instanceof FullBowlValidationError,
  );
}

test("the bounded fixture mechanically declares all ten non-collapsed crossings", () => {
  const value = validateFixture(fixture());
  assert.equal(value.crossings.length, 10);
  for (const [index, crossing] of value.crossings.entries()) {
    assert.equal(crossing.sequence, index + 1);
    assert.deepEqual(Object.keys(crossing.expected).sort(), [
      "lawful",
      "refused",
      "unresolved",
    ]);
  }
});

test("MADDCL0WN supplies exactly seven attributed attacks with no promotion", () => {
  const value = validateFixture(fixture());
  assert.equal(value.hostilePacket.items.length, 7);
  assert.equal(value.hostilePacket.authority, "none");
  assert.equal(value.hostilePacket.admission, "attributable-material-only");
  assert.ok(value.hostilePacket.items.some((item) => item.expectedDisposition === "refused"));
  assert.ok(value.hostilePacket.items.some((item) => item.expectedDisposition === "unresolved"));
  assert.ok(value.hostilePacket.items.some((item) => item.boundedQuestion));
  assert.ok(value.hostilePacket.items.every((item) => item.promoted === false));
});

test("fixture receipt is deterministic and carries no authority", () => {
  const first = createFixtureReceipt(fixture());
  const second = createFixtureReceipt(fixture());
  assert.deepEqual(second, first);
  assert.match(first.fixtureDigest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(first.fixtureDigest, "sha256:710e94849326dcf19b2539c7832b1a8b29d7a26b91461de47d76022fa1abc488");
  assert.equal(first.status, "fixture-conforms");
  assert.equal(first.authority, "none");
  assert.equal(first.leakLedger.automaticRepair, false);
});

test("adjacent states cannot be silently collapsed", () => {
  mutationError((value) => {
    value.crossings[4].to = "WorldCut";
  });
});

test("hostile material cannot silently promote itself", () => {
  mutationError((value) => {
    value.hostilePacket.items[3].promoted = true;
  });
});

test("source authority cannot travel with the encounter envelope", () => {
  mutationError((value) => {
    value.project0Envelope.sourceAuthorityRefs = ["authority:maddcl0wn"];
  });
});

test("visible return cannot erase changed history", () => {
  mutationError((value) => {
    value.specimen.after.historyRef = value.specimen.before.historyRef;
  });
});

test("automatic repair remains forbidden", () => {
  mutationError((value) => {
    value.leakPolicy.automaticRepair = true;
  });
});

test("the executable CLI emits a conforming fixture receipt", () => {
  const cli = path.join(__dirname, "../tools/full-bowl-001/cli.cjs");
  const run = spawnSync(process.execPath, [cli], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const receipt = JSON.parse(run.stdout);
  assert.equal(receipt.status, "fixture-conforms");
  assert.equal(receipt.crossingMap.length, 10);
  assert.equal(receipt.hostilePacket.refused, 3);
  assert.equal(receipt.hostilePacket.unresolved, 4);
});

test("the pinned live summary preserves evidence mode and leak boundaries", () => {
  const value = validateFixture(fixture());
  const receipt = JSON.parse(fs.readFileSync(receiptPath, "utf8"));
  assert.equal(receipt.fixtureDigest, createFixtureReceipt(value).fixtureDigest);
  assert.equal(receipt.status, "survives-with-exposed-leaks");
  assert.equal(receipt.liveChecks.every((entry) => entry.status === "pass"), true);
  assert.deepEqual(
    receipt.leakLedger.entries.map((entry) => entry.id),
    ["FB001-L001", "FB001-L002"],
  );
  assert.equal(receipt.leakLedger.automaticRepair, false);
  assert.equal(receipt.repairIssueCandidates.length, 2);
  assert.ok(receipt.repairIssueCandidates.length <= value.leakPolicy.maxRepairIssues);
  assert.match(receipt.liveClaimDigest, /^sha256:[0-9a-f]{64}$/);
  assert.equal(receipt.integrationRunner.headRelation, "descendant-of-pinned-base");
  assert.match(receipt.integrationRunner.runnerDigest, /^sha256:[0-9a-f]{64}$/);
  const project0Validation = receipt.ownerValidation.find(
    (entry) => entry.owner === "Project0",
  );
  assert.match(project0Validation.command, /--outDir \.build/);
  assert.equal(receipt.receipts.corpusAdmission.refused.authorityTransfer, "none");
  assert.equal(receipt.receipts.tranchNodeContinuity.authority, "none");
  assert.equal(receipt.receipts.purposeRelativeRecognition.original.status, "conforming");
  assert.equal(receipt.receipts.purposeRelativeRecognition.lookalike.status, "refused");
  assert.equal(receipt.receipts.reachabilityAttack.code, "LATENT_WARRANT_INVALID");
});

test("the Free Graph projection preserves proof, refusal, fog, and no adoption", () => {
  const packet = JSON.parse(fs.readFileSync(graphPacketPath, "utf8"));
  assert.equal(packet.schema, "free-graph.packet/v0");
  assert.equal(packet.packet_id, "fgp:sha256:6d7da3fe317e3d4973138815f5ebc552d0c2866b5ba01a21085767bde7f02514");
  assert.deepEqual(packet.modes, ["re-enter", "metabolize", "prove"]);
  assert.equal(packet.task_world_cut.status, "sufficient");
  assert.equal(packet.links.some((link) => link.verb === "constitutes"), false);
  assert.equal(packet.links.some((link) => link.bearing === "supports"), true);
  assert.equal(packet.links.filter((link) => link.bearing === "refuses").length, 2);
  assert.equal(packet.links.every((link) => link.authority !== "owner-local"), true);
  assert.equal(packet.residual_fog.length, 3);
});
