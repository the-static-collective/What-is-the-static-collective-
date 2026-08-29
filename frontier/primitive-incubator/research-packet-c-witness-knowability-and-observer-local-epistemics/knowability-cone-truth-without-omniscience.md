# Knowability Cone — Truth Without Omniscience

> **Status:** Frontier / Primitive Incubator\
> **Proposed executable owner:** ALEX Crucible\
> **Projection owner:** 3rdi\
> **Candidate specimen:** `KNOWABILITY-CONE-001`

## Seed

A claim may require two distinct proofs:

1. the evidence exists and is authentic;
2. this observer, at this historical cut, had a lawful information path to that evidence.

This is **not relativistic truth**. The world and historical occurrence remain fixed. What changes is the observer-local boundary of lawful access and therefore which claims can be derived from the observer's declared basis.

```
WORLD → OBSERVER CUT → AVAILABLE BASIS → DERIVATION RULE → CLAIM
```

Keep capability and authority on separate side channels. Knowing or deriving a claim does not itself grant permission to act.

## Ownership boundary

### 3rdi owns visibility

3rdi answers the observer-local projection question:

```
What was lawfully available to observer O
through receiver/decoder D
at cut T?
```

Its job is to preserve temporal cuts, edge exposure, decoder constitution, and the difference between occurrence and availability. It should not decide what an observed basis semantically proves.

### ALEX owns derivability

ALEX's scoped `RELATION-DERIVATION-001@1` profile already admits `SUPPORTS` only from an attributable evidence path carried in a proposal's declared basis.

ALEX therefore owns the second question:

```
Given this declared basis and this rule,
may this semantic relation be minted?
```

### ALEX Crucible owns the seam attack

`KNOWABILITY-CONE-001` should be a composed Crucible specimen. It tests whether ALEX can consume a 3rdi-derived observer-local basis without collapsing authentic evidence into lawfully available evidence.

The narrow composition is:

```
3rdi witnesses access.
ALEX judges derivation.
Crucible attacks the seam.
```

Neither component owns truth itself.

## Constitutional distinction

```
EXISTENCE
    !=
KNOWABILITY
    !=
DERIVABILITY
    !=
AUTHORITY
```

A genuine source may exist without being available to an observer. A source may be available without supporting the proposed relation. A supported relation may still grant no capability or authority.

## KNOWABILITY-CONE-001

Use one immutable world, one historical cut, two observers, and one derivation rule.

```
                evidence E
                    |
             observer exposure
              /            \
         visible to A    hidden from B
              |              |
           basis_A         basis_B
              \              /
               RELATION-DERIVATION-001
```

### Phase A — asymmetric access

Hold fixed:

* world occurrences;
* evidence bytes and identity;
* historical cut;
* proposed relation;
* derivation rule and ruleset digest.

Vary only the observer-local exposed edge.

Expected result:

```
A: SUPPORTS may be derivable
B: SUPPORTS remains UNAVAILABLE / insufficient-to-test
```

The result must not be represented as "true for A, false for B." The claim's truth status is outside this specimen. The specimen concerns lawful derivability from each observer's attributed basis.

### Phase B — later exposure

Expose the missing edge to B at a later availability event. Do not rewrite the original occurrence, prior projection, or historical receipt.

Expected result:

```
historical fact: unchanged
B's lawful basis: changed
B's lawful derivability: may change
A's prior receipt: unchanged
B's prior receipt: unchanged
```

This proves that availability can change without rewriting causation or history.

### Phase C — MADDCL0WN leak attack

Give B the authentic evidence bytes through a channel that is **not present in B's declared observer-local basis**.

The harness must refuse to mint `SUPPORTS` from the leak.

The discriminator is:

```
I possess these bytes
        !=
these bytes lawfully belong to my declared epistemic basis
```

If the leaked authentic evidence causes the claim to pass anyway, the composition has collapsed possession into lawful historical access.

## Why the attack matters

The same structural failure appears in several domains without making those domains equivalent:

* hindsight leakage;
* narrator omniscience;
* future information leaking across temporal holdouts;
* cached or model-carried knowledge entering a historical reconstruction;
* archaeological anachronism;
* oracle contamination;
* sealed-prediction evaluation;
* Storyship or MEMENTO source cuts.

The shared hazard is narrow: **authentic information can still be inadmissible to the declared observer-world at the declared cut.**

## Minimal receipt surface

A composed receipt should be able to identify, without inventing confidence numbers:

```
world_id
observer_id
cut_id
decoder_receipt_id
visible_basis_ids
hidden_basis_ids or obstruction class
projection_digest
derivation_rule_id
ruleset_digest
proposal_id
disposition
reason_code
```

Do not require 3rdi to emit ALEX semantic conclusions. Do not require ALEX to reconstruct observer visibility itself.

## Initial obstruction vocabulary

For this first specimen, resist building a general ignorance ontology. Only the minimum distinctions needed to test the seam are earned:

* `AVAILABLE`
* `HIDDEN_BY_CUT`
* `HIDDEN_BY_EXPOSURE`
* `BASIS_NOT_ATTRIBUTABLE`
* `DERIVATION_NOT_SUPPORTED`

A larger ignorance map belongs to a later experiment if these distinctions survive.

## Success conditions

`KNOWABILITY-CONE-001` earns promotion only if all of the following hold:

1. identical world + cut + rule can yield different lawful derivability solely from observer-local exposure;
2. later exposure changes B's available basis without rewriting earlier receipts;
3. authentic leaked evidence outside B's declared basis cannot mint `SUPPORTS`;
4. 3rdi remains a projection organ rather than a semantic truth service;
5. ALEX remains a derivation judge rather than an omniscient source reconstructer;
6. `ACCEPT` remains separate from authority, canon, publication, permission, or consequence.

## Failure conditions

Kill or redesign the specimen if:

* observer-local access is represented by mutating source truth;
* ALEX silently searches outside the declared basis;
* 3rdi begins minting semantic support relations;
* authentic leaked bytes are treated as historically available merely because the harness possesses them;
* later availability rewrites earlier projection receipts;
* the experiment requires a generalized epistemology before the narrow seam can be tested.

## Promotion ladder

```
Primitive Incubator
        ↓
ALEX Crucible specimen / hostile profile
        ↓
Executable evidence receipt
        ↓
Pattern candidate only after survival
```

Do **not** promote this to Patterns from concept alone.

## Current receipts that motivate the slice

* `the-static-collective/3rdi` PR #1: observer-local projection kernel with temporal cuts, edge exposure, pure gates, independent causal/relevance cones, and decoder receipts. At capture time the PR is open.
* `the-static-collective/ALEX.2` PR #7: merged `RELATION-DERIVATION-001@1`, admitting `SUPPORTS` only from attributable evidence paths carried in the proposal's declared basis.
* ALEX Crucible already separates CASE from ORACLE and preserves the rule that adjacent true relations do not silently promote one another.

## Durable line

> **Truth does not need to become relative for knowability to become relational.**

The world may stay fixed while the lawful path from world to observer changes.
