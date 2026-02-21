import { SHAKE_DATABASE, type Shake, type ShakeIngredient } from '../data/shakes';

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export interface DayPlan {
  day: DayOfWeek;
  dayLabel: string;
  isTrainingDay: boolean;
  shakes: {
    time: 'morning' | 'post_workout' | 'evening';
    timeLabel: string;
    shake: Shake;
    notes?: string;
  }[];
}

export interface WeeklyPlan {
  days: DayPlan[];
  totalShakes: number;
  trainingDays: number;
  restDays: number;
}

export interface ShoppingListItem {
  name: string;
  totalAmount: number;
  unit: string;
  servings: number;
  notes?: string;
}

export interface ShoppingList {
  items: ShoppingListItem[];
  totalRecipes: number;
  estimatedCost?: number;
}

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

/**
 * Get shake by ID from database
 */
function getShakeById(id: string): Shake | undefined {
  return SHAKE_DATABASE.shakes.find(s => s.id === id);
}

/**
 * Generate a weekly meal prep plan based on training days
 */
export function generateWeeklyPlan(trainingDays: DayOfWeek[]): WeeklyPlan {
  const days: DayPlan[] = [];
  
  const allDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  allDays.forEach(day => {
    const isTrainingDay = trainingDays.includes(day);
    const dayPlan: DayPlan = {
      day,
      dayLabel: DAY_LABELS[day],
      isTrainingDay,
      shakes: [],
    };
    
    if (isTrainingDay) {
      // Training Day Strategy:
      // 1. Post-workout shake (primary)
      // 2. Optional evening casein for recovery
      
      // Rotate between Mass Builder and PB Recovery for variety
      const trainingDayIndex = trainingDays.indexOf(day);
      const postWorkoutShake = trainingDayIndex % 2 === 0
        ? getShakeById('shake-mass-builder-power')
        : getShakeById('shake-peanut-butter-recovery');
      
      if (postWorkoutShake) {
        dayPlan.shakes.push({
          time: 'post_workout',
          timeLabel: 'Post-Workout',
          shake: postWorkoutShake,
          notes: 'Within 30 minutes after training for optimal recovery',
        });
      }
      
      // Add casein for training days (especially if training 4+ days)
      if (trainingDays.length >= 4) {
        const caseinShake = getShakeById('shake-night-recovery-casein');
        if (caseinShake) {
          dayPlan.shakes.push({
            time: 'evening',
            timeLabel: 'Before Bed',
            shake: caseinShake,
            notes: 'Slow-digesting protein for overnight recovery',
          });
        }
      }
    } else {
      // Rest Day Strategy:
      // Morning shake with lighter calories (Lean Green or Breakfast Builder)
      
      const isWeekend = day === 'saturday' || day === 'sunday';
      
      if (isWeekend) {
        // Weekend: Alternate between Breakfast Builder and Lean Green
        const weekendShake = day === 'saturday'
          ? getShakeById('shake-oatmeal-breakfast-builder')
          : getShakeById('shake-lean-muscle-green');
        
        if (weekendShake) {
          dayPlan.shakes.push({
            time: 'morning',
            timeLabel: 'Breakfast',
            shake: weekendShake,
            notes: day === 'saturday' 
              ? 'Hearty breakfast to start your weekend strong'
              : 'Light and refreshing to start your day',
          });
        }
      } else {
        // Weekday rest day: Lean Green for lower calories
        const leanGreen = getShakeById('shake-lean-muscle-green');
        if (leanGreen) {
          dayPlan.shakes.push({
            time: 'morning',
            timeLabel: 'Morning',
            shake: leanGreen,
            notes: 'Light morning shake on rest day',
          });
        }
      }
    }
    
    days.push(dayPlan);
  });
  
  const totalShakes = days.reduce((sum, day) => sum + day.shakes.length, 0);
  
  return {
    days,
    totalShakes,
    trainingDays: trainingDays.length,
    restDays: 7 - trainingDays.length,
  };
}

/**
 * Generate shopping list from weekly plan
 */
