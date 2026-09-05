import "dotenv/config"
import { runCallsheetScenario } from "../src/engine.js"

const result = await runCallsheetScenario({ forceSimulation: process.argv.includes("--simulation") })
console.log(JSON.stringify(result, null, 2))
