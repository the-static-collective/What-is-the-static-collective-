const test = require("node:test");
const assert = require("node:assert/strict");
const {
  collectProjectionComparisons,
  ghGetJson,
} = require("../tools/awareness/github.cjs");

function fakeClient(table, calls = []) {
  return (path) => {
    calls.push(path);
    if (!(path in table)) throw Object.assign(new Error("missing fixture"), { code: "fixture-miss" });
    const value = table[path];
    if (value instanceof Error) throw value;
    return value;
  };
}

function scope() {
  return {
    schema: "static-collective/awareness-scope/v0",
    id: "fixture",
    projections: [{
      id: "project0",
      kind: "project-status-v1",
      repository: "the-static-collective/project0",
      sourceScope: "main",
      statusPath: "PROJECT_STATUS.json",
    }],
  };
}

function table({ witnessed = "a".repeat(40), head = "b".repeat(40), statusOverrides = {} } = {}) {
  return {
    "/repos/the-static-collective/project0": { default_branch: "main" },
    "/repos/the-static-collective/project0/commits/main": { sha: head },
    "/repos/the-static-collective/project0/contents/PROJECT_STATUS.json?ref=main": {
      content: Buffer.from(JSON.stringify({
        schema: "static-collective.project-status.v1",
        repository: "the-static-collective/project0",
        defaultBranch: "main",
        observedMainCommit: witnessed,
        ...statusOverrides,
      })).toString("base64"),
      encoding: "base64",
    },
  };
}

test("project status compares observedMainCommit to exact default branch head", () => {
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(table()),
  });
  assert.equal(result.projections[0].disposition, "stale");
  assert.equal(result.repositories[0].headSha, "b".repeat(40));
});

test("matching project status head is fresh", () => {
  const same = "c".repeat(40);
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(table({ witnessed: same, head: same })),
  });
  assert.equal(result.projections[0].disposition, "fresh");
});

test("failed commit lookup becomes unverified and fog without aborting", () => {
  const fixtures = table();
  fixtures["/repos/the-static-collective/project0/commits/main"] = Object.assign(new Error("boom secret"), { code: "fixture-read-failed" });
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(fixtures),
  });
  assert.equal(result.projections[0].disposition, "unverified");
  assert.equal(result.fog.length, 1);
  assert.equal(result.fog[0].note, "current comparison unavailable");
  assert.doesNotMatch(JSON.stringify(result), /boom secret/);
});

test("malformed project status becomes unverified with status fog", () => {
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(table({ statusOverrides: { repository: "the-static-collective/not-project0" } })),
  });
  assert.equal(result.projections[0].disposition, "unverified");
  assert.equal(result.fog[0].code, "AWARENESS_PROJECT_STATUS_INVALID");
});

test("malformed observedMainCommit becomes unverified instead of throwing", () => {
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(table({ witnessed: "ABC123" })),
  });
  assert.equal(result.projections[0].disposition, "unverified");
  assert.equal(result.fog[0].code, "AWARENESS_PROJECT_STATUS_INVALID");
});

test("unrelated branch is never queried", () => {
  const calls = [];
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient({
      ...table({ witnessed: "d".repeat(40), head: "d".repeat(40) }),
      "/repos/the-static-collective/project0/commits/unrelated": { sha: "f".repeat(40) },
    }, calls),
  });
  assert.equal(result.projections[0].disposition, "fresh");
  assert.equal(calls.some((call) => call.includes("unrelated")), false);
  assert.deepEqual(calls, [
    "/repos/the-static-collective/project0",
    "/repos/the-static-collective/project0/commits/main",
    "/repos/the-static-collective/project0/contents/PROJECT_STATUS.json?ref=main",
  ]);
});

test("ghGetJson invokes gh api without mutation flags", () => {
  let seen = null;
  const result = ghGetJson("/repos/the-static-collective/project0", {
    spawn(command, args, options) {
      seen = { command, args, options };
      return { status: 0, stdout: '{"ok":true}', stderr: "" };
    },
  });
  assert.deepEqual(result, { ok: true });
  assert.equal(seen.command, "gh");
  assert.deepEqual(seen.args, ["api", "/repos/the-static-collective/project0"]);
  assert.equal(seen.args.some((arg) => ["-X", "--method", "-f", "-F", "POST", "PATCH", "PUT", "DELETE"].includes(arg)), false);
});

test("ghGetJson failure exposes endpoint and status but not stderr", () => {
  assert.throws(
    () => ghGetJson("/repos/x/y", {
      spawn() { return { status: 1, stdout: "", stderr: "token=super-secret" }; },
    }),
    (error) => error.code === "AWARENESS_GITHUB_READ_FAILED" && error.endpoint === "/repos/x/y" && error.status === 1 && !JSON.stringify(error).includes("super-secret"),
  );
});

test("status read failure preserves already-witnessed repository head", () => {
  const fixtures = table({ head: "e".repeat(40) });
  fixtures["/repos/the-static-collective/project0/contents/PROJECT_STATUS.json?ref=main"] = Object.assign(new Error("status unavailable"), { code: "fixture-read-failed" });
  const result = collectProjectionComparisons(scope(), {
    checkedAt: "2026-08-20T22:45:00Z",
    requestJson: fakeClient(fixtures),
  });
  assert.deepEqual(result.repositories, [{
    repository: "the-static-collective/project0",
    defaultBranch: "main",
    headSha: "e".repeat(40),
  }]);
  assert.equal(result.projections[0].disposition, "unverified");
  assert.equal(result.fog.length, 1);
});
