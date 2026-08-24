#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const { guardCorpusAdmission } = require("../full-bowl-001/encounter-binding-guard.cjs");

const scriptDir = dirname(fileURLToPath(import.meta.url));
const integrationDir = resolve(scriptDir, "../..");
const baselineFixturePath = resolve(
  integrationDir,
  "tools/full-bowl-001/fixtures/full-bowl-001.json",
);
const baselineProbePath = resolve(
  integrationDir,
  "tools/full-bowl-001/live-probe.mjs",
);

const PINS = Object.freeze({
  integrationBase: "36abc47cf288e839a93fb17a7b4f4fa163cd148a",
  project0: "061b9a6e1c9314f7fb43dbb0026059211ed19f0d",
  corpusOs: "289c6fa04d04a2bde6dffbe7265903db5bec56c0",
  tranchNode: "91f7f96805d4e868e35b8d0c75dc5f0671cb494a",
});

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  if (index === process.argv.length - 1) throw new Error(`FB002_ARGUMENT_MISSING:${name}`);
  return resolve(process.argv[index + 1]);
}

const project0Dir = argument("--project0", resolve(integrationDir, "../project0"));
const corpusOsDir = argument("--corpus-os", resolve(integrationDir, "../corpus-os"));
const tranchNodeDir = argument("--tranchnode", resolve(integrationDir, "../tranchnode"));

function command(program, args, options = {}) {
  const run = spawnSync(program, args, {
    cwd: options.cwd,
    input: options.input,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });
  if (run.error) throw run.error;
  return run;
}

function runJsonAdapter(script, cwd, payload) {
  const run = command(process.execPath, [script], {
    cwd,
    input: `${JSON.stringify(payload)}\n`,
  });
  let response;
  try {
    response = JSON.parse(run.stdout);
  } catch {
    throw new Error(`FB002_ADAPTER_NON_JSON:${script}:${run.stderr.trim()}`);
  }
  return { exitCode: run.status, response, stderr: run.stderr };
}

function exactPhaseShape(phases) {
  const expected = [
    ["destination-admission", "admitted", "CORPUS_DESTINATION_ADMITTED"],
    ["local-authority", "admitted", "ACTION_WARRANT_ADMITTED"],
    ["attempt", "admitted", "ACTION_WARRANT_EXECUTED"],
    ["outcome", "completed", "CORPUS_ENCOUNTER_COMPLETED"],
  ];
  if (!Array.isArray(phases) || phases.length !== expected.length) return false;
  const forbidden = new Set([
    "warrant",
    "actorId",
    "capacity",
    "trustId",
    "trustHandle",
    "capabilityId",
    "capabilityOperation",
  ]);
  return phases.every((entry, index) => {
    const [phase, disposition, reasonCode] = expected[index];
    return entry?.phase === phase
      && entry?.disposition === disposition
      && entry?.reasonCode === reasonCode
      && entry?.authorityTransfer === "none"
      && Array.isArray(entry?.evidenceRefs)
      && Object.keys(entry).every((key) => !forbidden.has(key));
  });
}

const originalFixture = JSON.parse(readFileSync(baselineFixturePath, "utf8"));
const rerunFixture = {
  ...originalFixture,
  taskWorldCut: {
    ...originalFixture.taskWorldCut,
    ownerHeads: {
      "the-static-collective/What-is-the-static-collective-": PINS.integrationBase,
      "the-static-collective/project0": PINS.project0,
      "the-static-collective/corpus-os": PINS.corpusOs,
      "the-static-collective/tranchnode": PINS.tranchNode,
    },
  },
};

const temporaryDir = mkdtempSync(join(tmpdir(), "full-bowl-002-"));
const rerunFixturePath = join(temporaryDir, "full-bowl-002-fixture.json");
writeFileSync(rerunFixturePath, `${JSON.stringify(rerunFixture, null, 2)}\n`);

let baseline;
try {
  const baselineRun = command(
    process.execPath,
    [
      baselineProbePath,
      "--fixture",
      rerunFixturePath,
      "--project0",
      project0Dir,
      "--corpus-os",
      corpusOsDir,
      "--tranchnode",
      tranchNodeDir,
    ],
    { cwd: integrationDir },
  );
  if (baselineRun.status !== 0) {
    throw new Error(
      `FB002_BASELINE_FAILED:${baselineRun.stderr.trim() || baselineRun.stdout.trim()}`,
    );
  }
  baseline = JSON.parse(baselineRun.stdout);
} finally {
  rmSync(temporaryDir, { recursive: true, force: true });
}

const liveChecks = baseline.liveOwnerChecks ?? [];
const oldTenPass = liveChecks.length === 10
  && liveChecks.every((entry) => entry.status === "pass");
const oldRefusalsPreserved = [
  "corpus-invented-authority-refused",
  "project0-purpose-relative-recognition",
  "reachability-does-not-become-permission",
].every((id) => liveChecks.some((entry) => entry.id === id && entry.status === "pass"));

