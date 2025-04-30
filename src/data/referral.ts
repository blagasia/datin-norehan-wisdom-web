
import { CommissionTier, ProductCommission, Referral } from '@/types/loyalty';
import { products } from './products';

// Commission tiers based on total referral value
export const commissionTiers: CommissionTier[] = [
  {
    id: 'tier_1',
    name: 'Starter',
    minReferralValue: 0,
    baseCommissionRate: 0.05, // 5%
  },
  {
    id: 'tier_2',
    name: 'Bronze Partner',
    minReferralValue: 500,
    baseCommissionRate: 0.08, // 8%
  },
  {
    id: 'tier_3',
    name: 'Silver Partner',
    minReferralValue: 2000,
    baseCommissionRate: 0.1, // 10%
  },
  {
    id: 'tier_4',
    name: 'Gold Partner',
    minReferralValue: 5000,
    baseCommissionRate: 0.15, // 15%
  },
  {
    id: 'tier_5',
    name: 'Platinum Partner',
    minReferralValue: 10000,
    baseCommissionRate: 0.2, // 20%
  },
];

// Default product commissions (for each product from products.ts)
export const productCommissions: ProductCommission[] = products.map(product => ({
  productId: String(product.id),
  commissionRate: 0.1, // Default 10%
  flatCommission: product.price.includes('RM') 
    ? Number(product.price.replace('RM', '').trim()) * 0.1 
    : 10, // Default flat commission is 10% of price or 10 RM
  isActive: true,
}));

// Sample referrals (for demo purposes)
export const sampleReferrals: Referral[] = [
  {
    id: 'ref_1',
    referrerId: 'loy_1234567890',
    referredCustomerId: 'cus_9876543210',
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    productId: '1',
    purchaseAmount: 125,
    commissionEarned: 12.5,
  },
  {
    id: 'ref_2',
    referrerId: 'loy_1234567890',
    referredCustomerId: 'cus_5678901234',
    date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'completed',
    productId: '3',
    purchaseAmount: 80,
    commissionEarned: 8.0,
  },
  {
    id: 'ref_3',
    referrerId: 'loy_1234567890',
    referredCustomerId: 'cus_1234567890',
    date: new Date().toISOString(),
    status: 'pending',
    productId: '2',
  },
];

// Generate a unique referral code
export const generateReferralCode = (customerId: string): string => {
  // Use customer ID + random alphanumeric characters
  const randomChars = Math.random().toString(36).substring(2, 7).toUpperCase();
  const shortenedCustomerId = customerId.substring(customerId.length - 4);
  return `DN-${shortenedCustomerId}-${randomChars}`;
};

// Calculate commission based on product, amount and tier
export const calculateCommission = (
  productId: string,
  amount: number,
  tierId?: string
): number => {
  // Find product commission settings
  const productCommission = productCommissions.find(pc => pc.productId === productId);
  
  // If no product commission is found or not active, return 0
  if (!productCommission || !productCommission.isActive) {
    return 0;
  }
  
  // Find tier multiplier (if applicable)
  let tierMultiplier = 1;
  if (tierId) {
    const tier = commissionTiers.find(t => t.id === tierId);
    if (tier) {
      tierMultiplier = tier.baseCommissionRate / 0.05; // Normalize based on the starter tier
    }
  }
  
  // Calculate commission - use either percentage or flat, whichever is higher
  const percentageCommission = amount * productCommission.commissionRate * tierMultiplier;
  const flatCommission = productCommission.flatCommission ? productCommission.flatCommission * tierMultiplier : 0;
  
  return Math.max(percentageCommission, flatCommission);
};

// Get commission tier for a given total referral value
export const getCommissionTier = (totalReferralValue: number): CommissionTier => {
  // Sort tiers by min value (descending) to find the highest tier the user qualifies for
  const sortedTiers = [...commissionTiers].sort((a, b) => b.minReferralValue - a.minReferralValue);
  
  for (const tier of sortedTiers) {
    if (totalReferralValue >= tier.minReferralValue) {
      return tier;
    }
  }
  
  // Default to the starter tier
  return commissionTiers[0];
};
