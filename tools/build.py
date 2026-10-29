#!/usr/bin/env python3
"""Construit l'appli LGU à partir de source/.

  python3 tools/build.py test     -> test/   (lien de test, icône « LGU Test », bandeau TEST, données séparées)
  python3 tools/build.py prod     -> racine  (lien partagé à la team / aux abonnés)
  python3 tools/build.py team     -> team/   (version surprise « Ta bande t'attendait », figée)
  python3 tools/build.py apercu   -> build/apercu.html (fichier unique pour l'aperçu claude.ai)

Les quatre sortent du MÊME code : seules changent les réglages d'environnement ci-dessous.
"""
import base64, hashlib, json, os, re, shutil, sys, glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'source')
import subprocess
try: VERSION = subprocess.check_output(['git','-C',ROOT,'log','-1','--format=%h %cs','--','source'],text=True).strip() or 'dev'
except Exception: VERSION = 'dev'
ENVS = {
    'prod':   {'out': ROOT,                         'key': 'lgu-app-v7',  'title': 'LGU',      'name': 'Le Guide Ultime', 'ribbon': None,   'team': False},
    'test':   {'out': os.path.join(ROOT, 'test'),   'key': 'lgu-test-v7', 'title': 'LGU Test', 'name': 'LGU Test',        'ribbon': 'TEST', 'team': False},
    'team':   {'out': os.path.join(ROOT, 'team'),   'key': 'lgu-team-v7', 'title': 'LGU',      'name': 'Le Guide Ultime', 'ribbon': None,   'team': True},
    'apercu': {'out': os.path.join(ROOT, 'build'),  'key': 'lgu-app-v7',  'title': 'LGU',      'name': 'Le Guide Ultime', 'ribbon': None,   'team': False},
}
EXTERNAL = ('pl_', 'cv_', 'tm_')   # images servies à part dans la version installable (chargées à la demande)
FONTS = [('LGU Display','0_LGUDisplay',800,'normal'),('LGU Sans','1_LGUSans',400,'normal'),('LGU Sans','2_LGUSans',500,'normal'),
         ('LGU Sans','3_LGUSans',700,'normal'),('LGU Sans','4_LGUSans',600,'italic'),('LGU Sans','5_LGUSans',800,'italic'),
         ('LGU Sans','6_LGUSans',900,'italic'),('LGU Pixel','7_LGUPixel',400,'normal'),('LGU Hand','9_Caveat',700,'normal'),
         ('You Rock','8_YouRock',400,'normal')]
SW_TAIL = '''
<script>if("serviceWorker" in navigator){addEventListener("load",()=>{navigator.serviceWorker.register("sw.js",{updateViaCache:"none"}).then(r=>r.update()).catch(()=>{});let done=false;navigator.serviceWorker.addEventListener("controllerchange",()=>{if(done)return;done=true;location.reload();});});}</script>
</body>
</html>
'''
RIBBON = '''<style>.env-ribbon{position:fixed;top:calc(env(safe-area-inset-top) + 6px);left:50%;transform:translateX(-50%);z-index:99999;pointer-events:none;background:#EE0001;color:#fff;font:400 10px 'LGU Pixel',monospace;letter-spacing:.18em;padding:3px 10px;border-radius:3px;box-shadow:0 2px 6px rgba(0,0,0,.3)}</style><div class="env-ribbon">%s</div>'''

def b64(p): return base64.b64encode(open(p, 'rb').read()).decode()
def read(*p): return open(os.path.join(SRC, *p), encoding='utf-8').read()

