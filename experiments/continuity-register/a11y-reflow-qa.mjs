// TRACE C — no-provider reflow and accessibility-structure checks.
// Run: node experiments/continuity-register/a11y-reflow-qa.mjs
// 640px and 320px are CSS viewport width proxies for 200% / 400%
// reflow against a 1280px desktop reference. NOT native browser zoom.
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const out=resolve(root,'artifacts/trace-continuity-register/a11y-reflow');
await mkdir(out,{recursive:true});
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.json':'application/json'};
let blockedApiRequests=0, browser;
const server=createServer(async(req,res)=>{
  try{
    const url=new URL(req.url||'/', 'http://127.0.0.1');
    if(url.pathname.startsWith('/api/')){
      blockedApiRequests++;
      res.writeHead(503,{'content-type':'application/json'});
      return res.end(JSON.stringify({error:'qa_api_blocked_no_paid_run'}));
    }
    let p=decodeURIComponent(url.pathname);
    if(p.endsWith('/'))p+='index.html';
    const file=resolve(root,'.'+p);
    if(!file.startsWith(root+sep)){res.writeHead(403);return res.end('Forbidden');}
    const data=await readFile(file);
    res.writeHead(200,{'content-type':mime[extname(file)]||'application/octet-stream'});
    res.end(data);
  }catch{res.writeHead(404);res.end('Not found');}
});
await new Promise((ok,err)=>{server.once('error',err);server.listen(0,'127.0.0.1',ok);});
const host='http://127.0.0.1:'+server.address().port;
const scenarios=[
  {id:'standard-1280',width:1280,height:720,meaning:'normal CSS viewport baseline'},
  {id:'reflow-640',width:640,height:900,meaning:'200% relative CSS viewport proxy; NOT native browser zoom'},
  {id:'reflow-320',width:320,height:900,meaning:'400% relative CSS viewport proxy; NOT native browser zoom'}
];
const report={classification:'AUTOMATED_CSS_VIEWPORT_REFLOW_AND_CHROMIUM_AX_TREE; NOT_BROWSER_NATIVE_ZOOM_OR_SCREEN_READER_CERTIFICATION',site:'Callsheet Zero candidate C',source:'shared immutable captured replay 2026-09-05',scenarios:[],paidModelRequests:0,caveats:['This uses CSS viewport widths, not Chrome native 200% or 400% zoom.','Chromium AX tree inspection is not equivalent to a human screen-reader session.','External paid /api/* routes are never available on the QA server.']};
try{
  const opts={headless:true};
  if(process.env.PLAYWRIGHT_CHROMIUM_PATH)opts.executablePath=process.env.PLAYWRIGHT_CHROMIUM_PATH;
  browser=await chromium.launch(opts);
  for(const config of scenarios){
    const context=await browser.newContext({viewport:{width:config.width,height:config.height},reducedMotion:'reduce',deviceScaleFactor:1});
    const page=await context.newPage();
    const pageErrors=[];
    page.on('pageerror',e=>pageErrors.push(String(e)));
    const response=await page.goto(host+'/experiments/continuity-register/index.html',{waitUntil:'load'});
    assert.equal(response.status(),200,'Candidate HTML must load');
    assert.equal(await page.locator('#runBtn').isVisible(),false,'Paid operator UI remains hidden');
    assert.match(await page.locator('.archive-method-note').textContent(),/archived replay only/i);
    await page.locator('#replayBtn').click();
    assert.match(await page.locator('#status').textContent(),/Paused/i,'Reduced-motion replay starts paused');
    await page.locator('[data-step="1"]').click();
    assert.equal(await page.locator('#beforeDecision').textContent(),'COMMIT REFUSED');
    await page.locator('[data-step="2"]').click();
    assert.equal(await page.locator('#afterDecision').textContent(),'REPAIR REQUESTED');
    await page.locator('[data-step="3"]').click();
    assert.equal(await page.locator('#afterDecision').textContent(),'AWAITING COMMIT');
    await page.locator('[data-step="4"]').click();
    assert.equal(await page.locator('#afterDecision').textContent(),'COMMIT ALLOWED');
    assert.match(await page.locator('#changeTitle').textContent(),/18:00/);
    // Keyboard paths remain accessible at every CSS viewport.
    await page.locator('[data-step="0"]').focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#beforeDecision').textContent(),'AGENTS STARTED');
    await page.keyboard.press('End');
    assert.equal(await page.locator('#afterDecision').textContent(),'COMMIT ALLOWED');
    await page.locator('.receipts summary').click();
    assert.ok(await page.locator('#receiptList li').count()>10,'Historical receipts inspectable');
    await page.evaluate(()=>{document.activeElement?.blur?.();window.scrollTo({top:0,left:0,behavior:'instant'});});
    await page.waitForTimeout(80);
    const metrics=await page.evaluate(()=>{
      const root=document.documentElement;
      const sels=['#replayBtn','.transport','.revision.before','.revision.after','#beforeDecision','#afterDecision','#beforeRows tr:first-child','#afterRows tr:first-child','.change','.receipts summary'];
      const elements=sels.map(selector=>{
        const node=document.querySelector(selector);
        if(!node)throw Error('Missing control '+selector);
        const rect=node.getBoundingClientRect(), style=getComputedStyle(node);
        return {selector,visible:rect.width>0&&rect.height>0&&style.visibility!=='hidden',left:Math.round(rect.left),right:Math.round(rect.right),width:Math.round(rect.width),height:Math.round(rect.height)};
      });
      return {scrollX:Math.round(scrollX),scrollY:Math.round(scrollY),scrollWidth:root.scrollWidth,clientWidth:root.clientWidth,elements,hiddenLive:!document.querySelector('#runBtn')?.getClientRects().length};
    });
    assert.equal(metrics.scrollY,0,'True top-of-document capture');
    assert.ok(metrics.scrollWidth<=metrics.clientWidth+1,'No horizontal document overflow at '+config.width+'px');
    for(const el of metrics.elements)assert.equal(el.visible,true,'Critical control remains visible: '+el.selector);
    // Complete table meaning and semantic navigation exposed to Chromium AX tree.
    const cdp=await context.newCDPSession(page);
    await cdp.send('Accessibility.enable');
    const tree=(await cdp.send('Accessibility.getFullAXTree')).nodes;
    const accessible=tree.filter(node=>!node.ignored);
    const roles=new Set(accessible.map(node=>node.role?.value).filter(Boolean));
    const names=accessible.map(node=>node.name?.value||'').join(' | ');
    for(const needed of ['table','columnheader','button','link'])assert.ok(roles.has(needed),'AX tree missing '+needed);
    for(const label of ['Replay verified repair','Raw receipt','Reduce motion','COMMIT REFUSED','COMMIT ALLOWED']){
      assert.ok(names.includes(label),'AX tree missing text '+label);
    }
    assert.ok(!names.includes('Operator live'),'Hidden paid-run control is not in accessibility tree');
    assert.deepEqual(pageErrors,[],'No JavaScript page errors');
    const shot=config.id+'.png';
    await page.screenshot({path:resolve(out,shot),fullPage:true,animations:'disabled'});
    report.scenarios.push({...config,metrics,axRoles:[...roles].sort(),image:shot,jsErrors:pageErrors});
    await context.close();
    console.log('PASS '+config.id+' | scroll '+metrics.scrollWidth+'/'+metrics.clientWidth+' | AX roles verified | no API');
  }
  assert.equal(blockedApiRequests,0,'Zero /api/ requests, not even blocked paid calls');
  report.paidModelRequests=0;
  await writeFile(resolve(out,'a11y-reflow.json'),JSON.stringify(report,null,2));
  console.log('REFLOW AND AX TREE QA PASS — 3 widths, 3 screenshots, 0 model calls');
  console.log('Evidence: '+out);
}finally{
  await browser?.close();
  await new Promise(resolveServer=>server.close(resolveServer));
}
