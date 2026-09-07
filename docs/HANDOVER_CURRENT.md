# CALLSHEET ZERO — Current Handover

Updated: 2026-09-06
Purpose: durable resume point for a new conversation or agent.

## Read first

1. `docs/STATE.md` — canonical project state.
2. `docs/TRACE_GATE_6_5_UI_UX_REWORK_BRIEF.md` — frozen design rework contract.
3. `docs/TRACE_GATE_6_5_REFERENCE_AUDIT.md` — reference transfer record.
4. `docs/COMPETITIVE_SIGNAL_2026-09-06.md` — latest bounded submission/competitor/ecosystem signal.
5. `docs/GALLERY_SCAN_2026-09-06.md` — bounded 23-submission gallery competitive scan.
6. `docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md` — updated repeat-winner pre-submission delta.
7. `docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md` — bounded hidden-spot integration record.
8. `docs/EVIDENCE_G1_G2.md` — canonical live concurrency/conflict/repair proof.
9. `evidence/canonical-run.json` — public machine-readable canonical receipt.
10. `docs/EVIDENCE_G4B_DEMO_HARDENING.md` — verified replay implementation proof.
11. `docs/WINNER_INTELLIGENCE_G4A.md` — original pre-submission judge-path audit.
12. TRACE project state: `Faadil1/trace-design-workflow/state/projects/callsheet-zero/CURRENT.yaml`.

## Project

CALLSHEET ZERO is a film-production recovery system where three Mozaik agents react concurrently to the same disruption. Their individually sensible proposals can collide over shared actors, cameras and vehicles. A deterministic Constraint Guard detects exact conflicts, refuses to commit an impossible revision, and triggers a targeted Schedule Agent repair against the latest shared state.

Updated judge memory framing:

> Parallel decisions are easy. CALLSHEET ZERO refuses the collisions they create, then repairs the schedule against the world that exists now.

Alternative hook:

> Three agents can all be right locally — and still produce an impossible shoot.

## Deadline and submission route — current

Organizer Discord explicitly confirmed the final deadline as **Monday, September 7 at 9:00 AM CET**. The current official JigJoy page renders that as **3:00 AM ET**.

Current official public requirement:

```text
REPO + SHORT DEMO
SUBMIT THROUGH OFFICIAL SITE/FORM
```

Do not treat a Discord channel post as a proven submission requirement. Discord remains useful for support, so complete server onboarding before final submission if posting is still gated.

Post-submission QA is mandatory because another participant reported a case where a successful form/API submission appeared in the gallery list but the detail route returned 404. After submitting, verify card + detail URL + repo/demo links and preserve the returned slug/confirmation.

## Official Mozaik resources surfaced in Discord

Canonical links from the official-links channel:

```text
WEBSITE = https://mozaik.jigjoy.ai/
CLOUD = https://app.jigjoy.ai/
DOCS = https://docs.jigjoy.ai/
GITHUB = https://github.com/jigjoy-ai/mozaik
LINKEDIN = https://www.linkedin.com/showcase/mozaik-runtime
X = https://x.com/mozaik_runtime
YOUTUBE = https://www.youtube.com/@jigjoy_ai
```

Use these only as reference/submission support surfaces; no new integration is required.

## Product truth already proved

```text
G1_LIVE_MOZAIK_RUN = PASS
G1B_THREE_AGENT_CONCURRENCY = PASS
G2_CONSTRAINT_REPAIR = PASS
CANONICAL_CONFLICTS = lead_actor,camera_a,van_1
REVISION_01_COMMIT_DECISION = REFUSED_DERIVED_FROM_HARD_CONFLICTS
REPAIR_EVENT = repair.requested
REPAIR_AGENT = Schedule Agent
REPAIR_VERSION = 2
REPAIRED_SCENE = S22 @ 18:00
REVISION_02_COMMIT_DECISION = ALLOWED
FINAL_PLAN_CONFLICT_FREE = TRUE
DETERMINISTIC_FALLBACK_USED = FALSE
PRODUCTION = https://callsheet-zero.vercel.app
RAW_RECEIPT = https://callsheet-zero.vercel.app/evidence/canonical-run.json
```

