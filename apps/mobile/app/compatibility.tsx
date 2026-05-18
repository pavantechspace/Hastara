import { ScrollView, View, Text } from 'react-native';

export default function CompatibilityScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-12">
        <Text className="font-display text-2xl text-primary">Compatibility</Text>
        <Text className="mt-2 font-body text-base text-muted">
          Scan two palms to discover your compatibility
        </Text>
      </View>
    </ScrollView>
  );
}
