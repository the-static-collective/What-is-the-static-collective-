#!/usr/bin/env node
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const require = createRequire(import.meta.url);
const { createFixtureReceipt, digest, validateFixture } = require("./core.cjs");
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repositoryDir = resolve(scriptDir, "../..");

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index === -1) return fallback;
  if (index === process.argv.length - 1) throw new Error(`FB_ARGUMENT_MISSING:${name}`);
  return resolve(process.argv[index + 1]);
}

const fixturePath = argument(
  "--fixture",
  resolve(scriptDir, "fixtures/full-bowl-001.json"),
);
const project0Dir = argument("--project0", resolve(repositoryDir, "../project0"));
const corpusOsDir = argument("--corpus-os", resolve(repositoryDir, "../corpus-os"));
const tranchNodeDir = argument("--tranchnode", resolve(repositoryDir, "../tranchnode"));

function command(program, args, options = {}) {
  const run = spawnSync(program, args, {
    cwd: options.cwd,
    input: options.input,
    encoding: "utf8",
    maxBuffer: 10 * 1024 * 1024,
  });
  if (run.error) throw run.error;
  return {
    status: run.status,
    stdout: run.stdout,
    stderr: run.stderr,
  };
}

function gitHead(repoDir) {
  const run = command("git", ["rev-parse", "HEAD"], { cwd: repoDir });
  if (run.status !== 0) throw new Error(`FB_GIT_HEAD_FAILED:${repoDir}`);
  return run.stdout.trim();
}

function gitStatus(repoDir) {
  const run = command(
    "git",
    ["status", "--porcelain=v1", "--untracked-files=all"],
    { cwd: repoDir },
  );
  if (run.status !== 0) throw new Error(`FB_GIT_STATUS_FAILED:${repoDir}`);
  return run.stdout.trim();
}

function isAncestor(repoDir, ancestor, descendant) {
  return command("git", ["merge-base", "--is-ancestor", ancestor, descendant], {
    cwd: repoDir,
  }).status === 0;
}

function assertFile(path, code) {
  if (!existsSync(path)) throw new Error(`${code}:${path}`);
}

function assertCleanOwnerCheckout(repoDir, repo) {
  if (gitStatus(repoDir) !== "") throw new Error(`FB_OWNER_WORKTREE_DIRTY:${repo}`);
}

function buildTypescript(repoDir, args, code) {
  const compiler = resolve(repoDir, "node_modules/typescript/bin/tsc");
  assertFile(compiler, `${code}_COMPILER_MISSING`);
  const run = command(process.execPath, [compiler, ...args], { cwd: repoDir });
  if (run.status !== 0) {
    throw new Error(`${code}:${run.stderr.trim() || run.stdout.trim()}`);
  }
}

function runJsonAdapter(script, cwd, payload) {
  const run = command(process.execPath, [script], {
    cwd,
    input: `${JSON.stringify(payload)}\n`,
  });
  let body;
  try {
    body = JSON.parse(run.stdout);
  } catch {
    throw new Error(`FB_ADAPTER_NON_JSON:${script}`);
  }
  return { exitCode: run.status, response: body, stderr: run.stderr };
}

function check(id, condition, evidence) {
  return { id, status: condition ? "pass" : "fail", evidence };
}

function exposedLeak(id, crossingId, title, observation, evidence, repairIssue) {
  return {
    id,
    classification: "exposed",
    crossingId,
    title,
    observation,
    evidence,
    automaticRepair: false,
    repairIssue,
  };
}

const fixture = validateFixture(JSON.parse(readFileSync(fixturePath, "utf8")));
const fixtureReceipt = createFixtureReceipt(fixture);
const pins = fixture.taskWorldCut.ownerHeads;
const integrationHead = gitHead(repositoryDir);
const donorHeadsObserved = {
  "the-static-collective/project0": gitHead(project0Dir),
  "the-static-collective/corpus-os": gitHead(corpusOsDir),
  "the-static-collective/tranchnode": gitHead(tranchNodeDir),
};

