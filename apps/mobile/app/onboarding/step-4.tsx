import { View, Text } from 'react-native';

export default function OnboardingStep4() {
  return (
    <View className="flex-1 bg-background px-5 pt-12">
      <Text className="font-display text-2xl text-primary">Your first scan</Text>
      <Text className="mt-2 font-body text-base text-muted">
        Hold your palm steady under good lighting — we will guide you through
      </Text>
    </View>
  );
}
