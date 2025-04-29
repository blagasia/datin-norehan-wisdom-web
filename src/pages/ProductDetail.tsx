
import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Package, Star } from 'lucide-react';
import { products } from '@/data/products';
import TikTokVideo from '@/components/TikTokVideo';

const ProductDetail = () => {
  const { productId } = useParams();
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-playfair font-bold mb-4">Product Not Found</h1>
            <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Button className="btn-primary" asChild>
              <a href="/products">Return to Products</a>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden bg-natural-green/10">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4 bg-natural-purple px-3 py-1 text-sm font-medium rounded-full">
                {product.category}
              </div>
            </div>

            {/* Product Details */}
            <div>
              <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-natural-gray ml-2">4.0 (24 reviews)</span>
              </div>
              <p className="text-2xl font-semibold text-natural-dark mb-6">{product.price}</p>
              <p className="text-natural-gray mb-8">{product.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="border border-natural-green/30 rounded-lg p-4 text-center">
                  <Package className="mx-auto mb-2 text-natural-green" />
                  <p className="text-sm text-natural-gray">100% Natural</p>
                </div>
                <div className="border border-natural-green/30 rounded-lg p-4 text-center">
                  <Package className="mx-auto mb-2 text-natural-green" />
                  <p className="text-sm text-natural-gray">Organic Certified</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary flex-1">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button className="btn-outline flex-1">Buy Now</Button>
              </div>
            </div>
          </div>

          {/* TikTok Video */}
          <div className="mt-16">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">
              See Our Product in Action
            </h2>
            <div className="max-w-2xl mx-auto">
              <TikTokVideo videoId={product.tiktokVideoId || ''} />
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="text-natural-gray">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Product Details</h3>
                  <p className="mb-4">
                    {product.longDescription || `${product.name} is one of our premium wellness products, carefully crafted with 100% natural ingredients to enhance your well-being. This product is free from harmful chemicals, artificial preservatives, and synthetic additives.`}
                  </p>
                  <p className="mb-4">
                    Each bottle of our {product.name} is handcrafted in small batches to ensure quality and efficacy. We source only the finest natural ingredients from trusted suppliers who share our commitment to sustainability and ethical practices.
                  </p>
                  <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                  <ul className="list-disc pl-5 mb-4">
                    <li>Supports overall wellbeing</li>
                    <li>Made with premium natural ingredients</li>
                    <li>Free from harmful chemicals and additives</li>
                    <li>Sustainably sourced and ethically produced</li>
                  </ul>
                </div>
              </TabsContent>
              <TabsContent value="ingredients">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Ingredients</h3>
                  <p className="mb-4">
                    We pride ourselves on using only the highest quality natural and organic ingredients in our products:
                  </p>
                  <ul className="list-disc pl-5 mb-4">
                    <li><span className="font-medium">Organic Herbs</span> - Sustainably harvested and carefully selected</li>
                    <li><span className="font-medium">Plant Extracts</span> - Obtained through natural extraction processes</li>
                    <li><span className="font-medium">Essential Oils</span> - Pure and therapeutic grade</li>
                    <li><span className="font-medium">Natural Preservatives</span> - To maintain freshness without harmful chemicals</li>
                  </ul>
                  <p className="text-sm italic">
                    *All of our products are free from parabens, sulfates, artificial colors, and synthetic fragrances.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="reviews">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Customer Reviews</h3>
                  <div className="space-y-6">
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 5 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-natural-gray ml-2">5.0</span>
                      </div>
                      <h4 className="font-semibold mb-1">Sarah L.</h4>
                      <p className="text-sm text-natural-gray mb-3">Verified Purchase • 2 months ago</p>
                      <p>
                        I've been using this product for about a month now and I'm amazed by the results. My skin feels much more hydrated and radiant. Will definitely purchase again!
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-natural-gray ml-2">4.0</span>
                      </div>
                      <h4 className="font-semibold mb-1">Michael T.</h4>
                      <p className="text-sm text-natural-gray mb-3">Verified Purchase • 3 weeks ago</p>
                      <p>
                        Great product overall. I noticed positive changes within the first week of use. The only reason I'm giving it 4 stars is because of the packaging - it could be more eco-friendly.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-24">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-center">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter(p => p.id !== product.id && p.category === product.category)
                .slice(0, 4)
                .map(relatedProduct => (
                  <div key={relatedProduct.id} className="group bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md">
                    <a href={`/products/${relatedProduct.id}`} className="block">
                      <div className="relative h-56 overflow-hidden">
                        <img 
                          src={relatedProduct.image} 
                          alt={relatedProduct.name} 
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2 right-2 bg-natural-purple px-3 py-1 text-xs font-medium rounded-full">
                          {relatedProduct.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-playfair text-lg font-semibold mb-1">{relatedProduct.name}</h3>
                        <p className="text-natural-gray font-semibold">{relatedProduct.price}</p>
                      </div>
                    </a>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
