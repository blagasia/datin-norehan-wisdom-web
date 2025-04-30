
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  LoyaltyUser, 
  Customer, 
  LoyaltyLevel,
  LoyaltyPoints, 
  LoyaltyReward,
  LoyaltyTransaction,
  Referral,
  CommissionTier
} from '@/types/loyalty';
import { loyaltyTiers, loyaltyRewards } from '@/data/loyalty';
import { commissionTiers, generateReferralCode, calculateCommission, getCommissionTier, sampleReferrals } from '@/data/referral';
import { useToast } from '@/hooks/use-toast';

interface LoyaltyContextType {
  isLoggedIn: boolean;
  customer: Customer | null;
  loyaltyUser: LoyaltyUser | null;
  availableRewards: LoyaltyReward[];
  currentTier: LoyaltyLevel;
  nextTier: LoyaltyLevel | null;
  pointsToNextTier: number | null;
  referrals: Referral[];
  commissionTier: CommissionTier | null;
  totalReferralValue: number;
  totalCommissionEarned: number;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (customerData: Partial<Customer>) => Promise<boolean>;
  claimReward: (rewardId: string) => Promise<boolean>;
  addPoints: (points: number, description: string) => Promise<boolean>;
  generateReferralLink: () => string;
  trackReferral: (referralCode: string, productId: string, amount: number) => Promise<boolean>;
}

const LoyaltyContext = createContext<LoyaltyContextType | undefined>(undefined);

export const useLoyalty = () => {
  const context = useContext(LoyaltyContext);
  if (context === undefined) {
    throw new Error('useLoyalty must be used within a LoyaltyProvider');
  }
  return context;
};

interface LoyaltyProviderProps {
  children: ReactNode;
}