const correctRef = baseline.ownerReceipts?.project0?.verified?.record?.ref;
const cleanVerification = {
  exitCode: 0,
  response: baseline.ownerReceipts?.project0?.verified,
};
const cleanGuard = guardCorpusAdmission({
  expectedRef: correctRef,
  verification: cleanVerification,
  admit: () => baseline.ownerReceipts?.corpusOs?.clean,
});

const detachedRef = `enc-${"f".repeat(64)}`;
const project0Adapter = resolve(project0Dir, ".build/scripts/world-encounter-stdio.js");
const detachedVerification = runJsonAdapter(project0Adapter, project0Dir, {
  schema: "project0/world-encounter-stdio/v0.1",
  operation: "verify",
  recordType: "exchange_envelope",
  expectedRef: detachedRef,
  body: rerunFixture.project0Envelope,
});
let detachedCorpusInvocations = 0;
const detachedGuard = guardCorpusAdmission({
  expectedRef: detachedRef,
  verification: detachedVerification,
  admit: () => {
    detachedCorpusInvocations += 1;
    return baseline.ownerReceipts?.corpusOs?.detachedEncounterRef;
  },
});

const l001Closed = cleanGuard.invoked === true
  && cleanGuard.binding?.authorityTransfer === "none"
  && cleanGuard.admission?.result?.status === "admitted"
  && detachedVerification.exitCode !== 0
  && detachedGuard.invoked === false
  && detachedCorpusInvocations === 0
  && detachedGuard.binding?.status === "refused"
  && detachedGuard.binding?.reasonCode === "PROJECT0_ENCOUNTER_BINDING_UNVERIFIED"
  && detachedGuard.binding?.authorityTransfer === "none";

const cleanCorpusResult = baseline.ownerReceipts?.corpusOs?.clean?.result;
const l002Closed = exactPhaseShape(cleanCorpusResult?.phases)
  && cleanCorpusResult?.authorityTransfer === "none";

const legacyLeakIds = (baseline.leakLedger?.entries ?? []).map((entry) => entry.id).sort();
const expectedLegacyDetectorObservations = legacyLeakIds.length === 2
  && legacyLeakIds[0] === "FB001-L001"
  && legacyLeakIds[1] === "FB001-L002";

const residualUnresolved = baseline.residualUnresolved ?? [];
const unresolvedIds = residualUnresolved.map((entry) => entry.id).sort();
const unresolvedPreserved = unresolvedIds.length === 2
  && unresolvedIds[0] === "FB001-U001"
  && unresolvedIds[1] === "FB001-U002";
const hostilePromotions = rerunFixture.hostilePacket.items.filter((item) => item.promoted).length;

const passed = oldTenPass
  && oldRefusalsPreserved
  && l001Closed
  && l002Closed
  && expectedLegacyDetectorObservations
  && unresolvedPreserved
  && hostilePromotions === 0
  && baseline.authority === "none";

const report = {
  schema: "static-collective/full-bowl-002-repair-rerun/v0",
  specimen: "Black Glass Seed 001",
  hostileParticipant: "MADDCL0WN",
  purpose: "Re-run the unchanged hostile Full Bowl 001 specimen against the two independently repaired seams without changing authority ownership.",
  taskWorldCut: {
    integrationBase: PINS.integrationBase,
    project0: PINS.project0,
    corpusOs: PINS.corpusOs,
    tranchNode: PINS.tranchNode,
  },
  status: passed ? "survives-repaired-seams" : "failed",
  baselineCrossings: {
    passed: liveChecks.filter((entry) => entry.status === "pass").length,
    total: liveChecks.length,
    oldRefusalsPreserved,
  },
  repairClosures: [
    {
      id: "FB001-L001",
      status: l001Closed ? "closed" : "open",
      owner: "integration",
      evidence: {
        cleanBinding: cleanGuard.binding?.status,
        cleanAdmission: cleanGuard.admission?.result?.status,
        detachedProject0ExitCode: detachedVerification.exitCode,
        detachedProject0Reason: detachedVerification.response?.error?.code ?? null,
        detachedBinding: detachedGuard.binding?.status,
        detachedCorpusInvocations,
        authorityTransfer: detachedGuard.binding?.authorityTransfer ?? null,
      },
    },
    {
      id: "FB001-L002",
      status: l002Closed ? "closed" : "open",
      owner: "Corpus OS",
      evidence: {
        phases: cleanCorpusResult?.phases ?? null,
        authorityTransfer: cleanCorpusResult?.authorityTransfer ?? null,
      },
    },
  ],
  legacyDetectorObservations: {
    ids: legacyLeakIds,
    interpretation: [
      "FB001-L001 remains observable only when the historical probe deliberately bypasses the new integration-owned binding guard and invokes Corpus directly; the repaired crossing verdict is the guard closure above.",
      "FB001-L002 remains observable to the historical detector because that detector searched for four proposed top-level field names; Corpus chose the narrower ordered inert phases[] surface, verified above.",
    ],
  },
  residualUnresolved,
  hostilePromotions,
  authority: baseline.authority,
  legalValidity: baseline.legalValidity,
  nonClaims: baseline.nonClaims,
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!passed) process.exitCode = 1;
