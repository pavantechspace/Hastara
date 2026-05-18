import { ScrollView, View, Text } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-12">
        <Text className="font-display text-3xl text-primary">Hastara</Text>
        <Text className="mt-2 font-body text-base text-muted">
          Scan your palm to reveal your story
        </Text>
      </View>
    </ScrollView>
  );
}
