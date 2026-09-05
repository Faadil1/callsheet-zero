import type { StructuredOutputFormat } from "@mozaik-ai/core"

export const proposalFormat: StructuredOutputFormat = {
  name: "callsheet_repair_proposal",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      agentRole: {
        type: "string",
        enum: ["schedule", "talent", "logistics"],
        description: "The role producing the proposal."
      },
      version: {
        type: "integer",
        minimum: 1,
        maximum: 2,
        description: "1 for the initial proposal, 2 for a repair after a conflict."
      },
      sceneId: {
        type: "string",
        description: "Scene identifier being moved or protected."
      },
      action: {
        type: "string",
        description: "One sentence describing the proposed schedule mutation."
      },
      start: {
        type: "string",
        description: "24-hour local start time in HH:MM format."
      },
      durationMinutes: {
        type: "integer",
        minimum: 15,
        maximum: 240
      },
      location: {
        type: "string"
      },
      resources: {
        type: "array",
        items: { type: "string" },
        minItems: 1,
        description: "Scarce resources required by the proposal, such as lead_actor or van_1."
      },
      confidence: {
        type: "number",
        minimum: 0,
        maximum: 1
      },
      rationale: {
        type: "string",
        description: "Short reason the role chose this mutation."
      }
    },
    required: [
      "agentRole",
      "version",
      "sceneId",
      "action",
      "start",
      "durationMinutes",
      "location",
      "resources",
      "confidence",
      "rationale"
    ]
  }
}
