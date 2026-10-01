import { assertRelayRecord } from './contracts.mjs';

export const RELAY_GARDEN_STORAGE_KEY = 'static-collective.relay-garden.v0';

function clone(value) {
  return structuredClone(value);
}

function validateBundleObject(bundle) {
  if (!bundle || typeof bundle !== 'object' || Array.isArray(bundle)) {
    throw new TypeError('bundle must be an object');
  }
  if (bundle.schema !== 'relay-garden.bundle/v0') {
    throw new TypeError('bundle schema must be relay-garden.bundle/v0');
  }
  assertRelayRecord('session', bundle.session);
  return bundle;
}

export function createRelayBundle(session, options = {}) {
  assertRelayRecord('session', session);
  return clone({
    schema: 'relay-garden.bundle/v0',
    session: clone(session),
    exported_at: options.exported_at ?? new Date().toISOString(),
  });
}

export function parseRelayBundle(jsonText) {
  const raw = String(jsonText ?? '');
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    return { ok: false, error: `invalid JSON: ${error.message}`, raw };
  }

  try {
    validateBundleObject(parsed);
    return { ok: true, bundle: clone(parsed) };
  } catch (error) {
    return { ok: false, error: error.message, raw };
  }
}

export function saveRelayBundle(storage, bundle, key = RELAY_GARDEN_STORAGE_KEY) {
  if (!storage || typeof storage.setItem !== 'function') {
    throw new TypeError('storage.setItem is required');
  }
  validateBundleObject(bundle);
  storage.setItem(key, JSON.stringify(bundle));
}

export function loadRelayBundle(storage, key = RELAY_GARDEN_STORAGE_KEY) {
  if (!storage || typeof storage.getItem !== 'function') {
    throw new TypeError('storage.getItem is required');
  }
  const raw = storage.getItem(key);
  if (raw === null) return { ok: true, bundle: null, raw: null };

  const parsed = parseRelayBundle(raw);
  if (!parsed.ok) return parsed;

  const bundle = clone(parsed.bundle);
  const staleActive = bundle.session.active;
  if (staleActive !== null) {
    bundle.resume_residuals = [
      ...(Array.isArray(bundle.resume_residuals) ? bundle.resume_residuals : []),
      {
        type: 'stale-active-crossing-held',
        door_ref: staleActive.door_ref ?? null,
        prior_state: staleActive.state ?? null,
      },
    ];
    bundle.session.active = null;
  }

  return { ok: true, bundle };
}
