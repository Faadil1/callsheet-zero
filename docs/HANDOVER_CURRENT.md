# CALLSHEET ZERO — Current Handover

Updated: 2026-09-06
Purpose: durable resume point for a new conversation or agent.

## Read first

1. `docs/STATE.md` — canonical project state.
2. `docs/TRACE_GATE_6_5_UI_UX_REWORK_BRIEF.md` — active design rework contract.
3. `docs/EVIDENCE_G1_G2.md` — canonical live concurrency/conflict/repair proof.
4. `docs/EVIDENCE_G4B_DEMO_HARDENING.md` — verified replay implementation proof.
5. `docs/WINNER_INTELLIGENCE_G4A.md` — pre-submission judge-path audit.
6. TRACE project state: `Faadil1/trace-design-workflow/state/projects/callsheet-zero/CURRENT.yaml`.

## Project

CALLSHEET ZERO is a film-production recovery system where three Mozaik agents react concurrently to the same disruption. Their individually sensible proposals can collide over shared actors, cameras and vehicles. A deterministic Constraint Guard detects exact conflicts and triggers a targeted Schedule Agent repair against the latest shared state.

Judge memory sentence:

> Three agents make good decisions at the same time. CALLSHEET ZERO catches when those decisions collide — and repairs the plan live.

## Product truth already proved

```text
G1_LIVE_MOZAIK_RUN = PASS
G1B_THREE_AGENT_CONCURRENCY = PASS
G2_CONSTRAINT_REPAIR = PASS
CANONICAL_CONFLICTS = lead_actor,camera_a,van_1
REPAIR_EVENT = repair.requested
REPAIR_AGENT = Schedule Agent
REPAIR_VERSION = 2
REPAIRED_SCENE = S22 @ 18:00
FINAL_PLAN_CONFLICT_FREE = TRUE
DETERMINISTIC_FALLBACK_USED = FALSE
PRODUCTION = https://callsheet-zero.vercel.app
```

Live/replay truth boundary:

```text
LIVE = fresh model execution
VERIFIED REPLAY = captured canonical live evidence, no new model call
SIMULATION = explicitly labeled preview
```

Never blur those three states.

## Sponsor roles

```text
Mozaik = load-bearing concurrent runtime
Constraint Guard = deterministic operational safety
Adaption = asynchronous secondary learning layer
```

Adaption A1 completed end-to-end successfully with one bounded preference-pairs row. Do not make Adaption the real-time hero or claim the sample proves unsafe→safe learning.

## Winner Intelligence state

G4A passed. Core recommendation was Failure-as-Feature + deterministic verified repair replay so the final demo does not depend on stochastic model output.

G4B is implemented and deployed. The existing live run path remains untouched. `Replay verified repair` is clearly labeled and reconstructs captured evidence only.

## TRACE Design state

TRACE is operating in post-build assurance mode. It entered at Phase E / Gate 6.5; no retroactive Gate 0–6 claims.

Current Gate:

```text
TRACE_GATE = 6.5 — Evaluation Capture
VERDICT = HOLD_BOUNDED_REWORK_AND_CURRENT_CAPTURE
```

### Four mandatory evaluator problems — do not drop any

1. **Judge/video readability** — microtype is too fragile for compressed video/screen share.
2. **Generic AI/SaaS / AI-slop shell** — dark neon rounded-card grammar is too generic; domain specificity is too copy-dependent.
3. **Proof sequence below fold** — `PROVED → 3 conflicts → repair.requested → REV 02 @18:00 → 0 conflicts` must become immediately scannable above fold.
4. **Reduced motion** — explicit `prefers-reduced-motion` assurance is required.

All four must PASS before Gate 6.5 can close.

## Active visual direction

**WARM PRODUCTION OPERATIONS**

Goal:

> Make CALLSHEET ZERO feel like a production revision instrument, not an AI dashboard.

Approved palette:

```text
canvas    #F2EFE7
surface   #FBFAF6
surface2  #E8E4DA
ink       #171816
muted     #64665F
rule      #C9C4B8
slate     #4B5D6B
conflict  #A04438
warning   #B27A27
resolved  #2F6B4C
replay    #536A82
```

Forbidden default visual moves:
- blue/purple neon glow;
- decorative gradients;
- glassmorphism;
- ambient animation;
- generic “AI command center” copy;
- effect-count differentiation.

Approved signature budget only:
1. Call Sheet Revision Strip
2. Constraint Guard Conflict Receipts
3. REVISION 02 · CONFLICT-FREE approval stamp

## Gate 6.5 acceptance matrix

```text
P1_JUDGE_VIDEO_READABILITY = PASS
P2_DOMAIN_NATIVE_VISUAL_GRAMMAR = PASS
P2_AI_SLOP_RISK = LOW
P3_PROOF_SEQUENCE_ABOVE_FOLD = PASS
P4_REDUCED_MOTION = PASS
DESKTOP_1440x900_CAPTURE = PASS
VIDEO_SAFE_1280x720_CAPTURE = PASS
MOBILE_390x844_CAPTURE = PASS
LIVE_REPLAY_SIMULATION_TRUTH_BOUNDARY = PASS
CANONICAL_CONFLICTS_VISIBLE = lead_actor,camera_a,van_1
REVISION_02_AT_18_00_VISIBLE = TRUE
FINAL_CONFLICT_FREE_VISIBLE = TRUE
```

## Exact next action

```text
PBPD_APPLY_TRACE_GATE_6_5_BOUNDED_UI_UX_REWORK
→ CI
→ deploy production
→ TRACE current production capture at 1440×900 / 1280×720 / 390×844 / reduced motion
→ rerun Gate 6.5
```

If Gate 6.5 passes:

```text
TRACE Gate 6.75 — Demo Narrative / Evidence Film
→ final 75–90 sec demo
→ Project Finisher
→ human submission
```

## Authority boundaries

- Human retains protected final submission authority.
- PBPD/project build authority owns implementation.
- TRACE owns design/experience assurance only.
- Winner Intelligence is advisory only.
- Project Finisher owns terminal submission/readiness assurance.

## State discipline

After every meaningful milestone (implementation, CI result, deploy, visual capture, TRACE gate verdict, demo render, submission package change):

1. update `docs/STATE.md`;
2. update TRACE `state/projects/callsheet-zero/CURRENT.yaml` when design assurance state changes;
3. append an immutable TRACE history snapshot for meaningful TRACE milestones;
4. refresh this handover if the next exact gate or frozen contracts materially change.

This file is a handover convenience, not a substitute for canonical state. If it conflicts with `docs/STATE.md` or TRACE `CURRENT.yaml`, the canonical state files win.
