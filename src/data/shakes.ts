export interface ShakeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface ShakeMacros {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface ShakeBestTime {
  timeOfDay: string;
  windowMinutes: number;
  note: string;
}

export interface ShakeImage {
  key: string;
  alt: string;
}

export interface Shake {
  id: string;
  name: string;
  goalTags: string[];
  prepTimeMinutes: number;
  bestTime: ShakeBestTime;
  servings: number;
  ingredients: ShakeIngredient[];
  steps: string[];
  macros: ShakeMacros;
  nutritionInsight: string;
  allergens: string[];
  image: ShakeImage;
}

export interface ShakeDatabase {
  brand: string;
  version: string;
  currency: string;
  units: {
    volume: string;
    weight: string;
  };
  shakes: Shake[];
}

export const SHAKE_DATABASE: ShakeDatabase = {
  brand: "BetterMe",
  version: "1.0",
  currency: "USD",
  units: {
    volume: "ml",
    weight: "g"
  },
  shakes: [
    {
      id: "shake-mass-builder-power",
      name: "Mass Builder Power Shake",
      goalTags: ["Bulking", "Post-Workout"],
      prepTimeMinutes: 5,
      bestTime: {
        timeOfDay: "Post-Workout",
        windowMinutes: 30,
        note: "Drink immediately after training for faster recovery and glycogen replenishment."
      },
      servings: 1,
      ingredients: [
        { name: "Whey protein powder", amount: 30, unit: "g", notes: "1 scoop" },
        { name: "Banana", amount: 1, unit: "each", notes: "medium" },
        { name: "Natural peanut butter", amount: 32, unit: "g", notes: "2 tbsp" },
        { name: "Whole milk", amount: 240, unit: "ml", notes: "1 cup" },
        { name: "Rolled oats", amount: 40, unit: "g", notes: "1/2 cup" },
        { name: "Cinnamon", amount: 1, unit: "g", notes: "optional (~1/2 tsp)" }
      ],
      steps: [
        "Add milk to blender first.",
        "Add whey, oats, banana, and peanut butter.",
        "Blend 30–45 seconds until smooth.",
        "Adjust thickness with ice or extra milk if desired."
      ],
      macros: {
        calories: 720,
        protein_g: 48,
        carbs_g: 75,
        fat_g: 28
      },
      nutritionInsight: "Fast-digesting protein + carbs helps muscle repair and replenishes glycogen after training.",
      allergens: ["milk", "peanuts"],
      image: { key: "public/shakes/mass-builder.jpg", alt: "Mass Builder Power Shake" }
    },
    {
      id: "shake-lean-muscle-green",
      name: "Lean Muscle Green Shake",
      goalTags: ["Cutting", "Morning", "Light Pre-Workout"],
      prepTimeMinutes: 4,
      bestTime: {
        timeOfDay: "Morning",
        windowMinutes: 120,
        note: "Great in the morning or as a light pre-workout when you want steady energy."
      },
      servings: 1,
      ingredients: [
        { name: "Vanilla whey protein powder", amount: 30, unit: "g", notes: "1 scoop" },
        { name: "Unsweetened almond milk", amount: 240, unit: "ml", notes: "1 cup" },
        { name: "Avocado", amount: 0.5, unit: "each", notes: "half" },
        { name: "Spinach", amount: 30, unit: "g", notes: "1 packed cup" },
        { name: "Chia seeds", amount: 12, unit: "g", notes: "1 tbsp" },
        { name: "Frozen pineapple", amount: 70, unit: "g", notes: "1/2 cup" }
      ],
      steps: [
        "Add almond milk to blender.",
        "Add whey, spinach, avocado, chia, and pineapple.",
        "Blend 45–60 seconds until creamy.",
        "Add ice if you prefer it thicker."
      ],
      macros: {
        calories: 420,
        protein_g: 32,
        carbs_g: 28,
        fat_g: 22
      },
      nutritionInsight: "Healthy fats + fiber support steady energy and appetite control without heavy carbs.",
      allergens: [],
      image: { key: "public/shakes/lean-green.jpg", alt: "Lean Muscle Green Shake" }
    },
    {
      id: "shake-peanut-butter-recovery",
      name: "Peanut Butter Recovery Blend",
      goalTags: ["Recovery", "Post-Workout", "Strength"],
      prepTimeMinutes: 5,
      bestTime: {
        timeOfDay: "Post-Workout",
        windowMinutes: 30,
        note: "Drink within 30 minutes after lifting for recovery support."
      },
      servings: 1,
      ingredients: [
        { name: "Chocolate whey protein powder", amount: 30, unit: "g", notes: "1 scoop" },
        { name: "Peanut butter", amount: 16, unit: "g", notes: "1 tbsp" },
        { name: "2% milk", amount: 240, unit: "ml", notes: "1 cup" },
        { name: "Frozen mixed berries", amount: 70, unit: "g", notes: "1/2 cup" },
        { name: "Honey", amount: 21, unit: "g", notes: "optional (1 tbsp)" }
      ],
      steps: [
        "Add milk to blender.",
        "Add whey, berries, and peanut butter.",
        "Blend 30–45 seconds until smooth.",
        "Add honey if you want extra carbs and sweetness."
      ],
      macros: {
        calories: 510,
        protein_g: 42,
        carbs_g: 35,
        fat_g: 18
      },
      nutritionInsight: "Protein supports muscle repair; carbs help replenish energy, especially after high-volume sessions.",
      allergens: ["milk", "peanuts"],
      image: { key: "public/shakes/pb-recovery.jpg", alt: "Peanut Butter Recovery Blend" }
    },
    {
      id: "shake-oatmeal-breakfast-builder",
      name: "Oatmeal Breakfast Builder",
      goalTags: ["Breakfast", "Bulking", "Pre-Workout"],
      prepTimeMinutes: 5,
      bestTime: {
        timeOfDay: "Morning",
        windowMinutes: 180,
        note: "Use as breakfast or 90–180 minutes pre-workout for sustained energy."
      },
      servings: 1,
      ingredients: [
        { name: "Whey protein powder", amount: 30, unit: "g", notes: "1 scoop" },
        { name: "Rolled oats", amount: 40, unit: "g", notes: "1/2 cup" },
        { name: "Unsweetened almond milk", amount: 240, unit: "ml", notes: "1 cup" },
        { name: "Almond butter", amount: 16, unit: "g", notes: "1 tbsp" },
        { name: "Vanilla extract", amount: 2, unit: "ml", notes: "1/2 tsp" },
        { name: "Frozen blueberries", amount: 70, unit: "g", notes: "1/2 cup" }
      ],
      steps: [
        "Add almond milk to blender.",
        "Add whey, oats, almond butter, vanilla, and blueberries.",
        "Blend 45–60 seconds until smooth.",
        "Let sit 1–2 minutes to thicken (optional)."
      ],
      macros: {
        calories: 530,
        protein_g: 38,
        carbs_g: 55,
        fat_g: 18
      },
      nutritionInsight: "Carbs + protein provide steady training fuel and support muscle building through the morning.",
      allergens: ["tree_nuts"],
      image: { key: "public/shakes/oatmeal-breakfast.jpg", alt: "Oatmeal Breakfast Builder" }
    },
    {
      id: "shake-night-recovery-casein",
      name: "Night Recovery Casein Shake",
      goalTags: ["Recovery", "Before Bed"],
      prepTimeMinutes: 3,
      bestTime: {
        timeOfDay: "Before Bed",
        windowMinutes: 60,
        note: "Drink 30–60 minutes before sleep to support overnight recovery."
      },
      servings: 1,
      ingredients: [
        { name: "Casein protein powder", amount: 30, unit: "g", notes: "1 scoop" },
        { name: "Unsweetened almond milk", amount: 240, unit: "ml", notes: "1 cup" },
        { name: "Almond butter", amount: 16, unit: "g", notes: "1 tbsp" },
        { name: "Cinnamon", amount: 1, unit: "g", notes: "~1/2 tsp" }
      ],
      steps: [
        "Add almond milk to blender.",
        "Add casein, almond butter, and cinnamon.",
        "Blend 20–30 seconds until smooth."
      ],
      macros: {
        calories: 360,
        protein_g: 34,
        carbs_g: 8,
        fat_g: 18
      },
      nutritionInsight: "Slow-digesting protein provides amino acids over time while you sleep.",
      allergens: ["tree_nuts"],
      image: { key: "public/shakes/night-recovery.jpg", alt: "Night Recovery Casein Shake" }
    }
  ]
};

// Helper functions to query the shake database
export const getShakeById = (id: string): Shake | undefined => {
  return SHAKE_DATABASE.shakes.find(shake => shake.id === id);
};

export const getShakesByGoalTag = (tag: string): Shake[] => {
  return SHAKE_DATABASE.shakes.filter(shake => 
    shake.goalTags.some(goalTag => goalTag.toLowerCase() === tag.toLowerCase())
  );
};

export const getShakesByTimeOfDay = (timeOfDay: string): Shake[] => {
  return SHAKE_DATABASE.shakes.filter(shake => 
    shake.bestTime.timeOfDay.toLowerCase() === timeOfDay.toLowerCase()
  );
};

export const getAllShakes = (): Shake[] => {
  return SHAKE_DATABASE.shakes;
};

export const getShakesByAllergen = (allergen: string): Shake[] => {
  return SHAKE_DATABASE.shakes.filter(shake => 
    !shake.allergens.includes(allergen.toLowerCase())
  );
};

export const getShakesByMaxCalories = (maxCalories: number): Shake[] => {
  return SHAKE_DATABASE.shakes.filter(shake => 
    shake.macros.calories <= maxCalories
  );
};

export const getShakesByMinProtein = (minProtein: number): Shake[] => {
  return SHAKE_DATABASE.shakes.filter(shake => 
    shake.macros.protein_g >= minProtein
  );
};
