const crypto = require("node:crypto");

const FIXTURE_SCHEMA = "static-collective/full-bowl-001/v0";
const RECEIPT_SCHEMA = "static-collective/full-bowl-001-mechanical-witness/v0";
const HOSTILE_CLASSES = [
  "direct-contradiction",
  "backwards-causality",
  "impossible-identity-lineage",
  "invented-authority",
  "illegal-reachability-to-permission",
  "uncategorized-object",
  "incompatible-worlds",
];
const CROSSING_PATH = [
  ["thing", "encounter"],
  ["encounter", "admission"],
  ["admission", "authority"],
  ["authority", "attempt"],
  ["attempt", "outcome"],
  ["outcome", "causal-accounting"],
  ["causal-accounting", "WorldCut"],
  ["WorldCut", "continuity"],
  ["continuity", "return"],
  ["return", "reachability"],
];

class FullBowlValidationError extends Error {
  constructor(code, detail) {
    super(detail === undefined ? code : `${code}: ${detail}`);
    this.name = "FullBowlValidationError";
    this.code = code;
    this.detail = detail;
  }
}

function fail(code, detail) {
  throw new FullBowlValidationError(code, detail);
}

function isRecord(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireRecord(value, code) {
  if (!isRecord(value)) fail(code);
  return value;
}

function requireNonEmptyString(value, code) {
  if (typeof value !== "string" || value.trim().length === 0) fail(code);
  return value;
}

function requireArray(value, code) {
  if (!Array.isArray(value)) fail(code);
  return value;
}

function requireUniqueStrings(value, code) {
  const strings = requireArray(value, code).map((item) => requireNonEmptyString(item, code));
  if (new Set(strings).size !== strings.length) fail(code, "duplicate");
  return strings;
}

function canonicalize(value) {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(",")}]`;
  const entries = Object.keys(value)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalize(value[key])}`);
  return `{${entries.join(",")}}`;
}

function digest(value) {
  return `sha256:${crypto.createHash("sha256").update(canonicalize(value)).digest("hex")}`;
}

function validateOwnerHeads(taskWorldCut) {
  const heads = requireRecord(taskWorldCut.ownerHeads, "FB_TASK_WORLD_CUT_HEADS_INVALID");
  const required = [
    "the-static-collective/What-is-the-static-collective-",
    "the-static-collective/project0",
    "the-static-collective/corpus-os",
    "the-static-collective/tranchnode",
  ];
  for (const repo of required) {
    const head = requireNonEmptyString(heads[repo], "FB_TASK_WORLD_CUT_HEAD_MISSING");
    if (!/^[0-9a-f]{40}$/.test(head)) fail("FB_TASK_WORLD_CUT_HEAD_INVALID", repo);
  }
  if (Object.keys(heads).length !== required.length) {
    fail("FB_TASK_WORLD_CUT_HEAD_SCOPE_WIDENED");
  }
}

function validateCrossings(crossings) {
  const values = requireArray(crossings, "FB_CROSSINGS_INVALID");
  if (values.length !== CROSSING_PATH.length) fail("FB_CROSSING_PATH_INCOMPLETE");
  const ids = new Set();

  values.forEach((value, index) => {
    const crossing = requireRecord(value, "FB_CROSSING_INVALID");
    if (crossing.sequence !== index + 1) fail("FB_CROSSING_SEQUENCE_INVALID", crossing.id);
    if (crossing.from !== CROSSING_PATH[index][0] || crossing.to !== CROSSING_PATH[index][1]) {
      fail("FB_CROSSING_PATH_COLLAPSED", crossing.id);
    }
    const id = requireNonEmptyString(crossing.id, "FB_CROSSING_ID_INVALID");
    if (ids.has(id)) fail("FB_CROSSING_ID_DUPLICATE", id);
    ids.add(id);
    requireNonEmptyString(crossing.owner, "FB_CROSSING_OWNER_MISSING");
    requireNonEmptyString(crossing.surface, "FB_CROSSING_SURFACE_MISSING");
    requireNonEmptyString(crossing.receipt, "FB_CROSSING_RECEIPT_MISSING");
    const expected = requireRecord(crossing.expected, "FB_CROSSING_EXPECTATION_MISSING");
    const expectedKeys = Object.keys(expected).sort();
    if (expectedKeys.join(",") !== "lawful,refused,unresolved") {
      fail("FB_CROSSING_EXPECTATION_INCOMPLETE", id);
    }
    for (const disposition of expectedKeys) {
      requireNonEmptyString(expected[disposition], "FB_CROSSING_EXPECTATION_EMPTY");
    }
  });

  return values;
}

