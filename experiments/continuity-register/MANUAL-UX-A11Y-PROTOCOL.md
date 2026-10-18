# TRACE UI/UX — Callsheet Zero C final manual review protocol

**Status:** prepared, NOT YET PERFORMED. Linked to Callsheet Zero draft PR #5. This is a **zero-paid-inference** UX/a11y review of archived 2026-09-05 replay, not a fresh agent runtime test and not a causal comparison of TRACE policies.

## 1. Exactly what to open

Control A: https://callsheet-zero.vercel.app/ (read-only archived replay)

Candidate C: open the current HEAD **preview** link on PR #5, path /experiments/continuity-register/index.html. Do not change Vercel production, do not use or expose credentials, and **do not press Operator live** on A. C hides its operator-live control.

Record source commit, device/browser version, viewport dimensions, and actual Chrome zoom level. Existing automated reflow proxy does not prove genuine browser zoom.

## 2. Real browser zoom and assistive-technology check

Use Windows Chrome/Edge, preferably 1280×720 (full screenshot plus browser chrome when practical).

1. At real **100%** zoom, open C at its current source preview. Verify REV01 refused, REV02 allowed and the scene S22 16:30→18:00 are clear, without falsely implying fresh inference.
2. Use Chrome/Edge browser menu **Zoom → 200%**. Check that all actions, tables, time change, stage controls and evidence remain readable and reachable by scrolling **vertically**, with no unrecoverable clipping or overlay. Capture screenshots of the initial view and REV02 repair.
3. Repeat at **400% browser zoom**. You need not fit the whole workflow above the fold at this magnification. **Pass criterion:** information and controls are reachable and readable, the focused control is visible, no actionable content is hidden under overlapping fixed UI, and the proof can be inspected sequentially. Some intentional two-dimensional table scrolling may be acceptable; unscrollable clipping is not.
4. Return zoom to **100%**. Toggle *Reduce motion* and navigate replay steps: 3 started → refusal → repair requested → awaiting commit → allowed. Verify it starts paused with reduced motion and stage focus is plainly visible using **Tab, Enter, ArrowRight, Home and End**.
5. Check **200% text-only scaling** if supported by your browser/OS, separately from browser zoom. Note whether label wrapping and table values remain understandable. Do not mistake 320px viewport simulation for this check.
6. With **Windows Narrator** (Windows+Ctrl+Enter) or an installed NVDA screen reader: move through page headings, initial and final comparison tables, stage navigation buttons, *Reduce motion* checkbox and the raw receipt link. Verify each control announces an intelligible name, the selected stage is recognizable, table headers/values are associated, and COMMIT REFUSED vs COMMIT ALLOWED remain distinguishable without color. Turn Narrator off with the same key combination.

**Record separately:** browser zoom PASS/FAIL at 200%, 400%; text-only scaling PASS/FAIL/NOT RUN; Narrator/NVDA PASS/FAIL/NOT RUN with exact blocker, browser name and screenshot. Screen reader behavior cannot be declared proven by Chromium's accessibility tree alone.

## 3. Two independent user comprehension reviews

Recruit **two people unfamiliar with the exact interface**, one of whom can be the product owner only if independence is explicitly disclosed; do not present them with the supposed winning design. Show the **same archived incident** under A and C, use comparable viewport conditions, no model calls.

- Reviewer **R1**: A first, then C.
- Reviewer **R2**: C first, then A.
- Do not announce which visual variant TRACE prefers. Use labels **Version X** and **Version Y** if possible, and record actual mapping afterward.
- No coaching about where the answer appears. If they ask, record assistance as friction. No need to store personal names.

Use four concrete tasks **per arm**, record completion seconds (time from viewing to correct answer) and number of mistaken clicks, unexpected scrolls or false claims:

| Task | Correct factual answer | Concern |
| --- | --- | --- |
| T1 — Why was initial revision blocked? | REV01 refused; 3 holds: lead_actor, camera_a, van_1 | First-glance clarity |
| T2 — What changed? | Scene S22 moved from 16:30 to 18:00; Schedule Agent repaired | Decision clarity |
| T3 — Who authorized the final schedule? | Deterministic Constraint Guard; REV02 allowed after zero final conflicts | Authority and trust |
| T4 — Where is the original evidence? | Open original raw receipt; note run is captured Sept 5, not new execution | Evidence provenance |

Score each arm independently on a 1–5 scale for: visual identity specific to film production, information findability, step-state understanding, typography/readability, mobile handling and trust in evidence provenance. Record both *positive* findings and *misreadings*.

### Blank evidence sheet (duplicate for each reviewer/arm)

| Field | Value |
| --- | --- |
| Reviewer pseudonym | R1 / R2 |
| Variant | A / C |
| Tested order | First / Second |
| Device/browser + viewport | |
| T1 time / answer / errors | |
| T2 time / answer / errors | |
| T3 time / answer / errors | |
| T4 time / answer / errors | |
| Domain-native identity 1–5 | |
| Findability 1–5 | |
| Replay comprehension 1–5 | |
| Readability 1–5 | |
| Mobile usability 1–5 | |
| Truth/provenance 1–5 | |
| Confidence/uncertainty, exact words | |
| Keyboard/zoom trouble & screenshots | |
| Preferred interface + why | |

### Exit gates — NOT a vote-only beauty contest

- **BLOCKED:** any missed material conflict/Guard event, inaccurate claims that archive is a fresh live run, inaccessible key controls, unscrollable text at real 200/400% browser zoom, or the inability to find original source evidence.
- **REVIEW:** any disagreement among two reviewers, microcopy confusion, unreadable date wrap or colored-only indicators.
- **Eligible for a product-design promotion proposal:** automated exact-HEAD browser and accessibility checks pass, zoom and Narrator/NVDA manual sessions recorded, both task reviewers finish key tasks accurately without new P1 regressions, and design quality is judged better with specific evidence. This **does not** authorize merging into production without an explicit release decision.
- **Global TRACE design-policy promotion remains BLOCKED:** two hand-authored visual variants with shared original JS/fixture do not prove causal performance improvement from new TRACE governance rules.

## 4. Simple final verdict template

- Current PR #5 HEAD:
- Chromium reflow/AX JSON and screenshots:
- Real 200% zoom: PASS / FAIL / NOT RUN (+ image)
- Real 400% zoom: PASS / FAIL / NOT RUN (+ image)
- Text-only scaling: PASS / FAIL / NOT RUN
- Screen reader: PASS / FAIL / NOT RUN (name/version)
- R1 task times and major confusion:
- R2 task times and major confusion:
- C vs A improvement *observed*:
- Any negative path or evidence integrity issue:
- Decision: **APPROVE_FOR_DESIGN_REVIEW / REPAIR_REQUIRED / INCONCLUSIVE**; production merge and TRACE global policy promotion separately gated.

Never share provider API keys in reports and do not send original browser cookies. Prefer cropped screenshots of public replay.
