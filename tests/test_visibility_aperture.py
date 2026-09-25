"""VISIBILITY-APERTURE-001 boundary tests use synthetic identities only."""

import copy
import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "scripts" / "visibility_aperture.py"
POLICY = ROOT / "atlas" / "visibility-policy.json"
spec = importlib.util.spec_from_file_location("visibility_aperture", MODULE)
aperture = importlib.util.module_from_spec(spec)
spec.loader.exec_module(aperture)
policy = json.loads(POLICY.read_text(encoding="utf-8"))


def terrain():
    return {
        "schema": "static-git-atlas/terrain-v1",
        "entities": [
            {
                "id": "open-a",
                "name": "OpenExample",
                "visibility": "public",
                "status": "experimental",
                "authority": "OpenExample",
                "evidence": "declared",
                "maturity": "prototype",
            },
            {
                "id": "hidden-b",
                "name": "SecretExample",
                "visibility": "restricted",
                "restriction": {
                    "reason": "practical",
                    "basis": "Synthetic fixture only.",
                },
            },
        ],
        "relations": [
            {
                "id": "internal-crossing",
                "from": "hidden-b",
                "to": "open-a",
                "relation": "SECRET INTERNAL RELATION",
                "source_url": "https://example.invalid/private/secret",
            }
        ],
    }


class VisibilityAperture(unittest.TestCase):
    def test_public_is_default_without_promoting_other_axes(self):
        raw = {
            "schema": "static-git-atlas/terrain-v1",
            "entities": [{
                "id": "a", "name": "A", "status": "draft",
                "authority": "local", "evidence": "unverified",
                "maturity": "seed",
            }],
            "relations": [],
        }
        normalized = aperture.normalize_manifest(raw, policy)
        entity = normalized["entities"][0]
        self.assertEqual(entity["visibility"], "public")
        self.assertEqual(entity["status"], "draft")
        self.assertEqual(entity["authority"], "local")
        self.assertEqual(entity["evidence"], "unverified")
        self.assertEqual(entity["maturity"], "seed")

    def test_restricted_entity_requires_reason(self):
        raw = terrain()
        del raw["entities"][1]["restriction"]
        with self.assertRaises(ValueError):
            aperture.normalize_manifest(raw, policy)

    def test_restricted_identity_and_relation_do_not_leak_by_default(self):
        projected = aperture.project_public(terrain(), policy)
        encoded = json.dumps(projected)
        self.assertNotIn("SecretExample", encoded)
        self.assertNotIn("hidden-b", encoded)
        self.assertNotIn("SECRET INTERNAL RELATION", encoded)
        self.assertNotIn("example.invalid/private", encoded)
        self.assertIn("OpenExample", encoded)

    def test_presence_projection_requires_explicit_safe_language(self):
        raw = terrain()
        raw["entities"][1]["projection"] = {
            "mode": "presence",
            "public_label": "[restricted source]",
        }
        raw["relations"][0]["public_projection"] = {
            "mode": "presence",
            "relation": "source-informed crossing",
            "note": "A restricted source participates without exposing its identity.",
        }
        projected = aperture.project_public(raw, policy)
        encoded = json.dumps(projected)
        self.assertIn("[restricted source]", encoded)
        self.assertIn("source-informed crossing", encoded)
        self.assertNotIn("SecretExample", encoded)
        self.assertNotIn("SECRET INTERNAL RELATION", encoded)

    def test_visibility_change_does_not_rewrite_status_authority_evidence_or_maturity(self):
        raw = terrain()
        source = raw["entities"][0]
        before = {key: source[key] for key in (
            "status", "authority", "evidence", "maturity")}
        changed = copy.deepcopy(raw)
        changed["entities"][0]["visibility"] = "restricted"
        changed["entities"][0]["restriction"] = {"reason": "technical"}
        normalized = aperture.normalize_manifest(changed, policy)
        after = normalized["entities"][0]
        self.assertEqual(before, {key: after[key] for key in before})

    def test_restricted_presence_never_copies_internal_axes(self):
        raw = terrain()
        raw["entities"][1].update({
            "status": "canonical",
            "authority": "secret-owner",
            "evidence": "private-proof",
            "maturity": "production",
            "projection": {
                "mode": "presence",
                "public_label": "[restricted source]",
            },
        })
        projected = aperture.project_public(raw, policy)
        hidden = next(
            item for item in projected["entities"]
            if item["name"] == "[restricted source]")
        self.assertEqual(
            hidden,
            {
                "name": "[restricted source]",
                "kind": "repository",
                "visibility": "restricted-presence",
            },
        )


if __name__ == "__main__":
    unittest.main()
