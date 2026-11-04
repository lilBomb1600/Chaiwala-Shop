"""Cut every photo on the Chaiwala Shop site from the shop's own photos, at the size they were posted.

Run with:  python -I scripts/build_photos.py <leads-dir> <out-dir> <manifest.ts> [--preview <dir>]
  leads-dir: Websites/_leads/chaiwala-shop-gm (gmNN.jpg = the shop's Google "by owner" photos, full resolution)
  out-dir:   public/photos
  manifest:  src/data/photos.ts (generated: every slot's widths and size, read by <Photo>)

Most of the shop's Google photos are AI-generated marketing graphics (posters, renders, people who do not work
there). None of those are used. The slots below are the real ones: the Concord room and stills from the shop's
own Reels. See public/photos/CREDITS.md for the full sort.

The pipeline, the same for every slot:
  1. ImageOps.exif_transpose, so phone rotation is baked in before anything else
  2. Display P3 / embedded profiles are converted to sRGB (ImageCms)
  3. a crop in source pixels, per slot (captions burned into the Reel stills are cropped off, never painted over)
  4. Lanczos downscale to each responsive width; a width is only made if the crop has at least that many pixels,
     so nothing is ever upscaled (the widest file is the crop's own width when it is under the next step)
  5. a light unsharp mask after the downscale, then WebP with no EXIF, no GPS and no ICC left in the file
No AI, no upscaling, no retouching, no stock.
"""

import io
import json
import os
import sys

from PIL import Image, ImageCms, ImageFilter, ImageOps

LEADS, OUT, MANIFEST = sys.argv[1:4]
PREVIEW = sys.argv[sys.argv.index("--preview") + 1] if "--preview" in sys.argv else None
os.makedirs(OUT, exist_ok=True)

STEPS = [640, 960, 1280, 1920, 2560]
SRGB = ImageCms.createProfile("sRGB")


def load(rel: str) -> Image.Image:
    im = Image.open(os.path.join(LEADS, rel))
    im = ImageOps.exif_transpose(im)
    icc = im.info.get("icc_profile")
    im = im.convert("RGB")
    if icc:
        src = ImageCms.ImageCmsProfile(io.BytesIO(icc))
        im = ImageCms.profileToProfile(im, src, SRGB, renderingIntent=0, outputMode="RGB")
    im.info.clear()
    return im


# slot: (source, crop box in source px after rotation, webp quality, what it shows)
JOBS: dict[str, tuple[str, tuple[int, int, int, int], int, str]] = {
    # the opening, desktop: the Concord room, counter left of center, the menu screens on the right (the board hangs there)
    "room-wide": ("gm22.jpg", (0, 70, 3330, 2151), 78, "Inside Chaiwala Shop on Salvio St: the counter, clay cups by the register, maroon chairs and the menu screens"),
    # the opening, phones: the same photo, 9:16, on the counter
    "room-tall": ("gm22.jpg", (760, 0, 2017, 2235), 78, "The counter at Chaiwala Shop, clay cups by the register"),
    # visit / about: the maroon chairs and the counter's edge
    "room-chairs": ("gm22.jpg", (0, 1000, 1240, 2235), 80, "Maroon leather chairs and round tables along the counter"),
    # Reel stills, all 4:5, captions cropped off
    "chai-kullads": ("gm74.jpg", (0, 520, 1080, 1870), 84, "Two chais in clay kullads"),
    "chai-bun": ("gm51.jpg", (0, 190, 720, 1090), 84, "Two chais in kullads and a bun on a checkered paper"),
    "maggi": ("gm68.jpg", (0, 300, 1080, 1650), 84, "Maggi noodles going into a bowl"),
    "pasta": ("gm48.jpg", (76, 760, 1004, 1920), 84, "White sauce pasta with broccoli and peppers"),
    "fries": ("gm71.jpg", (0, 340, 720, 1240), 84, "Peri peri fries tossed in a steel bowl"),
    "prep": ("gm46.jpg", (0, 190, 720, 1090), 84, "Chopped corn, peppers, onion and paneer"),
    "juice": ("gm64.jpg", (0, 170, 720, 1070), 84, "Fresh orange juice pouring into a cup"),
}

