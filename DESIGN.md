---
name: Chaiwala Shop
description: A chai stall's painted rate boards hung over the real Concord room.
colors:
  maroon: "#8e1b22"
  maroon-hi: "#a3242c"
  maroon-deep: "#5e1016"
  maroon-ink: "#3a080c"
  turmeric: "#f4b223"
  turmeric-deep: "#c98a0c"
  tea: "#1a0d0b"
  tea-2: "#26130f"
  enamel: "#fff6ea"
  clay: "#b5582f"
  leaf: "#2e8b3e"
typography:
  display:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "clamp(2.7rem, 8.6vw, 5.4rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.005em"
  hero:
    fontFamily: "Shrikhand, Cooper Black, Georgia, serif"
    fontSize: "min(5.3vw, 9.2vh, 5.5rem)"
    fontWeight: 400
    lineHeight: 0.98
  rate:
    fontFamily: "Anek Latin, Arial Narrow, Arial, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "0.035em"
    fontVariation: "'wdth' 75"
  label:
    fontFamily: "Anek Latin, Arial, sans-serif"
    fontSize: "0.78rem"
    fontWeight: 700
    letterSpacing: "0.06em"
  body:
    fontFamily: "Anek Latin, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
rounded:
  plate: "12px"
  option: "11px"
  board: "18px"
  keyline: "11px"
spacing:
  gutter-phone: "16px"
  gutter-tablet: "24px"
  gutter-desktop: "48px"
  section: "112px"
  section-phone: "80px"
components:
  button-primary:
    backgroundColor: "{colors.turmeric}"
    textColor: "{colors.maroon-ink}"
    typography: "{typography.rate}"
    rounded: "{rounded.plate}"
    padding: "11px 22px"
    height: "48px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.enamel}"
    typography: "{typography.rate}"
    rounded: "{rounded.plate}"
    padding: "11px 22px"
    height: "48px"
  button-maroon:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.enamel}"
    typography: "{typography.rate}"
    rounded: "{rounded.plate}"
  option:
    backgroundColor: "{colors.maroon-deep}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.option}"
    padding: "10px 14px"
  option-selected:
    backgroundColor: "{colors.turmeric}"
    textColor: "{colors.maroon-ink}"
    rounded: "{rounded.option}"
  board-maroon:
    backgroundColor: "{colors.maroon}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.board}"
    padding: "32px 28px 28px"
  board-turmeric:
    backgroundColor: "{colors.turmeric}"
    textColor: "{colors.maroon-ink}"
    rounded: "{rounded.board}"
  board-enamel:
    backgroundColor: "{colors.enamel}"
    textColor: "{colors.maroon-ink}"
    rounded: "{rounded.board}"
  board-tea:
    backgroundColor: "{colors.tea-2}"
    textColor: "{colors.enamel}"
    rounded: "{rounded.board}"
---

# Design System: Chaiwala Shop

Recorded from the built site (remaster, 2026-11-03). The direction contract is a source comment at the top of
`src/app/layout.tsx` (seed ff4ec2c6, the hand-painted shop signboard). Facts live in `src/data/` and every open
question is in `CONFIRM.md`; photo sources are in `public/photos/CREDITS.md`.

## Overview

**Creative North Star: "The Rate Board"**

The page is the stack of painted tin boards that hangs over every chai stall: the shop's own maroon, white letters
with a turmeric shade, a keyline a brush width in from the edge, prices on dotted leaders. The boards hang over the
real Concord room (the only full-size real photo the shop has) and over painted walls of maroon, turmeric and
tea-black. Nothing pretends to be a cafe magazine; it is the counter's own menu screens, brought to life.

One motion idea runs the page: things are hung, so they swing and settle. The opening board hangs from the ceiling on
two cords and swings when the page moves; the open tag under it swings faster on its own; prints, chits and boards come
into view a little crooked and straighten from the top. The one tool, "Tell me how you take it.", is the drinks board
made interactive: every choice pours a fresh cup from a steel kettle.

Raises carried from the direction round: a bare field set against one crowded painted rate line (the boutique sleeve);
hung things move at unequal tempos (the glyph rain); compose a choice and watch it play out (the gravity garden); the
kullad is unglazed terracotta, never glossy (the kiln shelf); the menu filter isolates and dims the rest (the event
display); the flavor name steps one course with an overshoot (the destination blind).

**Key Characteristics:**
- Committed color: maroon carries the boards and about half the sections; turmeric is the second paint.
- Painted display letters with a hard shade, condensed rate-board caps, plain body.
- Real photos only, in frames sized to their resolution.
- Swing-and-settle motion from a top pivot, driven by scroll or by entering view.
- Phone first: a three-button board pinned to the bottom of the screen.

