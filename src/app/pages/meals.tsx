import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { MealCard, Meal } from '../components/meal-card';
import { MealDetailModal } from '../components/meal-detail-modal';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';

const meals: Meal[] = [
  // BREAKFAST
  {
    id: 'egg-white-breakfast',
    name: 'Egg White Power Breakfast',
    goal: 'cutting',
    description: 'High-protein, low-calorie breakfast packed with nutrients to fuel your morning and preserve lean muscle.',
    image: '🍳',
    cookTime: 10,
    prepTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'Egg whites', amount: '6 large', notes: 'or 3/4 cup liquid egg whites' },
      { item: 'Whole eggs', amount: '1 large', notes: 'for healthy fats' },
      { item: 'Spinach', amount: '2 cups', notes: 'fresh or frozen' },
      { item: 'Cherry tomatoes', amount: '1/2 cup', notes: 'halved' },
      { item: 'Red bell pepper', amount: '1/4 cup', notes: 'diced' },
      { item: 'Onion', amount: '2 tbsp', notes: 'diced' },
      { item: 'Whole wheat toast', amount: '1 slice' },
      { item: 'Avocado', amount: '1/4 medium', notes: 'sliced' },
      { item: 'Olive oil spray', amount: '2 sprays' },
      { item: 'Salt and pepper', amount: 'to taste' },
    ],
    protein: 38,
    carbs: 28,
    fats: 12,
    calories: 360,
    bestTime: ['Morning'],
    timingReason: 'Morning protein intake stimulates muscle protein synthesis after overnight fasting. The high protein-to-calorie ratio preserves muscle mass during a cut while keeping you satiated. Complex carbs from whole wheat provide sustained energy without spiking blood sugar.',
    instructions: [
      'Heat a non-stick pan over medium heat and spray with olive oil',
      'Sauté onions and bell peppers for 2-3 minutes until softened',
      'Add spinach and cook until wilted (1-2 minutes)',
      'In a bowl, whisk together egg whites, whole egg, salt, and pepper',
      'Pour egg mixture into the pan with vegetables',
      'Gently scramble eggs, stirring occasionally until fully cooked (3-4 minutes)',
      'Add cherry tomatoes in the last minute of cooking',
      'Toast bread while eggs are cooking',
      'Plate scrambled eggs, serve with toast and sliced avocado on the side',
    ],
    tips: [
      'Meal prep: Dice vegetables the night before for quicker morning cooking',
      'Use liquid egg whites from a carton to save time and reduce waste',
      'Add hot sauce or salsa for extra flavor without calories',
      'For more carbs (bulking), add a bowl of oatmeal on the side',
      'Cook on medium-low heat to prevent eggs from getting rubbery',
    ],
    nutritionNotes: 'This breakfast provides 38g of complete protein with all essential amino acids. The combination of egg whites (low-calorie, high-protein) and one whole egg (healthy fats, vitamins A, D, E) creates the perfect balance for muscle maintenance during fat loss.',
  },

  {
    id: 'greek-yogurt-bowl',
    name: 'Greek Yogurt Power Bowl',
    goal: 'recovery',
    description: 'Protein-rich breakfast bowl with probiotics, antioxidants, and healthy fats for optimal recovery.',
    image: '🥣',
    cookTime: 0,
    prepTime: 5,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'Greek yogurt (non-fat)', amount: '1.5 cups', notes: 'plain, unsweetened' },
      { item: 'Whey protein powder', amount: '1/2 scoop', notes: 'vanilla or unflavored' },
      { item: 'Mixed berries', amount: '1 cup', notes: 'blueberries, strawberries, raspberries' },
      { item: 'Granola', amount: '1/4 cup', notes: 'low-sugar variety' },
      { item: 'Almonds', amount: '2 tbsp', notes: 'sliced or slivered' },
      { item: 'Chia seeds', amount: '1 tbsp' },
      { item: 'Honey', amount: '1 tsp', notes: 'optional for sweetness' },
      { item: 'Cinnamon', amount: '1/2 tsp' },
    ],
    protein: 45,
    carbs: 52,
    fats: 14,
    calories: 500,
    bestTime: ['Morning', 'Post-workout'],
    timingReason: 'Greek yogurt provides fast-digesting protein and probiotics for gut health. Berries are packed with antioxidants that reduce exercise-induced inflammation. The combination of protein and carbs makes this ideal post-workout or as a high-protein breakfast to kickstart recovery.',
    instructions: [
      'Add Greek yogurt to a large bowl',
      'Mix in protein powder until smooth and creamy',
      'Top with mixed berries',
      'Sprinkle granola over the berries',
      'Add sliced almonds and chia seeds',
      'Drizzle with honey if using',
      'Dust with cinnamon',
      'Mix everything together or eat in layers—your choice!',
    ],
    tips: [
      'Use frozen berries for cost savings—thaw slightly before eating',
      'Make overnight: mix yogurt + protein powder the night before, add toppings in the morning',
      'For cutting, skip granola and honey (saves ~80 calories)',
      'Add a scoop of peanut butter for extra calories when bulking',
      'Greek yogurt should have 15-20g protein per cup—check labels',
    ],
    nutritionNotes: 'Greek yogurt contains casein protein which digests slowly, providing sustained amino acid release. Combined with whey protein powder, you get both fast and slow-digesting proteins—ideal for muscle recovery and growth.',
  },

  // LUNCH/DINNER
  {
    id: 'high-protein-chicken-bowl',
    name: 'High-Protein Chicken Power Bowl',
    goal: 'bulking',
    description: 'Complete macro-balanced meal with lean protein, complex carbs, and healthy fats for serious muscle building.',
    image: '🍗',
    cookTime: 25,
    prepTime: 10,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'Chicken breast', amount: '8 oz', notes: 'boneless, skinless' },
      { item: 'Brown rice', amount: '1 cup', notes: 'uncooked (3 cups cooked)' },
      { item: 'Broccoli', amount: '2 cups', notes: 'florets' },
      { item: 'Sweet potato', amount: '1 medium', notes: '~6 oz' },
      { item: 'Avocado', amount: '1/2 medium', notes: 'sliced' },
      { item: 'Olive oil', amount: '1 tbsp' },
      { item: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { item: 'Paprika', amount: '1 tsp' },
      { item: 'Cumin', amount: '1/2 tsp' },
      { item: 'Salt and pepper', amount: 'to taste' },
      { item: 'Fresh cilantro', amount: '2 tbsp', notes: 'optional garnish' },
    ],
    protein: 62,
    carbs: 95,
    fats: 22,
    calories: 810,
    bestTime: ['Post-workout', 'Evening'],
    timingReason: 'Post-workout, this meal provides high-quality protein for muscle repair, complex carbs to replenish glycogen, and healthy fats for hormone production. The 3:1 carb-to-protein ratio is ideal for muscle recovery. As an evening meal, it supports overnight muscle protein synthesis and growth.',
    instructions: [
      'Cook brown rice according to package directions (usually 40-45 minutes) or use pre-cooked rice',
      'Preheat oven to 400°F (200°C)',
      'Pierce sweet potato with a fork and microwave for 5-6 minutes until tender',
      'Season chicken breast with paprika, cumin, salt, pepper, and half the minced garlic',
      'Heat 1/2 tbsp olive oil in an oven-safe skillet over medium-high heat',
      'Sear chicken for 3-4 minutes per side until golden brown',
      'Transfer skillet to oven and bake for 12-15 minutes until internal temp reaches 165°F',
      'Steam broccoli for 5-7 minutes until tender-crisp',
      'Toss broccoli with remaining olive oil, garlic, salt, and pepper',
      'Slice cooked chicken breast',
      'Assemble bowl: rice as base, top with chicken, broccoli, sweet potato, and avocado slices',
      'Garnish with fresh cilantro if using',
    ],
    tips: [
      'Meal prep hack: Cook 4-5 chicken breasts at once and refrigerate for the week',
      'Use a rice cooker to cook brown rice in bulk—saves time and effort',
      'Pre-cut sweet potatoes can be microwaved or air-fried for convenience',
      'Season chicken the night before for deeper flavor penetration',
      'Add hot sauce or sriracha for metabolism-boosting heat',
    ],
    nutritionNotes: 'This bowl delivers 62g of complete protein from chicken, which contains all essential amino acids required for muscle growth. Brown rice provides sustained energy from complex carbs, while sweet potato adds vitamins A and C for immune support. Avocado provides monounsaturated fats that support testosterone production.',
  },

  {
    id: 'salmon-quinoa-plate',
    name: 'Salmon & Quinoa Recovery Plate',
    goal: 'recovery',
    description: 'Anti-inflammatory omega-3 rich meal designed to accelerate recovery and reduce muscle soreness.',
    image: '🐟',
    cookTime: 20,
    prepTime: 10,
    servings: 1,
    difficulty: 'Medium',
    ingredients: [
      { item: 'Salmon fillet', amount: '6 oz', notes: 'wild-caught preferred' },
      { item: 'Quinoa', amount: '1/2 cup', notes: 'uncooked (1.5 cups cooked)' },
      { item: 'Asparagus', amount: '8 spears', notes: 'trimmed' },
      { item: 'Kale', amount: '2 cups', notes: 'chopped' },
      { item: 'Lemon', amount: '1 whole', notes: 'juice and zest' },
      { item: 'Olive oil', amount: '2 tbsp' },
      { item: 'Garlic', amount: '2 cloves', notes: 'minced' },
      { item: 'Cherry tomatoes', amount: '1 cup', notes: 'halved' },
      { item: 'Fresh dill', amount: '2 tbsp', notes: 'chopped' },
      { item: 'Dijon mustard', amount: '1 tsp' },
      { item: 'Salt and pepper', amount: 'to taste' },
    ],
    protein: 48,
    carbs: 52,
    fats: 28,
    calories: 650,
    bestTime: ['Post-workout', 'Evening'],
    timingReason: 'Salmon is rich in omega-3 fatty acids (EPA and DHA) which reduce inflammation and muscle soreness. Post-workout, this meal provides high-quality protein and anti-inflammatory fats to accelerate recovery. Quinoa is a complete protein with all essential amino acids, making this a recovery powerhouse.',
    instructions: [
      'Cook quinoa according to package directions (usually 15 minutes), then fluff with a fork',
      'Preheat oven to 400°F (200°C) and line a baking sheet with parchment paper',
      'Pat salmon dry and place on baking sheet',
      'In a small bowl, mix 1 tbsp olive oil, lemon zest, dill, Dijon mustard, salt, and pepper',
      'Brush salmon with half the mixture',
      'Arrange asparagus around salmon, drizzle with remaining olive oil mixture',
      'Roast for 12-15 minutes until salmon flakes easily with a fork',
      'While salmon cooks, heat remaining 1 tbsp olive oil in a pan over medium heat',
      'Sauté garlic for 30 seconds, then add kale and cherry tomatoes',
      'Cook until kale wilts (3-4 minutes), season with salt and pepper',
      'Plate quinoa as base, top with sautéed kale and tomatoes, place salmon and asparagus on top',
      'Drizzle with fresh lemon juice before serving',
    ],
    tips: [
      'Check salmon doneness: internal temperature should reach 145°F',
      'Don\'t overcook salmon—it should be slightly opaque in the center',
      'Use pre-washed quinoa to skip the rinsing step',
      'Meal prep: Cook salmon and quinoa in bulk for 3-4 days',
      'Add feta cheese for extra flavor and calcium',
    ],
    nutritionNotes: 'Wild-caught salmon provides 2,000mg+ of omega-3 fatty acids per serving, which have been shown to reduce DOMS (delayed onset muscle soreness) by up to 50%. Quinoa is one of the few plant-based complete proteins, containing all 9 essential amino acids.',
  },

  {
    id: 'lean-turkey-stir-fry',
    name: 'Lean Turkey Veggie Stir Fry',
    goal: 'cutting',
    description: 'Low-calorie, high-volume meal with lean protein and fiber-rich vegetables to keep you full and satisfied.',
    image: '🥘',
    cookTime: 15,
    prepTime: 10,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'Lean ground turkey', amount: '6 oz', notes: '93% lean or higher' },
      { item: 'Cauliflower rice', amount: '2 cups', notes: 'fresh or frozen' },
      { item: 'Bell peppers', amount: '1 cup', notes: 'mixed colors, sliced' },
      { item: 'Snap peas', amount: '1 cup' },
      { item: 'Carrots', amount: '1/2 cup', notes: 'julienned or shredded' },
      { item: 'Broccoli', amount: '1 cup', notes: 'small florets' },
      { item: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { item: 'Ginger', amount: '1 tbsp', notes: 'fresh, grated' },
      { item: 'Low-sodium soy sauce', amount: '2 tbsp' },
      { item: 'Sesame oil', amount: '1 tsp' },
      { item: 'Rice vinegar', amount: '1 tbsp' },
      { item: 'Red pepper flakes', amount: '1/4 tsp', notes: 'optional' },
      { item: 'Green onions', amount: '2 stalks', notes: 'sliced' },
    ],
    protein: 42,
    carbs: 28,
    fats: 10,
    calories: 370,
    bestTime: ['Evening', 'Post-workout'],
    timingReason: 'Perfect for cutting phase due to high protein and fiber content with minimal calories. The large volume of vegetables keeps you satiated while in a caloric deficit. Turkey is one of the leanest protein sources, helping preserve muscle mass during fat loss.',
    instructions: [
      'Heat a large wok or skillet over medium-high heat',
      'Add ground turkey and cook, breaking it apart with a spatula (5-7 minutes)',
      'Remove cooked turkey and set aside',
      'In the same pan, add sesame oil',
      'Add garlic and ginger, cook for 30 seconds until fragrant',
      'Add carrots, bell peppers, and broccoli—stir fry for 3-4 minutes',
      'Add snap peas and cook for another 2 minutes',
      'Add cauliflower rice and stir fry for 3-4 minutes until tender',
      'Return turkey to the pan',
      'Add soy sauce, rice vinegar, and red pepper flakes',
      'Toss everything together for 1-2 minutes until well combined',
      'Remove from heat and top with sliced green onions',
    ],
    tips: [
      'Use pre-riced cauliflower to save prep time',
      'Don\'t overcrowd the pan—cook in batches if needed for better browning',
      'For more carbs (maintenance), serve over brown rice or regular rice',
      'Add sriracha or chili garlic sauce for extra heat and metabolism boost',
      'Meal prep: This stir fry reheats beautifully for 4-5 days',
    ],
    nutritionNotes: 'Ground turkey breast (99% lean) has only 1g of fat per 4oz serving, making it one of the leanest protein sources available. The massive vegetable volume provides fiber, vitamins, and phytonutrients while keeping calories incredibly low—perfect for fat loss without hunger.',
  },

  {
    id: 'beef-sweet-potato',
    name: 'Grass-Fed Beef & Sweet Potato Power Plate',
    goal: 'bulking',
    description: 'Nutrient-dense, calorie-rich meal with complete protein, complex carbs, and essential vitamins for mass building.',
    image: '🥩',
    cookTime: 25,
    prepTime: 10,
    servings: 1,
    difficulty: 'Medium',
    ingredients: [
      { item: 'Grass-fed ground beef', amount: '8 oz', notes: '85% lean' },
      { item: 'Sweet potatoes', amount: '2 medium', notes: '~12 oz total' },
      { item: 'Spinach', amount: '3 cups', notes: 'fresh' },
      { item: 'Red onion', amount: '1/2 medium', notes: 'diced' },
      { item: 'Garlic', amount: '4 cloves', notes: 'minced' },
      { item: 'Olive oil', amount: '1 tbsp' },
      { item: 'Worcestershire sauce', amount: '1 tbsp' },
      { item: 'Beef broth', amount: '1/4 cup', notes: 'low-sodium' },
      { item: 'Smoked paprika', amount: '1 tsp' },
      { item: 'Cumin', amount: '1 tsp' },
      { item: 'Salt and pepper', amount: 'to taste' },
      { item: 'Fresh parsley', amount: '2 tbsp', notes: 'chopped' },
    ],
    protein: 58,
    carbs: 78,
    fats: 32,
    calories: 820,
    bestTime: ['Post-workout', 'Evening'],
    timingReason: 'Grass-fed beef provides complete protein, creatine, carnitine, and vitamin B12—all essential for muscle growth. Sweet potatoes are packed with complex carbs to replenish glycogen stores. The higher calorie and fat content supports the caloric surplus needed for muscle building.',
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Wash sweet potatoes, poke with fork, and microwave for 5 minutes to start cooking',
      'Cut sweet potatoes into 1-inch cubes and toss with 1/2 tbsp olive oil, salt, and paprika',
      'Spread on a baking sheet and roast for 20-25 minutes until crispy',
      'While potatoes cook, heat remaining olive oil in a large skillet over medium-high heat',
      'Add ground beef and cook, breaking apart, until browned (6-8 minutes)',
      'Add onion and cook until softened (3-4 minutes)',
      'Add garlic and cook for 1 minute',
      'Stir in Worcestershire sauce, beef broth, cumin, salt, and pepper',
      'Simmer for 3-4 minutes until liquid reduces slightly',
      'Add spinach and cook until wilted (2 minutes)',
      'Plate roasted sweet potatoes, top with beef mixture, garnish with fresh parsley',
    ],
    tips: [
      'Grass-fed beef has more omega-3s and CLA (conjugated linoleic acid) than grain-fed',
      'For meal prep, cook beef and sweet potatoes separately, combine when reheating',
      'Add hot sauce for metabolism-boosting capsaicin',
      'Substitute ground bison for even leaner, higher-protein option',
      'Top with a fried egg for extra protein and healthy fats',
    ],
    nutritionNotes: 'Grass-fed beef contains naturally occurring creatine (~500mg per 8oz), which enhances strength and muscle gains. Sweet potatoes are rich in beta-carotene, vitamin C, and potassium—supporting immune function and muscle contraction. This meal provides 820 calories to support a caloric surplus for muscle growth.',
  },

  {
    id: 'white-fish-vegetables',
    name: 'Lemon Herb White Fish with Roasted Vegetables',
    goal: 'cutting',
    description: 'Ultra-lean protein with colorful roasted vegetables for maximum nutrition and minimal calories.',
    image: '🐠',
    cookTime: 20,
    prepTime: 10,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'White fish fillet', amount: '7 oz', notes: 'cod, tilapia, or halibut' },
      { item: 'Zucchini', amount: '1 medium', notes: 'sliced' },
      { item: 'Yellow squash', amount: '1 medium', notes: 'sliced' },
      { item: 'Bell peppers', amount: '1 cup', notes: 'mixed colors, chopped' },
      { item: 'Cherry tomatoes', amount: '1 cup', notes: 'halved' },
      { item: 'Green beans', amount: '1 cup', notes: 'trimmed' },
      { item: 'Lemon', amount: '1 whole', notes: 'juice and zest' },
      { item: 'Olive oil', amount: '1.5 tsp' },
      { item: 'Garlic', amount: '3 cloves', notes: 'minced' },
      { item: 'Fresh basil', amount: '1/4 cup', notes: 'chopped' },
      { item: 'Fresh thyme', amount: '1 tsp' },
      { item: 'Salt and pepper', amount: 'to taste' },
    ],
    protein: 42,
    carbs: 24,
    fats: 8,
    calories: 330,
    bestTime: ['Evening', 'Post-workout'],
    timingReason: 'White fish is extremely lean (less than 2g fat per serving) making it perfect for cutting. The high protein content preserves muscle mass during fat loss. Eating lean protein in the evening supports overnight muscle protein synthesis without excess calories.',
    instructions: [
      'Preheat oven to 425°F (220°C)',
      'Line a large baking sheet with parchment paper',
      'Toss vegetables (zucchini, squash, peppers, tomatoes, green beans) with 1 tsp olive oil, half the garlic, salt, and pepper',
      'Spread vegetables on one side of the baking sheet',
      'Pat fish dry and place on the other side of the baking sheet',
      'Brush fish with remaining olive oil',
      'Top fish with lemon zest, remaining garlic, thyme, salt, and pepper',
      'Roast for 15-18 minutes until fish flakes easily and vegetables are tender',
      'Remove from oven and squeeze fresh lemon juice over fish and vegetables',
      'Garnish with fresh basil before serving',
    ],
    tips: [
      'Fish is done when it reaches 145°F and flakes easily with a fork',
      'Don\'t overcook fish—it should be moist and tender, not dry',
      'Use a fish spatula to easily remove delicate fish from the pan',
      'Add capers for extra Mediterranean flavor without calories',
      'For more carbs, serve with 1/2 cup quinoa or wild rice',
    ],
    nutritionNotes: 'White fish like cod and halibut are among the leanest protein sources available, with less than 1g of fat per 4oz. They\'re high in selenium, vitamin B12, and phosphorus. This meal provides 42g of protein for only 330 calories—an exceptional protein-to-calorie ratio for cutting.',
  },

  {
    id: 'protein-pasta-bolognese',
    name: 'High-Protein Pasta Bolognese',
    goal: 'bulking',
    description: 'Muscle-building twist on a classic Italian favorite with protein pasta and lean ground beef.',
    image: '🍝',
    cookTime: 30,
    prepTime: 10,
    servings: 1,
    difficulty: 'Medium',
    ingredients: [
      { item: 'Protein pasta', amount: '3 oz dry', notes: 'chickpea or lentil pasta' },
      { item: 'Lean ground beef', amount: '6 oz', notes: '90% lean' },
      { item: 'Crushed tomatoes', amount: '1 cup', notes: 'canned, no sugar added' },
      { item: 'Tomato paste', amount: '2 tbsp' },
      { item: 'Onion', amount: '1/2 medium', notes: 'diced' },
      { item: 'Carrots', amount: '1/2 cup', notes: 'finely diced' },
      { item: 'Celery', amount: '1/4 cup', notes: 'finely diced' },
      { item: 'Garlic', amount: '4 cloves', notes: 'minced' },
      { item: 'Beef broth', amount: '1/2 cup', notes: 'low-sodium' },
      { item: 'Olive oil', amount: '1 tbsp' },
      { item: 'Italian seasoning', amount: '2 tsp' },
      { item: 'Red pepper flakes', amount: '1/4 tsp', notes: 'optional' },
      { item: 'Parmesan cheese', amount: '2 tbsp', notes: 'grated' },
      { item: 'Fresh basil', amount: '1/4 cup', notes: 'chopped' },
    ],
    protein: 68,
    carbs: 82,
    fats: 24,
    calories: 800,
    bestTime: ['Post-workout', 'Evening'],
    timingReason: 'Protein pasta (made from chickpeas or lentils) provides double the protein of regular pasta. Combined with lean beef, this meal delivers massive protein for muscle recovery. The carbs replenish glycogen stores post-workout, making it ideal for muscle building.',
    instructions: [
      'Bring a large pot of salted water to boil for pasta',
      'Heat olive oil in a large saucepan over medium heat',
      'Add onion, carrots, and celery—cook until softened (5-6 minutes)',
      'Add ground beef and cook, breaking apart, until browned (6-8 minutes)',
      'Add garlic and cook for 1 minute',
      'Stir in tomato paste and cook for 2 minutes',
      'Add crushed tomatoes, beef broth, Italian seasoning, and red pepper flakes',
      'Simmer sauce for 15-20 minutes, stirring occasionally',
      'While sauce simmers, cook protein pasta according to package directions',
      'Drain pasta, reserving 1/4 cup pasta water',
      'Add cooked pasta to sauce, toss to combine (add pasta water if needed for consistency)',
      'Serve topped with Parmesan cheese and fresh basil',
    ],
    tips: [
      'Protein pasta has different texture than regular pasta—don\'t overcook it',
      'Make sauce in bulk and freeze in portions for quick meals',
      'Add 1/2 cup cottage cheese to sauce for extra protein and creaminess',
      'Use a food processor to finely chop vegetables for "hidden" veggies',
      'For more calories, increase pasta to 4oz and add extra Parmesan',
    ],
    nutritionNotes: 'Chickpea pasta contains 20-25g of protein per serving compared to 7-8g in regular pasta. Combined with lean ground beef, this meal provides 68g of complete protein plus complex carbs and fiber for sustained energy and muscle growth.',
  },

  {
    id: 'buddha-bowl',
    name: 'Plant-Based Protein Buddha Bowl',
    goal: 'cutting',
    description: 'Colorful, nutrient-dense plant-based meal packed with protein, fiber, and essential vitamins.',
    image: '🥙',
    cookTime: 20,
    prepTime: 15,
    servings: 1,
    difficulty: 'Easy',
    ingredients: [
      { item: 'Extra-firm tofu', amount: '6 oz', notes: 'pressed and cubed' },
      { item: 'Quinoa', amount: '1/3 cup', notes: 'uncooked (1 cup cooked)' },
      { item: 'Chickpeas', amount: '1/2 cup', notes: 'canned, drained' },
      { item: 'Kale', amount: '2 cups', notes: 'massaged with lemon' },
      { item: 'Red cabbage', amount: '1 cup', notes: 'shredded' },
      { item: 'Cucumber', amount: '1/2 cup', notes: 'diced' },
      { item: 'Edamame', amount: '1/2 cup', notes: 'shelled' },
      { item: 'Avocado', amount: '1/4 medium', notes: 'sliced' },
      { item: 'Tahini', amount: '2 tbsp' },
      { item: 'Lemon juice', amount: '2 tbsp' },
      { item: 'Garlic', amount: '1 clove', notes: 'minced' },
      { item: 'Soy sauce', amount: '1 tbsp' },
      { item: 'Sesame seeds', amount: '1 tsp' },
    ],
    protein: 38,
    carbs: 58,
    fats: 20,
    calories: 540,
    bestTime: ['Evening', 'Post-workout'],
    timingReason: 'This plant-based meal provides complete protein from multiple sources (tofu, quinoa, chickpeas, edamame). The high fiber content promotes satiety during a cut. Rich in micronutrients and antioxidants that support recovery and overall health.',
    instructions: [
      'Cook quinoa according to package directions, set aside to cool',
      'Press tofu between paper towels to remove excess water',
      'Cut tofu into 1-inch cubes and toss with soy sauce',
      'Heat a non-stick pan over medium-high heat',
      'Cook tofu cubes for 3-4 minutes per side until golden and crispy',
      'In a small bowl, roast chickpeas in the oven at 400°F for 15 minutes until crispy (or use canned)',
      'Make tahini dressing: whisk tahini, lemon juice, garlic, and 2 tbsp water until smooth',
      'Massage kale with a squeeze of lemon juice for 1-2 minutes to soften',
      'Assemble bowl: quinoa as base, arrange kale, cabbage, cucumber, edamame in sections',
      'Top with crispy tofu, roasted chickpeas, and avocado',
      'Drizzle with tahini dressing and sprinkle with sesame seeds',
    ],
    tips: [
      'Press tofu for at least 15 minutes for crispiest results—or buy pre-pressed tofu',
      'Meal prep: Cook quinoa, press tofu, and chop veggies in advance',
      'Add tempeh or seitan for even more plant-based protein',
      'Make extra tahini dressing—it lasts 5-7 days in the fridge',
      'For more calories, double the quinoa and add extra avocado',
    ],
    nutritionNotes: 'This bowl combines multiple plant-based protein sources to create a complete amino acid profile. Quinoa and edamame are complete proteins on their own. Tahini provides calcium and healthy fats. The variety of colorful vegetables ensures a wide range of phytonutrients and antioxidants.',
  },
];

