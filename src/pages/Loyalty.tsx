
import React, { useState } from 'react';
import { useLoyalty } from '@/context/LoyaltyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import ReferralView from '@/components/loyalty/ReferralView';

const LoyaltyPage = () => {
  const { 
    isLoggedIn, 
    customer, 
    loyaltyUser, 
    availableRewards, 
    currentTier, 
    nextTier, 
    pointsToNextTier,
    login,
    register,
    claimReward
  } = useLoyalty();

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerBirthdate, setRegisterBirthdate] = useState('');
  const [communicationPref, setCommunicationPref] = useState<'email' | 'sms' | 'both' | 'none'>('email');
  const [referralCode, setReferralCode] = useState('');
  
  const [formError, setFormError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsProcessing(true);
    
    if (!loginEmail) {
      setFormError('Email is required');
      setIsProcessing(false);
      return;
    }
    
    const success = await login(loginEmail, loginPassword);
    setIsProcessing(false);
    
    if (!success) {
      setFormError('Invalid login credentials');
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsProcessing(true);
    
    if (!registerEmail) {
      setFormError('Email is required');
      setIsProcessing(false);
      return;
    }
    
    const success = await register({
      email: registerEmail,
      name: registerName,
      phone: registerPhone,
      birthDate: registerBirthdate,
      referredBy: referralCode,
      preferences: {
        communicationPreference: communicationPref,
      }
    });
    
    setIsProcessing(false);
    
    if (!success) {
      setFormError('Registration failed');
    }
  };
  
  const handleClaimReward = async (rewardId: string) => {
    setIsProcessing(true);
    await claimReward(rewardId);
    setIsProcessing(false);
  };
  
  const renderLoginForm = () => (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          type="email" 
          id="email" 
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          placeholder="you@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input 
          type="password" 
          id="password" 
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      
      {formError && <p className="text-sm text-red-500">{formError}</p>}
      
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Sign in'}
      </Button>
    </form>
  );
  
  const renderRegisterForm = () => (
    <form onSubmit={handleRegister} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          type="text" 
          id="name" 
          value={registerName}
          onChange={(e) => setRegisterName(e.target.value)}
          placeholder="Your Name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input 
          type="email" 
          id="register-email" 
          value={registerEmail}
          onChange={(e) => setRegisterEmail(e.target.value)}
          placeholder="you@example.com"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          type="tel" 
          id="phone" 
          value={registerPhone}
          onChange={(e) => setRegisterPhone(e.target.value)}
          placeholder="+60 12 345 6789"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="birthdate">Birth Date</Label>
        <Input 
          type="date" 
          id="birthdate" 
          value={registerBirthdate}
          onChange={(e) => setRegisterBirthdate(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="referral">Referral Code (optional)</Label>
        <Input 
          type="text" 
          id="referral" 
          value={referralCode}
          onChange={(e) => setReferralCode(e.target.value)}
          placeholder="Enter referral code"
        />
      </div>
      
      <div className="space-y-2">
        <Label>Communication Preferences</Label>
        <RadioGroup value={communicationPref} onValueChange={(value) => setCommunicationPref(value as any)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="email" id="email-pref" />
            <Label htmlFor="email-pref">Email</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="sms" id="sms-pref" />
            <Label htmlFor="sms-pref">SMS</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="both" id="both-pref" />
            <Label htmlFor="both-pref">Both</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none-pref" />
            <Label htmlFor="none-pref">None</Label>
          </div>
        </RadioGroup>
      </div>
      
      {formError && <p className="text-sm text-red-500">{formError}</p>}
      
      <Button type="submit" className="w-full" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Register'}
      </Button>
      
      <p className="text-xs text-center text-gray-500">
        By registering, you agree to our Terms of Service and Privacy Policy.
      </p>
    </form>
  );
  
  const renderLoyaltyDashboard = () => (
    <div>
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Loyalty Status</CardTitle>
                    <CardDescription>
                      Welcome, {customer?.name || customer?.email}
                    </CardDescription>
                  </div>
                  <Badge className="capitalize">{currentTier}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Available Points</p>
                    <p className="text-2xl font-bold">{loyaltyUser?.points.available}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Points</p>
                    <p className="text-2xl font-bold">{loyaltyUser?.points.total}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="text-lg font-medium">
                      {new Date(loyaltyUser?.joinedDate || '').toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                {nextTier && pointsToNextTier && (
                  <div className="mt-6">
                    <p className="text-sm mb-2">
                      <span className="font-medium">{pointsToNextTier} more points</span> needed to reach {nextTier.toUpperCase()} level
                    </p>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary"
                        style={{ 
                          width: `${Math.min(100, Math.max(0, (loyaltyUser?.points.total || 0) / (loyaltyUser?.points.total + pointsToNextTier) * 100))}%` 
                        }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="w-full">
                  <p className="mb-2 text-sm font-medium">Recent Activity</p>
                  <div className="space-y-2">
                    {loyaltyUser?.points.history.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex justify-between text-sm">
                        <span>{transaction.description}</span>
                        <span className={transaction.points > 0 ? "text-green-600" : "text-red-600"}>
                          {transaction.points > 0 ? `+${transaction.points}` : transaction.points}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="rewards">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availableRewards.map((reward) => (
              <Card key={reward.id}>
                <CardHeader>
                  <CardTitle>{reward.title}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {reward.discountPercentage && (
                      <p className="text-sm">
                        <span className="font-medium">{reward.discountPercentage}%</span> discount
                      </p>
                    )}
                    {reward.cashbackAmount && (
                      <p className="text-sm">
                        <span className="font-medium">RM {reward.cashbackAmount}</span> cashback
                      </p>
                    )}
                    {reward.minPurchaseAmount && (
                      <p className="text-sm text-gray-500">
                        Min purchase: RM {reward.minPurchaseAmount}
                      </p>
                    )}
                    {reward.validUntil && (
                      <p className="text-sm text-gray-500">
                        Valid until: {new Date(reward.validUntil).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <p className="font-bold">{reward.pointsCost} points</p>
                  <Button 
                    onClick={() => handleClaimReward(reward.id)}
                    disabled={
                      isProcessing || 
                      (loyaltyUser?.points.available || 0) < reward.pointsCost || 
                      (loyaltyUser?.rewards || []).includes(reward.id)
                    }
                    variant={(loyaltyUser?.rewards || []).includes(reward.id) ? "outline" : "default"}
                  >
                    {(loyaltyUser?.rewards || []).includes(reward.id) 
                      ? "Claimed" 
                      : (loyaltyUser?.points.available || 0) < reward.pointsCost
                        ? "Not enough points"
                        : "Claim Reward"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="referrals">
          <ReferralView />
        </TabsContent>
      </Tabs>
    </div>
  );
  
  const renderAuthForms = () => (
    <div className="max-w-md mx-auto">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="mt-4">
          {renderLoginForm()}
        </TabsContent>
        <TabsContent value="register" className="mt-4">
          {renderRegisterForm()}
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <h1 className="text-3xl font-playfair font-semibold text-center mb-2">Loyalty Program</h1>
      <p className="text-center text-gray-600 mb-8">Join our loyalty program to earn points, unlock rewards, and enjoy exclusive benefits</p>
      
      <div className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Earn Points</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Collect points with every purchase and special activities.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Get Rewards</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Redeem your points for exclusive discounts and special offers.</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Refer Friends</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Earn commissions when friends purchase using your referral code.</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {isLoggedIn ? renderLoyaltyDashboard() : renderAuthForms()}
    </div>
  );
};

export default LoyaltyPage;
