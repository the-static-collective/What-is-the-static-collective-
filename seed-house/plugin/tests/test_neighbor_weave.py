import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PILOT = ROOT / "templates" / "NEIGHBOR-GARDEN.example.json"


class NeighborWeaveContract(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.data = json.loads(PILOT.read_text(encoding="utf-8"))
        cls.leads = cls.data["leads"]

    def test_public_research_only(self):
        self.assertEqual(self.data["schema"], "static-seed.neighbor-garden/v1")
        self.assertEqual(self.data["status"], "PUBLIC_RESEARCH_SPECIMEN_NOT_COLTON_APPROVED")
        self.assertFalse(self.data["actions_taken"]["outreach_sent"])
        self.assertEqual(self.data["actions_taken"]["partnerships_confirmed"], 0)

    def test_unique_source_pinned_leads(self):
        self.assertGreaterEqual(len(self.leads), 3)
        ids = [lead["id"] for lead in self.leads]
        self.assertEqual(len(ids), len(set(ids)))
        for lead in self.leads:
            self.assertTrue(lead["source"]["url"].startswith("https://"))
            self.assertEqual(lead["source"]["checked_on"], self.data["created_on"])
            self.assertTrue(lead["source"]["observed"])
            self.assertEqual(lead["stage"], "DISCOVERED")

    def test_no_false_partnership_or_contact(self):
        for lead in self.leads:
            self.assertFalse(lead["partner_confirmed"])
            self.assertIsNone(lead["introduction_evidence"])
            self.assertIsNone(lead["mutual_trial_evidence"])
            self.assertIn(lead["relationship_type"], {
                "recurring-vendor", "reciprocal-referral",
                "project-handoff", "specialty-peer", "community-collaboration"})
            self.assertTrue(lead["proposed_mutual_value"]["to_neighbor"])
            self.assertTrue(lead["proposed_mutual_value"]["to_willow"])
            self.assertTrue(lead["uncertainties"])
            self.assertNotIn("customer_records", lead)
            self.assertNotIn("contact_email", lead)
            self.assertNotIn("contact_phone", lead)

    def test_partnership_room_remains_private(self):
        house = json.loads((ROOT / "templates" / "HOUSE-REGISTRY.example.json").read_text())
        cleaning = next(h for h in house["homes"] if h["id"] == "cleaning")
        partnerships = next(r for r in cleaning["rooms"] if r["id"] == "partnerships")
        self.assertEqual(partnerships["visibility"], "private")
        self.assertEqual(partnerships["workbenches"], ["neighbor-weave"])


if __name__ == "__main__":
    unittest.main()
