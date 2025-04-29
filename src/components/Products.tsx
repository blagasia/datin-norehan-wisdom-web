
import React from 'react';
import { Button } from '@/components/ui/button';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  category: string;
}

const ProductItem = ({ product }: { product: Product }) => {
  return (
    <div className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
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
        <Button className="w-full mt-4 btn-outline">View Product</Button>
      </div>
    </div>
  );
};

const Products = () => {
  const featuredProducts: Product[] = [
    {
      id: 1,
      name: "Organic Detox Tea",
      price: "RM 89",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      category: "Detox"
    },
    {
      id: 2,
      name: "Natural Collagen Boost",
      price: "RM 139",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843",
      category: "Collagen"
    },
    {
      id: 3,
      name: "Herbal Wellness Tonic",
      price: "RM 109",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      category: "Herbal"
    },
    {
      id: 4,
      name: "Natural Beauty Elixir",
      price: "RM 129",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      category: "Beauty"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-natural-purple/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Featured Products</h2>
          <p className="section-subtitle">Discover our most loved wellness solutions crafted with 100% natural ingredients</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featuredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="btn-primary">View All Products</Button>
        </div>
      </div>
    </section>
  );
};

export default Products;
