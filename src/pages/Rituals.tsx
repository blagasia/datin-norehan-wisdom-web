
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import SEO from '@/components/SEO';

// Sample ritual products data
const ritualProducts = [
  {
    id: 101,
    name: "Premium Ceramic Diffuser",
    description: "A handcrafted ceramic diffuser designed to disperse essential oils effectively while serving as an elegant decor piece.",
    price: "RM 189",
    image: "/lovable-uploads/ef24f11c-1a63-4afa-b882-f95a045b873f.png",
    category: "Accessories",
    featured: true
  },
  {
    id: 102,
    name: "Handcrafted Wooden Tea Strainer",
    description: "Artisanal wooden tea strainer perfect for brewing loose leaf teas and herbal infusions.",
    price: "RM 85",
    image: "/lovable-uploads/5a036f15-ad25-4f98-b74e-196eb003b9c9.png",
    category: "Accessories"
  },
  {
    id: 103,
    name: "Morning Ritual Bundle",
    description: "Complete morning ritual set with herbal tea, ceramic mug, journal and guidance booklet.",
    price: "RM 250",
    image: "/lovable-uploads/28ab43d8-2932-4793-8a02-c1af2e710bf2.png",
    category: "Bundles",
    featured: true
  },
  {
    id: 104,
    name: "Crystal Facial Roller",
    description: "Rose quartz facial roller to enhance your skincare ritual and improve product absorption.",
    price: "RM 120",
    image: "/lovable-uploads/cb10aacc-5a7a-473c-9341-adc8c270d0f2.png",
    category: "Accessories"
  },
  {
    id: 105,
    name: "Evening Wellness Gift Set",
    description: "Luxury gift set featuring calming elixir, lavender pillow mist, and silk eye mask.",
    price: "RM 280",
    image: "/lovable-uploads/4c236ef0-6021-439c-a483-668ac8a8a72d.png",
    category: "Gifts"
  },
  {
    id: 106,
    name: "Custom Wellness Journal",
    description: "Beautifully designed journal with guided prompts for tracking your wellness journey.",
    price: "RM 95",
    image: "/lovable-uploads/56f32cef-4b88-425f-9117-cfcc52576aaf.png",
    category: "Accessories"
  }
];

// Ritual Product Component
const RitualProductCard = ({ product }: { product: any }) => {
  const { toast } = useToast();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow duration-300">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
        />
        {product.featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-brand-gilded-gold text-white">
              Featured
            </Badge>
          </div>
        )}
      </div>
      <CardHeader>
        <div className="text-xs font-medium text-natural-gray mb-1">{product.category}</div>
        <CardTitle className="font-playfair">{product.name}</CardTitle>
        <div className="text-brand-deep-teal font-semibold">{product.price}</div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription>{product.description}</CardDescription>
      </CardContent>
      <CardFooter className="gap-2">
        <Button className="flex-grow" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
        <Button variant="outline" size="icon">
          <Heart className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

const Rituals = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(ritualProducts);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    if (activeCategory === 'all') {
      setFilteredProducts(ritualProducts);
    } else {
      setFilteredProducts(ritualProducts.filter(product => product.category.toLowerCase() === activeCategory.toLowerCase()));
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Wellness Rituals | Datin Norehan"
        description="Discover premium accessories and ritual kits to elevate your wellness practice with Datin Norehan's curated collection."
      />
      <Navbar />
      <main className="flex-grow pt-16 md:pt-20 lg:pt-24">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-brand-blush-rose text-brand-dark mb-3">Premium Collection</Badge>
              <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4">Wellness Rituals</h1>
              <div className="w-20 h-1 bg-brand-gilded-gold mx-auto mb-6"></div>
              <p className="text-xl text-natural-gray max-w-3xl mx-auto">
                Elevate your self-care practices with our premium accessories, curated bundles, and thoughtful gifts.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                <Sparkles className="h-10 w-10 text-brand-gilded-gold mb-4" />
                <h2 className="font-playfair text-2xl mb-3">The Power of Ritual</h2>
                <p className="text-natural-gray mb-5">
                  Rituals transform ordinary moments into opportunities for mindfulness, gratitude, and connection with yourself.
                </p>
                <Link to="/articles?category=Rituals">
                  <Button variant="outline">Learn More</Button>
                </Link>
              </div>
              
              <div className="bg-brand-deep-teal rounded-lg p-8 shadow-sm flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="font-playfair text-2xl mb-3 text-white">Custom Bundles</h2>
                <p className="text-white/90 mb-5">
                  Create your own personalized ritual set by combining our products into a custom bundle that meets your wellness needs.
                </p>
                <Link to="/rituals/custom">
                  <Button className="bg-white text-brand-deep-teal hover:bg-white/90">Create Bundle</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Products Section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <Tabs 
              defaultValue={activeCategory} 
              value={activeCategory} 
              onValueChange={setActiveCategory} 
              className="mb-10"
            >
              <div className="flex justify-center mb-8 overflow-x-auto pb-2">
                <TabsList className="bg-brand-creamy-ivory/50 border border-brand-blush-rose/20 p-1">
                  <TabsTrigger 
                    value="all" 
                    className="data-[state=active]:bg-brand-blush-rose/20"
                  >
                    All Items
                  </TabsTrigger>
                  <TabsTrigger 
                    value="accessories" 
                    className="data-[state=active]:bg-brand-blush-rose/20"
                  >
                    Accessories
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bundles" 
                    className="data-[state=active]:bg-brand-blush-rose/20"
                  >
                    Ready Bundles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="gifts" 
                    className="data-[state=active]:bg-brand-blush-rose/20"
                  >
                    Gifts
                  </TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeCategory} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredProducts.map((product) => (
                    <RitualProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {filteredProducts.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-brand-soft-gray">No products found in this category.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Custom Bundles CTA */}
        <section className="py-16 md:py-24 bg-gradient-sage">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg p-8 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="font-playfair text-3xl mb-4">Create Your Perfect Ritual</h2>
                  <p className="text-natural-gray mb-6">
                    Our custom bundle builder allows you to select the perfect combination of products for your unique wellness journey. Mix and match elixirs, accessories, and educational materials for a personalized experience.
                  </p>
                  <Link to="/rituals/custom">
                    <Button className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white">
                      Start Building
                    </Button>
                  </Link>
                </div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/c1cf7a81-becb-434a-ba10-34f2bfc6e418.png" 
                    alt="Custom Bundle" 
                    className="rounded-lg shadow-md"
                  />
                  <div className="absolute -top-4 -right-4 bg-brand-gilded-gold text-white rounded-full w-16 h-16 flex items-center justify-center text-sm font-bold">
                    Save 15%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Rituals;
