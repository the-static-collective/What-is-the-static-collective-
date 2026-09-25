#!/usr/bin/env python3
"""Project one Git terrain through an explicit visibility aperture.

This module deliberately knows nothing about canon, maturity, implementation
status, or authority. It answers one question only: what may this observer see?

Restricted input is expected to be produced or stored outside the public
repository. The public projection copies no restricted identity, URL, note, or
relation text unless an explicit public-safe projection is supplied.
"""

import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
POLICY = ROOT / "atlas" / "visibility-policy.json"


def load_policy(path=POLICY):
    return json.loads(Path(path).read_text(encoding="utf-8"))


def _require_text(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(label + " must be nonempty text")
    return value.strip()


def normalize_manifest(raw, policy):
    if raw.get("schema") != "static-git-atlas/terrain-v1":
        raise ValueError("Unsupported terrain manifest schema")

    allowed_visibility = set(policy["visibility_states"])
    allowed_reasons = set(policy["restriction_reasons"])
    allowed_modes = set(policy["restricted_projection_modes"])
    default_visibility = policy["default_visibility"]
    default_restricted_projection = policy["restricted_default_projection"]

    entities = []
    by_id = {}
    for source in raw.get("entities", []):
        entity_id = _require_text(source.get("id"), "entity id")
        if entity_id in by_id:
            raise ValueError("Duplicate entity id: " + entity_id)

        visibility = source.get("visibility", default_visibility)
        if visibility not in allowed_visibility:
            raise ValueError("Unknown visibility for " + entity_id)

        entity = {
            "id": entity_id,
            "name": _require_text(source.get("name"), "entity name"),
            "kind": _require_text(source.get("kind", "repository"), "entity kind"),
            "visibility": visibility,
        }

        # These axes pass through untouched. Visibility is not allowed to infer
        # or rewrite any of them.
        for key in ("status", "authority", "evidence", "maturity"):
            if key in source:
                entity[key] = source[key]

        if visibility == "restricted":
            restriction = source.get("restriction") or {}
            reason = restriction.get("reason")
            if reason not in allowed_reasons:
                raise ValueError(
                    f"Restricted entity {entity_id} requires an allowed restriction reason")
            entity["restriction"] = {"reason": reason}
            if restriction.get("basis"):
                entity["restriction"]["basis"] = str(restriction["basis"])

            projection = source.get("projection") or {
                "mode": default_restricted_projection}
            mode = projection.get("mode", default_restricted_projection)
            if mode not in allowed_modes:
                raise ValueError("Unknown restricted projection mode for " + entity_id)
            entity["projection"] = {"mode": mode}
            if mode == "presence":
                entity["projection"]["public_label"] = _require_text(
                    projection.get("public_label"),
                    "public_label for restricted presence projection")
        else:
            entity["projection"] = {"mode": "public"}

        by_id[entity_id] = entity
        entities.append(entity)

    relations = []
    seen_relations = set()
    for source in raw.get("relations", []):
        relation_id = _require_text(source.get("id"), "relation id")
        if relation_id in seen_relations:
            raise ValueError("Duplicate relation id: " + relation_id)
        seen_relations.add(relation_id)

        left = _require_text(source.get("from"), "relation from")
        right = _require_text(source.get("to"), "relation to")
        if left not in by_id or right not in by_id:
            raise ValueError("Relation endpoint is missing for " + relation_id)

        relation = {
            "id": relation_id,
            "from": left,
            "to": right,
            "relation": _require_text(source.get("relation"), "relation"),
        }
        for key in ("status", "authority_owner", "source_url", "note", "residual_fog"):
            if key in source:
                relation[key] = source[key]

        touches_restricted = (
            by_id[left]["visibility"] == "restricted"
            or by_id[right]["visibility"] == "restricted"
        )
        if touches_restricted:
            public_projection = source.get("public_projection") or {"mode": "omit"}
            mode = public_projection.get("mode", "omit")
            if mode not in {"omit", "presence"}:
                raise ValueError("Unknown relation public_projection mode for " + relation_id)
            relation["public_projection"] = {"mode": mode}
            if mode == "presence":
                # Public relation text is a separate admission. Internal relation
                # text is never silently reused across the aperture.
                relation["public_projection"]["relation"] = _require_text(
                    public_projection.get("relation"),
                    "public relation text for " + relation_id)
                if public_projection.get("note"):
                    relation["public_projection"]["note"] = str(
                        public_projection["note"])
        else:
            relation["public_projection"] = {"mode": "public"}

        relations.append(relation)

    return {
        "schema": "static-git-atlas/terrain-v1",
        "entities": entities,
        "relations": relations,
    }


def project_public(manifest, policy):
    """Return a public-safe view without mutating non-visibility axes."""
    normalized = normalize_manifest(manifest, policy)
    source_entities = {item["id"]: item for item in normalized["entities"]}
    endpoint_labels = {}
    public_entities = []

    for entity in normalized["entities"]:
        if entity["visibility"] == "public":
            projected = {
                key: value for key, value in entity.items()
                if key not in {"id", "projection", "restriction"}
            }
            projected["visibility"] = "public"
            public_entities.append(projected)
            endpoint_labels[entity["id"]] = entity["name"]
        elif entity["projection"]["mode"] == "presence":
            label = entity["projection"]["public_label"]
            public_entities.append({
                "name": label,
                "kind": entity["kind"],
                "visibility": "restricted-presence",
            })
            endpoint_labels[entity["id"]] = label

    public_relations = []
    for relation in normalized["relations"]:
        left = source_entities[relation["from"]]
        right = source_entities[relation["to"]]
        touches_restricted = (
            left["visibility"] == "restricted"
            or right["visibility"] == "restricted"
        )
        projection = relation["public_projection"]

        if touches_restricted and projection["mode"] != "presence":
            continue
        if relation["from"] not in endpoint_labels or relation["to"] not in endpoint_labels:
            continue

        if touches_restricted:
            projected = {
                "from": endpoint_labels[relation["from"]],
                "to": endpoint_labels[relation["to"]],
                "relation": projection["relation"],
            }
            if projection.get("note"):
                projected["note"] = projection["note"]
        else:
            projected = {
                "from": endpoint_labels[relation["from"]],
                "to": endpoint_labels[relation["to"]],
                "relation": relation["relation"],
            }
            for key in ("status", "authority_owner", "source_url", "note", "residual_fog"):
                if key in relation:
                    projected[key] = relation[key]
        public_relations.append(projected)

    return {
        "schema": "static-git-atlas/public-projection-v1",
        "entities": public_entities,
        "relations": public_relations,
    }


def main():
    parser = argparse.ArgumentParser(
        description="Project a unified terrain manifest through the public visibility aperture.")
    parser.add_argument("--input", required=True, type=Path,
                        help="Unified terrain JSON. May contain restricted material.")
    parser.add_argument("--output", required=True, type=Path,
                        help="Destination for the public-safe projection.")
    parser.add_argument("--policy", type=Path, default=POLICY)
    args = parser.parse_args()

    policy = load_policy(args.policy)
    raw = json.loads(args.input.read_text(encoding="utf-8"))
    projected = project_public(raw, policy)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(
        json.dumps(projected, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8")


if __name__ == "__main__":
    main()
