
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ritualProducts, RitualProduct } from '@/data/rituals';
import { Package, Palette, Gift } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RitualProductsProps {
  category: string;
}

const RitualProductItem = ({ product }: { product: RitualProduct }) => {
  const { toast } = useToast();

  return (
    <Card className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
      <Link to={`/rituals/${product.id}`}>
        <div className="relative h-56 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-natural-purple px-3 py-1 text-xs font-medium rounded-full">
            {product.category}
          </div>
          {product.customizable && (
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Palette className="h-3 w-3" />
              <span className="text-xs font-medium">Customizable</span>
            </div>
          )}
          {product.giftWrapAvailable && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
              <Gift className="h-3 w-3" />
              <span className="text-xs font-medium">Gift Option</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-playfair text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-natural-gray font-semibold mb-2">{product.price}</p>
          <p className="text-sm text-natural-gray line-clamp-2 mb-4">{product.description}</p>
          <div className="flex gap-2">
            {product.bundleType === 'kit' ? (
              <Button className="flex-1 bg-brand-gilded-gold hover:bg-brand-gilded-gold/90 text-white">
                Build Your Kit
              </Button>
            ) : (
              <Button className="flex-1">View Details</Button>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};

const RitualProducts = ({ category }: RitualProductsProps) => {
  // Filter products based on category
  const filteredProducts = category === 'all'
    ? ritualProducts
    : category === 'accessories' 
      ? ritualProducts.filter(product => product.bundleType === 'accessory')
      : category === 'bundles'
        ? ritualProducts.filter(product => product.bundleType === 'bundle')
        : category === 'custom'
          ? ritualProducts.filter(product => product.bundleType === 'kit')
          : ritualProducts;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <RitualProductItem key={product.id} product={product} />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-brand-soft-gray">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default RitualProducts;
