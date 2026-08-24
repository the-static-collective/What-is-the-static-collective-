#!/usr/bin/env node
const fs = require("node:fs");
const path = require("node:path");
const {
  FullBowlValidationError,
  createFixtureReceipt,
} = require("./core.cjs");

function fixturePath() {
  const index = process.argv.indexOf("--fixture");
  if (index === -1) return path.join(__dirname, "fixtures/full-bowl-001.json");
  if (index === process.argv.length - 1) throw new Error("FB_FIXTURE_PATH_MISSING");
  return path.resolve(process.argv[index + 1]);
}

try {
  const input = JSON.parse(fs.readFileSync(fixturePath(), "utf8"));
  process.stdout.write(`${JSON.stringify(createFixtureReceipt(input), null, 2)}\n`);
} catch (error) {
  const code = error instanceof FullBowlValidationError
    ? error.code
    : error instanceof SyntaxError
      ? "FB_FIXTURE_JSON_INVALID"
      : error instanceof Error && error.message.startsWith("FB_")
        ? error.message
        : "FB_FIXTURE_CHECK_FAILED";
  process.stderr.write(`${JSON.stringify({ ok: false, code })}\n`);
  process.exitCode = 2;
}
