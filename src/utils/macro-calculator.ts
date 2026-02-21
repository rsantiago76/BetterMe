import { getShakesByGoalTag, getShakesByTimeOfDay, Shake } from '../data/shakes';

export type Sex = 'male' | 'female';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'high' | 'very_high';
export type Goal = 'bulk' | 'cut' | 'maintain';
export type DietaryPreference = 'none' | 'vegetarian' | 'vegan' | 'dairy_free' | 'gluten_free';

export interface UserStats {
  sex?: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
  goal: Goal;
  trainingDaysPerWeek: number;
  dietaryPreference?: DietaryPreference;
}

export interface MacroTargets {
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
}

export interface MealTiming {
  name: string;
  timeOfDay: string;
  percentCalories: number;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  notes: string;
  recommendedShake?: Shake;
}

export interface MacroCalculationResult {
  bmr: number;
  tdee: number;
  dailyTargets: MacroTargets;
  goalAdjustment: number;
  mealTimings: MealTiming[];
  recommendations: {
    proteinPerKg: number;
    waterLitersPerDay: number;
    calorieRange: { min: number; max: number };
  };
}

// Activity level multipliers for TDEE calculation
const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,      // Little to no exercise
  light: 1.375,        // Light exercise 1-3 days/week
  moderate: 1.55,      // Moderate exercise 3-5 days/week
  high: 1.725,         // Heavy exercise 6-7 days/week
  very_high: 1.9,      // Very heavy exercise, physical job
};

// Goal-based calorie adjustments
const GOAL_ADJUSTMENTS: Record<Goal, { min: number; max: number }> = {
  bulk: { min: 250, max: 400 },
  cut: { min: -500, max: -250 },
  maintain: { min: 0, max: 0 },
};

// Goal-based protein targets (g/kg bodyweight)
const PROTEIN_TARGETS: Record<Goal, { min: number; max: number }> = {
  bulk: { min: 1.8, max: 2.2 },
  cut: { min: 2.0, max: 2.4 },    // Higher protein during cut to preserve muscle
  maintain: { min: 1.6, max: 2.0 },
};

// Fat targets (g/kg bodyweight)
const FAT_TARGETS = { min: 0.6, max: 1.0 };

/**
 * Calculate Basal Metabolic Rate using Mifflin-St Jeor Equation
 * More accurate than Harris-Benedict for modern populations
 */
export function calculateBMR(stats: UserStats): number {
  const { sex, age, heightCm, weightKg } = stats;
  
  // Mifflin-St Jeor: (10 × weight in kg) + (6.25 × height in cm) - (5 × age in years) + s
  // s = +5 for males, -161 for females
  const baseCalc = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
  
  if (sex === 'male') {
    return baseCalc + 5;
  } else if (sex === 'female') {
    return baseCalc - 161;
  } else {
    // If sex not provided, use average
    return baseCalc - 78;
  }
}

/**
 * Calculate Total Daily Energy Expenditure
 */
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return Math.round(bmr * ACTIVITY_MULTIPLIERS[activityLevel]);
}

/**
 * Apply goal-based calorie adjustment
 */
export function applyGoalAdjustment(tdee: number, goal: Goal): { adjustedCalories: number; adjustment: number } {
  const adjustmentRange = GOAL_ADJUSTMENTS[goal];
  
  // Use midpoint of range
  const adjustment = Math.round((adjustmentRange.min + adjustmentRange.max) / 2);
  const adjustedCalories = tdee + adjustment;
  
  return { adjustedCalories, adjustment };
}

/**
 * Calculate daily macro targets
 */
export function calculateMacros(stats: UserStats, targetCalories: number): MacroTargets {
  const { weightKg, goal } = stats;
  
  // 1. Calculate protein target
  const proteinRange = PROTEIN_TARGETS[goal];
  const proteinPerKg = (proteinRange.min + proteinRange.max) / 2;
  const protein_g = Math.round(weightKg * proteinPerKg);
  
  // 2. Calculate fat target (using 25% of calories as baseline)
  const fatCaloriePercent = 0.25;
  const fatCalories = targetCalories * fatCaloriePercent;
  const fat_g = Math.round(fatCalories / 9); // 9 calories per gram of fat
  
  // 3. Calculate carbs from remaining calories
  const proteinCalories = protein_g * 4;
  const fatActualCalories = fat_g * 9;
  const remainingCalories = targetCalories - proteinCalories - fatActualCalories;
  const carbs_g = Math.round(remainingCalories / 4); // 4 calories per gram of carbs
  
  return {
    calories: targetCalories,
    protein_g,
    carbs_g,
    fat_g,
  };
}

