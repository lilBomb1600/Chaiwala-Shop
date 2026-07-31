export type MenuItem = {
  name: string;
  description?: string;
  price?: number;
  priceNote?: string;
  popular?: boolean;
  vegetarian?: boolean;
  /** id from data/gallery.ts, when a real matching photo exists */
  imageId?: string;
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

// Transcribed from the in-store menu board. A few items were cropped out of
// frame — those are marked with priceNote "Ask in-store" instead of a guessed
// price. Send the full list any time to fill these in.
export const menu: MenuCategory[] = [
  {
    id: "chai",
    title: "Chai & Beverages",
    subtitle: "The reason we opened the door",
    items: [
      {
        name: "Masala Chai",
        description: "Hand-brewed, mildly sweetened with a spoon of sugar by default — ask for less, or add your own.",
        popular: true,
        priceNote: "Ask in-store",
        imageId: "hot-chai-cup",
      },
      {
        name: "Kesari Chai",
        description: "Our saffron-spiced house specialty — the one regulars keep coming back for.",
        popular: true,
        priceNote: "Ask in-store",
        imageId: "kesari-chai-pour",
      },
      {
        name: "Rose Chai",
        description: "Served hot in a traditional clay cup, with a delicate floral note.",
        priceNote: "Ask in-store",
      },
      {
        name: "Paan Chai",
        description: "A house favorite with a subtle, floral paan flavor.",
        priceNote: "Ask in-store",
      },
      {
        name: "Saffron Iced Tea",
        description: "Our saffron chai, served cold and refreshing.",
        priceNote: "Ask in-store",
      },
      {
        name: "Jaljeera",
        description: "A spicy, savory cold broth with a crunchy fried topping.",
        priceNote: "Ask in-store",
      },
      {
        name: "Cucumber Mint Refresher",
        description: "Cool and light, made with fresh mint and cucumber.",
        priceNote: "Ask in-store",
      },
      {
        name: "Mojito",
        description: "A refreshing, non-alcoholic house mojito.",
        priceNote: "Ask in-store",
      },
      {
        name: "Chai Biscuits",
        description: "The classic dunking companion, made to pair with any chai.",
        priceNote: "Ask in-store",
        imageId: "chai-biscuits",
      },
    ],
  },
  {
    id: "maggi",
    title: "Maggi",
    subtitle: "Comfort noodles, the way you remember them",
    items: [
      { name: "Masala Maggi", price: 7, vegetarian: true },
      { name: "Veggie Masala", price: 10, vegetarian: true },
      { name: "Cheese Veggie Masala", price: 11, vegetarian: true, popular: true },
      { name: "Paneer Masala", price: 12, vegetarian: true, popular: true },
    ],
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    subtitle: "Grilled to order",
    items: [
      { name: "Veggie Coleslaw", price: 11, vegetarian: true, imageId: "veggie-sandwich-stack" },
      { name: "Mumbai Veggie", price: 12, vegetarian: true },
      { name: "Tandoori Paneer", price: 13, vegetarian: true, popular: true, imageId: "tandoori-paneer-sandwich" },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    items: [{ name: "White Sauce Pasta", price: 12, vegetarian: true }],
  },
  {
    id: "snacks",
    title: "Snacks & Buns",
    items: [
      { name: "Cheese Chutney Bun", price: 5, vegetarian: true },
      { name: "Nutella Bun", price: 6, vegetarian: true },
      { name: "Corn Masala", price: 6, vegetarian: true, imageId: "corn-masala" },
      { name: "Peri Peri Fries", price: 7, vegetarian: true, popular: true, imageId: "peri-peri-fries" },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    items: [
      { name: "Cheese Pizza", priceNote: "Ask in-store", vegetarian: true },
      { name: "Farmers Market", price: 11, vegetarian: true, imageId: "farmers-market-pizza" },
      { name: "Paneer Veggie", price: 12, vegetarian: true },
    ],
  },
  {
    id: "kullad-pizza",
    title: "Kullad Pizza",
    subtitle: "Served in a traditional clay kullad",
    items: [
      { name: "Kullad Veggie", price: 7, vegetarian: true },
      { name: "Kullad Paneer", price: 8, vegetarian: true, popular: true, imageId: "kullad-paneer" },
    ],
  },
  {
    id: "burgers",
    title: "Burgers",
    subtitle: "Add cheese for $1",
    items: [
      { name: "Veggie", price: 10, vegetarian: true, popular: true },
      { name: "Chef's Special", priceNote: "Ask in-store", vegetarian: true },
    ],
  },
];
