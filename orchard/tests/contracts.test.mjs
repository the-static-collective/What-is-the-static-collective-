import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateIntent,
  validateFruitCard,
  validateBasket,
  validateRide,
} from '../src/contracts.mjs';

test('intent mode cannot authorize effects', () => {
  const result = validateIntent({
    schema: 'orchard.intent/v0',
    intent_id: 'intent-1',
    human_text: 'find something weird',
    mode: 'weird',
    input_refs: ['source:a'],
    constraints: {},
    created_at: '2026-08-31T23:00:00Z',
    authorize_effects: true,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /authorize_effects/);
});

test('fruit card requires attributable sources and authority none', () => {
  const result = validateFruitCard({
    schema: 'orchard.fruit-card/v0',
    fruit_id: 'fruit-1',
    label: 'A fruit',
    kind: 'artifact',
    summary: 'Useful thing',
    source_refs: [],
    owner: 'ALEX',
    freshness: 'current',
    status: 'usable',
    available_actions: ['basket'],
    receipt_refs: [],
    authority_claim: 'none',
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /source_refs/);
});

test('basket is a local selection set, not canon', () => {
  const result = validateBasket({
    schema: 'orchard.basket/v0',
    basket_id: 'basket-1',
    fruit_refs: ['fruit-1'],
    created_at: '2026-08-31T23:00:00Z',
    canon: true,
  });
  assert.equal(result.ok, false);
  assert.match(result.errors.join('\n'), /canon/);
});

test('ride exposes append-only operation list', () => {
  const result = validateRide({
    schema: 'orchard.ride/v0',
    ride_id: 'ride-1',
    intent_ref: 'intent-1',
    field_digest: 'field-abc',
    shown_fruit_refs: [],
    chosen_fruit_refs: [],
    route_receipt_refs: [],
    operations: [],
    residuals: [],
    refusals: [],
    created_at: '2026-08-31T23:00:00Z',
  });
  assert.equal(result.ok, true);
});
