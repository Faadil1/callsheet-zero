import type { Proposal, ScenarioResult } from "./engine.js"

export interface AdaptionLearningExample {
  prompt: string
  completion: string
  context: string
  metadata: string
}

function proposalFromTimeline(result: ScenarioResult, role: Proposal["agentRole"], version: Proposal["version"]): Proposal | undefined {
  for (const item of result.timeline) {
    if (item.kind !== "proposal" && item.kind !== "repair.proposal") continue
    const proposal = item.data as Proposal | undefined
    if (proposal?.agentRole === role && proposal.version === version) return proposal
  }
  return undefined
}

function proposalSummary(proposal: Proposal | undefined): string {
  if (!proposal) return "not captured"
  return `${proposal.sceneId} @ ${proposal.start} / ${proposal.location} / resources=${proposal.resources.join(",")}`
}

export function buildAdaptionLearningExample(result: ScenarioResult): AdaptionLearningExample {
  const initialSchedule = proposalFromTimeline(result, "schedule", 1)
  const repairedSchedule = result.finalPlan.find((proposal) => proposal.agentRole === "schedule" && proposal.version === 2)
  const peers = result.finalPlan.filter((proposal) => proposal.agentRole !== "schedule")

  const prompt = [
    "You are the Schedule Agent in CALLSHEET ZERO.",
    "Repair the production schedule after the disruption while respecting every scarce-resource constraint discovered by the deterministic Constraint Guard.",
    "Do not wait for peer agents. Use the latest shared state and produce the smallest safe repair.",
    "",
    `Disruption: ${result.scenario.shocks.join(" | ")}`,
    "Baseline:",
    ...result.scenario.baseline.map(
      (scene) => `- ${scene.sceneId} ${scene.start} ${scene.location} [${scene.resources.join(", ")}]`,
    ),
    "",
    `Initial Schedule Agent proposal: ${proposalSummary(initialSchedule)}`,
    "Constraint Guard findings:",
    ...(result.conflicts.length
      ? result.conflicts.map(
          (conflict) => `- ${conflict.resource}: ${conflict.leftRole} vs ${conflict.rightRole} (${conflict.overlap})`,
        )
      : ["- no conflicts captured"]),
    "",
    "Return a repaired Schedule Agent proposal that removes every named conflict while preserving production throughput.",
  ].join("\n")

  const completion = repairedSchedule
    ? JSON.stringify({
        agentRole: repairedSchedule.agentRole,
        version: repairedSchedule.version,
        sceneId: repairedSchedule.sceneId,
        action: repairedSchedule.action,
        start: repairedSchedule.start,
        durationMinutes: repairedSchedule.durationMinutes,
        location: repairedSchedule.location,
        resources: repairedSchedule.resources,
        confidence: repairedSchedule.confidence,
        rationale: repairedSchedule.rationale,
      })
    : JSON.stringify({
        status: "no_repair_example",
        reason: "This run did not capture a version-2 Schedule Agent repair.",
      })

  const context = JSON.stringify({
    peerProposals: peers.map((proposal) => ({
      agentRole: proposal.agentRole,
      version: proposal.version,
      sceneId: proposal.sceneId,
      start: proposal.start,
      durationMinutes: proposal.durationMinutes,
      location: proposal.location,
      resources: proposal.resources,
    })),
    concurrencyProof: result.concurrencyProof,
    guardConflictCount: result.conflicts.length,
  })

  const metadata = JSON.stringify({
    source: "callsheet-zero",
    mode: result.mode,
    model: result.model,
    status: result.status,
    learningObjective: "preference_learning_from_constraint_repairs",
    trainingType: "preference_pairs",
    repairCaptured: Boolean(repairedSchedule),
    deterministicFallbackUsed: result.note?.toLowerCase().includes("fallback") ?? false,
  })

  return { prompt, completion, context, metadata }
}

export function toAdaptionJsonl(example: AdaptionLearningExample): string {
  return `${JSON.stringify(example)}\n`
}
