import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Heart, BookOpen, Star, ChevronRight, Sun, Moon, Droplets, Check } from 'lucide-react';
import SEO from '@/components/SEO';
import { dnaElixirs, tandaKasihBundle, morningRitual, eveningRitual, synergyBenefits, type DNAElixir } from '@/data/dnaElixirs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DnaBrand = () => {
  const [selectedProduct, setSelectedProduct] = useState<DNAElixir | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-apothecary-creamy-ivory">
      <SEO 
        title="DNA by Norehan | The Alchemy of Nature. The Essence of You."
        description="Welcome to DNA—Datin Norehan's Apothecary. High-frequency botanicals designed to rewrite your wellness story from the inside out."
      />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24 relative z-10">
        
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="/lovable-uploads/botanicals-hero.jpg" 
              alt="DNA by Norehan Botanicals" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <span className="inline-block text-xs tracking-[0.4em] uppercase text-white/80 mb-6 font-karla">
              Datin Norehan's Apothecary
            </span>
            <h1 className="font-italiana text-5xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              DNA by Norehan
            </h1>
            <p className="font-italiana text-xl md:text-2xl text-white/90 italic mb-4">
              The Alchemy of Nature. The Essence of You.
            </p>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              We believe that true radiance is not painted on; it is encoded within. It is a biological dialogue between nature and your body.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-apothecary-blush-rose text-foreground hover:bg-apothecary-blush-rose/90 px-10 py-6 text-sm tracking-widest uppercase font-bold rounded-full"
                onClick={() => document.getElementById('elixirs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore the Elixirs
              </Button>
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-10 py-6 text-sm tracking-widest uppercase rounded-full"
                onClick={() => document.getElementById('tanda-kasih')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Tanda Kasih Collection
              </Button>
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <Sparkles className="w-10 h-10 text-apothecary-blush-rose mx-auto mb-10" />
              <p className="font-italiana text-2xl md:text-3xl text-foreground/80 leading-relaxed mb-8 italic">
                "At DNA by Norehan, we do not merely sell products; we curate high-frequency botanicals designed to rewrite your wellness story from the inside out."
              </p>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                Bridging the gap between ancient Nusantara wisdom and modern peptide science, our formulations are designed to nurture the three pillars of existence: the Body, the Mind, and the Spirit.
              </p>
              <p className="font-italiana text-xl text-brand-deep-teal">
                Decode your glow. Reclaim your essence.
              </p>
            </div>
          </div>
        </section>

        {/* Tanda Kasih Featured Curation */}
        <section id="tanda-kasih" className="py-20 md:py-28 bg-gradient-to-br from-apothecary-blush-rose/20 via-white to-apothecary-sage-mist/20">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1">
                  <span className="inline-block text-xs tracking-[0.4em] uppercase text-apothecary-blush-rose mb-4 font-bold">
                    Website Launch Special
                  </span>
                  <h2 className="font-italiana text-4xl md:text-5xl mb-2">
                    {tandaKasihBundle.name}
                  </h2>
                  <p className="font-italiana text-xl text-foreground/60 italic mb-6">
                    {tandaKasihBundle.subtitle}
                  </p>
                  <p className="text-foreground/70 leading-relaxed mb-8">
                    {tandaKasihBundle.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4 font-bold">The Collection Includes</h4>
                    {tandaKasihBundle.includes.map((item, idx) => (
                      <p key={idx} className="text-foreground/70 mb-2 flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-deep-teal mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </p>
                    ))}
                  </div>
                  
                  <div className="mb-8">
                    <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4 font-bold">The Launch Exclusives</h4>
                    <div className="space-y-4">
                      {tandaKasihBundle.exclusives.map((exclusive, idx) => (
                        <div key={idx} className="bg-white/60 p-4 rounded-xl">
                          <h5 className="font-semibold text-foreground mb-1">{exclusive.name}</h5>
                          <p className="text-sm text-foreground/60">{exclusive.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 mb-6">
                    <span className="font-italiana text-4xl text-foreground">RM{tandaKasihBundle.price}</span>
                    <span className="text-xs tracking-widest text-foreground/40 uppercase">Limited sets available</span>
                  </div>
                  
                  <p className="font-italiana text-lg text-brand-deep-teal italic mb-6">
                    "{tandaKasihBundle.tagline}"
                  </p>
                  
                  <Button className="bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90 px-10 py-6 text-sm tracking-widest uppercase font-bold rounded-full">
                    Reserve Your Set
                  </Button>
                </div>
                
                <div className="order-1 lg:order-2">
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={tandaKasihBundle.image}
                      alt={tandaKasihBundle.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DNA Elixirs Section */}
        <section id="elixirs" className="py-24 md:py-32 bg-apothecary-creamy-ivory">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-xs tracking-[0.4em] uppercase text-apothecary-blush-rose mb-4 font-bold">
                  DNA Elixirs
                </span>
                <h2 className="font-italiana text-4xl md:text-5xl mb-6">Not Products. Potions.</h2>
                <p className="text-foreground/60 max-w-3xl mx-auto text-lg leading-relaxed">
                  In a world of mass production, we return to the apothecary's roots. Each elixir is a "liquid code"—a complex blend of active botanicals, marine peptides, and essential oils designed to speak the language of your cells.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {dnaElixirs.map((product) => (
                  <div 
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="aspect-[4/5] bg-white rounded-2xl mb-6 overflow-hidden shadow-sm group-hover:shadow-xl transition-all duration-500 border border-black/5">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <span className="text-[10px] tracking-[0.3em] uppercase text-foreground/40 mb-2 block font-bold">
                      {product.category === 'internal' ? 'Internal Wellness' : product.category === 'intimate' ? 'Intimate Care' : 'Topical Treatment'}
                    </span>
                    <h3 className="font-italiana text-2xl mb-2 group-hover:text-brand-deep-teal transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-foreground/50 mb-4 line-clamp-2">
                      {product.subtitle}
                    </p>
                    <div className="flex justify-between items-center border-t border-black/5 pt-4">
                      <span className="font-bold text-lg">RM{product.price}</span>
                      <span className="text-[10px] tracking-widest text-foreground/40 group-hover:text-foreground transition-colors font-bold uppercase flex items-center gap-2">
                        View Details <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DNA Rituals Subscription */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <span className="inline-block text-xs tracking-[0.4em] uppercase text-apothecary-blush-rose mb-4 font-bold">
                    DNA Rituals
                  </span>
                  <h2 className="font-italiana text-4xl md:text-5xl mb-6">
                    Consistency is the Soul of Wellness
                  </h2>
                  <p className="text-foreground/70 text-lg leading-relaxed mb-8">
                    True balance isn't achieved in a day; it is achieved in a rhythm. DNA Rituals is our bespoke subscription service designed to ensure your holistic recharge never falters.
                  </p>
                  
                  <div className="bg-apothecary-sage-mist/30 p-8 rounded-2xl mb-8">
                    <h3 className="font-italiana text-2xl mb-4">The Holistic Recharge</h3>
                    <p className="text-foreground/70 mb-6">
                      Select any 2 or more Elixirs to be delivered to your door monthly, and secure the continuity of your wellness journey. By subscribing, you aren't just buying convenience; you are making a vow to prioritize yourself.
                    </p>
                    
                    <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4 font-bold">The Privileges</h4>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Star className="w-5 h-5 text-brand-gilded-gold mt-0.5" />
                        <div>
                          <span className="font-semibold">Preferred Pricing</span>
                          <p className="text-sm text-foreground/60">Enjoy exclusive savings on your monthly ritual.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <BookOpen className="w-5 h-5 text-brand-deep-teal mt-0.5" />
                        <div>
                          <span className="font-semibold">The Collective Wellness Journal</span>
                          <p className="text-sm text-foreground/60">Unrestricted access to Datin Norehan's private library of wisdom—deep-dive articles, seasonal recipes, guided mindfulness practices, and "The Layering Guide."</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Droplets className="w-5 h-5 text-apothecary-blush-rose mt-0.5" />
                        <div>
                          <span className="font-semibold">First Pour</span>
                          <p className="text-sm text-foreground/60">Early access to new formulations and limited-batch seasonal curations before the public.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90 px-10 py-6 text-sm tracking-widest uppercase font-bold rounded-full">
                    Start Your Ritual
                  </Button>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
                    <img 
                      src="/lovable-uploads/ritual-lifestyle-2.jpeg"
                      alt="DNA Rituals"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                    <p className="font-italiana text-lg italic text-foreground/80">
                      "Subscribing instantly inducts you into the Inner Circle."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Art of Layering */}
        <section className="py-24 md:py-32 bg-apothecary-creamy-ivory">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <span className="inline-block text-xs tracking-[0.4em] uppercase text-apothecary-blush-rose mb-4 font-bold">
                  The Collective Wellness Journal
                </span>
                <h2 className="font-italiana text-4xl md:text-5xl mb-6">
                  The Art of Ritual: How to Layer Your Way to Ageless Wellness
                </h2>
                <p className="text-foreground/60 max-w-3xl mx-auto text-lg leading-relaxed">
                  True beauty isn't just about one miracle product—it is about the synergy of a routine. We recommend a "Layering Ritual" that aligns with your body's natural circadian rhythms.
                </p>
              </div>
              
              <Tabs defaultValue="morning" className="w-full">
                <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white rounded-full p-1">
                  <TabsTrigger value="morning" className="rounded-full data-[state=active]:bg-brand-gilded-gold/20 flex items-center gap-2">
                    <Sun className="w-4 h-4" /> Morning Ritual
                  </TabsTrigger>
                  <TabsTrigger value="evening" className="rounded-full data-[state=active]:bg-brand-deep-teal/20 flex items-center gap-2">
                    <Moon className="w-4 h-4" /> Evening Ritual
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="morning" className="space-y-6">
                  <div className="bg-white rounded-3xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Sun className="w-8 h-8 text-brand-gilded-gold" />
                      <div>
                        <h3 className="font-italiana text-2xl">The Morning Ritual</h3>
                        <p className="text-foreground/50">Energize & Protect</p>
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-8">
                      Wake up the skin, flush stagnant toxins, and build an antioxidant shield against the day's environmental stressors.
                    </p>
                    
                    <div className="space-y-8">
                      {morningRitual.map((step) => (
                        <div key={step.step} className="border-l-2 border-brand-gilded-gold/30 pl-6">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-brand-gilded-gold/20 flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </span>
                            <h4 className="font-semibold text-lg">{step.title}</h4>
                          </div>
                          <p className="text-xs tracking-widest uppercase text-apothecary-blush-rose mb-2 font-bold">
                            {step.product}
                          </p>
                          <p className="text-foreground/70 mb-3">{step.description}</p>
                          <p className="text-sm text-foreground/50 italic bg-apothecary-sage-mist/20 p-3 rounded-lg">
                            <span className="font-semibold not-italic">Why it works:</span> {step.whyItWorks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="evening" className="space-y-6">
                  <div className="bg-white rounded-3xl p-8 mb-8">
                    <div className="flex items-center gap-4 mb-6">
                      <Moon className="w-8 h-8 text-brand-deep-teal" />
                      <div>
                        <h3 className="font-italiana text-2xl">The Evening Ritual</h3>
                        <p className="text-foreground/50">Relax & Repair</p>
                      </div>
                    </div>
                    <p className="text-foreground/70 mb-8">
                      Deep cleaning, stress relief, and supporting cellular regeneration while you sleep.
                    </p>
                    
                    <div className="space-y-8">
                      {eveningRitual.map((step) => (
                        <div key={step.step} className="border-l-2 border-brand-deep-teal/30 pl-6">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="w-8 h-8 rounded-full bg-brand-deep-teal/20 flex items-center justify-center text-sm font-bold">
                              {step.step}
                            </span>
                            <h4 className="font-semibold text-lg">{step.title}</h4>
                          </div>
                          <p className="text-xs tracking-widest uppercase text-apothecary-blush-rose mb-2 font-bold">
                            {step.product}
                          </p>
                          <p className="text-foreground/70 mb-3">{step.description}</p>
                          <p className="text-sm text-foreground/50 italic bg-apothecary-sage-mist/20 p-3 rounded-lg">
                            <span className="font-semibold not-italic">Why it works:</span> {step.whyItWorks}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Synergy Benefits */}
              <div className="mt-16 bg-white rounded-3xl p-8">
                <h3 className="font-italiana text-2xl text-center mb-8">Why "Inside-Out" Layering Works</h3>
                <p className="text-center text-foreground/60 mb-8">You will notice a theme in our ritual: <span className="font-semibold text-foreground">Synergy.</span></p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {synergyBenefits.map((benefit, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-16 h-16 rounded-full bg-apothecary-blush-rose/20 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-6 h-6 text-apothecary-blush-rose" />
                      </div>
                      <h4 className="font-semibold mb-2">{benefit.title}</h4>
                      <p className="text-sm text-foreground/60">{benefit.description}</p>
                    </div>
                  ))}
                </div>
                
                <p className="text-center font-italiana text-xl text-brand-deep-teal mt-10 italic">
                  True wellness isn't a single step. It's a circle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Quote */}
        <section className="py-24 md:py-32 bg-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-8 border-4 border-apothecary-blush-rose/30">
                <img 
                  src="/lovable-uploads/norehan-portrait.jpeg"
                  alt="Datin Norehan"
                  className="w-full h-full object-cover"
                />
              </div>
              <blockquote className="font-italiana text-3xl md:text-4xl text-foreground/80 italic mb-8 leading-relaxed">
                "We believe that true radiance is not painted on; it is encoded within. It is a biological dialogue between nature and your body."
              </blockquote>
              <p className="text-foreground/40 tracking-widest uppercase text-sm">— Datin Norehan</p>
            </div>
          </div>
        </section>

        {/* Shop CTA */}
        <section className="py-20 bg-brand-deep-teal text-white">
          <div className="container mx-auto px-6 text-center">
            <h2 className="font-italiana text-3xl md:text-4xl mb-6">Begin Your Wellness Journey</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-8">
              Decode your glow. Reclaim your essence. Join the DNA community today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                className="bg-white text-brand-deep-teal hover:bg-white/90 px-10 py-6 text-sm tracking-widest uppercase font-bold rounded-full"
                onClick={() => document.getElementById('elixirs')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Elixirs
              </Button>
              <Link to="/rituals">
                <Button 
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 px-10 py-6 text-sm tracking-widest uppercase rounded-full"
                >
                  Explore Rituals <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />

      {/* Product Detail Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-apothecary-creamy-ivory">
          {selectedProduct && (
            <>
              <DialogHeader>
                <span className="text-xs tracking-[0.3em] uppercase text-apothecary-blush-rose font-bold">
                  {selectedProduct.category === 'internal' ? 'Internal Wellness' : selectedProduct.category === 'intimate' ? 'Intimate Care' : 'Topical Treatment'}
                </span>
                <DialogTitle className="font-italiana text-3xl md:text-4xl">
                  {selectedProduct.name}
                </DialogTitle>
                <p className="text-foreground/60 italic">{selectedProduct.subtitle}</p>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-8 mt-6">
                <div className="aspect-square rounded-2xl overflow-hidden bg-white">
                  <img 
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-2 font-bold">Product Overview</h4>
                    <p className="text-foreground/70 leading-relaxed">{selectedProduct.overview}</p>
                  </div>
                  
                  {selectedProduct.philosophy && (
                    <p className="font-italiana text-lg text-brand-deep-teal italic">
                      "{selectedProduct.philosophy}"
                    </p>
                  )}
                  
                  {selectedProduct.usage && (
                    <div>
                      <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-2 font-bold">Usage Ritual</h4>
                      <div className="space-y-2 text-sm text-foreground/70">
                        {selectedProduct.usage.application && <p><span className="font-semibold">Application:</span> {selectedProduct.usage.application}</p>}
                        {selectedProduct.usage.technique && <p><span className="font-semibold">Technique:</span> {selectedProduct.usage.technique}</p>}
                        {selectedProduct.usage.frequency && <p><span className="font-semibold">Frequency:</span> {selectedProduct.usage.frequency}</p>}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between pt-4 border-t border-black/5">
                    <span className="font-italiana text-3xl">RM{selectedProduct.price}</span>
                    <Button className="bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90 px-8 py-5 rounded-full">
                      Add to Ritual
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Ingredient Intelligence Table */}
              <div className="mt-10">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-brand-deep-teal" />
                  <h3 className="font-italiana text-2xl">Ingredient Intelligence</h3>
                </div>
                
                <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-apothecary-sage-mist/40">
                        <th className="p-4 md:p-6 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-foreground/60">Ingredient</th>
                        <th className="p-4 md:p-6 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-foreground/60">Benefit</th>
                        <th className="p-4 md:p-6 text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold text-foreground/60">Scientific Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.ingredients.map((ingredient, idx) => (
                        <tr key={idx} className="border-t border-black/5 hover:bg-black/[0.01] transition-colors">
                          <td className="p-4 md:p-6 font-semibold text-foreground">{ingredient.name}</td>
                          <td className="p-4 md:p-6 text-sm text-brand-deep-teal font-medium">{ingredient.benefit}</td>
                          <td className="p-4 md:p-6 text-sm text-foreground/60">{ingredient.action}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Benefits if available */}
              {selectedProduct.benefits && selectedProduct.benefits.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4 font-bold">Transformative Benefits</h4>
                  <div className="space-y-3">
                    {selectedProduct.benefits.map((benefit, idx) => (
                      <p key={idx} className="text-foreground/70 flex items-start gap-3">
                        <Check className="w-5 h-5 text-brand-deep-teal mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </p>
                    ))}
                  </div>
                </div>
              )}
              
              {/* How It Works if available */}
              {selectedProduct.howItWorks && selectedProduct.howItWorks.length > 0 && (
                <div className="mt-8">
                  <h4 className="text-xs tracking-[0.3em] uppercase text-foreground/40 mb-4 font-bold">The Science: How It Works</h4>
                  <div className="space-y-3">
                    {selectedProduct.howItWorks.map((point, idx) => (
                      <p key={idx} className="text-foreground/70 text-sm leading-relaxed">{point}</p>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DnaBrand;
