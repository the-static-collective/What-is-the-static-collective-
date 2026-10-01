const PUBLICATION_DISPOSITIONS = new Set([
  'local_only',
  'held_for_review',
  'refused',
  'publication_proposed',
]);

const DOOR_VISIBILITY = new Set(['local', 'public-source']);

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function start(record, schema, required) {
  const errors = [];
  if (!isObject(record)) return ['record must be an object'];
  if (record.schema !== schema) errors.push(`schema must be ${schema}`);
  for (const key of required) {
    if (!(key in record)) errors.push(`${key} is required`);
  }
  return errors;
}

function finish(record, errors) {
  return errors.length ? { ok: false, errors } : { ok: true, value: record };
}

function requireString(record, key, errors) {
  if (typeof record?.[key] !== 'string' || record[key].length === 0) {
    errors.push(`${key} must be a non-empty string`);
  }
}

function requireArray(record, key, errors, { nonEmpty = false } = {}) {
  if (!Array.isArray(record?.[key])) {
    errors.push(`${key} must be an array`);
    return;
  }
  if (nonEmpty && record[key].length === 0) errors.push(`${key} must not be empty`);
}

export function validateRelayDoor(record) {
  const errors = start(record, 'relay-garden.door/v0', [
    'door_id', 'label', 'kind', 'source_refs', 'owner', 'requirements',
    'visibility', 'selection_authority', 'crossing_authority', 'created_at',
  ]);
  if (isObject(record)) {
    for (const key of ['door_id', 'label', 'kind', 'owner', 'created_at']) requireString(record, key, errors);
    requireArray(record, 'source_refs', errors, { nonEmpty: true });
    requireArray(record, 'requirements', errors);
    if (!DOOR_VISIBILITY.has(record.visibility)) {
      errors.push('visibility must be local or public-source');
    }
    if (record.selection_authority !== 'human') {
      errors.push('selection_authority must equal human');
    }
    if (record.crossing_authority !== false) {
      errors.push('crossing_authority must equal false');
    }
  }
  return finish(record, errors);
}

export function validateRelayArtifact(record) {
  const errors = start(record, 'relay-garden.artifact/v0', [
    'artifact_id', 'door_ref', 'source_refs', 'owner', 'kind', 'body',
    'visibility', 'created_at',
  ]);
  if (isObject(record)) {
    for (const key of ['artifact_id', 'door_ref', 'owner', 'kind', 'created_at']) requireString(record, key, errors);
    requireArray(record, 'source_refs', errors, { nonEmpty: true });
    if (typeof record.body !== 'string') errors.push('body must be a string');
    if (record.visibility !== 'local') errors.push('artifact visibility must equal local in v0');
  }
  return finish(record, errors);
}

export function validateMakeReceipt(record) {
  const errors = start(record, 'relay-garden.make-receipt/v0', [
    'receipt_id', 'door_ref', 'source_refs', 'artifact_refs', 'fruit', 'compost',
    'visibility', 'publication_disposition', 'created_at',
  ]);
  if (isObject(record)) {
    for (const key of ['receipt_id', 'door_ref', 'created_at']) requireString(record, key, errors);
    requireArray(record, 'source_refs', errors, { nonEmpty: true });
    requireArray(record, 'artifact_refs', errors, { nonEmpty: true });
    requireArray(record, 'fruit', errors);
    requireArray(record, 'compost', errors);
    if (record.visibility !== 'local') errors.push('receipt visibility must equal local in v0');
    if (!PUBLICATION_DISPOSITIONS.has(record.publication_disposition)) {
      errors.push('publication_disposition is not permitted');
    }
  }
  return finish(record, errors);
}

export function validateChanceSet(record) {
  const errors = start(record, 'relay-garden.chance-set/v0', [
    'chance_set_id', 'parent_receipt_ref', 'proposed_doors', 'derivation_refs',
    'max_visible', 'created_at', 'selection_authority', 'crossing_authority',
  ]);
  if (isObject(record)) {
    for (const key of ['chance_set_id', 'parent_receipt_ref', 'created_at']) requireString(record, key, errors);
    requireArray(record, 'proposed_doors', errors);
    requireArray(record, 'derivation_refs', errors, { nonEmpty: true });
    if (!Number.isInteger(record.max_visible) || record.max_visible < 1 || record.max_visible > 3) {
      errors.push('max_visible must be an integer from 1 to 3');
    }
    if (Array.isArray(record.proposed_doors) && record.proposed_doors.length > 3) {
      errors.push('proposed_doors must contain at most 3 machine proposed doors');
    }
    if (record.selection_authority !== 'human') {
      errors.push('selection_authority must equal human');
    }
    if (record.crossing_authority !== false) {
      errors.push('crossing_authority must equal false');
    }
    if (Array.isArray(record.proposed_doors)) {
      record.proposed_doors.forEach((door, index) => {
        const result = validateRelayDoor(door);
        if (!result.ok) {
          errors.push(...result.errors.map(error => `proposed_doors[${index}]: ${error}`));
        }
      });
    }
  }
  return finish(record, errors);
}

export function validateRelaySession(record) {
  const errors = start(record, 'relay-garden.session/v0', [
    'session_id', 'available_doors', 'active', 'artifacts', 'receipts',
    'chance_sets', 'created_at',
  ]);
  if (isObject(record)) {
    for (const key of ['session_id', 'created_at']) requireString(record, key, errors);
    requireArray(record, 'available_doors', errors, { nonEmpty: true });
    requireArray(record, 'artifacts', errors);
    requireArray(record, 'receipts', errors);
    requireArray(record, 'chance_sets', errors);
    if (!(record.active === null || isObject(record.active))) {
      errors.push('active must be null or an object');
    }
    if (Array.isArray(record.available_doors)) {
      record.available_doors.forEach((door, index) => {
        const result = validateRelayDoor(door);
        if (!result.ok) {
          errors.push(...result.errors.map(error => `available_doors[${index}]: ${error}`));
        }
      });
    }
  }
  return finish(record, errors);
}

export function assertRelayRecord(kind, record) {
  const validators = {
    door: validateRelayDoor,
    artifact: validateRelayArtifact,
    receipt: validateMakeReceipt,
    chanceSet: validateChanceSet,
    session: validateRelaySession,
  };
  const validator = validators[kind];
  if (!validator) throw new TypeError(`unknown relay record kind: ${kind}`);
  const result = validator(record);
  if (!result.ok) throw new TypeError(result.errors.join('; '));
  return result.value;
}
