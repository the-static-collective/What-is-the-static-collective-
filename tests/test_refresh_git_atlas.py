"""Check that public projection and branch/PR identity boundaries survive."""

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


if __name__ == "__main__":
    unittest.main()
