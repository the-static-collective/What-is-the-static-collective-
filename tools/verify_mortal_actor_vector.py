#!/usr/bin/env python3
from __future__ import annotations

import copy
import hashlib
import json
import sys
from pathlib import Path

FORBIDDEN_CASE_STRINGS = {
    "basis_outside_projection",
    "local_basis_accept",
    "local_basis_unresolved",
    "global_truth",
    "expected_outcome",
}


def _load(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def _canonical_digest(record: dict) -> str:
    payload = copy.deepcopy(record)
    payload.pop("compile_digest", None)
    raw = json.dumps(payload, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")
    return "sha256:" + hashlib.sha256(raw).hexdigest()


def _strings(value):
    if isinstance(value, dict):
        for k, v in value.items():
            yield str(k)
            yield from _strings(v)
    elif isinstance(value, list):
        for item in value:
            yield from _strings(item)
    elif isinstance(value, str):
        yield value


def load_vector(root: Path) -> dict:
    manifest = _load(root / "manifest.json")
    return {
        "root": root,
        "manifest": manifest,
        "field": _load(root / manifest["field_ref"]),
        "compiles": _load(root / manifest["compile_ref"]),
        "claims": _load(root / manifest["claim_ref"]),
        "oracle": _load(root / manifest["oracle_ref"]),
    }


def validate_vector(vector: dict) -> list[str]:
    errors: list[str] = []
    manifest = vector["manifest"]
    field = vector["field"]
    compiles = vector["compiles"]
    claims = vector["claims"]
    root = vector["root"]

    if set(manifest) != {"schema","vector_id","field_ref","compile_ref","claim_ref","oracle_ref","actors","runs"}:
        errors.append("MANIFEST_SHAPE_INVALID")
    if manifest.get("schema") != "mortal_actor.vector-manifest/v0":
        errors.append("MANIFEST_SCHEMA_INVALID")
    if manifest.get("vector_id") != "FOUR-WITNESSES-ONE-ROOM-001":
        errors.append("VECTOR_ID_INVALID")
    if sorted(manifest.get("actors", [])) != ["A","B","N","R"]:
        errors.append("ACTORS_INVALID")

    case_root = root / "case"
    oracle_path = root / manifest["oracle_ref"]
    if oracle_path.parent.name != "oracle":
        errors.append("ORACLE_NOT_SEPARATE")
    for ref in (manifest["field_ref"], manifest["compile_ref"], manifest["claim_ref"]):
        if (root / ref).parent != case_root:
            errors.append("CASE_NOT_SEPARATE")
            break
    for payload in (field, compiles, claims):
        tokens = set(_strings(payload))
        if tokens & FORBIDDEN_CASE_STRINGS:
            errors.append("ORACLE_LEAK")
            break

    occurrences = field.get("occurrences", [])
    occ_by_id = {o.get("id"): o for o in occurrences}
    expected_occ = {
        "room-enter-a0","red-note-placed","blue-key-dropped","lamp-flicker",
        "north-door-click","mirror-scratch","clock-chime-left","clock-chime-right",
        "reader-margin-note","narrator-ledger-open","merge-read","room-return-a1",
    }
    if set(occ_by_id) != expected_occ:
        errors.append("OCCURRENCE_SET_INVALID")
    if occ_by_id.get("clock-chime-left",{}).get("occurred_at") != occ_by_id.get("clock-chime-right",{}).get("occurred_at"):
        errors.append("CONCURRENT_EVENTS_NOT_CONCURRENT")
    for edge in field.get("edges", []):
        if {edge.get("from"), edge.get("to")} == {"clock-chime-left","clock-chime-right"} and edge.get("edge_class") == "causal":
            errors.append("CONCURRENT_EVENTS_ORDERED")

    cuts = {c.get("id"): c for c in field.get("cuts", [])}
    for run in manifest.get("runs", []):
        cut = cuts.get(run.get("cut_id"))
        if not cut or cut.get("observer") != run.get("actor_id"):
            errors.append("MISSING_ACTOR_CUT")
            break

    contacts = {c.get("id"): c for c in field.get("contacts", [])}
    for event in field.get("attention_events", []):
        if event.get("action") == "ignored":
            contact = contacts.get(event.get("contact_id"))
            if not contact or contact.get("observer") != event.get("observer"):
                errors.append("IGNORED_WITHOUT_CONTACT")
                break
    blue_b = any(e.get("occurrence_id")=="blue-key-dropped" and e.get("observer")=="B" for e in field.get("exposures", []))
    blue_b_contact = any(c.get("occurrence_id")=="blue-key-dropped" and c.get("observer")=="B" for c in field.get("contacts", []))
    if not blue_b or blue_b_contact:
        errors.append("AVAILABLE_ENCOUNTER_COLLAPSE")

    compile_list = compiles.get("compiles", [])
    by_id = {c.get("compile_id"): c for c in compile_list}
    c0, c1 = by_id.get("C0"), by_id.get("C1")
    if not c0 or not c1 or c0.get("parent_compile_id") is not None or c1.get("parent_compile_id") != "C0":
        errors.append("COMPILE_ANCESTRY_INVALID")
    else:
        for record in (c0,c1):
            if record.get("compile_digest") != _canonical_digest(record):
                errors.append("COMPILE_DIGEST_INVALID")
                break
        if c0.get("effect_fence_ref") != c1.get("effect_fence_ref") or c0.get("effective_effects") != c1.get("effective_effects"):
            errors.append("EFFECT_FENCE_EXPANDED")
        if c0.get("egress_policy_ref") != c1.get("egress_policy_ref"):
            errors.append("EGRESS_POLICY_CHANGED")
        allowed = {e.get("effect") for e in c0.get("effective_effects", []) if e.get("status")=="allowed"}
        if "world.write" in allowed:
            errors.append("FENCED_ACTION_ALLOWED")
        if c0.get("context_pack_ref") == c1.get("context_pack_ref"):
            errors.append("RECOMPILE_CONTEXT_UNCHANGED")

    claim_ids = {c.get("id") for c in claims.get("claims", [])}
    if claim_ids != {"Q1","Q2","Q3","Q4","Q5"}:
        errors.append("CLAIM_SET_INVALID")
    for run in manifest.get("runs", []):
        if set(run.get("claim_ids", [])) != claim_ids:
            errors.append("RUN_CLAIM_BINDING_INVALID")
            break

    a0 = occ_by_id.get("room-enter-a0", {})
    a1 = occ_by_id.get("room-return-a1", {})
    if a0.get("locus_id") != a1.get("locus_id"):
        errors.append("ROOM_LOCUS_NOT_STABLE")
    if a0.get("id") == a1.get("id"):
        errors.append("WORLDLINE_COLLAPSED")

    if not any(e.get("edge_class")=="relevance" for e in field.get("edges", [])):
        errors.append("RELEVANCE_CONTROL_MISSING")
    if any("SUPPORTS" == e.get("relation") for e in field.get("edges", [])):
        errors.append("RELEVANCE_MINTS_SUPPORT")

    return list(dict.fromkeys(errors))


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        print("usage: verify_mortal_actor_vector.py <vector-root>", file=sys.stderr)
        return 2
    vector = load_vector(Path(argv[1]))
    errors = validate_vector(vector)
    if errors:
        for error in errors:
            print(error)
        return 1
    print("MORTAL-ACTOR-001 vector: OK")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
