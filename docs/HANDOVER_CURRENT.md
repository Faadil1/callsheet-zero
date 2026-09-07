# CALLSHEET ZERO — Current Handover

Updated: 2026-09-07T03:08:00Z
Purpose: durable resume point for the next conversation/agent. Read this before reconstructing context.

## Current status in one screen

```text
PROJECT = CALLSHEET ZERO
HUMAN_PROJECT_GO = GRANTED
SCOPE = FROZEN_FOR_SUBMISSION
DEADLINE = 2026-09-07 03:00 ET / 09:00 CET
PRODUCTION = https://callsheet-zero.vercel.app
RAW_RECEIPT = https://callsheet-zero.vercel.app/evidence/canonical-run.json

MOZAIK LIVE CONCURRENCY = PASS
CANONICAL CONFLICTS = lead_actor, camera_a, van_1
REV 01 = COMMIT REFUSED
REPAIR = repair.requested → Schedule Agent
REV 02 = S22 @ 18:00
FINAL CONFLICTS = 0
REV 02 = COMMIT ALLOWED
ADAPTION ASYNC INTEGRATION = PROVED

CONTINUITY DESK PR #1 = MERGED
MERGE COMMIT = a00fcb1101349644890209bf16493b59b4c97396
PRODUCTION DEPLOYMENT = dpl_9dMSYty8HyBURS2cxrhc9P1qT5mt
POST-MERGE CI = PASS_RUN_34078433633
PRODUCTION HTTP = PASS_200

TRACE GATE 6.5 = PASS
NEXT EXACT GATE = TRACE 6.75 — DEMO NARRATIVE / EVIDENCE FILM
```

## Read first

1. `docs/STATE.md` — compact canonical current state.
2. `docs/EVIDENCE_TRACE_GATE_6_5_PASS.md` — current production UI/UX gate closure.
3. `design-qa.md` — Continuity Desk local design/build QA, viewports and limitations.
4. `docs/EVIDENCE_G1_G2.md` — canonical live Mozaik proof.
5. `evidence/canonical-run.json` — machine-readable receipt and Mozaik loop provenance.
6. `docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md` — current judge-path strategy.
7. `docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md` — evidence/provenance integrations.
8. `docs/GALLERY_SCAN_2026-09-06.md` — bounded competitor map.
9. TRACE state: `Faadil1/trace-design-workflow/state/projects/callsheet-zero/CURRENT.yaml`.

## Product

CALLSHEET ZERO is a film-production recovery system. Schedule, Talent and Logistics agents react concurrently in one Mozaik runtime to a weather/cast disruption. Their locally rational proposals can collide over scarce actors, cameras and vehicles. A deterministic Constraint Guard refuses the impossible revision and requests the smallest targeted repair.

Judge memory framing:

> **Parallel decisions are easy. CALLSHEET ZERO refuses the collisions they create, then repairs the schedule against the world that exists now.**

Alternate hook:

> **Three agents can all be right locally — and still produce an impossible shoot.**

## Canonical proof

```text
Rain + lead actor +90 min
→ Schedule / Talent / Logistics start concurrently
→ all 3 initial loops started before first completion
→ verified three-way overlap = 8.432 s
→ 3 hard holds: lead_actor / camera_a / van_1
→ REV 01 · COMMIT REFUSED
→ repair.requested → Schedule Agent only
→ Schedule Agent REV 02 → S22 @ 18:00
→ final conflicts = 0
→ REV 02 · COMMIT ALLOWED
```

Truth boundary is frozen:

```text
LIVE = fresh model execution
VERIFIED REPLAY = captured canonical live evidence, no new model call
SIMULATION = explicitly labeled preview
```

Never blur these states. `COMMIT REFUSED` is derived deterministically from verified hard conflicts; it is not a fabricated Mozaik event.

## Final UI — Continuity Desk / Direction 3

The selected UI is now production, not preview-only.

Production visual system:
- mint `#ACEED1` canvas;
- evergreen `#073D31` ink;
- paper `#FCFEFC`;
- semantic refusal red `#AC263D`;
- semantic safe green `#096747`.

