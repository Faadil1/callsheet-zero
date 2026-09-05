# Architecture

## Runtime participants

### Production Controller (human participant)
Publishes the disruption as `message.sent`.

### Schedule Agent
Optimizes scene order and throughput. Its intentionally local first preference competes for the same 16:30 resources as peers.

### Talent Agent
Optimizes lead-actor availability and continuity.

### Logistics Agent
Optimizes weather-safe locations, equipment, and vehicle use.

### Constraint Guard (human/observer participant)
Runs no inference. It listens to `model.answer`, mutates shared `CallsheetState`, checks interval/resource invariants, and emits `repair.requested` when proposals collide.

## Event flow

```text
message.sent
  ├─ Schedule Agent → runLoop ─┐
  ├─ Talent Agent   → runLoop ─┼─ model.answer
  └─ Logistics Agent→ runLoop ─┘       │
                                       ▼
                               Constraint Guard
                                  │ conflict
                                  ▼
                            repair.requested
                                  │ targeted
                                  ▼
                            Schedule Agent
                                  │ v2 answer
                                  ▼
                              commit state
```

## Why the guard is deterministic

Resource overlap is an invariant, not a language-model judgment. If two overlapping proposals both require `lead_actor` or `van_1`, the state is invalid regardless of how persuasive either agent sounds. Keeping this rule outside inference makes the failure legible, reproducible and auditable.

## Concurrency evidence

Mozaik emits `inference.started` and `inference.completed` per loop. CALLSHEET ZERO stores the first start/completion timestamp per initial agent. The proof condition is:

```text
max(initial_inference_start_times) < min(initial_inference_completion_times)
```

If true, all three agents were in-flight before any first-round model call completed.

## Resilience

- Structured output constrains proposal shape.
- JSON parsing has a defensive recovery path.
- API timeout returns a clearly labeled simulation preview rather than pretending a failed run was live.
- A second conflicting Schedule repair is fenced by a deterministic safe-slot fallback.
