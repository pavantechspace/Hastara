import React from 'react';
import { View, Text } from 'react-native';

interface PalmCameraProps {
  onCapture: (imageUri: string) => void;
}

export function PalmCamera({ onCapture: _onCapture }: PalmCameraProps) {
  return (
    <View className="flex-1 items-center justify-center bg-charcoal">
      <Text className="font-body text-base text-cream">Camera placeholder</Text>
    </View>
  );
}
