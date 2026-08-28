from __future__ import annotations

import copy
import json
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VECTOR = ROOT / "specimens" / "passage-world-001"
MANIFEST = VECTOR / "manifest.json"
WORLD = VECTOR / "case" / "world.json"
POLICY = VECTOR / "case" / "comparison-policy.json"
DOORS = VECTOR / "case" / "door-registry.json"
ORACLE = VECTOR / "oracle" / "private-oracle.json"
TOOLS = ROOT / "tools"
sys.path.insert(0, str(TOOLS))

from verify_passage_world_vector import load_vector, validate_vector  # noqa: E402


def load(path: Path):
    return json.loads(path.read_text(encoding="utf-8"))


def strings(value):
    if isinstance(value, str):
        yield value
    elif isinstance(value, dict):
        for key, child in value.items():
            yield str(key)
            yield from strings(child)
    elif isinstance(value, list):
        for child in value:
            yield from strings(child)


class PassageWorldVectorTests(unittest.TestCase):
    def test_case_and_oracle_are_physically_separate(self) -> None:
        for path in (MANIFEST, WORLD, POLICY, DOORS, ORACLE):
            self.assertTrue(path.is_file(), path)
        self.assertEqual(WORLD.parent.name, "case")
        self.assertEqual(POLICY.parent.name, "case")
        self.assertEqual(DOORS.parent.name, "case")
        self.assertEqual(ORACLE.parent.name, "oracle")

    def test_manifest_freezes_two_roads_one_door_contract(self) -> None:
        manifest = load(MANIFEST)
        self.assertEqual(
            set(manifest),
            {
                "schema",
                "vector_id",
                "world_ref",
                "policy_ref",
                "door_registry_ref",
                "oracle_ref",
                "roads",
                "receipt_slots",
            },
        )
        self.assertEqual(manifest["schema"], "passage_world.vector-manifest/v0")
        self.assertEqual(manifest["vector_id"], "TWO-ROADS-ONE-DOOR-001")
        self.assertEqual(manifest["world_ref"], "case/world.json")
        self.assertEqual(manifest["policy_ref"], "case/comparison-policy.json")
        self.assertEqual(manifest["door_registry_ref"], "case/door-registry.json")
        self.assertEqual(manifest["oracle_ref"], "oracle/private-oracle.json")
        self.assertEqual({road["road_id"] for road in manifest["roads"]}, {"ROAD-A", "ROAD-B"})
        for road in manifest["roads"]:
            self.assertEqual(road["source_surface"], "R0")
            self.assertEqual(road["destination_surface"], "R1")
            self.assertEqual(road["payload_ref"], "payload:022100")
            self.assertEqual(len(road["receipt_slot_ids"]), 5)

    def test_world_policy_and_door_are_boring_and_exact(self) -> None:
        world = load(WORLD)
        self.assertEqual(
            world,
            {
                "schema": "passage_world.synthetic-world/v0",
                "world_id": "two-roads-one-door",
                "source_surface": "R0",
                "destination_surface": "R1",
                "payloads": [{"id": "payload:022100", "kind": "token", "value": "022100"}],
                "destination_projection": {"surface_id": "R1", "render": "ROOM-R1"},
            },
        )
        policy = load(POLICY)
        self.assertEqual(
            policy,
            {
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
            },
        )
        registry = load(DOORS)
        self.assertEqual(len(registry["doors"]), 1)
        self.assertEqual(registry["doors"][0]["door_id"], "door:R1")
        self.assertEqual(registry["doors"][0]["status"], "available")
        self.assertEqual(registry["doors"][0]["role"], "destination")
        self.assertEqual(registry["doors"][0]["accepts_classes"], ["passage-token"])

    def test_case_contains_no_oracle_language(self) -> None:
        banned = {
            "PASSAGE_DISTINCT",
            "PASSAGE_EQUIVALENT",
            "REFUSE_UNATTRIBUTED_FORMATION",
            "expected_verdict",
            "oracle",
        }
        for path in (WORLD, POLICY, DOORS):
            values = list(strings(load(path)))
            for token in banned:
                self.assertFalse(any(token in value for value in values), (path, token))

    def test_private_oracle_freezes_control_family(self) -> None:
        oracle = load(ORACLE)
        self.assertEqual(oracle["schema"], "passage_world.private-oracle/v0")
        outcomes = {item["case_id"]: item["expected_verdict"] for item in oracle["cases"]}
        self.assertEqual(
            outcomes,
            {
                "PW-DIRECT-A-B": "PASSAGE_DISTINCT",
                "PW-SERIALIZATION-NOISE": "PASSAGE_EQUIVALENT",
                "PW-ID-NOISE": "PASSAGE_EQUIVALENT",
                "PW-COUNTERFEIT-FORMATION": "REFUSE_UNATTRIBUTED_FORMATION",
                "PW-ROUTE-COINCIDENCE": "PASSAGE_DISTINCT",
                "PW-ENDPOINT-COINCIDENCE": "PASSAGE_DISTINCT",
                "PW-PAYLOAD-MUTATION": "CONTENT_DIFFERENCE",
                "PW-DESTINATION-REFUSED": "PASSAGE_DISTINCT",
                "PW-DESTINATION-HELD": "PASSAGE_DISTINCT",
            },
        )
        by_id = {item["case_id"]: item for item in oracle["cases"]}
        self.assertEqual(
            set(by_id["PW-ID-NOISE"]["varies"]),
            {"bit_id", "route_id", "harness_nonce", "transport_wrapper_id"},
        )
        self.assertEqual(by_id["PW-ID-NOISE"]["owner_normalized_receipt_graph"], "equivalent")
        for case_id in ("PW-DESTINATION-REFUSED", "PW-DESTINATION-HELD"):
            self.assertFalse(by_id[case_id]["consequence_occurred"])
            self.assertTrue(by_id[case_id]["passage_receipts_survive"])

    def test_structural_verifier_accepts_frozen_vector(self) -> None:
        self.assertEqual(validate_vector(load_vector(VECTOR)), [])

    def test_structural_verifier_reports_stable_mutation_codes(self) -> None:
        base = load_vector(VECTOR)

        mutation = copy.deepcopy(base)
        mutation["world"]["oracle"] = "PASSAGE_DISTINCT"
        self.assertIn("ORACLE_LEAK", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["manifest"]["roads"] = [mutation["manifest"]["roads"][0]]
        self.assertIn("ROAD_MISSING", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["manifest"]["roads"][0]["destination_surface"] = "R9"
        self.assertIn("ROAD_SURFACE_MISMATCH", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["manifest"]["roads"][0]["payload_ref"] = "payload:other"
        self.assertIn("PAYLOAD_MISMATCH", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["policy"]["conservative_on_unknown"] = False
        self.assertIn("POLICY_INVALID", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["doors"]["doors"][0]["status"] = "unavailable"
        self.assertIn("DOOR_REGISTRY_INVALID", validate_vector(mutation))

        mutation = copy.deepcopy(base)
        mutation["manifest"]["receipt_slots"][1]["slot_id"] = mutation["manifest"]["receipt_slots"][0]["slot_id"]
        self.assertIn("RECEIPT_SLOT_DUPLICATE", validate_vector(mutation))


if __name__ == "__main__":
    unittest.main()
