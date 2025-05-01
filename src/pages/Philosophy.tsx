import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Feather, Sparkles } from 'lucide-react';

const Philosophy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        {/* Hero Section with Brand Explanation */}
        <section className="py-16 md:py-24 bg-brand-creamy-ivory/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-italiana text-4xl md:text-5xl font-bold mb-6">Our Philosophy</h1>
              <p className="text-xl text-natural-gray max-w-3xl mx-auto">
                The wisdom and principles that guide both Datin Norehan's Apothecary and our premium product line, DNA.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-brand-blush-rose/30 flex flex-col items-center text-center">
                <h2 className="font-italiana text-2xl mb-4">Datin Norehan's Apothecary</h2>
                <div className="w-20 h-20 rounded-full bg-brand-sage-mist/30 flex items-center justify-center mb-4">
                  <Leaf className="h-10 w-10 text-brand-deep-teal" />
                </div>
                <p className="text-natural-gray mb-6">
                  Our parent brand embodies the lifetime journey of Datin Norehan, her research, and her dedicated pursuit of natural wellness solutions that honor traditional wisdom.
                </p>
                <Link to="/story">
                  <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                    Our Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-brand-deep-teal p-8 rounded-lg shadow-sm flex flex-col items-center text-center">
                <h2 className="font-italiana text-2xl mb-4 text-white">DNA by Datin Norehan</h2>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <p className="text-white/90 mb-6">
                  Our premium product line that embodies the four pillars of wellness: Elixirs, Rituals, Wisdom, and Curations - each formulated with the perfect balance of ancestral knowledge and modern science.
                </p>
                <Link to="/dna-brand">
                  <Button variant="outline" className="border-white text-white hover:bg-white hover:text-brand-deep-teal">
                    About DNA <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Rest of the Philosophy page content would continue below */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Feather className="mx-auto mb-6 text-brand-soft-lavender h-8 w-8 opacity-80" />
                <h2 className="font-italiana text-3xl md:text-4xl uppercase tracking-wide mb-8">Our Guiding Principles</h2>
                <p className="text-natural-gray max-w-2xl mx-auto">
                  The philosophy that guides every formulation, every practice, and every decision we make at Datin Norehan's Apothecary.
                </p>
              </div>
              
              {/* Additional philosophy content would go here */}
              
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Philosophy;
