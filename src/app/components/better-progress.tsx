import React from 'react';
import { cn } from './ui/utils';

interface BetterProgressProps {
  value: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  variant?: 'primary' | 'accent' | 'secondary';
  className?: string;
}

export function BetterProgress({
  value,
  max = 100,
  label,
  showPercentage = true,
  variant = 'primary',
  className,
}: BetterProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const variantStyles = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    secondary: 'bg-secondary',
  };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-semibold text-foreground">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-semibold text-muted-foreground">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-500 ease-out rounded-full',
            variantStyles[variant]
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
