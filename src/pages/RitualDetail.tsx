
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ritualProducts, RitualProduct } from '@/data/rituals';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Package, Palette, Gift, ShoppingBag, 
  Check, ArrowRight, PackageOpen 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import RitualProducts from '@/components/rituals/RitualProducts';

const RitualDetail = () => {
  const { productId } = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<RitualProduct | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [customName, setCustomName] = useState<string>("");
  const [giftWrap, setGiftWrap] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>("");
  const [compatibleProducts, setCompatibleProducts] = useState<any[]>([]);

  useEffect(() => {
    if (productId) {
      const id = parseInt(productId);
      const foundProduct = ritualProducts.find(p => p.id === id);
      
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Set default color if available
        if (foundProduct.colors && foundProduct.colors.length > 0) {
          setSelectedColor(foundProduct.colors[0]);
        }
        
        // Find compatible products if any
        if (foundProduct.compatibleWith && foundProduct.compatibleWith.length > 0) {
          const compatible = products.filter(p => 
            foundProduct.compatibleWith?.includes(p.id)
          );
          setCompatibleProducts(compatible);
        }
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
            <Link to="/rituals">
              <Button className="mt-4">Back to Rituals</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    // For demonstration, just show toast
    toast({
      title: "Item added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <nav className="flex items-center mb-8 text-sm">
            <Link to="/" className="text-natural-gray hover:text-brand-gilded-gold">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/rituals" className="text-natural-gray hover:text-brand-gilded-gold">DNA Rituals</Link>
            <span className="mx-2">/</span>
            <span className="text-brand-gilded-gold">{product.name}</span>
          </nav>

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
              <div className="absolute top-4 right-4">
                <Badge className="bg-natural-purple text-white">{product.category}</Badge>
              </div>
              <div className="flex gap-3 mt-4">
                {product.customizable && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-brand-sage-mist/20 rounded-full">
                    <Palette className="h-4 w-4" />
                    <span className="text-xs font-medium">Customizable</span>
                  </div>
                )}
                {product.giftWrapAvailable && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-brand-blush-rose/10 rounded-full">
                    <Gift className="h-4 w-4" />
                    <span className="text-xs font-medium">Gift Option</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Details */}
            <div>
              <h1 className="font-playfair text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-xl font-medium text-brand-gilded-gold mb-4">{product.price}</p>
              <p className="text-natural-gray mb-6">
                {product.description}
              </p>
              
              <Separator className="my-6" />
              
              {/* Customization Options */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Select Color</h3>
                  <RadioGroup value={selectedColor} onValueChange={setSelectedColor} className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <div key={color} className="flex items-center space-x-2">
                        <RadioGroupItem value={color} id={`color-${color}`} />
                        <Label htmlFor={`color-${color}`}>{color}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
              
              {/* Name Customization */}
              {product.nameCustomization && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Add Custom Engraving</h3>
                  <Input
                    placeholder="Enter name or short text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    maxLength={15}
                    className="max-w-xs"
                  />
                  <p className="text-xs text-natural-gray mt-2">Maximum 15 characters</p>
                </div>
              )}
              
              {/* Gift Options */}
              {product.giftWrapAvailable && (
                <div className="mb-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <Checkbox id="gift-wrap" checked={giftWrap} onCheckedChange={(checked: boolean) => setGiftWrap(checked)} />
                    <div className="grid gap-1.5">
                      <Label htmlFor="gift-wrap">Add gift wrapping (+RM 15)</Label>
                      <p className="text-xs text-natural-gray">
                        Elegant packaging with satin ribbon and gift card
                      </p>
                    </div>
                  </div>
                  
                  {giftWrap && (
                    <div className="ml-7">
                      <Input
                        placeholder="Add a gift message"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        className="max-w-xs mb-2"
                      />
                    </div>
                  )}
                </div>
              )}
              
              {/* Add to Cart Section */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-brand-gilded-gold hover:bg-brand-gilded-gold/90 text-white"
                >
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                {product.bundleType === 'accessory' && (
                  <Link to="/rituals/custom" className="flex-1">
                    <Button variant="outline" className="w-full border-brand-gilded-gold/30">
                      <PackageOpen className="mr-2 h-5 w-5" />
                      Add to Custom Kit
                    </Button>
                  </Link>
                )}
              </div>
              
              {/* Compatibility Section */}
              {compatibleProducts.length > 0 && (
                <div className="mt-8">
                  <Alert className="bg-brand-deep-teal/5 border border-brand-deep-teal/20">
                    <div className="flex items-start">
                      <Check className="h-5 w-5 text-brand-deep-teal mr-2" />
                      <AlertDescription>
                        This ritual accessory is designed to work perfectly with the following DNA Elixirs:
                        <div className="flex flex-wrap gap-2 mt-2">
                          {compatibleProducts.map(p => (
                            <Link to={`/products/${p.id}`} key={p.id}>
                              <Badge variant="outline" className="hover:bg-brand-blush-rose/10">
                                {p.name}
                              </Badge>
                            </Link>
                          ))}
                        </div>
                      </AlertDescription>
                    </div>
                  </Alert>
                </div>
              )}
            </div>
          </div>
          
          {/* Related Products */}
          <div className="mt-24">
            <h2 className="font-playfair text-2xl font-bold mb-2 text-center">Complete Your Ritual</h2>
            <p className="text-natural-gray text-center mb-8">
              Discover complementary items to enhance your wellness experience
            </p>
            
            <Tabs defaultValue="accessories">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="accessories">Accessories</TabsTrigger>
                  <TabsTrigger value="bundles">Ready Bundles</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="accessories">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ritualProducts
                    .filter(p => p.bundleType === 'accessory' && p.id !== product.id)
                    .slice(0, 3)
                    .map(relatedProduct => (
                      <Card key={relatedProduct.id} className="overflow-hidden">
                        <Link to={`/rituals/${relatedProduct.id}`}>
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={relatedProduct.image} 
                              alt={relatedProduct.name}
                              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                            <p className="text-sm text-natural-gray">{relatedProduct.price}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>
              
              <TabsContent value="bundles">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {ritualProducts
                    .filter(p => p.bundleType === 'bundle')
                    .slice(0, 3)
                    .map(relatedProduct => (
                      <Card key={relatedProduct.id} className="overflow-hidden">
                        <Link to={`/rituals/${relatedProduct.id}`}>
                          <div className="aspect-video overflow-hidden">
                            <img 
                              src={relatedProduct.image} 
                              alt={relatedProduct.name}
                              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-medium mb-1">{relatedProduct.name}</h3>
                            <p className="text-sm text-natural-gray">{relatedProduct.price}</p>
                          </CardContent>
                        </Link>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="text-center mt-8">
              <Link to="/rituals">
                <Button variant="outline" className="border-brand-gilded-gold/30">
                  View All Ritual Items
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RitualDetail;
