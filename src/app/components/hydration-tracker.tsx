import React from 'react';
import { cn } from './ui/utils';
import { Droplet, Plus, Minus } from 'lucide-react';

interface HydrationTrackerProps {
  current: number;
  target: number;
  onIncrease: () => void;
  onDecrease: () => void;
}

export function HydrationTracker({ current, target, onIncrease, onDecrease }: HydrationTrackerProps) {
  const percentage = Math.min((current / target) * 100, 100);
  const isComplete = current >= target;

  return (
    <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            'w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300',
            isComplete ? 'bg-accent' : 'bg-accent/10'
          )}>
            <Droplet className={cn('w-6 h-6', isComplete ? 'text-white' : 'text-accent')} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Hydration</h3>
            <p className="text-sm text-muted-foreground">Stay hydrated for performance</p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-end justify-between mb-2">
          <span className="text-3xl font-black text-foreground">{current}L</span>
          <span className="text-sm text-muted-foreground font-semibold">/ {target}L target</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-500',
              isComplete ? 'bg-accent' : 'bg-gradient-to-r from-primary to-accent'
            )}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{Math.round(percentage)}% complete</span>
          {isComplete && (
            <span className="text-xs font-bold text-accent">✓ Goal reached!</span>
          )}
        </div>
      </div>

      {/* Water Glasses Visual */}
      <div className="flex items-center gap-2 mb-4 flex-wrap">
        {Array.from({ length: target * 4 }).map((_, index) => {
          const glassFilled = index < current * 4;
          return (
            <div
              key={index}
              className={cn(
                'w-8 h-10 rounded border-2 transition-all duration-300',
                glassFilled ? 'bg-accent/20 border-accent' : 'bg-muted border-border'
              )}
            />
          );
        })}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={onDecrease}
          disabled={current <= 0}
          className="flex-1 h-12 rounded-lg border border-border bg-card hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold text-foreground"
        >
          <Minus className="w-4 h-4" />
          Remove Glass
        </button>
        <button
          onClick={onIncrease}
          className="flex-1 h-12 rounded-lg bg-accent text-white hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 font-semibold"
        >
          <Plus className="w-4 h-4" />
          Add Glass
        </button>
      </div>

      <p className="text-xs text-muted-foreground mt-3 text-center">
        Each glass = 250ml (0.25L)
      </p>
    </div>
  );
}
