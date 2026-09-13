# CALLSHEET ZERO — JigJoy × daily.dev × Hyperskill Hackathon 2026 Postmortem

Date: 2026-09-13
Status: FINAL COMPETITION POSTMORTEM
Outcome: submitted successfully; not selected for the overall Top 5 or Hyperskill Premium winners.

## 1. Executive verdict

CALLSHEET ZERO was technically valid, genuinely concurrent, visually differentiated, and unusually disciplined about evidence. It did **not** lose because concurrency was fake, the product was broken, or the concept was irrelevant.

The strongest available evidence points to a narrower gap:

> **We proved that concurrent agents overlapped and that their outputs could collide. The winner proved that concurrency changed what the system could safely do, isolated that causal mechanism experimentally, and made the proof reproducible in seconds.**

That distinction matters.

CALLSHEET ZERO's core pattern remains strong:

```text
probabilistic concurrent proposals
→ deterministic global constraint check
→ refuse impossible state
→ targeted repair
→ commit only after invariants pass
```

But for this specific hackathon, the winning bar was higher than "real concurrency + a good product." The first-place project, **Separation**, made concurrency itself the theorem of the product: a hazard existed only while multiple decisions were simultaneously in flight, and the architecture altered one in-flight decision before commit. It then backed that claim with an ablation across multiple architectures and hundreds of deterministic runs.

This is the central lesson to carry forward.

---

## 2. Confirmed outcome

The announced overall Top 5 were:

1. **Separation** — 1st place
2. **Metamorph** — 2nd place
3. **Watchtower** — 3rd place
4. **Butterfly** — 4th place
5. **Hive** — 5th place

The announced Hyperskill Premium winners were:

- BountyProof
- Zero-Capital Economic Agent Swarm
- Concurrent Agent-Based Simulation Environment
- Separation
- Metamorph

CALLSHEET ZERO was not listed in either group.

The official rules weighted **genuine concurrency** alongside **technical execution, creativity, and clarity of the demo**. Source: https://build.jigjoy.ai/rules

No per-project judge scorecard or written reason for CALLSHEET ZERO's ranking was available at the time of this postmortem. Therefore, all explanations below are explicitly classified as either **confirmed evidence** or **inference**.

---

## 3. What CALLSHEET ZERO got right

### 3.1 Genuine concurrency was real and verifiable

This was not a sequential pipeline disguised as a multi-agent system.

The canonical run proved:

```text
max(initial inference starts) < min(initial inference completions)
17:54:46.853Z < 17:54:55.285Z
```

Three initial Mozaik loops overlapped for **8.432 seconds** before any initial agent completed.

That directly satisfied the hackathon's primary eligibility/judging concern.

### 3.2 Concurrency created a meaningful shared-resource failure

Schedule, Talent, and Logistics could each produce locally sensible decisions while collectively creating an impossible film-production plan.

The canonical conflict set was exact and inspectable:

- `lead_actor`
- `camera_a`
- `van_1`

This was materially stronger than merely using concurrency for speed.

### 3.3 Deterministic authority was separated from probabilistic judgment

The Constraint Guard was a good architectural decision.

Hard production invariants were not delegated to an LLM. The Guard could refuse REV 01, request a targeted repair, and allow REV 02 only after the shared schedule became conflict-free.

This aligns closely with JigJoy's own public design direction: model the domain, state, invariants, and impossible states explicitly rather than encoding all safety in prompts.

### 3.4 Targeted repair was a strong product mechanism

CALLSHEET ZERO did not restart every agent after a collision.

Only the Schedule Agent was asked to repair, moving S22 from 16:30 to 18:00 while preserving accepted decisions from the other agents.

That remains a reusable pattern worth preserving.

### 3.5 Evidence discipline was strong

The project shipped multiple independent proof surfaces:

- live execution;
- verified replay;
- machine-readable canonical receipt;
- Mozaik timing evidence;
- explicit live/replay/simulation truth boundaries;
- exact conflict and repair receipts.

