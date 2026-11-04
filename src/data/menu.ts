/*
 * The menu, as it reads on the two screens over the Concord counter (the shop's own Google photos gm91 = drinks,
 * gm94 = food; both screens are visible in the room photo gm22). The food prices match the copy of the same board on
 * Yelp that the first version of this site used. Item notes come from the shop's Yelp reviews, never invented.
 * Anything new from the boards is listed in CONFIRM.md.
 */

/** taste filters; every tag is true by the item's name or by its board (temperature, size, price) */
export type Tag = "cold" | "hot" | "sweet" | "spice" | "under7";

export type Item = {
  name: string;
  /** a second word for it: the Hindi name, or what it is */
  aka?: string;
  /** single price, or the regular price when the board lists regular / large */
  price?: number;
  large?: number;
  /** shown instead of a price */
  priceNote?: string;
  note?: string;
  tags: Tag[];
};

export type Board = {
  id: string;
  title: string;
  /** the line under the board title, as printed: sizes, temperature */
  spec?: string;
  /** one price for every item on the board */
  price?: { regular: number; large?: number };
  items: Item[];
  /** a real line from a review, printed at the foot of the board */
  quote?: { text: string; who: string };
  footnote?: string;
};

const both: Tag[] = ["hot", "cold"];

export const boards: Board[] = [
  {
    id: "chai",
    title: "Chai",
    spec: "Hot or iced · Regular / Large",
    price: { regular: 4.5, large: 6.5 },
    items: [
      { name: "Ginger", aka: "adrak", tags: [...both, "under7"] },
      { name: "Cardamom", aka: "elaichi", tags: [...both, "under7"] },
      { name: "Kadak", aka: "strong", tags: [...both, "under7"] },
      { name: "Masala", aka: "spiced", tags: [...both, "spice", "under7"] },
      { name: "Tulsi", aka: "holy basil", tags: [...both, "under7"] },
      { name: "Saffron", aka: "kesari", tags: [...both, "under7"] },
      { name: "Chocolate", tags: [...both, "sweet", "under7"] },
      { name: "Fennel", aka: "saunf", tags: [...both, "under7"] },
      { name: "Paan", aka: "betel leaf", tags: [...both, "under7"] },
      { name: "Rose", aka: "gulab", tags: [...both, "under7"] },
    ],
    footnote: "Made with 2% milk and one spoon of sugar. Kullad (clay cup) $1. Soy, almond or oat milk $1.",
    quote: { text: "Love the kesari chai, hits the spot!", who: "Abha S." },
  },
  {
    id: "refreshers",
    title: "Refreshers",
    spec: "16 oz",
    price: { regular: 6 },
    items: [
      { name: "Mojito", note: "No alcohol.", tags: ["cold", "under7"] },
      { name: "Zaffrani Iced Tea", aka: "saffron", tags: ["cold", "under7"] },
      { name: "Kala Khatta", tags: ["cold", "under7"] },
      { name: "Crunchy Jaljeera", note: "Spicy and savory, with a crunchy topping.", tags: ["cold", "spice", "under7"] },
      { name: "Cucumber Mint", tags: ["cold", "under7"] },
      { name: "Masala Lemonade", tags: ["cold", "spice", "under7"] },
      { name: "Blue Ocean", tags: ["cold", "under7"] },
    ],
  },
  {
    id: "coffee",
    title: "Coffee",
    spec: "Regular / Large",
    items: [
      { name: "Cappuccino", price: 5, large: 7, tags: ["hot", "under7"] },
      { name: "Filter Coffee", aka: "South Indian", price: 5, large: 7, tags: ["hot", "under7"] },
      { name: "Hot Chocolate", price: 5, large: 7, tags: ["hot", "sweet", "under7"] },
      { name: "Iced Filter Coffee", price: 6.5, tags: ["cold", "under7"] },
      { name: "Cold Coffee", price: 6.5, tags: ["cold", "under7"] },
      { name: "Brownie Cold Coffee", price: 8, tags: ["cold", "sweet"] },
    ],
  },
  {
    id: "milk",
    title: "Milk",
    spec: "Hot or iced · Regular / Large",
    items: [
      { name: "Badam Masala", aka: "almond", price: 6, large: 8, tags: [...both, "spice", "under7"] },
      { name: "Cardamom Milk", price: 5, large: 7, tags: [...both, "under7"] },
      { name: "Pink Milk", price: 6, tags: ["under7"] },
    ],
  },
  {
    id: "juice",
    title: "Fresh juice",
    spec: "12 oz",
    price: { regular: 7 },
    items: [
      { name: "Carrot", tags: ["cold"] },
      { name: "Orange", tags: ["cold"] },
      { name: "Mixed Fruit", tags: ["cold"] },
    ],
  },
  {
    id: "shakes",
    title: "Shakes",
    spec: "16 oz",
    price: { regular: 7 },
    items: [
      { name: "Butterscotch", tags: ["cold", "sweet"] },
      { name: "Rose Faluda", tags: ["cold", "sweet"] },
      { name: "Caramel Cookie Delight", tags: ["cold", "sweet"] },
      { name: "Alphonso Mango", tags: ["cold", "sweet"] },
      { name: "Strawberry", tags: ["cold", "sweet"] },
    ],
  },
  {
    id: "maggi",
    title: "Maggi",
    items: [
      { name: "Masala Maggi", price: 7, tags: ["spice"] },
      { name: "Veggie Masala", price: 10, tags: ["spice"] },
      { name: "Cheese Veggie Masala", price: 11, tags: ["spice"] },
      { name: "Paneer Masala", price: 12, tags: ["spice"] },
    ],
    quote: { text: "It really takes you back to childhood!", who: "Abha S." },
  },
  {
    id: "snacks",
    title: "Snacks & buns",
    items: [
      { name: "Bun Maska", aka: "hot, with butter", price: 5, tags: ["under7"] },
      { name: "Cheese Chutney Bun", price: 5, tags: ["under7"] },
      { name: "Nutella Bun", price: 5, tags: ["sweet", "under7"] },
      { name: "Corn Masala", price: 6, tags: ["spice", "under7"] },
      { name: "Peri Peri Fries", price: 7, tags: ["spice"] },
      { name: "Chai Biscuits", priceNote: "Ask", note: "For dunking.", tags: ["sweet"] },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    items: [
      { name: "Veggie Coleslaw", price: 11, tags: [] },
      { name: "Mumbai Veggie", price: 12, tags: [] },
      { name: "Tandoori Paneer", price: 13, tags: ["spice"] },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    items: [
      { name: "Cheese Pizza", price: 10, tags: [] },
      { name: "Farmers Market", price: 11, tags: [] },
      { name: "Paneer Veggie", price: 12, tags: [] },
    ],
  },
  {
    id: "kullad-pizza",
    title: "Kullad pizza",
    spec: "Served in a clay kullad",
    items: [
      { name: "Kullad Veggie", price: 7, tags: [] },
      { name: "Kullad Paneer", price: 8, tags: [] },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [{ name: "White Sauce Pasta", price: 12, tags: [] }],
  },
  {
    id: "burgers",
    title: "Burgers",
    spec: "Add cheese $1",
    items: [
      { name: "Veggie", price: 10, tags: [] },
      { name: "Peri Peri Veggie", price: 11, tags: ["spice"] },
      { name: "Tandoori Veggie", price: 11, tags: ["spice"] },
    ],
    quote: { text: "#1 the BEST!", who: "Sandra N., on the veggie burger" },
  },
];

export const filters: { id: Tag | "all"; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "cold", label: "Cold" },
  { id: "hot", label: "Hot drinks" },
  { id: "sweet", label: "Sweet" },
  { id: "spice", label: "Masala & spice" },
  { id: "under7", label: "Under $7" },
];

export function money(n: number) {
  return `$${n % 1 === 0 ? n : n.toFixed(2)}`;
}

/** "$4.50 / $6.50", "$6", "$5 / $7" */
export function priceLabel(regular?: number, large?: number) {
  if (regular == null) return "";
  const f = (n: number) => (n % 1 === 0 ? `$${n}` : `$${n.toFixed(2)}`);
  return large != null ? `${f(regular)} / ${f(large)}` : f(regular);
}

export const itemCount = boards.reduce((n, b) => n + b.items.length, 0);
