/*
 * The chai builder, from the drinks board over the counter (gm91):
 *   CHAI, HOT / ICED, REG / LARGE: $4.5 / $6.5, ten flavors
 *   Kullad / clay cup for all drinks: $1 extra
 *   All chai's are made with 2% milk and 1 spoon sugar
 *   Alternative milk options include soy, almond or oat: $1 extra
 * The colors and spices are drawing, not a claim about how a cup looks.
 */

export type Spice = "ginger" | "cardamom" | "leaves" | "clove" | "cinnamon" | "basil" | "saffron" | "cocoa" | "fennel" | "betel" | "petal";

export type Flavor = {
  id: string;
  name: string;
  aka: string;
  /** chai color, hot and iced (iced is lighter with the ice and cold milk) */
  hot: string;
  iced: string;
  /** what lies on the board next to the cup */
  spices: Spice[];
};

export const flavors: Flavor[] = [
  { id: "masala", name: "Masala", aka: "spiced", hot: "#c4844a", iced: "#d8a875", spices: ["cinnamon", "clove", "cardamom", "ginger"] },
  { id: "saffron", name: "Saffron", aka: "kesari", hot: "#d9973a", iced: "#e6b86a", spices: ["saffron", "saffron", "cardamom"] },
  { id: "ginger", name: "Ginger", aka: "adrak", hot: "#cf9255", iced: "#e0b17e", spices: ["ginger", "ginger"] },
  { id: "cardamom", name: "Cardamom", aka: "elaichi", hot: "#d29b60", iced: "#e2b886", spices: ["cardamom", "cardamom", "cardamom"] },
  { id: "kadak", name: "Kadak", aka: "strong", hot: "#a3662f", iced: "#c08a55", spices: ["leaves", "leaves", "leaves"] },
  { id: "tulsi", name: "Tulsi", aka: "holy basil", hot: "#c48f55", iced: "#d9b07e", spices: ["basil", "basil"] },
  { id: "rose", name: "Rose", aka: "gulab", hot: "#cf8f7c", iced: "#e2ae9f", spices: ["petal", "petal", "petal"] },
  { id: "paan", name: "Paan", aka: "betel leaf", hot: "#bf9b62", iced: "#d4b986", spices: ["betel", "fennel"] },
  { id: "fennel", name: "Fennel", aka: "saunf", hot: "#cc965a", iced: "#ddb582", spices: ["fennel", "fennel"] },
  { id: "chocolate", name: "Chocolate", aka: "with cocoa", hot: "#8d5634", iced: "#a77654", spices: ["cocoa", "cocoa"] },
];

export const sizes = [
  { id: "regular", label: "Regular", price: 4.5 },
  { id: "large", label: "Large", price: 6.5 },
] as const;

export const temps = [
  { id: "hot", label: "Hot" },
  { id: "iced", label: "Iced" },
] as const;

export const cups = [
  { id: "cup", label: "Regular cup", extra: 0 },
  { id: "kullad", label: "Kullad", extra: 1 },
] as const;

export const milks = [
  { id: "2%", label: "2% milk", extra: 0 },
  { id: "oat", label: "Oat", extra: 1 },
  { id: "soy", label: "Soy", extra: 1 },
  { id: "almond", label: "Almond", extra: 1 },
] as const;

export const sugars = [
  { id: "one", label: "One spoon" },
  { id: "none", label: "No sugar" },
] as const;

export type Order = {
  flavor: string;
  size: (typeof sizes)[number]["id"];
  temp: (typeof temps)[number]["id"];
  cup: (typeof cups)[number]["id"];
  milk: (typeof milks)[number]["id"];
  sugar: (typeof sugars)[number]["id"];
};

export const defaultOrder: Order = { flavor: "masala", size: "regular", temp: "hot", cup: "kullad", milk: "2%", sugar: "one" };

export function total(o: Order) {
  const base = sizes.find((s) => s.id === o.size)!.price;
  const cup = cups.find((c) => c.id === o.cup)!.extra;
  const milk = milks.find((m) => m.id === o.milk)!.extra;
  return base + cup + milk;
}

/** "Large iced rose chai in a kullad, oat milk, no sugar." */
export function describe(o: Order) {
  const f = flavors.find((x) => x.id === o.flavor)!;
  const size = o.size === "large" ? "Large" : "Regular";
  const parts = [`${size} ${o.temp} ${f.name.toLowerCase()} chai${o.cup === "kullad" ? " in a kullad" : ""}`];
  if (o.milk !== "2%") parts.push(`${o.milk} milk`);
  parts.push(o.sugar === "none" ? "no sugar" : "one spoon of sugar");
  return parts.join(", ") + ".";
}
