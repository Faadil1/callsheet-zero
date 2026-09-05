import "dotenv/config"
import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { runCallsheetScenario } from "../src/engine.js"

const root = fileURLToPath(new URL("../", import.meta.url))
const port = Number(process.env.PORT || 3000)

const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`)
    if (url.pathname === "/api/run") {
      const result = await runCallsheetScenario({ forceSimulation: url.searchParams.get("mode") === "simulation" })
      res.writeHead(200, { "content-type": "application/json", "cache-control": "no-store" })
      return res.end(JSON.stringify(result))
    }
    const path = url.pathname === "/" ? "/index.html" : url.pathname
    const file = await readFile(join(root, path))
    res.writeHead(200, { "content-type": mime[extname(path)] || "application/octet-stream" })
    res.end(file)
  } catch (error) {
    res.writeHead(404, { "content-type": "application/json" })
    res.end(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }))
  }
}).listen(port, () => {
  console.log(`CALLSHEET ZERO running at http://localhost:${port}`)
})
