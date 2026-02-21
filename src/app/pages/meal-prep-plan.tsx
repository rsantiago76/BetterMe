import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ArrowLeft, Calendar, ShoppingCart, TrendingUp, Check, Printer, Download } from 'lucide-react';
import {
  generateWeeklyPlan,
  generateShoppingList,
  getWeeklyNutritionTotals,
  groupShoppingListByCategory,
  formatIngredientAmount,
  TRAINING_SCHEDULES,
  type DayOfWeek,
  type WeeklyPlan,
  type ShoppingList,
} from '../../utils/meal-prep-planner';

export default function MealPrepPlanPage() {
  const [selectedSchedule, setSelectedSchedule] = useState<string>('classic_3day');
  const [customDays, setCustomDays] = useState<DayOfWeek[]>([]);
  const [plan, setPlan] = useState<WeeklyPlan | null>(null);
  const [shoppingList, setShoppingList] = useState<ShoppingList | null>(null);
  const [showPlan, setShowPlan] = useState(false);

  const handleGeneratePlan = () => {
    const trainingDays = selectedSchedule === 'custom' 
      ? customDays 
      : TRAINING_SCHEDULES[selectedSchedule].days;
    
    const weeklyPlan = generateWeeklyPlan(trainingDays);
    const list = generateShoppingList(weeklyPlan);
    
    setPlan(weeklyPlan);
    setShoppingList(list);
    setShowPlan(true);
  };

  const handleReset = () => {
    setShowPlan(false);
    setPlan(null);
    setShoppingList(null);
  };

  const toggleCustomDay = (day: DayOfWeek) => {
    setCustomDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day) 
        : [...prev, day]
    );
  };

  const allDays: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Weekly Meal Prep
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              7-Day Shake Meal Prep Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a complete weekly shake schedule based on your training days, plus an auto-generated 
              shopping list with exact quantities.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Form */}
      {!showPlan && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h2 className="text-2xl font-black text-foreground mb-6">Select Your Training Schedule</h2>
              
              {/* Preset Schedules */}
              <div className="space-y-3 mb-8">
                {Object.entries(TRAINING_SCHEDULES).map(([key, schedule]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedSchedule(key)}
                    className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                      selectedSchedule === key
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-background hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-foreground">{schedule.name}</span>
                          {selectedSchedule === key && (
                            <Check className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{schedule.description}</p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {schedule.days.map(day => (
                            <span
                              key={day}
                              className="px-2 py-1 bg-primary/20 text-primary text-xs font-bold rounded uppercase"
                            >
                              {day.slice(0, 3)}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}

                {/* Custom Schedule */}
                <button
                  onClick={() => setSelectedSchedule('custom')}
                  className={`w-full px-6 py-4 rounded-lg border-2 transition-all text-left ${
                    selectedSchedule === 'custom'
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-background hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-foreground">Custom Schedule</span>
                        {selectedSchedule === 'custom' && (
                          <Check className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">Select your own training days</p>
                    </div>
                  </div>

                  {selectedSchedule === 'custom' && (
                    <div className="grid grid-cols-7 gap-2 mt-4">
                      {allDays.map(day => (
                        <button
                          key={day}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCustomDay(day);
                          }}
                          className={`px-3 py-3 rounded-lg border-2 font-bold text-xs uppercase transition-all ${
                            customDays.includes(day)
                              ? 'border-accent bg-accent text-white'
                              : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                          }`}
                        >
                          {day.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  )}
                </button>
              </div>

              {/* Generate Button */}
              <BetterButton
                variant="primary"
                onClick={handleGeneratePlan}
                disabled={selectedSchedule === 'custom' && customDays.length === 0}
                className="w-full py-4 text-lg"
              >
                <Calendar className="w-5 h-5" />
                Generate My Meal Prep Plan
              </BetterButton>

              {selectedSchedule === 'custom' && customDays.length === 0 && (
                <p className="text-sm text-accent text-center mt-3">
                  Select at least one training day to continue
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Plan Results */}
      {showPlan && plan && shoppingList && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-6xl mx-auto">
            {/* Header Actions */}
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground mb-2">Your 7-Day Shake Plan</h2>
                <p className="text-muted-foreground">
                  {plan.totalShakes} shakes • {plan.trainingDays} training days • {plan.restDays} rest days
                </p>
              </div>
              <div className="flex items-center gap-3">
                <BetterButton variant="outline" size="sm">
                  <Printer className="w-4 h-4" />
                  Print
                </BetterButton>
                <BetterButton variant="outline" size="sm" onClick={handleReset}>
                  Edit Schedule
                </BetterButton>
              </div>
            </div>

            {/* Weekly Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-12">
              {plan.days.map((day, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border-2 ${
                    day.isTrainingDay
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-card'
                  }`}
                >
                  <div className="text-center mb-3">
                    <div className={`text-xs font-bold uppercase mb-1 ${
                      day.isTrainingDay ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {day.dayLabel.slice(0, 3)}
                    </div>
                    <div className={`text-sm font-bold ${
                      day.isTrainingDay ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {day.isTrainingDay ? '💪 Train' : '😌 Rest'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-black text-foreground">{day.shakes.length}</div>
                    <div className="text-xs text-muted-foreground">shake{day.shakes.length !== 1 ? 's' : ''}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Daily Schedule */}
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h3 className="text-2xl font-black text-foreground mb-6">Daily Breakdown</h3>
              
              <div className="space-y-6">
                {plan.days.map((day, dayIndex) => (
                  <div key={dayIndex} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white ${
                          day.isTrainingDay ? 'bg-primary' : 'bg-secondary'
                        }`}>
                          {day.dayLabel.slice(0, 1)}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-foreground">{day.dayLabel}</h4>
                          <p className="text-sm text-muted-foreground">
                            {day.isTrainingDay ? 'Training Day' : 'Rest Day'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-muted-foreground">
                          {day.shakes.length} shake{day.shakes.length !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </div>

                    {day.shakes.length === 0 ? (
                      <div className="ml-15 p-4 bg-background rounded-lg border border-border text-center">
                        <p className="text-sm text-muted-foreground">No shakes scheduled - focus on whole food meals</p>
                      </div>
                    ) : (
                      <div className="ml-15 space-y-3">
                        {day.shakes.map((shakeSlot, shakeIndex) => (
                          <div
                            key={shakeIndex}
                            className="bg-background rounded-lg p-4 border border-border hover:border-primary/50 transition-colors"
                          >
                            <div className="flex items-start gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded uppercase">
                                    {shakeSlot.timeLabel}
                                  </span>
                                  {shakeSlot.shake.goalTags.map(tag => (
                                    <span
                                      key={tag}
                                      className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                <h5 className="text-lg font-bold text-foreground mb-1">
                                  {shakeSlot.shake.name}
                                </h5>
                                <p className="text-sm text-muted-foreground mb-3">
                                  {shakeSlot.notes}
                                </p>
                                <div className="flex items-center gap-4 text-sm">
                                  <div>
                                    <span className="text-muted-foreground">Calories:</span>{' '}
                                    <span className="font-bold text-foreground">{shakeSlot.shake.macros.calories}</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Protein:</span>{' '}
                                    <span className="font-bold text-primary">{shakeSlot.shake.macros.protein_g}g</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Carbs:</span>{' '}
                                    <span className="font-bold text-secondary">{shakeSlot.shake.macros.carbs_g}g</span>
                                  </div>
                                  <div>
                                    <span className="text-muted-foreground">Fat:</span>{' '}
                                    <span className="font-bold text-accent">{shakeSlot.shake.macros.fat_g}g</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Weekly Nutrition Summary */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 border border-primary/20 mb-8">
              <h3 className="text-2xl font-black text-foreground mb-6">Weekly Nutrition from Shakes</h3>
              
              {(() => {
                const totals = getWeeklyNutritionTotals(plan);
                return (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        Total Calories
                      </div>
                      <div className="text-3xl font-black text-foreground mb-1">
                        {totals.totalCalories.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ~{totals.dailyAverage.calories}/day
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        Total Protein
                      </div>
                      <div className="text-3xl font-black text-primary mb-1">
                        {totals.totalProtein}g
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ~{totals.dailyAverage.protein}g/day
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        Total Carbs
                      </div>
                      <div className="text-3xl font-black text-secondary mb-1">
                        {totals.totalCarbs}g
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ~{totals.dailyAverage.carbs}g/day
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                        Total Fat
                      </div>
                      <div className="text-3xl font-black text-accent mb-1">
                        {totals.totalFat}g
                      </div>
                      <div className="text-sm text-muted-foreground">
                        ~{totals.dailyAverage.fat}g/day
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Shopping List */}
            <div className="bg-card rounded-xl p-8 border border-border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-6 h-6 text-accent" />
                  <h3 className="text-2xl font-black text-foreground">Shopping List</h3>
                </div>
                <BetterButton variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                  Export List
                </BetterButton>
              </div>

              <div className="mb-6 p-4 bg-accent/10 rounded-lg border border-accent/20">
                <p className="text-sm text-foreground">
                  <span className="font-bold">{shoppingList.totalRecipes} shake recipes</span> this week. 
                  Quantities are totaled for the entire week—prep once and you're set!
                </p>
              </div>

              {/* Grouped by Category */}
              <div className="space-y-6">
                {groupShoppingListByCategory(shoppingList.items).map((group, groupIndex) => (
                  <div key={groupIndex}>
                    <h4 className="text-lg font-bold text-foreground mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary text-sm font-bold">{group.items.length}</span>
                      </div>
                      {group.category}
                    </h4>
                    <div className="space-y-2">
                      {group.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="flex items-center justify-between p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded border-2 border-border flex items-center justify-center">
                              <div className="w-3 h-3 bg-background"></div>
                            </div>
                            <div>
                              <div className="font-semibold text-foreground">{item.name}</div>
                              {item.notes && (
                                <div className="text-xs text-muted-foreground">{item.notes}</div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-foreground">
                              {formatIngredientAmount(item.totalAmount, item.unit)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ({item.servings} serving{item.servings !== 1 ? 's' : ''})
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Prep Tips */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                <h4 className="font-bold text-foreground mb-3">🔥 Meal Prep Pro Tips</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Pre-portion protein powder into individual containers or bags</li>
                  <li>• Freeze bananas peeled in ziplock bags for easy blending</li>
                  <li>• Measure dry ingredients (oats, chia) into daily servings</li>
                  <li>• Keep a dedicated "shake station" in your kitchen for efficiency</li>
                  <li>• Prep shakes the night before and store in fridge (except casein)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 BetterMe. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Meal Prep Guide
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Recipe Library
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
