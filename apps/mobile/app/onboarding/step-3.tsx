import { View, Text } from 'react-native';

export default function OnboardingStep3() {
  return (
    <View className="flex-1 bg-background px-5 pt-12">
      <Text className="font-display text-2xl text-primary">Dominant hand</Text>
      <Text className="mt-2 font-body text-base text-muted">
        Your dominant hand reveals your active path; your non-dominant hand shows your potential
      </Text>
    </View>
  );
}
