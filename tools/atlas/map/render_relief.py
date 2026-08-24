#!/usr/bin/env python3
"""Render dark shaded relief + a light variant from the decoded DEM."""
import json, os, math
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
elev = np.load(os.path.join(HERE, 'elev.npy'))
B = json.load(open(os.path.join(HERE, 'terrain_bounds.json')))
H, W = elev.shape

# ground resolution (m/px) at this latitude, for a correct slope
latm = (B['north'] + B['south']) / 2
res = 156543.03392 * math.cos(math.radians(latm)) / (2 ** B['z'])
print(f'{W}x{H}  {res:.1f} m/px')

def hillshade(e, az=315.0, alt=42.0, zf=3.2):
    dy, dx = np.gradient(e.astype(np.float32) * zf, res, res)
    slope = np.arctan(np.hypot(dx, dy))
    aspect = np.arctan2(-dx, dy)
    a, z = math.radians(az), math.radians(90.0 - alt)
    hs = (np.cos(z) * np.cos(slope) +
          np.sin(z) * np.sin(slope) * np.cos(a - aspect))
    return np.clip(hs, 0, 1)

land = elev > 0
hs = hillshade(elev)
# soften the sea, which is noisy bathymetry
hs = np.where(land, hs, 0.5 + (hs - 0.5) * 0.35)

def ramp(stops):
    """stops: [(metres, (r,g,b)), ...] -> lookup over the elevation range."""
    xs = np.array([s[0] for s in stops], dtype=np.float32)
    cs = np.array([s[1] for s in stops], dtype=np.float32)
    e = np.clip(elev, xs[0], xs[-1])
    out = np.zeros((H, W, 3), dtype=np.float32)
    for c in range(3):
        out[:, :, c] = np.interp(e, xs, cs[:, c])
    return out

DARK = [(-2300,(5,10,18)),(-200,(7,16,28)),(-1,(11,25,42)),(0,(18,30,30)),
        (60,(21,34,32)),(180,(27,39,33)),(360,(38,45,33)),(700,(62,56,37)),
        (1100,(92,78,48)),(1500,(126,105,66)),(1900,(168,143,100)),(2600,(214,199,170))]
LIGHT= [(-2300,(150,178,196)),(-200,(168,196,212)),(-1,(190,214,226)),(0,(206,212,186)),
        (60,(210,214,182)),(180,(206,206,168)),(360,(200,192,150)),(700,(196,176,132)),
        (1100,(192,162,118)),(1500,(196,166,132)),(1900,(214,198,178)),(2600,(246,242,234))]

def compose(stops, gamma, lo, hi, name, size=(2240, 1650)):
    base = ramp(stops)
    sh = (lo + (hi - lo) * np.power(hs, gamma))[:, :, None]
    img = np.clip(base * sh, 0, 255).astype(np.uint8)
    im = Image.fromarray(img).resize(size, Image.LANCZOS)
    for ext, kw in (('webp', dict(quality=78, method=6)), ('jpg', dict(quality=80, optimize=True))):
        p = os.path.join(HERE, f'{name}.{ext}')
        im.save(p, **kw)
        print(f'  {name}.{ext}  {os.path.getsize(p)/1024:.0f} KB')
    return im

compose(DARK,  0.95, 0.34, 1.62, 'relief_dark')

print('bounds', B['west'], B['south'], B['east'], B['north'])
