import React from 'react';
import { cn } from './utils';

interface TextProps {
  children: React.ReactNode;
  variant?: 'display' | 'body' | 'caption';
  className?: string;
}

export function HastaraText({ children, variant = 'body', className }: TextProps) {
  return (
    <span
      className={cn(
        variant === 'display' && 'font-display text-2xl text-charcoal',
        variant === 'body' && 'font-body text-base text-charcoal',
        variant === 'caption' && 'font-body text-sm text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}
