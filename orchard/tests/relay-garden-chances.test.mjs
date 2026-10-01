import test from 'node:test';
import assert from 'node:assert/strict';

import { deriveChanceSet } from '../src/relay-garden/chances.mjs';
import {
  createRelaySession,
  selectRelayDoor,
  crossSelectedRelayDoor,
  completeRelayMake,
} from '../src/relay-garden/session.mjs';

const sourceDoor = {
  schema: 'relay-garden.door/v0',
  door_id: 'door-story',
  label: 'Continue one beat',
  kind: 'continue',
  source_refs: ['source:story'],
  owner: 'story-owner',
  requirements: [],
  visibility: 'public-source',
  selection_authority: 'human',
  crossing_authority: false,
  make: { input: 'text', min_length: 1, max_length: 1200 },
  output_kind: 'story-beat',
  created_at: '2026-10-01T20:10:00Z',
};

function firstMake(disposition = 'local_only') {
  let session = createRelaySession([sourceDoor], {
    session_id: 'session-1',
    created_at: '2026-10-01T20:11:00Z',
  });
  session = selectRelayDoor(session, sourceDoor.door_id, {
    selected_at: '2026-10-01T20:12:00Z',
  });
  session = crossSelectedRelayDoor(session, {
    kind: 'human_selection',
    crossed_at: '2026-10-01T20:13:00Z',
  });
  return completeRelayMake(
    session,
    { body: 'The tortoise finally reaches the attendance sheet.', publication_disposition: disposition },
    {
      artifact_id: 'artifact-1',
      receipt_id: 'receipt-1',
      created_at: '2026-10-01T20:14:00Z',
      chance_created_at: '2026-10-01T20:15:00Z',
    },
  );
}

test('every completed fixture make produces one to three next doors', () => {
  const made = firstMake();
  assert.ok(made.chanceSet.proposed_doors.length >= 1);
  assert.ok(made.chanceSet.proposed_doors.length <= 3);
  assert.equal(made.session.chance_sets.length, 1);
});

test('generated doors preserve human selection and no crossing authority', () => {
  const made = firstMake();
  for (const door of made.chanceSet.proposed_doors) {
    assert.equal(door.selection_authority, 'human');
    assert.equal(door.crossing_authority, false);
    assert.ok(door.source_refs.includes('artifact-1'));
    assert.ok(door.source_refs.includes('receipt-1'));
  }
  assert.equal(made.session.active, null);
});

test('choosing a generated door requires a fresh select and cross cycle', () => {
  const made = firstMake();
  const nextDoor = made.chanceSet.proposed_doors[0];
  const selected = selectRelayDoor(made.session, nextDoor.door_id);
  assert.equal(selected.active.state, 'selected');
  assert.throws(
    () => completeRelayMake(selected, { body: 'Second generation', publication_disposition: 'local_only' }),
    /cross/i,
  );
  const crossed = crossSelectedRelayDoor(selected, { kind: 'human_selection' });
  const second = completeRelayMake(crossed, {
    body: 'Second generation',
    publication_disposition: 'local_only',
  });
  assert.equal(second.session.receipts.length, 2);
});

test('two generations preserve the first receipt byte-for-byte', () => {
  const first = firstMake();
  const frozen = JSON.stringify(first.receipt);
  let session = selectRelayDoor(first.session, first.chanceSet.proposed_doors[0].door_id);
  session = crossSelectedRelayDoor(session, { kind: 'human_selection' });
  const second = completeRelayMake(session, {
    body: 'Another lawful beat.',
    publication_disposition: 'local_only',
  });
  assert.equal(JSON.stringify(second.session.receipts[0]), frozen);
});

test('Pet Sitter-style continuation yields continue translate and witness projections', () => {
  const made = firstMake();
  assert.deepEqual(
    made.chanceSet.proposed_doors.map(door => door.kind),
    ['continue', 'translate', 'witness'],
  );
});

test('refused publication still produces a lawful local next chance', () => {
  const made = firstMake('refused');
  assert.ok(made.chanceSet.proposed_doors.length >= 1);
  assert.ok(made.chanceSet.proposed_doors.some(door => ['compost', 'repair', 'hold-and-name-gap'].includes(door.kind)));
  assert.ok(made.chanceSet.proposed_doors.every(door => door.visibility === 'local'));
});

test('unknown source kind falls back to hold-and-name-gap rather than zero doors', () => {
  const artifact = {
    schema: 'relay-garden.artifact/v0',
    artifact_id: 'artifact-x',
    door_ref: 'door-x',
    source_refs: ['source:x'],
    owner: 'local-participant',
    kind: 'strange-new-kind',
    body: 'A strange artifact',
    visibility: 'local',
    created_at: '2026-10-01T20:20:00Z',
  };
  const receipt = {
    schema: 'relay-garden.make-receipt/v0',
    receipt_id: 'receipt-x',
    door_ref: 'door-x',
    source_refs: ['source:x'],
    artifact_refs: ['artifact-x'],
    fruit: [{ kind: 'created', artifact_ref: 'artifact-x' }],
    compost: [],
    visibility: 'local',
    publication_disposition: 'local_only',
    created_at: '2026-10-01T20:20:00Z',
  };
  const unknownDoor = { ...sourceDoor, door_id: 'door-x', kind: 'unknown' };
  const chance = deriveChanceSet(receipt, artifact, unknownDoor, {
    created_at: '2026-10-01T20:21:00Z',
  });
  assert.equal(chance.proposed_doors.length, 1);
  assert.equal(chance.proposed_doors[0].kind, 'hold-and-name-gap');
});


test('empty continuation template table falls back to hold-and-name-gap', () => {
  const made = firstMake();
  const chance = deriveChanceSet(
    made.receipt,
    made.artifact,
    sourceDoor,
    {
      created_at: '2026-10-01T20:22:00Z',
      templates: [],
    },
  );
  assert.equal(chance.proposed_doors.length, 1);
  assert.equal(chance.proposed_doors[0].kind, 'hold-and-name-gap');
});
