# Continuity Desk — selected direction 3

The jury could miss a 3.65-second replay and see REV 01 or three apparent current holds after a REV 02 commit. This rework makes the before/after revision comparison the primary experience and gives the evaluator control over each evidence step.

## Changes

Mint and evergreen visual system; explicit canonical snapshot on arrival; five clickable evidence steps; 3.2 seconds per replay step with pause/previous/next; reduced-motion starts paused; unchanged-vs-repaired comparison; dynamic revision and commit labels; historical holds separated from final conflicts; UTC receipts; current live runs never inherit canonical counts or dates; failed runs clear old success.

The selected raster mock's incorrect live labels, inference times and initial OK statuses were corrected from canonical data. UI-only static module files are served from `/ui/`; existing API and engine remain in place. Local dev server now accepts the preview `--port` flag and serves JSON with the appropriate type.

## References actually used for this implementation

- User-selected third visual concept: `design/continuity/selected-target.png`.
- Original CALLSHEET ZERO source and verified canonical evidence.
- Prior source-backed audit: https://github.com/Faadil1/callsheet-zero/blob/main/docs/TRACE_GATE_6_5_REFERENCE_AUDIT.md
- Emil Kowalski, You Don't Need Animations: https://emilkowal.ski/ui/you-dont-need-animations — purposeful short transitions, instant keyboard response; replay reading time kept independent from transition time.
- Phosphor Icons: https://phosphoricons.com/ — supplied fill icons for the actor, transport, schedule and playback; MIT license in `ui/PHOSPHOR-LICENSE`.

No other reference library was installed. SwagUI remains unpromoted and unused. React/animation frameworks are unnecessary for this vanilla frontend.

## Validation and boundaries

See `../design-qa.md` and `tests/continuity.test.mjs`. Run `npm ci`, `npm run typecheck`, `npm run schema:check`, `npm run test:ui`. CI adds the UI regression suite. Canonical receipt and engine semantics unchanged. Local browser review completed; production audit and Gate 6.5 promotion remain pending. No submission or production deployment is part of this branch.
