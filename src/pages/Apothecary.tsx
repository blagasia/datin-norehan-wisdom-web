import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Heart, ShoppingBag, 
  ArrowLeft, ChevronRight, Beaker, Play, BookOpen, Users, Gift
} from 'lucide-react';

/**
 * DATIN NOREHAN DIGITAL ECOSYSTEM
 * ================================
 * Core Ethos: Ikhtiar (Intention), Istiqamah (Consistency), Amanah (Trust)
 * 
 * I. The Sanctuary: Datin Norehan Apothecary
 *    - URL: datin.norehan.com
 *    - Purpose: Community, mentorship, creative wellness, Art of Living Well
 *    - Key Features: DNA Wisdom Hub, TikTok Broadcast Feed, Studio Sessions, Wellness Journal
 * 
 * II. The Label: DNA by Norehan
 *    - URL: dna.norehan.com  
 *    - Purpose: Professional botanical product line with scientific authority
 *    - DNA stands for: Datin Norehan's Apothecary
 */

interface Ingredient {
  name: string;
  benefit: string;
  action: string;
}

interface Product {
  id: string;
  img: string;
  detailImg: string;
  name: string;
  tagline: string;
  price: string;
  intention: string;
  science: string;
  ingredients: Ingredient[];
  discipline: string;
  personalNote: string;
}

// Wisdom/TikTok Content
interface WisdomPost {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  videoId?: string;
}

