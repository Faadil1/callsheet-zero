# Submission draft

## Project name
CALLSHEET ZERO

## Judge memory sentence

**Parallel decisions are easy. CALLSHEET ZERO refuses the collisions they create, then repairs the schedule against the world that exists now.**

Alternative hook:

**Three agents can all be right locally — and still produce an impossible shoot.**

## Short description
CALLSHEET ZERO is a film-production recovery system where three Mozaik agents react concurrently to the same disruption. Their individually sensible decisions can collide over scarce actors, cameras, and vehicles. A deterministic Constraint Guard refuses to commit the impossible Revision 01, exposes the exact hard holds, and sends a targeted `repair.requested` event to the Schedule Agent only. Revision 02 is committed only after the final shared-resource check returns zero conflicts.

A verified live Mozaik run proved all three initial agents were in inference together for 8.432 seconds before the first completed, produced three exact resource conflicts (`lead_actor`, `camera_a`, `van_1`), and repaired S22 to 18:00 without restarting the workflow.

Completed verified repairs can also flow asynchronously into Adaption Labs to generate preference data for future training/evaluation, while the deterministic Guard remains the operational safety authority. Adaption is secondary to the real-time repair path.

## How agents run concurrently
Schedule, Talent and Logistics are separate Mozaik participants joined to one runtime. A single `message.sent` disruption event makes all three situation handlers eligible, and each immediately starts its own fire-and-forget `runLoop()`. CALLSHEET ZERO captures Mozaik's `inference.started` / `inference.completed` semantic events and marks concurrency as proved when all three initial loops have started before the first one finishes. A fourth observer participant is a deterministic Constraint Guard: it never runs inference, but validates shared-resource/time invariants and publishes a targeted `repair.requested` event when proposals conflict.

## Proof chain

The judge-facing proof is deliberately receipt-first:

```text
3 inference starts before first completion
→ 8.432s verified three-way overlap
→ REV 01 COMMIT REFUSED
→ lead_actor / camera_a / van_1 hard holds
→ repair.requested to Schedule Agent
→ Schedule Agent REV 02 / S22 @ 18:00
→ final hard conflicts = 0
→ COMMIT ALLOWED
```

Machine-readable canonical receipt:

`https://callsheet-zero.vercel.app/evidence/canonical-run.json`

Canonical evidence notes:

`docs/EVIDENCE_G1_G2.md`

## Demo disclosure
The product keeps its normal live `Run live` path. Because model decisions are stochastic and a valid live run can sometimes avoid collisions on the first pass, the final judge path also includes a clearly labeled **Verified Repair Replay**. That replay does **not** trigger a new model call. It reconstructs the captured receipts from the canonical verified live run documented in `docs/EVIDENCE_G1_G2.md`, so judges can inspect the already-proved conflict → refusal → targeted repair → commit path deterministically without presenting replayed evidence as a new live execution.

`COMMIT REFUSED` is a deterministic decision-layer interpretation of the three verified hard conflicts. It is intentionally not fabricated as a Mozaik semantic event; the underlying event receipts remain `conflict.detected` followed by `repair.requested`.

## Demo beats
1. Open with: **Three agents can all be right locally — and still produce an impossible shoot.**
2. Show the stable call sheet and the rain + lead actor delay.
3. Start the clearly labeled **Verified Repair Replay**.
4. Show all three inference starts before the first completion → 8.432s verified overlap.
5. Show **REV 01 · COMMIT REFUSED** and all three exact hold receipts: `lead_actor`, `camera_a`, `van_1`.
6. Show `repair.requested` targeting Schedule Agent only.
7. Show Schedule Agent Revision 02 moving S22 to 18:00.
8. Show **REV 02 · COMMIT ALLOWED** and final conflicts = 0.
9. Briefly expose the machine-readable / Mozaik evidence chain.
10. If time permits, close with one sentence on Adaption: verified repair → asynchronous preference data.
