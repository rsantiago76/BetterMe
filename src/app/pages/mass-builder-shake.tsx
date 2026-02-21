import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';

export default function MassBuilderShakePage() {
  const massBuilderRecipe: ShakeRecipe = {
    id: 'mass-builder-power-shake',
    name: 'Mass Builder Power Shake',
    goal: 'bulking',
    description: 'The ultimate post-workout shake designed to maximize muscle growth with optimal protein and carbohydrates.',
    ingredients: [
      { item: 'Whey protein powder', amount: '1 scoop', notes: '30g, vanilla or chocolate' },
      { item: 'Banana', amount: '1 medium', notes: 'ripe' },
      { item: 'Natural peanut butter', amount: '2 tbsp', notes: '32g, no sugar added' },
      { item: 'Whole milk', amount: '1 cup', notes: '240ml' },
      { item: 'Rolled oats', amount: '½ cup', notes: '40g, raw' },
      { item: 'Cinnamon', amount: '½ tsp', notes: 'optional' },
    ],
    instructions: [
      'Add whole milk to blender first to prevent ingredients from sticking to the bottom',
      'Add whey protein powder, banana, peanut butter, and rolled oats',
      'Sprinkle cinnamon on top if desired, then blend on high speed for 60-90 seconds until completely smooth',
      'Pour into a large shaker bottle and consume immediately post-workout for maximum absorption',
    ],
    protein: 48,
    carbs: 75,
    fats: 28,
    calories: 720,
    bestTime: ['Post-workout'],
    timingReason: 'Replenishes glycogen stores and delivers fast-digesting protein for muscle repair immediately after training.',
    prepTime: 5,
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
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                <span className="text-sm font-bold text-primary uppercase tracking-wide">
                  Featured Recipe
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                {massBuilderRecipe.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {massBuilderRecipe.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Calories
                </div>
                <div className="text-3xl font-black text-foreground">
                  {massBuilderRecipe.calories}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Protein
                </div>
                <div className="text-3xl font-black text-primary">
                  {massBuilderRecipe.protein}g
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Prep Time
                </div>
                <div className="text-3xl font-black text-foreground">
                  {massBuilderRecipe.prepTime}m
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Goal
                </div>
                <div className="text-2xl font-black text-primary capitalize">
                  {massBuilderRecipe.goal}
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
                Everything you need to make this muscle-building shake
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print Recipe
            </BetterButton>
          </div>

          <ShakeRecipeCard recipe={massBuilderRecipe} />

          {/* Additional Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">💡</span>
                Pro Tips
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Use frozen banana for a thicker, creamier texture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Add ice cubes if you prefer a cold shake</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Blend oats first for a smoother consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span>Consume within 30 minutes of training for best results</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-accent/5 to-secondary/5 rounded-xl p-6 border border-accent/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Substitutions
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Milk:</strong> Use almond milk to reduce calories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Peanut butter:</strong> Almond butter works great too</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Banana:</strong> Swap for berries if preferred</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span><strong>Oats:</strong> Can replace with cooked white rice</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nutrition Insight */}
          <div className="mt-8 bg-gradient-to-br from-primary/5 via-card to-accent/5 rounded-xl p-8 border border-primary/20">
            <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              Nutrition Insight: The Science of Protein Timing
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Why Protein Timing Matters for Hypertrophy
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Muscle protein synthesis (MPS) peaks 1-3 hours post-workout and remains elevated for up to 24 hours. Consuming 20-40g of protein immediately after training maximizes this anabolic window.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  This shake delivers 48g of fast-absorbing whey to trigger maximum MPS when your muscles are most receptive.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fast vs Slow Digesting Proteins
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Whey (Fast):</strong> Absorbed in 60-90 minutes. Ideal post-workout for rapid amino acid spike.<br/>
                  <strong>Casein (Slow):</strong> Digests over 7-8 hours. Best before bed for overnight recovery.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Post-workout demands whey for immediate muscle repair—casein would delay nutrient delivery.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Carb Timing for Glycogen Replenishment
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Muscle glycogen is depleted during intense training. Consuming 1-1.5g of carbs per kg bodyweight post-workout restores glycogen 2x faster than waiting.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  75g of carbs from oats and banana rapidly refuel muscles, creating an insulin spike that drives nutrients into cells.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  When to Avoid Excess Fats
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Fats slow digestion by 30-50%. While healthy, they can delay post-workout nutrient absorption when speed is critical.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  This shake includes moderate fats (28g) for satiety and hormone support—but prioritizes fast carbs + protein for immediate recovery.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-primary to-primary/80 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              Ready to Build Serious Mass?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get access to our complete library of muscle-building shake recipes, 
              meal plans, and training programs designed by nutrition experts.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <BetterButton variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                View All Recipes
              </BetterButton>
              <BetterButton variant="primary" className="bg-white text-primary hover:bg-white/90">
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