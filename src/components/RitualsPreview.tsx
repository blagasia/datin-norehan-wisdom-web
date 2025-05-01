
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ritualProducts } from '@/data/rituals';
import { Package, Gift, Palette } from 'lucide-react';

const RitualsPreview = () => {
  // Get featured ritual products
  const featuredRituals = ritualProducts.slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-brand-sage-mist/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-brand-soft-lavender text-brand-dark mb-3">Premium Collection</Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Package className="h-6 w-6 text-brand-deep-teal" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">DNA Rituals</h2>
          </div>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-lg text-natural-gray max-w-2xl mx-auto">
            Elevate your wellness experience with our premium accessories, custom ritual kits, and expertly curated bundles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredRituals.map((product) => (
            <div key={product.id} className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
              <Link to={`/rituals/${product.id}`} className="block">
                <div className="relative h-64 overflow-hidden">
                  {/* Swapped images with those from the uploaded library */}
                  {product.id === 1 && (
                    <img 
                      src="/lovable-uploads/f11405ea-a912-4a47-a89a-6731e42ec873.png" 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {product.id === 2 && (
                    <img 
                      src="/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png" 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  {product.id === 3 && (
                    <img 
                      src="/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png" 
                      alt={product.name} 
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  )}
                  <div className="absolute top-2 right-2 bg-natural-purple px-3 py-1 text-xs font-medium rounded-full">
                    {product.category}
                  </div>
                  {product.customizable && (
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Palette className="h-3 w-3" />
                      <span className="text-xs font-medium">Customizable</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-playfair text-lg font-semibold mb-1">{product.name}</h3>
                  <p className="text-natural-gray font-semibold mb-3">{product.price}</p>
                  <Button className="w-full bg-brand-deep-teal/80 hover:bg-brand-deep-teal text-white">View Details</Button>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/rituals">
            <Button className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white">
              View All Accessories
            </Button>
          </Link>
          <Link to="/rituals/custom">
            <Button variant="outline" className="border-brand-soft-lavender hover:bg-brand-soft-lavender/10">
              <Gift className="mr-2 h-4 w-4" />
              Create Custom Kit
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RitualsPreview;