The project also avoided claiming that `COMMIT REFUSED` was a fabricated Mozaik semantic event. It was correctly represented as a deterministic decision-layer interpretation of verified conflicts.

### 3.6 The visual identity was differentiated

The Continuity Desk / production-revision-control direction was domain-native and avoided the generic dark "AI command center" look common across the gallery.

That was a real strength, especially because the UI made REV 01 / REV 02 and refusal / repair / allow semantics visually legible.

---

## 4. What the winner did materially better

Primary evidence: https://github.com/OoJae/separation

### 4.1 Separation made concurrency causally indispensable

Separation's core hazard exists **only in the intersection of simultaneously pending decisions**.

Its controllers do not merely run at the same time and then submit finished proposals to a validator. A peer objection can arrive while another controller's function call is still pending; the pending arguments are then narrowed before execution.

That makes concurrency part of the semantics of the decision, not only the timing of proposal generation.

**CALLSHEET ZERO:** concurrent agents → completed proposals → deterministic Guard → possible repair.

**Separation:** concurrent agents → simultaneous in-flight intent → peer objection/interlock → rewrite pending action before commit.

The latter is a deeper demonstration of the hackathon's central technical theme.

### 4.2 Separation shipped an ablation, not only a successful scenario

The winner compared three architectural arms across 600 deterministic runs:

- sequential-equivalent;
- concurrent + validate-at-commit only;
- concurrent + interlock.

Its reported result showed the first two architectures losing separation in all hazardous cases while the interlock caught all hazardous cases, and did not alter safe cases.

That is extremely high-value judge evidence because it answers the hardest question directly:

> **Does this architecture matter, or did the demo just happen to work?**

CALLSHEET ZERO proved one canonical concurrency/collision/repair sequence very well, but did **not** ship an equivalent causal ablation.

### 4.3 Separation made verification almost frictionless

The winner exposed commands such as:

```text
npm run verify:theorem
npm test
npm run ablate
npm run demo:live
```

Its README states that the core verification paths run offline, without API keys or model tokens, and within seconds. It also shipped a deterministic recorded run.

CALLSHEET ZERO had excellent receipts, but the live path depended on model credentials and a fresh stochastic run could legitimately produce zero conflicts. That forced the project to maintain two judge paths:

- Run Live
- Verified Replay

The truth boundary was correct, but the evaluation story was inherently more complex.

### 4.4 Separation demonstrated deeper framework-native exploitation

The winner used Mozaik's interception/runtime behavior as the actual product mechanism and reported multiple runtime findings, including upstream issues against Mozaik.

That creates a strong signal to framework creators: the entrant did not merely use the SDK correctly; they stress-tested its concurrency model deeply enough to discover edge conditions.

CALLSHEET ZERO used Mozaik correctly and proved its loops, but the differentiating Constraint Guard remained application-level deterministic logic after proposal generation.

### 4.5 Separation's proof was selective, not merely protective

A notable detail in the winner's ablation is that hazardous seeds were changed while safe seeds were not.

This distinguishes a mechanism that understands when intervention is required from one that simply blocks or rewrites everything.

CALLSHEET ZERO had the same conceptual instinct — refuse only hard collisions and target only the affected agent — but did not quantify selectivity across many cases.

---

## 5. What second place teaches: Metamorph

Public package evidence: https://www.npmjs.com/package/@nikelyh/metamorph

Metamorph is an installable multi-agent migration CLI. Its public package describes Mapper, Worker, Reviewer, and PackageManager agents, an isolated Shadow Workspace, a live dashboard, explicit apply/rollback flows, and framework migration support.

The lesson is different from Separation's.

Metamorph appears to have converted concurrency into a **complete, immediately usable developer product** rather than primarily an evidence system. A judge can understand the user value quickly:

```text
point at codebase
→ agents migrate in parallel in isolation
→ inspect progress
→ review
→ apply or rollback
```

