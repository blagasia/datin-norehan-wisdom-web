
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Feather, Sparkles, BookOpen, FlowerIcon } from 'lucide-react';
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
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="font-italiana text-5xl md:text-6xl text-white font-bold mb-8 text-shadow animate-fade-in">Our Philosophy</h1>
              <p className="text-xl md:text-2xl text-white text-shadow max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "200ms" }}>
                The wisdom and principles that guide both Datin Norehan's Apothecary and our premium product line, DNA.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm p-8 rounded-lg shadow-lg border border-brand-blush-rose/30 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: "400ms" }}>
                <h2 className="font-italiana text-3xl mb-5">Datin Norehan's Apothecary</h2>
                <div className="w-20 h-20 rounded-full bg-brand-sage-mist/30 flex items-center justify-center mb-5">
                  <Leaf className="h-10 w-10 text-brand-deep-teal" />
                </div>
                <p className="text-natural-gray mb-7 leading-relaxed">
                  Our parent brand embodies the lifetime journey of Datin Norehan, her research, and her dedicated pursuit of natural wellness solutions that honor traditional wisdom.
                </p>
                <Link to="/story">
                  <Button variant="outline" className="border-brand-deep-teal text-brand-deep-teal hover:bg-brand-deep-teal hover:text-white">
                    Our Story <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="bg-brand-deep-teal/95 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 animate-fade-in" style={{ animationDelay: "600ms" }}>
                <h2 className="font-italiana text-3xl mb-5 text-white">DNA by Datin Norehan</h2>
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mb-5">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <p className="text-white/90 mb-7 leading-relaxed">
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
        <section className="py-20 md:py-28 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <Feather className="mx-auto mb-6 text-brand-soft-lavender h-10 w-10 opacity-80 animate-float" />
                <h2 className="font-italiana text-4xl md:text-5xl uppercase tracking-wide mb-8 animate-fade-in">Our Guiding Principles</h2>
                <p className="text-natural-gray max-w-2xl mx-auto text-lg animate-fade-in" style={{ animationDelay: "200ms" }}>
                  The philosophy that guides every formulation, every practice, and every decision we make at Datin Norehan's Apothecary.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg shadow-sm animate-fade-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: "300ms" }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-brand-sage-mist/30 flex items-center justify-center">
                      <Leaf className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                  </div>
                  <h3 className="font-italiana text-2xl mb-4 text-center">Natural Purity</h3>
                  <p className="text-natural-gray text-center">
                    We believe in the uncompromised purity of natural ingredients. Every product contains only what nature intended, free from synthetic additives.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg shadow-sm animate-fade-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: "500ms" }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-brand-blush-rose/30 flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                  </div>
                  <h3 className="font-italiana text-2xl mb-4 text-center">Traditional Wisdom</h3>
                  <p className="text-natural-gray text-center">
                    Ancient healing traditions passed through generations contain irreplaceable wisdom that forms the foundation of our approach.
                  </p>
                </div>
                
                <div className="bg-brand-creamy-ivory/30 p-8 rounded-lg shadow-sm animate-fade-in hover:shadow-md transition-shadow duration-300" style={{ animationDelay: "700ms" }}>
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-brand-lavender-mist/30 flex items-center justify-center">
                      <FlowerIcon className="h-6 w-6 text-brand-deep-teal" />
                    </div>
                  </div>
                  <h3 className="font-italiana text-2xl mb-4 text-center">Scientific Validation</h3>
                  <p className="text-natural-gray text-center">
                    While honoring tradition, we embrace scientific methods to validate and enhance the efficacy of our formulations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Quotes Section */}
        <section className="py-20 md:py-28 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="quote-container text-center relative py-10">
                <span className="quote-mark quote-mark-left">"</span>
                <blockquote className="text-2xl md:text-3xl font-italiana italic mb-8 animate-fade-in">
                  Nature offers us everything we need for wellness and balance. Our mission is to harness these gifts thoughtfully and share them with you through carefully crafted formulations.
                </blockquote>
                <div className="flex items-center justify-center space-x-4 animate-fade-in" style={{ animationDelay: "200ms" }}>
                  <div className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-brand-deep-teal" style={{ backgroundImage: 'url("/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png")' }}></div>
                  <p className="font-karla text-brand-deep-teal text-lg">Datin Norehan, <span className="font-light">Founder</span></p>
                </div>
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
