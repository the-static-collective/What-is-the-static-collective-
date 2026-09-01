import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, mkdtemp } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { pick, validateRide, createRide } from '../src/index.mjs';

const orchardDir = new URL('..', import.meta.url);
const cliPath = new URL('../cli.mjs', import.meta.url);
const fieldPath = new URL('../fixtures/field.json', import.meta.url);
const field = JSON.parse(await readFile(fieldPath, 'utf8'));

function run(args) {
  return spawnSync(process.execPath, [cliPath.pathname, ...args], {
    cwd: orchardDir.pathname,
    encoding: 'utf8',
  });
}

test('CLI surprise matches direct shared-core selection', () => {
  const proc = run(['pick', '--mode', 'surprise', '--field', fieldPath.pathname, '--seed', 'banana-elves', '--limit', '3']);
  assert.equal(proc.status, 0, proc.stderr);
  const cli = JSON.parse(proc.stdout);
  const direct = pick('surprise', field, { seed: 'banana-elves', limit: 3 });
  assert.deepEqual(cli.selected.map(x => x.fruit_id), direct.selected.map(x => x.fruit_id));
  assert.equal(cli.field_digest, direct.field_digest);
});

test('CLI invalid mode exits 2 with an actionable diagnostic', () => {
  const proc = run(['pick', '--mode', 'research', '--field', fieldPath.pathname]);
  assert.equal(proc.status, 2);
  assert.match(proc.stderr, /unsupported PICKER mode/);
});

test('CLI ride emits a valid orchard ride', () => {
  const proc = run(['ride', '--mode', 'weird', '--field', fieldPath.pathname, '--seed', 'peach-pit']);
  assert.equal(proc.status, 0, proc.stderr);
  const ride = JSON.parse(proc.stdout);
  assert.equal(validateRide(ride).ok, true);
  assert.ok(ride.operations.some(op => op.type === 'pick'));
});

test('CLI continue preserves prior operations and appends exactly one', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'orchard-cli-'));
  const ride = createRide('intent-1', 'field-1', {
    ride_id: 'ride-cli',
    created_at: '2026-08-31T23:00:00Z',
    operations: [{ operation_id: 'op-1', type: 'pick', fruit_ref: 'fruit-a' }],
  });
  const ridePath = join(dir, 'ride.json');
  await writeFile(ridePath, JSON.stringify(ride));
  const before = JSON.stringify(ride.operations);
  const proc = run(['continue', '--ride', ridePath, '--operation', JSON.stringify({ operation_id: 'op-2', type: 'basket', fruit_ref: 'fruit-b' })]);
  assert.equal(proc.status, 0, proc.stderr);
  const next = JSON.parse(proc.stdout);
  assert.equal(JSON.stringify(next.operations.slice(0, 1)), before);
  assert.equal(next.operations.length, 2);
  assert.equal(next.operations[1].operation_id, 'op-2');
});
