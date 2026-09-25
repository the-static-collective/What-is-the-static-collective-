"""Boundary tests for DEVELOPMENT-EVENT-001."""

import copy
import importlib.util
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "scripts" / "development_event.py"
spec = importlib.util.spec_from_file_location("development_event", MODULE)
dev = importlib.util.module_from_spec(spec)
spec.loader.exec_module(dev)


def base_event():
    return {
        "schema": "static-development-event/v0",
        "id": "synthetic-001",
        "event_type": "molt",
        "subject": {
            "id": "organism-x",
            "kind": "project",
            "identity_claim": "continued",
        },
        "before": {"address": "container-a"},
        "after": {"address": "container-b"},
        "conditions": [{
            "kind": "pressure",
            "statement": "A required capability did not fit the old container.",
            "source_url": "https://example.invalid/load",
        }],
        "invariants_carried": [{
            "claim": "The same explicitly named project continues.",
            "evidence": "https://example.invalid/identity",
        }],
        "changed": ["container address"],
        "residue": ["old receipts retain their old address"],
        "sources": [
            {"url": "https://example.invalid/before", "evidence_class": "observed"},
            {"url": "https://example.invalid/after", "evidence_class": "observed"},
        ],
        "non_claims": [
            "pressure is not claimed to have caused the move",
            "new container does not inherit old-container authority",
        ],
        "causation": {"status": "not-claimed"},
        "molt": {
            "old_address": "container-a",
            "new_address": "container-b",
            "ancestry_receipts": ["https://example.invalid/identity"],
            "exclusions": ["copying alone is not migration"],
        },
    }


class DevelopmentEventBoundary(unittest.TestCase):
    def test_valid_molt(self):
        self.assertEqual(dev.validate_event(base_event())["id"], "synthetic-001")

    def test_conditions_do_not_require_causal_claim(self):
        event = base_event()
        event["conditions"].append({
            "kind": "load",
            "statement": "A second load existed before the move.",
        })
        self.assertEqual(event["causation"]["status"], "not-claimed")
        dev.validate_event(event)

    def test_explicit_causation_requires_basis(self):
        event = base_event()
        event["causation"] = {"status": "explicitly-witnessed"}
        with self.assertRaises(ValueError):
            dev.validate_event(event)

    def test_molt_requires_real_address_difference(self):
        event = base_event()
        event["molt"]["new_address"] = event["molt"]["old_address"]
        with self.assertRaises(ValueError):
            dev.validate_event(event)

    def test_continuity_requires_at_least_one_invariant(self):
        event = base_event()
        event["invariants_carried"] = []
        with self.assertRaises(ValueError):
            dev.validate_event(event)

    def test_guidance_keeps_available_shown_recommended_distinct(self):
        event = base_event()
        event["event_type"] = "guidance"
        event.pop("molt")
        event["guidance"] = {
            "observer": "synthetic-composer",
            "observed_at": "2026-09-25T00:00:00Z",
            "available": ["a", "b", "c", "d", "e"],
            "shown": ["b", "c"],
            "recommended": "b",
            "chosen": "c",
            "used": "c",
        }
        dev.validate_event(event)
        self.assertNotEqual(event["guidance"]["recommended"], event["guidance"]["chosen"])

    def test_guidance_recommendation_cannot_be_unshown(self):
        event = base_event()
        event["event_type"] = "guidance"
        event.pop("molt")
        event["guidance"] = {
            "observer": "synthetic-composer",
            "observed_at": "2026-09-25T00:00:00Z",
            "available": ["a", "b", "c"],
            "shown": ["b"],
            "recommended": "c",
            "chosen": None,
            "used": None,
        }
        with self.assertRaises(ValueError):
            dev.validate_event(event)

    def test_chosen_may_escape_shown_surface(self):
        event = base_event()
        event["event_type"] = "guidance"
        event.pop("molt")
        event["guidance"] = {
            "observer": "synthetic-composer",
            "observed_at": "2026-09-25T00:00:00Z",
            "available": ["a", "b"],
            "shown": ["b"],
            "recommended": "b",
            "chosen": "outside-door",
            "used": "outside-door",
        }
        dev.validate_event(event)

    def test_differentiation_requires_changed_form(self):
        event = base_event()
        event["event_type"] = "differentiation"
        event.pop("molt")
        event["differentiation"] = {
            "relation_id": "r1",
            "endpoints": ["a", "b"],
            "old_form": "declared analogy",
            "new_form": "declared analogy",
            "load_receipts": ["https://example.invalid/load"],
        }
        with self.assertRaises(ValueError):
            dev.validate_event(event)

    def test_aperture_only_proves_visibility_change(self):
        event = base_event()
        event["event_type"] = "aperture"
        event.pop("molt")
        event["aperture"] = {
            "before_visibility": "restricted",
            "after_visibility": "public",
            "restriction_reason": None,
        }
        event["non_claims"].append("visibility change does not imply canon change")
        dev.validate_event(event)
        self.assertIn("visibility change does not imply canon change", event["non_claims"])


if __name__ == "__main__":
    unittest.main()
