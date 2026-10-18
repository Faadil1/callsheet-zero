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
