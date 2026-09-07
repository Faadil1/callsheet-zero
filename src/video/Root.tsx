import React from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, staticFile, useCurrentFrame} from 'remotion';
import receipt from '../../evidence/canonical-run.json' with {type: 'json'};
import './video.css';

const C = {mint:'#ACEED1', ink:'#073D31', paper:'#FCFEFC', red:'#AC263D', green:'#096747'};
const mono = {fontFamily:'ui-monospace, SFMono-Regular, Consolas, monospace'};
const narration = staticFile('narration-master.wav');
const capture = (name:string) => staticFile(`live-capture/${name}.png`);

function Frame({children, eyebrow='CONTINUITY DESK', tone=C.ink, captureName, captureLabel}:{children:React.ReactNode;eyebrow?:string;tone?:string;captureName?:string;captureLabel?:string}){
 const f=useCurrentFrame();
 if(captureName){
  return <AbsoluteFill className="capture-frame" style={{background:C.paper,color:C.ink}}>
   <img className="live-capture-full" src={capture(captureName)} />
   <div className="capture-top"><span className="wordmark">CALLSHEET ZERO</span><span className="eyebrow">{eyebrow}</span></div>
   {captureLabel&&<div className="capture-label">{captureLabel}</div>}
   <div className="capture-footer">REAL DEPLOYED PRODUCT · callsheet-zero.vercel.app</div>
  </AbsoluteFill>;
 }
 return <AbsoluteFill style={{background:C.mint,color:tone,padding:70}}><div className="top"><span className="wordmark">CALLSHEET ZERO</span><span className="eyebrow">{eyebrow}</span><span style={mono as any}>REV {f<150?'—':'01'}</span></div>{children}<div className="footer">CONCURRENT CONSTRAINT REPAIR · VERIFIED EVIDENCE WALKTHROUGH</div></AbsoluteFill>
}
function Title({text,sub}:{text:string;sub?:string}){return <div className="title"><h1>{text}</h1>{sub&&<p>{sub}</p>}</div>}
function Card({children,red=false,green=false}:{children:React.ReactNode;red?:boolean;green?:boolean}){return <div className={'card '+(red?'red ':'')+(green?'green':'')}>{children}</div>}
function Desk(){return <Frame><Title text="Three agents can all be right locally — and still produce an impossible shoot."/><div className="incident"><div><span className="eyebrow">PRODUCTION DISRUPTION</span><h2>Weather hold</h2><p>Courtyard exterior</p></div><div className="delay">Lead actor<br/><b>+90 min delay</b></div></div><div className="agents">{receipt.concurrency.agents.map((a)=><Card key={a}><span className="eyebrow">CONCURRENT</span><h3>{a}</h3><div className="pulse"/></Card>)}</div></Frame>}
function Concurrency(){return <Frame eyebrow="VERIFIED REPLAY" captureName="replay-1" captureLabel={`${(receipt.concurrency.threeWayOverlapMs/1000).toFixed(3)}s VERIFIED THREE-WAY OVERLAP`}><></></Frame>}
function Refusal(){return <Frame eyebrow="REV 01 · VERIFIED REPLAY" captureName="replay-2" captureLabel="COMMIT REFUSED · lead_actor · camera_a · van_1"><></></Frame>}
function Repair(){return <Frame eyebrow="TARGETED REPAIR · VERIFIED REPLAY" captureName="replay-3" captureLabel="repair.requested → Schedule Agent only"><></></Frame>}
function Allowed(){return <Frame eyebrow="REV 02 · VERIFIED REPLAY" captureName="replay-5" captureLabel="S22 16:30 → 18:00 · 0 conflicts · COMMIT ALLOWED"><></></Frame>}
function Modes(){return <Frame eyebrow="TRUTH BOUNDARY" captureName="03-live-result" captureLabel="RUN LIVE = fresh stochastic execution · VERIFIED REPLAY = captured evidence"><></></Frame>}
function Adaption(){return <Frame eyebrow="SECONDARY ASYNCHRONOUS LAYER" captureName="09-adaption" captureLabel="Verified repair → preference data · not in Run live"><></></Frame>}
function Closing(){return <Frame eyebrow="CONTINUITY DESK"><div className="closing"><span className="eyebrow">THE MEMORY HOOK</span><h1>Parallel decisions are easy.</h1><h2>CALLSHEET ZERO refuses the collisions they create — and repairs only what changed.</h2><div className="brand">CALLSHEET ZERO</div><p>Concurrent constraint repair for a world that won't wait.</p><small>callsheet-zero.vercel.app</small></div></Frame>}

// Sequence boundaries are aligned to the approved 94.294s narration master at 30 fps.
// The final 21 frames are a clean visual tail after narration ends.
export const Video=()=> <AbsoluteFill>
 <Audio src={narration}/>
 <Sequence from={0} durationInFrames={396}><Desk/></Sequence>
 <Sequence from={396} durationInFrames={546}><Concurrency/></Sequence>
 <Sequence from={942} durationInFrames={321}><Refusal/></Sequence>
 <Sequence from={1263} durationInFrames={198}><Repair/></Sequence>
 <Sequence from={1461} durationInFrames={360}><Allowed/></Sequence>
 <Sequence from={1821} durationInFrames={326}><Modes/></Sequence>
 <Sequence from={2147} durationInFrames={475}><Adaption/></Sequence>
 <Sequence from={2622} durationInFrames={228}><Closing/></Sequence>
</AbsoluteFill>;
export const RemotionRoot=()=> <Composition id="CallsheetZeroDemo" component={Video} durationInFrames={2850} fps={30} width={1920} height={1080}/>;
