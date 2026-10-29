// Vérifications automatiques avant toute mise en ligne.
//   node tools/check.js test     (vérifie /test/)
//   node tools/check.js prod     (vérifie la racine)
// Échoue (code 1) à la moindre erreur JavaScript ou parcours cassé, sur 4 tailles d'écran.
let PW; try{ PW=require('/opt/npm-tools/node_modules/playwright'); }catch(e){ PW=require('playwright'); }
const {chromium}=PW; const http=require('http'); const fs=require('fs'); const path=require('path');
const ROOT=path.resolve(__dirname,'..'); const env=process.argv[2]||'test'; const sub={test:'test/',prod:'',team:'team/'}[env];
if(sub===undefined){ console.error('env inconnu'); process.exit(2); }
const TYPES={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.webp':'image/webp','.csv':'text/csv; charset=utf-8'};
const srv=http.createServer((q,r)=>{ let p=decodeURIComponent(q.url.split('?')[0]); if(p.endsWith('/')) p+='index.html'; const f=path.join(ROOT,p); if(!f.startsWith(ROOT)||!fs.existsSync(f)){ r.writeHead(404); return r.end(); } r.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'}); fs.createReadStream(f).pipe(r); });
const SCREENS=[['iPhone 15',393,852],['iPhone SE',375,667],['Petit écran (Titan 2)',412,360],['iPhone Pro Max',430,932]];
const PAGES=['map','search','collec','album','potes','moi','group','stories','scan'];
(async()=>{
  await new Promise(r=>srv.listen(0,r)); const base=`http://localhost:${srv.address().port}/${sub}`;
  const b=await chromium.launch(); let fails=0; const log=(ok,m)=>{ console.log((ok?'  ✓ ':'  ✗ ')+m); if(!ok) fails++; };
  for(const [name,w,h] of SCREENS){
    console.log(`\n${name} (${w}×${h})`);
    const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:true}); const pg=await ctx.newPage(); const errs=[];
    pg.on('pageerror',e=>errs.push(e.message)); pg.on('requestfailed',q=>{ if(q.url().startsWith(base)&&!/ABORTED/.test((q.failure()||{}).errorText||'')) errs.push('fichier manquant : '+q.url().slice(base.length)); });
    pg.on('response',r=>{ if(r.url().startsWith(base)&&r.status()>=400) errs.push('fichier manquant ('+r.status()+') : '+r.url().slice(base.length)); });
    await pg.goto(base); await pg.waitForTimeout(1800);
    log(await pg.$('.onb')!==null,'accueil affiché au premier lancement');
    // accueil complet
    for(let i=0;i<6;i++){ const nx=await pg.$('.onb [data-next]:not([disabled]), .onb [data-end]'); if(!nx) break; if(await pg.$('#onbName')) await pg.fill('#onbName','Test'); await nx.scrollIntoViewIfNeeded(); await nx.click(); await pg.waitForTimeout(350); const tw=await pg.$('.tw__b'); if(tw){ await pg.waitForTimeout(6000); await tw.click(); await pg.waitForTimeout(500);} }
    log(await pg.$('.onb')===null,'accueil terminé jusqu\'à la carte');
    for(const p of PAGES){ const n0=errs.length; await pg.evaluate(p=>{ location.hash=p; jump(p); },p); await pg.waitForTimeout(700); log(errs.length===n0,`écran « ${p} » sans erreur`); }
    // parcours de scan complet
    await pg.evaluate(()=>jump('scan')); await pg.waitForTimeout(600);
    const sim=await pg.$('.scan__foot .btn'); let okSim=false;
    if(sim){ await sim.scrollIntoViewIfNeeded(); okSim=await sim.isVisible(); if(okSim){ await sim.click(); await pg.waitForTimeout(4500); } }
    log(okSim,'bouton « Simuler le scan » atteignable');
    log(await pg.$('.reveal, .tally')!==null,'carte décrochée affichée après le scan');
    // barre de navigation
    await pg.evaluate(()=>{ closeAll(); go('map'); }); await pg.waitForTimeout(400);
    const nav=await pg.$('#nav'); const nb=nav&&await nav.boundingBox(); log(!!nb&&nb.y+nb.height<=h+1&&nb.y>h*.5,'barre du bas visible en bas de l\'écran');
    log(errs.length===0, errs.length?'erreurs : '+[...new Set(errs)].slice(0,5).join(' | '):'aucune erreur JavaScript ni fichier manquant');
    await ctx.close();
  }
  await b.close(); srv.close();
  console.log(fails?`\n✗ ${fails} problème(s) : NE PAS mettre en ligne.`:'\n✓ Tout est bon.'); process.exit(fails?1:0);
})();
