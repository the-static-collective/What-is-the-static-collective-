import { relayGarden } from '../src/index.mjs';

const {
  RELAY_GARDEN_STORAGE_KEY,
  completeRelayMake,
  createRelayBundle,
  createRelaySession,
  crossSelectedRelayDoor,
  loadRelayBundle,
  saveRelayBundle,
  selectRelayDoor,
  starterRelayDoors,
} = relayGarden;

const ui = {
  starterDoors: document.querySelector('#starter-doors'),
  activeDoor: document.querySelector('#active-door'),
  crossButton: document.querySelector('#cross-button'),
  makeForm: document.querySelector('#make-form'),
  makeFieldset: document.querySelector('#make-fieldset'),
  makeBody: document.querySelector('#make-body'),
  disposition: document.querySelector('#publication-disposition'),
  receipt: document.querySelector('#receipt-content'),
  chances: document.querySelector('#chance-set'),
  trace: document.querySelector('#trace-content'),
  recovery: document.querySelector('#recovery-panel'),
  fresh: document.querySelector('#fresh-garden-button'),
  exportButton: document.querySelector('#export-button'),
  leaveButton: document.querySelector('#leave-button'),
  status: document.querySelector('#status-line'),
};

const state = {
  session: null,
  lastReceipt: null,
  lastChanceSet: null,
  corruptRaw: null,
};

function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (className) el.className = className;
  return el;
}

function setStatus(message) {
  ui.status.textContent = message;
}

function freshSession() {
  return createRelaySession(starterRelayDoors());
}

function persist() {
  if (!state.session) return;
  saveRelayBundle(localStorage, createRelayBundle(state.session));
}

function sourceLink(ref) {
  const a = node('a', ref);
  a.href = ref;
  a.target = '_blank';
  a.rel = 'noreferrer';
  return a;
}