Primary judge surface:
- hero: **The day holds together.**
- subline: **Three agents propose. The Guard refuses. One scene moves.**
- side-by-side REV 01 / REV 02 comparison;
- REV 01 visibly `COMMIT REFUSED` with 3 historical holds;
- REV 02 visibly `COMMIT ALLOWED`, 0 conflicts;
- only Schedule / S22 moves `16:30 → 18:00`;
- five inspectable replay steps;
- pause / previous / next;
- raw receipt access;
- UTC receipt inspection;
- explicit reduced-motion control.

Important implementation behavior:
- replay makes **zero** live model calls;
- reduced-motion replay starts paused;
- native `prefers-reduced-motion` handling exists;
- no global Enter shortcut can accidentally start a live run;
- live result never fabricates initial v1 rows from final state;
- live result cannot claim `COMMIT ALLOWED` without a commit receipt;
- model-returned text is escaped before rendering;
- 8 DOM regression tests pass.

## TRACE Gate 6.5 closure

The four mandatory evaluator issues are closed:

1. **Judge/video readability — PASS.** Local browser QA documented 1440×900 and 1280×720; at 1280×720 the proof transport ends at ~703.7 px, inside the first screen. Current production serves the same merged tree.
2. **Domain-native / anti-AI-slop — PASS.** Continuity Desk is an editorial production-revision instrument, not a generic dark AI dashboard. The before/after call-sheet revision is the visual identity.
3. **Proof above fold — PASS.** Hero, REV comparison and five-step evidence transport are first-screen at video-safe 1280×720 according to the documented viewport QA.
4. **Reduced motion — PASS by direct behavior verification.** Explicit UI control, native media-query behavior and regression coverage are present. No separate native-OS emulation capture is claimed.

Remaining quality item is **not a Gate 6.5 blocker**: review the actual final screen recording after video compression during Gate 6.75.

## Winner Intelligence / competitive state

Winner Intelligence G4A2 is advisory and applied. No winning law was promoted.

Current protected edge:

```text
FILM PRODUCTION DOMAIN
+ CONCURRENCY CREATES THE FAILURE MODE
+ REV 01 REFUSAL AS HERO STATE
+ EXACT HARD-CONSTRAINT RECEIPTS
+ TARGETED REPAIR TO ONE AGENT
+ VERIFIED REAL OVERLAP
+ TRUTHFUL REPLAY
+ MACHINE-READABLE PROOF
+ DISTINCT CONTINUITY-DESK VISUAL IDENTITY
```

Do **not** respond to competitors by adding agents, a human gate, Mem0, generic incident-management features, new observability dependencies or additional sponsors. The field is already crowded in incident/security/devtools; domain specificity and causal concurrency are the advantage.

## Adaption

Adaption is secondary and asynchronous only. A bounded real preference-data run succeeded with one output row. Support confirmed Plus with 649 available credits on the matched account. Do not claim a separately itemized 500-credit sponsor bucket unless support explicitly itemizes it later. Do not claim one sample proves unsafe→safe learning.

## Exact next sequence

```text
TRACE GATE 6.75 — DEMO NARRATIVE / EVIDENCE FILM
→ capture one 75–90 sec vertical slice
→ review video compression / readability
→ Project Finisher
→ official submission form
→ verify gallery card
→ verify detail URL
→ verify repo link
→ verify demo link
→ preserve returned slug/confirmation
```

Recommended demo spine:

```text
0–8s   Hook + film-production disruption
8–20s  Three agents / real concurrency receipt
20–38s REV 01 · COMMIT REFUSED + exact 3 hard holds
38–50s repair.requested → Schedule Agent only
50–62s REV 02 · S22 16:30 → 18:00
62–72s 0 conflicts · COMMIT ALLOWED
72–82s Mozaik receipt / raw proof
82–90s optional brief Adaption secondary proof + memory line
```

If time is tight, Adaption is the first item to shorten; never shorten the refusal → repair → allowed loop.

## Authority boundaries

- Human retains final submission authority.
- TRACE owns design/evaluator assurance only.
- Winner Intelligence is advisory only.
- Project Finisher owns terminal readiness assurance.
- Product/runtime scope is frozen unless a true blocking defect appears.

## State discipline

At every remaining milestone — final video capture, Gate 6.75 verdict, Project Finisher, submission and post-submission verification — update `docs/STATE.md`, this handover, and TRACE `CURRENT.yaml` + immutable history when TRACE state changes.
