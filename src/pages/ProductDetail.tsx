
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import TikTokVideo from '@/components/TikTokVideo';
import ProductGallery from '@/components/ProductGallery';
import RitualProductUpsell from '@/components/rituals/RitualProductUpsell';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const ProductDetail = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<any>(null);
  
  useEffect(() => {
    if (productId) {
      const id = parseInt(productId);
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
      }
    }
  }, [productId]);
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-24 flex items-center justify-center">
          <div className="text-center">
            <h2>Product not found</h2>
            <Link to="/products">
              <Button className="mt-4">Back to Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex mb-8 text-sm">
            <Link to="/" className="text-natural-gray hover:text-brand-gilded-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="text-natural-gray hover:text-brand-gilded-gold">DNA Elixirs</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-gilded-gold">{product.name}</span>
          </nav>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Gallery */}
            <ProductGallery productId={product.id} mainImage={product.image} />
            
            {/* Product Details */}
            <div>
              <Badge className="bg-natural-purple text-white mb-3">{product.category}</Badge>
              <h1 className="font-playfair text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl font-medium text-brand-gilded-gold mb-6">{product.price}</p>
              
              <div className="space-y-6">
                <p className="text-natural-gray">{product.longDescription || product.description}</p>
                
                {product.benefits && (
                  <div>
                    <h3 className="font-medium text-lg mb-2">Key Benefits</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {product.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="text-natural-gray">{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="pt-4">
                  <Button 
                    className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white w-full sm:w-auto"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Show ritual product upsells specifically for the collagen product (ID: 2) */}
          {product.id === 2 && (
            <RitualProductUpsell productId={2} />
          )}
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="ingredients">
              <TabsList className="w-full grid grid-cols-3 mb-8">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="usage">Usage Instructions</TabsTrigger>
                <TabsTrigger value="tiktok">TikTok Videos</TabsTrigger>
              </TabsList>
              
              <TabsContent value="ingredients" className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Premium Ingredients</h3>
                {product.ingredients ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.ingredients.map((ingredient: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-brand-gilded-gold"></div>
                        <span>{ingredient}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-natural-gray">
                    This product features a proprietary blend of premium natural ingredients, carefully sourced and formulated to deliver optimal results.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="usage" className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">How to Use</h3>
                <p className="text-natural-gray whitespace-pre-line">
                  {product.usage || `For optimal results, incorporate this elixir into your daily wellness routine. 
                  
Take as directed on the packaging, typically once per day with water or your favorite beverage. Consistent use for 2-4 weeks is recommended to experience the full benefits.`}
                </p>
              </TabsContent>
              
              <TabsContent value="tiktok" className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Community Videos</h3>
                {product.tiktokVideoId ? (
                  <div className="max-w-md mx-auto">
                    <TikTokVideo videoId={product.tiktokVideoId} />
                  </div>
                ) : (
                  <p className="text-center text-natural-gray">No videos available for this product yet.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-playfair font-bold text-center mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(relatedProduct => (
                  <Link 
                    to={`/products/${relatedProduct.id}`} 
                    key={relatedProduct.id}
                    className="group"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden mb-3">
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                    <p className="text-brand-gilded-gold">{relatedProduct.price}</p>
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
