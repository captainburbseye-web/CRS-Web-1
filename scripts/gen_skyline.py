#!/usr/bin/env python3
"""
gen_skyline.py — Oxford Dreaming Spires skyline exporter (v2)

Source geometry: 2000×1200 viewBox, baseline y=850
Grid units:      20×12  (x÷100, y÷100)
Normalisation:   Xn =  x/1000 − 1   maps x: 0→−1, 2000→+1
                 Yn = −(y/600 − 1)  maps y: 0→+1, 1200→−1  (flip SVG y-down → scope y-up)
                 (so baseline y=850 → Yn ≈ −0.417, finial y=0 → Yn = +1.0)

Outputs (all written next to this script unless --out-dir is specified):
  skyline.json          — structured path data (raw + normalised + draw order)
  skyline_norm.csv      — flat normalised XY for oscilloscope / audio tools
  skyline_retrace.csv   — single continuous stream with baseline retraces
  oxford_skyline.pde    — Processing 4 sketch (animated phosphor display)

Usage:
  python3 gen_skyline.py
  python3 gen_skyline.py --out-dir /tmp/osc
"""

import json
import math
import argparse
import os
from pathlib import Path

# ─── Geometry constants ────────────────────────────────────────────────────────
VB_W   = 2000   # viewBox width
VB_H   = 1200   # viewBox height
BASE_Y = 850    # ground / baseline
NORM_X_SCALE = 1000.0   # x / 1000 − 1
NORM_Y_SCALE = 600.0    # y / 600  − 1

def norm(x, y):
    """Normalise raw SVG coords → (Xn, Yn) in [−1, +1].
    X: left→right (−1 to +1)
    Y: flipped — SVG y-down becomes scope y-up:
       y=0 (top of frame, spire tips) → Yn = +1.0
       y=850 (baseline/ground)        → Yn ≈ −0.417
       y=1200 (bottom of viewBox)     → Yn = −1.0
    """
    return (round(x / NORM_X_SCALE - 1, 4),
            round(-(y / NORM_Y_SCALE - 1), 4))

# ─── Master path data ──────────────────────────────────────────────────────────
# Each entry: (name, class, [ (x,y), ... ])
# Classes: base | teeth | block | spire | dome | spine | finial | ring | tick | pinnacle

PATHS = [

    ("base", "base", [
        (0, 850), (2000, 850),
    ]),

    ("teeth_1", "teeth", [(120, 850), (120, 800)]),
    ("teeth_2", "teeth", [(480, 850), (480, 790)]),
    ("teeth_3", "teeth", [(760, 850), (760, 800)]),
    ("teeth_4", "teeth", [(1080, 850), (1080, 780)]),
    ("teeth_5", "teeth", [(1420, 850), (1420, 800)]),
    ("teeth_6", "teeth", [(1780, 850), (1780, 790)]),

    ("left_block", "block", [
        (50, 850), (50, 700), (160, 700), (160, 850),
    ]),
    ("left_block_ring_1", "ring", [(65, 790), (145, 790)]),
    ("left_block_ring_2", "ring", [(70, 750), (140, 750)]),

    ("left_spire", "spire", [
        (220, 850), (220, 710), (245, 630), (268, 540), (288, 440),
        (302, 340), (312, 230), (322, 150), (330, 100),
        (338, 150), (348, 230), (362, 340), (382, 440),
        (405, 540), (428, 630), (450, 710), (450, 850),
    ]),
    ("left_spire_spine", "spine", [(335, 820), (335, 150)]),

    ("dome_1", "dome", [
        (520, 700), (520, 540), (535, 470), (570, 400), (620, 355),
        (680, 355), (730, 400), (765, 470), (780, 540), (780, 700), (520, 700),
    ]),
    ("dome_1_ring_1", "ring", [(535, 650), (765, 650)]),
    ("dome_1_ring_2", "ring", [(530, 600), (770, 600)]),

    ("central_spire", "spire", [
        (820, 850), (820, 680), (845, 590), (870, 500), (895, 400),
        (915, 300), (932, 200), (945, 100), (955, 50),
        (965, 100), (978, 200), (995, 300), (1015, 400),
        (1040, 500), (1065, 590), (1090, 680), (1090, 850),
    ]),
    ("central_spine", "spine", [(955, 820), (955, 150)]),
    ("central_finial", "finial", [(955, 50), (955, 0)]),

    ("dome_2", "dome", [
        (1130, 700), (1130, 580), (1150, 510), (1190, 450), (1240, 420),
        (1290, 420), (1330, 450), (1370, 510), (1390, 580), (1390, 700),
    ]),

    ("medium_tower", "block", [
        (1420, 850), (1420, 500), (1500, 500), (1500, 850),
    ]),
    ("medium_tower_tick_1", "tick",     [(1430, 550), (1490, 550)]),
    ("medium_tower_tick_2", "tick",     [(1435, 620), (1485, 620)]),
    ("medium_tower_tick_3", "tick",     [(1430, 690), (1490, 690)]),
    ("medium_tower_pin_1",  "pinnacle", [(1435, 500), (1435, 450)]),
    ("medium_tower_pin_2",  "pinnacle", [(1460, 500), (1460, 430)]),
    ("medium_tower_pin_3",  "pinnacle", [(1485, 500), (1485, 450)]),

    ("right_spire", "spire", [
        (1540, 850), (1540, 720), (1560, 640), (1585, 550), (1605, 450),
        (1620, 340), (1632, 240), (1642, 170), (1650, 120),
        (1658, 170), (1668, 240), (1680, 340), (1695, 450),
        (1715, 550), (1740, 640), (1760, 720), (1760, 850),
    ]),

    ("right_block", "block", [
        (1820, 850), (1820, 700), (1930, 700), (1930, 850),
    ]),
    ("right_block_ring_1", "ring", [(1835, 790), (1915, 790)]),
    ("right_block_ring_2", "ring", [(1840, 750), (1910, 750)]),
]

