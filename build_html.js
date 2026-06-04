const fs=require("fs");
const players=fs.readFileSync("players.json","utf8");
const teamColors=JSON.stringify({
ATL:"#E03A3E",BOS:"#007A33",BKN:"#000000",CHA:"#1D1160",CHI:"#CE1141",CLE:"#860038",
DAL:"#00538C",DEN:"#0E2240",DET:"#C8102E",GSW:"#1D428A",HOU:"#CE1141",IND:"#002D62",
LAC:"#C8102E",LAL:"#552583",MEM:"#5D76A9",MIA:"#98002E",MIL:"#00471B",MIN:"#0C2340",
NOP:"#0C2340",NYK:"#006BB6",OKC:"#007AC1",ORL:"#0077C0",PHI:"#006BB6",PHX:"#1D1160",
POR:"#E03A3E",SAC:"#5A2D81",SAS:"#C4CED4",TOR:"#CE1141",UTA:"#002B5C",WAS:"#002B5C"
});
const html=`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hardwood Draft — Build Your Lineup</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{--bg:#0b0e14;--card:#151a24;--card2:#1c2330;--accent:#4ea1ff;--gold:#ffd54a;--green:#3ddc84;--red:#ff5d6c;--muted:#7d8799}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:radial-gradient(1200px 600px at 50% -10%,#1a2740,#0b0e14 60%);color:#e8edf4;min-height:100vh;display:flex;flex-direction:column;align-items:center;padding:20px}
h1{font-size:26px;font-weight:800;letter-spacing:-.5px;margin-bottom:2px;background:linear-gradient(90deg,#ffd54a,#4ea1ff);-webkit-background-clip:text;background-clip:text;color:transparent}
.sub{color:var(--muted);font-size:13px;margin-bottom:18px}
.bar{display:flex;gap:8px;align-items:center;margin-bottom:16px;flex-wrap:wrap;justify-content:center}
.slot{width:46px;height:46px;border-radius:10px;background:var(--card);border:1.5px dashed #2c3545;display:flex;align-items:center;justify-content:center;font-size:11px;color:var(--muted);position:relative;overflow:hidden}
.slot.filled{border-style:solid;border-color:transparent;color:#fff;font-weight:700}
.slot .so{position:absolute;bottom:1px;right:3px;font-size:9px;color:var(--gold)}
.skips{margin-left:8px;font-size:13px;color:var(--muted)}
.skips b{color:var(--gold)}
.arena{display:flex;gap:18px;align-items:stretch;justify-content:center;flex-wrap:wrap;margin-bottom:10px}
.vs{display:flex;align-items:center;font-weight:800;color:var(--muted);font-size:18px}
.pcard{width:300px;background:linear-gradient(180deg,var(--card2),var(--card));border:1px solid #283041;border-radius:18px;padding:18px;cursor:pointer;transition:transform .12s,box-shadow .12s,border-color .12s;position:relative}
.pcard:hover{transform:translateY(-4px);box-shadow:0 14px 40px rgba(0,0,0,.5);border-color:var(--accent)}
.pcard:active{transform:scale(.99)}
.phead{display:flex;align-items:center;gap:12px;margin-bottom:14px}
.av{width:54px;height:54px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;color:#fff;flex-shrink:0;text-shadow:0 1px 2px rgba(0,0,0,.5)}
.pname{font-size:18px;font-weight:700;line-height:1.15}
.pmeta{font-size:12px;color:var(--muted);margin-top:2px}
.ovrwrap{margin-left:auto;text-align:center}
.ovr{font-size:34px;font-weight:900;line-height:1}
.ovrl{font-size:9px;color:var(--muted);letter-spacing:1px}
.subs{display:grid;grid-template-columns:repeat(5,1fr);gap:6px;margin:12px 0}
.scell{background:#10151e;border-radius:8px;padding:6px 2px;text-align:center}
.scell .v{font-weight:800;font-size:15px}
.scell .k{font-size:8px;color:var(--muted);letter-spacing:.5px}
.stats{display:grid;grid-template-columns:repeat(3,1fr);gap:4px;font-size:11px;color:#b9c3d1}
.stats div{background:#10151e;border-radius:6px;padding:5px;text-align:center}
.stats b{color:#fff;display:block;font-size:13px}
.pickhint{text-align:center;font-size:11px;color:var(--muted);margin-top:12px;opacity:.7}
.controls{display:flex;gap:10px;margin-top:6px}
button{font-family:inherit;border:none;border-radius:10px;padding:10px 18px;font-weight:700;cursor:pointer;font-size:14px;transition:opacity .12s,transform .1s}
button:active{transform:scale(.97)}
button:disabled{opacity:.35;cursor:not-allowed}
.skipbtn{background:#2a3242;color:#cdd6e3}
.resetbtn{background:transparent;color:var(--muted);border:1px solid #2c3545}
/* results */
#results{display:none;width:100%;max-width:760px}
.tovr{text-align:center;margin:8px 0 22px}
.tovr .big{font-size:64px;font-weight:900;background:linear-gradient(90deg,#ffd54a,#3ddc84);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1}
.tovr .lbl{color:var(--muted);font-size:13px;letter-spacing:1px}
.verdict{font-size:15px;margin-top:6px;font-weight:600}
.lineupgrid{display:grid;grid-template-columns:1fr;gap:8px;margin-bottom:22px}
.lrow{display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid #283041;border-radius:12px;padding:10px 14px}
.lrow .av{width:40px;height:40px;font-size:14px;border-radius:10px}
.lrow .ln{font-weight:700}.lrow .lm{font-size:11px;color:var(--muted)}
.lrow .lo{margin-left:auto;font-size:22px;font-weight:900}
.distbox{background:var(--card);border:1px solid #283041;border-radius:16px;padding:18px}
.distbox h3{font-size:14px;margin-bottom:4px}
.disti{font-size:12px;color:var(--muted);margin-bottom:14px}
.pctline{display:flex;justify-content:space-around;text-align:center;margin-bottom:16px}
.pctline .v{font-size:26px;font-weight:900;color:var(--gold)}
.pctline .k{font-size:10px;color:var(--muted);letter-spacing:.5px}
#hist{width:100%;height:160px;display:block}
.axis{display:flex;justify-content:space-between;font-size:10px;color:var(--muted);margin-top:4px}
.again{margin-top:20px;width:100%;background:linear-gradient(90deg,#4ea1ff,#3ddc84);color:#07111d}
.fade{animation:fade .25s ease}
@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
@media(max-width:680px){.arena{flex-direction:column}.vs{transform:rotate(90deg)}}
</style>
</head>
<body>
<h1>🏀 Hardwood Draft</h1>
<div class="sub">Pick the better player. Build a 5-man lineup. You get <b id="skipsub">3</b> skips.</div>

<div id="game">
  <div class="bar">
    <div id="slots"></div>
    <div class="skips">Skips left: <b id="skipsleft">3</b></div>
  </div>
  <div class="arena" id="arena"></div>
  <div class="pickhint">Tap a card to draft that player into your lineup</div>
  <div class="controls" style="justify-content:center;margin-top:14px">
    <button class="skipbtn" id="skipbtn" onclick="doSkip()">⟳ Skip both (new pair)</button>
    <button class="resetbtn" onclick="reset()">Reset</button>
  </div>
</div>

<div id="results"></div>

<script>
const PLAYERS=${players};
const TC=${teamColors};
const ovrColor=o=>o>=92?'#ffd54a':o>=84?'#3ddc84':o>=77?'#4ea1ff':o>=71?'#b9c3d1':'#7d8799';
function tcolor(t){return TC[t]||'#3a4356';}
function initials(n){const p=n.split(' ');return (p[0][0]+(p[p.length-1][0]||'')).toUpperCase();}

let lineup=[],skips=3,used=new Set(),pair=[];

function rnd(){return Math.floor(Math.random()*PLAYERS.length);}
function newPair(){
  let a,b;
  do{a=rnd();}while(used.has(PLAYERS[a].id));
  do{b=rnd();}while(b===a||used.has(PLAYERS[b].id));
  pair=[PLAYERS[a],PLAYERS[b]];
  render();
}
function cardHTML(p){
  const c=tcolor(p.t),tcol=p.t==='SAS'?'#111':'#fff';
  const subs=Object.entries(p.sub).map(([k,v])=>\`<div class="scell"><div class="v" style="color:\${ovrColor(v)}">\${v}</div><div class="k">\${k}</div></div>\`).join('');
  return \`<div class="pcard fade" onclick="pick('\${p.id}')">
    <div class="phead">
      <div class="av" style="background:\${c};color:\${tcol}">\${initials(p.n)}</div>
      <div><div class="pname">\${p.n}</div><div class="pmeta">\${p.t} · \${p.pos} · \${p.ht} · \${p.age}y</div></div>
      <div class="ovrwrap"><div class="ovr" style="color:\${ovrColor(p.ovr)}">\${p.ovr}</div><div class="ovrl">OVR</div></div>
    </div>
    <div class="subs">\${subs}</div>
    <div class="stats">
      <div><b>\${p.pts}</b>PTS/100</div><div><b>\${p.reb}</b>REB/100</div><div><b>\${p.ast}</b>AST/100</div>
      <div><b>\${p.stl}</b>STL</div><div><b>\${p.blk}</b>BLK</div><div><b>\${p.ts}%</b>TS</div>
    </div>
  </div>\`;
}
function render(){
  document.getElementById('arena').innerHTML=cardHTML(pair[0])+'<div class="vs">VS</div>'+cardHTML(pair[1]);
  document.getElementById('skipsleft').textContent=skips;
  document.getElementById('skipbtn').disabled=skips<=0;
  let s='';
  for(let i=0;i<5;i++){
    if(lineup[i]){const p=lineup[i],c=tcolor(p.t);s+=\`<div class="slot filled" style="background:\${c};color:\${p.t==='SAS'?'#111':'#fff'}" title="\${p.n}">\${initials(p.n)}<span class="so">\${p.ovr}</span></div>\`;}
    else s+=\`<div class="slot">\${i+1}</div>\`;
  }
  document.getElementById('slots').innerHTML=s;
}
function pick(id){
  const p=pair.find(x=>String(x.id)===String(id));
  lineup.push(p);used.add(p.id);
  if(lineup.length>=5){render();return finish();}
  newPair();
}
function doSkip(){if(skips<=0)return;skips--;newPair();}
function reset(){lineup=[];skips=3;used=new Set();document.getElementById('results').style.display='none';document.getElementById('game').style.display='block';newPair();}

// ---- lineup distribution via Monte Carlo over all possible 5-man lineups ----
function distribution(myAvg){
  const N=PLAYERS.length,ov=PLAYERS.map(p=>p.ovr),SAMPLES=120000;
  const samples=new Float64Array(SAMPLES);
  for(let s=0;s<SAMPLES;s++){
    const idx=new Set();
    while(idx.size<5)idx.add(Math.floor(Math.random()*N));
    let sum=0;idx.forEach(i=>sum+=ov[i]);
    samples[s]=sum/5;
  }
  let below=0;for(let s=0;s<SAMPLES;s++)if(samples[s]<myAvg)below++;
  const pct=below/SAMPLES*100;
  const sorted=Array.from(samples).sort((a,b)=>a-b);
  const min=sorted[0],max=sorted[sorted.length-1];
  // histogram
  const bins=40,counts=new Array(bins).fill(0),w=(max-min)/bins;
  sorted.forEach(v=>{let b=Math.min(bins-1,Math.floor((v-min)/w));counts[b]++;});
  return {pct,min,max,bins,counts,w,SAMPLES,below};
}
function finish(){
  const avg=lineup.reduce((a,p)=>a+p.ovr,0)/5;
  const d=distribution(avg);
  const rank=Math.round((1-d.pct/100)*d.SAMPLES)+1; // approx rank among sampled lineups
  const better=(100-d.pct);
  const verdict=d.pct>=99?'🏆 Championship-tier superteam':d.pct>=90?'🔥 Elite contender':d.pct>=70?'💪 Solid playoff lineup':d.pct>=40?'😐 Middle of the pack':'🪑 Rebuilding mode';
  const rows=lineup.slice().sort((a,b)=>b.ovr-a.ovr).map(p=>{const c=tcolor(p.t);return \`<div class="lrow"><div class="av" style="background:\${c};color:\${p.t==='SAS'?'#111':'#fff'}">\${initials(p.n)}</div><div><div class="ln">\${p.n}</div><div class="lm">\${p.t} · \${p.pos} · RAPM \${p.rapm}</div></div><div class="lo" style="color:\${ovrColor(p.ovr)}">\${p.ovr}</div></div>\`;}).join('');
  document.getElementById('game').style.display='none';
  const R=document.getElementById('results');R.style.display='block';
  R.innerHTML=\`<div class="fade">
    <div class="tovr"><div class="big">\${avg.toFixed(1)}</div><div class="lbl">TEAM OVERALL (avg of 5 OVR)</div><div class="verdict">\${verdict}</div></div>
    <div class="lineupgrid">\${rows}</div>
    <div class="distbox">
      <h3>Where your lineup ranks</h3>
      <div class="disti">vs \${d.SAMPLES.toLocaleString()} randomly-drafted 5-man lineups</div>
      <div class="pctline">
        <div><div class="v">\${d.pct.toFixed(1)}%</div><div class="k">PERCENTILE</div></div>
        <div><div class="v">#\${rank.toLocaleString()}</div><div class="k">APPROX RANK</div></div>
        <div><div class="v">\${better.toFixed(1)}%</div><div class="k">YOU BEAT</div></div>
      </div>
      <canvas id="hist"></canvas>
      <div class="axis"><span>\${d.min.toFixed(0)}</span><span>worse ◀ team OVR ▶ better</span><span>\${d.max.toFixed(0)}</span></div>
    </div>
    <button class="again" onclick="reset()">↻ Draft another lineup</button>
  </div>\`;
  // fix the third stat label/value
  drawHist(d,avg);
}
function drawHist(d,avg){
  const cv=document.getElementById('hist'),dpr=window.devicePixelRatio||1;
  const W=cv.clientWidth||700,H=160;cv.width=W*dpr;cv.height=H*dpr;
  const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);
  const maxc=Math.max(...d.counts),pad=8,bw=(W-pad*2)/d.bins;
  d.counts.forEach((c,i)=>{
    const h=(c/maxc)*(H-24),x=pad+i*bw,y=H-20-h;
    const binMid=d.min+(i+0.5)*d.w;
    ctx.fillStyle=binMid<=avg?'#2f3a4e':'#3ddc84';
    ctx.fillRect(x,y,Math.max(1,bw-1),h);
  });
  // marker line for my lineup
  const mx=pad+((avg-d.min)/(d.max-d.min))*(W-pad*2);
  ctx.strokeStyle='#ffd54a';ctx.lineWidth=2;ctx.setLineDash([4,3]);
  ctx.beginPath();ctx.moveTo(mx,4);ctx.lineTo(mx,H-18);ctx.stroke();ctx.setLineDash([]);
  ctx.fillStyle='#ffd54a';ctx.font='bold 11px sans-serif';ctx.textAlign='center';
  ctx.fillText('YOU '+avg.toFixed(1),Math.min(W-30,Math.max(30,mx)),14);
}
newPair();
</script>
</body>
</html>`;
fs.writeFileSync("index.html",html);
console.log("wrote index.html",fs.statSync("index.html").size,"bytes");
