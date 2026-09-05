import {
  Agent,
  RuntimeState,
  SemanticEvent,
  SituationContext,
  SituationHandler,
  SituationProcessor,
  SituationSpecification,
  createAgent,
  createHuman,
  defineRuntime,
  type InferenceInput,
  type ModelMessageItem,
} from "@mozaik-ai/core"
import { proposalFormat } from "./schema.js"

export type AgentRole = "schedule" | "talent" | "logistics"

export interface Proposal {
  agentRole: AgentRole
  version: 1 | 2
  sceneId: string
  action: string
  start: string
  durationMinutes: number
  location: string
  resources: string[]
  confidence: number
  rationale: string
  producerId?: string
  producerName?: string
  fallback?: boolean
}

export interface Conflict {
  leftRole: AgentRole
  rightRole: AgentRole
  resource: string
  overlap: string
}

export interface TimelineItem {
  at: string
  kind: string
  label: string
  producerId?: string
  producerName?: string
  data?: unknown
}

export interface Scenario {
  title: string
  shocks: string[]
  baseline: Array<{
    sceneId: string
    start: string
    durationMinutes: number
    location: string
    resources: string[]
  }>
}

export interface ScenarioResult {
  mode: "live" | "simulation"
  status: "complete" | "timeout" | "error"
  model: string
  scenario: Scenario
  proposals: Proposal[]
  conflicts: Conflict[]
  timeline: TimelineItem[]
  concurrencyProof: {
    agentInferenceStarts: Record<string, string>
    agentInferenceCompletions: Record<string, string>
    allStartedBeforeFirstCompleted: boolean
    explanation: string
  }
  finalPlan: Proposal[]
  note?: string
}

const MAX_OUTPUT_TOKENS = 1024

const scenario: Scenario = {
  title: "Rain + lead actor delay",
  shocks: ["Exterior location hit by rain", "Lead actor delayed by 90 minutes"],
  baseline: [
    {
      sceneId: "S14",
      start: "14:00",
      durationMinutes: 60,
      location: "Courtyard",
      resources: ["lead_actor", "camera_a", "van_1"],
    },
    {
      sceneId: "S18",
      start: "15:15",
      durationMinutes: 45,
      location: "Warehouse",
      resources: ["support_cast", "camera_b", "van_1"],
    },
    {
      sceneId: "S22",
      start: "16:30",
      durationMinutes: 60,
      location: "Stage B",
      resources: ["lead_actor", "camera_a"],
    },
  ],
}

class CallsheetState extends RuntimeState {
  proposals = new Map<AgentRole, Proposal>()
  timeline: TimelineItem[] = []
  conflicts: Conflict[] = []
  status: "running" | "repairing" | "complete" = "running"
  repairRequested = false
  fallbackUsed = false
  inferenceStarts = new Map<string, string>()
  inferenceCompletions = new Map<string, string>()

  constructor(public readonly scenario: Scenario) {
    super()
  }
}

function now(): string {
  return new Date().toISOString()
}

function toMinutes(value: string): number {
  const [h, m] = value.split(":").map(Number)
  return h * 60 + m
}

function overlap(a: Proposal, b: Proposal): boolean {
  const aStart = toMinutes(a.start)
  const bStart = toMinutes(b.start)
  return aStart < bStart + b.durationMinutes && bStart < aStart + a.durationMinutes
}

function findConflicts(proposals: Proposal[]): Conflict[] {
  const conflicts: Conflict[] = []
  for (let i = 0; i < proposals.length; i++) {
    for (let j = i + 1; j < proposals.length; j++) {
      const left = proposals[i]
      const right = proposals[j]
      if (!overlap(left, right)) continue
      const shared = left.resources.filter((resource) => right.resources.includes(resource))
      for (const resource of shared) {
        conflicts.push({
          leftRole: left.agentRole,
          rightRole: right.agentRole,
          resource,
          overlap: `${left.start} ↔ ${right.start}`,
        })
      }
    }
  }
  return conflicts
}

function answerText(payload: unknown): string {
  const answer = (payload as { answer?: ModelMessageItem | string } | undefined)?.answer
  if (typeof answer === "string") return answer
  const content = (answer as any)?.content
  if (typeof content === "string") return content
  if (typeof content?.text === "string") return content.text
  return JSON.stringify(answer ?? payload)
}

