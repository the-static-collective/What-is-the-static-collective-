#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import importlib.util
import json
from pathlib import Path

from adapters.novelist import check_render_receipt, evaluate_beat_proposal, validate_formation_receipt


def _load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _sha256_json(value: object) -> str:
    encoded = json.dumps(
        value,
        ensure_ascii=False,
        allow_nan=False,
        separators=(",", ":"),
        sort_keys=True,
    ).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()


def _gate_d_run_case():
    path = Path(__file__).with_name("run_mortal_actor_blind_proof.py")
    spec = importlib.util.spec_from_file_location("gate_d_blind", path)
    if spec is None or spec.loader is None:
        raise RuntimeError("GATE_D_RUNNER_LOAD_FAILED")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module.run_case


def materialize_beat(template: dict, actor_run: dict) -> dict:
    binding = actor_run["loadout_binding"]
    projection = actor_run["projection_handoff"]
    return {
        "schema": "mortal_narrative.beat-proposal/v0",
        "beat_id": template["beat_id"],
        "parent_beat_id": template.get("parent_beat_id"),
        "actor_id": actor_run["actor_id"],
        "cut_id": actor_run["cut_id"],
        "projection_digest": projection["projection_digest"],
        "evaluation_compile_id": binding["evaluation_compile_id"],
        "evaluation_compile_digest": binding["evaluation_compile_digest"],
        "dramatic_destination": template["dramatic_destination"],
        "epistemic_uses": template["epistemic_uses"],
        "non_epistemic_drivers": template["non_epistemic_drivers"],
        "proposed_action": template["proposed_action"],
        "proposed_consequence": template.get("proposed_consequence"),
    }


def materialize_formation(template: dict, actor_run: dict) -> dict:
    binding = actor_run["loadout_binding"]
    projection = actor_run["projection_handoff"]
    return {
        "schema": "mortal_narrative.formation/v0",
        "formation_id": template["formation_id"],
        "actor_id": actor_run["actor_id"],
        "cut_id": actor_run["cut_id"],
        "projection_digest": projection["projection_digest"],
        "evaluation_compile_id": binding["evaluation_compile_id"],
        "evaluation_compile_digest": binding["evaluation_compile_digest"],
        "claim_id": template["claim_id"],
        "mode": template["mode"],
        "formation_refs": template["formation_refs"],
    }


def materialize_render(template: dict, proposal: dict) -> dict:
    return {
        "schema": "mortal_narrative.render/v0",
        "render_id": template["render_id"],
        "beat_id": proposal["beat_id"],
        "actor_id": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "assertions": template["assertions"],
    }


def run_case(
    *,
    narrative_vector_root: Path,
    actor_vector_root: Path,
    three_rdi_root: Path,
    loadout_root: Path,
    alex_root: Path,
) -> dict:
    """Execute Gate E without opening either private oracle."""

    actor_case = _gate_d_run_case()(
        actor_vector_root,
        three_rdi_root,
        loadout_root,
        alex_root,
    )
    manifest = _load_json(narrative_vector_root / "manifest.json")
    beats_doc = _load_json(narrative_vector_root / manifest["beat_templates_ref"])
    formations_doc = _load_json(narrative_vector_root / manifest["formation_templates_ref"])
    renders_doc = _load_json(narrative_vector_root / manifest["render_templates_ref"])

    formations: dict[str, dict] = {}
    for template in formations_doc["formations"]:
        actor_run = actor_case["runs"][template["run_id"]]
        receipt = materialize_formation(template, actor_run)
        errors = validate_formation_receipt(
            receipt,
            projection_handoff=actor_run["projection_handoff"],
            loadout_binding=actor_run["loadout_binding"],
        )
        if errors:
            raise RuntimeError("FORMATION_TEMPLATE_INVALID:" + ",".join(errors))
        formations[receipt["formation_id"]] = receipt

    beats: dict[str, dict] = {}
    for template in beats_doc["beats"]:
        actor_run = actor_case["runs"][template["run_id"]]
        proposal = materialize_beat(template, actor_run)
        evaluation = evaluate_beat_proposal(
            proposal,
            projection_handoff=actor_run["projection_handoff"],
            loadout_binding=actor_run["loadout_binding"],
            alex_results=actor_run["alex_results"],
            formation_receipts=formations,
        )
        beats[proposal["beat_id"]] = {
            "proposal": proposal,
            "evaluation": evaluation,
        }

    render_checks: dict[str, dict] = {}
    materialized_renders: dict[str, dict] = {}
    for template in renders_doc["renders"]:
        beat = beats[template["beat_id"]]
        render = materialize_render(template, beat["proposal"])
        materialized_renders[render["render_id"]] = render
        render_checks[render["render_id"]] = check_render_receipt(
            beat["proposal"],
            beat["evaluation"],
            render,
        )

    receipt = {
        "schema": "mortal_narrative.blind-case-receipt/v0",
        "vector_id": manifest["vector_id"],
        "actor_case": actor_case,
        "formations": formations,
        "beats": beats,
        "renders": materialized_renders,
        "render_checks": render_checks,
    }
    receipt["case_receipt_digest"] = _sha256_json(receipt)
    return receipt


