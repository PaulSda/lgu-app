// =========================================================
// VERSION TEAM (lien /team/) : une seule surprise, « La team qui t'attend »
// Après avoir tapé son prénom : l'équipe arrive une par une et se range autour de toi.
// =========================================================
(function(){
const st=document.createElement("style"); st.textContent=`
.tw{position:fixed;inset:0;z-index:9999;background:#0E0C0A;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;font-family:'LGU Sans',-apple-system,sans-serif;animation:twIn .5s both}
@keyframes twIn{from{opacity:0}}
.tw__ring{position:relative;width:min(340px,86vw);aspect-ratio:1}
.tw__me,.tw__p{position:absolute;left:50%;top:50%;border-radius:50%;background:#2a241c center/cover;display:grid;place-items:center}
.tw__me{width:34%;aspect-ratio:1;transform:translate(-50%,-50%) scale(0);border:4px solid #FFCE18;box-shadow:0 0 0 0 rgba(255,206,24,.6);font:900 italic 46px 'LGU Sans';color:#16130e;background-color:#FFCE18;animation:twMe .7s .3s cubic-bezier(.2,1.6,.4,1) forwards, twPulse 2s 4.6s ease-out infinite}
@keyframes twMe{to{transform:translate(-50%,-50%) scale(1)}}
@keyframes twPulse{0%{box-shadow:0 0 0 0 rgba(255,206,24,.55)}100%{box-shadow:0 0 0 28px rgba(255,206,24,0)}}
.tw__p{width:21%;aspect-ratio:1;border:3px solid #fff;opacity:0;transform:translate(calc(-50% + var(--fx)),calc(-50% + var(--fy))) scale(.4) rotate(var(--rot));animation:twFly .75s var(--d) cubic-bezier(.2,1.3,.4,1) forwards}
@keyframes twFly{to{opacity:1;transform:translate(calc(-50% + var(--x)),calc(-50% + var(--y))) scale(1) rotate(0)}}
.tw__ring.is-big .tw__p{width:15%;border-width:2px}.tw__ring.is-big .tw__me{width:26%;font-size:36px}.tw__ring.is-big .tw__p b{font-size:10px;margin-top:3px}
.tw__p b{position:absolute;top:100%;left:50%;transform:translateX(-50%);margin-top:5px;font:900 italic 12.5px 'LGU Sans';white-space:nowrap;color:#fff}
.tw__line{position:absolute;left:50%;top:50%;height:2px;width:var(--len);transform-origin:0 50%;transform:rotate(var(--ang)) scaleX(0);background:linear-gradient(90deg,rgba(255,206,24,.9),rgba(255,206,24,.1));animation:twLine .5s var(--d) ease-out forwards}
@keyframes twLine{to{transform:rotate(var(--ang)) scaleX(1)}}
.tw__t{margin:46px 0 0;font:900 italic clamp(34px,10vw,46px)/.95 'LGU Sans';letter-spacing:-.04em;color:#FFCE18;text-align:center;opacity:0;transform:translateY(14px);animation:twUp .6s var(--d) forwards}
.tw__s{margin:10px 0 0;font:600 italic 15px/1.4 'LGU Sans';color:#E6E3DC;text-align:center;opacity:0;animation:twUp .6s var(--d) forwards}
.tw__b{margin-top:26px;background:#FFCE18;color:#16130e;border:0;border-radius:99px;padding:16px 30px;font:900 italic 16px 'LGU Sans';text-transform:uppercase;opacity:0;animation:twUp .6s var(--d) forwards}
@keyframes twUp{to{opacity:1;transform:none}}
`; document.head.appendChild(st);

const N = s => String(s||"").normalize("NFD").replace(/[̀-ͯ]/g,"").toLowerCase().trim();
const TEAM=["Adélie","Betti","Charlotte","Ezéchiel","Laura","Maelia","Manon","Marianne","Meriem","Nora","Roch","Aurélien","Elodie","Asya"];
const TPH={"Adélie":"tm_adelie","Betti":"tm_betti","Charlotte":"tm_charlotte","Ezéchiel":"tm_ezechiel","Laura":"tm_laura","Maelia":"tm_maelia","Manon":"tm_manon","Marianne":"tm_marianne","Nora":"tm_nora","Roch":"tm_roch","Aurélien":"tm_aurelien","Elodie":"tm_elodie","Asya":"tm_asya"};
// la bande de la version team = toute l'équipe, avec leurs photos
Object.keys(PH).forEach(k=>delete PH[k]); Object.assign(PH,TPH);
const COLS=["#FF99B3","#6EA5FF","#00DEB5","#FF7A1A","#FFCE18","#C9A7FF","#7FE0A0"];
FRIENDS.length=0; Object.keys(FR_OWN).forEach(k=>delete FR_OWN[k]); SUGG.length=0;
TEAM.forEach((n,i)=>addFriendData({n,c:COLS[i%COLS.length]}));

function teamWaits(name,next){
  const me=TEAM.find(t=>N(t)===N(name));
  const others=TEAM.filter(t=>t!==me);
  const myPh=(typeof photoOf==="function"&&photoOf(me||name))||null;
  const n=others.length, inner=n>8?Math.min(6,Math.floor(n/2)):n;
  const POS=others.map((t,i)=>{ const ring=i<inner?0:1, k=ring?i-inner:i, m=ring?n-inner:inner, R=n>8?(ring?46:27):40, off=ring?Math.PI/m:0; return {a:-Math.PI/2+off+k*2*Math.PI/m,R}; });
  const STEP=n>8?.26:.42;
  let h=`<div class="tw__ring ${n>8?"is-big":""}">`;
  others.forEach((t,i)=>{ const a=POS[i].a, R=POS[i].R, x=Math.cos(a)*R, y=Math.sin(a)*R, d=(1.1+i*STEP).toFixed(2)+"s";
    const fa=a+(i%2?0.9:-0.9), fx=Math.cos(fa)*160, fy=Math.sin(fa)*160;
    h+=`<span class="tw__line" style="--len:${R}%;--ang:${a}rad;--d:${(1.1+i*STEP+.35).toFixed(2)}s"></span>`;
    const ph=photoOf(t);
    h+=`<span class="tw__p" style="--x:${x*3.4}px;--y:${y*3.4}px;--fx:${fx*1.6}px;--fy:${fy*1.6}px;--rot:${i%2?40:-40}deg;--d:${d};${ph?`background-image:url(${ph})`:"background-color:#FFCE18;color:#16130e;font:900 italic 22px 'LGU Sans'"}">${ph?"":t[0]}<b>${t}</b></span>`; });
  h+=`<span class="tw__me" style="${myPh?`background-image:url(${myPh});background-color:#2a241c`:""}">${myPh?"":esc((name||"?")[0].toUpperCase())}</span></div>`;
  const end=(1.1+n*STEP+.4).toFixed(2);
  h+=`<h1 class="tw__t" style="--d:${end}s">Ta bande<br>t'attendait.</h1><p class="tw__s" style="--d:${(+end+.35).toFixed(2)}s">${others.length} personnes de la team sont déjà dans l'appli, ${esc(name)}.</p><button class="tw__b" style="--d:${(+end+.7).toFixed(2)}s">Rejoindre la bande</button>`;
  const d=document.createElement("div"); d.className="tw"; d.innerHTML=h; document.body.appendChild(d);
  // les positions sont en px relatifs à la taille réelle du cercle
  const ring=d.querySelector(".tw__ring"), w=ring.getBoundingClientRect().width/100;
  d.querySelectorAll(".tw__p").forEach((p,i)=>{ const {a,R}=POS[i]; p.style.setProperty("--x",Math.cos(a)*R*w+"px"); p.style.setProperty("--y",Math.sin(a)*R*w+"px"); });
  setTimeout(()=>{ if(typeof confetti==="function") confetti(180); if(navigator.vibrate) navigator.vibrate([30,40,60]); }, +end*1000);
  d.querySelector(".tw__b").onclick=()=>{ d.style.transition="opacity .4s"; d.style.opacity=0; setTimeout(()=>d.remove(),400); window.LGU_HOOK_NAME=null; next(); };
}
window.LGU_HOOK_NAME=teamWaits;
window.LGU_TEAM_DEMO=()=>teamWaits(S.name||"Paul",()=>{});
})();
