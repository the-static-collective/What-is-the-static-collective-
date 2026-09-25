#!/usr/bin/env python3
"""Refresh the public Git atlas without assigning authority to branch names.

The repository owner is a GitHub user. Its public repos are enumerated through
the public user endpoint. Private repositories must never enter these outputs.
Use --input for an offline, inspectable capture; omit it in GitHub Actions.
"""

import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parents[1]
CATALOG = ROOT / "atlas" / "constellations.json"
RELATIONS = ROOT / "atlas" / "relations.json"
OUTPUT = ROOT / "atlas" / "generated"
GITHUB = "https://github.com"
API = "https://api.github.com"
MAP_URL = "https://the-static-collective.gitbook.io/the-static-collective-docs/living-git-map/atlas"
TICK = chr(96)


def api_json(path, token):
    request = Request(
        API + path,
        headers={
            "Accept": "application/vnd.github+json",
            "User-Agent": "static-collective-public-git-atlas",
            **({"Authorization": "Bearer " + token} if token else {}),
        },
    )
    try:
        with urlopen(request, timeout=35) as response:
            return json.load(response)
    except HTTPError as exc:
        if exc.code == 409 and path.endswith("/git/refs/heads"):
            return []  # GitHub's response for an empty Git repository.
        raise RuntimeError(f"GitHub API returned {exc.code} for {path}") from exc


def pages(path, token):
    page = 1
    while True:
        separator = "&" if "?" in path else "?"
        result = api_json(f"{path}{separator}per_page=100&page={page}", token)
        if not isinstance(result, list):
            raise ValueError(f"Expected a paged list from {path}")
        yield from result
        if len(result) < 100:
            break
        page += 1


def fetch_public(owner, token):
    items = []
    for repo in pages(f"/users/{quote(owner)}/repos?type=public", token):
        # Never trust the query parameter as the privacy boundary.
        if repo.get("private") or repo.get("visibility") != "public":
            raise ValueError("GitHub returned a nonpublic repository")
        if repo.get("owner", {}).get("login", "").casefold() != owner.casefold():
            raise ValueError("GitHub returned a repository outside the owner")
        name = repo["name"]
        base = f"/repos/{quote(owner)}/{quote(name)}"
        refs = api_json(base + "/git/refs/heads", token)
        if not isinstance(refs, list):
            raise ValueError("Unexpected branch response for " + name)
        pulls = list(pages(base + "/pulls?state=open", token))
        items.append({
            "name": name,
            "visibility": "public",
            "default_branch": repo.get("default_branch"),
            "archived": bool(repo.get("archived")),
            "branches": [
                {"name": ref["ref"].removeprefix("refs/heads/"),
                 "sha": ref["object"]["sha"]}
                for ref in refs
            ],
            "open_prs": [
                {"number": pr["number"], "title": pr["title"],
                 "head_branch": pr["head"]["ref"],
                 "head_sha": pr["head"]["sha"],
                 "head_repo": (pr["head"].get("repo") or {}).get("full_name"),
                 "base_branch": pr["base"]["ref"],
                 "updated_at": pr["updated_at"],
                 "url": pr["html_url"]}
                for pr in pulls
            ],
        })
    return {"owner": owner, "observed_at": datetime.now(timezone.utc).isoformat(
        timespec="seconds"), "repositories": items}


