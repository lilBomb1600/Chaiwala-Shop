export type Review = {
  name: string;
  location: string;
  rating: number;
  date: string;
  text: string;
  badge?: string;
  featured?: boolean;
};

// Real customer reviews, sourced from Yelp. Do not invent or edit these.
export const reviews: Review[] = [
  {
    name: "Abha S.",
    location: "Walnut Creek, CA",
    rating: 5,
    date: "March 4, 2026",
    badge: "Elite 26 · 49 Coffee reviews",
    text: `Just discovered this spot! Love the kesari chai, hits the spot! Definitely recommend trying. Also, if you're a Maggie fan but too lazy to make the "2 min" noodles at home, also a must try...it really takes you back to childhood! Looking forward to trying more of the snacks here!`,
    featured: true,
  },
  {
    name: "Wesley M.",
    location: "SoMa, San Francisco, CA",
    rating: 5,
    date: "March 4, 2026",
    text: "This is a new café with all sorts of interesting and comfy chai on the menu, as well as coffees, sweets, and many kinds of hot food for a light meal. I liked it: it's exactly the kind of place I seek out for a cozy break during the day. I tried kinds of chai that I never had the pleasure to experience before, like paan, which had a subtle floral taste like rose. Their hot food was much better than anything you'd find at the larger chain coffee shops. When I saw a menu item with an unfamiliar name to me, I just asked about it! The place had cozy vibes, and it's at a great spot right next to Todos Santos, the movie theater, and the parking garage. Downtown needs places like this so I'm glad they're here.",
  },
  {
    name: "Grace C.",
    location: "Concord, CA",
    rating: 5,
    date: "March 12, 2026",
    text: "Place is clean and staff are polite. I ordered 3 chai drinks and they were ready in just over 5 mins. The tea is strong so if u are sensitive to caffeine be careful what time consume or else u will be up all night. Not too sweet but there is sugar available if u want it sweeter. Plenty of space to have a date inside, outside, or at todos santos plaza. Didn't try the food so I can't speak on that.",
  },
  {
    name: "Sandra N.",
    location: "Concord, CA",
    rating: 5,
    date: "March 13, 2026",
    text: "My friend and I like to try new foods and had a lot of fun here. We ordered a bunch of drinks to try: the cucumber mint refresher (made with Sprite but maybe better with just ice water), crunchy jaljeera - a spicy savory drink like a cold broth with fried crunchy savory topping, hot saffron chai and hot rose chai in clay cups - both delicious, saffron iced tea - amazing, mojito - very refreshing. We also tried the veggie cheese maggi noodles - mild, fun and delicious! The veggie burgers made mild with the peri peri sauce on the side... #1 the BEST! This place is super vegetarian friendly, all milk drinks (chais and other) can be made with oat milk or almond milk. I loved the spice in the dishes I ordered mild - it added a little smoky heat that my mouth loved and my stomach didn't complain! Staff is very friendly and helpful. Owner said menu with more details will be coming soon.",
    featured: true,
  },
  {
    name: "Trevor Y.",
    location: "Redwood City, CA",
    rating: 5,
    date: "April 28, 2026",
    text: "We came in 8:30pm on a Wednesday night and there were two other parties sitting. The music is not too loud, good for catching up or sitting to work, at least when it's not too crowded. It is neat and tidy, even at the end of the day. Staff is friendly. Most important, the chai was delicious! Served mildly sweetened with one spoon of sugar by default, so ask if you want no sweetener. Alternative milk (soy, almond, oat) are available for a $1 charge. You can add your own sweetener if you'd like! We will be back.",
  },
  {
    name: "S D.",
    location: "Concord, CA",
    rating: 5,
    date: "June 2, 2026",
    text: "My new favorite place for chai!! Masala chai is my favorite. They have a variety of chais available amongst other great things on menu.",
  },
  {
    name: "Taylor B.",
    location: "Concord, CA",
    rating: 5,
    date: "June 24, 2026",
    text: "Lovely place and service. Very welcoming and calming atmosphere with great music and food. Definitely try them out if you haven't!",
  },
  {
    name: "Piyusha K.",
    location: "Walnut Creek, CA",
    rating: 5,
    date: "July 6, 2026",
    text: "Been here twice, and their customer service is great, and I really loved their chai! I also tried their chai biscuits, and they were delicious. Definitely will be back again soon!!",
  },
];

export const averageRating =
  Math.round((reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length) * 10) / 10;

export const reviewCount = reviews.length;
