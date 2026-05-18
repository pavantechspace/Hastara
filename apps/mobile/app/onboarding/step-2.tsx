import { View, Text } from 'react-native';

export default function OnboardingStep2() {
  return (
    <View className="flex-1 bg-background px-5 pt-12">
      <Text className="font-display text-2xl text-primary">Your birth details</Text>
      <Text className="mt-2 font-body text-base text-muted">
        We use your date and place of birth to calculate your numerology and astrology profiles
      </Text>
    </View>
  );
}
