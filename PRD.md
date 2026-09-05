# CALLSHEET ZERO — Evolutionary PRD

**Status:** BUILD AUTHORIZED / MVP implementation started 2026-09-05  
**Hackathon:** JigJoy × daily.dev × Hyperskill 2026  
**Entry:** Solo  
**Deadline:** 2026-09-07 03:00 ET

## Problem

Operational plans become stale while teams are still reasoning about them. Most agent workflows hide this by running roles in a predefined sequence. That creates safe-looking demos but fails to show what happens when multiple autonomous actors make locally rational decisions against a world that keeps changing.

## Product hypothesis

If multiple agents can react independently to the same evolving operational state, and deterministic invariants can reject incompatible mutations without stopping the whole system, then concurrent agents become useful for **continuous plan repair**, not just parallel task completion.

## MVP story

A film production has a stable call sheet. Rain removes an exterior location while the lead actor is delayed. Schedule, Talent and Logistics agents immediately propose repairs from different local objectives. Their proposals collide on the lead actor and/or van. A deterministic guard detects the collision and asks one agent to repair against the newly shared state. The final schedule becomes coherent without restarting all agents.

## Required mechanisms

1. **One shared runtime state** — no isolated copies as source of truth.
2. **Three independent agents** — Schedule, Talent, Logistics.
3. **One common disruption event** — agents become eligible simultaneously.
4. **Structured proposals** — machine-readable mutations.
5. **Deterministic invariants** — resource/time overlap is code, not LLM opinion.
6. **Conflict receipt** — the product shows what collided and why.
7. **Event-driven repair** — only the affected agent rethinks the invalid proposal.
8. **Concurrency proof** — initial inference starts from all three precede first completion.

## Non-goals for hackathon MVP

- Full film-production ERP
- Calendar integrations
- Real weather feeds
- Authentication / multi-tenancy
- Large agent count
- Custom observability platform
- Model training via Adaption Labs
- Generic “agent orchestration” product

## Acceptance gates

### G1 — Runtime
- Three Mozaik agents are joined.
- One event starts independent loops.
- `inference.started` receipts are captured.

### G2 — Constraint repair
- At least one real first-round collision appears.
- Guard identifies the exact scarce resource.
- One targeted repair loop occurs.
- Final proposals contain no overlapping scarce-resource claim.

### G3 — Product surface
- Before → Shock → Agents → Conflict → Repair → After is understandable without explanation.
- Live vs simulation is unmistakably labeled.

### G4 — Evidence
- Mozaik Cloud paired.
- README explains concurrency.
- Repo accessible to judges.
- Short video shows both product UI and Mozaik Cloud.

### G5 — Submission
- First safe submission before final deadline.
- Improvements only after a submitted baseline exists.
