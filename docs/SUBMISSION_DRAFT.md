# Submission draft

## Project name
CALLSHEET ZERO

## Judge memory sentence

**Three agents make good decisions at the same time. CALLSHEET ZERO catches when those decisions collide — and repairs the plan live.**

## Short description
CALLSHEET ZERO is a film-production recovery system where three Mozaik agents react concurrently to the same disruption. Their individually sensible decisions can collide over scarce actors, cameras, and vehicles; a deterministic Constraint Guard detects the exact overlap and triggers a targeted repair against the latest shared state. A verified live Mozaik run proved all three agents were in inference together, produced three real resource conflicts, and repaired the call sheet without restarting the workflow.

Completed verified repairs can also flow asynchronously into Adaption Labs to generate preference data for future training/evaluation, while the deterministic Guard remains the operational safety authority.

## How agents run concurrently
Schedule, Talent and Logistics are separate Mozaik participants joined to one runtime. A single `message.sent` disruption event makes all three situation handlers eligible, and each immediately starts its own fire-and-forget `runLoop()`. CALLSHEET ZERO captures Mozaik's `inference.started` / `inference.completed` semantic events and marks concurrency as proved when all three initial loops have started before the first one finishes. A fourth observer participant is a deterministic Constraint Guard: it never runs inference, but validates shared-resource/time invariants and publishes a targeted `repair.requested` event when proposals conflict.

## Demo disclosure
The product keeps its normal live `Run disruption` path. Because model decisions are stochastic and a valid live run can sometimes avoid collisions on the first pass, the final judge path also includes a clearly labeled **Verified Repair Replay**. That replay does **not** trigger a new model call. It reconstructs the captured receipts from the canonical verified live run documented in `docs/EVIDENCE_G1_G2.md`, so judges can inspect the already-proved conflict → targeted repair path deterministically without presenting replayed evidence as a new live execution.

## Demo beats
1. Open with: **Three agents. One film shoot. They don't wait for each other.**
2. Show stable call sheet and the rain + lead actor delay.
3. Start the clearly labeled **Verified Repair Replay**.
4. Show all three inference starts before the first completion → `PROVED`.
5. Show all three collision receipts: `lead_actor`, `camera_a`, `van_1`.
6. Show `repair.requested` and Schedule Agent v2.
7. Show S22 moved to 18:00 and the final conflict-free committed state.
8. Briefly open the Mozaik Cloud receipts / evidence.
9. Briefly show the Adaption async learning proof: verified repair → preference data.
