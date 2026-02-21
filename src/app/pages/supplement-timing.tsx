import React, { useState } from 'react';
import { Logo } from '../components/logo';
import { BetterButton } from '../components/better-button';
import { ArrowLeft, Clock, Pill, AlertCircle, Check, Sun, Moon, Dumbbell, Coffee } from 'lucide-react';
import {
  calculateSupplementSchedule,
  groupSupplementsByTiming,
  formatTime12Hour,
  getRecommendedStack,
  SUPPLEMENTS,
  type UserSchedule,
  type SupplementId,
  type ScheduledSupplement,
} from '../../utils/supplement-timing';

export default function SupplementTimingPage() {
  const [schedule, setSchedule] = useState<UserSchedule>({
    wakeTime: '06:00',
    trainingTime: '17:00',
    bedTime: '22:00',
    selectedSupplements: [],
  });

  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduledSupplements, setScheduledSupplements] = useState<ScheduledSupplement[]>([]);

  const handleGenerateSchedule = () => {
    const scheduled = calculateSupplementSchedule(schedule);
    setScheduledSupplements(scheduled);
    setShowSchedule(true);
  };

  const handleReset = () => {
    setShowSchedule(false);
    setScheduledSupplements([]);
  };

  const toggleSupplement = (suppId: SupplementId) => {
    setSchedule(prev => ({
      ...prev,
      selectedSupplements: prev.selectedSupplements.includes(suppId)
        ? prev.selectedSupplements.filter(id => id !== suppId)
        : [...prev.selectedSupplements, suppId],
    }));
  };

  const loadRecommendedStack = (goal: 'muscle_building' | 'general_health' | 'performance') => {
    const recommended = getRecommendedStack(goal);
    setSchedule(prev => ({ ...prev, selectedSupplements: recommended }));
  };

  const updateTime = (field: 'wakeTime' | 'trainingTime' | 'bedTime', value: string) => {
    setSchedule(prev => ({ ...prev, [field]: value }));
  };

  const groupedSupplements = showSchedule 
    ? groupSupplementsByTiming(scheduledSupplements, schedule)
    : [];

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
      <section className="bg-gradient-to-br from-accent/5 via-transparent to-primary/5 border-b border-border">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full mb-4">
              <Pill className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wide">
                Supplement Timing Planner
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4">
              Optimize Your Stack Timing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get a personalized supplement schedule based on your daily routine, training time, 
              and sleep schedule for maximum effectiveness.
            </p>
          </div>
        </div>
      </section>

      {/* Setup Form */}
      {!showSchedule && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Time Settings */}
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-primary" />
                Your Daily Schedule
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Sun className="w-4 h-4 text-accent" />
                    Wake Time
                  </label>
                  <input
                    type="time"
                    value={schedule.wakeTime}
                    onChange={(e) => updateTime('wakeTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    When you typically wake up
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    Training Time
                  </label>
                  <input
                    type="time"
                    value={schedule.trainingTime}
                    onChange={(e) => updateTime('trainingTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Your typical workout start time
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Moon className="w-4 h-4 text-secondary" />
                    Bedtime
                  </label>
                  <input
                    type="time"
                    value={schedule.bedTime}
                    onChange={(e) => updateTime('bedTime', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-border bg-background text-foreground font-semibold focus:border-primary focus:outline-none"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    When you go to sleep
                  </p>
                </div>
              </div>

              {/* Time Preview */}
              <div className="mt-6 p-4 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-accent" />
                    <span className="text-muted-foreground">Wake:</span>
                    <span className="font-bold text-foreground">{formatTime12Hour(schedule.wakeTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Dumbbell className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">Train:</span>
                    <span className="font-bold text-foreground">{formatTime12Hour(schedule.trainingTime)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Moon className="w-4 h-4 text-secondary" />
                    <span className="text-muted-foreground">Sleep:</span>
                    <span className="font-bold text-foreground">{formatTime12Hour(schedule.bedTime)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stack Presets */}
            <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border border-primary/20 mb-8">
              <h3 className="text-lg font-bold text-foreground mb-4">Quick Stack Presets</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => loadRecommendedStack('muscle_building')}
                  className="px-6 py-4 bg-card rounded-lg border-2 border-border hover:border-primary transition-all text-left"
                >
                  <div className="font-bold text-foreground mb-1">💪 Muscle Building</div>
                  <div className="text-xs text-muted-foreground">
                    Multivitamin, D3, Omega-3, Creatine, Whey, Casein
                  </div>
                </button>
                <button
                  onClick={() => loadRecommendedStack('general_health')}
                  className="px-6 py-4 bg-card rounded-lg border-2 border-border hover:border-secondary transition-all text-left"
                >
                  <div className="font-bold text-foreground mb-1">🏥 General Health</div>
                  <div className="text-xs text-muted-foreground">
                    Multivitamin, D3, Omega-3, Magnesium
                  </div>
                </button>
                <button
                  onClick={() => loadRecommendedStack('performance')}
                  className="px-6 py-4 bg-card rounded-lg border-2 border-border hover:border-accent transition-all text-left"
                >
                  <div className="font-bold text-foreground mb-1">⚡ Performance</div>
                  <div className="text-xs text-muted-foreground">
                    Multivitamin, Creatine, Caffeine, Whey, Magnesium
                  </div>
                </button>
              </div>
            </div>

            {/* Supplement Selection */}
            <div className="bg-card rounded-xl p-8 border border-border mb-8">
              <h2 className="text-2xl font-black text-foreground mb-6 flex items-center gap-2">
                <Pill className="w-6 h-6 text-accent" />
                Select Your Supplements
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.values(SUPPLEMENTS).map(supplement => {
                  const isSelected = schedule.selectedSupplements.includes(supplement.id);
                  
                  return (
                    <button
                      key={supplement.id}
                      onClick={() => toggleSupplement(supplement.id)}
                      className={`px-6 py-4 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-border bg-background hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-foreground">{supplement.name}</span>
                            {isSelected && (
                              <Check className="w-4 h-4 text-primary" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {supplement.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {schedule.selectedSupplements.length === 0 && (
                <div className="mt-6 p-4 bg-accent/10 rounded-lg border border-accent/20 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground">
                    Select at least one supplement to generate your timing schedule, or choose a preset stack above.
                  </div>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <BetterButton
              variant="primary"
              onClick={handleGenerateSchedule}
              disabled={schedule.selectedSupplements.length === 0}
              className="w-full py-4 text-lg"
            >
              <Clock className="w-5 h-5" />
              Generate My Schedule
            </BetterButton>
          </div>
        </section>
      )}

      {/* Schedule Results */}
      {showSchedule && scheduledSupplements.length > 0 && (
        <section className="container mx-auto px-6 lg:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-black text-foreground mb-2">Your Daily Supplement Schedule</h2>
                <p className="text-muted-foreground">
                  {schedule.selectedSupplements.length} supplement{schedule.selectedSupplements.length !== 1 ? 's' : ''} optimally timed throughout your day
                </p>
              </div>
              <BetterButton variant="outline" onClick={handleReset}>
                Edit Schedule
              </BetterButton>
            </div>

            {/* Daily Overview */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-accent mb-1">
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Wake Time</span>
                </div>
                <div className="text-2xl font-black text-foreground">{formatTime12Hour(schedule.wakeTime)}</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Dumbbell className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Training</span>
                </div>
                <div className="text-2xl font-black text-foreground">{formatTime12Hour(schedule.trainingTime)}</div>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <div className="flex items-center gap-2 text-secondary mb-1">
                  <Moon className="w-4 h-4" />
                  <span className="text-xs font-semibold uppercase">Bedtime</span>
                </div>
                <div className="text-2xl font-black text-foreground">{formatTime12Hour(schedule.bedTime)}</div>
              </div>
            </div>

            {/* Timeline - Grouped by Time of Day */}
            <div className="space-y-8">
              {groupedSupplements.map((group, groupIndex) => (
                <div key={groupIndex}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-xl font-black text-foreground">{group.label}</div>
                    <div className="h-px flex-1 bg-border"></div>
                  </div>

                  <div className="space-y-4">
                    {group.supplements.map((item, index) => (
                      <div
                        key={index}
                        className="bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          {/* Time Badge */}
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-sm font-black text-white leading-tight">
                                  {formatTime12Hour(item.time).split(' ')[0]}
                                </div>
                                <div className="text-xs font-semibold text-white/80">
                                  {formatTime12Hour(item.time).split(' ')[1]}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Supplement Details */}
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-foreground">{item.supplement.name}</h3>
                                <p className="text-sm text-muted-foreground">{item.supplement.description}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                                item.withFood 
                                  ? 'bg-primary/10 text-primary' 
                                  : 'bg-secondary/10 text-secondary'
                              }`}>
                                {item.withFood ? '🍽️ With Food' : '⚡ Anytime'}
                              </div>
                            </div>

                            <div className="bg-background rounded-lg p-4 border border-border mb-3">
                              <p className="text-sm text-foreground">
                                <span className="font-semibold text-primary">💡 Timing Note: </span>
                                {item.notes}
                              </p>
                            </div>

                            {item.warning && (
                              <div className="bg-accent/10 rounded-lg p-4 border border-accent/20 flex items-start gap-3">
                                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-foreground">{item.warning}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Important Notes */}
            <div className="mt-12 bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-8 border border-accent/20">
              <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-accent" />
                Important Reminders
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-foreground mb-2">✅ Best Practices</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Take supplements consistently at the same times daily</li>
                    <li>• Stay hydrated throughout the day (3-4 liters)</li>
                    <li>• Don't take on empty stomach if marked "with food"</li>
                    <li>• Give caffeine at least 6 hours before bedtime</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-2">⚠️ Safety Notes</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• This is educational guidance, not medical advice</li>
                    <li>• Consult healthcare provider before starting new supplements</li>
                    <li>• Follow dosage instructions on product labels</li>
                    <li>• Monitor for any adverse reactions</li>
                  </ul>
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
                Supplement Guide
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
                Research Library
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
