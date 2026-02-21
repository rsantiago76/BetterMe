import React from 'react';
import { Meal } from './meal-card';
import { X, Clock, Lightbulb, ListChecks, Flame, ChefHat, Users } from 'lucide-react';
import { BetterButton } from './better-button';
import { MacroBadge } from './macro-badge';
import { ProgramBadge } from './program-badge';

interface MealDetailModalProps {
  meal: Meal | null;
  isOpen: boolean;
  onClose: () => void;
}

export function MealDetailModal({ meal, isOpen, onClose }: MealDetailModalProps) {
  if (!isOpen || !meal) return null;

  const totalTime = meal.prepTime + meal.cookTime;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header with Image */}
          <div className="relative h-64 bg-gradient-to-br from-primary/10 to-accent/10 border-b border-border">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl">{meal.image}</span>
            </div>
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg bg-card/90 backdrop-blur-sm hover:bg-card transition-colors shadow-lg"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-3 mb-3">
                <ProgramBadge type={meal.goal} />
                <span className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-semibold text-foreground border border-border">
                  {meal.difficulty}
                </span>
              </div>
              <h2 className="text-4xl font-black text-foreground mb-2 drop-shadow-md">
                {meal.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed">
              {meal.description}
            </p>

            {/* Quick Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase">Total Time</div>
                  <div className="text-xl font-black text-foreground">{totalTime} min</div>
                  <div className="text-xs text-muted-foreground">Prep: {meal.prepTime} | Cook: {meal.cookTime}</div>
                </div>
              </div>
              <div className="bg-accent/5 rounded-lg p-4 border border-accent/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase">Servings</div>
                  <div className="text-xl font-black text-foreground">{meal.servings}</div>
                  <div className="text-xs text-muted-foreground">Multiply for meal prep</div>
                </div>
              </div>
              <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20 flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground font-semibold uppercase">Difficulty</div>
                  <div className="text-xl font-black text-foreground">{meal.difficulty}</div>
                  <div className="text-xs text-muted-foreground">Cooking skill level</div>
                </div>
              </div>
            </div>

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
                  <div className="text-4xl font-black text-foreground">{meal.calories}</div>
                  <div className="text-xs text-muted-foreground mt-1">kcal</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Protein
                  </div>
                  <div className="text-4xl font-black text-primary">{meal.protein}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Carbs
                  </div>
                  <div className="text-4xl font-black text-accent">{meal.carbs}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Fats
                  </div>
                  <div className="text-4xl font-black text-secondary">{meal.fats}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
              </div>
            </div>

            {/* Macro Visualization */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Macro Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <MacroBadge type="protein" amount={meal.protein} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(meal.protein * 4 / meal.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((meal.protein * 4 / meal.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <MacroBadge type="carbs" amount={meal.carbs} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{
                          width: `${(meal.carbs * 4 / meal.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((meal.carbs * 4 / meal.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <MacroBadge type="fats" amount={meal.fats} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{
                          width: `${(meal.fats * 9 / meal.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((meal.fats * 9 / meal.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
              </div>
              {meal.nutritionNotes && (
                <div className="mt-4 bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong className="font-bold">💡 Nutrition Insight:</strong> {meal.nutritionNotes}
                  </p>
                </div>
              )}
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
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 border border-border hover:bg-muted/70 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <span className="text-foreground font-semibold block">{ingredient.item}</span>
                        {ingredient.notes && (
                          <span className="text-xs text-muted-foreground block mt-1">
                            {ingredient.notes}
                          </span>
                        )}
                      </div>
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
                  <span className="text-xl">👨‍🍳</span>
                </div>
                <h3 className="text-xl font-bold text-foreground">Cooking Instructions</h3>
              </div>
              <div className="space-y-4">
                {meal.instructions.map((instruction, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </span>
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">{instruction}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                {meal.bestTime.map((time) => (
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
                    <p className="text-foreground leading-relaxed">{meal.timingReason}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tips */}
            {meal.tips.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Chef's Tips</h3>
                </div>
                <ul className="space-y-3">
                  {meal.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-3 bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                      <span className="text-secondary text-lg">💡</span>
                      <span className="text-foreground leading-relaxed">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-border bg-muted/30">
            <div className="grid grid-cols-2 gap-3">
              <BetterButton variant="outline" onClick={onClose}>
                Close
              </BetterButton>
              <BetterButton variant="primary">
                Add to Meal Plan
              </BetterButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