export const LoyaltyProvider: React.FC<LoyaltyProviderProps> = ({ children }) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loyaltyUser, setLoyaltyUser] = useState<LoyaltyUser | null>(null);
  const { toast } = useToast();

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedCustomer = localStorage.getItem('customer');
    const storedLoyalty = localStorage.getItem('loyaltyUser');
    
    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer));
      } catch (e) {
        console.error('Failed to parse customer data', e);
      }
    }
    
    if (storedLoyalty) {
      try {
        setLoyaltyUser(JSON.parse(storedLoyalty));
      } catch (e) {
        console.error('Failed to parse loyalty data', e);
      }
    }
  }, []);

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (customer) {
      localStorage.setItem('customer', JSON.stringify(customer));
    }
    
    if (loyaltyUser) {
      localStorage.setItem('loyaltyUser', JSON.stringify(loyaltyUser));
    }
  }, [customer, loyaltyUser]);

  const login = async (email: string, password: string) => {
    // In a real app, this would call an API
    // For demo, we'll just check if user exists in localStorage
    const storedCustomer = localStorage.getItem('customer');
    
    if (storedCustomer) {
      try {
        const parsedCustomer = JSON.parse(storedCustomer);
        if (parsedCustomer.email === email) {
          setCustomer(parsedCustomer);
          
          const storedLoyalty = localStorage.getItem('loyaltyUser');
          if (storedLoyalty) {
            setLoyaltyUser(JSON.parse(storedLoyalty));
          }
          
          toast({
            title: "Login successful",
            description: "Welcome back!",
          });
          return true;
        }
      } catch (e) {
        console.error('Failed to parse stored customer', e);
      }
    }
    
    toast({
      title: "Login failed",
      description: "Invalid email or password",
      variant: "destructive"
    });
    return false;
  };

  const logout = () => {
    setCustomer(null);
    setLoyaltyUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out",
    });
  };

  const register = async (customerData: Partial<Customer>) => {
    if (!customerData.email) {
      toast({
        title: "Registration failed",
        description: "Email is required",
        variant: "destructive"
      });
      return false;
    }
    
    // Generate referral code for the new customer
    const referralCode = generateReferralCode(`cus_${Date.now()}`);
    
    // Create new customer
    const newCustomer: Customer = {
      id: `cus_${Date.now()}`,
      email: customerData.email,
      name: customerData.name || '',
      phone: customerData.phone || '',
      joinedDate: new Date().toISOString(),
      birthDate: customerData.birthDate,
      referralCode: referralCode,
      referredBy: customerData.referredBy,
      preferences: customerData.preferences || {
        communicationPreference: 'email',
      },
    };
    
    // Create loyalty account
    const newLoyaltyUser: LoyaltyUser = {
      id: `loy_${Date.now()}`,
      customerId: newCustomer.id,
      points: {
        total: 100, // Welcome bonus
        available: 100,
        history: [{
          id: `trx_${Date.now()}`,
          date: new Date().toISOString(),
          description: 'Welcome bonus',
          points: 100,
          type: 'earned' as const
        }]
      },
      level: 'bronze',
      joinedDate: new Date().toISOString(),
      rewards: [],
      referrals: [],
      commissionTier: commissionTiers[0] // Start at the lowest tier
    };
    
    // Link the two accounts
    newCustomer.loyaltyId = newLoyaltyUser.id;
    
    setCustomer(newCustomer);
    setLoyaltyUser(newLoyaltyUser);
    
    let message = "Welcome to our loyalty program! You've earned 100 welcome points.";
    
    // If the user was referred by someone, track that referral
    if (customerData.referredBy) {
      message += " Your referral has been recorded.";
    }
    
    toast({
      title: "Registration successful",
      description: message,
    });
    return true;
  };

  const claimReward = async (rewardId: string) => {
    if (!loyaltyUser) {
      toast({
        title: "Not logged in",
        description: "Please log in to claim rewards",
        variant: "destructive"
      });
      return false;
    }
    
    const reward = loyaltyRewards.find(r => r.id === rewardId);
    
    if (!reward) {
      toast({
        title: "Reward not found",
        description: "The selected reward doesn't exist",
        variant: "destructive"
      });
      return false;
    }
    
    if (loyaltyUser.points.available < reward.pointsCost) {
      toast({
        title: "Insufficient points",
        description: `You need ${reward.pointsCost} points to claim this reward`,
        variant: "destructive"
      });
      return false;
    }
    
    // Update loyalty user
    const newTransaction: LoyaltyTransaction = {
      id: `trx_${Date.now()}`,
      date: new Date().toISOString(),
      description: `Redeemed: ${reward.title}`,
      points: -reward.pointsCost,
      type: 'redeemed' as const // Explicitly define as 'redeemed'
    };
    
    const updatedLoyaltyUser = {
      ...loyaltyUser,
      points: {
        ...loyaltyUser.points,
        available: loyaltyUser.points.available - reward.pointsCost,
        history: [
          ...loyaltyUser.points.history,
          newTransaction
        ]
      },
      rewards: [...loyaltyUser.rewards, rewardId]
    };
    
    setLoyaltyUser(updatedLoyaltyUser);
    
    toast({
      title: "Reward claimed",
      description: `You've successfully claimed: ${reward.title}`,
    });
    return true;
  };

  const addPoints = async (points: number, description: string) => {
    if (!loyaltyUser) {
      toast({
        title: "Not logged in",
        description: "Please log in to earn points",
        variant: "destructive"
      });
      return false;
    }
    
    // Create transaction
    const transaction: LoyaltyTransaction = {
      id: `trx_${Date.now()}`,
      date: new Date().toISOString(),
      description,
      points,
      type: 'earned' as const // Explicitly define as 'earned'
    };
    
    // Update loyalty user
    const newTotal = loyaltyUser.points.total + points;
    const newAvailable = loyaltyUser.points.available + points;
    
    // Determine new loyalty level
    let newLevel = loyaltyUser.level;
    for (let i = loyaltyTiers.length - 1; i >= 0; i--) {
      if (newTotal >= loyaltyTiers[i].requiredPoints) {
        newLevel = loyaltyTiers[i].level;
        break;
      }
    }
    
    const updatedLoyaltyUser = {
      ...loyaltyUser,
      level: newLevel,
      points: {
        total: newTotal,
        available: newAvailable,
        history: [...loyaltyUser.points.history, transaction]
      }
    };
    
    setLoyaltyUser(updatedLoyaltyUser);
    
    // Check if user leveled up
    if (newLevel !== loyaltyUser.level) {
      toast({
        title: "Level Up!",
        description: `Congratulations! You've reached ${newLevel.toUpperCase()} level!`,
      });
    } else {
      toast({
        title: "Points earned",
        description: `You've earned ${points} points!`,
      });
    }
    
    return true;
  };

  // Referral system functions
  const generateReferralLink = () => {
    if (!customer || !customer.referralCode) {
      return "";
    }
    
    // In a real app, this would generate a proper link to your site with the referral code
    return `https://datinnorehan.com/join?ref=${customer.referralCode}`;
  };

  const trackReferral = async (referralCode: string, productId: string, amount: number): Promise<boolean> => {
    // Find customer with this referral code
    const storedCustomers = localStorage.getItem('allCustomers');
    let referrer: Customer | null = null;
    
    if (storedCustomers) {
      try {
        const customers: Customer[] = JSON.parse(storedCustomers);
        referrer = customers.find(c => c.referralCode === referralCode) || null;
      } catch (e) {
        console.error('Failed to parse stored customers', e);
      }
    }
    
    if (!referrer || !referrer.loyaltyId) {
      toast({
        title: "Invalid referral",
        description: "The referral code is not valid",
        variant: "destructive"
      });
      return false;
    }
    
    // Find referrer's loyalty account
    const storedLoyaltyUsers = localStorage.getItem('allLoyaltyUsers');
    let referrerLoyalty: LoyaltyUser | null = null;
    
    if (storedLoyaltyUsers) {
      try {
        const loyaltyUsers: LoyaltyUser[] = JSON.parse(storedLoyaltyUsers);
        referrerLoyalty = loyaltyUsers.find(lu => lu.id === referrer?.loyaltyId) || null;
      } catch (e) {
        console.error('Failed to parse stored loyalty users', e);
      }
    }
    
    if (!referrerLoyalty) {
      toast({
        title: "Error processing referral",
        description: "Could not find referrer's loyalty account",
        variant: "destructive"
      });
      return false;
    }
    
    // Calculate commission
    const commission = calculateCommission(
      productId, 
      amount, 
      referrerLoyalty.commissionTier?.id
    );
    
    // Create new referral record
    const newReferral: Referral = {
      id: `ref_${Date.now()}`,
      referrerId: referrerLoyalty.id,
      referredCustomerId: customer?.id || 'unknown',
      date: new Date().toISOString(),
      status: 'completed',
      productId,
      purchaseAmount: amount,
      commissionEarned: commission
    };
    
    // Update referrer's loyalty account
    const updatedReferrerLoyalty = {
      ...referrerLoyalty,
      referrals: [
        ...(referrerLoyalty.referrals || []),
        newReferral
      ]
    };
    
    // Update referrer's commission tier based on new total referral value
    const totalReferralValue = [...(updatedReferrerLoyalty.referrals || [])].reduce(
      (sum, ref) => sum + (ref.purchaseAmount || 0),
      0
    );
    
    updatedReferrerLoyalty.commissionTier = getCommissionTier(totalReferralValue);
    
    // Save updated loyalty user to localStorage
    if (storedLoyaltyUsers) {
      try {
        const loyaltyUsers: LoyaltyUser[] = JSON.parse(storedLoyaltyUsers);
        const updatedLoyaltyUsers = loyaltyUsers.map(lu => 
          lu.id === referrerLoyalty?.id ? updatedReferrerLoyalty : lu
        );
        localStorage.setItem('allLoyaltyUsers', JSON.stringify(updatedLoyaltyUsers));
      } catch (e) {
        console.error('Failed to update stored loyalty users', e);
      }
    }
    
    toast({
      title: "Referral tracked",
      description: "The referral has been successfully processed",
    });
    return true;
  };

  // Calculate current tier and next tier
  const currentTier = loyaltyUser?.level || 'bronze';
  
  // Find the current tier's index
  const currentTierIndex = loyaltyTiers.findIndex(tier => tier.level === currentTier);
  const nextTierIndex = currentTierIndex < loyaltyTiers.length - 1 ? currentTierIndex + 1 : null;
  const nextTier = nextTierIndex !== null ? loyaltyTiers[nextTierIndex].level : null;
  
  // Calculate points to next tier
  const pointsToNextTier = nextTierIndex !== null 
    ? loyaltyTiers[nextTierIndex].requiredPoints - (loyaltyUser?.points.total || 0)
    : null;

  // Get available rewards
  const availableRewards = loyaltyRewards.filter(reward => reward.isActive);
  
  // For demo purposes, if no referrals exist yet, use sample referrals
  const referrals = loyaltyUser?.referrals || (loyaltyUser ? sampleReferrals : []);
  
  // Calculate total referral value and commission earned
  const totalReferralValue = referrals.reduce(
    (sum, ref) => sum + (ref.purchaseAmount || 0),
    0
  );
  
  const totalCommissionEarned = referrals.reduce(
    (sum, ref) => sum + (ref.commissionEarned || 0),
    0
  );
  
  // Get current commission tier
  const commissionTier = loyaltyUser?.commissionTier || null;

  const value = {
    isLoggedIn: !!customer,
    customer,
    loyaltyUser,
    availableRewards,
    currentTier,
    nextTier,
    pointsToNextTier,
    referrals,
    commissionTier,
    totalReferralValue,
    totalCommissionEarned,
    login,
    logout,
    register,
    claimReward,
    addPoints,
    generateReferralLink,
    trackReferral
  };
  
  return (
    <LoyaltyContext.Provider value={value}>
      {children}
    </LoyaltyContext.Provider>
  );
};
