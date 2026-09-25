#!/usr/bin/env python3
"""Validate bounded DEVELOPMENT-EVENT-001 receipts.

This intentionally enforces epistemic boundaries rather than deciding whether a
candidate constitutes "real development".
"""

import argparse
import json
from pathlib import Path


EVENT_TYPES = {"molt", "guidance", "differentiation", "aperture", "other"}
EVIDENCE_CLASSES = {"declared", "observed", "inferred"}
CAUSATION = {"not-claimed", "explicitly-witnessed"}


def _text(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label} must be nonempty text")
    return value.strip()


def _list(value, label, minimum=0):
    if not isinstance(value, list) or len(value) < minimum:
        raise ValueError(f"{label} must be a list with at least {minimum} item(s)")
    return value


def validate_event(raw):
    if raw.get("schema") != "static-development-event/v0":
        raise ValueError("Unsupported development-event schema")

    event_id = _text(raw.get("id"), "id")
    event_type = raw.get("event_type")
    if event_type not in EVENT_TYPES:
        raise ValueError("Unknown event_type")

    subject = raw.get("subject")
    if not isinstance(subject, dict):
        raise ValueError("subject must be an object")
    _text(subject.get("id"), "subject.id")
    _text(subject.get("kind"), "subject.kind")
    if subject.get("identity_claim", "not-claimed") not in {
        "continued", "not-claimed", "disputed"
    }:
        raise ValueError("Unknown subject.identity_claim")

    if not isinstance(raw.get("before"), dict) or not isinstance(raw.get("after"), dict):
        raise ValueError("before and after must be objects")

    conditions = _list(raw.get("conditions"), "conditions")
    for item in conditions:
        if not isinstance(item, dict):
            raise ValueError("condition must be an object")
        if item.get("kind") not in {"pressure", "constraint", "contact", "load", "other"}:
            raise ValueError("Unknown condition kind")
        _text(item.get("statement"), "condition.statement")

    invariants = _list(raw.get("invariants_carried"), "invariants_carried", 1)
    for item in invariants:
        if not isinstance(item, dict):
            raise ValueError("invariant must be an object")
        _text(item.get("claim"), "invariant.claim")
        _text(item.get("evidence"), "invariant.evidence")

    for item in _list(raw.get("changed"), "changed", 1):
        _text(item, "changed item")

    sources = _list(raw.get("sources"), "sources", 1)
    for source in sources:
        if not isinstance(source, dict):
            raise ValueError("source must be an object")
        url = _text(source.get("url"), "source.url")
        if not url.startswith("https://"):
            raise ValueError("source.url must use https")
        if source.get("evidence_class") not in EVIDENCE_CLASSES:
            raise ValueError("Unknown source evidence_class")

    for item in _list(raw.get("non_claims"), "non_claims", 1):
        _text(item, "non_claim")

    causation = raw.get("causation")
    if not isinstance(causation, dict) or causation.get("status") not in CAUSATION:
        raise ValueError("causation.status must be not-claimed or explicitly-witnessed")
    if causation["status"] == "explicitly-witnessed":
        _text(causation.get("basis"), "causation.basis")

    if event_type == "molt":
        block = raw.get("molt")
        if not isinstance(block, dict):
            raise ValueError("molt event requires molt block")
        old_address = _text(block.get("old_address"), "molt.old_address")
        new_address = _text(block.get("new_address"), "molt.new_address")
        if old_address == new_address:
            raise ValueError("molt requires distinct old and new addresses")
        _list(block.get("ancestry_receipts"), "molt.ancestry_receipts", 1)

    if event_type == "guidance":
        block = raw.get("guidance")
        if not isinstance(block, dict):
            raise ValueError("guidance event requires guidance block")
        _text(block.get("observer"), "guidance.observer")
        _text(block.get("observed_at"), "guidance.observed_at")
        available = _list(block.get("available"), "guidance.available")
        shown = _list(block.get("shown"), "guidance.shown")
        if not set(shown).issubset(set(available)):
            raise ValueError("SHOWN must be a subset of observer-local AVAILABLE")
        recommended = block.get("recommended")
        if recommended is not None and recommended not in shown:
            raise ValueError("RECOMMENDED must be SHOWN")
        # CHOSEN and USED deliberately need not be subsets of SHOWN:
        # the human may leave the presented surface.

    if event_type == "differentiation":
        block = raw.get("differentiation")
        if not isinstance(block, dict):
            raise ValueError("differentiation event requires differentiation block")
        _text(block.get("relation_id"), "differentiation.relation_id")
        endpoints = _list(block.get("endpoints"), "differentiation.endpoints", 2)
        if len(endpoints) != 2:
            raise ValueError("differentiation.endpoints must contain exactly two endpoints")
        old_form = _text(block.get("old_form"), "differentiation.old_form")
        new_form = _text(block.get("new_form"), "differentiation.new_form")
        if old_form == new_form:
            raise ValueError("differentiation requires a changed relation form")
        _list(block.get("load_receipts"), "differentiation.load_receipts", 1)

    if event_type == "aperture":
        block = raw.get("aperture")
        if not isinstance(block, dict):
            raise ValueError("aperture event requires aperture block")
        before = _text(block.get("before_visibility"), "aperture.before_visibility")
        after = _text(block.get("after_visibility"), "aperture.after_visibility")
        if before == after:
            raise ValueError("aperture requires a visibility change")

    return raw


def main():
    parser = argparse.ArgumentParser(description="Validate a Static development-event receipt.")
    parser.add_argument("receipt", type=Path)
    args = parser.parse_args()
    raw = json.loads(args.receipt.read_text(encoding="utf-8"))
    validate_event(raw)
    print(f"valid development event: {raw['id']}")


if __name__ == "__main__":
    main()
