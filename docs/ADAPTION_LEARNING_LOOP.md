# Adaption Learning Loop

CALLSHEET ZERO keeps **Adaption Labs out of the real-time repair path**. Mozaik remains responsible for concurrent agent execution and the deterministic Constraint Guard remains responsible for hard operational invariants. Adaption is used asynchronously after a completed run to turn repair outcomes into model-ready learning data.

## Why this layer exists

A completed CALLSHEET ZERO run contains a useful preference signal:

- a locally sensible first proposal,
- the exact conflicts detected by the deterministic guard,
- the peer proposals that created the live shared state,
- and a repaired proposal that passed the final constraint check.

That makes every successful repair a candidate training example for future scheduling agents.

```text
REAL-TIME PATH
shock → three Mozaik agents → shared-state collisions → Constraint Guard → targeted repair → commit

ASYNC LEARNING PATH
completed run → learning example → Adaption Adaptive Data → preference pairs → future training/evaluation corpus
```

Adaption is optional. If its API is unavailable or no credits are configured, the live product still works exactly as before.

## Learning example emitted by the API

`POST /api/run` now returns the normal scenario result plus a `learningExample` object with four columns:

- `prompt` — disruption, baseline, initial Schedule Agent proposal, and exact guard conflicts,
- `completion` — the accepted version-2 Schedule Agent repair,
- `context` — peer proposals and concurrency receipts,
- `metadata` — model, mode, learning objective, and repair/fallback flags.

These columns map directly into Adaption Adaptive Data as:

```json
{
  "column_mapping": {
    "prompt": "prompt",
    "completion": "completion",
    "context": ["context", "metadata"]
  },
  "training_type": "preference_pairs"
}
```

The Adaption pipeline then generates chosen/rejected preference-pair fields from the mapped source data.

## Local commands

Export one learning example without touching the Adaption API:

```bash
npm run adaption:export
```

Use deterministic simulation instead of a live provider call:

```bash
npm run adaption:export -- --simulation
```

Upload the generated JSONL and request an estimate only:

```bash
npm run adaption:estimate
```

This requires `ADAPTION_API_KEY`. The script creates a JSONL dataset, waits for preprocessing, and sends `estimate=true`. No Adaptive Data run is started.

## Paid run guard

A paid run is deliberately fail-closed. It requires both `--run` and the explicit `--confirm-spend` flag, and the estimate must not exceed `ADAPTION_MAX_CREDITS`.

```bash
npm run adaption:run -- --confirm-spend
```

Default safety limits:

```env
ADAPTION_MAX_ROWS=1
ADAPTION_MAX_CREDITS=10
```

If the estimate exceeds the configured budget, the script aborts before starting the paid run.

## Adaptive Data configuration

The first bounded integration uses:

- `training_type = preference_pairs`,
- `max_rows = 1` by default,
- prompt/completion/context mapping,
- prompt deduplication,
- no prompt rephrasing for the first evidence run,
- no reasoning-trace generation,
- a Blueprint requiring hard resource constraints, minimal safe schedule mutation, and no invented availability.

The goal of the first run is not to train a production model. It is to prove the **repair → preference-data** loop with a small, inspectable and budget-capped artifact.

## Security

`ADAPTION_API_KEY` stays in `.env` or the caller environment and is never written to the repository or returned by the product API. Generated local artifacts live under `artifacts/`, which is gitignored.
