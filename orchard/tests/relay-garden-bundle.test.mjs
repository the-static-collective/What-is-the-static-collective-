import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createRelayBundle,
  parseRelayBundle,
  loadRelayBundle,
  saveRelayBundle,
} from '../src/relay-garden/bundle.mjs';
import {
  createRelaySession,
  selectRelayDoor,
  crossSelectedRelayDoor,
  completeRelayMake,
} from '../src/relay-garden/session.mjs';

const door = {
  schema: 'relay-garden.door/v0',
  door_id: 'door-1',
  label: 'Make a trace',
  kind: 'repair',
  source_refs: ['source:one'],
  owner: 'owner',
  requirements: [],
  visibility: 'public-source',
  selection_authority: 'human',
  crossing_authority: false,
  make: { input: 'text', min_length: 1, max_length: 1200 },
  created_at: '2026-10-01T21:00:00Z',
};

function madeSession(disposition = 'publication_proposed') {
  let session = createRelaySession([door], {
    session_id: 'session-1',
    created_at: '2026-10-01T21:01:00Z',
  });
  session = selectRelayDoor(session, 'door-1');
  session = crossSelectedRelayDoor(session, { kind: 'human_selection' });
  return completeRelayMake(
    session,
    { body: 'A durable local trace', publication_disposition: disposition },
    {
      artifact_id: 'artifact-1',
      receipt_id: 'receipt-1',
      created_at: '2026-10-01T21:02:00Z',
      chance_created_at: '2026-10-01T21:03:00Z',
    },
  ).session;
}

function memoryStorage(initial = {}) {
  const data = new Map(Object.entries(initial));
  return {
    getItem(key) { return data.has(key) ? data.get(key) : null; },
    setItem(key, value) { data.set(key, String(value)); },
    removeItem(key) { data.delete(key); },
    dump(key) { return data.get(key); },
  };
}

test('bundle round-trip preserves receipts and chance sets', () => {
  const bundle = createRelayBundle(madeSession(), {
    exported_at: '2026-10-01T21:04:00Z',
  });
  const parsed = parseRelayBundle(JSON.stringify(bundle));
  assert.equal(parsed.ok, true);
  assert.deepEqual(parsed.bundle.session.receipts, bundle.session.receipts);
  assert.deepEqual(parsed.bundle.session.chance_sets, bundle.session.chance_sets);
});

test('reload does not auto-select or auto-cross a door', () => {
  const storage = memoryStorage();
  saveRelayBundle(storage, createRelayBundle(madeSession()));
  const loaded = loadRelayBundle(storage);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.bundle.session.active, null);
});

test('unknown bundle schema fails closed', () => {
  const raw = JSON.stringify({ schema: 'relay-garden.bundle/v99', session: {} });
  const parsed = parseRelayBundle(raw);
  assert.equal(parsed.ok, false);
  assert.match(parsed.error, /schema/i);
  assert.equal(parsed.raw, raw);
});

test('malformed JSON returns raw text and does not delete stored value', () => {
  const raw = '{not-json';
  const storage = memoryStorage({ 'static-collective.relay-garden.v0': raw });
  const loaded = loadRelayBundle(storage);
  assert.equal(loaded.ok, false);
  assert.equal(loaded.raw, raw);
  assert.equal(storage.dump('static-collective.relay-garden.v0'), raw);
});

test('corrupt local state never rewrites a publication disposition', () => {
  const session = madeSession('refused');
  const bundle = createRelayBundle(session);
  const raw = JSON.stringify(bundle);
  const parsed = parseRelayBundle(raw);
  assert.equal(parsed.ok, true);
  assert.equal(parsed.bundle.session.receipts[0].publication_disposition, 'refused');
});

test('saving a later generation preserves all earlier receipts', () => {
  let session = madeSession();
  const firstReceipt = JSON.stringify(session.receipts[0]);
  const nextDoor = session.chance_sets[0].proposed_doors[0];
  session = selectRelayDoor(session, nextDoor.door_id);
  session = crossSelectedRelayDoor(session, { kind: 'human_selection' });
  session = completeRelayMake(session, {
    body: 'Second generation',
    publication_disposition: 'local_only',
  }).session;

  const storage = memoryStorage();
  saveRelayBundle(storage, createRelayBundle(session));
  const loaded = loadRelayBundle(storage);
  assert.equal(loaded.ok, true);
  assert.equal(loaded.bundle.session.receipts.length, 2);
  assert.equal(JSON.stringify(loaded.bundle.session.receipts[0]), firstReceipt);
});


test('restoring a stale crossed state never restores crossing authority', () => {
  let session = createRelaySession([door]);
  session = selectRelayDoor(session, 'door-1');
  session = crossSelectedRelayDoor(session, { kind: 'human_selection' });
  assert.equal(session.active.state, 'crossed');

  const storage = memoryStorage();
  saveRelayBundle(storage, createRelayBundle(session));
  const loaded = loadRelayBundle(storage);

  assert.equal(loaded.ok, true);
  assert.equal(loaded.bundle.session.active, null);
  assert.equal(loaded.bundle.resume_residuals[0].type, 'stale-active-crossing-held');
});

test('HTML-looking artifact text round-trips as inert string data', () => {
  let session = createRelaySession([door]);
  session = selectRelayDoor(session, 'door-1');
  session = crossSelectedRelayDoor(session, { kind: 'human_selection' });
  session = completeRelayMake(session, {
    body: '<img src=x onerror=alert(1)>',
    publication_disposition: 'publication_proposed',
  }).session;

  const parsed = parseRelayBundle(JSON.stringify(createRelayBundle(session)));
  assert.equal(parsed.ok, true);
  assert.equal(parsed.bundle.session.artifacts.at(-1).body, '<img src=x onerror=alert(1)>');
  assert.equal(parsed.bundle.session.artifacts.at(-1).visibility, 'local');
  assert.equal(parsed.bundle.session.receipts.at(-1).publication_disposition, 'publication_proposed');
});
