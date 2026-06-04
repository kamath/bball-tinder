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
<title>Hardwood Draft — Build the Best NBA Starting Five</title>
<meta name="description" content="Pick the better player, build a 5-man starting lineup, then see how it ranks against every possible team — and which rival fives would beat you. NBA data by Dunks & Threes.">
<meta name="theme-color" content="#e2521b">
<!-- Social / link previews (iMessage, Twitter/X, Slack, Discord, Facebook). Update the absolute URL if not hosted on GitHub Pages. -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Hardwood Draft">
<meta property="og:title" content="🏀 Hardwood Draft — Build the Best NBA Starting Five">
<meta property="og:description" content="Pick the better player, build a 5-man lineup, then see how it ranks against every possible team — and which rival fives would beat you.">
<meta property="og:url" content="https://kamath.github.io/bball-tinder/">
<meta property="og:image" content="https://kamath.github.io/bball-tinder/og-image.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Hardwood Draft — pick the better player, build a five, see who beats you.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="🏀 Hardwood Draft — Build the Best NBA Starting Five">
<meta name="twitter:description" content="Pick the better player, build a 5-man lineup, then see who beats you. NBA data by Dunks & Threes.">
<meta name="twitter:image" content="https://kamath.github.io/bball-tinder/og-image.png">
<meta name="twitter:image:alt" content="Hardwood Draft — pick the better player, build a five, see who beats you.">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%8F%80%3C/text%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anton&family=Archivo:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
:root{
  --paper:#f2e7d2; --paper2:#ece0c7; --ink:#16130f; --ink2:#3b342a;
  --orange:#e2521b; --amber:#c8852b; --green:#1c7c54; --blue:#2e6ba8;
  --wood:#d9c6a1; --line:#16130f; --muted:#8a7e68;
  --shadow:6px 6px 0 var(--ink);
}
html{-webkit-text-size-adjust:100%}
body{
  font-family:'Archivo',-apple-system,sans-serif;
  background:var(--paper); color:var(--ink); min-height:100vh;
  padding:24px 16px 64px; position:relative; overflow-x:hidden;
  line-height:1.4;
}
/* halftone + grain atmosphere */
body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;
  background-image:radial-gradient(circle at 1px 1px,rgba(22,19,15,.16) 1px,transparent 1.6px);
  background-size:5px 5px;opacity:.35;mix-blend-mode:multiply}
body::after{content:'';position:fixed;inset:0;pointer-events:none;z-index:0;opacity:.5;mix-blend-mode:multiply;
  background:
    radial-gradient(900px 420px at 50% -8%,rgba(226,82,27,.10),transparent 70%),
    radial-gradient(700px 500px at 100% 110%,rgba(28,124,84,.08),transparent 70%);}
.frame{max-width:980px;margin:0 auto;position:relative;z-index:1}

/* ---------- MASTHEAD ---------- */
.masthead{text-align:center;margin-bottom:26px}
.rule{height:3px;background:var(--ink);margin:0}
.rule.thin{height:1.5px;margin:5px 0}
.rule.double{height:7px;border-top:3px solid var(--ink);border-bottom:3px solid var(--ink);background:transparent;margin:5px 0 0}
.mast-row{display:flex;align-items:center;justify-content:center;gap:18px;padding:10px 0 4px}
.mast-side{font-family:'DM Mono',monospace;font-size:11px;letter-spacing:2px;color:var(--ink2);text-transform:uppercase;white-space:nowrap}
.title{font-family:'Anton',sans-serif;font-weight:400;letter-spacing:-.5px;line-height:.82;
  font-size:clamp(40px,9vw,92px);text-transform:uppercase;
  background:linear-gradient(180deg,var(--ink) 60%,var(--ink2));-webkit-background-clip:text;background-clip:text;color:transparent;
  text-shadow:3px 3px 0 rgba(226,82,27,.22)}
.dek{font-family:'DM Mono',monospace;font-size:clamp(10px,2.4vw,13px);letter-spacing:clamp(1px,1vw,5px);
  text-transform:uppercase;color:var(--orange);font-weight:500;margin-top:9px}
/* ---------- START / DIFFICULTY PICKER ---------- */
#start{text-align:center;animation:fade .4s ease both;padding-top:8px}
.wordmark{font-family:'Anton';font-weight:400;font-size:clamp(28px,7vw,46px);text-transform:uppercase;letter-spacing:.5px;line-height:.9;
  margin:6px 0 22px;background:linear-gradient(180deg,var(--ink) 55%,var(--orange));-webkit-background-clip:text;background-clip:text;color:transparent;
  text-shadow:2px 2px 0 rgba(226,82,27,.18)}
.start-q{font-family:'DM Mono';font-size:12px;text-transform:uppercase;letter-spacing:3px;color:var(--orange);margin:0 0 16px}
.modecards{display:grid;grid-template-columns:1fr 1fr;gap:18px;max-width:720px;margin:0 auto}
.modecard{font-family:inherit;text-align:left;background:var(--paper);border:3px solid var(--ink);box-shadow:var(--shadow);
  padding:20px;cursor:pointer;display:flex;flex-direction:column;gap:11px;transition:transform .14s,box-shadow .14s}
.modecard:hover{transform:translate(-2px,-3px) rotate(-.5deg);box-shadow:10px 12px 0 var(--ink)}
.modecard:active{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink)}
.modecard.ball{background:var(--ink)}
.mc-tag{font-family:'Anton';font-weight:400;font-size:clamp(26px,6vw,34px);text-transform:uppercase;letter-spacing:.5px;line-height:.88;color:var(--orange)}
.mc-d{font-family:'Archivo';font-size:12.5px;font-weight:500;line-height:1.45;color:var(--ink2)}
.modecard.ball .mc-d{color:var(--wood)}
.mc-go{margin-top:auto;font-family:'Anton';font-weight:400;font-size:14px;letter-spacing:1.5px;text-transform:uppercase;
  background:var(--orange);color:#fff;padding:9px;text-align:center}

/* ---------- ROSTER / DRAFT BOARD ---------- */
.board{background:var(--paper2);border:3px solid var(--ink);box-shadow:var(--shadow);
  padding:14px 16px;margin:26px 0 0}
.board-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px;
  border-bottom:2px dashed var(--ink);padding-bottom:8px}