# Draw order for the oscilloscope stream (structural only — no detail passes)
DRAW_ORDER = [
    "base",
    "left_block",
    "left_spire",
    "dome_1",
    "central_spire",
    "dome_2",
    "medium_tower",
    "right_spire",
    "right_block",
]

# ─── Build lookup ──────────────────────────────────────────────────────────────
path_by_name = {name: (cls, pts) for name, cls, pts in PATHS}


def normalise_path(pts):
    return [norm(x, y) for x, y in pts]


def build_json():
    """Build the full structured JSON blob."""
    out = {
        "meta": {
            "title":   "Oxford Dreaming Spires — skyline v2",
            "viewbox": {"w": VB_W, "h": VB_H},
            "baseline_y": BASE_Y,
            "normalise": {
                "Xn": "x / 1000 - 1",
                "Yn": "-(y / 600 - 1)  # flipped: SVG y-down → scope y-up",
                "domain": {"x": [-1, 1], "y": [-1, 1]},
                "baseline_Yn": round(-(BASE_Y / NORM_Y_SCALE - 1), 4),
            },
        },
        "draw_order": DRAW_ORDER,
        "paths": {},
    }
    for name, cls, pts in PATHS:
        out["paths"][name] = {
            "class": cls,
            "raw":   [[x, y] for x, y in pts],
            "norm":  [list(norm(x, y)) for x, y in pts],
        }
    return out


def build_norm_csv(order=None):
    """Flat CSV of normalised XY, one segment per block."""
    names = order if order else [n for n, _, _ in PATHS]
    rows = ["segment,point_index,xn,yn"]
    for name in names:
        if name not in path_by_name:
            continue
        _, pts = path_by_name[name]
        for i, (x, y) in enumerate(pts):
            xn, yn = norm(x, y)
            rows.append(f"{name},{i},{xn},{yn}")
    return "\n".join(rows)


def build_retrace_csv():
    """
    Single continuous draw stream with baseline retraces between clusters.
    For systems without beam blanking — the retrace reads as architectural ground.
    Baseline Yn ≈ −0.417  (ground sits low, spires extend upward)
    """
    BASE_XN_START = -1.0
    BASE_YN = round(-(BASE_Y / NORM_Y_SCALE - 1), 4)

    rows = ["stream_index,segment,xn,yn,blanked"]
    idx = 0

    for seg_i, name in enumerate(DRAW_ORDER):
        if name not in path_by_name:
            continue
        _, pts = path_by_name[name]
        norm_pts = [norm(x, y) for x, y in pts]

        # retrace to baseline before each segment (except the first)
        if seg_i > 0:
            # retrace: current X → baseline Y, then slide X to segment start
            prev_end = norm_pts[0]
            rows.append(f"{idx},retrace_ground,{prev_end[0]},{BASE_YN},0")
            idx += 1
            rows.append(f"{idx},retrace_travel,{norm_pts[0][0]},{BASE_YN},0")
            idx += 1

        for xn, yn in norm_pts:
            rows.append(f"{idx},{name},{xn},{yn},0")
            idx += 1

    return "\n".join(rows)


