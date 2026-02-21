import React from 'react';
import { cn } from './ui/utils';

interface ProgramBadgeProps {
  type: 'bulking' | 'cutting' | 'recovery';
  className?: string;
}

export function ProgramBadge({ type, className }: ProgramBadgeProps) {
  const badgeConfig = {
    bulking: {
      label: 'Bulking',
      className: 'bg-primary/10 text-primary border-primary/30',
      icon: '💪',
    },
    cutting: {
      label: 'Cutting',
      className: 'bg-accent/10 text-accent border-accent/30',
      icon: '🔥',
    },
    recovery: {
      label: 'Recovery',
      className: 'bg-secondary/10 text-secondary border-secondary/30',
      icon: '🧘',
    },
  };

  const config = badgeConfig[type];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm font-semibold',
        config.className,
        className
      )}
    >
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
