import React from 'react';
import { cn } from './ui/utils';
import { Check, Clock } from 'lucide-react';

interface TimeBlockProps {
  time: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isCompleted?: boolean;
  onToggle?: () => void;
  color?: 'primary' | 'accent' | 'secondary';
  isActive?: boolean;
}

export function TimeBlock({
  time,
  title,
  description,
  icon,
  isCompleted = false,
  onToggle,
  color = 'primary',
}: TimeBlockProps) {
  const colorConfig = {
    primary: {
      bg: 'bg-primary/5',
      border: 'border-primary/20',
      text: 'text-primary',
      checkBg: 'bg-primary',
    },
    accent: {
      bg: 'bg-accent/5',
      border: 'border-accent/20',
      text: 'text-accent',
      checkBg: 'bg-accent',
    },
    secondary: {
      bg: 'bg-secondary/5',
      border: 'border-secondary/20',
      text: 'text-secondary',
      checkBg: 'bg-secondary',
    },
  };

  const config = colorConfig[color];

  return (
    <div
      onClick={onToggle}
      className={cn(
        'rounded-xl p-4 border transition-all duration-200',
        config.bg,
        config.border,
        isCompleted ? 'opacity-60' : '',
        onToggle ? 'cursor-pointer hover:scale-[1.02] hover:shadow-md' : ''
      )}
    >
      <div className="flex items-start gap-4">
        {/* Time */}
        <div className="flex flex-col items-center justify-center flex-shrink-0">
          <Clock className={cn('w-4 h-4 mb-1', config.text)} />
          <span className={cn('text-xs font-bold', config.text)}>{time}</span>
        </div>

        {/* Icon */}
        <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0', config.bg, 'border', config.border)}>
          {icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className={cn('font-bold text-foreground mb-1', isCompleted && 'line-through')}>
            {title}
          </h4>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        {/* Checkbox */}
        {onToggle && (
          <button
            className={cn(
              'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 flex-shrink-0',
              isCompleted ? cn(config.checkBg, 'border-transparent') : 'border-border hover:border-primary'
            )}
          >
            {isCompleted && <Check className="w-4 h-4 text-white" />}
          </button>
        )}
      </div>
    </div>
  );
}
