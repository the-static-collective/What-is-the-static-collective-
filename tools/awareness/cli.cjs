#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const { ERRORS } = require("./constants.cjs");
const { runAwarenessAudit } = require("./audit.cjs");
const { buildWorldCutArtifacts } = require("./world-cut.cjs");

function fail(error) {
  process.stderr.write(`${JSON.stringify({ ok: false, code: error?.code ?? ERRORS.SCOPE_INVALID, path: error?.path ?? undefined })}\n`);
  process.exitCode = 2;
}

function argumentError(pathName) {
  const error = new Error("Invalid Awareness CLI arguments");
  error.code = ERRORS.SCOPE_INVALID;
  error.path = pathName;
  return error;
}

function parseArgs(argv) {
  const result = {};
  const valued = new Set(["--scope", "--gates", "--observed-at", "--out-dir", "--fixture"]);
  for (let index = 0; index < argv.length; index += 1) {
    const flag = argv[index];
    if (!valued.has(flag)) throw argumentError(flag);
    const value = argv[index + 1];
    if (!value || value.startsWith("--")) throw argumentError(flag);
    if (Object.hasOwn(result, flag)) throw argumentError(flag);
    result[flag] = value;
    index += 1;
  }
  if (!result["--scope"]) throw argumentError("--scope");
  return result;
}

function readJson(filePath, label) {
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    throw argumentError(label);
  }
}

function writeArtifacts(outDir, artifacts) {
  const targets = {
    json: path.join(outDir, "world-cut.json"),
    markdown: path.join(outDir, "world-cut.md"),
    receipt: path.join(outDir, "integrity.json"),
  };
  if (Object.values(targets).some((target) => fs.existsSync(target))) {
    const error = new Error("Awareness output already exists");
    error.code = ERRORS.OUTPUT_EXISTS;
    throw error;
  }
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(targets.json, artifacts.json, { flag: "wx" });
  fs.writeFileSync(targets.markdown, artifacts.markdown, { flag: "wx" });
  fs.writeFileSync(targets.receipt, `${JSON.stringify(artifacts.receipt, null, 2)}\n`, { flag: "wx" });
}

try {
  const args = parseArgs(process.argv.slice(2));
  const scope = readJson(args["--scope"], "--scope");
  const gates = args["--gates"] ? readJson(args["--gates"], "--gates") : null;
  const fixture = args["--fixture"] ? readJson(args["--fixture"], "--fixture") : null;
  const observedAt = args["--observed-at"] ?? new Date().toISOString();
  const worldCut = runAwarenessAudit({
    scope,
    observedAt,
    gateObservations: gates,
    collectorResult: fixture,
  });
  const artifacts = buildWorldCutArtifacts(worldCut);
  if (args["--out-dir"]) writeArtifacts(args["--out-dir"], artifacts);
  process.stdout.write(`${JSON.stringify({
    worldCut,
    artifacts: {
      jsonSha256: artifacts.receipt.jsonSha256,
      markdownSha256: artifacts.receipt.markdownSha256,
      receiptSha256: artifacts.receipt.receiptSha256,
    },
  })}\n`);
} catch (error) {
  fail(error);
}
