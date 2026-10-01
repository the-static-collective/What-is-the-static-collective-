import { digestValue } from '../canonical.mjs';
import { assertRelayRecord } from './contracts.mjs';

function clone(value) {
  return structuredClone(value);
}

function idFor(prefix, payload) {
  return `${prefix}-${digestValue(payload).slice(-8)}`;
}

const KIND_TEMPLATES = {
  continue: [
    ['continue', 'Continue what changed'],
    ['translate', 'Carry this into another form'],
    ['witness', 'Witness what this changed'],
  ],
  translate: [
    ['continue', 'Continue this translation'],
    ['witness', 'Witness the translation'],
    ['branch', 'Branch from the translated form'],
  ],
  repair: [
    ['repair', 'Repair the next rough edge'],
    ['witness', 'Test the repair'],
    ['branch', 'Try another repair path'],
  ],
  witness: [
    ['witness', 'Witness the next claim'],
    ['repair', 'Repair what the witness exposed'],
    ['return', 'Return the witness to its source'],
  ],
  branch: [
    ['continue', 'Continue this branch'],
    ['witness', 'Witness this branch'],
    ['return', 'Return with what the branch learned'],
  ],
  return: [
    ['witness', 'Witness what returned'],
    ['continue', 'Continue from the return'],
  ],
  compost: [
    ['compost', 'Work the compost'],
    ['repair', 'Repair the failed seam'],
  ],
};

function templatesFor(receipt, sourceDoor) {
  if (receipt.publication_disposition === 'refused') {
    return [
      ['compost', 'Compost what could not publish'],
      ['repair', 'Repair the blocked doorway'],
    ];
  }
  return KIND_TEMPLATES[sourceDoor.kind] ?? [
    ['hold-and-name-gap', 'Hold this and name the missing next step'],
  ];
}

function makeDoor(kind, label, receipt, artifact, sourceDoor, createdAt, index) {
  return assertRelayRecord('door', {
    schema: 'relay-garden.door/v0',
    door_id: idFor('door', {
      parent: receipt.receipt_id,
      artifact: artifact.artifact_id,
      kind,
      index,
    }),
    label,
    kind,
    source_refs: [
      artifact.artifact_id,
      receipt.receipt_id,
      ...receipt.source_refs,
    ],
    owner: 'relay-garden-local',
    requirements: [],
    visibility: 'local',
    selection_authority: 'human',
    crossing_authority: false,
    make: { input: 'text', min_length: 1, max_length: 1200 },
    output_kind: kind === 'translate' ? 'translation' : 'text',
    generated_from: {
      artifact_ref: artifact.artifact_id,
      receipt_ref: receipt.receipt_id,
      source_door_ref: sourceDoor.door_id,
      reason: kind,
    },
    created_at: createdAt,
  });
}

export function deriveChanceSet(receipt, artifact, sourceDoor, options = {}) {
  assertRelayRecord('receipt', receipt);
  assertRelayRecord('artifact', artifact);
  assertRelayRecord('door', sourceDoor);
  const createdAt = options.created_at ?? new Date().toISOString();
  const templates = (
    Array.isArray(options.templates)
      ? options.templates
      : templatesFor(receipt, sourceDoor)
  ).slice(0, 3);
  const proposedDoors = templates.map(([kind, label], index) => (
    makeDoor(kind, label, receipt, artifact, sourceDoor, createdAt, index)
  ));
  if (proposedDoors.length === 0) {
    proposedDoors.push(makeDoor(
      'hold-and-name-gap',
      'Hold this and name the missing next step',
      receipt,
      artifact,
      sourceDoor,
      createdAt,
      0,
    ));
  }
  return clone(assertRelayRecord('chanceSet', {
    schema: 'relay-garden.chance-set/v0',
    chance_set_id: idFor('chance-set', {
      receipt: receipt.receipt_id,
      artifact: artifact.artifact_id,
    }),
    parent_receipt_ref: receipt.receipt_id,
    proposed_doors: proposedDoors,
    derivation_refs: [artifact.artifact_id, receipt.receipt_id],
    max_visible: 3,
    created_at: createdAt,
    selection_authority: 'human',
    crossing_authority: false,
  }));
}
