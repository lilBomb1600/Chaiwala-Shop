# Product

<!-- impeccable:product-schema 1 -->

Inferred from Arman's brief and the repo on 2026-11-03 (no answer channel in this run). Facts below come from the shop's own Google listing, its in-store menu boards, and Yelp. Anything marked CONFIRM is in CONFIRM.md.

## Platform

web

## Users

- People in and around downtown Concord deciding where to get chai or a quick bite, mostly on a phone, often already near Todos Santos Plaza, the movie theater or the Salvio St garage.
- South Asian regulars who want chai the way it is made at home: brewed, in a clay kullad, with a choice of spice.
- Curious first-timers who have never heard of paan chai, jaljeera or Maggi and need the menu to explain itself (a Yelp regular says he "just asked" about names he didn't know).

## Product Purpose

The site gets a visitor from "what is this place" to walking in or calling in an order. Success: they know the chai options and prices, find the hours and address in one glance, and tap Call or Directions.

## Positioning

A chaiwala on Salvio St: ten real chai flavors brewed to order, hot or iced, served in a clay kullad if you want it, next to cheap vegetarian desi street food (Maggi, bun maska, kullad pizza, peri peri fries). No chain coffee shop nearby makes chai this way.

## Operating Context

- Order at the counter, dine in or take out. No reservations. Delivery and online ordering are advertised on the shop's own boards (CONFIRM the link).
- Every chai is made with 2% milk and one spoon of sugar unless you ask. Soy, almond or oat milk is $1 extra. A kullad (clay cup) is $1 extra on any drink.
- Hours: 10 AM to 9 PM Sunday to Thursday, 10 AM to 10 PM Friday and Saturday.

## Capabilities and Constraints

- Next.js 16 (App Router) + Tailwind 4 + Framer Motion, deployed on Vercel at chaiwala-shop.vercel.app. Routes: /, /menu, /gallery, /about, /contact.
- The site is indexed (robots index: true) and carries no preview watermark. Keep it that way.
- No working form backend. Do not ship forms that pretend to send.

## Brand Commitments

- Name: Chaiwala Shop. Signage and boards use a maroon red with white and a serif wordmark; the logo reads "Authentic Experience", "Est. 2023" (the brand; the Concord shop opened later, CONFIRM).
- The owner's own lines from his boards and posts: "Chai and Desi Street bites", "Good Chai. Great Food. Better Moods.", "Take a chai break.", "Every sip, a new experience".
- Copy is written in the owner's first person, plain and short. No narrator voice, no em dashes, no benefit filler.

## Evidence on Hand

- Menu: the two vertical TV boards on the Concord counter (Google photos gm91 drinks, gm94 food), plus the earlier Yelp copy of the food board.
- Eight real five-star Yelp reviews in src/data/reviews.ts. Do not edit or add to them.
- Photos: most of the shop's Google "by owner" images are AI-generated marketing graphics and are NOT used. Real photos: the Concord interior (gm22), and Reel stills of chai in kullads (gm74, gm51), Maggi (gm68), white sauce pasta (gm48), peri peri fries (gm71), prep (gm46) and fresh juice (gm64). See public/photos/CREDITS.md.
- No owner name, no founding story, no catering offer and no email are confirmed. Do not invent them.

## Product Principles

1. The chai is the reason. Lead with it and let people make theirs.
2. Real prices from the board, or nothing.
3. Phone first: Call and Directions are never more than a thumb away.
4. The menu explains unfamiliar names in a line, in the owner's voice.
5. Only real photos of the real shop and food.
