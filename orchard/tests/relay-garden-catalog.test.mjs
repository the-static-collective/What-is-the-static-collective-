import test from 'node:test';
import assert from 'node:assert/strict';

import { starterRelayDoors } from '../src/relay-garden/catalog.mjs';

const EXPECTED_IDS = [
  'pet-sitter.continue-one-beat',
  'front-room.repair-one-doorway',
  'haunted-toaster.witness-one-claim',
];

test('catalog exposes exactly three starter doors', () => {
  const doors = starterRelayDoors();
  assert.deepEqual(doors.map(door => door.door_id), EXPECTED_IDS);
});

test('every starter door is accountless text-only local making', () => {
  for (const door of starterRelayDoors()) {
    assert.ok(door.source_refs.length >= 1);
    assert.equal(typeof door.owner, 'string');
    assert.ok(door.owner.length > 0);
    assert.match(door.verified_at, /^2026-10-01/);
    assert.equal(door.make.input, 'text');
    assert.equal(door.make.min_length, 1);
    assert.ok(door.make.max_length <= 1200);
    assert.equal(door.make.account_required, false);
    assert.equal(door.make.upload_required, false);
    assert.equal(door.make.network_required, false);
    assert.equal(door.external_effects, false);
    assert.equal(door.selection_authority, 'human');
    assert.equal(door.crossing_authority, false);
  }
});

test('starter source references are public GitHub evidence', () => {
  const refs = starterRelayDoors().flatMap(door => door.source_refs);
  assert.ok(refs.includes('https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/the-pet-sitter-featured-story-seed/README.md'));
  assert.ok(refs.includes('https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/README.md'));
  assert.ok(refs.includes('https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/CONTRIBUTING.md'));
  assert.ok(refs.includes('https://github.com/the-static-collective/the-haunted-toaster/blob/main/README.md'));
});

test('catalog returns clones rather than mutable canonical records', () => {
  const first = starterRelayDoors();
  first[0].label = 'mutated';
  const second = starterRelayDoors();
  assert.notEqual(second[0].label, 'mutated');
});

test('owner-local status copy remains explicit', () => {
  const doors = starterRelayDoors();
  const pet = doors.find(door => door.door_id === 'pet-sitter.continue-one-beat');
  const toaster = doors.find(door => door.door_id === 'haunted-toaster.witness-one-claim');
  assert.match(pet.source_status, /concept \/ not screenplay/i);
  assert.match(toaster.source_status, /draft PR #275/i);
  assert.match(toaster.source_status, /main remains product authority/i);
});