CALLSHEET ZERO's film-production domain was more distinctive visually, but Metamorph had broader developer utility and a very direct distribution path through npm.

This suggests a second winning axis:

> **If the concurrency theorem is not extraordinary, product completeness and immediate utility can carry significant weight.**

---

## 6. Likely reasons CALLSHEET ZERO did not place — ranked by confidence

These are **inferences**, not published judge feedback.

### High confidence inference A — causal concurrency proof was not strong enough relative to the winner

CALLSHEET ZERO proved overlap and collision.

It did not prove, across controlled counterfactuals, that:

- sequential execution necessarily fails;
- validate-at-commit necessarily fails;
- the targeted concurrent architecture uniquely succeeds;
- intervention is selective across hazardous and safe scenarios.

Separation did.

This is the most important gap.

### High confidence inference B — our coordination happened one phase later

CALLSHEET ZERO coordinated after initial model answers had been produced.

Separation coordinated while decisions were still open.

For a hackathon explicitly about agents "sharing state and coordinating with each other, rather than handing off in a fixed sequence," mid-decision coordination is a stronger native demonstration than parallel proposal generation followed by centralized reconciliation.

### Medium-high confidence inference C — stochastic live behavior weakened the primary demo path

A fresh CALLSHEET ZERO run could already be conflict-free and therefore skip the signature repair.

That behavior was truthful and valid, but it meant the best product story lived in Verified Replay rather than being guaranteed in every fresh live run.

For judging, deterministic reproducibility is an advantage.

### Medium confidence inference D — too much late effort went into surfaces that did not increase the core judging score

Late-cycle effort included:

- TRACE visual assurance;
- live-site deployment recovery;
- Remotion capture infrastructure;
- Adaption learning receipt;
- multiple evidence/presentation refinements.

These were not wasted — they materially improved quality and prevented submission failure — but they consumed time that could otherwise have gone into a causal ablation harness, a selective-intervention benchmark, or deeper Mozaik-native coordination.

The biggest example is Adaption: it was technically real and carefully bounded, but it was secondary to the judging criteria and did not strengthen the central concurrency theorem.

### Medium confidence inference E — the repo's terminal state was not fully reconciled before judging

The README still contained unchecked items for final demo/submission/TRACE completion after those milestones had actually occurred.

That does not invalidate the project, but it creates unnecessary uncertainty for a judge inspecting the repository.

A final terminal-state reconciliation should be mandatory in future hackathons.

---

## 7. What we should NOT conclude

Do **not** conclude that:

- domain-specific products are a mistake;
- deterministic guards are a weak pattern;
- polished design does not matter;
- three agents are too few;
- we needed more sponsor integrations;
- adding Mem0 or more agents would have fixed the result;
- the project should have become a generic incident-management dashboard.

The first-place project actually reinforces several of our core instincts: shared state, explicit invariants, contested authority, selective intervention, reproducible evidence, and refusal of unsafe actions.

The problem was not the direction. The winning implementation pushed the concurrency mechanism one layer deeper and proved it more rigorously.

---

## 8. Winning Intelligence deltas

These are **promotion candidates**, not universal winning laws yet.

### Candidate WI-01 — Causal Concurrency Ablation

For a concurrency-focused competition, do not stop at proving overlap.

Ship at least one controlled comparison where the same scenario is run under:

```text
A. sequential / concurrency removed
B. concurrent but coordination mechanism removed
C. full concurrent architecture
```

The judge should be able to see that only C preserves the desired invariant.

**Status:** STRONG CANDIDATE — requires validation across additional competitions before universal promotion.

### Candidate WI-02 — Concurrency Should Change Semantics, Not Only Throughput

Prefer systems where simultaneous agent state changes what another agent is allowed to decide **before its action closes**, rather than merely running independent work faster.

**Status:** STRONG CANDIDATE.

