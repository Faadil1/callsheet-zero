import "dotenv/config"
import { createHash } from "node:crypto"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { runCallsheetScenario } from "../src/engine.js"
import { buildAdaptionLearningExample, toAdaptionJsonl } from "../src/learning.js"

const API_BASE = "https://api.prod.adaptionlabs.ai/api/v1"

function hasFlag(flag: string): boolean {
  return process.argv.includes(flag)
}

function argValue(name: string): string | undefined {
  const prefix = `${name}=`
  const item = process.argv.find((arg) => arg.startsWith(prefix))
  return item?.slice(prefix.length)
}

async function adaptionRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const apiKey = process.env.ADAPTION_API_KEY
  if (!apiKey) throw new Error("ADAPTION_API_KEY is required for upload/estimate/run operations.")

  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      ...(init.body ? { "Content-Type": "application/json" } : {}),
      ...(init.headers || {}),
    },
  })

  const text = await response.text()
  let payload: unknown
  try {
    payload = text ? JSON.parse(text) : {}
  } catch {
    payload = text
  }

  if (!response.ok) {
    throw new Error(`Adaption API ${response.status}: ${typeof payload === "string" ? payload : JSON.stringify(payload)}`)
  }
  return payload as T
}

async function createAndUploadDataset(jsonlPath: string): Promise<string> {
  const bytes = await readFile(jsonlPath)
  const name = `callsheet-zero-repair-${new Date().toISOString().replace(/[:.]/g, "-")}.jsonl`

  const created = await adaptionRequest<{
    dataset_id: string
    upload_instructions?: { url: string; method: string; s3_key: string }
  }>("/datasets", {
    method: "POST",
    body: JSON.stringify({ source: { name, file_format: "jsonl" } }),
  })

  if (!created.upload_instructions?.url) throw new Error("Adaption did not return upload instructions.")

  const upload = await fetch(created.upload_instructions.url, {
    method: created.upload_instructions.method || "PUT",
    body: bytes,
  })
  if (!upload.ok) throw new Error(`Adaption presigned upload failed: HTTP ${upload.status}`)

  const sha256 = createHash("sha256").update(bytes).digest("hex")
  await adaptionRequest(`/datasets/${created.dataset_id}/upload/complete`, {
    method: "POST",
    body: JSON.stringify({ file_size_bytes: bytes.byteLength, sha256 }),
  })

  const deadline = Date.now() + 120_000
  while (Date.now() < deadline) {
    const status = await adaptionRequest<{ status?: string; row_count?: number | null }>(`/datasets/${created.dataset_id}`)
    if ((status.row_count ?? 0) > 0) return created.dataset_id
    if (status.status === "failed") throw new Error("Adaption dataset preprocessing failed.")
    await new Promise((resolveWait) => setTimeout(resolveWait, 2_000))
  }

  throw new Error("Timed out waiting for Adaption dataset preprocessing.")
}

function runConfig(maxRows: number, estimate: boolean) {
  return {
    column_mapping: {
      prompt: "prompt",
      completion: "completion",
      context: ["context", "metadata"],
    },
    training_type: "preference_pairs",
    recipe_specification: {
      recipes: {
        deduplication: true,
        prompt_rephrase: false,
        reasoning_traces: false,
      },
    },
    brand_controls: {
      length: "concise",
      blueprint:
        "CALLSHEET ZERO production-repair data. Preserve hard resource constraints, prefer the smallest conflict-free schedule mutation, never invent resource availability, and keep the chosen response operationally specific.",
    },
    job_specification: {
      max_rows: maxRows,
      idempotency_key: `callsheet-zero-${Date.now()}`,
    },
    estimate,
  }
}

async function main() {
  const simulation = hasFlag("--simulation")
  const wantsEstimate = hasFlag("--estimate") || hasFlag("--run")
  const wantsRun = hasFlag("--run")
  const confirmsSpend = hasFlag("--confirm-spend")
  const output = resolve(argValue("--out") || `artifacts/adaption-learning-${Date.now()}.jsonl`)

  const result = await runCallsheetScenario({ forceSimulation: simulation })
  const example = buildAdaptionLearningExample(result)
  const metadata = JSON.parse(example.metadata) as { repairCaptured?: boolean }

  await mkdir(dirname(output), { recursive: true })
  await writeFile(output, toAdaptionJsonl(example), "utf8")

  console.log(`Learning example exported: ${output}`)
  console.log(`source mode=${result.mode} status=${result.status} model=${result.model}`)
  console.log(`repairCaptured=${Boolean(metadata.repairCaptured)}`)

  if (!wantsEstimate) {
    console.log("No Adaption credits used. Add --estimate to upload and request a quote.")
    return
  }

  if (!metadata.repairCaptured) {
    throw new Error(
      "Adaption upload blocked: this run completed without a version-2 constraint repair, so it is not eligible for the repair-learning dataset. Run the scenario again or use --simulation for a pipeline-only check.",
    )
  }

  const datasetId = await createAndUploadDataset(output)
  console.log(`Adaption dataset ready: ${datasetId}`)

  const maxRows = Math.max(1, Number(process.env.ADAPTION_MAX_ROWS || "1"))
  const estimate = await adaptionRequest<{
    run_id?: string | null
    estimatedMinutes: number
    estimatedCreditsConsumed: number
    estimate: boolean
  }>(`/datasets/${datasetId}/run`, {
    method: "POST",
    body: JSON.stringify(runConfig(maxRows, true)),
  })

  console.log(
    `Estimate: ${estimate.estimatedCreditsConsumed} credits, ${estimate.estimatedMinutes} min, estimate=${estimate.estimate}`,
  )

  if (!wantsRun) {
    console.log("Estimate complete. No paid Adaption run started.")
    return
  }

  if (!confirmsSpend) {
    throw new Error("Paid run blocked. Re-run with --run --confirm-spend after reviewing the estimate.")
  }

  const budget = Math.max(1, Number(process.env.ADAPTION_MAX_CREDITS || "10"))
  if (estimate.estimatedCreditsConsumed > budget) {
    throw new Error(
      `Paid run blocked: estimate ${estimate.estimatedCreditsConsumed} exceeds ADAPTION_MAX_CREDITS=${budget}.`,
    )
  }

  const run = await adaptionRequest<{
    run_id?: string | null
    estimatedMinutes: number
    estimatedCreditsConsumed: number
    estimate: boolean
  }>(`/datasets/${datasetId}/run`, {
    method: "POST",
    body: JSON.stringify(runConfig(maxRows, false)),
  })

  console.log(`Adaption run started: ${run.run_id || "no run id returned"}`)
  console.log(`Reserved estimate: ${run.estimatedCreditsConsumed} credits`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error)
  process.exitCode = 1
})
