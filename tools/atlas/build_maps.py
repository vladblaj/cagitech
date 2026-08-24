#!/usr/bin/env python3
"""Build SVG path data for a timeline of Romanian historical maps.

Source: Natural Earth (public domain) 10m admin-1 units, 10m rivers, 50m countries.
Modern administrative units are grouped / clipped into historical regions; strictly
pre-modern territories (Dacia, Roman Dacia) use hand-digitised approximations.
"""
import json, math, os

HERE = os.path.dirname(os.path.abspath(__file__))
from shapely.geometry import shape, box, LineString, Polygon, MultiPolygon, Point
from shapely.ops import unary_union, split, linemerge
from shapely import make_valid

# ---------------------------------------------------------------- projection
LON0, PHI0, PHI1, PHI2 = 25.0, 46.0, 44.0, 48.0
R = math.radians
def _t(p): return math.tan(math.pi/4 + p/2)
N = math.log(math.cos(R(PHI1))/math.cos(R(PHI2))) / math.log(_t(R(PHI2))/_t(R(PHI1)))
F = math.cos(R(PHI1)) * _t(R(PHI1))**N / N
RHO0 = F / _t(R(PHI0))**N

def lcc(lon, lat):
    rho = F / _t(R(lat))**N
    th = N * R(lon - LON0)
    return rho*math.sin(th), RHO0 - rho*math.cos(th)

FRAME = (18.4, 42.6, 31.6, 49.2)          # lon0, lat0, lon1, lat1
W = 1000.0
_xs, _ys = [], []
for i in range(81):
    for j in range(81):
        lo = FRAME[0] + (FRAME[2]-FRAME[0])*i/80
        la = FRAME[1] + (FRAME[3]-FRAME[1])*j/80
        x, y = lcc(lo, la); _xs.append(x); _ys.append(y)
X0, X1, Y0, Y1 = min(_xs), max(_xs), min(_ys), max(_ys)
SC = W / (X1 - X0)
H = round((Y1 - Y0) * SC, 1)

def proj(lon, lat):
    x, y = lcc(lon, lat)
    return ((x - X0)*SC, (Y1 - y)*SC)

VIEW = box(0, 0, W, H)

# ---------------------------------------------------------------- geo loading
def load(fn):
    with open(os.path.join(HERE, fn)) as f: return json.load(f)

ADM1 = load('ne_10m_admin_1_states_provinces.geojson')
ADM0 = load('ne_50m_admin_0_countries.geojson')
RIV  = load('riv10.geojson')

CLIP_LL = box(FRAME[0]-3, FRAME[1]-3, FRAME[2]+3, FRAME[3]+3)

def geo(feat):
    g = make_valid(shape(feat['geometry']))
    return g.intersection(CLIP_LL) if g.intersects(CLIP_LL) else None

prov = {}   # (admin, name) -> geometry (lon/lat)
for f in ADM1['features']:
    p = f['properties']; g = geo(f)
    if g and not g.is_empty:
        prov[(p.get('admin'), p.get('name'))] = g

ctry = {}
for f in ADM0['features']:
    p = f['properties']; g = geo(f)
    if g and not g.is_empty:
        ctry[p.get('NAME')] = g

def counties(admin, names):
    out = []
    for n in names:
        g = prov.get((admin, n))
        if g is None: raise SystemExit(f'MISSING {admin}/{n}')
        out.append(g)
    return make_valid(unary_union(out))

def admin_all(admin):
    return make_valid(unary_union([g for (a, _), g in prov.items() if a == admin]))

# ---------------------------------------------------------------- rivers
def river(name, minlen=0.4):
    segs = []
    for f in RIV['features']:
        pr = f['properties']
        if (pr.get('name') or pr.get('name_en')) == name:
            g = shape(f['geometry'])
            if g.intersects(CLIP_LL):
                g = g.intersection(CLIP_LL)
                if not g.is_empty and g.length > minlen: segs.append(g)
    return unary_union(segs) if segs else None


