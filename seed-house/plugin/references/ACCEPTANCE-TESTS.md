# Acceptance tests — v2

1. Create three homes and add an arbitrary fourth without any hardcoded limit.
2. Add two distinct rooms to one home, each with different workbenches. Existing identities are unchanged.
3. Try duplicate home/room IDs; the local CLI refuses them and leaves its file intact.
4. Attach and detach a method. No work product or unrelated home is deleted; effectful tools remain unbound.
5. Archive a home. Records remain; `show` labels it archived.
6. Propose a cross-home relationship. Packet is `PROPOSED`, carries *only selected references*, has no secrets, and does not move or publish data.
7. Verify that a source home cannot silently commit another owner's approval or decide the receiver's admission.
8. Test re-entry with only the registry and Return Cards; assistant states unknown history explicitly.
9. Compare business and fictional domain responses; customer PII must never be imported as story canon.
10. Verify plugin v2 remains usable without any Python runtime or live MCP backend; local CLI is optional.

Run `python -m unittest discover -s tests -v` in the standalone package. The suite exercises only local registry behavior, **not** any real multi-user network, chat agent behavior, or third-party rights enforcement.
