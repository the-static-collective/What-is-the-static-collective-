from __future__ import annotations

import importlib.util
import json
import subprocess
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "tools" / "run_mortal_narrative_blind_proof.py"
NARRATIVE = ROOT / "specimens" / "mortal-narrative-001"
ACTOR = ROOT / "specimens" / "mortal-actor-001"


def load_module():
    spec = importlib.util.spec_from_file_location("mortal_narrative_blind", MODULE)
    if spec is None or spec.loader is None:
        raise RuntimeError("blind runner load failed")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def actor_run(*, actor="A", cut="A0", projection_digest="sha256:a0", compile_id="C0", compile_digest="sha256:c0") -> dict:
    return {
        "actor_id": actor,
        "cut_id": cut,
        "projection_handoff": {
            "schema": "mortal_actor.3rdi-handoff/v0",
            "projection_digest": projection_digest,
            "field_id": "four-witnesses-one-room",
            "cut_id": cut,
            "observer": actor,
            "visible_occurrence_ids": ["lamp-flicker"] if actor == "N" else [],
            "visible_causal_edge_ids": [],
            "visible_relevance_edge_ids": [],
            "contact_ids": ["contact-lamp-N"] if actor == "N" else [],
            "attention_event_ids": ["attention-lamp-N"] if actor == "N" else [],
            "decoder_application_ids": ["decode-lamp-N"] if actor == "N" else [],
            "stance_ids": ["stance-lamp-N"] if actor == "N" else [],
        },
        "loadout_binding": {
            "schema": "mortal_actor.loadout-binding/v0",
            "actor_id": actor,
            "projection_ref": projection_digest,
            "evaluation_compile_id": compile_id,
            "evaluation_compile_digest": compile_digest,
            "authority_expanded": False,
            "side_effect_executed": False,
        },
        "alex_results": {},
    }


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


