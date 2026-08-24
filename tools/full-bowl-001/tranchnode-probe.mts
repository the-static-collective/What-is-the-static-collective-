import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const fixturePath = process.argv[2];
const tranchNodeDir = process.argv[3];
if (fixturePath === undefined || tranchNodeDir === undefined) {
  process.stderr.write(`${JSON.stringify({ ok: false, code: "FB_TRANCH_PROBE_ARGUMENT_MISSING" })}\n`);
  process.exit(2);
}

const fixture = JSON.parse(readFileSync(resolve(fixturePath), "utf8"));
const moduleUrl = pathToFileURL(
  resolve(tranchNodeDir, "src/continuity-boundary-witness.ts"),
).href;
const { deriveContinuityBoundaryWitness } = await import(moduleUrl);

const addressed = deriveContinuityBoundaryWitness({
  spine: fixture.continuitySpine,
  fromStageId: "before-encounter",
  toStageId: "after-return",
  suppliedWitnesses: ["receipt:full-bowl-001:completed-attempt"],
  unresolvedRefs: ["maddcl0wn:uncategorized-object"],
});

process.stdout.write(`${JSON.stringify({ ok: true, addressed })}\n`);
