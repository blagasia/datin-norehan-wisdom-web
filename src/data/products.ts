
interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
  longDescription?: string;
  tiktokVideoId?: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Organic Detox Tea",
    price: "RM 89",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    category: "Detox",
    description: "A refreshing blend of organic herbs that helps cleanse your body and restore natural balance.",
    longDescription: "Our signature Organic Detox Tea is a carefully balanced blend of powerful natural ingredients designed to support your body's natural detoxification processes. This premium blend combines green tea, dandelion root, ginger, lemongrass, and other purifying herbs that work in harmony to cleanse your system and promote overall wellness. Regular consumption may help improve digestion, boost metabolism, and enhance your body's natural cleansing abilities.",
    tiktokVideoId: "7073536944768649474"
  },
  {
    id: 2,
    name: "Natural Collagen Boost",
    price: "RM 139",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
    category: "Collagen",
    description: "Enhance your skin's elasticity and youthfulness with our all-natural collagen formula.",
    longDescription: "Our Natural Collagen Boost is formulated with marine-derived collagen peptides and enriched with vitamin C and hyaluronic acid to support your body's natural collagen production. This premium supplement helps improve skin elasticity, reduce fine lines, and promote a youthful appearance from within. Unlike synthetic alternatives, our collagen is sourced ethically and processed minimally to preserve its natural benefits.",
    tiktokVideoId: "7208095552532831518"
  },
  {
    id: 3,
    name: "Herbal Wellness Tonic",
    price: "RM 109",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    category: "Herbal",
    description: "Traditional herbs combined to support overall wellbeing and vitality.",
    longDescription: "Drawing from centuries of traditional knowledge, our Herbal Wellness Tonic combines potent botanical extracts known for their health-enhancing properties. This powerful elixir features adaptogenic herbs like ashwagandha, holy basil, and rhodiola, which help the body adapt to stress and promote balance. Each small-batch production ensures maximum potency and efficacy, delivering nature's goodness straight to your wellness routine.",
    tiktokVideoId: "7165022599900808454"
  },
  {
    id: 4,
    name: "Natural Beauty Elixir",
    price: "RM 129",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    category: "Beauty",
    description: "Nourish your skin from within with our powerful natural beauty elixir.",
    longDescription: "Our Natural Beauty Elixir is a revolutionary blend designed to enhance your skin's natural radiance from within. This potent formula combines antioxidant-rich berries, hydrating aloe vera, and skin-supporting herbs to promote a healthy, glowing complexion. With regular use, this elixir helps combat free radical damage, improve skin hydration, and enhance your natural beauty.",
    tiktokVideoId: "7226835248678309166"
  },
  {
    id: 5,
    name: "Immune Support Formula",
    price: "RM 99",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    category: "Wellness",
    description: "Strengthen your body's natural defenses with our immune-boosting blend.",
    longDescription: "Our comprehensive Immune Support Formula combines traditional immune-supporting herbs with modern nutritional science. This powerful blend includes elderberry, echinacea, zinc, vitamin C, and other essential nutrients that work together to strengthen your body's natural defense mechanisms. Perfect for seasonal challenges or year-round immune support, this formula helps you stay at your best.",
    tiktokVideoId: "7189460642069517610"
  },
  {
    id: 6,
    name: "Pure Radiance Serum",
    price: "RM 149",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
    category: "Beauty",
    description: "Reveal your natural glow with our organic serum made from pure botanical extracts.",
    longDescription: "Our Pure Radiance Serum is a luxury facial treatment packed with potent botanical extracts and natural antioxidants. This lightweight, fast-absorbing formula delivers deep hydration while targeting signs of aging, uneven skin tone, and environmental damage. The blend of rosehip oil, sea buckthorn, and vitamin C helps brighten your complexion and restore natural radiance without harsh chemicals.",
    tiktokVideoId: "7188511293456565550"
  },
  {
    id: 7,
    name: "Calming Sleep Blend",
    price: "RM 89",
    image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd",
    category: "Wellness",
    description: "A soothing herbal blend designed to promote restful sleep and relaxation.",
    longDescription: "Our Calming Sleep Blend combines nature's most effective relaxing herbs to help you unwind and enjoy restful sleep. This gentle yet powerful formulation features lavender, chamomile, passionflower, and valerian root—herbs traditionally used to calm the mind and prepare the body for sleep. Free from synthetic additives and habit-forming ingredients, this blend offers a natural solution for better sleep quality.",
    tiktokVideoId: "7173488782268553518"
  },
  {
    id: 8,
    name: "Revitalizing Hair Tonic",
    price: "RM 119",
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da",
    category: "Beauty",
    description: "Strengthen and nourish your hair from root to tip with our natural hair tonic.",
    longDescription: "Our Revitalizing Hair Tonic is formulated with nutrient-rich botanical extracts designed to strengthen hair follicles and promote healthy growth. This nourishing treatment contains bhringraj, amla, rosemary, and other herbs traditionally used to enhance hair health. Regular application helps reduce breakage, improve scalp condition, and restore natural shine and volume to your hair.",
    tiktokVideoId: "7146958884554335531"
  }
];
