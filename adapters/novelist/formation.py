from __future__ import annotations

FORMATION_SCHEMA = "mortal_narrative.formation/v0"
FORMATION_MODES = {"BELIEVE", "SUSPECT"}
PREFIX_TO_FIELD = {
    "occurrence": "visible_occurrence_ids",
    "contact": "contact_ids",
    "attention": "attention_event_ids",
    "decoder": "decoder_application_ids",
    "stance": "stance_ids",
    "relevance": "visible_relevance_edge_ids",
    "causal": "visible_causal_edge_ids",
}


def _nonempty(value: object) -> bool:
    return isinstance(value, str) and bool(value.strip())


def projection_formation_refs(projection_handoff: dict) -> set[str]:
    refs: set[str] = set()
    if not isinstance(projection_handoff, dict):
        return refs
    for prefix, field in PREFIX_TO_FIELD.items():
        values = projection_handoff.get(field, [])
        if isinstance(values, list):
            refs.update(f"{prefix}:{value}" for value in values if _nonempty(value))
    return refs


def validate_formation_receipt(
    receipt: dict,
    *,
    projection_handoff: dict,
    loadout_binding: dict,
) -> list[str]:
    source = receipt if isinstance(receipt, dict) else {}
    projection = projection_handoff if isinstance(projection_handoff, dict) else {}
    binding = loadout_binding if isinstance(loadout_binding, dict) else {}
    errors: list[str] = []

    if source.get("schema") != FORMATION_SCHEMA:
        errors.append("FORMATION_SCHEMA_INVALID")
    if projection.get("schema") != "mortal_actor.3rdi-handoff/v0":
        errors.append("FORMATION_PROJECTION_SCHEMA_INVALID")
    if binding.get("schema") != "mortal_actor.loadout-binding/v0":
        errors.append("FORMATION_BINDING_SCHEMA_INVALID")
    if source.get("mode") not in FORMATION_MODES:
        errors.append("FORMATION_MODE_INVALID")
    if source.get("actor_id") != projection.get("observer") or source.get("actor_id") != binding.get("actor_id"):
        errors.append("FORMATION_ACTOR_MISMATCH")
    if source.get("cut_id") != projection.get("cut_id"):
        errors.append("FORMATION_CUT_MISMATCH")
    if source.get("projection_digest") != projection.get("projection_digest") or source.get("projection_digest") != binding.get("projection_ref"):
        errors.append("FORMATION_PROJECTION_MISMATCH")
    if source.get("evaluation_compile_id") != binding.get("evaluation_compile_id"):
        errors.append("FORMATION_COMPILE_ID_MISMATCH")
    if source.get("evaluation_compile_digest") != binding.get("evaluation_compile_digest"):
        errors.append("FORMATION_COMPILE_DIGEST_MISMATCH")
    if not _nonempty(source.get("claim_id")):
        errors.append("FORMATION_CLAIM_ID_REQUIRED")

    refs = source.get("formation_refs")
    if not isinstance(refs, list) or not refs:
        errors.append("FORMATION_REFS_REQUIRED")
        refs = []
    local_refs = projection_formation_refs(projection)
    for ref in refs:
        if not _nonempty(ref) or ":" not in ref:
            errors.append("FORMATION_REF_NAMESPACE_INVALID")
            continue
        prefix = ref.split(":", 1)[0]
        if prefix not in PREFIX_TO_FIELD:
            errors.append("FORMATION_REF_NAMESPACE_INVALID")
            continue
        if ref not in local_refs:
            errors.append("FORMATION_REF_OUTSIDE_PROJECTION")

    return list(dict.fromkeys(errors))
