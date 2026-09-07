import { canonical } from './canonical.js';
const $ = id => document.getElementById(id);
const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const icon = {talent:'user',logistics:'truck',schedule:'calendar-blank'};
const order = {talent:0,logistics:1,schedule:2};
let step=4, playing=false, timer, busy=false, mode='snapshot';
const motionPreference=matchMedia('(prefers-reduced-motion: reduce)');
$('reduceMotion').checked=motionPreference.matches;
function stop(){clearTimeout(timer);playing=false;}
function status(text,error=false){$('status').textContent=text;$('status').classList.toggle('error',error);}
function decision(side,title,label,summary,state='pending'){
 $(side+'Title').textContent=title;$(side+'Decision').textContent=label;$(side+'Decision').className='decision '+state;$(side+'Summary').textContent=summary;
}
function rows(proposals,{conflicts=[],phase='before',reveal=false,committed=false}={}){
 if(!proposals.length)return '<tr><td class="empty-cell" colspan="5">Waiting for proposals.</td></tr>';
 return [...proposals].sort((a,b)=>(order[a.agentRole]??9)-(order[b.agentRole]??9)).map(p=>{
  const involved=conflicts.some(c=>c.leftRole===p.agentRole||c.rightRole===p.agentRole);
  const repaired=p.version>1;
  const cls=phase==='before'&&involved?'row-conflict':phase==='after'&&repaired?'row-repaired'+(reveal?' reveal':''):'unchanged';
  const label=phase==='before'?(involved?'HOLD':'PROPOSED'):(committed?(repaired?'REPAIRED':'KEPT'):'PROPOSED');
  const role=p.agentRole?.charAt(0).toUpperCase()+p.agentRole?.slice(1);
  return `<tr class="${cls}"><td><span class="role"><img src="/ui/${icon[p.agentRole]||'calendar-blank'}.svg" alt="">${escape(role)}</span></td><td>${escape(p.sceneId)}</td><td>${escape(p.location)}</td><td class="time">${escape(p.start)}</td><td class="row-status">${label}</td></tr>`;
 }).join('');
}
function receipts(events){$('receiptList').innerHTML=events.map(e=>`<li><time>${escape(e.at?.slice(11,23))} UTC</time><b>${escape(e.kind)}</b><span>${escape(e.label)}</span></li>`).join('');}
function controls(){
 $('playBtn').setAttribute('aria-label',playing?'Pause replay':'Play replay');$('playIcon').src='/ui/'+(playing?'pause':'play')+'.svg';
 $('prevBtn').disabled=busy||step===0;$('nextBtn').disabled=busy||step===4;$('playBtn').disabled=busy;
 $('replayBtn').disabled=busy;$('runBtn').disabled=busy;
 document.querySelectorAll('[data-step]').forEach(el=>{el.disabled=busy;el.removeAttribute('aria-current');if(Number(el.dataset.step)===step&&['snapshot','replay'].includes(mode))el.setAttribute('aria-current','step');});
}
function liveButton(active){
 const button=$('runBtn');
 button.setAttribute('aria-busy',String(active));
 button.innerHTML=active?'Running live…':'Run live <img src="/ui/arrow-right.svg" alt="">';
}
function showStep(next,{announce=true,reveal=false}={}){
 step=Math.max(0,Math.min(4,next));
 const initial=canonical.proposals.filter(p=>p.version===1);
 const hold=step>=1,repair=step>=3,final=step===4;
 $('sourceLabel').textContent='Captured';$('sourceDate').textContent='2026-09-05';$('sourceNote').textContent='No new model call';
 $('revisionNumber').textContent=repair?'02':'01';
 $('beforeProvenance').innerHTML='Historical proposals<br>Captured run · 2026-09-05';
 $('afterProvenance').innerHTML=final?'Committed shared state<br>Captured run · 2026-09-05':'Current replay step<br>Captured run · 2026-09-05';
 decision('before','REV 01',hold?'COMMIT REFUSED':'AGENTS STARTED',hold?'3 historical hard holds':'3 concurrent inference starts',hold?'refused':'pending');
 $('beforeRows').innerHTML=step===0?'<tr><td class="empty-cell" colspan="5">Schedule · Talent · Logistics<br>Three independent agents are running.</td></tr>':rows(initial,{conflicts:canonical.conflicts});
 decision('after',repair?'REV 02':'AWAITING REV 02',final?'COMMIT ALLOWED':repair?'AWAITING COMMIT':step===2?'REPAIR REQUESTED':'NOT COMMITTED',final?'0 final conflicts':repair?'Revised proposal received; Guard decision pending':step===2?'Schedule Agent only':'No final revision at this step',final?'':'pending');
 $('afterRows').innerHTML=repair?rows(canonical.finalPlan,{phase:'after',reveal,committed:final}):`<tr><td class="empty-cell" colspan="5">${step===2?'Schedule Agent is repairing S22.':step===1?'Three holds must clear before commit.':'Waiting for the Constraint Guard.'}</td></tr>`;
 $('holds').innerHTML=hold?'<strong>Historical holds:</strong><code>lead_actor · camera_a · van_1</code>':'<strong>Three agents.</strong> No conflict decision at this step.';
 $('changeTitle').innerHTML=repair?'S22 <span>16:30</span> <img src="/ui/arrow-right.svg" alt="to"> 18:00':step===2?'Repair only what changed.':step===1?'A revision on hold.':'One shared production day.';
 $('changeNote').textContent=step>=2?'repair.requested · Schedule Agent only':'A proposal is not a committed call sheet.';
 $('viewMode').textContent=mode==='snapshot'?'VERIFIED SNAPSHOT':'VIEWING VERIFIED REPLAY';
 $('viewSource').textContent='2026-09-05 · no new model call';
 $('concurrency').textContent='All three started before the first completion. 8.432s of three-way overlap.';
 $('starts').innerHTML=canonical.timeline.slice(0,3).map((e,i)=>`<div><dt>${e.at.slice(11,23)} UTC</dt><dd>${['Schedule','Talent','Logistics'][i]} started</dd></div>`).join('');
 $('modeExplanation').textContent='Replay walks through captured live receipts. Run live starts a fresh model execution and may produce a different repair.';
 receipts(canonical.timeline.slice(0,[4,9,11,12,13][step]));
 controls();
 if(announce)status('VERIFIED REPLAY · '+['3 agents started before the first completion.','REV 01 COMMIT REFUSED · lead_actor, camera_a, van_1.','repair.requested · Schedule Agent only.','REV 02 proposed · S22 at 18:00 · commit still pending.','REV 02 COMMIT ALLOWED · S22 at 18:00 · 0 final conflicts.'][step]+(playing?'':' Paused.'));
}
function schedule(){clearTimeout(timer);if(!playing)return;timer=setTimeout(()=>{if(step<4){if(step===3)playing=false;showStep(step+1,{reveal:true});schedule();}else{stop();controls();}},3200);}
function replay(){if(busy)return;stop();mode='replay';playing=!$('reduceMotion').checked;showStep(0);schedule();}
$('replayBtn').addEventListener('click',replay);
$('playBtn').addEventListener('click',()=>{if(busy)return;if(playing){stop();showStep(step);return;}mode='replay';playing=true;showStep(step===4?0:step);schedule();});
function selectStep(value){if(busy)return;stop();mode='replay';showStep(value,{reveal:true});}
$('prevBtn').addEventListener('click',()=>selectStep(step-1));$('nextBtn').addEventListener('click',()=>selectStep(step+1));
const stepButtons=[...document.querySelectorAll('[data-step]')];stepButtons.forEach((b,i)=>{b.addEventListener('click',()=>selectStep(i));b.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?4:Math.max(0,Math.min(4,i+(e.key==='ArrowRight'?1:-1)));stepButtons[n].focus();selectStep(n);});});
$('compareBtn').addEventListener('click',()=>{const active=$('comparison').classList.toggle('focus-change');$('compareBtn').setAttribute('aria-pressed',String(active));});
function reduceMotion(){document.documentElement.dataset.reducedMotion=String($('reduceMotion').checked);if($('reduceMotion').checked&&playing){stop();showStep(step);}}
$('reduceMotion').addEventListener('change',reduceMotion);motionPreference.addEventListener('change',e=>{$('reduceMotion').checked=e.matches;reduceMotion();});reduceMotion();
function renderRun(result){
 mode=result.mode==='live'?'live':'simulation';
 const isLive=mode==='live',prefix=isLive?'LIVE':'SIMULATION';
 const events=result.timeline||[],conflicts=result.conflicts||[],final=result.finalPlan||[],proposals=result.proposals||[];
 const committed=result.status==='complete'&&final.length>0&&events.some(e=>e.kind==='commit'||e.kind==='commit.complete');
 const concurrencyOk=Boolean(result.concurrencyProof?.allStartedBeforeFirstCompleted);
 const repaired=final.find(p=>p.version>1);
 const revisions=final.map(p=>Number(p.version)||1),rev=String(Math.max(1,...revisions)).padStart(2,'0');
 $('revisionNumber').textContent=committed?rev:'—';$('sourceLabel').textContent='Execution';$('sourceDate').textContent=prefix;$('sourceNote').textContent=isLive?'Fresh model run':'Preview only';
 $('beforeProvenance').textContent=prefix+' · current run';$('afterProvenance').textContent=prefix+' · current run';
 decision('before','RUN HISTORY',conflicts.length?'HOLDS DETECTED':'NO HOLDS RECORDED',`${conflicts.length} historical holds in this run`,conflicts.length?'refused':'pending');
 const canShowInitial=proposals.length>0&&!repaired&&proposals.every(p=>Number(p.version)===1);
 $('beforeRows').innerHTML=canShowInitial?rows(proposals,{conflicts,phase:'before'}):'<tr><td class="empty-cell" colspan="5">Initial revision not reconstructed.<br>Inspect this run’s receipts below.</td></tr>';
 $('holds').innerHTML=conflicts.length?'<strong>Historical resources:</strong><code>'+escape([...new Set(conflicts.map(c=>c.resource))].join(' · '))+'</code>':'No historical resource hold recorded.';
 decision('after',committed?'REV '+rev:'CURRENT RUN',committed?(isLive?'COMMIT ALLOWED':'PREVIEW COMMITTED'):'NO COMMIT RECEIPT',committed?'0 final conflicts':'Final state not verified',committed?'':'pending');
 $('afterRows').innerHTML=rows(final,{phase:'after',committed});
 $('changeTitle').textContent=committed?(repaired?`${repaired.sceneId} · ${repaired.start}`:'Committed without repair.'):'No decision yet.';
 $('changeNote').textContent=result.note||(repaired?'Revised proposal from this run.':committed?'Fresh live proposals were already conflict-free; no targeted repair was needed.':'No targeted repair recorded.');
 $('viewMode').textContent=prefix+' RESULT';$('viewSource').textContent=isLive?'Fresh execution · current receipts':'Explicit preview · not live evidence';
 $('concurrency').textContent=(isLive?'':'SIMULATION · ')+(result.concurrencyProof?.explanation||'Concurrency proof unavailable.');
 const starts=Object.entries(result.concurrencyProof?.agentInferenceStarts||{});
 $('starts').innerHTML=starts.map(([name,iso])=>`<div><dt>${escape(String(iso).slice(11,23))} UTC</dt><dd>${escape(name)} started</dd></div>`).join('');
 $('modeExplanation').textContent=(result.note||'')+(result.note?' ':'')+'Replay verified repair returns to the canonical captured evidence.';
 receipts(events);
 const outcome=committed?'COMMIT ALLOWED':'No commit receipt';
 const overlap=concurrencyOk?'3 agents overlapped · ':'';
 status(`${prefix} COMPLETE · ${overlap}${conflicts.length} historical hold${conflicts.length===1?'':'s'} · ${outcome}.${repaired?' Targeted repair recorded.':committed?' No repair required.':''}`);
}
$('runBtn').addEventListener('click',async()=>{
 if(busy)return;stop();busy=true;mode='live';liveButton(true);controls();
 $('revisionNumber').textContent='—';$('sourceLabel').textContent='Execution';$('sourceDate').textContent='LIVE';$('sourceNote').textContent='Mozaik agents running';
 $('viewMode').textContent='LIVE RUNNING';$('viewSource').textContent='Waiting for current Mozaik receipts';
 decision('before','CURRENT RUN','AGENTS RUNNING','Fresh model execution in progress');decision('after','CURRENT RUN','NOT COMMITTED','Waiting for Constraint Guard');
 $('beforeRows').innerHTML=rows([]);$('afterRows').innerHTML=rows([]);$('beforeProvenance').textContent='New live execution';$('afterProvenance').textContent='No decision yet';
 $('holds').textContent='No receipts received yet.';$('changeTitle').textContent='Three agents are running.';$('changeNote').textContent='Waiting for the fresh Mozaik execution to return current receipts.';$('concurrency').textContent='Live inference is in progress.';$('starts').innerHTML='';receipts([]);status('LIVE RUNNING · Three Mozaik agents are responding. A fresh model run can take several seconds.');
 try{const response=await fetch('/api/run',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});const data=await response.json();if(!response.ok)throw new Error(data.message||data.error||'Run failed');renderRun(data);}
 catch(error){mode='error';decision('after','CURRENT RUN','NO DECISION','Run failed before a verified commit');$('viewMode').textContent='RUN FAILED';$('viewSource').textContent='No verified result';$('sourceDate').textContent='FAILED';$('sourceNote').textContent='Replay remains available';$('changeTitle').textContent='No result committed.';$('changeNote').textContent='Replay verified evidence or retry the live run.';status('RUN FAILED · '+error.message,true);}
 finally{busy=false;liveButton(false);controls();}
});
liveButton(false);
showStep(4,{announce:false});
