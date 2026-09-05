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
5. The deterministic **Constraint Guard** finds overlapping claims on `lead_actor`, `camera_a`, and `van_1`.
6. It publishes `repair.requested` to the Schedule Agent.
7. The Schedule Agent runs a second loop against the updated shared state.
8. A conflict-free plan is committed.

## Verified live run

A live Anthropic run with `claude-sonnet-4-6` completed successfully on 2026-09-05.

- `mode: live`
- `status: complete`
- Three initial agents started inference before any initial inference completed.
- Three real shared-resource conflicts were detected.
- The Constraint Guard emitted an event-driven repair request.
- The Schedule Agent produced version 2 at 18:00.
- The final call sheet was conflict-free without the deterministic fallback.

The measured three-way overlap window was approximately **8.432 seconds**.

See [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md) for the timestamps, Mozaik Cloud loop receipts, conflict list, repair event, and final invariant proof.

## Why this is genuinely concurrent

This is not a sequential planner → executor → reviewer workflow and not a `Promise.all()` wrapper around unrelated tasks. The three participants are joined to one Mozaik runtime and react independently to the same semantic event. The UI reports the `inference.started` and `inference.completed` timestamps emitted by Mozaik. A run earns **PROVED** when all three initial inference loops start before the first one completes.

Mozaik Cloud independently records every agent loop and runtime event when `MOZAIK_API_KEY` is configured.

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
# configure ANTHROPIC_API_KEY and MOZAIK_API_KEY
npm run env:check
npm run schema:check
npm run demo
```

Recommended live configuration:

```env
ANTHROPIC_API_KEY=...
MOZAIK_MODEL=claude-sonnet-4-6
MOZAIK_API_KEY=...
```

Open `http://localhost:3000` after `npm run dev` to use the product UI.

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
| `ANTHROPIC_API_KEY` | Recommended live provider credential |
| `MOZAIK_MODEL` | Model override; verified with `claude-sonnet-4-6` |
| `OPENAI_API_KEY` | Optional OpenAI provider credential |
| `GEMINI_API_KEY` | Optional Gemini provider credential |
| `MOZAIK_API_KEY` | Mozaik Cloud observability |

## Submission checklist

- [x] `@mozaik-ai/core` is a direct runtime dependency
- [x] Three AI agents run concurrently
- [x] Shared runtime state is explicit
- [x] Concurrency receipts are surfaced in-product
- [x] Deterministic constraints are separate from LLM judgment
- [x] Event-driven repair exists
- [x] Live provider key configured and validated locally
- [x] Mozaik Cloud paired and receiving live loops
- [x] Genuine three-agent concurrency proved from runtime timestamps
- [x] Live conflict → repair → conflict-free commit proved
- [x] Public GitHub repository
- [ ] Live deployment
- [ ] Short demo video
- [ ] Hackathon submission

See [`PRD.md`](./PRD.md), [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md), [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md), and [`docs/STATE.md`](./docs/STATE.md).
