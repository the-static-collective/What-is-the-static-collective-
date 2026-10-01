import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const htmlUrl = new URL('../relay-garden/index.html', import.meta.url);
const appUrl = new URL('../relay-garden/app.mjs', import.meta.url);

async function source() {
  return {
    html: await readFile(htmlUrl, 'utf8'),
    app: await readFile(appUrl, 'utf8'),
  };
}

test('surface exposes the required Relay Garden regions', async () => {
  const { html } = await source();
  for (const id of [
    'starter-doors',
    'active-door',
    'cross-button',
    'make-form',
    'make-body',
    'publication-disposition',
    'receipt-panel',
    'chance-set',
    'trace-panel',
    'leave-button',
    'export-button',
    'status-line',
  ]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test('surface states the public encounter without pretending publication', async () => {
  const { html } = await source();
  assert.match(html, /We made this\. Now you get to make something\./i);
  assert.match(html, /That changed the world a little\./i);
  assert.match(html, /What can exist now/i);
  assert.match(html, /does not publish/i);
  assert.match(html, /Leave/i);
  assert.doesNotMatch(html, /streak|scarcity|expires in|last chance/i);
});

test('browser adapter imports shared ORCHARD core and contains no network client', async () => {
  const { app } = await source();
  assert.match(app, /from ['"]\.\.\/src\/index\.mjs['"]/);
  for (const forbidden of ['fetch(', 'XMLHttpRequest', 'WebSocket', 'EventSource']) {
    assert.equal(app.includes(forbidden), false, `must not contain ${forbidden}`);
  }
});

test('selection and crossing remain distinct and make waits for crossing', async () => {
  const { html, app } = await source();
  assert.match(html, /id=["']cross-button["']/);
  assert.match(html, /fieldset[^>]+disabled/i);
  assert.match(app, /selectRelayDoor/);
  assert.match(app, /crossSelectedRelayDoor/);
  assert.match(app, /completeRelayMake/);
});

test('user-created artifact text is rendered as text rather than HTML', async () => {
  const { app } = await source();
  assert.doesNotMatch(app, /\.innerHTML\s*=/);
  assert.doesNotMatch(app, /insertAdjacentHTML/);
  assert.match(app, /textContent/);
});

test('starter catalog is rendered rather than hard-coded duplicate doors', async () => {
  const { app } = await source();
  assert.match(app, /starterRelayDoors/);
  assert.doesNotMatch(app, /pet-sitter\.continue-one-beat[\s\S]*front-room\.repair-one-doorway[\s\S]*haunted-toaster\.witness-one-claim/);
});

test('corrupt local state has a separate fresh-garden recovery action', async () => {
  const { html, app } = await source();
  assert.match(html, /id=["']fresh-garden-button["']/);
  assert.match(app, /Could not reopen your local garden/i);
  assert.doesNotMatch(app, /removeItem\(/);
});

test('accessibility hooks are present for touch keyboard and status', async () => {
  const { html } = await source();
  assert.match(html, /aria-live=["']polite["']/);
  assert.match(html, /<label[^>]*for=["']make-body["']/);
  assert.match(html, /<label[^>]*for=["']publication-disposition["']/);
});
