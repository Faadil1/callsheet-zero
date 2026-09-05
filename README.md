# CALLSHEET ZERO

**Concurrent constraint repair for a world that won't wait.**

CALLSHEET ZERO is a JigJoy × daily.dev × Hyperskill Hackathon 2026 project built on **Mozaik v4**. Three AI agents react independently to the same production disruption while sharing one runtime. Their locally sensible proposals can collide over scarce resources; a deterministic constraint guard catches those collisions and triggers an event-driven repair against the state that exists *now*.

## Judge thesis

> A normal scheduling agent plans for the world it was given. CALLSHEET ZERO keeps repairing the plan while the world changes — because its agents do not wait for each other.

The demo is deliberately small and inspectable:

1. Rain removes an exterior location and the lead actor is delayed 90 minutes.
2. **Schedule**, **Talent**, and **Logistics** agents all react to the same `message.sent` event.
3. Mozaik starts their `runLoop()` calls fire-and-forget; semantic events expose the real overlap.
4. Each agent produces a structured local repair proposal.
5. The deterministic **Constraint Guard** finds overlapping claims on `lead_actor`, `camera_b`, or `van_1`.
6. It publishes `repair.requested` to the Schedule Agent.
7. The Schedule Agent runs a second loop against the updated shared state.
8. A conflict-free plan is committed.

## Why this is genuinely concurrent

This is not a sequential planner → executor → reviewer workflow and not a `Promise.all()` wrapper around unrelated tasks. The three participants are joined to one Mozaik runtime and react independently to the same semantic event. The UI reports the `inference.started` and `inference.completed` timestamps emitted by Mozaik. A run earns **PROVED** when all three initial inference loops start before the first one completes.

Mozaik Cloud can independently display every agent, loop, inference step, tool call, live state and timeline when `MOZAIK_API_KEY` is configured.

## Architecture

```text
Production Controller
        │ message.sent: rain + actor delay
        ▼
┌──────────────── Mozaik Runtime ────────────────┐
│                                               │
│ Schedule Agent ─┐                             │
│ Talent Agent   ─┼─ concurrent runLoop()       │
│ Logistics Agent ┘                             │
│        │                                      │
│        └────────── model.answer ──────────────┤
│                                               │
│ Constraint Guard                             │
│   ├─ shared-state conflict detection          │
│   ├─ repair.requested semantic event          │
│   └─ commit only if invariants pass           │
└───────────────────────────────────────────────┘
```

## Run locally

```bash
npm install
cp .env.example .env
# add one provider key, e.g. OPENAI_API_KEY
npm run dev
```

Open `http://localhost:3000`.

Without a matching model provider credential, the endpoint intentionally returns a clearly labeled **SIMULATION** preview so the product UI remains reviewable. It does **not** claim that preview as live concurrency proof.

### CLI demo

```bash
npm run demo
npm run demo -- --simulation
```

## Mozaik Cloud

```bash
npx @mozaik-ai/cloud-sdk pair
```

Or add a project key to `.env`:

```bash
MOZAIK_API_KEY=pk_...
```

With `@mozaik-ai/core` 4.x, runtime events flow to Mozaik Cloud automatically.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `OPENAI_API_KEY` | Default provider credential for `gpt-5.4` |
| `MOZAIK_MODEL` | Optional model override |
| `ANTHROPIC_API_KEY` | Used when `MOZAIK_MODEL` starts with `claude` |
| `GEMINI_API_KEY` | Used when `MOZAIK_MODEL` starts with `gemini` |
| `MOZAIK_API_KEY` | Optional Mozaik Cloud observability |

## Submission checklist

- [x] `@mozaik-ai/core` is a direct runtime dependency
- [x] Three AI agents can run concurrently
- [x] Shared runtime state is explicit
- [x] Concurrency receipts are surfaced in-product
- [x] Deterministic constraints are separate from LLM judgment
- [x] Event-driven repair exists
- [ ] Live provider key configured
- [ ] Mozaik Cloud paired
- [x] Public GitHub repository
- [ ] Live deployment
- [ ] Short demo video
- [ ] Hackathon submission

See [`PRD.md`](./PRD.md), [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md), and [`docs/STATE.md`](./docs/STATE.md).
