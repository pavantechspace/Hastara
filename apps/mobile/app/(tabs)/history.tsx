import { ScrollView, View, Text } from 'react-native';

export default function HistoryScreen() {
  return (
    <ScrollView
      className="flex-1 bg-background"
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="px-5 pt-12">
        <Text className="font-display text-2xl text-primary">Reading History</Text>
      </View>
    </ScrollView>
  );
}
