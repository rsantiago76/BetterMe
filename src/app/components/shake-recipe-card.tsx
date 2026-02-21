import React from 'react';
import { cn } from './ui/utils';
import { Clock, Droplet, Flame, Info } from 'lucide-react';
import { ProgramBadge } from './program-badge';
import { MacroBadge } from './macro-badge';

export interface ShakeRecipe {
  id: string;
  name: string;
  goal: 'bulking' | 'cutting' | 'recovery' | 'breakfast';
  ingredients: { item: string; amount: string; notes?: string }[];
  instructions: string[];
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  bestTime: ('Morning' | 'Pre-workout' | 'Post-workout' | 'Before bed')[];
  timingReason: string;
  prepTime: number; // in minutes
  description?: string;
  servings?: number;
}

interface ShakeRecipeCardProps {
  recipe: ShakeRecipe;
  onClick?: () => void;
  variant?: 'default' | 'compact';
}

export function ShakeRecipeCard({ 
  recipe, 
  onClick,
  variant = 'default' 
}: ShakeRecipeCardProps) {
  const goalConfig = {
    bulking: { label: 'Bulking', color: 'primary' },
    cutting: { label: 'Cutting', color: 'accent' },
    recovery: { label: 'Recovery', color: 'secondary' },
    breakfast: { label: 'Breakfast', color: 'accent' },
  };

  const config = goalConfig[recipe.goal];

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-card rounded-xl border border-border overflow-hidden transition-all duration-300',
        onClick && 'cursor-pointer hover:shadow-xl hover:scale-[1.02]',
        variant === 'compact' ? 'max-w-md' : 'max-w-2xl'
      )}
    >
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 p-6 border-b border-border">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <ProgramBadge type={recipe.goal} />
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-semibold">{recipe.prepTime} min</span>
              </div>
            </div>
            <h3 className="text-2xl font-black text-foreground mb-2">
              {recipe.name}
            </h3>
            {recipe.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {recipe.description}
              </p>
            )}
          </div>
          <div className="hidden sm:flex w-16 h-16 bg-primary/10 rounded-full items-center justify-center flex-shrink-0 ml-4">
            <Droplet className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Macro Breakdown */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-card rounded-lg p-3 text-center border border-border">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Flame className="w-3 h-3 text-accent" />
              <span className="text-xs font-semibold text-muted-foreground uppercase">Cal</span>
            </div>
            <div className="text-xl font-black text-foreground">{recipe.calories}</div>
          </div>
          <div className="bg-primary/5 rounded-lg p-3 text-center border border-primary/20">
            <div className="text-xs font-semibold text-primary uppercase mb-1">Protein</div>
            <div className="text-xl font-black text-primary">{recipe.protein}g</div>
          </div>
          <div className="bg-accent/5 rounded-lg p-3 text-center border border-accent/20">
            <div className="text-xs font-semibold text-accent uppercase mb-1">Carbs</div>
            <div className="text-xl font-black text-accent">{recipe.carbs}g</div>
          </div>
          <div className="bg-secondary/5 rounded-lg p-3 text-center border border-secondary/20">
            <div className="text-xs font-semibold text-secondary uppercase mb-1">Fats</div>
            <div className="text-xl font-black text-secondary">{recipe.fats}g</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Ingredients */}
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-primary/10 rounded flex items-center justify-center text-xs font-black text-primary">
              1
            </span>
            Ingredients
          </h4>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-start justify-between gap-3 py-2 px-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex-1">
                  <span className="text-sm font-semibold text-foreground">{ingredient.item}</span>
                  {ingredient.notes && (
                    <span className="text-xs text-muted-foreground block mt-0.5">
                      {ingredient.notes}
                    </span>
                  )}
                </div>
                <span className="text-sm font-bold text-primary whitespace-nowrap">
                  {ingredient.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div>
          <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-6 h-6 bg-accent/10 rounded flex items-center justify-center text-xs font-black text-accent">
              2
            </span>
            Instructions
          </h4>
          <ol className="space-y-2">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">
                  {index + 1}
                </span>
                <p className="text-sm text-foreground leading-relaxed flex-1 pt-0.5">
                  {instruction}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Best Time & Timing Reason */}
        <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start gap-3 mb-3">
            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wide mb-2">
                Best Time to Drink
              </h4>
              <div className="flex flex-wrap gap-2 mb-3">
                {recipe.bestTime.map((time) => (
                  <span
                    key={time}
                    className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/30"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-card/50 rounded-lg p-3">
            <Info className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <span className="font-bold text-accent">Why: </span>
              {recipe.timingReason}
            </p>
          </div>
        </div>

        {/* Macro Badges Row */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-3">
            <MacroBadge type="protein" amount={recipe.protein} size="sm" />
            <MacroBadge type="carbs" amount={recipe.carbs} size="sm" />
            <MacroBadge type="fats" amount={recipe.fats} size="sm" />
          </div>
          {recipe.servings && (
            <span className="text-xs text-muted-foreground font-semibold">
              {recipe.servings} {recipe.servings === 1 ? 'serving' : 'servings'}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
