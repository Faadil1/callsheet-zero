// Zero-model-call paired browser evidence. No Vercel / Anthropic / Mozaik access.
// From repository root: node experiments/continuity-ledger/capture-qa.mjs
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(fileURLToPath(new URL('../../', import.meta.url)))
const out = resolve(root, 'artifacts/trace-continuity-ledger')
let apiRuns = 0
await mkdir(out,{recursive:true})
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'}
const server = createServer(async(req,res)=>{
  try {
    const url = new URL(req.url||'/', 'http://127.0.0.1')
    if(url.pathname.startsWith('/api/')){
      apiRuns++
      res.writeHead(503,{'content-type':'application/json','cache-control':'no-store'})
      return res.end(JSON.stringify({error:'qa_static_only_no_model_provider'}))
    }
    let path = decodeURIComponent(url.pathname)
    if(path.endsWith('/'))path+='index.html'
    const file = resolve(root, '.'+path)
    if(!file.startsWith(root+sep)){res.writeHead(403);return res.end('forbidden')}
    const buffer = await readFile(file)
    res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream','cache-control':'no-store'})
    res.end(buffer)
  }catch(error){res.writeHead(404);res.end('Not found')}
})
await new Promise((ok,fail)=>{server.once('error',fail);server.listen(0,'127.0.0.1',ok)})
const host = 'http://127.0.0.1:'+server.address().port
const screens = [{name:'desktop',width:1440,height:900},{name:'jury',width:1280,height:720},{name:'mobile',width:390,height:844}]
const arms = [{name:'control',path:'/index.html'},{name:'candidate',path:'/experiments/continuity-ledger/index.html'}]
const metrics = []
let browser
try{
  const launch = {headless:true}
  if(process.env.PLAYWRIGHT_CHROMIUM_PATH)launch.executablePath=process.env.PLAYWRIGHT_CHROMIUM_PATH
  browser=await chromium.launch(launch)
  for(const screen of screens)for(const arm of arms){
    const context=await browser.newContext({viewport:{width:screen.width,height:screen.height},reducedMotion:'reduce',deviceScaleFactor:1})
    const page=await context.newPage()
    const errors=[]
    page.on('pageerror',e=>errors.push(String(e)))
    const response=await page.goto(host+arm.path,{waitUntil:'load',timeout:20000})
    assert.equal(response.status(),200,arm.name+' page HTTP')
    await page.locator('#replayBtn').waitFor({state:'visible'})
    if(arm.name==='candidate'){
      assert.equal(await page.locator('#runBtn').isVisible(),false,'Candidate paid live button must stay hidden')
      assert.match(await page.locator('.lab-label').textContent(),/REPLAY ONLY/)
    }
    await page.locator('#replayBtn').click()
    assert.match(await page.locator('#status').textContent(),/Paused/i)
    await page.locator('[data-step="1"]').click()
    assert.equal(await page.locator('#beforeDecision').textContent(),'COMMIT REFUSED')
    await page.locator('[data-step="2"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'REPAIR REQUESTED')
    await page.locator('[data-step="3"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'AWAITING COMMIT')
    await page.locator('[data-step="4"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'COMMIT ALLOWED')
    assert.match(await page.locator('#changeTitle').textContent(),/18:00/)
    await page.locator('.receipts summary').click()
    assert.ok(await page.locator('#receiptList li').count()>=10,'Run receipts must be inspectable')
    const dims=await page.evaluate(()=>{
      const box=(selector)=>{const r=document.querySelector(selector)?.getBoundingClientRect();return r?{top:Math.round(r.top),bottom:Math.round(r.bottom)}:null}
      return {scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,controls:box('.transport'),before:box('.revision.before'),after:box('.revision.after'),brief:box('.operator-brief')}
    })
    assert.ok(dims.scrollWidth<=dims.clientWidth+1,arm.name+'/'+screen.name+' horizontal overflow: '+dims.scrollWidth+' > '+dims.clientWidth)
    assert.deepEqual(errors,[],arm.name+'/'+screen.name+' JS errors')
    const filename=arm.name+'-'+screen.name+'-final.png'
    await page.screenshot({path:resolve(out,filename),fullPage:true,animations:'disabled'})
    metrics.push({...screen,arm:arm.name,...dims,screenshot:filename,noJsErrors:true})
    await context.close()
  }
  assert.equal(apiRuns,0,'Do not call any provider API route')
  const evidence={classification:'BROWSER_LOCAL_REPLAY_QA; NOT LIVE AGENT EXECUTION; NOT CAUSAL TRACE POLICY A/B',capturedRun:'2026-09-05',fixture:'/ui/canonical.js',conditions:'Same immutable fixture and replay JS; visual comparison only; reduced-motion browser.',viewports:screens,providerApiRequests:apiRuns,results:metrics,caveats:['Aesthetic review remains human. No independent TRACE policy A/B proven.','Local QA HTTP server returns 503 to any /api/* route; no vendor credentials read.']}
  await writeFile(resolve(out,'paired-qa.json'),JSON.stringify(evidence,null,2))
  console.log('PASS — '+metrics.length+' browser journeys, '+metrics.length+' screenshots, 0 paid API calls')
  for(const m of metrics)console.log(m.arm+'/'+m.name+': overflow-free, transport bottom '+m.controls?.bottom+'px')
  console.log('Evidence folder: '+out)
}finally{
  await browser?.close()
  await new Promise(r=>server.close(r))
}
