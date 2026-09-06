# Adaption A1 — First bounded repair-learning run

Date: 2026-09-06

CALLSHEET ZERO's optional Adaption Labs layer was exercised with the verified repair seed captured from the previously validated production repair run.

## Input

- Seed file: `data/adaption/verified-repair-seed.jsonl`
- Learning objective: preference learning from constraint repairs
- Training type: `preference_pairs`
- Seed provenance: verified production repair from deployment `dpl_97NVNrioU1r2FEjMWhQA83ciTcvR`
- Captured guard conflicts: 3
- Accepted repair: Schedule Agent version 2 at 18:00
- Deterministic fallback: false

## Spend guard

The local run was explicitly bounded before launch:

```text
ADAPTION_MAX_ROWS=1
ADAPTION_MAX_CREDITS=10
```

The pipeline requests an estimate before any paid run and refuses to continue when the quote exceeds the configured credit cap.

## Verified terminal result

```text
Using existing learning dataset: data/adaption/verified-repair-seed.jsonl
repairCaptured=true
Adaption dataset ready: 76dbb5ae-03b8-47a5-961f-6dc8e9339d70
Estimate: 1 credits, 11 min, estimate=true
Adaption run started: dataset-76dbb5ae-03b8-47a5-961f-6dc8e9339d70-1788653350271
Reserved estimate: 1 credits
```

## Interpretation

This proves that the Adaption API accepted the CALLSHEET ZERO learning dataset, returned a bounded 1-credit estimate, and accepted the explicit paid run request under the local 10-credit ceiling.

It does **not** yet prove that processing has completed or that a final preference-pair artifact has been produced. Those require a follow-up status/output check.

## Current gate

```text
A1_ADAPTION_BOUNDED_RUN_START = PASS
A1_ADAPTION_DATASET_ID = 76dbb5ae-03b8-47a5-961f-6dc8e9339d70
A1_ADAPTION_RUN_ID = dataset-76dbb5ae-03b8-47a5-961f-6dc8e9339d70-1788653350271
A1_ADAPTION_ESTIMATED_CREDITS = 1
A1_ADAPTION_RESERVED_ESTIMATE = 1
A1_ADAPTION_ESTIMATED_MINUTES = 11
A1_ADAPTION_OUTPUT = PENDING
NEXT_EXACT_GATE = A1B_VERIFY_RUN_COMPLETION_AND_OUTPUT
```
