import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { MainNavigation } from '../components/main-navigation';
import { ArrowLeft, Check, Zap, Crown, Shield, Users, TrendingUp, FileText, Bell, BarChart } from 'lucide-react';
import { SUBSCRIPTION_TIERS, getAnnualSavings, type SubscriptionTier } from '../../utils/subscription-tiers';
import { apiClient } from '../../lib/api-client';

export default function PricingPage() {
  const [billingInterval, setBillingInterval] = useState<'monthly' | 'annual'>('monthly');
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (tier: SubscriptionTier, interval: 'monthly' | 'annual') => {
    if (tier === 'free') {
      // Redirect to signup
      window.location.href = '/register';
      return;
    }

    setLoading(`${tier}-${interval}`);
    
    // Show demo mode message immediately (since API isn't running in dev)
    const tierName = SUBSCRIPTION_TIERS[tier].displayName;
    const price = interval === 'monthly' 
      ? SUBSCRIPTION_TIERS[tier].price.monthly 
      : Math.round(SUBSCRIPTION_TIERS[tier].price.annual / 12);
    
    const confirmed = confirm(
      `🎯 DEMO MODE\n\n` +
      `You selected: ${tierName} - $${price}/month (${interval})\n\n` +
      `This demo uses simulated payments. To enable real Stripe payments:\n` +
      `1. Deploy to Vercel\n` +
      `2. Add STRIPE_SECRET_KEY to environment variables\n` +
      `3. Configure Stripe Price IDs in subscription-tiers.ts\n\n` +
      `Click OK to simulate a successful subscription.`
    );
    
    if (confirmed) {
      // Simulate successful checkout in demo mode
      setTimeout(() => {
        window.location.href = `/dashboard?demo=true&tier=${tier}&interval=${interval}`;
      }, 500);
    } else {
      setLoading(null);
    }
    
    /* 
    // Real Stripe checkout (commented out for demo)
    try {
      // Get Stripe Price ID from tier config
      const priceId = interval === 'monthly'
        ? SUBSCRIPTION_TIERS[tier].stripePriceId?.monthly
        : SUBSCRIPTION_TIERS[tier].stripePriceId?.annual;

      if (!priceId) {
        alert('⚠️ Demo Mode: Stripe Price IDs not configured. See DEPLOYMENT.md for setup.');
        setLoading(null);
        return;
      }

      // Create checkout session
      const { url } = await apiClient.createCheckoutSession(priceId);
      
      // Redirect to Stripe Checkout
      window.location.href = url;
    } catch (error: any) {
      console.error('Checkout error:', error);
      setLoading(null);
      alert('Unable to start checkout. Please try again or contact support.');
    }
    */
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the plan that fits your goals. Start free, upgrade anytime.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center gap-3 bg-card rounded-full p-2 border border-border">
              <button
                onClick={() => setBillingInterval('monthly')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingInterval === 'monthly'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingInterval('annual')}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  billingInterval === 'annual'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Annual
                <span className="ml-2 px-2 py-0.5 bg-accent text-white text-xs rounded-full">
                  Save 31%
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="container mx-auto px-6 lg:px-12 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-card rounded-2xl p-8 border-2 border-border hover:border-secondary/50 transition-all">
              <div className="mb-6">
                <h3 className="text-2xl font-black text-foreground mb-2">Free</h3>
                <p className="text-muted-foreground text-sm">Perfect for getting started</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-foreground">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>

              <BetterButton variant="outline" className="w-full mb-8">
                Get Started Free
              </BetterButton>

              <div className="space-y-3">
                {SUBSCRIPTION_TIERS.free.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tier */}
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 border-2 border-primary relative">
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <div className="bg-primary text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                  Most Popular
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-primary" />
                  <h3 className="text-2xl font-black text-foreground">Pro</h3>
                </div>
                <p className="text-muted-foreground text-sm">For serious athletes</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-foreground">
                    ${billingInterval === 'monthly' 
                      ? SUBSCRIPTION_TIERS.pro.price.monthly 
                      : Math.round(SUBSCRIPTION_TIERS.pro.price.annual / 12)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {billingInterval === 'annual' && (
                  <p className="text-sm text-primary mt-2">
                    Billed ${SUBSCRIPTION_TIERS.pro.price.annual}/year (save ${getAnnualSavings('pro')})
                  </p>
                )}
              </div>

              <BetterButton 
                variant="primary" 
                className="w-full mb-8"
                onClick={() => handleCheckout('pro', billingInterval)}
                loading={loading === 'pro-monthly' || loading === 'pro-annual'}
              >
                <Zap className="w-4 h-4" />
                Start 14-Day Free Trial
              </BetterButton>

              <div className="space-y-3">
                {SUBSCRIPTION_TIERS.pro.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Tier */}
            <div className="bg-card rounded-2xl p-8 border-2 border-accent hover:border-accent transition-all">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <Crown className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-black text-foreground">Team / Coach</h3>
                </div>
                <p className="text-muted-foreground text-sm">For coaches & trainers</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-black text-foreground">
                    ${billingInterval === 'monthly' 
                      ? SUBSCRIPTION_TIERS.team.price.monthly 
                      : Math.round(SUBSCRIPTION_TIERS.team.price.annual / 12)}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {billingInterval === 'annual' && (
                  <p className="text-sm text-accent mt-2">
                    Billed ${SUBSCRIPTION_TIERS.team.price.annual}/year (save ${getAnnualSavings('team')})
                  </p>
                )}
              </div>

              <BetterButton 
                variant="primary" 
                className="w-full mb-8"
                onClick={() => handleCheckout('team', billingInterval)}
                loading={loading === 'team-monthly' || loading === 'team-annual'}
              >
                <Crown className="w-4 h-4" />
                Start 14-Day Free Trial
              </BetterButton>

              <div className="space-y-3">
                {SUBSCRIPTION_TIERS.team.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-black text-foreground mb-12 text-center">
            Feature Comparison
          </h2>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="text-left p-6 font-bold text-foreground">Features</th>
                    <th className="text-center p-6 font-bold text-foreground">Free</th>
                    <th className="text-center p-6 font-bold text-primary">Pro</th>
                    <th className="text-center p-6 font-bold text-accent">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Shake Recipes */}
                  <tr className="border-b border-border">
                    <td className="p-6 text-foreground">View shake recipes & timing</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-secondary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Macro Calculator */}
                  <tr className="border-b border-border bg-background/50">
                    <td className="p-6 text-foreground">Basic macro calculator</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-secondary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Weekly Plans */}
                  <tr className="border-b border-border">
                    <td className="p-6 text-foreground">Weekly meal prep plans</td>
                    <td className="p-6 text-center text-muted-foreground text-sm">1 template</td>
                    <td className="p-6 text-center text-primary font-bold">Unlimited</td>
                    <td className="p-6 text-center text-accent font-bold">Unlimited</td>
                  </tr>

                  {/* Save Profiles */}
                  <tr className="border-b border-border bg-background/50">
                    <td className="p-6 text-foreground">Save profiles & goals</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Progress Tracking */}
                  <tr className="border-b border-border">
                    <td className="p-6 text-foreground">Progress dashboard (weight/strength)</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Supplement Timing */}
                  <tr className="border-b border-border bg-background/50">
                    <td className="p-6 text-foreground">Supplement timing planner</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Reminders */}
                  <tr className="border-b border-border">
                    <td className="p-6 text-foreground">Email & SMS reminders</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Export */}
                  <tr className="border-b border-border bg-background/50">
                    <td className="p-6 text-foreground">Export grocery lists (PDF/CSV)</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-primary mx-auto" /></td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Client Management */}
                  <tr className="border-b border-border">
                    <td className="p-6 text-foreground">Client management (up to 25)</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* Reports */}
                  <tr className="border-b border-border bg-background/50">
                    <td className="p-6 text-foreground">Client progress reports</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>

                  {/* API */}
                  <tr>
                    <td className="p-6 text-foreground">API access</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center">—</td>
                    <td className="p-6 text-center"><Check className="w-5 h-5 text-accent mx-auto" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">
                Powered by Stripe. Your payment info is encrypted and secure.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Cancel Anytime</h3>
              <p className="text-sm text-muted-foreground">
                No long-term commitments. Cancel your subscription anytime.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-bold text-foreground mb-2">14-Day Free Trial</h3>
              <p className="text-sm text-muted-foreground">
                Try Pro or Team risk-free for 14 days. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto px-6 lg:px-12 py-16 border-t border-border">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-foreground mb-12 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Can I upgrade or downgrade anytime?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">What payment methods do you accept?</h3>
              <p className="text-sm text-muted-foreground">
                We accept all major credit cards, debit cards, and digital wallets through Stripe. Enterprise customers can request invoice billing.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">Is there a discount for annual plans?</h3>
              <p className="text-sm text-muted-foreground">
                Yes! Annual plans save you 17% compared to monthly billing. That's 2 months free when you pay annually.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <h3 className="font-bold text-foreground mb-2">What happens to my data if I cancel?</h3>
              <p className="text-sm text-muted-foreground">
                You can export all your data before canceling. We keep your account on file for 30 days in case you change your mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 BetterMe. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}