def build_processing_sketch():
    """Return the full Processing 4 sketch source as a string."""

    # Embed the draw-order path data as a Processing array literal
    def fmt_pts(pts):
        return "{" + ", ".join(f"{norm(x,y)[0]}f, {norm(x,y)[1]}f" for x,y in pts) + "}"

    segments = []
    for name in DRAW_ORDER:
        if name not in path_by_name:
            continue
        cls, pts = path_by_name[name]
        pairs = [(norm(x, y)) for x, y in pts]
        flat = []
        for xn, yn in pairs:
            flat.append(f"{xn}f")
            flat.append(f"{yn}f")
        arr = "{ " + ", ".join(flat) + " }"
        segments.append((name, cls, arr, len(pts)))

    seg_decls = []
    for name, cls, arr, npts in segments:
        safe = name.upper()
        seg_decls.append(f"  // {name}  ({npts} pts)")
        seg_decls.append(f"  float[] SEG_{safe} = {arr};")

    seg_list = ", ".join(f"SEG_{n.upper()}" for n, _, _, _ in segments)
    seg_names = ", ".join(f'"{n}"' for n, _, _, _ in segments)

    decl_block = "\n".join(seg_decls)

    sketch = f'''\
/**
 * oxford_skyline.pde — Processing 4
 *
 * Animated phosphor display of the Oxford Dreaming Spires skyline.
 * Coordinates are normalised: X ∈ [−1, +1], Y ∈ [−1, +1]
 *   baseline Y ≈ −0.417,  finial tip Y ≈ 0.917
 *
 * Controls:
 *   SPACE  — toggle scan animation
 *   +/−    — adjust scan speed
 *   G      — toggle phosphor glow
 *   B      — toggle beam blanking simulation
 *   S      — save frame as PNG
 *   R      — reset
 */

// ── Canvas & mapping ─────────────────────────────────────────────
int   CW = 1200, CH = 800;   // canvas pixels
float MX, MY;                // map centre
float SCALE;                 // world units → pixels

// ── Phosphor palette ─────────────────────────────────────────────
color COL_BG       = #060c06;
color COL_BEAM     = #59ff3a;   // hot beam centre
color COL_GLOW     = #1a5c10;   // phosphor bloom
color COL_PERSIST  = #0d3008;   // persistence trail
color COL_BASELINE = #1d7a0a;
color COL_FINIAL   = #ffee44;

// ── Animation state ──────────────────────────────────────────────
boolean animating   = true;
boolean showGlow    = true;
boolean beamBlank   = false;
float   scanSpeed   = 0.6;       // pts per frame
float   drawHead    = 0;         // fractional point index in stream
int     totalPts    = 0;

// ── Path data (normalised, flat float pairs) ──────────────────────
{decl_block}

float[][] ALL_SEGS = {{ {seg_list} }};
String[]  SEG_NAMES = {{ {seg_names} }};

// ── Persistence buffer ───────────────────────────────────────────
PGraphics persist;

// ─────────────────────────────────────────────────────────────────
void setup() {{
  size(1200, 800);
  colorMode(RGB, 255);
  smooth(8);

  MX    = width  * 0.5f;
  MY    = height * 0.56f;   // push baseline slightly below centre
  SCALE = width  * 0.46f;   // 92% of half-width → comfortable margins

  // count total draw points
  for (float[] seg : ALL_SEGS) totalPts += seg.length / 2;

  persist = createGraphics(width, height);
  persist.beginDraw();
  persist.background(COL_BG);
  persist.endDraw();
}}

// ─────────────────────────────────────────────────────────────────
void draw() {{
  // fade persistence buffer
  persist.beginDraw();
  persist.fill(red(COL_BG), green(COL_BG), blue(COL_BG), 18);
  persist.noStroke();
  persist.rect(0, 0, width, height);
  persist.endDraw();

  // composite onto canvas
  background(COL_BG);
  image(persist, 0, 0);

  if (animating) {{
    drawHead += scanSpeed;
    if (drawHead >= totalPts) drawHead = 0;
  }}

  // draw all segments up to the scan head
  int head = (int) drawHead;
  int drawn = 0;
  outerLoop:
  for (int s = 0; s < ALL_SEGS.length; s++) {{
    float[] seg = ALL_SEGS[s];
    int npts = seg.length / 2;

    for (int i = 0; i < npts - 1; i++) {{
      if (drawn >= head) break outerLoop;

      float x0 = map(seg[i*2],       -1, 1, MX - SCALE, MX + SCALE);
      float y0 = map(seg[i*2+1],     -1, 1, MY + SCALE*0.67f, MY - SCALE*0.67f); // Yn already flipped
      float x1 = map(seg[(i+1)*2],   -1, 1, MX - SCALE, MX + SCALE);
      float y1 = map(seg[(i+1)*2+1], -1, 1, MY + SCALE*0.67f, MY - SCALE*0.67f);

      // choose colour by segment type
      color col = COL_BEAM;
      String nm = SEG_NAMES[s];
      if (nm.equals("base"))           col = COL_BASELINE;
      else if (nm.equals("central_spire") && seg[i*2+1] > 0.8f) col = COL_FINIAL;

      // glow pass
      if (showGlow) {{
        persist.beginDraw();
        persist.strokeWeight(6);
        persist.stroke(red(COL_GLOW), green(COL_GLOW), blue(COL_GLOW), 60);
        persist.line(x0, y0, x1, y1);
        persist.endDraw();
      }}

      // hot beam
      persist.beginDraw();
      persist.strokeWeight(1.5f);
      persist.stroke(red(col), green(col), blue(col), 230);
      persist.line(x0, y0, x1, y1);
      persist.endDraw();

      drawn++;
    }}
    drawn++;   // account for the last point in segment
  }}

  // HUD overlay
  drawHUD();
}}

// ─────────────────────────────────────────────────────────────────
void drawHUD() {{
  fill(COL_BASELINE);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text("OXFORD DREAMING SPIRES  //  v2", 14, 12);
  text("pts: " + totalPts + "  speed: " + nf(scanSpeed, 1, 1) +
       "  glow:" + (showGlow?"ON":"OFF") + "  blank:" + (beamBlank?"ON":"OFF"), 14, 26);

  // baseline marker label
  float baseY = map(-0.417f, -1, 1, MY + SCALE*0.67f, MY - SCALE*0.67f);
  stroke(COL_BASELINE, 60);
  strokeWeight(0.5f);
  line(0, baseY, width, baseY);
  noStroke();
  text("baseline", 14, baseY + 3);
}}

// ─────────────────────────────────────────────────────────────────
void keyPressed() {{
  if (key == ' ')      animating = !animating;
  if (key == '+' || key == '=') scanSpeed = min(scanSpeed + 0.2f, 8);
  if (key == '-')      scanSpeed = max(scanSpeed - 0.2f, 0.1f);
  if (key == 'g' || key == 'G') showGlow = !showGlow;
  if (key == 'b' || key == 'B') beamBlank = !beamBlank;
  if (key == 's' || key == 'S') saveFrame("oxford_skyline_####.png");
  if (key == 'r' || key == 'R') {{
    drawHead = 0;
    persist.beginDraw();
    persist.background(COL_BG);
    persist.endDraw();
  }}
}}
'''
    return sketch


