import { createHash, timingSafeEqual } from "node:crypto"

export type RunAuthorization = {
  allowed: boolean
  status: number
  code: string
}

type Env = Record<string, string | undefined>
const MAX_WINDOW_MS = 60 * 60 * 1000
const MIN_TOKEN_BYTES = 32

// Pure, side-effect-free, fail-closed. No model import should occur before this check.
export function authorizeLiveRun(
  method: string | undefined,
  authorization: string | string[] | undefined,
  env: Env,
  now: number = Date.now(),
): RunAuthorization {
  if (method !== "POST") return { allowed: false, status: 405, code: "post_required" }
  if (env.CALLSHEET_LIVE_RUNS_ENABLED !== "true") {
    return { allowed: false, status: 503, code: "live_execution_disabled" }
  }

  const secret = env.CALLSHEET_RUN_OPERATOR_TOKEN
  const expires = Date.parse(env.CALLSHEET_RUN_AUTH_EXPIRES_AT || "")
  // No indefinite authorization. Explicit expiry must be future and <= 1 hour from now.
  if (
    !secret || Buffer.byteLength(secret, "utf8") < MIN_TOKEN_BYTES ||
    !Number.isFinite(expires) || expires <= now || expires - now > MAX_WINDOW_MS
  ) {
    return { allowed: false, status: 503, code: "live_execution_not_armed" }
  }

  if (typeof authorization !== "string" || !authorization.startsWith("Bearer ")) {
    return { allowed: false, status: 401, code: "operator_authorization_required" }
  }
  const presented = authorization.slice(7)
  const lhs = createHash("sha256").update(presented).digest()
  const rhs = createHash("sha256").update(secret).digest()
  if (!timingSafeEqual(lhs, rhs)) {
    return { allowed: false, status: 401, code: "operator_authorization_required" }
  }
  return { allowed: true, status: 200, code: "authorized_operator_run" }
}
