from __future__ import annotations

from .evaluator import NarrativeInputError

ALLOWED_RENDER_MODES = {
    "GUESS": {"GUESS"},
    "SUSPECT": {"SUSPECT", "GUESS"},
    "BELIEVE": {"BELIEVE", "SUSPECT", "GUESS"},
    "KNOW": {"KNOW", "BELIEVE", "SUSPECT", "GUESS"},
}
VALID_SCOPES = {"character", "reader", "narrator"}
VALID_CAUSAL_ROLES = {"exposition", "character-action-basis"}


def check_render_receipt(proposal: dict, evaluation: dict, render_receipt: dict) -> dict:
    if not isinstance(render_receipt, dict) or render_receipt.get("schema") != "mortal_narrative.render/v0":
        raise NarrativeInputError("RENDER_SCHEMA_INVALID")
    if not isinstance(evaluation, dict) or evaluation.get("schema") != "mortal_narrative.evaluation/v0" or evaluation.get("disposition") != "narrative_admissible":
        raise NarrativeInputError("RENDER_REQUIRES_ADMISSIBLE_BEAT")
    if not isinstance(proposal, dict) or proposal.get("schema") != "mortal_narrative.beat-proposal/v0":
        raise NarrativeInputError("RENDER_PROPOSAL_SCHEMA_INVALID")

    identity = {
        "beat_id": proposal.get("beat_id"),
        "actor_id": proposal.get("actor_id"),
        "cut_id": proposal.get("cut_id"),
        "projection_digest": proposal.get("projection_digest"),
    }
    for field, value in identity.items():
        if render_receipt.get(field) != value or evaluation.get(field) != value:
            raise NarrativeInputError(f"RENDER_IDENTITY_MISMATCH:{field}")

    uses = proposal.get("epistemic_uses")
    if not isinstance(uses, list):
        raise NarrativeInputError("RENDER_PROPOSAL_USES_INVALID")
    declared = {
        item["claim_id"]: item["requested_mode"]
        for item in uses
        if isinstance(item, dict)
        and isinstance(item.get("claim_id"), str)
        and item.get("requested_mode") in ALLOWED_RENDER_MODES
    }

    assertions = render_receipt.get("assertions")
    if not isinstance(assertions, list):
        raise NarrativeInputError("RENDER_ASSERTIONS_INVALID")

    violations: list[str] = []
    for assertion in assertions:
        if not isinstance(assertion, dict):
            raise NarrativeInputError("RENDER_ASSERTION_INVALID")
        scope = assertion.get("scope")
        mode = assertion.get("rendered_mode")
        causal_role = assertion.get("causal_role")
        claim_id = assertion.get("claim_id")
        if (
            scope not in VALID_SCOPES
            or mode not in ALLOWED_RENDER_MODES
            or causal_role not in VALID_CAUSAL_ROLES
            or not isinstance(claim_id, str)
            or not claim_id
        ):
            raise NarrativeInputError("RENDER_ASSERTION_INVALID")

        if scope == "character":
            declared_mode = declared.get(claim_id)
            if declared_mode is None or mode not in ALLOWED_RENDER_MODES[declared_mode]:
                violations.append("CHARACTER_MODE_ESCALATION")
        elif causal_role == "character-action-basis":
            violations.append("NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS")

    return {
        "schema": "mortal_narrative.render-check/v0",
        "render_id": render_receipt.get("render_id"),
        "beat_id": proposal["beat_id"],
        "status": "pass" if not violations else "fail",
        "violations": list(dict.fromkeys(violations)),
    }
