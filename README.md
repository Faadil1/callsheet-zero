# CALLSHEET ZERO

**Concurrent constraint repair for a world that won't wait.**

[Live product](https://callsheet-zero.vercel.app) · [Canonical receipt](https://callsheet-zero.vercel.app/evidence/canonical-run.json)

CALLSHEET ZERO is a JigJoy × daily.dev × Hyperskill Hackathon 2026 project built on **Mozaik v4**. Three AI agents react independently to the same film-production disruption while sharing one runtime. Their locally sensible proposals can collide over scarce actors, cameras, and vehicles; a deterministic Constraint Guard refuses to commit an impossible revision and triggers only the targeted repair the live schedule needs.

> **Three agents can all be right locally — and still produce an impossible shoot.**

## Portfolio snapshot

| | |
| --- | --- |
| **Problem** | Concurrent agents can optimize their own local objectives while collectively creating a plan that cannot be executed. |
| **Mechanism** | Shared Mozaik runtime + genuinely concurrent agent loops + deterministic shared-resource conflict detection + targeted event-driven repair. |
| **Verified proof** | **8.432s** local three-way overlap → 3 hard holds → `REV 01 COMMIT REFUSED` → targeted Schedule repair → 0 final conflicts → `REV 02 COMMIT ALLOWED`. |
| **Evidence model** | Live execution, deterministic verified replay, machine-readable canonical receipt, explicit simulation/live boundaries. |
| **My role** | Product definition · system architecture · constraint/authority design · integration · testing · evidence design · deployment/submission preparation. |
| **Stack** | TypeScript · Mozaik v4 · Anthropic · Vercel · event-driven agents · deterministic validation · Adaption Labs. |

## Why this project matters

A multi-agent system is not useful merely because several agents can run in parallel. The harder problem is **coordination under shared constraints**: locally reasonable decisions can still produce a globally impossible outcome.

CALLSHEET ZERO makes that failure visible and gives hard operational invariants to a deterministic layer rather than asking an LLM to decide whether a call sheet is physically possible.

The product pattern is:

```text
probabilistic proposals
→ deterministic global constraint check
→ fail closed on hard conflicts
→ repair only what is necessary
→ commit only when invariants pass
```

## The signature proof

The demo is deliberately one complete vertical slice:

```text
rain + lead actor +90 min
→ Schedule / Talent / Logistics react concurrently
→ all 3 initial inference loops start before the first completes
→ 8.432s verified three-way overlap
→ REV 01 · COMMIT REFUSED
→ lead_actor / camera_a / van_1 hard holds
→ repair.requested → Schedule Agent only
→ REV 02 · S22 @ 18:00
→ final conflicts = 0
→ COMMIT ALLOWED
```

The important distinction is causal: concurrency is not used merely to make three investigations faster. The agents optimize different local objectives against the same changing production world, so their individually sensible decisions can create a globally impossible call sheet.

## What I owned

- defined the product mechanism around concurrent local decisions colliding on shared production resources;
- separated LLM/agent judgment from deterministic hard-constraint authority;
- designed the targeted repair path rather than a full rerun of all agents;
- integrated the shared runtime, model path, evidence capture, and deployment flow;
- defined the verified replay so historical proof is never presented as a fresh live run;
- structured the machine-readable evidence and judge path;
- validated negative and positive paths, including commit refusal and eventual safe commit.

## Try it

Production: **https://callsheet-zero.vercel.app**

The UI exposes two intentionally different judge paths:

- **Run live** → a fresh stochastic Mozaik/model execution.
- **Replay verified repair** → no new model call; it deterministically walks the receipts from the already-verified canonical live run.

The replay is explicitly labeled **VERIFIED REPLAY** and is never presented as a new live execution.

Machine-readable canonical receipt:

**https://callsheet-zero.vercel.app/evidence/canonical-run.json**

The receipt includes concurrency timing, exact hard holds, targeted repair, final commit, canonical production deployment, direct Mozaik Cloud loop URLs, and the secondary Adaption proof boundary.

Canonical evidence notes: [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md).

## Verified live run

A live Anthropic run with `claude-sonnet-4-6` completed successfully on 2026-09-05.

- `mode: live`
- `status: complete`
- all three initial agents started before any initial agent completed;
- local canonical three-way overlap: **8.432 seconds**;
- verified production overlap: **4.953 seconds**;
- three shared-resource conflicts: `lead_actor`, `camera_a`, `van_1`;
- the deterministic Guard emitted `repair.requested` to the Schedule Agent;
- Schedule Agent version 2 moved S22 to **18:00**;
- the final call sheet was conflict-free;
- deterministic fallback was **not** used.

`REV 01 · COMMIT REFUSED` is a deterministic decision-layer interpretation of those verified hard conflicts. It is **not** fabricated as a Mozaik semantic event. The underlying event chain remains `conflict.detected → repair.requested → inference → commit.complete`.

## Why the concurrency is real

Schedule, Talent, and Logistics are separate Mozaik participants joined to one runtime. One `message.sent` disruption makes all three handlers eligible, and each starts its own fire-and-forget `runLoop()`. CALLSHEET ZERO records Mozaik's `inference.started` and `inference.completed` semantic events.

The proof condition is:

```text
max(initial inference starts) < min(initial inference completions)
17:54:46.853Z < 17:54:55.285Z
PASS
```

Mozaik Cloud independently recorded the initial loops and targeted repair loop. Direct URLs are included in [`evidence/canonical-run.json`](./evidence/canonical-run.json).

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
│        └──────── model.answer ────────────────┤
│                                               │
│ Deterministic Constraint Guard                │
│   ├─ exact shared-resource conflict detection │
│   ├─ REV 01 commit refused if holds remain    │
│   ├─ repair.requested → Schedule Agent only   │
│   └─ REV 02 commits only if invariants pass   │
└───────────────────────────────────────────────┘
        │ verified completed repair
        ▼
┌──────────── Optional async learning ──────────┐
│ Adaption Labs Adaptive Data                   │
│   ├─ verified repair → learning example       │
│   ├─ preference-pair generation               │
│   └─ deterministic validation before corpus   │
└───────────────────────────────────────────────┘
```

**Mozaik is load-bearing.** Remove the genuinely concurrent shared runtime and the signature collision/repair proof disappears.

**The Constraint Guard is non-LLM by design.** Hard operational invariants should not depend on probabilistic judgment.

**Adaption is secondary and asynchronous.** If Adaption is unavailable, the real-time repair product still works.

## Adaption learning proof

The first bounded Adaption integration completed end-to-end from a verified production repair:

```text
verified repair
→ one-row dataset
→ preference_pairs run
→ succeeded
→ chosen + rejected output downloaded
```

The run used a **1-credit estimate/reservation**. We do not claim the exact billed amount from that alone.

The first generated `rejected` candidate was also conflict-free, so CALLSHEET ZERO does **not** claim that this one example proves unsafe→safe learning. The supported claim is narrower: a verified repair can be converted into preference data end-to-end. Generated rows still require deterministic post-generation validation before corpus promotion.

See [`docs/EVIDENCE_ADAPTION_A1.md`](./docs/EVIDENCE_ADAPTION_A1.md) and [`docs/ADAPTION_LEARNING_LOOP.md`](./docs/ADAPTION_LEARNING_LOOP.md).

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

Open `http://localhost:3000` after `npm run dev`.

Without a matching provider credential, the endpoint intentionally returns a clearly labeled **SIMULATION** preview. Simulation is never counted as live concurrency evidence.

### Adaption commands

```bash
npm run adaption:export
npm run adaption:estimate
npm run adaption:run -- --confirm-spend
```

The paid path is fail-closed and budget-gated by `ADAPTION_MAX_CREDITS`.

## Evidence / design assurance

- [`docs/EVIDENCE_G1_G2.md`](./docs/EVIDENCE_G1_G2.md) — canonical live concurrency/conflict/repair proof
- [`evidence/canonical-run.json`](./evidence/canonical-run.json) — machine-readable judge receipt
- [`docs/EVIDENCE_G3G_UI_SMOKE.md`](./docs/EVIDENCE_G3G_UI_SMOKE.md) — human browser smoke
- [`docs/WINNER_INTELLIGENCE_G4A.md`](./docs/WINNER_INTELLIGENCE_G4A.md) — original pre-submission audit
- [`docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md`](./docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md) — updated repeat-winner delta
- [`docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md`](./docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md) — bounded hidden-spot integration pass
- [`docs/TRACE_GATE_6_5_UI_UX_REWORK_BRIEF.md`](./docs/TRACE_GATE_6_5_UI_UX_REWORK_BRIEF.md) — evaluator UI / anti-slop contract
- [`docs/GALLERY_SCAN_2026-09-06.md`](./docs/GALLERY_SCAN_2026-09-06.md) — bounded current-submission gallery scan
- [`docs/STATE.md`](./docs/STATE.md) — canonical current state
- [`docs/HANDOVER_CURRENT.md`](./docs/HANDOVER_CURRENT.md) — durable resume point

## Claim boundaries

- Live execution, verified replay, and simulation are deliberately labeled as different evidence classes.
- `REV 01 COMMIT REFUSED` is a deterministic decision-layer interpretation of verified conflicts, not a fabricated Mozaik semantic event.
- The Adaption proof demonstrates end-to-end preference-data generation from a verified repair; it does not yet prove unsafe→safe learning.
- Hard operational safety is enforced by deterministic checks, not by trusting the model to self-certify.

## Submission checklist

- [x] `@mozaik-ai/core` direct runtime dependency
- [x] Three AI agents genuinely concurrent
- [x] Shared runtime state explicit
- [x] Semantic-event concurrency receipts
- [x] Deterministic hard-constraint authority separate from LLM judgment
- [x] Event-driven targeted repair
- [x] Public GitHub repository
- [x] Live Vercel production deployment
- [x] Canonical live conflict → repair → conflict-free commit proof
- [x] Truthfully labeled Verified Repair Replay
- [x] `REV 01 COMMIT REFUSED → REV 02 COMMIT ALLOWED` judge path
- [x] Public machine-readable canonical receipt
- [x] Optional bounded Adaption learning proof
- [x] Winner Intelligence G4A + G4A2 audit
- [x] TRACE source-level anti-slop / readability rework
- [ ] TRACE Gate 6.5 final capture verdict
- [ ] Short demo video
- [ ] Official hackathon submission
