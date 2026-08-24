#!/usr/bin/env python3
"""Assemble the historical atlas page from its parts + generated map geometry.

    python3 tools/atlas/build_maps.py     # (re)generate mapdata.json from Natural Earth
    python3 tools/atlas/assemble.py       # -> public/atlas/index.html

Polygon geometry is emitted once into an SVG <defs> block and referenced by
<use> from all fifteen maps, so the paths are not duplicated per plate.
"""
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..'))
OUT  = os.path.join(ROOT, 'public', 'atlas', 'index.html')

data  = json.load(open(os.path.join(HERE, 'mapdata.json')))
paths = data['paths']

poly = [k for k, v in paths.items()
        if v and not k.startswith('riv_') and not k.startswith('carp_')]
defs = '\n'.join(f'<path id="p-{k}" d="{paths[k]}"/>' for k in sorted(poly))

# rivers and the relief arc are drawn inline (they are strokes, not fills)
inline = {k: v for k, v in paths.items()
          if k.startswith('riv_') or k.startswith('carp_')}
payload = {'w': data['w'], 'h': data['h'], 'paths': inline,
           'cities': data['cities'], 'anchors': data['anchors']}

html = ''.join(open(os.path.join(HERE, 'parts', f'part{i}.html')).read()
               for i in (1, 2, 3, 4))
html = html.replace('<!--DEFS-->', defs)
html = html.replace('/*MAPDATA*/', json.dumps(payload, separators=(',', ':')))
assert '<!--DEFS-->' not in html and '/*MAPDATA*/' not in html

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w') as f:
    f.write(html)
print(f'wrote {OUT}  {len(html)/1024:.0f} KB  ({len(poly)} defs paths)')
