from __future__ import annotations

import copy
import importlib.util
import json
import shutil
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
VECTOR = ROOT / "specimens" / "mortal-narrative-001"
VERIFY = ROOT / "tools" / "verify_mortal_narrative_vector.py"

EXPECTED = {
    "E1": "reroute_required",
    "E2": "narrative_admissible",
    "E3": "narrative_admissible",
    "E4": "reroute_required",
    "E5": "narrative_admissible",
    "E6": "narrative_unresolved",
    "E7": "narrative_unresolved",
    "E8": "narrative_admissible",
}
EXPECTED_RENDER = {"R1": "fail", "R2": "pass", "R3": "fail", "R4": "fail"}


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def load_verifier():
    spec = importlib.util.spec_from_file_location("mortal_narrative_verify", VERIFY)
    if spec is None or spec.loader is None:
        raise RuntimeError("verifier load failed")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


class MortalNarrativeVectorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(VECTOR.exists(), "Gate-E vector must exist")
        self.assertTrue(VERIFY.exists(), "Gate-E verifier must exist")

    def docs(self):
        manifest = load_json(VECTOR / "manifest.json")
        beats = load_json(VECTOR / manifest["beat_templates_ref"])
        formations = load_json(VECTOR / manifest["formation_templates_ref"])
        renders = load_json(VECTOR / manifest["render_templates_ref"])
        oracle = load_json(VECTOR / manifest["oracle_ref"])
        return manifest, beats, formations, renders, oracle

    def test_exact_candidate_matrix(self):
        manifest, beat_doc, _, _, oracle = self.docs()
        beats = {item["beat_id"]: item for item in beat_doc["beats"]}
        self.assertEqual(manifest["vector_id"], "THE-PERFECT-SCENE-THAT-CHEATS-001")
        self.assertEqual(oracle["expected_beats"], EXPECTED)
        self.assertEqual(beats["E1"]["run_id"], "MA-A-A0")
        self.assertEqual(
            beats["E1"]["epistemic_uses"],
            [{"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": None}],
        )
        self.assertEqual(beats["E2"]["parent_beat_id"], "E1")
        self.assertEqual(beats["E2"]["proposed_action"], beats["E1"]["proposed_action"])
        self.assertEqual(beats["E2"]["epistemic_uses"], [])
        self.assertTrue(beats["E2"]["non_epistemic_drivers"])
        self.assertEqual(beats["E3"]["run_id"], "MA-A-A1")
        self.assertEqual(beats["E5"]["run_id"], "MA-N-N0")
        self.assertEqual(beats["E5"]["epistemic_uses"][0]["formation_receipt_id"], "BELIEF-N-Q2")

    def test_exact_formation_and_render_controls(self):
        _, _, formation_doc, render_doc, oracle = self.docs()
        formations = {item["formation_id"]: item for item in formation_doc["formations"]}
        renders = {item["render_id"]: item for item in render_doc["renders"]}
        self.assertEqual(
            formations["BELIEF-N-Q2"]["formation_refs"],
            ["decoder:decode-lamp-N", "stance:stance-lamp-N"],
        )
        self.assertEqual(oracle["expected_renders"], EXPECTED_RENDER)
        self.assertEqual(renders["R1"]["beat_id"], "E8")
        self.assertEqual(renders["R1"]["assertions"][0]["rendered_mode"], "KNOW")
        self.assertEqual(renders["R2"]["assertions"][0]["causal_role"], "exposition")
        self.assertEqual(renders["R3"]["assertions"][0]["causal_role"], "character-action-basis")
        self.assertEqual(renders["R4"]["assertions"][0]["scope"], "narrator")

    def test_verifier_accepts_clean_vector(self):
        module = load_verifier()
        self.assertEqual(module.verify_vector(VECTOR), [])

    def test_hostile_mutations_are_rejected(self):
        module = load_verifier()
        mutations = []

        def mutate_e2_parent(root: Path):
            path = root / "case" / "beat-templates.json"
            data = load_json(path)
            next(item for item in data["beats"] if item["beat_id"] == "E2")["parent_beat_id"] = None
            path.write_text(json.dumps(data), encoding="utf-8")
        mutations.append(mutate_e2_parent)

        def mutate_e2_action(root: Path):
            path = root / "case" / "beat-templates.json"
            data = load_json(path)
            next(item for item in data["beats"] if item["beat_id"] == "E2")["proposed_action"] = "open-south-door"
            path.write_text(json.dumps(data), encoding="utf-8")
        mutations.append(mutate_e2_action)

        def mutate_formation(root: Path):
            path = root / "case" / "formation-templates.json"
            data = load_json(path)
            data["formations"][0]["claim_id"] = "Q3"
            path.write_text(json.dumps(data), encoding="utf-8")
        mutations.append(mutate_formation)

        def mutate_render(root: Path):
            path = root / "case" / "render-templates.json"
            data = load_json(path)
            next(item for item in data["renders"] if item["render_id"] == "R3")["assertions"][0]["causal_role"] = "exposition"
            path.write_text(json.dumps(data), encoding="utf-8")
        mutations.append(mutate_render)

        for mutator in mutations:
            with self.subTest(mutator=mutator.__name__), tempfile.TemporaryDirectory() as tmp:
                clone = Path(tmp) / "vector"
                shutil.copytree(VECTOR, clone)
                mutator(clone)
                self.assertTrue(module.verify_vector(clone), mutator.__name__)


if __name__ == "__main__":
    unittest.main()
