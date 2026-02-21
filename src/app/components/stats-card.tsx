import React from 'react';
import { cn } from './ui/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export function StatsCard({
  icon: Icon,
  label,
  value,
  change,
  changeType = 'neutral',
  className,
}: StatsCardProps) {
  const changeStyles = {
    positive: 'text-primary',
    negative: 'text-destructive',
    neutral: 'text-muted-foreground',
  };

  return (
    <div
      className={cn(
        'bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-200',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            {label}
          </p>
          <p className="text-3xl font-black text-foreground">{value}</p>
          {change && (
            <p className={cn('text-sm font-semibold mt-2', changeStyles[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </div>
  );
}
