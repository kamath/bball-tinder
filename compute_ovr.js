const fs=require("fs");
let data=(new Function("return ("+fs.readFileSync("clean.json","utf8")+")"))();
const P=data.stats;
const z=(p,k)=>p[k]==null?0:p[k];
function pillarsRaw(p){return{
  impact:z(p,"tot_z"),
  scoring:0.5*z(p,"p_pts_100_z")+0.5*z(p,"p_tspct_z"),
  playmaking:z(p,"p_ast_100_z")-0.5*z(p,"p_tov_100_z"),
  rebounding:0.5*z(p,"p_orb_100_z")+0.5*z(p,"p_drb_100_z"),
  defense:0.5*z(p,"p_stl_100_z")+0.5*z(p,"p_blk_100_z")+0.5*z(p,"def_z"),
};}
const W={impact:0.40,scoring:0.18,playmaking:0.14,rebounding:0.12,defense:0.16};
const raws=P.map(pillarsRaw);
const comp=raws.map(pl=>{let c=0;for(const k in W)c+=W[k]*pl[k];return c;});
// --- 65..100 min-max normalization: worst player = 65, best = 100 ---
const FLOOR=65,SPAN=100-FLOOR;
const lo=(a)=>Math.min(...a),hi=(a)=>Math.max(...a);
const map5010=(v,mn,mx)=>Math.round(FLOOR+SPAN*(v-mn)/(mx-mn));
const cMin=lo(comp),cMax=hi(comp);
const pk=Object.keys(W);
const pr={};pk.forEach(k=>{const vals=raws.map(r=>r[k]);pr[k]=[lo(vals),hi(vals)];});
const sub=(k,v)=>map5010(v,pr[k][0],pr[k][1]);
const players=P.map((p,i)=>{
  const ovr=map5010(comp[i],cMin,cMax);
  const r=raws[i];
  return {
    id:p.player_id,n:p.player_name,t:p.team_alias,pos:p.position,age:p.age,
    ht:(()=>{const inch=parseInt(p.inches,10);return Math.floor(inch/12)+"-"+(inch%12);})(),
    ovr,
    sub:{SCO:sub("scoring",r.scoring),PLY:sub("playmaking",r.playmaking),REB:sub("rebounding",r.rebounding),DEF:sub("defense",r.defense),IMP:sub("impact",r.impact)},
    pts:+p.p_pts_100.toFixed(1),ast:+p.p_ast_100.toFixed(1),
    reb:+(p.p_orb_100+p.p_drb_100).toFixed(1),stl:+p.p_stl_100.toFixed(1),
    blk:+p.p_blk_100.toFixed(1),ts:+(p.p_tspct*100).toFixed(1),rapm:+p.tot.toFixed(1)
  };
});
fs.writeFileSync("players.json",JSON.stringify(players));
const ovrs=players.map(p=>p.ovr).sort((a,b)=>a-b);
const ranked=players.slice().sort((a,b)=>b.ovr-a.ovr);
console.log("OVR min/median/max:",ovrs[0],ovrs[Math.floor(ovrs.length/2)],ovrs[ovrs.length-1]);
console.log("TOP 6:",ranked.slice(0,6).map(r=>r.ovr+" "+r.n).join(" | "));
console.log("BOTTOM 4:",ranked.slice(-4).map(r=>r.ovr+" "+r.n).join(" | "));
