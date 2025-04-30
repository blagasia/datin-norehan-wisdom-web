
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background with elegant botanical pattern overlay */}
      <div className="absolute inset-0 bg-gradient-blush opacity-60"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center animate-fade-up">
          <h1 className="font-cormorant text-4xl md:text-5xl lg:text-6xl font-semibold text-brand-dark mb-6 leading-tight">
            Datin Norehan's Apothecary:<br />
            <span className="text-brand-deep-teal">Natural Wellness Formulations</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 text-brand-soft-gray font-montserrat leading-relaxed">
            Experience our premium wellness solutions that nourish the body, mind, and soul. 
            Crafted with traditional wisdom, perfected by modern science.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/90 font-medium">
              Explore Collections
            </Button>
            <Button variant="outline" className="border-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/10">
              Learn Our Philosophy
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