def normalize(raw, owner):
    if raw.get("owner", "").casefold() != owner.casefold():
        raise ValueError("Inventory owner does not match the atlas owner")
    output, seen = [], set()
    for repo in raw["repositories"]:
        if repo.get("visibility") != "public":
            raise ValueError("Private or unverified repository in public atlas input")
        name = repo["name"]
        if name.casefold() in seen or "/" in name:
            raise ValueError("Duplicate or invalid repository name: " + name)
        seen.add(name.casefold())
        branches, refs = [], set()
        for branch in repo["branches"]:
            if branch["name"] in refs or not re.fullmatch(r"[0-9a-f]{40}", branch["sha"]):
                raise ValueError("Duplicate branch or invalid SHA in " + name)
            refs.add(branch["name"])
            branches.append({"name": branch["name"], "sha": branch["sha"]})
        prs, numbers = [], set()
        for pr in repo["open_prs"]:
            if pr["number"] in numbers:
                raise ValueError("Duplicate pull request in " + name)
            numbers.add(pr["number"])
            if pr["url"] != f"{GITHUB}/{owner}/{name}/pull/{pr['number']}":
                raise ValueError("Unexpected pull request URL in " + name)
            prs.append({key: pr.get(key) for key in (
                "number", "title", "head_branch", "head_sha", "head_repo",
                "base_branch", "updated_at", "url")})
        output.append({
            "name": name, "visibility": "public",
            "default_branch": repo.get("default_branch"),
            "archived": bool(repo.get("archived")),
            "branches": sorted(branches, key=lambda x: x["name"].casefold()),
            "open_prs": sorted(prs, key=lambda x: x["number"], reverse=True),
        })
    return {"schema": "static-git-atlas/public-v1", "owner": owner,
            "repositories": sorted(output, key=lambda x: x["name"].casefold())}


def category_sets(catalog, snapshot):
    by_name = {repo["name"]: repo for repo in snapshot["repositories"]}
    placed = set()
    groups = []
    for group in catalog["constellations"]:
        members = []
        for name in group["repositories"]:
            if name in placed:
                raise ValueError("Repository assigned twice: " + name)
            placed.add(name)
            if name not in by_name:
                raise ValueError("Curated public repository is missing; review its visibility or rename: " + name)
            members.append(by_name[name])
        groups.append((group, members))
    groups.append((
        {"slug": "unplaced", "name": "Unplaced public repositories",
         "description": "New or unclassified public repositories. Placement requires editorial review."},
        [repo for repo in snapshot["repositories"] if repo["name"] not in placed],
    ))
    return groups



def topology_delta(previous, current):
    """Describe public Git topology changes without interpreting their meaning."""
    previous = previous or {"repositories": []}
    old_repos = {repo["name"]: repo for repo in previous.get("repositories", [])}
    new_repos = {repo["name"]: repo for repo in current.get("repositories", [])}
    delta = {
        "schema": "static-git-atlas/delta-v1",
        "from_captured_at": previous.get("captured_at"),
        "to_captured_at": current.get("captured_at"),
        "added_repositories": sorted(set(new_repos) - set(old_repos), key=str.casefold),
        "removed_repositories": sorted(set(old_repos) - set(new_repos), key=str.casefold),
        "added_branches": [],
        "removed_branches": [],
        "moved_branch_heads": [],
        "opened_prs": [],
        "left_open_prs": [],
    }

    for name in sorted(set(old_repos) | set(new_repos), key=str.casefold):
        old_repo = old_repos.get(name, {"branches": [], "open_prs": []})
        new_repo = new_repos.get(name, {"branches": [], "open_prs": []})
        old_branches = {branch["name"]: branch["sha"] for branch in old_repo.get("branches", [])}
        new_branches = {branch["name"]: branch["sha"] for branch in new_repo.get("branches", [])}
        for branch in sorted(set(new_branches) - set(old_branches), key=str.casefold):
            delta["added_branches"].append(
                {"repository": name, "branch": branch, "sha": new_branches[branch]})
        for branch in sorted(set(old_branches) - set(new_branches), key=str.casefold):
            delta["removed_branches"].append(
                {"repository": name, "branch": branch, "sha": old_branches[branch]})
        for branch in sorted(set(old_branches) & set(new_branches), key=str.casefold):
            if old_branches[branch] != new_branches[branch]:
                delta["moved_branch_heads"].append({
                    "repository": name, "branch": branch,
                    "from_sha": old_branches[branch], "to_sha": new_branches[branch],
                })

        old_prs = {pr["number"]: pr for pr in old_repo.get("open_prs", [])}
        new_prs = {pr["number"]: pr for pr in new_repo.get("open_prs", [])}
        for number in sorted(set(new_prs) - set(old_prs)):
            pr = new_prs[number]
            delta["opened_prs"].append({
                "repository": name, "number": number, "title": pr["title"],
                "url": pr["url"], "head_branch": pr["head_branch"],
                "base_branch": pr["base_branch"],
            })
        for number in sorted(set(old_prs) - set(new_prs)):
            pr = old_prs[number]
            delta["left_open_prs"].append({
                "repository": name, "number": number, "title": pr["title"],
                "url": pr["url"], "head_branch": pr["head_branch"],
                "base_branch": pr["base_branch"],
            })
    return delta


