# Callsheet Zero — Continuity Register / TRACE Design Hybrid C

**Purpose:** test whether the evidence density of the original Continuity Desk can be retained while adding the distinct domain-native typography, paper surfaces and production-ledger visual language observed in Ledger B. Zero paid provider calls. The production site and canonical evidence remain unchanged.

## Candidate architecture

- **Control A:** `/index.html`, the original Continuity Desk.
- **Rejected reference B:** Ledger in existing DRAFT PR #4, exact iteration-02 HEAD `3e4c7a2baba4435632430c257536a1bbfb5d0c5d`; screenshots and prior 6/6 Chromium QA exist. B is *not copied into this branch* to avoid coupling the release or inheriting its layout regression.
- **Treatment C:** `/experiments/continuity-register/index.html`, a CSS/HTML-only visual candidate based on the production index.
- Both A and C load unchanged `/ui/continuity.js`, `/ui/canonical.js`, five-step historical replay and the existing verified 2026-09-05 receipt. The event history and Guard decisions are not regenerated.
- **No new four-column archive summary**: retain the original compact, side-by-side REV01/REV02 and below-table playback transport on desktop. On mobile use the original replay-before-tables order. Pilot copy labels archived evidence. `Operator live` button is not available in C UI; production main is untouched and its default-deny API protections remain.

## Predetermined design evaluation questions

