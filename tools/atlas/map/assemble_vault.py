#!/usr/bin/env python3
"""Inline everything into one self-contained vault page (no external requests)."""
import base64, json, os, re

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = '/home/user/cagitech'
OUT  = os.path.join(ROOT, 'public', 'vault-fcc6197d2484a7a0dae35a63', 'romania-atlas.html')
DATA = os.path.join(HERE, 'data')
IMGD = os.path.join(HERE, 'img')
PARTS= os.path.join(HERE, 'parts')
LEAF = os.path.join(ROOT, 'node_modules', 'leaflet', 'dist')

def rd(p):  return open(p, encoding='utf-8').read()
def b64(p, mime):
    return f'data:{mime};base64,' + base64.b64encode(open(p, 'rb').read()).decode()

# --- lift the era dataset out of the SVG atlas source, verbatim -------------
src = rd(os.path.join(HERE, '..', 'parts', 'part3.html'))
start = src.index('const F_OTT=')
end   = src.rindex('];') + 2
eras  = src[start:end]

bounds = json.load(open(os.path.join(DATA, 'terrain_bounds.json')))
bounds = {k: bounds[k] for k in ('west', 'east', 'north', 'south')}

geo = {k: json.load(open(os.path.join(DATA, f'gj_{k}.json')))
       for k in ('regions', 'counties', 'rivers')}
places = json.load(open(os.path.join(DATA, 'places.json')))
images = {'relief': b64(os.path.join(IMGD, 'relief_dark.webp'), 'image/webp'),
          'land':   b64(os.path.join(IMGD, 'landcover.webp'),   'image/webp')}

html = rd(os.path.join(PARTS, 'v1.html')) + rd(os.path.join(PARTS, 'v2.html')) + rd(os.path.join(PARTS, 'v3.html'))
J = lambda o: json.dumps(o, separators=(',', ':'), ensure_ascii=False)

# leaflet.css references its own sprite images; none are used by this page
css = rd(os.path.join(LEAF, 'leaflet.css'))
repl = {
    '/*LEAFLET_CSS*/': css,
    '/*LEAFLET_JS*/':  rd(os.path.join(LEAF, 'leaflet.js')),
    '/*BOUNDS*/':      J(bounds),
    '/*IMAGES*/':      J(images),
    '/*GEO*/':         J(geo),
    '/*PLACES*/':      J(places),
    '/*ERAS*/':        eras,
}
for k, v in repl.items():
    assert k in html, f'placeholder missing: {k}'
    html = html.replace(k, v, 1)

for k in repl:
    assert k not in html, f'placeholder survived: {k}'
assert 'ERAS' in html and 'L.map(' in html

os.makedirs(os.path.dirname(OUT), exist_ok=True)
open(OUT, 'w', encoding='utf-8').write(html)
print(f'wrote {OUT}')

# Artifact variant: the host supplies <!doctype>/<html>/<head>/<body>, so strip ours.
frag = html
frag = re.sub(r'^.*?</title>', '', frag, flags=re.S)
frag = frag.replace('</head>', '').replace('<body>', '')
frag = frag.replace('</body>', '').replace('</html>', '')
frag = '<title>Romania in Fourteen Borders</title>\n' + frag.lstrip()
frag = frag.replace('html,body{margin:0;padding:0;height:100%}',
                    'html,body{margin:0;padding:0;height:100%}')
afile = os.path.join(HERE, 'artifact_atlas.html')
open(afile, 'w', encoding='utf-8').write(frag)
print(f'wrote {afile}  {len(frag)/1024/1024:.2f} MB')
print(f'  {len(html)/1024/1024:.2f} MB   '
      f'(images {sum(len(v) for v in images.values())/1024/1024:.2f} MB, '
      f'geo {len(J(geo))/1024:.0f} KB, leaflet {(len(css)+os.path.getsize(os.path.join(LEAF,"leaflet.js")))/1024:.0f} KB)')