def merged(name):
    segs = []
    for f in RIV['features']:
        if (f['properties'].get('name') or '') == name:
            segs.append(shape(f['geometry']))
    if not segs: return None
    u = unary_union(segs)
    m = linemerge(u) if u.geom_type == 'MultiLineString' else u
    if m.geom_type == 'MultiLineString':
        m = max(m.geoms, key=lambda s: s.length)
    return m

DNIESTER = merged('Dniester')      # flows NW -> SE
SBUG     = merged('Southern Bug')  # flows NW -> SE

def extend(line, d=6.0):
    c = list(line.coords)
    (x0, y0), (x1, y1) = c[0], c[1]
    ax, ay = x0 - x1, y0 - y1; n = math.hypot(ax, ay) or 1
    (xa, ya), (xb, yb) = c[-2], c[-1]
    bx, by = xb - xa, yb - ya; n2 = math.hypot(bx, by) or 1
    return LineString([(x0 + ax/n*d, y0 + ay/n*d)] + c + [(xb + bx/n2*d, yb + by/n2*d)])

def side_sign(pt, line):
    """+1 / -1 for which flank of the (directed) line a point falls on."""
    s = line.project(pt)
    a = line.interpolate(max(s - 0.02, 0.0))
    b = line.interpolate(min(s + 0.02, line.length))
    dx, dy = b.x - a.x, b.y - a.y
    cr = dx * (pt.y - a.y) - dy * (pt.x - a.x)
    return 1.0 if cr >= 0 else -1.0

def bank(poly, line, ref):
    """Keep the parts of `poly` lying on the same bank of `line` as point `ref`.
    Handles MultiPolygon input (shapely's split only accepts a single Polygon)."""
    ln = extend(line, 12.0)
    want = side_sign(Point(*ref), line)
    parts = poly.geoms if poly.geom_type in ('MultiPolygon', 'GeometryCollection') else [poly]
    keep = []
    for part in parts:
        if part.geom_type != 'Polygon' or part.is_empty:
            continue
        try:
            pieces = list(split(make_valid(part), ln).geoms)
        except Exception:
            pieces = [part]
        for pc in pieces:
            if pc.geom_type == 'Polygon' and not pc.is_empty and \
               side_sign(pc.representative_point(), line) == want:
                keep.append(pc)
    return make_valid(unary_union(keep)) if keep else make_valid(poly)

# ---------------------------------------------------------------- hand clips
def P(*pts): return Polygon(pts)

# Historic Duchy of Bukovina (Austrian crownland, 1775-1918). Digitised from the
# crownland's southern/eastern limits; the northern edge is snapped to the Dniester,
# which formed the real boundary with the Bessarabian county of Hotin.
BUKOVINA_RAW = P((24.80,47.35),(25.30,47.30),(25.80,47.38),(26.25,47.50),(26.60,47.72),
                 (26.80,47.98),(26.55,48.15),(26.32,48.30),(26.00,48.95),(25.00,49.00),
                 (24.45,48.60),(24.50,47.95),(24.62,47.62))

# Governorate of Transnistria, Romanian administration 1941-44 (Dniester -> Southern Bug)
TRANSN_N = P((27.6,46.0),(31.9,46.0),(31.9,48.55),(29.40,48.62),(28.05,48.52),(27.6,47.6))

# Roman Dacia stopped short of the south-eastern Transylvanian corner
DACIA_CUT = P((20.4,44.0),(25.85,44.0),(26.05,45.60),(25.55,46.20),(25.35,47.00),
              (24.90,47.90),(22.60,47.30),(20.40,46.20))

# ---------------------------------------------------------------- regions
RO = 'Romania'
ARDEAL_C = ['Alba','Bistrita-Nasaud','Brasov','Cluj','Covasna','Harghita',
            'Hunedoara','Mures','Sibiu','Salaj']
BANAT_C  = ['Timis','Caras-Severin']
CRISANA_C= ['Arad','Bihor']
MARAM_C  = ['Maramures','Satu Mare']
MOLD_C   = ['Bacau','Botosani','Galati','Iasi','Neamt','Suceava','Vaslui','Vrancea']
MUNT_C   = ['Arges','Braila','Buzau','Calarasi','D\u00e2mbovita','Giurgiu','Ialomita',
            'Ilfov','Bucharest','Prahova','Teleorman']
