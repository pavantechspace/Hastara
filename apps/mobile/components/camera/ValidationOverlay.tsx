import React from 'react';
import { View, Text } from 'react-native';

interface ValidationOverlayProps {
  isValid: boolean;
  message: string;
}

export function ValidationOverlay({ isValid, message }: ValidationOverlayProps) {
  return (
    <View className="absolute bottom-8 left-0 right-0 items-center">
      <View className={`rounded-card px-4 py-2 ${isValid ? 'bg-primary' : 'bg-charcoal/80'}`}>
        <Text className="font-body text-sm text-cream">{message}</Text>
      </View>
    </View>
  );
}
