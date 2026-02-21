import React from 'react';
import { cn } from './ui/utils';

interface BetterButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export function BetterButton({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  loading = false,
  disabled,
  ...props 
}: BetterButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-primary text-primary-foreground hover:bg-[#1ea952] active:scale-[0.98] shadow-sm hover:shadow-md',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-[#5a6270] active:scale-[0.98] shadow-sm hover:shadow-md',
    outline: 'border-2 border-foreground text-foreground hover:bg-foreground hover:text-background active:scale-[0.98]',
  };
  
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
      disabled={disabled || loading}
    >
      {loading ? (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.928l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}