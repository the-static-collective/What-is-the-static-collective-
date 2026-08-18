const VAULT_REPOSITORY = "the-static-collective/autodiscography-vault";
const VAULT_PR = 9;
const VAULT_GATE_ID = "phase-b2c-one-real-wav-preservation";

function isVaultWitnessEvent(event) {
  return Boolean(
    event &&
    event.subject &&
    event.subject.repository === VAULT_REPOSITORY &&
    event.subject.pullRequest === VAULT_PR &&
    event.subject.gateId === VAULT_GATE_ID,
  );
}

function evidenceError(code, kind) {
  const error = new Error(`Vault witness evidence ${kind} is invalid`);
  error.code = code;
  error.kind = kind;
  return error;
}

function singletonValue(refs, prefix, kind) {
  const matches = refs.filter((ref) => typeof ref === "string" && ref.startsWith(prefix));
  if (matches.length > 1) throw evidenceError("WITNESS_EVIDENCE_AMBIGUOUS", kind);
  if (matches.length === 0) return null;
  return matches[0].slice(prefix.length);
}

function parseVaultEvidenceRefs(event) {
  const evidenceRefs = Array.isArray(event.evidenceRefs) ? event.evidenceRefs : [];
  const artifactRefs = Array.isArray(event.subject?.artifactRefs) ? event.subject.artifactRefs : [];

  const providerTrackId = singletonValue(evidenceRefs, "provider-track:", "providerTrackId");
  if (providerTrackId && (/^https?:\/\//i.test(providerTrackId) || providerTrackId.length === 0)) {
    throw evidenceError("WITNESS_EVIDENCE_INVALID", "providerTrackId");
  }

  const runId = singletonValue(evidenceRefs, "run:", "runId");
  if (runId === "") throw evidenceError("WITNESS_EVIDENCE_INVALID", "runId");

  const receiptRef = singletonValue(evidenceRefs, "receipt:", "receiptRef");
  if (receiptRef === "") throw evidenceError("WITNESS_EVIDENCE_INVALID", "receiptRef");

  const sha256 = singletonValue(evidenceRefs, "sha256:", "sha256");
  if (sha256 !== null && !/^[a-f0-9]{64}$/.test(sha256)) {
    throw evidenceError("WITNESS_EVIDENCE_INVALID", "sha256");
  }

  const byteText = singletonValue(evidenceRefs, "bytes:", "byteLength");
  let byteLength = null;
  if (byteText !== null) {
    if (!/^\d+$/.test(byteText) || !Number.isSafeInteger(Number(byteText))) {
      throw evidenceError("WITNESS_EVIDENCE_INVALID", "byteLength");
    }
    byteLength = Number(byteText);
  }

  const evidenceArtifact = singletonValue(evidenceRefs, "vault-artifact:", "vaultArtifactRef");
  const subjectArtifact = evidenceArtifact === null
    ? singletonValue(artifactRefs, "vault-artifact:", "vaultArtifactRef")
    : null;
  const vaultArtifactRef = evidenceArtifact ?? subjectArtifact;
  if (vaultArtifactRef === "" || (vaultArtifactRef && /^https?:\/\//i.test(vaultArtifactRef))) {
    throw evidenceError("WITNESS_EVIDENCE_INVALID", "vaultArtifactRef");
  }

  return {
    providerTrackId,
    runId,
    receiptRef,
    sha256,
    byteLength,
    vaultArtifactRef,
  };
}

function vaultMachineEvidenceStatus(event) {
  const refs = parseVaultEvidenceRefs(event);
  const required = ["providerTrackId", "receiptRef", "sha256", "byteLength", "vaultArtifactRef"];
  const present = required.filter((key) => refs[key] !== null);
  const missing = required.filter((key) => refs[key] === null);
  if (refs.runId !== null) present.push("runId");
  return {
    complete: missing.length === 0,
    present,
    missing,
  };
}

function assertVaultHeadFresh(event, currentHeadSha) {
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

function display(value) {
  return value === null ? "not supplied" : `\`${value}\``;
}

function renderVaultEvidencePacket(event, { eventId } = {}) {
  assertEventId(eventId);
  if (!isVaultWitnessEvent(event)) {
    const error = new Error("Event is not the Autodiscography Vault PR #9 one-real-WAV witness gate");
    error.code = "WITNESS_TARGET_UNKNOWN";
    throw error;
  }
  const refs = parseVaultEvidenceRefs(event);
  const machineEvidence = vaultMachineEvidenceStatus(event);
  const markdown = [
    "### Human Witness Relay v0 — one-real-WAV preservation specimen",
    "",
    `- Event: \`${eventId}\``,
    `- Exact head: \`${event.subject.headSha}\``,
    `- Provider track: ${display(refs.providerTrackId)}`,
    `- Run: ${display(refs.runId)}`,
    `- Human disposition: \`${event.witness.disposition}\``,
    `- Observed at: \`${event.witness.observedAt}\``,
    "",
    "**Human observation (verbatim)**",
    "",
    quoteObservation(event.witness.observation),
    "",
    "**Machine evidence references**",
    "",
    `- receipt: ${display(refs.receiptRef)}`,
    `- sha256: ${display(refs.sha256)}`,
    `- byte length: ${display(refs.byteLength)}`,
    `- vault artifact: ${display(refs.vaultArtifactRef)}`,
    `- evidence class coverage: \`${machineEvidence.complete ? "complete" : "incomplete"}\``,
    `- missing classes: ${machineEvidence.missing.length ? machineEvidence.missing.join(", ") : "none"}`,
    "",
    "Browser download completion alone does not establish successful Vault preservation.",
    "Project gate disposition: **pending project admission**.",
    "This relay packet does not itself verify WAV container sanity, hash equality, byte length, durable destination, or journal safety and does not authorize merge or wider transport.",
  ].join("\n");

  return {
    destination: {
      kind: "github-pr-comment",
      repository: VAULT_REPOSITORY,
      pullRequest: VAULT_PR,
    },
    markdown,
    projectDisposition: "pending-project-admission",
    machineEvidence,
    nextDoor: null,
  };
}

module.exports = {
  VAULT_REPOSITORY,
  VAULT_PR,
  VAULT_GATE_ID,
  isVaultWitnessEvent,
  parseVaultEvidenceRefs,
  vaultMachineEvidenceStatus,
  renderVaultEvidencePacket,
  assertVaultHeadFresh,
};