def core(env):
    E = ENVS[env]
    css = ''.join("@font-face{font-family:'%s';src:url(data:font/woff2;base64,%s) format('woff2');font-weight:%d;font-style:%s;font-display:swap}\n"
                  % (fam, b64(os.path.join(SRC, 'fonts', f + '.woff2')), w, st) for fam, f, w, st in FONTS)
    imgs = {os.path.basename(p)[:-5]: 'data:image/webp;base64,' + b64(p) for p in sorted(glob.glob(os.path.join(SRC, 'img', '*.webp')))}
    if env != 'apercu':
        imgs = {k: (('img/%s.webp' % k) if k.startswith(EXTERNAL) else v) for k, v in imgs.items()}
    js = read('app', 'app.js') + '\n' + read('app', 'track.js')
    assert js.count('const KEY = "lgu-app-v7";') == 1, 'clé de stockage introuvable'
    js = js.replace('const KEY = "lgu-app-v7";', 'const KEY = "%s";' % E['key'])
    keys = json.load(open(os.path.join(SRC, 'pwa', 'posthog.json')))
    envjs = 'window.LGU_ENV=' + json.dumps({'env': env, 'key': keys.get(env), 'host': keys.get('host', 'https://eu.i.posthog.com'), 'version': VERSION}) + ';'
    js = envjs + '\n' + js
    html = read('app', 'index.html')
    for tag, val in (('/*%%FONTS%%*/', css), ('/*%%CSS%%*/', read('app', 'style.css')), ('/*%%IMG%%*/', 'const IMG=' + json.dumps(imgs) + ';'), ('/*%%JS%%*/', js)):
        assert html.count(tag) == 1, tag
        html = html.replace(tag, val)
    return html, E

def build(env):
    html, E = core(env)
    out = E['out']; os.makedirs(out, exist_ok=True)
    if env == 'apercu':
        open(os.path.join(out, 'apercu.html'), 'w', encoding='utf-8').write(html)
        return os.path.join(out, 'apercu.html')
    body = html.replace('<title>Appli Le Guide Ultime</title>', '', 1)
    head = read('pwa', 'head.html').replace('content="LGU"', 'content="%s"' % E['title'])
    extra = ''
    if E['ribbon']: extra += RIBBON.replace('%s', E['ribbon'])
    if E['team']: extra += '<script>\n' + read('app', 'team.js') + '\n</script>\n'
    page = head + body + extra + SW_TAIL
    open(os.path.join(out, 'index.html'), 'w', encoding='utf-8').write(page)
    # service worker : nom de cache = empreinte du contenu -> mise à jour automatique à chaque changement
    digest = hashlib.sha1(page.encode()).hexdigest()[:10]
    open(os.path.join(out, 'sw.js'), 'w').write(read('pwa', 'sw.js').replace('%%CACHE%%', 'lgu-%s-%s' % (env, digest)))
    man = json.loads(read('pwa', 'manifest.webmanifest'))
    man['name'] = E['name']; man['short_name'] = E['title']
    json.dump(man, open(os.path.join(out, 'manifest.webmanifest'), 'w', encoding='utf-8'), ensure_ascii=False, indent=2)
    icodir = os.path.join(SRC, 'pwa', 'test') if env == 'test' else os.path.join(SRC, 'pwa')
    for f in ('apple-touch-icon.png', 'icon-192.png', 'icon-512.png', 'icon-maskable-512.png'):
        shutil.copy(os.path.join(icodir, f), os.path.join(out, f))
    os.makedirs(os.path.join(out, 'img'), exist_ok=True)
    for p in glob.glob(os.path.join(SRC, 'img', '*.webp')):
        n = os.path.basename(p)
        if n.startswith(EXTERNAL) and (E['team'] or not n.startswith('tm_')): shutil.copy(p, os.path.join(out, 'img'))
    for f in ('plaques.csv', 'categories.csv', 'config.json'):
        shutil.copy(os.path.join(SRC, 'data', f), os.path.join(out, f))
    return os.path.join(out, 'index.html')

if __name__ == '__main__':
    envs = sys.argv[1:] or ['test']
    for e in envs:
        if e not in ENVS: sys.exit('environnement inconnu : %s (test, prod, team, apercu)' % e)
        print(e, '->', os.path.relpath(build(e), ROOT))
