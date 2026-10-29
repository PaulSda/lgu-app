# Appli Le Guide Ultime — mode d'emploi technique

> À lire **avant toute modification**. Règle d'or : **tout passe par Test, rien ne va en Prod sans le « go » de Paul.**

## Les liens

| Environnement | Lien | Pour qui | Données sur le téléphone |
|---|---|---|---|
| **Prod** | https://paulsda.github.io/lgu-app/ | La team (puis les abonnés) | clé `lgu-app-v7` |
| **Test** | https://paulsda.github.io/lgu-app/test/ | Paul + testeurs | clé `lgu-test-v7` (séparée) |
| Team (figée) | https://paulsda.github.io/lgu-app/team/ | Version surprise « Ta bande t'attendait » | clé `lgu-team-v7` |

Test s'installe à part (icône « LGU Test » avec bande rouge, bandeau TEST en haut de l'écran) : on peut avoir Test et Prod sur le même iPhone sans mélange.

## Où est quoi

```
source/            ← LE CODE (seul endroit qu'on modifie)
  app/index.html     structure + icônes SVG
  app/style.css      styles (charte : fond papier béton, jaune #FFCE18, typos LGU)
  app/app.js         toute l'appli (données de démo, écrans, carte, scan, bande, récompenses…)
  app/team.js        surprise de la version /team/ uniquement
  img/               illustrations (pl_ = plaques Canva, cv_ = visuels catégories Drive, ph_/tm_ = photos)
  fonts/             polices LGU (Display, Sans, Pixel, You Rock)
  pwa/               en-tête, service worker, manifest, icônes (pwa/test/ = icônes Test)
  data/              plaques.csv (liste des plaqués), categories.csv, config.json (lien Google Sheet éventuel)
tools/
  build.py           construit test / prod / team / apercu à partir de source/
  check.js           vérifications automatiques (4 tailles d'écran, tous les écrans, parcours de scan)
  publier-test.sh    construit + vérifie + met en ligne sur /test/
  publier-prod.sh    met en prod EXACTEMENT ce qui a été validé en test (+ étiquette de version)
  retour-arriere.sh  remet la prod à une version précédente
index.html, sw.js, img/…   ← PROD générée (ne jamais modifier à la main)
test/                      ← TEST généré (ne jamais modifier à la main)
team/                      ← version team, figée
```

## Le circuit d'une modification

1. Récupérer le dépôt : `git clone https://github.com/PaulSda/lgu-app` (accès via l'app GitHub de Claude).
2. Modifier **uniquement** `source/`.
3. `tools/publier-test.sh "ce qui a changé"` → construit, lance `check.js` (bloque à la moindre erreur), met en ligne sur `/test/`.
4. Montrer le résultat à Paul (captures + lien Test). **Attendre son « go ».**
5. `tools/publier-prod.sh "résumé"` → refuse si le code a bougé depuis le Test ; reconstruit la prod depuis le même code, revérifie, publie, pose une étiquette `prod-AAAAMMJJ-HHMM`.
6. Ajouter une ligne au journal des versions (doc du projet « Journal des versions »).
7. En cas de souci en prod : `tools/retour-arriere.sh prod-…` (liste : `git tag -l 'prod-*'`).

Les téléphones récupèrent la nouvelle version à la prochaine ouverture (service worker « réseau d'abord », nom de cache = empreinte du contenu).

## Vérifications automatiques (`node tools/check.js test|prod`)

Sur iPhone 15, iPhone SE, petit écran carré (Unihertz Titan 2 de Paul, 412×360) et iPhone Pro Max :
accueil complet, tous les écrans (carte, recherche, collec, catégories, bande, moi, On mange où, stories, scan),
parcours de scan jusqu'à la carte décrochée, barre du bas en place, zéro erreur JavaScript, zéro fichier manquant.
Ce ne sont pas de vrais téléphones : Paul teste aussi le lien Test sur son iPhone/Titan avant le « go ».

## Pièges connus

- Les petits écrans (< 640 px de haut) ont des réglages dédiés en bas de `style.css` : ne pas casser.
- La carte réelle (MapLibre + OpenFreeMap) ne s'affiche pas dans l'aperçu claude.ai (repli sur la carte dessinée) : normal.
- La typo pixel n'a pas d'accents : les noms de resto sur les plaques sont écrits sans accents (fait automatiquement).
- Playwright : utiliser celui de `/opt/npm-tools/node_modules/playwright` (déjà géré dans `check.js`).
- L'aperçu claude.ai (artifact « Appli Le Guide Ultime ») se publie avec `build/apercu.html`.

## Décisions produit (à respecter)

Voir le doc projet « Récap de l'appli ». En bref : charte du site Plaques Ultimes, navigation « F » (barre noire, scan rond jaune),
cartes = plaques officielles Canva (43 catégories salées), récompenses volontairement vagues (« Ça arrive… », cuisson bloquée à 99 %),
compatibilité calculée (envies 40 %, adresses communes 25 %, verdicts 20 %, budget 15 %).
