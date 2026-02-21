import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ArrowLeft, Calculator, TrendingUp, TrendingDown, Minus, Clock, Droplet, Target } from 'lucide-react';
import {
  calculateMacroPlan,
  getMacroPercentages,
  type UserStats,
  type MacroCalculationResult,
  type Sex,
  type ActivityLevel,
  type Goal,
} from '../../utils/macro-calculator';

export default function MacroCalculatorPage() {
  const [formData, setFormData] = useState<UserStats>({
    age: 25,
    heightCm: 175,
    weightKg: 75,
    activityLevel: 'moderate' as ActivityLevel,
    goal: 'maintain' as Goal,
    trainingDaysPerWeek: 3,
  });

  const [result, setResult] = useState<MacroCalculationResult | null>(null);
  const [showResults, setShowResults] = useState(false);

  const handleCalculate = () => {
    const calculatedResult = calculateMacroPlan(formData);
    setResult(calculatedResult);
    setShowResults(true);
  };

  const handleReset = () => {
    setShowResults(false);
    setResult(null);
  };

  const updateFormData = (field: keyof UserStats, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
              <Calculator className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Macro Calculator
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Science-Backed Nutrition Planning
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get personalized daily macros, meal timing recommendations, and shake suggestions 
              based on your stats and goals.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Form */}
      {!showResults && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-xl p-8 border border-border">
              <h2 className="text-2xl font-black text-foreground mb-6">Enter Your Stats</h2>
              
              <div className="space-y-6">
                {/* Sex */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Sex (Optional)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => updateFormData('sex', 'male')}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                        formData.sex === 'male'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      onClick={() => updateFormData('sex', 'female')}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                        formData.sex === 'female'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      Female
                    </button>
                    <button
                      onClick={() => updateFormData('sex', undefined)}
                      className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                        !formData.sex
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      Prefer not to say
                    </button>
                  </div>
                </div>

                {/* Age */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Age (years)
                  </label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => updateFormData('age', parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                    min="15"
                    max="80"
                  />
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={formData.heightCm}
                      onChange={(e) => updateFormData('heightCm', parseInt(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                      min="140"
                      max="220"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={formData.weightKg}
                      onChange={(e) => updateFormData('weightKg', parseFloat(e.target.value))}
                      className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                      min="40"
                      max="200"
                      step="0.1"
                    />
                  </div>
                </div>

                {/* Activity Level */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Activity Level
                  </label>
                  <select
                    value={formData.activityLevel}
                    onChange={(e) => updateFormData('activityLevel', e.target.value as ActivityLevel)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                  >
                    <option value="sedentary">Sedentary - Little to no exercise</option>
                    <option value="light">Light - Exercise 1-3 days/week</option>
                    <option value="moderate">Moderate - Exercise 3-5 days/week</option>
                    <option value="high">High - Exercise 6-7 days/week</option>
                    <option value="very_high">Very High - Athlete / Physical job</option>
                  </select>
                </div>

                {/* Training Days */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Training Days Per Week
                  </label>
                  <div className="grid grid-cols-7 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                      <button
                        key={day}
                        onClick={() => updateFormData('trainingDaysPerWeek', day)}
                        className={`px-4 py-3 rounded-lg border-2 font-bold transition-all ${
                          formData.trainingDaysPerWeek === day
                            ? 'border-primary bg-primary text-white'
                            : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Primary Goal
                  </label>
                  <div className="grid grid-cols-3 gap-4">
                    <button
                      onClick={() => updateFormData('goal', 'bulk')}
                      className={`px-6 py-4 rounded-lg border-2 font-bold transition-all ${
                        formData.goal === 'bulk'
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border bg-background text-muted-foreground hover:border-primary/50'
                      }`}
                    >
                      <TrendingUp className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Bulk</div>
                      <div className="text-xs opacity-70">Build Muscle</div>
                    </button>
                    <button
                      onClick={() => updateFormData('goal', 'cut')}
                      className={`px-6 py-4 rounded-lg border-2 font-bold transition-all ${
                        formData.goal === 'cut'
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border bg-background text-muted-foreground hover:border-accent/50'
                      }`}
                    >
                      <TrendingDown className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Cut</div>
                      <div className="text-xs opacity-70">Lose Fat</div>
                    </button>
                    <button
                      onClick={() => updateFormData('goal', 'maintain')}
                      className={`px-6 py-4 rounded-lg border-2 font-bold transition-all ${
                        formData.goal === 'maintain'
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-border bg-background text-muted-foreground hover:border-secondary/50'
                      }`}
                    >
                      <Minus className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm">Maintain</div>
                      <div className="text-xs opacity-70">Stay Lean</div>
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <BetterButton
                  variant="primary"
                  onClick={handleCalculate}
                  className="w-full py-4 text-lg"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate My Macros
                </BetterButton>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {showResults && result && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground mb-2">Your Personalized Plan</h2>
                <p className="text-muted-foreground">
                  Based on your stats and {formData.goal} goal
                </p>
              </div>
              <BetterButton variant="outline" onClick={handleReset}>
                Recalculate
              </BetterButton>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  BMR (Basal Rate)
                </div>
                <div className="text-3xl font-black text-foreground">{result.bmr}</div>
                <div className="text-xs text-muted-foreground mt-1">calories/day at rest</div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  TDEE (Maintenance)
                </div>
                <div className="text-3xl font-black text-foreground">{result.tdee}</div>
                <div className="text-xs text-muted-foreground mt-1">calories/day active</div>
              </div>
              <div className="bg-card rounded-xl p-6 border border-border">
                <div className="text-xs font-semibold text-muted-foreground uppercase mb-1">
                  Goal Adjustment
                </div>
                <div className={`text-3xl font-black ${result.goalAdjustment > 0 ? 'text-primary' : result.goalAdjustment < 0 ? 'text-accent' : 'text-secondary'}`}>
                  {result.goalAdjustment > 0 ? '+' : ''}{result.goalAdjustment}
                </div>
                <div className="text-xs text-muted-foreground mt-1">calories/day</div>
              </div>
              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-6 border border-primary">
                <div className="text-xs font-semibold text-white/80 uppercase mb-1">
                  Target Calories
                </div>
                <div className="text-3xl font-black text-white">{result.dailyTargets.calories}</div>
                <div className="text-xs text-white/80 mt-1">calories/day</div>
              </div>
            </div>

            {/* Daily Macros */}
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h3 className="text-2xl font-black text-foreground mb-6">Daily Macro Targets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-primary/10 flex items-center justify-center border-4 border-primary">
                    <div className="text-center">
                      <div className="text-2xl font-black text-primary">{result.dailyTargets.protein_g}</div>
                      <div className="text-xs font-semibold text-primary">g</div>
                    </div>
                  </div>
                  <div className="font-bold text-foreground">Protein</div>
                  <div className="text-sm text-muted-foreground">
                    {getMacroPercentages(result.dailyTargets).protein}% calories
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {result.recommendations.proteinPerKg}g per kg bodyweight
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-secondary/10 flex items-center justify-center border-4 border-secondary">
                    <div className="text-center">
                      <div className="text-2xl font-black text-secondary">{result.dailyTargets.carbs_g}</div>
                      <div className="text-xs font-semibold text-secondary">g</div>
                    </div>
                  </div>
                  <div className="font-bold text-foreground">Carbs</div>
                  <div className="text-sm text-muted-foreground">
                    {getMacroPercentages(result.dailyTargets).carbs}% calories
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Primary energy source
                  </div>
                </div>

                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-3 rounded-full bg-accent/10 flex items-center justify-center border-4 border-accent">
                    <div className="text-center">
                      <div className="text-2xl font-black text-accent">{result.dailyTargets.fat_g}</div>
                      <div className="text-xs font-semibold text-accent">g</div>
                    </div>
                  </div>
                  <div className="font-bold text-foreground">Fats</div>
                  <div className="text-sm text-muted-foreground">
                    {getMacroPercentages(result.dailyTargets).fat}% calories
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Hormone support
                  </div>
                </div>
              </div>

              {/* Macro Bar */}
              <div className="w-full h-8 rounded-full overflow-hidden flex">
                <div
                  className="bg-primary flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${getMacroPercentages(result.dailyTargets).protein}%` }}
                >
                  {getMacroPercentages(result.dailyTargets).protein}%
                </div>
                <div
                  className="bg-secondary flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${getMacroPercentages(result.dailyTargets).carbs}%` }}
                >
                  {getMacroPercentages(result.dailyTargets).carbs}%
                </div>
                <div
                  className="bg-accent flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: `${getMacroPercentages(result.dailyTargets).fat}%` }}
                >
                  {getMacroPercentages(result.dailyTargets).fat}%
                </div>
              </div>
            </div>

            {/* Meal Timing */}
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h3 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Meal Timing & Distribution
              </h3>
              
              <div className="space-y-4">
                {result.mealTimings.map((meal, index) => (
                  <div
                    key={index}
                    className="bg-background rounded-lg p-6 border border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="text-lg font-bold text-foreground">{meal.name}</h4>
                        <p className="text-sm text-muted-foreground">{meal.timeOfDay}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-black text-primary">{meal.calories}</div>
                        <div className="text-xs text-muted-foreground">calories ({meal.percentCalories.toFixed(0)}%)</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-3">
                      <div className="text-center bg-primary/5 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Protein</div>
                        <div className="text-lg font-bold text-primary">{meal.protein_g}g</div>
                      </div>
                      <div className="text-center bg-secondary/5 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Carbs</div>
                        <div className="text-lg font-bold text-secondary">{meal.carbs_g}g</div>
                      </div>
                      <div className="text-center bg-accent/5 rounded-lg p-3">
                        <div className="text-xs text-muted-foreground mb-1">Fats</div>
                        <div className="text-lg font-bold text-accent">{meal.fat_g}g</div>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">{meal.notes}</p>

                    {meal.recommendedShake && (
                      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 border border-primary/20">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-primary uppercase mb-1">
                              Recommended Shake
                            </div>
                            <div className="font-bold text-foreground">{meal.recommendedShake.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {meal.recommendedShake.macros.calories} cal • {meal.recommendedShake.macros.protein_g}g protein
                            </div>
                          </div>
                          <BetterButton variant="outline" size="sm">
                            View Recipe
                          </BetterButton>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-primary" />
                  Hydration Target
                </h3>
                <div className="text-4xl font-black text-primary mb-2">
                  {result.recommendations.waterLitersPerDay}L
                </div>
                <p className="text-sm text-muted-foreground">
                  Drink at least {result.recommendations.waterLitersPerDay} liters of water daily. 
                  Add 500ml per hour of intense training.
                </p>
              </div>

              <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-6 border border-secondary/20">
                <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary" />
                  Calorie Range
                </h3>
                <div className="text-2xl font-black text-secondary mb-2">
                  {result.recommendations.calorieRange.min} - {result.recommendations.calorieRange.max}
                </div>
                <p className="text-sm text-muted-foreground">
                  Adjust within this range based on weekly progress. Track weight and adjust if needed.
                </p>
              </div>
            </div>

            {/* Pro Tips */}
            <div className="mt-8 bg-card rounded-xl p-8 border border-border">
              <h3 className="text-2xl font-black text-foreground mb-6">Pro Tips for Success</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</span>
                    Track Consistently
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Use a food tracking app for at least 2 weeks to learn portion sizes and hit your targets accurately.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</span>
                    Prioritize Protein
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Hit your protein target every day—it's the most important macro for muscle building and preservation during cuts.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">3</span>
                    Time Your Carbs
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Load carbs around training (pre/post workout) when insulin sensitivity is highest for better performance and recovery.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold">4</span>
                    Adjust Weekly
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Weigh yourself weekly (same day/time). If progress stalls for 2 weeks, adjust calories by 100-200 in the right direction.
                  </p>
                </div>
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
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
