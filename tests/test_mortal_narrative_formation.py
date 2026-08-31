from __future__ import annotations

import importlib.util
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "adapters" / "novelist" / "formation.py"


def load_module():
    spec = importlib.util.spec_from_file_location("mortal_narrative_formation", MODULE)
    if spec is None or spec.loader is None:
        raise RuntimeError("formation module load failed")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def projection() -> dict:
    return {
        "schema": "mortal_actor.3rdi-handoff/v0",
        "projection_digest": "sha256:n0",
        "field_id": "four-witnesses-one-room",
        "cut_id": "N0",
        "observer": "N",
        "visible_occurrence_ids": ["lamp-flicker", "narrator-ledger-open"],
        "visible_causal_edge_ids": [],
        "visible_relevance_edge_ids": ["relevance-mirror-red-note"],
        "contact_ids": ["contact-lamp-N"],
        "attention_event_ids": ["attention-lamp-N"],
        "decoder_application_ids": ["decode-lamp-N"],
        "stance_ids": ["stance-lamp-N"],
    }


def binding() -> dict:
    return {
        "schema": "mortal_actor.loadout-binding/v0",
        "actor_id": "N",
        "projection_ref": "sha256:n0",
        "evaluation_compile_id": "C0",
        "evaluation_compile_digest": "sha256:c0",
    }


def receipt() -> dict:
    return {
        "schema": "mortal_narrative.formation/v0",
        "formation_id": "BELIEF-N-Q2",
        "actor_id": "N",
        "cut_id": "N0",
        "projection_digest": "sha256:n0",
        "evaluation_compile_id": "C0",
        "evaluation_compile_digest": "sha256:c0",
        "claim_id": "Q2",
        "mode": "BELIEVE",
        "formation_refs": ["decoder:decode-lamp-N", "stance:stance-lamp-N"],
    }


class FormationTests(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(MODULE.exists(), "claim-specific formation validator must exist")
        self.module = load_module()

    def test_valid_local_belief_formation(self):
        self.assertEqual(
            self.module.validate_formation_receipt(receipt(), projection_handoff=projection(), loadout_binding=binding()),
            [],
        )

    def test_identity_and_schema_failures_are_stable(self):
        cases = [
            (lambda r, p, b: r.update(schema="wrong"), "FORMATION_SCHEMA_INVALID"),
            (lambda r, p, b: p.update(schema="wrong"), "FORMATION_PROJECTION_SCHEMA_INVALID"),
            (lambda r, p, b: b.update(schema="wrong"), "FORMATION_BINDING_SCHEMA_INVALID"),
            (lambda r, p, b: r.update(mode="KNOW"), "FORMATION_MODE_INVALID"),
            (lambda r, p, b: r.update(actor_id="A"), "FORMATION_ACTOR_MISMATCH"),
            (lambda r, p, b: r.update(cut_id="A0"), "FORMATION_CUT_MISMATCH"),
            (lambda r, p, b: r.update(projection_digest="sha256:other"), "FORMATION_PROJECTION_MISMATCH"),
            (lambda r, p, b: r.update(evaluation_compile_id="C1"), "FORMATION_COMPILE_ID_MISMATCH"),
            (lambda r, p, b: r.update(evaluation_compile_digest="sha256:other"), "FORMATION_COMPILE_DIGEST_MISMATCH"),
            (lambda r, p, b: r.update(claim_id=""), "FORMATION_CLAIM_ID_REQUIRED"),
            (lambda r, p, b: r.update(formation_refs=[]), "FORMATION_REFS_REQUIRED"),
        ]
        for mutate, expected in cases:
            with self.subTest(expected=expected):
                r, p, b = receipt(), projection(), binding()
                mutate(r, p, b)
                errors = self.module.validate_formation_receipt(r, projection_handoff=p, loadout_binding=b)
                self.assertIn(expected, errors)

    def test_namespaces_resolve_only_inside_exact_projection(self):
        local = self.module.projection_formation_refs(projection())
        self.assertIn("contact:contact-lamp-N", local)
        self.assertIn("attention:attention-lamp-N", local)
        self.assertIn("decoder:decode-lamp-N", local)
        self.assertIn("stance:stance-lamp-N", local)
        self.assertIn("occurrence:lamp-flicker", local)
        self.assertIn("relevance:relevance-mirror-red-note", local)
        for foreign in [
            "occurrence:reader-margin-note",
            "occurrence:merge-read",
            "stance:stance-red-note-A1",
            "decoder:decode-red-note-A1",
        ]:
            with self.subTest(foreign=foreign):
                r = receipt()
                r["formation_refs"] = [foreign]
                errors = self.module.validate_formation_receipt(r, projection_handoff=projection(), loadout_binding=binding())
                self.assertIn("FORMATION_REF_OUTSIDE_PROJECTION", errors)

    def test_unknown_namespace_cannot_be_smuggled(self):
        r = receipt()
        r["formation_refs"] = ["reader:reader-margin-note"]
        errors = self.module.validate_formation_receipt(r, projection_handoff=projection(), loadout_binding=binding())
        self.assertIn("FORMATION_REF_NAMESPACE_INVALID", errors)


if __name__ == "__main__":
    unittest.main()
