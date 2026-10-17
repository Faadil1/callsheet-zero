import { authorizeLiveRun } from "./run-guard.js"

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store")
  res.setHeader("X-Content-Type-Options", "nosniff")
  const decision = authorizeLiveRun(req.method, req.headers?.authorization, process.env)

  if (!decision.allowed) {
    if (decision.status === 405) res.setHeader("Allow", "POST")
    res.setHeader("Content-Type", "application/json")
    return res.status(decision.status).json({ error: decision.code })
  }

  // Do not permit query/body switches to simulation or hidden extra work.
  if (req.query?.mode !== undefined || (req.body && (
    typeof req.body !== "object" || Array.isArray(req.body) ||
    Object.keys(req.body).some((k) => k !== "mode") ||
    (req.body.mode !== undefined && req.body.mode !== "live")
  ))) {
    return res.status(400).json({ error: "unsupported_run_parameters" })
  }

  try {
    // Guard and input validation must happen BEFORE costly provider imports/inference.
    const [{ runCallsheetScenario }, { buildAdaptionLearningExample }] = await Promise.all([
      import("../src/engine.js"),
      import("../src/learning.js"),
    ])
    const result = await runCallsheetScenario()
    const learningExample = buildAdaptionLearningExample(result)
    res.setHeader("Content-Type", "application/json")
    return res.status(200).json({ ...result, learningExample })
  } catch (error) {
    console.error("CALLSHEET ZERO authorized run failed", error)
    return res.status(500).json({
      error: "run_failed",
      phase: "runtime_import_or_execution",
    })
  }
}
