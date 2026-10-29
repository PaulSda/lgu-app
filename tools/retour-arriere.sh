#!/usr/bin/env bash
# Remet la PROD dans l'état d'une version précédente (sans toucher au Test ni aux sources).
# Usage : tools/retour-arriere.sh prod-20261029-1015      (liste : git tag -l 'prod-*')
set -euo pipefail
cd "$(dirname "$0")/.."
TAG="${1:?Donne le nom de la version à remettre, liste avec : git tag -l prod-*}"
git rev-parse -q --verify "refs/tags/$TAG" >/dev/null || { echo "✗ Étiquette inconnue : $TAG"; exit 1; }
FILES="index.html sw.js manifest.webmanifest apple-touch-icon.png icon-192.png icon-512.png icon-maskable-512.png img plaques.csv categories.csv config.json"
git checkout "$TAG" -- $FILES
# nouveau nom de cache pour que les téléphones reprennent bien l'ancienne version
sed -i -E "s/const C=\"([^\"]+)\"/const C=\"\1-retour$(date +%H%M)\"/" sw.js
node tools/check.js prod
git add $FILES
git commit -m "prod: retour à $TAG"
git push -q
echo "✓ Prod revenue à $TAG."