OLT_C    = ['Dolj','Gorj','Mehedinti','Olt','V\u00e2lcea']
DOBR_C   = ['Constanta','Tulcea']

romania   = admin_all(RO)
ardeal    = counties(RO, ARDEAL_C)
banat_ro  = counties(RO, BANAT_C)
crisana   = counties(RO, CRISANA_C)
maramures = counties(RO, MARAM_C)
mold_all  = counties(RO, MOLD_C)
muntenia  = counties(RO, MUNT_C)
oltenia   = counties(RO, OLT_C)
dobrogea  = counties(RO, DOBR_C)

BUKOVINA   = bank(BUKOVINA_RAW, DNIESTER, (25.90, 48.00))
bucovina_s = make_valid(mold_all.intersection(BUKOVINA))
moldova_v  = make_valid(mold_all.difference(BUKOVINA))

ua         = admin_all('Ukraine')
md         = admin_all('Moldova')
chernivtsi = prov[('Ukraine','Chernivtsi')]
odessa     = prov[('Ukraine','Odessa')]

CHISINAU = (28.86, 47.01)          # right bank of the Dniester, inside Bessarabia
bucovina_n = make_valid(chernivtsi.intersection(BUKOVINA))
hotin      = make_valid(chernivtsi.difference(BUKOVINA))
budjak     = bank(odessa, DNIESTER, CHISINAU)
basarabia  = bank(unary_union([md, budjak, hotin]), DNIESTER, CHISINAU)

LEFTBANK = (29.60, 47.60)          # between Dniester and Southern Bug
transnistria_ww2 = make_valid(
    bank(bank(unary_union([ua, md]).intersection(TRANSN_N), DNIESTER, LEFTBANK),
         SBUG, LEFTBANK).difference(basarabia))

bg            = admin_all('Bulgaria')
dobrogea_s    = counties('Bulgaria', ['Dobrich','Silistra'])
bulgaria_rest = make_valid(bg.difference(dobrogea_s))

# Roman province of Dacia (106-271/275) — approximate extent
dacia_romana = make_valid(unary_union(
    [ardeal, banat_ro, oltenia, crisana]).intersection(DACIA_CUT))
moesia_inf = make_valid(unary_union([dobrogea, dobrogea_s, counties('Bulgaria',
    ['Ruse','Razgrad','Veliko Tarnovo','Shumen','Varna','Targovishte'])]))

# Burebista's Dacian sphere c.60-44 BC — deliberately soft, hand-digitised
dacia_bureb = P((18.4,48.6),(20.5,49.2),(23.0,49.2),(25.5,49.1),(27.5,48.9),(29.6,48.2),
                (30.8,47.2),(30.4,46.2),(29.8,45.2),(29.0,44.6),(28.6,43.9),(27.6,43.4),
                (26.0,43.2),(24.0,43.3),(22.6,43.6),(21.4,44.1),(20.2,44.8),(19.0,45.6),
                (18.4,46.6))

# Northern Transylvania, ceded to Hungary by the Second Vienna Award, 30 Aug 1940.
# Southern edge digitised from the award line: Oradea, Cluj, Targu Mures and the
# Szekely Land went to Hungary; Arad, Turda, Alba Iulia, Sighisoara, Sibiu and
# Brasov stayed Romanian.
NT_CLIP = P((21.55,46.98),(22.20,46.88),(22.70,46.82),(23.10,46.74),(23.55,46.66),
            (24.00,46.60),(24.35,46.46),(24.70,46.38),(25.02,46.16),(25.40,45.98),
            (25.72,45.80),(26.10,45.86),(26.55,46.20),(26.90,47.50),(26.00,48.40),
            (22.50,48.40),(20.80,47.60),(20.80,47.00))
nord_transilvania = make_valid(
    unary_union([ardeal, crisana, maramures]).intersection(NT_CLIP))
sud_transilvania  = make_valid(
    unary_union([ardeal, crisana, maramures, banat_ro]).difference(NT_CLIP))

