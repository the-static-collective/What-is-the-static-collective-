from __future__ import annotations

from .formation import validate_formation_receipt

PROPOSAL_SCHEMA = "mortal_narrative.beat-proposal/v0"
MODES = {"KNOW", "BELIEVE", "SUSPECT", "GUESS"}


class NarrativeInputError(ValueError):
    pass


def _nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def _validate_base(proposal: dict, projection: dict, binding: dict) -> None:
    if not isinstance(proposal, dict) or proposal.get("schema") != PROPOSAL_SCHEMA:
        raise NarrativeInputError("PROPOSAL_SCHEMA_INVALID")
    if not isinstance(projection, dict) or projection.get("schema") != "mortal_actor.3rdi-handoff/v0":
        raise NarrativeInputError("PROJECTION_SCHEMA_INVALID")
    if not isinstance(binding, dict) or binding.get("schema") != "mortal_actor.loadout-binding/v0":
        raise NarrativeInputError("BINDING_SCHEMA_INVALID")
    for field in (
        "beat_id",
        "actor_id",
        "cut_id",
        "projection_digest",
        "evaluation_compile_id",
        "evaluation_compile_digest",
        "dramatic_destination",
        "proposed_action",
    ):
        if not _nonempty(proposal.get(field)):
            raise NarrativeInputError(f"PROPOSAL_FIELD_REQUIRED:{field}")
    if not isinstance(proposal.get("epistemic_uses"), list) or not isinstance(proposal.get("non_epistemic_drivers"), list):
        raise NarrativeInputError("PROPOSAL_LIST_FIELD_INVALID")
    parent = proposal.get("parent_beat_id")
    if parent is not None and not _nonempty(parent):
        raise NarrativeInputError("PARENT_BEAT_ID_INVALID")
    if proposal["actor_id"] != projection.get("observer") or proposal["actor_id"] != binding.get("actor_id"):
        raise NarrativeInputError("ACTOR_IDENTITY_MISMATCH")
    if proposal["cut_id"] != projection.get("cut_id"):
        raise NarrativeInputError("CUT_IDENTITY_MISMATCH")
    if proposal["projection_digest"] != projection.get("projection_digest") or proposal["projection_digest"] != binding.get("projection_ref"):
        raise NarrativeInputError("PROJECTION_IDENTITY_MISMATCH")
    if proposal["evaluation_compile_id"] != binding.get("evaluation_compile_id"):
        raise NarrativeInputError("COMPILE_IDENTITY_MISMATCH")
    if proposal["evaluation_compile_digest"] != binding.get("evaluation_compile_digest"):
        raise NarrativeInputError("COMPILE_DIGEST_MISMATCH")


def _validate_alex(result: dict, proposal: dict, claim_id: str) -> None:
    if not isinstance(result, dict):
        raise NarrativeInputError("ALEX_RESULT_INVALID")
    expected = {
        "claim_id": claim_id,
        "observer": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "compile_id": proposal["evaluation_compile_id"],
        "compile_digest": proposal["evaluation_compile_digest"],
    }
    for field, value in expected.items():
        if result.get(field) != value:
            raise NarrativeInputError(f"ALEX_IDENTITY_MISMATCH:{field}")


def evaluate_beat_proposal(
    proposal: dict,
    *,
    projection_handoff: dict,
    loadout_binding: dict,
    alex_results: dict[str, dict],
    formation_receipts: dict[str, dict],
) -> dict:
    _validate_base(proposal, projection_handoff, loadout_binding)
    if not isinstance(alex_results, dict) or not isinstance(formation_receipts, dict):
        raise NarrativeInputError("RECEIPT_CONTAINER_INVALID")

    offending: list[dict] = []
    unresolved: list[dict] = []

    for use in proposal["epistemic_uses"]:
        if not isinstance(use, dict) or not _nonempty(use.get("claim_id")):
            raise NarrativeInputError("EPISTEMIC_USE_INVALID")
        claim_id = use["claim_id"]
        mode = use.get("requested_mode")
        if mode not in MODES:
            raise NarrativeInputError("EPISTEMIC_MODE_INVALID")

        if mode == "KNOW":
            result = alex_results.get(claim_id)
            if result is None:
                unresolved.append({
                    "claim_id": claim_id,
                    "requested_mode": mode,
                    "reason_code": "LOCAL_SUPPORT_RESULT_MISSING",
                })
                continue
            _validate_alex(result, proposal, claim_id)
            local = result.get("local_disposition")
            if local == "local_basis_accept":
                continue
            if local in {"basis_outside_projection", "local_basis_counterpressured"}:
                offending.append({
                    "claim_id": claim_id,
                    "requested_mode": mode,
                    "local_support_disposition": local,
                    "reason_code": "COUNTERFEIT_CHARACTER_KNOWLEDGE",
                })
                continue
            if local == "local_basis_unresolved":
                unresolved.append({
                    "claim_id": claim_id,
                    "requested_mode": mode,
                    "reason_code": "LOCAL_SUPPORT_UNRESOLVED",
                })
                continue
            if local in {"projection_mismatch", "compile_mismatch"}:
                raise NarrativeInputError("ALEX_IDENTITY_MISMATCH")
            unresolved.append({
                "claim_id": claim_id,
                "requested_mode": mode,
                "reason_code": "LOCAL_SUPPORT_DISPOSITION_UNKNOWN",
            })
            continue

        if mode in {"BELIEVE", "SUSPECT"}:
            formation_id = use.get("formation_receipt_id")
            if not _nonempty(formation_id) or formation_id not in formation_receipts:
                unresolved.append({
                    "claim_id": claim_id,
                    "requested_mode": mode,
                    "reason_code": "FORMATION_RECEIPT_MISSING",
                })
                continue
            formation = formation_receipts[formation_id]
            errors = validate_formation_receipt(
                formation,
                projection_handoff=projection_handoff,
                loadout_binding=loadout_binding,
            )
            if errors:
                raise NarrativeInputError("FORMATION_INVALID:" + ",".join(errors))
            if formation.get("claim_id") != claim_id or formation.get("mode") != mode:
                raise NarrativeInputError("FORMATION_BINDING_MISMATCH")
            continue

        if not proposal["non_epistemic_drivers"]:
            unresolved.append({
                "claim_id": claim_id,
                "requested_mode": mode,
                "reason_code": "GUESS_DRIVER_REQUIRED",
            })

    disposition = (
        "reroute_required"
        if offending
        else "narrative_unresolved"
        if unresolved
        else "narrative_admissible"
    )
    return {
        "schema": "mortal_narrative.evaluation/v0",
        "beat_id": proposal["beat_id"],
        "parent_beat_id": proposal.get("parent_beat_id"),
        "actor_id": proposal["actor_id"],
        "cut_id": proposal["cut_id"],
        "projection_digest": proposal["projection_digest"],
        "evaluation_compile_id": proposal["evaluation_compile_id"],
        "evaluation_compile_digest": proposal["evaluation_compile_digest"],
        "disposition": disposition,
        "offending_uses": offending,
        "unresolved_uses": unresolved,
        "creative_authority": "NOVELIST",
    }
