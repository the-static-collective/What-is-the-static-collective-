# MORTAL-ACTOR-001 — Common Stack Design

Date: 2026-08-27
Status: design only; no shared-runtime promotion
Owning location: neutral Static Collective design surface
Participating organs: LOADOUT, 3rdi, ALEX
Optional downstream consumers: Novelist, MEMENTO, game/world runtimes, research tools
External consequence boundary: owning-world / eCODE Heart

## 1. Frontier statement

The current stack has become simpler by becoming more differentiated.

The minimum common reasoning stack is:

```text
LOADOUT -> 3rdi -> ALEX
```

with this division of labor:

```text
LOADOUT  compiles the smallest bounded world/capability surface for the task.
3rdi     projects what is available from a particular observer, cut, and decoder.
ALEX     pressures what may actually be inferred, supported, doubted, or refused from that bounded projection.
```

The three do not merge into one ontology or authority service.

Novelist is not part of the minimum common stack. It is a high-value consumer that can use stack receipts to constrain reader, narrator, character, or player knowledge and then propose narrative action.

MEMENTO is not part of the minimum common stack. It is a durable world/memory substrate that may preserve observer-local residues, world instances, and later activations without owning truth.

eCODE is not another always-awake plugin. It supplies the wider constitutional grammar: possibility, relation, variation, composition, trace, and a separately owned crossing by which a proposal may become consequence.

The first combined frontier is therefore not a universal framework. It is one falsifiable cross-stack act:

> **No actor may act from a world they never inhabited.**

Working identifier: `MORTAL-ACTOR-001`.

## 2. Why this seam now exists

The participating systems have independently approached the same boundary from different sides.

### LOADOUT

LOADOUT is becoming the task-first front door:

```text
CUT -> CLASSIFY -> DISCOVER -> SELECT -> FENCE -> BIND -> WORK -> RECEIPT
```

Its governing distinctions include:

```text
task != tool list
mention != mandatory binding
capability availability != authority
discovery != invocation
router choice != evidence
```

It already supports immutable compile testimony, explicit capability/effect fences, expiry, attributable drift checks, and child compiles without ambient permission inheritance.

### 3rdi

3rdi already proves deterministic observer-local projection and keeps separate:

```text
occurrence != availability != attention role != relevance
relevance != causation
carrier != decoder != projection
projection != source != authority
actual future != anticipated future
gate result != side effect
```

Its active frontier adds contact, attention, decoder, and stance receipts plus `NARRATIVE-CUT` as an application profile.

### ALEX

ALEX already separates evidence provenance, semantic derivation, evaluator disposition, execution state, and external admission. Its current research frontier is converging on an open typed occurrence field with the discipline:

```text
NO RELATION SILENTLY MINTS ANOTHER RELATION.
EVENTS ARE CHEAP. EDGES MAKE CLAIMS.
```

ALEX also now treats field-level causal precedence as potentially partial rather than silently total.

### Novelist

Novelist already carries an editorial version of the missing problem. It reconstructs reader and viewpoint knowledge from reader-visible evidence, requires prerequisites for intended inferences, and gates character knowledge, clues, world rules, timeline, relationships, and payoffs before a transition is accepted.

The frontier move is to let that editorial discipline consume stack receipts rather than require Novelist to become the common epistemic substrate.

## 3. Core architectural correction

A naive composition would place 3rdi before LOADOUT:

```text
world -> observer projection -> context compile -> ALEX
```

That is useful conceptually but wrong as the general control path because LOADOUT is the front door responsible for deciding which capabilities may bind at all.

The actual common control path is:

```text
TASK
  |
  v
LOADOUT C0
  - selects/binds 3rdi and/or ALEX when required
  - freezes initial context/capability/effect fence
  - preserves omissions, freshness, and residual fog
  |
  v
3rdi projection P0
  - observer + cut + decoder
  - exposes only lawfully available occurrences/relations
  - emits projection receipt; no side effect
  |
  v
ALEX evaluation E0
  - claim basis must peel through evidence inside the lawful projection
  - returns support / counterpressure / unresolved / refusal on its own axes
  - does not convert projection into truth or authority
```

