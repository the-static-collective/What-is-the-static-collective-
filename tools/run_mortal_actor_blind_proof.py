#!/usr/bin/env python3
from __future__ import annotations

import argparse
import hashlib
import importlib
import json
import sys
from pathlib import Path
from types import SimpleNamespace


def _load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _sha256_json(value: object) -> str:
    encoded = json.dumps(value, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")
    return "sha256:" + hashlib.sha256(encoded).hexdigest()


def _load_adapters(three_rdi_root: Path, loadout_root: Path, alex_root: Path) -> SimpleNamespace:
    loadout_path = str(loadout_root.resolve())
    sys.path.insert(0, loadout_path)
    try:
        loadout_module = importlib.import_module("skills.loadout.scripts.mortal_actor")
        bind_mortal_actor_compiles = loadout_module.bind_mortal_actor_compiles
    finally:
        sys.path.remove(loadout_path)

    three_rdi_path = str((three_rdi_root / "skills" / "3rdi" / "scripts").resolve())
    sys.path.insert(0, three_rdi_path)
    try:
        three_rdi_module = importlib.import_module("three_rdi")
        compile_cut = three_rdi_module.compile_cut
        mortal_actor_handoff = three_rdi_module.mortal_actor_handoff
    finally:
        sys.path.remove(three_rdi_path)

    alex_path = str(alex_root.resolve())
    sys.path.insert(0, alex_path)
    try:
        local_support_module = importlib.import_module("alex_runtime.local_support")
        evaluate_local_support_case = local_support_module.evaluate_local_support_case
        local_support_profile = local_support_module.LOCAL_SUPPORT_PROFILE
    finally:
        sys.path.remove(alex_path)

    return SimpleNamespace(
        bind_mortal_actor_compiles=bind_mortal_actor_compiles,
        compile_cut=compile_cut,
        mortal_actor_handoff=mortal_actor_handoff,
        evaluate_local_support_case=evaluate_local_support_case,
        local_support_profile=local_support_profile,
    )


def _case_payload(vector_root: Path) -> dict:
    manifest = _load_json(vector_root / "manifest.json")
    return {
        "manifest": manifest,
        "field": _load_json(vector_root / manifest["field_ref"]),
        "compiles": _load_json(vector_root / manifest["compile_ref"]),
        "claims": _load_json(vector_root / manifest["claim_ref"]),
    }


def _records_for_claim(claim: dict) -> list[dict]:
    ids = [claim["subject_id"], claim["object_id"], *claim.get("declared_basis_ids", [])]
    result: list[dict] = []
    seen: set[str] = set()
    for record_id in ids:
        if record_id in seen:
            continue
        seen.add(record_id)
        kind = "claim" if record_id == claim["object_id"] else "evidence"
        result.append({"id": record_id, "kind": kind})
    return result


def _evidence_paths_for_claim(claim: dict) -> list[dict]:
    path_id = claim.get("evidence_path_id")
    if not isinstance(path_id, str) or not path_id:
        return []
    return [
        {
            "id": path_id,
            "source_id": claim["subject_id"],
            "claim_id": claim["object_id"],
            "status": "ATTRIBUTABLE",
            "basis_ids": list(claim.get("declared_basis_ids", [])),
            "witness_ids": [f'witness:{claim["id"]}'],
        }
    ]


def _local_support_case(*, adapters: SimpleNamespace, claim: dict, projection: dict, compile_record: dict, run_id: str) -> dict:
    path_id = claim.get("evidence_path_id")
    proposal_basis = list(claim.get("declared_basis_ids", []))
    if isinstance(path_id, str) and path_id:
        proposal_basis.append(path_id)
    case = {
        "operation_type": "local_support",
        "rule_profile": adapters.local_support_profile,
        "given": {
            "records": _records_for_claim(claim),
            "evidence_paths": _evidence_paths_for_claim(claim),
            "relations": [],
            "projection_handoff": projection,
            "evaluation_compile": compile_record,
        },
        "attempt": {
            "claim_id": claim["id"],
            "expected_projection_digest": projection["projection_digest"],
            "expected_evaluation_compile_id": compile_record["compile_id"],
            "expected_evaluation_compile_digest": compile_record["compile_digest"],
            "relation_proposal": {
                "id": f'RP-{run_id}-{claim["id"]}',
                "subject_id": claim["subject_id"],
                "predicate": claim["predicate"],
                "object_id": claim["object_id"],
                "scope": claim["scope"],
                "basis_ids": proposal_basis,
            },
            "evaluation_id": f'EV-{run_id}-{claim["id"]}',
            "execution_step_id": f'STEP-{run_id}-{claim["id"]}',
            "conclusion_assertion_id": f'AS-{run_id}-{claim["id"]}',
        },
    }
    case["input_digest"] = _sha256_json(case)
    return case


def run_case(vector_root: Path, three_rdi_root: Path, loadout_root: Path, alex_root: Path) -> dict:
    """Execute CASE only. This function never reads the oracle path."""

    payload = _case_payload(vector_root)
    manifest = payload["manifest"]
    field = payload["field"]
    compiles = {record["compile_id"]: record for record in payload["compiles"]["compiles"]}
    claims = {claim["id"]: claim for claim in payload["claims"]["claims"]}
    adapters = _load_adapters(three_rdi_root, loadout_root, alex_root)

    runs: dict[str, dict] = {}
    for run in manifest["runs"]:
        run_id = run["run_id"]
        projection_receipt = adapters.compile_cut(field, run["cut_id"])
        projection = adapters.mortal_actor_handoff(projection_receipt)
        entry_compile = compiles[run["entry_compile_id"]]
        evaluation_compile = compiles[run["evaluation_compile_id"]]
        binding = adapters.bind_mortal_actor_compiles(
            run_id=run_id,
            actor_id=run["actor_id"],
            world_cut_ref=f'3rdi-cut:{run["cut_id"]}',
            projection_ref=projection["projection_digest"],
            entry_compile=entry_compile,
            evaluation_compile=evaluation_compile,
        )
        if binding["projection_ref"] != projection["projection_digest"]:
            raise RuntimeError("LOADOUT_PROJECTION_BINDING_MISMATCH")

        alex_results: dict[str, dict] = {}
        for claim_id in run["claim_ids"]:
            claim = claims[claim_id]
            local_case = _local_support_case(
                adapters=adapters,
                claim=claim,
                projection=projection,
                compile_record=evaluation_compile,
                run_id=run_id,
            )
            result = adapters.evaluate_local_support_case(local_case)
            if result.get("claim_id") != claim_id:
                raise RuntimeError("ALEX_CLAIM_IDENTITY_MISMATCH")
            if result.get("projection_digest") != projection["projection_digest"]:
                raise RuntimeError("ALEX_PROJECTION_IDENTITY_MISMATCH")
            if result.get("compile_id") != evaluation_compile["compile_id"]:
                raise RuntimeError("ALEX_COMPILE_IDENTITY_MISMATCH")
            alex_results[claim_id] = result

        runs[run_id] = {
            "actor_id": run["actor_id"],
            "cut_id": run["cut_id"],
            "projection_handoff": projection,
            "loadout_binding": binding,
            "alex_results": alex_results,
        }

    receipt = {
        "schema": "mortal_actor.blind-case-receipt/v0",
        "vector_id": manifest["vector_id"],
        "runs": runs,
    }
    receipt["case_receipt_digest"] = _sha256_json(receipt)
    return receipt


def score_case(vector_root: Path, case_receipt: dict) -> dict:
    """Open the sealed oracle only after CASE receipt formation."""

    manifest = _load_json(vector_root / "manifest.json")
    oracle = _load_json(vector_root / manifest["oracle_ref"])
    expected = oracle["expected_local_outcomes"]
    mismatches: list[dict] = []
    actual_matrix: dict[str, dict[str, str]] = {}

    for run_id, expected_claims in expected.items():
        actual_claims: dict[str, str] = {}
        run = case_receipt.get("runs", {}).get(run_id, {})
        for claim_id, expected_disposition in expected_claims.items():
            actual = run.get("alex_results", {}).get(claim_id, {}).get("local_disposition")
            actual_claims[claim_id] = actual
            if actual != expected_disposition:
                mismatches.append(
                    {
                        "run_id": run_id,
                        "claim_id": claim_id,
                        "expected": expected_disposition,
                        "actual": actual,
                    }
                )
        actual_matrix[run_id] = actual_claims

    killer_control = (
        oracle.get("global_truth", {}).get("Q2") is False
        and actual_matrix.get("MA-N-N0", {}).get("Q2") == "local_basis_accept"
    )
    no_side_effects = all(
        run.get("loadout_binding", {}).get("side_effect_executed") is False
        and run.get("loadout_binding", {}).get("authority_expanded") is False
        for run in case_receipt.get("runs", {}).values()
    )
    status = "pass" if not mismatches and killer_control and no_side_effects else "fail"
    return {
        "schema": "mortal_actor.blind-score/v0",
        "vector_id": manifest["vector_id"],
        "case_receipt_digest": case_receipt.get("case_receipt_digest"),
        "status": status,
        "mismatches": mismatches,
        "killer_control_local_accept_global_false": killer_control,
        "no_side_effects": no_side_effects,
        "run_count": len(case_receipt.get("runs", {})),
        "claim_evaluation_count": sum(
            len(run.get("alex_results", {})) for run in case_receipt.get("runs", {}).values()
        ),
    }


def _parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Run or score the MORTAL-ACTOR-001 blind proof")
    sub = parser.add_subparsers(dest="command", required=True)

    case = sub.add_parser("case", help="run CASE without opening the oracle")
    case.add_argument("--vector", type=Path, required=True)
    case.add_argument("--three-rdi-root", type=Path, required=True)
    case.add_argument("--loadout-root", type=Path, required=True)
    case.add_argument("--alex-root", type=Path, required=True)

    score = sub.add_parser("score", help="score a completed CASE receipt against the sealed oracle")
    score.add_argument("--vector", type=Path, required=True)
    score.add_argument("--case-receipt", type=Path, required=True)
    return parser


def main(argv: list[str] | None = None) -> int:
    args = _parser().parse_args(argv)
    if args.command == "case":
        receipt = run_case(args.vector, args.three_rdi_root, args.loadout_root, args.alex_root)
        json.dump(receipt, sys.stdout, ensure_ascii=False, sort_keys=True)
        sys.stdout.write("\n")
        return 0

    case_receipt = _load_json(args.case_receipt)
    score = score_case(args.vector, case_receipt)
    json.dump(score, sys.stdout, ensure_ascii=False, sort_keys=True)
    sys.stdout.write("\n")
    return 0 if score["status"] == "pass" else 1


if __name__ == "__main__":
    raise SystemExit(main())