function validateHostilePacket(packetValue) {
  const packet = requireRecord(packetValue, "FB_HOSTILE_PACKET_INVALID");
  if (packet.schema !== "maddcl0wn/hostile-packet/001") {
    fail("FB_HOSTILE_PACKET_SCHEMA_UNSUPPORTED");
  }
  if (packet.participantRef !== "participant:maddcl0wn") {
    fail("FB_HOSTILE_PARTICIPANT_INVALID");
  }
  if (packet.authority !== "none" || packet.admission !== "attributable-material-only") {
    fail("FB_HOSTILE_AUTHORITY_PROMOTION");
  }

  const items = requireArray(packet.items, "FB_HOSTILE_ITEMS_INVALID");
  if (items.length !== HOSTILE_CLASSES.length) fail("FB_HOSTILE_PACKET_INCOMPLETE");
  const ids = new Set();
  const classes = [];
  let refused = 0;
  let unresolved = 0;
  let boundedQuestion = 0;

  for (const value of items) {
    const item = requireRecord(value, "FB_HOSTILE_ITEM_INVALID");
    const id = requireNonEmptyString(item.id, "FB_HOSTILE_ITEM_ID_INVALID");
    if (ids.has(id)) fail("FB_HOSTILE_ITEM_ID_DUPLICATE", id);
    ids.add(id);
    const hostileClass = requireNonEmptyString(item.class, "FB_HOSTILE_CLASS_INVALID");
    classes.push(hostileClass);
    if (item.promoted !== false) fail("FB_SILENT_PROMOTION", id);
    if (item.expectedDisposition === "refused") refused += 1;
    else if (item.expectedDisposition === "unresolved") unresolved += 1;
    else fail("FB_HOSTILE_DISPOSITION_INVALID", id);
    requireNonEmptyString(item.reasonCode, "FB_HOSTILE_REASON_MISSING");
    if (typeof item.boundedQuestion === "string" && item.boundedQuestion.trim().length > 0) {
      boundedQuestion += 1;
    }
  }

  if (classes.join("\u0000") !== HOSTILE_CLASSES.join("\u0000")) {
    fail("FB_HOSTILE_CLASS_SET_INVALID");
  }
  if (refused === 0 || unresolved === 0) fail("FB_HOSTILE_DISPOSITION_COVERAGE_MISSING");
  if (boundedQuestion === 0) fail("FB_HOSTILE_TRANSLATION_MISSING");
  return { items, refused, unresolved, boundedQuestion };
}

function validateNoPortableAuthority(fixture) {
  if (fixture.project0Envelope.sourceAuthorityRefs.length !== 0) {
    fail("FB_SOURCE_AUTHORITY_TRANSFER");
  }
  const spine = requireRecord(fixture.continuitySpine, "FB_CONTINUITY_SPINE_INVALID");
  const stages = requireArray(spine.stages, "FB_CONTINUITY_STAGES_INVALID");
  for (const stageValue of stages) {
    const stage = requireRecord(stageValue, "FB_CONTINUITY_STAGE_INVALID");
    if (!requireArray(stage.carries, "FB_CONTINUITY_CARRIES_INVALID").includes("authority:portable:none")) {
      fail("FB_CONTINUITY_AUTHORITY_WIDENING", stage.id);
    }
  }
}

function validateReturnAndRecognition(fixture) {
  const specimen = requireRecord(fixture.specimen, "FB_SPECIMEN_INVALID");
  const before = requireRecord(specimen.before, "FB_SPECIMEN_BEFORE_INVALID");
  const after = requireRecord(specimen.after, "FB_SPECIMEN_AFTER_INVALID");
  if (before.visibleStateRef !== after.visibleStateRef) fail("FB_VISIBLE_RETURN_MISSING");
  if (before.historyRef === after.historyRef) fail("FB_HISTORY_SILENTLY_REVERSED");
  if (before.custodyRef === after.custodyRef) fail("FB_CUSTODY_CROSSING_MISSING");

  const probe = requireRecord(fixture.recognitionProbe, "FB_RECOGNITION_PROBE_INVALID");
  const requiredRoots = requireUniqueStrings(
    probe.requiredMaterialRoots,
    "FB_RECOGNITION_ROOTS_INVALID",
  );
  const allowedRoots = requireUniqueStrings(
    probe.allowedMaterialRoots,
    "FB_RECOGNITION_ROOTS_INVALID",
  );
  const claim = requireRecord(probe.claim, "FB_RECOGNITION_CLAIM_INVALID");
  const lookalike = requireRecord(probe.lookalikeClaim, "FB_LOOKALIKE_CLAIM_INVALID");
  const claimRoots = requireUniqueStrings(claim.ancestorRoots, "FB_RECOGNITION_CLAIM_ROOTS_INVALID");
  const lookalikeRoots = requireUniqueStrings(
    lookalike.ancestorRoots,
    "FB_LOOKALIKE_CLAIM_ROOTS_INVALID",
  );
  if (!requiredRoots.every((root) => claimRoots.includes(root))) {
    fail("FB_RECOGNITION_MATERIAL_ROOT_MISSING");
  }
  if (lookalikeRoots.some((root) => allowedRoots.includes(root))) {
    fail("FB_LOOKALIKE_NOT_ADVERSARIAL");
  }
}

