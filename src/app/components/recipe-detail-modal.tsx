import React from 'react';
import { Recipe } from './recipe-card';
import { X, Clock, Lightbulb, ListChecks, Flame } from 'lucide-react';
import { BetterButton } from './better-button';
import { MacroBadge } from './macro-badge';
import { ProgramBadge } from './program-badge';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
}

export function RecipeDetailModal({ recipe, isOpen, onClose }: RecipeDetailModalProps) {
  if (!isOpen || !recipe) return null;

  const goalConfig = {
    bulking: '💪',
    cutting: '🥗',
    recovery: '🧘',
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-start justify-between p-6 border-b border-border">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-5xl">{goalConfig[recipe.goal]}</span>
                <ProgramBadge type={recipe.goal} />
              </div>
              <h2 className="text-3xl font-black text-foreground mb-2">
                {recipe.name}
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {recipe.description}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors flex-shrink-0 ml-4"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Nutrition Info */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-6 h-6 text-accent" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">Nutrition Facts</h3>
                  <p className="text-sm text-muted-foreground">Per serving</p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Calories
                  </div>
                  <div className="text-4xl font-black text-foreground">{recipe.calories}</div>
                  <div className="text-xs text-muted-foreground mt-1">kcal</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Protein
                  </div>
                  <div className="text-4xl font-black text-primary">{recipe.protein}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Carbs
                  </div>
                  <div className="text-4xl font-black text-accent">{recipe.carbs}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Fats
                  </div>
                  <div className="text-4xl font-black text-secondary">{recipe.fats}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
              </div>
            </div>

            {/* Macro Visualization */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Macro Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <MacroBadge type="protein" amount={recipe.protein} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(recipe.protein * 4 / recipe.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((recipe.protein * 4 / recipe.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <MacroBadge type="carbs" amount={recipe.carbs} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{
                          width: `${(recipe.carbs * 4 / recipe.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((recipe.carbs * 4 / recipe.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <MacroBadge type="fats" amount={recipe.fats} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{
                          width: `${(recipe.fats * 9 / recipe.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((recipe.fats * 9 / recipe.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ListChecks className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Ingredients</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recipe.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-foreground font-semibold">{ingredient.item}</span>
                      <span className="text-primary text-sm font-bold whitespace-nowrap">
                        {ingredient.amount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <span className="text-xl">📝</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Instructions</h3>
              </div>
              <ol className="space-y-3">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <span className="text-foreground leading-relaxed">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Best Time */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Optimal Timing</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {recipe.bestTime.map((time) => (
                  <span
                    key={time}
                    className="px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg border border-primary/30"
                  >
                    ⏰ {time}
                  </span>
                ))}
              </div>
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-accent mb-2">Why This Timing?</h4>
                    <p className="text-foreground leading-relaxed">{recipe.timingReason}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            {recipe.tips.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Pro Tips</h3>
                </div>
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-secondary text-lg">💡</span>
                      <span className="text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border">
            <BetterButton variant="primary" className="w-full" onClick={onClose}>
              Got It
            </BetterButton>
          </div>
        </div>
      </div>
    </div>
  );
}
