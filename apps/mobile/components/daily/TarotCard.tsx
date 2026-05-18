import React from 'react';
import { View, Text } from 'react-native';
import type { TarotCard as TarotCardType } from '@hastara/core/types';

interface TarotCardProps {
  card: TarotCardType;
}

export function TarotCardComponent({ card }: TarotCardProps) {
  return (
    <View className="items-center rounded-card border border-gold bg-surface p-6">
      <Text className="font-display text-xl text-primary">{card.name}</Text>
      <Text className="mt-1 font-body text-sm text-muted">
        {card.reversed ? 'Reversed' : 'Upright'} — {card.arcana} arcana
      </Text>
      <Text className="mt-4 font-body text-base text-charcoal">{card.interpretation}</Text>
    </View>
  );
}