# Southern Bessarabia (Cahul, Bolgrad, Ismail): returned to Moldavia in 1856,
# taken back by Russia in 1878 in exchange for Dobruja.
SB_CLIP = P((27.9,45.1),(28.6,45.2),(29.4,45.5),(30.35,45.58),(30.5,45.95),
            (29.4,46.00),(28.6,46.02),(28.0,46.08))
basarabia_sud = make_valid(basarabia.intersection(SB_CLIP))

hungary   = ctry['Hungary']
serbia    = ctry.get('Serbia') or ctry.get('Republic of Serbia')
vojvodina = make_valid(serbia.intersection(P((19.0,44.6),(21.6,44.6),(21.6,46.3),(18.8,46.3))))
transcarpathia = prov[('Ukraine','Transcarpathia')]
ua_rest   = make_valid(ua.difference(unary_union(
    [bucovina_n, hotin, budjak, transnistria_ww2]).buffer(0.004)))

# land backdrop, built from the same 10m source as the regions so coasts line up
LAND = make_valid(unary_union(list(prov.values())))

RIVERS_LL = {'danube': merged('Danube'), 'tisza': merged('Tisa'),
             'prut': merged('Prut'), 'dniester': DNIESTER,
             'mures': merged('Mures'), 'olt': merged('Olt'), 'bug': SBUG}

# ---------------------------------------------------------------- svg output
def dp(pts, tol):
    if len(pts) < 3: return pts
    dmax, idx = 0.0, 0
    (x0,y0),(x1,y1) = pts[0], pts[-1]
    dx, dy = x1-x0, y1-y0
    den = math.hypot(dx,dy)
    for i in range(1, len(pts)-1):
        px, py = pts[i]
        d = abs(dy*px - dx*py + x1*y0 - y1*x0)/den if den else math.hypot(px-x0,py-y0)
        if d > dmax: dmax, idx = d, i
    if dmax > tol:
        return dp(pts[:idx+1], tol)[:-1] + dp(pts[idx:], tol)
    return [pts[0], pts[-1]]

def ring_d(coords, tol):
    pts = [proj(x, y) for x, y in coords]
    if len(pts) > 3:
        pts = dp(pts, tol)
    if len(pts) < 3: return ''
    out = [f'M{pts[0][0]:.1f} {pts[0][1]:.1f}']
    for x, y in pts[1:]:
        out.append(f'L{x:.1f} {y:.1f}')
    out.append('Z')
    return ''.join(out)

def poly_d(geom, tol=0.7, minarea=0.4):
    if geom is None or geom.is_empty: return ''
    geom = geom.intersection(CLIP_LL)
    polys = geom.geoms if geom.geom_type in ('MultiPolygon','GeometryCollection') else [geom]
    d = []
    for pl in polys:
        if pl.geom_type != 'Polygon' or pl.is_empty: continue
        px = [proj(*c) for c in pl.exterior.coords]
        area = abs(sum(px[i][0]*px[i+1][1]-px[i+1][0]*px[i][1] for i in range(len(px)-1)))/2
        if area < minarea: continue
        d.append(ring_d(pl.exterior.coords, tol))
        for r in pl.interiors:
            rx = [proj(*c) for c in r.coords]
            ra = abs(sum(rx[i][0]*rx[i+1][1]-rx[i+1][0]*rx[i][1] for i in range(len(rx)-1)))/2
            if ra > minarea*4: d.append(ring_d(r.coords, tol))
    return ''.join(d)

def line_d(geom, tol=0.9):
    if geom is None or geom.is_empty: return ''
    geom = geom.intersection(CLIP_LL)
    ls = geom.geoms if geom.geom_type in ('MultiLineString','GeometryCollection') else [geom]
    d = []
    for l in ls:
        if l.geom_type != 'LineString': continue
        pts = dp([proj(*c) for c in l.coords], tol)
        if len(pts) < 2: continue
        d.append('M' + ' L'.join(f'{x:.1f} {y:.1f}' for x, y in pts))
    return ''.join(d)