.board-head .lbl{font-family:'Anton',sans-serif;font-size:18px;letter-spacing:.5px;text-transform:uppercase}
.clock{font-family:'DM Mono',monospace;font-size:12px;text-transform:uppercase;letter-spacing:1px}
.clock b{color:var(--orange);font-size:15px}
.slots{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.slot{aspect-ratio:1/1.12;border:2px solid var(--ink);background:var(--paper);
  display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;
  position:relative;overflow:hidden}
.slot .pk{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:1px;color:var(--muted)}
.slot .empty{font-family:'Anton';font-size:26px;color:var(--wood)}
.slot.filled{color:#fff;border-color:var(--ink)}
.slot.filled .ini{font-family:'Anton';font-size:clamp(18px,4.4vw,30px);line-height:1;text-shadow:0 1px 2px rgba(0,0,0,.35)}
.slot.filled .so{font-family:'DM Mono';font-size:11px;font-weight:500;background:var(--ink);color:var(--paper);
  padding:1px 5px;margin-top:3px}
.slot.pop{animation:pop .35s cubic-bezier(.2,1.4,.4,1)}
@keyframes pop{0%{transform:scale(.4) rotate(-6deg);opacity:0}100%{transform:none;opacity:1}}

/* ---------- ARENA (the matchup) ---------- */
.matchline{text-align:center;font-family:'DM Mono',monospace;font-size:11px;letter-spacing:3px;
  text-transform:uppercase;color:var(--ink2);margin:0 0 12px}
.arena{display:grid;grid-template-columns:1fr auto 1fr;gap:14px;align-items:center;margin-bottom:18px}
.vsmed{width:60px;height:60px;border-radius:50%;border:3px solid var(--ink);background:var(--orange);
  color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Anton';font-size:24px;
  box-shadow:var(--shadow);transform:rotate(-6deg);flex-shrink:0}

/* trading card */
.pcard{background:var(--paper);border:3px solid var(--ink);box-shadow:var(--shadow);
  cursor:pointer;position:relative;overflow:hidden;
  transition:transform .14s ease,box-shadow .14s ease}
.pcard:hover{transform:translate(-2px,-3px) rotate(-.6deg);box-shadow:10px 12px 0 var(--ink)}
.pcard:active{transform:translate(2px,2px);box-shadow:3px 3px 0 var(--ink)}
.cardtop{display:flex;justify-content:space-between;align-items:center;padding:6px 12px;
  background:var(--tc);color:var(--tctxt);border-bottom:3px solid var(--ink)}
.cardtop .pos{font-family:'Anton';font-size:15px;letter-spacing:1px}
.cardtop .team{font-family:'DM Mono';font-size:12px;font-weight:500;letter-spacing:2px}
.cardbody{padding:14px 14px 12px;position:relative}
.crow{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.avatar{width:58px;height:58px;border:3px solid var(--ink);background:var(--tc);color:var(--tctxt);
  display:flex;align-items:center;justify-content:center;font-family:'Anton';font-size:24px;flex-shrink:0;
  box-shadow:3px 3px 0 rgba(22,19,15,.25)}
.nameblock{flex:1;min-width:0}
.pname{font-family:'Anton';font-size:clamp(17px,3.6vw,22px);line-height:.95;text-transform:uppercase;letter-spacing:.2px}
.pmeta{font-family:'DM Mono';font-size:10.5px;color:var(--ink2);margin-top:4px;letter-spacing:.4px}
.ovrstamp{position:absolute;top:8px;right:10px;text-align:center;transform:rotate(5deg)}
.ovrstamp b{font-family:'Anton';font-size:46px;line-height:.8;display:block}
.ovrstamp span{font-family:'DM Mono';font-size:9px;letter-spacing:3px;color:var(--ink2)}
.statsbox{margin:0}
.statsbox>summary{list-style:none;cursor:pointer;user-select:none;font-family:'DM Mono';font-size:9.5px;letter-spacing:1.5px;
  text-transform:uppercase;color:var(--ink2);padding:9px 0 5px;display:flex;align-items:center;gap:6px;border-top:2px solid var(--ink)}
.statsbox>summary::-webkit-details-marker{display:none}
.statsbox>summary::before{content:'▸';color:var(--orange);font-size:11px}
.statsbox[open]>summary::before{content:'▾'}
.statsbox>summary:hover{color:var(--ink)}
.pillars{display:grid;gap:5px;margin:6px 0 12px}
.pillars .mkrow{grid-template-columns:30px 1fr 22px;gap:6px}
.pillars .mk-k{font-size:8.5px}
.pillars .mk-seg{height:9px;border-width:1px}
.pillars .mk-v{font-size:13px}
.boxscore{border-top:2px solid var(--ink);padding-top:8px;font-family:'DM Mono';font-size:11px;color:var(--ink2);
  display:grid;grid-template-columns:1fr 1fr 1fr;gap:3px 8px}
.boxscore b{color:var(--ink);font-weight:500}
.picktag{display:block;width:100%;border:none;cursor:pointer;text-align:center;font-family:'Anton';font-weight:400;
  font-size:14px;letter-spacing:2px;padding:10px 7px;background:var(--ink);color:var(--paper);text-transform:uppercase;transition:background .14s}
.pcard:hover .picktag,.picktag:hover,.picktag:focus-visible{background:var(--orange);outline:none}

/* ---------- CONTROLS ---------- */
.controls{display:flex;gap:12px;justify-content:center;margin-top:6px;flex-wrap:wrap}
.btn{font-family:'Anton';letter-spacing:1px;text-transform:uppercase;font-size:14px;
  border:3px solid var(--ink);background:var(--paper);color:var(--ink);padding:11px 22px;cursor:pointer;
  box-shadow:4px 4px 0 var(--ink);transition:transform .1s,box-shadow .1s,background .12s}
.btn:hover{background:var(--wood)}
.btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.btn:disabled{opacity:.4;cursor:not-allowed;box-shadow:4px 4px 0 var(--ink)}
.btn.primary{background:var(--orange);color:#fff}
.btn.primary:hover{background:#c8410f}
a.btn{text-decoration:none;display:inline-flex;align-items:center;justify-content:center;gap:6px}
.ghbar{display:flex;gap:12px;justify-content:center;margin-top:44px;flex-wrap:wrap}
.credit{text-align:center;font-family:'DM Mono';font-size:10px;color:var(--muted);margin-top:16px;letter-spacing:1px;line-height:1.7}
.credit a{color:var(--orange);text-decoration:none;border-bottom:1px solid var(--orange)}
.pickhint{text-align:center;font-family:'DM Mono';font-size:11px;color:var(--muted);margin:14px 0 4px;letter-spacing:1px}

/* ---------- RESULTS · ONE SHAREABLE CARD ---------- */
#results{display:none}
.shothint{text-align:center;font-family:'DM Mono';font-size:10px;letter-spacing:1.5px;text-transform:uppercase;
  color:var(--muted);margin-bottom:12px}
.sharewrap{display:flex;justify-content:center}
.sharecard{width:100%;max-width:600px;border:3px solid var(--ink);box-shadow:var(--shadow);
  background:var(--paper);position:relative;overflow:hidden}
.sharecard::before{content:'';position:absolute;inset:0;pointer-events:none;
  background-image:radial-gradient(circle at 1px 1px,rgba(22,19,15,.14) 1px,transparent 1.6px);background-size:5px 5px;opacity:.3;mix-blend-mode:multiply}
.sc-head{display:flex;justify-content:space-between;align-items:center;padding:9px 16px;
  background:var(--ink);color:var(--paper);font-family:'DM Mono';font-size:10.5px;letter-spacing:2px;text-transform:uppercase}
.sc-head b{font-family:'Anton';font-weight:400;letter-spacing:1px;font-size:15px}
.sc-head .o{color:var(--orange)}
.sc-body{padding:20px 20px 0;position:relative}
.modebadge{display:flex;align-items:center;gap:11px;border:3px solid var(--ink);padding:10px 14px;margin-bottom:18px}
.modebadge .mb-ic{font-size:24px;line-height:1;flex-shrink:0}
.mb-txwrap{display:flex;flex-direction:column;gap:2px;min-width:0}
.modebadge .mb-tx{font-family:'Anton';font-weight:400;text-transform:uppercase;letter-spacing:.5px;line-height:.9}
.modebadge .mb-sub{font-family:'DM Mono';font-size:9.5px;letter-spacing:1px;text-transform:uppercase}
/* I Know Ball: a loud, earned medal */
.modebadge.ball{background:var(--ink);box-shadow:5px 5px 0 var(--orange);transform:rotate(-.8deg)}
.modebadge.ball .mb-tx{font-size:clamp(22px,5.5vw,30px);color:var(--orange)}
.modebadge.ball .mb-sub{color:var(--wood)}
.modebadge.ball .mb-flex{margin-left:auto;flex-shrink:0;font-family:'Anton';font-weight:400;font-size:13px;letter-spacing:1px;
  text-transform:uppercase;color:var(--ink);background:var(--gold,#e8b23a);padding:4px 9px;transform:rotate(2deg)}
/* Easy: modest, muted */
.modebadge.easy{background:var(--paper2)}
.modebadge.easy .mb-tx{font-size:17px;color:var(--ink2)}
.modebadge.easy .mb-sub{color:var(--muted)}
.hero{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:center}
.hero-score{text-align:center}
.hero-score .kicker{font-family:'DM Mono';font-size:10.5px;letter-spacing:3px;text-transform:uppercase;color:var(--orange)}
.hero-score .big{font-family:'Anton';font-weight:400;font-size:clamp(58px,14vw,96px);line-height:1.06;padding:6px 0 2px;
  background:linear-gradient(176deg,var(--ink) 36%,var(--orange));-webkit-background-clip:text;background-clip:text;color:transparent}
.hero-score .lbl{font-family:'DM Mono';font-size:9.5px;letter-spacing:1.5px;color:var(--ink2);text-transform:uppercase}
.hero-team{border:2px solid var(--ink);background:var(--paper2)}
.htrow{display:flex;align-items:center;gap:8px;padding:6px 9px;border-bottom:2px solid var(--ink)}
.htrow:last-child{border-bottom:none}
.htrow .ha{width:27px;height:27px;border:1.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Anton';font-weight:400;font-size:12px;flex-shrink:0}
.htrow .hn{font-family:'Archivo';font-size:11px;font-weight:700;text-transform:uppercase;line-height:1;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.htrow .ho{font-family:'DM Mono';font-size:13px;font-weight:500;margin-left:auto;flex-shrink:0}
.verdict{font-family:'Anton';font-weight:400;font-size:clamp(19px,4.6vw,28px);text-transform:uppercase;margin-top:14px;letter-spacing:.5px;
  display:inline-block;border:3px solid var(--ink);padding:5px 16px;background:var(--wood);transform:rotate(-1.4deg);box-shadow:3px 3px 0 var(--ink)}
.sc-sub{display:flex;align-items:center;gap:10px;margin:22px 0 10px}
.sc-sub .n{font-family:'DM Mono';font-size:11px;color:var(--orange);letter-spacing:1px}
.sc-sub h3{font-family:'Anton';font-weight:400;font-size:17px;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.sc-sub .ln{flex:1;height:2px;background:var(--ink)}
.mk{border:2px solid var(--ink);background:var(--paper2);padding:12px 14px;display:grid;gap:8px}
.mkrow{display:grid;grid-template-columns:74px 1fr 28px;align-items:center;gap:10px}
.mk-k{font-family:'DM Mono';font-size:9.5px;text-transform:uppercase;letter-spacing:.5px;color:var(--ink2)}
.mk-bar{display:flex;gap:3px}
.mk-seg{flex:1;height:14px;border:1.5px solid var(--ink);background:var(--paper)}
.mk .mk-seg.on{transform-origin:bottom;animation:segpop .32s cubic-bezier(.2,1.3,.4,1) both}
.mk.noanim .mk-seg.on{animation:none}
.board-sub{font-family:'DM Mono';font-size:10px;text-transform:uppercase;letter-spacing:1.5px;color:var(--ink2);margin:16px 0 9px;border-top:2px dashed var(--ink);padding-top:11px}
.mk-empty{font-family:'DM Mono';font-size:11px;color:var(--muted);text-align:center;padding:8px 4px;letter-spacing:.4px}
@keyframes segpop{from{opacity:0;transform:scaleY(.2)}to{opacity:1;transform:none}}
.mk-v{font-family:'Anton';font-weight:400;font-size:18px;text-align:right;line-height:1}
.rankrow{display:grid;grid-template-columns:1fr 1.4fr;gap:8px;margin-bottom:14px}
.pctcell .of{font-family:'Anton';font-weight:400;color:var(--ink2);font-size:.62em}
.tape{display:grid;grid-template-columns:repeat(5,1fr);border:2px solid var(--ink)}
.tchip{padding:9px 4px;text-align:center;border-right:2px solid var(--ink);display:flex;flex-direction:column;align-items:center;gap:5px}
.tchip:last-child{border-right:none}
.tchip .cav{width:34px;height:34px;border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Anton';font-size:14px}
.tchip .cn{font-family:'Archivo';font-size:9.5px;font-weight:700;line-height:1.05;text-transform:uppercase}
.tchip .cvo{font-family:'DM Mono';font-size:11px;font-weight:500;background:var(--ink);color:var(--paper);padding:0 6px}
.sc-foot{margin-top:18px;padding:9px 16px;border-top:3px solid var(--ink);background:var(--paper2);position:relative;
  font-family:'DM Mono';font-size:9.5px;letter-spacing:1px;color:var(--ink2);text-align:center;text-transform:uppercase}

.sec-head{display:flex;align-items:center;gap:12px;margin:30px 0 14px}
.sec-head .num{font-family:'DM Mono';font-size:12px;color:var(--orange);letter-spacing:1px}
.sec-head h2{font-family:'Anton';font-size:clamp(22px,5vw,34px);text-transform:uppercase;letter-spacing:.5px;white-space:nowrap}
.sec-head .ln{flex:1;height:3px;background:var(--ink)}

/* roster box-score table */
.roster{border:3px solid var(--ink);box-shadow:var(--shadow);background:var(--paper);overflow:hidden}
.lrow{display:flex;align-items:center;gap:12px;padding:11px 14px;border-bottom:2px solid var(--ink)}
.lrow:last-child{border-bottom:none}
.lrow .av{width:42px;height:42px;border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;
  font-family:'Anton';font-size:18px;flex-shrink:0}
.lrow .ln{font-family:'Anton';font-size:18px;text-transform:uppercase;line-height:1}
.lrow .lm{font-family:'DM Mono';font-size:10.5px;color:var(--ink2);margin-top:2px;letter-spacing:.4px}
.lrow .lo{margin-left:auto;font-family:'Anton';font-size:30px}
.lrow .lo small{font-family:'DM Mono';font-size:9px;color:var(--ink2);display:block;letter-spacing:2px;text-align:right}

/* distribution */
.distbox{border:3px solid var(--ink);box-shadow:var(--shadow);background:var(--paper);padding:18px}
.distbox h3{font-family:'Anton';font-size:18px;text-transform:uppercase;letter-spacing:.5px}
.disti{font-family:'DM Mono';font-size:11px;color:var(--ink2);margin:3px 0 14px;letter-spacing:.4px}
.pctline{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px}
.pctcell{border:2px solid var(--ink);padding:10px 6px;text-align:center;background:var(--paper2)}
.pctcell .v{font-family:'Anton';font-size:clamp(24px,6vw,34px);line-height:1;color:var(--orange)}
.pctcell .k{font-family:'DM Mono';font-size:9px;letter-spacing:1.5px;color:var(--ink2);text-transform:uppercase;margin-top:3px}
#hist{width:100%;height:140px;display:block}
.axis{display:flex;justify-content:space-between;font-family:'DM Mono';font-size:10px;color:var(--ink2);margin-top:6px;letter-spacing:.4px}

/* ---------- CHALLENGERS ---------- */
.chal-intro{font-family:'DM Mono';font-size:11px;color:var(--ink2);margin:-2px 0 12px;letter-spacing:.3px}
.chal{border:2px solid var(--ink);background:var(--paper);margin-bottom:12px;position:relative;overflow:hidden}
.chal-top{display:flex;align-items:center;gap:12px;padding:9px 14px;background:var(--ink);color:var(--paper)}
.chal-rank{font-family:'Anton';font-size:30px;line-height:.8;color:var(--orange);flex-shrink:0}
.chal-titles{flex:1;min-width:0}
.chal-label{font-family:'Anton';font-size:20px;text-transform:uppercase;letter-spacing:.5px;line-height:1}
.chal-blurb{font-family:'DM Mono';font-size:10.5px;color:var(--wood);margin-top:3px;letter-spacing:.3px}
.chal-score{text-align:right;flex-shrink:0}
.chal-score .cv{font-family:'Anton';font-size:34px;line-height:.85;color:var(--paper)}
.chal-score .cm{font-family:'DM Mono';font-size:11px;color:var(--orange);font-weight:500;margin-top:2px}
.chal-stat{display:flex;align-items:center;gap:10px;padding:6px 12px;background:var(--wood);
  border-bottom:2px solid var(--ink);font-family:'DM Mono';font-size:10px;text-transform:uppercase;letter-spacing:.5px;flex-wrap:wrap}
.chal-stat.slight{background:var(--paper2)}
.cs-tag{font-weight:500;color:var(--ink)}
.chal-stat.slight .cs-delta{margin-left:auto}
.cs-kl{font-weight:500;color:var(--green);border:1.5px solid var(--green);padding:0 5px}
.cs-cmp{color:var(--ink2);margin-left:auto}
.cs-cmp b{color:var(--ink);font-weight:500}
.cs-delta{font-family:'Anton';font-weight:400;font-size:15px;color:var(--orange);background:var(--ink);padding:1px 8px 0;letter-spacing:1px}
.chal-roster{display:grid;grid-template-columns:repeat(5,1fr);gap:0}
.chip{padding:9px 6px;text-align:center;border-right:2px solid var(--ink);display:flex;flex-direction:column;align-items:center;gap:5px}
.chip:last-child{border-right:none}
.chip .cav{width:34px;height:34px;border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;
  font-family:'Anton';font-size:13px;color:#fff}
.chip .cn{font-family:'Archivo';font-size:10px;font-weight:700;line-height:1.05;text-transform:uppercase}
.chip .ct{font-family:'DM Mono';font-size:8.5px;color:var(--ink2);letter-spacing:.5px}
.chip .cvo{font-family:'DM Mono';font-size:11px;font-weight:500;background:var(--ink);color:var(--paper);padding:0 6px}
.goat{border:3px solid var(--ink);box-shadow:var(--shadow);background:var(--green);color:#fff;text-align:center;
  padding:22px;margin-bottom:16px}
.goat .gh{font-family:'Anton';font-size:clamp(24px,6vw,40px);text-transform:uppercase;letter-spacing:1px}
.goat .gp{font-family:'DM Mono';font-size:12px;margin-top:6px;letter-spacing:.5px}

.fade{animation:fade .4s ease both}
@keyframes fade{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.stagger>*{opacity:0;animation:fade .5s ease forwards}

@media(max-width:760px){
  .arena{grid-template-columns:1fr;gap:10px}
  .vsmed{margin:0 auto;transform:rotate(-6deg)}
  .arena>.pcard:last-child{order:3}
  .chal-roster{grid-template-columns:repeat(5,1fr)}
  .chip .cn{font-size:8.5px}
}
@media(max-width:520px){
  .hero{grid-template-columns:1fr;gap:14px}
  .modecards{grid-template-columns:1fr}
  .chal-roster{grid-template-columns:repeat(5,1fr)}
  .chip{padding:7px 2px}
  .chip .cav{width:28px;height:28px;font-size:11px}
  .chip .ct{display:none}
}
</style>
</head>
<body>
<div class="frame">

  <div id="start">
    <div class="wordmark">🏀 Hardwood Draft</div>
    <p class="start-q">Pick your difficulty</p>
    <div class="modecards">
      <button class="modecard" onclick="startGame('easy')">
        <span class="mc-tag">Easy</span>
        <span class="mc-d">Scrubs filtered out — you'll mostly weigh real rotation players. Good for casual fans.</span>
        <span class="mc-go">Tip Off ▶</span>
      </button>
      <button class="modecard ball" onclick="startGame('ball')">
        <span class="mc-tag">I Know Ball</span>
        <span class="mc-d">Raw uniform draw — every one of 602 players, deep-bench filler included. For sickos only.</span>
        <span class="mc-go">Tip Off ▶</span>
      </button>
    </div>
  </div>

  <div id="game" style="display:none">
    <div class="arena" id="arena"></div>
    <p class="pickhint">▲ Tap a card to draft that player ▲</p>
    <div class="controls">
      <button class="btn" id="skipbtn" onclick="doSkip()">⟳ Skip Both · <b id="skipsleft">3</b> left</button>
      <button class="btn" onclick="reset()">Reset Board</button>
    </div>

    <div class="board">
      <div class="board-head">
        <span class="lbl">Your Five</span>
        <span class="clock">Squad ratings update live</span>
      </div>
      <div class="slots" id="slots"></div>
      <div class="board-sub">Team Squad Ratings · Live</div>
      <div class="mk noanim" id="livemk"></div>
    </div>
  </div>

  <section id="results"></section>

  <div class="ghbar">
    <a class="btn" href="https://github.com/kamath/bball-tinder#readme" target="_blank" rel="noopener">📖 How It Works</a>
    <a class="btn primary" href="https://github.com/kamath/bball-tinder" target="_blank" rel="noopener">★ Star on GitHub</a>
  </div>
  <p class="credit">
    602 players · 2026 season · OVR built from RAPM impact + box-score z-scores<br>
    Stats &amp; ratings courtesy of <a href="https://dunksandthrees.com/" target="_blank" rel="noopener">Dunks &amp; Threes</a>
  </p>
</div>

<script>
const PLAYERS=${players};
const TC=${teamColors};
const POSNAME={PG:'PG',SG:'SG',SF:'SF',PF:'PF',C:'C'};
const ovrColor=o=>o>=95?'#e2521b':o>=88?'#c8852b':o>=80?'#1c7c54':o>=73?'#2e6ba8':'#7d6f59';
function tcolor(t){return TC[t]||'#3a4356';}
function txtOn(hex){const c=hex.replace('#','');const r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);return (0.299*r+0.587*g+0.114*b)>150?'#16130f':'#fff';}
// last name ignoring generational suffixes (Jr/Sr/II/III/IV/V) — "Dereck Lively II" → "Lively"
function lastName(n){const p=n.trim().split(/\\s+/);let i=p.length-1;while(i>0&&/^(jr|sr|ii|iii|iv|v)\\.?$/i.test(p[i]))i--;return p[i];}
function initials(n){const p=n.trim().split(/\\s+/);if(p.length===1)return p[0].slice(0,2).toUpperCase();const l=lastName(n);return ((p[0][0]||'')+(l[0]||'')).toUpperCase();}
// Mario-Kart-style segmented rating bar — shared by player cards and the team Squad Ratings
function segBar(label,val,seg){
  const col=ovrColor(val),filled=Math.max(0,Math.min(seg,Math.round(val/100*seg)));
  let s='';for(let i=0;i<seg;i++)s+=\`<span class="mk-seg\${i<filled?' on':''}"\${i<filled?\` style="background:\${col};animation-delay:\${i*.03}s"\`:''}></span>\`;
  return \`<div class="mkrow"><span class="mk-k">\${label}</span><span class="mk-bar">\${s}</span><span class="mk-v" style="color:\${col}">\${val}</span></div>\`;
}

let lineup=[],skips=3,used=new Set(),pair=[];
let easyMode=true; // Easy = skill-weighted draw (fewer bums); "I Know Ball" = raw uniform draw
let statsOpen=window.innerWidth>760; // card ratings/stats expanded by default on desktop, collapsed on mobile

// Easy-mode draw weighting (I Know Ball mode ignores this and draws uniformly):
//  • a logistic FLOOR — 1/(1+e^-((OVR-73)/2)) — saturates at ~1 for rotation-caliber players and up and
//    decays only for the bottom, so it suppresses "bums" without inflating the OVR tail.
//  • a TOP-3-ON-TEAM boost (×2.5) — each franchise's three best players are recognizable faces, so they
//    surface far more often (P(top-3-on-team) ≈ 23% → ~43%), making Easy mode feel like real basketball.
const DRAFT_MID=73, DRAFT_STEEP=2, TOP3_BOOST=2.5;
const TEAMRANK=(()=>{ // 0-based rank of each player within their own team by OVR
  const byTeam={};PLAYERS.forEach((p,i)=>{(byTeam[p.t]=byTeam[p.t]||[]).push(i);});
  const rank=new Array(PLAYERS.length).fill(99);
  Object.values(byTeam).forEach(ix=>{ix.sort((a,b)=>PLAYERS[b].ovr-PLAYERS[a].ovr);ix.forEach((idx,r)=>rank[idx]=r);});
  return rank;
})();
const PWEIGHT=PLAYERS.map((p,i)=>(1/(1+Math.exp(-(p.ovr-DRAFT_MID)/DRAFT_STEEP)))*(TEAMRANK[i]<3?TOP3_BOOST:1));
const PCUM=(()=>{let a=0;return PWEIGHT.map(w=>(a+=w));})();
const PTOT=PCUM[PCUM.length-1];
function rnd(){
  if(!easyMode)return Math.floor(Math.random()*PLAYERS.length); // I Know Ball: raw uniform draw
  const r=Math.random()*PTOT;let lo=0,hi=PCUM.length-1; // Easy: weighted index via binary search over cumulative weights
  while(lo<hi){const mid=(lo+hi)>>1;if(PCUM[mid]<r)lo=mid+1;else hi=mid;}
  return lo;
}
function startGame(m){
  easyMode=(m==='easy');
  lineup=[];skips=3;used=new Set();
  document.getElementById('start').style.display='none';
  document.getElementById('results').style.display='none';
  document.getElementById('game').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
  newPair();
}
function newPair(){
  let a,b;
  do{a=rnd();}while(used.has(PLAYERS[a].id));
  do{b=rnd();}while(b===a||used.has(PLAYERS[b].id));
  pair=[PLAYERS[a],PLAYERS[b]];
  render();
}
function cardHTML(p){
  const c=tcolor(p.t),tcol=txtOn(c);
  const pills=Object.entries(p.sub).map(([k,v])=>segBar(k,v,10)).join('');
  return \`<article class="pcard fade" onclick="pick('\${p.id}')" style="--tc:\${c};--tctxt:\${tcol}">
    <div class="cardtop"><span class="pos">\${p.pos}</span><span class="team">\${p.t}</span></div>
    <div class="cardbody">
      <div class="ovrstamp"><b style="color:\${ovrColor(p.ovr)}">\${p.ovr}</b><span>OVR</span></div>
      <div class="crow">
        <div class="avatar">\${initials(p.n)}</div>
        <div class="nameblock">
          <div class="pname">\${p.n}</div>
          <div class="pmeta">\${p.ht} · \${p.age} YRS · RAPM \${p.rapm>=0?'+':''}\${p.rapm}</div>
        </div>
      </div>
      <details class="statsbox" \${statsOpen?'open':''} ontoggle="statsOpen=this.open">
        <summary onclick="event.stopPropagation()">Ratings &amp; Stats</summary>
        <div class="pillars">\${pills}</div>
        <div class="boxscore">
          <span><b>\${p.pts}</b> PTS</span><span><b>\${p.reb}</b> REB</span><span><b>\${p.ast}</b> AST</span>
          <span><b>\${p.stl}</b> STL</span><span><b>\${p.blk}</b> BLK</span><span><b>\${p.ts}%</b> TS</span>
        </div>
      </details>
    </div>
    <button class="picktag" onclick="event.stopPropagation();pick('\${p.id}')">Draft \${lastName(p.n)} ▶</button>
  </article>\`;
}
function render(){
  document.getElementById('arena').innerHTML=cardHTML(pair[0])+'<div class="vsmed">VS</div>'+cardHTML(pair[1]);
  document.getElementById('skipsleft').textContent=skips;
  document.getElementById('skipbtn').disabled=skips<=0;
  let s='';
  for(let i=0;i<5;i++){
    if(lineup[i]){const p=lineup[i],c=tcolor(p.t),tcol=txtOn(c);
      s+=\`<div class="slot filled pop" style="background:\${c};color:\${tcol}" title="\${p.n}"><span class="pk" style="color:\${tcol};opacity:.7">PICK 0\${i+1}</span><span class="ini">\${initials(p.n)}</span><span class="so">\${p.ovr} OVR</span></div>\`;}
    else s+=\`<div class="slot"><span class="pk">PICK 0\${i+1}</span><span class="empty">?</span></div>\`;
  }
  document.getElementById('slots').innerHTML=s;
  // live Squad Ratings for the lineup drafted so far
  const lm=document.getElementById('livemk');
  if(!lineup.length)lm.innerHTML='<div class="mk-empty">Draft your first player to start building your squad ratings →</div>';
  else lm.innerHTML=PK.map(k=>segBar(PLBL[k],Math.round(lineup.reduce((a,p)=>a+p.sub[k],0)/lineup.length),14)).join('');
}
function pick(id){
  const p=pair.find(x=>String(x.id)===String(id));
  lineup.push(p);used.add(p.id);
  if(lineup.length>=5){render();return setTimeout(finish,420);}
  newPair();
}
function doSkip(){if(skips<=0)return;skips--;newPair();}
function reset(){ // back to the difficulty picker — choose a mode to start a fresh draft
  lineup=[];skips=3;used=new Set();
  document.getElementById('game').style.display='none';
  document.getElementById('results').style.display='none';
  document.getElementById('start').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});}

// ---- Monte Carlo: where the user's team OVR sits in the field ----
function analyze(myAvg){
  const N=PLAYERS.length,ov=PLAYERS.map(p=>p.ovr),SAMPLES=160000;
  const all=new Float64Array(SAMPLES);
  let below=0,min=Infinity,max=-Infinity;
  for(let s=0;s<SAMPLES;s++){
    const set=new Set();const idx=[];
    while(set.size<5){const r=(Math.random()*N)|0;if(!set.has(r)){set.add(r);idx.push(r);}}
    let sum=0;for(const i of idx)sum+=ov[i];
    const avg=sum/5;all[s]=avg;
    if(avg<myAvg)below++;
    if(avg<min)min=avg;if(avg>max)max=avg;
  }
  const pct=below/SAMPLES*100;
  const sorted=Array.from(all).sort((a,b)=>a-b);
  const lo=sorted[0],hi=sorted[sorted.length-1];
  const bins=44,counts=new Array(bins).fill(0),w=(hi-lo)/bins||1;
  for(const v of sorted){let b=Math.min(bins-1,Math.floor((v-lo)/w));counts[b]++;}
  return {pct,min:lo,max:hi,bins,counts,w,SAMPLES};
}

// ---- build rival lineups that beat you BY ATTACKING YOUR WEAKNESSES ----
const avgOvr=t=>t.reduce((a,p)=>a+p.ovr,0)/t.length;
// real position slots — every five fills C / PF / SF / SG / PG (scarce spots first)
const SLOTS=[
  p=>p.pos.includes('C'),                            // C
  p=>p.pos[0]==='F'||p.pos==='C-F',                  // PF
  p=>p.pos==='F'||p.pos==='G-F'||p.pos==='F-G',      // SF / wing
  p=>p.pos[0]==='G',                                 // SG
  p=>p.pos[0]==='G'                                  // PG
];
// weighted random pick from a score-sorted shortlist — favors the top but lets gems through
function wpick(sorted){
  let total=0;const w=sorted.map((_,i)=>Math.pow(sorted.length-i,1.7));
  w.forEach(x=>total+=x);let r=Math.random()*total;
  for(let i=0;i<sorted.length;i++){r-=w[i];if(r<=0)return sorted[i];}
  return sorted[sorted.length-1];
}
const PK=['SCO','PLY','REB','DEF','IMP'];
const PLBL={SCO:'Scoring',PLY:'Playmaking',REB:'Size',DEF:'Defense',IMP:'Impact'};
const META={
  SCO:{name:'Scoring',title:'The Bucket-Getters',verb:'pours it in from all three levels'},
  PLY:{name:'Playmaking',title:'The Playmakers',verb:'carves any defense apart'},
  REB:{name:'Size',title:'The Skyscrapers',verb:'owns both backboards'},
  DEF:{name:'Defense',title:'The Lockdown Unit',verb:'suffocates every possession'},
  IMP:{name:'Two-Way Impact',title:'The Difference-Makers',verb:'tilts the entire floor'}
};
const pillarVec=t=>PK.map(k=>t.reduce((a,p)=>a+p.sub[k],0)/t.length);
// turn a pillar vector into a probability distribution (Laplace-smoothed so KL stays finite)
const distOf=v=>{const e=1e-6,s=v.reduce((a,b)=>a+b,0)+e*v.length;return v.map(x=>(x+e)/s);};
// a DYNAMIC, believable starting five (one per slot), sampled OVR-led with a tilt toward pillar k.
// gates only on quality: must clear your team OVR (else returns its strongest attempt).
function buildBalanced(k,tilt,myAvg){
  const POOL=16,score=p=>p.ovr+(k?(p.sub[k]/100)*tilt:0);
  const lists=SLOTS.map(ok=>PLAYERS.filter(ok).sort((a,b)=>score(b)-score(a)));
  let fallback=null;
  for(let att=0;att<60;att++){
    const used=new Set(),team=[];let ok=true;
    for(const list of lists){
      const pool=[];for(const p of list){if(!used.has(p.id)){pool.push(p);if(pool.length>=POOL)break;}}
      if(!pool.length){ok=false;break;}
      const p=wpick(pool);used.add(p.id);team.push(p);
    }
    if(!ok||team.length<5)continue;
    if(avgOvr(team)>myAvg)return team;
    if(!fallback||avgOvr(team)>avgOvr(fallback))fallback=team;
  }
  return fallback;
}
// DYNAMIC, attainable fives drawn from players near YOUR level — they only edge past your OVR, not blow it out.
function buildSlightTeams(myAvg,exclude,n){
  const lo=myAvg-12,hi=myAvg+8;
  const bands=SLOTS.map(ok=>{let l=PLAYERS.filter(p=>ok(p)&&p.ovr>=lo&&p.ovr<=hi);if(l.length<4)l=PLAYERS.filter(ok);return l;});
  const sig=arr=>arr.map(p=>p.id).slice().sort((a,b)=>a-b).join(',');
  const found=new Map();
  for(let att=0;att<700 && found.size<30;att++){
    const used=new Set(),team=[];let ok=true;
    for(const l of bands){const av=l.filter(p=>!used.has(p.id));if(!av.length){ok=false;break;}const p=av[(Math.random()*av.length)|0];used.add(p.id);team.push(p);}
    if(!ok)continue;
    const m=avgOvr(team)-myAvg;
    if(m>0.1 && m<=4){const s=sig(team);if(!exclude.has(s)&&!found.has(s))found.set(s,{team,margin:m,sig:s});}
  }
  return [...found.values()].sort((a,b)=>a.margin-b.margin).slice(0,n);
}
// Two flavors of rival: (1) KL weakness-exploiters — way-better fives whose strengths land on your thin
// spots, ranked by D(Q‖P)=Σ Qᵢ·log(Qᵢ/Pᵢ); (2) slight edges — realistic fives that just nudge past your OVR.
function buildChallengers(myAvg,userIds,lineup){
  const userSig=userIds.slice().sort((a,b)=>a-b).join(',');
  const sig=arr=>arr.map(p=>p.id).slice().sort((a,b)=>a-b).join(',');
  const userVec=pillarVec(lineup),P=distOf(userVec);
  // ---- KL weakness-exploiters ----
  const tilts=[20,45,70,100],seen=new Set([userSig]),cands=[];
  for(let r=0;r<90 && cands.length<150;r++){
    const k=PK[r%PK.length],tilt=tilts[(Math.floor(r/PK.length))%tilts.length];
    const t=buildBalanced(k,tilt,myAvg);
    if(!t||avgOvr(t)<=myAvg)continue;
    const s=sig(t);if(seen.has(s))continue;seen.add(s);
    const vec=pillarVec(t),Q=distOf(vec);
    const contrib=PK.map((kk,i)=>Q[i]*Math.log(Q[i]/P[i]));
    const kl=contrib.reduce((a,b)=>a+b,0);
    let bi=-1,bv=0;contrib.forEach((c,i)=>{if(Q[i]>P[i]&&vec[i]>userVec[i]&&c>bv){bv=c;bi=i;}});
    if(bi<0)continue;
    cands.push({team:t,sig:s,kl,vec,domI:bi});
  }
  cands.sort((a,b)=>b.kl-a.kl);
  const exploit=[],usedK=new Set();
  for(const distinct of [true,false]){
    for(const c of cands){
      if(exploit.length>=2)break;
      const k=PK[c.domI];
      if(distinct&&usedK.has(k))continue;
      if(exploit.some(o=>o.sig===c.sig))continue;
      const m=META[k],them=c.vec[c.domI],you=userVec[c.domI];
      exploit.push({kind:'exploit',
        players:c.team.slice().sort((x,y)=>y.ovr-x.ovr),
        avg:avgOvr(c.team),margin:avgOvr(c.team)-myAvg,sig:c.sig,
        label:m.title,weakName:m.name,
        blurb:\`KL-divergence flags your \${m.name.toLowerCase()} — this five \${m.verb}.\`,
        them:Math.round(them),you:Math.round(you),diff:Math.round(them-you),kl:c.kl});
      usedK.add(k);
    }
  }
  // ---- slight edges (attainable rivals) ----
  const exclude=new Set([userSig,...exploit.map(e=>e.sig)]);
  const sl=['The Squeaker','The Slight Edge'];
  const slight=buildSlightTeams(myAvg,exclude,2).map((st,i)=>({
    kind:'slight',
    players:st.team.slice().sort((x,y)=>y.ovr-x.ovr),
    avg:avgOvr(st.team),margin:st.margin,sig:st.sig,
    label:sl[i]||'The Rival',
    blurb:\`A realistic five that just nudges past your team OVR.\`
  }));
  // closest margins first: the squeakers, then the blowout exploiters
  return [...slight,...exploit].sort((a,b)=>a.margin-b.margin);
}

function finish(){
  const avg=lineup.reduce((a,p)=>a+p.ovr,0)/5;
  const userIds=lineup.map(p=>p.id);
  const d=analyze(avg);
  const challengers=buildChallengers(avg,userIds,lineup);
  const rank=Math.round((1-d.pct/100)*d.SAMPLES)+1;
  const verdict=d.pct>=99?'🏆 Championship Superteam':d.pct>=90?'🔥 Elite Contender':d.pct>=70?'💪 Playoff Lineup':d.pct>=40?'😐 Middle Of The Pack':'🪑 Rebuilding Mode';
  // prominent difficulty badge — "I Know Ball" reads like an earned medal; Easy stays modest
  const flex = !easyMode && d.pct>=80 ? '<span class="mb-flex">★ Earned blind ★</span>' : '';
  const modeBadge = easyMode
    ? \`<div class="modebadge easy"><span class="mb-ic">🟢</span><div class="mb-txwrap"><span class="mb-tx">Easy Mode</span><span class="mb-sub">Assisted draw · scrubs filtered out</span></div></div>\`
    : \`<div class="modebadge ball"><span class="mb-ic">🏀</span><div class="mb-txwrap"><span class="mb-tx">I Know Ball</span><span class="mb-sub">No assists · raw 1-in-602 draw</span></div>\${flex}</div>\`;

  const teamRows=lineup.slice().sort((a,b)=>b.ovr-a.ovr).map(p=>{const c=tcolor(p.t),tcol=txtOn(c);
    return \`<div class="htrow"><div class="ha" style="background:\${c};color:\${tcol}">\${initials(p.n)}</div>
      <div class="hn">\${p.n}</div>
      <div class="ho" style="color:\${ovrColor(p.ovr)}">\${p.ovr}</div></div>\`;}).join('');

  // Mario-Kart-style team ratings across the five pillars
  const mkHTML=PK.map(k=>segBar(PLBL[k],Math.round(lineup.reduce((a,p)=>a+p.sub[k],0)/5),14)).join('');

  let challHTML;
  if(challengers.length===0){
    challHTML=\`<div class="goat fade"><div class="gh">🐐 Nobody Beats This</div>
      <div class="gp">No five on the board posts a higher team OVR. You drafted the ceiling.</div></div>\`;
  }else{
    challHTML='<p class="chal-intro">Rivals that beat you — the squeakers just edge ahead, the rest weaponize your weak spots (flagged by KL-divergence). Closest first.</p>'+
    challengers.map((ch,ci)=>{
      const chips=ch.players.map(p=>{const c=tcolor(p.t);return \`<div class="chip">
        <div class="cav" style="background:\${c};color:\${txtOn(c)}">\${initials(p.n)}</div>
        <div class="cn">\${lastName(p.n)}</div>
        <div class="ct">\${p.t} · \${p.pos}</div>
        <div class="cvo">\${p.ovr}</div></div>\`;}).join('');
      const statBand = ch.kind==='exploit'
        ? \`<div class="chal-stat">
            <span class="cs-tag">▸ Exploits \${ch.weakName}</span>
            <span class="cs-kl" title="KL-divergence of pillar distributions vs your five">D·KL \${ch.kl.toFixed(3)}</span>
            <span class="cs-cmp">You <b>\${ch.you}</b> → Them <b>\${ch.them}</b></span>
            <span class="cs-delta">+\${ch.diff}</span>
          </div>\`
        : \`<div class="chal-stat slight">
            <span class="cs-tag">▸ Barely better — an attainable five</span>
            <span class="cs-delta">+\${ch.margin.toFixed(1)}</span>
          </div>\`;
      return \`<div class="chal">
        <div class="chal-top">
          <span class="chal-rank">0\${ci+1}</span>
          <div class="chal-titles"><div class="chal-label">\${ch.label}</div><div class="chal-blurb">\${ch.blurb}</div></div>
          <div class="chal-score"><div class="cv">\${ch.avg.toFixed(1)}</div><div class="cm">+\${ch.margin.toFixed(1)} OVR</div></div>
        </div>
        \${statBand}
        <div class="chal-roster">\${chips}</div>
      </div>\`;
    }).join('');
  }

  document.getElementById('game').style.display='none';
  const R=document.getElementById('results');R.style.display='block';
  R.innerHTML=\`<div class="fade">
    <p class="shothint">📸 Screenshot the card below to share</p>
    <div class="sharewrap"><div class="sharecard" id="sharecard">
      <div class="sc-head"><b>🏀 Hardwood Draft</b><span class="o">\${easyMode?'Easy Mode':'I Know Ball'} · '26</span></div>
      <div class="sc-body">
        \${modeBadge}
        <div class="hero">
          <div class="hero-score">
            <div class="kicker">Final Team OVR</div>
            <div class="big" id="bigovr">0.0</div>
            <div><span class="verdict">\${verdict}</span></div>
          </div>
          <div class="hero-team">\${teamRows}</div>
        </div>

        <div class="sc-sub"><span class="n">§ 01</span><h3>Squad Ratings</h3><span class="ln"></span></div>
        <div class="mk">\${mkHTML}</div>

        <div class="sc-sub"><span class="n">§ 02</span><h3>Where You Rank</h3><span class="ln"></span></div>
        <div class="rankrow">
          <div class="pctcell"><div class="v">\${d.pct.toFixed(1)}</div><div class="k">Percentile</div></div>
          <div class="pctcell"><div class="v">#\${rank.toLocaleString()}<span class="of"> / \${d.SAMPLES.toLocaleString()}</span></div><div class="k">Rank Among Random Fives</div></div>
        </div>
        <canvas id="hist"></canvas>
        <div class="axis"><span>\${d.min.toFixed(0)} OVR</span><span>◀ weaker · stronger ▶</span><span>\${d.max.toFixed(0)} OVR</span></div>

        <div class="sc-sub"><span class="n">§ 03</span><h3>Who Beats You</h3><span class="ln"></span></div>
        \${challHTML}
      </div>
      <div class="sc-foot">Hardwood Draft · 2026 · stats &amp; ratings by Dunks &amp; Threes (dunksandthrees.com)</div>
    </div></div>
    <div class="controls" style="margin-top:22px">
      <button class="btn primary" onclick="reset()">↻ Draft A New Five</button>
    </div>
  </div>\`;

  countUp('bigovr',avg);
  drawHist(d,avg);
  window.scrollTo({top:0,behavior:'smooth'});
}

function countUp(id,target){
  const el=document.getElementById(id);if(!el)return;
  const dur=900;let start=null;
  function step(ts){if(start===null)start=ts;const t=Math.min(1,(ts-start)/dur);
    const e=1-Math.pow(1-t,3);el.textContent=(target*e).toFixed(1);
    if(t<1)requestAnimationFrame(step);else el.textContent=target.toFixed(1);}
  requestAnimationFrame(step);
}

function drawHist(d,avg){
  const cv=document.getElementById('hist'),dpr=window.devicePixelRatio||1;
  const W=cv.clientWidth||560,H=140;cv.width=W*dpr;cv.height=H*dpr;
  const ctx=cv.getContext('2d');ctx.scale(dpr,dpr);
  const maxc=Math.max(...d.counts),pad=10,bw=(W-pad*2)/d.bins;
  // baseline
  ctx.strokeStyle='#16130f';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(pad,H-20);ctx.lineTo(W-pad,H-20);ctx.stroke();
  d.counts.forEach((c,i)=>{
    const h=(c/maxc)*(H-34),x=pad+i*bw,y=H-20-h;
    const binMid=d.min+(i+0.5)*d.w;
    ctx.fillStyle=binMid<=avg?'#d9c6a1':'#e2521b';
    ctx.fillRect(x,y,Math.max(1,bw-1.5),h);
    ctx.strokeStyle='#16130f';ctx.lineWidth=1;ctx.strokeRect(x,y,Math.max(1,bw-1.5),h);
  });
  // your marker
  const mx=pad+((avg-d.min)/(d.max-d.min))*(W-pad*2);
  ctx.strokeStyle='#16130f';ctx.lineWidth=2.5;ctx.setLineDash([5,4]);
  ctx.beginPath();ctx.moveTo(mx,6);ctx.lineTo(mx,H-20);ctx.stroke();ctx.setLineDash([]);
  const tag='YOU · '+avg.toFixed(1);ctx.font='600 12px "DM Mono",monospace';
  const tw=ctx.measureText(tag).width+12,tx=Math.min(W-tw-2,Math.max(2,mx-tw/2));
  ctx.fillStyle='#16130f';ctx.fillRect(tx,2,tw,18);
  ctx.fillStyle='#f2e7d2';ctx.textAlign='center';ctx.fillText(tag,tx+tw/2,15);
}
// game waits on the start screen until a difficulty is chosen (startGame)
</script>
</body>
</html>`;
fs.writeFileSync("index.html",html);
console.log("wrote index.html",fs.statSync("index.html").size,"bytes");
