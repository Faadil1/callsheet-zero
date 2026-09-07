import fs from 'node:fs';
const file = process.argv[2] ?? 'src/video/narration-master.wav';
const b = fs.readFileSync(file); let p=12, fmt, data;
while(p+8<=b.length){const id=b.toString('ascii',p,p+4), n=b.readUInt32LE(p+4), s=p+8; if(id==='fmt ') fmt={channels:b.readUInt16LE(s+2),sampleRate:b.readUInt32LE(s+4),bitsPerSample:b.readUInt16LE(s+14)}; if(id==='data'){data={offset:s,bytes:n};break;} p=s+n+(n%2);}
if(!fmt||!data) throw new Error('WAV fmt/data chunk missing');
const blockAlign=fmt.channels*fmt.bitsPerSample/8, frames=data.bytes/blockAlign, duration=frames/fmt.sampleRate;
console.log(JSON.stringify({file,durationSeconds:duration,sampleRate:fmt.sampleRate,channels:fmt.channels,bitDepth:fmt.bitsPerSample,totalFrames:frames,dataBytes:data.bytes},null,2));
if(duration<94||duration>95) process.exitCode=2;
