import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { FoodCard, Food } from '../components/food-card';
import { FoodDetailModal } from '../components/food-detail-modal';
import { MainNavigation } from '../components/main-navigation';
import { ArrowLeft } from 'lucide-react';

const foods: Food[] = [
  // HIGH-PROTEIN FOODS
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'protein',
    calories: 165,
    protein: 31,
    carbs: 0,
    fats: 3.6,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'Lean protein is ideal post-workout for muscle repair without excess calories. Morning consumption helps maintain an anabolic state and provides sustained energy throughout the day.',
    pairings: [
      'Pair with brown rice and broccoli for a complete post-workout meal',
      'Add to whole grain wraps with avocado for healthy fats',
      'Combine with sweet potato and asparagus for recovery',
      'Mix into oatmeal (shredded) for a high-protein breakfast',
    ],
  },
  {
    id: 'salmon',
    name: 'Wild Salmon',
    category: 'protein',
    calories: 208,
    protein: 25,
    carbs: 0,
    fats: 13,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Post-workout', 'Before bed'],
    timingReason: 'Rich in omega-3 fatty acids which reduce inflammation and support recovery. The healthy fats slow protein digestion, making it ideal before bed for sustained amino acid release during sleep.',
    pairings: [
      'Serve with quinoa and roasted vegetables for dinner',
      'Pair with sweet potato wedges and steamed greens',
      'Add to salad with nuts and olive oil dressing',
      'Combine with brown rice and edamame for complete nutrition',
    ],
  },
  {
    id: 'greek-yogurt',
    name: 'Greek Yogurt (Plain)',
    category: 'protein',
    calories: 100,
    protein: 17,
    carbs: 6,
    fats: 0.4,
    servingSize: '170g (6 oz)',
    bestTime: ['Post-workout', 'Before bed', 'Morning'],
    timingReason: 'Contains both fast and slow-digesting proteins (whey and casein). Post-workout it kickstarts recovery, while before bed the casein provides slow-release amino acids for overnight muscle repair.',
    pairings: [
      'Mix with berries, honey, and granola for breakfast',
      'Blend with banana and protein powder post-workout',
      'Add to smoothies with oats and peanut butter',
      'Top with nuts, seeds, and cinnamon before bed',
    ],
  },
  {
    id: 'eggs',
    name: 'Whole Eggs',
    category: 'protein',
    calories: 155,
    protein: 13,
    carbs: 1.1,
    fats: 11,
    servingSize: '2 large eggs',
    bestTime: ['Morning', 'Post-workout'],
    timingReason: 'Complete protein with all essential amino acids. The cholesterol in yolks supports testosterone production, crucial for muscle building. Morning consumption stabilizes blood sugar and provides sustained energy.',
    pairings: [
      'Scramble with spinach, mushrooms, and whole grain toast',
      'Make an omelet with vegetables and cheese',
      'Hard-boil for a portable protein snack',
      'Combine with avocado on sourdough for healthy fats',
    ],
  },

  // COMPLEX CARBS
  {
    id: 'sweet-potato',
    name: 'Sweet Potato',
    category: 'carbs',
    calories: 86,
    protein: 1.6,
    carbs: 20,
    fats: 0.1,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'High in complex carbs that replenish glycogen stores depleted during training. The fiber content provides sustained energy without blood sugar spikes. Post-workout timing maximizes nutrient partitioning to muscles.',
    pairings: [
      'Roast with cinnamon and pair with grilled chicken',
      'Mash and serve with lean beef and green beans',
      'Cut into wedges, bake, and serve with salmon',
      'Dice and add to breakfast hash with eggs',
    ],
  },
  {
    id: 'brown-rice',
    name: 'Brown Rice',
    category: 'carbs',
    calories: 112,
    protein: 2.6,
    carbs: 24,
    fats: 0.9,
    servingSize: '100g cooked',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'Excellent for glycogen replenishment with slow-digesting carbs that provide stable energy. Post-workout consumption with protein creates an optimal anabolic environment. Morning intake fuels intense training sessions.',
    pairings: [
      'Mix with black beans and grilled chicken for a power bowl',
      'Combine with stir-fried vegetables and lean protein',
      'Add to soup with lentils and turkey',
      'Use as base for Buddha bowls with salmon and veggies',
    ],
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal',
    category: 'carbs',
    calories: 71,
    protein: 2.5,
    carbs: 12,
    fats: 1.5,
    servingSize: '40g dry oats',
    bestTime: ['Morning', 'Pre-workout'],
    timingReason: 'Slow-releasing carbs provide sustained energy for 2-3 hours, perfect before morning workouts. The beta-glucan fiber supports cardiovascular health and stable blood sugar. Contains B-vitamins essential for energy metabolism.',
    pairings: [
      'Top with protein powder, berries, and almond butter',
      'Mix with Greek yogurt, banana, and honey',
      'Add chia seeds, cinnamon, and sliced apple',
      'Combine with cottage cheese and walnuts',
    ],
  },
  {
    id: 'quinoa',
    name: 'Quinoa',
    category: 'carbs',
    calories: 120,
    protein: 4.4,
    carbs: 21,
    fats: 1.9,
    servingSize: '100g cooked',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'Complete protein source (rare for grains) with all 9 essential amino acids. High in complex carbs for glycogen restoration. Contains iron and magnesium which support muscle function and recovery.',
    pairings: [
      'Mix with chickpeas, cucumber, and feta for a protein-rich salad',
      'Combine with grilled chicken and roasted vegetables',
      'Use as base for burrito bowls with beans and lean meat',
      'Add to breakfast bowls with eggs and avocado',
    ],
  },

  // HEALTHY FATS
  {
    id: 'avocado',
    name: 'Avocado',
    category: 'fats',
    calories: 160,
    protein: 2,
    carbs: 8.5,
    fats: 15,
    servingSize: '100g (1/2 medium)',
    bestTime: ['Morning', 'Pre-workout'],
    timingReason: 'Monounsaturated fats support hormone production (including testosterone) and reduce inflammation. Morning consumption provides sustained energy. The potassium content (more than bananas) prevents muscle cramps.',
    pairings: [
      'Mash on whole grain toast with poached eggs',
      'Add to smoothies for creaminess and healthy fats',
      'Dice into salads with chicken and nuts',
      'Spread on rice cakes with smoked salmon',
    ],
  },
  {
    id: 'almonds',
    name: 'Raw Almonds',
    category: 'fats',
    calories: 164,
    protein: 6,
    carbs: 6,
    fats: 14,
    servingSize: '28g (1 oz / ~23 almonds)',
    bestTime: ['Pre-workout', 'Morning'],
    timingReason: 'Rich in vitamin E (antioxidant for muscle recovery) and magnesium (muscle contraction and energy production). The healthy fats provide slow-burning energy ideal 1-2 hours pre-workout.',
    pairings: [
      'Mix into Greek yogurt with honey and berries',
      'Add to oatmeal with banana and cinnamon',
      'Blend into smoothies with protein powder',
      'Combine with dark chocolate for a post-dinner treat',
    ],
  },
  {
    id: 'olive-oil',
    name: 'Extra Virgin Olive Oil',
    category: 'fats',
    calories: 119,
    protein: 0,
    carbs: 0,
    fats: 13.5,
    servingSize: '1 tablespoon (15ml)',
    bestTime: ['Morning', 'Post-workout'],
    timingReason: 'Monounsaturated fats reduce inflammation and support cardiovascular health. The polyphenols act as antioxidants, protecting muscles from oxidative stress during intense training. Aids absorption of fat-soluble vitamins.',
    pairings: [
      'Drizzle over salads with balsamic vinegar',
      'Use for cooking vegetables and lean proteins',
      'Mix into hummus or bean dips',
      'Combine with lemon juice for marinade',
    ],
  },
  {
    id: 'peanut-butter',
    name: 'Natural Peanut Butter',
    category: 'fats',
    calories: 188,
    protein: 8,
    carbs: 7,
    fats: 16,
    servingSize: '2 tablespoons (32g)',
    bestTime: ['Pre-workout', 'Before bed'],
    timingReason: 'Combination of protein, healthy fats, and slow-digesting carbs provides sustained energy. Before bed, it helps prevent muscle breakdown during sleep. Pre-workout (1-2 hours before) it fuels training without causing digestive issues.',
    pairings: [
      'Spread on whole grain bread with banana slices',
      'Mix into protein shakes with oats and milk',
      'Add to apple slices for a quick snack',
      'Stir into Greek yogurt with honey',
    ],
  },

  // RECOVERY FOODS
  {
    id: 'tart-cherry',
    name: 'Tart Cherry Juice',
    category: 'recovery',
    calories: 52,
    protein: 0.5,
    carbs: 13,
    fats: 0,
    servingSize: '100ml (3.4 oz)',
    bestTime: ['Post-workout', 'Before bed'],
    timingReason: 'High in anthocyanins which reduce muscle soreness and inflammation. Studies show it accelerates recovery by reducing oxidative stress. Before bed, it naturally boosts melatonin for better sleep quality—critical for muscle repair.',
    pairings: [
      'Drink straight after intense workouts',
      'Mix with protein shake post-training',
      'Combine with Greek yogurt for a recovery smoothie',
      'Drink 1 hour before bed for better sleep',
    ],
  },
  {
    id: 'blueberries',
    name: 'Blueberries',
    category: 'recovery',
    calories: 57,
    protein: 0.7,
    carbs: 14,
    fats: 0.3,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'Packed with antioxidants that combat exercise-induced oxidative stress and inflammation. The natural sugars help replenish glycogen post-workout. Supports cognitive function and reduces delayed onset muscle soreness (DOMS).',
    pairings: [
      'Add to protein pancakes with maple syrup',
      'Mix into oatmeal with Greek yogurt',
      'Blend into smoothies with protein powder',
      'Top cottage cheese with berries and nuts',
    ],
  },
  {
    id: 'spinach',
    name: 'Spinach',
    category: 'recovery',
    calories: 23,
    protein: 2.9,
    carbs: 3.6,
    fats: 0.4,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Post-workout', 'Morning'],
    timingReason: 'Rich in nitrates that improve blood flow and oxygen delivery to muscles. High in iron (prevents fatigue) and magnesium (muscle relaxation and recovery). The vitamin K supports bone health critical for heavy lifting.',
    pairings: [
      'Sauté with garlic and add to egg omelets',
      'Blend raw into smoothies with fruit and protein',
      'Add to pasta with chicken and olive oil',
      'Mix into salads with salmon and nuts',
    ],
  },
  {
    id: 'cottage-cheese',
    name: 'Cottage Cheese',
    category: 'recovery',
    calories: 98,
    protein: 11,
    carbs: 3.4,
    fats: 4.3,
    servingSize: '100g (3.5 oz)',
    bestTime: ['Before bed', 'Post-workout'],
    timingReason: 'High in casein protein which digests slowly (7-8 hours), providing a steady stream of amino acids during sleep. This prevents muscle breakdown overnight and supports recovery. Contains calcium for bone health and muscle contractions.',
    pairings: [
      'Mix with berries and a drizzle of honey before bed',
      'Combine with pineapple and almonds',
      'Add to smoothies for extra protein',
      'Top with sliced peaches and cinnamon',
    ],
  },
];