Live/replay truth boundary:

```text
LIVE = fresh model execution
VERIFIED REPLAY = captured canonical live evidence, no new model call
SIMULATION = explicitly labeled preview
```

Never blur those three states. `COMMIT REFUSED` is a deterministic decision-layer interpretation of the three verified hard conflicts, not a fabricated Mozaik semantic event.

## Sponsor roles

```text
Mozaik = load-bearing concurrent runtime
Constraint Guard = deterministic operational safety / commit authority
Adaption = asynchronous secondary learning layer
```

Mozaik Cloud is useful but the organizer explicitly said it is not required for eligibility.

Adaption A1 completed end-to-end successfully with one bounded preference-pairs row. Do not make Adaption the real-time hero or claim the sample proves unsafe→safe learning.

### Adaption credits — support confirmation

Support replied on 2026-09-06 and confirmed that the matched account has:

```text
PLAN = PLUS
AVAILABLE_CREDITS = 649
```

The support reply did not separately itemize the exact credit sources, so do not state that a specific 500-credit bucket was independently enumerated by support. However, the previously blocking uncertainty is resolved for this project: Adaption credits are available and sponsor-credit availability is no longer a blocker.

If the UI still shows a different balance, first verify that local sign-in is using the same account support matched. Do not store the account email itself in this public repository.

### Additional hackathon ecosystem offers — do not derail submission

Discord surfaced two optional opportunities:

- **Mem0 sponsor access:** every participant can request three months of free agent memory through the JigJoy claim form.
- **Mozaik Cloud Founding Builder:** lifetime Mozaik Cloud access for a one-time **$50**, offer open until winners are announced on **September 13**.

Current decisions:

```text
MEM0 = OPTIONAL_POST_SUBMISSION
MEM0_INTEGRATION_NOW = NO
MOZAIK_FOUNDING_BUILDER = DEFER_DECISION_UNTIL_AFTER_SUBMISSION
```

These are ecosystem opportunities, not reasons to reopen CALLSHEET ZERO or consume deadline time.

## Latest competitor intelligence

Public gallery is live. Social likes/comments exist, but they are not treated as judging criteria without an explicit rule.

### OpsRoom

A strong visible competitor. Public materials describe a solo incident-war-room project using 8 AI agents + 4 telemetry feeds on one Mozaik event bus, with risk challenge/interception and a human approval gate.

Important response:

```text
DO NOT ESCALATE AGENT COUNT
DO NOT REOPEN SCOPE
```

Current public judging guidance emphasizes **genuine concurrency**, not raw agent count. CALLSHEET ZERO already has direct receipt proof that all three initial agents started before any completed.

Protected differentiation versus OpsRoom/general workflow systems:

1. domain-specific film-production call-sheet revision;
2. locally sensible decisions visibly collide over exact scarce resources;
3. deterministic Guard checks hard constraints instead of asking another LLM to judge them;
4. unsafe Revision 01 is explicitly refused;
5. targeted `repair.requested` to Schedule Agent only;
6. verified replay preserves truth while making the judge path deterministic;
7. Warm Production Operations UI makes the system look like a real production revision instrument;
8. machine-readable proof receipt lets a skeptical judge inspect the proof chain;
9. Adaption is an additional asynchronous preference-data layer.

### Late-stage tooling signal

Another participant reported exhausting Codex usage while finishing and asked for Nebius-backed coding-agent alternatives. Treat this only as a field signal that many teams are in final polish/debug mode.

CALLSHEET ZERO decision:

```text
NO LATE TOOL MIGRATION UNLESS A REAL BLOCKER APPEARS
```

Full record: `docs/COMPETITIVE_SIGNAL_2026-09-06.md`.

## Gallery scan — bounded competitive map

A user-provided 190-second gallery walkthrough exposed **23 current submissions**. Eleven had enough detail-page evidence for higher-confidence mechanism review.

Strongest visible Tier A group:

```text
IncidentMesh
OpsRoom
ProofGate
FAULTLINE
watchtower
Butterfly
```

Strong A-/B+ group:

```text
BountyProof
AI SWARM STUDIO
Cortex Study Room
Claimswarm
```

Key field findings:

