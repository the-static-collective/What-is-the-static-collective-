const { SCOPE_SCHEMA, ERRORS } = require("./constants.cjs");

const REPOSITORY_RE = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

function error(path) {
  return { code: ERRORS.SCOPE_INVALID, path };
}

function validateAwarenessScope(input) {
  const errors = [];
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: [error("")] };
  }
  if (input.schema !== SCOPE_SCHEMA) errors.push(error("schema"));
  if (typeof input.id !== "string" || !input.id.trim()) errors.push(error("id"));
  if (!Array.isArray(input.projections) || input.projections.length === 0) {
    errors.push(error("projections"));
  }

  const seen = new Set();
  const projections = [];
  for (const [index, entry] of (Array.isArray(input.projections) ? input.projections : []).entries()) {
    const path = `projections[${index}]`;
    if (!entry || typeof entry !== "object" || Array.isArray(entry)) {
      errors.push(error(path));
      continue;
    }
    if (typeof entry.id !== "string" || !entry.id.trim()) errors.push(error(`${path}.id`));
    else if (seen.has(entry.id)) errors.push(error(`${path}.id`));
    else seen.add(entry.id);
    if (entry.kind !== "project-status-v1") errors.push(error(`${path}.kind`));
    if (typeof entry.repository !== "string" || !REPOSITORY_RE.test(entry.repository)) errors.push(error(`${path}.repository`));
    if (typeof entry.sourceScope !== "string" || !entry.sourceScope.trim()) errors.push(error(`${path}.sourceScope`));
    if (typeof entry.statusPath !== "string" || !entry.statusPath.trim()) errors.push(error(`${path}.statusPath`));
    projections.push({
      id: entry.id,
      kind: entry.kind,
      repository: entry.repository,
      sourceScope: entry.sourceScope,
      statusPath: entry.statusPath,
    });
  }

  if (errors.length) return { ok: false, errors };
  return {
    ok: true,
    scope: {
      schema: SCOPE_SCHEMA,
      id: input.id,
      projections,
    },
  };
}

module.exports = { validateAwarenessScope };
