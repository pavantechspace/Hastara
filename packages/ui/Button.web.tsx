import React from 'react';
import { cn } from './utils';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function Button({ children, onClick, variant = 'primary', className }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-card px-6 py-3 font-body transition-colors',
        variant === 'primary' && 'bg-primary text-cream hover:bg-primary/90',
        variant === 'secondary' && 'border border-gold bg-surface text-charcoal hover:bg-cream',
        variant === 'ghost' && 'bg-transparent text-charcoal hover:bg-cream',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
