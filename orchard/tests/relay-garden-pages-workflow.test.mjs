import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const workflowUrl = new URL('../../.github/workflows/relay-garden-pages.yml', import.meta.url);

test('Pages workflow stages only the public Relay Garden surface and shared source modules', async () => {
  const yaml = await readFile(workflowUrl, 'utf8');
  for (const action of [
    'actions/checkout@v6',
    'actions/setup-node@v7',
    'actions/configure-pages@v5',
    'actions/upload-pages-artifact@v4',
    'actions/deploy-pages@v4',
  ]) {
    assert.match(yaml, new RegExp(action.replace('/', '\\/')));
  }
  assert.match(yaml, /npm test/);
  assert.match(yaml, /npm run check/);
  assert.match(yaml, /pages-out\/relay-garden/);
  assert.match(yaml, /pages-out\/src/);
  assert.match(yaml, /touch pages-out\/\.nojekyll/);
  assert.doesNotMatch(yaml, /path:\s*\.\/orchard\s*$/m);
});

test('Pages deployment has the required least permissions and environment', async () => {
  const yaml = await readFile(workflowUrl, 'utf8');
  assert.match(yaml, /pages:\s*write/);
  assert.match(yaml, /id-token:\s*write/);
  assert.match(yaml, /environment:\s*\n\s*name:\s*github-pages/);
});