def validate_relations(raw, snapshot):
    """Validate editorial edges against the currently public repository set."""
    if raw.get("schema") != "static-git-atlas/relations-v1":
        raise ValueError("Unsupported relation catalog schema")
    known = {repo["name"] for repo in snapshot["repositories"]}
    seen = set()
    allowed_status = {"declared", "observed", "inferred"}
    allowed_direction = {"directed", "symmetric"}
    relations = []
    for relation in raw.get("relations", []):
        relation_id = relation.get("id", "")
        if not relation_id or relation_id in seen:
            raise ValueError("Relation id must be nonempty and unique")
        seen.add(relation_id)
        for endpoint in ("from_repo", "to_repo"):
            if relation.get(endpoint) not in known:
                raise ValueError(
                    f"Relation {relation_id} references nonpublic or missing repo: "
                    f"{relation.get(endpoint)}")
        if relation.get("status") not in allowed_status:
            raise ValueError("Invalid relation status for " + relation_id)
        if relation.get("direction") not in allowed_direction:
            raise ValueError("Invalid relation direction for " + relation_id)
        if not str(relation.get("source_url", "")).startswith("https://"):
            raise ValueError("Relation source must be an HTTPS URL for " + relation_id)
        if not relation.get("authority_owner"):
            raise ValueError("Relation authority_owner is required for " + relation_id)
        relations.append({key: relation.get(key) for key in (
            "id", "from_repo", "to_repo", "relation", "direction", "status",
            "authority_owner", "source_url", "note", "residual_fog")})
    return relations


def render_delta(delta):
    counts = [
        ("Repositories added", len(delta["added_repositories"])),
        ("Repositories removed", len(delta["removed_repositories"])),
        ("Branches added", len(delta["added_branches"])),
        ("Branches removed", len(delta["removed_branches"])),
        ("Branch heads moved", len(delta["moved_branch_heads"])),
        ("PRs entering open set", len(delta["opened_prs"])),
        ("PRs leaving open set", len(delta["left_open_prs"])),
    ]
    lines = [
        "---",
        'description: "Machine-observed topology changes between two public Git atlas captures."',
        "---", "", "# DELTA — What moved?", "",
        "This lens reports set and pointer changes between the previous persisted public",
        "snapshot and the newest changed snapshot. It does **not** interpret why a branch",
        "moved or disappeared, and a PR leaving the open set does not by itself prove",
        "whether it merged, closed, or became unavailable.", "",
        f"From: **{md(delta.get('from_captured_at') or 'baseline')}**  ",
        f"To: **{md(delta.get('to_captured_at') or 'unknown')}**", "",
        "| Observed event | Count |", "| --- | ---: |",
    ]
    lines += [f"| {label} | {count} |" for label, count in counts]

    def heading(title):
        lines.extend(["", "## " + title, ""])

    heading("Repository set")
    if not delta["added_repositories"] and not delta["removed_repositories"]:
        lines.append("No repository membership changes in this delta.")
    for name in delta["added_repositories"]:
        lines.append(f"* **+ repo** [{md(name)}]({repository_url('the-static-collective', name)})")
    for name in delta["removed_repositories"]:
        lines.append(f"* **− repo** {md(name)}")

    heading("Branch set and pointer movement")
    branch_events = (delta["added_branches"] + delta["removed_branches"]
                     + delta["moved_branch_heads"])
    if not branch_events:
        lines.append("No branch additions, removals, or head movements in this delta.")
    for item in delta["added_branches"]:
        lines.append(
            f"* **+ branch** {md(item['repository'])} / "
            f"[{md(item['branch'])}]({branch_url('the-static-collective', item['repository'], item['branch'])}) "
            f"→ {TICK}{item['sha'][:10]}{TICK}")
    for item in delta["removed_branches"]:
        lines.append(
            f"* **− branch** {md(item['repository'])} / {md(item['branch'])} "
            f"(last observed {TICK}{item['sha'][:10]}{TICK})")
    for item in delta["moved_branch_heads"]:
        url = repository_url("the-static-collective", item["repository"])
        lines.append(
            f"* **↪ head** {md(item['repository'])} / {md(item['branch'])}: "
            f"[{item['from_sha'][:10]}]({url}/commit/{item['from_sha']}) → "
            f"[{item['to_sha'][:10]}]({url}/commit/{item['to_sha']})")

    heading("Open pull-request set")
    if not delta["opened_prs"] and not delta["left_open_prs"]:
        lines.append("No pull requests entered or left the open set in this delta.")
    for item in delta["opened_prs"]:
        lines.append(
            f"* **+ open PR** [{md(item['repository'])} #{item['number']} — "
            f"{md(item['title'])}]({item['url']})")
    for item in delta["left_open_prs"]:
        lines.append(
            f"* **− open-set PR** [{md(item['repository'])} #{item['number']} — "
            f"{md(item['title'])}]({item['url']})")

    lines += ["", "The machine-readable companion is [delta.json](delta.json).",
              "For current status, follow the project source; DELTA is a witness of movement,",
              "not a verdict about disposition or authority.", ""]
    return "\n".join(lines)


