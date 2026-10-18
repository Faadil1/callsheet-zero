# Callsheet Zero — operator-gated live execution (2026-10-17)

**Status: SECURITY PATCH CANDIDATE / NO PAID RUN / NOT PRODUCTION-DEPLOYED.** This changes the default public live-run surface without changing historical canonical receipts or replay. It is not a new TRACE gate and not a claim that the Mozaik runtime was executed during validation.

## Problem and observed state

The October 17 owner-provided read-only `GET /api/health` response was `ok=true`, `anthropicConfigured=true`, `mozaikConfigured=true`, `model=claude-sonnet-4-6`. This proves environment variable presence and HTTP health only, not model calls, current balance, authorization or runtime repair success.

On old main `api/run.ts` accepted GET/POST without a visible authorization check. The public `Run live` UI issued POST to that endpoint; requests could invoke external, potentially billable model services. Vercel deployment protection on preview cannot be assumed to protect the production custom domain. This patch fails closed *before* dynamic provider imports.

## Safeguards implemented

1. **POST-only**: GET or other methods receive HTTP 405 / Allow: POST; no provider import.
2. **Closed by default**: require `CALLSHEET_LIVE_RUNS_ENABLED=true` (exact lower-case string), otherwise HTTP 503 with safe error.
3. **Operator secret**: require server-only `CALLSHEET_RUN_OPERATOR_TOKEN` of at least 32 UTF-8 bytes, transported only as `Authorization: Bearer ...`; digests compared using timing-safe comparison. Never inject token into frontend code, public env, URL, git, logs, prompt or chat.
4. **Temporary authorization**: require ISO date-time `CALLSHEET_RUN_AUTH_EXPIRES_AT`, future and at most 60 minutes from request time; expired/absent/too-distant value denies.
5. **Pinned runtime**: `MOZAIK_MODEL=claude-sonnet-4-6` and both `ANTHROPIC_API_KEY` and `MOZAIK_API_KEY` must be present; other models blocked.
6. **Bounded dispatches per incident**: exactly at most three distinct initial agent `runLoop` dispatches and at most one repair dispatch, with each `maxOutputTokens=1024` already pinned. Duplicates ignored; no app-side multi-request batch.
7. **No simulation bypass through privileged route**: requests containing query-based mode or unsupported body parameters denied; replay uses the existing static canonical evidence and does not invoke models.
8. **Local server**: same authorization check, bound to `127.0.0.1`, not to all network interfaces.
9. **UI honesty**: explicitly labels the button `Operator live`; authorization failure returns a clear locked message, preserving verified replay.

### Critical *limits* of this patch

- **This is NOT a hard dollar cap and not a global one-request guarantee.** Vercel serverless instances have no shared atomic counter here. An authorized operator token can be reused within the short window; app dispatch ceilings are per incident, and upstream provider SDKs might retry internally. There is no global durable rate-limit or atomic one-use token.
- To claim a strict maximum of exactly one paid incident, add a shared, strongly consistent atomic quota/lease store (or Vercel WAF quota verified end-to-end) *before enabling the live flag*. Absent that, require a named human operator, a strong private token, a very short window, **one manual request only**, and revoke the window with a new deployment immediately after.
- Vercel environment changes are often applied to **new deployments**, not instantly to already running instances. Verify the exact deployment/alias and disabled response after revocation. Do not assume editing environment variables revokes currently running invocations.
- If the request times out, the provider may still charge for calls already dispatched; do not retry automatically.
- `status: complete` and `mode: live` alone do not prove three-way concurrency, three exact conflicts or AI-generated repair. Review `concurrencyProof`, event timeline, actual conflicts, and `fallback: true` / `guard.fallback` before declaring LIVE_CORE_LOOP.

## Local/no-paid safety tests

From a disposable checkout on the security branch:

```powershell
npm ci
npm run typecheck
npm run schema:check
npm run test:ui
npm run test:security
```

All of these are meant to run without model credentials or provider inference. Do not run `npm run demo` or invoke `/api/run` in a health test.

## Safe deployment sequence

1. Review branch diff and local tests; deploy **preview** with `CALLSHEET_LIVE_RUNS_ENABLED` unset/false. Confirm public screenshot/replay and that a **POST with no Authorization** gives 503 or 401 **without model calls**. Do not put access tokens in browser requests.
2. Production merge/deploy only after exact-head local tests pass and release is explicitly accepted. Confirm production `/api/health` and verify API now denies unauthenticated GET/POST. Public user-triggered live run is temporarily replaced by operator-gated access.
3. To conduct one paid test: define an agreed monetary exposure allowance externally at Anthropic/Mozaik, check the live credits/billing, prepare a **server-side sensitive** token and short expiration, set the live flag, deploy into a reviewed environment and authenticate via a single PowerShell `Invoke-RestMethod` POST. **Never send us or paste the token into chat.**
4. Store redacted result as a scoped receipt (HTTP status, mode, provider/model, inference starts/completions, collision resources, repair event, final guard decision and fallback flags). Exclude API keys, prompts, customer data or raw Authorization.
5. Immediately turn off the live flag, remove/rotate the operator token, redeploy and confirm GET/POST deny. Keep static replay and machine-readable historical receipt unchanged.
6. Update TRACE PR #36 as OWNER_REPORTED_LIVE only after source-bound execution receipt audit; keep multi-agent A/B blocked until two independent equal-backend executions under pinned dual TRACE treatments.

## Evidence boundaries

- `HTTP_HEALTH_OK`: owner observed.
- `PREVIEW_SECURITY_TEST`: not yet verified in this repo at this candidate HEAD.
- `LOCAL_TESTS`: not yet reported by owner for this branch.
- `LIVE`: **NOT_EXECUTED** this run.
- `PAID_BUDGET_CAP`: **NOT_ENFORCED** globally.
- `PRODUCTION_HARDENING`: **NOT_DEPLOYED** until a reviewed merge/release.

### Rollback

Return to the previous known good Vercel production deployment only if that release is accepted as safe; **the old deployment reopens the unprotected /api/run endpoint**. A secure rollback requires an external access-control shield or another fail-closed patch, not simply restoring the prior code.
