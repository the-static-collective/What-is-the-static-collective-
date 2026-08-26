# Source Worlds & Evidence Contract

This page exists to keep the future `NAME-OF-JESUS` dive from converting resonance into ancestry.

## Evidence types

Every extracted claim must carry a type:

```
MANUSCRIPT FACT
EPIGRAPHIC FACT
LEXICAL / PHILOLOGICAL ANALYSIS
TEXTUAL VARIANT
NARRATIVE FUNCTION
INTERTEXTUAL RELATION
RITUAL PRACTICE CLAIM
HISTORICAL RECONSTRUCTION
LATER RECEPTION
THEOLOGICAL CLAIM
STRUCTURAL INFERENCE
SPECULATION
```

Never silently upgrade one type into another.

## Provenance record

Minimum record:

```
source_id
artifact_or_text
passage_or_location
language
exact_form
normalized_form
approx_date
provenance
source_type
referent
speaker_writer
construction
operation
outcome
intertext_candidates
scholarly_interpretations[]
confidence
independence_status
notes
```

For material witnesses additionally:

```
manuscript_id
image_reference
hand
script
ink / graphic treatment
abbreviation_type
supralinear_mark
expansion
editorial_reconstruction?
```

## Edge vocabulary

Prefer typed edges:

```
TRANSLITERATES_TO
SHORTENS_TO
WRITTEN_AS
REFERS_TO
DISTINCT_REFERENT_FROM
SHARES_NAME_FORM_WITH
QUOTES
ALLUDES_TO
INVOKES
USED_IN_RITE
CLAIMS_AUTHORITY_THROUGH
BEARS_NAME_OF
MARKED_SACREDLY_AS
INTERPRETED_AS
LATER_ASSOCIATED_WITH
TESTS
BEARS_ON
```

Avoid `SAME_AS` except under an explicit dimension.

## Independence

Two interpretations citing the same ancient passage are not two ancient witnesses.

Two manuscripts copied from a shared ancestor are not automatically independent.

A church father quoting a New Testament verse is reception evidence, not another first-century occurrence.

## Transformation trace

Every normalized string must retain ancestry:

```
RAW GRAPH
→ editorial transcription
→ normalized script
→ transliteration
→ pronunciation proposal
→ English label
```

Never cite the English label as if it were the raw artifact.

## The critical rule

> **The closer a claim gets to identity, authority, divinity, or efficacy, the more explicit its bridge must become.**
