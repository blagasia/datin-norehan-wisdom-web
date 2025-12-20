// DNA Elixirs - Complete Product Data for DNA by Norehan

export interface ElixirIngredient {
  name: string;
  benefit: string;
  action: string;
}

export interface DNAElixir {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  overview: string;
  howItWorks?: string[];
  benefits?: string[];
  philosophy?: string;
  ingredients: ElixirIngredient[];
  usage?: {
    application?: string;
    technique?: string;
    frequency?: string;
  };
  category: 'internal' | 'topical' | 'intimate';
}

export const dnaElixirs: DNAElixir[] = [
  {
    id: 'natures-potion',
    name: "Nature's Potion",
    subtitle: 'A Holistic Health Tonic for a Toxin-Free Body',
    price: 89,
    image: '/lovable-uploads/1a.jpg',
    overview: "Nature's Potion is not just a drink; it is a comprehensive reset for your system. Imagine a refreshing sip that moistens your throat while simultaneously cleansing your body of accumulated toxins, refreshing your mind, and re-injecting natural energy into every cell. This \"True Green\" formula is a nutrient-rich detox specially formulated from nature to act as a holistic health tonic.",
    howItWorks: [
      'Liver Detoxification: We utilize Broccoli, packed with sulforaphane, to help the liver process and detoxify harmful chemicals. This is paired with Lemon, a natural detoxifying agent that aids liver function and improves nutrient absorption.',
      'Kidney & Fluid Balance: Celery acts as a natural diuretic, helping to reduce excess water weight and flush toxins effectively through the kidneys.',
      'Digestive Healing: Pineapple provides the enzyme bromelain, which aids digestion and reduces inflammation in the body, while Green Apples provide high fiber to cleanse the digestive system and regulate blood sugar levels.',
      'Cellular Protection: Tomatoes deliver Lycopene to protect cells from damage and support heart health, while Carrots provide beta-carotene, converting to Vitamin A to boost the immune system and vision.',
      'Hydration & Cooling: High-water content Cucumbers hydrate and cool the body, promoting the excretion of toxins through urine.'
    ],
    benefits: [
      'Natural Energy: Provides sustained energy without relying on caffeine.',
      'Radiant Health: Strengthens the immune system, improves skin health, and freshens breath.',
      'Weight Management: Every sip is a step toward a cleaner, lighter body.'
    ],
    philosophy: 'Let nature heal from within. True health starts with a smart choice.',
    ingredients: [
      { name: 'Broccoli', benefit: 'Liver Support', action: 'Packed with sulforaphane to help the liver process and detoxify harmful chemicals.' },
      { name: 'Lemon', benefit: 'Detoxification', action: 'Natural detoxifying agent that aids liver function and improves nutrient absorption.' },
      { name: 'Celery', benefit: 'Kidney Balance', action: 'Acts as a natural diuretic, helping to reduce excess water weight and flush toxins.' },
      { name: 'Pineapple', benefit: 'Digestion', action: 'Provides the enzyme bromelain, which aids digestion and reduces inflammation.' },
      { name: 'Green Apple', benefit: 'Fiber Cleanse', action: 'High fiber to cleanse the digestive system and regulate blood sugar levels.' },
      { name: 'Tomato', benefit: 'Cellular Protection', action: 'Delivers Lycopene to protect cells from damage and support heart health.' },
      { name: 'Carrot', benefit: 'Immune Boost', action: 'Provides beta-carotene, converting to Vitamin A to boost immunity and vision.' },
      { name: 'Cucumber', benefit: 'Hydration', action: 'High-water content to hydrate, cool the body, and promote toxin excretion.' }
    ],
    category: 'internal'
  },
  {
    id: 'bustify-oil',
    name: 'Bustify Oil',
    subtitle: 'Firming, Nourishing, and Hormonal Balance',
    price: 149,
    image: '/lovable-uploads/2a.jpg',
    overview: 'Bustify Oil is a specialized aromatherapy formulation designed for the delicate needs of breast care. It goes beyond beauty, offering a blend of natural essential oils that work to firm, moisturize, and nourish the skin while supporting overall breast health.',
    ingredients: [
      { name: 'Geranium Oil', benefit: 'Lymphatic Support', action: 'Aids in detoxification and supports the lymphatic system to reduce hormonal imbalance.' },
      { name: 'Ylang Ylang', benefit: 'Hormonal Balance', action: 'Supports hormone regulation and provides a calming aromatherapy effect.' },
      { name: 'Lemongrass Oil', benefit: 'Detoxification', action: 'Supports the lymphatic system and reduces breast tightness.' },
      { name: 'Coconut Oil', benefit: 'Deep Moisture', action: 'Provides deep hydration, making the skin smoother and softer.' },
      { name: 'Jojoba Oil', benefit: 'Skin Nourishment', action: 'Deeply moisturizes and nourishes the delicate breast area skin.' },
      { name: 'Lavender', benefit: 'Stress Relief', action: 'Natural aroma provides calming effect, reducing stress and balancing hormones.' },
      { name: 'Chamomile', benefit: 'Relaxation', action: 'Calming properties help balance hormones crucial for breast health.' }
    ],
    usage: {
      application: 'Take a few drops of Bustify Oil and gently apply to the breast area.',
      technique: 'Massage in circular motions for 5–10 minutes to ensure the oil absorbs deep into the skin.',
      frequency: 'Use twice a day, morning and night, for optimal results.'
    },
    category: 'topical'
  },
  {
    id: 'collary-collagen',
    name: 'Collary Collagen',
    subtitle: 'Peptide Marine Collagen with Premium Multiberries',
    price: 139,
    image: '/lovable-uploads/3a.jpg',
    overview: 'Collary Collagen is a scientifically formulated health supplement that redefines beauty from the inside out. By combining high-quality Peptide Marine Collagen with a powerful multiberry blend, this formula delivers essential nutrients that protect and enhance the health of your vital organs—skin, heart, liver, and digestive system.',
    ingredients: [
      { name: 'Peptide Marine Collagen', benefit: 'Structural Support', action: 'Sourced from premium marine life, ensures high absorption for skin elasticity, joint strength, gut integrity, and cellular regeneration.' },
      { name: 'Acai Berry', benefit: 'Antioxidant Power', action: 'Rich in polyphenols and vitamins that combat oxidative stress.' },
      { name: 'Blueberry', benefit: 'Brain Health', action: 'Powerful antioxidants support cognitive function and skin health.' },
      { name: 'Raspberry', benefit: 'Vitamin C', action: 'High vitamin content for immune support and collagen synthesis.' },
      { name: 'Blackcurrant', benefit: 'Anti-inflammatory', action: 'Contains anthocyanins that reduce inflammation and protect cells.' }
    ],
    benefits: [
      'Skin & Cellular Regeneration: Boosts collagen production to reduce wrinkles, improve hydration, and repair skin at the cellular level.',
      'Heart Health: Rich in amino acids and antioxidants that support cardiovascular function, improve circulation, and regulate cholesterol.',
      'Liver Detoxification: The multiberry blend aids the liver in processing toxins, protecting it against free radicals.',
      'Gut Health: Peptide collagen supports the repair of the gut lining, improving digestion and nutrient absorption.',
      'Joint & Bone Strength: Strengthens connective tissues to reduce the risk of age-related wear and tear.',
      'Immune Defense: High antioxidant content combats inflammation and protects against environmental damage.'
    ],
    category: 'internal'
  },
  {
    id: 'magic-potion',
    name: 'Magic Potion',
    subtitle: 'A Luxurious Blend of Pure Essential Oils',
    price: 129,
    image: '/lovable-uploads/4a.jpg',
    overview: "Magic Potion is a celebration of feminine wellness—pure, natural, and empowering. This carefully crafted blend of pure essential oils is infused with nature's most potent botanicals to nurture, refresh, and restore intimate wellness.",
    ingredients: [
      { name: 'Pure Essential Oil Blend', benefit: 'Natural Care', action: '100% chemical-free formula without artificial fragrances, parabens, or synthetic additives.' },
      { name: 'pH-Balancing Botanicals', benefit: 'Feminine Balance', action: 'Specifically formulated to maintain natural pH level, supporting feminine balance.' },
      { name: 'Soothing Extracts', benefit: 'Protection', action: 'Provides calming sensation that promotes healing while hydrating to prevent dryness.' }
    ],
    usage: {
      application: 'Apply a few drops to clean fingertips and gently massage the external vaginal area.',
      technique: 'For a luxurious experience, add a drop to warm water for a soothing wash, or mix with a carrier oil for a gentle, nourishing massage.',
      frequency: 'Use daily as part of your intimate care routine.'
    },
    category: 'intimate'
  },
  {
    id: 'oil-of-muse',
    name: 'Oil of Muse',
    subtitle: 'Firming, Smoother, Younger-Looking Skin',
    price: 149,
    image: '/lovable-uploads/5a.jpg',
    overview: 'Oil of Muse is a premium facial serum specially formulated to help women achieve a confident, radiant complexion. By combining high-quality natural oils with the finest essential oil essences, it deeply nourishes the skin, fades scars, and reduces the visible signs of aging.',
    ingredients: [
      { name: 'Sweet Almond Oil', benefit: 'Moisturizing', action: 'Rich in Vitamin E and fatty acids to moisturize and soften skin.' },
      { name: 'Apple Seed Oil Essence', benefit: 'Rejuvenation', action: 'High in antioxidants to protect against free radicals and rejuvenate dull skin.' },
      { name: 'Cherry Seed Oil Essence', benefit: 'Elasticity', action: 'Improves skin texture, increases elasticity, and provides deep moisture.' },
      { name: 'Castor Oil', benefit: 'Healing', action: 'Anti-inflammatory and antibacterial properties to soothe sensitive skin and accelerate scar healing.' },
      { name: 'Rose Hip Oil', benefit: 'Collagen Boost', action: 'Powerhouse of Vitamin C and Omega-3 fatty acids that stimulates collagen production and fades hyperpigmentation.' },
      { name: 'Frankincense Essential Oil', benefit: 'Firming', action: 'Promotes elasticity and tightens the skin to reduce wrinkles.' },
      { name: 'Rose Essential Oil', benefit: 'Anti-aging', action: 'Provides anti-aging effects and soothes stressed skin.' },
      { name: 'Geranium Essential Oil', benefit: 'Balancing', action: 'Balances natural oils and evens out skin tone.' },
      { name: 'Fennel Essential Oil', benefit: 'Brightening', action: 'Rich in antioxidants to tighten and brighten the complexion.' },
      { name: 'Lavender Essential Oil', benefit: 'Soothing', action: 'Reduces redness and inflammation with healing properties.' },
      { name: 'Ylang-Ylang Essential Oil', benefit: 'Hydration', action: 'Balances moisture and provides a calming aroma.' }
    ],
    category: 'topical'
  },
  {
    id: 'astaglow-soap',
    name: 'AstaGlow Facial Soap',
    subtitle: 'Handcrafted Antioxidant Cleanser',
    price: 89,
    image: '/lovable-uploads/6a.jpg',
    overview: "AstaGlow is a luxurious facial soap crafted with nature's most powerful skin-loving ingredients. It offers a perfect balance of cleansing, nourishing, and anti-aging benefits, making it suitable for all skin types, including sensitive skin.",
    ingredients: [
      { name: 'Astaxanthin', benefit: 'Ultimate Antioxidant', action: "Known as one of the world's strongest natural antioxidants, fights free radicals that cause premature aging. Reduces fine lines, wrinkles, and dark spots while protecting from UV damage." },
      { name: 'Mango Butter', benefit: 'Deep Nourishment', action: 'Rich in Vitamins A, C, and E, deeply hydrates and softens the skin. Helps repair dry, damaged skin and restores elasticity.' },
      { name: 'Shea Butter', benefit: 'Moisture Shield', action: 'Intensely moisturizing, locks in hydration and soothes irritated skin while supporting natural skin barrier function.' },
      { name: 'Grapefruit Essential Oil', benefit: 'Brightening', action: 'Naturally rich in Vitamin C, brightens dull skin and balances oil production. Refreshing citrus aroma uplifts mood.' },
      { name: 'Organic Glycerine Base', benefit: 'Gentle Cleanse', action: 'Natural humectant that draws moisture into the skin, providing a mild, non-drying cleanse.' }
    ],
    category: 'topical'
  }
];

