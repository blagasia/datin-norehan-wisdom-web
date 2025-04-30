
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useLoyalty } from '@/context/LoyaltyContext';
import { loyaltyTiers, loyaltyRewards } from '@/data/loyalty';
import { Gift, BadgePercent, WalletCards } from 'lucide-react';

const Loyalty = () => {
  const { isLoggedIn, loyaltyUser, register, claimReward } = useLoyalty();
  
  const renderTiers = () => (
    <div className="py-12 bg-gradient-to-r from-brand-gilded-gold/5 to-brand-deep-teal/5">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-semibold text-center mb-12">
          Loyalty Program Tiers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {loyaltyTiers.map((tier) => (
            <div 
              key={tier.level}
              className={`rounded-lg border overflow-hidden shadow-sm transform transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
                isLoggedIn && loyaltyUser?.level === tier.level 
                  ? 'border-brand-gilded-gold ring-2 ring-brand-gilded-gold/30' 
                  : 'border-gray-200'
              }`}
            >
              <div className={`${tier.color} h-2`} />
              <div className="p-6">
                <Badge variant={tier.level === 'gold' ? 'gold' : tier.level === 'platinum' ? 'teal' : 'default'} className="mb-3">
                  {tier.name} Level
                </Badge>
                <h3 className="text-xl font-semibold mb-2 font-playfair">{tier.name}</h3>
                <p className="text-sm text-gray-500 mb-4">
                  {tier.requiredPoints} points required
                </p>
                <div className="space-y-2">
                  {tier.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-brand-gilded-gold mr-2">•</span>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                {isLoggedIn && loyaltyUser?.level === tier.level && (
                  <div className="mt-4 py-2 px-3 bg-brand-gilded-gold/10 text-center rounded-md text-sm">
                    Your current level
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderRewards = () => (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-semibold text-center mb-12">
          Available Rewards
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loyaltyRewards.map((reward) => {
            const isAvailable = isLoggedIn && loyaltyUser && loyaltyUser.points.available >= reward.pointsCost;
            const isRedeemed = isLoggedIn && loyaltyUser && loyaltyUser.rewards.includes(reward.id);
            
            return (
              <div 
                key={reward.id}
                className="rounded-lg border border-gray-200 overflow-hidden shadow-sm"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <Badge variant={reward.discountPercentage ? 'default' : 'gold'} className="mb-3">
                      {reward.discountPercentage ? (
                        <BadgePercent className="h-3 w-3 mr-1" />
                      ) : (
                        <WalletCards className="h-3 w-3 mr-1" />
                      )}
                      {reward.discountPercentage ? 'Discount' : 'Cashback'}
                    </Badge>
                    <span className="text-sm font-semibold bg-brand-sage-mist/40 px-3 py-1 rounded-full">
                      {reward.pointsCost} points
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 font-playfair">{reward.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{reward.description}</p>
                  
                  {reward.validUntil && (
                    <p className="text-xs text-gray-500 mb-3">
                      Valid until: {new Date(reward.validUntil).toLocaleDateString()}
                    </p>
                  )}
                  
                  {isLoggedIn ? (
                    isRedeemed ? (
                      <Button disabled className="w-full">
                        Already Redeemed
                      </Button>
                    ) : (
                      <Button 
                        variant={isAvailable ? "default" : "outline"} 
                        className="w-full"
                        disabled={!isAvailable}
                        onClick={() => claimReward(reward.id)}
                      >
                        <Gift className="h-4 w-4 mr-2" />
                        {isAvailable ? 'Redeem Now' : 'Not Enough Points'}
                      </Button>
                    )
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Login to Redeem
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
  
  const renderHowItWorks = () => (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-playfair font-semibold text-center mb-12">
          How It Works
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-blush-rose/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-medium">1</span>
            </div>
            <h3 className="text-xl font-medium mb-2 font-playfair">Join the Program</h3>
            <p className="text-gray-600">
              Sign up for our loyalty program and receive welcome points instantly
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-sage-mist/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-medium">2</span>
            </div>
            <h3 className="text-xl font-medium mb-2 font-playfair">Earn Points</h3>
            <p className="text-gray-600">
              Earn points with every purchase, participating in events, and reviews
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-brand-gilded-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-medium">3</span>
            </div>
            <h3 className="text-xl font-medium mb-2 font-playfair">Redeem Rewards</h3>
            <p className="text-gray-600">
              Use your points to unlock exclusive discounts, cashbacks, and special perks
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderHero = () => (
    <div className="py-16 md:py-24 bg-gradient-to-r from-brand-gilded-gold/20 to-brand-deep-teal/10">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="loyalty">Exclusive Benefits</Badge>
            <h1 className="text-4xl md:text-5xl font-semibold mt-4 mb-6 font-playfair">
              Datin Norehan Loyalty Program
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Join our community and enjoy exclusive benefits including discounts, cashbacks, and special access to events and products.
            </p>
            
            {!isLoggedIn ? (
              <div className="space-y-4">
                <Button size="lg" onClick={() => register({ email: 'demo@example.com', name: 'Demo User' })}>
                  Join Now
                </Button>
                <p className="text-sm text-gray-500">
                  Already a member? <a href="#" className="text-brand-deep-teal underline">Sign In</a>
                </p>
              </div>
            ) : (
              <Alert variant="loyalty">
                <AlertTitle>Welcome to our loyalty program!</AlertTitle>
                <AlertDescription>
                  You have {loyaltyUser?.points.available} points available to use.
                </AlertDescription>
              </Alert>
            )}
          </div>
          <div className="hidden lg:block">
            <img 
              src="https://images.unsplash.com/photo-1565622871630-8e453c4b6ed9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80" 
              alt="Loyalty Program"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <Navbar />
      <main>
        {renderHero()}
        {renderHowItWorks()}
        {renderTiers()}
        {renderRewards()}
      </main>
      <Footer />
    </>
  );
};

export default Loyalty;