### Candidate WI-03 — Reproduction Under 30 Seconds

Every core claim should have a judge-verifiable path that is:

- deterministic;
- fast;
- keyless when feasible;
- independent of live-model stochasticity;
- clearly separated from the live product path.

**Status:** PROMOTION CANDIDATE.

### Candidate WI-04 — Selectivity Is Stronger Than Intervention

Demonstrate both:

```text
unsafe case → mechanism intervenes
safe case   → mechanism stays out of the way
```

This proves the system understands the boundary rather than merely blocking aggressively.

**Status:** PROMOTION CANDIDATE.

### Candidate WI-05 — Terminal Repo Reconciliation

Before submission lock, the README, state, handover, demo links, checklist, deployment state, and gallery entry must all describe the same terminal reality.

**Status:** IMMEDIATE PROCESS RULE — operational hygiene, not a winner law.

---

## 9. Revised build strategy for the next similar hackathon

If we rebuilt CALLSHEET ZERO under the lessons from this event, the priority order would change.

### Phase 1 — theorem before polish

Before visual design:

1. define the concurrent hazard;
2. define the invariant;
3. define why sequential execution cannot reproduce or solve the same problem;
4. build an ablation harness;
5. prove selective intervention across multiple deterministic scenarios.

### Phase 2 — framework-native mechanism

Push coordination as close as possible to the runtime:

```text
agent begins action
→ intent becomes visible in shared runtime
→ peer / guard can react while action remains pending
→ action is narrowed, denied, or redirected
→ agent continues with the updated reality
```

For CALLSHEET ZERO specifically, the strongest evolution would be a **resource reservation / intent interlock** that catches contested actor/camera/vehicle claims while multiple schedule actions are still pending — before full proposals become committed candidate schedules.

### Phase 3 — one deterministic judge command

Target:

```text
npm run judge
```

It should produce, without external setup where possible:

- concurrency proof;
- unsafe baseline;
- protected architecture result;
- selective safe-case result;
- compact machine-readable receipt.

### Phase 4 — product surface

Only after the theorem is locked:

- domain-native UI;
- 60–90 second demo;
- live deployment;
- screenshots;
- optional sponsor integrations.

---

## 10. Final assessment

### Product quality

**Strong.** The product was coherent, operational, distinctive, and evidence-rich.

### Hackathon-theme fit

**Strong.** Genuine concurrency was proven and load-bearing to the collision story.

### Technical rigor

**Strong, but below the winner's causal rigor.** CALLSHEET ZERO proved a canonical run; Separation proved an architectural counterfactual.

### Demo clarity

**Good after final cleanup**, but more complex than the winner's reproducible theorem because live stochasticity required a separate verified replay path.

### Strategic execution

**Mixed.** We recovered from real deployment/video issues and submitted a complete project, but late-cycle effort was too presentation-heavy relative to the missing causal ablation.

### Final verdict

```text
PROJECT = WORTH_KEEPING
CORE_ARCHITECTURE = WORTH_REUSING
RESULT = NO_PRIZE
FAILURE_CLASS = NOT_THEME_MISS
PRIMARY_GAP = CAUSAL_CONCURRENCY_PROOF_DEPTH
SECONDARY_GAP = MID_DECISION_COORDINATION_DEPTH
TERTIARY_GAP = DETERMINISTIC_JUDGE_REPRODUCIBILITY
DESIGN_DIRECTION = KEEP
DETERMINISTIC_GUARD_PATTERN = KEEP
TARGETED_REPAIR_PATTERN = KEEP
ADAPTION_LAYER = OPTIONAL_SECONDARY
NEXT_SIMILAR_BUILD = THEOREM_FIRST
```

The most important takeaway is not "build a more generic project next time."

It is:

> **For a systems hackathon, prove why the architecture must exist. Do not merely prove that it works.**

That is the delta between CALLSHEET ZERO's very good submission and the strongest evidence visible in the winning entry.
