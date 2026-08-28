#!/usr/bin/env python3
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import Any

BANNED_CASE_STRINGS = {
    "PASSAGE_DISTINCT",
    "PASSAGE_EQUIVALENT",
    "REFUSE_UNATTRIBUTED_FORMATION",
    "expected_verdict",
    "oracle",
}

EXPECTED_MANIFEST_KEYS = {
    "schema",
    "vector_id",
    "world_ref",
    "policy_ref",
    "door_registry_ref",
    "oracle_ref",
    "roads",
    "receipt_slots",
}

EXPECTED_POLICY = {
    "schema": "passage_world.comparison-policy/v0",
    "policy_id": "PW-POLICY-001",
    "ignored_fields": [
        "harness_nonce",
        "test_case_id",
        "transport_wrapper_id",
        "json_member_order",
    ],
    "exact_fields": ["source_surface", "destination_surface", "payload_ref"],
    "conservative_on_unknown": True,
}

EXPECTED_DOOR = {
    "schema": "loadinstead.door/v0",
    "door_id": "door:R1",
    "owner_world": "synthetic:R1",
    "role": "destination",
    "accepts_classes": ["passage-token"],
    "protocol": "fixture-only",
    "capability_ref": "capability:synthetic-r1",
    "status": "available",
}


def _load_json(path: Path) -> Any:
    with path.open("r", encoding="utf-8") as handle:
        return json.load(handle)


def load_vector(root: Path) -> dict[str, Any]:
    root = Path(root)
    return {
        "root": root,
        "manifest": _load_json(root / "manifest.json"),
        "world": _load_json(root / "case" / "world.json"),
        "policy": _load_json(root / "case" / "comparison-policy.json"),
        "doors": _load_json(root / "case" / "door-registry.json"),
        "oracle": _load_json(root / "oracle" / "private-oracle.json"),
    }


def _contains_banned_case_value(value: Any) -> bool:
    if isinstance(value, str):
        return any(token in value for token in BANNED_CASE_STRINGS)
    if isinstance(value, dict):
        return any(
            _contains_banned_case_value(key) or _contains_banned_case_value(child)
            for key, child in value.items()
        )
    if isinstance(value, list):
        return any(_contains_banned_case_value(child) for child in value)
    return False


def _unique(errors: list[str]) -> list[str]:
    return list(dict.fromkeys(errors))


def validate_vector(vector: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if not isinstance(vector, dict):
        return ["ROAD_MISSING"]

    manifest = vector.get("manifest")
    world = vector.get("world")
    policy = vector.get("policy")
    doors = vector.get("doors")

    if any(_contains_banned_case_value(vector.get(name)) for name in ("world", "policy", "doors")):
        errors.append("ORACLE_LEAK")

    if not isinstance(manifest, dict) or set(manifest) != EXPECTED_MANIFEST_KEYS:
        errors.append("ROAD_MISSING")
        return _unique(errors)

    if (
        manifest.get("schema") != "passage_world.vector-manifest/v0"
        or manifest.get("vector_id") != "TWO-ROADS-ONE-DOOR-001"
        or manifest.get("world_ref") != "case/world.json"
        or manifest.get("policy_ref") != "case/comparison-policy.json"
        or manifest.get("door_registry_ref") != "case/door-registry.json"
        or manifest.get("oracle_ref") != "oracle/private-oracle.json"
    ):
        errors.append("ROAD_MISSING")

    roads = manifest.get("roads")
    if not isinstance(roads, list):
        errors.append("ROAD_MISSING")
        roads = []
    road_map = {
        road.get("road_id"): road
        for road in roads
        if isinstance(road, dict) and isinstance(road.get("road_id"), str)
    }
    if set(road_map) != {"ROAD-A", "ROAD-B"} or len(roads) != 2:
        errors.append("ROAD_MISSING")

    if not isinstance(world, dict):
        errors.extend(["ROAD_SURFACE_MISMATCH", "PAYLOAD_MISMATCH"])
    else:
        expected_source = world.get("source_surface")
        expected_destination = world.get("destination_surface")
        payloads = world.get("payloads")
        payload_ids = (
            {
                item.get("id")
                for item in payloads
                if isinstance(item, dict) and isinstance(item.get("id"), str)
            }
            if isinstance(payloads, list)
            else set()
        )
        for road in road_map.values():
            if (
                road.get("source_surface") != expected_source
                or road.get("destination_surface") != expected_destination
                or expected_source != "R0"
                or expected_destination != "R1"
                or world.get("destination_projection", {}).get("surface_id") != "R1"
                or world.get("destination_projection", {}).get("render") != "ROOM-R1"
            ):
                errors.append("ROAD_SURFACE_MISMATCH")
            if road.get("payload_ref") not in payload_ids or road.get("payload_ref") != "payload:022100":
                errors.append("PAYLOAD_MISMATCH")
        token = next(
            (
                item
                for item in payloads or []
                if isinstance(item, dict) and item.get("id") == "payload:022100"
            ),
            None,
        )
        if token != {"id": "payload:022100", "kind": "token", "value": "022100"}:
            errors.append("PAYLOAD_MISMATCH")

    if policy != EXPECTED_POLICY:
        errors.append("POLICY_INVALID")

    if (
        not isinstance(doors, dict)
        or doors.get("schema") != "passage_world.door-registry/v0"
        or doors.get("doors") != [EXPECTED_DOOR]
    ):
        errors.append("DOOR_REGISTRY_INVALID")

    slots = manifest.get("receipt_slots")
    if not isinstance(slots, list):
        errors.append("RECEIPT_SLOT_DUPLICATE")
        slots = []
    slot_ids = [
        item.get("slot_id")
        for item in slots
        if isinstance(item, dict) and isinstance(item.get("slot_id"), str)
    ]
    if len(slot_ids) != len(slots) or len(slot_ids) != len(set(slot_ids)):
        errors.append("RECEIPT_SLOT_DUPLICATE")
    declared_slots = set(slot_ids)
    for road in road_map.values():
        refs = road.get("receipt_slot_ids")
        if (
            not isinstance(refs, list)
            or len(refs) != len(set(refs))
            or any(ref not in declared_slots for ref in refs)
        ):
            errors.append("RECEIPT_SLOT_DUPLICATE")

    return _unique(errors)


def main(argv: list[str] | None = None) -> int:
    args = sys.argv[1:] if argv is None else argv
    if len(args) != 1:
        print("usage: verify_passage_world_vector.py VECTOR_ROOT", file=sys.stderr)
        return 2
    root = Path(args[0])
    try:
        vector = load_vector(root)
        errors = validate_vector(vector)
    except (OSError, json.JSONDecodeError) as error:
        print(json.dumps({"status": "fail", "errors": [str(error)]}, sort_keys=True))
        return 2
    print(json.dumps({"status": "pass" if not errors else "fail", "errors": errors}, sort_keys=True))
    return 0 if not errors else 1


if __name__ == "__main__":
    raise SystemExit(main())
