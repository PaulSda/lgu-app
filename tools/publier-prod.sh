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
# 3. publier + étiquette de version pour pouvoir revenir en arrière
TAG="prod-$(date +%Y%m%d-%H%M)"
git add -A . ':!build'
git commit -m "prod: $MSG"
git tag -a "$TAG" -m "$MSG"
git push -q && git push -q origin "$TAG"
echo "✓ En PROD : $TAG"
echo "  Retour arrière possible : tools/retour-arriere.sh $TAG-1 (ou une autre étiquette prod-…)"
git tag -l 'prod-*' | tail -5
