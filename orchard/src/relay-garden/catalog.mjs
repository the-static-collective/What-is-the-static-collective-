import { assertRelayRecord } from './contracts.mjs';

const VERIFIED_AT = '2026-10-01T19:50:00Z';

const CATALOG = [
  {
    schema: 'relay-garden.door/v0',
    door_id: 'pet-sitter.continue-one-beat',
    label: 'Continue The Pet Sitter by one beat',
    kind: 'continue',
    source_refs: [
      'https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/the-pet-sitter-featured-story-seed/README.md',
    ],
    owner: 'What-is-the-static-collective- / The Pet Sitter story seed',
    source_status: 'Featured original story seed · concept / not screenplay · 2026-09-23',
    verified_at: VERIFIED_AT,
    requirements: [],
    visibility: 'public-source',
    selection_authority: 'human',
    crossing_authority: false,
    make: {
      input: 'text',
      min_length: 1,
      max_length: 1200,
      account_required: false,
      upload_required: false,
      network_required: false,
    },
    output_kind: 'story-beat',
    external_effects: false,
    note: 'This local make does not edit or publish to the story seed repository.',
    created_at: VERIFIED_AT,
  },
  {
    schema: 'relay-garden.door/v0',
    door_id: 'front-room.repair-one-doorway',
    label: 'Repair one Front Room doorway',
    kind: 'repair',
    source_refs: [
      'https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/README.md',
      'https://github.com/the-static-collective/What-is-the-static-collective-/blob/main/CONTRIBUTING.md',
    ],
    owner: 'What-is-the-static-collective- / Front Room',
    source_status: 'Public orientation and Leave a Trace surfaces on main',
    verified_at: VERIFIED_AT,
    requirements: [],
    visibility: 'public-source',
    selection_authority: 'human',
    crossing_authority: false,
    make: {
      input: 'text',
      min_length: 1,
      max_length: 800,
      account_required: false,
      upload_required: false,
      network_required: false,
    },
    output_kind: 'doorway-repair-note',
    external_effects: false,
    note: 'This local make does not edit or publish to the Front Room repository.',
    created_at: VERIFIED_AT,
  },
  {
    schema: 'relay-garden.door/v0',
    door_id: 'haunted-toaster.witness-one-claim',
    label: 'Witness one Haunted Toaster claim',
    kind: 'witness',
    source_refs: [
      'https://github.com/the-static-collective/the-haunted-toaster/blob/main/README.md',
    ],
    owner: 'the-haunted-toaster',
    source_status: 'BETA 0.0.0 proposed carrier is draft PR #275; main remains product authority until it lands',
    verified_at: VERIFIED_AT,
    requirements: [],
    visibility: 'public-source',
    selection_authority: 'human',
    crossing_authority: false,
    make: {
      input: 'text',
      min_length: 1,
      max_length: 900,
      account_required: false,
      upload_required: false,
      network_required: false,
    },
    output_kind: 'witness-note',
    external_effects: false,
    note: 'This local make records a test, question, or edge case; it does not run or alter The Haunted Toaster.',
    created_at: VERIFIED_AT,
  },
];

for (const door of CATALOG) assertRelayRecord('door', door);

export function starterRelayDoors() {
  return structuredClone(CATALOG);
}
