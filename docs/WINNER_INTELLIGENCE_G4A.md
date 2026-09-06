# G4A — Winner Intelligence Pre-Submission Audit

Date: 2026-09-06
Project: CALLSHEET ZERO
Mode: advisory only

## Authority

```text
WINNER_RESEARCH_MODE = STOP_DEFAULT_ACCUMULATION
BUILD_AUTHORITY = OUT_OF_SCOPE
SUBMISSION_AUTHORITY = OUT_OF_SCOPE
WINNING_LAWS_PROMOTED = 0
```

This audit does not reopen concept selection. It applies the existing Winner Intelligence pre-submission heuristics to the authorized build.

## Executive verdict

```text
PRODUCT_MECHANISM = STRONG
TECHNICAL_EVIDENCE = STRONG
PUBLIC_CONCURRENCY_CRITERION = SUPPORTED
MOZAIK_SPONSOR_NATIVE_NECESSITY = SUPPORTED
ADAPTION_SECONDARY_STORY = STRONG_BUT_NON_CORE
NARRATIVE_AND_DEMO_LEGIBILITY = PARTIAL
JUDGE_PATH_LEGIBILITY = PARTIAL
WHOLE_RUBRIC_COVERAGE = UNKNOWN_FULL_RUBRIC_NOT_PUBLIC
CURRENT_FINAL_DEMO_RELIABILITY = CRITICAL_GAP
```

The main risk is not the build. The main risk is that one stochastic live run may not show the strongest mechanism.

## Heuristic results

### Sponsor-native necessity — SUPPORTED

Mozaik is load-bearing: three independent participants share one runtime state; one disruption makes them independently eligible to react; `runLoop()` is fire-and-forget; semantic events prove overlap; and the targeted repair happens against updated shared state. Removing that concurrent runtime removes the product's defining proof.

Judge-facing wording: **the agents do not wait for each other**.

### Whole-rubric coverage — UNKNOWN

The current public event page still does not expose a complete judging rubric. It explicitly says to expect weight on genuine concurrency. CALLSHEET ZERO strongly supports that known criterion, but full rubric coverage should not be claimed until any final Discord/private criteria are reconciled.

### Narrative + demo legibility — PARTIAL

The narrative is strong in text, but the G3G browser run converged with 0 conflicts. It proved live concurrency and a valid final state, but did not show the hero mechanism: concurrent proposals collide, the Constraint Guard detects exact overlaps, and a targeted version-2 repair resolves them.

### Judge path — PARTIAL

The supplied browser recording has a clear signature action (`Run disruption`), a truthful waiting state, visible runtime receipts, a later `PROVED` concurrency result, and a final call sheet. However, the first screen does not make **three agents running concurrently** the dominant message, and the conflict→repair consequence is not reliable on every live click.

## Winner-mechanism transfer

The strongest abstract transfers from the existing verified mechanism library are:

- **WM-006 Failure as feature:** concurrent good decisions → visible conflict → deterministic diagnosis → targeted recovery → trust.
- **WM-002 Constraint inversion / before-after:** world shock + scarce resources → concurrency exposes coordination pressure → shared runtime + events enable repair → coherent schedule.
- **WM-007 Primitive-to-product:** Mozaik concurrency becomes the direct promise that agents do not wait and the system repairs against current shared state.

No style copying and no causal winning law are claimed.

## Judge memory sentence

> **Three agents make good decisions at the same time. CALLSHEET ZERO catches when those decisions collide — and repairs the plan live.**

Recommended opening line:

> **Three agents. One film shoot. They don't wait for each other.**

## Critical gaps

### 1. Canonical demo reliability

The G3G run showed that Claude can independently avoid the collision. The final demo should not depend on repeatedly clicking until a conflict appears.

Recommended bounded change: add a clearly labeled **Verified Repair Replay** that renders the already-proved production run `dpl_97NVNrioU1r2FEjMWhQA83ciTcvR` from captured evidence, while keeping the existing live `Run disruption` path available.

