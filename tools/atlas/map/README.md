# The Shape of Romania — interactive map

`public/vault-fcc6197d2484a7a0dae35a63/romania-atlas.html`: the fourteen-plate atlas as a
Leaflet map over real terrain and satellite-derived land cover.

The page is **one self-contained file with zero external requests** — Leaflet, the GeoJSON
and both base rasters are inlined — matching the other vault pages. That also means it runs
from `file://`, offline, or as an Artifact.

## Rebuilding

```bash
npm install                                   # provides node_modules/leaflet for vendoring
pip install shapely rasterio pillow numpy

python3 tools/atlas/map/build_terrain.py      # DEM tiles  -> elev.npy + data/terrain_bounds.json
python3 tools/atlas/map/render_relief.py      # hillshade  -> img/relief_dark.webp
python3 tools/atlas/map/build_landcover.py    # WorldCover -> img/landcover.webp
python3 tools/atlas/map/export_geojson.py     # regions    -> data/gj_*.json
python3 tools/atlas/map/assemble_vault.py     # inline everything -> the vault page
```

`assemble_vault.py` alone is enough after a content edit — it reads the committed
`data/` and `img/`, and lifts the era dataset verbatim from `../parts/part3.html`, so the
map and the scrolling SVG atlas can never drift apart.

Only the first three steps need network. `elev.npy` (67 MB) and the tile cache are
gitignored; `data/` and `img/` are committed so the page rebuilds offline.

## Base imagery

| Layer | Source | Licence |
|---|---|---|
| Shaded relief | AWS Terrain Tiles (terrarium), z9, 266 tiles → 4864×3584 | SRTM/NED, public domain |
| Land cover 10 m | ESA WorldCover 2021 v200, COG overviews read over HTTP | CC BY 4.0 |
| Boundaries | Natural Earth 1:10m, grouped and river-clipped | public domain |

Both rasters are rendered **in Web Mercator**, from Web-Mercator sources, so they drop onto
a Leaflet `imageOverlay` with the tile-edge bounds and register exactly — no reprojection
stretch. `build_landcover.py` resamples WorldCover (EPSG:4326) row-by-row into the same
Mercator frame before compositing it with the hillshade.

Max elevation in the DEM comes out at 2532 m against Moldoveanu's true 2544 m.

## Attribution

ESA WorldCover is CC BY 4.0 and **must stay credited on the page**. The credit line is
rendered from `CREDIT` in `parts/v3.html` into both the desktop overlay and the mobile rail.
