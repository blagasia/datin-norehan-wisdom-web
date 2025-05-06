
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge, BadgeCheck, Gift, Award, Star, Users, CircleCheck } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@/components/ui/dnd';

interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  type: 'discount' | 'cashback' | 'product' | 'experience' | 'status';
  value: number;
  minPurchaseAmount?: number;
  validUntil?: string;
  icon: string;
  isActive: boolean;
}

interface LoyaltyChallenge {
  id: string;
  title: string;
  description: string;
  pointsReward: number;
  requirementType: 'purchase' | 'social' | 'engagement' | 'referral';
  requirementValue: number;
  icon: string;
  isActive: boolean;
  deadline?: string;
}

interface LoyaltyBlockContent {
  title: string;
  description: string;
  rewards: LoyaltyReward[];
  challenges: LoyaltyChallenge[];
  tiersEnabled: boolean;
  rewardsEnabled: boolean;
  challengesEnabled: boolean;
  referralsEnabled: boolean;
}

interface LoyaltyBlockEditorProps {
  content: LoyaltyBlockContent;
  onChange: (content: LoyaltyBlockContent) => void;
  readOnly?: boolean;
}

const defaultReward: LoyaltyReward = {
  id: `reward-${Date.now()}`,
  title: 'New Reward',
  description: 'Description of the reward',
  pointsCost: 100,
  type: 'discount',
  value: 10,
  icon: 'gift',
  isActive: true
};

const defaultChallenge: LoyaltyChallenge = {
  id: `challenge-${Date.now()}`,
  title: 'New Challenge',
  description: 'Description of the challenge',
  pointsReward: 50,
  requirementType: 'engagement',
  requirementValue: 1,
  icon: 'star',
  isActive: true
};

