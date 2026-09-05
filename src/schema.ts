import type { StructuredOutputFormat } from "@mozaik-ai/core"

// Keep this schema inside Anthropic's currently accepted structured-output subset.
// Numeric bounds and array cardinality constraints are enforced by the runtime/prompt,
// not by JSON Schema keywords such as minimum/maximum/minItems, which can be rejected
// by Anthropic's output_config.format.schema validation.
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
        enum: [1, 2],
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
        description: "Duration in minutes. Use a practical production duration between 15 and 240 minutes."
      },
      location: {
        type: "string"
      },
      resources: {
        type: "array",
        items: { type: "string" },
        description: "One or more scarce resources required by the proposal, such as lead_actor or van_1."
      },
      confidence: {
        type: "number",
        description: "Confidence score between 0 and 1."
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