1. **Incident/security/devtools are crowded.** CALLSHEET ZERO's film-production scheduling domain is genuinely differentiated.
2. **Deterministic guards are not unique.** The Guard alone must never be sold as the differentiator.
3. **Parallel evidence investigation is the dominant concurrency pattern.** CALLSHEET ZERO has a stronger causal story: concurrency itself creates locally sensible decisions that collide over scarce shared resources.
4. **Concurrency proof is becoming table stakes.** Our existing `all three initial loops started before any completed` proof must be surfaced in the demo.
5. **Dark AI dashboards dominate the gallery.** TRACE's Warm Production Operations direction is strategically valuable and should be preserved.

Protected CALLSHEET ZERO edge after scan:

```text
FILM PRODUCTION DOMAIN
+ CONCURRENCY-CREATED RESOURCE COLLISIONS
+ REV 01 COMMIT REFUSED
+ EXACT HARD CONSTRAINT RECEIPTS
+ TARGETED REPAIR TO ONE AGENT
+ VERIFIED REAL OVERLAP
+ TRUTHFUL REPLAY
+ MACHINE-READABLE PROOF RECEIPT
+ DOMAIN-NATIVE WARM PRODUCTION UI
```

Do not add agents, a human gate, extra sponsors, or a generic incident layer in response to the field.

Full scan: `docs/GALLERY_SCAN_2026-09-06.md`.

## Winner Intelligence state

### G4A — original audit

G4A passed. Core recommendation was Failure-as-Feature + deterministic verified repair replay so the final demo does not depend on stochastic model output.

G4B is implemented and deployed. The existing live run path remains untouched. `Replay verified repair` is clearly labeled and reconstructs captured evidence only.

### G4A2 — updated Repeat-Winner Intelligence delta

Winner Intelligence was upgraded on 2026-09-06 with Repeat-Winner Pattern Intelligence v1.1, multi-builder pattern selection, Drey + Cruzer mechanisms, discovery-only repeat-winner network intelligence and guarded cross-winner hypotheses.

Applied project delta:

```text
TOP = CONSTRAINT_GUARD_REFUSAL_AS_HERO_STATE
SECOND = RECEIPTS_TRAVEL_WITH_EACH_CONSEQUENTIAL_TRANSITION
THIRD = ONE_COMPLETE_VERTICAL_SLICE_OVER_BREADTH
NETWORK_DISCOVERY = NO_PROJECT_ACTION
CROSS_WINNER_CANDIDATES = RESEARCH_ONLY
WINNING_LAWS_PROMOTED = 0
SCOPE_REOPEN = NO
```

The UI now visibly transitions:

```text
REV 01 · COMMIT REFUSED
→ 3 hard holds
→ repair.requested
→ REV 02 · S22 @ 18:00
→ 0 final conflicts
→ COMMIT ALLOWED
```

The proof strip now carries timing/count receipts adjacent to each consequential transition.

Evidence: `docs/WINNER_INTELLIGENCE_G4A2_REPEAT_WINNER_DELTA.md`.

## Hidden-spot integration pass

High-ROI integrations were applied without adding runtime dependencies:

1. public machine-readable canonical receipt at `/evidence/canonical-run.json`;
2. four Mozaik Cloud loop IDs bound into that receipt;
3. exact conflict/repair/commit timestamps bound into the receipt;
4. Adaption dataset/run status carried as **secondary** learning proof with explicit claim boundary;
5. raw receipt + canonical evidence links surfaced in-product;
6. `aria-live` added to status and commit-gate state changes.

No Mem0 integration, extra agent, human gate or incident abstraction was added because each would dilute the signature proof under the deadline.

Evidence: `docs/HIDDEN_SPOT_INTEGRATIONS_G4A2.md`.

## TRACE Design state

TRACE is operating in post-build assurance mode. It entered at Phase E / Gate 6.5; no retroactive Gate 0–6 claims.

Current Gate:

```text
TRACE_GATE = 6.5 — Evaluation Capture
VERDICT = HOLD_CURRENT_PRODUCTION_CAPTURE
```

TRACE canonical state has been updated after G4A2 and an immutable history snapshot was appended.

### Four mandatory evaluator problems — none may be dropped

