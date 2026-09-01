import {
  appendRideOperation,
  continueBasket,
  createBasket,
  createRide,
  pick,
  projectReplay,
} from '../src/index.mjs';

const ui = {
  fieldInput: document.querySelector('#field-input'),
  status: document.querySelector('#status-line'),
  seed: document.querySelector('#seed-input'),
  intentDoors: document.querySelector('#intent-doors'),
  fruitGrid: document.querySelector('#fruit-grid'),
  basket: document.querySelector('#basket'),
  rideStrip: document.querySelector('#ride-strip'),
  digest: document.querySelector('#field-digest'),
  drawer: document.querySelector('#provenance-drawer'),
  provenance: document.querySelector('#provenance-content'),
  dropZone: document.querySelector('.drop-zone'),
};

const state = {
  field: null,
  lastPick: null,
  basket: createBasket([], { basket_id: 'basket-root' }),
  ride: null,
};

const lifecycle = {
  draft: 'GROWING',
  pressure: 'GROWING',
  residual: 'GROWING',
  unresolved: 'GROWING',
  growing: 'GROWING',
  formed: 'FORMED',
  usable: 'USABLE',
  composted: 'COMPOSTED / RESEEDED',
};

function element(tag, options = {}) {
  const node = document.createElement(tag);
  if (options.className) node.className = options.className;
  if (options.text !== undefined) node.textContent = options.text;
  for (const [key, value] of Object.entries(options.attrs ?? {})) node.setAttribute(key, value);
  return node;
}

function setStatus(message, tone = 'quiet') {
  ui.status.textContent = message;
  ui.status.dataset.tone = tone;
}

function readLocalFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(String(reader.result ?? '')));
    reader.addEventListener('error', () => reject(reader.error ?? new Error('Could not read file')));
    reader.readAsText(file);
  });
}

async function loadFieldFile(file) {
  if (!file) return;
  try {
    const parsed = JSON.parse(await readLocalFile(file));
    if (!Array.isArray(parsed.records)) throw new TypeError('field.records must be an array');
    state.field = parsed;
    state.lastPick = null;
    state.ride = null;
    state.basket = createBasket([], { basket_id: 'basket-root' });
    renderBasket();
    renderRide();
    ui.digest.textContent = 'field loaded · choose an intent';
    ui.fruitGrid.replaceChildren(element('article', { className: 'empty-fruit', text: 'Field is on the bench. Choose the kind of fruit you want.' }));
    setStatus(`${file.name}: ${parsed.records.length} attributed records ready.`, 'ready');
  } catch (error) {
    setStatus(`Could not load field: ${error.message}`, 'hold');
  }
}

function rankingFor(fruitId) {
  return state.lastPick?.ranking_receipt?.find(row => row.fruit_id === fruitId) ?? null;
}

function showProvenance(card) {
  const tempRide = createRide('intent-provenance-view', state.lastPick?.field_digest ?? 'unknown-field', {
    chosen_fruit_refs: [card.fruit_id],
  });
  const replay = projectReplay(tempRide, { [card.fruit_id]: card });
  const blocks = [
    ['Source', card.source_refs],
    ['Owner', card.owner],
    ['Receipts', card.receipt_refs],
    ['Selection receipt', rankingFor(card.fruit_id)],
    ['Replay', replay.paths[0]],
    ['Authority', 'none'],
  ];
  ui.provenance.replaceChildren();
  for (const [label, value] of blocks) {
    const section = element('section', { className: 'provenance-block' });
    section.append(element('h3', { text: label }));
    section.append(element('pre', { text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }));
    ui.provenance.append(section);
  }
  ui.drawer.showModal();
}

function addToBasket(card) {
  state.basket = continueBasket(state.basket, [card.fruit_id]);
  if (state.ride) {
    state.ride = appendRideOperation(state.ride, {
      type: 'basket',
      fruit_ref: card.fruit_id,
      receipt_refs: [...card.receipt_refs],
    });
  }
  renderBasket();
  renderRide();
}

