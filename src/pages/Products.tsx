
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
  description: string;
}

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <Card className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
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
        <Button className="w-full btn-outline">View Product</Button>
      </div>
    </Card>
  );
};

const Products = () => {
  const products: Product[] = [
    {
      id: 1,
      name: "Organic Detox Tea",
      price: "RM 89",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Detox",
      description: "A refreshing blend of organic herbs that helps cleanse your body and restore natural balance."
    },
    {
      id: 2,
      name: "Natural Collagen Boost",
      price: "RM 139",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      category: "Collagen",
      description: "Enhance your skin's elasticity and youthfulness with our all-natural collagen formula."
    },
    {
      id: 3,
      name: "Herbal Wellness Tonic",
      price: "RM 109",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Herbal",
      description: "Traditional herbs combined to support overall wellbeing and vitality."
    },
    {
      id: 4,
      name: "Natural Beauty Elixir",
      price: "RM 129",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "Beauty",
      description: "Nourish your skin from within with our powerful natural beauty elixir."
    },
    {
      id: 5,
      name: "Immune Support Formula",
      price: "RM 99",
      image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
      category: "Wellness",
      description: "Strengthen your body's natural defenses with our immune-boosting blend."
    },
    {
      id: 6,
      name: "Pure Radiance Serum",
      price: "RM 149",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      category: "Beauty",
      description: "Reveal your natural glow with our organic serum made from pure botanical extracts."
    }
  ];

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
