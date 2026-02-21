import React from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ShakeRecipeCard, ShakeRecipe } from '../components/shake-recipe-card';
import { ArrowLeft, Zap } from 'lucide-react';

const shakeRecipes: ShakeRecipe[] = [
  {
    id: 'mass-gainer',
    name: 'Mass Gainer Supreme',
    goal: 'bulking',
    description: 'High-calorie shake packed with quality protein and complex carbs for serious muscle growth.',
    ingredients: [
      { item: 'Whey protein powder', amount: '2 scoops', notes: 'vanilla or chocolate' },
      { item: 'Whole milk', amount: '2 cups', notes: '480ml' },
      { item: 'Rolled oats', amount: '1 cup', notes: '80g, raw' },
      { item: 'Banana', amount: '1 large', notes: 'frozen recommended' },
      { item: 'Peanut butter', amount: '3 tbsp', notes: 'natural, no sugar added' },
      { item: 'Greek yogurt', amount: '1/2 cup', notes: 'full-fat' },
      { item: 'Honey', amount: '1 tbsp' },
    ],
    instructions: [
      'Add milk to blender first to prevent sticking',
      'Add protein powder, oats, banana, peanut butter, and Greek yogurt',
      'Blend on high for 60-90 seconds until completely smooth and creamy',
      'Add honey and blend for 10 more seconds',
      'Pour into a large shaker bottle or glass and consume immediately',
    ],
    protein: 68,
    carbs: 125,
    fats: 32,
    calories: 1020,
    bestTime: ['Morning', 'Post-workout'],
    timingReason: 'High calorie and protein content supports muscle growth when consumed after training or as a calorie-dense breakfast during a bulk phase.',
    prepTime: 5,
    servings: 1,
  },
  {
    id: 'lean-protein',
    name: 'Lean Protein Shake',
    goal: 'cutting',
    description: 'Low-calorie, high-protein shake perfect for preserving muscle mass during a cut.',
    ingredients: [
      { item: 'Whey protein isolate', amount: '1.5 scoops', notes: 'unflavored or vanilla' },
      { item: 'Unsweetened almond milk', amount: '1.5 cups', notes: '360ml' },
      { item: 'Frozen berries', amount: '1/2 cup', notes: 'blueberries or strawberries' },
      { item: 'Spinach', amount: '1 cup', notes: 'fresh or frozen' },
      { item: 'Chia seeds', amount: '1 tbsp' },
      { item: 'Ice cubes', amount: '1/2 cup' },
      { item: 'Stevia', amount: '2-3 drops', notes: 'optional, to taste' },
    ],
    instructions: [
      'Combine almond milk, protein powder, and spinach in blender',
      'Add frozen berries, chia seeds, and ice',
      'Blend on high for 45-60 seconds until smooth',
      'Taste and add stevia if desired for sweetness',
      'Serve immediately in a chilled glass',
    ],
    protein: 42,
    carbs: 18,
    fats: 6,
    calories: 290,
    bestTime: ['Morning', 'Post-workout'],
    timingReason: 'Low-calorie, high-protein formula preserves lean muscle mass while maintaining a caloric deficit for fat loss.',
    prepTime: 3,
    servings: 1,
  },
  {
    id: 'recovery-blend',
    name: 'Recovery & Repair Blend',
    goal: 'recovery',
    description: 'Anti-inflammatory shake with optimal protein and antioxidants to accelerate muscle recovery.',
    ingredients: [
      { item: 'Whey protein powder', amount: '1 scoop', notes: 'vanilla' },
      { item: 'Coconut water', amount: '1 cup', notes: '240ml, unsweetened' },
      { item: 'Almond milk', amount: '1/2 cup', notes: 'unsweetened' },
      { item: 'Frozen cherries', amount: '1 cup', notes: 'tart cherries preferred' },
      { item: 'Pineapple', amount: '1/2 cup', notes: 'fresh or frozen chunks' },
      { item: 'Ginger', amount: '1 tsp', notes: 'fresh, grated' },
      { item: 'Turmeric powder', amount: '1/2 tsp' },
      { item: 'Flax seeds', amount: '1 tbsp', notes: 'ground' },
    ],
    instructions: [
      'Pour coconut water and almond milk into blender',
      'Add protein powder, cherries, pineapple, ginger, and turmeric',
      'Sprinkle ground flax seeds on top',
      'Blend on high for 60 seconds until completely smooth',
      'Let sit for 1 minute, then stir and drink within 30 minutes',
    ],
    protein: 30,
    carbs: 45,
    fats: 8,
    calories: 370,
    bestTime: ['Post-workout'],
    timingReason: 'Tart cherries and turmeric reduce inflammation and muscle soreness, while protein and carbs replenish glycogen and support muscle repair.',
    prepTime: 4,
    servings: 1,
  },
  {
    id: 'breakfast-boost',
    name: 'Breakfast Power Boost',
    goal: 'breakfast',
    description: 'Complete breakfast replacement with balanced macros to fuel your morning and kickstart muscle protein synthesis.',
    ingredients: [
      { item: 'Whey protein powder', amount: '1 scoop', notes: 'vanilla or chocolate' },
      { item: 'Whole milk', amount: '1 cup', notes: '240ml' },
      { item: 'Instant oats', amount: '1/2 cup', notes: '40g' },
      { item: 'Banana', amount: '1 medium', notes: 'ripe' },
      { item: 'Almond butter', amount: '1 tbsp' },
      { item: 'Cinnamon', amount: '1/2 tsp' },
      { item: 'Blueberries', amount: '1/4 cup', notes: 'fresh or frozen' },
      { item: 'Coffee', amount: '1/4 cup', notes: 'cold brew, optional' },
    ],
    instructions: [
      'Combine milk, protein powder, oats, and banana in blender',
      'Add almond butter, cinnamon, blueberries, and coffee if using',
      'Blend on medium-high for 45 seconds until oats are fully incorporated',
      'Check consistency and add more milk if too thick',
      'Pour into a large glass and consume within 20 minutes of waking',
    ],
    protein: 38,
    carbs: 62,
    fats: 14,
    calories: 520,
    bestTime: ['Morning'],
    timingReason: 'Morning protein intake stimulates muscle protein synthesis after overnight fasting, while complex carbs provide sustained energy throughout the morning.',
    prepTime: 4,
    servings: 1,
  },
  {
    id: 'pre-workout-energy',
    name: 'Pre-Workout Energy Shake',
    goal: 'bulking',
    description: 'Fast-digesting carbs and moderate protein to fuel intense training sessions without digestive discomfort.',
    ingredients: [
      { item: 'Whey protein isolate', amount: '1 scoop', notes: 'vanilla' },
      { item: 'Water', amount: '1 cup', notes: '240ml, cold' },
      { item: 'White rice', amount: '1/2 cup', notes: 'cooked and cooled' },
      { item: 'Banana', amount: '1 medium' },
      { item: 'Honey', amount: '1 tbsp' },
      { item: 'Salt', amount: '1 pinch', notes: 'for electrolytes' },
      { item: 'Ice', amount: '1/2 cup' },
    ],
    instructions: [
      'Add cold water and protein isolate to blender',
      'Add cooked rice, banana, honey, and pinch of salt',
      'Add ice and blend on high for 60 seconds',
      'Blend until rice is completely smooth with no chunks',
      'Consume 45-60 minutes before training for optimal performance',
    ],
    protein: 28,
    carbs: 68,
    fats: 2,
    calories: 410,
    bestTime: ['Pre-workout'],
    timingReason: 'Fast-digesting carbs provide immediate energy for training, while moderate protein prevents muscle breakdown during intense workouts.',
    prepTime: 3,
    servings: 1,
  },
  {
    id: 'bedtime-casein',
    name: 'Bedtime Casein Dream',
    goal: 'bulking',
    description: 'Slow-digesting protein shake to support overnight muscle protein synthesis and prevent catabolism.',
    ingredients: [
      { item: 'Casein protein powder', amount: '1.5 scoops', notes: 'chocolate or vanilla' },
      { item: 'Whole milk', amount: '1 cup', notes: '240ml' },
      { item: 'Greek yogurt', amount: '1/2 cup', notes: 'full-fat, plain' },
      { item: 'Almond butter', amount: '1 tbsp' },
      { item: 'Cocoa powder', amount: '1 tsp', notes: 'unsweetened' },
      { item: 'Cinnamon', amount: '1/4 tsp' },
      { item: 'Ice', amount: '3-4 cubes', notes: 'optional' },
    ],
    instructions: [
      'Combine milk, casein powder, and Greek yogurt in blender',
      'Add almond butter, cocoa powder, and cinnamon',
      'Blend on medium speed for 30-45 seconds (casein can foam if over-blended)',
      'Add ice if desired for a thicker, colder shake',
      'Drink 30-60 minutes before bed for sustained protein release',
    ],
    protein: 50,
    carbs: 24,
    fats: 16,
    calories: 450,
    bestTime: ['Before bed'],
    timingReason: 'Casein protein digests slowly over 6-8 hours, providing sustained amino acid release to prevent muscle breakdown and support growth during sleep.',
    prepTime: 3,
    servings: 1,
  },
];

