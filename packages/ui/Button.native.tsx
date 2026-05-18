import React from 'react';
import { Pressable, Text } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  className?: string;
}

export function Button({ children, onPress, variant = 'primary', className }: ButtonProps) {
  const baseClass = 'items-center justify-center rounded-card px-6 py-3';
  const variantClass =
    variant === 'primary'
      ? 'bg-primary'
      : variant === 'secondary'
        ? 'border border-gold bg-surface'
        : 'bg-transparent';

  return (
    <Pressable className={`${baseClass} ${variantClass} ${className ?? ''}`} onPress={onPress}>
      <Text className={variant === 'primary' ? 'font-body text-cream' : 'font-body text-charcoal'}>
        {children}
      </Text>
    </Pressable>
  );
}
