
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
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1516035308262-1d4619c2ef40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1560204866-c26923468217?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1612538498456-e861df91d4d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Premium Bamboo Measuring Scoop",
        type: "accessory",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "DNA Ritual Ceramic Mug",
        type: "accessory",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1516035308262-1d4619c2ef40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 5,
    name: "Beauty Sleep Ritual Bundle",
    price: "RM 249",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
        image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Lavender Eye Pillow",
        type: "accessory",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566886-fbdf93a6c9d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      },
      {
        name: "Glass Infuser Bottle",
        type: "accessory",
        quantity: 1,
        image: "https://images.unsplash.com/photo-1536939459926-301728717817?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
      }
    ]
  },
  {
    id: 6,
    name: "Custom Ritual Kit Builder",
    price: "From RM 199",
    image: "https://images.unsplash.com/photo-1620916566886-fbdf93a6c9d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
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
