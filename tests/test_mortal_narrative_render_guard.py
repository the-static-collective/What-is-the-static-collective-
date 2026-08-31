from __future__ import annotations

import importlib
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MODULE = ROOT / "adapters" / "novelist" / "render_guard.py"


def proposal(*, beat_id="E8", uses=None) -> dict:
    return {
        "schema": "mortal_narrative.beat-proposal/v0",
        "beat_id": beat_id,
        "parent_beat_id": None,
        "actor_id": "A",
        "cut_id": "A0",
        "projection_digest": "sha256:a0",
        "evaluation_compile_id": "C0",
        "evaluation_compile_digest": "sha256:c0",
        "dramatic_destination": "open north",
        "epistemic_uses": list(uses or []),
        "non_epistemic_drivers": [{"kind": "wager", "ref": "x"}],
        "proposed_action": "open-north-door",
        "proposed_consequence": None,
    }


def evaluation(*, beat_id="E8") -> dict:
    return {
        "schema": "mortal_narrative.evaluation/v0",
        "beat_id": beat_id,
        "parent_beat_id": None,
        "actor_id": "A",
        "cut_id": "A0",
        "projection_digest": "sha256:a0",
        "evaluation_compile_id": "C0",
        "evaluation_compile_digest": "sha256:c0",
        "disposition": "narrative_admissible",
        "offending_uses": [],
        "unresolved_uses": [],
        "creative_authority": "NOVELIST",
    }


def render(*, render_id, beat_id, scope, claim_id, rendered_mode, causal_role) -> dict:
    return {
        "schema": "mortal_narrative.render/v0",
        "render_id": render_id,
        "beat_id": beat_id,
        "actor_id": "A",
        "cut_id": "A0",
        "projection_digest": "sha256:a0",
        "assertions": [
            {
                "scope": scope,
                "claim_id": claim_id,
                "rendered_mode": rendered_mode,
                "causal_role": causal_role,
            }
        ],
    }


class RenderGuardTests(unittest.TestCase):
    def setUp(self) -> None:
        self.assertTrue(MODULE.exists(), "structured render guard must exist")
        sys.path.insert(0, str(ROOT))
        try:
            self.module = importlib.import_module("adapters.novelist.render_guard")
            self.module = importlib.reload(self.module)
        finally:
            sys.path.remove(str(ROOT))

    def test_guess_cannot_render_as_character_know(self):
        use = {"claim_id": "Q5", "requested_mode": "GUESS", "formation_receipt_id": None}
        p = proposal(uses=[use])
        bad = render(render_id="R1", beat_id="E8", scope="character", claim_id="Q5", rendered_mode="KNOW", causal_role="character-action-basis")
        result = self.module.check_render_receipt(p, evaluation(), bad)
        self.assertEqual(result["status"], "fail")
        self.assertIn("CHARACTER_MODE_ESCALATION", result["violations"])

        lawful = render(render_id="R0", beat_id="E8", scope="character", claim_id="Q5", rendered_mode="GUESS", causal_role="character-action-basis")
        self.assertEqual(self.module.check_render_receipt(p, evaluation(), lawful)["status"], "pass")

    def test_reader_exposition_is_allowed_but_reader_causality_is_not(self):
        p = proposal(beat_id="E2")
        e = evaluation(beat_id="E2")
        exposition = render(render_id="R2", beat_id="E2", scope="reader", claim_id="Q1", rendered_mode="KNOW", causal_role="exposition")
        self.assertEqual(self.module.check_render_receipt(p, e, exposition)["status"], "pass")

        leak = render(render_id="R3", beat_id="E2", scope="reader", claim_id="Q1", rendered_mode="KNOW", causal_role="character-action-basis")
        result = self.module.check_render_receipt(p, e, leak)
        self.assertEqual(result["status"], "fail")
        self.assertIn("NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS", result["violations"])

    def test_narrator_knowledge_cannot_drive_character_action(self):
        p = proposal(beat_id="E2")
        e = evaluation(beat_id="E2")
        leak = render(render_id="R4", beat_id="E2", scope="narrator", claim_id="Q1", rendered_mode="KNOW", causal_role="character-action-basis")
        result = self.module.check_render_receipt(p, e, leak)
        self.assertEqual(result["status"], "fail")
        self.assertIn("NONCHARACTER_KNOWLEDGE_USED_AS_CHARACTER_BASIS", result["violations"])

    def test_render_requires_admissible_exact_identity(self):
        p = proposal()
        e = evaluation()
        r = render(render_id="R1", beat_id="E8", scope="character", claim_id="Q5", rendered_mode="GUESS", causal_role="character-action-basis")
        for field, value in [("beat_id", "OTHER"), ("actor_id", "B"), ("cut_id", "A1"), ("projection_digest", "sha256:other")]:
            with self.subTest(field=field):
                bad = dict(r)
                bad[field] = value
                with self.assertRaisesRegex(self.module.NarrativeInputError, "RENDER_IDENTITY_MISMATCH"):
                    self.module.check_render_receipt(p, e, bad)
        nonadmissible = dict(e)
        nonadmissible["disposition"] = "reroute_required"
        with self.assertRaisesRegex(self.module.NarrativeInputError, "RENDER_REQUIRES_ADMISSIBLE_BEAT"):
            self.module.check_render_receipt(p, nonadmissible, r)


if __name__ == "__main__":
    unittest.main()
