import { View, Text } from 'react-native';

export default function OnboardingStep1() {
  return (
    <View className="flex-1 items-center justify-center bg-primary px-8">
      <Text className="font-display text-4xl text-cream">Welcome to Hastara</Text>
      <Text className="mt-4 text-center font-body text-base text-cream/80">
        Discover yourself through the ancient wisdom of palmistry, numerology, and astrology
      </Text>
    </View>
  );
}
