export type SubscriptionTier = 'free' | 'pro' | 'team';
export type UserRole = 'user' | 'coach' | 'admin';

export interface SubscriptionFeature {
  id: string;
  name: string;
  description: string;
  icon?: string;
}

export interface TierConfig {
  id: SubscriptionTier;
  name: string;
  displayName: string;
  price: {
    monthly: number;
    annual: number;
  };
  stripePriceId?: {
    monthly: string;
    annual: string;
  };
  features: string[];
  limits: {
    weeklyPlans: number | 'unlimited';
    savedProfiles: number | 'unlimited';
    clients: number | 'unlimited';
    exportFormats: string[];
    progressTracking: boolean;
    reminders: boolean;
    clientManagement: boolean;
    reporting: boolean;
  };
  cta: string;
  popular?: boolean;
  recommended?: boolean;
}

export const SUBSCRIPTION_TIERS: Record<SubscriptionTier, TierConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    displayName: 'Free Tier',
    price: {
      monthly: 0,
      annual: 0,
    },
    features: [
      'View all shake recipes',
      'Basic timing recommendations',
      'Simple macro calculator (no saving)',
      '1 weekly plan template',
      'Community support',
    ],
    limits: {
      weeklyPlans: 1,
      savedProfiles: 0,
      clients: 0,
      exportFormats: [],
      progressTracking: false,
      reminders: false,
      clientManagement: false,
      reporting: false,
    },
    cta: 'Get Started Free',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    displayName: 'Pro',
    price: {
      monthly: 12,
      annual: 99, // $8.25/mo when billed annually
    },
    stripePriceId: {
      monthly: 'price_pro_monthly',
      annual: 'price_pro_annual',
    },
    features: [
      'Everything in Free, plus:',
      'Save unlimited profiles & goals',
      'Personalized macro calculator with weekly adjustments',
      'Unlimited weekly meal prep plans',
      'Smart supplement timing planner',
      'Email & SMS reminders',
      'Export grocery lists (PDF/CSV)',
      'Progress dashboard (weight & strength logs)',
      'Macro tracking history',
      'Priority email support',
    ],
    limits: {
      weeklyPlans: 'unlimited',
      savedProfiles: 'unlimited',
      clients: 0,
      exportFormats: ['pdf', 'csv'],
      progressTracking: true,
      reminders: true,
      clientManagement: false,
      reporting: false,
    },
    cta: 'Start Pro Trial',
    popular: true,
  },
  team: {
    id: 'team',
    name: 'Team',
    displayName: 'Team / Coach',
    price: {
      monthly: 39,
      annual: 390, // ~$32.50/mo when billed annually
    },
    stripePriceId: {
      monthly: 'price_team_monthly',
      annual: 'price_team_annual',
    },
    features: [
      'Everything in Pro, plus:',
      'Manage up to 25 clients',
      'Assign personalized plans to clients',
      'Client check-in reviews',
      'Progress comparison reports',
      'Export client data & analytics',
      'White-label grocery lists',
      'Team collaboration tools',
      'Dedicated account manager',
      'API access for integrations',
    ],
    limits: {
      weeklyPlans: 'unlimited',
      savedProfiles: 'unlimited',
      clients: 25,
      exportFormats: ['pdf', 'csv', 'json'],
      progressTracking: true,
      reminders: true,
      clientManagement: true,
      reporting: true,
    },
    cta: 'Start Team Trial',
    recommended: true,
  },
};

export interface UserSubscription {
  tier: SubscriptionTier;
  status: 'active' | 'trialing' | 'past_due' | 'canceled' | 'inactive';
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
  trialEndsAt?: Date;
}

/**
 * Check if user has access to a specific feature
 */
export function hasFeatureAccess(
  userTier: SubscriptionTier,
  feature: keyof TierConfig['limits']
): boolean {
  const config = SUBSCRIPTION_TIERS[userTier];
  const featureValue = config.limits[feature];
  
  // Boolean features
  if (typeof featureValue === 'boolean') {
    return featureValue;
  }
  
  // Numeric limits
  if (typeof featureValue === 'number') {
    return featureValue > 0;
  }
  
  // Unlimited
  if (featureValue === 'unlimited') {
    return true;
  }
  
  // Array features (export formats)
  if (Array.isArray(featureValue)) {
    return featureValue.length > 0;
  }
  
  return false;
}

