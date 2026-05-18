import React from 'react';
import { View, Text } from 'react-native';

interface ShareCardProps {
  luckScore: number;
  dominantTrait: string;
  mode: string;
}

export function ShareCard({ luckScore, dominantTrait, mode }: ShareCardProps) {
  return (
    <View className="rounded-card bg-primary p-6">
      <Text className="font-display text-2xl text-gold">{luckScore}</Text>
      <Text className="mt-1 font-body text-base text-cream">{dominantTrait}</Text>
      <Text className="mt-2 font-body text-sm text-cream/60">{mode} reading</Text>
    </View>
  );
}