| Gate | Predeclared pass criterion |
| --- | --- |
| H1 — task clarity | At 1280×720, both REV01 refusal and REV02 allowed visible; full S22 16:30→18:00 repair and complete five-step replay visible without scrolling |
| H2 — mobile evidence | At 390×844, first REV01 proposal starts on screen; no document horizontal scrolling |
| H3 — character | Distinct production-native identity (editorial serif for key time/revision, warm work-paper, copper accents), not generic dashboard styling |
| H4 — behavior | All five steps, refusal, repair, pending vs allowed, receipts and reduced-motion replay remain functional without JS page errors |
| H5 — operator safety | No visible paid-live entry point in C, no /api/* requests in QA, no event presented as new inference |
| H6 — keyboard | Replay stage focus clearly visible; Enter activates focused stage; check other controls manually |
| H7 — review | Two independent reviewers complete identification tasks and describe confusion; stopwatch and compare A/C/B to avoid aesthetics substituting for usability |

**Failure policy:** any material first-fold regression, evidence-integrity problem or keyboard failure blocks C promotion even if artistic quality improves. WCAG color contrast/keyboard completeness and true usability lift require separate checks; Playwright passing is not human research.

## Paired local QA / no billable calls

Run on this branch from repository root with Playwright Chromium installed:

    npm ci
    npx playwright install chromium
    node experiments/continuity-register/capture-qa.mjs

The runner:
- boots an offline static server bound to `127.0.0.1`, deliberately rejects every `/api/*` route, does not load provider credentials;
- executes A and C under **1440×900**, **1280×720** and **390×844**, reduced-motion browser configuration;
- tests five replay stages, keyboard-focused Enter, original receipts, and JavaScript errors;
- resets browser scroll to `0` before every screenshot and measures **true** fold values, plus exact critical repair/first-row gates;
- writes **6 viewport screenshots + 6 full-page screenshots** and one `paired-qa.json` to `artifacts/trace-continuity-register/`;
- asserts **zero API requests**.

Pre-existing B v2 metrics: 1280×720 replay bottom 463 px, REV01 decision top 521 px, lower table content extends below 720; mobile REV01 decision top 762 px. A v2 control: replay bottom 704, REV01 decision top 298; mobile REV01 decision top 675. C must aim for A-level decision visibility while keeping B's distinctive editorial character.

## Evidence states

| Gate | State | Evidence |
| --- | --- | --- |
| Base security (public unauthorized GET/POST) | PROVEN, production | Owner prior HTTP GET /api/run 405; POST /api/run 503, Node v22.23.2 |
| Historical data and guard meaning | PROVEN for captured run only | Unmodified `canonical.js`, `evidence/canonical-run.json` |
| C visual implementation | ACTIVE | Isolated new HTML+CSS on feature branch |
| C build | PENDING until exact-head deployment READY | Check Vercel deployment |
| C Chromium QA | BLOCKED pending execution | Assertions predeclared; no screenshots claimed yet |
| Manual independent UX review | BLOCKED | No task times/reviewer ratings yet |
| New live agent run | N/A | Intentionally no new provider execution; $0 |
| True old-vs-new TRACE governance policy A/B | BLOCKED | C is hand-authored with shared code, not independent policy-generated |
| Release to main | BLOCKED | Draft PR only, explicit approval after review required |

This experiment must not replace or rewrite historical evidence and must not be promoted as global TRACE Design policy proof just because the C surface has a professional visual character.

## Accessibility refinement — review gate (October 18, 2026)

This patch builds on owner-supplied **v1** A/C Chromium measurements at source SHA `246fe26b3f73450265236495856acb2bd7fefb2f`. Those first-fold and screenshot results do **not** transfer automatically to this refinement HEAD.

### Changes in this review

- Mobile critical text is enlarged: table headers, provenance, first-row roles and statuses, five replay-stage labels/details, archived status and evidence metadata. Some compact labels remain **11–12 px** where the 5-column mobile table requires it; do not claim universally comfortable typography.
- Metadata text colors are darkened for improved measured contrast over the warm paper background.
- The candidate's stock JS-provided explanation advertising fresh paid inference is visually replaced with an explicit **archived replay only** source note. The production UI, shared JS, provider routes, and real authorization remain untouched.
- Original refusal/repair layout and 1280×720 replay comparison are preserved; mobile whitespace is tightened to compensate for larger text.

### Extended zero-provider browser QA

Running the same `node experiments/continuity-register/capture-qa.mjs` on this exact HEAD now also:
- tests keyboard **Tab → Enter → ArrowRight → Home → End** on replay stages, then completion of all five states;
- measures WCAG-style luminance **≥4.5:1** on a predeclared sample of critical status text, active stage number, metadata and table labels against their actual computed backgrounds;
- confirms key rendered fonts meet their predeclared minimum (usually 11–12 px);
- checks 44×44 CSS-pixel replay-stage targets at **390 px**;
- probes the **320 px narrow-layout reflow** for document overflow without adding screenshots, in addition to twelve existing 390/1280/1440 captures;
- validates the visible archived-replay-only note and absence of the live trigger, with **0** model-provider HTTP calls.

**Limitations:** These scoped contrast checks are *not* a site-wide automated WCAG audit. A 320 px viewport is a useful reflow stress proxy but **not** proof of correct 200–400% browser zoom or text-only scaling. Full screen-reader announcements, color vision, zoom, complete keyboard navigation and independent task-time studies remain **REVIEW REQUIRED**. In particular, layout compactness is not worth reducing critical labels below accessible sizes.

**Release truth:** Updated source is on DRAFT PR #5 only; Vercel READY is not proof of browser usability. Do not merge until this exact HEAD produces passing Chromium evidence and human visual review of the new mobile/jury captures.

## Zoom, accessibility-tree and independent reviewer preparation — 2026-10-18

New **no-paid-inference** source-only follow-up files:
- `a11y-reflow-qa.mjs` — Chromium on the unchanged archived C candidate at normal **1280**, **640 CSS-px** and **320 CSS-px** viewports, checks visible controls, table/header/button/link exposure in the Chromium accessibility tree, historical refusal/repair/commit and zero `/api/*` requests. Stores three full-page screenshots plus a structured JSON report.
- `MANUAL-UX-A11Y-PROTOCOL.md` — human checklist for **actual 200%/400% browser zoom**, Narrator/NVDA navigation, and a two-person counterbalanced A/C task study. Neither is executed by creating the protocol.

Run in the project root after installing Chromium (the previous paired QA still applies):

    node experiments/continuity-register/capture-qa.mjs
    node experiments/continuity-register/a11y-reflow-qa.mjs

**Truth boundaries:** reflow at 640/320 CSS pixels is a useful WCAG-style narrow-width stress proxy, **not native browser zoom**. A Chromium AX-tree inspection is **not a screen-reader test**. Two reviewers completing timed tasks will be real qualitative evidence, but a sample of two cannot prove statistically significant performance gains. Historic receipts are not new live agent execution. The gate remains `ACTIVE / WAITING_FOR_OWNER_EVIDENCE`, with no production merge or TRACE policy promotion.
