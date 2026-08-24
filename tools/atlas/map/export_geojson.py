#!/usr/bin/env python3
"""Export the derived historical regions (plus counties/rivers) as GeoJSON for Leaflet."""
import json, os
HERE = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(HERE, '..', 'build_maps.py')).read()
exec(src.split('# ---------------------------------------------------------------- svg output')[0])

from shapely.geometry import mapping
from shapely.ops import unary_union

def feat(geom, props, tol=0.004):
    g = geom.simplify(tol, preserve_topology=True)
    if g.is_empty: return None
    return {'type': 'Feature', 'properties': props, 'geometry': mapping(g)}

def fc(items, tol=0.004):
    fs = [f for f in (feat(g, p, tol) for g, p in items) if f]
    return {'type': 'FeatureCollection', 'features': fs}

REGIONS = [
 (ardeal,'ardeal','Transilvania'), (banat_ro,'banat','Banat'),
 (crisana,'crisana','Crișana'), (maramures,'maramures','Maramureș'),
 (moldova_v,'moldova','Moldova'), (bucovina_s,'bucovina_s','Bucovina de Sud'),
 (bucovina_n,'bucovina_n','Bucovina de Nord'), (muntenia,'muntenia','Muntenia'),
 (oltenia,'oltenia','Oltenia'), (dobrogea,'dobrogea','Dobrogea'),
 (dobrogea_s,'dobrogea_s','Cadrilater'), (basarabia,'basarabia','Basarabia'),
 (basarabia_sud,'basarabia_sud','Basarabia de Sud'),
 (hotin,'hotin','Hotin'), (budjak,'budjak','Bugeac'),
 (transnistria_ww2,'transnistria_ww2','Transnistria (1941–44)'),
 (nord_transilvania,'nord_transilvania','Transilvania de Nord'),
 (sud_transilvania,'sud_transilvania','Transilvania de Sud'),
 (dacia_romana,'dacia_romana','Dacia Romană'), (moesia_inf,'moesia','Moesia Inferior'),
 (dacia_bureb,'dacia_bureb','Dacia lui Burebista'),
 (hungary,'hungary','Hungary'), (serbia,'serbia','Serbia'),
 (bulgaria_rest,'bulgaria','Bulgaria'), (ua_rest,'ua_rest','Ukraine'),
 (transcarpathia,'transcarpathia','Transcarpathia'),
 (romania,'romania_mod','România (azi)'),
]
out = {}
out['regions'] = fc([(g, {'id': i, 'name': n}) for g, i, n in REGIONS])

# modern counties, for a detail layer
cty = []
for (adm, name), g in prov.items():
    if adm == 'Romania':
        cty.append((g, {'name': name}))
out['counties'] = fc(cty, tol=0.003)

riv = []
for k, g in RIVERS_LL.items():
    if g is None: continue
    riv.append((g, {'id': k, 'name': k.capitalize()}))
out['rivers'] = fc(riv, tol=0.003)

for k, v in out.items():
    p = os.path.join(HERE, 'data', f'gj_{k}.json')
    json.dump(v, open(p, 'w'), separators=(',', ':'))
    print(f'  {k:10s} {len(v["features"]):3d} features   {os.path.getsize(p)/1024:6.0f} KB')
