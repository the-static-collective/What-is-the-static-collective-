import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const html = await readFile(new URL('../bench/index.html', import.meta.url), 'utf8').catch(() => '');
const app = await readFile(new URL('../bench/app.mjs', import.meta.url), 'utf8').catch(() => '');
const css = await readFile(new URL('../bench/styles.css', import.meta.url), 'utf8').catch(() => '');

const requiredIds = ['field-input', 'intent-doors', 'fruit-grid', 'basket', 'ride-strip', 'provenance-drawer', 'status-line'];

test('human bench exposes the required ORCHARD interaction regions', () => {
  for (const id of requiredIds) assert.match(html, new RegExp(`id=["']${id}["']`));
});

test('browser adapter imports the shared core instead of duplicating picker semantics', () => {
  assert.match(app, /from ['"]\.\.\/src\/index\.mjs['"]/);
  assert.doesNotMatch(app, /seededUnit|scoreRecord|const\s+UNFINISHED|const\s+MODES/);
});

test('research and make are visible but dormant future doors', () => {
  assert.match(html, /data-mode="research"[^>]*aria-disabled="true"/);
  assert.match(html, /data-mode="make"[^>]*aria-disabled="true"/);
});

test('delight copy keeps provenance one gesture away', () => {
  assert.match(html, /THE JOY WAS ALREADY APPROVED/);
  assert.match(`${html}\n${app}`, /How did this get here\?/);
});

test('bench has no remote runtime or network client', () => {
  const all = `${html}\n${app}\n${css}`;
  assert.doesNotMatch(all, /<script[^>]+src=["']https?:/i);
  assert.doesNotMatch(all, /<link[^>]+href=["']https?:/i);
  assert.doesNotMatch(all, /\bfetch\s*\(|XMLHttpRequest|WebSocket\s*\(/);
});

test('bench includes accessible focus and reduced-motion treatment', () => {
  assert.match(css, /:focus-visible/);
  assert.match(css, /prefers-reduced-motion/);
  assert.match(html, /aria-live="polite"/);
});
