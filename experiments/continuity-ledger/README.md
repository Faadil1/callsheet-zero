# Callsheet Zero — TRACE UI/UX calibration / Continuity Ledger

**Experiment only.** This is a visual and task-clarity pilot based on the existing 2026-09-05 archived receipts. It performs **no new Mozaik or Anthropic inference**, and is not a new policy-attributed TRACE A/B result.

## Two review surfaces

| Arm | Route | Design |
| --- | --- | --- |
| Control — Continuity Desk | /index.html | Existing mint/evergreen production revision desk |
| Candidate — Continuity Ledger | /experiments/continuity-ledger/index.html | Production-shooting-paper visual grammar: warm paper, rust signal, serif time cues, archived operator summary |

Both variants use **the same** /ui/continuity.js state/interaction code, /ui/canonical.js archived data, five-stage replay, original September 5 receipt and deterministic Guard decisions. The candidate is a separate HTML/CSS route and keeps the operator-live button hidden. No changes to production entry point, API, guard, keys, or source receipts.

**Truth boundary:** The operator summary on the candidate is specifically labeled *archived final outcome*. During an earlier replay stage, the summary describes the historical final outcome; it is not a claim that a Guard already committed at that moment. The UI phrase COMMIT REFUSED is a derived decision interpretation of three resource holds, not a made-up provider event.

## Pre-registered visual hypotheses

- **H1 — task comprehension:** S22 16:30 → 18:00, three historical holds, one targeted repair, and zero final conflicts are faster to locate.
- **H2 — domain grammar:** a shooting continuity sheet reads as a production operations tool rather than generic AI/SaaS.
- **H3 — critical negative path:** the new archived outcome panel might push the interactive tables and replay controls below the first screen, especially 1280×720 and 390×844. Reject or revise even if visual novelty improves.
- **H4 — accessibility:** keyboard, clear focus, reduced-motion pause and mobile table content remain usable.
- **H5 — evidence integrity:** captured September 2026 replay is visibly distinct from fresh live execution and links to the immutable receipt.

## Paired user tasks (same fixture)

1. Find REV 01 refusal, the three hard holds (lead_actor, camera_a and van_1), and REV 02 allowed.
2. Find the repaired scene S22 moving from 16:30 to 18:00, identifying Schedule Agent as the only repair.
3. Navigate all five replay stages: 3 agents started, refused, repair requested, proposed awaiting commit, then allowed.
4. Inspect the event ledger and verify historical capture/source honesty.
5. Complete these tasks at desktop 1440×900, video safe 1280×720, mobile 390×844, with keyboard and reduced motion.
6. Verify zero calls to the paid run endpoint during evaluation.

## No-cost local paired screenshot QA

In the repository root, on this experiment branch:

    npm ci
    npx playwright install chromium
    node experiments/continuity-ledger/capture-qa.mjs

The QA tool runs a self-contained **loopback-only static web server**, rejects every /api/* request with 503, and never imports provider code, API keys, or an environment file. The harness verifies the five-step state sequence, receipt inspection, browser errors, reduced motion, mobile overflow, candidate operator-live hidden and **zero provider endpoint calls**. It writes six screenshots plus a machine-readable report into the already gitignored artifacts/trace-continuity-ledger directory.

**QA status:** Test runner authored, not yet actually run against this exact branch in the owner's Chromium environment. A Vercel preview in READY state is a build fact, not a browser QA result.

## Human comparison

Score control and candidate blind where practical (scale 1–5): first-glance findability, evidence provenance, production-domain visual specificity, interaction comprehension, accessibility, responsive layout, preserved product depth. Record individual task completion times, first-click paths, confusion/error moments and screenshots. Require at least two independent reviewers to make an editorial preference claim. Treat any evidence-truth or accessibility regression as a blocker, not an averageable score.

This design comparison is **calibration**, not causal assessment of TRACE policy improvement: both experiences share the same prior implementation and are not independent builds under old/new TRACE guidance. Keep original TRACE Design PR #36 study scorecards empty until genuine independently generated pairs have been evaluated.

## Conditional gate registry

| Gate | State | Justification |
| --- | --- | --- |
| Archived receipt integrity | PROVEN as historical | Captured real 2026-09-05 receipts, reused unchanged |
| UI/UX candidate | ACTIVE | Isolated alternative interface created |
| Visual comparison and browser task QA | BLOCKED pending execution | Automated runner and reviewer protocol ready |
| No-cost gate | ACTIVE | No inference, API requests deliberately denied |
| Product live depth | N/A to design experiment | Runtime not altered; cannot claim fresh agent consequence |
| Safety / unauthorized run | PROVEN for production denial | Owner already observed health OK, GET 405, POST 503 |
| Independent TRACE policy A/B | BLOCKED | No separate old/new policy generation |
| Global TRACE promotion | BLOCKED | Requires actual causal evidence |
| Merge to product main | BLOCKED | Candidate stays preview-only pending acceptance |

## Exit conditions

Do not merge this experiment merely because it is prettier. If the candidate obstructs task success, hides the Guard authority, makes the archived outcome look live, or breaks mobile accessibility, reject or repair it. Do not use an imagined screenshot or an archival replay as proof of a new live model run.

## October 18 first actual paired QA + design review (superseded by iteration 02)

Owner actually ran the first experiment HEAD `f1f7a814a08eb153cb738cee6f7cbaf084044b67` in Windows Chromium, with 6/6 browser journeys, 6/6 full-page screenshots, zero horizontal overflow, zero JS exceptions and **zero paid API requests**. Actual screenshots and `paired-qa.json` were uploaded and visually inspected.

**Direct design findings from real screenshots:** Candidate is distinctly domain-native (warm printed shooting ledger, temporal and archival cues, non-SaaS identity), but at **1280×720** its five-step transport was visually pushed below the first fold and at **390×844** the extra operator brief delayed the beginning of REV 01. Control's replay and refusal evidence were more immediately visible, so the candidate is **NOT promoted** despite aesthetic gains. Small footnote typography also warrants separate readability/accessibility review. The original reported `controls.bottom` values from the old runner were **INVALID for first-fold claims** because the browser was auto-scrolled after clicking the receipts summary; screenshots captured the entire page and showed a displaced fixed skip link. Correct the test harness rather than treating negative mobile coordinates as evidence that controls are absent.

**Iteration 02 / new HEAD:** Reorder the transport **before** revision tables on large viewports as already done on mobile, compact the redundant archival brief on mobile, then in the runner blur active focus and reset window scroll to top before collecting bounding rectangles and generating both a viewport crop and a full-page screenshot. Require replay controls and REV 01 refusal inside the real first fold on all three widths, and REV 02 allowed inside it on desktop/jury. `12` image files (6 first-fold + 6 full-page) plus `paired-qa.json` expected only **after owner reruns this new HEAD**.

**Truth status:** iteration 01 LOCAL_CHROMIUM_VERIFIED with visual regression observed; iteration 02 SOURCE_PATCHED / PREVIEW_PENDING / BROWSER_QA_NOT_RUN. No user testing, A/B performance uplift or live agent execution has been proven.
