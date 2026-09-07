# Continuity Desk — design QA

Date: 2026-09-07

final result: passed

Scope: selected direction 3, presentation layer and deterministic replay controls. This is local design/build QA, not a production deployment or final TRACE Gate 6.5 promotion.

## Visual truth and evidence

- Selected visual truth: `docs/design/continuity/selected-target.png` (third displayed image, Continuity Desk).
- Browser-rendered implementation: `docs/design/continuity/continuity-final-review.jpg`.
- Normalized full comparison: `docs/design/continuity/continuity-final-review-comparison.jpg`.
- Initial comparison: `docs/design/continuity/continuity-review-comparison.jpg`.
- Mobile capture: `docs/design/continuity/continuity-mobile-actual.jpg`.
- Source image 1487×1058; intended CSS target 1440×1024. Actual browser iframe CSS viewport 1440×1024, scaled to 1226.25×872 for capture. Screenshot includes an external viewport-review header; crop x=68, y=52, width=1226, height=872 removes it. Source is normalized to 1226×872 for side-by-side comparison. No implementation viewport, screenshot, or state was reconstructed by image generation.
- State: completed canonical snapshot (same before/after revision outcome as mock). Snapshot is correctly labeled and not presented as an actively playing or new live execution.
- Additional browser viewports: 1440×900, 1280×720, 390×844 through a same-origin iframe with explicit CSS dimensions. At 1280×720, transport bottom measured 703.703125px, inside first viewport. Mobile and 1440×900 have no horizontal document overflow. Mobile comparison intentionally stacks and brings transport before the tables.

## Comparison history

1. Initial 1440×1024 comparison: P2 headline scale too modest relative to selected target; main interaction sat lower than necessary. At 1280×720 the replay transport ended at 721.7px, outside the viewport. P2 mobile controls were below both revision tables.
2. Fix: stronger headline scale, reduced gap above intro, tighter short-desktop spacing, mobile transport moved before comparison. No new decorative features.
3. Recapture: `continuity-final-review-comparison.jpg`; headline prominence and overall mint/white comparison composition retained. 1280×720 transport now ends at 703.7px. 390×844 capture shows primary CTA, explicit provenance and all replay controls before the first table. No actionable P0/P1/P2 visual findings remain.

## Required fidelity surfaces

- Typography: bold system Arial/Helvetica headline, condensed tracking, monospace operational labels and time values. Headline remains one line on desktop; two lines at 390px. Small annotation density follows target; no cut-off critical values. P3: exact proprietary-looking generated font cannot be established from raster; system typography is an intentional portable approximation.
- Layout: two equal revision columns, central comparison control, prominent change summary, compact evidence rail, three supporting columns. Additional statusline is intentional provenance reinforcement. Short-desktop sizing keeps main evidence in view.
- Colors: mint #ACEED1, evergreen #073D31, white #FCFEFC, semantic refusal #AC263D and safe #096747. Flat color replaces the generated image's incidental texture. No dark canvas or decorative gradients.
- Asset quality: no raster asset required by this UI. Icons are original Phosphor fill SVGs copied from @phosphor-icons/core 2.1.1 with MIT license, not custom approximations. Source comparison image is documentation only, never used as app UI.
- Copy/content: corrected generated 'Live proposal' and date mixing; both columns use captured 2026-09-05 evidence. All three affected initial proposals show HOLD, instead of the mock's misleading OK for agents involved in a shared-resource collision. Only Schedule is repaired. The other proposals are marked KEPT after commit. UTC timestamps come from original canonical events.

Focused evidence: native browser captures of the tables, change statement and transport were inspected in addition to the normalized side-by-side full comparison; these regions are legible in the unscaled 1348×926 capture and 1280×720 viewport. Generated mock text errors are deliberate deviations, not defects to reproduce.

## Primary interactions verified

- Browser: Enter on Replay with reduced-motion selected starts a paused captured replay; no global Enter live binding exists.
- Browser: Refused, Repair requested, REV 02 proposed, Allowed steps; Next transitions; changed-scene highlighting toggles aria-pressed; mode labels and revision number follow state.
- Reduced-motion UI preference checked in browser. OS preference handling and paused-start behavior tested via mocked matchMedia; native browser OS media emulation was not available. No claim of a separate native OS-emulation run.
- Eight automated DOM regression tests: five-stage integrity and zero fetches from replay; reduced-motion; timed completion; no global Enter live request; current-run counts/simulation labeling; no commit decision without commit receipt; error recovery; escaping model-provided markup.
- `npm run typecheck`: PASS.
- Schema check via `node --import tsx scripts/check-schema.ts`: PASS. The equivalent npm tsx CLI encountered this shell's IPC EPERM; loader invocation passed without escalation.
- Canonical proposals, conflicts, timeline, final plan compared to pre-change data: identical. Original `evidence/canonical-run.json`, engine and schema unchanged.
- Console inspected: reported errors originated in the browser extension's metadata sender; no application-source JS error observed in inspected logs.
- No real paid live model execution was triggered. Live and error renderer behavior verified with controlled fixtures. Production Vercel deployment verification remains pending.

## Follow-up polish / limits

P3: optional real screen-recording review under jury video compression, native OS reduced-motion confirmation, and touch-device review. Source image supplies no mobile design, so stacking and transport placement are responsive adaptations. Gate 6.5 production PASS requires a post-deployment audit; do not infer it from this local QA result.