export default function MealsPage() {
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  const filters = [
    { id: 'All', label: 'All Meals', icon: '🍽️' },
    { id: 'bulking', label: 'Bulking', icon: '💪' },
    { id: 'cutting', label: 'Cutting', icon: '🥗' },
    { id: 'recovery', label: 'Recovery', icon: '🧘' },
  ];

  const filteredMeals =
    activeFilter === 'All'
      ? meals
      : meals.filter((meal) => meal.goal === activeFilter);

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
                Get Started
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
              <UtensilsCrossed className="w-8 h-8 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
                Muscle-Building Meal Recipes
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl">
                Science-backed, macro-optimized recipes designed to fuel your training, accelerate recovery, 
                and build lean muscle mass. Every meal includes complete nutritional breakdown and timing guidance.
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

      {/* Meal Prep Tips Banner */}
      <section className="bg-gradient-to-r from-accent/10 to-primary/10 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">
                💡 Meal Prep Pro Tip
              </h3>
              <p className="text-muted-foreground">
                Cook proteins and grains in bulk on Sunday. Store in individual containers with different 
                vegetables each day for variety. Most meals stay fresh for 4-5 days when properly refrigerated.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Grid */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="mb-6">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredMeals.length}</span>{' '}
            {filteredMeals.length === 1 ? 'recipe' : 'recipes'} found
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal) => (
            <MealCard
              key={meal.id}
              meal={meal}
              onClick={() => setSelectedMeal(meal)}
            />
          ))}
        </div>
      </section>

      {/* Meal Timing Guide */}
      <section className="bg-muted/30 py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <h2 className="text-3xl font-black text-foreground mb-8">Meal Timing Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌅</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Morning
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Kickstart muscle protein synthesis after overnight fasting
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High protein + complex carbs</li>
                <li>• 30-45 min after waking</li>
                <li>• Example: Egg White Breakfast</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">💪</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Pre-Workout
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Fuel performance with easily digestible nutrients
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Moderate protein + carbs</li>
                <li>• 1-2 hours before training</li>
                <li>• Lower fat for digestion</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔥</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Post-Workout
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Maximize recovery in the anabolic window
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• High protein + carbs</li>
                <li>• Within 30-60 minutes</li>
                <li>• Example: Chicken Power Bowl</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🌙</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                Evening
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                Support overnight muscle repair and growth
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Slow-digesting protein</li>
                <li>• 2-3 hours before bed</li>
                <li>• Example: Salmon & Quinoa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meal Detail Modal */}
      <MealDetailModal
        meal={selectedMeal}
        isOpen={!!selectedMeal}
        onClose={() => setSelectedMeal(null)}
      />
    </div>
  );
}
