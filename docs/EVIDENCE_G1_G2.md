# CALLSHEET ZERO — Live Evidence: G1 + G2

Date: 2026-09-05
Provider: Anthropic
Model: `claude-sonnet-4-6`
Runtime: `@mozaik-ai/core` 4.0.5

## Verdict

- **G1 — Live Mozaik runtime:** PASS
- **G1B — Genuine three-agent concurrency:** PASS
- **G2 — Deterministic conflict detection + event-driven repair:** PASS
- **Final invariant check:** PASS

The run completed with `mode: "live"` and `status: "complete"`.

## Mozaik Cloud loops

Initial concurrent loops:

- https://app.jigjoy.ai/?s=loop_ab3f8defd14a4e91b78d3f3f5095a45a
- https://app.jigjoy.ai/?s=loop_ada609e06e8a4adeb705208fc26ac97c
- https://app.jigjoy.ai/?s=loop_64f2a891e68e4720a0532019efbfcec9

Event-driven repair loop:

- https://app.jigjoy.ai/?s=loop_1eebc2d6a44c455b93136eb3c4e7fc09

## G1 — Concurrency receipt

Initial inference starts:

| Agent | `inference.started` |
| --- | --- |
| Schedule Agent | `2026-09-05T17:54:46.830Z` |
| Talent Agent | `2026-09-05T17:54:46.852Z` |
| Logistics Agent | `2026-09-05T17:54:46.853Z` |

Initial inference completions:

| Agent | `inference.completed` |
| --- | --- |
| Talent Agent | `2026-09-05T17:54:55.285Z` |
| Logistics Agent | `2026-09-05T17:54:55.461Z` |
| Schedule Agent | `2026-09-05T17:54:56.056Z` |

Proof condition:

```text
max(initial inference starts) < min(initial inference completions)
17:54:46.853Z < 17:54:55.285Z
PASS
```

All three agents were simultaneously in inference for approximately **8.432 seconds** before the first agent completed. This is runtime-event evidence, not a simulated timing trace.

## G2 — Conflict and repair receipt

The three independently generated first-round proposals converged on the same 16:30 window and produced three real resource conflicts:

1. `lead_actor`: Talent ↔ Schedule
2. `camera_a`: Talent ↔ Schedule
3. `van_1`: Logistics ↔ Schedule

The deterministic Constraint Guard then emitted `repair.requested` and targeted the Schedule Agent. The repair loop started at `2026-09-05T17:54:56.058Z` and completed at `2026-09-05T17:55:00.317Z`.

The Schedule Agent returned version 2:

```text
Scene: S22
Start: 18:00
Location: Stage B
Resources: lead_actor, camera_a, van_1
```

The Talent and Logistics proposals both occupy 16:30–18:00. Under the runtime's half-open overlap rule, the Schedule proposal beginning exactly at 18:00 does not overlap them. The Constraint Guard therefore committed a conflict-free call sheet.

## Final outcome

```text
LIVE_PROVIDER = ANTHROPIC
LIVE_MODEL = claude-sonnet-4-6
LIVE_RUN = COMPLETE
THREE_AGENT_CONCURRENCY = PROVED
INITIAL_CONFLICTS = 3
EVENT_DRIVEN_REPAIR = PROVED
FINAL_PLAN_CONFLICT_FREE = TRUE
DETERMINISTIC_FALLBACK_USED = FALSE
```

This evidence is the canonical live proof for the hackathon submission and demo recording.
