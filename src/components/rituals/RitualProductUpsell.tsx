
import React from 'react';
import { Link } from 'react-router-dom';
import { ritualProducts } from '@/data/rituals';
import { productUpsells } from '@/data/rituals';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Package, Palette } from 'lucide-react';

interface RitualProductUpsellProps {
  productId: number;
}

const RitualProductUpsell = ({ productId }: RitualProductUpsellProps) => {
  // Get upsells for this product if they exist
  const upsells = productUpsells[productId as keyof typeof productUpsells];
  
  if (!upsells || upsells.length === 0) {
    return null;
  }
  
  // Get the ritual products to display
  const upsellProducts = upsells
    .filter(upsell => upsell.type === 'ritual')
    .map(upsell => {
      const product = ritualProducts.find(p => p.id === upsell.id);
      return { 
        ...product, 
        upsellMessage: upsell.message 
      };
    })
    .filter(Boolean);
  
  if (upsellProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="my-12 p-6 bg-brand-sage-mist/20 rounded-lg border border-brand-sage-mist">
      <div className="flex items-center gap-2 mb-6">
        <Package className="h-5 w-5 text-brand-deep-teal" />
        <h3 className="font-playfair text-xl font-semibold">Elevate Your Ritual</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {upsellProducts.map(product => (
          <Card key={product?.id} className="overflow-hidden">
            <Link to={`/rituals/${product?.id}`}>
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={product?.image} 
                  alt={product?.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {product?.customizable && (
                  <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm rounded-full px-2 py-1 text-xs flex items-center gap-1">
                    <Palette className="h-3 w-3" />
                    <span>Customizable</span>
                  </div>
                )}
              </div>
              <CardContent className="p-4">
                <h4 className="font-medium mb-1">{product?.name}</h4>
                <p className="text-sm text-brand-gilded-gold mb-2">{product?.price}</p>
                <p className="text-xs text-natural-gray mb-3">{product?.upsellMessage}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-brand-gilded-gold/30 hover:bg-brand-gilded-gold/10 text-xs"
                >
                  View Details
                </Button>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RitualProductUpsell;
