from __future__ import annotations

import copy
import unittest
from pathlib import Path

from tools.verify_mortal_actor_vector import load_vector, validate_vector

ROOT = Path(__file__).resolve().parents[1]
VECTOR = ROOT / "specimens" / "mortal-actor-001"


class MortalActorVectorTests(unittest.TestCase):
    def setUp(self):
        self.vector = load_vector(VECTOR)

    def test_vector_is_structurally_green(self):
        self.assertEqual(validate_vector(self.vector), [])

    def test_case_and_oracle_are_physically_separate(self):
        manifest = self.vector["manifest"]
        self.assertEqual((VECTOR / manifest["oracle_ref"]).parent.name, "oracle")
        for ref in (manifest["field_ref"], manifest["compile_ref"], manifest["claim_ref"]):
            self.assertEqual((VECTOR / ref).parent.name, "case")

    def test_manifest_binds_exact_runs(self):
        manifest = self.vector["manifest"]
        self.assertEqual(manifest["schema"], "mortal_actor.vector-manifest/v0")
        self.assertEqual(manifest["vector_id"], "FOUR-WITNESSES-ONE-ROOM-001")
        self.assertEqual([r["run_id"] for r in manifest["runs"]],
                         ["MA-A-A0","MA-B-B0","MA-R-R0","MA-N-N0","MA-A-A1"])

    def test_concurrent_chimes_are_not_causally_ordered(self):
        field = self.vector["field"]
        occ = {o["id"]: o for o in field["occurrences"]}
        self.assertEqual(occ["clock-chime-left"]["occurred_at"], occ["clock-chime-right"]["occurred_at"])
        self.assertFalse(any(
            e["edge_class"] == "causal"
            and {e["from"],e["to"]} == {"clock-chime-left","clock-chime-right"}
            for e in field["edges"]
        ))

    def test_available_does_not_mean_encountered(self):
        field = self.vector["field"]
        self.assertTrue(any(e["occurrence_id"]=="blue-key-dropped" and e["observer"]=="B" for e in field["exposures"]))
        self.assertFalse(any(c["occurrence_id"]=="blue-key-dropped" and c["observer"]=="B" for c in field["contacts"]))

    def test_ignored_has_contact_ancestry(self):
        field = self.vector["field"]
        contacts = {c["id"]: c for c in field["contacts"]}
        ignored = [e for e in field["attention_events"] if e["action"]=="ignored"]
        self.assertTrue(ignored)
        for event in ignored:
            self.assertIn(event["contact_id"], contacts)
            self.assertEqual(contacts[event["contact_id"]]["observer"], event["observer"])

    def test_a0_a1_same_locus_different_worldline(self):
        field = self.vector["field"]
        occ = {o["id"]: o for o in field["occurrences"]}
        self.assertEqual(occ["room-enter-a0"]["locus_id"], occ["room-return-a1"]["locus_id"])
        self.assertNotEqual(occ["room-enter-a0"]["id"], occ["room-return-a1"]["id"])

    def test_oracle_leak_mutation_is_caught(self):
        vector = copy.deepcopy(self.vector)
        vector["claims"]["claims"][0]["scope"] = "global_truth"
        self.assertIn("ORACLE_LEAK", validate_vector(vector))

    def test_compile_ancestry_mutation_is_caught(self):
        vector = copy.deepcopy(self.vector)
        c1 = next(c for c in vector["compiles"]["compiles"] if c["compile_id"]=="C1")
        c1["parent_compile_id"] = "FOREIGN"
        self.assertIn("COMPILE_ANCESTRY_INVALID", validate_vector(vector))

    def test_effect_expansion_mutation_is_caught(self):
        vector = copy.deepcopy(self.vector)
        c1 = next(c for c in vector["compiles"]["compiles"] if c["compile_id"]=="C1")
        c1["effective_effects"].append({"effect":"world.write","status":"allowed"})
        self.assertIn("EFFECT_FENCE_EXPANDED", validate_vector(vector))

    def test_concurrency_order_mutation_is_caught(self):
        vector = copy.deepcopy(self.vector)
        vector["field"]["edges"].append({
            "id":"bad-order","from":"clock-chime-left","to":"clock-chime-right",
            "edge_class":"causal","relation":"display-order",
            "first_perceived_at":"2026-08-27T12:00:06Z","discovery_trace":["bad"],"assessments":[]
        })
        self.assertIn("CONCURRENT_EVENTS_ORDERED", validate_vector(vector))


if __name__ == "__main__":
    unittest.main()
