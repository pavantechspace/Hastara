import React from 'react';
import { View, Text } from 'react-native';
import type { MoonPhase } from '@hastara/core/types';

interface MoonPhaseWidgetProps {
  moonPhase: MoonPhase;
}

export function MoonPhaseWidget({ moonPhase }: MoonPhaseWidgetProps) {
  const phaseLabel = moonPhase.phase.replace(/_/g, ' ');

  return (
    <View className="rounded-card border border-border bg-surface p-4">
      <Text className="font-display text-lg capitalize text-primary">{phaseLabel}</Text>
      <Text className="mt-1 font-body text-sm text-muted">
        {Math.round(moonPhase.illumination * 100)}% illuminated
      </Text>
      <Text className="mt-2 font-body text-base text-charcoal">{moonPhase.guidance}</Text>
    </View>
  );
}
