import React from 'react';
import { Food } from './food-card';
import { X, Clock, Lightbulb, Utensils } from 'lucide-react';
import { BetterButton } from './better-button';
import { MacroBadge } from './macro-badge';

interface FoodDetailModalProps {
  food: Food | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FoodDetailModal({ food, isOpen, onClose }: FoodDetailModalProps) {
  if (!isOpen || !food) return null;

  const categoryConfig = {
    protein: '🥩',
    carbs: '🍠',
    fats: '🥑',
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
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{categoryConfig[food.category]}</span>
                <h2 className="text-3xl font-black text-foreground">
                  {food.name}
                </h2>
              </div>
              <p className="text-muted-foreground font-semibold text-lg">
                {food.servingSize}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-6 space-y-8">
            {/* Calories & Macros */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Calories
                  </div>
                  <div className="text-4xl font-black text-foreground">{food.calories}</div>
                  <div className="text-xs text-muted-foreground mt-1">kcal</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Protein
                  </div>
                  <div className="text-4xl font-black text-primary">{food.protein}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Carbs
                  </div>
                  <div className="text-4xl font-black text-accent">{food.carbs}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground font-semibold mb-2 uppercase">
                    Fats
                  </div>
                  <div className="text-4xl font-black text-secondary">{food.fats}</div>
                  <div className="text-xs text-muted-foreground mt-1">grams</div>
                </div>
              </div>
            </div>

            {/* Macro Visualization */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-4">Macro Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                  <MacroBadge type="protein" amount={food.protein} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{
                          width: `${(food.protein * 4 / food.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((food.protein * 4 / food.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-accent/5 rounded-lg p-4 border border-accent/20">
                  <MacroBadge type="carbs" amount={food.carbs} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent rounded-full transition-all duration-500"
                        style={{
                          width: `${(food.carbs * 4 / food.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((food.carbs * 4 / food.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
                <div className="bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                  <MacroBadge type="fats" amount={food.fats} />
                  <div className="mt-3">
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-secondary rounded-full transition-all duration-500"
                        style={{
                          width: `${(food.fats * 9 / food.calories) * 100}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      {Math.round((food.fats * 9 / food.calories) * 100)}% of calories
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Best Time to Eat */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Optimal Timing</h3>
              </div>
              <div className="flex flex-wrap gap-3 mb-4">
                {food.bestTime.map((time) => (
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
                    <h4 className="font-bold text-accent mb-2">Why Timing Matters</h4>
                    <p className="text-foreground leading-relaxed">{food.timingReason}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Meal Pairings */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Utensils className="w-5 h-5 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground">Quick Meal Pairings</h3>
              </div>
              <div className="space-y-3">
                {food.pairings.map((pairing, index) => (
                  <div
                    key={index}
                    className="bg-muted/50 rounded-lg p-4 border border-border"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <p className="text-foreground leading-relaxed">{pairing}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
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
