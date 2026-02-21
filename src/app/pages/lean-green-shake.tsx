import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';

export default function LeanGreenShakePage() {
  const leanGreenRecipe: ShakeRecipe = {
    id: 'lean-muscle-green-shake',
    name: 'Lean Muscle Green Shake',
    goal: 'cutting',
    description: 'A nutrient-dense, low-calorie shake packed with greens, healthy fats, and quality protein to support fat loss while preserving muscle.',
    ingredients: [
      { item: 'Vanilla whey protein', amount: '1 scoop', notes: '30g' },
      { item: 'Unsweetened almond milk', amount: '1 cup', notes: '240ml' },
      { item: 'Avocado', amount: '½ medium', notes: 'ripe' },
      { item: 'Fresh spinach', amount: '1 handful', notes: '1 cup, packed' },
      { item: 'Chia seeds', amount: '1 tbsp', notes: '12g' },
      { item: 'Frozen pineapple', amount: '½ cup', notes: '70g, chunks' },
    ],
    instructions: [
      'Add unsweetened almond milk and fresh spinach to blender first',
      'Add vanilla whey protein, avocado, chia seeds, and frozen pineapple',
      'Blend on high speed for 45-60 seconds until smooth and creamy with no chunks',
      'Pour into a glass and drink immediately for best nutrient absorption',
    ],
    protein: 32,
    carbs: 28,
    fats: 22,
    calories: 420,
    bestTime: ['Morning', 'Pre-workout'],
    timingReason: 'Provides sustained energy and healthy fats without heavy carbs, keeping you in a caloric deficit while maintaining energy levels.',
    prepTime: 4,
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
      <section className="bg-gradient-to-br from-accent/5 via-transparent to-secondary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
                <span className="text-sm font-bold text-accent uppercase tracking-wide">
                  Cutting Recipe
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                {leanGreenRecipe.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {leanGreenRecipe.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Calories
                </div>
                <div className="text-3xl font-black text-foreground">
                  {leanGreenRecipe.calories}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Protein
                </div>
                <div className="text-3xl font-black text-primary">
                  {leanGreenRecipe.protein}g
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Prep Time
                </div>
                <div className="text-3xl font-black text-foreground">
                  {leanGreenRecipe.prepTime}m
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Goal
                </div>
                <div className="text-2xl font-black text-accent capitalize">
                  {leanGreenRecipe.goal}
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
                Everything you need to make this lean, nutrient-packed shake
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print Recipe
            </BetterButton>
          </div>

          <ShakeRecipeCard recipe={leanGreenRecipe} />

          {/* Additional Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-accent/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Use frozen spinach if fresh isn't available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Add ice cubes for a thicker, more refreshing texture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Blend spinach with liquid first to avoid chunks</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Let chia seeds soak for 5 minutes for better digestion</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl p-6 border border-secondary/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Substitutions
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Avocado:</strong> Use 1 tbsp coconut oil for healthy fats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Spinach:</strong> Kale or mixed greens work well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Pineapple:</strong> Swap for frozen mango or berries</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span><strong>Chia seeds:</strong> Flax seeds provide similar benefits</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nutrition Insight */}
          <div className="mt-8 bg-gradient-to-br from-accent/5 via-card to-primary/5 rounded-xl p-8 border border-accent/20">
            <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              Nutrition Insight: Cutting Phase Nutrition
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Why Protein Timing Matters for Hypertrophy
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  During a calorie deficit, protein timing becomes even more critical. Consuming protein post-workout prevents muscle loss while promoting fat oxidation.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  This shake's 32g of whey protein preserves lean mass during cutting while keeping you in a caloric deficit at just 280 calories.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fast vs Slow Digesting Proteins
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Whey (Fast):</strong> Rapidly absorbed to halt muscle breakdown post-workout.<br/>
                  <strong>Plant Protein (Moderate):</strong> Slower than whey but ideal for sustained fullness during cuts.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Fast-digesting whey ensures immediate muscle recovery without adding excess calories—perfect for fat loss phases.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Carb Timing for Glycogen Replenishment
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Low-carb shakes work best when training fasted or in a deficit. Minimal carbs (22g) prevent fat storage while still providing energy for recovery.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Strategic low-carb approach maximizes fat burning while delivering essential nutrients from spinach and berries.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  When to Avoid Excess Fats
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  During cutting, minimizing fats (this shake has only 8g) allows more room for protein and carbs while staying in your calorie target.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Low-fat formula keeps calories minimal for fat loss while MCT oil provides quick energy without slowing digestion.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-accent to-accent/80 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              Ready to Get Lean & Strong?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Access our complete cutting nutrition plan with macro-optimized shake recipes, 
              meal prep guides, and training programs designed for maximum fat loss.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <BetterButton variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                View Cutting Plan
              </BetterButton>
              <BetterButton variant="primary" className="bg-white text-accent hover:bg-white/90">
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