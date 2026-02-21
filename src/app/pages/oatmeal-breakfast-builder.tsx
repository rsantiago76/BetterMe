import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Share2, Bookmark, Printer } from 'lucide-react';

export default function OatmealBreakfastBuilderPage() {
  const breakfastRecipe: ShakeRecipe = {
    id: 'oatmeal-breakfast-builder',
    name: 'Oatmeal Breakfast Builder',
    goal: 'breakfast',
    description: 'A complete breakfast replacement shake with complex carbs, quality protein, and healthy fats to fuel your morning and power through early training sessions.',
    ingredients: [
      { item: 'Whey protein powder', amount: '1 scoop', notes: '30g, vanilla or unflavored' },
      { item: 'Rolled oats', amount: '½ cup', notes: '40g, raw' },
      { item: 'Unsweetened almond milk', amount: '1 cup', notes: '240ml' },
      { item: 'Almond butter', amount: '1 tbsp', notes: '16g, natural' },
      { item: 'Vanilla extract', amount: '½ tsp', notes: 'pure extract' },
      { item: 'Frozen blueberries', amount: '½ cup', notes: 'or fresh' },
    ],
    instructions: [
      'Add unsweetened almond milk and rolled oats to blender',
      'Add whey protein powder, almond butter, vanilla extract, and frozen blueberries',
      'Blend on high speed for 60-90 seconds until oats are fully broken down and mixture is smooth',
      'Pour into a large glass and consume within 20 minutes of waking for optimal results',
    ],
    protein: 38,
    carbs: 55,
    fats: 18,
    calories: 530,
    bestTime: ['Morning'],
    timingReason: 'Provides sustained carbs and protein to fuel early training sessions while breaking overnight fast and jumpstarting metabolism.',
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
      <section className="bg-gradient-to-br from-accent/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
                <span className="text-sm font-bold text-accent uppercase tracking-wide">
                  Breakfast Recipe
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                {breakfastRecipe.name}
              </h1>
              <p className="text-xl text-muted-foreground">
                {breakfastRecipe.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Calories
                </div>
                <div className="text-3xl font-black text-foreground">
                  {breakfastRecipe.calories}
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Protein
                </div>
                <div className="text-3xl font-black text-primary">
                  {breakfastRecipe.protein}g
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Prep Time
                </div>
                <div className="text-3xl font-black text-foreground">
                  {breakfastRecipe.prepTime}m
                </div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Goal
                </div>
                <div className="text-2xl font-black text-accent capitalize">
                  {breakfastRecipe.goal}
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
                Everything you need for the perfect breakfast shake
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              <Printer className="w-4 h-4" />
              Print Recipe
            </BetterButton>
          </div>

          <ShakeRecipeCard recipe={breakfastRecipe} />

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
                  <span>Blend oats with liquid first for smoother consistency</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Use instant oats if you prefer a less thick texture</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Make it the night before and refrigerate for grab-and-go</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent font-bold">•</span>
                  <span>Add cinnamon or nutmeg for extra flavor without calories</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
              <h3 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                <span className="text-2xl">🔄</span>
                Substitutions
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Almond milk:</strong> Use regular milk for more protein</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Almond butter:</strong> Peanut butter works great too</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Blueberries:</strong> Swap for strawberries or banana</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold">•</span>
                  <span><strong>Oats:</strong> Use quinoa flakes for gluten-free option</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Nutrition Insight */}
          <div className="mt-8 bg-gradient-to-br from-accent/5 via-card to-primary/5 rounded-xl p-8 border border-accent/20">
            <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-3">
              <span className="text-3xl">🧬</span>
              Nutrition Insight: Morning Nutrition for Muscle Growth
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  Why Protein Timing Matters for Hypertrophy
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  After 8+ hours of fasting overnight, muscle protein breakdown accelerates. Consuming protein within 1 hour of waking halts catabolism and kickstarts anabolic processes.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  38g of protein breaks your fast optimally, preventing muscle loss and priming your body for morning training or work.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full"></span>
                  Fast vs Slow Digesting Proteins
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  <strong>Whey (Fast):</strong> Quick absorption reverses overnight fasting state rapidly.<br/>
                  <strong>Casein (Slow):</strong> Provides sustained fullness but delays the anabolic spike needed in the morning.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Fast-digesting whey is ideal for breakfast to quickly elevate amino acids and halt muscle breakdown.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-secondary rounded-full"></span>
                  Carb Timing for Glycogen Replenishment
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Complex carbs from oats provide sustained energy for 3-4 hours without blood sugar crashes. Morning carbs also restore liver glycogen depleted overnight.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  55g of slow-digesting carbs fuel early training sessions and cognitive function throughout the morning.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 border border-border">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full"></span>
                  When to Avoid Excess Fats
                </h4>
                <p className="text-sm text-muted-foreground mb-3">
                  While this shake contains 18g of healthy fats, they're strategically included for satiety and hormone support. Pre-workout, minimize fats to speed digestion.
                </p>
                <p className="text-sm text-foreground font-semibold">
                  Moderate fats from almond butter keep you full until lunch while supporting testosterone production for muscle growth.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-gradient-to-r from-accent to-accent/80 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-black text-white mb-3">
              Start Your Day the Right Way
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Get our complete breakfast nutrition guide with high-protein shake recipes, 
              meal timing strategies, and workout plans optimized for morning training.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <BetterButton variant="outline" className="border-white text-white hover:bg-white hover:text-accent">
                View Breakfast Plan
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