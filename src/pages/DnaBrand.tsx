
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Book, Package, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DnaBrand = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-brand-deep-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="mb-8 flex flex-col items-center">
              <span className="font-italiana text-4xl md:text-5xl tracking-wide">DNA</span>
              <span className="text-sm text-white/90 tracking-widest">BY DATIN NOREHAN APOTHECARY</span>
            </div>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Discover our premium product line where ancestral wisdom meets modern science to create transformative wellness experiences.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/products">
                <Button className="bg-white text-brand-deep-teal hover:bg-white/90">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/story">
                <Button variant="outline" className="border-white text-white hover:bg-white/20">
                  Our Story <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Explanation */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <div className="inline-block mb-5 relative">
                <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">OUR BRANDS</span>
                <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
              </div>
              <h2 className="font-italiana text-3xl md:text-4xl uppercase tracking-wide mb-8">The Brand Relationship</h2>
              <p className="text-natural-gray mb-8">
                Understanding the connection between Datin Norehan's Apothecary and DNA by Datin Norehan
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="font-italiana text-2xl mb-6">Datin Norehan's Apothecary</h3>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  With over three decades of experience studying traditional healing methods and botanical formulations, 
                  Datin Norehan established her eponymous apothecary as a haven for holistic wellness. The apothecary 
                  represents her foundational philosophy: that nature provides everything we need for true health and balance.
                </p>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  At its core, Datin Norehan's Apothecary embodies the lifelong research, wisdom, and expertise that our 
                  founder has accumulated throughout her remarkable journey exploring traditional remedies across Southeast Asia.
                </p>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 h-72 rounded-full overflow-hidden border-8 border-brand-sage-mist shadow-lg">
                    <img 
                      src="/lovable-uploads/7e6f7992-a735-45ec-b641-98b2928c9e3f.png" 
                      alt="Datin Norehan"
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center order-3 lg:order-4">
                <div className="relative">
                  <div className="w-72 h-72 bg-brand-deep-teal rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <span className="text-white font-italiana text-6xl block">DNA</span>
                      <span className="text-white/80 text-sm tracking-wider">BY DATIN NOREHAN</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="order-4 lg:order-3">
                <h3 className="font-italiana text-2xl mb-6">DNA by Datin Norehan</h3>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  DNA represents our premium product line—a carefully curated collection that 
                  distills Datin Norehan's extensive knowledge into accessible wellness solutions. 
                  The name "DNA" not only represents the initials of "Datin Norehan's Apothecary" 
                  but also symbolizes the fundamental building blocks of wellness that we offer.
                </p>
                <p className="text-natural-gray mb-6 leading-relaxed">
                  Each DNA product embodies the perfect synthesis of ancestral wisdom and modern science, 
                  offering customers a transformative wellness experience that honors both tradition and innovation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Four Pillars of DNA */}
        <section className="py-16 md:py-24 bg-brand-creamy-ivory/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-block mb-5 relative">
                <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
                <span className="inline-block mx-4 font-karla text-sm tracking-widest text-brand-muted-rose">OUR PILLARS</span>
                <span className="inline-block w-12 h-[1px] bg-brand-muted-rose"></span>
              </div>
              <h2 className="font-italiana text-3xl md:text-4xl uppercase tracking-wide mb-8">The Four Pillars of DNA</h2>
              <p className="text-natural-gray max-w-3xl mx-auto">
                Our DNA product line is built upon four essential pillars, each representing a facet of our holistic approach to wellness.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-brand-soft-lavender/20 flex items-center justify-center mx-auto mb-6">
                  <Package className="h-8 w-8 text-brand-deep-teal" />
                </div>
                <h3 className="font-italiana text-2xl mb-4">DNA Elixirs</h3>
                <p className="text-natural-gray mb-6">
                  Our collection of herbal tonics, detox drinks, and wellness supplements formulated with nature's most potent ingredients.
                </p>
                <Link to="/products" className="text-brand-deep-teal hover:underline flex items-center justify-center">
                  Discover Elixirs <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-brand-soft-lavender/20 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-brand-deep-teal" />
                </div>
                <h3 className="font-italiana text-2xl mb-4">DNA Rituals</h3>
                <p className="text-natural-gray mb-6">
                  Transformative wellness practices and accessories designed to elevate your daily self-care routines.
                </p>
                <Link to="/rituals" className="text-brand-deep-teal hover:underline flex items-center justify-center">
                  Explore Rituals <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-brand-soft-lavender/20 flex items-center justify-center mx-auto mb-6">
                  <Book className="h-8 w-8 text-brand-deep-teal" />
                </div>
                <h3 className="font-italiana text-2xl mb-4">DNA Wisdom</h3>
                <p className="text-natural-gray mb-6">
                  Educational resources and insights that empower you with knowledge about natural wellness and balanced living.
                </p>
                <Link to="/articles" className="text-brand-deep-teal hover:underline flex items-center justify-center">
                  Access Wisdom <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 rounded-full bg-brand-soft-lavender/20 flex items-center justify-center mx-auto mb-6">
                  <Star className="h-8 w-8 text-brand-deep-teal" />
                </div>
                <h3 className="font-italiana text-2xl mb-4">DNA Curations</h3>
                <p className="text-natural-gray mb-6">
                  Limited edition collections and premium sets that bring together our finest offerings for specific wellness goals.
                </p>
                <span className="text-brand-muted-rose flex items-center justify-center opacity-75">
                  Coming Soon <Sparkles className="ml-1 h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 bg-brand-deep-teal text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-italiana text-3xl mb-6">Experience DNA by Datin Norehan</h2>
            <p className="max-w-2xl mx-auto mb-8 text-white/90">
              Discover the perfect balance of traditional wisdom and modern science in our premium wellness products.
            </p>
            <Link to="/products">
              <Button className="bg-white text-brand-deep-teal hover:bg-white/90">
                Shop the Collection <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DnaBrand;
