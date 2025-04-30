
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import RitualProducts from '@/components/rituals/RitualProducts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Package, Palette } from 'lucide-react';

const Rituals = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam.toLowerCase());
    } else {
      setActiveCategory('all');
    }
  }, [location.search]);
  
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'accessories', name: 'Premium Accessories' },
    { id: 'bundles', name: 'Ready Bundles' },
    { id: 'custom', name: 'Custom Kits' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="py-16 md:py-24 bg-brand-sage-mist/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-brand-gilded-gold text-white mb-3">Premium Collection</Badge>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Package className="h-6 w-6 text-brand-deep-teal" />
                <h1 className="font-playfair text-4xl md:text-5xl font-bold">DNA Rituals</h1>
              </div>
              <div className="w-20 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
              <p className="text-lg md:text-xl text-natural-gray max-w-3xl mx-auto">
                Elevate your wellness experience with our premium accessories, curated bundles, and custom ritual kits.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mt-8">
                <Link to="/rituals/custom">
                  <Button className="bg-brand-gilded-gold hover:bg-brand-gilded-gold/90 text-white">
                    Build Your Custom Kit
                  </Button>
                </Link>
                <Link to="/rituals?category=bundles">
                  <Button variant="outline" className="border-brand-gilded-gold/30 hover:bg-brand-gilded-gold/10">
                    Explore Ready Bundles
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm border border-brand-blush-rose/10 p-8 mb-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h2 className="font-playfair text-2xl font-semibold mb-4">
                    Transform Your Daily Wellness Practice
                  </h2>
                  <p className="text-natural-gray mb-4">
                    Our DNA Rituals collection features premium accessories designed to enhance your wellness journey, beautifully crafted bundles for a complete experience, and the ability to create custom ritual kits tailored to your unique needs.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-brand-gilded-gold">✦</span>
                      <span>Handcrafted premium accessories</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brand-gilded-gold">✦</span>
                      <span>Personalization with name engravings</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brand-gilded-gold">✦</span>
                      <span>Elegant color options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brand-gilded-gold">✦</span>
                      <span>Beautiful gift wrapping available</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2 relative">
                  <div className="rounded-lg overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1616011610576-ea0e89802237?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                      alt="DNA Rituals Collection" 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-brand-blush-rose/10 p-4 rounded-lg border border-brand-blush-rose/20">
                    <Palette className="h-8 w-8 text-brand-deep-teal" />
                  </div>
                </div>
              </div>
            </div>
            
            <Tabs 
              defaultValue={activeCategory} 
              value={activeCategory} 
              onValueChange={setActiveCategory} 
              className="mb-10"
            >
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="bg-white border border-brand-blush-rose/20 p-1">
                  {categories.map(category => (
                    <TabsTrigger 
                      key={category.id} 
                      value={category.id} 
                      className="data-[state=active]:bg-brand-blush-rose/20"
                      onClick={() => {
                        // Update URL without page reload
                        const url = new URL(window.location.href);
                        if (category.id === 'all') {
                          url.searchParams.delete('category');
                        } else {
                          url.searchParams.set('category', category.id);
                        }
                        window.history.pushState({}, '', url);
                      }}
                    >
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <TabsContent value={activeCategory} className="mt-0">
                <RitualProducts category={activeCategory} />
              </TabsContent>
            </Tabs>
            
            <div className="mt-16 max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-sm border border-natural-peach/30">
              <h2 className="font-playfair text-2xl font-semibold mb-4 text-center">The DNA Rituals Promise</h2>
              <p className="text-natural-gray mb-4">
                Every accessory in our DNA Rituals collection is crafted with meticulous attention to detail, using only the finest materials that reflect our commitment to quality and sustainability.
              </p>
              <p className="text-natural-gray">
                Our premium ritual tools are designed not just as functional pieces, but as beautiful additions to your wellness space that enhance both the efficacy and enjoyment of your daily DNA Elixirs routine.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Rituals;
