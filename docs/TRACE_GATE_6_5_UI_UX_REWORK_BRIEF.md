# TRACE Gate 6.5 — CALLSHEET ZERO UI/UX Rework Brief

Date: 2026-09-06
State class: project design assurance
Owner: TRACE (advisory design assurance) / PBPD implementation
Scope: bounded visual and evaluator-experience rework only

## Objective

Make CALLSHEET ZERO feel like a **film-production revision instrument**, not a generic AI/SaaS dashboard, while preserving every verified product truth and the existing live/replay/runtime architecture.

Design target:

> **Production revision control for a shoot under disruption.**

Not:

> generic dark agent dashboard with neon status cards.

## Frozen product truth — do not reopen

- Three Mozaik agents remain the live concurrent runtime.
- Constraint Guard remains deterministic and non-LLM.
- Live run remains a fresh stochastic model execution.
- Verified Repair Replay remains a replay of captured canonical live evidence and must never be presented as a fresh live run.
- Simulation remains explicitly labeled preview behavior.
- Canonical verified repair remains: `lead_actor`, `camera_a`, `van_1` collisions → `repair.requested` → Schedule Agent v2 → S22 @ 18:00 → final conflicts 0.
- Adaption remains asynchronous and secondary; it must not become the hero interaction.

## The four evaluator-experience problems that must all be solved

### P1 — Judge/video readability

Current problem:
- 9–10px roles/tags and 11–12px dense supporting copy are fragile in compressed video, screen share and small jury players.

Required correction:
- important UI labels: minimum 12–13px;
- supporting/body text: minimum 14px;
- proof values and operational statuses: 15px+ or visually dominant;
- timestamps/resource IDs may use compact monospace but must remain legible;
- remove nonessential microcopy rather than shrinking it.

Pass condition:
- critical proof path is readable in a 1280×720 or 1440×900 screen recording without zoom.

### P2 — Generic AI/SaaS visual shell / AI-slop risk

Current problem:
- dark navy background, blue glow, rounded cards, gradient accents and agent-status styling feel like a reusable AI dashboard template;
- film-production specificity lives too much in copy instead of interface structure.

Required correction:
- remove radial glow and startup-neon treatment;
- replace generic card grammar with call-sheet / revision-board grammar;
- reduce corner radii substantially;
- use operational rules, revision marks, time columns, resource strips and approval stamps;
- make the film-production domain visible before the evaluator reads paragraphs.

Pass condition:
- if the hero paragraph is hidden, the remaining interface still reads as a production scheduling/revision tool rather than a generic multi-agent dashboard.

### P3 — Strongest proof sequence sits below the fold

Current problem:
- `PROVED → 3 conflicts → repair.requested → v2 @ 18:00 → final conflicts 0` requires scrolling and is not immediately scannable.

Required correction:
- add an above-the-fold **Verified Run Evidence Strip**;
- the strip must be explicitly labeled as canonical captured evidence, not current live state;
- surface the five proof beats in one horizontal/stacked sequence;
- verified replay should animate/progress this same sequence when invoked;
- keep detailed receipts lower on the page as evidence depth, not first-contact comprehension.

Pass condition:
- within 5 seconds, a judge can state what happened and why the product matters.

### P4 — Reduced-motion assurance missing

Current problem:
- running-agent motion has no explicit `prefers-reduced-motion` handling.

Required correction:
- add `@media (prefers-reduced-motion: reduce)`;
- disable looping/progress animations and nonessential transitions;
- keep state changes visible through text, border/stamp state and color-independent labels.

Pass condition:
- product remains fully understandable with reduced motion enabled.

## Visual direction — Warm Production Operations

The interface should feel closer to a working call sheet, revision packet and production-control desk than to an AI observability console.

### Palette

Recommended base tokens:

```css
--canvas: #F2EFE7;        /* warm production paper */
--surface: #FBFAF6;       /* clean sheet */
--surface-2: #E8E4DA;     /* secondary strip */
--ink: #171816;           /* near-black ink */
--muted: #64665F;         /* technical annotation */
--rule: #C9C4B8;          /* printed rule line */
--slate: #4B5D6B;         /* system / Mozaik / neutral technical */
--conflict: #A04438;      /* brick red */
--warning: #B27A27;       /* amber production warning */
--resolved: #2F6B4C;      /* approval / safe state */
--replay: #536A82;        /* verified evidence / replay */
```

Rules:
- no blue/purple glow;
- no decorative gradients;
- no neon borders;
- semantic color only where status has meaning;
- every color-coded state also has explicit text/iconography.

### Shape language

- primary panels: 4–8px radius, not 18px SaaS cards;
- use thin printed rules and section dividers;
- buttons: utilitarian, tactile, high-contrast, 6–8px radius;
- stamps/approval blocks may use square/rectangular geometry;
- avoid glassmorphism and blurred sticky-panel effects.

### Typography

