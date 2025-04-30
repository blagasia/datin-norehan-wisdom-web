
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { products } from '@/data/products';
import { useLoyalty } from '@/context/LoyaltyContext';
import { useToast } from '@/hooks/use-toast';

const ProductItem = ({ product }: { product: any }) => {
  const { toast } = useToast();
  const { user } = useLoyalty();

  const handleShareReferral = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || !user.referralCode) {
      toast({
        title: "Sign in required",
        description: "Please sign in to your loyalty account to share referrals",
      });
      return;
    }

    // Generate referral link
    const referralLink = `${window.location.origin}/products/${product.id}?ref=${user.referralCode}`;
    
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
    <Card className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <Link to={`/products/${product.id}`}>
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
          <p className="text-natural-gray font-semibold mb-2">{product.price}</p>
          <p className="text-sm text-natural-gray line-clamp-2 mb-4">{product.description}</p>
          <div className="flex gap-2">
            <Button className="flex-1">View Product</Button>
            {user && user.referralCode && (
              <Button 
                variant="outline" 
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
    </Card>
  );
};

const Products = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="py-16 md:py-24 bg-natural-green/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6">Our Natural Wellness Products</h1>
            <p className="text-xl text-natural-gray max-w-3xl mx-auto mb-12">
              Discover our range of 100% natural and organic wellness solutions crafted with passion and perfected by nature.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </div>
            
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink>3</PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
            
            <div className="mt-16 max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-sm border border-natural-peach/30">
              <h2 className="font-playfair text-2xl font-semibold mb-4">Our Commitment to Quality</h2>
              <p className="text-natural-gray mb-4">
                Every product in the Datin Norehan collection is handcrafted with meticulous attention to detail, using only the finest natural ingredients sourced from trusted suppliers.
              </p>
              <p className="text-natural-gray">
                We never compromise on quality and ensure that each formulation is free from harmful chemicals, artificial preservatives, and synthetic additives.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
