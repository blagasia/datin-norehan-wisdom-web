import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@/components/ui/dnd';
import { Promotion, LoyaltyReward } from '@/types/loyalty';
import { defaultPromotions, loyaltyRewards } from '@/data/loyalty';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

// Mock function to simulate saving to database
const saveToDatabase = (data: any, type: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(`cms_${type}`, JSON.stringify(data));
      resolve(true);
    }, 500);
  });
};

const LoyaltyManager = () => {
  const [promotions, setPromotions] = useState<Promotion[]>([...defaultPromotions]);
  const [rewards, setRewards] = useState<LoyaltyReward[]>([...loyaltyRewards]);
  const [selectedPromotion, setSelectedPromotion] = useState<Promotion | null>(null);
  const [selectedReward, setSelectedReward] = useState<LoyaltyReward | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Load saved data from localStorage
  useEffect(() => {
    const savedPromotions = localStorage.getItem('cms_promotions');
    if (savedPromotions) {
      try {
        setPromotions(JSON.parse(savedPromotions));
      } catch (e) {
        console.error('Failed to parse saved promotions', e);
      }
    }
    
    const savedRewards = localStorage.getItem('cms_rewards');
    if (savedRewards) {
      try {
        setRewards(JSON.parse(savedRewards));
      } catch (e) {
        console.error('Failed to parse saved rewards', e);
      }
    }
  }, []);

  const handlePromotionChange = (field: keyof Promotion, value: any) => {
    if (!selectedPromotion) return;
    
    setSelectedPromotion({
      ...selectedPromotion,
      [field]: value
    });
  };

  const handleContentChange = (field: keyof Promotion['content'], value: any) => {
    if (!selectedPromotion) return;
    
    setSelectedPromotion({
      ...selectedPromotion,
      content: {
        ...selectedPromotion.content,
        [field]: value
      }
    });
  };

  const handleSavePromotion = async () => {
    if (!selectedPromotion) return;
    
    setIsSaving(true);
    
    try {
      const updatedPromotions = promotions.map(p => 
        p.id === selectedPromotion.id ? selectedPromotion : p
      );
      
      await saveToDatabase(updatedPromotions, 'promotions');
      setPromotions(updatedPromotions);
      
      toast({
        title: "Promotion saved",
        description: "The promotion has been successfully updated",
      });
    } catch (error) {
      toast({
        title: "Error saving promotion",
        description: "There was an error saving the promotion",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeletePromotion = async (id: string) => {
    try {
      const updatedPromotions = promotions.filter(p => p.id !== id);
      
      await saveToDatabase(updatedPromotions, 'promotions');
      setPromotions(updatedPromotions);
      
      if (selectedPromotion?.id === id) {
        setSelectedPromotion(null);
      }
      
      toast({
        title: "Promotion deleted",
        description: "The promotion has been successfully deleted",
      });
    } catch (error) {
      toast({
        title: "Error deleting promotion",
        description: "There was an error deleting the promotion",
        variant: "destructive",
      });
    }
  };

  const handleAddPromotion = () => {
    const newPromotion: Promotion = {
      id: `promo_${Date.now()}`,
      title: "New Promotion",
      description: "Description of the new promotion",
      type: "popup",
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
      targetPages: ["/"],
      content: {
        heading: "New Promotion Heading",
        subheading: "New Promotion Subheading",
        buttonText: "Sign Up",
        formFields: ["email"],
      },
      displayFrequency: "once",
      priority: 1
    };
    
    const updatedPromotions = [...promotions, newPromotion];
    setPromotions(updatedPromotions);
    setSelectedPromotion(newPromotion);
    
    // Save to localStorage
    saveToDatabase(updatedPromotions, 'promotions');
  };

  const handleDragEnd = async (result: { source: { index: number }; destination?: { index: number } }) => {
    if (!result.destination) return;
    
    const items = Array.from(promotions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setPromotions(items);
    await saveToDatabase(items, 'promotions');
  };

  const renderPromotionsTab = () => (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Manage Promotions</h2>
        <Button onClick={handleAddPromotion}>Add New Promotion</Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 border rounded-md overflow-hidden">
          <div className="bg-gray-50 p-3 border-b">
            <h3 className="font-medium">Promotions</h3>
          </div>
          
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="promotions">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="max-h-[500px] overflow-y-auto"
                >
                  {promotions.map((promo, index) => (
                    <Draggable key={promo.id} draggableId={promo.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`p-3 border-b cursor-pointer hover:bg-gray-50 ${
                            selectedPromotion?.id === promo.id ? 'bg-brand-blush-rose/10' : ''
                          }`}
                          onClick={() => setSelectedPromotion(promo)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{promo.title}</p>
                              <p className="text-xs text-gray-500">
                                {promo.type === 'popup' ? 'Popup' : 'Landing Page'}
                              </p>
                            </div>
                            <div>
                              {promo.isActive ? (
                                <Badge variant="secondary">Active</Badge>
                              ) : (
                                <Badge variant="outline">Inactive</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
        
        <div className="col-span-2">
          {selectedPromotion ? (
            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Edit Promotion</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={selectedPromotion.title}
                    onChange={(e) => handlePromotionChange('title', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <select
                    id="type"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={selectedPromotion.type}
                    onChange={(e) => handlePromotionChange('type', e.target.value)}
                  >
                    <option value="popup">Popup</option>
                    <option value="banner">Banner</option>
                    <option value="landing-page">Landing Page</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input 
                    id="startDate" 
                    type="date"
                    value={selectedPromotion.startDate}
                    onChange={(e) => handlePromotionChange('startDate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input 
                    id="endDate" 
                    type="date"
                    value={selectedPromotion.endDate}
                    onChange={(e) => handlePromotionChange('endDate', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetPages">Target Pages (comma separated)</Label>
                  <Input 
                    id="targetPages" 
                    value={selectedPromotion.targetPages.join(', ')}
                    onChange={(e) => handlePromotionChange('targetPages', e.target.value.split(',').map(p => p.trim()))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="displayFrequency">Display Frequency</Label>
                  <select
                    id="displayFrequency"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={selectedPromotion.displayFrequency || 'once'}
                    onChange={(e) => handlePromotionChange('displayFrequency', e.target.value)}
                  >
                    <option value="once">Once</option>
                    <option value="always">Always</option>
                    <option value="daily">Daily</option>
                    <option value="sessionBased">Session Based</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority (higher = more important)</Label>
                  <Input 
                    id="priority" 
                    type="number"
                    min="1"
                    value={selectedPromotion.priority}
                    onChange={(e) => handlePromotionChange('priority', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="displayDelay">Display Delay (seconds)</Label>
                  <Input 
                    id="displayDelay" 
                    type="number"
                    min="0"
                    value={selectedPromotion.displayDelay || 0}
                    onChange={(e) => handlePromotionChange('displayDelay', Number(e.target.value))}
                  />
                </div>
                
                <div className="space-y-2 flex items-center col-span-2">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      checked={selectedPromotion.isActive}
                      onCheckedChange={(checked) => handlePromotionChange('isActive', checked)}
                    />
                    <Label>Active</Label>
                  </div>
                </div>
              </div>
              
              <h4 className="text-md font-medium mb-3 mt-6">Content Settings</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="heading">Heading</Label>
                  <Input 
                    id="heading" 
                    value={selectedPromotion.content.heading}
                    onChange={(e) => handleContentChange('heading', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subheading">Subheading</Label>
                  <Input 
                    id="subheading" 
                    value={selectedPromotion.content.subheading || ''}
                    onChange={(e) => handleContentChange('subheading', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input 
                    id="imageUrl" 
                    value={selectedPromotion.content.imageUrl || ''}
                    onChange={(e) => handleContentChange('imageUrl', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input 
                    id="buttonText" 
                    value={selectedPromotion.content.buttonText}
                    onChange={(e) => handleContentChange('buttonText', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2 col-span-2">
                  <Label>Form Fields</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {['name', 'email', 'phone', 'birthdate'].map(field => (
                      <div key={field} className="flex items-center space-x-2">
                        <input 
                          type="checkbox" 
                          id={`field-${field}`}
                          checked={selectedPromotion.content.formFields?.includes(field as any) || false}
                          onChange={(e) => {
                            const fields = [...(selectedPromotion.content.formFields || [])];
                            if (e.target.checked) {
                              fields.push(field as any);
                            } else {
                              const index = fields.indexOf(field as any);
                              if (index !== -1) fields.splice(index, 1);
                            }
                            handleContentChange('formFields', fields);
                          }}
                        />
                        <Label htmlFor={`field-${field}`}>{field}</Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2 col-span-2">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="loyaltySignup"
                      checked={selectedPromotion.content.loyaltySignup || false}
                      onChange={(e) => handleContentChange('loyaltySignup', e.target.checked)}
                    />
                    <Label htmlFor="loyaltySignup">Sign up for Loyalty Program</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountCode">Discount Code</Label>
                  <Input 
                    id="discountCode" 
                    value={selectedPromotion.content.discountCode || ''}
                    onChange={(e) => handleContentChange('discountCode', e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="discountValue">Discount Value</Label>
                    <Input 
                      id="discountValue" 
                      type="number"
                      value={selectedPromotion.content.discountValue || ''}
                      onChange={(e) => handleContentChange('discountValue', Number(e.target.value))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discountUnit">Unit</Label>
                    <select
                      id="discountUnit"
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={selectedPromotion.content.discountUnit || 'percentage'}
                      onChange={(e) => handleContentChange('discountUnit', e.target.value)}
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (RM)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between mt-6">
                <Button variant="destructive" onClick={() => handleDeletePromotion(selectedPromotion.id)}>
                  Delete
                </Button>
                <Button onClick={handleSavePromotion} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </div>
          ) : (
            <div className="border rounded-md p-6 flex items-center justify-center h-full">
              <p className="text-gray-500">Select a promotion to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderRewardsTab = () => (
    <div>
      <h2 className="text-xl font-semibold mb-6">Manage Rewards</h2>
      <p>Coming soon: Ability to create and manage custom loyalty rewards.</p>
    </div>
  );

  const renderStatisticsTab = () => (
    <div>
      <h2 className="text-xl font-semibold mb-6">Loyalty Statistics</h2>
      <p>Coming soon: Analytics dashboard for loyalty program performance.</p>
    </div>
  );

  return (
    <div>
      <Tabs defaultValue="promotions">
        <TabsList className="mb-6">
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="promotions">
          {renderPromotionsTab()}
        </TabsContent>
        
        <TabsContent value="rewards">
          {renderRewardsTab()}
        </TabsContent>
        
        <TabsContent value="statistics">
          {renderStatisticsTab()}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoyaltyManager;