## Colors

Two paints and a night: the shop's enamel maroon, the sign painter's turmeric, and tea-black behind them.

### Primary
- **Chaiwala Maroon** (maroon): the boards, the builder and reviews walls, the footer, the menu sheet on phones. Sampled
  from the shop's own menu boards and sign. Hover lifts to maroon-hi; pressed plates and unselected options sit on
  maroon-deep; maroon-ink is the text color on turmeric and enamel.

### Secondary
- **Turmeric** (turmeric): letter shade on maroon, prices, the rate line, the selected option, the primary plate, the
  open-day highlight, the focus ring, text selection. turmeric-deep is reserved for pressed turmeric.

### Tertiary
- **Kullad Clay** (clay): only the drawn kullad and its spices in the chai builder.
- **Veg Green** (leaf): only the Indian vegetarian mark (green dot in a green square).

### Neutral
- **Tea-Black** (tea): the page ground, the menu wall, Visit, the nav once scrolled. tea-2 is the dark board (the
  builder stage, the phone action bar).
- **Enamel** (enamel): letters on maroon and tea, and the light board (hours, reviews, photo frames). Secondary text on
  colored fields is enamel or maroon-ink at reduced opacity, tinted by the field, never gray.

### Named Rules
**The Two Paints Rule.** Every field is maroon, turmeric or tea-black, and every board is maroon, turmeric, enamel or
tea. A board never sits on a field of its own color.

**The Clay Stays in the Cup Rule.** Terracotta appears only in the drawn kullad and its spices; it is not an accent.

## Typography

**Display Font:** Shrikhand (with Cooper Black, Georgia)
**Body Font:** Anek Latin at normal width (with Arial)
**Label Font:** Anek Latin at 75% width, 800, capitals

**Character:** Shrikhand is drawn from Gujarati lettering and paints like a desi shop sign; Anek is an Indian
multi-script family whose width axis gives condensed rate-board caps and an easy reading face from one file.

### Hierarchy
- **Hero** (400, min(5.3vw, 9.2vh, 5.5rem) desktop, clamp(2.9rem, 13vw, 4rem) phones, 0.98): "Take a chai break." only.
- **Display** (400, clamp(2.7rem, 8.6vw, 5.4rem), 0.98): every section heading, written as a short sentence with a
  period; inner page titles go to clamp(3rem, 10vw, 6rem).
- **Title** (Shrikhand 400, 2rem to 3rem): board titles (Chai, Hours), the builder's flavor name (2.3rem to 3.6rem).
- **Rate** (Anek 800, 75% width, caps, 1.0 to 1.3rem, 0.035em): item names, prices (tabular), plates, option labels.
- **Body** (Anek 400, 17px, 1.55, measure 42 to 60ch): one plain line under each heading, reviews, notes.
- **Label** (Anek 700, 0.72 to 0.8rem, 0.06em, caps): board specs (16 oz, Hot or iced), fieldset legends, the count.

### Named Rules
**The Painted Shade Rule.** Shrikhand always carries its shade: a hard text-shadow at 0.045em / 0.055em, no blur, in
turmeric on maroon and tea, maroon on turmeric, maroon-ink on turmeric walls. This is the sign painter's letter
shade, the world's own device; it is never used as a box shadow.

**The Heading Speaks Alone Rule.** No label above a heading. Specs and legends go under titles or label form groups.

## Layout

Full-bleed painted sections, content in a 1440px max container with 16 / 24 / 48px gutters. Sections run 80px
(phones) to 112px (desktop) top and bottom. Headings sit in a two-column split from 1024px (heading left, one plain
line right, aligned to the baseline); below that everything is one column (`grid-cols-1`, `min-w-0` on items).
Horizontal rows (menu boards, counter photos, reviews) are native swipe rails with snap, a peek of the next item,
mouse drag and arrow plates from 768px; they never move with vertical scroll. `main` is `overflow-x-clip` so tilted
items waiting to swing straight never widen the phone viewport. On phones the builder's stage is sticky under the nav
while the options scroll beneath it, and a three-button action board is pinned to the bottom once the opening's
buttons scroll away (hidden again over the footer).

## Elevation & Depth

Flat paint, real shadows. Boards are flat color with no bevel; they read as hung objects through one cast shadow and
through motion. Plates (buttons) carry a short bottom inset so they read as pressable, and press down 1px.

