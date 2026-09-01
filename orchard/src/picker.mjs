import { digestValue, seededUnit } from './canonical.mjs';
import { validateFruitCard } from './contracts.mjs';

const MODES = new Set(['good-with-this', 'weird', 'resume', 'unfinished', 'surprise']);
const UNFINISHED = new Set(['unresolved', 'blocked', 'draft', 'residual', 'pressure']);

export function fieldDigest(field) {
  return digestValue(field);
}

function boundedLimit(limit) {
  const parsed = Number.isFinite(Number(limit)) ? Math.trunc(Number(limit)) : 3;
  return Math.max(1, Math.min(7, parsed || 3));
}

function timestampScore(value) {
  const ms = Date.parse(value ?? '');
  return Number.isFinite(ms) ? ms / 1e12 : 0;
}

function scoreRecord(mode, record, seed, digest) {
  switch (mode) {
    case 'good-with-this':
      return { score: Number(record.relevance ?? 0), factors: { relevance: Number(record.relevance ?? 0) } };
    case 'weird':
      return { score: Number(record.distance ?? 0), factors: { distance: Number(record.distance ?? 0) } };
    case 'resume': {
      const continuity = record.continuity_ref ? 2 : 0;
      const reentry = record.reentry_ref ? 3 : 0;
      const current = record.freshness === 'current' ? 1 : 0;
      const recency = timestampScore(record.updated_at);
      return { score: (continuity + reentry) * 1000 + current * 100 + recency, factors: { continuity, reentry, current, recency } };
    }
    case 'unfinished': {
      const unfinished = UNFINISHED.has(record.status) ? 1 : 0;
      const pressure = record.status === 'pressure' ? 5 : 0;
      const residual = record.status === 'residual' ? 4 : 0;
      const draft = record.status === 'draft' ? 3 : 0;
      const blocked = record.status === 'blocked' ? 2 : 0;
      const unresolved = record.status === 'unresolved' ? 1 : 0;
      return { score: unfinished * 100 + pressure + residual + draft + blocked + unresolved, factors: { unfinished, pressure, residual, draft, blocked, unresolved } };
    }
    case 'surprise': {
      const surprise = seededUnit(`${seed}\u241f${digest}`, record.fruit_id);
      return { score: surprise, factors: { seeded_surprise: surprise } };
    }
    default:
      throw new TypeError(`unsupported PICKER mode: ${mode}`);
  }
}

function eligibleForMode(mode, record) {
  if (mode === 'resume') return Boolean(record.continuity_ref || record.reentry_ref);
  if (mode === 'unfinished') return UNFINISHED.has(record.status);
  return true;
}

export function pick(mode, field, options = {}) {
  if (!MODES.has(mode)) throw new TypeError(`unsupported PICKER mode: ${mode}`);
  if (!field || !Array.isArray(field.records)) throw new TypeError('field.records must be an array');

  const digest = fieldDigest(field);
  const seed = String(options.seed ?? 'orchard-v0');
  const limit = boundedLimit(options.limit);
  const refusals = [];
  const residuals = [];
  const ranked = [];

  for (const record of field.records) {
    if (record.status === 'refused' || record.route_status === 'REFUSE') {
      refusals.push(record);
      continue;
    }
    const validity = validateFruitCard(record);
    if (!validity.ok) {
      residuals.push({ fruit_id: record.fruit_id ?? null, status: 'invalid-provenance', errors: validity.errors });
      continue;
    }
    if (!eligibleForMode(mode, record)) continue;
    const scored = scoreRecord(mode, record, seed, digest);
    ranked.push({ record, ...scored });
  }

  ranked.sort((a, b) => b.score - a.score || String(a.record.fruit_id).localeCompare(String(b.record.fruit_id)));
  const selectedRows = ranked.slice(0, limit);
  const selectedIds = new Set(selectedRows.map(row => row.record.fruit_id));
  for (const row of ranked.slice(limit)) {
    residuals.push({ fruit_id: row.record.fruit_id, status: 'not-selected', score: row.score });
  }

  return {
    schema: 'orchard.pick-result/v0',
    field_digest: digest,
    mode,
    seed,
    selected: selectedRows.map(row => structuredClone(row.record)),
    residuals,
    refusals: refusals.map(record => structuredClone(record)),
    ranking_receipt: selectedRows.map(row => ({
      fruit_id: row.record.fruit_id,
      score: row.score,
      factors: row.factors,
      selected: selectedIds.has(row.record.fruit_id),
    })),
    authority_claim: 'none',
  };
}