def score_case(
    *,
    narrative_vector_root: Path,
    actor_vector_root: Path,
    case_receipt: dict,
) -> dict:
    """Open both sealed oracles only after the Gate-E CASE receipt exists."""

    narrative_manifest = _load_json(narrative_vector_root / "manifest.json")
    actor_manifest = _load_json(actor_vector_root / "manifest.json")
    narrative_oracle = _load_json(narrative_vector_root / narrative_manifest["oracle_ref"])
    actor_oracle = _load_json(actor_vector_root / actor_manifest["oracle_ref"])

    mismatches: list[dict] = []
    for beat_id, expected in narrative_oracle["expected_beats"].items():
        actual = case_receipt.get("beats", {}).get(beat_id, {}).get("evaluation", {}).get("disposition")
        if actual != expected:
            mismatches.append({
                "kind": "beat",
                "id": beat_id,
                "expected": expected,
                "actual": actual,
            })
    for render_id, expected in narrative_oracle["expected_renders"].items():
        actual = case_receipt.get("render_checks", {}).get(render_id, {}).get("status")
        if actual != expected:
            mismatches.append({
                "kind": "render",
                "id": render_id,
                "expected": expected,
                "actual": actual,
            })

    beats = case_receipt.get("beats", {})
    e1 = beats.get("E1", {})
    e2 = beats.get("E2", {})
    e3 = beats.get("E3", {})
    e5 = beats.get("E5", {})
    e1_eval = e1.get("evaluation", {})
    e2_eval = e2.get("evaluation", {})
    e3_eval = e3.get("evaluation", {})
    e5_eval = e5.get("evaluation", {})
    e1_proposal = e1.get("proposal", {})
    e2_proposal = e2.get("proposal", {})
    e3_proposal = e3.get("proposal", {})

    same_action = (
        e1_eval.get("disposition") == "reroute_required"
        and e2_eval.get("disposition") == "narrative_admissible"
        and e2_proposal.get("parent_beat_id") == "E1"
        and e1_proposal.get("proposed_action") == e2_proposal.get("proposed_action")
        and e1_proposal.get("proposed_action") == "open-north-door"
    )
    later_cut = (
        e1_eval.get("disposition") == "reroute_required"
        and e3_eval.get("disposition") == "narrative_admissible"
        and e1_proposal.get("cut_id") == "A0"
        and e3_proposal.get("cut_id") == "A1"
        and e1_proposal.get("beat_id") == "E1"
        and e3_proposal.get("beat_id") == "E3"
    )
    false_belief = (
        actor_oracle.get("global_truth", {}).get("Q2") is False
        and e5_eval.get("disposition") == "narrative_admissible"
    )
    render_checks = case_receipt.get("render_checks", {})
    reader_irony = (
        render_checks.get("R2", {}).get("status") == "pass"
        and render_checks.get("R3", {}).get("status") == "fail"
    )
    narrator_boundary = render_checks.get("R4", {}).get("status") == "fail"
    render_mode = render_checks.get("R1", {}).get("status") == "fail"

    actor_runs = case_receipt.get("actor_case", {}).get("runs", {})
    bindings = [
        run.get("loadout_binding", {})
        for run in actor_runs.values()
        if isinstance(run, dict)
    ]
    no_authority = bool(bindings) and all(
        item.get("authority_expanded") is False for item in bindings
    )
    no_side_effects = bool(bindings) and all(
        item.get("side_effect_executed") is False for item in bindings
    )

    controls = [
        same_action,
        later_cut,
        false_belief,
        reader_irony,
        narrator_boundary,
        render_mode,
        no_authority,
        no_side_effects,
    ]
    return {
        "schema": "mortal_narrative.blind-score/v0",
        "vector_id": narrative_manifest["vector_id"],
        "case_receipt_digest": case_receipt.get("case_receipt_digest"),
        "status": "pass" if not mismatches and all(controls) else "fail",
        "mismatches": mismatches,
        "same_action_different_basis_control": same_action,
        "later_cut_without_rewrite_control": later_cut,
        "local_false_belief_control": false_belief,
        "reader_irony_control": reader_irony,
        "narrator_boundary_control": narrator_boundary,
        "render_mode_control": render_mode,
        "no_authority_expansion": no_authority,
        "no_side_effects": no_side_effects,
        "beat_evaluation_count": len(case_receipt.get("beats", {})),
        "render_check_count": len(case_receipt.get("render_checks", {})),
    }


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run or score the MORTAL-NARRATIVE-001 blind proof")
    sub = parser.add_subparsers(dest="command", required=True)

    case = sub.add_parser("case", help="run Gate E without opening either oracle")
    case.add_argument("--narrative-vector", type=Path, required=True)
    case.add_argument("--actor-vector", type=Path, required=True)
    case.add_argument("--three-rdi-root", type=Path, required=True)
    case.add_argument("--loadout-root", type=Path, required=True)
    case.add_argument("--alex-root", type=Path, required=True)

    score = sub.add_parser("score", help="score a completed Gate-E CASE receipt")
    score.add_argument("--narrative-vector", type=Path, required=True)
    score.add_argument("--actor-vector", type=Path, required=True)
    score.add_argument("--case-receipt", type=Path, required=True)
    return parser


def main() -> int:
    args = _parser().parse_args()
    if args.command == "case":
        result = run_case(
            narrative_vector_root=args.narrative_vector,
            actor_vector_root=args.actor_vector,
            three_rdi_root=args.three_rdi_root,
            loadout_root=args.loadout_root,
            alex_root=args.alex_root,
        )
    else:
        result = score_case(
            narrative_vector_root=args.narrative_vector,
            actor_vector_root=args.actor_vector,
            case_receipt=_load_json(args.case_receipt),
        )
    print(json.dumps(result, ensure_ascii=False, sort_keys=True))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
