import React from 'react';
import { cn } from './ui/utils';
import { Clock, Flame } from 'lucide-react';
import { ProgramBadge } from './program-badge';

export interface Recipe {
  id: string;
  name: string;
  goal: 'bulking' | 'cutting' | 'recovery';
  description: string;
  ingredients: { item: string; amount: string }[];
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  bestTime: ('Post-workout' | 'Breakfast replacement' | 'Before bed' | 'Pre-workout')[];
  timingReason: string;
  instructions: string[];
  tips: string[];
}

interface RecipeCardProps {
  recipe: Recipe;
  onClick: () => void;
}

export function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  const goalConfig = {
    bulking: {
      icon: '💪',
      label: 'Mass Builder',
    },
    cutting: {
      icon: '🥗',
      label: 'Lean Muscle',
    },
    recovery: {
      icon: '🧘',
      label: 'Recovery',
    },
  };

  const config = goalConfig[recipe.goal];

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-3xl">{config.icon}</span>
            <ProgramBadge type={recipe.goal} />
          </div>
          <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {recipe.name}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {recipe.description}
          </p>
        </div>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3 mb-4 pb-4 border-b border-border">
        <div className="text-center bg-primary/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Protein
          </div>
          <div className="text-2xl font-black text-primary">{recipe.protein}g</div>
        </div>
        <div className="text-center bg-accent/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Carbs
          </div>
          <div className="text-2xl font-black text-accent">{recipe.carbs}g</div>
        </div>
        <div className="text-center bg-secondary/5 rounded-lg p-3">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Fats
          </div>
          <div className="text-2xl font-black text-secondary">{recipe.fats}g</div>
        </div>
      </div>

      {/* Calories */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <Flame className="w-5 h-5 text-accent" />
        <span className="text-2xl font-black text-foreground">{recipe.calories}</span>
        <span className="text-sm text-muted-foreground font-semibold">calories</span>
      </div>

      {/* Best Time */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-muted-foreground" />
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            Best Time
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {recipe.bestTime.map((time) => (
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
  );
}
