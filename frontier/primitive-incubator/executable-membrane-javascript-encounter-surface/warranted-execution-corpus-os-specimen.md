# Warranted Execution — Corpus OS Specimen

Status: **landed implementation witness; GitBook publication pending**

Date: **2026-08-15**

Project-owned GitHub remains canonical for implementation, tests, issues, and merge state. This page records what the Executable Membrane hypothesis learned from the Corpus OS specimen.

## The composition

Corpus OS already had two independently proven questions:

```
Trust Runtime
WHO + CAPACITY + POWER + TARGET
  -> ADMIT / REFUSE

Session Runtime
CAPABILITY + OPERATION
  -> EXECUTE / REFUSE
```

The implementation run composes them through a deliberately small middle object:

```
proposal
  -> Trust admission
  -> ephemeral Action Warrant
  -> Session admission
  -> bounded Linux host port
  -> host consequence / failure
  -> receipt
```

The warrant is not a portable token or a new identity system. In v0.1 it is an in-process, one-shot proof that Corpus admitted a particular action under a supplied Trust declaration.

## Executable evidence

### Corpus OS PR #13 — bounded Linux host port

PR #13 is landed on `main` as `651d8f1bfda3ecee0a1a43e86db21a93fa91a496`.

The Session Runtime delegates only already-admitted structured execution to fixed, code-owned Node adapters. The boundary keeps executable path, child working directory, and environment code-owned. Human/proposal input crosses only as stdin data. Corpus refusal happens before the host. A real non-zero child process produces a failed receipt rather than false success.

This is a direct Executable Membrane specimen:

> execution reaches the substrate boundary without allowing the substrate boundary to manufacture authority.

### Corpus OS PR #15 — ephemeral Action Warrant

PR #15 is landed on `main` as `2e19cf0bef78e696ca802019c859dbea661378bf`.

The warrant specimen binds:

* trust / declaration version;
* actor and capacity;
* declared purpose;
* exact declared corpus subject reference;
* capability id, operation, and owner;
* originating Trust request;
* exact operation input;
* `legalValidity: unclaimed`.

Executable eligibility depends on private in-process issuance, not matching object shape. Spread copies, JSON round-trips, and `structuredClone` copies do not become authority. The warrant is spent when it crosses into Session admission, including when Session refuses afterward, so the same admitted act cannot be replayed for another consequence.

The Session still applies its own capability law. The warrant does not bypass the membrane beneath it.

## What this teaches the Executable Membrane hypothesis

The useful separation is becoming sharper:

```
proposal / desire
  not authority

declaration + Trust evaluation
  authority question

Action Warrant
  admitted consequence request

Session
  capability question

host port
  bounded substrate crossing

host observation + receipt
  evidence of what occurred
```

This supports a stronger membrane law:

> **The membrane should receive already-attributed consequence, not free-form desire.**

A runtime can remain flexible at the encounter surface while the authority-bearing crossing stays narrow, inspectable, and replay-resistant.

## Boundary that remains unresolved

This specimen does **not** yet establish system-wide mandatory Warranted Execution.

Two gaps remain explicit in Corpus OS issue #16:

1. v0.1 receives a supplied, internally valid Trust declaration but does not yet prove which declaration is the adopted administrative root;
2. lower-level `CorpusSession.run(...)` remains callable for independent Session testing, so the warranted path is composed but not yet the only mechanically possible production path.

Issue #16 is now unblocked because both prerequisite execution seams have landed. That changes its dependency state, not the truth of the boundary above.

Those gaps matter. Solving them should not be smuggled into this specimen through signatures, legal-validity claims, portable warrant tokens, or a second canonical identity law.

## Incubator verdict

**Keep Executable Membrane incubating.**

Corpus OS is now a landed, materially useful second kind of evidence for the boundary discipline. Landing removes the review-readiness caveat, but it still does not justify graduation by itself: the implementation must survive use, and the broader primitive still needs materially different real-world specimens before promotion.

The portable residue worth keeping here is not the Corpus-specific warrant schema. It is the separation:

> **authority admits the consequence; capability executes it; the membrane carries it; receipts witness it.**
