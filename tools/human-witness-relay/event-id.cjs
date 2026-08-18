const { createHash } = require("node:crypto");

function identityPayload(event) {
  return {
    schema: event.schema,
    subject: {
      repository: event.subject.repository,
      pullRequest: event.subject.pullRequest ?? null,
      issue: event.subject.issue ?? null,
      headSha: event.subject.headSha,
      gateId: event.subject.gateId,
      artifactRefs: event.subject.artifactRefs ?? [],
      buildRefs: event.subject.buildRefs ?? [],
    },
    witness: {
      observedAt: event.witness.observedAt,
      observerRef: event.witness.observerRef,
      observation: event.witness.observation,
      disposition: event.witness.disposition,
    },
    evidenceRefs: event.evidenceRefs ?? [],
    provenance: {
      captureSurface: event.provenance.captureSurface,
    },
  };
}

function humanWitnessEventId(event) {
  const canonical = JSON.stringify(identityPayload(event));
  const digest = createHash("sha256").update(canonical, "utf8").digest("hex");
  return `hwv0_${digest}`;
}

module.exports = { humanWitnessEventId };
