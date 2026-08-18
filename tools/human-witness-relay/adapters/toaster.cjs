const TOASTER_REPOSITORY = "the-static-collective/the-haunted-toaster";
const TOASTER_PR = 146;
const TOASTER_GATE_PREFIX = "elastic-topology-response-v1-field-witness/";
const TOASTER_SPECIMENS = Object.freeze([
  "quiet-spacious",
  "dense-mastered-distorted",
  "linear-positive-control",
]);
const TOASTER_GATE_IDS = new Set(TOASTER_SPECIMENS.map((name) => `${TOASTER_GATE_PREFIX}${name}`));

function isToasterWitnessEvent(event) {
  return Boolean(
    event &&
    event.subject &&
    event.subject.repository === TOASTER_REPOSITORY &&
    event.subject.pullRequest === TOASTER_PR &&
    TOASTER_GATE_IDS.has(event.subject.gateId),
  );
}

function toasterSpecimenFor(event) {
  if (!isToasterWitnessEvent(event)) return null;
  return event.subject.gateId.slice(TOASTER_GATE_PREFIX.length);
}

function assertToasterHeadFresh(event, currentHeadSha) {
  if (event.subject.headSha === currentHeadSha) return true;
  const error = new Error(`Witness head ${event.subject.headSha} is stale for current head ${currentHeadSha}`);
  error.code = "WITNESS_HEAD_STALE";
  error.witnessHeadSha = event.subject.headSha;
  error.currentHeadSha = currentHeadSha;
  throw error;
}

function assertEventId(eventId) {
  if (typeof eventId !== "string" || !/^hwv0_[a-f0-9]{64}$/.test(eventId)) {
    const error = new Error("A deterministic Human Witness Relay event ID is required");
    error.code = "WITNESS_EVENT_ID_INVALID";
    throw error;
  }
}

function quoteObservation(text) {
  return text.split(/\r?\n/).map((line) => `> ${line}`).join("\n");
}

function refsLine(refs) {
  return Array.isArray(refs) && refs.length > 0 ? refs.join(", ") : "none";
}

function renderToasterEvidencePacket(event, { eventId } = {}) {
  assertEventId(eventId);
  const specimen = toasterSpecimenFor(event);
  if (!specimen) {
    const error = new Error("Event is not a declared Haunted Toaster PR #146 witness specimen");
    error.code = "WITNESS_TARGET_UNKNOWN";
    throw error;
  }

  const markdown = [
    "### Human Witness Relay v0 — packaged field specimen",
    "",
    `- Event: \`${eventId}\``,
    `- Exact head: \`${event.subject.headSha}\``,
    `- Specimen: \`${specimen}\``,
    `- Human disposition: \`${event.witness.disposition}\``,
    `- Observed at: \`${event.witness.observedAt}\``,
    `- Build refs: ${refsLine(event.subject.buildRefs)}`,
    `- Artifact refs: ${refsLine(event.subject.artifactRefs)}`,
    `- Evidence refs: ${refsLine(event.evidenceRefs)}`,
    "",
    "**Human observation (verbatim)**",
    "",
    quoteObservation(event.witness.observation),
    "",
    "Project gate disposition: **pending project admission**.",
    "This witness does not itself authorize merge, release, regeneration, or gate closure.",
  ].join("\n");

  return {
    destination: {
      kind: "github-pr-comment",
      repository: TOASTER_REPOSITORY,
      pullRequest: TOASTER_PR,
    },
    markdown,
    projectDisposition: "pending-project-admission",
    nextDoor: null,
  };
}

module.exports = {
  TOASTER_REPOSITORY,
  TOASTER_PR,
  TOASTER_SPECIMENS,
  isToasterWitnessEvent,
  toasterSpecimenFor,
  renderToasterEvidencePacket,
  assertToasterHeadFresh,
};