const runnerFiles = [
  "tools/full-bowl-001/core.cjs",
  "tools/full-bowl-001/fixtures/full-bowl-001.json",
  "tools/full-bowl-001/live-probe.mjs",
  "tools/full-bowl-001/tranchnode-probe.mts",
];
const runnerDigest = digest(runnerFiles.map((path) => ({
  path,
  content: readFileSync(resolve(repositoryDir, path), "utf8"),
})));

if (!isAncestor(
  repositoryDir,
  pins["the-static-collective/What-is-the-static-collective-"],
  integrationHead,
)) {
  throw new Error("FB_INTEGRATION_HEAD_NOT_DESCENDED_FROM_WORLD_CUT");
}
for (const repo of [
  "the-static-collective/project0",
  "the-static-collective/corpus-os",
  "the-static-collective/tranchnode",
]) {
  if (donorHeadsObserved[repo] !== pins[repo]) throw new Error(`FB_OWNER_HEAD_DRIFT:${repo}`);
}

assertCleanOwnerCheckout(project0Dir, "the-static-collective/project0");
assertCleanOwnerCheckout(corpusOsDir, "the-static-collective/corpus-os");
assertCleanOwnerCheckout(tranchNodeDir, "the-static-collective/tranchnode");

buildTypescript(project0Dir, ["--outDir", ".build"], "FB_PROJECT0_BUILD_FAILED");
buildTypescript(
  corpusOsDir,
  ["-p", "tsconfig.kernel.json"],
  "FB_CORPUS_BUILD_FAILED",
);

const project0Adapter = resolve(project0Dir, ".build/scripts/world-encounter-stdio.js");
const corpusAdapter = resolve(corpusOsDir, ".kernel-dist/scripts/world-encounter-stdio.js");
assertFile(project0Adapter, "FB_PROJECT0_BUILD_MISSING");
assertFile(corpusAdapter, "FB_CORPUS_BUILD_MISSING");

const addressed = runJsonAdapter(project0Adapter, project0Dir, {
  schema: "project0/world-encounter-stdio/v0.1",
  operation: "address",
  recordType: "exchange_envelope",
  body: fixture.project0Envelope,
});
const encounterRef = addressed.response?.record?.ref;
const verified = runJsonAdapter(project0Adapter, project0Dir, {
  schema: "project0/world-encounter-stdio/v0.1",
  operation: "verify",
  recordType: "exchange_envelope",
  expectedRef: encounterRef,
  body: fixture.project0Envelope,
});

const cleanRequest = { ...fixture.corpusRequest, envelopeRef: encounterRef };
const cleanAdmission = runJsonAdapter(corpusAdapter, corpusOsDir, cleanRequest);
const inventedAuthority = fixture.hostilePacket.items.find(
  (item) => item.class === "invented-authority",
).payload;
const hostileAuthority = runJsonAdapter(corpusAdapter, corpusOsDir, {
  ...cleanRequest,
  ...inventedAuthority,
});
const unresolvedRequest = { ...cleanRequest };
delete unresolvedRequest.destinationSubjectRef;
const unresolvedAdmission = runJsonAdapter(corpusAdapter, corpusOsDir, unresolvedRequest);
const detachedRef = `enc-${"f".repeat(64)}`;
const detachedAdmission = runJsonAdapter(corpusAdapter, corpusOsDir, {
  ...cleanRequest,
  envelopeRef: detachedRef,
});

const worldCutModule = await import(pathToFileURL(
  resolve(corpusOsDir, ".kernel-dist/runtime/world-cut.js"),
).href);
const continuityModule = await import(pathToFileURL(
  resolve(corpusOsDir, ".kernel-dist/runtime/continuity-attestation.js"),
).href);
const latentModule = await import(pathToFileURL(
  resolve(corpusOsDir, ".kernel-dist/runtime/latent-reachability.js"),
).href);

