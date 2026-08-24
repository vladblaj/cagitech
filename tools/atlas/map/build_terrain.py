#!/usr/bin/env python3
"""Build a shaded-relief raster for the Romania frame from public terrarium DEM tiles.

Tiles are Web Mercator, so the composite drops straight onto a Leaflet imageOverlay
with the tile-edge bounds and lines up exactly.
Source: AWS Terrain Tiles (elevation-tiles-prod), public domain / open data.
"""
import io, math, os, urllib.request
from concurrent.futures import ThreadPoolExecutor
import numpy as np
from PIL import Image, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'terrain')
Z = 9
LON0, LAT0, LON1, LAT1 = 18.4, 42.6, 31.6, 49.2      # W, S, E, N
URL = 'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png'

def lon2x(lon, z): return (lon + 180.0) / 360.0 * (1 << z)
def lat2y(lat, z):
    r = math.radians(lat)
    return (1.0 - math.log(math.tan(r) + 1.0/math.cos(r)) / math.pi) / 2.0 * (1 << z)
def x2lon(x, z): return x / (1 << z) * 360.0 - 180.0
def y2lat(y, z):
    n = math.pi - 2.0 * math.pi * y / (1 << z)
    return math.degrees(math.atan(0.5 * (math.exp(n) - math.exp(-n))))

X0, X1 = int(math.floor(lon2x(LON0, Z))), int(math.floor(lon2x(LON1, Z)))
Y0, Y1 = int(math.floor(lat2y(LAT1, Z))), int(math.floor(lat2y(LAT0, Z)))
NX, NY = X1 - X0 + 1, Y1 - Y0 + 1
print(f'z{Z}: x {X0}..{X1} ({NX})  y {Y0}..{Y1} ({NY})  = {NX*NY} tiles -> {NX*256}x{NY*256}px')

def fetch(xy):
    x, y = xy
    p = os.path.join(CACHE, f'{Z}_{x}_{y}.png')
    if os.path.exists(p) and os.path.getsize(p) > 0:
        return xy
    for attempt in range(4):
        try:
            req = urllib.request.Request(URL.format(z=Z, x=x, y=y),
                                         headers={'User-Agent': 'atlas-builder/1.0'})
            with urllib.request.urlopen(req, timeout=45) as r:
                data = r.read()
            with open(p, 'wb') as f:
                f.write(data)
            return xy
        except Exception as e:
            if attempt == 3:
                print('  FAIL', xy, e); return None
    return None

tiles = [(x, y) for x in range(X0, X1 + 1) for y in range(Y0, Y1 + 1)]
with ThreadPoolExecutor(max_workers=10) as ex:
    got = [t for t in ex.map(fetch, tiles) if t]
print(f'fetched {len(got)}/{len(tiles)}')

# ---- decode terrarium RGB -> metres --------------------------------------
H, W = NY * 256, NX * 256
elev = np.zeros((H, W), dtype=np.float32)
for x, y in tiles:
    p = os.path.join(CACHE, f'{Z}_{x}_{y}.png')
    if not os.path.exists(p): continue
    a = np.asarray(Image.open(p).convert('RGB'), dtype=np.float32)
    e = a[:, :, 0] * 256.0 + a[:, :, 1] + a[:, :, 2] / 256.0 - 32768.0
    r0, c0 = (y - Y0) * 256, (x - X0) * 256
    elev[r0:r0+256, c0:c0+256] = e

print(f'elevation  min {elev.min():.0f}  max {elev.max():.0f} m')
np.save(os.path.join(HERE, 'elev.npy'), elev)
bounds = dict(west=x2lon(X0, Z), east=x2lon(X1 + 1, Z),
              north=y2lat(Y0, Z), south=y2lat(Y1 + 1, Z), z=Z, w=W, h=H)
import json; json.dump(bounds, open(os.path.join(HERE, 'terrain_bounds.json'), 'w'), indent=1)
print('bounds', {k: (round(v, 5) if isinstance(v, float) else v) for k, v in bounds.items()})