# ─── Main ─────────────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Generate Oxford skyline output files.")
    parser.add_argument("--out-dir", default=None,
                        help="Output directory (default: same as this script)")
    args = parser.parse_args()

    script_dir = Path(__file__).parent
    out_dir    = Path(args.out_dir) if args.out_dir else script_dir
    out_dir.mkdir(parents=True, exist_ok=True)

    # ── JSON ────────────────────────────────────────────────────────
    json_path = out_dir / "skyline.json"
    data = build_json()
    json_path.write_text(json.dumps(data, indent=2))
    print(f"✓  {json_path}  ({json_path.stat().st_size:,} bytes)")

    # ── Normalised CSV ───────────────────────────────────────────────
    csv_path = out_dir / "skyline_norm.csv"
    csv_path.write_text(build_norm_csv(DRAW_ORDER))
    print(f"✓  {csv_path}")

    # ── Retrace stream CSV ───────────────────────────────────────────
    ret_path = out_dir / "skyline_retrace.csv"
    ret_path.write_text(build_retrace_csv())
    print(f"✓  {ret_path}")

    # ── Processing sketch ────────────────────────────────────────────
    pde_path = out_dir / "oxford_skyline.pde"
    pde_path.write_text(build_processing_sketch())
    print(f"✓  {pde_path}")

    # ── Summary ──────────────────────────────────────────────────────
    total_pts = sum(len(pts) for _, _, pts in PATHS)
    draw_pts  = sum(len(path_by_name[n][1]) for n in DRAW_ORDER if n in path_by_name)
    print()
    print(f"   Total path points (all layers):  {total_pts}")
    print(f"   Draw-order points (osc stream):  {draw_pts}")
    print(f"   Segments in draw order:          {len(DRAW_ORDER)}")
    print()
    print("   Next step → open oxford_skyline.pde in Processing 4")
    print("   SPACE=play  +/-=speed  G=glow  B=blank  S=save  R=reset")


if __name__ == "__main__":
    main()
