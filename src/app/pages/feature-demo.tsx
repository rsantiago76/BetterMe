import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { FeatureGate, FeatureBadge } from '../components/feature-gate';
import { ArrowLeft, Download, Users, BarChart, Zap, Lock } from 'lucide-react';
import { canPerformAction, type SubscriptionTier } from '../../utils/subscription-tiers';

export default function FeatureDemoPage() {
  // Mock current user tier - change to 'pro' or 'team' to test access
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');
  const [weeklyPlansCount, setWeeklyPlansCount] = useState(1);

  const handleUpgrade = (targetTier: SubscriptionTier) => {
    alert(`🚀 Demo: Would redirect to /pricing to upgrade to ${targetTier.toUpperCase()}`);
    window.location.href = '/pricing';
  };

  const handleCreatePlan = () => {
    const check = canPerformAction(currentTier, 'createWeeklyPlan', weeklyPlansCount);
    
    if (!check.allowed) {
      alert(`❌ ${check.reason}`);
      if (check.upgradeRequired) {
        handleUpgrade(check.upgradeRequired);
      }
    } else {
      setWeeklyPlansCount(prev => prev + 1);
      alert('✅ Weekly plan created!');
    }
  };

  const handleExport = () => {
    const check = canPerformAction(currentTier, 'exportList');
    
    if (!check.allowed) {
      alert(`❌ ${check.reason}`);
      if (check.upgradeRequired) {
        handleUpgrade(check.upgradeRequired);
      }
    } else {
      alert('✅ Exporting grocery list...');
    }
  };

  const handleAddClient = () => {
    const check = canPerformAction(currentTier, 'addClient', 0);
    
    if (!check.allowed) {
      alert(`❌ ${check.reason}`);
      if (check.upgradeRequired) {
        handleUpgrade(check.upgradeRequired);
      }
    } else {
      alert('✅ Client added!');
    }
  };

  const handleTrackProgress = () => {
    const check = canPerformAction(currentTier, 'trackProgress');
    
    if (!check.allowed) {
      alert(`❌ ${check.reason}`);
      if (check.upgradeRequired) {
        handleUpgrade(check.upgradeRequired);
      }
    } else {
      alert('✅ Opening progress dashboard...');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-br from-accent/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Feature Gating Demo
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Experience how subscription tiers control access to premium features.
            </p>

            {/* Tier Switcher */}
            <div className="inline-flex items-center gap-2 bg-card rounded-xl p-2 border border-border">
              <span className="text-sm font-semibold text-muted-foreground px-3">Current Tier:</span>
              <button
                onClick={() => setCurrentTier('free')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  currentTier === 'free'
                    ? 'bg-secondary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setCurrentTier('pro')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  currentTier === 'pro'
                    ? 'bg-primary text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Pro
              </button>
              <button
                onClick={() => setCurrentTier('team')}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  currentTier === 'team'
                    ? 'bg-accent text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Export Feature (Pro) */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">Export Grocery List</h3>
                  <FeatureBadge tier="pro" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Export your weekly shopping list as PDF or CSV
                </p>
              </div>

              <FeatureGate
                requiredTier="pro"
                currentTier={currentTier}
                feature="Export grocery lists as PDF or CSV to streamline your meal prep shopping."
                onUpgrade={() => handleUpgrade('pro')}
              >
                <div className="p-6">
                  <div className="bg-background rounded-lg p-6 border border-border mb-4">
                    <h4 className="font-bold text-foreground mb-3">Shopping List Preview</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Whey protein powder: 120g</li>
                      <li>• Bananas: 3 medium</li>
                      <li>• Almond milk: 960ml</li>
                      <li>• Peanut butter: 96g</li>
                    </ul>
                  </div>
                  <BetterButton variant="primary" onClick={handleExport} className="w-full">
                    <Download className="w-4 h-4" />
                    Export as PDF
                  </BetterButton>
                </div>
              </FeatureGate>
            </div>

            {/* Progress Dashboard (Pro) */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">Progress Dashboard</h3>
                  <FeatureBadge tier="pro" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Track weight, strength, and macros over time
                </p>
              </div>

              <FeatureGate
                requiredTier="pro"
                currentTier={currentTier}
                feature="Track your progress with weight logs, strength gains, and macro adherence charts."
                mode="blur"
                onUpgrade={() => handleUpgrade('pro')}
              >
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-primary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black text-primary">185</div>
                      <div className="text-xs text-muted-foreground">lbs</div>
                    </div>
                    <div className="bg-secondary/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black text-secondary">225</div>
                      <div className="text-xs text-muted-foreground">bench (lbs)</div>
                    </div>
                    <div className="bg-accent/10 rounded-lg p-4 text-center">
                      <div className="text-2xl font-black text-accent">94%</div>
                      <div className="text-xs text-muted-foreground">protein</div>
                    </div>
                  </div>
                  <BetterButton variant="primary" onClick={handleTrackProgress} className="w-full">
                    <BarChart className="w-4 h-4" />
                    View Full Dashboard
                  </BetterButton>
                </div>
              </FeatureGate>
            </div>

            {/* Client Management (Team) */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">Client Management</h3>
                  <FeatureBadge tier="team" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage up to 25 clients and assign personalized plans
                </p>
              </div>

              <FeatureGate
                requiredTier="team"
                currentTier={currentTier}
                feature="Manage clients, assign plans, review check-ins, and export progress reports."
                onUpgrade={() => handleUpgrade('team')}
              >
                <div className="p-6">
                  <div className="bg-background rounded-lg p-4 border border-border mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-foreground">Active Clients</span>
                      <span className="text-sm text-muted-foreground">0 / 25</span>
                    </div>
                    <div className="h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: '0%' }}></div>
                    </div>
                  </div>
                  <BetterButton variant="primary" onClick={handleAddClient} className="w-full">
                    <Users className="w-4 h-4" />
                    Add New Client
                  </BetterButton>
                </div>
              </FeatureGate>
            </div>

            {/* Weekly Plan Limit (Free → Pro) */}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold text-foreground">Weekly Plan Limit</h3>
                  {currentTier === 'free' && <FeatureBadge tier="pro" />}
                </div>
                <p className="text-sm text-muted-foreground">
                  {currentTier === 'free' 
                    ? 'Free tier allows 1 plan. Upgrade for unlimited.'
                    : 'Create unlimited weekly meal prep plans'}
                </p>
              </div>

              <div className="p-6">
                <div className="bg-background rounded-lg p-4 border border-border mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-foreground">Plans Created</span>
                    <span className="text-sm text-muted-foreground">
                      {weeklyPlansCount} / {currentTier === 'free' ? '1' : '∞'}
                    </span>
                  </div>
                  <div className="h-2 bg-border rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${currentTier === 'free' && weeklyPlansCount >= 1 ? 'bg-accent' : 'bg-primary'}`}
                      style={{ width: currentTier === 'free' ? `${(weeklyPlansCount / 1) * 100}%` : '20%' }}
                    ></div>
                  </div>
                </div>

                <BetterButton 
                  variant="primary" 
                  onClick={handleCreatePlan} 
                  className="w-full"
                  disabled={currentTier === 'free' && weeklyPlansCount >= 1}
                >
                  <Zap className="w-4 h-4" />
                  Create New Plan
                </BetterButton>

                {currentTier === 'free' && weeklyPlansCount >= 1 && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg border border-accent/20 text-center">
                    <p className="text-sm text-foreground mb-2">
                      <Lock className="w-4 h-4 inline mr-1" />
                      You've reached your free plan limit
                    </p>
                    <BetterButton variant="outline" size="sm" onClick={() => handleUpgrade('pro')}>
                      Upgrade to Pro for Unlimited Plans
                    </BetterButton>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Comparison CTA */}
          <div className="mt-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/20 text-center">
            <h2 className="text-2xl font-black text-foreground mb-3">
              Ready to unlock all features?
            </h2>
            <p className="text-muted-foreground mb-6">
              Upgrade to Pro or Team to access advanced meal prep tools, progress tracking, and more.
            </p>
            <div className="flex items-center justify-center gap-4">
              <BetterButton variant="primary" onClick={() => window.location.href = '/pricing'}>
                <Zap className="w-4 h-4" />
                View Pricing
              </BetterButton>
              <BetterButton variant="outline" onClick={() => window.location.href = '/pricing'}>
                Compare Plans
              </BetterButton>
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
              <a href="/pricing" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                View Pricing
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
