import React, { ReactNode } from 'react';
import { Lock, Zap, Crown } from 'lucide-react';
import { SubscriptionTier } from '../../utils/subscription-tiers';
import { BetterButton } from './better-button';

interface FeatureGateProps {
  requiredTier: SubscriptionTier;
  currentTier: SubscriptionTier;
  feature: string;
  children: ReactNode;
  mode?: 'blur' | 'hide' | 'overlay';
  showUpgrade?: boolean;
  onUpgrade?: () => void;
}

export function FeatureGate({
  requiredTier,
  currentTier,
  feature,
  children,
  mode = 'overlay',
  showUpgrade = true,
  onUpgrade,
}: FeatureGateProps) {
  const tierLevels: Record<SubscriptionTier, number> = {
    free: 0,
    pro: 1,
    team: 2,
  };

  const hasAccess = tierLevels[currentTier] >= tierLevels[requiredTier];

  if (hasAccess) {
    return <>{children}</>;
  }

  // User doesn't have access - show restricted view
  if (mode === 'hide') {
    return null;
  }

  const tierIcons: Record<SubscriptionTier, ReactNode> = {
    free: <Lock className="w-5 h-5" />,
    pro: <Zap className="w-5 h-5" />,
    team: <Crown className="w-5 h-5" />,
  };

  const tierColors: Record<SubscriptionTier, string> = {
    free: 'bg-secondary/10 text-secondary border-secondary',
    pro: 'bg-primary/10 text-primary border-primary',
    team: 'bg-accent/10 text-accent border-accent',
  };

  if (mode === 'blur') {
    return (
      <div className="relative">
        <div className="blur-sm pointer-events-none opacity-50">{children}</div>
        {showUpgrade && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-card rounded-xl p-6 border-2 border-primary shadow-xl text-center max-w-sm">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                {tierIcons[requiredTier]}
              </div>
              <h3 className="font-bold text-foreground mb-2">
                {requiredTier === 'pro' ? 'Pro' : 'Team'} Feature
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{feature}</p>
              <BetterButton variant="primary" onClick={onUpgrade} className="w-full">
                Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Team'}
              </BetterButton>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default overlay mode
  return (
    <div className="relative">
      <div className="opacity-30 pointer-events-none">{children}</div>
      {showUpgrade && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="bg-card rounded-xl p-8 border-2 border-primary shadow-2xl text-center max-w-md w-full">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${tierColors[requiredTier]}`}>
              {tierIcons[requiredTier]}
            </div>
            <h3 className="text-xl font-black text-foreground mb-2">
              {requiredTier === 'pro' ? 'Pro' : 'Team'} Feature Required
            </h3>
            <p className="text-sm text-muted-foreground mb-6">{feature}</p>
            <BetterButton variant="primary" onClick={onUpgrade} className="w-full py-3">
              <Zap className="w-4 h-4" />
              Upgrade to {requiredTier === 'pro' ? 'Pro' : 'Team'}
            </BetterButton>
          </div>
        </div>
      )}
    </div>
  );
}

interface FeatureBadgeProps {
  tier: SubscriptionTier;
  size?: 'sm' | 'md' | 'lg';
}

export function FeatureBadge({ tier, size = 'md' }: FeatureBadgeProps) {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (tier === 'free') {
    return null; // Don't show badge for free features
  }

  const config = {
    pro: {
      icon: <Zap className={iconSizes[size]} />,
      label: 'Pro',
      className: 'bg-primary/10 text-primary border border-primary/20',
    },
    team: {
      icon: <Crown className={iconSizes[size]} />,
      label: 'Team',
      className: 'bg-accent/10 text-accent border border-accent/20',
    },
  };

  const badgeConfig = config[tier];

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-bold ${sizeClasses[size]} ${badgeConfig.className}`}>
      {badgeConfig.icon}
      {badgeConfig.label}
    </span>
  );
}
