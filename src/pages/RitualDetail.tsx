
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
  Check, ArrowRight, PackageOpen, Star 
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
    
    // Show upsell toast for certain products
    if (product.bundleType === 'accessory') {
      setTimeout(() => {
        toast({
          title: "Enhance your ritual",
          description: "Complete your wellness ritual with our ready bundles.",
          action: (
            <Link to="/rituals?category=bundles">
              <Button variant="outline" size="sm">View Bundles</Button>
            </Link>
          ),
        });
      }, 2000);
    }
  };

  // Products included in bundles
  const getBundleContents = () => {
    if (product.bundleType !== 'bundle') return null;
    
    // Simulating bundle contents - in a real app, this would come from the database
    const bundleItems = {
      4: [
        { name: "Natural Collagen Boost", type: "elixir", quantity: 1 },
        { name: "Premium Bamboo Measuring Scoop", type: "accessory", quantity: 1 },
        { name: "DNA Ritual Ceramic Mug", type: "accessory", quantity: 1 }
      ],
      5: [
        { name: "Calming Sleep Blend", type: "elixir", quantity: 1 },
        { name: "Lavender Eye Pillow", type: "accessory", quantity: 1 },
        { name: "Glass Infuser Bottle", type: "accessory", quantity: 1 }
      ]
    };
    
    return bundleItems[product.id as keyof typeof bundleItems];
  };
  
  const bundleContents = getBundleContents();

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
              
              {/* Bundle Contents for ready bundles */}
              {product.bundleType === 'bundle' && bundleContents && (
                <div className="bg-brand-sage-mist/10 rounded-lg p-5 mb-6 border border-brand-sage-mist/30">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Package className="mr-2 h-5 w-5 text-brand-deep-teal" />
                    Bundle Contents
                  </h3>
                  <div className="space-y-3">
                    {bundleContents.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-brand-gilded-gold rounded-full mr-3"></div>
                        <span className="flex-grow">{item.name}</span>
                        <span className="text-sm text-natural-gray">x{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-3 border-t border-brand-sage-mist/30">
                    <p className="text-sm text-brand-deep-teal flex items-center">
                      <Star className="mr-2 h-4 w-4" />
                      Save 15% compared to buying items separately
                    </p>
                  </div>
                </div>
              )}
              
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
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="details">
              <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-3">
                <TabsTrigger value="details">Details & Materials</TabsTrigger>
                <TabsTrigger value="instructions">Ritual Instructions</TabsTrigger>
                <TabsTrigger value="care">Care & Maintenance</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="mt-8 bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
                <h3 className="font-playfair text-xl font-semibold mb-4">Premium Materials & Craftsmanship</h3>
                
                {product.bundleType === 'accessory' && product.id === 1 && (
                  <>
                    <p className="mb-4">Our Premium Bamboo Measuring Scoop is crafted from sustainably harvested bamboo, known for its natural antibacterial properties and durability. Each scoop is carefully finished with food-safe oils to maintain its natural beauty while ensuring safety for daily use.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Materials:</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>100% sustainable bamboo</li>
                      <li>Natural food-safe oil finish</li>
                      <li>Optional rose gold or ebony dye (for colored options)</li>
                    </ul>
                    
                    <h4 className="font-medium mt-6 mb-2">Dimensions:</h4>
                    <p>Length: 10cm | Bowl diameter: 2.5cm | Perfect 5g measurement capacity</p>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 2 && (
                  <>
                    <p className="mb-4">The DNA Ritual Ceramic Mug is handcrafted by skilled artisans using high-quality ceramic clay. Each mug features a delicate gold accent rim and the signature DNA emblem. The ergonomic handle and perfectly balanced weight make this mug a joy to use in your daily wellness ritual.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Materials:</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>Premium ceramic with glazed finish</li>
                      <li>24K gold accent rim</li>
                      <li>Lead-free and food-safe materials</li>
                    </ul>
                    
                    <h4 className="font-medium mt-6 mb-2">Dimensions:</h4>
                    <p>Height: 9.5cm | Diameter: 8cm | Capacity: 350ml</p>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 3 && (
                  <>
                    <p className="mb-4">Our Mini Portable Blender combines elegance with functionality, featuring a powerful motor that can create silky smooth elixir mixtures in seconds. The borosilicate glass container is both beautiful and durable, while the rechargeable battery provides the convenience of blending anywhere.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Materials & Specifications:</h4>
                    <ul className="list-disc pl-5 space-y-1 mb-4">
                      <li>Borosilicate glass container</li>
                      <li>Food-grade stainless steel blades</li>
                      <li>Rechargeable 4000mAh lithium battery</li>
                      <li>USB-C charging port</li>
                      <li>15-20 blends per charge</li>
                    </ul>
                    
                    <h4 className="font-medium mt-6 mb-2">Dimensions:</h4>
                    <p>Height: 20cm | Diameter: 8cm | Capacity: 300ml</p>
                  </>
                )}
                
                {product.bundleType === 'bundle' && (
                  <p className="mb-4">This carefully curated bundle brings together our finest ritual accessories and elixirs to create a complete wellness experience. Each item is selected to complement the others, enhancing both the efficacy and enjoyment of your daily ritual.</p>
                )}
              </TabsContent>
              
              <TabsContent value="instructions" className="mt-8 bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
                <h3 className="font-playfair text-xl font-semibold mb-4">Optimize Your Wellness Ritual</h3>
                
                {product.bundleType === 'accessory' && product.id === 1 && (
                  <>
                    <p className="mb-4">Your Premium Bamboo Measuring Scoop is the key to precision in your wellness ritual, ensuring you receive the perfect amount of elixir with every use.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Perfect Measurement Technique:</h4>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                      <li>Gently scoop your elixir powder without compressing</li>
                      <li>Run the flat edge of a knife or your finger across the top to level the powder</li>
                      <li>Each level scoop provides the perfect 5g measurement for optimal results</li>
                    </ol>
                    
                    <h4 className="font-medium mt-6 mb-2">Integration With Your Ritual:</h4>
                    <p className="mb-4">For a beautiful morning ritual, we recommend placing your bamboo scoop on a small ceramic dish beside your elixir container. This creates an elegant preparation space that enhances the mindfulness of your wellness practice.</p>
                    
                    <p className="italic text-sm text-brand-deep-teal mt-4">"The act of measuring with intention is the first step in transforming a simple habit into a meaningful ritual." — Datin Norehan</p>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 2 && (
                  <>
                    <p className="mb-4">Your DNA Ritual Ceramic Mug is designed to elevate the experience of consuming your elixirs, making each sip a moment of mindful wellness.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Creating the Perfect Elixir Experience:</h4>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                      <li>Preheat your mug with warm water for 30 seconds, then discard the water</li>
                      <li>This gentle warming enhances the aromatic qualities of your elixir</li>
                      <li>Add your perfectly measured elixir powder using your bamboo scoop</li>
                      <li>Pour water at the optimal temperature (see elixir instructions)</li>
                      <li>Stir gently with a wooden spoon to preserve the delicate compounds</li>
                    </ol>
                    
                    <h4 className="font-medium mt-6 mb-2">Morning Sunlight Ritual:</h4>
                    <p className="mb-4">For enhanced wellbeing, enjoy your morning elixir in natural sunlight. The combination of the warm ceramic in your hands, the sunlight on your skin, and the nourishing elixir creates a powerful moment of wellness that sets a positive tone for your entire day.</p>
                    
                    <p className="italic text-sm text-brand-deep-teal mt-4">"The vessel from which you drink affects not just the taste, but the entire experience of nourishing your body." — Datin Norehan</p>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 3 && (
                  <>
                    <p className="mb-4">Your Mini Portable Blender transforms the preparation of elixirs into a seamless experience, allowing you to create perfectly smooth mixtures with minimal effort.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Creating Silky Smooth Elixirs:</h4>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                      <li>Fill the container with liquid to the recommended line (200-250ml)</li>
                      <li>Add your measured elixir powder</li>
                      <li>Secure the lid and ensure it's properly sealed</li>
                      <li>Press the power button twice to activate blending</li>
                      <li>Blend for 20-30 seconds until perfectly smooth</li>
                      <li>Enjoy immediately for maximum benefits</li>
                    </ol>
                    
                    <h4 className="font-medium mt-6 mb-2">On-the-Go Wellness:</h4>
                    <p className="mb-4">The portable nature of this blender allows you to maintain your wellness ritual wherever life takes you. Keep it charged in your office drawer, gym bag, or travel case to ensure you never miss your daily elixir, even on the busiest days.</p>
                    
                    <p className="italic text-sm text-brand-deep-teal mt-4">"True wellness adapts to your lifestyle, not the other way around. Your rituals should empower your day, not restrict it." — Datin Norehan</p>
                  </>
                )}
                
                {product.bundleType === 'bundle' && product.id === 4 && (
                  <>
                    <p className="mb-4">The Morning Glow Ritual Kit has been carefully designed to create a transformative morning routine that enhances both your inner wellness and outer radiance.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Your Morning Glow Ritual:</h4>
                    <ol className="list-decimal pl-5 space-y-3 mb-4">
                      <li>
                        <strong>Begin with Intention</strong>
                        <p className="text-sm">Take a moment to set your intention for the day while holding your ceramic mug between both palms.</p>
                      </li>
                      <li>
                        <strong>Perfect Measurement</strong>
                        <p className="text-sm">Use your bamboo scoop to measure one precise portion of Natural Collagen Boost powder.</p>
                      </li>
                      <li>
                        <strong>Mindful Preparation</strong>
                        <p className="text-sm">Heat filtered water to 80°C (not boiling) and pour over your elixir in the ceramic mug.</p>
                      </li>
                      <li>
                        <strong>Harmonious Blending</strong>
                        <p className="text-sm">Stir gently in a clockwise direction while taking three deep breaths.</p>
                      </li>
                      <li>
                        <strong>Radiant Absorption</strong>
                        <p className="text-sm">Find a spot with natural morning light and sip slowly, allowing each mouthful to nourish your body.</p>
                      </li>
                    </ol>
                    
                    <h4 className="font-medium mt-6 mb-2">Benefits of Consistent Practice:</h4>
                    <p className="mb-4">When performed daily, this ritual not only delivers the collagen-boosting benefits of the elixir but also creates a moment of mindfulness that reduces morning stress and sets a positive tone for the day ahead. Users report noticing improved skin elasticity within 14-21 days and a significant enhancement in overall morning wellbeing immediately.</p>
                    
                    <p className="italic text-sm text-brand-deep-teal mt-4">"The first moments of your day create ripples that affect everything that follows. Make them intentional, make them beautiful." — Datin Norehan</p>
                  </>
                )}
                
                {product.bundleType === 'bundle' && product.id === 5 && (
                  <>
                    <p className="mb-4">The Beauty Sleep Ritual Bundle transforms your evening routine into a restorative experience that prepares both body and mind for deep, rejuvenating sleep.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Your Evening Restoration Ritual:</h4>
                    <ol className="list-decimal pl-5 space-y-3 mb-4">
                      <li>
                        <strong>Prepare Your Space</strong>
                        <p className="text-sm">Dim the lights in your bedroom and create a calm environment 30 minutes before bedtime.</p>
                      </li>
                      <li>
                        <strong>Elixir Preparation</strong>
                        <p className="text-sm">Fill your glass infuser bottle with filtered water and add one scoop of Calming Sleep Blend.</p>
                      </li>
                      <li>
                        <strong>Gentle Activation</strong>
                        <p className="text-sm">Swirl the bottle gently to activate the herbs without agitation. Let it infuse for 5 minutes.</p>
                      </li>
                      <li>
                        <strong>Mindful Consumption</strong>
                        <p className="text-sm">Sip slowly and completely, focusing on the subtle flavors and the cooling sensation.</p>
                      </li>
                      <li>
                        <strong>Complete Relaxation</strong>
                        <p className="text-sm">Lie down and place the lavender eye pillow over your eyes, taking 10 deep breaths.</p>
                      </li>
                    </ol>
                    
                    <h4 className="font-medium mt-6 mb-2">Optimizing Your Sleep Environment:</h4>
                    <p className="mb-4">For enhanced results, keep your sleeping area between 18-20°C and free from electronic devices. The Calming Sleep Blend works harmoniously with your body's natural sleep hormones, while the gentle weight and aromatherapy benefits of the lavender eye pillow signal to your nervous system that it's time for deep rest.</p>
                    
                    <p className="italic text-sm text-brand-deep-teal mt-4">"Sleep is not simply the absence of wakefulness—it is an active process of renewal that requires the right conditions and care." — Datin Norehan</p>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="care" className="mt-8 bg-white p-6 rounded-lg shadow-sm max-w-4xl mx-auto">
                <h3 className="font-playfair text-xl font-semibold mb-4">Preserving Your Premium Ritual Items</h3>
                
                {product.bundleType === 'accessory' && product.id === 1 && (
                  <>
                    <p className="mb-4">With proper care, your Premium Bamboo Measuring Scoop will remain beautiful and functional for years to come.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Care Instructions:</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Rinse with lukewarm water after each use</li>
                      <li>Avoid soaking or dishwasher exposure</li>
                      <li>Wipe dry immediately with a soft cloth</li>
                      <li>Once a month, apply a small amount of food-safe mineral oil</li>
                      <li>Store in a dry place away from direct sunlight</li>
                    </ul>
                    
                    <div className="bg-brand-sage-mist/10 p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Renewal Recommendation:</h4>
                      <p className="text-sm">To maintain optimal hygiene and beauty, we recommend replacing your bamboo scoop every 12-18 months, depending on frequency of use.</p>
                    </div>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 2 && (
                  <>
                    <p className="mb-4">Your DNA Ritual Ceramic Mug features a premium finish that requires specific care to maintain its beauty and gold accents.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Care Instructions:</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Hand wash only with mild soap and warm water</li>
                      <li>Do not use abrasive cleaners or scrubbing pads</li>
                      <li>Avoid microwave use to preserve the gold accent</li>
                      <li>Allow to air dry or dry with a soft, non-abrasive cloth</li>
                      <li>Store on a shelf or mug tree rather than stacking</li>
                    </ul>
                    
                    <div className="bg-brand-sage-mist/10 p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Removing Stains:</h4>
                      <p className="text-sm">For natural stains from tea or coffee, create a paste with baking soda and water, apply to the stained area, and gently wipe clean after 30 minutes. Rinse thoroughly.</p>
                    </div>
                  </>
                )}
                
                {product.bundleType === 'accessory' && product.id === 3 && (
                  <>
                    <p className="mb-4">Your Mini Portable Blender combines elegant design with practical functionality, requiring specific care to maintain both its appearance and performance.</p>
                    
                    <h4 className="font-medium mt-6 mb-2">Care Instructions:</h4>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                      <li>Rinse immediately after use to prevent residue buildup</li>
                      <li>For thorough cleaning, add warm water and a drop of mild soap, then blend for 10 seconds</li>
                      <li>The glass container is detachable for easy cleaning</li>
                      <li>Do not submerge the base containing the motor</li>
                      <li>Wipe the exterior with a damp cloth only</li>
                      <li>Charge fully at least once a month even if not in use</li>
                    </ul>
                    
                    <div className="bg-brand-sage-mist/10 p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Battery Maintenance:</h4>
                      <p className="text-sm">For optimal battery life, avoid letting the battery completely deplete before recharging. Charge for 2-3 hours until the indicator shows full charge.</p>
                    </div>
                  </>
                )}
                
                {product.bundleType === 'bundle' && (
                  <>
                    <p className="mb-4">Your bundle contains multiple premium items, each requiring specific care. Please refer to the individual care instructions for each item included in your bundle.</p>
                    
                    <p className="mb-4">Regular maintenance of your ritual items not only preserves their beauty but also ensures the continued quality of your wellness experience.</p>
                    
                    <div className="bg-brand-sage-mist/10 p-4 rounded-lg mt-6">
                      <h4 className="font-medium mb-2">Care Reminder Service:</h4>
                      <p className="text-sm">Register your bundle purchase on our website to receive seasonal care reminders and exclusive maintenance tips from Datin Norehan herself.</p>
                    </div>
                  </>
                )}
              </TabsContent>
            </Tabs>
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
