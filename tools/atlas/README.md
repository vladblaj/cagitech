# The Shape of Romania — historical atlas

A standalone page at `public/atlas/index.html` (served at `/atlas/`): fifteen maps of
the same ground, drawn on one projection and one frame, plus a sourced timeline.

## Regenerating

```bash
pip install shapely
python3 tools/atlas/build_maps.py   # geometry  -> tools/atlas/mapdata.json
python3 tools/atlas/assemble.py     # page      -> public/atlas/index.html
```

`build_maps.py` expects these Natural Earth files (public domain) beside it. They are
not committed — they total ~55 MB:

```bash
B=https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson
curl -sSLo ne_10m_admin_1_states_provinces.geojson $B/ne_10m_admin_1_states_provinces.geojson
curl -sSLo ne_50m_admin_0_countries.geojson        $B/ne_50m_admin_0_countries.geojson
curl -sSLo riv10.geojson                           $B/ne_10m_rivers_lake_centerlines.geojson
```

## How the geometry is built

- **Projection** — Lambert conformal conic, standard parallels 44°N/48°N, central
  meridian 25°E. Frame 18.4°–31.6°E, 42.6°–49.2°N, identical on every plate.
- **Historical regions** — grouped from modern admin-1 units, then clipped against
  real river geometry. Bessarabia, Bukovina and the 1941 Transnistria governorate are
  cut on the actual Dniester and Southern Bug lines via `bank()`, not on straight lines.
- **Simplification** — Douglas–Peucker in projected space, then a small buffer so
  neighbouring regions never show hairline gaps.

## Accuracy

Drawn polygons were measured against the areas stated in the treaties:

| Region | Drawn | Recorded |
|---|---|---|
| Northern Transylvania (2nd Vienna Award, 1940) | 43,423 km² | 43,104 km² |
| Bessarabia | 44,804 km² | ~44,422 km² |
| Transnistria governorate (1941–44) | 38,358 km² | ~39,700 km² |
| Northern Bukovina | 6,224 km² | ~5,300–6,200 km² |
| Southern Dobruja (Cadrilater) | 7,427 km² | 7,726 km² |
| Modern Romania | 235,757 km² | 238,397 km² |

Burebista's realm, the Roman limes and southern Bessarabia are hand-digitised
approximations and are labelled as such on the page.
