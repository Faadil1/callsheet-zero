# G3G — Human browser UI smoke test

Date: 2026-09-06

A human browser run was recorded against the stable production domain:

`https://callsheet-zero.vercel.app`

## Observed behavior

- The production page loaded correctly in a desktop browser.
- The disruption control was exercised and completed without a visible client error.
- The button returned to `Run again`, proving the browser request/response cycle completed.
- Runtime receipts rendered in-product.
- The concurrency panel rendered `PROVED`.
- The final committed plan rendered all three agent cards.
- The Constraint Guard rendered a zero-conflict result for this particular live run.
- The Schedule Agent independently chose S22 at 18:00 on its first proposal, so this run committed directly and did not exercise `repair.requested` / Schedule Agent v2.

## Interpretation

This recording is sufficient to close the browser/UI smoke gate: the stable Vercel deployment is interactive and renders a completed live agent run end-to-end.

It is **not** the preferred final demo take because this stochastic live run converged without a conflict. The canonical repair evidence remains the separately verified production run `dpl_97NVNrioU1r2FEjMWhQA83ciTcvR`, which produced three conflicts, a targeted repair event, and Schedule Agent version 2 at 18:00.

## Gate

```text
G3G_HUMAN_UI_CLICK_SMOKE = PASS
G3G_BROWSER_INTERACTION = PASS
G3G_RUNTIME_RECEIPTS_RENDERED = PASS
G3G_CONCURRENCY_PROOF_RENDERED = PASS
G3G_FINAL_COMMITTED_PLAN_RENDERED = PASS
G3G_THIS_RUN_CONFLICT_COUNT = 0
G3G_THIS_RUN_REPAIR_EVENT = NOT_TRIGGERED
G3G_USABLE_AS_FINAL_CANONICAL_DEMO = NO
NEXT_EXACT_GATE = G4_CAPTURE_CANONICAL_CONFLICT_REPAIR_DEMO
```
