export default function handler(_req: any, res: any) {
  res.setHeader("Content-Type", "application/json")
  res.setHeader("Cache-Control", "no-store")
  return res.status(200).json({
    ok: true,
    service: "callsheet-zero",
    node: process.version,
    anthropicConfigured: Boolean(process.env.ANTHROPIC_API_KEY),
    mozaikConfigured: Boolean(process.env.MOZAIK_API_KEY),
    model: process.env.MOZAIK_MODEL || null,
  })
}
