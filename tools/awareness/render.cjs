const { canonicalJson } = require("./canonical.cjs");

function code(value) {
  return `\`${String(value).replaceAll("`", "\\`")}\``;
}

function renderList(items, renderItem) {
  if (!items.length) return "- none observed at this cut";
  return items.map((item) => `- ${renderItem(item)}`).join("\n");
}

function renderWorldCutMarkdown(worldCut) {
  const observer = `${worldCut.observer.kind}:${worldCut.observer.name}`;
  const lines = [
    "# Ecosystem World Cut",
    "",
    `World Cut ID: ${code(worldCut.worldCutId)}`,
    `Observed at: ${code(worldCut.observedAt)}`,
    `Observer: ${code(observer)}`,
    `Scope: ${code(worldCut.scope.id)}`,
    `Non-authority: ${worldCut.nonAuthority}`,
    "",
    "## Repository heads",
    "",
    renderList(worldCut.repositories, (entry) => `${code(entry.repository)} ${code(entry.defaultBranch ?? "unknown")} → ${code(entry.headSha ?? "unverified")}`),
    "",
    "## Projection freshness",
    "",
    renderList(worldCut.projections, (entry) => `${code(entry.projectionId)} — **${entry.disposition}** — witnessed ${code(entry.witnessedSourceCut ?? "unverified")} / compared ${code(entry.comparedSourceCut ?? "unverified")}`),
    "",
    "## Human-held gates",
    "",
    renderList(worldCut.humanGates, (entry) => `${code(entry.gateId)} — ${code(entry.subject)} — **${entry.disposition}** — project disposition ${code(entry.projectDisposition)}`),
    "",
    "## Other observations",
    "",
    renderList(worldCut.observations, (entry) => typeof entry === "string" ? entry : code(canonicalJson(entry))),
    "",
    "## Fog",
    "",
    renderList(worldCut.fog, (entry) => `${code(entry.source ?? "unknown")} — ${code(entry.code ?? "fog")} — ${entry.note ?? "unresolved"}`),
    "",
    "## Integrity",
    "",
    `Body SHA-256: ${code(worldCut.integrity.bodySha256)}`,
    "",
  ];
  return `${lines.join("\n")}\n`;
}

module.exports = { renderWorldCutMarkdown };
