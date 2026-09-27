"""Check that public projection and branch/PR identity boundaries survive."""

import copy
import importlib.util
import unittest
from pathlib import Path

MODULE = Path(__file__).resolve().parents[1] / "scripts" / "refresh_git_atlas.py"
spec = importlib.util.spec_from_file_location("refresh_git_atlas", MODULE)
atlas = importlib.util.module_from_spec(spec)
spec.loader.exec_module(atlas)


def fixture():
    return {
        "owner": "the-static-collective",
        "repositories": [{
            "name": "Example", "visibility": "public", "default_branch": "main",
            "archived": False,
            "branches": [
                {"name": "main", "sha": "a" * 40},
                {"name": "side", "sha": "b" * 40},
            ],
            "open_prs": [{
                "number": 3, "title": "Experiment", "head_branch": "side",
                "head_sha": "b" * 40, "head_repo": "the-static-collective/Example",
                "base_branch": "main", "updated_at": "2026-09-25T00:00:00Z",
                "url": "https://github.com/the-static-collective/Example/pull/3",
            }],
        }],
    }


class AtlasBoundaries(unittest.TestCase):
    def test_private_repo_is_rejected_before_render(self):
        source = fixture()
        source["repositories"][0]["visibility"] = "private"
        with self.assertRaises(ValueError):
            atlas.normalize(source, "the-static-collective")

    def test_open_pr_only_attaches_to_exact_local_head(self):
        repo = atlas.normalize(fixture(), "the-static-collective")["repositories"][0]
        side = next(b for b in repo["branches"] if b["name"] == "side")
        self.assertIn("open PR #3", atlas.branch_status(repo, side, "the-static-collective"))
        repo["open_prs"][0]["head_sha"] = "c" * 40
        self.assertIn("unverified", atlas.branch_status(repo, side, "the-static-collective"))
        repo["open_prs"][0]["head_sha"] = "b" * 40
        repo["open_prs"][0]["head_repo"] = "somewhere-else/Example"
        self.assertIn("unverified", atlas.branch_status(repo, side, "the-static-collective"))

    def test_unplaced_new_repo_stays_visible(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        groups = atlas.category_sets({"constellations": []}, snapshot)
        self.assertEqual([repo["name"] for repo in groups[-1][1]], ["Example"])

    def test_missing_curated_public_repo_requires_review(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        catalog = {"constellations": [{"slug": "old", "name": "Old",
                                      "repositories": ["PreviouslyPublic"]}]}
        with self.assertRaises(ValueError):
            atlas.category_sets(catalog, snapshot)


    def test_delta_keeps_observation_separate_from_disposition(self):
        before = atlas.normalize(fixture(), "the-static-collective")
        before["captured_at"] = "2026-09-25T00:00:00+00:00"
        after = copy.deepcopy(before)
        after["captured_at"] = "2026-09-26T00:00:00+00:00"
        repo = after["repositories"][0]
        next(branch for branch in repo["branches"] if branch["name"] == "side")["sha"] = "c" * 40
        repo["branches"].append({"name": "new-door", "sha": "d" * 40})
        repo["open_prs"] = [{
            "number": 4, "title": "Next experiment", "head_branch": "new-door",
            "head_sha": "d" * 40, "head_repo": "the-static-collective/Example",
            "base_branch": "main", "updated_at": "2026-09-26T00:00:00Z",
            "url": "https://github.com/the-static-collective/Example/pull/4",
        }]

        delta = atlas.topology_delta(before, after)
        self.assertEqual(delta["added_branches"][0]["branch"], "new-door")
        self.assertEqual(delta["moved_branch_heads"][0]["branch"], "side")
        self.assertEqual(delta["opened_prs"][0]["number"], 4)
        self.assertEqual(delta["left_open_prs"][0]["number"], 3)
        self.assertNotIn("merged", atlas.render_delta(delta).lower().split(
            "a pr leaving the open set does not by itself prove", 1)[1].split(
            "whether it", 1)[0])

    def test_relation_catalog_requires_visible_endpoints(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        valid = {
            "schema": "static-git-atlas/relations-v1",
            "relations": [{
                "id": "example-self-witness",
                "from_repo": "Example", "to_repo": "Example",
                "relation": "test witness", "direction": "directed",
                "status": "observed", "authority_owner": "Example",
                "source_url": "https://github.com/the-static-collective/Example",
                "note": "Fixture only.", "residual_fog": "None asserted.",
            }],
        }
        self.assertEqual(
            atlas.validate_relations(valid, snapshot)[0]["id"],
            "example-self-witness")
        invalid = copy.deepcopy(valid)
        invalid["relations"][0]["to_repo"] = "PrivateOrMissing"
        with self.assertRaises(ValueError):
            atlas.validate_relations(invalid, snapshot)

    def test_relation_catalog_does_not_accept_unknown_status(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/relations-v1",
            "relations": [{
                "id": "bad-status",
                "from_repo": "Example", "to_repo": "Example",
                "relation": "test", "direction": "directed",
                "status": "canon-because-machine-said-so",
                "authority_owner": "Example",
                "source_url": "https://github.com/the-static-collective/Example",
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_relations(raw, snapshot)


    def test_recovery_requires_visible_body_and_preserves_unknown(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "example-recovery",
                "repositories": ["Example"],
                "reviewed_on": "2026-09-27",
                "signals": ["implementation_body", "disposition_fog"],
                "body_claim": "A runnable body survives.",
                "purpose_claim": "INFERENCE: it tested a bounded question.",
                "last_witnessed_change": "A cited commit changed the body.",
                "disposition": "UNKNOWN — no public disposition was found.",
                "reentry_door": "Read the owning source first.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
            }],
        }
        recovered = atlas.validate_recovery(raw, snapshot)
        rendered = atlas.render_recovery(recovered, snapshot)
        self.assertIn("UNKNOWN", rendered)
        self.assertIn("quiet != dead", rendered)

    def test_recovery_rejects_missing_repository(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "missing-recovery",
                "repositories": ["NotPublicHere"],
                "reviewed_on": "2026-09-27",
                "signals": ["implementation_body"],
                "body_claim": "body",
                "purpose_claim": "purpose",
                "last_witnessed_change": "change",
                "disposition": "UNKNOWN",
                "reentry_door": "door",
                "evidence_urls": ["https://example.com/evidence"],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery(raw, snapshot)


    def test_recovery_seed_stays_distinct_from_recovered_body(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "seeds": [{
                "id": "example-seed",
                "repository": "Example",
                "reviewed_on": "2026-09-27",
                "signals": ["repository_shell", "origin_needed"],
                "observed_public_state": "Only a shell is publicly visible.",
                "residual_fog": "Original particular is not established.",
                "next_recovery_action": "Find an owner witness.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
            }],
        }
        recovered = atlas.validate_recovery(raw, snapshot)
        seeds = atlas.validate_recovery_seeds(raw, snapshot)
        self.assertEqual(recovered, [])
        self.assertEqual(seeds[0]["repository"], "Example")
        rendered = atlas.render_recovery(recovered, snapshot, seeds)
        self.assertIn("Surveyed seeds", rendered)
        self.assertIn("Original particular is not established.", rendered)

    def test_recovery_seed_rejects_missing_repository(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "seeds": [{
                "id": "missing-seed",
                "repository": "NotPublicHere",
                "reviewed_on": "2026-09-27",
                "signals": ["origin_needed"],
                "observed_public_state": "shell",
                "residual_fog": "fog",
                "next_recovery_action": "search",
                "evidence_urls": ["https://example.com/evidence"],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery_seeds(raw, snapshot)


    def test_recovery_review_is_observation_and_cannot_close_recovery(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "reviews": [{
                "id": "example-review",
                "repository": "Example",
                "reviewed_on": "2026-09-27",
                "result": "legible_reentry_observed",
                "scope": "current_aperture_only",
                "recovery_open": True,
                "note": "The current front door explains a usable re-entry path.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
            }],
        }
        reviews = atlas.validate_recovery_reviews(raw, snapshot)
        rendered = atlas.render_recovery([], snapshot, [], reviews)
        self.assertTrue(reviews[0]["recovery_open"])
        self.assertIn("current aperture observations", rendered)
        self.assertIn("current_aperture_only", rendered)
        self.assertIn("OPEN", rendered)
        self.assertIn("not historical reconstruction", rendered)
        self.assertIn("not proof of what an older connected", rendered)

    def test_recovery_review_rejects_old_terminal_label(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "reviews": [{
                "id": "bad-review",
                "repository": "Example",
                "reviewed_on": "2026-09-27",
                "result": "recovery_not_needed",
                "scope": "current_aperture_only",
                "recovery_open": True,
                "note": "Old terminal label must not survive.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery_reviews(raw, snapshot)

    def test_recovery_review_requires_open_recovery(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "reviews": [{
                "id": "closed-review",
                "repository": "Example",
                "reviewed_on": "2026-09-27",
                "result": "legible_reentry_observed",
                "scope": "current_aperture_only",
                "recovery_open": False,
                "note": "A current aperture cannot close historical recovery.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery_reviews(raw, snapshot)

    def test_translation_scar_preserves_tension_without_lineage(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "translation_scars": [{
                "id": "example-scar",
                "repositories": ["Example", "Example"],
                "reviewed_on": "2026-09-27",
                "evidence_grade": "aperture_tension_only",
                "historical_search_open": True,
                "observed_tension": "One source says stop; another body later exists.",
                "interpretation": "TRANSLATION SCAR — the history does not collapse cleanly.",
                "not_claimed": "No successor relation is asserted.",
                "reentry_question": "What changed in translation?",
                "evidence_urls": [
                    "https://github.com/the-static-collective/Example",
                    "https://github.com/the-static-collective/Example/tree/side",
                ],
            }],
        }
        scars = atlas.validate_translation_scars(raw, snapshot)
        rendered = atlas.render_recovery([], snapshot, [], [], scars)
        self.assertEqual(scars[0]["id"], "example-scar")
        self.assertIn("TRANSLATION SCARS", rendered)
        self.assertIn("aperture_tension_only", rendered)
        self.assertIn("No successor relation", rendered)


    def test_recovery_review_rejects_historical_scope_claim(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "reviews": [{
                "id": "overclaimed-review",
                "repository": "Example",
                "reviewed_on": "2026-09-27",
                "result": "legible_reentry_observed",
                "scope": "historical_truth",
                "recovery_open": True,
                "note": "A README cannot establish old connected history by itself.",
                "evidence_urls": ["https://github.com/the-static-collective/Example/blob/main/README.md"],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery_reviews(raw, snapshot)

    def test_translation_scar_cannot_close_historical_search(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [],
            "translation_scars": [{
                "id": "closed-scar",
                "repositories": ["Example", "Example"],
                "reviewed_on": "2026-09-27",
                "evidence_grade": "aperture_tension_only",
                "historical_search_open": False,
                "observed_tension": "Two current apertures differ.",
                "interpretation": "Tension only.",
                "not_claimed": "No historical handoff claimed.",
                "reentry_question": "What happened between them?",
                "evidence_urls": [
                    "https://github.com/the-static-collective/Example/blob/main/README.md",
                    "https://github.com/the-static-collective/Example/tree/side",
                ],
            }],
        }
        with self.assertRaises(ValueError):
            atlas.validate_translation_scars(raw, snapshot)


    def test_human_recovered_origin_stays_distinct_from_git_evidence(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "human-origin",
                "repositories": ["Example"],
                "reviewed_on": "2026-09-27",
                "signals": ["human_recovered_origin"],
                "body_claim": "A later body survives.",
                "purpose_claim": "Later manifestation differs from recovered origin.",
                "last_witnessed_change": "Later change.",
                "disposition": "UNKNOWN",
                "reentry_door": "Read body after recovered origin.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
                "human_recovered_context": {
                    "recorded_on": "2026-09-27",
                    "witness_type": "human_origin_recovery",
                    "claim": "The project began as a different connected thing.",
                    "corroboration_posture": "Linked Git sources corroborate adjacent manifestations but do not independently prove the origin chronology.",
                    "corroborating_urls": ["https://github.com/the-static-collective/Example/tree/side"]
                }
            }]
        }
        recovered = atlas.validate_recovery(raw, snapshot)
        rendered = atlas.render_recovery(recovered, snapshot)
        self.assertEqual(recovered[0]["human_recovered_context"]["witness_type"], "human_origin_recovery")
        self.assertIn("Human-recovered origin context", rendered)
        self.assertIn("do not independently prove", rendered)
        self.assertIn("Adjacent corroborating sources", rendered)

    def test_human_recovered_origin_requires_explicit_witness_type(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "bad-human-origin",
                "repositories": ["Example"],
                "reviewed_on": "2026-09-27",
                "signals": ["human_recovered_origin"],
                "body_claim": "body",
                "purpose_claim": "purpose",
                "last_witnessed_change": "change",
                "disposition": "UNKNOWN",
                "reentry_door": "door",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
                "human_recovered_context": {
                    "recorded_on": "2026-09-27",
                    "witness_type": "machine_inferred_origin",
                    "claim": "claim",
                    "corroboration_posture": "posture",
                    "corroborating_urls": []
                }
            }]
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery(raw, snapshot)


    def test_chat_history_recovery_preserves_user_turn_sequence(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "chat-history",
                "repositories": ["Example"],
                "reviewed_on": "2026-09-27",
                "signals": ["chat_history_recovered"],
                "body_claim": "Later body survives.",
                "purpose_claim": "Earlier idea was recovered from prior chat.",
                "last_witnessed_change": "Later change.",
                "disposition": "UNKNOWN",
                "reentry_door": "Read the chat lineage before the later README.",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
                "chat_history_recovery": {
                    "recovered_on": "2026-09-27",
                    "source_type": "prior_chat_recovery",
                    "posture": "Prior user turns witness proposal chronology without proving landed repository state.",
                    "compression": "print -> card -> game",
                    "events": [
                        {
                            "at": "2026-09-21T17:43:24Z",
                            "source_kind": "user_turn_recovered",
                            "detail": "Printable physical-media origin."
                        },
                        {
                            "at": "2026-09-21T17:50:59Z",
                            "source_kind": "user_turn_recovered",
                            "detail": "Card system named."
                        }
                    ]
                }
            }]
        }
        recovered = atlas.validate_recovery(raw, snapshot)
        rendered = atlas.render_recovery(recovered, snapshot)
        self.assertEqual(len(recovered[0]["chat_history_recovery"]["events"]), 2)
        self.assertIn("Recovered prior-chat lineage", rendered)
        self.assertIn("print -&gt; card -&gt; game", rendered)
        self.assertIn("2026-09-21T17:43:24Z", rendered)

    def test_chat_history_recovery_rejects_out_of_order_events(self):
        snapshot = atlas.normalize(fixture(), "the-static-collective")
        raw = {
            "schema": "static-git-atlas/recovery-v1",
            "entries": [{
                "id": "bad-chat-history",
                "repositories": ["Example"],
                "reviewed_on": "2026-09-27",
                "signals": ["chat_history_recovered"],
                "body_claim": "body",
                "purpose_claim": "purpose",
                "last_witnessed_change": "change",
                "disposition": "UNKNOWN",
                "reentry_door": "door",
                "evidence_urls": ["https://github.com/the-static-collective/Example"],
                "chat_history_recovery": {
                    "recovered_on": "2026-09-27",
                    "source_type": "prior_chat_recovery",
                    "posture": "posture",
                    "compression": "compression",
                    "events": [
                        {
                            "at": "2026-09-21T18:00:00Z",
                            "source_kind": "user_turn_recovered",
                            "detail": "later"
                        },
                        {
                            "at": "2026-09-21T17:00:00Z",
                            "source_kind": "user_turn_recovered",
                            "detail": "earlier"
                        }
                    ]
                }
            }]
        }
        with self.assertRaises(ValueError):
            atlas.validate_recovery(raw, snapshot)


if __name__ == "__main__":
    unittest.main()
