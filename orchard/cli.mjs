#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import {
  appendRideOperation,
  createRide,
  pick,
} from './src/index.mjs';

function parseArgs(argv) {
  const [command, ...rest] = argv;
  const args = { command };
  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token.startsWith('--')) throw new TypeError(`unexpected argument: ${token}`);
    const key = token.slice(2).replaceAll('-', '_');
    const value = rest[i + 1];
    if (value === undefined || value.startsWith('--')) throw new TypeError(`missing value for ${token}`);
    args[key] = value;
    i += 1;
  }
  return args;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function write(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

async function run(argv) {
  const args = parseArgs(argv);
  if (args.command === 'pick') {
    if (!args.mode || !args.field) throw new TypeError('pick requires --mode and --field');
    const field = await readJson(args.field);
    write(pick(args.mode, field, { seed: args.seed, limit: args.limit }));
    return;
  }

  if (args.command === 'ride') {
    if (!args.mode || !args.field) throw new TypeError('ride requires --mode and --field');
    const field = await readJson(args.field);
    const result = pick(args.mode, field, { seed: args.seed, limit: args.limit });
    const fruitRefs = result.selected.map(card => card.fruit_id);
    const ride = createRide(`intent-${args.mode}`, result.field_digest, {
      shown_fruit_refs: fruitRefs,
      chosen_fruit_refs: fruitRefs,
      residuals: result.residuals,
      refusals: result.refusals,
    });
    write(appendRideOperation(ride, {
      type: 'pick',
      mode: args.mode,
      seed: result.seed,
      fruit_refs: fruitRefs,
      ranking_receipt: result.ranking_receipt,
    }));
    return;
  }

  if (args.command === 'continue') {
    if (!args.ride || !args.operation) throw new TypeError('continue requires --ride and --operation');
    const ride = await readJson(args.ride);
    const operation = JSON.parse(args.operation);
    write(appendRideOperation(ride, operation));
    return;
  }

  throw new TypeError(`unknown command: ${args.command ?? '(none)'}`);
}

run(process.argv.slice(2)).catch(error => {
  process.stderr.write(`ORCHARD: ${error.message}\n`);
  process.exitCode = 2;
});