Required replay beats:

```text
3 agents started before first completion
→ PROVED
→ lead_actor + camera_a + van_1 conflicts
→ repair.requested
→ Schedule Agent v2
→ S22 @ 18:00
→ final conflicts = 0
```

The replay must be explicitly labeled as a replay of a verified live run, never presented as a new live execution.

### 2. First-five-second clarity

Add one compact judge-facing cue near the opening action:

```text
THREE AGENTS REACT AT ONCE
Shared state. Independent decisions. Real collisions.
```

### 3. Evidence surfacing drift

Reconcile before Project Finisher:

- README still leaves the human browser smoke unchecked although G3G is PASS.
- Submission draft names `lead_actor` and `van_1`, but the canonical run has three conflicts: `lead_actor`, `camera_a`, `van_1`.
- Adaption should remain a secondary asynchronous learning proof; Mozaik remains the core sponsor-native story.

### Watch — submission wording

The current public JigJoy page says a repo and a short demo are submitted. Earlier workstream material treated the video as optional/helpful. This does not alter the plan because a final video is already being produced, but the package should include it.

## Recommended 75–90 second demo

```text
0–05s   Three agents. One film shoot. They don't wait.
05–12s  Rain + lead actor delayed 90m.
12–22s  Start clearly labeled Verified Repair Replay.
22–32s  Show three inference starts before first completion → PROVED.
32–45s  Show 3 conflicts: lead_actor / camera_a / van_1.
45–57s  Guard emits repair.requested; Schedule Agent reruns.
57–68s  Schedule v2 moves S22 to 18:00; final conflicts = 0.
68–78s  Brief Mozaik Cloud receipts.
78–85s  Adaption: verified repair → async preference data.
85–90s  Repeat the memory sentence.
```

## Do not add

- No new LLM agent just to increase agent count.
- No long architecture tour before showing product consequence.
- No claim that the one-row Adaption result proves unsafe→safe learning.
- No claim that Winner Intelligence mechanisms are causal winning laws.
- No unlabeled replay presented as live.
- No concept reopening without a later true blocker.

## Recommended short description

> **CALLSHEET ZERO is a film-production recovery system where three Mozaik agents react concurrently to the same disruption. Their individually sensible decisions can collide over scarce actors, cameras, and vehicles; a deterministic Constraint Guard detects the exact overlap and triggers a targeted repair against the latest shared state. A verified production run proved all three agents were in inference together, produced three real resource conflicts, and repaired the call sheet without restarting the workflow.**

Optional secondary sentence:

> **Completed verified repairs can also flow asynchronously into Adaption Labs to generate preference data for future training/evaluation, while the deterministic Guard remains the safety authority.**

## Gate

```text
G4A_WINNER_INTELLIGENCE_PRE_SUBMISSION_AUDIT = PASS
G4A_SPONSOR_NATIVE_NECESSITY = SUPPORTED
G4A_PUBLIC_CONCURRENCY_CRITERION = SUPPORTED
G4A_WHOLE_RUBRIC_COVERAGE = UNKNOWN_FULL_RUBRIC_NOT_PUBLIC
G4A_NARRATIVE_DEMO_LEGIBILITY = PARTIAL
G4A_JUDGE_PATH_LEGIBILITY = PARTIAL
G4A_TOP_CRITICAL_GAP = CANONICAL_DEMO_RELIABILITY
G4A_RECOMMENDED_DEMO_MODE = VERIFIED_LIVE_REPAIR_REPLAY_PLUS_EXISTING_LIVE_RUN
G4A_WINNING_LAWS_PROMOTED = 0
NEXT_EXACT_GATE = G4B_PBPD_APPLY_BOUNDED_DEMO_HARDENING_THEN_TRACE_JUDGE_FACING_REVIEW
```