function parseProposal(text: string, producerName?: string): Proposal | null {
  try {
    const cleaned = text
      .replace(/^```(?:json)?\s*/i, "")
      .replace(/\s*```$/i, "")
      .trim()
    const parsed = JSON.parse(cleaned) as Proposal
    if (!parsed.agentRole || !parsed.sceneId || !parsed.start || !Array.isArray(parsed.resources)) return null
    return { ...parsed, producerName }
  } catch {
    const match = text.match(/\{[\s\S]*\}/)
    if (!match) return null
    try {
      const parsed = JSON.parse(match[0]) as Proposal
      return { ...parsed, producerName }
    } catch {
      return null
    }
  }
}

function deterministicProposal(role: AgentRole, version: 1 | 2): Proposal {
  if (role === "schedule") {
    return version === 1
      ? {
          agentRole: "schedule",
          version: 1,
          sceneId: "S22",
          action: "Protect the lead scene by moving S22 into the first dry stage slot.",
          start: "16:30",
          durationMinutes: 60,
          location: "Stage B",
          resources: ["lead_actor", "camera_a", "van_1"],
          confidence: 0.87,
          rationale: "Preserves the highest-value lead scene after the rain shock.",
          fallback: true,
        }
      : {
          agentRole: "schedule",
          version: 2,
          sceneId: "S22",
          action: "Move S22 to the first conflict-free evening slot.",
          start: "18:00",
          durationMinutes: 60,
          location: "Stage B",
          resources: ["lead_actor", "camera_a", "van_1"],
          confidence: 0.91,
          rationale: "Clears both the lead actor and vehicle collision while keeping the stage plan intact.",
          fallback: true,
        }
  }

  if (role === "talent") {
    return {
      agentRole: "talent",
      version,
      sceneId: "S14",
      action: "Convert S14 to an indoor pickup as soon as the lead arrives.",
      start: "16:30",
      durationMinutes: 45,
      location: "Stage A",
      resources: ["lead_actor", "camera_a"],
      confidence: 0.84,
      rationale: "Uses the lead actor immediately on arrival and avoids the wet exterior.",
      fallback: true,
    }
  }

  return {
    agentRole: "logistics",
    version,
    sceneId: "S18",
    action: "Pull S18 into the weather-safe warehouse window and reserve transport.",
    start: "16:30",
    durationMinutes: 45,
    location: "Warehouse",
    resources: ["support_cast", "camera_b", "van_1"],
    confidence: 0.82,
    rationale: "Keeps the crew productive while protecting gear from rain.",
    fallback: true,
  }
}

function roleInstruction(role: AgentRole): string {
  const shared = `
You are one autonomous production-operations agent inside CALLSHEET ZERO.
You see the same disruption as peer agents but optimize only your role. Do not coordinate by waiting for peers.
Return only the structured proposal requested by the runtime. Times are local 24-hour HH:MM.
The scarce resources are lead_actor, camera_a, camera_b, van_1, support_cast.
`

  if (role === "schedule") {
    return `${shared}
ROLE: Schedule Agent. Optimize scene order and throughput.
For the first proposal, your strongest local preference is S22 at 16:30 on Stage B, using lead_actor, camera_a, and van_1.
If you receive a repair request because that collides with peers, produce version 2 and move S22 to 18:00 unless the repair message gives a better conflict-free option.`
  }

  if (role === "talent") {
    return `${shared}
ROLE: Talent Agent. Optimize cast availability and continuity.
For the first proposal, your strongest local preference is S14 at 16:30 on Stage A, using lead_actor and camera_a.
On repair, preserve cast feasibility while avoiding every conflict named in the repair request.`
  }

  return `${shared}
ROLE: Logistics Agent. Optimize locations, transport, and equipment.
For the first proposal, your strongest local preference is S18 at 16:30 in the Warehouse, using support_cast, camera_b, and van_1.
On repair, preserve weather safety while avoiding every conflict named in the repair request.`
}

function initialMessage(): string {
  return `DISRUPTION EVENT\n${scenario.shocks.map((s) => `- ${s}`).join("\n")}\n\nCurrent call sheet:\n${scenario.baseline
    .map((s) => `${s.sceneId} ${s.start} ${s.location} [${s.resources.join(", ")}]`)
    .join("\n")}\n\nProduce version 1 of your best local repair now. Work independently; do not wait for other agents.`
}

