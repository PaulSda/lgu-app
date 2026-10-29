// =========================================================
// MESURE D'AUDIENCE (PostHog, hébergé en Europe)
// - Test et Prod envoient dans deux projets PostHog séparés (clé injectée par tools/build.py)
// - Rien n'est envoyé sans l'accord de l'utilisateur (S.consent === true)
// - Sans clé (aperçu claude.ai, clé pas encore fournie) : tout est ignoré, l'appli marche pareil
// - ?debug dans l'URL : les événements s'affichent aussi dans la console
// =========================================================
const TRK = (()=>{
  const ENV = window.LGU_ENV || {env:"apercu", key:null, host:"https://eu.i.posthog.com", version:"dev"};
  const DEBUG = /[?&]debug\b/.test(location.search);
  const STANDALONE = (navigator.standalone===true) || matchMedia("(display-mode: standalone)").matches;
  let ready=false, queue=[];
  const base = () => ({ env:ENV.env, app_version:ENV.version, installee:STANDALONE, ecran:`${innerWidth}x${innerHeight}`, onglet:typeof TAB!=="undefined"?TAB:null });
  function load(){
    if(ready || !ENV.key || !S.consent) return;
    // chargeur officiel PostHog
    !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once unregister identify alias set_config reset opt_in_capturing opt_out_capturing has_opted_out_capturing get_distinct_id get_property people.set people.set_once startSessionRecording stopSessionRecording".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
    posthog.init(ENV.key,{api_host:ENV.host, person_profiles:"always", persistence:"localStorage", autocapture:true, capture_pageview:false, capture_pageleave:true,
      session_recording:{maskAllInputs:true}, disable_surveys:true});
    posthog.register(base());
    identify();
    ready=true; queue.forEach(([e,p])=>send(e,p)); queue=[];
  }
  function identify(){ if(!window.posthog||!S.consent) return;
    posthog.people && posthog.people.set({prenom:S.name||null, villes:(S.cities||[]).join(", "), nb_envies:(S.envies||[]).length, nb_cartes:allCards().length, nb_categories:ownedCats().length, nb_potes:FRIENDS.length, points:S.pts, photo:!!S.photo, installee:STANDALONE}); }
  function send(e,p){ try{ window.posthog && posthog.capture(e,Object.assign({},base(),p||{})); }catch(_){} }
  function t(e,p){ if(DEBUG) console.log("[track]",e,p||{}); if(!ENV.key||S.consent!==true) return; if(!ready){ queue.push([e,p]); load(); return; } send(e,p); }
  return {t, load, identify, ENV, STANDALONE, setConsent(v){ S.consent=v; save(); if(v){ load(); t("mesure_acceptee"); } else if(window.posthog){ try{ posthog.opt_out_capturing(); }catch(_){} } }};
})();

// ---------- accord (une seule fois, après l'accueil) ----------
function askConsent(){
  if(S.consent!==undefined || !TRK.ENV.key || askConsent.shown || document.querySelector('.onb')) return; askConsent.shown=true;
  const d=sheet(`<div class="h2">Tu nous aides à améliorer l'appli ?</div>
    <p class="sub" style="margin:0">On aimerait mesurer comment l'appli est utilisée : écrans visités, boutons touchés, parcours qui coincent. Ça nous sert uniquement à l'améliorer. Rien n'est revendu, rien n'est public.</p>
    <p class="note" style="margin:0">Tu peux changer d'avis quand tu veux : Moi → Réglages → Mesure d'audience.</p>
    <div style="display:flex;gap:10px"><button class="btn btn--white" style="flex:1" data-c="0">Non merci</button><button class="btn" style="flex:1.4" data-c="1">Oui, ok</button></div>`);
  d.querySelector(".sheet__body").onclick=e=>{ const b=e.target.closest("[data-c]"); if(!b) return; TRK.setConsent(b.dataset.c==="1"); closeAll(); toast(b.dataset.c==="1"?"Merci ! Ça va vraiment nous aider.":"Pas de souci, rien n'est mesuré."); };
}

