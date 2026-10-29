#!/usr/bin/env bash
# Construit et vérifie la version TEST, puis la met en ligne sur /test/.
# Usage : tools/publier-test.sh "ce qui a changé"
set -euo pipefail
cd "$(dirname "$0")/.."
MSG="${1:?Décris le changement entre guillemets}"
python3 tools/build.py test apercu
node tools/check.js test
git add source test tools
git commit -m "test: $MSG" || { echo "Rien de nouveau à publier."; exit 0; }
git push -q
echo "✓ En ligne sur le lien Test (/test/). La prod n'a pas bougé."
