---
description: Scaffold an Expo Router screen following CLAUDE.md §10 exactly
argument-hint: <route-path>
---

Create a new mobile screen at `apps/mobile/app/$1.tsx`. The route path uses
expo-router conventions — e.g. `(tabs)/example`, `reading/[id]`, `onboarding/step-6`.

Hard rules (CLAUDE.md §10):
1. Default export a single React component named after the screen, in PascalCase (e.g. `ExampleScreen`).
2. Render three states explicitly: loading (ActivityIndicator on `bg-background`), error (`ErrorBanner` with `onRetry`), main.
3. Read user from `useAuthStore`, never from Clerk directly.
4. Read gating from `useSubscriptionStore.canAccessFeature` — never inline tier checks.
5. Use NativeWind `className`. No `StyleSheet.create`.
6. Header config via `<Stack.Screen options={{ ... }} />`.
7. Data via `useQuery(api.<router>.<proc>.queryOptions(...))`.

Reference template (mirror this exactly):

```tsx
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/trpc';
import { useAuthStore } from '@/store/auth.store';
import { useSubscriptionStore } from '@/store/subscription.store';
import { ErrorBanner } from '@/components/ui/ErrorBanner';

export default function ExampleScreen() {
  const user = useAuthStore(s => s.user);
  const canAccess = useSubscriptionStore(s => s.canAccessFeature);
  const { data, isLoading, isError, error, refetch } = useQuery(
    api.example.list.queryOptions({ limit: 20 })
  );

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#B8935A" />
      </View>
    );
  }
  if (isError) return <ErrorBanner message={error.message} onRetry={refetch} />;

  return (
    <>
      <Stack.Screen options={{ title: 'Example', headerShown: false }} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-12">{/* content */}</View>
      </ScrollView>
    </>
  );
}
```

Adapt the data hook and content to the screen's actual purpose. Ask the user one question if the purpose is unclear: which tRPC procedure does this screen consume? Do not invent procedures that don't exist.
