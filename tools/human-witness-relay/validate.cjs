const { SCHEMA, DISPOSITIONS, ERRORS } = require("./constants.cjs");

const SHA40 = /^[a-f0-9]{40}$/;
const ISO_WITH_ZONE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/;
const FORBIDDEN_KEYS = new Set([
  "cookie",
  "cookies",
  "authorization",
  "authorizationheader",
  "bearertoken",
  "token",
  "password",
  "session",
  "sessionid",
  "browserstorage",
  "localstorage",
  "signedurl",
  "finalurl",
  "referrer",
]);

function clone(value) {
  return structuredClone(value);
}

function isSensitiveUrl(value) {
  if (typeof value !== "string" || !/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return url.search.length > 0 || url.hash.length > 0;
  } catch {
    return false;
  }
}

function findForbiddenMaterial(value, path = "$", findings = []) {
  if (isSensitiveUrl(value)) {
    findings.push({ path, key: "$value" });
    return findings;
  }
  if (!value || typeof value !== "object") return findings;

  if (Array.isArray(value)) {
    value.forEach((item, index) => findForbiddenMaterial(item, `${path}[${index}]`, findings));
    return findings;
  }

  for (const [key, child] of Object.entries(value)) {
    const childPath = path === "$" ? key : `${path}.${key}`;
    if (FORBIDDEN_KEYS.has(key.toLowerCase())) {
      findings.push({ path: childPath, key });
      continue;
    }
    if (isSensitiveUrl(child)) {
      findings.push({ path: childPath, key });
      continue;
    }
    findForbiddenMaterial(child, childPath, findings);
  }
  return findings;
}

function validateHumanWitnessEventV0(input) {
  const errors = [];

  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: [{ code: ERRORS.EVENT_INVALID, path: "$" }] };
  }

  const forbidden = findForbiddenMaterial(input);
  if (forbidden.length > 0) {
    return {
      ok: false,
      errors: forbidden.map(({ path }) => ({ code: ERRORS.FORBIDDEN_MATERIAL, path })),
    };
  }

  const event = clone(input);
  const subject = event.subject;
  const witness = event.witness;
  const provenance = event.provenance;

  if (event.schema !== SCHEMA) {
    errors.push({ code: ERRORS.EVENT_INVALID, path: "schema" });
  }

  if (!subject || typeof subject !== "object") {
    errors.push({ code: ERRORS.EVENT_INVALID, path: "subject" });
  } else {
    if (typeof subject.repository !== "string" || subject.repository.length === 0) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "subject.repository" });
    }
    if (typeof subject.headSha !== "string" || subject.headSha.length === 0) {
      errors.push({ code: ERRORS.IDENTITY_MISSING, path: "subject.headSha" });
    } else if (!SHA40.test(subject.headSha)) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "subject.headSha" });
    }
    if (typeof subject.gateId !== "string" || subject.gateId.length === 0) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "subject.gateId" });
    }
  }

  if (!witness || typeof witness !== "object") {
    errors.push({ code: ERRORS.EVENT_INVALID, path: "witness" });
  } else {
    if (typeof witness.observedAt !== "string" || !ISO_WITH_ZONE.test(witness.observedAt) || Number.isNaN(Date.parse(witness.observedAt))) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "witness.observedAt" });
    }
    if (typeof witness.observerRef !== "string" || witness.observerRef.length === 0) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "witness.observerRef" });
    }
    if (typeof witness.observation !== "string" || witness.observation.length === 0) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "witness.observation" });
    }
    if (!DISPOSITIONS.has(witness.disposition)) {
      errors.push({ code: ERRORS.DISPOSITION_INVALID, path: "witness.disposition" });
    }
  }

  if (!provenance || typeof provenance !== "object") {
    errors.push({ code: ERRORS.EVENT_INVALID, path: "provenance" });
  } else {
    if (typeof provenance.captureSurface !== "string" || provenance.captureSurface.length === 0) {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "provenance.captureSurface" });
    }
    if (provenance.relayPolicy !== "human-witness-relay-v0") {
      errors.push({ code: ERRORS.EVENT_INVALID, path: "provenance.relayPolicy" });
    }
  }

  if (!Array.isArray(event.evidenceRefs)) {
    errors.push({ code: ERRORS.EVENT_INVALID, path: "evidenceRefs" });
  }

  if (errors.length > 0) return { ok: false, errors };
  return { ok: true, event };
}

module.exports = { findForbiddenMaterial, validateHumanWitnessEventV0 };
