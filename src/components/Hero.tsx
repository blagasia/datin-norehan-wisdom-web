
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-natural-green py-16 md:py-24">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-natural-dark mb-6">
            100% Natural & Organic Wellness Products
          </h1>
          <p className="text-lg md:text-xl mb-10 text-natural-dark/80">
            Experience premium wellness solutions that nourish the body, mind, and soul. Crafted with passion, perfected by nature.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary">Explore Products</Button>
            <Button className="btn-outline">Learn More</Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
