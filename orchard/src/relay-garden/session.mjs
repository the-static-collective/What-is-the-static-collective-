import { digestValue } from '../canonical.mjs';
import { assertRelayRecord } from './contracts.mjs';

function clone(value) {
  return structuredClone(value);
}

function idFor(prefix, payload) {
  return `${prefix}-${digestValue(payload).slice(-8)}`;
}

function now(value) {
  return value ?? new Date().toISOString();
}

function requireSession(session) {
  return assertRelayRecord('session', session);
}

function activeDoor(session) {
  const doorRef = session.active?.door_ref;
  if (!doorRef) return null;
  return session.available_doors.find(door => door.door_id === doorRef) ?? null;
}

export function createRelaySession(starterDoors, options = {}) {
  if (!Array.isArray(starterDoors) || starterDoors.length === 0) {
    throw new TypeError('at least one starter door is required');
  }
  const createdAt = now(options.created_at);
  const availableDoors = starterDoors.map(door => clone(assertRelayRecord('door', door)));
  const record = {
    schema: 'relay-garden.session/v0',
    session_id: options.session_id ?? idFor('session', { doors: availableDoors.map(d => d.door_id), createdAt }),
    available_doors: availableDoors,
    active: null,
    artifacts: [],
    receipts: [],
    chance_sets: [],
    created_at: createdAt,
  };
  return clone(requireSession(record));
}

export function selectRelayDoor(session, doorId, options = {}) {
  requireSession(session);
  const door = session.available_doors.find(candidate => candidate.door_id === doorId);
  if (!door) throw new TypeError(`door is not available: ${doorId}`);
  const next = clone(session);
  next.active = {
    door_ref: door.door_id,
    state: 'selected',
    selected_at: now(options.selected_at),
  };
  return clone(requireSession(next));
}

export function crossSelectedRelayDoor(session, proof = {}) {
  requireSession(session);
  if (session.active?.state !== 'selected') {
    throw new TypeError('a selected door is required before crossing');
  }
  if (proof.kind !== 'human_selection') {
    throw new TypeError('crossing requires kind human_selection');
  }
  if (!activeDoor(session)) throw new TypeError('selected door is no longer available');
  const next = clone(session);
  next.active = {
    ...next.active,
    state: 'crossed',
    crossed_at: now(proof.crossed_at),
    crossing_kind: 'human_selection',
  };
  return clone(requireSession(next));
}

function textConstraints(door) {
  const make = door.make ?? {};
  return {
    min: Number.isInteger(make.min_length) ? make.min_length : 1,
    max: Number.isInteger(make.max_length) ? make.max_length : 1200,
  };
}

function validateText(door, body) {
  if (typeof body !== 'string') throw new TypeError('make body must be text');
  const { min, max } = textConstraints(door);
  if (body.trim().length < min) throw new TypeError(`text must contain at least ${min} character`);
  if (body.length > max) throw new TypeError(`text must be at most ${max} characters`);
}

export function completeRelayMake(session, input, options = {}) {
  requireSession(session);
  if (session.active?.state !== 'crossed') {
    throw new TypeError('a crossed door is required before a make');
  }
  const door = activeDoor(session);
  if (!door) throw new TypeError('crossed door is no longer available');
  validateText(door, input?.body);

  const createdAt = now(options.created_at);
  const artifact = assertRelayRecord('artifact', {
    schema: 'relay-garden.artifact/v0',
    artifact_id: options.artifact_id ?? idFor('artifact', {
      session: session.session_id,
      door: door.door_id,
      body: input.body,
      createdAt,
    }),
    door_ref: door.door_id,
    source_refs: [...door.source_refs],
    owner: options.owner ?? 'local-participant',
    kind: door.output_kind ?? 'text',
    body: input.body,
    visibility: 'local',
    created_at: createdAt,
  });

  const receipt = assertRelayRecord('receipt', {
    schema: 'relay-garden.make-receipt/v0',
    receipt_id: options.receipt_id ?? idFor('receipt', {
      session: session.session_id,
      artifact: artifact.artifact_id,
      createdAt,
    }),
    door_ref: door.door_id,
    source_refs: [...door.source_refs],
    artifact_refs: [artifact.artifact_id],
    fruit: [{ kind: 'created', artifact_ref: artifact.artifact_id }],
    compost: [],
    visibility: 'local',
    publication_disposition: input?.publication_disposition ?? 'local_only',
    created_at: createdAt,
  });

  const next = clone(session);
  next.artifacts = [...next.artifacts, clone(artifact)];
  next.receipts = [...next.receipts, clone(receipt)];
  next.active = null;

  return {
    session: clone(requireSession(next)),
    artifact: clone(artifact),
    receipt: clone(receipt),
  };
}