export default function ShakeCardsDemoPage() {
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
              <BetterButton variant="primary" size="sm">
                Save Recipe
              </BetterButton>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-start gap-6 mb-6">
            <div className="hidden md:flex w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                Protein Shake Recipe Cards
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Reusable, scientific recipe cards with complete macro breakdowns, timing guidance, 
                and step-by-step instructions for optimal results.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Cards Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-8">
          <h2 className="text-2xl font-black text-foreground mb-2">Featured Shake Recipes</h2>
          <p className="text-muted-foreground">
            Each card includes exact measurements, macros, timing, and scientific rationale
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {shakeRecipes.map((recipe) => (
            <ShakeRecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </section>

      {/* Design System Notes */}
      <section className="bg-muted/30 py-16 border-t border-border">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-foreground mb-6">Component Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">✓</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Complete Nutrition Data</h3>
              <p className="text-sm text-muted-foreground">
                Calories, protein, carbs, and fats displayed prominently with color-coded badges
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">⏰</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Optimal Timing</h3>
              <p className="text-sm text-muted-foreground">
                Best time to drink with scientific rationale for maximum effectiveness
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">📋</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Exact Measurements</h3>
              <p className="text-sm text-muted-foreground">
                Precise ingredient amounts in cups, tbsp, oz, and grams for consistency
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎯</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Goal-Oriented</h3>
              <p className="text-sm text-muted-foreground">
                Tagged by fitness goal: Bulking, Cutting, Recovery, or Breakfast
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🔢</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Step-by-Step</h3>
              <p className="text-sm text-muted-foreground">
                Clear, numbered instructions (3-5 steps max) for easy preparation
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 border border-border">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-xl">🎨</span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Clean Design</h3>
              <p className="text-sm text-muted-foreground">
                Professional fitness app aesthetic with strong typographic hierarchy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
