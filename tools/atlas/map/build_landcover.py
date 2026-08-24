#!/usr/bin/env python3
"""Build a land-cover + hillshade raster from ESA WorldCover 10m (CC BY 4.0).

Reads COG overviews over HTTP (no full-tile download), mosaics in EPSG:4326,
then resamples into the Web Mercator frame used by the relief image so the two
overlays register exactly.
"""
import json, math, os
from concurrent.futures import ThreadPoolExecutor
import numpy as np, rasterio
from rasterio.enums import Resampling
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
B = json.load(open(os.path.join(HERE, 'terrain_bounds.json')))
BASE = ('/vsicurl/https://esa-worldcover.s3.eu-central-1.amazonaws.com/v200/2021/map/'
        'ESA_WorldCover_10m_2021_v200_{ns}{lat:02d}{ew}{lon:03d}_Map.tif')
FACTOR = 32                       # 36000/32 = 1125 px per 3-degree tile
PPD    = 1125 / 3.0               # source pixels per degree

LON_T = [18, 21, 24, 27, 30]
LAT_T = [42, 45, 48]
SW_LON, SW_LAT = LON_T[0], LAT_T[0]
SRC_W = len(LON_T) * 1125
SRC_H = len(LAT_T) * 1125
mosaic = np.zeros((SRC_H, SRC_W), dtype=np.uint8)

def grab(t):
    lon, lat = t
    url = BASE.format(ns='N', lat=lat, ew='E', lon=lon)
    try:
        with rasterio.open(url) as ds:
            a = ds.read(1, out_shape=(1125, 1125), resampling=Resampling.mode)
        return (lon, lat, a)
    except Exception as e:
        print(f'   miss N{lat}E{lon:03d} ({type(e).__name__})')
        return (lon, lat, None)

pairs = [(lo, la) for lo in LON_T for la in LAT_T]
with ThreadPoolExecutor(max_workers=8) as ex:
    for lon, lat, a in ex.map(grab, pairs):
        if a is None: continue
        c0 = int((lon - SW_LON) * PPD)
        r0 = int((LAT_T[-1] + 3 - (lat + 3)) * PPD)   # rows run north -> south
        mosaic[r0:r0+1125, c0:c0+1125] = a
print('mosaic', mosaic.shape, 'classes', np.unique(mosaic)[:16])

# ---- resample into the Mercator frame of the relief image -----------------
OW, OH = B['w'], B['h']
def y2lat(y, z):
    n = math.pi - 2.0 * math.pi * y / (1 << z)
    return math.degrees(math.atan(0.5 * (math.exp(n) - math.exp(-n))))
y_top = (1 - math.log(math.tan(math.radians(B['north'])) + 1/math.cos(math.radians(B['north'])))/math.pi)/2 * (1 << B['z'])
rows = np.arange(OH) + 0.5
lats = np.array([y2lat(y_top + r / 256.0, B['z']) for r in rows])
lons = B['west'] + (np.arange(OW) + 0.5) / OW * (B['east'] - B['west'])

src_r = np.clip(((LAT_T[-1] + 3) - lats) * PPD, 0, SRC_H - 1).astype(np.int32)
src_c = np.clip((lons - SW_LON) * PPD, 0, SRC_W - 1).astype(np.int32)
lc = mosaic[src_r[:, None], src_c[None, :]]
print('resampled', lc.shape)

CMAP = {10:(38,74,44), 20:(74,86,52), 30:(104,112,64), 40:(126,110,62),
        50:(150,88,74), 60:(140,132,110), 70:(226,232,238), 80:(16,44,74),
        90:(44,90,92), 95:(30,72,60), 100:(150,150,120), 0:(16,44,74)}
rgb = np.zeros((OH, OW, 3), dtype=np.float32)
for k, c in CMAP.items():
    m = lc == k
    if m.any():
        for i in range(3): rgb[:, :, i][m] = c[i]

elev = np.load(os.path.join(HERE, 'elev.npy'))
latm = (B['north'] + B['south']) / 2
res = 156543.03392 * math.cos(math.radians(latm)) / (2 ** B['z'])
dy, dx = np.gradient(elev.astype(np.float32) * 3.0, res, res)
slope = np.arctan(np.hypot(dx, dy)); aspect = np.arctan2(-dx, dy)
a, z = math.radians(315.0), math.radians(90.0 - 42.0)
hs = np.clip(np.cos(z)*np.cos(slope) + np.sin(z)*np.sin(slope)*np.cos(a - aspect), 0, 1)
hs = np.where(elev > 0, hs, 0.5 + (hs - 0.5) * 0.3)

sh = (0.42 + 1.30 * np.power(hs, 0.9))[:, :, None]
img = np.clip(rgb * sh, 0, 255).astype(np.uint8)
im = Image.fromarray(img).resize((2240, 1650), Image.LANCZOS)
for ext, kw in (('webp', dict(quality=72, method=6)),):
    p = os.path.join(HERE, f'landcover.{ext}'); im.save(p, **kw)
    print(f'  landcover.{ext}  {os.path.getsize(p)/1024:.0f} KB')
