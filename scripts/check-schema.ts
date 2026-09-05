import { proposalFormat } from "../src/schema.js"

const forbidden = new Set(["minimum", "maximum", "exclusiveMinimum", "exclusiveMaximum", "minItems", "maxItems"])
const findings: string[] = []

function walk(value: unknown, path = "schema"): void {
  if (!value || typeof value !== "object") return
  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, `${path}[${index}]`))
    return
  }

  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (forbidden.has(key)) findings.push(`${path}.${key}`)
    walk(child, `${path}.${key}`)
  }
}

walk(proposalFormat.schema)

if (findings.length > 0) {
  console.error("Anthropic-incompatible structured-output keywords found:")
  findings.forEach((finding) => console.error(`- ${finding}`))
  process.exit(1)
}

console.log("Anthropic schema compatibility check: PASS")