### Shadow Vocabulary
- **Hung board** (`box-shadow: 0 2px 4px rgb(12 3 2 / 0.35), 0 22px 44px -14px rgb(12 3 2 / 0.6)`): every board.
- **Plate** (`box-shadow: inset 0 0 0 1.5px <keyline>, inset 0 -3px 0 rgb(0 0 0 / 0.18), 0 6px 14px -6px rgb(12 3 2 / 0.55)`): buttons at rest; hover lifts 2px and deepens the drop.

### Named Rules
**The Nothing Floats Rule.** Depth comes from hanging, not glass: no backdrop blur, no glow. Anything raised is hung on
cords or nailed, and swings from its top edge.

## Shapes

Rounded tin. Boards 18px, with a painted keyline 9px in (2px, 11px radius) and a painted dot at each corner inside the
keyline. Plates 12px with their own keyline 4px in; options 11px. Photo frames are enamel boards without the keyline
(14px, the photo inside at 9px). The veg mark and stars are drawn SVG; icons are Lucide at 2.4 stroke.

## Components

### Buttons (plates)
- **Shape:** rounded plate (12px) with an inner keyline 4px in.
- **Primary:** turmeric with maroon-ink condensed caps, 48px tall.
- **Hover / Focus:** lifts 2px over 250ms (expo out), presses 1px on active; focus is a 3px turmeric ring offset 3px.
- **Ghost:** transparent with an enamel keyline, for the second action on dark fields. **Maroon** and **Enamel**
  variants sit on turmeric boards (Call it in, Copy my order).

### Chips (filters)
- **Style:** ghost plates in a wrapping row; the active one turns turmeric (`aria-pressed`). Non-matching rows on the
  boards fade to 25%, a board with no match fades to 35%.

### Cards / Containers (boards)
- **Corner Style:** 18px. **Background:** maroon, turmeric, enamel or tea-2, cycled so neighbors differ.
- **Shadow Strategy:** the hung-board shadow. **Border:** the painted keyline. **Internal Padding:** 32px top, 24 to
  28px sides.
- Rate boards: title in Shrikhand, spec under it in label caps, a board price or the veg mark top-right, rows with
  dotted leaders to tabular prices, an optional review line at the foot.

### Inputs / Fields
- The builder's choices are real radio inputs (visually hidden) with option plates: maroon-deep with a faint enamel
  keyline, turmeric and pressed when chosen, an enamel focus ring. Fieldset legends are label caps in turmeric.

### Navigation
- Wordmark left in Shrikhand ("Shop" in turmeric), five rate-wide links from 1024px, a turmeric Call plate. Transparent
  over the photo, tea-black at 95% once scrolled. Phones: wordmark, Call, and a menu button that wipes down a maroon
  sheet of big Shrikhand links plus Call and Directions.

### The hung board (opening)
The room photo full bleed (slow push and light-up on load, zoom and drift on scroll). A maroon board hangs from the
top edge on two brass cords: drops in, swings and settles (spring, low damping), then swings with scroll velocity. The
open tag hangs under it on its own cords with a stiffer, faster spring. Phones: the photo takes the top 54% and the
board hangs over its lower edge with the whole pitch and both buttons in the first screen.

### Tell me how you take it (signature)
A tea-black stage (flavor name stepping like a roll, rolling price on a turmeric plate, the drawn cup) beside the
drinks board as options. Every change pours: the kettle tilts, a stream of the flavor's color falls, the level rises,
two ripples spread, the tail drops in. Cup types (kullad, paper, clear iced with straw and ice), size scale, milk tint,
steam for hot, the spoon of sugar and the flavor's spices on the board all follow the order. The ticket reads the
order back in plain words with the real total, Call it in and Copy my order. Reduced motion: no pour, instant changes.

## Do's and Don'ts

### Do:
- **Do** take every price from the screens over the counter and note anything new in CONFIRM.md.
- **Do** keep the painted shade on Shrikhand and keep Shrikhand to headings, board titles and the wordmark.
- **Do** hang new things: pivot from the top, spring in, settle (`rotate` 2.4deg to 0, stiffness 90, damping 6).
- **Do** size photos to their source: only gm22 goes full bleed; Reel stills stay in 4:5 frames under 430px wide.
- **Do** write in the owner's first person, short sentences, headings as sentences with a period.

### Don't:
- **Don't** put a label above a heading.
- **Don't** use AI imagery, stock, or the shop's AI marketing graphics as photos.
- **Don't** add glass, glow, gradient text or a second accent color.
- **Don't** drive a horizontal row with vertical scroll.
- **Don't** imitate hardware (metal screws, bevels, embossing); the boards are paint.
