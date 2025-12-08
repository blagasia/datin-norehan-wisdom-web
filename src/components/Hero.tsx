
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, ShoppingBag, Heart, Crown, Feather } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { products } from '@/data/products';
import { blogArticles } from '@/data/blogArticles';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/hooks/use-toast';

const Hero = () => {
  const isMobile = useIsMobile();
  const { addToCart } = useCart();
  const { toast } = useToast();

  // Get Collary Collagen products (filtering by collagen category)
  const collagenProducts = products.filter(p => 
    p.category.toLowerCase() === 'collagen' || 
    p.name.toLowerCase().includes('collagen')
  ).slice(0, 3);
  
  // Fallback to first 3 products if no collagen products
  const showcaseProducts = collagenProducts.length >= 3 ? collagenProducts : products.slice(0, 3);
  
  // Get latest 3 articles
  const latestArticles = blogArticles.slice(0, 3);

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    }, 1);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col bg-brand-creamy-ivory">
      {/* Hero Section - Full Width Portrait with Split CTAs */}
      <section className="relative min-h-[90vh] md:min-h-screen overflow-hidden">
        {/* Background Image - Datin Norehan Portrait */}
        <div className="absolute inset-0">
          <img 
            src="/lovable-uploads/64130d34-d04d-40bb-9931-9c8f94a36cae.png"
            alt="Datin Norehan - Founder of DNA Apothecary"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 h-full flex flex-col justify-end pb-16 md:pb-24 min-h-[90vh] md:min-h-screen">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="h-8 w-8 text-brand-gilded-gold animate-pulse" />
            </div>
            <h1 className="font-cormorant text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-6 tracking-wide">
              Datin Norehan
            </h1>
            <p className="font-karla text-lg md:text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Where ancestral wisdom meets modern wellness. Discover the art of natural healing through our curated apothecary and premium DNA products.
            </p>
            
            {/* Split CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/articles">
                <Button 
                  size="lg" 
                  className="bg-white text-brand-dark hover:bg-white/90 rounded-none min-w-[280px] h-14 text-base font-cormorant tracking-wide group"
                >
                  <BookOpen className="mr-2 h-5 w-5" />
                  Explore The Apothecary
                  <span className="text-xs ml-2 opacity-70">(Wisdom)</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/products">
                <Button 
                  size="lg" 
                  className="bg-brand-gilded-gold text-white hover:bg-brand-gilded-gold/90 rounded-none min-w-[280px] h-14 text-base font-cormorant tracking-wide group"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Shop DNA Products
                  <span className="text-xs ml-2 opacity-70">(E-commerce)</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Introduction - Three Column Grid */}
      <section className="py-20 md:py-28 bg-brand-blush-rose/40">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block w-16 h-[2px] bg-brand-gilded-gold mb-6" />
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              Our Philosophy
            </h2>
            <p className="font-karla text-brand-soft-gray max-w-xl mx-auto">
              Three pillars that define the essence of Datin Norehan
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
            {/* Heritage */}
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-creamy-ivory flex items-center justify-center">
                <Crown className="h-8 w-8 text-brand-gilded-gold" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-brand-dark mb-4 relative inline-block">
                Heritage
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-gilded-gold/50" />
              </h3>
              <p className="font-karla text-brand-soft-gray leading-relaxed">
                Rooted in generations of Malaysian botanical wisdom, our formulations honor time-tested traditions passed down through centuries.
              </p>
            </div>
            
            {/* Elegance */}
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-creamy-ivory flex items-center justify-center">
                <Feather className="h-8 w-8 text-brand-gilded-gold" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-brand-dark mb-4 relative inline-block">
                Elegance
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-gilded-gold/50" />
              </h3>
              <p className="font-karla text-brand-soft-gray leading-relaxed">
                Every product is crafted with meticulous attention to detail, reflecting the sophistication and refinement of true artisanal care.
              </p>
            </div>
            
            {/* Nurturing */}
            <div className="text-center p-8 bg-white/60 backdrop-blur-sm rounded-lg hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-creamy-ivory flex items-center justify-center">
                <Heart className="h-8 w-8 text-brand-gilded-gold" />
              </div>
              <h3 className="font-cormorant text-2xl font-semibold text-brand-dark mb-4 relative inline-block">
                Nurturing
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-brand-gilded-gold/50" />
              </h3>
              <p className="font-karla text-brand-soft-gray leading-relaxed">
                Beyond products, we cultivate a community of wellness, offering guidance and support for your holistic health journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase - Horizontal Scroll */}
      <section className="py-20 md:py-28 bg-brand-creamy-ivory">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block w-16 h-[2px] bg-brand-gilded-gold mb-6" />
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              Collary Collagen Collection
            </h2>
            <p className="font-karla text-brand-soft-gray max-w-xl mx-auto">
              Our signature collagen products for radiant, youthful wellness
            </p>
          </div>
          
          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-8 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-8 min-w-max">
              {showcaseProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="w-[320px] md:w-[400px] flex-shrink-0 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className="aspect-[4/5] overflow-hidden relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant text-xl font-semibold text-brand-dark mb-2">
                      {product.name}
                    </h3>
                    <p className="font-karla text-brand-soft-gray text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    <p className="font-cormorant text-2xl text-brand-gilded-gold font-semibold mb-6">
                      {product.price}
                    </p>
                    <div className="flex gap-3">
                      <Link to={`/rituals/${product.id}`} className="flex-1">
                        <Button 
                          variant="outline" 
                          className="w-full rounded-none border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white"
                        >
                          View Ritual
                        </Button>
                      </Link>
                      <Button 
                        className="flex-1 rounded-none bg-brand-gilded-gold text-white hover:bg-brand-gilded-gold/90"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/products">
              <Button 
                variant="outline" 
                size="lg"
                className="rounded-none border-brand-gilded-gold text-brand-gilded-gold hover:bg-brand-gilded-gold hover:text-white"
              >
                View All Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* DNA Wisdom Teaser - Latest Articles */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block w-16 h-[2px] bg-brand-gilded-gold mb-6" />
            <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-semibold text-brand-dark mb-4">
              DNA Wisdom
            </h2>
            <p className="font-karla text-brand-soft-gray max-w-xl mx-auto">
              Insights from the Apothecary Hub — knowledge for your wellness journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {latestArticles.map((article) => (
              <Link 
                key={article.id} 
                to={`/articles/${article.id}`}
                className="group"
              >
                <div className="bg-brand-creamy-ivory rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  {article.image && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <span className="font-karla text-xs uppercase tracking-widest text-brand-gilded-gold mb-3 block">
                      {article.category}
                    </span>
                    <h3 className="font-cormorant text-xl font-semibold text-brand-dark mb-3 group-hover:text-brand-deep-teal transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="font-karla text-brand-soft-gray text-sm line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-karla text-brand-muted-rose">{article.date}</span>
                      <span className="font-karla text-brand-soft-gray">{article.readTime} read</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/articles">
              <Button 
                size="lg"
                className="rounded-none bg-brand-deep-teal text-white hover:bg-brand-deep-teal/90"
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Explore The Apothecary
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
