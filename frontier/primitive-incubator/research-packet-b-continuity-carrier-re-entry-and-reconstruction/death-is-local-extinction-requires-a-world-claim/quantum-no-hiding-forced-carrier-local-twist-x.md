---
description: >-
  Quantum no-hiding bedrock: complete bleaching plus linearity and unitarity
  forces the missing arbitrary state into a complementary carrier, recoverable
  by a local unitary there.
---

# Quantum No-Hiding — Forced Carrier, Local Twist, X

{% hint style="warning" %}
**Boundary condition:** this page records a theorem of quantum information and an eCODE structural analogy. It does **not** establish survival of organisms, persons, memories, meanings, or consciousness after biological death.
{% endhint %}

## Original theorem

Braunstein and Pati's no-hiding theorem considers an arbitrary unknown input quantum state `|ψ⟩` and a physical process whose visible output subsystem `O` has been completely bleached of that input:

`ρ_O(ψ) = σ_O` for every `|ψ⟩`.

Under standard complex quantum mechanics, representing the complete process unitarily on `O ⊗ A`, the theorem says the missing arbitrary state cannot be encoded **only** in correlations between `O` and its complement `A`.

Up to a unitary acting on the complement, the global state factorizes in the form

`|Ψ(ψ)⟩ = |junk⟩ ⊗ |ψ⟩`.

The unknown state has changed address. It has not been manufactured by the recovery operation.

## Proof skeleton — the useful compression

Diagonalize the fixed bleached output:

`σ_O = Σ_k p_k |k⟩⟨k|`.

A Schmidt form for the global pure output can be written:

`|Ψ(ψ)⟩ = Σ_k √p_k |k⟩_O |A_k(ψ)⟩_A`.

Because the visible reduced state is independent of `ψ`, all dependence on the arbitrary input has to appear in the complementary vectors. Apply the construction to an orthonormal input basis `|j⟩`. Linearity and preservation of inner products under unitarity force the relevant complementary states into an orthogonal structure.

A unitary acting **only on the complement** can therefore choose a basis in which:

`|A_kj⟩ → |q_k⟩ ⊗ |j⟩`.

For an arbitrary superposition `|ψ⟩ = Σ_j c_j|j⟩`, this exposes:

`|Ψ(ψ)⟩ = (Σ_k √p_k |k⟩|q_k⟩) ⊗ |ψ⟩`.

Compressed:

> **BLEACH(X) → forced orthogonal structure → local twist → junk ⊗ X**

The twist does not create `X`. It reveals the carrier structure that unitarity and linearity already forced into the complement.

## What “rest of the Universe” means

The phrase is technical. It means the complementary Hilbert-space degrees of freedom in the unitary description: environment, ancilla, field modes, apparatus, radiation, or other degrees of freedom required by the model.

It does **not** mean the theorem independently proves that every ordinary object or every semantic feature of a person remains recoverable somewhere in space.

The complement may itself be multipartite and the state may be distributed across it. No-hiding forbids the arbitrary input from residing **solely across the `O | A` correlation boundary**; it does not require one tidy microscopic object inside `A` to contain the whole state.

## Assumptions and guardrails

1. **Unitarity is load-bearing.** The result follows within standard quantum mechanics (or an open-system description dilated to a global unitary). It is not independent evidence that all fundamental evolution is unitary.
2. **Complete bleaching is the exact theorem.** If `O` retains some input dependence, the exact factorization no longer applies, though approximate forms can be studied.
3. **Arbitrary unknown quantum state matters.** Restricted state families can behave differently; masking results must not be overgeneralized.
4. **Quantum information is not semantic identity.** State amplitudes, phases, coherence, and reference-system relations are not automatically equivalent to memory, personality, narrative, or consciousness.
5. **Recoverable in principle is not accessible in practice.** Scrambling, dispersion, noise, and causal inaccessibility may make a complementary encoding effectively unrecoverable to an observer.

## Why correlation is the surprising part

Classically, a one-time pad can place a message entirely in a relation: ciphertext alone reveals nothing, key alone reveals nothing, but the pair determines the message.

No-hiding says an arbitrary unknown quantum state cannot be treated in the fully analogous way under its assumptions. If one side is completely bleached, the missing state must have a complementary carrier rather than existing solely as a relation across the partition.

This is why the eCODE extraction should be stricter than:

`gone from here ≠ gone`.

It should be:

> **If continuity is claimed after local disappearance, identify the carrier.**

And the inverse discipline matters too:

> **“It survives in the relationships somehow” is not, by itself, an adequate continuity witness.**

## Experimental witness

Samal, Pati, and Kumar reported an NMR test in 2011 using quantum-state randomization as a bleaching process. The original qubit became maximally mixed, while the missing state could be recovered from ancilla qubits up to local unitary transformations.

The experiment is a concrete specimen of a local loss of state-dependence followed by recovery from the complementary degrees of freedom. It does not expand the theorem beyond its assumptions.

## The no-go family

No-hiding sits beside other constraints generated by quantum linearity/unitarity:

* **no-cloning:** an arbitrary unknown state cannot be freely copied;
* **no-deleting:** an arbitrary unknown duplicate cannot be universally erased in the prohibited sense;
* **no-hiding:** an arbitrary unknown state completely bleached from one subsystem cannot be made to exist only nowhere-in-particular across correlations with the complement.

A cautious family-level phrase is **permanence of quantum information under the specified dynamics**, not metaphysical immortality.

## eCODE extraction

The quantum theorem should enter the larger [Death Is Local — Extinction Requires a World Claim](../../) primitive only as a **bounded structural witness**.

Candidate obligation:

```
CONTINUITY_AFTER_LOCAL_CESSATION(X)
requires
CARRIER(X) + ATTRIBUTION(X) + BOUNDARY + EVIDENCE
```

Candidate hostile question:

`WHERE_IS_X_CARRIED?`

Failure modes this should catch:

* local non-observation silently promoted to global extinction;
* a vague “distributed somehow” story counted as continuity without an addressable carrier;
* old residue silently promoted back into present authority;
* similarity counted as identity or ancestry;
* a mathematical/quantum analogy silently promoted into a claim about biological death.

## Sources

* Samuel L. Braunstein & Arun K. Pati, **“Quantum Information Cannot Be Completely Hidden in Correlations: Implications for the Black-Hole Information Paradox,”** _Physical Review Letters_ 98, 080502 (2007). DOI: [10.1103/PhysRevLett.98.080502](https://doi.org/10.1103/PhysRevLett.98.080502). Preprint: [arXiv:gr-qc/0603046](https://arxiv.org/abs/gr-qc/0603046).
* Jharana Rani Samal, Arun K. Pati & Anil Kumar, **“Experimental Test of the Quantum No-Hiding Theorem,”** _Physical Review Letters_ 106, 080401 (2011). DOI: [10.1103/PhysRevLett.106.080401](https://doi.org/10.1103/PhysRevLett.106.080401). Preprint: [arXiv:1004.5073](https://arxiv.org/abs/1004.5073).