function renderTrace(door) {
  ui.trace.replaceChildren();
  if (!door) {
    ui.trace.textContent = 'Select a door to inspect its sources and owner.';
    return;
  }
  const owner = node('p');
  owner.append(node('strong', 'Owner: '), document.createTextNode(door.owner));
  ui.trace.append(owner);
  if (door.source_status) {
    const status = node('p');
    status.append(node('strong', 'Source status: '), document.createTextNode(door.source_status));
    ui.trace.append(status);
  }
  const list = node('ul');
  for (const ref of door.source_refs) {
    const li = node('li');
    if (/^https:\/\//.test(ref)) li.append(sourceLink(ref));
    else li.textContent = ref;
    list.append(li);
  }
  ui.trace.append(list);
}

function selectDoor(doorId) {
  state.session = selectRelayDoor(state.session, doorId);
  persist();
  render();
  setStatus('Door selected. Crossing still requires your explicit action.');
}

function doorButton(door) {
  const button = node('button', undefined, 'door-card');
  button.type = 'button';
  button.dataset.doorId = door.door_id;
  button.append(node('strong', door.label), node('span', door.note ?? door.kind));
  button.addEventListener('click', () => selectDoor(door.door_id));
  return button;
}

function renderStarterDoors() {
  const starterIds = new Set(starterRelayDoors().map(door => door.door_id));
  const doors = state.session.available_doors.filter(door => starterIds.has(door.door_id));
  ui.starterDoors.replaceChildren(...doors.map(doorButton));
}

function activeDoor() {
  const ref = state.session?.active?.door_ref;
  return state.session?.available_doors.find(door => door.door_id === ref) ?? null;
}

function renderActive() {
  const door = activeDoor();
  const active = state.session?.active;
  if (!door || !active) {
    ui.activeDoor.textContent = 'No door selected yet.';
    ui.crossButton.disabled = true;
    ui.makeFieldset.disabled = true;
    renderTrace(null);
    return;
  }
  ui.activeDoor.replaceChildren(
    node('strong', door.label),
    node('span', active.state === 'crossed' ? 'Crossed. One bounded make is available.' : 'Selected. Not crossed yet.'),
  );
  ui.crossButton.disabled = active.state !== 'selected';
  ui.makeFieldset.disabled = active.state !== 'crossed';
  renderTrace(door);
}

function renderReceipt() {
  if (!state.lastReceipt) {
    ui.receipt.textContent = 'No make yet.';
    return;
  }
  ui.receipt.replaceChildren();
  const heading = node('p', `Receipt ${state.lastReceipt.receipt_id}`, 'receipt-id');
  const disposition = node('p', `Publication disposition: ${state.lastReceipt.publication_disposition}`);
  const artifact = state.session.artifacts.find(item => item.artifact_id === state.lastReceipt.artifact_refs[0]);
  const body = node('blockquote');
  body.textContent = artifact?.body ?? '';
  ui.receipt.append(heading, disposition, body);
}

function renderChances() {
  if (!state.lastChanceSet) {
    ui.chances.textContent = 'Make something first.';
    return;
  }
  ui.chances.replaceChildren(...state.lastChanceSet.proposed_doors.map(doorButton));
}

function render() {
  if (!state.session) return;
  renderStarterDoors();
  renderActive();
  renderReceipt();
  renderChances();
}

function beginFreshGarden() {
  if (state.corruptRaw !== null) {
    localStorage.setItem(`${RELAY_GARDEN_STORAGE_KEY}.corrupt-backup`, state.corruptRaw);
  }
  state.corruptRaw = null;
  state.session = freshSession();
  state.lastReceipt = null;
  state.lastChanceSet = null;
  ui.recovery.hidden = true;
  persist();
  render();
  setStatus('Fresh local garden started. The unreadable prior value was preserved as a local backup.');
}

function boot() {
  const loaded = loadRelayBundle(localStorage);
  if (!loaded.ok) {
    state.corruptRaw = loaded.raw;
    ui.recovery.hidden = false;
    state.session = freshSession();
    render();
    setStatus('Could not reopen your local garden. Nothing was published or deleted.');
    return;
  }

  state.session = loaded.bundle?.session ?? freshSession();
  state.lastReceipt = state.session.receipts.at(-1) ?? null;
  state.lastChanceSet = state.session.chance_sets.at(-1) ?? null;
  render();
  setStatus(loaded.bundle ? 'Local garden reopened. No crossing authority was restored.' : 'Choose a door when you are ready.');
}

ui.crossButton.addEventListener('click', () => {
  try {
    state.session = crossSelectedRelayDoor(state.session, { kind: 'human_selection' });
    persist();
    render();
    ui.makeBody.focus();
    setStatus('Door crossed. You may make one bounded thing.');
  } catch (error) {
    setStatus(`Crossing held: ${error.message}`);
  }
});

ui.makeForm.addEventListener('submit', event => {
  event.preventDefault();
  try {
    const result = completeRelayMake(state.session, {
      body: ui.makeBody.value,
      publication_disposition: ui.disposition.value,
    });
    state.session = result.session;
    state.lastReceipt = result.receipt;
    state.lastChanceSet = result.chanceSet;
    ui.makeBody.value = '';
    persist();
    render();
    setStatus('That changed the world a little. New doors are available, but none crossed themselves.');
  } catch (error) {
    setStatus(`Make held: ${error.message}`);
  }
});

ui.fresh.addEventListener('click', beginFreshGarden);

ui.leaveButton.addEventListener('click', () => {
  setStatus('Leave whenever you want. Your local garden stays local. There is no penalty or streak to lose.');
});

ui.exportButton.addEventListener('click', () => {
  if (!state.session) return;
  const bundle = createRelayBundle(state.session);
  const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `relay-garden-${state.session.session_id}.json`;
  a.click();
  URL.revokeObjectURL(url);
  setStatus('Exported your local receipt bundle.');
});

boot();
