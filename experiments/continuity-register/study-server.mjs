// TRACE two-reviewer A/C study — LOCAL ONLY; no provider calls, no tokens.
// From repository root: node experiments/continuity-register/study-server.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = resolve(fileURLToPath(new URL('../../',import.meta.url)));
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.ico':'image/x-icon','.png':'image/png'};
const gitSHA=()=>{
  try{return execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8',timeout:3000}).trim();}
  catch{return 'UNVERIFIED_SHA';}
};
let blocked=0;
const server=createServer(async(req,res)=>{
  const headers={
    'Cache-Control':'no-store',
    'X-Content-Type-Options':'nosniff',
    'Referrer-Policy':'no-referrer',
    'Content-Security-Policy':"default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self'; frame-src 'self'; form-action 'self'; object-src 'none'; base-uri 'self'"
  };
  try{
    const url=new URL(req.url||'/', 'http://127.0.0.1');
    if(url.pathname.startsWith('/api/')){
      blocked++;
      res.writeHead(503,{...headers,'Content-Type':'application/json'});
      return res.end(JSON.stringify({error:'study_no_provider_requests'}));
    }
    if(url.pathname==='/__trace_study_meta.json'){
      res.writeHead(200,{...headers,'Content-Type':'application/json'});
      return res.end(JSON.stringify({sourceCommit:gitSHA(),server:'LOCAL_STATIC_ONLY',blockedApiRequests:blocked,archivedReceipt:'2026-09-05'}));
    }
    let route=decodeURIComponent(url.pathname);
    if(route.endsWith('/'))route+='index.html';
    // Serve only the historical A/C study surfaces, fixture, and UI assets.
    // Never expose dotfiles, environment variables, repository metadata or
    // unrelated source files through the local human-review server.
    const allowed=route==='/index.html' ||
      route==='/evidence/canonical-run.json' ||
      (route.startsWith('/ui/') && /\.(css|js|svg|png|ico)$/.test(route)) ||
      ['/experiments/continuity-register/index.html',
       '/experiments/continuity-register/study.html',
       '/experiments/continuity-register/hybrid.css'].includes(route);
    if(!allowed){res.writeHead(403,headers);return res.end('Study-only route');}
    const filename=resolve(root,'.'+route);
    if(!filename.startsWith(root+sep)){
      res.writeHead(403,headers);return res.end('Forbidden');
    }
    const bytes=await readFile(filename);
    res.writeHead(200,{...headers,'Content-Type':types[extname(filename)]||'application/octet-stream'});
    res.end(bytes);
  }catch(err){
    res.writeHead(404,{...headers,'Content-Type':'text/plain'});
    res.end('Not found');
  }
});
await new Promise((ok,fail)=>{
  server.once('error',fail);
  server.listen(0,'127.0.0.1',ok);
});
const port=server.address().port;
console.log('TRACE Callsheet local study: archival replay ONLY; /api/* forcibly 503.');
console.log('Study R1 (A → C): http://127.0.0.1:'+port+'/experiments/continuity-register/study.html?reviewer=R1');
console.log('Study R2 (C → A): http://127.0.0.1:'+port+'/experiments/continuity-register/study.html?reviewer=R2');
console.log('Press Ctrl+C after both downloaded their anonymous JSON files.');
process.on('SIGINT',()=>server.close(()=>process.exit(0)));