const worldCutInput = fixture.worldCutProbe;
const priorCut = worldCutModule.deriveWorldCut({
  root: {
    trustId: worldCutInput.trustId,
    authorityCut: worldCutInput.authorityCut,
    constitutedRefs: worldCutInput.priorConstitutedRefs,
  },
  causalRecords: [],
  observations: [],
});
const cause = {
  trustId: worldCutInput.trustId,
  authorityCut: worldCutInput.authorityCut,
  actorId: "person:administrator",
  capacity: "administrator",
  subjectRef: fixture.specimen.objectRef,
  capabilityId: "synthetic.echo",
  capabilityOperation: "echo",
  trustRequestId: `world-encounter:${encounterRef}`,
};
const currentCut = worldCutModule.deriveWorldCut({
  root: {
    trustId: worldCutInput.trustId,
    authorityCut: worldCutInput.authorityCut,
    constitutedRefs: worldCutInput.currentBaseRefs,
  },
  causalRecords: [{
    cause,
    disposition: "completed",
    consequence: { outputRefs: worldCutInput.completedOutputRefs },
    balance: "balanced",
    anomalyCodes: [],
  }],
  observations: worldCutInput.observations,
});
const corpusContinuity = continuityModule.deriveCorpusContinuityAttestation({
  priorCutRef: "worldcut:full-bowl-001:prior",
  currentCutRef: "worldcut:full-bowl-001:current",
  priorCut,
  currentCut,
  transitionEvidence: worldCutInput.transitionEvidence,
  authorityContinuity: "none",
  authorityEvidenceRefs: [],
});
const forgedReachability = latentModule.inspectLatentReachability(
  currentCut,
  new Map(),
  inventedAuthority.warrant,
);

const project0Continuity = require(resolve(
  project0Dir,
  ".build/src/continuity-profile/index.js",
));
const originalRecognition = project0Continuity.checkContinuityClosure({
  claim: fixture.recognitionProbe.claim,
  requiredMaterialRoots: fixture.recognitionProbe.requiredMaterialRoots,
  allowedMaterialRoots: fixture.recognitionProbe.allowedMaterialRoots,
});
const lookalikeRecognition = project0Continuity.checkContinuityClosure({
  claim: fixture.recognitionProbe.lookalikeClaim,
  requiredMaterialRoots: fixture.recognitionProbe.requiredMaterialRoots,
  allowedMaterialRoots: fixture.recognitionProbe.allowedMaterialRoots,
});

const tranchProbeScript = resolve(scriptDir, "tranchnode-probe.mts");
const tranchRun = command(
  process.execPath,
  ["--import", "tsx", tranchProbeScript, fixturePath, tranchNodeDir],
  { cwd: tranchNodeDir },
);
if (tranchRun.status !== 0) {
  throw new Error(`FB_TRANCH_PROBE_FAILED:${tranchRun.stderr.trim()}`);
}
const tranchProbe = JSON.parse(tranchRun.stdout);
const tranchWitness = tranchProbe.addressed;

