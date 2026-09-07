# CALLSHEET ZERO — Current Handover

Updated: 2026-09-07T04:11:00Z
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

LIVE RUN UI HOTFIX = PASS
LIVE HOTFIX COMMIT = 07fbcd8a23b81e1a2c0e44db1cd21f9f7a8bcc6b
LIVE DIRECT PRODUCTION CHECK = PASS
LIVE 0-CONFLICT OUTCOME = VALID STOCHASTIC RESULT

ADAPTION ASYNC INTEGRATION = PROVED
ADAPTION LEARNING RECEIPT = DEPLOYED SECONDARY
ADAPTION UI COMMIT = 65eca2740905e9cabf3f1ffaae6eacb1380b6d4b
ADAPTION UI DEPLOYMENT = dpl_6a3Q5psYxePjXdKPH29Se4ukTYdY
ADAPTION UI CI = PASS_RUN_34082062916
ADAPTION REALTIME DEPENDENCY = FALSE

TRACE GATE 6.5 = PASS
NEXT EXACT GATE = TRACE 6.75 — DEMO NARRATIVE / EVIDENCE FILM
```

## Read first

1. `docs/STATE.md` — compact canonical current state.
2. `docs/EVIDENCE_TRACE_GATE_6_5_PASS.md` — current production UI/UX gate closure.
3. `design-qa.md` — Continuity Desk local design/build QA, viewports and limitations.
4. `docs/EVIDENCE_G1_G2.md` — canonical live Mozaik proof.
5. `evidence/canonical-run.json` — machine-readable receipt and Mozaik loop provenance.
6. `docs/EVIDENCE_ADAPTION_A1.md` — bounded Adaption proof and claim limits.
7. `docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md` — current judge-path strategy.
8. `docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md` — evidence/provenance integrations.
9. `docs/GALLERY_SCAN_2026-09-06.md` — bounded competitor map.
10. TRACE state: `Faadil1/trace-design-workflow/state/projects/callsheet-zero/CURRENT.yaml`.

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
LIVE = fresh model execution; may be conflict-free on its first revision
VERIFIED REPLAY = captured canonical live evidence, no new model call
SIMULATION = explicitly labeled preview
ADAPTION = async learning-data layer after verified repair; not in Run live
```

Never blur these states. `COMMIT REFUSED` is derived deterministically from verified hard conflicts; it is not a fabricated Mozaik event.

## Final UI — Continuity Desk / Direction 3

The selected UI is production.

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

### Live run behavior

The live path is working in production. The UI hotfix makes the pending state explicit with `Running live…`, `LIVE RUNNING`, and `Mozaik agents running`. A direct production check returned `mode=live`, `status=complete`, and proved all three live inference starts occurred before the first completion.

A live run may legitimately return **0 conflicts** because model behavior is stochastic. If Schedule independently chooses S22 @ 18:00 on revision 1, the Guard can commit without issuing `repair.requested`. This is a valid live outcome, not a runtime failure. Use Verified Replay for the deterministic canonical conflict→repair story.

## Adaption — visible secondary learning receipt

Adaption is now visible in the product as one secondary block below the core evidence surface. It does not change runtime behavior and introduces no new dependency into `Run live`.

The visible block says, in substance:

```text
VERIFIED REPAIR → PREFERENCE DATA
1 verified repair · preference_pairs
chosen + rejected generated
NOT IN RUN LIVE
Constraint Guard remains safety authority
```

Claim boundaries:
- a bounded real Adaption run succeeded with one output row;
- the output includes `chosen` and `rejected`;
- use the phrase **preference data generated from a verified repair**;
- do not claim this one example proves unsafe→safe learning, because the generated rejected response was also operationally conflict-free;
- Adaption remains asynchronous and secondary;
- the deterministic Guard remains realtime safety / commit authority.

Product evidence link: `docs/EVIDENCE_ADAPTION_A1.md`.

## TRACE Gate 6.5 closure

The four mandatory evaluator issues remain closed:

1. **Judge/video readability — PASS.**
2. **Domain-native / anti-AI-slop — PASS.**
3. **Proof above fold — PASS.**
4. **Reduced motion — PASS by direct behavior verification.**

The Adaption block is below the core evidence area and is explicitly secondary; it does not reopen Gate 6.5. Remaining quality item: review the actual final screen recording after video compression during Gate 6.75.

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
+ ASYNC VERIFIED-REPAIR LEARNING RECEIPT
```

Do **not** respond to competitors by adding agents, a human gate, Mem0, generic incident-management features, new observability dependencies or additional sponsors.

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
82–88s Adaption learning receipt
88–90s memory line
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
