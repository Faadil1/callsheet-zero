// Zero-model-call paired browser evidence. No Vercel / Anthropic / Mozaik access.
// From repository root: node experiments/continuity-register/capture-qa.mjs
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { readFile, mkdir, writeFile } from 'node:fs/promises'
import { resolve, extname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium } from 'playwright'

const root = resolve(fileURLToPath(new URL('../../', import.meta.url)))
const out = resolve(root, 'artifacts/trace-continuity-register')
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
const arms = [{name:'control',path:'/index.html'},{name:'hybrid',path:'/experiments/continuity-register/index.html'}]
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
    if(arm.name==='hybrid'){
      assert.equal(await page.locator('#runBtn').isVisible(),false,'Hybrid paid live button must stay hidden')
      assert.match(await page.locator('.identity .eyebrow').textContent(),/ARCHIVED REVISION STUDY/)
      assert.match(await page.locator('#sourceNote').textContent(),/No new model call/)
    }
    await page.locator('#replayBtn').click()
    assert.match(await page.locator('#status').textContent(),/Paused/i)
    // Navigate by real keyboard Tab events, not JS focus(). This tests
    // :focus-visible activation as a keyboard user actually experiences it.
    await page.locator('#replayBtn').focus()
    let firstStageFocused=false
    for(let tab=0;tab<12;tab++){
      await page.keyboard.press('Tab')
      firstStageFocused=await page.locator('[data-step="1"]').evaluate(el=>document.activeElement===el)
      if(firstStageFocused)break
    }
    assert.equal(firstStageFocused,true,'Replay stage 1 must be reachable with Tab')
    const focused = await page.locator('[data-step="1"]').evaluate(el=>{
      const css=getComputedStyle(el)
      return {active:document.activeElement===el,outlineStyle:css.outlineStyle,outlineWidth:css.outlineWidth}
    })
    assert.notEqual(focused.outlineStyle,'none','Keyboard stage focus must expose a visible outline')
    await page.keyboard.press('Enter')
    assert.equal(await page.locator('#beforeDecision').textContent(),'COMMIT REFUSED')
    await page.keyboard.press('ArrowRight')
    assert.equal(await page.locator('#afterDecision').textContent(),'REPAIR REQUESTED','Keyboard Right must advance to repair')
    await page.keyboard.press('Home')
    assert.equal(await page.locator('#beforeDecision').textContent(),'AGENTS STARTED','Keyboard Home must return to initial agents')
    await page.keyboard.press('End')
    assert.equal(await page.locator('#afterDecision').textContent(),'COMMIT ALLOWED','Keyboard End must move to final guarded decision')
    await page.locator('[data-step="2"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'REPAIR REQUESTED')
    await page.locator('[data-step="3"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'AWAITING COMMIT')
    await page.locator('[data-step="4"]').click()
    assert.equal(await page.locator('#afterDecision').textContent(),'COMMIT ALLOWED')
    assert.match(await page.locator('#changeTitle').textContent(),/18:00/)
    await page.locator('.receipts summary').click()
    assert.ok(await page.locator('#receiptList li').count()>=10,'Run receipts must be inspectable')
    // Receipt clicks scroll the browser down. Normalize to scrollY=0 BEFORE
    // measuring above-the-fold visibility or taking captures (old metrics were invalid).
    await page.evaluate(()=>{
      if(document.activeElement instanceof HTMLElement) document.activeElement.blur()
      window.scrollTo({top:0,left:0,behavior:'instant'})
    })
    await page.waitForTimeout(80)
    const dims=await page.evaluate(()=>{
      const box=(selector)=>{const r=document.querySelector(selector)?.getBoundingClientRect();return r?{top:Math.round(r.top),bottom:Math.round(r.bottom)}:null}
      return {
        scrollY:Math.round(window.scrollY),
        scrollWidth:document.documentElement.scrollWidth,
        clientWidth:document.documentElement.clientWidth,
        viewportHeight:window.innerHeight,
        controls:box('.transport'),
        before:box('.revision.before'),
        after:box('.revision.after'),
        beforeDecision:box('#beforeDecision'),
        afterDecision:box('#afterDecision'),
        repair:box('.change'),
        firstProposal:box('#beforeRows tr:first-child')
      }
    })
    assert.equal(dims.scrollY,0,'Visual capture must start at document top')
    assert.ok(dims.scrollWidth<=dims.clientWidth+1,arm.name+'/'+screen.name+' horizontal overflow: '+dims.scrollWidth+' > '+dims.clientWidth)
    assert.ok(dims.controls?.bottom<=screen.height,'Replay controls must fit above the first fold: '+arm.name+'/'+screen.name+' '+dims.controls?.bottom+' > '+screen.height)
    assert.ok(dims.beforeDecision?.top<screen.height,'Refusal must start within first fold: '+arm.name+'/'+screen.name)
    if(arm.name==='hybrid'){
      assert.ok(dims.afterDecision?.top<screen.height || screen.name==='mobile','Hybrid final Guard decision must start inside first desktop/jury screen')
      if(screen.name==='jury'){
        assert.ok(dims.repair?.bottom<=screen.height,'At 1280x720 the complete S22 repair must be inside the first screen: '+dims.repair?.bottom)
      }
      if(screen.name==='mobile'){
        assert.ok(dims.firstProposal?.top<screen.height,'On 390x844 first proposal must start within first screen: '+dims.firstProposal?.top)
      }
    }
    // Scoped, inspectable checks for key control/status text — NOT a WCAG audit.
    let readability=null
    if(arm.name==='hybrid'){
      readability=await page.evaluate(()=>{
        const get=(selector)=>document.querySelector(selector)
        const parsed=(text)=>{
          const found=text.match(/rgba?\\(([^)]+)\\)/)
          if(!found)throw new Error('Unknown CSS color format: '+text)
          return found[1].split(',').slice(0,3).map(v=>Number(v.trim()))
        }
        const lum=(arr)=>{
          const channels=arr.map(v=>{
            const x=v/255
            return x<=0.04045?x/12.92:Math.pow((x+0.055)/1.055,2.4)
          })
          return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722
        }
        const ratio=(fore,back)=>{
          const a=lum(parsed(fore)),b=lum(parsed(back))
          return (Math.max(a,b)+.05)/(Math.min(a,b)+.05)
        }
        const contrastCases=[
          ['eyebrow','.identity .eyebrow','body'],
          ['status','.statusline','body'],
          ['before_provenance','.revision.before .provenance','.revision.before'],
          ['after_provenance','.revision.after .provenance','.revision.after'],
          ['before_table_header','.revision.before th','.revision.before'],
          ['after_table_header','.revision.after th','.revision.after'],
          ['hold_status','.revision.before .row-conflict .row-status','.revision.before .row-conflict'],
          ['repaired_time','.revision.after .row-repaired .time','.revision.after .row-repaired'],
          ['transport_secondary','.transport-label > span','.transport'],
          ['step_secondary','.steps button:first-child small','.transport'],
          ['active_step_number','.steps button[aria-current="step"] .step-number','.steps button[aria-current="step"] .step-number']
        ]
        const contrast=contrastCases.map(([id,foreground,background])=>{
          const f=get(foreground),b=get(background)
          if(!f || !b)throw Error('Missing contrast probe '+id)
          const fg=getComputedStyle(f).color
          const bg=getComputedStyle(b).backgroundColor
          return {id,foreground:fg,background:bg,ratio:Number(ratio(fg,bg).toFixed(2))}
        })
        const criticalFonts=[
          ['eyebrow','.identity .eyebrow',11],
          ['status','.statusline',12],
          ['provenance','.revision.before .provenance',11],
          ['table_header','.revision.before th',11],
          ['row_agent','.revision.before .role',12],
          ['row_status','.revision.before .row-status',11],
          ['stage_label','.steps button:first-child b',11],
          ['stage_detail','.steps button:first-child small',10.5],
          ['change_label','.change p',12]
        ]
        const fonts=criticalFonts.map(([id,selector,minPx])=>{
          const el=get(selector)
          if(!el)throw Error('Missing font probe '+id)
          return {id,px:parseFloat(getComputedStyle(el).fontSize),minimum:minPx}
        })
        const current=Array.from(document.querySelectorAll('[data-step][aria-current="step"]')).length
        const controls=[...document.querySelectorAll('.steps button')].map(el=>({width:Math.round(el.getBoundingClientRect().width),height:Math.round(el.getBoundingClientRect().height)}))
        return {contrast,fonts,currentSelectedStageCount:current,stageTargets:controls}
      })
      const lowContrast=readability.contrast.filter(entry=>entry.ratio<4.5)
      assert.deepEqual(lowContrast,[],'Key text WCAG normal-size contrast 4.5:1')
      const undersized=readability.fonts.filter(entry=>entry.px+.01<entry.minimum)
      assert.deepEqual(undersized,[],'Critical mobile metadata below predeclared font floor')
      assert.equal(readability.currentSelectedStageCount,1,'Single current replay step')
      if(screen.name==='mobile'){
        assert.ok(readability.stageTargets.every(x=>x.width>=44&&x.height>=44),'Mobile step targets must be at least 44x44')
      }
    }
    assert.deepEqual(errors,[],arm.name+'/'+screen.name+' JS errors')
    const filename=arm.name+'-'+screen.name+'-final.png'
    const firstfold=arm.name+'-'+screen.name+'-viewport.png'
    await page.screenshot({path:resolve(out,firstfold),fullPage:false,animations:'disabled'})
    await page.screenshot({path:resolve(out,filename),fullPage:true,animations:'disabled'})
    let narrowReflow=null
    if(arm.name==='hybrid' && screen.name==='mobile'){
      // Narrow 320px layout stress, corresponding to a 1280px desktop
      // reducing to one quarter of its CSS viewport width. This is a
      // reflow proxy; it is not a full 400% browser zoom certification.
      await page.setViewportSize({width:320,height:768})
      await page.evaluate(()=>window.scrollTo({top:0,left:0,behavior:'instant'}))
      narrowReflow=await page.evaluate(()=>({
        viewport:document.documentElement.clientWidth,
        scrollWidth:document.documentElement.scrollWidth,
        stepWidths:[...document.querySelectorAll('.steps button')].map(x=>Math.round(x.getBoundingClientRect().width)),
        firstAgentVisible:document.querySelector('#beforeRows tr:first-child')?.getBoundingClientRect().width>0
      }))
      assert.ok(narrowReflow.scrollWidth<=narrowReflow.viewport+1,'320px narrow reflow must not introduce document horizontal scrolling')
      assert.equal(narrowReflow.firstAgentVisible,true,'First agent row remains available at 320px')
    }
    metrics.push({...screen,arm:arm.name,...dims,screenshot:filename,viewportScreenshot:firstfold,noJsErrors:true,readability,narrowReflow})
    await context.close()
  }
  assert.equal(apiRuns,0,'Do not call any provider API route')
  const evidence={classification:'BROWSER_LOCAL_REPLAY_QA; NOT LIVE AGENT EXECUTION; NOT CAUSAL TRACE POLICY A/B',capturedRun:'2026-09-05',fixture:'/ui/canonical.js',conditions:'A vs C with identical archived fixtures and JS; headless Chromium, keyboard Tab/Enter/Arrow/Home/End, reduced-motion, contrast checks on critical C text, and 320px reflow stress. Not full WCAG or true browser zoom certificate.',viewports:screens,providerApiRequests:apiRuns,results:metrics,caveats:['Comparison to B is a separate previous-iteration screenshot reference, not this same-run arm.','No task timing or blind human evaluation yet; neither visual preference nor independent TRACE policy A/B is proven.','Local QA HTTP server returns 503 to any /api/* route; no vendor credentials read.']}
  await writeFile(resolve(out,'paired-qa.json'),JSON.stringify(evidence,null,2))
  console.log('PASS — '+metrics.length+' paired journeys, '+(metrics.length*2)+' screenshots, keyboard navigation, C contrast/text/reflow checks, true first-fold checks, 0 paid API calls')
  for(const m of metrics)console.log(m.arm+'/'+m.name+': overflow-free, true first fold transport bottom '+m.controls?.bottom+'px / '+m.height+'px')
  console.log('Evidence folder: '+out)
}finally{
  await browser?.close()
  await new Promise(r=>server.close(r))
}
