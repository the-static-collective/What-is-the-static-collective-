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


if __name__ == "__main__":
    unittest.main()