// ---------- branchements : on enveloppe les fonctions clés de l'appli ----------
(function(){
  const wrap=(name,fn)=>{ const orig=window[name]; if(typeof orig!=="function") return; window[name]=function(...a){ try{ fn(...a); }catch(_){} return orig.apply(this,a); }; };
  const pl=id=>{ const p=PL(id); return p?{resto:p.n, resto_id:p.id, categorie:p.c, ville:p.city, prix:p.p, deja_dans_collec:isOwnedPlace(p.id)}:{} };
  wrap("go", tab=>TRK.t("onglet_vu",{onglet:tab}));
  wrap("openPlace", id=>TRK.t("fiche_resto_ouverte",pl(id)));
  wrap("selectPlace", id=>TRK.t("resto_selectionne_sur_carte",pl(id)));
  wrap("openSearch", ()=>TRK.t("recherche_ouverte"));
  wrap("applyQ", q=>TRK.t("recherche_appliquee",{libelle:q&&q.label, categories:q&&q.cats&&q.cats.join(", "), prix:q&&q.price, nb_resultats:(()=>{ try{ return PLACES.filter(p=>shown(p)&&(!q||!q.cats||q.cats.includes(p.c))&&(!q||!q.ids||q.ids.includes(p.id))).length; }catch(_){ return null; } })()}));
  wrap("goCity", c=>TRK.t("ville_choisie",{ville:c}));
  wrap("openFilters", ()=>TRK.t("filtres_ouverts"));
  wrap("openScan", pre=>TRK.t("scan_ouvert",{depuis_fiche:pre!=null}));
  wrap("doScan", id=>{ const p=PL(id); TRK.t("carte_decrochee",Object.assign(pl(id),{nouvelle_categorie:!isOwnedCat(p.c), revisite:isOwnedPlace(id), selection_semaine:S.booster.ids.includes(id)})); });
  wrap("openCat", c=>TRK.t("categorie_ouverte",{categorie:c}));
  wrap("openViewer", (c,p)=>TRK.t("carte_regardee",{categorie:c, resto:PL(p)&&PL(p).n}));
  wrap("openShop", ()=>TRK.t("impression_ouverte",{cartes_a_imprimer:allCards().filter(x=>!isPrinted(x.p)).length}));
  wrap("checkout", ()=>TRK.t("impression_commande_lancee"));
  wrap("openGroup", (pre=[])=>TRK.t("on_mange_ou_ouvert",{avec_un_pote:pre.length>0}));
  wrap("openFriend", i=>TRK.t("fiche_pote_ouverte",{pote:FRIENDS[i]&&FRIENDS[i].n, compatibilite:compatOf(i).pct}));
  wrap("addFriend", n=>TRK.t("pote_ajoute",{pote:n}));
  wrap("openAddFriends", ()=>TRK.t("ajout_potes_ouvert"));
  wrap("openInvite", ()=>TRK.t("invitation_ouverte"));
  wrap("openSharePf", ()=>TRK.t("profil_partage_ouvert"));
  wrap("openFeed", ()=>TRK.t("fil_bande_complet_ouvert"));
  wrap("openRewards", ()=>{ TRK.t("recompenses_ouvertes",{points:S.pts}); window.__rwT=Date.now(); });
  wrap("openHow", ()=>TRK.t("comment_gagner_points_ouvert"));
  wrap("openStories", i=>TRK.t("stories_ouvertes",{depuis:i}));
  wrap("openSaved", ()=>TRK.t("a_tester_ouvert",{nb:S.saved.length}));
  wrap("openCreatorsList", ()=>TRK.t("createurs_suivis_ouverts"));
  wrap("openCreator", i=>TRK.t("createur_ouvert",{createur:CREATORS[i]&&CREATORS[i].h}));
  wrap("applyCreatorList", i=>TRK.t("liste_createur_ouverte",{liste:CREATOR_LISTS[i]&&CREATOR_LISTS[i].t}));
  wrap("notifMock", ()=>{ if(!notifMock.done&&S.onb) TRK.t("notif_affichee"); });
  wrap("startOnb", ()=>TRK.t("accueil_commence"));
  wrap("endOnb", ()=>{ TRK.t("accueil_termine",{villes:(S.cities||[]).join(", "), nb_envies:(S.envies||[]).length}); setTimeout(()=>{ askConsent(); },1200); });
  wrap("confirmReset", ()=>TRK.t("demo_remise_a_zero"));
})();

