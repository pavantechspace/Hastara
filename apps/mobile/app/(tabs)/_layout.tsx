import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#B8935A',
        tabBarInactiveTintColor: '#666666',
        tabBarStyle: {
          backgroundColor: '#F8F5EE',
          borderTopColor: '#D4C9B0',
        },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="daily" options={{ title: 'Daily' }} />
      <Tabs.Screen name="history" options={{ title: 'History' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="premium" options={{ title: 'Premium' }} />
    </Tabs>
  );
}
