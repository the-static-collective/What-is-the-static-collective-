import { digestValue } from './canonical.mjs';
import { assertValidRecord } from './contracts.mjs';

function clone(value) {
  return structuredClone(value);
}

function idFor(prefix, payload) {
  return `${prefix}-${digestValue(payload).slice(-8)}`;
}

export function createBasket(fruitRefs, options = {}) {
  const createdAt = options.created_at ?? new Date().toISOString();
  const record = {
    schema: 'orchard.basket/v0',
    basket_id: options.basket_id ?? idFor('basket', { fruitRefs, createdAt }),
    fruit_refs: [...new Set(fruitRefs ?? [])],
    ...(options.human_note ? { human_note: options.human_note } : {}),
    ...(options.parent_basket_ref ? { parent_basket_ref: options.parent_basket_ref } : {}),
    created_at: createdAt,
  };
  return clone(assertValidRecord('basket', record));
}

export function continueBasket(parent, additions, options = {}) {
  assertValidRecord('basket', parent);
  return createBasket([...parent.fruit_refs, ...(additions ?? [])], {
    ...options,
    parent_basket_ref: parent.basket_id,
  });
}

export function createRide(intent, fieldDigest, options = {}) {
  const intentRef = typeof intent === 'string' ? intent : intent?.intent_id;
  if (!intentRef) throw new TypeError('intent reference is required');
  const createdAt = options.created_at ?? new Date().toISOString();
  const record = {
    schema: 'orchard.ride/v0',
    ride_id: options.ride_id ?? idFor('ride', { intentRef, fieldDigest, createdAt }),
    intent_ref: intentRef,
    field_digest: fieldDigest,
    shown_fruit_refs: [...(options.shown_fruit_refs ?? [])],
    chosen_fruit_refs: [...(options.chosen_fruit_refs ?? [])],
    route_receipt_refs: [...(options.route_receipt_refs ?? [])],
    operations: clone(options.operations ?? []),
    residuals: clone(options.residuals ?? []),
    refusals: clone(options.refusals ?? []),
    created_at: createdAt,
  };
  return clone(assertValidRecord('ride', record));
}

export function appendRideOperation(ride, operation) {
  assertValidRecord('ride', ride);
  if (!operation || typeof operation !== 'object' || Array.isArray(operation)) {
    throw new TypeError('operation must be an object');
  }
  const nextOperation = clone(operation);
  if (!nextOperation.operation_id) {
    nextOperation.operation_id = idFor('op', {
      ride_id: ride.ride_id,
      index: ride.operations.length,
      operation: nextOperation,
    });
  }
  const next = {
    ...clone(ride),
    operations: [...clone(ride.operations), nextOperation],
  };
  return clone(assertValidRecord('ride', next));
}

export function projectReplay(ride, fruitById = {}) {
  assertValidRecord('ride', ride);
  const refs = ride.chosen_fruit_refs.length
    ? [...ride.chosen_fruit_refs]
    : ride.operations.map(op => op.fruit_ref).filter(Boolean);
  const seen = new Set();
  const paths = [];

  for (const fruitRef of refs) {
    if (seen.has(fruitRef)) continue;
    seen.add(fruitRef);
    const card = fruitById[fruitRef];
    const journeyRefs = Array.isArray(card?.journey_refs) ? [...card.journey_refs] : [];
    paths.push({
      fruit_ref: fruitRef,
      endpoint_ref: card?.endpoint_ref ?? null,
      journey_refs: journeyRefs,
      receipt_refs: Array.isArray(card?.receipt_refs) ? [...card.receipt_refs] : [],
      history_status: journeyRefs.length ? 'witnessed' : 'missing',
    });
  }

  return {
    schema: 'orchard.replay/v0',
    ride_ref: ride.ride_id,
    field_digest: ride.field_digest,
    paths,
    authority_claim: 'none',
  };
}