export function generateShoppingList(plan: WeeklyPlan): ShoppingList {
  const ingredientMap = new Map<string, ShoppingListItem>();
  let totalRecipes = 0;
  
  // Collect all ingredients from all shakes
  plan.days.forEach(day => {
    day.shakes.forEach(shakeSlot => {
      totalRecipes++;
      const shake = shakeSlot.shake;
      
      shake.ingredients.forEach(ingredient => {
        const key = ingredient.name.toLowerCase();
        
        if (ingredientMap.has(key)) {
          const existing = ingredientMap.get(key)!;
          existing.totalAmount += ingredient.amount;
          existing.servings++;
        } else {
          ingredientMap.set(key, {
            name: ingredient.name,
            totalAmount: ingredient.amount,
            unit: ingredient.unit,
            servings: 1,
            notes: ingredient.notes,
          });
        }
      });
    });
  });
  
  // Convert map to sorted array
  const items = Array.from(ingredientMap.values()).sort((a, b) => 
    a.name.localeCompare(b.name)
  );
  
  return {
    items,
    totalRecipes,
  };
}

/**
 * Get weekly nutrition totals
 */
export function getWeeklyNutritionTotals(plan: WeeklyPlan): {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  dailyAverage: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
} {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  
  plan.days.forEach(day => {
    day.shakes.forEach(shakeSlot => {
      const macros = shakeSlot.shake.macros;
      totalCalories += macros.calories;
      totalProtein += macros.protein_g;
      totalCarbs += macros.carbs_g;
      totalFat += macros.fat_g;
    });
  });
  
  return {
    totalCalories,
    totalProtein,
    totalCarbs,
    totalFat,
    dailyAverage: {
      calories: Math.round(totalCalories / 7),
      protein: Math.round(totalProtein / 7),
      carbs: Math.round(totalCarbs / 7),
      fat: Math.round(totalFat / 7),
    },
  };
}

/**
 * Predefined training schedules
 */
export const TRAINING_SCHEDULES: Record<string, {
  name: string;
  description: string;
  days: DayOfWeek[];
}> = {
  classic_3day: {
    name: '3-Day Classic (M/W/F)',
    description: 'Traditional 3-day split with rest days in between',
    days: ['monday', 'wednesday', 'friday'],
  },
  upper_lower_4day: {
    name: '4-Day Upper/Lower (M/T/Th/F)',
    description: 'Upper/lower split with weekend recovery',
    days: ['monday', 'tuesday', 'thursday', 'friday'],
  },
  ppl_6day: {
    name: '6-Day Push/Pull/Legs',
    description: 'High-frequency PPL with Sunday rest',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
  },
  weekend_warrior: {
    name: 'Weekend Warrior (Sat/Sun)',
    description: 'Weekend-only training for busy schedules',
    days: ['saturday', 'sunday'],
  },
  custom_5day: {
    name: '5-Day Bro Split',
    description: 'Traditional bodybuilding split, weekends off',
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
  },
};

/**
 * Format ingredient amount for display
 */
export function formatIngredientAmount(amount: number, unit: string): string {
  // Round to sensible precision
  if (unit === 'g' || unit === 'ml') {
    return `${Math.round(amount)}${unit}`;
  } else if (unit === 'each') {
    return amount === 1 ? '1' : `${Math.round(amount)}`;
  } else {
    return `${Math.round(amount * 10) / 10} ${unit}`;
  }
}

/**
 * Group shopping list by category
 */
export function groupShoppingListByCategory(items: ShoppingListItem[]): {
  category: string;
  items: ShoppingListItem[];
}[] {
  const categories = {
    'Protein Powders': ['whey protein powder', 'vanilla whey protein powder', 'chocolate whey protein powder', 'casein protein powder'],
    'Dairy & Alternatives': ['whole milk', '2% milk', 'unsweetened almond milk'],
    'Nut Butters': ['natural peanut butter', 'peanut butter', 'almond butter'],
    'Fruits': ['banana', 'frozen mixed berries', 'frozen blueberries', 'frozen pineapple'],
    'Vegetables': ['spinach', 'avocado'],
    'Grains & Seeds': ['rolled oats', 'chia seeds'],
    'Sweeteners & Flavors': ['honey', 'vanilla extract', 'cinnamon'],
  };
  
  const grouped: { category: string; items: ShoppingListItem[] }[] = [];
  const categorizedItems = new Set<string>();
  
  // Group by categories
  Object.entries(categories).forEach(([category, keywords]) => {
    const categoryItems = items.filter(item => {
      const itemName = item.name.toLowerCase();
      const matches = keywords.some(keyword => itemName.includes(keyword));
      if (matches) categorizedItems.add(item.name);
      return matches;
    });
    
    if (categoryItems.length > 0) {
      grouped.push({ category, items: categoryItems });
    }
  });
  
  // Add uncategorized items
  const uncategorized = items.filter(item => !categorizedItems.has(item.name));
  if (uncategorized.length > 0) {
    grouped.push({ category: 'Other', items: uncategorized });
  }
  
  return grouped;
}
