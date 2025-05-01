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
import { ShoppingBag, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const ProductDetail = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [quantity, setQuantity] = useState(1);
  
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
    addToCart(product, quantity);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
    
    // For certain products, show ritual upsell toast
    if (product.id !== 2) { // If not collagen product (which already has dedicated upsell section)
      setTimeout(() => {
        toast({
          title: "Complete your experience",
          description: "Discover premium accessories to enhance your elixir ritual.",
          action: (
            <Link to="/rituals">
              <Button variant="outline" size="sm">View Accessories</Button>
            </Link>
          ),
        });
      }, 2000);
    }
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
                    <ul className="space-y-2">
                      {product.benefits.map((benefit: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-brand-deep-teal mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-natural-gray">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-r-none"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <div className="px-4 py-2 border-t border-b">
                      {quantity}
                    </div>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="rounded-l-none"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <Button 
                    className="bg-brand-deep-teal hover:bg-brand-deep-teal/90 text-white flex-1"
                    onClick={handleAddToCart}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                </div>
                
                {/* Subscription option */}
                <div className="mt-4 p-4 bg-brand-sage-mist/10 rounded-lg border border-brand-sage-mist/30">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center h-6">
                      <input 
                        id="subscribe" 
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-brand-deep-teal focus:ring-brand-deep-teal"
                      />
                    </div>
                    <div>
                      <label htmlFor="subscribe" className="font-medium text-gray-900">Subscribe & Save 15%</label>
                      <p className="text-sm text-natural-gray">Receive this product monthly and never run out</p>
                    </div>
                  </div>
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
              <TabsList className="w-full grid grid-cols-4 mb-8">
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="usage">Usage Instructions</TabsTrigger>
                <TabsTrigger value="science">The Science</TabsTrigger>
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
                {product.id === 2 ? (
                  // Custom detailed instructions for collagen product
                  <>
                    <p className="text-natural-gray mb-4">
                      Our Natural Collagen Boost is designed to be incorporated into your daily ritual for optimal results. Follow these steps to maximize benefits:
                    </p>
                    
                    <div className="space-y-6 mt-6">
                      <div className="bg-brand-sage-mist/10 p-4 rounded-lg">
                        <h4 className="font-medium mb-2">Morning Ritual (Recommended)</h4>
                        <ol className="list-decimal pl-5 space-y-2">
                          <li>Add one precisely measured scoop (5g) to your morning beverage</li>
                          <li>Mix with warm (not hot) water, tea, or plant-based milk</li>
                          <li>Stir thoroughly until completely dissolved</li>
                          <li>Consume within 10 minutes of preparation</li>
                          <li>For best results, take on an empty stomach</li>
                        </ol>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Pro Tips for Maximum Absorption</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Combine with vitamin C rich foods to enhance collagen synthesis</li>
                          <li>Avoid mixing with coffee as it may affect potency</li>
                          <li>Stay consistent with daily use - results are cumulative</li>
                          <li>Store in a cool, dry place away from direct sunlight</li>
                        </ul>
                      </div>
                      
                      <p className="italic text-sm text-brand-deep-teal">
                        "Beauty begins within. Consistency in your collagen ritual creates the foundation for lasting radiance." — Datin Norehan
                      </p>
                    </div>
                  </>
                ) : (
                  <p className="text-natural-gray whitespace-pre-line">
                    {product.usage || `For optimal results, incorporate this elixir into your daily wellness routine. 
                    
Take as directed on the packaging, typically once per day with water or your favorite beverage. Consistent use for 2-4 weeks is recommended to experience the full benefits.`}
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="science" className="p-6 bg-white rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">The Science Behind Our Formula</h3>
                <p className="text-natural-gray mb-6">
                  At DNA by Datin Norehan, we combine traditional wisdom with modern scientific research to create elixirs that truly work. Our formulations are backed by clinical studies and developed in consultation with experts in nutrition and natural wellness.
                </p>
                
                {product.id === 2 && (
                  <div className="space-y-6">
                    <h4 className="font-medium">Research-Backed Benefits:</h4>
                    <p className="text-natural-gray mb-4">
                      Our Natural Collagen Boost contains a specialized peptide complex that has been shown in clinical studies to improve skin elasticity by up to 32% after 8 weeks of consistent use. The formula works by stimulating your body's natural collagen production pathways while providing the building blocks needed for optimal synthesis.
                    </p>
                    
                    <div className="bg-brand-deep-teal/5 p-4 rounded-lg border border-brand-deep-teal/20">
                      <h5 className="font-medium mb-2">Key Research Findings:</h5>
                      <ul className="list-disc pl-5 space-y-2 text-natural-gray">
                        <li>30% increase in skin hydration after 4 weeks</li>
                        <li>Significant reduction in fine lines after 8 weeks</li>
                        <li>Enhanced hair strength and growth noted in 73% of participants</li>
                        <li>Improved nail growth and reduced brittleness in 88% of participants</li>
                      </ul>
                    </div>
                  </div>
                )}
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
