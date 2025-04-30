
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ritualProducts, RitualProduct } from '@/data/rituals';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Package, Palette, Gift, ShoppingBag, 
  Check, ArrowRight, Trash2, Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@/components/ui/dnd';

const accessoryItems = ritualProducts.filter(p => p.bundleType === 'accessory');
const elixirItems = products.slice(0, 5); // Taking first 5 elixirs for demo

const RitualCustom = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');
  const [customName, setCustomName] = useState('');
  const [totalPrice, setTotalPrice] = useState(199);
  
  const handleAddItem = (item: any) => {
    setSelectedItems([...selectedItems, {...item, selectedColor: item.colors?.[0] || null}]);
    // Add simple price calculation
    setTotalPrice(prev => {
      const price = item.price.replace('RM ', '');
      return prev + parseInt(price);
    });
  };
  
  const handleRemoveItem = (index: number) => {
    // Update price before removing
    const itemPrice = selectedItems[index].price.replace('RM ', '');
    setTotalPrice(prev => Math.max(199, prev - parseInt(itemPrice)));
    
    // Remove item
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };
  
  const handleColorChange = (index: number, color: string) => {
    const updatedItems = [...selectedItems];
    updatedItems[index].selectedColor = color;
    setSelectedItems(updatedItems);
  };
  
  const handleCreateBundle = () => {
    // For demonstration purposes
    toast({
      title: "Custom kit created!",
      description: "Your personalized ritual kit has been added to your cart.",
    });
    
    // Navigate to rituals page
    navigate('/rituals');
  };
  
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">Select Your DNA Elixirs</h2>
            <p className="text-natural-gray mb-8">
              Choose the DNA Elixirs you want to include in your ritual kit. These formulations will form the foundation of your wellness routine.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {elixirItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-brand-blush-rose/20 hover:border-brand-blush-rose/50 transition-colors">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3">
                      <Button 
                        size="sm" 
                        className="rounded-full bg-white text-brand-deep-teal hover:bg-brand-blush-rose hover:text-white"
                        onClick={() => handleAddItem(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-brand-gilded-gold mb-2">{item.price}</p>
                    <p className="text-xs text-natural-gray line-clamp-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep(2)}
              className="bg-brand-deep-teal hover:bg-brand-deep-teal/90"
            >
              Continue to Accessories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case 2:
        return (
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">Add Premium Accessories</h2>
            <p className="text-natural-gray mb-8">
              Enhance your ritual with our premium accessories. These tools are designed to complement your elixirs and elevate your daily wellness practice.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {accessoryItems.map((item) => (
                <Card key={item.id} className="overflow-hidden border-brand-blush-rose/20 hover:border-brand-blush-rose/50 transition-colors">
                  <div className="aspect-video overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-3 right-3">
                      <Button 
                        size="sm" 
                        className="rounded-full bg-white text-brand-deep-teal hover:bg-brand-blush-rose hover:text-white"
                        onClick={() => handleAddItem(item)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{item.name}</h3>
                    <p className="text-sm text-brand-gilded-gold mb-2">{item.price}</p>
                    <p className="text-xs text-natural-gray line-clamp-2">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Button 
              onClick={() => setStep(3)}
              className="bg-brand-deep-teal hover:bg-brand-deep-teal/90"
            >
              Continue to Personalization
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        );
        
      case 3:
        return (
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">Personalize Your Ritual Kit</h2>
            <p className="text-natural-gray mb-8">
              Add your personal touch to make this ritual kit uniquely yours. Choose colors, add custom engravings, and select gift options.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div>
                <h3 className="font-semibold text-lg mb-4">Your Selected Items</h3>
                {selectedItems.length === 0 ? (
                  <div className="bg-brand-sage-mist/20 p-6 rounded-lg text-center">
                    <p className="text-natural-gray mb-3">Your ritual kit is empty</p>
                    <Button onClick={() => setStep(1)}>
                      Add Items to Your Kit
                    </Button>
                  </div>
                ) : (
                  <div>
                    <DragDropContext onDragEnd={() => {}}>
                      <Droppable droppableId="selected-items">
                        {(provided) => (
                          <div 
                            ref={provided.innerRef} 
                            {...provided.droppableProps}
                            className="space-y-4"
                          >
                            {selectedItems.map((item, index) => (
                              <Draggable key={`${item.id}-${index}`} draggableId={`${item.id}-${index}`} index={index}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="bg-white rounded-lg border border-brand-blush-rose/20 p-4 flex items-start gap-4"
                                  >
                                    <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                                      <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div className="flex-grow">
                                      <h4 className="font-medium">{item.name}</h4>
                                      <p className="text-sm text-brand-gilded-gold">{item.price}</p>
                                      
                                      {item.colors && item.colors.length > 0 && (
                                        <div className="mt-3">
                                          <Label className="text-xs text-natural-gray mb-1 block">Color:</Label>
                                          <RadioGroup 
                                            value={item.selectedColor} 
                                            onValueChange={(value) => handleColorChange(index, value)}
                                            className="flex flex-wrap gap-2"
                                          >
                                            {item.colors.map((color: string) => (
                                              <div key={color} className="flex items-center space-x-1">
                                                <RadioGroupItem 
                                                  value={color} 
                                                  id={`color-${index}-${color}`} 
                                                  className="h-3 w-3"
                                                />
                                                <Label 
                                                  htmlFor={`color-${index}-${color}`}
                                                  className="text-xs"
                                                >
                                                  {color}
                                                </Label>
                                              </div>
                                            ))}
                                          </RadioGroup>
                                        </div>
                                      )}
                                    </div>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="text-natural-gray hover:text-brand-blush-rose"
                                      onClick={() => handleRemoveItem(index)}
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                    
                    <div className="flex justify-between mt-4">
                      <Button 
                        variant="outline" 
                        className="border-brand-gilded-gold/30"
                        onClick={() => setStep(2)}
                      >
                        Add More Items
                      </Button>
                    </div>
                  </div>
                )}
                
                {/* Custom Engraving Option */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-4">Custom Engraving</h3>
                  <div className="bg-white rounded-lg border border-brand-blush-rose/20 p-4">
                    <Label htmlFor="engraving">Add a name or short message</Label>
                    <Input
                      id="engraving"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      placeholder="Enter text for engraving"
                      className="mt-2"
                      maxLength={20}
                    />
                    <p className="text-xs text-natural-gray mt-1">
                      Will be applied to eligible items • Maximum 20 characters
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg mb-4">Gift Options</h3>
                <div className="bg-white rounded-lg border border-brand-blush-rose/20 p-4 mb-8">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="gift-wrap" 
                      checked={giftWrap} 
                      onCheckedChange={(checked) => setGiftWrap(checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="gift-wrap" className="font-medium">Add luxury gift wrapping</Label>
                      <p className="text-sm text-natural-gray mt-1">
                        Includes premium packaging, satin ribbon, and personalized message card (+RM 25)
                      </p>
                    </div>
                  </div>
                  
                  {giftWrap && (
                    <div className="mt-4 pl-7">
                      <Label htmlFor="gift-message">Gift Message</Label>
                      <Input
                        id="gift-message"
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                        placeholder="Enter your gift message"
                        className="mt-2"
                      />
                    </div>
                  )}
                </div>
                
                <div className="bg-brand-deep-teal/5 rounded-lg border border-brand-deep-teal/20 p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-natural-gray">Base Kit Price</span>
                      <span>RM 199</span>
                    </div>
                    {selectedItems.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-natural-gray">Selected Items ({selectedItems.length})</span>
                        <span>RM {totalPrice - 199}</span>
                      </div>
                    )}
                    {giftWrap && (
                      <div className="flex justify-between">
                        <span className="text-natural-gray">Gift Wrapping</span>
                        <span>RM 25</span>
                      </div>
                    )}
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="flex justify-between font-semibold text-lg mb-6">
                    <span>Total</span>
                    <span>RM {totalPrice + (giftWrap ? 25 : 0)}</span>
                  </div>
                  
                  <Button 
                    onClick={handleCreateBundle}
                    className="w-full bg-brand-gilded-gold hover:bg-brand-gilded-gold/90 text-white"
                    disabled={selectedItems.length === 0}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Create My Custom Kit
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Create Your Custom Ritual Kit</h1>
            <p className="text-natural-gray max-w-2xl mx-auto">
              Design a personalized wellness ritual that perfectly suits your needs by combining our premium DNA Elixirs with handcrafted accessories.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto mb-12">
            <div className="bg-white rounded-lg shadow-sm p-1">
              <Tabs defaultValue={step.toString()} className="w-full">
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger 
                    value="1" 
                    onClick={() => setStep(1)}
                    disabled={step < 1}
                  >
                    1. Select Elixirs
                  </TabsTrigger>
                  <TabsTrigger 
                    value="2" 
                    onClick={() => setStep(2)}
                    disabled={step < 2}
                  >
                    2. Add Accessories
                  </TabsTrigger>
                  <TabsTrigger 
                    value="3" 
                    onClick={() => setStep(3)}
                    disabled={step < 3}
                  >
                    3. Personalize
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          {/* Step Content */}
          <div className="max-w-6xl mx-auto">
            {renderStep()}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RitualCustom;
