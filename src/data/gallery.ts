export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: "food" | "chai" | "shop";
  featured?: boolean;
  /** True once a real photo file has been dropped into /public/images/gallery */
  ready: boolean;
};

// Real dish photos are wired up below by filename. Drop new files into
// /public/images/gallery using these exact names and flip `ready` to true —
// nothing else needs to change.
export const galleryImages: GalleryImage[] = [
  {
    id: "branded-shake-cup",
    src: "/images/gallery/branded-shake-cup.jpg",
    alt: "An Oreo caramel shake served in a signature Chaiwala Shop cup",
    category: "chai",
    featured: true,
    ready: false,
  },
  {
    id: "tandoori-paneer-sandwich",
    src: "/images/gallery/tandoori-paneer-sandwich.jpg",
    alt: "Grilled Tandoori Paneer sandwich, stacked and halved, with melted cheese and fresh vegetables",
    category: "food",
    featured: true,
    ready: false,
  },
  {
    id: "farmers-market-pizza",
    src: "/images/gallery/farmers-market-pizza.jpg",
    alt: "Farmers Market pizza topped with sweet corn, peppers, olives, and a chipotle drizzle",
    category: "food",
    ready: false,
  },
  {
    id: "peri-peri-fries",
    src: "/images/gallery/peri-peri-fries.jpg",
    alt: "Peri Peri Fries served hot with two house-made dipping sauces",
    category: "food",
    ready: false,
  },
  {
    id: "brand-flatlay",
    src: "/images/gallery/brand-flatlay.png",
    alt: "Chaiwala Shop signature spread — sandwiches, pizza, Kullad Paneer, and Corn Masala",
    category: "food",
    ready: true,
  },
  {
    id: "hot-chai-cup",
    src: "/images/gallery/hot-chai-cup.jpg",
    alt: "A hot chai served to-go, lid on, straight from the counter",
    category: "chai",
    ready: false,
  },
  {
    id: "kullad-paneer",
    src: "/images/gallery/kullad-paneer.jpg",
    alt: "Kullad Paneer baked in a traditional clay kullad with corn, cheese, and olives",
    category: "food",
    featured: true,
    ready: false,
  },
  {
    id: "corn-masala",
    src: "/images/gallery/corn-masala.jpg",
    alt: "A bowl of spiced Corn Masala finished with chili and lime",
    category: "food",
    ready: false,
  },
  {
    id: "veggie-sandwich-stack",
    src: "/images/gallery/veggie-sandwich-stack.jpg",
    alt: "Triple-stacked grilled veggie sandwiches sliced into triangles",
    category: "food",
    ready: false,
  },
  {
    id: "kesari-chai-pour",
    src: "/images/gallery/kesari-chai-pour.jpg",
    alt: "Kesari chai being poured, our saffron-spiced house specialty",
    category: "chai",
    ready: false,
  },
  {
    id: "chai-biscuits",
    src: "/images/gallery/chai-biscuits.jpg",
    alt: "Chai biscuits served alongside a fresh cup of masala chai",
    category: "chai",
    ready: false,
  },
];
