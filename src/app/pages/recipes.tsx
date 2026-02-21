import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { RecipeCard, Recipe } from '../components/recipe-card';
import { RecipeDetailModal } from '../components/recipe-detail-modal';
import { MainNavigation } from '../components/main-navigation';
import { ArrowLeft, Coffee } from 'lucide-react';

const recipes: Recipe[] = [
  // MASS BUILDER SHAKES
  {
    id: 'mass-builder',
    name: 'Mass Builder Shake',
    goal: 'bulking',
    description: 'High-calorie, protein-packed shake designed to maximize muscle growth and weight gain.',
    ingredients: [
      { item: 'Whey protein powder', amount: '2 scoops' },
      { item: 'Whole milk', amount: '2 cups' },
      { item: 'Banana', amount: '1 large' },
      { item: 'Peanut butter', amount: '2 tbsp' },
      { item: 'Oats', amount: '1/2 cup' },
      { item: 'Greek yogurt', amount: '1/2 cup' },
      { item: 'Honey', amount: '1 tbsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 65,
    carbs: 98,
    fats: 28,
    calories: 890,
    bestTime: ['Post-workout', 'Breakfast replacement'],
    timingReason: 'Post-workout provides rapid nutrient delivery when muscles are primed for growth. As a breakfast replacement, it jumpstarts muscle protein synthesis and provides sustained energy. The high calorie and protein content supports an anabolic state throughout the day.',
    instructions: [
      'Add liquid (milk) to blender first to prevent sticking',
      'Add protein powder, oats, and peanut butter',
      'Add banana, Greek yogurt, and honey',
      'Add ice last',
      'Blend on high for 45-60 seconds until smooth and creamy',
      'Pour into a large glass and consume within 30 minutes for best texture',
    ],
    tips: [
      'Freeze banana slices beforehand for a thicker, ice cream-like consistency',
      'Add 1 tsp of cinnamon for flavor and blood sugar regulation',
      'For extra calories, add 1/4 cup of nuts or nut butter',
      'Use chocolate protein powder for a dessert-like taste',
      'Prep dry ingredients the night before for quick morning blending',
    ],
  },

  {
    id: 'chocolate-powerhouse',
    name: 'Chocolate Powerhouse',
    goal: 'bulking',
    description: 'Rich chocolate shake with maximum protein and calories for serious mass building.',
    ingredients: [
      { item: 'Chocolate whey protein', amount: '2 scoops' },
      { item: 'Whole milk', amount: '1.5 cups' },
      { item: 'Avocado', amount: '1/2 medium' },
      { item: 'Almond butter', amount: '2 tbsp' },
      { item: 'Cocoa powder', amount: '1 tbsp' },
      { item: 'Dates', amount: '2 pitted' },
      { item: 'Vanilla extract', amount: '1 tsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 62,
    carbs: 72,
    fats: 36,
    calories: 880,
    bestTime: ['Post-workout', 'Before bed'],
    timingReason: 'Post-workout delivers quick protein and healthy fats for muscle repair. Before bed, the combination of fast and slow-digesting proteins with healthy fats provides sustained amino acid release overnight, preventing muscle breakdown during sleep.',
    instructions: [
      'Add milk to blender first',
      'Add protein powder, cocoa powder, and almond butter',
      'Scoop out avocado flesh and add to blender',
      'Add pitted dates and vanilla extract',
      'Add ice and blend until completely smooth (1-2 minutes)',
      'Adjust thickness with more milk or ice as needed',
    ],
    tips: [
      'Avocado adds creaminess without affecting chocolate flavor',
      'Dates provide natural sweetness and quick carbs',
      'Chill the glass beforehand for an extra-cold treat',
      'Add a pinch of sea salt to enhance chocolate flavor',
      'For mocha version, add 1/4 cup cold brew coffee',
    ],
  },

  // LEAN MUSCLE SHAKES
  {
    id: 'lean-muscle-green',
    name: 'Lean Muscle Green Shake',
    goal: 'cutting',
    description: 'Nutrient-dense, low-calorie shake packed with greens and high-quality protein for lean gains.',
    ingredients: [
      { item: 'Vanilla whey protein', amount: '1 scoop' },
      { item: 'Unsweetened almond milk', amount: '1.5 cups' },
      { item: 'Spinach', amount: '2 cups' },
      { item: 'Cucumber', amount: '1/2 medium' },
      { item: 'Green apple', amount: '1/2 medium' },
      { item: 'Chia seeds', amount: '1 tbsp' },
      { item: 'Lemon juice', amount: '1 tbsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 28,
    carbs: 24,
    fats: 6,
    calories: 260,
    bestTime: ['Post-workout', 'Breakfast replacement'],
    timingReason: 'Low-calorie yet nutrient-dense, perfect for post-workout recovery while staying in a caloric deficit. The greens provide antioxidants and micronutrients. As a breakfast replacement, it supports fat loss while preserving muscle mass with high protein content.',
    instructions: [
      'Add almond milk to blender',
      'Add spinach and blend until smooth',
      'Add protein powder and chia seeds',
      'Chop cucumber and apple, add to blender',
      'Add lemon juice and ice',
      'Blend on high for 60 seconds until bright green and smooth',
    ],
    tips: [
      'Add spinach first and blend with liquid to avoid chunks',
      'Use frozen spinach cubes for convenience',
      'Add fresh mint or basil for extra flavor',
      'Peel cucumber if you prefer less bitterness',
      'Add 1/2 frozen banana for natural sweetness (adds ~50 cal)',
    ],
  },

  {
    id: 'berry-blast',
    name: 'Berry Blast Lean Shake',
    goal: 'cutting',
    description: 'Antioxidant-rich berry shake with high protein and low calories for lean muscle building.',
    ingredients: [
      { item: 'Vanilla protein powder', amount: '1 scoop' },
      { item: 'Unsweetened almond milk', amount: '1 cup' },
      { item: 'Mixed berries (frozen)', amount: '1 cup' },
      { item: 'Greek yogurt (non-fat)', amount: '1/2 cup' },
      { item: 'Flax seeds', amount: '1 tbsp' },
      { item: 'Stevia', amount: 'to taste' },
      { item: 'Ice', amount: '1/2 cup' },
    ],
    protein: 35,
    carbs: 28,
    fats: 5,
    calories: 295,
    bestTime: ['Post-workout', 'Breakfast replacement'],
    timingReason: 'Berries provide antioxidants that reduce exercise-induced inflammation. The high protein-to-calorie ratio supports muscle retention during a cut. Post-workout timing capitalizes on insulin sensitivity for nutrient partitioning to muscle, not fat storage.',
    instructions: [
      'Add almond milk to blender',
      'Add protein powder and Greek yogurt',
      'Add frozen berries (no need to thaw)',
      'Add flax seeds and stevia if using',
      'Blend until smooth and creamy',
      'Add ice if using fresh berries or for thicker consistency',
    ],
    tips: [
      'Buy frozen mixed berries in bulk for cost savings',
      'Blueberries are highest in antioxidants',
      'Add a handful of kale for extra greens without affecting taste',
      'Greek yogurt adds creaminess and extra protein',
      'Use as post-cardio recovery shake',
    ],
  },

  // RECOVERY SHAKES
  {
    id: 'peanut-butter-recovery',
    name: 'Peanut Butter Recovery Shake',
    goal: 'recovery',
    description: 'Balanced shake with optimal protein, healthy fats, and anti-inflammatory ingredients for enhanced recovery.',
    ingredients: [
      { item: 'Whey protein powder', amount: '1.5 scoops' },
      { item: 'Unsweetened almond milk', amount: '1.5 cups' },
      { item: 'Natural peanut butter', amount: '2 tbsp' },
      { item: 'Banana', amount: '1 medium' },
      { item: 'Tart cherry juice', amount: '1/4 cup' },
      { item: 'Cinnamon', amount: '1/2 tsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 42,
    carbs: 48,
    fats: 18,
    calories: 520,
    bestTime: ['Post-workout', 'Before bed'],
    timingReason: 'Tart cherry juice reduces muscle soreness and inflammation. The combination of protein and healthy fats supports muscle repair. Post-workout replenishes glycogen and kickstarts recovery. Before bed, it provides sustained amino acid release for overnight muscle repair.',
    instructions: [
      'Add almond milk and tart cherry juice to blender',
      'Add protein powder and peanut butter',
      'Break banana into chunks and add',
      'Add cinnamon and ice',
      'Blend for 45 seconds until smooth',
      'Taste and adjust sweetness if needed',
    ],
    tips: [
      'Tart cherry juice is proven to reduce DOMS (delayed onset muscle soreness)',
      'Use frozen banana for thicker texture',
      'Add 1 tsp turmeric for extra anti-inflammatory benefits',
      'Cinnamon helps with blood sugar regulation',
      'For extra thickness, reduce liquid by 1/4 cup',
    ],
  },

  {
    id: 'golden-turmeric',
    name: 'Golden Turmeric Recovery',
    goal: 'recovery',
    description: 'Anti-inflammatory powerhouse with turmeric, ginger, and high-quality protein for optimal recovery.',
    ingredients: [
      { item: 'Vanilla protein powder', amount: '1.5 scoops' },
      { item: 'Coconut milk', amount: '1 cup' },
      { item: 'Banana', amount: '1 medium' },
      { item: 'Turmeric powder', amount: '1 tsp' },
      { item: 'Fresh ginger', amount: '1/2 inch' },
      { item: 'Black pepper', amount: 'pinch' },
      { item: 'Honey', amount: '1 tsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 38,
    carbs: 42,
    fats: 14,
    calories: 450,
    bestTime: ['Post-workout', 'Before bed'],
    timingReason: 'Turmeric and ginger are potent anti-inflammatories that accelerate recovery. Black pepper enhances turmeric absorption by 2000%. Coconut milk provides MCTs for quick energy and healthy fats. Ideal post-workout or before bed for overnight muscle repair.',
    instructions: [
      'Add coconut milk to blender',
      'Add protein powder',
      'Break banana into chunks and add',
      'Add turmeric powder, grated ginger, and black pepper',
      'Add honey and ice',
      'Blend until smooth and golden',
    ],
    tips: [
      'Black pepper is essential—it increases turmeric absorption dramatically',
      'Start with less turmeric and adjust to taste',
      'Fresh ginger is more potent than powdered',
      'Add a handful of spinach for extra nutrients',
      'This shake has a unique, warming flavor—embrace it!',
    ],
  },

  // BREAKFAST SHAKES
  {
    id: 'oatmeal-breakfast',
    name: 'Oatmeal Breakfast Shake',
    goal: 'bulking',
    description: 'Complete breakfast in a glass with slow-digesting oats, protein, and healthy fats for sustained energy.',
    ingredients: [
      { item: 'Vanilla protein powder', amount: '1.5 scoops' },
      { item: 'Whole milk', amount: '1.5 cups' },
      { item: 'Rolled oats', amount: '1/2 cup' },
      { item: 'Banana', amount: '1 medium' },
      { item: 'Almond butter', amount: '1 tbsp' },
      { item: 'Cinnamon', amount: '1 tsp' },
      { item: 'Vanilla extract', amount: '1/2 tsp' },
      { item: 'Ice', amount: '1/2 cup' },
    ],
    protein: 48,
    carbs: 72,
    fats: 20,
    calories: 660,
    bestTime: ['Breakfast replacement', 'Pre-workout'],
    timingReason: 'Oats provide slow-releasing carbs for sustained energy throughout the morning. High protein content kickstarts muscle protein synthesis. Perfect for those who can\'t eat solid food early or need convenient nutrition before work/training.',
    instructions: [
      'Add milk to blender first',
      'Add oats and let soak for 1-2 minutes (makes smoother)',
      'Add protein powder, almond butter, and banana',
      'Add cinnamon and vanilla extract',
      'Add ice and blend until completely smooth (90 seconds)',
      'Let sit for 30 seconds if too thick, then stir',
    ],
    tips: [
      'Use quick oats for smoother texture or regular oats for more chewiness',
      'Soak oats overnight in milk for easier blending',
      'Add 1/4 cup of blueberries for antioxidants',
      'Top with granola after pouring for crunch',
      'Make the night before and refrigerate—shake in the morning',
    ],
  },

  {
    id: 'coffee-protein',
    name: 'Coffee Protein Power Shake',
    goal: 'cutting',
    description: 'Energizing coffee-based protein shake with metabolism-boosting properties for lean muscle maintenance.',
    ingredients: [
      { item: 'Vanilla protein powder', amount: '1 scoop' },
      { item: 'Cold brew coffee', amount: '1 cup' },
      { item: 'Unsweetened almond milk', amount: '1/2 cup' },
      { item: 'Banana', amount: '1/2 medium' },
      { item: 'Cocoa powder', amount: '1 tbsp' },
      { item: 'MCT oil or coconut oil', amount: '1 tsp' },
      { item: 'Ice', amount: '1 cup' },
    ],
    protein: 28,
    carbs: 18,
    fats: 6,
    calories: 240,
    bestTime: ['Breakfast replacement', 'Pre-workout'],
    timingReason: 'Caffeine boosts metabolism and enhances workout performance. MCT oil provides quick energy that won\'t be stored as fat. High protein-to-calorie ratio preserves muscle during a cut. Perfect pre-workout for energy or as a low-calorie breakfast replacement.',
    instructions: [
      'Brew cold brew coffee the night before (or use store-bought)',
      'Add cold brew and almond milk to blender',
      'Add protein powder and cocoa powder',
      'Add banana and MCT oil',
      'Add ice and blend until frothy and smooth',
      'Pour and drink immediately for best foam',
    ],
    tips: [
      'Use cold brew instead of hot coffee for smoother taste',
      'MCT oil provides sustained energy without fat storage',
      'Add a pinch of sea salt for "salted mocha" flavor',
      'For iced coffee shop taste, top with sugar-free whipped cream',
      'Drink 30 minutes before workout for peak caffeine effect',
    ],
  },
];

export default function RecipesPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const filters = [
    { id: 'All', label: 'All Recipes', icon: '🥤' },
    { id: 'bulking', label: 'Mass Builder', icon: '💪' },
    { id: 'cutting', label: 'Lean Muscle', icon: '🥗' },
    { id: 'recovery', label: 'Recovery', icon: '🧘' },
  ];

  const filteredRecipes =
    activeFilter === 'All'
      ? recipes
      : recipes.filter((recipe) => recipe.goal === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="flex items-start gap-6 mb-6">
            <div className="hidden md:flex w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
              <Coffee className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                Protein Shake Recipes
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Delicious, macro-optimized protein shakes for every goal. Whether you're building mass, 
                cutting fat, or recovering from intense training, we've got the perfect shake for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="border-b border-border bg-card sticky top-[73px] z-30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 whitespace-nowrap flex items-center gap-2 ${
                  activeFilter === filter.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span>{filter.icon}</span>
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Tips Banner */}
      <section className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">
                💡 Pro Blending Tips
              </h3>
              <p className="text-muted-foreground">
                Always add liquid first to prevent protein powder from sticking. Blend leafy greens with 
                liquid before adding other ingredients for smoothest texture. Use frozen fruit to eliminate 
                the need for ice and create a thicker shake.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredRecipes.length}</span>{' '}
            {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => setSelectedRecipe(recipe)}
            />
          ))}
        </div>
      </section>

      {/* Shake Building Guide */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-foreground mb-8">Build Your Own Shake</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🥛</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Choose Your Base
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Whole milk (high calorie)</li>
                <li>• Almond milk (low calorie)</li>
                <li>• Coconut milk (healthy fats)</li>
                <li>• Water (zero calorie)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Add Protein
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Whey (fast-absorbing)</li>
                <li>• Casein (slow-digesting)</li>
                <li>• Plant protein (vegan)</li>
                <li>• Greek yogurt (natural)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🍌</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Pick Carbs
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Banana (quick energy)</li>
                <li>• Oats (sustained energy)</li>
                <li>• Berries (low glycemic)</li>
                <li>• Dates (natural sweetener)</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🥑</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Add Healthy Fats
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Peanut butter (flavor + fat)</li>
                <li>• Avocado (creaminess)</li>
                <li>• Chia seeds (omega-3)</li>
                <li>• MCT oil (quick energy)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={!!selectedRecipe}
        onClose={() => setSelectedRecipe(null)}
      />
    </div>
  );
}