import test from "node:test"
import assert from "node:assert/strict"
import { authorizeLiveRun } from "../api/run-guard.js"
import { InferenceDispatchBudget } from "../src/inference-budget.js"

const clock = Date.parse("2026-10-17T17:00:00Z")
const token = "local-test-not-a-real-secret-" + "a".repeat(40)
const env = {
  CALLSHEET_LIVE_RUNS_ENABLED: "true",
  MOZAIK_MODEL: "claude-sonnet-4-6",
  ANTHROPIC_API_KEY: "fake-unit-test-credential",
  MOZAIK_API_KEY: "fake-unit-test-credential",
  CALLSHEET_RUN_OPERATOR_TOKEN: token,
  CALLSHEET_RUN_AUTH_EXPIRES_AT: new Date(clock + 3 * 60 * 1000).toISOString(),
}

test("default is closed and does not import model machinery", () => {
  const result = authorizeLiveRun("POST", undefined, {}, clock)
  assert.deepEqual(result, { allowed: false, status: 503, code: "live_execution_disabled" })
})

test("no GET execution even with valid token", () => {
  assert.equal(authorizeLiveRun("GET", "Bearer " + token, env, clock).status, 405)
})

test("invalid and missing bearer authorizations refused", () => {
  assert.equal(authorizeLiveRun("POST", undefined, env, clock).status, 401)
  assert.equal(authorizeLiveRun("POST", ["Bearer " + token], env, clock).status, 401)
  assert.equal(authorizeLiveRun("POST", "Bearer wrong", env, clock).status, 401)
  assert.equal(authorizeLiveRun("POST", token, env, clock).status, 401)
})

test("valid short-lived operator credential authorizes one HTTP request, not a global budget", () => {
  const result = authorizeLiveRun("POST", "Bearer " + token, env, clock)
  assert.equal(result.allowed, true)
  assert.equal(result.status, 200)
})

test("unapproved model or missing provider runtime is blocked", () => {
  for (const patch of [
    { MOZAIK_MODEL: "other-model" },
    { ANTHROPIC_API_KEY: undefined },
    { MOZAIK_API_KEY: undefined },
  ]) {
    assert.equal(authorizeLiveRun("POST", "Bearer " + token, { ...env, ...patch }, clock).status, 503)
  }
})

test("missing or too short configured operator secret fails closed", () => {
  const short = { ...env, CALLSHEET_RUN_OPERATOR_TOKEN: "12345" }
  const absent = { ...env, CALLSHEET_RUN_OPERATOR_TOKEN: undefined }
  assert.equal(authorizeLiveRun("POST", "Bearer " + token, short, clock).status, 503)
  assert.equal(authorizeLiveRun("POST", "Bearer " + token, absent, clock).status, 503)
})

test("expired, missing and overlong execution windows fail closed", () => {
  for (const expiry of ["", "bogus", new Date(clock - 1).toISOString(), new Date(clock + 7200000).toISOString()]) {
    assert.equal(authorizeLiveRun("POST", "Bearer " + token, {
      ...env, CALLSHEET_RUN_AUTH_EXPIRES_AT: expiry,
    }, clock).status, 503)
  }
})

test("explicit enabled flag must exactly equal true", () => {
  for (const enabled of ["1", "True", "false", undefined]) {
    assert.equal(authorizeLiveRun("POST", "Bearer " + token, {
      ...env, CALLSHEET_LIVE_RUNS_ENABLED: enabled,
    }, clock).status, 503)
  }
})

test("max three initial + one repair dispatches", () => {
  const budget = new InferenceDispatchBudget()
  for (const id of ["schedule", "talent", "logistics"]) assert.equal(budget.claimInitial(id), true)
  assert.equal(budget.claimInitial("schedule"), false)
  assert.equal(budget.claimInitial("unknown-fourth"), false)
  assert.equal(budget.claimRepair("schedule"), true)
  assert.equal(budget.claimRepair("schedule"), false)
  assert.equal(budget.claimRepair("talent"), false)
  assert.equal(budget.dispatchCount, 4)
})

test("empty agent IDs cannot consume a dispatch", () => {
  const budget = new InferenceDispatchBudget()
  assert.equal(budget.claimInitial(""), false)
  assert.equal(budget.claimRepair(""), false)
  assert.equal(budget.dispatchCount, 0)
})
