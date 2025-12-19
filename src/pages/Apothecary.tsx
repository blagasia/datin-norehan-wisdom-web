import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Heart, ShoppingBag, 
  ArrowLeft, ChevronRight, Beaker
} from 'lucide-react';

/**
 * DATIN NOREHAN DIGITAL ECOSYSTEM
 * Hierarchy: Datin Norehan Apothecary (Sanctuary) -> DNA by Norehan (Label)
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
  purpose: string;
  science: string;
  ingredients: Ingredient[];
  usage: string;
  personalNote: string;
}

const Apothecary = () => {
  const [view, setView] = useState<'sanctuary' | 'label'>('sanctuary');
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view, activeProduct]);

  // Product Data
  const products: Product[] = [
    {
      id: 'true-green',
      img: '/lovable-uploads/ritual-lifestyle.jpeg',
      detailImg: '/lovable-uploads/ritual-lifestyle.jpeg',
      name: "True Green: Nature's Potion",
      tagline: 'Internal Stewardship: The Daily Lightness',
      price: 'RM 89',
      purpose: "A nutrient-dense melody of eight botanicals crafted to assist the body's natural filtration systems through concentrated plant nutrition.",
      science: 'Concentrated plant nutrition that supports the liver and digestive tract through high-efficacy botanicals, primarily Sulforaphane and Bromelain.',
      ingredients: [
        { name: 'Broccoli', benefit: 'Liver Support', action: "Contains Sulforaphane, which activates the body's natural detox enzymes." },
        { name: 'Pineapple', benefit: 'Digestion', action: 'Rich in Bromelain to reduce inflammation and aid protein breakdown.' },
        { name: 'Lemon', benefit: 'pH Balance', action: 'Alkalizes the system and provides Vitamin C to boost cellular immunity.' },
        { name: 'Cucumber', benefit: 'Hydration', action: 'High silica content supports toxin excretion and skin plumpness.' }
      ],
      usage: 'Mix 1 sachet with 200ml of cool water. Drink every morning on an empty stomach to allow maximum nutrient absorption.',
      personalNote: "I call this my Morning Ikhtiar. This green hue is life itself—a potion for the body. On warmer days, I love to mix it with cold sparkling water and a few crushed mint leaves. As you sip, acknowledge the work your body does for you every day. It is a moment of deep gratitude."
    },
    {
      id: 'bustify',
      img: '/lovable-uploads/hero-2.jpg',
      detailImg: '/lovable-uploads/hero-2.jpg',
      name: 'Bustify Oil',
      tagline: 'The Practice of Dignity: Nurturing Feminine Health',
      price: 'RM 149',
      purpose: 'To support skin elasticity and healthy lymphatic circulation with total dignity and care.',
      science: 'Aromatherapy formulation designed to firm and nourish the delicate skin of the chest while supporting hormonal balance.',
      ingredients: [
        { name: 'Geranium Oil', benefit: 'Lymphatic Flow', action: 'Acts as a natural astringent to firm skin and encourage fluid drainage.' },
        { name: 'Ylang-Ylang', benefit: 'Hormonal Calm', action: 'Aromatherapeutic properties help balance emotions and reduce stress.' },
        { name: 'Jojoba Oil', benefit: 'Skin Mimicry', action: 'Structurally similar to human sebum; penetrates deep without grease.' }
      ],
      usage: 'Warm 3–5 drops in your palms. Use slow, upward circular motions for 10 minutes, morning and night.',
      personalNote: 'Breast care is a matter of health, not just vanity. Use this time to check in with yourself. The aroma of lavender and ylang-ylang is my way of starting the day with a centered, peaceful heart.'
    },
    {
      id: 'collary',
      img: '/lovable-uploads/studio-2.jpg',
      detailImg: '/lovable-uploads/studio-2.jpg',
      name: 'Collary Collagen',
      tagline: 'The Scaffolding of Vitality: Resilience from the Core',
      price: 'RM 139',
      purpose: "A scientific embrace for structural wellness. Low-molecular-weight Marine Peptides ensure maximum bioavailability for skin, joints, and gut health.",
      science: 'Bio-available peptides paired with a potent antioxidant berry complex to fight oxidative stress.',
      ingredients: [
        { name: 'Marine Peptides', benefit: 'Structural Integrity', action: 'Provides essential amino acids for collagen synthesis in skin and joints.' },
        { name: 'Acai Berry', benefit: 'Antioxidant Shield', action: 'Protects cells from the oxidative stress that causes premature aging.' },
        { name: 'Blackcurrant', benefit: 'Vitamin C', action: 'Works synergistically with peptides to ensure maximum structural repair.' }
      ],
      usage: "Whisk 1 scoop into water or a smoothie daily. Best taken before sleep when the body's repair cycle is most active.",
      personalNote: 'Practice Istiqamah. Consistency is the only secret to the glow. I often mix mine into a little almond milk before bed for a creamy, nourishing evening treat.'
    },
    {
      id: 'magic-potion',
      img: '/lovable-uploads/ritual-spoon.jpg',
      detailImg: '/lovable-uploads/ritual-spoon.jpg',
      name: 'Magic Potion',
      tagline: 'The Balance of Purity: Protecting Natural Chemistry',
      price: 'RM 129',
      purpose: 'A 100% natural, pH-respecting elixir designed to provide soothing hydration and maintain delicate intimate balance.',
      science: 'Formulated with pure Coconut lipids to provide a natural antimicrobial barrier without the noise of synthetic fragrances.',
      ingredients: [
        { name: 'Coconut Lipids', benefit: 'Antimicrobial', action: 'Provide a natural barrier against irritation and external imbalance.' },
        { name: 'Botanical Extracts', benefit: 'pH Balance', action: 'Carefully balanced to maintain the natural acidity of the intimate area.' }
      ],
      usage: 'Apply 1–2 drops to clean fingertips and massage externally after bathing.',
      personalNote: 'We must be so careful with what we use on our most delicate areas. This is honest care. I never travel without it—it is my assurance of freshness no matter where I am.'
    },
    {
      id: 'oil-of-muse',
      img: '/lovable-uploads/hero-2.jpg',
      detailImg: '/lovable-uploads/hero-2.jpg',
      name: 'Oil of Muse',
      tagline: 'The Correction of Time: Repairing with Sincerity',
      price: 'RM 149',
      purpose: 'A correction-focused serum that targets cellular repair and collagen stimulation to address environmental damage.',
      science: 'High Vitamin A content from Rose Hip Oil paired with Frankincense for deep dermal repair.',
      ingredients: [
        { name: 'Rose Hip Oil', benefit: 'Scar Repair', action: 'Naturally high in trans-retinoic acid (Vitamin A) for skin regeneration.' },
        { name: 'Frankincense', benefit: 'Cellular Turnover', action: 'Known for its ability to tighten skin and reduce the appearance of lines.' },
        { name: 'Sweet Almond', benefit: 'Moisture Barrier', action: 'Rich in Vitamin E to soothe inflammation and lock in hydration.' }
      ],
      usage: 'Press 2–4 drops into damp skin. The moisture helps the oil reach the deeper layers of the dermis.',
      personalNote: 'This provides the Rested Glow. If your skin feels tired during the day, mix a tiny drop into your foundation. It restores the moisture barrier instantly.'
    },
    {
      id: 'astaglow',
      img: '/lovable-uploads/studio-2.jpg',
      detailImg: '/lovable-uploads/studio-2.jpg',
      name: 'AstaGlow Facial Soap',
      tagline: 'The Shield of Light: Cleansing with Antioxidant Power',
      price: 'RM 89',
      purpose: 'A handcrafted treatment cleanse that neutralizes free radicals while washing, leaving the skin supple and bouncy.',
      science: 'Anchored by Astaxanthin—6,000 times stronger than Vitamin C—to neutralize UV-induced damage.',
      ingredients: [
        { name: 'Astaxanthin', benefit: 'UV Repair', action: "Nature's ultimate shield; neutralizes free radicals from sun exposure." },
        { name: 'Mango Butter', benefit: 'Elasticity', action: "Packed with fatty acids that restore the skin's natural bounce." },
        { name: 'Shea Butter', benefit: 'Protective Shield', action: 'Creates a breathable barrier that locks in moisture after the wash.' }
      ],
      usage: 'Lather in hands, massage gently, and rinse with cool water. Use twice daily.',
      personalNote: 'The secret is the 60-second rule. Let the lather sit for one minute so the Astaxanthin can work. Finish with a cold splash—it wakes up the spirit!'
    }
  ];

  // Navigation Component
  const Nav = () => (
    <nav className="fixed top-0 w-full z-50 bg-[#F8F3E6]/95 backdrop-blur-md border-b border-black/5 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-10">
          <div className="cursor-pointer" onClick={() => {setView('sanctuary'); setActiveProduct(null);}}>
            <h1 className="font-serif text-xl tracking-tight leading-none uppercase">
              Datin Norehan <span className="font-light opacity-40">Apothecary</span>
            </h1>
          </div>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.2em] font-bold text-black/50">
            <button onClick={() => setView('sanctuary')} className={view === 'sanctuary' ? 'text-black border-b border-black' : ''}>The Sanctuary</button>
            <button onClick={() => setView('label')} className={view === 'label' ? 'text-black border-b border-black' : ''}>The Label</button>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setView(view === 'sanctuary' ? 'label' : 'sanctuary')}
            className="hidden md:block text-[9px] tracking-[0.3em] font-bold border border-black/10 px-4 py-2 rounded-full uppercase hover:bg-black hover:text-white transition-all"
          >
            Switch to {view === 'sanctuary' ? 'DNA Label' : 'Sanctuary'}
          </button>
          <ShoppingBag className="w-5 h-5 cursor-pointer" />
          <Menu className="w-6 h-6 lg:hidden cursor-pointer" onClick={() => setIsMenuOpen(true)} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#F8F3E6] z-50 p-6">
          <div className="flex justify-between items-center mb-12">
            <h1 className="font-serif text-xl">Datin Norehan</h1>
            <X className="w-6 h-6 cursor-pointer" onClick={() => setIsMenuOpen(false)} />
          </div>
          <div className="flex flex-col gap-6 text-2xl font-serif">
            <button onClick={() => {setView('sanctuary'); setIsMenuOpen(false);}}>The Sanctuary</button>
            <button onClick={() => {setView('label'); setIsMenuOpen(false);}}>The Label</button>
          </div>
        </div>
      )}
    </nav>
  );

  // Sanctuary Home View
  const SanctuaryHome = () => (
    <div className="pt-20 animate-fade-in">
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          poster="/lovable-uploads/hero-2.jpg"
        >
          <source src="/lovable-uploads/hero-1.mp4" type="video/mp4" />
        </video>
        <img 
          src="/lovable-uploads/hero-2.jpg" 
          alt="Sanctuary Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-60 hidden"
        />
        <div className="relative z-10 text-center px-6 text-white max-w-4xl">
          <span className="text-xs tracking-[0.5em] uppercase mb-6 block font-light">From Rented Spaces to a Sanctuary</span>
          <h2 className="font-serif text-5xl md:text-8xl mb-10 leading-tight italic">Datin Norehan Apothecary</h2>
          <button 
            onClick={() => setView('label')}
            className="bg-[#F7D8D5] text-black px-12 py-5 rounded-full hover:shadow-2xl transition-all text-xs font-bold tracking-widest uppercase"
          >
            Explore the Lab →
          </button>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-10 h-10 text-[#F7D8D5] mx-auto mb-10" />
          <h3 className="font-serif text-4xl mb-12 italic">The Master Story</h3>
          <div className="text-lg md:text-xl text-black/70 leading-relaxed space-y-8 text-left font-light">
            <p>For years, we have gathered in the "rented spaces" of digital worlds. TikTok has been the journey of a lifetime for me—a place where my elixirs first found their voice. I have been deeply humbled by the kindness of the community we built there; it was the ground where our first seeds of <em>Ikhtiar</em> were planted.</p>
            <p>However, in those spaces, we are guests. Today, I am opening the doors to my own home: The Datin Norehan Apothecary. This is a permanent residence—a homeowner welcoming you into a private world where I can share the quiet hours of my porcelain painting and the sincere reflections I have gathered.</p>
          </div>
        </div>
      </section>

      {/* Studio Section */}
      <section className="py-24 px-6 bg-[#F8F3E6]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs tracking-[0.4em] uppercase text-black/40 mb-4 block font-bold">The Studio</span>
            <h3 className="font-serif text-4xl mb-8">Where Art Meets Alchemy</h3>
            <p className="text-black/60 leading-relaxed mb-6">
              My porcelain painting practice is where I find stillness. Each brushstroke is a meditation, 
              a reminder that beauty emerges from patience and presence.
            </p>
            <p className="text-black/60 leading-relaxed">
              This same intention flows into every elixir I formulate—products born not from haste, 
              but from a deep reverence for the body's natural wisdom.
            </p>
          </div>
          <div className="aspect-square rounded-3xl overflow-hidden">
            <img 
              src="/lovable-uploads/studio-1.jpeg" 
              alt="Datin Norehan in her studio" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Ingredients Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs tracking-[0.4em] uppercase text-[#26767E] mb-4 block font-bold">Pure Ingredients</span>
            <h3 className="font-serif text-4xl">From Nature's Apothecary</h3>
          </div>
          <div className="aspect-[2/1] rounded-3xl overflow-hidden">
            <img 
              src="/lovable-uploads/studio-2.jpg" 
              alt="Natural ingredients and botanicals" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );

  // Label Home View (Products)
  const LabelHome = () => (
    <div className="pt-32 animate-fade-in">
      <header className="px-6 max-w-7xl mx-auto mb-20">
        <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#F7D8D5] mb-4 block">DNA by Norehan</span>
        <h1 className="font-serif text-6xl md:text-8xl mb-8 leading-none">The Collection</h1>
        <p className="max-w-2xl text-black/60 text-lg leading-relaxed">
          The professional expression of the Datin Norehan Apothecary. Every elixir is 100% natural, organic, and formulated to address real structural challenges.
        </p>
      </header>

      <section className="px-6 max-w-7xl mx-auto mb-32">
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-20">
          {products.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => setActiveProduct(p)}>
              <div className="aspect-[4/5] bg-white rounded-3xl mb-8 flex items-center justify-center relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all border border-black/5">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-black/40 mb-3 block font-bold">{p.tagline}</span>
              <h3 className="font-serif text-3xl mb-4 group-hover:text-[#F7D8D5] transition-colors">{p.name}</h3>
              <div className="flex justify-between items-center border-t border-black/5 pt-6">
                <span className="font-bold text-lg">{p.price}</span>
                <span className="text-[10px] tracking-widest text-black/40 group-hover:text-black transition-colors font-bold uppercase flex items-center gap-2">
                  View Science <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  // Product Detail View
  const ProductDetail = ({ product }: { product: Product }) => (
    <div className="pt-32 animate-fade-in pb-32">
      <div className="px-6 max-w-7xl mx-auto">
        <button onClick={() => setActiveProduct(null)} className="text-[10px] tracking-[0.3em] text-black/40 hover:text-black mb-12 flex items-center gap-2 font-bold uppercase">
          <ArrowLeft className="w-4 h-4" /> Back to Apothecary
        </button>

        <div className="grid lg:grid-cols-2 gap-20 mb-32 items-start">
          <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-black/5 shadow-inner">
            <img src={product.detailImg} alt={product.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="text-xs font-bold tracking-[0.4em] uppercase text-[#F7D8D5] mb-4 block">{product.tagline}</span>
            <h1 className="font-serif text-6xl mb-6 leading-tight">{product.name}</h1>
            <p className="text-3xl font-light mb-12 text-black/40">{product.price}</p>
            <div className="space-y-12 mb-16">
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-black/30">The Intention</h4>
                <p className="text-xl text-black/70 leading-relaxed font-light">{product.purpose}</p>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-black/30">Scientific Basis</h4>
                <p className="text-lg text-black/60 leading-relaxed italic">{product.science}</p>
              </section>
              <section>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 text-black/30">The Discipline (Usage)</h4>
                <p className="text-black/70 leading-relaxed">{product.usage}</p>
              </section>
            </div>
            <button className="w-full bg-[#F7D8D5] py-6 rounded-full hover:shadow-xl transition-all font-bold tracking-widest text-sm uppercase">Add to Ritual</button>
          </div>
        </div>

        {/* Ingredient Table */}
        <div className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <Beaker className="w-8 h-8 text-[#26767E]" />
            <h2 className="font-serif text-4xl">Ingredient Intelligence</h2>
          </div>
          <div className="overflow-x-auto rounded-3xl border border-black/5 bg-white shadow-sm">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#D2DFCD]/40">
                  <th className="p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-black/60">Ingredient Source</th>
                  <th className="p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-black/60">Primary Wellness Benefit</th>
                  <th className="p-8 text-[11px] uppercase tracking-[0.3em] font-bold text-black/60">Scientific Action Pathway</th>
                </tr>
              </thead>
              <tbody>
                {product.ingredients.map((ing, idx) => (
                  <tr key={idx} className="border-t border-black/5 hover:bg-black/[0.01] transition-colors">
                    <td className="p-8 font-serif text-lg text-black">{ing.name}</td>
                    <td className="p-8 text-sm font-bold text-black/70">{ing.benefit}</td>
                    <td className="p-8 text-base text-black/60 leading-relaxed font-light">{ing.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Personal Notes */}
        <div className="max-w-3xl mx-auto py-24 px-12 bg-white rounded-3xl border border-black/5 shadow-inner text-center">
          <div className="w-16 h-16 bg-[#F7D8D5] rounded-full flex items-center justify-center mx-auto mb-10 shadow-lg">
             <Heart className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-[10px] font-bold tracking-[0.4em] uppercase text-black/30 mb-10">The Living Ritual: My Personal Notes</h3>
          <p className="font-serif italic text-3xl text-black/80 leading-relaxed">"{product.personalNote}"</p>
          <div className="mt-12 pt-8 border-t border-black/5 inline-block font-serif text-lg">— Datin Norehan</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8F3E6] text-[#2D2D2D]">
      <Nav />
      <main>
        {activeProduct ? <ProductDetail product={activeProduct} /> : (view === 'sanctuary' ? <SanctuaryHome /> : <LabelHome />)}
      </main>
      <footer className="bg-white border-t border-black/5 py-20 px-6 text-center">
        <p className="text-[10px] tracking-[0.3em] uppercase text-black/40">© 2025 DNA by Norehan. Crafted with Ikhtiar.</p>
        <p className="font-serif italic mt-4 text-black/60">Wellness is a disciplined return to balance.</p>
      </footer>
    </div>
  );
};

export default Apothecary;
