
import React from 'react';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { loyaltyTiers } from '@/data/loyalty';
import { LoyaltyLevel } from '@/types/loyalty';
import { GiftIcon, WalletIcon } from 'lucide-react';

const LoyaltyWidget = () => {
  const { 
    isLoggedIn, 
    loyaltyUser, 
    currentTier, 
    nextTier,
    pointsToNextTier
  } = useLoyalty();

  if (!isLoggedIn || !loyaltyUser) {
    return null;
  }

  const currentTierData = loyaltyTiers.find(tier => tier.level === currentTier);
  const nextTierData = nextTier 
    ? loyaltyTiers.find(tier => tier.level === nextTier) 
    : null;
  
  // Calculate progress to next tier
  let progressPercentage = 100;
  if (nextTierData && pointsToNextTier) {
    const currentPoints = loyaltyUser.points.total;
    const currentTierPoints = currentTierData?.requiredPoints || 0;
    const pointsRange = nextTierData.requiredPoints - currentTierPoints;
    const earnedPoints = currentPoints - currentTierPoints;
    progressPercentage = Math.min(Math.floor((earnedPoints / pointsRange) * 100), 100);
  }

  // Format tier name with correct capitalization
  const formatTierName = (level: LoyaltyLevel) => {
    return level.charAt(0).toUpperCase() + level.slice(1);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 border border-brand-gilded-gold/30 hover:bg-brand-gilded-gold/10"
        >
          <WalletIcon className="h-4 w-4" />
          <span>{loyaltyUser.points.available}</span>
          <Badge variant="loyalty" className="px-2 text-[10px]">
            {formatTierName(currentTier)}
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 bg-gradient-to-r from-brand-gilded-gold/20 to-brand-deep-teal/10 rounded-t-md">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="loyalty">
              {formatTierName(currentTier)} Member
            </Badge>
            <span className="text-xs text-gray-600">
              Member since {new Date(loyaltyUser.joinedDate).toLocaleDateString()}
            </span>
          </div>
          <h3 className="font-medium text-lg mb-2 font-playfair">
            {loyaltyUser.points.available} points available
          </h3>
          <div className="text-xs text-gray-600 mb-3">
            {loyaltyUser.points.total} lifetime points
          </div>
          
          {nextTierData && (
            <div className="mb-2">
              <div className="flex justify-between text-xs mb-1">
                <span>{formatTierName(currentTier)}</span>
                <span>{formatTierName(nextTier as LoyaltyLevel)}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
              <div className="text-xs text-center mt-1">
                {pointsToNextTier} more points to {formatTierName(nextTier as LoyaltyLevel)}
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <h4 className="font-medium mb-2">Your Benefits</h4>
          <ul className="text-sm space-y-1 mb-4">
            {currentTierData?.benefits.map((benefit, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-brand-gilded-gold">•</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
          
          <Button variant="outline" className="w-full mb-2" size="sm">
            <GiftIcon className="h-4 w-4 mr-2" />
            Redeem Points
          </Button>
          <Button variant="secondary" className="w-full" size="sm">
            View History
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LoyaltyWidget;