1. **Judge/video readability** — source correction implemented; must now be verified at evaluator capture sizes.
2. **Generic AI/SaaS / AI-slop shell** — source correction implemented using domain-native production-document grammar; visual verdict still requires current capture.
3. **Proof sequence below fold** — canonical proof strip is now above fold; actual 1280×720/1440×900 scanability still requires capture.
4. **Reduced motion** — explicit `prefers-reduced-motion` rule implemented; behavior still requires verification.

All four must PASS before Gate 6.5 can close.

## Reference audit

Mobbin was attempted but the connected tool required a paid plan, so no Mobbin screen was claimed or used.

Actual references used:
- **StudioBinder** — film call-sheet document structure: shoot-day metadata, weather/location context, chronological scene schedule.
- **SetHero** — revision/version and call-sheet workflow: schedule versions, revisions, day-scene logic, operational document mentality.

Transfer rule:

```text
MECHANISMS ONLY
≠ copy competitor visual identity
```

Reference record: `docs/TRACE_GATE_6_5_REFERENCE_AUDIT.md`.

## Active visual direction

**WARM PRODUCTION OPERATIONS**

Goal:

> Make CALLSHEET ZERO feel like a production revision instrument, not an AI dashboard.

Current deployed judge-path implementation:

```text
UI_BASE_REWORK_COMMIT = 5cd20402468a0a94caa159eab5a7daa5a29f8c5e
JUDGE_PATH_DELTA_COMMIT = 4e58551249f36b26cb263c7dc9ee3d2f1dce9e88
PRODUCTION_DEPLOYMENT = dpl_NJUGC4RB4r1JYEXRnVg1w3Hpbboe
PRODUCTION_HTTP = PASS_200
RAW_RECEIPT_HTTP = PASS_200
LAST_VERIFIED_CI = PASS_RUN_34015995831
```

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

Current signature budget remains three mechanisms, not expanded:
1. Canonical Verified Run Evidence Strip + direct receipts
2. Constraint Guard Hold Receipts + Commit Gate
3. REVISION 02 · CONFLICT-FREE approval stamp

Removed/rejected visual defaults:
- blue/purple neon glow;
- decorative gradients;
- glassmorphism;
- generic AI command-center language;
- ambient animation as decoration.

## Gate 6.5 acceptance matrix

```text
P1_JUDGE_VIDEO_READABILITY = PENDING_CAPTURE
P2_DOMAIN_NATIVE_VISUAL_GRAMMAR = PENDING_CAPTURE
P2_AI_SLOP_RISK = PENDING_CAPTURE_TARGET_LOW
P3_PROOF_SEQUENCE_ABOVE_FOLD = PENDING_CAPTURE
P4_REDUCED_MOTION = PENDING_CAPTURE
DESKTOP_1440x900_CAPTURE = PENDING
VIDEO_SAFE_1280x720_CAPTURE = PENDING
MOBILE_390x844_CAPTURE = PENDING
REDUCED_MOTION_CAPTURE_OR_DIRECT_VERIFY = PENDING
LIVE_REPLAY_SIMULATION_TRUTH_BOUNDARY = PASS
REVISION_01_COMMIT_REFUSED_VISIBLE = PASS_SOURCE_LEVEL
CANONICAL_CONFLICTS_VISIBLE = lead_actor,camera_a,van_1
REVISION_02_AT_18_00_VISIBLE = TRUE_SOURCE_LEVEL
REVISION_02_COMMIT_ALLOWED_VISIBLE = TRUE_SOURCE_LEVEL
FINAL_CONFLICT_FREE_VISIBLE = TRUE_SOURCE_LEVEL
MACHINE_READABLE_RECEIPT = PASS_HTTP_200
```

## Exact next action

```text
TRACE_CAPTURE_CURRENT_PRODUCTION
→ 1440×900
→ 1280×720
→ 390×844
→ reduced-motion verification
→ rerun Gate 6.5
```

If Gate 6.5 passes:

```text
TRACE Gate 6.75 — Demo Narrative / Evidence Film
→ final 75–90 sec demo
→ Project Finisher
→ official submission form
→ gallery/detail/link verification
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
