import React from 'react';
import { cn } from './ui/utils';
import { Clock, AlertCircle } from 'lucide-react';

export interface Supplement {
  id: string;
  name: string;
  category: 'multivitamin' | 'performance' | 'recovery' | 'protein';
  icon: string;
  whatItDoes: string;
  benefits: string[];
  bestTime: ('Morning' | 'Pre-workout' | 'Post-workout' | 'Before bed')[];
  withFood: 'With food' | 'Empty stomach' | 'Either';
  dosageRange: string;
  warnings: string[];
  timingReason: string;
  stacksWith: string[];
}

interface SupplementCardProps {
  supplement: Supplement;
  onClick: () => void;
}

export function SupplementCard({ supplement, onClick }: SupplementCardProps) {
  const categoryConfig = {
    multivitamin: {
      label: 'Essential',
      className: 'bg-primary/10 text-primary border-primary/30',
    },
    performance: {
      label: 'Performance',
      className: 'bg-accent/10 text-accent border-accent/30',
    },
    recovery: {
      label: 'Recovery',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
    },
    protein: {
      label: 'Protein',
      className: 'bg-primary/10 text-primary border-primary/30',
    },
  };

  const foodStatusConfig = {
    'With food': { icon: '🍽️', className: 'bg-accent/10 text-accent border-accent/30' },
    'Empty stomach': { icon: '⏰', className: 'bg-secondary/10 text-secondary border-secondary/30' },
    'Either': { icon: '✓', className: 'bg-primary/10 text-primary border-primary/30' },
  };

  const config = categoryConfig[supplement.category];
  const foodConfig = foodStatusConfig[supplement.withFood];

  return (
    <div
      onClick={onClick}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 flex-1">
          <span className="text-4xl">{supplement.icon}</span>
          <div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
              {supplement.name}
            </h3>
            <span
              className={cn(
                'inline-block px-2 py-1 rounded-full border text-xs font-semibold',
                config.className
              )}
            >
              {config.label}
            </span>
          </div>
        </div>
      </div>

      {/* What It Does */}
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {supplement.whatItDoes}
      </p>

      {/* Best Time */}
      <div className="mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2 mb-2">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-muted-foreground uppercase">
            Best Time
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {supplement.bestTime.map((time) => (
            <span
              key={time}
              className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
            >
              {time}
            </span>
          ))}
        </div>
      </div>

      {/* With Food */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <span className="text-lg">{foodConfig.icon}</span>
          <span className="text-sm font-semibold text-foreground">
            {supplement.withFood}
          </span>
        </div>
      </div>

      {/* Dosage */}
      <div className="bg-muted/50 rounded-lg p-3 mb-4">
        <div className="text-xs text-muted-foreground font-semibold uppercase mb-1">
          Recommended Dosage
        </div>
        <div className="text-sm font-bold text-foreground">
          {supplement.dosageRange}
        </div>
      </div>

      {/* Warning Indicator */}
      {supplement.warnings.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
          <AlertCircle className="w-4 h-4" />
          <span>Contains important warnings</span>
        </div>
      )}

      <button className="text-primary font-semibold text-sm hover:underline">
        View Full Details →
      </button>
    </div>
  );
}