export default function NutritionPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);

  const filters = [
    { id: 'All', label: 'All Foods', icon: '🍽️' },
    { id: 'protein', label: 'High-Protein', icon: '🥩' },
    { id: 'carbs', label: 'Complex Carbs', icon: '🍠' },
    { id: 'fats', label: 'Healthy Fats', icon: '🥑' },
    { id: 'recovery', label: 'Recovery Foods', icon: '🧘' },
  ];

  const filteredFoods =
    activeFilter === 'All'
      ? foods
      : foods.filter((food) => food.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <MainNavigation />

      {/* Page Header */}
      <section className="bg-gradient-to-br from-accent/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
            Muscle Building Nutrition
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            Fuel your gains with science-backed food choices. Learn what to eat, when to eat it, 
            and how to optimize nutrient timing for maximum muscle growth and recovery.
          </p>
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

      {/* Info Banner */}
      <section className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">
                💡 Nutrient Timing for Maximum Gains
              </h3>
              <p className="text-muted-foreground">
                When you eat is just as important as what you eat. Each food below includes 
                optimal timing recommendations based on your training schedule and recovery needs.
              </p>
            </div>
            <BetterButton variant="outline" size="sm">
              Learn More
            </BetterButton>
          </div>
        </div>
      </section>

      {/* Food Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredFoods.length}</span>{' '}
            {filteredFoods.length === 1 ? 'food' : 'foods'} found
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-foreground">Sort by:</span>
            <select className="px-3 py-2 bg-card border border-border rounded-lg font-semibold text-foreground">
              <option>Highest Protein</option>
              <option>Lowest Calories</option>
              <option>Most Carbs</option>
              <option>Highest Fats</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFoods.map((food) => (
            <FoodCard
              key={food.id}
              food={food}
              onClick={() => setSelectedFood(food)}
            />
          ))}
        </div>
      </section>

      {/* Quick Tips Section */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-foreground mb-8">Quick Nutrition Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⏰</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Pre-Workout Window
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Eat complex carbs 2-3 hours before training for sustained energy. 
                Include moderate protein to prevent muscle breakdown.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Post-Workout Nutrition
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Consume protein and fast-acting carbs within 30-60 minutes after training 
                to maximize muscle protein synthesis and glycogen replenishment.
              </p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Before Bed Strategy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Choose slow-digesting proteins like casein (cottage cheese, Greek yogurt) 
                to prevent muscle breakdown during sleep and support overnight recovery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Food Detail Modal */}
      <FoodDetailModal
        food={selectedFood}
        isOpen={!!selectedFood}
        onClose={() => setSelectedFood(null)}
      />
    </div>
  );
}