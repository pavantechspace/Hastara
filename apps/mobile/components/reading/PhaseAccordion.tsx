import React from 'react';
import { View, Text } from 'react-native';

interface PhaseAccordionProps {
  title: string;
  content: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function PhaseAccordion({
  title,
  content,
  isExpanded,
  onToggle: _onToggle,
}: PhaseAccordionProps) {
  return (
    <View className="border-b border-border py-4">
      <Text className="font-display text-lg text-primary">{title}</Text>
      {isExpanded && <Text className="mt-2 font-body text-base text-charcoal">{content}</Text>}
    </View>
  );
}
