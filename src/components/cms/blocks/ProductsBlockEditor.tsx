
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, CircleDashed, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ProductsBlockContent {
  title: string;
  description: string;
  products: string[]; // Array of product IDs
}

interface ProductsBlockEditorProps {
  content: ProductsBlockContent;
  onChange: (content: ProductsBlockContent) => void;
  readOnly?: boolean;
}

const ProductsBlockEditor: React.FC<ProductsBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false
}) => {
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch available products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // This is a placeholder since we don't have a products table yet
        // In a real implementation, this would fetch from the products table
        const mockProducts: Product[] = [
          { id: '1', name: 'Detox Elixir', price: 29.99, image: '/placeholder.svg' },
          { id: '2', name: 'Collagen Boost', price: 34.99, image: '/placeholder.svg' },
          { id: '3', name: 'Herbal Tonic', price: 19.99, image: '/placeholder.svg' },
          { id: '4', name: 'Beauty Powder', price: 27.99, image: '/placeholder.svg' },
          { id: '5', name: 'Wellness Tea', price: 15.99, image: '/placeholder.svg' },
        ];
        setAvailableProducts(mockProducts);
        
        // Find selected products based on IDs
        const selected = mockProducts.filter(product => 
          content.products.includes(product.id)
        );
        setSelectedProducts(selected);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [content.products]);

  const handleProductToggle = (product: Product) => {
    // Check if product is already selected
    const isSelected = content.products.includes(product.id);
    
    if (isSelected) {
      // Remove from selected products
      onChange({
        ...content,
        products: content.products.filter(id => id !== product.id)
      });
    } else {
      // Add to selected products
      onChange({
        ...content,
        products: [...content.products, product.id]
      });
    }
  };

  const filteredProducts = availableProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (readOnly) {
    return (
      <div className="py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-playfair mb-2">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedProducts.map(product => (
            <div key={product.id} className="border rounded-md overflow-hidden">
              <div className="h-48 bg-muted flex items-center justify-center">
                {product.image ? (
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="text-muted-foreground">No image</div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-brand-deep-teal font-semibold mt-1">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="products-title">Section Title</Label>
        <Input
          id="products-title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          placeholder="Enter section title"
          className="mt-2"
        />
      </div>
      
      <div>
        <Label htmlFor="products-description">Description</Label>
        <Input
          id="products-description"
          value={content.description}
          onChange={(e) => onChange({ ...content, description: e.target.value })}
          placeholder="Enter section description"
          className="mt-2"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-sm font-medium">Select Products</h4>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[200px]"
            />
          </div>
        </div>
        
        {loading ? (
          <div className="text-center p-8">Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center p-8 border border-dashed rounded-md">
            <p className="text-muted-foreground">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 max-h-[400px] overflow-y-auto p-2">
            {filteredProducts.map(product => {
              const isSelected = content.products.includes(product.id);
              return (
                <Card 
                  key={product.id} 
                  className={`cursor-pointer transition-colors ${isSelected ? 'border-brand-deep-teal bg-brand-deep-teal/10' : 'border-muted'}`}
                  onClick={() => handleProductToggle(product)}
                >
                  <CardContent className="p-3 flex items-center">
                    <div className="h-12 w-12 mr-3 bg-muted rounded-md flex items-center justify-center overflow-hidden">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="text-muted-foreground text-xs">No image</div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">${product.price.toFixed(2)}</div>
                    </div>
                    <div>
                      {isSelected ? (
                        <CheckCircle2 className="h-5 w-5 text-brand-deep-teal" />
                      ) : (
                        <CircleDashed className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
        
        <div className="mt-4">
          <p className="text-sm text-muted-foreground">
            Selected {selectedProducts.length} of {availableProducts.length} products
          </p>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border rounded-md p-6 bg-white">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-playfair mb-2">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
          {selectedProducts.length === 0 ? (
            <div className="text-center p-8 border border-dashed rounded-md">
              <p className="text-muted-foreground">No products selected</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {selectedProducts.map(product => (
                <div key={product.id} className="border rounded-md overflow-hidden">
                  <div className="h-32 bg-muted flex items-center justify-center">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="text-muted-foreground">No image</div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium">{product.name}</h3>
                    <p className="text-brand-deep-teal font-semibold mt-1">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsBlockEditor;
