import React from 'react';
import { View, Text } from 'react-native';

interface OracleCardProps {
  oracleText: string;
  luckyColor: string;
  luckyNumber: number;
}

export function OracleCard({ oracleText, luckyColor, luckyNumber }: OracleCardProps) {
  return (
    <View className="rounded-card bg-primary p-6">
      <Text className="font-body text-base leading-relaxed text-cream">{oracleText}</Text>
      <View className="mt-4 flex-row justify-between">
        <Text className="font-body text-sm text-cream/60">Color: {luckyColor}</Text>
        <Text className="font-body text-sm text-cream/60">Number: {luckyNumber}</Text>
      </View>
    </View>
  );
}
