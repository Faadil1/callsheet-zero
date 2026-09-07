# Adaption Learning Receipt — Product Surface Evidence

Date: 2026-09-07

## Purpose

This evidence note records the addition of a secondary Adaption learning-receipt block to the production CALLSHEET ZERO interface.

The block is intentionally **not** part of the realtime execution path. It exists to surface an already-proved asynchronous integration without weakening the Mozaik + deterministic Constraint Guard architecture.

## Visible product claim

The UI presents:

```text
ADAPTION · LEARNING RECEIPT
Verified repair → preference data
1 verified repair · preference_pairs
chosen + rejected generated
Not in Run live
Constraint Guard remains safety authority
```

## Truth boundary

- `Run live` does not call Adaption.
- Realtime execution remains Mozaik agents + shared state + deterministic Constraint Guard.
- Adaption receives verified repair outcomes asynchronously for preference-data generation.
- The first bounded real Adaption run succeeded with one output row containing `chosen` and `rejected`.
- The generated `rejected` example was also operationally conflict-free, so this project does **not** claim that one sample proves unsafe→safe learning.
- Correct claim: **preference data generated from a verified repair**.

## Deployment

```text
PRODUCT_COMMIT = 65eca2740905e9cabf3f1ffaae6eacb1380b6d4b
CI = PASS_RUN_34082062916
VERCEL_DEPLOYMENT = dpl_6a3Q5psYxePjXdKPH29Se4ukTYdY
PRODUCTION = https://callsheet-zero.vercel.app
PRODUCTION_HTTP = PASS_200
ADAPTION_BLOCK_PRESENT = VERIFIED
REALTIME_DEPENDENCY = FALSE
```

## Source evidence

See `docs/EVIDENCE_ADAPTION_A1.md` for the bounded Adaption run, dataset/run identifiers, output retrieval, and claim-quality caveat.
