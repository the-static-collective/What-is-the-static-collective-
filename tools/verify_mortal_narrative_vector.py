#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path

EXPECTED_BEATS = {
    "E1": "reroute_required",
    "E2": "narrative_admissible",
    "E3": "narrative_admissible",
    "E4": "reroute_required",
    "E5": "narrative_admissible",
    "E6": "narrative_unresolved",
    "E7": "narrative_unresolved",
    "E8": "narrative_admissible",
}
EXPECTED_RENDERS = {"R1": "fail", "R2": "pass", "R3": "fail", "R4": "fail"}
ALLOWED_RUNS = {"MA-A-A0", "MA-R-R0", "MA-N-N0", "MA-A-A1"}
ALLOWED_CLAIMS = {"Q1", "Q2", "Q3", "Q4", "Q5"}


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _index(items: object, field: str, errors: list[str], duplicate_code: str) -> dict[str, dict]:
    result: dict[str, dict] = {}
    if not isinstance(items, list):
        return result
    for item in items:
        if not isinstance(item, dict) or not isinstance(item.get(field), str):
            continue
        key = item[field]
        if key in result:
            errors.append(duplicate_code)
        result[key] = item
    return result


def verify_vector(root: Path) -> list[str]:
    errors: list[str] = []
    try:
        manifest = _load(root / "manifest.json")
    except Exception:
        return ["MANIFEST_UNREADABLE"]
    if manifest.get("schema") != "mortal_narrative.vector/v0": errors.append("MANIFEST_SCHEMA_INVALID")
    if manifest.get("vector_id") != "THE-PERFECT-SCENE-THAT-CHEATS-001": errors.append("VECTOR_ID_INVALID")
    if manifest.get("actor_vector_ref") != "../mortal-actor-001": errors.append("ACTOR_VECTOR_REF_INVALID")
    oracle_ref = manifest.get("oracle_ref")
    if not isinstance(oracle_ref, str) or not oracle_ref.startswith("oracle/") or oracle_ref.startswith("case/"):
        errors.append("ORACLE_SEPARATION_INVALID")
    try:
        beat_doc = _load(root / manifest["beat_templates_ref"])
        formation_doc = _load(root / manifest["formation_templates_ref"])
        render_doc = _load(root / manifest["render_templates_ref"])
        oracle = _load(root / manifest["oracle_ref"])
    except Exception:
        return list(dict.fromkeys(errors + ["VECTOR_DOCUMENT_UNREADABLE"]))
    if beat_doc.get("schema") != "mortal_narrative.beat-templates/v0": errors.append("BEAT_SCHEMA_INVALID")
    if formation_doc.get("schema") != "mortal_narrative.formation-templates/v0": errors.append("FORMATION_SCHEMA_INVALID")
    if render_doc.get("schema") != "mortal_narrative.render-templates/v0": errors.append("RENDER_SCHEMA_INVALID")
    beats = _index(beat_doc.get("beats"), "beat_id", errors, "DUPLICATE_BEAT_ID")
    formations = _index(formation_doc.get("formations"), "formation_id", errors, "DUPLICATE_FORMATION_ID")
    renders = _index(render_doc.get("renders"), "render_id", errors, "DUPLICATE_RENDER_ID")
    if set(beats) != set(EXPECTED_BEATS): errors.append("BEAT_SET_INVALID")
    if set(renders) != set(EXPECTED_RENDERS): errors.append("RENDER_SET_INVALID")
    for beat in beats.values():
        if beat.get("run_id") not in ALLOWED_RUNS: errors.append("BEAT_RUN_INVALID")
        for use in beat.get("epistemic_uses", []):
            if not isinstance(use, dict) or use.get("claim_id") not in ALLOWED_CLAIMS: errors.append("BEAT_CLAIM_INVALID")
    e1, e2 = beats.get("E1", {}), beats.get("E2", {})
    if e2.get("parent_beat_id") != "E1": errors.append("E2_ANCESTRY_INVALID")
    if e1.get("proposed_action") != "open-north-door" or e2.get("proposed_action") != e1.get("proposed_action"):
        errors.append("SAME_ACTION_CONTROL_INVALID")
    if e2.get("epistemic_uses") != [] or not e2.get("non_epistemic_drivers"):
        errors.append("E2_WAGER_CONTROL_INVALID")
    e3 = beats.get("E3", {})
    if e3.get("run_id") != "MA-A-A1": errors.append("E3_LATER_CUT_INVALID")
    e5 = beats.get("E5", {})
    uses = e5.get("epistemic_uses") if isinstance(e5.get("epistemic_uses"), list) else []
    if e5.get("run_id") != "MA-N-N0" or not uses or uses[0].get("formation_receipt_id") != "BELIEF-N-Q2":
        errors.append("E5_FORMATION_BINDING_INVALID")
    belief = formations.get("BELIEF-N-Q2", {})
    if belief.get("run_id") != "MA-N-N0" or belief.get("claim_id") != "Q2" or belief.get("mode") != "BELIEVE":
        errors.append("BELIEF_N_Q2_BINDING_INVALID")
    if belief.get("formation_refs") != ["decoder:decode-lamp-N", "stance:stance-lamp-N"]:
        errors.append("BELIEF_N_Q2_REFS_INVALID")
    controls = {
        "R1": ("E8", "character", "KNOW", "character-action-basis"),
        "R2": ("E2", "reader", "KNOW", "exposition"),
        "R3": ("E2", "reader", "KNOW", "character-action-basis"),
        "R4": ("E2", "narrator", "KNOW", "character-action-basis"),
    }
    for rid, expected in controls.items():
        render = renders.get(rid, {})
        assertions = render.get("assertions") if isinstance(render.get("assertions"), list) else []
        if not assertions:
            errors.append("RENDER_CONTROL_INVALID")
            continue
        assertion = assertions[0]
        actual = (render.get("beat_id"), assertion.get("scope"), assertion.get("rendered_mode"), assertion.get("causal_role"))
        if actual != expected: errors.append(f"{rid}_CONTROL_INVALID")
    if oracle.get("vector_id") != manifest.get("vector_id"): errors.append("ORACLE_VECTOR_MISMATCH")
    if oracle.get("expected_beats") != EXPECTED_BEATS: errors.append("ORACLE_BEATS_INVALID")
    if oracle.get("expected_renders") != EXPECTED_RENDERS: errors.append("ORACLE_RENDERS_INVALID")
    return list(dict.fromkeys(errors))


def main() -> int:
    if len(sys.argv) != 2:
        print("usage: verify_mortal_narrative_vector.py VECTOR_ROOT", file=sys.stderr)
        return 2
    errors = verify_vector(Path(sys.argv[1]))
    if errors:
        for error in errors: print(error, file=sys.stderr)
        return 1
    print("MORTAL-NARRATIVE-001 vector: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
