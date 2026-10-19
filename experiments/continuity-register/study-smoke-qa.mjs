// Self-test of the survey instrument. DUMMY ANSWERS are never human evidence.
// From repository root:
//   node experiments/continuity-register/study-smoke-qa.mjs
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root=resolve(fileURLToPath(new URL('../../',import.meta.url)));
const output=resolve(root,'artifacts/trace-continuity-register/study-smoke-only.json');
const server=spawn(process.execPath,[resolve(root,'experiments/continuity-register/study-server.mjs')],{cwd:root,stdio:['ignore','pipe','pipe']});
let browser,stderr='';
server.stderr.on('data',d=>stderr+=String(d));
try{
  const host=await new Promise((ok,fail)=>{
    let log='';
    const timeout=setTimeout(()=>fail(new Error('Study server did not start: '+stderr)),14000);
    server.stdout.on('data',chunk=>{
      log+=String(chunk);
      const m=log.match(/http:\/\/127\.0\.0\.1:(\d+)\/experiments\/continuity-register\/study\.html/);
      if(m){clearTimeout(timeout);ok('http://127.0.0.1:'+m[1]);}
    });
    server.once('exit',code=>{clearTimeout(timeout);fail(new Error('Study server exited '+code+': '+stderr));});
  });
  browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHROMIUM_PATH?{executablePath:process.env.PLAYWRIGHT_CHROMIUM_PATH}:{})});
  const outputReport={classification:'AUTOMATED_STUDY_INSTRUMENT_SMOKE_ONLY_NO_HUMAN_REVIEWERS',results:[]};
  for(const reviewer of ['R1','R2']){
    const context=await browser.newContext({acceptDownloads:true,viewport:{width:1360,height:840},reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto(host+'/experiments/continuity-register/study.html?reviewer='+reviewer,{waitUntil:'load'});
    await page.waitForFunction(()=>document.querySelector('#serverGuard')?.textContent?.includes('vérifié'));
    await page.locator('#reviewer').selectOption(reviewer);
    await page.locator('#agree').check();
    await page.locator('#begin').click();
    const expected=reviewer==='R1'?['A','C']:['C','A'];
    for(let arm=0;arm<2;arm++){
      for(let t=0;t<4;t++){
        await page.waitForFunction(()=>!document.querySelector('#startTask').disabled);
        const iframe=page.frameLocator('#appFrame');
        assert.equal(await iframe.locator('#runBtn').isVisible(),false,'Live button must be hidden in both arms');
        assert.equal(await iframe.locator('#replayBtn').isVisible(),true,'Replay available');
        await page.locator('#startTask').click();
        await page.locator('#answer').fill('SYNTHETIC SMOKE ANSWER '+reviewer+' '+arm+' '+t);
        await page.locator('#mistakes').fill('0');
        await page.locator('#saveTask').click();
      }
      await page.locator('#ratings select').first().waitFor({state:'visible'});
      const ratings=page.locator('#ratings select');
      assert.equal(await ratings.count(),6,'All rating dimensions');
      for(let x=0;x<6;x++)await ratings.nth(x).selectOption('4');
      await page.locator('#comment').fill('SYNTHETIC_SMOKE_ONLY');
      await page.locator('#submitFeedback').click();
    }
    await page.locator('#done').waitFor({state:'visible'});
    const down=page.waitForEvent('download');
    await page.locator('#export').click();
    const download=await down;
    const file=await download.path();
    const json=JSON.parse(await readFile(file,'utf8'));
    assert.equal(json.reviewer,reviewer);
    assert.deepEqual(json.order,expected);
    assert.deepEqual(json.sessions.map(x=>x.arm),expected,'Counterbalance intact');
    for(const session of json.sessions){
      assert.equal(session.answers.length,4);
      assert.equal(Object.keys(session.ratings).length,6);
      for(const answer of session.answers){
        assert.ok(answer.elapsedSeconds>=0);
        assert.match(answer.answer,/SYNTHETIC SMOKE ANSWER/);
      }
    }
    assert.equal(json.metadata.server,'LOCAL_STATIC_ONLY');
    assert.notEqual(json.metadata.sourceCommit,'UNVERIFIED_SHA');
    const liveMeta=await page.evaluate(()=>fetch('/__trace_study_meta.json').then(r=>r.json()));
    assert.equal(liveMeta.blockedApiRequests,0,'No /api requests');
    outputReport.results.push({reviewer,armOrder:expected,taskCount:8,hasSixRatingsPerArm:true,apiRequests:0,download:download.suggestedFilename()});
    await context.close();
    console.log('PASS '+reviewer+' — 8 synthetic tasks, balanced order, file export, /api=0');
  }
  await mkdir(resolve(root,'artifacts/trace-continuity-register'),{recursive:true});
  await writeFile(output,JSON.stringify(outputReport,null,2));
  console.log('STUDY INSTRUMENT SMOKE PASS — no participants simulated as real users, no model spending');
  console.log('Output: '+output);
}finally{
  await browser?.close();
  server.kill('SIGINT');
}
