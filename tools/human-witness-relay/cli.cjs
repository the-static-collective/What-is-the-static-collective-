#!/usr/bin/env node
const fs = require("node:fs");
const {
  defaultRegistry,
  prepareValidateOnlyPacket,
  prepareWitnessRoutingPacket,
} = require("./index.cjs");

function fail(error) {
  const payload = {
    ok: false,
    code: error.code ?? "WITNESS_EVENT_INVALID",
    errors: error.errors ?? undefined,
  };
  process.stderr.write(`${JSON.stringify(payload)}\n`);
  process.exitCode = 2;
}

try {
  const inputText = fs.readFileSync(0, "utf8");
  let input;
  try {
    input = JSON.parse(inputText);
  } catch {
    const error = new Error("Invalid JSON input");
    error.code = "WITNESS_EVENT_INVALID";
    throw error;
  }

  const validateOnly = process.argv.includes("--validate-only");
  const packet = validateOnly
    ? prepareValidateOnlyPacket(input)
    : prepareWitnessRoutingPacket(input, defaultRegistry);
  process.stdout.write(`${JSON.stringify(packet)}\n`);
} catch (error) {
  fail(error);
}
