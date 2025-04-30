
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

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
            <Link to="/products">
              <Button className="bg-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/90 font-medium">
                Explore Collections
              </Button>
            </Link>
            <Link to="/philosophy">
              <Button variant="outline" className="border-brand-blush-rose text-brand-dark hover:bg-brand-blush-rose/10">
                Learn Our Philosophy
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* DNA Brand Architecture Section */}
      <div className="container mx-auto px-4 relative z-10 mt-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-center mb-4">DNA by Datin Norehan</h2>
          <div className="w-16 h-1 bg-brand-gilded-gold mx-auto mb-10"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* DNA Elixirs */}
            <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">1</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Elixirs</h3>
              <p className="text-center text-brand-soft-gray mb-4">
                Premium wellness formulations that transform from within, featuring our flagship Collary Collagen with potent natural ingredients for radiant results.
              </p>
              <div className="text-center">
                <Link to="/products">
                  <Button variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10">
                    Browse Elixirs
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* DNA Wisdom */}
            <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">2</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Wisdom</h3>
              <p className="text-center text-brand-soft-gray mb-4">
                Educational content sharing Datin Norehan's extensive knowledge, from free articles to premium courses on natural healing practices.
              </p>
              <div className="text-center">
                <Link to="/articles">
                  <Button variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10">
                    Explore Knowledge
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* DNA Curations */}
            <div className="bg-white/80 p-6 rounded-lg shadow-sm border border-brand-blush-rose/20 hover:shadow-md transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-2 right-2 bg-brand-blush-rose/80 text-white text-xs py-1 px-2 rounded-full">
                Coming Soon
              </div>
              <div className="w-16 h-16 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="font-playfair text-2xl font-semibold text-brand-deep-teal">3</span>
              </div>
              <h3 className="font-playfair text-xl font-semibold text-center mb-3">DNA Curations</h3>
              <p className="text-center text-brand-soft-gray mb-4">
                Co-branded or partner products that Datin Norehan endorses or collaborates on, expanding our offerings with complementary brands.
              </p>
              <div className="text-center">
                <Button disabled variant="outline" size="sm" className="border-brand-deep-teal/30 hover:bg-brand-deep-teal/10 opacity-60">
                  Discover Soon
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