# tidy: nudge regions so neighbours never show hairline gaps
def tidy(g, tol_deg=0.006):
    return make_valid(g.buffer(tol_deg).buffer(-tol_deg*0.55))

PATHS = {}
def add(key, geom, kind='poly', tol=0.7):
    PATHS[key] = line_d(geom, tol) if kind == 'line' else poly_d(tidy(geom), tol)

add('sea', VIEW, 'skip') if False else None
PATHS['sea'] = ''  # drawn as a plain rect in HTML

add('land', LAND, 'poly', 0.5)
for k, g in [('ardeal',ardeal),('banat',banat_ro),('crisana',crisana),
             ('maramures',maramures),('moldova',moldova_v),('bucovina_s',bucovina_s),
             ('bucovina_n',bucovina_n),('muntenia',muntenia),('oltenia',oltenia),
             ('dobrogea',dobrogea),('dobrogea_s',dobrogea_s),('basarabia',basarabia),
             ('transnistria_ww2',transnistria_ww2),('hotin',hotin),('budjak',budjak),
             ('romania_mod',romania),('hungary',hungary),('serbia',serbia),
             ('vojvodina',vojvodina),('bulgaria',bulgaria_rest),('ua_rest',ua_rest),
             ('transcarpathia',transcarpathia),
             ('dacia_romana',dacia_romana),('moesia',moesia_inf),
             ('dacia_bureb',dacia_bureb),
             ('nord_transilvania',nord_transilvania),('sud_transilvania',sud_transilvania),
             ('basarabia_sud',basarabia_sud)]:
    add(k, g)

for k, g in RIVERS_LL.items():
    PATHS['riv_'+k] = line_d(g, 0.8)

# Carpathian arc — hand-digitised crest line (three ranges)
CARP = {
 'carp_east': [(24.35,47.95),(24.75,47.75),(25.15,47.55),(25.45,47.20),(25.60,46.85),
               (25.80,46.50),(25.95,46.10),(26.15,45.85),(26.40,45.65)],
 'carp_south':[(26.40,45.65),(26.05,45.45),(25.65,45.32),(25.15,45.35),(24.60,45.36),
               (24.05,45.35),(23.45,45.30),(22.95,45.25),(22.55,45.28),(22.25,45.15)],
 'carp_west': [(22.25,45.15),(22.35,45.60),(22.60,46.00),(22.85,46.30),(23.10,46.55),
               (23.05,46.85),(23.30,47.15),(23.80,47.55),(24.35,47.95)],
}
for k, pts in CARP.items():
    PATHS[k] = line_d(LineString(pts), 0.4)