// Tanda Kasih Curation Bundle
export interface CurationBundle {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
  includes: string[];
  exclusives: { name: string; description: string }[];
  tagline: string;
}

export const tandaKasihBundle: CurationBundle = {
  id: 'tanda-kasih',
  name: 'TANDA KASIH',
  subtitle: 'A Sign of Love',
  description: 'A Curation for Ramadhan. A Glow for Syawal. As the holy month approaches, we are called to purify not just our intentions, but our physical vessels. To commemorate the launch of DNA by Norehan, we present our inaugural curation: Tanda Kasih. This is more than a bundle; it is a 30-day preparation for the soul. Designed to keep you pure of mind, heart, and body during Ramadhan, this collection ensures you feel light, energized, and deeply nourished while you fast.',
  price: 888,
  image: '/lovable-uploads/tanda-kasih.jpg',
  includes: [
    "The Complete Apothecary (1 Month Supply): All 6 DNA Elixirs (Nature's Potion, Bustify Oil, Collary Collagen, Magic Potion, Oil of Muse, AstaGlow) to cleanse toxins, hydrate deeply, and maintain vitality from Sahur to Iftar."
  ],
  exclusives: [
    { name: 'The Ceramic Ritual Set', description: 'A delicate, handcrafted ceramic spoon and dish set, perfect for measuring your Collary Collagen or mixing your Magic Potion blends.' },
    { name: 'The Linen-Bound Wellness Journal', description: 'A physical companion for the holy month to document your prayers, gratitude, and wellness journey.' },
    { name: 'The Rosa Gallica Scarf', description: 'An exquisite, limited-edition shawl featuring the Rosa Gallica motif. Soft, breathable, and elegant—designed to complement your "DNA Glow" on the morning of Syawal.' }
  ],
  tagline: 'Purify the vessel. Radiate the light.'
};

