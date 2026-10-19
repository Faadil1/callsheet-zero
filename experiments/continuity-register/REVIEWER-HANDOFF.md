# TRACE Callsheet Zero — final A/C human task review handoff

**State:** REVIEW_KIT_SOURCE_READY. No human study outcomes have been collected. This pilot uses one historically captured 2026-09-05 replay. It must not be used to infer live model execution or causality from TRACE policy changes.

## Run once on the owner's Windows computer (Node.js installed)

Use the known local `callsheet-zero` clone plus the isolated `callsheet-zero-uiux-hybrid-c-review` worktree.

1. Fetch the latest `experiment/trace-uiux-hybrid-c-20261018` remote branch and check out its **exact source SHA** on the detached worktree. Ensure working tree is clean; do not overwrite uncommitted files.
2. `node --check experiments/continuity-register/study-server.mjs`
3. `node --check experiments/continuity-register/study-smoke-qa.mjs`
4. Optionally execute `node experiments/continuity-register/study-smoke-qa.mjs` to exercise the questionnaire with **SYNTHETIC_SMOKE_ONLY** answers. This uses local Chromium and creates a synthetic report that **MUST NEVER be treated as participant evidence**.
5. Start the real study using `node experiments/continuity-register/study-server.mjs`; it prints two reviewer-specific URLs. Only these **127.0.0.1** URLs are allowed. **Do not use a Vercel preview** for the questionnaire: the study UI refuses non-local origins.
6. Have two independent people operate the browser (same computer, sequentially, or securely with remote screen-control if you choose). R1 uses its URL; R2 uses its URL. Each completes 8 timed tasks and subjective ratings. R1 sees control A first then candidate C; R2 sees C then A, but the UI presents them anonymously as Version X / Version Y.
7. Each reviewer presses **Télécharger mes réponses** at the end. Expected outputs: `TRACE_Callsheet_UX_R1.json` and `TRACE_Callsheet_UX_R2.json`. Check that each contains `sessions: 2`, each `answers: 4` and a `sourceCommit` corresponding to the worktree.
8. Stop the study server with `Ctrl+C`. Provide the two JSON files, without names, to the review owner; do not upload cookies, browser profiles or credentials.

## What is—and is not—recorded

Collected locally and included only in user-triggered JSON download:
- reviewer pseudonym R1 or R2, true source commit from Git checkout, display/browser information;
- two masked-arm sequences, freeform text answers to four tasks per arm, client-side measured elapsed seconds, reviewer-entered missed-click estimates, whether assistance was needed, inability to locate an answer;
- six 1–5 subjective ratings per arm and a final optional preference.

There is **no automatic upload, external analytics, paid model call or automatic correctness grade**. The Node server is bound to 127.0.0.1 and returns HTTP 503 for all `/api/*` routes. In the iframe, `#runBtn` is additionally force-hidden from both the user and assistive navigation; the survey will refuse to start a task unless this safety check succeeds.

This is NOT a statistical A/B experiment; two people constitute a small formative comprehension review.

## Owner-only adjudication rubric (do not show participants before completion)

Assess each free-text answer for factual correctness, rather than relying on model self-grading:
- T1: REV01 commit refused and three holds `lead_actor`, `camera_a`, `van_1`.
- T2: scene `S22`, change `16:30 → 18:00`, **Schedule Agent** repairing only the affected proposal.
- T3: **Constraint Guard** refused the first proposed revision and allowed REV02 only after all conflicts cleared (zero final conflicts).
- T4: original raw receipt/historical evidence, **2026-09-05** captured run, no new inference.

Flag as MATERIAL_ERROR any statement that the historical replay represents a fresh live agent run, that an agent alone authorized the final commit instead of the Guard, or that hard holds can be ignored. Review assisted answers separately. Record any ambiguity and whether both reviewers found the receipt.

A simple comparison per arm should report factual tasks correct / 8, median time per correct task (not including unresolved/incorrect ones), mistaken clicks and assisted answers; present individual participants, arm/order, exact inputs and contradictions. Never claim statistical significance or general causal TRACE-policy lift from n=2.

## Decision gate

- `PROVEN`: source-pinned previous Chromium visual/replay, text contrast, reflow and AX checks; owner self-reported real zoom 200%, 400%, Narrator success.
- `ACTIVE`: independent R1/R2 comprehension tasks until **actual two exported files** reviewed.
- `BLOCKED`: product release promotion until review outcomes and explicit release approval. TRACE global policy A/B remains independently BLOCKED.

The survey creates a local evidence collection workflow; it does **not** recruit humans or produce their results.