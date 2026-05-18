import { View, Text } from 'react-native';

export default function OnboardingStep5() {
  return (
    <View className="flex-1 bg-background px-5 pt-12">
      <Text className="font-display text-2xl text-primary">Choose your path</Text>
      <Text className="mt-2 font-body text-base text-muted">
        Start free or unlock deeper insights with a premium plan
      </Text>
    </View>
  );
}
