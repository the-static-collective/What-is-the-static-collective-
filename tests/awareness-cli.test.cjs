const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { spawnSync } = require("node:child_process");
const { runAwarenessAudit } = require("../tools/awareness/audit.cjs");

const cli = path.join(__dirname, "../tools/awareness/cli.cjs");

function tempDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), "awareness-cli-"));
}

function writeJson(dir, name, value) {
  const file = path.join(dir, name);
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
  return file;
}

function scopeValue() {
  return {
    schema: "static-collective/awareness-scope/v0",
    id: "fixture-scope",
    projections: [
      { id: "fresh", kind: "project-status-v1", repository: "the-static-collective/project0", sourceScope: "main", statusPath: "PROJECT_STATUS.json" },
      { id: "stale", kind: "project-status-v1", repository: "the-static-collective/tranchnode", sourceScope: "main", statusPath: "PROJECT_STATUS.json" },
      { id: "unverified", kind: "project-status-v1", repository: "the-static-collective/corpus-os", sourceScope: "main", statusPath: "PROJECT_STATUS.json" },
    ],
  };
}

function comparison({ id, repository, witnessed, compared, disposition, ok }) {
  return {
    projectionId: id,
    canonicalSource: repository,
    sourceScope: "main",
    witnessedSourceCut: witnessed,
    comparedSourceCut: compared,
    checkedAt: "2026-08-20T23:00:00Z",
    comparisonOk: ok,
    evidenceRefs: ["fixture"],
    disposition,
    nonAuthority: "observation only; does not mutate, merge, release, promote, admit, refuse, or supersede project-owned authority",
  };
}

function collectorFixture() {
  return {
    repositories: [
      { repository: "the-static-collective/project0", defaultBranch: "main", headSha: "a".repeat(40) },
      { repository: "the-static-collective/tranchnode", defaultBranch: "main", headSha: "b".repeat(40) },
    ],
    projections: [
      comparison({ id: "fresh", repository: "the-static-collective/project0", witnessed: "a".repeat(40), compared: "a".repeat(40), disposition: "fresh", ok: true }),
      comparison({ id: "stale", repository: "the-static-collective/tranchnode", witnessed: "c".repeat(40), compared: "b".repeat(40), disposition: "stale", ok: true }),
      comparison({ id: "unverified", repository: "the-static-collective/corpus-os", witnessed: null, compared: null, disposition: "unverified", ok: false }),
    ],
    fog: [{ source: "the-static-collective/corpus-os#main", code: "AWARENESS_GITHUB_READ_FAILED", note: "current comparison unavailable" }],
  };
}

function gateFixture() {
  return {
    schema: "static-collective/awareness-human-gates/v0",
    gates: [{
      gateId: "autodiscography-vault/one-real-wav",
      subject: "the-static-collective/autodiscography-vault#9",
      disposition: "human-gated",
      projectDisposition: "not-attempted",
      evidenceRefs: ["fixture:gate"],
    }],
  };
}

function cliFixtureRun({ outDir = null } = {}) {
  const dir = tempDir();
  const scope = writeJson(dir, "scope.json", scopeValue());
  const fixture = writeJson(dir, "collector.json", collectorFixture());
  const gates = writeJson(dir, "gates.json", gateFixture());
  const args = [cli, "--scope", scope, "--fixture", fixture, "--gates", gates, "--observed-at", "2026-08-20T23:00:00Z"];
  if (outDir) args.push("--out-dir", outDir);
  return { dir, run: spawnSync(process.execPath, args, { cwd: dir, encoding: "utf8" }) };
}

test("audit preserves human gate as observation only", () => {
  const cut = runAwarenessAudit({
    scope: scopeValue(),
    observedAt: "2026-08-20T23:00:00Z",
    gateObservations: gateFixture(),
    collectorResult: collectorFixture(),
  });
  assert.equal(cut.humanGates[0].disposition, "human-gated");
  assert.equal(cut.humanGates[0].projectDisposition, "not-attempted");
});

test("audit rejects attempted project disposition through gate input", () => {
  const gates = gateFixture();
  gates.gates[0].projectDisposition = "satisfied";
  assert.throws(
    () => runAwarenessAudit({ scope: scopeValue(), observedAt: "2026-08-20T23:00:00Z", gateObservations: gates, collectorResult: collectorFixture() }),
    (error) => error.code === "AWARENESS_SCOPE_INVALID",
  );
});

test("fixture CLI run emits fresh stale and unverified projections", () => {
  const { run } = cliFixtureRun();
  assert.equal(run.status, 0, run.stderr);
  const payload = JSON.parse(run.stdout);
  assert.deepEqual([...new Set(payload.worldCut.projections.map((x) => x.disposition))].sort(), ["fresh", "stale", "unverified"]);
  assert.equal(payload.worldCut.humanGates[0].projectDisposition, "not-attempted");
  assert.match(payload.artifacts.jsonSha256, /^[a-f0-9]{64}$/);
  assert.match(payload.artifacts.markdownSha256, /^[a-f0-9]{64}$/);
  assert.match(payload.artifacts.receiptSha256, /^[a-f0-9]{64}$/);
});

test("stdout mode creates no output files", () => {
  const { dir, run } = cliFixtureRun();
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(fs.readdirSync(dir).sort(), ["collector.json", "gates.json", "scope.json"]);
});

test("explicit output directory creates exactly three files", () => {
  const root = tempDir();
  const out = path.join(root, "cut");
  const { run } = cliFixtureRun({ outDir: out });
  assert.equal(run.status, 0, run.stderr);
  assert.deepEqual(fs.readdirSync(out).sort(), ["integrity.json", "world-cut.json", "world-cut.md"]);
  const cut = JSON.parse(fs.readFileSync(path.join(out, "world-cut.json"), "utf8"));
  const receipt = JSON.parse(fs.readFileSync(path.join(out, "integrity.json"), "utf8"));
  assert.equal(receipt.worldCutId, cut.worldCutId);
});

test("rerunning into same output directory refuses overwrite", () => {
  const root = tempDir();
  const out = path.join(root, "cut");
  const first = cliFixtureRun({ outDir: out }).run;
  assert.equal(first.status, 0, first.stderr);
  const second = cliFixtureRun({ outDir: out }).run;
  assert.equal(second.status, 2);
  assert.match(second.stderr, /AWARENESS_OUTPUT_EXISTS/);
});

test("CLI contains no mutation or watch command surfaces", () => {
  const source = fs.readFileSync(cli, "utf8");
  for (const forbidden of ["gh pr merge", "gh issue close", "git push", "git commit", "setInterval(", "setTimeout(", "--watch", "--interval"]) {
    assert.equal(source.includes(forbidden), false, forbidden);
  }
});

test("missing declared collector projection becomes unverified with explicit fog", () => {
  const incomplete = collectorFixture();
  incomplete.projections = incomplete.projections.filter((projection) => projection.projectionId !== "unverified");
  incomplete.fog = [];
  const cut = runAwarenessAudit({
    scope: scopeValue(),
    observedAt: "2026-08-20T23:00:00Z",
    gateObservations: null,
    collectorResult: incomplete,
  });
  assert.equal(cut.projections.find((projection) => projection.projectionId === "unverified").disposition, "unverified");
  assert.ok(cut.fog.some((entry) => entry.source === "the-static-collective/corpus-os#main" && entry.note === "collector projection unavailable"));
});
