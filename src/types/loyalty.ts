
export type LoyaltyLevel = 'bronze' | 'silver' | 'gold' | 'platinum';

export interface LoyaltyPoints {
  total: number;
  available: number;
  history: LoyaltyTransaction[];
}

export interface LoyaltyTransaction {
  id: string;
  date: string;
  description: string;
  points: number;
  type: 'earned' | 'redeemed';
}

export interface LoyaltyReward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  discountPercentage?: number;
  cashbackAmount?: number;
  validUntil?: string;
  minPurchaseAmount?: number;
  rewardCode: string;
  isActive: boolean;
}

export interface LoyaltyTier {
  level: LoyaltyLevel;
  name: string;
  requiredPoints: number;
  benefits: string[];
  color: string;
}

export interface Customer {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  joinedDate: string;
  birthDate?: string;
  loyaltyId?: string;
  referralCode?: string;
  referredBy?: string;
  preferences?: {
    categories?: string[];
    communicationPreference?: 'email' | 'sms' | 'both' | 'none';
    interests?: string[];
  };
}

export interface LoyaltyUser {
  id: string;
  customerId: string;
  points: LoyaltyPoints;
  level: LoyaltyLevel;
  joinedDate: string;
  rewards: string[]; // IDs of claimed rewards
  referrals?: Referral[];
  commissionTier?: CommissionTier;
  referralCode?: string; // Added referralCode to LoyaltyUser
}

export interface Referral {
  id: string;
  referrerId: string;
  referredCustomerId: string;
  date: string;
  status: 'pending' | 'completed' | 'expired';
  productId?: string;
  purchaseAmount?: number;
  commissionEarned?: number;
}

export interface CommissionTier {
  id: string;
  name: string;
  minReferralValue: number;
  baseCommissionRate: number;
}

export interface ProductCommission {
  productId: string;
  commissionRate: number; // Base percentage
  flatCommission?: number; // Optional flat amount
  isActive: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  type: 'popup' | 'banner' | 'landing-page';
  startDate: string;
  endDate: string;
  isActive: boolean;
  targetPages: string[]; // URLs where this promotion should appear
  content: {
    heading: string;
    subheading?: string;
    imageUrl?: string;
    buttonText: string;
    buttonLink?: string;
    formFields?: Array<'name' | 'email' | 'phone' | 'birthdate'>;
    loyaltySignup?: boolean;
    discountCode?: string;
    discountValue?: number;
    discountUnit?: 'percentage' | 'fixed';
  };
  displayFrequency?: 'once' | 'always' | 'daily' | 'sessionBased';
  displayDelay?: number; // Delay in seconds before showing popup
  priority: number; // Higher number = higher priority
}
