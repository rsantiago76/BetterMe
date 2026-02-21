import React from 'react';
import { cn } from './ui/utils';

interface BetterCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated';
}

export function BetterCard({ children, className, variant = 'default' }: BetterCardProps) {
  const variantStyles = {
    default: 'border border-border shadow-sm',
    elevated: 'shadow-lg',
  };

  return (
    <div
      className={cn(
        'bg-card rounded-xl p-6 transition-all duration-200',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}

interface BetterCardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function BetterCardHeader({ children, className }: BetterCardHeaderProps) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

interface BetterCardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function BetterCardTitle({ children, className }: BetterCardTitleProps) {
  return <h3 className={cn('font-bold text-xl text-card-foreground', className)}>{children}</h3>;
}

interface BetterCardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function BetterCardDescription({ children, className }: BetterCardDescriptionProps) {
  return <p className={cn('text-muted-foreground text-sm mt-1', className)}>{children}</p>;
}

interface BetterCardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function BetterCardContent({ children, className }: BetterCardContentProps) {
  return <div className={cn(className)}>{children}</div>;
}
