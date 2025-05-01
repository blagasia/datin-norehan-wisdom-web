
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  longDescription?: string;
  tiktokVideoId?: string;
  benefits?: string[];
  ingredients?: string[];
  usage?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Detox Tea",
    price: "RM 89",
    image: "/lovable-uploads/f91e20f1-b533-4a99-8571-6b67480a4f46.png",
    category: "Detox",
    description: "A refreshing blend of organic herbs that helps cleanse your body and restore natural balance.",
    longDescription: "Our signature Organic Detox Tea is a carefully balanced blend of powerful natural ingredients designed to support your body's natural detoxification processes. This premium blend combines green tea, dandelion root, ginger, lemongrass, and other purifying herbs that work in harmony to cleanse your system and promote overall wellness. Regular consumption may help improve digestion, boost metabolism, and enhance your body's natural cleansing abilities.",
    tiktokVideoId: "7073536944768649474",
    benefits: [
      "Supports natural detoxification",
      "Improves digestion and metabolism",
      "Reduces bloating and water retention",
      "Boosts energy levels naturally"
    ],
    ingredients: [
      "Organic Green Tea",
      "Dandelion Root",
      "Ginger Root",
      "Lemongrass",
      "Milk Thistle",
      "Peppermint Leaf"
    ],
    usage: "Steep one tea bag in hot water for 3-5 minutes. Enjoy 1-2 cups daily, preferably between meals. For enhanced detoxification benefits, drink consistently for 14-28 days."
  },
  {
    id: 2,
    name: "Natural Collagen Boost",
    price: "RM 139",
    image: "/lovable-uploads/10e4607c-d8a7-4884-a2c1-cc5b220a1c49.png",
    category: "Collagen",
    description: "Enhance your skin's elasticity and youthfulness with our all-natural collagen formula.",
    longDescription: "Our Natural Collagen Boost is formulated with marine-derived collagen peptides and enriched with vitamin C and hyaluronic acid to support your body's natural collagen production. This premium supplement helps improve skin elasticity, reduce fine lines, and promote a youthful appearance from within. Unlike synthetic alternatives, our collagen is sourced ethically and processed minimally to preserve its natural benefits.",
    tiktokVideoId: "7208095552532831518",
    benefits: [
      "Improves skin elasticity and firmness",
      "Reduces appearance of fine lines and wrinkles",
      "Strengthens hair and nails",
      "Supports joint health and flexibility"
    ],
    ingredients: [
      "Marine Collagen Peptides",
      "Hyaluronic Acid",
      "Vitamin C",
      "Biotin",
      "Zinc",
      "Organic Berries Extract"
    ],
    usage: "Mix one scoop with water, juice, or your favorite smoothie once daily. Best taken on an empty stomach for optimal absorption. Results typically become visible after 4-6 weeks of consistent use."
  },
  {
    id: 3,
    name: "Herbal Wellness Tonic",
    price: "RM 109",
    image: "/lovable-uploads/ba6aa273-f8a4-4313-9d28-65b4a2be27a5.png",
    category: "Herbal",
    description: "Traditional herbs combined to support overall wellbeing and vitality.",
    longDescription: "Drawing from centuries of traditional knowledge, our Herbal Wellness Tonic combines potent botanical extracts known for their health-enhancing properties. This powerful elixir features adaptogenic herbs like ashwagandha, holy basil, and rhodiola, which help the body adapt to stress and promote balance. Each small-batch production ensures maximum potency and efficacy, delivering nature's goodness straight to your wellness routine.",
    tiktokVideoId: "7165022599900808454",
    benefits: [
      "Helps the body adapt to stress",
      "Supports immune system function",
      "Enhances energy and vitality",
      "Promotes mental clarity and focus"
    ],
    ingredients: [
      "Ashwagandha Root",
      "Holy Basil",
      "Rhodiola Extract",
      "Reishi Mushroom",
      "Turmeric Root",
      "Black Pepper Extract"
    ],
    usage: "Take one tablespoon (15ml) daily, either directly or diluted in water or tea. Can be taken in the morning to energize or in the evening to restore. Shake well before use."
  },
  {
    id: 4,
    name: "Natural Beauty Elixir",
    price: "RM 129",
    image: "/lovable-uploads/2f59d45d-903b-4687-a10a-07afd72b5510.png",
    category: "Beauty",
    description: "Nourish your skin from within with our powerful natural beauty elixir.",
    longDescription: "Our Natural Beauty Elixir is a revolutionary blend designed to enhance your skin's natural radiance from within. This potent formula combines antioxidant-rich berries, hydrating aloe vera, and skin-supporting herbs to promote a healthy, glowing complexion. With regular use, this elixir helps combat free radical damage, improve skin hydration, and enhance your natural beauty.",
    tiktokVideoId: "7226835248678309166",
    benefits: [
      "Enhances skin radiance and glow",
      "Protects against environmental damage",
      "Improves skin hydration and texture",
      "Reduces signs of aging naturally"
    ],
    ingredients: [
      "Aloe Vera Juice",
      "Organic Berry Complex",
      "Rose Water",
      "Collagen Peptides",
      "Hibiscus Extract",
      "Vitamin E"
    ],
    usage: "Take one tablespoon (15ml) daily on an empty stomach. Can be taken directly or mixed with water or juice. For enhanced results, use consistently for at least 8 weeks."
  },
  {
    id: 5,
    name: "Immune Support Formula",
    price: "RM 99",
    image: "/lovable-uploads/158fb100-d291-4964-bccb-78b360aa819f.png",
    category: "Wellness",
    description: "Strengthen your body's natural defenses with our immune-boosting blend.",
    longDescription: "Our comprehensive Immune Support Formula combines traditional immune-supporting herbs with modern nutritional science. This powerful blend includes elderberry, echinacea, zinc, vitamin C, and other essential nutrients that work together to strengthen your body's natural defense mechanisms. Perfect for seasonal challenges or year-round immune support, this formula helps you stay at your best.",
    tiktokVideoId: "7189460642069517610",
    benefits: [
      "Strengthens immune system response",
      "Provides antioxidant protection",
      "Supports respiratory health",
      "Helps the body respond to seasonal challenges"
    ],
    ingredients: [
      "Elderberry Extract",
      "Echinacea",
      "Vitamin C",
      "Zinc",
      "Garlic Extract",
      "Propolis"
    ],
    usage: "Take two capsules daily with food. During periods of increased immune challenges, dosage may be increased to two capsules twice daily for up to 7 days."
  },
  {
    id: 6,
    name: "Pure Radiance Serum",
    price: "RM 149",
    image: "/lovable-uploads/b4ce9838-b1d8-4755-973f-59da80dc90c5.png",
    category: "Beauty",
    description: "Reveal your natural glow with our organic serum made from pure botanical extracts.",
    longDescription: "Our Pure Radiance Serum is a luxury facial treatment packed with potent botanical extracts and natural antioxidants. This lightweight, fast-absorbing formula delivers deep hydration while targeting signs of aging, uneven skin tone, and environmental damage. The blend of rosehip oil, sea buckthorn, and vitamin C helps brighten your complexion and restore natural radiance without harsh chemicals.",
    tiktokVideoId: "7188511293456565550",
    benefits: [
      "Brightens and evens skin tone",
      "Reduces appearance of fine lines",
      "Provides deep hydration",
      "Protects against environmental damage"
    ],
    ingredients: [
      "Rosehip Seed Oil",
      "Sea Buckthorn Oil",
      "Vitamin C",
      "Hyaluronic Acid",
      "Pomegranate Extract",
      "Jasmine Essential Oil"
    ],
    usage: "Apply 3-5 drops to clean, slightly damp skin morning and evening. Gently press into face, neck, and décolletage. Follow with moisturizer if desired."
  },
  {
    id: 7,
    name: "Calming Sleep Blend",
    price: "RM 89",
    image: "/lovable-uploads/97f5b93e-ab97-4436-9ed5-2850cf3f2e89.png",
    category: "Wellness",
    description: "A soothing herbal blend designed to promote restful sleep and relaxation.",
    longDescription: "Our Calming Sleep Blend combines nature's most effective relaxing herbs to help you unwind and enjoy restful sleep. This gentle yet powerful formulation features lavender, chamomile, passionflower, and valerian root—herbs traditionally used to calm the mind and prepare the body for sleep. Free from synthetic additives and habit-forming ingredients, this blend offers a natural solution for better sleep quality.",
    tiktokVideoId: "7173488782268553518",
    benefits: [
      "Promotes deeper, more restful sleep",
      "Reduces time to fall asleep",
      "Calms the mind and eases tension",
      "Improves sleep quality without morning grogginess"
    ],
    ingredients: [
      "Lavender Flower",
      "Chamomile Flower",
      "Passionflower",
      "Valerian Root",
      "Lemon Balm",
      "Magnesium Glycinate"
    ],
    usage: "Take two capsules 30-60 minutes before bedtime with a small amount of water. For best results, establish a consistent sleep schedule and create a relaxing bedtime routine."
  },
  {
    id: 8,
    name: "Revitalizing Hair Tonic",
    price: "RM 119",
    image: "/lovable-uploads/2f0020d8-82e4-44c3-a347-685647aea856.png",
    category: "Beauty",
    description: "Strengthen and nourish your hair from root to tip with our natural hair tonic.",
    longDescription: "Our Revitalizing Hair Tonic is formulated with nutrient-rich botanical extracts designed to strengthen hair follicles and promote healthy growth. This nourishing treatment contains bhringraj, amla, rosemary, and other herbs traditionally used to enhance hair health. Regular application helps reduce breakage, improve scalp condition, and restore natural shine and volume to your hair.",
    tiktokVideoId: "7146958884554335531",
    benefits: [
      "Strengthens hair follicles",
      "Reduces hair breakage and loss",
      "Promotes healthy hair growth",
      "Adds natural shine and volume"
    ],
    ingredients: [
      "Bhringraj Extract",
      "Amla Oil",
      "Rosemary Essential Oil",
      "Aloe Vera",
      "Nettle Leaf Extract",
      "Biotin"
    ],
    usage: "Apply 3-5 drops directly to the scalp and massage gently. Use daily for best results. Can be applied to damp or dry hair. Leave in, no need to rinse."
  }
];

