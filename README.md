# CALLSHEET ZERO

**Concurrent constraint repair for a world that won't wait.**

CALLSHEET ZERO is a JigJoy × daily.dev × Hyperskill Hackathon 2026 project built on **Mozaik v4**. Three AI agents react independently to the same production disruption while sharing one runtime. Their locally sensible proposals can collide over scarce resources; a deterministic constraint guard catches those collisions and triggers an event-driven repair against the state that exists *now*.

A second, optional layer uses **Adaption Labs Adaptive Data** asynchronously: completed repair outcomes are converted into model-ready learning examples so future scheduling agents can learn from the difference between a locally sensible but conflicting proposal and the repair that actually passed the guard.

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
9. The completed run emits an **Adaption learning example** containing the disruption, initial proposal, exact conflicts, peer context, and accepted repair.

## Verified live run

A live Anthropic run with `claude-sonnet-4-6` completed successfully on 2026-09-05, both locally and from the Vercel production deployment.

- `mode: live`
- `status: complete`
- Three initial agents started inference before any initial inference completed.
- Three real shared-resource conflicts were detected.
- The Constraint Guard emitted an event-driven repair request.
- The Schedule Agent produced version 2 at 18:00.
- The final call sheet was conflict-free without the deterministic fallback.

The original local evidence measured approximately **8.432 seconds** of three-way overlap. The verified production run measured approximately **4.953 seconds**.

Production: **https://callsheet-zero.vercel.app**

See [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md) for the original live timestamps, Mozaik Cloud loop receipts, conflict list, repair event, and final invariant proof.

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
        │ completed repair outcome
        ▼
┌──────────── Optional async learning ───────────┐
│ Adaption Labs Adaptive Data                    │
│   ├─ prompt/completion/context mapping         │
│   ├─ preference-pair generation                │
│   └─ future training/evaluation corpus         │
└────────────────────────────────────────────────┘
```

**Adaption is deliberately not in the real-time path.** Mozaik owns concurrent execution; the deterministic guard owns operational safety; Adaption learns from completed repair outcomes. If Adaption is unavailable, the live repair product still works.

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

## Adaption learning loop

Every `/api/run` response now includes a `learningExample` with:

- `prompt`: disruption + baseline + initial schedule proposal + exact guard conflicts,
- `completion`: accepted version-2 Schedule Agent repair,
- `context`: peer proposals + concurrency proof,
- `metadata`: model/mode/learning objective/fallback flags.

Export one example locally without calling Adaption:

```bash
npm run adaption:export
```

Request an estimate only:

```bash
npm run adaption:estimate
```

Start a real bounded run only after reviewing the estimate:

```bash
npm run adaption:run -- --confirm-spend
```

The paid path is fail-closed: it refuses to run without explicit confirmation and aborts if the quote exceeds `ADAPTION_MAX_CREDITS` (default `10`). The first integration uses `training_type=preference_pairs` and `ADAPTION_MAX_ROWS=1` so the proof remains small and inspectable.

See [`docs/ADAPTION_LEARNING_LOOP.md`](./docs/ADAPTION_LEARNING_LOOP.md).

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
| `ADAPTION_API_KEY` | Optional asynchronous repair-learning pipeline |
| `ADAPTION_MAX_ROWS` | Maximum rows for one Adaptive Data run; default `1` |
| `ADAPTION_MAX_CREDITS` | Hard local spend gate; default `10` |

## Submission checklist

- [x] `@mozaik-ai/core` is a direct runtime dependency
- [x] Three AI agents run concurrently
- [x] Shared runtime state is explicit
- [x] Concurrency receipts are surfaced in-product
- [x] Deterministic constraints are separate from LLM judgment
- [x] Event-driven repair exists
- [x] Live provider key configured and validated
- [x] Mozaik Cloud paired and receiving live loops
- [x] Genuine three-agent concurrency proved from runtime timestamps
- [x] Live conflict → repair → conflict-free commit proved
- [x] Public GitHub repository
- [x] Live Vercel deployment with production Mozaik run
- [x] Optional Adaption repair-learning layer implemented and budget-gated
- [ ] First bounded Adaption preference-pair run
- [ ] Human browser click smoke test
- [ ] Short demo video
- [ ] Hackathon submission

See [`PRD.md`](./PRD.md), [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md), [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md), [`docs/ADAPTION_LEARNING_LOOP.md`](./docs/ADAPTION_LEARNING_LOOP.md), and [`docs/STATE.md`](./docs/STATE.md).
