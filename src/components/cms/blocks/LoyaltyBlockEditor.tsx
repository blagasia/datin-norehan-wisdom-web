
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  DragDropContext, 
  Droppable, 
  Draggable 
} from '@/components/ui/dnd';
import { 
  PlusCircle, 
  Trash2, 
  GripVertical,
  ShieldCheck,
  TicketPercent,
  Gift,
  Tag,
  Crown,
  Star,
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoyaltyTier, LoyaltyReward, LoyaltyLevel } from '@/types/loyalty';
import { cn } from '@/lib/utils';
import { loyaltyTiers, loyaltyRewards } from '@/data/loyalty';

export interface LoyaltyBlockContent {
  title: string;
  description: string;
  tiers: LoyaltyTier[];
  rewards: LoyaltyReward[];
}

interface LoyaltyBlockEditorProps {
  content: LoyaltyBlockContent;
  onChange: (content: LoyaltyBlockContent) => void;
  readOnly?: boolean;
}

const ICONS = {
  shieldCheck: ShieldCheck,
  ticketPercent: TicketPercent,
  gift: Gift,
  tag: Tag,
  crown: Crown,
  star: Star,
  award: Award,
  sparkles: Sparkles,
  heart: Heart
};

type IconName = keyof typeof ICONS;

const LoyaltyBlockEditor: React.FC<LoyaltyBlockEditorProps> = ({ 
  content, 
  onChange,
  readOnly = false 
}) => {
  const [activeTab, setActiveTab] = useState<'tiers' | 'rewards'>('tiers');
  
  if (readOnly) {
    return (
      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-playfair mb-3">{content.title}</h2>
          <p className="text-muted-foreground">{content.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.tiers.map((tier) => (
            <Card key={tier.level} className="overflow-hidden">
              <div className={`h-2 ${tier.color}`}></div>
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <Badge variant="outline" className="mb-2">
                    {tier.requiredPoints}+ points
                  </Badge>
                  <h3 className="text-xl font-semibold">{tier.name}</h3>
                </div>
                <ul className="space-y-2">
                  {tier.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <ShieldCheck className="h-4 w-4 mr-2 text-brand-deep-teal shrink-0 mt-0.5" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12">
          <h3 className="text-2xl font-playfair mb-6 text-center">Rewards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {content.rewards.filter(r => r.isActive).map((reward) => (
              <Card key={reward.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-lg font-medium">{reward.title}</h4>
                    <Badge>{reward.pointsCost} pts</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Tag className="h-4 w-4 mr-1" />
                    <span>{reward.rewardCode}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const handleAddTier = () => {
    const newTier: LoyaltyTier = {
      level: 'bronze' as LoyaltyLevel, // Use one of the allowed values from LoyaltyLevel
      name: 'New Tier',
      requiredPoints: 0,
      benefits: ['New benefit'],
      color: 'bg-gray-400'
    };
    
    onChange({
      ...content,
      tiers: [...content.tiers, newTier]
    });
  };

  const handleUpdateTier = (index: number, field: string, value: any) => {
    const updatedTiers = [...content.tiers];
    updatedTiers[index] = {
      ...updatedTiers[index],
      [field]: value
    };
    
    onChange({
      ...content,
      tiers: updatedTiers
    });
  };

  const handleRemoveTier = (index: number) => {
    const updatedTiers = [...content.tiers];
    updatedTiers.splice(index, 1);
    
    onChange({
      ...content,
      tiers: updatedTiers
    });
  };

  const handleAddBenefit = (tierIndex: number) => {
    const updatedTiers = [...content.tiers];
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      benefits: [...updatedTiers[tierIndex].benefits, 'New benefit']
    };
    
    onChange({
      ...content,
      tiers: updatedTiers
    });
  };

  const handleUpdateBenefit = (tierIndex: number, benefitIndex: number, value: string) => {
    const updatedTiers = [...content.tiers];
    const updatedBenefits = [...updatedTiers[tierIndex].benefits];
    updatedBenefits[benefitIndex] = value;
    
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      benefits: updatedBenefits
    };
    
    onChange({
      ...content,
      tiers: updatedTiers
    });
  };

  const handleRemoveBenefit = (tierIndex: number, benefitIndex: number) => {
    const updatedTiers = [...content.tiers];
    const updatedBenefits = [...updatedTiers[tierIndex].benefits];
    updatedBenefits.splice(benefitIndex, 1);
    
    updatedTiers[tierIndex] = {
      ...updatedTiers[tierIndex],
      benefits: updatedBenefits
    };
    
    onChange({
      ...content,
      tiers: updatedTiers
    });
  };

  const handleAddReward = () => {
    const newReward: LoyaltyReward = {
      id: `reward-${Date.now()}`,
      title: 'New Reward',
      description: 'Reward description',
      pointsCost: 100,
      rewardCode: 'REWARD100',
      isActive: true
    };
    
    onChange({
      ...content,
      rewards: [...content.rewards, newReward]
    });
  };

  const handleUpdateReward = (index: number, field: string, value: any) => {
    const updatedRewards = [...content.rewards];
    updatedRewards[index] = {
      ...updatedRewards[index],
      [field]: value
    };
    
    onChange({
      ...content,
      rewards: updatedRewards
    });
  };

  const handleRemoveReward = (index: number) => {
    const updatedRewards = [...content.rewards];
    updatedRewards.splice(index, 1);
    
    onChange({
      ...content,
      rewards: updatedRewards
    });
  };

  const handleDragEndTier = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(content.tiers);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange({
      ...content,
      tiers: items
    });
  };

  const handleDragEndReward = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(content.rewards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange({
      ...content,
      rewards: items
    });
  };

  const getIconFromName = (iconName: string) => {
    if (iconName in ICONS) {
      const IconComponent = ICONS[iconName as IconName];
      return <IconComponent className="h-4 w-4" />;
    }
    return <Star className="h-4 w-4" />;
  };

  // Suggested tiers and rewards from data
  const handleUseSuggestedTiers = () => {
    onChange({
      ...content,
      tiers: loyaltyTiers
    });
  };

  const handleUseSuggestedRewards = () => {
    onChange({
      ...content,
      rewards: loyaltyRewards
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="loyalty-title">Title</Label>
        <Input
          id="loyalty-title"
          value={content.title}
          onChange={(e) => onChange({ ...content, title: e.target.value })}
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="loyalty-description">Description</Label>
        <Textarea
          id="loyalty-description"
          value={content.description}
          onChange={(e) => onChange({ ...content, description: e.target.value })}
          className="mt-2"
        />
      </div>

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'tiers' | 'rewards')}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="tiers">Loyalty Tiers</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tiers" className="pt-4 space-y-6">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleUseSuggestedTiers}
              type="button"
            >
              Use Suggested Tiers
            </Button>
            <Button 
              onClick={handleAddTier}
              variant="outline"
              type="button"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Tier
            </Button>
          </div>
          
          <DragDropContext onDragEnd={handleDragEndTier}>
            <Droppable droppableId="tiers">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {content.tiers.map((tier, index) => (
                    <Draggable key={tier.level} draggableId={tier.level} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border rounded-md overflow-hidden"
                        >
                          <div className={`h-2 ${tier.color}`}></div>
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <div 
                                className="cursor-move" 
                                {...provided.dragHandleProps}
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 mx-2">
                                <h3 className="text-lg font-medium">
                                  {tier.name} ({tier.requiredPoints}+ points)
                                </h3>
                              </div>
                              <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveTier(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`tier-name-${index}`}>Tier Name</Label>
                                <Input
                                  id={`tier-name-${index}`}
                                  value={tier.name}
                                  onChange={(e) => handleUpdateTier(index, 'name', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`tier-points-${index}`}>Required Points</Label>
                                <Input
                                  id={`tier-points-${index}`}
                                  type="number"
                                  value={tier.requiredPoints}
                                  onChange={(e) => handleUpdateTier(index, 'requiredPoints', Number(e.target.value))}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`tier-level-${index}`}>Level</Label>
                                <select
                                  id={`tier-level-${index}`}
                                  value={tier.level}
                                  onChange={(e) => handleUpdateTier(index, 'level', e.target.value)}
                                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1"
                                >
                                  <option value="bronze">Bronze</option>
                                  <option value="silver">Silver</option>
                                  <option value="gold">Gold</option>
                                  <option value="platinum">Platinum</option>
                                </select>
                              </div>
                              <div>
                                <Label htmlFor={`tier-color-${index}`}>Color</Label>
                                <div className="flex items-center space-x-2 mt-1">
                                  <select
                                    id={`tier-color-${index}`}
                                    value={tier.color}
                                    onChange={(e) => handleUpdateTier(index, 'color', e.target.value)}
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                  >
                                    <option value="bg-amber-600">Bronze</option>
                                    <option value="bg-gray-400">Silver</option>
                                    <option value="bg-brand-gilded-gold">Gold</option>
                                    <option value="bg-brand-deep-teal">Platinum</option>
                                    <option value="bg-purple-600">Purple</option>
                                    <option value="bg-indigo-600">Indigo</option>
                                    <option value="bg-rose-600">Rose</option>
                                  </select>
                                  <div className={cn("w-6 h-6 rounded-full", tier.color)}></div>
                                </div>
                              </div>
                            </div>
                            
                            <div>
                              <div className="flex justify-between items-center mb-2">
                                <Label>Benefits</Label>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleAddBenefit(index)}
                                >
                                  <PlusCircle className="h-4 w-4 mr-1" /> Add
                                </Button>
                              </div>
                              <div className="space-y-2">
                                {tier.benefits.map((benefit, benefitIndex) => (
                                  <div 
                                    key={benefitIndex}
                                    className="flex items-center"
                                  >
                                    <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                                    <Input
                                      value={benefit}
                                      onChange={(e) => handleUpdateBenefit(index, benefitIndex, e.target.value)}
                                      className="flex-1"
                                    />
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleRemoveBenefit(index, benefitIndex)}
                                      className="ml-1"
                                    >
                                      <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  
                  {content.tiers.length === 0 && (
                    <div className="border border-dashed rounded-md p-6 text-center">
                      <p className="mb-4 text-muted-foreground">No tiers added yet</p>
                      <Button onClick={handleAddTier} variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add First Tier
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
        
        <TabsContent value="rewards" className="pt-4 space-y-6">
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={handleUseSuggestedRewards}
              type="button"
            >
              Use Suggested Rewards
            </Button>
            <Button 
              onClick={handleAddReward}
              variant="outline"
              type="button"
            >
              <PlusCircle className="h-4 w-4 mr-2" /> Add Reward
            </Button>
          </div>
          
          <DragDropContext onDragEnd={handleDragEndReward}>
            <Droppable droppableId="rewards">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-4"
                >
                  {content.rewards.map((reward, index) => (
                    <Draggable key={reward.id} draggableId={reward.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border rounded-md"
                        >
                          <div className="p-4 space-y-4">
                            <div className="flex justify-between items-center">
                              <div 
                                className="cursor-move" 
                                {...provided.dragHandleProps}
                              >
                                <GripVertical className="h-5 w-5 text-muted-foreground" />
                              </div>
                              <div className="flex-1 mx-2">
                                <h3 className="text-lg font-medium">
                                  {reward.title} ({reward.pointsCost} points)
                                </h3>
                              </div>
                              <Button 
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveReward(index)}
                              >
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`reward-title-${index}`}>Title</Label>
                                <Input
                                  id={`reward-title-${index}`}
                                  value={reward.title}
                                  onChange={(e) => handleUpdateReward(index, 'title', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`reward-points-${index}`}>Points Cost</Label>
                                <Input
                                  id={`reward-points-${index}`}
                                  type="number"
                                  value={reward.pointsCost}
                                  onChange={(e) => handleUpdateReward(index, 'pointsCost', Number(e.target.value))}
                                  className="mt-1"
                                />
                              </div>
                              <div className="col-span-1 md:col-span-2">
                                <Label htmlFor={`reward-description-${index}`}>Description</Label>
                                <Textarea
                                  id={`reward-description-${index}`}
                                  value={reward.description}
                                  onChange={(e) => handleUpdateReward(index, 'description', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div>
                                <Label htmlFor={`reward-code-${index}`}>Reward Code</Label>
                                <Input
                                  id={`reward-code-${index}`}
                                  value={reward.rewardCode}
                                  onChange={(e) => handleUpdateReward(index, 'rewardCode', e.target.value)}
                                  className="mt-1"
                                />
                              </div>
                              <div className="flex items-center space-x-2 self-end">
                                <Label htmlFor={`reward-active-${index}`} className="flex items-center space-x-2 cursor-pointer">
                                  <span>Active</span>
                                  <Switch
                                    id={`reward-active-${index}`}
                                    checked={reward.isActive}
                                    onCheckedChange={(checked) => handleUpdateReward(index, 'isActive', checked)}
                                  />
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                  
                  {content.rewards.length === 0 && (
                    <div className="border border-dashed rounded-md p-6 text-center">
                      <p className="mb-4 text-muted-foreground">No rewards added yet</p>
                      <Button onClick={handleAddReward} variant="outline">
                        <PlusCircle className="h-4 w-4 mr-2" /> Add First Reward
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </TabsContent>
      </Tabs>
      
      <div>
        <h4 className="text-sm font-medium mb-4">Preview</h4>
        <div className="border rounded-md p-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl font-playfair mb-2">{content.title}</h2>
            <p className="text-muted-foreground">{content.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {content.tiers.map((tier) => (
              <Card key={tier.level} className="overflow-hidden">
                <div className={`h-2 ${tier.color}`}></div>
                <CardContent className="pt-6">
                  <div className="text-center mb-4">
                    <Badge variant="outline" className="mb-2">
                      {tier.requiredPoints}+ points
                    </Badge>
                    <h3 className="text-xl font-semibold">{tier.name}</h3>
                  </div>
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start">
                        <Star className="h-4 w-4 mr-2 text-brand-deep-teal shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {content.rewards.length > 0 && (
            <div>
              <h3 className="text-xl font-playfair mb-4 text-center">Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {content.rewards.filter(r => r.isActive).map((reward) => (
                  <Card key={reward.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-lg font-medium">{reward.title}</h4>
                        <Badge>{reward.pointsCost} pts</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{reward.description}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Tag className="h-4 w-4 mr-1" />
                        <span>{reward.rewardCode}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoyaltyBlockEditor;
