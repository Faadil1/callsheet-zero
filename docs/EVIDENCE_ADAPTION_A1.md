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

The pipeline requested an estimate before any paid run and refused to continue when the quote exceeded the configured credit cap.

## Verified launch result

```text
Using existing learning dataset: data/adaption/verified-repair-seed.jsonl
repairCaptured=true
Adaption dataset ready: 76dbb5ae-03b8-47a5-961f-6dc8e9339d70
Estimate: 1 credits, 11 min, estimate=true
Adaption run started: dataset-76dbb5ae-03b8-47a5-961f-6dc8e9339d70-1788653350271
Reserved estimate: 1 credits
```

## Verified completion

The same dataset was polled through the Adaption status API until completion.

```text
dataset_id = 76dbb5ae-03b8-47a5-961f-6dc8e9339d70
status = succeeded
row_count = 1
progress.percent = 100
progress.processed_rows = 1
progress.total_rows = 1
error_data = empty
```

The processed artifact was downloaded successfully as JSONL:

```text
artifacts/adaption-a1-output.jsonl
size = 5128 bytes
rows = 1
```

The output contains the original CALLSHEET ZERO repair context plus generated `chosen` and `rejected` preference fields. The generated `chosen` repair keeps S22 on Stage B at 18:00 with the baseline-required `lead_actor` and `camera_a`, resolving the original 16:30 resource collisions. The source metadata remains attached, including the verified production deployment id, `repairCaptured=true`, `deterministicFallbackUsed=false`, and the 4953 ms production concurrency window.

## Quality interpretation

A1 proves the full sponsor integration path end to end:

```text
verified Mozaik production repair
→ CALLSHEET ZERO learning seed
→ Adaption upload
→ estimate-only spend gate
→ bounded paid preference_pairs run
→ succeeded processing
→ downloadable chosen/rejected artifact
```

The generated `rejected` candidate is also operationally conflict-free in this one-row result; its weakness is mainly representation/verbosity rather than an unsafe resource collision. Therefore this evidence should be described as **preference-data generation from a verified repair**, not as proof that Adaption independently learned an unsafe→safe transformation. The deterministic Constraint Guard remains the authority for operational safety, and generated learning rows should pass a post-generation validation gate before promotion into a larger training corpus.

## Final gate

```text
A1_ADAPTION_BOUNDED_RUN_START = PASS
A1B_ADAPTION_PROCESSING = PASS
A1B_ADAPTION_OUTPUT_DOWNLOAD = PASS
A1B_ADAPTION_OUTPUT_ROWS = 1
A1B_ADAPTION_OUTPUT_BYTES = 5128
A1B_ADAPTION_PREFERENCE_FIELDS = CHOSEN_AND_REJECTED_PRESENT
A1_ADAPTION_DATASET_ID = 76dbb5ae-03b8-47a5-961f-6dc8e9339d70
A1_ADAPTION_RUN_ID = dataset-76dbb5ae-03b8-47a5-961f-6dc8e9339d70-1788653350271
A1_ADAPTION_ESTIMATED_CREDITS = 1
A1_ADAPTION_RESERVED_ESTIMATE = 1
A1_ADAPTION_ESTIMATED_MINUTES = 11
A1_ADAPTION_END_TO_END = PASS
ADAPTION_REAL_INTEGRATION = PROVED
NEXT_EXACT_GATE = G3G_HUMAN_UI_CLICK_SMOKE_THEN_G4_DEMO_AND_SUBMISSION
```
