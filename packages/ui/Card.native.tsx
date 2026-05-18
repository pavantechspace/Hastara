import React from 'react';
import { View } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <View className={`rounded-card border border-border bg-surface p-4 ${className ?? ''}`}>
      {children}
    </View>
  );
}