CITIES = {
 'Histria':(28.77,44.55),'Hamangia':(28.68,44.70),'Cernavodă':(28.03,44.34),
 'Târgu Ocna':(26.62,46.28),'Timișoara ':(21.23,45.75),'Callatis':(28.58,43.82),'Tărtăria':(23.36,45.94),
 'Cucuteni':(26.95,47.29),'Peștera cu Oase':(21.85,45.02),'Pietroasele':(26.44,45.07),
 'Sânnicolau Mare':(20.63,46.07),'Voroneț':(25.86,47.52),'Biertan':(24.52,46.13),
 'Putna':(25.60,47.87),'Turda':(23.79,46.56),'Poarta Albă':(28.42,44.24),
 'Târgu Mureș':(24.56,46.54),'Sfântu Gheorghe':(25.79,45.87),'Sighișoara':(24.79,46.22),
 'Baia Mare':(23.58,47.66),'Arad':(21.31,46.17),'Chilia':(29.27,45.45),
 'Hotin':(26.49,48.51),'Focșani ':(27.18,45.70),'Câmpia Turzii':(23.88,46.55),
 'București':(26.10,44.43),'Iași':(27.60,47.16),'Cluj':(23.60,46.77),
 'Timișoara':(21.23,45.75),'Constanța':(28.63,44.18),'Brașov':(25.61,45.65),
 'Craiova':(23.80,44.32),'Sibiu':(24.15,45.80),'Alba Iulia':(23.58,46.07),
 'Târgoviște':(25.46,44.93),'Suceava':(26.25,47.65),'Chișinău':(28.86,47.01),
 'Cernăuți':(25.94,48.29),'Oradea':(21.92,47.06),'Sarmizegetusa':(23.31,45.62),
 'Ulpia Traiana':(22.79,45.51),'Histria':(28.77,44.55),'Tomis':(28.63,44.18),
 'Apulum':(23.58,46.07),'Napoca':(23.60,46.77),'Curtea de Argeș':(24.68,45.14),
 'Ploiești':(26.02,44.94),'Silistra':(27.26,44.12),'Bălți':(27.93,47.76),
 'Turnu Severin':(22.66,44.63),'Tulcea':(28.80,45.18),'Câmpulung':(25.05,45.27),
 'Sighet':(23.89,47.93),'Blaj':(23.92,46.18),'Belgrade':(20.46,44.82),
 'Budapest':(19.04,47.50),'Sofia':(23.32,42.70),'Odesa':(30.73,46.48),
 'Galați':(28.03,45.44),'Focșani':(27.18,45.70),'Pitești':(24.87,44.86),
 'Bender':(29.47,46.83),'Cetatea Albă':(30.35,46.19),'Ismail':(28.84,45.35),
 'Vidin':(22.87,44.00),'Ruse':(25.97,43.85),'Târgu Jiu':(23.27,45.03),
 'Roșia Montană':(23.13,46.31),'Adamclisi':(27.96,44.09),'Baia':(26.21,47.42),
}

ANCHORS = {
 'TRANSILVANIA':(24.30,46.50),'MOLDOVA':(27.05,46.85),'MUNTENIA':(26.45,44.72),
 'OLTENIA':(23.55,44.62),'DOBROGEA':(28.42,44.62),'BANAT':(21.45,45.62),
 'CRIȘANA':(21.90,46.62),'MARAMUREȘ':(23.75,47.72),'BUCOVINA':(25.75,47.92),
 'BASARABIA':(28.62,47.28),'TRANSNISTRIA':(30.05,47.55),'VALAHIA':(25.30,44.72),
 'SEA':(30.42,43.72),'CENTRU':(24.75,44.30),'UNGARIA':(19.65,46.95),'SERBIA':(20.35,45.15),
 'BULGARIA':(24.60,43.30),'UCRAINA':(27.40,49.00),'POLONIA':(21.60,49.05),
 'IMP_OTOMAN':(24.60,43.30),'IMP_HABSBURGIC':(19.65,46.95),'IMP_RUS':(29.60,48.60),
 'DACIA':(24.88,46.32),'MOESIA':(26.20,43.60),'a_got0':(30.60,48.90),'a_got1':(26.25,45.10),
 'a_hun0':(31.40,47.60),'a_hun1':(20.90,46.45),'a_slv0':(29.20,49.05),'a_slv1':(21.90,45.05),
 'a_bul0':(30.10,46.50),'a_bul1':(25.40,43.55),'a_mag0':(28.60,48.60),'a_mag1':(20.30,47.60),
 'a_cum0':(31.10,47.00),'a_cum1':(26.40,45.05),'a_mon0':(30.90,48.60),'a_mon1':(23.55,46.95),
}
PT = {k: [round(v, 1) for v in proj(*ll)] for k, ll in CITIES.items()}
AN = {k: [round(v, 1) for v in proj(*ll)] for k, ll in ANCHORS.items()}

out = {'w': W, 'h': H, 'paths': PATHS, 'cities': PT, 'anchors': AN,
       'frame': FRAME, 'proj': 'Lambert conformal conic, std. parallels 44N/48N'}
dest = os.path.join(HERE, 'mapdata.json')
with open(dest, 'w') as f: json.dump(out, f, separators=(',', ':'))

print(f'viewBox 0 0 {W:.0f} {H:.0f}')
print(f'wrote {dest}  {os.path.getsize(dest)/1024:.0f} KB')
for k in sorted(PATHS):
    print(f'  {k:20s} {len(PATHS[k]):7d} chars')
