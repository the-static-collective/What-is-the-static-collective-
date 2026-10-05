const { spawnSync } = require("node:child_process");
const { ERRORS } = require("./constants.cjs");
const { validateAwarenessScope } = require("./scope.cjs");
const { compareProjectionFreshness } = require("./freshness.cjs");

const SHA_RE = /^[a-f0-9]{40}$/;
const PROJECT_STATUS_SCHEMA = "static-collective.project-status.v1";

function githubReadError(apiPath, status) {
  const error = new Error(`GitHub read failed for ${apiPath}`);
  error.code = ERRORS.GITHUB_READ_FAILED;
  error.endpoint = apiPath;
  error.status = Number.isInteger(status) ? status : null;
  return error;
}

function ghGetJson(apiPath, options = {}) {
  if (typeof apiPath !== "string" || !apiPath.startsWith("/")) {
    throw githubReadError(String(apiPath), null);
  }
  const spawn = options.spawn ?? spawnSync;
  const result = spawn("gh", ["api", apiPath], { encoding: "utf8" });
  if (!result || result.status !== 0) {
    throw githubReadError(apiPath, result?.status);
  }
  try {
    return JSON.parse(result.stdout);
  } catch {
    throw githubReadError(apiPath, result.status);
  }
}

function decodeStatusPayload(payload) {
  if (!payload || payload.encoding !== "base64" || typeof payload.content !== "string") return null;
  try {
    return JSON.parse(Buffer.from(payload.content.replace(/\s/g, ""), "base64").toString("utf8"));
  } catch {
    return null;
  }
}

function validProjectStatus(status, entry, defaultBranch) {
  return Boolean(
    status &&
    status.schema === PROJECT_STATUS_SCHEMA &&
    status.repository === entry.repository &&
    status.defaultBranch === defaultBranch &&
    entry.sourceScope === defaultBranch &&
    SHA_RE.test(status.observedMainCommit ?? ""),
  );
}

function readProjectStatusProjection(entry, client = ghGetJson) {
  const repoPath = `/repos/${entry.repository}`;
  const repo = client(repoPath);
  const defaultBranch = repo?.default_branch;
  if (typeof defaultBranch !== "string" || !defaultBranch) {
    throw githubReadError(repoPath, null);
  }
  const commitPath = `/repos/${entry.repository}/commits/${encodeURIComponent(defaultBranch)}`;
  const commit = client(commitPath);
  const headSha = SHA_RE.test(commit?.sha ?? "") ? commit.sha : null;
  if (!headSha) throw githubReadError(commitPath, null);
  const statusPath = `/repos/${entry.repository}/contents/${entry.statusPath}?ref=${encodeURIComponent(defaultBranch)}`;
  let statusPayload;
  try {
    statusPayload = client(statusPath);
  } catch (error) {
    error.awarenessPartial = { defaultBranch, headSha };
    throw error;
  }
  const status = decodeStatusPayload(statusPayload);
  return { defaultBranch, headSha, status, statusValid: validProjectStatus(status, entry, defaultBranch) };
}

function unverifiedProjection(entry, checkedAt, { witnessedSourceCut = null, comparedSourceCut = null, evidenceRefs = [] } = {}) {
  return compareProjectionFreshness({
    projectionId: entry.id,
    canonicalSource: entry.repository,
    sourceScope: entry.sourceScope,
    witnessedSourceCut,
    comparedSourceCut,
    checkedAt,
    comparisonOk: false,
    evidenceRefs,
  });
}

function collectProjectionComparisons(scopeInput, { requestJson = ghGetJson, checkedAt } = {}) {
  const validation = validateAwarenessScope(scopeInput);
  if (!validation.ok) {
    const error = new Error("Awareness scope is invalid");
    error.code = ERRORS.SCOPE_INVALID;
    error.errors = validation.errors;
    throw error;
  }

  const repositories = [];
  const projections = [];
  const fog = [];

  for (const entry of validation.scope.projections) {
    const evidenceRefs = [entry.statusPath, "github:default-branch-head"];
    try {
      const read = readProjectStatusProjection(entry, requestJson);
      repositories.push({
        repository: entry.repository,
        defaultBranch: read.defaultBranch,
        headSha: read.headSha,
      });
      if (!read.statusValid) {
        projections.push(unverifiedProjection(entry, checkedAt, {
          witnessedSourceCut: read.status?.observedMainCommit ?? null,
          comparedSourceCut: read.headSha,
          evidenceRefs,
        }));
        fog.push({
          source: `${entry.repository}#${entry.sourceScope}`,
          code: ERRORS.STATUS_INVALID,
          note: "project status witness malformed or scope-mismatched",
        });
        continue;
      }
      projections.push(compareProjectionFreshness({
        projectionId: entry.id,
        canonicalSource: entry.repository,
        sourceScope: entry.sourceScope,
        witnessedSourceCut: read.status.observedMainCommit,
        comparedSourceCut: read.headSha,
        checkedAt,
        comparisonOk: true,
        evidenceRefs,
      }));
    } catch (error) {
      if (error?.awarenessPartial?.defaultBranch && error?.awarenessPartial?.headSha) {
        repositories.push({
          repository: entry.repository,
          defaultBranch: error.awarenessPartial.defaultBranch,
          headSha: error.awarenessPartial.headSha,
        });
      }
      projections.push(unverifiedProjection(entry, checkedAt, {
        comparedSourceCut: error?.awarenessPartial?.headSha ?? null,
        evidenceRefs,
      }));
      fog.push({
        source: `${entry.repository}#${entry.sourceScope}`,
        code: error?.code === ERRORS.STATUS_INVALID ? ERRORS.STATUS_INVALID : ERRORS.GITHUB_READ_FAILED,
        note: "current comparison unavailable",
      });
    }
  }

  return { repositories, projections, fog };
}

module.exports = {
  ghGetJson,
  readProjectStatusProjection,
  collectProjectionComparisons,
};