/**
 * Check if user can perform an action based on limits
 */
export function canPerformAction(
  userTier: SubscriptionTier,
  action: 'createWeeklyPlan' | 'saveProfile' | 'addClient' | 'exportList' | 'trackProgress',
  currentCount?: number
): { allowed: boolean; reason?: string; upgradeRequired?: SubscriptionTier } {
  const config = SUBSCRIPTION_TIERS[userTier];
  
  switch (action) {
    case 'createWeeklyPlan':
      if (config.limits.weeklyPlans === 'unlimited') {
        return { allowed: true };
      }
      if (typeof config.limits.weeklyPlans === 'number') {
        if ((currentCount || 0) >= config.limits.weeklyPlans) {
          return {
            allowed: false,
            reason: `You've reached your limit of ${config.limits.weeklyPlans} weekly plan(s). Upgrade to Pro for unlimited plans.`,
            upgradeRequired: 'pro',
          };
        }
        return { allowed: true };
      }
      return { allowed: false, reason: 'This feature is not available on your plan.', upgradeRequired: 'pro' };
      
    case 'saveProfile':
      if (config.limits.savedProfiles === 'unlimited') {
        return { allowed: true };
      }
      if (typeof config.limits.savedProfiles === 'number' && config.limits.savedProfiles === 0) {
        return {
          allowed: false,
          reason: 'Saving profiles requires Pro. Upgrade to save unlimited profiles.',
          upgradeRequired: 'pro',
        };
      }
      return { allowed: true };
      
    case 'addClient':
      if (!config.limits.clientManagement) {
        return {
          allowed: false,
          reason: 'Client management requires Team/Coach plan.',
          upgradeRequired: 'team',
        };
      }
      if (config.limits.clients === 'unlimited') {
        return { allowed: true };
      }
      if (typeof config.limits.clients === 'number') {
        if ((currentCount || 0) >= config.limits.clients) {
          return {
            allowed: false,
            reason: `You've reached your limit of ${config.limits.clients} clients. Contact us for enterprise pricing.`,
          };
        }
        return { allowed: true };
      }
      return { allowed: false };
      
    case 'exportList':
      if (config.limits.exportFormats.length === 0) {
        return {
          allowed: false,
          reason: 'Export features require Pro. Upgrade to export grocery lists as PDF/CSV.',
          upgradeRequired: 'pro',
        };
      }
      return { allowed: true };
      
    case 'trackProgress':
      if (!config.limits.progressTracking) {
        return {
          allowed: false,
          reason: 'Progress tracking requires Pro. Upgrade to track weight, strength, and macros over time.',
          upgradeRequired: 'pro',
        };
      }
      return { allowed: true };
      
    default:
      return { allowed: false };
  }
}

/**
 * Get required tier for a feature
 */
export function getRequiredTier(feature: string): SubscriptionTier | null {
  // Check which tier first includes this feature
  if (SUBSCRIPTION_TIERS.free.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))) {
    return 'free';
  }
  if (SUBSCRIPTION_TIERS.pro.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))) {
    return 'pro';
  }
  if (SUBSCRIPTION_TIERS.team.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))) {
    return 'team';
  }
  return null;
}

/**
 * Calculate savings for annual billing
 */
export function getAnnualSavings(tier: SubscriptionTier): number {
  const config = SUBSCRIPTION_TIERS[tier];
  const monthlyTotal = config.price.monthly * 12;
  const annualPrice = config.price.annual;
  return monthlyTotal - annualPrice;
}

/**
 * Get upgrade CTA based on current and target tier
 */
export function getUpgradeCTA(currentTier: SubscriptionTier, targetTier: SubscriptionTier): string {
  if (currentTier === 'free' && targetTier === 'pro') {
    return 'Upgrade to Pro';
  }
  if (currentTier === 'free' && targetTier === 'team') {
    return 'Upgrade to Team';
  }
  if (currentTier === 'pro' && targetTier === 'team') {
    return 'Upgrade to Team';
  }
  return 'Upgrade Now';
}