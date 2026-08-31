from __future__ import annotations

import copy
import importlib
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "adapters" / "novelist" / "evaluator.py"


def projection(*, actor="A", cut="A0", digest="sha256:a0") -> dict:
    return {
        "schema": "mortal_actor.3rdi-handoff/v0",
        "projection_digest": digest,
        "field_id": "four-witnesses-one-room",
        "cut_id": cut,
        "observer": actor,
        "visible_occurrence_ids": [],
        "visible_causal_edge_ids": [],
        "visible_relevance_edge_ids": [],
        "contact_ids": [],
        "attention_event_ids": [],
        "decoder_application_ids": [],
        "stance_ids": [],
    }


def binding(*, actor="A", digest="sha256:a0", compile_id="C0", compile_digest="sha256:c0") -> dict:
    return {
        "schema": "mortal_actor.loadout-binding/v0",
        "actor_id": actor,
        "projection_ref": digest,
        "evaluation_compile_id": compile_id,
        "evaluation_compile_digest": compile_digest,
        "authority_expanded": False,
        "side_effect_executed": False,
    }


def proposal(*, actor="A", cut="A0", digest="sha256:a0", compile_id="C0", compile_digest="sha256:c0", uses=None, drivers=None) -> dict:
    return {
        "schema": "mortal_narrative.beat-proposal/v0",
        "beat_id": "B1",
        "parent_beat_id": None,
        "actor_id": actor,
        "cut_id": cut,
        "projection_digest": digest,
        "evaluation_compile_id": compile_id,
        "evaluation_compile_digest": compile_digest,
        "dramatic_destination": "open the north door",
        "epistemic_uses": list(uses or []),
        "non_epistemic_drivers": list(drivers or []),
        "proposed_action": "open-north-door",
        "proposed_consequence": None,
    }


def alex(*, claim="Q5", actor="A", cut="A0", digest="sha256:a0", compile_id="C0", compile_digest="sha256:c0", disposition="basis_outside_projection") -> dict:
    return {
        "claim_id": claim,
        "observer": actor,
        "cut_id": cut,
        "projection_digest": digest,
        "compile_id": compile_id,
        "compile_digest": compile_digest,
        "local_disposition": disposition,
        "reason_code": None,
    }


def belief() -> dict:
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


def n_projection() -> dict:
    value = projection(actor="N", cut="N0", digest="sha256:n0")
    value["decoder_application_ids"] = ["decode-lamp-N"]
    value["stance_ids"] = ["stance-lamp-N"]
    return value


def all_keys(value):
    if isinstance(value, dict):
        for key, child in value.items():
            yield key
            yield from all_keys(child)
    elif isinstance(value, list):
        for child in value:
            yield from all_keys(child)


