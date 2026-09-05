import "dotenv/config"

const model = process.env.MOZAIK_MODEL || "gpt-5.4"
const provider = model.startsWith("claude")
  ? "anthropic"
  : model.startsWith("gemini")
    ? "gemini"
    : "openai"

const credentialVariable =
  provider === "anthropic"
    ? "ANTHROPIC_API_KEY"
    : provider === "gemini"
      ? "GEMINI_API_KEY"
      : "OPENAI_API_KEY"

const credentialDetected = Boolean(process.env[credentialVariable]?.trim())

console.log(
  JSON.stringify(
    {
      cwd: process.cwd(),
      expectedEnvFile: `${process.cwd()}\\.env`,
      model,
      provider,
      credentialVariable,
      credentialDetected,
      mozaikApiKeyDetected: Boolean(process.env.MOZAIK_API_KEY?.trim()),
      mozaikProjectIdDetected: Boolean(process.env.MOZAIK_PROJECT_ID?.trim()),
    },
    null,
    2,
  ),
)

if (!credentialDetected) {
  console.error(`\nMissing or empty ${credentialVariable}. No secret value was printed.`)
  process.exitCode = 2
}