const checks = [
  check(
    "project0-addressed",
    addressed.exitCode === 0 && addressed.response.ok === true && /^enc-[0-9a-f]{64}$/.test(encounterRef),
    { encounterRef },
  ),
  check(
    "project0-exact-verify",
    verified.exitCode === 0 && verified.response.ok === true && verified.response.record.ref === encounterRef,
    { encounterRef: verified.response?.record?.ref },
  ),
  check(
    "corpus-clean-admitted",
    cleanAdmission.response?.result?.status === "admitted"
      && cleanAdmission.response?.result?.reasonCode === "CORPUS_ENCOUNTER_ADMITTED"
      && cleanAdmission.response?.result?.authorityTransfer === "none",
    cleanAdmission.response,
  ),
  check(
    "corpus-invented-authority-refused",
    hostileAuthority.response?.result?.status === "refused"
      && hostileAuthority.response?.result?.reasonCode === "CALLER_AUTHORITY_NOT_ACCEPTED",
    hostileAuthority.response,
  ),
  check(
    "corpus-missing-subject-unresolved",
    unresolvedAdmission.response?.result?.status === "indeterminate"
      && unresolvedAdmission.response?.result?.reasonCode === "DESTINATION_SUBJECT_UNRESOLVED",
    unresolvedAdmission.response,
  ),
  check(
    "worldcut-keeps-visible-return-and-terminal-history",
    currentCut.constitutedRefs.includes(fixture.specimen.after.visibleStateRef)
      && currentCut.terminalHistory.length === 1
      && currentCut.orphanObservations.some(
        (entry) => entry.ref === "maddcl0wn:uncategorized-object",
      ),
    {
      constitutedRefs: currentCut.constitutedRefs,
      terminalHistory: currentCut.terminalHistory,
      orphanObservations: currentCut.orphanObservations,
    },
  ),
  check(
    "corpus-continuity-keeps-classes-distinct",
    corpusContinuity.preservedRefs.includes(fixture.specimen.after.visibleStateRef)
      && corpusContinuity.transformed.length === 2
      && corpusContinuity.unresolvedRefs.includes("session-output:session-request-0001"),
    {
      preservedRefs: corpusContinuity.preservedRefs,
      transformed: corpusContinuity.transformed,
      lost: corpusContinuity.lost,
      unresolvedRefs: corpusContinuity.unresolvedRefs,
    },
  ),
  check(
    "tranchnode-boundary-keeps-four-classes",
    tranchProbe.ok === true
      && tranchWitness.value.authority === "none"
      && tranchWitness.value.preserved.includes(fixture.specimen.after.visibleStateRef)
      && tranchWitness.value.differentiated.includes("history:full-bowl-001:after")
      && tranchWitness.value.lost.includes("history:full-bowl-001:before")
      && tranchWitness.value.unresolved.includes("maddcl0wn:uncategorized-object"),
    tranchWitness,
  ),
  check(
    "project0-purpose-relative-recognition",
    originalRecognition.status === "conforming"
      && lookalikeRecognition.status === "refused"
      && lookalikeRecognition.reasonCodes.includes("MISSING_MATERIAL_ROOT")
      && lookalikeRecognition.reasonCodes.includes("UNDECLARED_ROOT"),
    { originalRecognition, lookalikeRecognition },
  ),
  check(
    "reachability-does-not-become-permission",
    forgedReachability.reachable === false
      && forgedReachability.code === "LATENT_WARRANT_INVALID",
    forgedReachability,
  ),
];

const cleanResult = cleanAdmission.response?.result ?? {};
const leaks = [];
if (
  detachedAdmission.response?.result?.status === "admitted"
  && detachedAdmission.response?.result?.evidenceRefs?.includes(detachedRef)
) {
  leaks.push(exposedLeak(
    "FB001-L001",
    "FB001-X02",
    "Detached encounter reference is admitted as evidence",
    "Corpus OS admits a shape-valid encounter ref that was never addressed or verified by the pinned Project0 surface, then includes that ref in evidenceRefs.",
    {
      detachedRef,
      result: detachedAdmission.response.result,
    },
    {
      repository: "the-static-collective/What-is-the-static-collective-",
      title: "Full Bowl: bind Corpus admission to the observed Project0 encounter receipt",
      smallestRepair: "Add an integration-owned guard that verifies the exact envelope body/ref with Project0 before invoking Corpus OS; do not add Project0 as a Corpus authority dependency.",
    },
  ));
}

