import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';

export default function PeanutButterRecoveryPage() {
  const recoveryRecipe: ShakeRecipe = {
    id: 'peanut-butter-recovery-blend',
    name: 'Peanut Butter Recovery Blend',
    goal: 'recovery',
    description: 'A perfectly balanced post-workout shake combining protein, antioxidants, and healthy fats to accelerate muscle recovery and reduce inflammation.',
    ingredients: [
      { item: 'Chocolate whey protein', amount: '1 scoop', notes: '30g' },
      { item: 'Peanut butter', amount: '1 tbsp', notes: '16g, natural' },
      { item: '2% milk', amount: '1 cup', notes: '240ml' },
      { item: 'Frozen berries', amount: '½ cup', notes: '70g, mixed berries' },
      { item: 'Honey', amount: '1 tbsp', notes: 'optional, for sweetness' },
    ],
    instructions: [
      'Pour 2% milk into blender first to create a liquid base',
      'Add chocolate whey protein powder and peanut butter',
      'Add frozen berries and honey if using for extra sweetness',
      'Blend on high speed for 45-60 seconds until smooth and creamy',
      'Consume within 30 minutes post-workout for optimal muscle recovery',
    ],
    protein: 42,
    carbs: 35,
    fats: 18,
    calories: 510,
    bestTime: ['Post-workout'],
    timingReason: 'Supports muscle protein synthesis and replenishes energy stores when consumed within 30 minutes after training.',
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
      <section className="bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-4">
                <span className="text-sm font-bold text-secondary uppercase tracking-wide">
                  Recovery Recipe
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                {recoveryRecipe.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {recoveryRecipe.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Calories
                </div>
                <div className="text-3xl font-black text-foreground">
                  {recoveryRecipe.calories}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Protein
                </div>
                <div className="text-3xl font-black text-primary">
                  {recoveryRecipe.protein}g
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Prep Time
                </div>
                <div className="text-3xl font-black text-foreground">
                  {recoveryRecipe.prepTime}m
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Goal
                </div>
                <div className="text-2xl font-black text-secondary capitalize">
                  {recoveryRecipe.goal}
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
                Everything you need to maximize post-workout recovery
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print Recipe
            </BetterButton>
          </div>

          <ShakeRecipeCard recipe={recoveryRecipe} />

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
                  <span>Use frozen berries for a thicker, colder shake</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Add ice cubes if you prefer an extra-cold texture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Consume within 30 minutes after training for best results</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-secondary font-bold">•</span>
                  <span>Swap berries for cherries for extra anti-inflammatory benefits</span>
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
                  <span><strong>Milk:</strong> Use almond milk to reduce calories</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Peanut butter:</strong> Almond or cashew butter works well</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Berries:</strong> Swap for tart cherries or pomegranate</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Honey:</strong> Use maple syrup or skip for lower carbs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nutrition Insight */}
          <div className="mt-8 bg-gradient-to-br from-secondary/5 via-card to-primary/5 rounded-xl p-8 border border-secondary/20">
            <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              Nutrition Insight: Post-Workout Recovery Science
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Why Protein Timing Matters for Hypertrophy
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  The 30-minute post-workout window is when muscle protein synthesis is most sensitive to amino acids. Delaying protein intake reduces recovery efficiency by up to 50%.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  42g of whey protein within 30 minutes maximizes muscle repair and reduces soreness for your next training session.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fast vs Slow Digesting Proteins
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Whey (Fast):</strong> Peak amino acid levels in 60-90 minutes—ideal for post-workout.<br/>
                  <strong>Casein (Slow):</strong> Gradual release over 7-8 hours—better for overnight recovery.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Post-workout recovery demands fast-acting whey to quickly halt muscle breakdown and initiate repair.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Carb Timing for Glycogen Replenishment
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Post-workout glycogen resynthesis is 2-3x faster when carbs are consumed immediately after training. The 3:1 carb-to-protein ratio is scientifically optimal.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  35g of carbs from berries and honey restore glycogen stores while antioxidants reduce inflammation from training.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  When to Avoid Excess Fats
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  While fats slow digestion, moderate amounts (18g) in recovery shakes improve satiety and support hormone production without significantly delaying absorption.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Healthy fats from peanut butter provide sustained energy and aid absorption of fat-soluble vitamins from berries.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-secondary to-secondary/80 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              Accelerate Your Recovery Today
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get our complete recovery nutrition guide with science-backed shake recipes, 
              meal timing strategies, and training programs optimized for maximum muscle growth.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <BetterButton variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                View Recovery Plan
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