If the 3rdi result materially changes the context required to continue, LOADOUT does not mutate `C0`. It creates an immutable child compile `C1` with attributable ancestry:

```text
C0 -> P0 -> recompile_required -> C1 -> ALEX
```

The projection remains attributable to `C0`; ALEX evaluation is attributable to `C1`. If no recompile is required, `C1 == C0` by reference rather than by silent mutation.

This uses an existing LOADOUT law instead of inventing a hidden mid-run context mutation.

## 4. The new non-collapse: global support != local supportability

The most important hardening is:

```text
GLOBALLY SUPPORTED != LOCALLY SUPPORTABLE
```

A proposition may be true and strongly evidenced somewhere in the total world while remaining unavailable to a particular observer at a particular cut.

The common stack must preserve the whole ladder:

```text
available       != encountered
encountered     != attended
attended        != decoded
decoded         != accepted
accepted        != true
true            != locally supportable
locally supportable != believed
believed        != actionable
actionable      != authorized
authorized      != occurred
occurred        != narrated
narrated        != evidence
```

These are not proposed as one universal enum. They are distinct relations/events owned by different systems.

## 5. Proposed cross-stack contract

The cross-stack object should be a small versioned envelope, not a shared ontology.

Working conceptual shape:

```text
mortal_actor.run/v0

run_id
actor_id
world_cut_ref
entry_compile_ref
evaluation_compile_ref
projection_ref
claim_requests[]
consumer_intent?
residual_fog[]
```

The envelope binds references to receipts already owned by the participating organs. It must not duplicate their internal state.

`entry_compile_ref` identifies the compile under which the 3rdi projection was formed. `evaluation_compile_ref` identifies the compile under which ALEX evaluated claims. They may be the same reference. If they differ, the latter must be an attributable LOADOUT descendant of the former.

### Required invariants

1. `entry_compile_ref` identifies the exact immutable compile under which the projection step occurred.
2. `projection_ref` identifies one exact observer-local 3rdi projection and its cut/decoder ancestry.
3. `evaluation_compile_ref` identifies the exact immutable compile under which ALEX evaluation occurred.
4. If `evaluation_compile_ref != entry_compile_ref`, compile ancestry must peel through an attributable recompile transition; no ambient context union is allowed.
5. Every ALEX claim request declares an explicit basis or permits an unresolved result for insufficient basis.
6. ALEX must distinguish evidence globally known to the harness from evidence visible within the actor's lawful projection.
7. No `pass`, `accept`, `support`, successful compile, or green profile verdict can imply external admission or side effect.
8. Changing observer, cut, decoder, compile, evidence basis, or effect fence creates a descendant occurrence rather than overwriting the prior run.
9. Same visible room or same claim payload does not imply same worldline or same epistemic basis.

## 6. ALEX profile: LOCAL-SUPPORT-001

Do not add a new universal predicate merely to make the stack fit together.

`LOCAL-SUPPORT-001` should initially be a bounded evaluation profile over existing ALEX semantic derivation machinery.

Question:

> Given a 3rdi projection receipt, an exact LOADOUT evaluation compile, and candidate claim `q`, can the declared support path for `q` be constructed entirely from attributable evidence lawfully available within that actor's bounded world?

Conceptually:

```text
LOCAL_SUPPORT(q, actor, cut)
  requires
  SUPPORT_PATH(q) subset_of LAWFULLY_AVAILABLE(actor, cut)
```

This does not mean the claim is universally true. It means the support claim is valid relative to the declared observer-local evidence surface.

The profile may emit evaluator dispositions such as:

```text
local_basis_accept
local_basis_counterpressured
local_basis_unresolved
basis_outside_projection
compile_mismatch
projection_mismatch
```

These are evaluator/profile outcomes, not new semantic predicates, canon states, or authority states. Existing ALEX relation-minting rules remain separate.

## 7. MORTAL-ACTOR-001 hostile specimen

Working specimen name:

> **FOUR WITNESSES / ONE ROOM**

Keep the first proof deliberately tiny and synthetic.

### 7.1 World

Use one consequence-bearing room with roughly 10–15 attributable occurrences and a small number of typed relations.

Required ingredients:

- one true clue that exists globally but is unavailable to Actor A at cut `A0`;
- one carrier lawfully available to Actor B but never encountered;
- one carrier encountered by Actor C and explicitly ignored;
- one clue attended/decoded by Actor D that supports a reasonable but ultimately false inference;
- two concurrent events whose causal relation is partial rather than totally ordered;
- one later merge/read occurrence that changes what becomes available;
- one action behind an explicit LOADOUT effect fence;
- one return to an apparently identical room `A1` after intervening history.

### 7.2 Four projections

Use four roles over the same constituted event field:

```text
A = character / local actor
B = second character or player
R = reader / outside observer
N = narrator / broader but still bounded observer
```

The exact labels are not important. Their receipts are.

3rdi must produce four distinct projection receipts without changing the underlying world merely to satisfy the roles.

### 7.3 Shared claim set

Submit the same candidate claims to ALEX for all four actors.

The claim set must include:

1. one globally true and globally supported claim that is `basis_outside_projection` for at least one actor;
2. one locally supportable claim that later proves factually false after new evidence arrives;
3. one claim that remains unresolved despite being narratively attractive;
4. one causal claim invalid because concurrency was flattened into display order;
5. one claim that becomes locally supportable only at `A1`, without rewriting `A0`.

### 7.4 Expected proof

The hostile proof passes only if all of the following hold:

```text
same world != same projection
same claim != same local supportability
available != encountered
ignored requires attributable contact
later truth does not rewrite earlier knowability
display serialization does not mint causal order
LOADOUT selection does not count as evidence
3rdi relevance does not count as support
ALEX support does not count as authority
green gate does not execute the fenced action
same visible room at A0/A1 does not collapse worldline identity
```

## 8. Novelist integration: consumer, not substrate

After the core three-organ specimen is green, Novelist can consume the receipts.

For a narrative actor, the downstream question becomes:

> Given this actor's lawful projection, locally supportable beliefs, goals, pressures, relationships, and world constraints, what candidate action or narrative beat can be proposed without stolen knowledge?

A Novelist-facing adapter should be able to populate or check:

```text
entry knowledge
reader/character asymmetry
reader-visible prerequisites
intended inference
concealed significance vs concealed fact
relationship/power shift
irreversible choice
exit knowledge
```

New refusal:

> **A narratively desirable beat must fail or be rewritten when it requires an inference whose prerequisites are outside the acting character's lawful cut.**

Novelist may still write characters who are wrong, foolish, biased, deceptive, or irrational. The prohibition is not against error. It is against unreceipted omniscience.

## 9. MEMENTO integration: optional durability

MEMENTO/UNDERSTORY may preserve the durable residue of a mortal-actor run:

- contact;
- attention;
- decoder use;
- stance;
- unresolved association;
- later activation/resurfacing;
- Historical Imagination world identity.

But MEMENTO must remain optional for the first common-stack proof.

This preserves the ownership line:

```text
3rdi projection != MEMENTO write != MEMENTO admission
```

A later activation creates a new occurrence referencing the old trace. It never rewrites the older cut into hindsight knowledge.

## 10. eCODE / owning-world boundary

The common stack ends before consequence.

A downstream actor proposal may be represented schematically as:

```text
W0
 -> LOADOUT entry compile
 -> 3rdi projection
 -> optional LOADOUT child compile
 -> ALEX local evaluation
 -> consumer proposal
 -> owning-world Heart / gate
 -> ADMIT | REFUSE | FAIL | NO-OP
 -> W1 + trace
```

The eCODE-level invariant is:

```text
ordinary composition cannot silently cross the constitutional boundary
```

Therefore:

```text
locally supported != actionable
actionable != authorized
authorized != admitted
admitted != successful
successful != universally meaningful
```

The owner of consequence remains outside LOADOUT, 3rdi, and ALEX.

## 11. Mathematical form

A compact view is:

```text
L_0(T) -> C_0
P_(o,c,d)(C_0, W_t) -> V_o
L_1(C_0, V_o) -> C_1        # only when recompile is required
A_r(C_1, V_o, q) -> E_o(q)
K_g(E_o, V_o) -> a_o?
H_w(a_o, W_t) -> (W_t+1, disposition)
```

where:

- `L_0` is LOADOUT entry compilation;
- `P` is 3rdi observer/cut/decoder projection;
- `L_1` is an optional attributable LOADOUT child compile;
- `A` is ALEX evaluation;
- `K` is any downstream consumer, Novelist being one example;
- `H` is the separately owned constitutional crossing.

If no recompile is required, `C_1` is the same compile reference as `C_0`.

The critical condition for an actor proposal is:

```text
epistemic_basis(a_o) subset_of lawfully_reachable(o, c)
```

Goals, desires, values, and pressures are not being reduced to evidence. The condition applies to the knowledge/inference basis of the act.

This does not require the actor to be correct. It requires the actor's epistemic formation to remain attributable to the world they actually inhabited.

## 12. Common-stack identity

The intended ecosystem simplification is explicit:

```text
COMMON REASONING STACK

LOADOUT
  mortal compiler / front door

3rdi
  observer-local projection / knowability

ALEX
  evidence, derivation, pressure, provenance
```

Everything else should justify waking separately.

Examples:

```text
Novelist       narrative composition/rendering consumer
MEMENTO        durable remembered-world substrate
Free Graph     traversal/association discovery surface
Wolfram        exact computation when needed
Scholar tools  research acquisition/pressure when needed
GitHub/GitBook source/workspace systems
eCODE          constitutional grammar, not a mandatory plugin invocation
```

This is not a claim that every task needs all three common organs. LOADOUT may select none, one, two, or all three. "Common stack" means shared architectural spine, not mandatory invocation bundle.

## 13. Failure conditions

Reject or redesign the contract if any implementation does any of the following:

- creates a master ontology jointly owned by LOADOUT, 3rdi, and ALEX;
- makes ALEX infer observer availability instead of consuming attributable projection testimony;
- makes 3rdi decide semantic support or truth;
- lets LOADOUT-selected context count as evidence merely because it was selected;
- mutates an existing compile after a projection changes the required context;
- loses ancestry between entry and evaluation compiles;
- treats absence of attention as `ignored`;
- treats rejection as falsehood;
- treats a later revelation as knowledge at an earlier cut;
- converts serialization into causal precedence;
- gives Novelist direct access to globally known facts that its actor projection withholds;
- makes MEMENTO required to run the core specimen;
- lets a green stack result perform a side effect or admission by itself;
- requires a universal world ontology before the tiny hostile room can run.

## 14. Graduation sequence

### Gate A — written contract

This design is reviewed as a neutral cross-stack boundary. No constituent repository changes are implied by the document alone.

### Gate B — static hostile fixture

Freeze the tiny `FOUR WITNESSES / ONE ROOM` world, roles, claims, expected non-collapses, and receipt identities in a neutral test-vector format.

### Gate C — constituent adapters

Implement only the smallest required changes in each owning project:

```text
LOADOUT: entry/evaluation compile binding and child ancestry as needed
3rdi:    projection handoff sufficient for the fixture
ALEX:    LOCAL-SUPPORT-001 bounded profile
```

No Novelist or MEMENTO dependency yet.

### Gate D — blind cross-stack proof

Run the same hostile world through the three organs with CASE/ORACLE separation. The evaluator may know global truth while each actor-side execution sees only its lawful case surface.

### Gate E — second consumer

Only after the common-stack proof is green, use Novelist or a game/world runtime as a materially different consumer. This proves the stack is not merely a narrative-specific pipeline.

### Gate F — consequential world

Only then connect one actor proposal to a separately owned eCODE/owning-world Heart and prove that stack success still does not imply admission.

## 15. Recommendation

Do not build a new plugin named `MORTAL-ACTOR` yet.

Treat `MORTAL-ACTOR-001` as a cross-stack proof family.

If several materially different domains later need the exact same orchestration semantics, a dedicated orchestrator may earn existence. Until then, LOADOUT is already the correct front door.

The shortest durable statement is:

> **LOADOUT gives the actor a mortal world.**
>
> **3rdi gives that world a point of view.**
>
> **ALEX keeps the point of view from becoming counterfeit knowledge.**
>
> **No actor may act from a world they never inhabited.**

Working seal:

> **THE STORY IS THE RECEIPT OF CHOICES MADE INSIDE PARTIAL WORLDS.**