const phaseFields = Object.keys(cleanResult).sort();
const separatePhaseEvidencePresent = [
  "admissionDisposition",
  "authorityDisposition",
  "attemptDisposition",
  "outcomeDisposition",
].every((key) => Object.prototype.hasOwnProperty.call(cleanResult, key));
if (cleanResult.status === "admitted" && !separatePhaseEvidencePresent) {
  leaks.push(exposedLeak(
    "FB001-L002",
    "FB001-X03",
    "Boundary result compresses admission, authority, attempt, and outcome",
    "The admitted stdio result exposes one aggregate status and one Session request id, but no separately reconstructible phase dispositions. The owner runtime keeps the distinctions internally; the cross-repository witness cannot recover them from this receipt alone.",
    { observableResultFields: phaseFields, result: cleanResult },
    {
      repository: "the-static-collective/corpus-os",
      title: "World encounter result: expose non-authoritative phase dispositions",
      smallestRepair: "Add inert phase disposition/evidence fields for admission, local authority issuance, launch, and terminal outcome without exporting the warrant, actor capacity, or authority object.",
    },
  ));
}

if (leaks.length > fixture.leakPolicy.maxRepairIssues) {
  throw new Error("FB_REPAIR_ISSUE_LIMIT_EXCEEDED");
}

const failedChecks = checks.filter((entry) => entry.status === "fail");
const reportWithoutDigest = {
  schema: "static-collective/full-bowl-001-live-witness/v0",
  fixtureId: fixture.id,
  fixtureDigest: fixtureReceipt.fixtureDigest,
  taskWorldCut: {
    status: "sufficient",
    pinnedHeads: pins,
    donorHeadsObserved,
    integrationRunner: {
      baseHead: pins["the-static-collective/What-is-the-static-collective-"],
      headRelation: "descendant-of-pinned-base",
      runnerDigest,
    },
  },
  status: failedChecks.length > 0
    ? "failed"
    : leaks.length > 0
      ? "survives-with-exposed-leaks"
      : "survives-without-observed-leaks",
  liveOwnerChecks: checks,
  ownerReceipts: {
    project0: {
      addressed: addressed.response,
      verified: verified.response,
    },
    corpusOs: {
      clean: cleanAdmission.response,
      inventedAuthority: hostileAuthority.response,
      missingSubject: unresolvedAdmission.response,
      detachedEncounterRef: detachedAdmission.response,
      worldCuts: { prior: priorCut, current: currentCut },
      continuity: corpusContinuity,
      forgedReachability,
    },
    tranchNode: tranchWitness,
    project0Recognition: { originalRecognition, lookalikeRecognition },
  },
  evidenceModes: [
    {
      crossings: ["FB001-X01", "FB001-X02"],
      mode: "live-owner-process-adapter",
    },
    {
      crossings: ["FB001-X03", "FB001-X04", "FB001-X05"],
      mode: "live-owner-process-result-with-compressed-internal-phases",
    },
    {
      crossings: ["FB001-X06"],
      mode: "owner-tests-green; same-run causal reconciliation not exposed by stdio",
    },
    {
      crossings: ["FB001-X07", "FB001-X08"],
      mode: "live-owner-module-with-explicit-synthetic-projection",
    },
    {
      crossings: ["FB001-X09", "FB001-X10"],
      mode: "live-owner-module; positive current-warrant reachability remains unresolved",
    },
  ],
  leakLedger: {
    automaticRepair: false,
    entries: leaks,
  },
  residualUnresolved: [
    {
      id: "FB001-U001",
      crossingId: "FB001-X06",
      statement: "The stdio boundary does not expose the genuine warrant and terminal receipt needed to run same-specimen causal reconciliation; owner causal tests are green, but the Full Bowl binding remains unresolved.",
    },
    {
      id: "FB001-U002",
      crossingId: "FB001-X10",
      statement: "The boundary correctly refuses a copied warrant; no genuine new unspent local warrant is exported, so positive post-return reachability is deliberately unclaimed.",
    },
  ],
  repairIssueCandidates: leaks.map((entry) => entry.repairIssue),
  nonClaims: fixture.nonClaims,
  authority: "none",
  legalValidity: "unclaimed",
};
const report = {
  ...reportWithoutDigest,
  receiptDigest: digest(reportWithoutDigest),
};

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (failedChecks.length > 0) process.exitCode = 1;