- UI/body: system sans or existing sans, regular/medium weights;
- operational IDs/times/resources: monospace;
- avoid ultra-tight all-caps micro-labels below 12px;
- use a compact editorial hierarchy rather than a giant marketing hero.

## Domain-native interface grammar

### 1. Call Sheet Revision Header

Replace the generic AI-style top region with a compact operational header carrying domain-native metadata, for example:

```text
CALLSHEET ZERO
SHOOT DAY 01 · UNIT A · REVISION CONTROL
WEATHER HOLD: COURTYARD
LEAD ACTOR: +90 MIN
CURRENT REV: 01
```

The header should feel like a live production document, not landing-page marketing.

### 2. Verified Run Evidence Strip

Immediately below the header/incident control, surface:

```text
CANONICAL VERIFIED RUN · 2026-09-05
3 AGENTS STARTED
→ 3 RESOURCE CONFLICTS
→ REPAIR REQUESTED
→ REV 02 · S22 18:00
→ 0 FINAL CONFLICTS
```

Requirements:
- clearly marked as **verified captured evidence**;
- not confused with live current state;
- during `Replay verified repair`, the strip progresses state by state;
- during a new live run, live results can update a separate current-run status without overwriting provenance.

### 3. Revision grammar

Use explicit operational versioning:

```text
REV 01 · INITIAL PROPOSALS
REV 01 · CONFLICT HOLD
REV 02 · TARGETED REPAIR
REV 02 · CONFLICT-FREE / COMMITTED
```

This becomes the primary before/after vocabulary instead of generic cards.

### 4. Constraint Guard receipts

Keep the exact three conflict receipts, but make them look like production exception tickets:

```text
CONSTRAINT HOLD 01
RESOURCE: lead_actor
CLAIM: Talent ↔ Schedule
STATUS: COLLISION
```

Repeat for `camera_a` and `van_1`.

### 5. Final approval stamp

Final state must have a strong, restrained validation mark:

```text
REVISION 02
CONFLICT-FREE
COMMITTED TO SHARED STATE
```

Do not use a celebratory gradient or animation. It should feel like an operational approval.

## UX hierarchy

Above the fold, evaluator order must be:

1. **Production identity + disruption** — what changed?
2. **Two honest actions** — Run live / Replay verified repair.
3. **Canonical evidence strip** — what the verified system has already proved.
4. **Current/replay state** — what is happening now.
5. **Detailed agent proposals + Guard receipts** — why the repair was necessary.
6. **Final revision** — what was committed.

The evaluator should not need to scroll before understanding the mechanism.

## Copy rules

Prefer production-native language:
- `Call sheet revision`
- `Shoot disruption`
- `Constraint hold`
- `Resource collision`
- `Revision 02`
- `Committed plan`

Use AI/runtime language only where it proves sponsor-native behavior:
- `Mozaik concurrent agents`
- `inference.started`
- `shared runtime state`

Avoid adding generic terms such as:
- AI orchestration platform
- intelligent workflow
- autonomous copilot
- next-gen operations
- agentic command center

## Motion rules

Motion must have a job:
- replay progression may use one brief state transition;
- live running state may use one subtle progress cue;
- conflict detection may use a single non-looping emphasis;
- final commit may use a static stamp or one short transition.

No ambient animation. No particles. No pulsing glow. No cinematic grain.

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Responsive evaluator targets

Mandatory validation contexts:
- desktop capture: 1440×900;
- video-safe: 1280×720;
- narrow/mobile: 390×844;
- reduced-motion browser preference.

At 390px:
- revision strip becomes vertical, not horizontally compressed;
- actions remain >=44px target height;
- proof states remain readable without horizontal scrolling;
- resource IDs may wrap but not truncate critical evidence.

## Keep / Change / Remove

### Keep
- CALLSHEET ZERO name;
- current runtime architecture;
- Live and Verified Replay controls;
- exact canonical conflict resources;
- current semantic status colors concept;
- detailed Mozaik receipts;
- deterministic Guard visibility.

### Change
- palette;
- card geometry;
- hero composition;
- typography scale;
- section language;
- evidence placement;
- final-state presentation;
- status affordances.

### Remove
- blue/purple glow;
- radial background gradient;
- glass/sticky SaaS treatment where decorative;
- excessive pill badges;
- microtype below evaluator-safe thresholds;
- decorative animation without proof value.

## Gate 6.5 acceptance matrix

TRACE must not pass Gate 6.5 until all are true:

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

## Implementation boundary

This rework may change HTML/CSS/presentation JavaScript needed to render the same verified information. It must **not** change:
- Mozaik engine semantics;
- concurrency proof logic;
- Constraint Guard logic;
- canonical evidence values;
- Adaption runtime role;
- live/replay truth classification.

## Next exact action

PBPD applies this bounded rework to the product source, runs CI, deploys, then TRACE captures the current production artifact and reruns Gate 6.5. Only after Gate 6.5 PASS may the project advance to Gate 6.75 — Demo Narrative / Evidence Film.