def render_relations(relations, snapshot):
    owner = snapshot["owner"]
    lines = [
        "---",
        'description: "Human-curated, source-linked relations between public Static Collective repositories."',
        "---", "", "# RELATIONS — Connective tissue", "",
        "The Git inventory can observe that bodies exist and move. This lens records a",
        "small set of relationships that a human has deliberately admitted with a source.",
        "Automation may validate and render these edges; it may not invent or promote them.", "",
        "| Relation | Status | Authority owner | Source | Residual fog |",
        "| --- | --- | --- | --- | --- |",
    ]
    for relation in relations:
        left = f"[{md(relation['from_repo'])}]({repository_url(owner, relation['from_repo'])})"
        right = f"[{md(relation['to_repo'])}]({repository_url(owner, relation['to_repo'])})"
        arrow = "↔" if relation["direction"] == "symmetric" else "→"
        name = md(relation["relation"])
        source = f"[source]({relation['source_url']})"
        lines.append(
            f"| {left} {arrow} {right} — **{name}** | "
            f"{md(relation['status'])} | {md(relation['authority_owner'])} | "
            f"{source} | {md(relation.get('residual_fog') or '')} |")
        if relation.get("note"):
            lines.append(f"| ↳ {md(relation['note'])} |  |  |  |  |")
    lines += ["", "## Status vocabulary", "",
              "* **declared** — a cited project-owned source explicitly states the relation.",
              "* **observed** — a bounded mechanism or artifact directly evidences the crossing.",
              "* **inferred** — an editorial hypothesis admitted as such; never project authority.",
              "",
              "A relation can be real without being an integration. A source can establish",
              "lineage without transferring authority. Residual fog is preserved on purpose.", ""]
    return "\n".join(lines)

def md(value):
    return (str(value or "").replace("&", "&amp;").replace("<", "&lt;")
            .replace(">", "&gt;").replace("|", "\\|")
            .replace("[", "\\[").replace("]", "\\]")
            .replace(TICK, "\\" + TICK).replace("\n", " ").replace("\r", " "))


def repository_url(owner, name):
    return f"{GITHUB}/{quote(owner)}/{quote(name)}"


def branch_url(owner, name, branch):
    return repository_url(owner, name) + "/tree/" + quote(branch, safe="/")


def branch_status(repo, branch, owner):
    full_name = owner + "/" + repo["name"]
    matching = [pr for pr in repo["open_prs"]
                if pr["head_repo"] and pr["head_repo"].casefold() == full_name.casefold()
                and pr["head_branch"] == branch["name"]
                and pr["head_sha"] == branch["sha"]]
    if matching:
        return ", ".join(f"[open PR #{pr['number']}]({pr['url']})" for pr in matching)
    return "Retained ref; disposition unverified"


