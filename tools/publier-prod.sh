#!/usr/bin/env bash
# Met en PROD exactement le code validé en Test. À lancer UNIQUEMENT après le « go » de Paul.
# Usage : tools/publier-prod.sh "résumé de la version"
set -euo pipefail
cd "$(dirname "$0")/.."
MSG="${1:?Résume la version entre guillemets}"
# 1. le code source doit être celui déjà publié en test (rien de modifié entre-temps)
if ! git diff --quiet HEAD -- source || [ -n "$(git status --porcelain source)" ]; then echo "✗ Des changements ne sont pas passés par Test. Lance d'abord tools/publier-test.sh"; exit 1; fi
LAST_TEST=$(git log -1 --format=%H -- test)
if [ -n "$(git diff --name-only "$LAST_TEST" HEAD -- source)" ]; then echo "✗ Le code a changé depuis la dernière publication en Test. Republie en Test et refais valider."; exit 1; fi
# 2. construire et vérifier la prod
python3 tools/build.py prod
node tools/check.js prod
# 3. publier, puis noter la version (nom -> commit) pour pouvoir revenir en arrière
NAME="prod-$(date +%Y%m%d-%H%M)"
git add -A
git commit -m "prod: [$NAME] $MSG"
echo "$NAME  $(git rev-parse --short HEAD)  $(date +%F)  $MSG" >> tools/versions-prod.txt
git add tools/versions-prod.txt && git commit -qm "versions: $NAME"
git push -q
echo "✓ En PROD : $NAME"
echo "  Versions disponibles pour un retour arrière :"; tail -5 tools/versions-prod.txt
