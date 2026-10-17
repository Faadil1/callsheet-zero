import "dotenv/config"
import { createServer } from "node:http"
import { readFile } from "node:fs/promises"
import { extname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { runCallsheetScenario } from "../src/engine.js"
import { authorizeLiveRun } from "../api/run-guard.js"

const root = fileURLToPath(new URL("../", import.meta.url))
const portFlag = process.argv.indexOf("--port")
const port = Number(portFlag >= 0 ? process.argv[portFlag + 1] : process.env.PORT || 3000)

const mime: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
}

createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host}`)
    if (url.pathname === "/api/run") {
      const auth = authorizeLiveRun(req.method, req.headers.authorization, process.env)
      res.setHeader("cache-control", "no-store")
      res.setHeader("content-type", "application/json")
      if (!auth.allowed) {
        if (auth.status === 405) res.setHeader("allow", "POST")
        res.writeHead(auth.status)
        return res.end(JSON.stringify({ error: auth.code }))
      }
      if (url.searchParams.size !== 0) {
        res.writeHead(400)
        return res.end(JSON.stringify({ error: "unsupported_run_parameters" }))
      }
      const result = await runCallsheetScenario()
      res.writeHead(200)
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
}).listen(port, "127.0.0.1", () => {
  console.log(`CALLSHEET ZERO running at http://localhost:${port}`)
})
