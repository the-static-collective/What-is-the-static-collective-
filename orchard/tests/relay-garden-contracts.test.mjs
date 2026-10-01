import test from 'node:test';
import assert from 'node:assert/strict';

import {
  validateRelayDoor,
  validateMakeReceipt,
  validateChanceSet,
  validateRelaySession,
} from '../src/relay-garden/contracts.mjs';

const door = {
  schema: 'relay-garden.door/v0',
  door_id: 'door-1',
  label: 'Continue',
  kind: 'continue',
  source_refs: ['source:one'],
  owner: 'owner',
  requirements: [],
  visibility: 'public-source',
  selection_authority: 'human',
  crossing_authority: false,
  created_at: '2026-10-01T19:45:00Z',
};

test('door requires human selection authority and crossing_authority false', () => {
  assert.equal(validateRelayDoor(door).ok, true);
  assert.equal(validateRelayDoor({ ...door, selection_authority: 'machine' }).ok, false);
  assert.equal(validateRelayDoor({ ...door, crossing_authority: true }).ok, false);
});

test('make receipt distinguishes local visibility from publication disposition', () => {
  const result = validateMakeReceipt({
    schema: 'relay-garden.make-receipt/v0',
    receipt_id: 'receipt-1',
    door_ref: 'door-1',
    source_refs: ['source:one'],
    artifact_refs: ['artifact-1'],
    fruit: [{ kind: 'created', artifact_ref: 'artifact-1' }],
    compost: [],
    visibility: 'local',
    publication_disposition: 'publication_proposed',
    created_at: '2026-10-01T19:46:00Z',
  });
  assert.equal(result.ok, true);

  const bad = validateMakeReceipt({
    ...result.value,
    visibility: 'public',
  });
  assert.equal(bad.ok, false);
});

test('chance set refuses more than three machine proposed doors', () => {
  const result = validateChanceSet({
    schema: 'relay-garden.chance-set/v0',
    chance_set_id: 'chance-1',
    parent_receipt_ref: 'receipt-1',
    proposed_doors: [
      door,
      { ...door, door_id: 'door-2' },
      { ...door, door_id: 'door-3' },
      { ...door, door_id: 'door-4' },
    ],
    derivation_refs: ['receipt-1'],
    max_visible: 3,
    created_at: '2026-10-01T19:47:00Z',
    selection_authority: 'human',
    crossing_authority: false,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /at most 3/);
});

test('chance set doors cannot carry selection or crossing authority', () => {
  const result = validateChanceSet({
    schema: 'relay-garden.chance-set/v0',
    chance_set_id: 'chance-1',
    parent_receipt_ref: 'receipt-1',
    proposed_doors: [{ ...door, crossing_authority: true }],
    derivation_refs: ['receipt-1'],
    max_visible: 3,
    created_at: '2026-10-01T19:47:00Z',
    selection_authority: 'human',
    crossing_authority: false,
  });
  assert.equal(result.ok, false);
});

test('session requires available doors and append-only artifact receipt arrays', () => {
  const result = validateRelaySession({
    schema: 'relay-garden.session/v0',
    session_id: 'session-1',
    available_doors: [door],
    active: null,
    artifacts: [],
    receipts: [],
    chance_sets: [],
    created_at: '2026-10-01T19:48:00Z',
  });
  assert.equal(result.ok, true);

  const bad = validateRelaySession({
    ...result.value,
    available_doors: [],
    receipts: 'not-an-array',
  });
  assert.equal(bad.ok, false);
});
