const PROJECT0_RESPONSE_SCHEMA = "project0/world-encounter-stdio-response/v0.1";
const ENCOUNTER_REF_PATTERN = /^enc-[0-9a-f]{64}$/;

function bindingReceipt(expectedRef, verification) {
  const response = verification?.response;
  const bound =
    typeof expectedRef === "string" &&
    ENCOUNTER_REF_PATTERN.test(expectedRef) &&
    verification?.exitCode === 0 &&
    response?.schema === PROJECT0_RESPONSE_SCHEMA &&
    response?.ok === true &&
    response?.operation === "verify" &&
    response?.record?.ref === expectedRef;

  if (bound) {
    return {
      status: "bound",
      reasonCode: "PROJECT0_ENCOUNTER_BINDING_VERIFIED",
      encounterRef: expectedRef,
      evidenceRefs: [expectedRef],
      authorityTransfer: "none",
    };
  }

  return {
    status: "refused",
    reasonCode: "PROJECT0_ENCOUNTER_BINDING_UNVERIFIED",
    encounterRef: typeof expectedRef === "string" ? expectedRef : null,
    project0ReasonCode:
      response?.ok === false && typeof response?.error?.code === "string"
        ? response.error.code
        : "PROJECT0_VERIFICATION_NOT_PROVEN",
    evidenceRefs: [],
    authorityTransfer: "none",
  };
}

function guardCorpusAdmission({ expectedRef, verification, admit }) {
  if (typeof admit !== "function") {
    throw new TypeError("FB_CORPUS_ADMITTER_REQUIRED");
  }

  const binding = bindingReceipt(expectedRef, verification);
  if (binding.status !== "bound") {
    return {
      invoked: false,
      binding,
      admission: null,
    };
  }

  return {
    invoked: true,
    binding,
    admission: admit(),
  };
}

module.exports = {
  PROJECT0_RESPONSE_SCHEMA,
  bindingReceipt,
  guardCorpusAdmission,
};