function renderFruitCard(card) {
  const article = element('article', { className: 'fruit-card' });
  const top = element('div', { className: 'fruit-top' });
  top.append(
    element('span', { className: 'lifecycle', text: lifecycle[card.status] ?? 'SEED' }),
    element('span', { className: 'fruit-kind', text: card.kind }),
  );
  const title = element('h3', { text: card.label });
  const summary = element('p', { className: 'fruit-summary', text: card.summary });
  const status = element('p', { className: 'fruit-status', text: `${card.status} · ${card.freshness}` });
  const actions = element('div', { className: 'fruit-actions' });
  const basketButton = element('button', { className: 'button primary', text: 'Add to basket', attrs: { type: 'button' } });
  basketButton.addEventListener('click', () => addToBasket(card));
  const traceButton = element('button', { className: 'button quiet', text: 'How did this get here?', attrs: { type: 'button' } });
  traceButton.addEventListener('click', () => showProvenance(card));
  actions.append(basketButton, traceButton);
  article.append(top, title, summary, status, actions);
  return article;
}

function renderPick(result) {
  ui.fruitGrid.replaceChildren(...result.selected.map(renderFruitCard));
  ui.digest.textContent = result.field_digest;
  const suffix = result.refusals.length ? ` · ${result.refusals.length} refusal kept visible` : '';
  setStatus(`${result.selected.length} fruit served${suffix}.`, 'ready');
}

function renderBasket() {
  ui.basket.replaceChildren();
  if (state.basket.fruit_refs.length === 0) {
    ui.basket.append(element('p', { text: 'Nothing picked yet.' }));
    return;
  }
  for (const ref of state.basket.fruit_refs) ui.basket.append(element('span', { className: 'basket-chip', text: ref }));
}

function renderRide() {
  ui.rideStrip.replaceChildren();
  if (!state.ride || state.ride.operations.length === 0) {
    ui.rideStrip.append(element('li', { text: 'No ride yet.' }));
    return;
  }
  for (const operation of state.ride.operations) {
    const label = operation.type === 'pick'
      ? `${operation.mode}: ${(operation.fruit_refs ?? []).join(', ')}`
      : `${operation.type}: ${operation.fruit_ref ?? operation.operation_id}`;
    ui.rideStrip.append(element('li', { text: label }));
  }
}

function runMode(mode) {
  if (!state.field) {
    setStatus('Bring an attributed field first.', 'hold');
    return;
  }
  try {
    const result = pick(mode, state.field, { seed: ui.seed.value.trim() || 'banana-elves', limit: 3 });
    state.lastPick = result;
    const refs = result.selected.map(card => card.fruit_id);
    state.ride = createRide(`intent-${mode}`, result.field_digest, {
      shown_fruit_refs: refs,
      residuals: result.residuals,
      refusals: result.refusals,
    });
    state.ride = appendRideOperation(state.ride, {
      type: 'pick',
      mode,
      seed: result.seed,
      fruit_refs: refs,
      ranking_receipt: result.ranking_receipt,
    });
    renderPick(result);
    renderRide();
  } catch (error) {
    setStatus(`ORCHARD held the route: ${error.message}`, 'hold');
  }
}

ui.fieldInput.addEventListener('change', event => loadFieldFile(event.target.files?.[0]));
ui.intentDoors.addEventListener('click', event => {
  const button = event.target.closest('button[data-mode]');
  if (!button || button.getAttribute('aria-disabled') === 'true') return;
  runMode(button.dataset.mode);
});

for (const eventName of ['dragenter', 'dragover']) {
  ui.dropZone.addEventListener(eventName, event => {
    event.preventDefault();
    ui.dropZone.dataset.dragging = 'true';
  });
}
for (const eventName of ['dragleave', 'drop']) {
  ui.dropZone.addEventListener(eventName, event => {
    event.preventDefault();
    delete ui.dropZone.dataset.dragging;
  });
}
ui.dropZone.addEventListener('drop', event => loadFieldFile(event.dataTransfer?.files?.[0]));

renderBasket();
renderRide();
