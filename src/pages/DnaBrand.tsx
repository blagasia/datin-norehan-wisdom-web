
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const DnaBrand = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/926a7f00-5847-45af-a782-8e849e1db897.png')] bg-cover bg-center opacity-20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">DNA by Datin Norehan</h1>
            <p className="text-xl text-natural-dark max-w-3xl mx-auto">
              The essence of nature's wisdom, captured in four transformative collections.
            </p>
          </div>
        </div>

        {/* Brand Story */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16">
                <h2 className="text-3xl md:text-4xl font-playfair font-semibold mb-8">The DNA Philosophy</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="md:col-span-2">
                    <p className="text-natural-gray mb-6 leading-relaxed">
                      DNA by Datin Norehan represents more than just a collection of products—it embodies a philosophy that has been cultivated through generations of traditional wisdom and enhanced by modern scientific understanding.
                    </p>
                    
                    <p className="text-natural-gray mb-6 leading-relaxed">
                      The name "DNA" carries dual significance. It honors Datin Norehan's initials and speaks to the fundamental building blocks of life—the very essence that her formulations seek to enhance and protect.
                    </p>
                    
                    <p className="text-natural-gray leading-relaxed">
                      Each product within the DNA collection is meticulously crafted to respect the perfect balance found in nature while addressing the specific needs of modern living. This harmony between tradition and innovation forms the cornerstone of Datin Norehan's approach to wellness.
                    </p>
                  </div>
                  
                  <div className="bg-natural-peach/10 p-6 rounded-lg flex items-center">
                    <div>
                      <p className="italic text-natural-dark/80 font-playfair">
                        "DNA represents the essence of what I believe: that true wellness comes from understanding and working with nature's perfect balance, not against it."
                      </p>
                      <p className="text-right mt-3 font-medium text-natural-dark/70">— Datin Norehan</p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-12">
                  <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-4">
                    <img 
                      src="/lovable-uploads/7e6f7992-a735-45ec-b641-98b2928c9e3f.png" 
                      alt="Datin Norehan with her products"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <p className="text-sm text-center text-natural-gray italic">Datin Norehan with her signature DNA collection formulations</p>
                </div>
                
                <p className="text-natural-gray mb-6 leading-relaxed">
                  The journey to create DNA began with Datin Norehan's deep connection to Malaysia's rich heritage of natural remedies. Combining ancestral recipes with her formal education in botanical sciences, she developed formulations that honor tradition while embracing scientific rigor.
                </p>
                
                <p className="text-natural-gray leading-relaxed">
                  Each ingredient is carefully selected not just for its individual properties, but for how it harmonizes with others to create balanced, effective formulations that work with the body's natural processes rather than overwhelming them.
                </p>
              </div>
              
              <div className="bg-natural-green/10 p-10 rounded-xl mb-16">
                <h3 className="text-2xl font-playfair font-semibold mb-4">The Four Pillars of DNA</h3>
                <p className="text-natural-gray mb-8">
                  The DNA collection is thoughtfully organized into four distinct categories, each addressing a different aspect of holistic wellbeing:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-medium text-brand-deep-teal mb-2">DNA Elixirs</h4>
                    <p className="text-natural-gray mb-4">
                      Internal wellness formulations that nourish from within, supporting various bodily systems through carefully balanced botanical ingredients.
                    </p>
                    <Link to="/categories?type=elixirs" className="text-brand-deep-teal hover:text-brand-deep-teal/80 flex items-center">
                      Discover Elixirs <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-brand-deep-teal mb-2">DNA Rituals</h4>
                    <p className="text-natural-gray mb-4">
                      Thoughtfully designed tools and accessories that enhance the experience of wellness practices, creating meaningful daily rituals.
                    </p>
                    <Link to="/categories?type=rituals" className="text-brand-deep-teal hover:text-brand-deep-teal/80 flex items-center">
                      Explore Rituals <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-brand-deep-teal mb-2">DNA Wisdom</h4>
                    <p className="text-natural-gray mb-4">
                      Educational resources that share Datin Norehan's extensive knowledge, empowering individuals to make informed wellness choices.
                    </p>
                    <Link to="/categories?type=wisdom" className="text-brand-deep-teal hover:text-brand-deep-teal/80 flex items-center">
                      Access Wisdom <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-medium text-brand-deep-teal mb-2">DNA Curations</h4>
                    <p className="text-natural-gray mb-4">
                      Limited edition collections and specially developed formulations that respond to seasonal needs or specific wellness goals.
                    </p>
                    <Link to="/categories?type=curations" className="text-brand-deep-teal hover:text-brand-deep-teal/80 flex items-center">
                      View Curations <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <Link to="/categories">
                  <Button className="btn-primary">Explore All DNA Categories</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DnaBrand;