class BlindProofTests(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(MODULE.exists(), "blind Gate-E runner must exist")
        self.module = load_module()

    def test_direct_script_invocation_can_import_neutral_adapter(self):
        completed = subprocess.run(
            [sys.executable, str(MODULE), "--help"],
            cwd=ROOT,
            text=True,
            capture_output=True,
            check=False,
        )
        self.assertEqual(completed.returncode, 0, completed.stderr)
        self.assertIn("MORTAL-NARRATIVE-001", completed.stdout)

    def test_materialization_copies_exact_mortal_identity(self):
        manifest = load_json(NARRATIVE / "manifest.json")
        beats = load_json(NARRATIVE / manifest["beat_templates_ref"])["beats"]
        formations = load_json(NARRATIVE / manifest["formation_templates_ref"])["formations"]
        renders = load_json(NARRATIVE / manifest["render_templates_ref"])["renders"]
        e1_template = next(item for item in beats if item["beat_id"] == "E1")
        run = actor_run()
        e1 = self.module.materialize_beat(e1_template, run)
        self.assertEqual(e1["actor_id"], "A")
        self.assertEqual(e1["cut_id"], "A0")
        self.assertEqual(e1["projection_digest"], "sha256:a0")
        self.assertEqual(e1["evaluation_compile_id"], "C0")
        self.assertEqual(e1["evaluation_compile_digest"], "sha256:c0")

        n = actor_run(actor="N", cut="N0", projection_digest="sha256:n0")
        formation = self.module.materialize_formation(formations[0], n)
        self.assertEqual(formation["actor_id"], "N")
        self.assertEqual(formation["claim_id"], "Q2")
        self.assertEqual(formation["formation_refs"], ["decoder:decode-lamp-N", "stance:stance-lamp-N"])

        r2_template = next(item for item in renders if item["render_id"] == "R2")
        render = self.module.materialize_render(r2_template, e1 | {"beat_id": "E2"})
        self.assertEqual(render["beat_id"], "E2")
        self.assertEqual(render["actor_id"], e1["actor_id"])
        self.assertEqual(render["projection_digest"], e1["projection_digest"])

    def test_canonical_digest_is_order_independent_for_object_keys(self):
        a = {"b": 2, "a": [1, 3]}
        b = {"a": [1, 3], "b": 2}
        self.assertEqual(self.module._sha256_json(a), self.module._sha256_json(b))
        self.assertTrue(self.module._sha256_json(a).startswith("sha256:"))

    def test_score_proves_all_gate_e_controls(self):
        narrative_manifest = load_json(NARRATIVE / "manifest.json")
        oracle = load_json(NARRATIVE / narrative_manifest["oracle_ref"])
        templates = {item["beat_id"]: item for item in load_json(NARRATIVE / narrative_manifest["beat_templates_ref"])["beats"]}

        runs = {
            "MA-A-A0": actor_run(),
            "MA-A-A1": actor_run(cut="A1", projection_digest="sha256:a1", compile_id="C1", compile_digest="sha256:c1"),
            "MA-N-N0": actor_run(actor="N", cut="N0", projection_digest="sha256:n0"),
            "MA-R-R0": actor_run(actor="R", cut="R0", projection_digest="sha256:r0"),
        }
        beats = {}
        for beat_id, expected in oracle["expected_beats"].items():
            template = templates[beat_id]
            p = self.module.materialize_beat(template, runs[template["run_id"]])
            beats[beat_id] = {
                "proposal": p,
                "evaluation": {
                    "schema": "mortal_narrative.evaluation/v0",
                    "beat_id": beat_id,
                    "actor_id": p["actor_id"],
                    "cut_id": p["cut_id"],
                    "projection_digest": p["projection_digest"],
                    "evaluation_compile_id": p["evaluation_compile_id"],
                    "evaluation_compile_digest": p["evaluation_compile_digest"],
                    "disposition": expected,
                },
            }
        render_checks = {
            rid: {"schema": "mortal_narrative.render-check/v0", "render_id": rid, "status": expected, "violations": []}
            for rid, expected in oracle["expected_renders"].items()
        }
        receipt = {
            "schema": "mortal_narrative.blind-case-receipt/v0",
            "vector_id": narrative_manifest["vector_id"],
            "actor_case": {"runs": runs},
            "formations": {},
            "beats": beats,
            "render_checks": render_checks,
            "case_receipt_digest": "sha256:test",
        }
        score = self.module.score_case(narrative_vector_root=NARRATIVE, actor_vector_root=ACTOR, case_receipt=receipt)
        self.assertEqual(score["status"], "pass")
        self.assertEqual(score["mismatches"], [])
        self.assertTrue(score["same_action_different_basis_control"])
        self.assertTrue(score["later_cut_without_rewrite_control"])
        self.assertTrue(score["local_false_belief_control"])
        self.assertTrue(score["reader_irony_control"])
        self.assertTrue(score["narrator_boundary_control"])
        self.assertTrue(score["render_mode_control"])
        self.assertTrue(score["no_authority_expansion"])
        self.assertTrue(score["no_side_effects"])
        self.assertEqual(score["beat_evaluation_count"], 8)
        self.assertEqual(score["render_check_count"], 4)

    def test_score_fails_when_same_action_reroute_ancestry_is_broken(self):
        narrative_manifest = load_json(NARRATIVE / "manifest.json")
        oracle = load_json(NARRATIVE / narrative_manifest["oracle_ref"])
        templates = {item["beat_id"]: item for item in load_json(NARRATIVE / narrative_manifest["beat_templates_ref"])["beats"]}
        runs = {
            "MA-A-A0": actor_run(),
            "MA-A-A1": actor_run(cut="A1", projection_digest="sha256:a1", compile_id="C1", compile_digest="sha256:c1"),
            "MA-N-N0": actor_run(actor="N", cut="N0", projection_digest="sha256:n0"),
            "MA-R-R0": actor_run(actor="R", cut="R0", projection_digest="sha256:r0"),
        }
        beats = {}
        for beat_id, expected in oracle["expected_beats"].items():
            template = dict(templates[beat_id])
            if beat_id == "E2":
                template["parent_beat_id"] = None
            p = self.module.materialize_beat(template, runs[template["run_id"]])
            beats[beat_id] = {"proposal": p, "evaluation": {"disposition": expected}}
        receipt = {
            "actor_case": {"runs": runs},
            "beats": beats,
            "render_checks": {rid: {"status": expected} for rid, expected in oracle["expected_renders"].items()},
            "case_receipt_digest": "sha256:test",
        }
        score = self.module.score_case(narrative_vector_root=NARRATIVE, actor_vector_root=ACTOR, case_receipt=receipt)
        self.assertEqual(score["status"], "fail")
        self.assertFalse(score["same_action_different_basis_control"])


if __name__ == "__main__":
    unittest.main()
