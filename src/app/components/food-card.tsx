import React from 'react';
import { cn } from './ui/utils';
import { Clock, Flame } from 'lucide-react';

export interface Food {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'recovery';
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  servingSize: string;
  bestTime: ('Pre-workout' | 'Post-workout' | 'Morning' | 'Before bed')[];
  timingReason: string;
  pairings: string[];
}

interface FoodCardProps {
  food: Food;
  onClick: () => void;
}

export function FoodCard({ food, onClick }: FoodCardProps) {
  const categoryConfig = {
    protein: {
      label: 'High Protein',
      className: 'bg-primary/10 text-primary border-primary/30',
      icon: '🥩',
    },
    carbs: {
      label: 'Complex Carbs',
      className: 'bg-accent/10 text-accent border-accent/30',
      icon: '🍠',
    },
    fats: {
      label: 'Healthy Fats',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
      icon: '🥑',
    },
    recovery: {
      label: 'Recovery Food',
      className: 'bg-primary/10 text-primary border-primary/30',
      icon: '🧘',
    },
  };

  const config = categoryConfig[food.category];

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{config.icon}</span>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
              {food.name}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground font-semibold">
            {food.servingSize}
          </p>
        </div>
      </div>

      {/* Calories */}
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
        <Flame className="w-5 h-5 text-accent" />
        <span className="text-2xl font-black text-foreground">{food.calories}</span>
        <span className="text-sm text-muted-foreground font-semibold">calories</span>
      </div>

      {/* Macros */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="text-center">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Protein
          </div>
          <div className="text-lg font-black text-primary">{food.protein}g</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Carbs
          </div>
          <div className="text-lg font-black text-accent">{food.carbs}g</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
            Fats
          </div>
          <div className="text-lg font-black text-secondary">{food.fats}g</div>
        </div>
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
          {food.bestTime.map((time) => (
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
        View Details & Pairings →
      </button>
    </div>
  );
}