def render_group(group, members, snapshot):
    owner = snapshot["owner"]
    lines = [
        "---", f"description: {json.dumps('Public Git branches and open pull requests for ' + group['name'] + '.')}",
        "---", "", "# " + group["name"], "",
        group["description"], "",
        f"[Back to the living map]({MAP_URL}) · [Full inventory](README.md)", "",
        "> This is a GitHub observation. Branch existence does not prove current work,",
        "> human acceptance, a successful deployment, or canonical status.", "",
    ]
    if not members:
        lines += ["No public repositories currently occupy this shelf.", ""]
    for repo in members:
        name = repo["name"]
        url = repository_url(owner, name)
        branches = [x for x in repo["branches"] if x["name"] != repo["default_branch"]]
        lines += [
            f"## {name}", "",
            f"[Repository]({url}) · [Branches]({url}/branches) · [Pull requests]({url}/pulls)",
            "",
            f"Default: {TICK}{md(repo['default_branch'] or 'none')}{TICK} · "
            f"other refs: {len(branches)} · open PRs: {len(repo['open_prs'])}"
            + (" · archived" if repo["archived"] else "")
            + (" · empty repository" if not repo["branches"] else ""), "",
        ]
        if repo["open_prs"]:
            lines += ["### Open pull requests", "",
                      "| PR | Candidate title | Source → target | Updated (UTC) |",
                      "| --- | --- | --- | --- |"]
            for pr in repo["open_prs"]:
                head = md(pr["head_branch"])
                if pr["head_repo"] and pr["head_repo"].casefold() != (owner + "/" + name).casefold():
                    head = md(pr["head_repo"]) + ":" + head
                lines.append(f"| [#{pr['number']}]({pr['url']}) | {md(pr['title'])} | "
                             f"{TICK}{head}{TICK} → {TICK}{md(pr['base_branch'])}{TICK} | "
                             f"{md(pr['updated_at'][:10])} |")
            lines.append("")
        if branches:
            lines += ["### Retained nondefault branches", "",
                      "| Ref | Git head | What is evidenced |",
                      "| --- | --- | --- |"]
            for branch in branches:
                lines.append(
                    f"| [{md(branch['name'])}]({branch_url(owner, name, branch['name'])}) | "
                    f"[{branch['sha'][:10]}]({url}/commit/{branch['sha']}) | "
                    f"{branch_status(repo, branch, owner)} |"
                )
            lines.append("")
    return "\n".join(lines).rstrip() + "\n"


def render_index(groups, snapshot):
    repos = snapshot["repositories"]
    total_branches = sum(len(x["branches"]) for x in repos)
    total_prs = sum(len(x["open_prs"]) for x in repos)
    lines = [
        "---", f"description: {json.dumps('Dated, source-linked public Git inventory for the Static Collective.')}",
        "---", "", "# Public Git inventory", "",
        f"Captured: **{snapshot['captured_at']}** · **{len(repos)} public repositories** · "
        f"**{total_branches} branch refs** (including defaults) · **{total_prs} open PRs**.",
        "",
        f"[Living map]({MAP_URL}) · [DELTA](delta.md) · [RELATIONS](relations.md) · "
        f"[VISIBILITY](../visibility-aperture.md) · "
        f"[Machine-readable snapshot](public-index.json) · "
        f"[GitHub owner]({GITHUB}/{snapshot['owner']})", "",
        "Only repositories confirmed public at capture time are present. The account also has",
        "private work; this inventory does not expose its names, branches, or links.", "",
        "A branch ref is a surviving pointer. An open PR is a proposal. Neither establishes",
        "that work has landed, been accepted, or become the present project contract.",
        "An open PR appears beside a branch only when its same-repository head SHA matches",
        "the current branch tip exactly. Otherwise its status is kept separate.", "",
        "| Editorial shelf | Public repos | Branch refs | Open PRs |",
        "| --- | ---: | ---: | ---: |",
    ]
    for group, members in groups:
        lines.append(
            f"| [{group['name']}]({group['slug']}.md) | {len(members)} | "
            f"{sum(len(r['branches']) for r in members)} | "
            f"{sum(len(r['open_prs']) for r in members)} |")
    lines += ["", "## All public repositories", "",
              "| Repository | Shelf | Other refs | Open PRs |",
              "| --- | --- | ---: | ---: |"]
    group_for = {r["name"]: g for g, members in groups for r in members}
    for repo in repos:
        group = group_for[repo["name"]]
        lines.append(
            f"| [{md(repo['name'])}]({repository_url(snapshot['owner'], repo['name'])}) | "
            f"[{group['name']}]({group['slug']}.md) | "
            f"{sum(b['name'] != repo['default_branch'] for b in repo['branches'])} | "
            f"{len(repo['open_prs'])} |")
    lines += ["", "## Refresh contract", "",
              f"The [collector]({GITHUB}/{snapshot['owner']}/What-is-the-static-collective-/blob/main/scripts/refresh_git_atlas.py) reads GitHub's public",
              "repository list, every branch ref, and every open PR. The",
              f"[daily workflow]({GITHUB}/{snapshot['owner']}/What-is-the-static-collective-/actions/workflows/refresh-git-atlas.yml) reruns it.",
              "A failed or incomplete fetch aborts without publishing a partial map.",
              "Generated pages update when the observed topology changes; their capture",
              "time is the time that changed snapshot was recorded. Consult the workflow",
              "run history for the latest attempted refresh.", "",
              "The shelves are editorial navigation. Placement does not transfer the",
              "authority of any project to this page. New repos go to Unplaced until",
              "a human reviews their placement.", ""]
    return "\n".join(lines)


