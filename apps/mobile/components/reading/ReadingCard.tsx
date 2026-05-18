import React from 'react';
import { View, Text } from 'react-native';
import type { ReadingListItem } from '@hastara/core/types';

interface ReadingCardProps {
  reading: ReadingListItem;
  onPress: () => void;
}

export function ReadingCard({ reading, onPress: _onPress }: ReadingCardProps) {
  return (
    <View className="rounded-card border border-border bg-surface p-4">
      <Text className="font-body text-base text-charcoal">{reading.dominantTrait}</Text>
      <Text className="mt-1 font-body text-sm text-muted">
        Luck score: {reading.luckScore}
      </Text>
    </View>
  );
}