// Layering Guide Data
export interface LayeringStep {
  step: number;
  title: string;
  product: string;
  description: string;
  whyItWorks: string;
}

export const morningRitual: LayeringStep[] = [
  {
    step: 1,
    title: 'The Internal Wake-Up Call',
    product: "Nature's Potion",
    description: "Before your coffee, start with a sip of Nature's Potion. Overnight, your body works hard to process waste. This tonic helps flush those toxins through the kidneys using natural diuretics like celery.",
    whyItWorks: 'It re-injects natural energy into every cell without the crash of caffeine. The cucumber hydrates and cools the body, while lemon aids liver function to prepare your metabolism for the day.'
  },
  {
    step: 2,
    title: 'The Brightening Cleanse',
    product: 'AstaGlow Facial Soap',
    description: 'Cleanse your face with AstaGlow. In the morning, you want to remove night-time oils without stripping your moisture barrier.',
    whyItWorks: 'The Grapefruit Essential Oil is the key here—it naturally brightens dull skin and balances oil production. The uplifting citrus aroma is also a mood booster to start your day.'
  },
  {
    step: 3,
    title: 'The Antioxidant Shield',
    product: 'Oil of Muse',
    description: 'Apply Oil of Muse while your skin is still slightly damp. This serum is your armor against pollution and UV damage.',
    whyItWorks: 'This oil contains Apple Seed Oil Essence, which is high in antioxidants to protect the skin from free radicals. Layering this over your clean skin locks in moisture using Sweet Almond Oil, while Geranium oil works to even out your skin tone for a fresh, "no-makeup" glow.'
  }
];

