import {spawnSync} from 'node:child_process'; import ffmpegPath from 'ffmpeg-static';
const root='C:/Users/fboussari/callsheet-zero', out=`${root}/src/video/narration-master.wav`;
const files=['1(1).m4a','2(1).m4a','3(1).m4a','4(1).m4a','5(1).m4a'].map(x=>`C:/Users/fboussari/Downloads/${x}`);
const segs=[[[1.60,4.56],[4.96,6.56],[6.64,7.36],[7.44,8.80],[9.04,12.00],[12.16,15.76]],[[8.88,10.24],[10.24,15.12],[15.12,21.335],[22.055,26.775],[27.575,28.615]],[[7.68,9.04],[9.12,10.48],[10.56,11.68],[12.495,13.215],[13.295,14.575],[14.895,15.775],[15.775,18.015],[18.415,20.175],[24.575,27.535],[28.149,31.749]],[[.56,2.00],[2.08,3.76],[3.84,4.56],[4.88,6.48],[6.48,8.48],[8.72,10.08],[10.32,12.48],[12.80,13.84]],[[.64,3.76],[3.84,5.84],[6.48,7.36],[7.36,10.08],[10.24,12.40],[14.655,18.175],[18.175,19.615],[19.615,20.575],[20.895,24.735],[24.735,25.535],[26.94,30.86],[31.18,32.54],[35.74,42.619]]];
const args=['-y']; const labels=[]; let n=0;
files.forEach((f,i)=>segs[i].forEach(s=>{args.push('-i',f); labels.push(`[${n++}:a]atrim=start=${s[0]}:end=${s[1]},asetpts=PTS-STARTPTS`)}));
args.push('-filter_complex',`${labels.map((x,i)=>`${x}[a${i}]`).join(';')};${labels.map((_,i)=>`[a${i}]`).join('')}concat=n=${labels.length}:v=0:a=1,highpass=f=70,lowpass=f=14500,acompressor=threshold=-18dB:ratio=2:attack=5:release=80,loudnorm=I=-16:TP=-1.5:LRA=11[a]`,'-map','[a]','-ar','48000','-ac','2',out);
const r=spawnSync(ffmpegPath,args,{stdio:'inherit'}); if(r.status!==0) process.exit(r.status); console.log(out);

