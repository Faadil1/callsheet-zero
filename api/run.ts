export default async function handler(req: any, res: any) {
  if (req.method !== "POST" && req.method !== "GET") {
    res.statusCode = 405
    res.setHeader("Allow", "GET, POST")
    return res.end("Method not allowed")
  }

  try {
    const [{ runCallsheetScenario }, { buildAdaptionLearningExample }] = await Promise.all([
      import("../src/engine.js"),
      import("../src/learning.js"),
    ])
    const forceSimulation = req.query?.mode === "simulation" || req.body?.mode === "simulation"
    const result = await runCallsheetScenario({ forceSimulation })
    const learningExample = buildAdaptionLearningExample(result)
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Cache-Control", "no-store")
    return res.status(200).json({ ...result, learningExample })
  } catch (error) {
    console.error("CALLSHEET ZERO run failed", error)
    return res.status(500).json({
      error: "run_failed",
      message: error instanceof Error ? error.message : String(error),
      phase: "runtime_import_or_execution",
    })
  }
}