def output_files(snapshot, catalog, relations, delta=None):
    groups = category_sets(catalog, snapshot)
    files = {
        "README.md": render_index(groups, snapshot),
        "relations.md": render_relations(relations, snapshot),
    }
    for group, members in groups:
        files[group["slug"] + ".md"] = render_group(group, members, snapshot)
    files["public-index.json"] = json.dumps(snapshot, indent=2, ensure_ascii=False) + "\n"
    if delta is not None:
        files["delta.md"] = render_delta(delta)
        files["delta.json"] = json.dumps(delta, indent=2, ensure_ascii=False) + "\n"
    return files


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--input", type=Path, help="Offline JSON capture; never include private repositories")
    parser.add_argument("--check", action="store_true", help="Verify generated files without writing")
    args = parser.parse_args(argv)
    catalog = json.loads(CATALOG.read_text(encoding="utf-8"))
    relation_source = json.loads(RELATIONS.read_text(encoding="utf-8"))
    if args.input:
        raw = json.loads(args.input.read_text(encoding="utf-8"))
    else:
        raw = fetch_public(catalog["owner"], os.environ.get("GITHUB_TOKEN"))
    snapshot = normalize(raw, catalog["owner"])
    previous = OUTPUT / "public-index.json"
    old = None
    topology_changed = True
    if previous.exists():
        old = json.loads(previous.read_text(encoding="utf-8"))
        old_without_time = {key: value for key, value in old.items() if key != "captured_at"}
        topology_changed = old_without_time != snapshot
        if not topology_changed:
            snapshot["captured_at"] = old["captured_at"]
    snapshot.setdefault("captured_at", raw.get("observed_at") or datetime.now(
        timezone.utc).isoformat(timespec="seconds"))
    relations = validate_relations(relation_source, snapshot)
    delta_missing = not (OUTPUT / "delta.md").exists() or not (OUTPUT / "delta.json").exists()
    delta = topology_delta(old, snapshot) if topology_changed or delta_missing else None
    files = output_files(snapshot, catalog, relations, delta)
    stale = [name for name, content in files.items()
             if not (OUTPUT / name).exists() or
             (OUTPUT / name).read_text(encoding="utf-8") != content]
    if args.check:
        if stale:
            print("Out-of-date public atlas files: " + ", ".join(stale), file=sys.stderr)
            return 1
        print(f"Checked {len(snapshot['repositories'])} public repositories; atlas is current")
        return 0
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for name, content in files.items():
        (OUTPUT / name).write_text(content, encoding="utf-8")
    print(f"Captured {len(snapshot['repositories'])} public repositories; "
          f"updated {len(stale)} generated files")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