const LoyaltyBlockEditor: React.FC<LoyaltyBlockEditorProps> = ({
  content,
  onChange,
  readOnly = false
}) => {
  const [activeRewardId, setActiveRewardId] = useState<string | null>(null);
  const [activeChallengeId, setActiveChallengeId] = useState<string | null>(null);

  // Set default content if not provided
  const safeContent: LoyaltyBlockContent = {
    title: content.title || 'Loyalty Program',
    description: content.description || 'Join our loyalty program and earn rewards',
    rewards: content.rewards || [],
    challenges: content.challenges || [],
    tiersEnabled: content.tiersEnabled ?? true,
    rewardsEnabled: content.rewardsEnabled ?? true,
    challengesEnabled: content.challengesEnabled ?? true,
    referralsEnabled: content.referralsEnabled ?? true
  };

  const handleAddReward = () => {
    const newReward = {
      ...defaultReward,
      id: `reward-${Date.now()}`
    };
    onChange({
      ...safeContent,
      rewards: [...safeContent.rewards, newReward]
    });
    setActiveRewardId(newReward.id);
  };

  const handleUpdateReward = (updatedReward: LoyaltyReward) => {
    onChange({
      ...safeContent,
      rewards: safeContent.rewards.map(reward => 
        reward.id === updatedReward.id ? updatedReward : reward
      )
    });
  };

  const handleDeleteReward = (rewardId: string) => {
    onChange({
      ...safeContent,
      rewards: safeContent.rewards.filter(reward => reward.id !== rewardId)
    });
    setActiveRewardId(null);
  };

  const handleAddChallenge = () => {
    const newChallenge = {
      ...defaultChallenge,
      id: `challenge-${Date.now()}`
    };
    onChange({
      ...safeContent,
      challenges: [...safeContent.challenges, newChallenge]
    });
    setActiveChallengeId(newChallenge.id);
  };

  const handleUpdateChallenge = (updatedChallenge: LoyaltyChallenge) => {
    onChange({
      ...safeContent,
      challenges: safeContent.challenges.map(challenge => 
        challenge.id === updatedChallenge.id ? updatedChallenge : challenge
      )
    });
  };

  const handleDeleteChallenge = (challengeId: string) => {
    onChange({
      ...safeContent,
      challenges: safeContent.challenges.filter(challenge => challenge.id !== challengeId)
    });
    setActiveChallengeId(null);
  };

  const handleRewardDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(safeContent.rewards);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange({
      ...safeContent,
      rewards: items
    });
  };

  const handleChallengeDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(safeContent.challenges);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    onChange({
      ...safeContent,
      challenges: items
    });
  };

  const getRewardIcon = (iconName: string) => {
    switch(iconName) {
      case 'gift': return <Gift className="h-4 w-4" />;
      case 'badge': return <Badge className="h-4 w-4" />;
      case 'award': return <Award className="h-4 w-4" />;
      case 'star': return <Star className="h-4 w-4" />;
      default: return <Gift className="h-4 w-4" />;
    }
  };

  const getChallengeIcon = (iconName: string) => {
    switch(iconName) {
      case 'star': return <Star className="h-4 w-4" />;
      case 'users': return <Users className="h-4 w-4" />;
      case 'check': return <CircleCheck className="h-4 w-4" />;
      case 'badge': return <BadgeCheck className="h-4 w-4" />;
      default: return <Star className="h-4 w-4" />;
    }
  };

  if (readOnly) {
    return (
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">{safeContent.title}</h2>
          <p className="text-muted-foreground">{safeContent.description}</p>
        </div>

        {safeContent.rewardsEnabled && safeContent.rewards.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">Rewards</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeContent.rewards.filter(r => r.isActive).map(reward => (
                <Card key={reward.id} className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-brand-deep-teal to-natural-purple text-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{reward.title}</CardTitle>
                      {getRewardIcon(reward.icon)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">{reward.pointsCost} points</span>
                      <Button size="sm">Redeem</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {safeContent.challengesEnabled && safeContent.challenges.length > 0 && (
          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4 text-center">Challenges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {safeContent.challenges.filter(c => c.isActive).map(challenge => (
                <Card key={challenge.id}>
                  <CardHeader className="bg-gradient-to-r from-natural-purple to-brand-deep-teal text-white">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{challenge.title}</CardTitle>
                      {getChallengeIcon(challenge.icon)}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-semibold">Earn {challenge.pointsReward} points</span>
                      <Button size="sm" variant="outline">Complete</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="loyalty-title">Title</Label>
        <Input
          id="loyalty-title"
          value={safeContent.title}
          onChange={(e) => onChange({ ...safeContent, title: e.target.value })}
          placeholder="Enter loyalty program title"
          className="mt-2"
        />
      </div>

      <div>
        <Label htmlFor="loyalty-description">Description</Label>
        <Textarea
          id="loyalty-description"
          value={safeContent.description}
          onChange={(e) => onChange({ ...safeContent, description: e.target.value })}
          placeholder="Enter loyalty program description"
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center space-x-2">
          <Switch 
            checked={safeContent.tiersEnabled}
            onCheckedChange={(checked) => onChange({ ...safeContent, tiersEnabled: checked })}
            id="tiers-enabled"
          />
          <Label htmlFor="tiers-enabled">Enable Tiers</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={safeContent.rewardsEnabled}
            onCheckedChange={(checked) => onChange({ ...safeContent, rewardsEnabled: checked })}
            id="rewards-enabled"
          />
          <Label htmlFor="rewards-enabled">Enable Rewards</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={safeContent.challengesEnabled}
            onCheckedChange={(checked) => onChange({ ...safeContent, challengesEnabled: checked })}
            id="challenges-enabled"
          />
          <Label htmlFor="challenges-enabled">Enable Challenges</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch 
            checked={safeContent.referralsEnabled}
            onCheckedChange={(checked) => onChange({ ...safeContent, referralsEnabled: checked })}
            id="referrals-enabled"
          />
          <Label htmlFor="referrals-enabled">Enable Referrals</Label>
        </div>
      </div>

      <Tabs defaultValue="rewards" className="mt-6">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rewards" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Rewards</h3>
            <Button onClick={handleAddReward} size="sm">
              Add Reward
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-4">
              <DragDropContext onDragEnd={handleRewardDragEnd}>
                <Droppable droppableId="rewards-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {safeContent.rewards.length === 0 ? (
                        <div className="text-center p-4 border border-dashed rounded-md">
                          <p className="text-muted-foreground">No rewards yet. Add your first reward.</p>
                        </div>
                      ) : (
                        safeContent.rewards.map((reward, index) => (
                          <Draggable 
                            key={reward.id}
                            draggableId={reward.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`border rounded-md p-3 flex justify-between items-center ${activeRewardId === reward.id ? 'border-primary' : ''}`}
                                onClick={() => setActiveRewardId(reward.id)}
                              >
                                <div className="flex items-center">
                                  {getRewardIcon(reward.icon)}
                                  <span className="ml-2">{reward.title}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {!reward.isActive && <Badge variant="outline" className="mr-2">Inactive</Badge>}
                                  <span className="text-sm text-muted-foreground">{reward.pointsCost} pts</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div>
              {activeRewardId && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Edit Reward</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {safeContent.rewards.map(reward => {
                      if (reward.id !== activeRewardId) return null;
                      
                      return (
                        <div key={reward.id} className="space-y-4">
                          <div>
                            <Label htmlFor="reward-title">Title</Label>
                            <Input
                              id="reward-title"
                              value={reward.title}
                              onChange={(e) => handleUpdateReward({ ...reward, title: e.target.value })}
                              placeholder="Reward title"
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="reward-description">Description</Label>
                            <Textarea
                              id="reward-description"
                              value={reward.description}
                              onChange={(e) => handleUpdateReward({ ...reward, description: e.target.value })}
                              placeholder="Reward description"
                              className="mt-2"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="reward-points">Points Cost</Label>
                              <Input
                                id="reward-points"
                                type="number"
                                value={reward.pointsCost}
                                onChange={(e) => handleUpdateReward({ ...reward, pointsCost: parseInt(e.target.value) || 0 })}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="reward-type">Type</Label>
                              <Select
                                value={reward.type}
                                onValueChange={(value) => handleUpdateReward({ 
                                  ...reward, 
                                  type: value as LoyaltyReward['type']
                                })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="discount">Discount</SelectItem>
                                  <SelectItem value="cashback">Cashback</SelectItem>
                                  <SelectItem value="product">Free Product</SelectItem>
                                  <SelectItem value="experience">Experience</SelectItem>
                                  <SelectItem value="status">Status Upgrade</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="reward-value">Value</Label>
                              <Input
                                id="reward-value"
                                type="number"
                                value={reward.value}
                                onChange={(e) => handleUpdateReward({ ...reward, value: parseFloat(e.target.value) || 0 })}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="reward-icon">Icon</Label>
                              <Select
                                value={reward.icon}
                                onValueChange={(value) => handleUpdateReward({ ...reward, icon: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="gift">Gift</SelectItem>
                                  <SelectItem value="badge">Badge</SelectItem>
                                  <SelectItem value="award">Award</SelectItem>
                                  <SelectItem value="star">Star</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={reward.isActive}
                              onCheckedChange={(checked) => handleUpdateReward({ ...reward, isActive: checked })}
                              id="reward-active"
                            />
                            <Label htmlFor="reward-active">Active</Label>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteReward(reward.id)}
                            >
                              Delete Reward
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="challenges" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Manage Challenges</h3>
            <Button onClick={handleAddChallenge} size="sm">
              Add Challenge
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-md p-4">
              <DragDropContext onDragEnd={handleChallengeDragEnd}>
                <Droppable droppableId="challenges-list">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {safeContent.challenges.length === 0 ? (
                        <div className="text-center p-4 border border-dashed rounded-md">
                          <p className="text-muted-foreground">No challenges yet. Add your first challenge.</p>
                        </div>
                      ) : (
                        safeContent.challenges.map((challenge, index) => (
                          <Draggable 
                            key={challenge.id}
                            draggableId={challenge.id}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`border rounded-md p-3 flex justify-between items-center ${activeChallengeId === challenge.id ? 'border-primary' : ''}`}
                                onClick={() => setActiveChallengeId(challenge.id)}
                              >
                                <div className="flex items-center">
                                  {getChallengeIcon(challenge.icon)}
                                  <span className="ml-2">{challenge.title}</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {!challenge.isActive && <Badge variant="outline" className="mr-2">Inactive</Badge>}
                                  <span className="text-sm text-muted-foreground">+{challenge.pointsReward} pts</span>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <div>
              {activeChallengeId && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Edit Challenge</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {safeContent.challenges.map(challenge => {
                      if (challenge.id !== activeChallengeId) return null;
                      
                      return (
                        <div key={challenge.id} className="space-y-4">
                          <div>
                            <Label htmlFor="challenge-title">Title</Label>
                            <Input
                              id="challenge-title"
                              value={challenge.title}
                              onChange={(e) => handleUpdateChallenge({ ...challenge, title: e.target.value })}
                              placeholder="Challenge title"
                              className="mt-2"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="challenge-description">Description</Label>
                            <Textarea
                              id="challenge-description"
                              value={challenge.description}
                              onChange={(e) => handleUpdateChallenge({ ...challenge, description: e.target.value })}
                              placeholder="Challenge description"
                              className="mt-2"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="challenge-points">Points Reward</Label>
                              <Input
                                id="challenge-points"
                                type="number"
                                value={challenge.pointsReward}
                                onChange={(e) => handleUpdateChallenge({ ...challenge, pointsReward: parseInt(e.target.value) || 0 })}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="challenge-type">Requirement Type</Label>
                              <Select
                                value={challenge.requirementType}
                                onValueChange={(value) => handleUpdateChallenge({ 
                                  ...challenge, 
                                  requirementType: value as LoyaltyChallenge['requirementType'] 
                                })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="purchase">Purchase</SelectItem>
                                  <SelectItem value="social">Social Share</SelectItem>
                                  <SelectItem value="engagement">Engagement</SelectItem>
                                  <SelectItem value="referral">Referral</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="challenge-value">Requirement Value</Label>
                              <Input
                                id="challenge-value"
                                type="number"
                                value={challenge.requirementValue}
                                onChange={(e) => handleUpdateChallenge({ ...challenge, requirementValue: parseInt(e.target.value) || 0 })}
                                className="mt-2"
                              />
                            </div>
                            
                            <div>
                              <Label htmlFor="challenge-icon">Icon</Label>
                              <Select
                                value={challenge.icon}
                                onValueChange={(value) => handleUpdateChallenge({ ...challenge, icon: value })}
                              >
                                <SelectTrigger className="mt-2">
                                  <SelectValue placeholder="Select icon" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="star">Star</SelectItem>
                                  <SelectItem value="users">Users</SelectItem>
                                  <SelectItem value="check">Check</SelectItem>
                                  <SelectItem value="badge">Badge</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={challenge.isActive}
                              onCheckedChange={(checked) => handleUpdateChallenge({ ...challenge, isActive: checked })}
                              id="challenge-active"
                            />
                            <Label htmlFor="challenge-active">Active</Label>
                          </div>
                          
                          <div className="flex justify-end space-x-2 pt-2">
                            <Button 
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteChallenge(challenge.id)}
                            >
                              Delete Challenge
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Preview */}
      <div className="mt-8 border-t pt-4">
        <h3 className="text-lg font-medium mb-4">Preview</h3>
        <div className="border rounded-md p-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">{safeContent.title}</h2>
            <p className="text-muted-foreground">{safeContent.description}</p>
          </div>

          {safeContent.rewardsEnabled && safeContent.rewards.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {safeContent.rewards.filter(r => r.isActive).slice(0, 3).map(reward => (
                  <Card key={reward.id} className="overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-brand-deep-teal to-natural-purple text-white p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{reward.title}</CardTitle>
                        {getRewardIcon(reward.icon)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">{reward.pointsCost} points</span>
                        <Button size="sm">Redeem</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {safeContent.challengesEnabled && safeContent.challenges.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Challenges</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {safeContent.challenges.filter(c => c.isActive).slice(0, 3).map(challenge => (
                  <Card key={challenge.id}>
                    <CardHeader className="bg-gradient-to-r from-natural-purple to-brand-deep-teal text-white p-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{challenge.title}</CardTitle>
                        {getChallengeIcon(challenge.icon)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground mb-4">{challenge.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold">Earn {challenge.pointsReward} points</span>
                        <Button size="sm" variant="outline">Complete</Button>
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
