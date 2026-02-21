import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';

export default function NightRecoveryCaseinPage() {
  const nightRecoveryRecipe: ShakeRecipe = {
    id: 'night-recovery-casein-shake',
    name: 'Night Recovery Casein Shake',
    goal: 'recovery',
    description: 'A slow-digesting protein shake designed to feed your muscles throughout the night, preventing catabolism and maximizing overnight recovery while you sleep.',
    ingredients: [
      { item: 'Casein protein', amount: '1 scoop', notes: '30g, vanilla or chocolate' },
      { item: 'Unsweetened almond milk', amount: '1 cup', notes: '240ml' },
      { item: 'Almond butter', amount: '1 tbsp', notes: '16g, natural' },
      { item: 'Cinnamon', amount: '½ tsp', notes: 'ground' },
    ],
    instructions: [
      'Pour unsweetened almond milk into blender or shaker bottle',
      'Add casein protein powder, almond butter, and cinnamon',
      'Blend or shake for 30-45 seconds until smooth and well combined',
      'Consume 30-60 minutes before bed for optimal overnight recovery',
    ],
    protein: 34,
    carbs: 8,
    fats: 18,
    calories: 360,
    bestTime: ['Before Bed'],
    timingReason: 'Slow-digesting casein protein provides sustained amino acid release for 7-8 hours, supporting overnight muscle recovery and preventing muscle breakdown.',
    prepTime: 3,
    servings: 1,
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
              <BetterButton variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
                Share
              </BetterButton>
              <BetterButton variant="primary" size="sm">
                <Bookmark className="w-4 h-4" />
                Save Recipe
              </BetterButton>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-bold text-secondary uppercase tracking-wide">
                  Recovery / Before Bed
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                {nightRecoveryRecipe.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {nightRecoveryRecipe.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Calories
                </div>
                <div className="text-3xl font-black text-foreground">
                  {nightRecoveryRecipe.calories}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Protein
                </div>
                <div className="text-3xl font-black text-primary">
                  {nightRecoveryRecipe.protein}g
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Prep Time
                </div>
                <div className="text-3xl font-black text-foreground">
                  {nightRecoveryRecipe.prepTime}m
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Carbs
                </div>
                <div className="text-3xl font-black text-secondary">
                  {nightRecoveryRecipe.carbs}g
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Card */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-foreground mb-2">Complete Recipe</h2>
              <p className="text-muted-foreground">
                Everything you need for optimal overnight muscle recovery
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print Recipe
            </BetterButton>
          </div>

          <ShakeRecipeCard recipe={nightRecoveryRecipe} />

          {/* Additional Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-6 border border-secondary/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Use cold water or almond milk for better mixability</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Drink 30-60 minutes before bed, not right before sleeping</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Can be shaken by hand—no blender required</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Keep carbs low to avoid energy spike before sleep</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Substitutions
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Casein:</strong> Greek yogurt + whey as alternative</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Almond milk:</strong> Any low-carb milk alternative</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Almond butter:</strong> Cashew or peanut butter works</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Cinnamon:</strong> Vanilla extract or cocoa powder</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nutrition Insight */}
          <div className="mt-8 bg-gradient-to-br from-secondary/5 via-card to-primary/5 rounded-xl p-8 border border-secondary/20">
            <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              Nutrition Insight: Nighttime Protein Strategy
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Why Protein Timing Matters for Hypertrophy
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Sleep is when peak muscle repair occurs. Without protein, your body enters a catabolic state, breaking down muscle for amino acids. Nighttime protein prevents this.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  34g of casein provides sustained amino acids for 7-8 hours, ensuring continuous muscle protein synthesis throughout sleep.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fast vs Slow Digesting Proteins
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Casein (Slow):</strong> Forms a gel in stomach, releasing amino acids over 7-8 hours—perfect for overnight.<br/>
                  <strong>Whey (Fast):</strong> Digested in 1-2 hours, leaving you protein-deficient for 6+ hours of sleep.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Casein's slow-release matches your body's overnight repair cycle, unlike whey which would be exhausted within 2 hours.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Carb Timing for Glycogen Replenishment
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Low carbs (8g) before bed prevent insulin spikes that disrupt sleep quality. Glycogen replenishment is less critical at night since you're not training.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Minimal carbs ensure stable blood sugar for uninterrupted deep sleep—when growth hormone peaks for muscle recovery.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  When to Avoid Excess Fats
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  While fats slow digestion (beneficial at night), 18g provides satiety without discomfort. Excess fats (30g+) could cause digestive issues while lying down.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Moderate healthy fats from almond butter prevent midnight hunger while supporting hormone production during sleep.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              Maximize Your Overnight Recovery
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get our complete nighttime recovery guide with casein protocols, sleep optimization strategies, 
              and 24-hour nutrition plans for maximum muscle growth.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <BetterButton variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                View Recovery Guide
              </BetterButton>
              <BetterButton variant="primary" className="bg-white text-secondary hover:bg-white/90">
                Start Free Trial
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