function validateLeakPolicy(policyValue) {
  const policy = requireRecord(policyValue, "FB_LEAK_POLICY_INVALID");
  if (policy.automaticRepair !== false) fail("FB_AUTOMATIC_REPAIR_FORBIDDEN");
  if (!Number.isInteger(policy.maxRepairIssues) || policy.maxRepairIssues < 1 || policy.maxRepairIssues > 3) {
    fail("FB_REPAIR_ISSUE_LIMIT_INVALID");
  }
  if (policy.actualObservationRequired !== true) fail("FB_HYPOTHETICAL_LEAK_PROMOTION");
  const classifications = requireUniqueStrings(policy.classifications, "FB_LEAK_CLASSIFICATIONS_INVALID");
  if (classifications.join(",") !== "exposed,not-exposed,unresolved") {
    fail("FB_LEAK_CLASSIFICATIONS_INVALID");
  }
}

function validateFixture(value) {
  const fixture = requireRecord(value, "FB_FIXTURE_INVALID");
  if (fixture.schema !== FIXTURE_SCHEMA) fail("FB_FIXTURE_SCHEMA_UNSUPPORTED");
  if (fixture.id !== "full-bowl-001-maddclown") fail("FB_FIXTURE_ID_INVALID");

  const taskWorldCut = requireRecord(fixture.taskWorldCut, "FB_TASK_WORLD_CUT_INVALID");
  if (taskWorldCut.status !== "sufficient") fail("FB_TASK_WORLD_CUT_UNRESOLVED");
  validateOwnerHeads(taskWorldCut);
  requireUniqueStrings(taskWorldCut.included, "FB_TASK_WORLD_CUT_INCLUDED_INVALID");
  requireUniqueStrings(taskWorldCut.omitted, "FB_TASK_WORLD_CUT_OMITTED_INVALID");

  const specimen = requireRecord(fixture.specimen, "FB_SPECIMEN_INVALID");
  const envelope = requireRecord(fixture.project0Envelope, "FB_ENVELOPE_INVALID");
  const offered = requireRecord(envelope.offered, "FB_OFFERED_INVALID");
  if (offered.objectRef !== specimen.objectRef) fail("FB_ONE_THING_SPLIT");
  requireArray(envelope.sourceAuthorityRefs, "FB_SOURCE_AUTHORITY_INVALID");

  validateCrossings(fixture.crossings);
  validateHostilePacket(fixture.hostilePacket);
  validateNoPortableAuthority(fixture);
  validateReturnAndRecognition(fixture);
  validateLeakPolicy(fixture.leakPolicy);

  const nonClaims = requireUniqueStrings(fixture.nonClaims, "FB_NONCLAIMS_INVALID");
  const joined = nonClaims.join("\n").toLowerCase();
  for (const phrase of ["no universal schema", "no authority model", "no shared runtime", "no ddd"]) {
    if (!joined.includes(phrase)) fail("FB_NONCLAIM_MISSING", phrase);
  }
  return fixture;
}

function createFixtureReceipt(value) {
  const fixture = validateFixture(value);
  const hostile = validateHostilePacket(fixture.hostilePacket);
  return {
    schema: RECEIPT_SCHEMA,
    fixtureId: fixture.id,
    fixtureDigest: digest(fixture),
    mode: "fixture-check",
    status: "fixture-conforms",
    taskWorldCut: {
      status: fixture.taskWorldCut.status,
      ownerHeads: { ...fixture.taskWorldCut.ownerHeads },
    },
    checks: [
      { id: "one-thing", status: "pass" },
      { id: "ten-explicit-crossings", status: "pass" },
      { id: "lawful-refused-unresolved-at-every-crossing", status: "pass" },
      { id: "hostile-packet-complete", status: "pass" },
      { id: "no-silent-promotion", status: "pass" },
      { id: "no-portable-authority", status: "pass" },
      { id: "same-visible-state-different-history", status: "pass" },
      { id: "lookalike-does-not-share-material-root", status: "pass" },
      { id: "leak-ledger-does-not-auto-repair", status: "pass" },
    ],
    crossingMap: fixture.crossings.map((crossing) => ({
      id: crossing.id,
      from: crossing.from,
      to: crossing.to,
      owner: crossing.owner,
      receipt: crossing.receipt,
      expected: { ...crossing.expected },
    })),
    hostilePacket: {
      participantRef: fixture.hostilePacket.participantRef,
      authority: fixture.hostilePacket.authority,
      refused: hostile.refused,
      unresolved: hostile.unresolved,
      translatedToBoundedQuestion: hostile.boundedQuestion,
      dispositions: hostile.items.map((item) => ({
        id: item.id,
        class: item.class,
        disposition: item.expectedDisposition,
        reasonCode: item.reasonCode,
        promoted: item.promoted,
      })),
    },
    leakLedger: {
      automaticRepair: false,
      status: "awaiting-live-owner-probes",
      entries: [],
    },
    authority: "none",
    legalValidity: "unclaimed",
  };
}

module.exports = {
  CROSSING_PATH,
  FIXTURE_SCHEMA,
  FullBowlValidationError,
  HOSTILE_CLASSES,
  RECEIPT_SCHEMA,
  canonicalize,
  createFixtureReceipt,
  digest,
  validateFixture,
};
