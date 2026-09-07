import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { JSDOM } from 'jsdom';
import { canonical } from '../ui/canonical.js';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const source=readFileSync(new URL('../ui/continuity.js',import.meta.url),'utf8').replace("import { canonical } from './canonical.js';",'');
function setup({reduced=false,response=null,error=false}={}){
 const dom=new JSDOM(html,{url:'http://test.local',runScripts:'outside-only'}),w=dom.window;
 let calls=0;const timers=new Map();let timerId=0;
 w.canonical=structuredClone(canonical);w.matchMedia=()=>({matches:reduced,addEventListener(){}});
 w.setTimeout=fn=>{timers.set(++timerId,fn);return timerId};w.clearTimeout=id=>timers.delete(id);
 w.fetch=async(url,options)=>{calls++;assert.equal(url,'/api/run');assert.equal(options.method,'POST');if(error)throw Error('Controlled failure');return {ok:true,json:async()=>response}};
 w.eval(source);
 return {w,get:id=>w.document.getElementById(id),click:id=>w.document.getElementById(id).click(),step:i=>w.document.querySelector(`[data-step="${i}"]`).click(),calls:()=>calls,tick(){const [id,fn]=timers.entries().next().value;timers.delete(id);fn()},close:()=>w.close()};
}
const flush=()=>new Promise(r=>setImmediate(r));
test('all five captured stages preserve refusal, pending repair, final decision and never invoke live',()=>{
 const a=setup();a.click('replayBtn');assert.match(a.get('status').textContent,/3 agents/);a.click('playBtn');
 a.step(1);assert.equal(a.get('beforeDecision').textContent,'COMMIT REFUSED');assert.equal(a.get('afterDecision').textContent,'NOT COMMITTED');
 a.step(2);assert.equal(a.get('afterDecision').textContent,'REPAIR REQUESTED');
 a.step(3);assert.equal(a.get('revisionNumber').textContent,'02');assert.equal(a.get('afterDecision').textContent,'AWAITING COMMIT');
 a.step(4);assert.equal(a.get('afterDecision').textContent,'COMMIT ALLOWED');assert.match(a.get('beforeSummary').textContent,/3 historical/);assert.equal(a.get('afterSummary').textContent,'0 final conflicts');
 assert.match(a.get('afterRows').textContent,/S22Stage B18:00REPAIRED/);assert.equal(a.calls(),0);a.close();
});
test('reduced-motion starts paused; manual stepping remains usable',()=>{const a=setup({reduced:true});a.click('replayBtn');assert.match(a.get('status').textContent,/Paused/);assert.equal(a.get('playBtn').getAttribute('aria-label'),'Play replay');assert.equal(a.w.document.documentElement.dataset.reducedMotion,'true');a.click('nextBtn');assert.match(a.get('status').textContent,/COMMIT REFUSED/);a.close()});
test('playback advances to commit and pauses without timers leaking across restart',()=>{const a=setup();a.click('replayBtn');for(let i=0;i<4;i++)a.tick();assert.equal(a.get('playBtn').getAttribute('aria-label'),'Play replay');assert.match(a.get('status').textContent,/COMMIT ALLOWED/);a.click('replayBtn');assert.equal(a.get('revisionNumber').textContent,'01');a.close()});
test('global Enter does not request a live run',()=>{const a=setup();a.w.document.dispatchEvent(new a.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true}));assert.equal(a.calls(),0);a.close()});
test('fresh run uses its own counts and distinguishes simulation',async()=>{
 const response={...structuredClone(canonical),mode:'simulation',status:'complete',conflicts:[canonical.conflicts[0]],note:'Explicit preview fixture'};
 const a=setup({response});a.click('runBtn');await flush();assert.equal(a.calls(),1);assert.equal(a.get('viewMode').textContent,'SIMULATION RESULT');assert.equal(a.get('beforeSummary').textContent,'1 historical holds in this run');assert.equal(a.get('afterDecision').textContent,'PREVIEW COMMITTED');a.close();
});
test('a live result without a commit receipt cannot claim COMMIT ALLOWED',async()=>{
 const response={...structuredClone(canonical),mode:'live',status:'complete',timeline:[]};const a=setup({response});a.click('runBtn');await flush();assert.equal(a.get('afterDecision').textContent,'NO COMMIT RECEIPT');a.close();
});
test('failed run clears old success and replay remains available',async()=>{const a=setup({error:true});a.click('runBtn');await flush();assert.equal(a.get('afterDecision').textContent,'NO DECISION');assert.equal(a.get('viewMode').textContent,'RUN FAILED');assert.equal(a.get('replayBtn').disabled,false);a.click('replayBtn');assert.match(a.get('status').textContent,/VERIFIED REPLAY/);a.close()});
test('model output is rendered as text, not executable markup',async()=>{const response={...structuredClone(canonical),mode:'live',status:'complete'};response.finalPlan[0].location='<img src=x onerror=alert(1)>';const a=setup({response});a.click('runBtn');await flush();assert.match(a.get('afterRows').textContent,/<img src=x/);assert.equal(a.get('afterRows').querySelectorAll('[onerror]').length,0);a.close()});