export const eveningRitual: LayeringStep[] = [
  {
    step: 1,
    title: 'The Deep Detox Cleanse',
    product: 'AstaGlow Facial Soap',
    description: "Wash away the day's pollution. The Astaxanthin in AstaGlow is crucial at night; as one of the world's strongest natural antioxidants, it fights free radicals that cause premature aging.",
    whyItWorks: 'The organic glycerine base ensures a non-drying cleanse, while Mango Butter repairs dry, damaged skin, prepping your face for the next step.'
  },
  {
    step: 2,
    title: 'The Targeted Treatment',
    product: 'Oil of Muse',
    description: "At night, your skin switches into \"repair mode.\" Oil of Muse supports this with Frankincense and Rose Hip Oil.",
    whyItWorks: 'Frankincense promotes skin elasticity and tightens the skin, while Rose Hip Oil stimulates collagen production to fade fine lines and scars while you sleep.'
  },
  {
    step: 3,
    title: 'The Body & Mind Unwind',
    product: 'Bustify Oil',
    description: "Wellness doesn't stop at the neck. Use Bustify Oil for a breast massage ritual. This isn't just for firming; it is for de-stressing.",
    whyItWorks: 'The massage stimulates blood circulation, while the aromatherapy blend of Lavender and Chamomile reduces stress and helps balance hormones. The Geranium and Lemongrass oils support the lymphatic system to reduce tightness and aid detoxification.'
  },
  {
    step: 4,
    title: 'Intimate Balance',
    product: 'Magic Potion',
    description: 'End your physical care routine by restoring balance to your most intimate area.',
    whyItWorks: 'A few drops help maintain natural pH levels and hydrate to prevent dryness. It provides a soothing, calming sensation that promotes healing.'
  },
  {
    step: 5,
    title: 'The Cellular Repair Capstone',
    product: 'Collary Collagen',
    description: 'The final step is internal. Drink Collary Collagen before bed.',
    whyItWorks: 'Your body does its heavy lifting on tissue repair while you sleep. The Peptide Marine Collagen supports this by promoting overall cellular regeneration and repairing the gut lining. The Multiberry Complex continues the work of liver detoxification throughout the night.'
  }
];

export const synergyBenefits = [
  {
    title: 'Double Detox',
    description: 'You are supporting your liver externally with Bustify Oil (lymphatic drainage) and internally with Nature\'s Potion (sulforaphane from broccoli).'
  },
  {
    title: 'Double Collagen',
    description: 'You are stimulating collagen externally with Oil of Muse (Rose Hip Oil) and supplementing it internally with Collary Collagen (Marine Peptides).'
  },
  {
    title: 'Double Antioxidants',
    description: 'You are fighting free radicals on the skin surface with AstaGlow (Astaxanthin) and in your organs with the Collary Multiberry Complex.'
  }
];