CAP = {"room-tall": 1280}


def origin(src: str, box: tuple[int, int, int, int], shows: str) -> str:
    return (
        f"Not generated. Sourced: Chaiwala Shop's own Google Maps 'by owner' photo {src}, crop {list(box)}, "
        f"cut by scripts/build_photos.py (sRGB, EXIF stripped, Lanczos downscale only). Shows: {shows}."
    )


def build(name: str) -> dict:
    src, box, q, shows = JOBS[name]
    crop = load(src).crop(box)
    cw, ch = crop.size
    if PREVIEW:
        p = crop.copy()
        p.thumbnail((900, 900))
        p.save(os.path.join(PREVIEW, f"{name}.jpg"), quality=85)
    cap = CAP.get(name, STEPS[-1])
    widths = [w for w in STEPS if w <= min(cw, cap)]
    # the crop's own width joins when it is well past the last step and under the cap
    if cw <= cap and (not widths or cw - widths[-1] > 160):
        widths.append(cw)
    for w in widths:
        h = round(ch * w / cw)
        im = crop if w == cw else crop.resize((w, h), Image.LANCZOS)
        im = im.filter(ImageFilter.UnsharpMask(radius=0.7, percent=40, threshold=2))
        path = os.path.join(OUT, f"{name}-{w}.webp")
        im.save(path, "WEBP", quality=q, method=6)
        # provenance travels with the file (impeccable's sidecar format): where this raster came from
        with open(path + ".json", "w", encoding="utf-8", newline="\n") as fh:
            json.dump({"prompt": origin(src, box, shows)}, fh, indent=2)
        print(f"  {name}-{w}.webp  {w}x{h}  {os.path.getsize(path) / 1024:.0f} KB")
    return {"src": src, "w": cw, "h": ch, "widths": widths, "alt": shows}


def og() -> None:
    """public/og.jpg: the room at 1200x630 for link previews."""
    im = load("gm22.jpg").crop((0, 260, 3330, 2008)).resize((1200, 630), Image.LANCZOS)
    path = os.path.join(os.path.dirname(OUT.rstrip("/\\")), "og.jpg")
    note = origin("gm22.jpg", (0, 260, 3330, 2008), "the Concord counter, for link previews")
    im.save(path, "JPEG", quality=84, optimize=True, progressive=True, comment=b"impeccable:prompt\x00" + note.encode("utf-8"))
    print(f"  og.jpg 1200x630 {os.path.getsize(path) / 1024:.0f} KB")


if __name__ == "__main__":
    if PREVIEW:
        os.makedirs(PREVIEW, exist_ok=True)
    for f in os.listdir(OUT):
        if f.endswith(".webp") or f.endswith(".webp.json"):
            os.remove(os.path.join(OUT, f))
    data = {}
    for name in JOBS:
        print(name)
        data[name] = build(name)
    og()
    lines = [
        "/* Generated by scripts/build_photos.py. Do not edit by hand: change JOBS there and rerun. */",
        "",
        "export type PhotoSlot = { w: number; h: number; widths: number[]; src: string; alt: string };",
        "",
        "export const photos = {",
    ]
    for name, d in data.items():
        key = name if name.isidentifier() else f'"{name}"'
        widths = ", ".join(str(w) for w in d["widths"])
        alt = d["alt"].replace('"', '\\"')
        lines.append(f'  {key}: {{ w: {d["w"]}, h: {d["h"]}, widths: [{widths}], src: "{d["src"]}", alt: "{alt}" }},')
    lines += ["} satisfies Record<string, PhotoSlot>;", "", "export type PhotoName = keyof typeof photos;", ""]
    with open(MANIFEST, "w", encoding="utf-8", newline="\n") as fh:
        fh.write("\n".join(lines))
    print("manifest", MANIFEST)
