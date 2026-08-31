const FORBIDDEN_PROMOTION_FIELDS = new Set([
  'authorize_effects', 'canon', 'supported', 'evidence', 'authority', 'promoted',
]);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function validateBase(record, schema, required) {
  const errors = [];
  if (!isObject(record)) return { ok: false, errors: ['record must be an object'] };
  if (record.schema !== schema) errors.push(`schema must be ${schema}`);
  for (const key of required) {
    if (!(key in record)) errors.push(`${key} is required`);
  }
  for (const key of Object.keys(record)) {
    if (FORBIDDEN_PROMOTION_FIELDS.has(key)) errors.push(`${key} is not permitted in ${schema}`);
  }
  return errors;
}

function finish(record, errors) {
  return errors.length ? { ok: false, errors } : { ok: true, value: record };
}

export function validateIntent(record) {
  const errors = validateBase(record, 'orchard.intent/v0', [
    'intent_id', 'human_text', 'mode', 'input_refs', 'constraints', 'created_at',
  ]);
  if (Array.isArray(errors)) {
    if (!Array.isArray(record?.input_refs)) errors.push('input_refs must be an array');
    if (!isObject(record?.constraints)) errors.push('constraints must be an object');
  }
  return finish(record, Array.isArray(errors) ? errors : errors.errors);
}

export function validateFruitCard(record) {
  const errors = validateBase(record, 'orchard.fruit-card/v0', [
    'fruit_id', 'label', 'kind', 'summary', 'source_refs', 'owner', 'freshness',
    'status', 'available_actions', 'receipt_refs', 'authority_claim',
  ]);
  if (Array.isArray(errors)) {
    if (!Array.isArray(record?.source_refs) || record.source_refs.length === 0) {
      errors.push('source_refs must contain at least one attributable source');
    }
    if (record?.authority_claim !== 'none') errors.push('authority_claim must equal none');
    if (!Array.isArray(record?.available_actions)) errors.push('available_actions must be an array');
    if (!Array.isArray(record?.receipt_refs)) errors.push('receipt_refs must be an array');
  }
  return finish(record, Array.isArray(errors) ? errors : errors.errors);
}

export function validateBasket(record) {
  const errors = validateBase(record, 'orchard.basket/v0', [
    'basket_id', 'fruit_refs', 'created_at',
  ]);
  if (Array.isArray(errors) && !Array.isArray(record?.fruit_refs)) {
    errors.push('fruit_refs must be an array');
  }
  return finish(record, Array.isArray(errors) ? errors : errors.errors);
}

export function validateRide(record) {
  const errors = validateBase(record, 'orchard.ride/v0', [
    'ride_id', 'intent_ref', 'field_digest', 'shown_fruit_refs', 'chosen_fruit_refs',
    'route_receipt_refs', 'operations', 'residuals', 'refusals', 'created_at',
  ]);
  if (Array.isArray(errors)) {
    for (const key of ['shown_fruit_refs', 'chosen_fruit_refs', 'route_receipt_refs', 'operations', 'residuals', 'refusals']) {
      if (!Array.isArray(record?.[key])) errors.push(`${key} must be an array`);
    }
  }
  return finish(record, Array.isArray(errors) ? errors : errors.errors);
}

export function assertValidRecord(kind, record) {
  const validators = {
    intent: validateIntent,
    fruit: validateFruitCard,
    basket: validateBasket,
    ride: validateRide,
  };
  const validator = validators[kind];
  if (!validator) throw new TypeError(`unknown record kind: ${kind}`);
  const result = validator(record);
  if (!result.ok) throw new TypeError(result.errors.join('; '));
  return result.value;
}
