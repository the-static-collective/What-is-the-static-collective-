import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fieldDigest, pick } from '../src/picker.mjs';

const field = JSON.parse(await readFile(new URL('../fixtures/field.json', import.meta.url), 'utf8'));

test('field digest ignores object key insertion order but detects content drift', () => {
  const left = { schema: 'x', field_id: 'a', records: [{ b: 2, a: 1 }] };
  const right = { records: [{ a: 1, b: 2 }], field_id: 'a', schema: 'x' };
  assert.equal(fieldDigest(left), fieldDigest(right));
  right.records[0].b = 3;
  assert.notEqual(fieldDigest(left), fieldDigest(right));
});

test('good-with-this is bounded and preserves attributable source refs', () => {
  const result = pick('good-with-this', field, { limit: 2 });
  assert.equal(result.selected.length, 2);
  assert.equal(result.selected[0].fruit_id, 'fruit-maxhinal');
  assert.ok(result.selected.every(card => card.source_refs.length > 0));
});

test('weird prefers declared structural distance', () => {
  const result = pick('weird', field, { limit: 2 });
  assert.deepEqual(result.selected.map(x => x.fruit_id), ['fruit-holonomy', 'fruit-residual']);
  assert.match(JSON.stringify(result.ranking_receipt), /distance/);
});

test('resume prefers explicit continuity or re-entry and current material', () => {
  const result = pick('resume', field, { limit: 2 });
  assert.equal(result.selected[0].fruit_id, 'fruit-memento');
  assert.ok(result.selected.every(x => x.continuity_ref || x.reentry_ref));
});

test('unfinished surfaces pressure draft residual blocked or unresolved states', () => {
  const result = pick('unfinished', field, { limit: 4 });
  assert.deepEqual(new Set(result.selected.map(x => x.status)), new Set(['pressure', 'draft', 'residual']));
  assert.ok(result.refusals.some(x => x.fruit_id === 'fruit-blocked'));
});

test('surprise is reproducible for the same seed and field', () => {
  const a = pick('surprise', field, { seed: 'banana-elves', limit: 4 });
  const b = pick('surprise', field, { seed: 'banana-elves', limit: 4 });
  const c = pick('surprise', field, { seed: 'peach-pit', limit: 4 });
  assert.deepEqual(a.selected.map(x => x.fruit_id), b.selected.map(x => x.fruit_id));
  assert.equal(a.field_digest, b.field_digest);
  assert.notDeepEqual(a.selected.map(x => x.fruit_id), c.selected.map(x => x.fruit_id));
});

test('refusal is preserved and never silently selected', () => {
  const result = pick('weird', field, { limit: 7 });
  assert.ok(result.refusals.some(x => x.fruit_id === 'fruit-blocked'));
  assert.ok(!result.selected.some(x => x.fruit_id === 'fruit-blocked'));
});

test('missing provenance stays residual even when its ranking metadata is maximal', () => {
  const result = pick('weird', field, { limit: 7 });
  assert.ok(!result.selected.some(x => x.fruit_id === 'fruit-orphan'));
  const orphan = result.residuals.find(x => x.fruit_id === 'fruit-orphan');
  assert.equal(orphan?.status, 'invalid-provenance');
});

test('ranking receipt never promotes selection into support evidence authority or canon', () => {
  const result = pick('surprise', field, { seed: 'banana-elves', limit: 3 });
  const serialized = JSON.stringify(result.ranking_receipt);
  assert.doesNotMatch(serialized, /"(?:support|evidence|authority|canon)"\s*:/);
  assert.equal(result.authority_claim, 'none');
});

test('seeded surprise reproduces exactly against an unchanged field digest', () => {
  const a = pick('surprise', structuredClone(field), { seed: 'banana-elves', limit: 5 });
  const b = pick('surprise', structuredClone(field), { seed: 'banana-elves', limit: 5 });
  assert.equal(a.field_digest, b.field_digest);
  assert.deepEqual(a, b);
});
