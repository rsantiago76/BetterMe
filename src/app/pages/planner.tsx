import { Link } from 'react-router';
import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { TimeBlock } from '../components/time-block';
import { HydrationTracker } from '../components/hydration-tracker';
import { DailyTimeline } from '../components/daily-timeline';
import {
  ArrowLeft,
  Calendar,
  Coffee,
  Utensils,
  Dumbbell,
  Pill,
  Moon,
  TrendingUp,
  Target,
  Flame,
  CheckCircle2,
} from 'lucide-react';

export default function PlannerPage() {
  const [wakeUpTime] = useState('06:00');
  const [trainingTime] = useState('17:00');
  const [sleepTarget] = useState('22:30');

  const [hydrationCurrent, setHydrationCurrent] = useState(1.5);
  const [hydrationTarget] = useState(4);

  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set(['wake']));

  const toggleItem = (id: string) => {
    setCompletedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const meals = [
    { id: 'breakfast', time: '07:00', title: 'Breakfast', description: 'Egg whites, oatmeal, berries', icon: <Coffee className="w-6 h-6 text-accent" />, macros: '38P • 65C • 12F' },
    { id: 'snack1', time: '10:00', title: 'Mid-Morning Snack', description: 'Greek yogurt, almonds', icon: <Utensils className="w-6 h-6 text-primary" />, macros: '25P • 20C • 15F' },
    { id: 'lunch', time: '13:00', title: 'Lunch', description: 'Chicken breast, brown rice, broccoli', icon: <Utensils className="w-6 h-6 text-primary" />, macros: '52P • 68C • 14F' },
    { id: 'preworkout', time: '16:30', title: 'Pre-Workout Meal', description: 'Banana, peanut butter', icon: <Utensils className="w-6 h-6 text-accent" />, macros: '8P • 45C • 16F' },
    { id: 'postworkout', time: '18:30', title: 'Post-Workout Shake', description: 'Whey protein, oats, berries', icon: <Coffee className="w-6 h-6 text-accent" />, macros: '45P • 62C • 8F' },
    { id: 'dinner', time: '20:00', title: 'Dinner', description: 'Salmon, quinoa, asparagus', icon: <Utensils className="w-6 h-6 text-primary" />, macros: '48P • 52C • 28F' },
  ];

  const supplements = [
    { id: 'supp-morning', time: '07:00', title: 'Morning Supplements', description: 'Multivitamin, Vitamin D, Omega-3' },
    { id: 'supp-preworkout', time: '16:30', title: 'Pre-Workout', description: 'Creatine, BCAA' },
    { id: 'supp-postworkout', time: '18:30', title: 'Post-Workout', description: 'Creatine (if not pre)' },
    { id: 'supp-bed', time: '22:00', title: 'Before Bed', description: 'Magnesium, ZMA' },
  ];

  const timelineEvents = [
    { time: '06:00', title: 'Wake Up', type: 'wake' as const, isCompleted: completedItems.has('wake') },
    { time: '07:00', title: 'Breakfast + Supplements', type: 'meal' as const, isCompleted: completedItems.has('breakfast') },
    { time: '10:00', title: 'Mid-Morning Snack', type: 'meal' as const, isCompleted: completedItems.has('snack1') },
    { time: '13:00', title: 'Lunch', type: 'meal' as const, isCompleted: completedItems.has('lunch') },
    { time: '16:30', title: 'Pre-Workout Meal + Supplements', type: 'supplement' as const, isCompleted: completedItems.has('preworkout') },
    { time: '17:00', title: 'Training Session', type: 'workout' as const, isCompleted: completedItems.has('workout') },
    { time: '18:30', title: 'Post-Workout Shake', type: 'meal' as const, isCompleted: completedItems.has('postworkout') },
    { time: '20:00', title: 'Dinner', type: 'meal' as const, isCompleted: completedItems.has('dinner') },
    { time: '22:00', title: 'Evening Supplements', type: 'supplement' as const, isCompleted: completedItems.has('supp-bed') },
    { time: '22:30', title: 'Sleep', type: 'sleep' as const, isCompleted: false },
  ];

  const totalMacros = meals.reduce((acc, meal) => {
    const isCompleted = completedItems.has(meal.id);
    if (isCompleted) {
      const [p, c, f] = meal.macros.split(' • ').map(m => parseInt(m));
      return {
        protein: acc.protein + p,
        carbs: acc.carbs + c,
        fats: acc.fats + f,
      };
    }
    return acc;
  }, { protein: 0, carbs: 0, fats: 0 });

  const totalCalories = (totalMacros.protein * 4) + (totalMacros.carbs * 4) + (totalMacros.fats * 9);
  const targetCalories = 3200;
  const caloriesRemaining = targetCalories - totalCalories;

  const completedMeals = meals.filter(m => completedItems.has(m.id)).length;
  const completedSupps = supplements.filter(s => completedItems.has(s.id)).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-3">
              <Link
                to="/"
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <BetterButton variant="primary" size="sm">
                Save Plan
              </BetterButton>
            </div>
          </div>
        </div>
      </header>

      {/* Page Header */}
      <section className="bg-gradient-to-br from-primary/5 via-transparent to-accent/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-12">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-start gap-6">
              <div className="hidden md:flex w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center flex-shrink-0">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black text-foreground mb-3">
                  Daily Planner
                </h1>
                <p className="text-lg text-muted-foreground">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="bg-primary text-white rounded-xl px-6 py-4 text-center">
                <div className="text-3xl font-black">{completedMeals + completedSupps}</div>
                <div className="text-xs font-semibold opacity-90">Tasks Done</div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Coffee className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-muted-foreground uppercase">Wake Up</span>
              </div>
              <p className="text-2xl font-black text-foreground">{wakeUpTime}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Dumbbell className="w-5 h-5 text-primary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase">Training</span>
              </div>
              <p className="text-2xl font-black text-foreground">{trainingTime}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Moon className="w-5 h-5 text-secondary" />
                <span className="text-xs font-semibold text-muted-foreground uppercase">Sleep</span>
              </div>
              <p className="text-2xl font-black text-foreground">{sleepTarget}</p>
            </div>
            <div className="bg-card rounded-lg p-4 border border-border">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-5 h-5 text-accent" />
                <span className="text-xs font-semibold text-muted-foreground uppercase">Calories</span>
              </div>
              <p className="text-2xl font-black text-foreground">{targetCalories}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Meals & Supplements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Daily Progress */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Daily Progress</h3>
                    <p className="text-sm text-muted-foreground">Track your nutrition and supplementation</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Calories */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <Flame className="w-5 h-5 text-accent" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Calories</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-black text-foreground">{totalCalories}</span>
                    <span className="text-sm text-muted-foreground pb-1">/ {targetCalories}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-accent to-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalCalories / targetCalories) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {caloriesRemaining > 0 ? `${caloriesRemaining} remaining` : 'Target reached!'}
                  </p>
                </div>

                {/* Protein */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-semibold text-primary uppercase">Protein</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-black text-primary">{totalMacros.protein}g</span>
                    <span className="text-sm text-muted-foreground pb-1">/ 200g</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalMacros.protein / 200) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {200 - totalMacros.protein > 0 ? `${200 - totalMacros.protein}g remaining` : 'Target reached!'}
                  </p>
                </div>

                {/* Tasks */}
                <div className="bg-card rounded-lg p-4 border border-border">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Tasks</span>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-black text-foreground">{completedMeals + completedSupps}</span>
                    <span className="text-sm text-muted-foreground pb-1">/ {meals.length + supplements.length}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent rounded-full transition-all duration-500"
                      style={{ width: `${((completedMeals + completedSupps) / (meals.length + supplements.length)) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {meals.length + supplements.length - (completedMeals + completedSupps)} tasks remaining
                  </p>
                </div>
              </div>
            </div>

            {/* Meals */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-foreground">Meal Schedule</h2>
                <span className="text-sm font-semibold text-muted-foreground">
                  {completedMeals} / {meals.length} completed
                </span>
              </div>
              <div className="space-y-3">
                {meals.map((meal) => (
                  <TimeBlock
                    key={meal.id}
                    time={meal.time}
                    title={meal.title}
                    description={`${meal.description} • ${meal.macros}`}
                    icon={meal.icon}
                    isCompleted={completedItems.has(meal.id)}
                    onToggle={() => toggleItem(meal.id)}
                    color="primary"
                  />
                ))}
              </div>
            </div>

            {/* Training */}
            <div>
              <h2 className="text-2xl font-black text-foreground mb-4">Training Session</h2>
              <TimeBlock
                time={trainingTime}
                title="Push Day: Chest & Triceps"
                description="Barbell bench press, Incline DB press, Cable flyes, Tricep dips"
                icon={<Dumbbell className="w-6 h-6 text-accent" />}
                isCompleted={completedItems.has('workout')}
                onToggle={() => toggleItem('workout')}
                color="accent"
              />
            </div>

            {/* Supplements */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black text-foreground">Supplement Schedule</h2>
                <span className="text-sm font-semibold text-muted-foreground">
                  {completedSupps} / {supplements.length} completed
                </span>
              </div>
              <div className="space-y-3">
                {supplements.map((supp) => (
                  <TimeBlock
                    key={supp.id}
                    time={supp.time}
                    title={supp.title}
                    description={supp.description}
                    icon={<Pill className="w-6 h-6 text-secondary" />}
                    isCompleted={completedItems.has(supp.id)}
                    onToggle={() => toggleItem(supp.id)}
                    color="secondary"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Hydration & Timeline */}
          <div className="space-y-6">
            {/* Hydration Tracker */}
            <HydrationTracker
              current={hydrationCurrent}
              target={hydrationTarget}
              onIncrease={() => setHydrationCurrent(prev => Math.min(prev + 0.25, hydrationTarget + 2))}
              onDecrease={() => setHydrationCurrent(prev => Math.max(prev - 0.25, 0))}
            />

            {/* Sleep Target */}
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                  <Moon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Sleep Target</h3>
                  <p className="text-sm text-muted-foreground">Recovery is growth</p>
                </div>
              </div>
              <div className="bg-card rounded-lg p-6 border border-border text-center mb-4">
                <p className="text-5xl font-black text-foreground mb-2">{sleepTarget}</p>
                <p className="text-sm text-muted-foreground font-semibold">Bedtime target</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Wake up at:</span>
                  <span className="font-bold text-foreground">{wakeUpTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Sleep duration:</span>
                  <span className="font-bold text-foreground">7.5 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Quality goal:</span>
                  <span className="font-bold text-secondary">Deep sleep</span>
                </div>
              </div>
              <div className="mt-4 bg-secondary/5 rounded-lg p-4 border border-secondary/20">
                <p className="text-xs text-foreground">
                  <strong className="font-bold">💡 Tip:</strong> Dim lights 1 hour before bed. Avoid screens and caffeine after 6pm for optimal sleep quality.
                </p>
              </div>
            </div>

            {/* Timeline */}
            <DailyTimeline events={timelineEvents} />
          </div>
        </div>
      </section>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border p-4 z-30 lg:hidden">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-foreground">Today's Progress</p>
            <p className="text-xs text-muted-foreground">
              {completedMeals + completedSupps} / {meals.length + supplements.length} tasks
            </p>
          </div>
          <BetterButton variant="primary" size="sm">
            Save Plan
          </BetterButton>
        </div>
      </div>
    </div>
  );
}