const Apothecary = () => {
  const [view, setView] = useState<'sanctuary' | 'label'>('sanctuary');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, activeProduct]);

  // THE MASTER MANUSCRIPT - COMPLETE PRODUCT DATA
  const products: Product[] = [
    {
      id: 'true-green',
      img: '/lovable-uploads/ritual-lifestyle.jpeg', // Placeholder until 1a.png is uploaded
      detailImg: '/lovable-uploads/ritual-lifestyle.jpeg', // Placeholder until 1b.png is uploaded
      name: "True Green: Nature's Potion",
      tagline: 'Internal Stewardship: The Daily Lightness',
      price: 'RM 89',
      intention: "A nutrient-dense melody of eight botanicals crafted to assist the body's natural filtration systems through concentrated plant nutrition.",
      science: 'Concentrated plant nutrition that supports the liver and digestive tract through high-efficacy botanicals, specifically targeting the activation of natural detoxification pathways.',
      ingredients: [
        { 
          name: 'Broccoli', 
          benefit: 'Liver Support', 
          action: "Contains Sulforaphane, which activates the Nrf2 pathway to trigger the body's natural detox enzymes." 
        },
        { 
          name: 'Pineapple', 
          benefit: 'Digestion', 
          action: 'Rich in Bromelain, a proteolytic enzyme that reduces systemic inflammation and aids protein breakdown.' 
        },
        { 
          name: 'Lemon', 
          benefit: 'pH Balance', 
          action: 'Alkalizes the internal environment and provides Vitamin C to boost cellular immunity and collagen synthesis.' 
        },
        { 
          name: 'Cucumber', 
          benefit: 'Hydration', 
          action: 'High silica and water content supports toxin excretion through the renal system and promotes skin plumpness.' 
        }
      ],
      discipline: 'Mix 1 sachet with 200ml of cool water. Drink every morning on an empty stomach to allow maximum nutrient absorption.',
      personalNote: "I call this my Morning Ikhtiar. This green hue is life itself—a potion for the body. On warmer days, I love to mix it with cold sparkling water and a few crushed mint leaves. As you sip, acknowledge the work your body does for you every day. It is a moment of deep gratitude."
    },
    {
      id: 'bustify',
      img: '/lovable-uploads/hero-2.jpg', // Placeholder until 2a.png is uploaded
      detailImg: '/lovable-uploads/hero-2.jpg', // Placeholder until 2b.png is uploaded
      name: 'Bustify Oil',
      tagline: 'The Practice of Dignity: Nurturing Feminine Health',
      price: 'RM 149',
      intention: 'To support skin elasticity and healthy lymphatic circulation with total dignity and care.',
      science: 'An aromatherapy formulation designed to firm and nourish the delicate skin of the chest while supporting hormonal balance through the limbic system.',
      ingredients: [
        { 
          name: 'Geranium Oil', 
          benefit: 'Lymphatic Flow', 
          action: 'Acts as a natural astringent to firm skin tissues and encourage fluid drainage from the chest area.' 
        },
        { 
          name: 'Ylang-Ylang', 
          benefit: 'Hormonal Calm', 
          action: 'Aromatherapeutic properties help balance emotions and reduce cortisol levels that disrupt hormonal health.' 
        },
        { 
          name: 'Jojoba Oil', 
          benefit: 'Skin Mimicry', 
          action: 'Structurally similar to human sebum; it penetrates deeply to moisturize and carry essential oils without clogging pores.' 
        }
      ],
      discipline: 'Warm 3–5 drops in your palms. Use slow, upward circular motions for 10 minutes, morning and night.',
      personalNote: "Breast care is a matter of health, not just vanity. Use this time to check in with yourself. The aroma of lavender and ylang-ylang is my way of starting the day with a centered, peaceful heart."
    },
    {
      id: 'collary',
      img: '/lovable-uploads/studio-2.jpg', // Placeholder until 3a.png is uploaded
      detailImg: '/lovable-uploads/studio-2.jpg', // Placeholder until 3b.png is uploaded
      name: 'Collary Collagen',
      tagline: 'The Scaffolding of Vitality: Resilience from the Core',
      price: 'RM 139',
      intention: "A scientific embrace for structural wellness. Low-molecular-weight Marine Peptides ensure maximum bioavailability for skin, joints, and gut health.",
      science: "Bio-available peptides paired with a potent antioxidant berry complex to fight oxidative stress and support the body's collagen-producing cells (fibroblasts).",
      ingredients: [
        { 
          name: 'Marine Peptides', 
          benefit: 'Structural Integrity', 
          action: 'Provides the specific amino acids (proline, glycine) necessary for collagen synthesis in skin, gut, and joints.' 
        },
        { 
          name: 'Acai Berry', 
          benefit: 'Antioxidant Shield', 
          action: 'High ORAC score; neutralizes free radicals that cause the premature breakdown of collagen fibers.' 
        },
        { 
          name: 'Blackcurrant', 
          benefit: 'Vitamin C Synergy', 
          action: 'Works as a mandatory co-factor in the hydroxylation of collagen molecules to ensure structural repair.' 
        }
      ],
      discipline: "Whisk 1 scoop into water or a smoothie daily. Best taken before sleep when the body's repair cycle is most active.",
      personalNote: "Practice Istiqamah (consistency). Consistency is the only secret to the glow. I often mix mine into a little almond milk before bed for a creamy, nourishing evening treat."
    },
    {
      id: 'magic-potion',
      img: '/lovable-uploads/ritual-spoon.jpg', // Placeholder until 4a.png is uploaded
      detailImg: '/lovable-uploads/ritual-spoon.jpg', // Placeholder until 4b.png is uploaded
      name: 'Magic Potion',
      tagline: 'The Balance of Purity: Protecting Natural Chemistry',
      price: 'RM 129',
      intention: 'A 100% natural, pH-respecting elixir designed to provide soothing hydration and maintain delicate intimate balance.',
      science: 'Formulated with pure Coconut lipids and botanical extracts to provide a natural antimicrobial barrier without synthetic fragrances or disruptors.',
      ingredients: [
        { 
          name: 'Coconut Lipids', 
          benefit: 'Antimicrobial Barrier', 
          action: 'Medium-chain fatty acids (Lauric acid) provide a natural defense against irritation and fungal imbalance.' 
        },
        { 
          name: 'Botanical Extracts', 
          benefit: 'pH Stabilization', 
          action: 'Carefully balanced to maintain the natural acidic environment (pH 3.5-4.5) required for intimate health.' 
        }
      ],
      discipline: 'Apply 1–2 drops to clean fingertips and massage externally after bathing.',
      personalNote: "We must be so careful with what we use on our most delicate areas. This is honest care. I never travel without it—it is my assurance of freshness no matter where I am."
    },
    {
      id: 'oil-of-muse',
      img: '/lovable-uploads/hero-2.jpg', // Placeholder until 5a.png is uploaded
      detailImg: '/lovable-uploads/hero-2.jpg', // Placeholder until 5b.png is uploaded
      name: 'Oil of Muse',
      tagline: 'The Correction of Time: Repairing with Sincerity',
      price: 'RM 149',
      intention: 'A correction-focused serum that targets cellular repair and collagen stimulation to address environmental and UV damage.',
      science: 'High concentration of Vitamin A from Rose Hip Oil paired with the cellular-regenerative properties of Frankincense.',
      ingredients: [
        { 
          name: 'Rose Hip Oil', 
          benefit: 'Scar & UV Repair', 
          action: 'Naturally high in trans-retinoic acid (Vitamin A) to accelerate cellular turnover and fade hyperpigmentation.' 
        },
        { 
          name: 'Frankincense', 
          benefit: 'Cellular Rejuvenation', 
          action: 'Promotes the regeneration of healthy cells and reduces the inflammatory markers associated with aging.' 
        },
        { 
          name: 'Sweet Almond', 
          benefit: 'Moisture Barrier', 
          action: 'Rich in Vitamin E and fatty acids to soothe the epidermis and lock in moisture for a luminous finish.' 
        }
      ],
      discipline: 'Press 2–4 drops into damp skin. The moisture acts as a carrier, pulling the oil deeper into the skin layers.',
      personalNote: "This provides the 'Rested Glow.' If your skin feels tired or flat during the day, mix a tiny drop into your liquid foundation. It restores the moisture barrier instantly."
    },
    {
      id: 'astaglow',
      img: '/lovable-uploads/studio-2.jpg', // Placeholder until 6a.png is uploaded
      detailImg: '/lovable-uploads/studio-2.jpg', // Placeholder until 6b.png is uploaded
      name: 'AstaGlow Facial Soap',
      tagline: 'The Shield of Light: Cleansing with Antioxidant Power',
      price: 'RM 89',
      intention: 'A handcrafted treatment cleanse that neutralizes free radicals while washing, leaving the skin supple and "bouncy."',
      science: 'Anchored by Astaxanthin—6,000 times stronger than Vitamin C—which neutralizes the oxidative stress caused by UV exposure.',
      ingredients: [
        { 
          name: 'Astaxanthin', 
          benefit: 'UV Damage Repair', 
          action: "The ultimate antioxidant shield; neutralizes free radicals from sun exposure and prevents dark spots." 
        },
        { 
          name: 'Mango Butter', 
          benefit: 'Elasticity Restore', 
          action: "Packed with essential fatty acids that nourish the lipid barrier and restore skin's natural \"bounce.\"" 
        },
        { 
          name: 'Shea Butter', 
          benefit: 'Protective Shield', 
          action: 'Creates a breathable barrier that prevents trans-epidermal water loss after the wash.' 
        }
      ],
      discipline: 'Lather in hands, massage gently, and rinse with cool water. Use twice daily.',
      personalNote: "The secret is the 60-second rule. Let the lather sit on your face for one minute so the Astaxanthin can actually do its work. Finish with a cold splash—it wakes up the spirit!"
    }
  ];

  // DNA Wisdom Hub Content
  const wisdomPosts: WisdomPost[] = [
    {
      id: '1',
      title: 'The Morning Ikhtiar: Why I Start Every Day with True Green',
      category: 'Daily Rituals',
      excerpt: 'Understanding the science of morning detoxification and why an empty stomach matters for nutrient absorption.',
    },
    {
      id: '2',
      title: 'Istiqamah: The Only Secret to Radiant Skin',
      category: 'Philosophy',
      excerpt: 'Consistency over intensity—why small daily actions create lasting transformation.',
    },
    {
      id: '3',
      title: 'Understanding Your Skin Barrier: The Science of Repair',
      category: 'Science',
      excerpt: 'A deep dive into trans-epidermal water loss and how botanical oils restore the moisture barrier.',
    },
    {
      id: '4',
      title: 'The Art of Porcelain: Where Stillness Meets Alchemy',
      category: 'Studio Sessions',
      excerpt: 'How my painting practice informs my approach to formulation—patience as the ultimate ingredient.',
    },
  ];

  // Navigation Component with Persistent Switcher
  const Nav = () => (
    <nav className="fixed top-0 w-full z-50 bg-apothecary-ivory/95 backdrop-blur-md border-b border-foreground/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => {setView('sanctuary'); setActiveProduct(null);}}>
            <h1 className="font-playfair text-xl tracking-tight leading-none uppercase">
              Datin Norehan <span className="font-light opacity-40">Apothecary</span>
            </h1>
          </div>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-foreground/50">
            <button 
              onClick={() => {setView('sanctuary'); setActiveProduct(null);}} 
              className={`pb-1 transition-all ${view === 'sanctuary' ? 'text-foreground border-b-2 border-foreground' : 'hover:text-foreground'}`}
            >
              The Sanctuary
            </button>
            <button 
              onClick={() => {setView('label'); setActiveProduct(null);}} 
              className={`pb-1 transition-all ${view === 'label' ? 'text-foreground border-b-2 border-foreground' : 'hover:text-foreground'}`}
            >
              The Label
            </button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          {/* Persistent Switcher Button */}
          <button 
            onClick={() => {setView(view === 'sanctuary' ? 'label' : 'sanctuary'); setActiveProduct(null);}}
            className="hidden md:flex items-center gap-2 text-[9px] tracking-[0.3em] font-bold border border-foreground/10 px-4 py-2 rounded-full uppercase hover:bg-foreground hover:text-background transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-apothecary-blush"></span>
            {view === 'sanctuary' ? 'Enter DNA Label' : 'Return to Sanctuary'}
          </button>
          <ShoppingBag className="w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity" />
          <Menu className="w-6 h-6 lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-apothecary-ivory z-50 p-6 animate-fade-in">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-playfair text-xl">Datin Norehan</h1>
            <X className="w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-8">
            <button 
              onClick={() => {setView('sanctuary'); setActiveProduct(null); setIsMenuOpen(false);}}
              className={`text-left text-2xl font-playfair ${view === 'sanctuary' ? 'text-apothecary-teal' : ''}`}
            >
              The Sanctuary
            </button>
            <button 
              onClick={() => {setView('label'); setActiveProduct(null); setIsMenuOpen(false);}}
              className={`text-left text-2xl font-playfair ${view === 'label' ? 'text-apothecary-teal' : ''}`}
            >
              The Label
            </button>
            <div className="border-t border-foreground/10 pt-8 mt-4">
              <p className="text-sm text-foreground/50 mb-4">Core Ethos</p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="px-3 py-1 bg-apothecary-sage rounded-full">Ikhtiar</span>
                <span className="px-3 py-1 bg-apothecary-blush rounded-full">Istiqamah</span>
                <span className="px-3 py-1 bg-brand-lavender-mist rounded-full">Amanah</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  // THE SANCTUARY: High-texture Editorial Design
  const SanctuaryHome = () => (
    <div className="pt-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-foreground">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-50"
          poster="/lovable-uploads/hero-2.jpg"
        >
          <source src="/lovable-uploads/hero-1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-foreground/30"></div>
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <span className="text-xs tracking-[0.5em] uppercase mb-6 block font-light opacity-80">From Rented Spaces to a Sanctuary</span>
          <h2 className="font-playfair text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight italic">
            Datin Norehan<br/>Apothecary
          </h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-12 opacity-80 font-light leading-relaxed">
            A permanent residence for our community. Where Ikhtiar meets intention.
          </p>
          <button 
            onClick={() => setView('label')}
            className="bg-apothecary-blush text-foreground px-12 py-5 rounded-full hover:shadow-2xl transition-all text-xs font-bold tracking-widest uppercase"
          >
            Explore the Elixirs →
          </button>
        </div>
      </section>

      {/* The Master Story */}
      <section className="py-24 md:py-32 px-6 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-10 h-10 text-apothecary-blush mx-auto mb-10" />
          <h3 className="font-playfair text-3xl md:text-4xl mb-12 italic">The Master Story</h3>
          <div className="text-base md:text-lg text-foreground/70 leading-relaxed space-y-6 text-left font-light">
            <p>
              For years, we have gathered in the "rented spaces" of digital worlds. TikTok has been the journey of a lifetime for me—a place where my elixirs first found their voice and where each and every one of you became part of my daily rhythm. I have been deeply humbled by the kindness and the shared stories of the community we built there; it was the ground where our first seeds of <em className="font-medium text-apothecary-teal">Ikhtiar</em> (intention) were planted.
            </p>
            <p>
              However, in those spaces, we are guests. We follow the rules of the <em>tuan rumah</em> (landlord), and our conversations are often shaped by the noise of the marketplace.
            </p>
            <p>
              Today, I am opening the doors to my own home: <strong className="font-medium">The Datin Norehan Apothecary</strong>. This is a permanent residence for our community. On this property, I am a homeowner welcoming you into a private world. This is where I can share the quiet hours of my porcelain painting, the descriptive science behind my formulations, and the sincere reflections I have gathered over many years.
            </p>
            <p>
              While my home is a place of intimacy and local tradition, the healing I share is meant for women everywhere. To reach them, I have created <strong className="font-medium">DNA by Norehan</strong>—the professional label that carries the spirit of my apothecary to the world.
            </p>
          </div>
        </div>
      </section>

      {/* The Studio Section */}
      <section className="py-24 px-6 bg-apothecary-ivory">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-foreground/40 mb-4 block font-bold">The Studio</span>
            <h3 className="font-playfair text-3xl md:text-4xl mb-8">Where Art Meets Alchemy</h3>
            <p className="text-foreground/60 leading-relaxed mb-6">
              My porcelain painting practice is where I find stillness. Each brushstroke is a meditation, 
              a reminder that beauty emerges from patience and presence.
            </p>
            <p className="text-foreground/60 leading-relaxed mb-8">
              This same intention flows into every elixir I formulate—products born not from haste, 
              but from a deep reverence for the body's natural wisdom.
            </p>
            <div className="flex gap-4">
              <span className="px-4 py-2 bg-apothecary-sage rounded-full text-sm font-medium">Ikhtiar</span>
              <span className="px-4 py-2 bg-apothecary-blush rounded-full text-sm font-medium">Istiqamah</span>
              <span className="px-4 py-2 bg-brand-lavender-mist rounded-full text-sm font-medium">Amanah</span>
            </div>
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/studio-1.jpeg" 
              alt="Datin Norehan in her studio" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* DNA Wisdom Hub - Knowledge Broadcast */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <BookOpen className="w-8 h-8 text-apothecary-teal mx-auto mb-6" />
            <span className="text-xs tracking-[0.4em] uppercase text-foreground/40 mb-4 block font-bold">DNA Wisdom Hub</span>
            <h3 className="font-playfair text-3xl md:text-4xl mb-4">The Knowledge Broadcast</h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Understanding the "Why" behind the "How." Educational content that bridges social discovery and scientific stewardship.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {wisdomPosts.map(post => (
              <div key={post.id} className="group bg-apothecary-ivory p-8 rounded-2xl border border-foreground/5 hover:shadow-xl transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <Play className="w-4 h-4 text-apothecary-teal" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 font-bold">{post.category}</span>
                </div>
                <h4 className="font-playfair text-xl mb-3 group-hover:text-apothecary-teal transition-colors">{post.title}</h4>
                <p className="text-foreground/60 text-sm leading-relaxed">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DNA Rituals Subscription */}
      <section className="py-24 px-6 bg-apothecary-sage">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="/lovable-uploads/ritual-spoon.jpg" 
              alt="The Ritual Spoon - Tanda" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-foreground/60 mb-4 block font-bold">DNA Rituals</span>
            <h3 className="font-playfair text-3xl md:text-4xl mb-6">The Commitment to Istiqamah</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">
              A monthly delivery of the Foundation Ritual—True Green + Collary Collagen—for those committed to consistency.
            </p>
            <div className="bg-background/60 backdrop-blur-sm p-6 rounded-2xl mb-8">
              <h4 className="font-playfair text-xl mb-3">The Tanda (The Ritual Spoon)</h4>
              <p className="text-foreground/60 text-sm">
                A signature hand-painted porcelain spoon, designed by Datin herself. Each spoon carries the spirit of intentional wellness.
              </p>
            </div>
            <button className="bg-foreground text-background px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity">
              Join the Ritual →
            </button>
          </div>
        </div>
      </section>

      {/* Community Ecosystem */}
      <section className="py-24 px-6 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Users className="w-8 h-8 text-apothecary-blush mx-auto mb-6" />
            <h3 className="font-playfair text-3xl md:text-4xl mb-4">The Community Ecosystem</h3>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              A sanctuary for those committed to the journey of wellness.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-apothecary-ivory rounded-2xl">
              <div className="w-16 h-16 bg-apothecary-blush rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-6 h-6 text-foreground" />
              </div>
              <h4 className="font-playfair text-xl mb-3">My Inner Circle</h4>
              <p className="text-foreground/60 text-sm">Exclusive access for those committed to Istiqamah. A shared space for intention and accountability.</p>
            </div>
            <div className="text-center p-8 bg-apothecary-sage rounded-2xl">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-6 h-6 text-foreground" />
              </div>
              <h4 className="font-playfair text-xl mb-3">Wellness Journal</h4>
              <p className="text-foreground/60 text-sm">A shared digital and physical companion to document health intentions, energy levels, and skin health.</p>
            </div>
            <div className="text-center p-8 bg-brand-lavender-mist rounded-2xl">
              <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="w-6 h-6 text-foreground" />
              </div>
              <h4 className="font-playfair text-xl mb-3">Tanda Kasih</h4>
              <p className="text-foreground/60 text-sm">Limited edition expressions of love. Curated gift sets for Raya and special occasions.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  // THE LABEL: Clean, Science-Focused Design
  const LabelHome = () => (
    <div className="pt-32 animate-fade-in">
      <header className="px-6 max-w-7xl mx-auto mb-20">
        <span className="text-xs font-bold tracking-[0.4em] uppercase text-apothecary-blush mb-4 block">DNA by Norehan</span>
        <h1 className="font-playfair text-5xl md:text-6xl lg:text-8xl mb-8 leading-none">The Collection</h1>
        <p className="max-w-2xl text-foreground/60 text-lg leading-relaxed">
          The professional expression of the Datin Norehan Apothecary. Every elixir is 100% natural, organic, and formulated to address real structural challenges. DNA stands for <em>Datin Norehan's Apothecary</em>.
        </p>
      </header>

      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setActiveProduct(p)}>
              <div className="aspect-[4/5] bg-background rounded-2xl mb-6 flex items-center justify-center relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all border border-foreground/5">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2 block font-bold">{p.tagline}</span>
              <h3 className="font-playfair text-2xl mb-3 group-hover:text-apothecary-teal transition-colors">{p.name}</h3>
              <div className="flex justify-between items-center border-t border-foreground/5 pt-4">
                <span className="font-bold text-lg">{p.price}</span>
                <span className="text-[10px] tracking-widest text-foreground/40 group-hover:text-foreground transition-colors font-bold uppercase flex items-center gap-2">
                  View Science <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Product Detail View with FULL Content
  const ProductDetail = ({ product }: { product: Product }) => (
    <div className="pt-32 animate-fade-in pb-32">
      <div className="px-6 max-w-7xl mx-auto">
        <button onClick={() => setActiveProduct(null)} className="text-[10px] tracking-[0.3em] text-foreground/40 hover:text-foreground mb-12 flex items-center gap-2 font-bold uppercase transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Collection
        </button>

        {/* Product Hero */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-start">
          <div className="aspect-square bg-background rounded-3xl overflow-hidden border border-foreground/5 shadow-inner sticky top-32">
            <img src={product.detailImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-apothecary-blush mb-4 block">{product.tagline}</span>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">{product.name}</h1>
            <p className="text-2xl md:text-3xl font-light mb-10 text-foreground/40">{product.price}</p>
            
            <div className="space-y-10 mb-12">
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-foreground/30">The Intention</h4>
                <p className="text-lg md:text-xl text-foreground/70 leading-relaxed font-light">{product.intention}</p>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-foreground/30">Scientific Basis</h4>
                <p className="text-base md:text-lg text-foreground/60 leading-relaxed">{product.science}</p>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-foreground/30">The Discipline (Usage)</h4>
                <p className="text-foreground/70 leading-relaxed">{product.discipline}</p>
              </section>
            </div>
            
            <button className="w-full bg-apothecary-blush py-5 rounded-full hover:shadow-xl transition-all font-bold tracking-widest text-sm uppercase">
              Add to Ritual
            </button>
          </div>
        </div>

        {/* FULL 3-Column Ingredient Intelligence Table */}
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-12 h-12 bg-apothecary-sage rounded-full flex items-center justify-center">
              <Beaker className="w-5 h-5 text-apothecary-teal" />
            </div>
            <h2 className="font-playfair text-3xl md:text-4xl">Ingredient Intelligence</h2>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-foreground/5 bg-background shadow-sm">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-apothecary-sage">
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-foreground/70">Ingredient Source</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-foreground/70">Primary Wellness Benefit</th>
                  <th className="p-6 md:p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-foreground/70">Scientific Action Pathway</th>
                </tr>
              </thead>
              <tbody>
                {product.ingredients.map((ing, idx) => (
                  <tr key={idx} className="border-t border-foreground/5 hover:bg-foreground/[0.02] transition-colors">
                    <td className="p-6 md:p-8 font-playfair text-lg text-foreground">{ing.name}</td>
                    <td className="p-6 md:p-8 text-sm font-bold text-foreground/70">{ing.benefit}</td>
                    <td className="p-6 md:p-8 text-sm md:text-base text-foreground/60 leading-relaxed font-light">{ing.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* The Living Ritual: Personal Notes - PROMINENT DISPLAY */}
        <div className="max-w-4xl mx-auto py-16 md:py-20 px-8 md:px-16 bg-apothecary-ivory rounded-3xl border border-foreground/5 shadow-inner text-center">
          <div className="w-20 h-20 bg-apothecary-blush rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
            <Heart className="w-8 h-8 text-background" />
          </div>
          <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-foreground/30 mb-8">The Living Ritual: My Personal Notes</h3>
          {/* Large, elegant italic serif font for Datin's voice */}
          <p className="font-playfair italic text-2xl md:text-3xl lg:text-4xl text-foreground/80 leading-relaxed">
            "{product.personalNote}"
          </p>
          <div className="mt-12 pt-8 border-t border-foreground/10 inline-block">
            <span className="font-playfair text-lg text-foreground/60">— Datin Norehan</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-apothecary-ivory text-foreground">
      <Nav />
      <main>
        {activeProduct ? (
          <ProductDetail product={activeProduct} />
        ) : (
          view === 'sanctuary' ? <SanctuaryHome /> : <LabelHome />
        )}
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t border-foreground/5 py-16 md:py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h4 className="font-playfair text-2xl mb-4">Datin Norehan Apothecary</h4>
          <p className="text-sm text-foreground/50 mb-8">
            DNA by Norehan • Crafted with Ikhtiar, delivered with Amanah
          </p>
          <div className="flex justify-center gap-4 mb-8">
            <span className="px-4 py-2 bg-apothecary-sage rounded-full text-xs font-medium">Ikhtiar</span>
            <span className="px-4 py-2 bg-apothecary-blush rounded-full text-xs font-medium">Istiqamah</span>
            <span className="px-4 py-2 bg-brand-lavender-mist rounded-full text-xs font-medium">Amanah</span>
          </div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-foreground/40">
            © 2025 DNA by Norehan. All rights reserved.
          </p>
          <p className="font-playfair italic mt-4 text-foreground/60">
            Wellness is a disciplined return to balance.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Apothecary;