function hasCredentialFor(model: string): boolean {
  if (model.startsWith("claude")) return Boolean(process.env.ANTHROPIC_API_KEY)
  if (model.startsWith("gemini")) return Boolean(process.env.GEMINI_API_KEY)
  return Boolean(process.env.OPENAI_API_KEY)
}

function simulationResult(model: string, note: string): ScenarioResult {
  const base = new Date()
  const ts = (deltaMs: number) => new Date(base.getTime() + deltaMs).toISOString()
  const p1 = deterministicProposal("schedule", 1)
  const p2 = deterministicProposal("talent", 1)
  const p3 = deterministicProposal("logistics", 1)
  const initial = [p1, p2, p3]
  const conflicts = findConflicts(initial)
  const repaired = deterministicProposal("schedule", 2)
  const finalPlan = [repaired, p2, p3]

  return {
    mode: "simulation",
    status: "complete",
    model,
    scenario,
    proposals: finalPlan,
    conflicts,
    timeline: [
      { at: ts(0), kind: "run", label: "Disruption injected into shared runtime" },
      { at: ts(40), kind: "inference.started", label: "Schedule Agent started" },
      { at: ts(55), kind: "inference.started", label: "Talent Agent started" },
      { at: ts(65), kind: "inference.started", label: "Logistics Agent started" },
      { at: ts(880), kind: "model.answer", label: "Talent proposal committed" },
      { at: ts(920), kind: "model.answer", label: "Schedule proposal committed" },
      { at: ts(970), kind: "model.answer", label: "Logistics proposal committed" },
      { at: ts(980), kind: "conflict", label: `Constraint Guard found ${conflicts.length} shared-resource conflicts`, data: conflicts },
      { at: ts(995), kind: "repair.requested", label: "Schedule Agent asked to repair against live shared state" },
      { at: ts(1030), kind: "inference.started", label: "Schedule Agent repair loop started" },
      { at: ts(1710), kind: "model.answer", label: "Schedule Agent returned version 2" },
      { at: ts(1720), kind: "commit", label: "Conflict-free call sheet committed" },
    ],
    concurrencyProof: {
      agentInferenceStarts: {
        "Schedule Agent": ts(40),
        "Talent Agent": ts(55),
        "Logistics Agent": ts(65),
      },
      agentInferenceCompletions: {
        "Talent Agent": ts(880),
        "Schedule Agent": ts(920),
        "Logistics Agent": ts(970),
      },
      allStartedBeforeFirstCompleted: true,
      explanation: "Simulation preview only. Add a provider API key to replace this with Mozaik inference event timestamps.",
    },
    finalPlan,
    note,
  }
}