class EvaluatorTests(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(MODULE.exists(), "four-mode narrative evaluator must exist")
        sys.path.insert(0, str(ROOT))
        try:
            self.module = importlib.import_module("adapters.novelist.evaluator")
            self.module = importlib.reload(self.module)
        finally:
            sys.path.remove(str(ROOT))

    def evaluate(self, p, proj, bind, alex_results=None, formations=None):
        return self.module.evaluate_beat_proposal(
            p,
            projection_handoff=proj,
            loadout_binding=bind,
            alex_results=alex_results or {},
            formation_receipts=formations or {},
        )

    def test_know_maps_local_support_without_re_evaluating_evidence(self):
        use = {"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": None}
        p = proposal(uses=[use])
        self.assertEqual(self.evaluate(p, projection(), binding(), {"Q5": alex(disposition="basis_outside_projection")})["disposition"], "reroute_required")

        p1 = proposal(cut="A1", digest="sha256:a1", compile_id="C1", compile_digest="sha256:c1", uses=[use])
        proj1 = projection(cut="A1", digest="sha256:a1")
        bind1 = binding(digest="sha256:a1", compile_id="C1", compile_digest="sha256:c1")
        a1 = alex(cut="A1", digest="sha256:a1", compile_id="C1", compile_digest="sha256:c1", disposition="local_basis_accept")
        self.assertEqual(self.evaluate(p1, proj1, bind1, {"Q5": a1})["disposition"], "narrative_admissible")

        q4 = {"claim_id": "Q4", "requested_mode": "KNOW", "formation_receipt_id": None}
        p4 = proposal(uses=[q4])
        self.assertEqual(self.evaluate(p4, projection(), binding(), {"Q4": alex(claim="Q4", disposition="local_basis_unresolved")})["disposition"], "narrative_unresolved")

    def test_believe_and_suspect_require_claim_specific_formation(self):
        use = {"claim_id": "Q2", "requested_mode": "BELIEVE", "formation_receipt_id": "BELIEF-N-Q2"}
        p = proposal(actor="N", cut="N0", digest="sha256:n0", uses=[use])
        bind = binding(actor="N", digest="sha256:n0")
        result = self.evaluate(p, n_projection(), bind, formations={"BELIEF-N-Q2": belief()})
        self.assertEqual(result["disposition"], "narrative_admissible")

        missing = copy.deepcopy(p)
        missing["epistemic_uses"][0]["formation_receipt_id"] = None
        self.assertEqual(self.evaluate(missing, n_projection(), bind)["disposition"], "narrative_unresolved")

        suspect = proposal(uses=[{"claim_id": "Q3", "requested_mode": "SUSPECT", "formation_receipt_id": None}])
        self.assertEqual(self.evaluate(suspect, projection(), binding())["disposition"], "narrative_unresolved")

        wrong = copy.deepcopy(p)
        wrong["epistemic_uses"][0]["claim_id"] = "Q3"
        with self.assertRaisesRegex(self.module.NarrativeInputError, "FORMATION_BINDING_MISMATCH"):
            self.evaluate(wrong, n_projection(), bind, formations={"BELIEF-N-Q2": belief()})

    def test_guess_needs_non_epistemic_driver_but_no_evidence(self):
        use = {"claim_id": "Q5", "requested_mode": "GUESS", "formation_receipt_id": None}
        driven = proposal(uses=[use], drivers=[{"kind": "wager", "ref": "choose-under-uncertainty"}])
        self.assertEqual(self.evaluate(driven, projection(), binding())["disposition"], "narrative_admissible")
        bare = proposal(uses=[use])
        self.assertEqual(self.evaluate(bare, projection(), binding())["disposition"], "narrative_unresolved")
        action_only = proposal(drivers=[{"kind": "pressure", "ref": "clock-running"}])
        self.assertEqual(self.evaluate(action_only, projection(), binding())["disposition"], "narrative_admissible")

    def test_exact_identity_mismatch_is_input_error_not_reroute(self):
        use = {"claim_id": "Q5", "requested_mode": "KNOW", "formation_receipt_id": None}
        mutations = [
            ("actor_id", "B"),
            ("cut_id", "A1"),
            ("projection_digest", "sha256:other"),
            ("evaluation_compile_id", "C1"),
            ("evaluation_compile_digest", "sha256:other"),
        ]
        for field, value in mutations:
            with self.subTest(field=field):
                p = proposal(uses=[use])
                p[field] = value
                with self.assertRaises(self.module.NarrativeInputError):
                    self.evaluate(p, projection(), binding(), {"Q5": alex()})

        bad_alex = alex(actor="B")
        with self.assertRaisesRegex(self.module.NarrativeInputError, "ALEX_IDENTITY_MISMATCH"):
            self.evaluate(proposal(uses=[use]), projection(), binding(), {"Q5": bad_alex})

    def test_unsupported_mode_is_input_error(self):
        p = proposal(uses=[{"claim_id": "Q5", "requested_mode": "OMNISCIENT", "formation_receipt_id": None}])
        with self.assertRaisesRegex(self.module.NarrativeInputError, "EPISTEMIC_MODE_INVALID"):
            self.evaluate(p, projection(), binding())

    def test_output_has_no_authority_or_truth_semantics(self):
        p = proposal(drivers=[{"kind": "wager", "ref": "x"}])
        result = self.evaluate(p, projection(), binding())
        forbidden = {"truth", "canon", "admitted", "authorized", "publication", "side_effect", "world_write"}
        self.assertTrue(forbidden.isdisjoint(set(all_keys(result))))

    def test_neutral_adapter_import_isolation(self):
        for path in (ROOT / "adapters" / "novelist").glob("*.py"):
            text = path.read_text(encoding="utf-8")
            for forbidden in ("three_rdi", "alex_runtime", "skills.loadout", "MEMENTO", "eCODE"):
                self.assertNotIn(forbidden, text, f"{path.name} imports/references {forbidden}")


if __name__ == "__main__":
    unittest.main()
