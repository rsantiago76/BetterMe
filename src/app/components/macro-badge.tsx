import React from 'react';
import { cn } from './ui/utils';

interface MacroBadgeProps {
  type: 'protein' | 'carbs' | 'fats';
  amount: number;
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function MacroBadge({ type, amount, unit = 'g', size = 'md', className }: MacroBadgeProps) {
  const badgeConfig = {
    protein: {
      label: 'Protein',
      className: 'bg-primary/10 text-primary border-primary/30',
      icon: '💪',
    },
    carbs: {
      label: 'Carbs',
      className: 'bg-accent/10 text-accent border-accent/30',
      icon: '⚡',
    },
    fats: {
      label: 'Fats',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
      icon: '🥑',
    },
  };

  const sizeConfig = {
    sm: {
      icon: 'text-sm',
      label: 'text-[10px]',
      amount: 'text-sm',
    },
    md: {
      icon: 'text-lg',
      label: 'text-xs',
      amount: 'text-lg',
    },
    lg: {
      icon: 'text-xl',
      label: 'text-sm',
      amount: 'text-2xl',
    },
  };

  const config = badgeConfig[type];
  const sizes = sizeConfig[size];

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className={sizes.icon}>{config.icon}</span>
      <div className="flex flex-col">
        <span className={cn('text-muted-foreground font-semibold uppercase', sizes.label)}>
          {config.label}
        </span>
        <span className={cn('font-black text-foreground', sizes.amount)}>
          {amount}{unit}
        </span>
      </div>
    </div>
  );
}