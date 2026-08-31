import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createBasket,
  continueBasket,
  createRide,
  appendRideOperation,
  projectReplay,
} from '../src/ride.mjs';

test('continuing a basket preserves the parent byte-for-byte', () => {
  const parent = createBasket(['fruit-a'], {
    basket_id: 'basket-a',
    created_at: '2026-08-31T23:00:00Z',
  });
  const before = JSON.stringify(parent);
  const child = continueBasket(parent, ['fruit-b'], {
    basket_id: 'basket-b',
    created_at: '2026-08-31T23:01:00Z',
  });
  assert.equal(JSON.stringify(parent), before);
  assert.equal(child.parent_basket_ref, 'basket-a');
  assert.deepEqual(child.fruit_refs, ['fruit-a', 'fruit-b']);
});

test('appending a ride operation never rewrites prior operations', () => {
  const ride = createRide('intent-1', 'field-1', {
    ride_id: 'ride-a',
    created_at: '2026-08-31T23:00:00Z',
  });
  const withFirst = appendRideOperation(ride, {
    operation_id: 'op-1',
    type: 'select',
    fruit_ref: 'fruit-a',
    receipt_refs: ['receipt:a'],
  });
  const prior = JSON.stringify(withFirst.operations[0]);
  const withSecond = appendRideOperation(withFirst, {
    operation_id: 'op-2',
    type: 'basket',
    fruit_ref: 'fruit-b',
    receipt_refs: ['receipt:b'],
  });
  assert.equal(JSON.stringify(withFirst.operations[0]), prior);
  assert.equal(JSON.stringify(withSecond.operations[0]), prior);
  assert.equal(ride.operations.length, 0);
  assert.equal(withSecond.operations.length, 2);
});

test('replay keeps same endpoint different journeys distinct', () => {
  const ride = createRide('intent-1', 'field-1', {
    ride_id: 'ride-a',
    chosen_fruit_refs: ['fruit-walk-a', 'fruit-walk-b'],
    created_at: '2026-08-31T23:00:00Z',
  });
  const fruit = {
    'fruit-walk-a': {
      fruit_id: 'fruit-walk-a',
      endpoint_ref: 'endpoint:shared',
      journey_refs: ['step:a1', 'step:a2'],
      receipt_refs: ['receipt:a'],
    },
    'fruit-walk-b': {
      fruit_id: 'fruit-walk-b',
      endpoint_ref: 'endpoint:shared',
      journey_refs: ['step:b1', 'step:b2'],
      receipt_refs: ['receipt:b'],
    },
  };
  const replay = projectReplay(ride, fruit);
  assert.equal(replay.paths.length, 2);
  assert.equal(replay.paths[0].endpoint_ref, replay.paths[1].endpoint_ref);
  assert.notDeepEqual(replay.paths[0].journey_refs, replay.paths[1].journey_refs);
});

test('replay marks missing history instead of synthesizing a path', () => {
  const ride = createRide('intent-1', 'field-1', {
    ride_id: 'ride-a',
    chosen_fruit_refs: ['fruit-no-history'],
    created_at: '2026-08-31T23:00:00Z',
  });
  const replay = projectReplay(ride, {
    'fruit-no-history': {
      fruit_id: 'fruit-no-history',
      endpoint_ref: 'endpoint:visible',
      receipt_refs: ['receipt:visible'],
    },
  });
  assert.equal(replay.paths[0].history_status, 'missing');
  assert.deepEqual(replay.paths[0].journey_refs, []);
});
