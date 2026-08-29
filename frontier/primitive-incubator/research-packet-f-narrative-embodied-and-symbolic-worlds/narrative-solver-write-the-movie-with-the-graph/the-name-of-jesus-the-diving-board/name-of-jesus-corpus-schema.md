# NAME-OF-JESUS Corpus Schema

Purpose: prepare an infrastructure-ready corpus that lets the future dive begin at raw attestations and only later promote structural claims.

## Core object

```yaml
attestation_id:
source_world: A|B|C|D
artifact_id:
canonical_or_catalog_id:
approx_date:
date_basis:
provenance:
source_type:
language:
script:
raw_form:
editorial_transcription:
normalized_form:
transliteration:
translation:
referent:
referent_confidence:
speaker_or_scribe:
audience_or_target:
syntax:
preposition:
case:
verb:
name_cluster:
operation:
narrative_outcome:
material_marking:
intertext:
interpretation_history:
claim_type:
confidence:
independence_status:
```

## Name-cluster fields

Separate:

```
JESUS
CHRIST / MESSIAH
LORD / KYRIOS
SON OF GOD
SON OF MAN
NAZARENE / NAZORAIOS
SON OF DAVID
SAVIOR
NAME / ONOMA language
```

A cluster is not a single mega-title.

## Greek name-construction extraction

For each relevant New Testament occurrence collect:

```
exact Greek phrase
lemma sequence
preposition
case
finite verb / participle / infinitive
subject
object
agency construction
quoted scripture?
ritual context?
public/private?
claimed consequence?
```

Especially distinguish:

```
ἐν τῷ ὀνόματι
εἰς τὸ ὄνομα
ἐπὶ τῷ ὀνόματι
διὰ τὸ ὄνομα
καλεῖν / ἐπικαλεῖσθαι + name language
```

Do not normalize these to one English formula.

## Manuscript-first mode

When the infrastructure can retrieve manuscript images, record:

```
image crop
line number
raw majuscule characters
nomen-sacrum expansion
supralinear stroke geometry
scribal correction
spacing
neighboring nomina sacra
confidence of reading
```

## Relational feature vector

Only after extraction:

```
IDENTIFIES_PERSON
DISAMBIGUATES_PERSON
INVOKES_NONLOCAL_REFERENT
CLAIMS_AGENCY
CONSTITUTES_RITUAL_IDENTITY
CARRIES_SCRIPTURAL_REFERENT
MARKS_SACRAL_GRAPHIC_CLASS
TRIGGERS_NARRATIVE_CONSEQUENCE
FAILS_TO_TRIGGER_EXPECTED_CONSEQUENCE
RECEIVES_LATER_THEOLOGICAL_READING
```

## PEEL / rebuild experiment

Once the corpus is large enough:

```
1 hide canonical labels and theology tags
2 cluster by relational features
3 derive smallest candidate root(s)
4 predict which textual/material families should exist
5 reveal source identities
6 score fit + residuals
7 compare to generic religion / authority / proper-name controls
```

If every sacred name corpus gives the same result, the compression is too generic.

If Jesus material produces a distinctive topology, identify exactly which features create the difference rather than calling it “uniqueness.”

## Target question

> **What relation is actually traveling each time the Name crosses a boundary?**
