# Competitive Signal — JigJoy/Mozaik Discord + Public Gallery

Date: 2026-09-06
Source class: participant/community signal + current official hackathon page
Purpose: bounded pre-submission intelligence; do not reopen product scope.

## Confirmed operational updates

- Organizer Discord confirms the final deadline as Monday, September 7 at 9:00 AM CET.
- Current official hackathon page explicitly renders this as `3:00 AM ET` and says the required submission is a repo plus a short demo submitted through the official submission flow.
- Mozaik Cloud is optional; it is not required for eligibility.
- Public gallery is live and projects appear there immediately after submission.
- Gallery supports likes/comments, but these are not treated as judging criteria absent an explicit rule.
- Discord channel currently shows an onboarding gate before posting; this is not treated as a submission blocker because the official page/form is the submission route.

## Visible competitor signals

### OpsRoom

Public participant description:
- solo build;
- 12 concurrent participants total in the published write-up, described as 8 AI agents plus 4 telemetry feeds;
- production-outage / incident-war-room domain;
- Mozaik event bus is central;
- proposal challenge / risk blocking;
- human approval gate for serious actions;
- strong technical breadth and Mozaik-native story.

External write-up reinforces three Mozaik-native themes: concurrency, awareness and adaptivity, plus structured protocol tokens and interception for unsafe state-changing actions.

Competitive interpretation:
- **Strong competitor** on raw Mozaik-native breadth and concurrency spectacle.
- Does **not** invalidate CALLSHEET ZERO; agent count is not the judging target. Current public criteria emphasize genuine concurrent execution rather than a sequential pipeline in disguise.
- CALLSHEET ZERO should not chase agent-count escalation.

### Configurable workflow builder signal

Another participant showed an event/participant workflow-builder concept where users define events, participants, entry/exit events and state transitions from a UI.

Interpretation:
- broad/general-purpose architecture;
- potentially flexible, but less domain-specific from the evidence shown;
- no reason to change CALLSHEET ZERO scope.

### IncidentMesh

A submitted project reported a gallery detail-route visibility bug after resubmission. The public list/API showed the project while the detail route returned 404; organizers acknowledged and investigated.

Interpretation:
- important submission QA signal: after submitting, verify both gallery presence and project detail URL, not just a successful API/form response.

## CALLSHEET ZERO differentiation that must be protected

1. **Domain specificity** — film-production call-sheet revision, not generic ops/workflow orchestration.
2. **Failure as feature** — agents make locally sensible decisions that collide over real shared resources.
3. **Deterministic Constraint Guard** — exact `lead_actor`, `camera_a`, `van_1` collisions are machine-checked rather than judged by another LLM.
4. **Targeted repair** — only Schedule Agent receives `repair.requested`; no full workflow restart.
5. **Proof quality** — canonical production evidence proves all three initial agent loops started before any completed.
6. **Truthful replay** — verified repair replay removes demo stochasticity without pretending captured evidence is a new live model call.
7. **Domain-native judge UX** — production-revision visual grammar rather than generic dark AI observability.
8. **Secondary learning loop** — verified repair outcomes are converted asynchronously into Adaption preference data; this remains a supporting story, not the real-time hero.

## Pre-submission implication

Do not reopen architecture or add more agents merely to match competitor counts.

The highest-value response to the current field is to make the existing mechanism instantly legible in the demo:

```text
3 agents start concurrently
→ 3 exact resource collisions
→ deterministic Guard
→ repair.requested
→ Schedule REV 02 at 18:00
→ 0 final conflicts
```

This is a sharper judge-memory path than competing on participant count.

## Submission QA addition

After the official form returns success:

1. confirm gallery card exists;
2. open the detail URL and confirm it resolves;
3. confirm cover/demo/repo links render correctly;
4. preserve the returned slug/confirmation as evidence;
5. if the detail route fails, report immediately with form/API success evidence.

## State decision

```text
COMPETITIVE_SIGNAL = REVIEWED
OPSROOM = STRONG_COMPETITOR_NO_SCOPE_REOPEN
AGENT_COUNT_ESCALATION = REJECTED
OFFICIAL_SUBMISSION_ROUTE = FORM/GALLERY
DISCORD_POSTING = NOT_PROVEN_REQUIRED
SUBMISSION_DETAIL_URL_POSTCHECK = REQUIRED
NEXT_EXACT_GATE = TRACE_GATE_6_5_CURRENT_PRODUCTION_CAPTURE
```