// ---------- actions à l'intérieur des écrans (boutons repérés par leurs attributs) ----------
document.addEventListener("click",e=>{
  const b=e.target.closest("button,[data-rw],label"); if(!b) return; const d=b.dataset;
  if(d.sw!==undefined){ const top=document.querySelector("#stk .swc:last-child"); TRK.t("on_mange_ou_swipe",{choix:d.sw==="1"?"chaud":"bof", resto:top&&PL(+top.dataset.pid)&&PL(+top.dataset.pid).n}); }
  else if(d.go2!==undefined) TRK.t("on_mange_ou_partie_lancee",{nb_potes:typeof G!=="undefined"&&G.who?G.who.size:null, envie:typeof G!=="undefined"?G.envie:null});
  else if(d.ggo!==undefined) TRK.t("on_mange_ou_y_aller");
  else if(d.gshare!==undefined) TRK.t("on_mange_ou_partage");
  else if(d.again!==undefined && document.querySelector(".rw")) TRK.t("recompenses_autre_blague");
  else if(d.again!==undefined) TRK.t("on_mange_ou_rejouee");
  else if(d.vote) TRK.t("vote_plaque",{choix:d.vote});
  else if(d.like) TRK.t("fil_ca_donne_envie");
  else if(d.save) TRK.t("resto_sauve_a_tester",pl0(+d.save));
  else if(d.route!==undefined) TRK.t("itineraire_demande");
  else if(d.react) TRK.t("avis_donne",{avis:d.react});
  else if(d.r) TRK.t("avis_donne",{avis:d.r});
  else if(d.play!==undefined) TRK.t("vocal_ecoute");
  else if(d.ge!==undefined) TRK.t("on_mange_ou_envie",{envie:d.ge||"tout"});
  else if(d.mt) TRK.t("moi_onglet",{onglet:d.mt});
  else if(d.v) TRK.t("collec_vue",{vue:d.v});
  else if(d.cp!==undefined) TRK.t("lien_copie");
  else if(d.inv) TRK.t("invitation_envoyee");
  else if(d.scanhere!==undefined) TRK.t("scan_depuis_fiche");
  else if(b.closest(".scan__foot") && b.classList.contains("btn")) TRK.t("scan_simule");
  else if(d.x!==undefined && document.querySelector(".rw") && window.__rwT){ TRK.t("recompenses_fermees",{secondes:Math.round((Date.now()-window.__rwT)/1000)}); window.__rwT=0; }
},true);
function pl0(id){ const p=PL(id); return p?{resto:p.n,categorie:p.c}:{} }
// recherche tapée (sans le texte exact au-delà de 40 caractères)
let __qT; document.addEventListener("input",e=>{ if(e.target&&e.target.id==="q"){ clearTimeout(__qT); const v=e.target.value.trim(); __qT=setTimeout(()=>{ if(v.length>=2){ const R=searchAll(v); TRK.t("recherche_tapee",{texte:v.slice(0,40), nb_restos:R?R.places.filter(shown).length:0, nb_categories:R?R.cats.length:0, aucun_resultat:!R||(!R.places.filter(shown).length&&!R.cats.length)}); } },900); } },true);
// photo de profil ajoutée
document.addEventListener("change",e=>{ if(e.target&&e.target.id==="myph") setTimeout(()=>{ TRK.t("photo_profil_ajoutee"); TRK.identify(); },1500); },true);
// erreurs JavaScript (pour repérer les bugs sur les vrais téléphones)
addEventListener("error",e=>TRK.t("erreur_js",{message:String(e.message).slice(0,200), fichier:(e.filename||"").split("/").pop(), ligne:e.lineno}));
// ouverture de l'appli + temps passé
TRK.t("appli_ouverte",{premiere_fois:!S.onb, installee:TRK.STANDALONE});
document.addEventListener("visibilitychange",()=>{ if(document.visibilityState==="hidden") TRK.t("appli_mise_en_arriere_plan"); else { TRK.t("appli_reprise"); TRK.identify(); } });
// ceux qui ont déjà fait l'accueil avant la mise en place : on demande au lancement suivant
setTimeout(()=>{ if(S.onb && S.consent===undefined && !document.querySelector('.ov')) askConsent(); },4000);
TRK.load();
