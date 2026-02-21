import React from 'react';
import { cn } from './ui/utils';
import { Clock, Flame, ChefHat } from 'lucide-react';
import { ProgramBadge } from './program-badge';

export interface Meal {
  id: string;
  name: string;
  goal: 'bulking' | 'cutting' | 'recovery';
  description: string;
  image: string;
  cookTime: number;
  prepTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  ingredients: { item: string; amount: string; notes?: string }[];
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  bestTime: ('Morning' | 'Pre-workout' | 'Post-workout' | 'Evening')[];
  timingReason: string;
  instructions: string[];
  tips: string[];
  nutritionNotes: string;
}

interface MealCardProps {
  meal: Meal;
  onClick: () => void;
}

export function MealCard({ meal, onClick }: MealCardProps) {
  const goalConfig = {
    bulking: {
      icon: '💪',
      label: 'Bulking',
    },
    cutting: {
      icon: '🥗',
      label: 'Cutting',
    },
    recovery: {
      icon: '🧘',
      label: 'Recovery',
    },
  };

  const difficultyConfig = {
    Easy: 'bg-primary/10 text-primary border-primary/30',
    Medium: 'bg-accent/10 text-accent border-accent/30',
    Advanced: 'bg-secondary/10 text-secondary border-secondary/30',
  };

  const config = goalConfig[meal.goal];
  const totalTime = meal.prepTime + meal.cookTime;

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl">{meal.image}</span>
        </div>
        <div className="absolute top-3 right-3">
          <ProgramBadge type={meal.goal} />
        </div>
        <div className="absolute bottom-3 left-3">
          <span
            className={cn(
              'inline-block px-3 py-1 rounded-full border text-xs font-semibold bg-card/90 backdrop-blur-sm',
              difficultyConfig[meal.difficulty]
            )}
          >
            {meal.difficulty}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {meal.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {meal.description}
          </p>
        </div>

        {/* Time & Servings */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{totalTime} min</span>
          </div>
          <div className="flex items-center gap-2">
            <ChefHat className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-semibold text-foreground">{meal.servings} servings</span>
          </div>
        </div>

        {/* Macros */}
        <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
          <div className="text-center bg-primary/5 rounded-lg p-2">
            <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
              Protein
            </div>
            <div className="text-lg font-black text-primary">{meal.protein}g</div>
          </div>
          <div className="text-center bg-accent/5 rounded-lg p-2">
            <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
              Carbs
            </div>
            <div className="text-lg font-black text-accent">{meal.carbs}g</div>
          </div>
          <div className="text-center bg-secondary/5 rounded-lg p-2">
            <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
              Fats
            </div>
            <div className="text-lg font-black text-secondary">{meal.fats}g</div>
          </div>
        </div>

        {/* Calories */}
        <div className="flex items-center gap-2 mb-4">
          <Flame className="w-5 h-5 text-accent" />
          <span className="text-2xl font-black text-foreground">{meal.calories}</span>
          <span className="text-sm text-muted-foreground font-semibold">calories</span>
          <span className="text-xs text-muted-foreground ml-auto">per serving</span>
        </div>

        {/* Best Time */}
        <div className="mb-4">
          <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Best Time
          </div>
          <div className="flex flex-wrap gap-2">
            {meal.bestTime.map((time) => (
              <span
                key={time}
                className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
              >
                {time}
              </span>
            ))}
          </div>
        </div>

        <button className="text-primary font-semibold text-sm hover:underline">
          View Full Recipe →
        </button>
      </div>
    </div>
  );
}
