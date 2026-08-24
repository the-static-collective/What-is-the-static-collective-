const assert = require("node:assert/strict");
const test = require("node:test");

const {
  guardCorpusAdmission,
} = require("../tools/full-bowl-001/encounter-binding-guard.cjs");

test("detached encounter refs are refused before Corpus admission", () => {
  let corpusCalls = 0;
  const result = guardCorpusAdmission({
    expectedRef: `enc-${"f".repeat(64)}`,
    verification: {
      exitCode: 1,
      response: {
        schema: "project0/world-encounter-stdio-response/v0.1",
        ok: false,
        error: { code: "ENCOUNTER_REF_MISMATCH" },
      },
    },
    admit: () => {
      corpusCalls += 1;
      return { result: { status: "admitted" } };
    },
  });

  assert.equal(corpusCalls, 0);
  assert.equal(result.invoked, false);
  assert.equal(result.binding.status, "refused");
  assert.equal(
    result.binding.reasonCode,
    "PROJECT0_ENCOUNTER_BINDING_UNVERIFIED",
  );
  assert.equal(result.binding.authorityTransfer, "none");
});

test("an exact Project0 verification permits one Corpus invocation", () => {
  const expectedRef = `enc-${"a".repeat(64)}`;
  let corpusCalls = 0;
  const result = guardCorpusAdmission({
    expectedRef,
    verification: {
      exitCode: 0,
      response: {
        schema: "project0/world-encounter-stdio-response/v0.1",
        ok: true,
        operation: "verify",
        record: { ref: expectedRef },
      },
    },
    admit: () => {
      corpusCalls += 1;
      return { result: { status: "admitted", authorityTransfer: "none" } };
    },
  });

  assert.equal(corpusCalls, 1);
  assert.equal(result.invoked, true);
  assert.equal(result.binding.status, "bound");
  assert.equal(
    result.binding.reasonCode,
    "PROJECT0_ENCOUNTER_BINDING_VERIFIED",
  );
  assert.equal(result.binding.authorityTransfer, "none");
  assert.equal(result.admission.result.status, "admitted");
});
