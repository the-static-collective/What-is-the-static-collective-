import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createRelaySession,
  selectRelayDoor,
  crossSelectedRelayDoor,
  completeRelayMake,
} from '../src/relay-garden/session.mjs';

const door = {
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
  make: { input: 'text', min_length: 1, max_length: 20 },
  output_kind: 'story-beat',
  created_at: '2026-10-01T20:00:00Z',
};

function fresh() {
  return createRelaySession([door], {
    session_id: 'session-1',
    created_at: '2026-10-01T20:01:00Z',
  });
}

test('proposal does not imply selection', () => {
  const session = fresh();
  assert.equal(session.active, null);
  assert.equal(session.artifacts.length, 0);
});

test('selection does not imply crossing', () => {
  const selected = selectRelayDoor(fresh(), 'door-story', {
    selected_at: '2026-10-01T20:02:00Z',
  });
  assert.equal(selected.active.state, 'selected');
  assert.equal(selected.active.crossed_at, undefined);
});

test('crossing does not itself create an artifact', () => {
  const selected = selectRelayDoor(fresh(), 'door-story', {
    selected_at: '2026-10-01T20:02:00Z',
  });
  const crossed = crossSelectedRelayDoor(selected, {
    kind: 'human_selection',
    crossed_at: '2026-10-01T20:03:00Z',
  });
  assert.equal(crossed.active.state, 'crossed');
  assert.equal(crossed.artifacts.length, 0);
  assert.equal(crossed.receipts.length, 0);
});

test('make before crossing is refused', () => {
  const selected = selectRelayDoor(fresh(), 'door-story');
  assert.throws(
    () => completeRelayMake(selected, { body: 'One beat.', publication_disposition: 'local_only' }),
    /cross/i,
  );
});

test('one crossed door can complete exactly one make', () => {
  const crossed = crossSelectedRelayDoor(
    selectRelayDoor(fresh(), 'door-story', { selected_at: '2026-10-01T20:02:00Z' }),
    { kind: 'human_selection', crossed_at: '2026-10-01T20:03:00Z' },
  );
  const made = completeRelayMake(
    crossed,
    { body: 'One beat.', publication_disposition: 'local_only' },
    {
      artifact_id: 'artifact-1',
      receipt_id: 'receipt-1',
      created_at: '2026-10-01T20:04:00Z',
    },
  );

  assert.equal(made.artifact.body, 'One beat.');
  assert.equal(made.artifact.visibility, 'local');
  assert.equal(made.receipt.publication_disposition, 'local_only');
  assert.deepEqual(made.receipt.fruit, [{ kind: 'created', artifact_ref: 'artifact-1' }]);
  assert.ok(made.receipt.source_refs.includes('source:story'));
  assert.equal(made.session.active, null);
  assert.equal(made.session.artifacts.length, 1);
  assert.equal(made.session.receipts.length, 1);
  assert.throws(
    () => completeRelayMake(made.session, { body: 'Again', publication_disposition: 'local_only' }),
    /cross/i,
  );
});

test('whitespace-only input is refused', () => {
  const crossed = crossSelectedRelayDoor(
    selectRelayDoor(fresh(), 'door-story'),
    { kind: 'human_selection' },
  );
  assert.throws(
    () => completeRelayMake(crossed, { body: '   \n ', publication_disposition: 'local_only' }),
    /text/i,
  );
});

test('per-door max_length is enforced', () => {
  const crossed = crossSelectedRelayDoor(
    selectRelayDoor(fresh(), 'door-story'),
    { kind: 'human_selection' },
  );
  assert.throws(
    () => completeRelayMake(crossed, { body: 'x'.repeat(21), publication_disposition: 'local_only' }),
    /20/,
  );
});

test('HTML-looking text is stored inert and unchanged', () => {
  const crossed = crossSelectedRelayDoor(
    selectRelayDoor(fresh(), 'door-story'),
    { kind: 'human_selection' },
  );
  const body = '<script>alert(1)</script>';
  const wideDoor = { ...door, make: { input: 'text', min_length: 1, max_length: 100 } };
  const wide = crossSelectedRelayDoor(
    selectRelayDoor(createRelaySession([wideDoor]), 'door-story'),
    { kind: 'human_selection' },
  );
  const made = completeRelayMake(wide, { body, publication_disposition: 'held_for_review' });
  assert.equal(made.artifact.body, body);
  assert.equal(made.receipt.visibility, 'local');
  assert.equal(made.receipt.publication_disposition, 'held_for_review');
});
