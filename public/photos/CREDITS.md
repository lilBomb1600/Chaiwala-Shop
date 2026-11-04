# Photo credits

Every photo on the site is the shop's own, from its Google Maps listing ("By owner"), downloaded at full size into
`Websites/_leads/chaiwala-shop-gm/gmNN.jpg` on 2026-11-03. No stock, no AI, no upscaling, no retouching. The files here
are cut by `scripts/build_photos.py` (EXIF rotation baked in, color converted to sRGB, EXIF/GPS/ICC stripped, responsive
WebP never wider than the source crop). `public/og.jpg` is the room photo at 1200 x 630.

## Used

| Slot | Source | Source size | What it shows | Notes |
|---|---|---|---|---|
| room-wide | gm22 | 3330 x 2235 | The Concord counter, clay cups by the register, maroon chairs, the menu screens | Hero on desktop, gallery, about. A man we take to be the owner is behind the counter (unconfirmed, see CONFIRM.md #12); never captioned. |
| room-tall | gm22 | 3330 x 2235 | Same photo, 9:16 crop on the counter | Hero on phones |
| room-chairs | gm22 | 3330 x 2235 | The chairs and round tables along the counter | Visit section, gallery |
| chai-kullads | gm74 | 1080 x 1920 | Two chais in clay kullads | Reel still; caption burned in at the top was cropped off |
| chai-bun | gm51 | 720 x 1280 | Two chais in kullads and a bun on checkered paper | Reel still, small slot |
| maggi | gm68 | 1080 x 1920 | Maggi going into a bowl | Reel still |
| pasta | gm48 | 1080 x 1920 | White sauce pasta | Reel still; caption cropped off |
| fries | gm71 | 720 x 1280 | Peri peri fries tossed in a steel bowl | Reel still; caption cropped off |
| prep | gm46 | 720 x 1280 | Chopped corn, peppers, onion and paneer | Reel still |
| juice | gm64 | 720 x 1280 | Fresh orange juice pouring into a cup | Reel still |

Only gm22 is wide enough (>= 1920 px) for a full-bleed slot. The Reel stills are 720-1080 px video frames, so they only
appear in small 4:5 tiles (280-430 px wide on screen).

## Read for facts, not shown

- gm91 (drinks) and gm94 (food): the two vertical menu screens over the Concord counter (both visible in gm22). All
  menu prices on the site come from these. See CONFIRM.md.
- gm21 (food) and gm77 (drinks): a second, landscape set of boards with higher prices. Not used; question in CONFIRM.md.

## Not used

- AI-generated marketing graphics (renders, posters, people who are not staff, cartoon cups, a plane seat screen):
  gm01-gm19, gm23-gm45, gm47, gm49, gm50, gm52, gm53, gm55-gm58, gm60-gm63, gm65-gm67, gm69, gm70, gm72, gm73, gm75,
  gm76, gm78-gm90, gm92, gm93, gm95. Most are 1024 x 1536, 1254 x 1254 or 1536 x 1024 image-model outputs, often
  with the logo or headline text set into the picture.
- Real but skipped: gm20 (staff pouring chai, a caption across the middle of a 576 px frame), gm54 (a sandwich in a
  takeout box under three text overlays), gm59 (an iced coffee in a room with brick walls and chalkboards that don't
  match the Concord shop).

## Removed from the first version

`public/images/gallery/*`: brand-flatlay.png, branded-shake-cup.jpg, farmers-market-pizza.jpg, peri-peri-fries.jpg and
tandoori-paneer-sandwich.jpg were the same AI marketing graphics at 348-510 px (from Yelp). hot-chai-cup.jpg was a real
customer photo but only 300 x 195. All six are gone.
