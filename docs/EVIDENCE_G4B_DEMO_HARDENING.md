# G4B — Bounded Demo Hardening

Date: 2026-09-06
Source: Winner Intelligence G4A pre-submission audit

## Objective

Make the strongest already-verified CALLSHEET ZERO mechanism reliably visible to judges without faking a live result and without weakening the existing live product path.

## Implemented changes

### 1. Existing live path preserved

`Run disruption` still calls `/api/run` and triggers a new Mozaik execution. No deterministic collision was injected into the live model path.

### 2. Truthfully labeled Verified Repair Replay

A second control, `Replay verified repair`, was added to the product UI.

The replay:

- does **not** call a model,
- is explicitly labeled `VERIFIED REPLAY`,
- reconstructs captured evidence from the canonical 2026-09-05 live Mozaik run documented in `docs/EVIDENCE_G1_G2.md`,
- shows the already-proved conflict → targeted repair path deterministically,
- never presents replayed receipts as a new live execution.

### 3. Judge-facing first-five-second cue

The UI now surfaces:

> **THREE AGENTS REACT AT ONCE.**

with the supporting line:

> Shared state · independent decisions · real collisions

The hero also exposes:

> **Three agents. One film shoot. They don't wait for each other.**

### 4. Canonical replay path

The replay surfaces the verified evidence sequence:

```text
Schedule inference.started  17:54:46.830Z
Talent inference.started    17:54:46.852Z
Logistics inference.started 17:54:46.853Z
first initial completion    17:54:55.285Z
→ 8.432s verified three-way overlap
→ concurrency PROVED

lead_actor conflict
camera_a conflict
van_1 conflict
→ repair.requested
→ Schedule Agent v2 repair loop
→ S22 @ 18:00
→ final plan conflict-free
```

The conflict ordering is derived from the canonical evidence; the replay is a presentation of recorded evidence, not a new telemetry stream.

### 5. Progressive judge choreography

The replay deliberately reveals the path in stages instead of dumping the final state immediately:

1. three agents visibly running,
2. initial concurrency proof,
3. three resource conflicts,
4. targeted repair request / Schedule Agent v2,
5. final conflict-free schedule.

This is designed for a 75–90 second demo capture and preserves truthfulness throughout.

### 6. Evidence surfacing drift reconciled

- README human browser smoke checkbox is now closed.
- README documents live vs verified replay explicitly.
- Submission draft now lists all three canonical conflicts: `lead_actor`, `camera_a`, `van_1`.
- Submission wording keeps Mozaik as the core sponsor-native runtime and Adaption as the secondary asynchronous learning layer.

## Integrity boundary

```text
LIVE RUN = NEW MODEL EXECUTION
VERIFIED REPLAY = CAPTURED EVIDENCE PRESENTATION
SIMULATION = CLEARLY LABELED PREVIEW WHEN PROVIDER CREDENTIAL IS ABSENT
```

These modes are not interchangeable and the UI labels them separately.

## Gate

```text
G4B_BOUNDED_DEMO_HARDENING = IMPLEMENTED
G4B_LIVE_PATH_PRESERVED = TRUE
G4B_VERIFIED_REPAIR_REPLAY = IMPLEMENTED
G4B_REPLAY_TRUTHFULLY_LABELED = TRUE
G4B_FIRST_5S_CUE = IMPLEMENTED
G4B_CANONICAL_THREE_CONFLICTS_SURFACED = TRUE
G4B_TARGETED_REPAIR_SURFACED = TRUE
G4B_FINAL_CONFLICT_FREE_STATE_SURFACED = TRUE
G4B_EVIDENCE_SURFACING_DRIFT = RECONCILED
NEXT_EXACT_GATE = G4B_DEPLOY_VERIFY_THEN_TRACE_JUDGE_FACING_REVIEW
```
