
import { LoyaltyTier, LoyaltyReward, Promotion } from "@/types/loyalty";

export const loyaltyTiers: LoyaltyTier[] = [
  {
    level: "bronze",
    name: "Bronze",
    requiredPoints: 0,
    benefits: [
      "5% off on selected products",
      "Birthday gift",
      "Newsletter subscription"
    ],
    color: "bg-amber-600"
  },
  {
    level: "silver",
    name: "Silver",
    requiredPoints: 500,
    benefits: [
      "10% off on all products",
      "Free samples with every purchase",
      "Early access to new products",
      "Exclusive webinar invitations"
    ],
    color: "bg-gray-400"
  },
  {
    level: "gold",
    name: "Gold",
    requiredPoints: 1000,
    benefits: [
      "15% off on all products",
      "Free shipping on all orders",
      "Personal consultation with Datin Norehan",
      "VIP event invitations"
    ],
    color: "bg-brand-gilded-gold"
  },
  {
    level: "platinum",
    name: "Platinum",
    requiredPoints: 2000,
    benefits: [
      "20% off on all products",
      "Dedicated customer support",
      "Complimentary products quarterly",
      "Exclusive workshops access",
      "Custom product formulations"
    ],
    color: "bg-brand-deep-teal"
  }
];

export const loyaltyRewards: LoyaltyReward[] = [
  {
    id: "reward-1",
    title: "RM15 off your next purchase",
    description: "Get RM15 off on your next order above RM100",
    pointsCost: 150,
    cashbackAmount: 15,
    minPurchaseAmount: 100,
    rewardCode: "LOYALTY15",
    isActive: true
  },
  {
    id: "reward-2",
    title: "20% discount on workshops",
    description: "Enjoy 20% off when registering for any upcoming workshop",
    pointsCost: 200,
    discountPercentage: 20,
    rewardCode: "WORKSHOP20",
    isActive: true,
    validUntil: "2025-12-31"
  },
  {
    id: "reward-3",
    title: "Free signature product",
    description: "Redeem our signature product for free with any purchase",
    pointsCost: 500,
    rewardCode: "FREEPRODUCT",
    isActive: true
  },
  {
    id: "reward-4",
    title: "RM50 cashback",
    description: "Get RM50 back on purchases over RM250",
    pointsCost: 400,
    cashbackAmount: 50,
    minPurchaseAmount: 250,
    rewardCode: "CASHBACK50",
    isActive: true
  }
];

export const defaultPromotions: Promotion[] = [
  {
    id: "promo-1",
    title: "Welcome Offer",
    description: "Join our loyalty program and get 100 points",
    type: "popup",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    targetPages: ["/", "/products", "/articles"],
    content: {
      heading: "Join Our Loyalty Program",
      subheading: "Get 100 points instantly and 10% off your first purchase!",
      imageUrl: "https://images.unsplash.com/photo-1517315003714-a071486bd9ea?q=80&w=500",
      buttonText: "Sign Up Now",
      formFields: ["name", "email", "phone"],
      loyaltySignup: true,
      discountCode: "WELCOME10",
      discountValue: 10,
      discountUnit: "percentage"
    },
    displayFrequency: "once",
    displayDelay: 5,
    priority: 10
  },
  {
    id: "promo-2",
    title: "Birthday Month Special",
    description: "Special offer for customers during their birthday month",
    type: "popup",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    targetPages: ["/*"],
    content: {
      heading: "Birthday Month Special!",
      subheading: "Enjoy 20% off all products during your birthday month",
      buttonText: "Claim Your Gift",
      formFields: ["email", "birthdate"],
      discountCode: "BIRTHDAY20",
      discountValue: 20,
      discountUnit: "percentage"
    },
    displayFrequency: "once",
    displayDelay: 3,
    priority: 5
  },
  {
    id: "promo-3",
    title: "Loyalty Program Landing",
    description: "Main landing page for loyalty program",
    type: "landing-page",
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    isActive: true,
    targetPages: ["/loyalty"],
    content: {
      heading: "Datin Norehan Loyalty Program",
      subheading: "Join our loyalty program and enjoy exclusive benefits",
      imageUrl: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?q=80&w=500",
      buttonText: "Join Now",
      formFields: ["name", "email", "phone"],
      loyaltySignup: true
    },
    displayFrequency: "always",
    priority: 1
  }
];
