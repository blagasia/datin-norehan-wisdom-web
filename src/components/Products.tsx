
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import { useLoyalty } from '@/context/LoyaltyContext';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProductItem = ({ product }: { product: Product }) => {
  const { toast } = useToast();
  const { loyaltyUser, customer } = useLoyalty();

  const handleShareReferral = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!customer || !customer.referralCode) {
      toast({
        title: "Sign in required",
        description: "Please sign in to your loyalty account to share referrals",
      });
      return;
    }

    // Generate referral link
    const referralLink = `${window.location.origin}/products/${product.id}?ref=${customer.referralCode}`;
    
    // Copy to clipboard
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        toast({
          title: "Referral Link Copied!",
          description: "Share this link with friends to earn commission",
        });
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        toast({
          title: "Couldn't copy link",
          description: "Please try again or copy manually",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-56 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-natural-purple px-3 py-1 text-xs font-medium rounded-full">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-playfair text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-natural-gray font-semibold">{product.price}</p>
          <div className="flex gap-2 mt-4">
            <Button className="flex-1 btn-outline">View Product</Button>
            {customer && customer.referralCode && (
              <Button 
                variant="secondary" 
                className="flex-none" 
                onClick={handleShareReferral}
                size="icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </Button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Products = () => {
  const featuredProducts = products.slice(0, 4);

  return (
    <section className="py-16 md:py-24 bg-brand-sage-mist/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-brand-gilded-gold text-white mb-3">Featured Collection</Badge>
          <div className="flex items-center justify-center gap-2 mb-4">
            <ShoppingBag className="h-6 w-6 text-brand-deep-teal" />
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">DNA Elixirs</h2>
          </div>
          <div className="w-16 h-1 bg-brand-deep-teal mx-auto mb-6"></div>
          <p className="text-lg text-natural-gray max-w-2xl mx-auto">
            Premium wellness formulations that transform from within, featuring our signature natural ingredients for radiant results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/products">
            <Button className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white">View All Elixirs</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Products;