export async function runCallsheetScenario(options: { forceSimulation?: boolean } = {}): Promise<ScenarioResult> {
  const model = process.env.MOZAIK_MODEL || "gpt-5.4"
  if (options.forceSimulation || !hasCredentialFor(model)) {
    return simulationResult(
      model,
      "No matching model credential detected; returning the deterministic UI/demo preview. The live path uses the same conflict logic with real Mozaik agents.",
    )
  }

  const { initializeRuntime, resolveParticipant, join, sendMessage, sendEvent, runLoop } = defineRuntime<CallsheetState>()

  const state = new CallsheetState(scenario)
  initializeRuntime({ state })

  class InitialMessageSpec extends SituationSpecification {
    isSatisfiedBy({ event, participant }: SituationContext): boolean {
      return event.type === "message.sent" && event.producerId !== participant.getId()
    }
  }

  class RepairSpec extends SituationSpecification {
    isSatisfiedBy({ event, participant }: SituationContext): boolean {
      if (event.type !== "repair.requested") return false
      const payload = event.payload as { targetAgentId?: string }
      return payload.targetAgentId === participant.getId()
    }
  }

  class InitialProcessor implements SituationProcessor {
    apply({ event, participant }: SituationContext): void {
      if (!(participant instanceof Agent)) return
      const { message } = event.payload as { message: string }
      const inferenceInput: InferenceInput = {
        model,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        context: participant.getMemory().getContext(),
        tools: participant.getTools(),
        structuredOutput: proposalFormat,
      }
      runLoop(participant.getId(), message, inferenceInput)
    }
  }

  class RepairProcessor implements SituationProcessor {
    apply({ event, participant }: SituationContext): void {
      if (!(participant instanceof Agent)) return
      const payload = event.payload as { message: string }
      const inferenceInput: InferenceInput = {
        model,
        maxOutputTokens: MAX_OUTPUT_TOKENS,
        context: participant.getMemory().getContext(),
        tools: participant.getTools(),
        structuredOutput: proposalFormat,
      }
      runLoop(participant.getId(), payload.message, inferenceInput)
    }
  }

  const initialHandler: SituationHandler = {
    specification: new InitialMessageSpec(),
    processor: new InitialProcessor(),
  }
  const repairHandler: SituationHandler = {
    specification: new RepairSpec(),
    processor: new RepairProcessor(),
  }

  const agents = (["schedule", "talent", "logistics"] as AgentRole[]).map((role) =>
    createAgent({
      name: `${role[0].toUpperCase()}${role.slice(1)} Agent`,
      capabilities: ["inference", `${role}-repair`],
      instruction: roleInstruction(role),
      tools: [],
      handlers: [initialHandler, repairHandler],
    }),
  )

  const user = createHuman({ name: "Production Controller", capabilities: ["scenario-input"], handlers: [] })

  class InterestingEventSpec extends SituationSpecification {
    isSatisfiedBy({ event }: SituationContext): boolean {
      return ["inference.started", "inference.completed", "model.answer", "interception.started", "interception.finished"].includes(event.type)
    }
  }

  class TelemetryProcessor implements SituationProcessor {
    apply({ event }: SituationContext): void {
      const participant = resolveParticipant(event.producerId)
      const producerName = participant?.getManifest().name || event.producerId
      state.timeline.push({
        at: event.occurredAt.toISOString(),
        kind: event.type,
        label: `${producerName}: ${event.type}`,
        producerId: event.producerId,
        producerName,
      })
      if (event.type === "inference.started" && !state.inferenceStarts.has(producerName)) {
        state.inferenceStarts.set(producerName, event.occurredAt.toISOString())
      }
      if (event.type === "inference.completed" && !state.inferenceCompletions.has(producerName)) {
        state.inferenceCompletions.set(producerName, event.occurredAt.toISOString())
      }
    }
  }

  class ModelAnswerSpec extends SituationSpecification {
    isSatisfiedBy({ event }: SituationContext): boolean {
      return event.type === "model.answer"
    }
  }

  let guard: ReturnType<typeof createHuman>

  class GuardProcessor implements SituationProcessor {
    apply({ event }: SituationContext): void {
      const producer = resolveParticipant(event.producerId)
      if (!producer || !(producer instanceof Agent)) return
      const producerName = producer.getManifest().name
      let proposal = parseProposal(answerText(event.payload), producerName)

      const roleFromName = producerName.toLowerCase().split(" ")[0] as AgentRole
      if (!proposal) {
        const version = state.repairRequested && roleFromName === "schedule" ? 2 : 1
        proposal = deterministicProposal(roleFromName, version as 1 | 2)
        proposal.producerName = producerName
        state.timeline.push({ at: now(), kind: "parse.recovered", label: `${producerName}: structured answer recovery used` })
      }

      proposal.producerId = event.producerId
      proposal.producerName = producerName
      state.proposals.set(proposal.agentRole, proposal)
      state.timeline.push({
        at: now(),
        kind: proposal.version === 1 ? "proposal" : "repair.proposal",
        label: `${producerName}: v${proposal.version} ${proposal.sceneId} @ ${proposal.start}`,
        producerId: event.producerId,
        producerName,
        data: proposal,
      })

      const proposals = [...state.proposals.values()]
      if (proposals.length < 3) return

      const conflicts = findConflicts(proposals)

      if (conflicts.length === 0) {
        state.status = "complete"
        state.timeline.push({ at: now(), kind: "commit", label: "Constraint Guard committed a conflict-free call sheet" })
        return
      }

      if (!state.repairRequested) {
        state.conflicts = conflicts
        state.repairRequested = true
        state.status = "repairing"
        state.timeline.push({ at: now(), kind: "conflict", label: `Constraint Guard detected ${conflicts.length} conflicts`, data: conflicts })

        const scheduleAgent = agents.find((agent) => agent.getManifest().name === "Schedule Agent") || agents[0]
        const message = `REPAIR REQUEST. Your version 1 conflicts with live peer proposals:\n${conflicts
          .map((c) => `- ${c.resource}: ${c.leftRole} vs ${c.rightRole} at ${c.overlap}`)
          .join("\n")}\n\nThe current shared state now contains all three proposals. Produce version 2 that removes every named conflict. Prefer S22 at 18:00 on Stage B if feasible. Return the required structured proposal.`

        state.timeline.push({
          at: now(),
          kind: "repair.requested",
          label: "Constraint Guard requested an event-driven repair from Schedule Agent",
        })
        sendEvent(
          SemanticEvent.create("repair.requested", guard.getId(), { targetAgentId: scheduleAgent.getId(), message }),
          guard.getId(),
        )
        return
      }

      const schedule = state.proposals.get("schedule")
      if (schedule?.version === 2) {
        const repairedConflicts = findConflicts([...state.proposals.values()])
        if (repairedConflicts.length === 0) {
          state.status = "complete"
          state.timeline.push({ at: now(), kind: "commit", label: "Constraint Guard committed the repaired call sheet" })
          return
        }

        state.conflicts = repairedConflicts
        const fallback = deterministicProposal("schedule", 2)
        fallback.producerName = "Constraint Guard fallback"
        state.proposals.set("schedule", fallback)
        state.fallbackUsed = true
        state.status = "complete"
        state.timeline.push({
          at: now(),
          kind: "guard.fallback",
          label: "Repair still conflicted; deterministic invariant guard applied the safe 18:00 slot",
        })
        state.timeline.push({ at: now(), kind: "commit", label: "Constraint Guard committed a conflict-free fallback" })
      }
    }
  }

  const telemetry: SituationHandler = {
    specification: new InterestingEventSpec(),
    processor: new TelemetryProcessor(),
  }
  const guardHandler: SituationHandler = {
    specification: new ModelAnswerSpec(),
    processor: new GuardProcessor(),
  }

  guard = createHuman({
    name: "Constraint Guard",
    capabilities: ["deterministic-validation", "repair-routing"],
    handlers: [telemetry, guardHandler],
  })

  join(user)
  for (const agent of agents) join(agent)
  join(guard)

  state.timeline.push({
    at: now(),
    kind: "run",
    label: "Disruption injected; three independent agents are now eligible to react",
  })
  sendMessage(initialMessage(), user.getId())

  const timeoutMs = 50_000
  const started = Date.now()
  while (state.status !== "complete" && Date.now() - started < timeoutMs) {
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  if (state.status !== "complete") {
    const fallback = simulationResult(
      model,
      "Live Mozaik run did not complete inside the API timeout; UI returned the deterministic preview instead.",
    )
    fallback.status = "timeout"
    fallback.timeline = [...state.timeline, ...fallback.timeline]
    return fallback
  }

  const starts = Object.fromEntries(state.inferenceStarts)
  const completions = Object.fromEntries(state.inferenceCompletions)
  const startTimes = Object.values(starts).map((x) => new Date(x).getTime())
  const completionTimes = Object.values(completions).map((x) => new Date(x).getTime())
  const firstCompletion = completionTimes.length ? Math.min(...completionTimes) : Number.NaN
  const allStartedBeforeFirstCompleted = startTimes.length >= 3 && startTimes.every((value) => value < firstCompletion)

  return {
    mode: "live",
    status: "complete",
    model,
    scenario,
    proposals: [...state.proposals.values()],
    conflicts: state.conflicts,
    timeline: state.timeline,
    concurrencyProof: {
      agentInferenceStarts: starts,
      agentInferenceCompletions: completions,
      allStartedBeforeFirstCompleted,
      explanation: allStartedBeforeFirstCompleted
        ? "Mozaik emitted inference.started for all three agents before any first-round inference completed."
        : "The run completed, but the captured timestamps did not prove a full three-way overlap; inspect Mozaik Cloud for the exact timeline.",
    },
    finalPlan: [...state.proposals.values()],
    note: state.fallbackUsed
      ? "The deterministic guard had to apply its safe fallback after the AI repair remained conflicting."
      : undefined,
  }
}
