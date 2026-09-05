# Submission draft

## Project name
CALLSHEET ZERO

## Short description
CALLSHEET ZERO is a concurrent constraint-repair system for production schedules. When reality changes, three Mozaik agents react independently to the same shared state; their locally rational proposals can collide over actors, cameras and vehicles, so a deterministic guard surfaces the conflict and triggers a targeted repair without restarting the workflow.

## How agents run concurrently
Schedule, Talent and Logistics are separate Mozaik participants joined to one runtime. A single `message.sent` disruption event makes all three situation handlers eligible, and each immediately starts its own fire-and-forget `runLoop()`. CALLSHEET ZERO captures Mozaik's `inference.started` / `inference.completed` semantic events and marks concurrency as proved when all three initial loops have started before the first one finishes. A fourth observer participant is a deterministic Constraint Guard: it never runs inference, but validates shared-resource/time invariants and publishes a targeted `repair.requested` event when proposals conflict.

## Demo beats
1. Show stable call sheet.
2. Trigger rain + lead actor delay.
3. Show three agents enter running state together.
4. Show collision receipts (`lead_actor`, `van_1`).
5. Show targeted repair event and Schedule Agent v2.
6. Show conflict-free committed state.
7. Open Mozaik Cloud and show overlapping loops/timeline.
