
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Feather, Sparkles } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';

const Philosophy = () => {
  return (
    <div className="min-h-screen flex flex-col relative">
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24 relative z-10">
        {/* Hero Section with Brand Explanation */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <VideoBackground 
            videoSrc="https://vimeo.com/1080492231"
            fallbackImageSrc="/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png"
          />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h1 className="font-italiana text-4xl md:text-5xl text-white font-bold mb-6 text-shadow">Our Philosophy</h1>
              <p className="text-xl text-white text-shadow max-w-3xl mx-auto">
                The wisdom and principles that guide both Datin Norehan's Apothecary and our premium product line, DNA.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-brand-blush-rose/30 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
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
              
              <div className="bg-brand-deep-teal/95 backdrop-blur-sm p-8 rounded-lg shadow-sm flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
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

        {/* Guiding Principles Section */}
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
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg animate-fade-in">
                  <h3 className="font-italiana text-xl mb-3 text-center">Natural Purity</h3>
                  <p className="text-natural-gray">
                    We believe in the uncompromised purity of natural ingredients. Every product contains only what nature intended, free from synthetic additives.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <h3 className="font-italiana text-xl mb-3 text-center">Traditional Wisdom</h3>
                  <p className="text-natural-gray">
                    Ancient healing traditions passed through generations contain irreplaceable wisdom that forms the foundation of our approach.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-6 rounded-lg animate-fade-in" style={{ animationDelay: "400ms" }}>
                  <h3 className="font-italiana text-xl mb-3 text-center">Scientific Validation</h3>
                  <p className="text-natural-gray">
                    While honoring tradition, we embrace scientific methods to validate and enhance the efficacy of our formulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quotes Section */}
        <section className="py-16 md:py-24 bg-brand-blush-rose/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="quote-container text-center">
                <span className="quote-mark quote-mark-left">"</span>
                <blockquote className="text-xl md:text-2xl font-italiana italic mb-6">
                  Nature offers us everything we need for wellness and balance. Our mission is to harness these gifts thoughtfully and share them with you through carefully crafted formulations.
                </blockquote>
                <p className="font-karla text-brand-deep-teal">- Datin Norehan, Founder</p>
                <span className="quote-mark quote-mark-right">"</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Philosophy;