/**
 * Generate meal timing recommendations based on training schedule
 */
export function generateMealTimings(
  stats: UserStats,
  dailyTargets: MacroTargets
): MealTiming[] {
  const { goal, trainingDaysPerWeek } = stats;
  const isHighTraining = trainingDaysPerWeek >= 4;
  
  const meals: MealTiming[] = [];
  
  // Breakfast (20-25% calories)
  const breakfastPercent = 0.22;
  meals.push({
    name: 'Breakfast',
    timeOfDay: 'Morning (within 1 hour of waking)',
    percentCalories: breakfastPercent * 100,
    calories: Math.round(dailyTargets.calories * breakfastPercent),
    protein_g: Math.round(dailyTargets.protein_g * breakfastPercent),
    carbs_g: Math.round(dailyTargets.carbs_g * breakfastPercent),
    fat_g: Math.round(dailyTargets.fat_g * breakfastPercent),
    notes: 'Break overnight fast with protein + complex carbs. Sets metabolic tone for the day.',
    recommendedShake: getShakesByTimeOfDay('Morning')[0],
  });
  
  // Pre-Workout Snack (10-15% calories) - if training frequently
  if (isHighTraining) {
    const preWorkoutPercent = 0.12;
    meals.push({
      name: 'Pre-Workout Snack',
      timeOfDay: '90-120 minutes before training',
      percentCalories: preWorkoutPercent * 100,
      calories: Math.round(dailyTargets.calories * preWorkoutPercent),
      protein_g: Math.round(dailyTargets.protein_g * preWorkoutPercent),
      carbs_g: Math.round(dailyTargets.carbs_g * (preWorkoutPercent * 1.3)), // Higher carbs
      fat_g: Math.round(dailyTargets.fat_g * (preWorkoutPercent * 0.5)), // Lower fats
      notes: 'Light meal with easily digestible carbs + moderate protein. Minimize fats to speed digestion.',
      recommendedShake: getShakesByGoalTag('Pre-Workout')[0],
    });
  }
  
  // Post-Workout Shake (20-25% calories)
  const postWorkoutPercent = 0.23;
  const postWorkoutShakes = getShakesByTimeOfDay('Post-Workout');
  const recommendedPostShake = goal === 'bulk' 
    ? postWorkoutShakes.find(s => s.goalTags.includes('Bulking')) || postWorkoutShakes[0]
    : goal === 'cut'
    ? postWorkoutShakes.find(s => s.goalTags.includes('Cutting')) || postWorkoutShakes[0]
    : postWorkoutShakes[0];
  
  meals.push({
    name: 'Post-Workout Shake',
    timeOfDay: 'Within 30 minutes after training',
    percentCalories: postWorkoutPercent * 100,
    calories: Math.round(dailyTargets.calories * postWorkoutPercent),
    protein_g: Math.round(dailyTargets.protein_g * (postWorkoutPercent * 1.2)), // Higher protein
    carbs_g: Math.round(dailyTargets.carbs_g * (postWorkoutPercent * 1.3)), // Higher carbs
    fat_g: Math.round(dailyTargets.fat_g * (postWorkoutPercent * 0.8)), // Moderate fats
    notes: 'Critical anabolic window. Fast-digesting protein + carbs for glycogen replenishment.',
    recommendedShake: recommendedPostShake,
  });
  
  // Lunch (25-30% calories)
  const lunchPercent = 0.25;
  meals.push({
    name: 'Lunch',
    timeOfDay: 'Midday (12pm - 2pm)',
    percentCalories: lunchPercent * 100,
    calories: Math.round(dailyTargets.calories * lunchPercent),
    protein_g: Math.round(dailyTargets.protein_g * lunchPercent),
    carbs_g: Math.round(dailyTargets.carbs_g * lunchPercent),
    fat_g: Math.round(dailyTargets.fat_g * lunchPercent),
    notes: 'Balanced meal with lean protein, complex carbs, and healthy fats.',
    recommendedShake: undefined,
  });
  
  // Dinner (20-25% calories)
  const dinnerPercent = 0.23;
  meals.push({
    name: 'Dinner',
    timeOfDay: 'Evening (6pm - 8pm)',
    percentCalories: dinnerPercent * 100,
    calories: Math.round(dailyTargets.calories * dinnerPercent),
    protein_g: Math.round(dailyTargets.protein_g * (dinnerPercent * 1.1)), // Higher protein
    carbs_g: Math.round(dailyTargets.carbs_g * (dinnerPercent * 0.8)), // Lower carbs
    fat_g: Math.round(dailyTargets.fat_g * dinnerPercent),
    notes: 'Protein-focused meal. Moderate carbs unless training late.',
    recommendedShake: undefined,
  });
  
  // Before Bed Shake (8-12% calories) - especially for bulking or high training
  if (goal === 'bulk' || isHighTraining) {
    const bedtimePercent = 0.10;
    const bedtimeShake = getShakesByTimeOfDay('Before Bed')[0];
    
    meals.push({
      name: 'Before Bed Shake',
      timeOfDay: '30-60 minutes before sleep',
      percentCalories: bedtimePercent * 100,
      calories: Math.round(dailyTargets.calories * bedtimePercent),
      protein_g: Math.round(dailyTargets.protein_g * (bedtimePercent * 1.5)), // Higher protein
      carbs_g: Math.round(dailyTargets.carbs_g * (bedtimePercent * 0.3)), // Very low carbs
      fat_g: Math.round(dailyTargets.fat_g * (bedtimePercent * 1.2)), // Moderate fats
      notes: 'Slow-digesting protein to prevent catabolism overnight. Minimal carbs for better sleep.',
      recommendedShake: bedtimeShake,
    });
  }
  
  return meals;
}

