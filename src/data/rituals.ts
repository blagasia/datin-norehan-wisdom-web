
export interface RitualProduct {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  customizable: boolean;
  giftWrapAvailable: boolean;
  colors?: string[];
  nameCustomization?: boolean;
  bundleType?: 'accessory' | 'kit' | 'bundle';
  compatibleWith?: number[]; // Product IDs this ritual item is compatible with
  materialDetails?: string;
  instructions?: string;
  bundleContents?: {
    name: string;
    type: 'elixir' | 'accessory';
    quantity: number;
    image?: string;
  }[];
}

export const ritualProducts: RitualProduct[] = [
  {
    id: 1,
    name: "Premium Bamboo Measuring Scoop",
    price: "RM 49",
    image: "/lovable-uploads/28ab43d8-2932-4793-8a02-c1af2e710bf2.png", // Updated
    category: "Accessories",
    description: "Precision bamboo measuring scoop designed specifically for DNA Elixirs. Elegant, eco-friendly, and essential for your daily wellness ritual.",
    customizable: true,
    giftWrapAvailable: true,
    colors: ["Natural", "Rose Gold", "Ebony"],
    nameCustomization: true,
    bundleType: 'accessory',
    compatibleWith: [1, 2, 3, 4, 5, 7],
    materialDetails: "Crafted from sustainable bamboo with a food-safe finish. Each scoop provides a perfect 5g measurement for optimal elixir preparation.",
    instructions: "Use the scoop to measure your elixir powder without compressing. Level off with a straight edge for precise measurement. Rinse with warm water after use and dry immediately."
  },
  {
    id: 2,
    name: "DNA Ritual Ceramic Mug",
    price: "RM 79",
    image: "/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png", // Updated
    category: "Accessories",
    description: "Handcrafted ceramic mug with gold accent, designed to elevate your daily wellness rituals. Perfect for your morning elixir blend.",
    customizable: true,
    giftWrapAvailable: true,
    colors: ["White", "Blush Pink", "Sage Green", "Charcoal"],
    nameCustomization: true,
    bundleType: 'accessory',
    compatibleWith: [1, 3, 7],
    materialDetails: "Premium ceramic with 24K gold accent rim. Handcrafted by skilled artisans to create a perfectly balanced, ergonomic mug that enhances your daily ritual.",
    instructions: "Warm the mug with hot water before adding your elixir for enhanced aromatics. Hand wash only to preserve the gold detail. Avoid microwave use."
  },
  {
    id: 3,
    name: "Mini Portable Blender",
    price: "RM 159",
    image: "/lovable-uploads/cb10aacc-5a7a-473c-9341-adc8c270d0f2.png", // Updated
    category: "Accessories",
    description: "Rechargeable portable blender, perfect for creating smooth elixir mixtures anywhere. Includes USB charging cable and travel case.",
    customizable: true,
    giftWrapAvailable: true,
    colors: ["Rose Gold", "White", "Black"],
    nameCustomization: false,
    bundleType: 'accessory',
    compatibleWith: [1, 2, 3, 4, 5, 7, 8],
    materialDetails: "Borosilicate glass container with food-grade stainless steel blades. Powerful 4000mAh battery provides 15-20 blends per charge.",
    instructions: "Fill to the recommended line, add your elixir powder, secure the lid, and blend for 20-30 seconds. Clean immediately after use by blending with warm water and a drop of mild soap."
  },
  {
    id: 4,
    name: "Morning Glow Ritual Kit",
    price: "RM 289",
    image: "/lovable-uploads/17b2f70d-878c-47a4-b942-4f69f9dc2c5b.png", // Updated
    category: "Ready Bundles",
    description: "Complete morning ritual kit featuring our Natural Collagen Boost, premium bamboo measuring scoop, and exclusive ceramic mug. Start your day with radiance.",
    customizable: true,
    giftWrapAvailable: true,
    bundleType: 'bundle',
    compatibleWith: [2],
    materialDetails: "A carefully curated set of premium items designed to work in harmony for an elevated morning wellness experience.",
    instructions: "Begin each morning by measuring your Collagen Boost with the bamboo scoop into your warmed ceramic mug. Stir gently and sip mindfully to start your day with intention.",
    bundleContents: [
      {
        name: "Natural Collagen Boost",
        type: "elixir",
        quantity: 1,
        image: "/lovable-uploads/10e4607c-d8a7-4884-a2c1-cc5b220a1c49.png"
      },
      {
        name: "Premium Bamboo Measuring Scoop",
        type: "accessory",
        quantity: 1,
        image: "/lovable-uploads/28ab43d8-2932-4793-8a02-c1af2e710bf2.png" // Updated
      },
      {
        name: "DNA Ritual Ceramic Mug",
        type: "accessory",
        quantity: 1,
        image: "/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png" // Updated
      }
    ]
  },
  {
    id: 5,
    name: "Beauty Sleep Ritual Bundle",
    price: "RM 249",
    image: "/lovable-uploads/5a036f15-ad25-4f98-b74e-196eb003b9c9.png", // Updated
    category: "Ready Bundles",
    description: "Transform your evening routine with our Calming Sleep Blend, premium Lavender Eye Pillow, and infuser bottle. The perfect gift for self-care enthusiasts.",
    customizable: true,
    giftWrapAvailable: true,
    bundleType: 'bundle',
    compatibleWith: [7],
    materialDetails: "A thoughtfully assembled collection of premium products designed to prepare body and mind for deep, restorative sleep.",
    instructions: "Prepare your Calming Sleep Blend in the infuser bottle 30 minutes before bedtime. Settle into bed, sip slowly, then apply the lavender eye pillow while practicing deep breathing.",
    bundleContents: [
      {
        name: "Calming Sleep Blend",
        type: "elixir",
        quantity: 1,
        image: "/lovable-uploads/97f5b93e-ab97-4436-9ed5-2850cf3f2e89.png"
      },
      {
        name: "Lavender Eye Pillow",
        type: "accessory",
        quantity: 1,
        image: "/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png" // Updated
      },
      {
        name: "Glass Infuser Bottle",
        type: "accessory",
        quantity: 1,
        image: "/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png" // Updated
      }
    ]
  },
  {
    id: 6,
    name: "Custom Ritual Kit Builder",
    price: "From RM 199",
    image: "/lovable-uploads/0eac78ee-8a47-4f36-82e6-165e32f3d2d0.png", // Updated
    category: "Custom Kits",
    description: "Create your perfect ritual by combining any DNA Elixir with your choice of accessories. Customize colors, add name engravings, and select gift packaging options.",
    customizable: true,
    giftWrapAvailable: true,
    bundleType: 'kit',
    materialDetails: "Select from our premium range of elixirs and accessories to create a personalized wellness ritual kit that perfectly suits your unique needs.",
    instructions: "Begin by selecting your favorite elixirs, then add complementary accessories. Personalize with color choices and optional engraving for a truly bespoke ritual experience."
  }
];

// Product upsell recommendations
export const productUpsells = {
  // For Collagen product (ID: 2)
  2: [
    {
      type: "ritual",
      id: 1, // Premium Bamboo Measuring Scoop
      message: "Perfect for precise measurements of your collagen powder"
    },
    {
      type: "ritual",
      id: 2, // DNA Ritual Ceramic Mug
      message: "Elevate your morning collagen ritual with our signature mug"
    },
    {
      type: "ritual",
      id: 4, // Morning Glow Ritual Kit
      message: "Get the complete morning ritual experience with this bundle"
    }
  ],
  
  // For other popular products
  1: [
    {
      type: "ritual",
      id: 3, // Mini Portable Blender
      message: "Create perfectly smooth elixir mixtures on the go"
    }
  ],
  
  3: [
    {
      type: "ritual",
      id: 2, // DNA Ritual Ceramic Mug
      message: "The perfect vessel for enjoying your wellness elixir"
    }
  ],
  
  7: [
    {
      type: "ritual",
      id: 5, // Beauty Sleep Ritual Bundle
      message: "Transform your evening routine with our complete sleep ritual"
    }
  ]
};