/**
 * Main calculation function - computes complete macro plan
 */
export function calculateMacroPlan(stats: UserStats): MacroCalculationResult {
  // Step 1: Calculate BMR
  const bmr = calculateBMR(stats);
  
  // Step 2: Calculate TDEE
  const tdee = calculateTDEE(bmr, stats.activityLevel);
  
  // Step 3: Apply goal adjustment
  const { adjustedCalories, adjustment } = applyGoalAdjustment(tdee, stats.goal);
  
  // Step 4: Calculate macros
  const dailyTargets = calculateMacros(stats, adjustedCalories);
  
  // Step 5: Generate meal timings
  const mealTimings = generateMealTimings(stats, dailyTargets);
  
  // Step 6: Calculate recommendations
  const proteinRange = PROTEIN_TARGETS[stats.goal];
  const proteinPerKg = (proteinRange.min + proteinRange.max) / 2;
  const waterLitersPerDay = Math.round((stats.weightKg * 0.033 + (stats.trainingDaysPerWeek * 0.5)) * 10) / 10;
  
  const goalRange = GOAL_ADJUSTMENTS[stats.goal];
  const calorieRange = {
    min: tdee + goalRange.min,
    max: tdee + goalRange.max,
  };
  
  return {
    bmr: Math.round(bmr),
    tdee,
    dailyTargets,
    goalAdjustment: adjustment,
    mealTimings,
    recommendations: {
      proteinPerKg: Math.round(proteinPerKg * 10) / 10,
      waterLitersPerDay,
      calorieRange,
    },
  };
}

/**
 * Format macro percentages for display
 */
export function getMacroPercentages(macros: MacroTargets): {
  protein: number;
  carbs: number;
  fat: number;
} {
  const proteinCals = macros.protein_g * 4;
  const carbsCals = macros.carbs_g * 4;
  const fatCals = macros.fat_g * 9;
  const total = proteinCals + carbsCals + fatCals;
  
  return {
    protein: Math.round((proteinCals / total) * 100),
    carbs: Math.round((carbsCals / total) * 100),
    fat: Math.round((fatCals / total) * 100),
  };
}
