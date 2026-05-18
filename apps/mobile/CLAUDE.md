# apps/mobile — React Native + Expo SDK 51

File-based routing via `expo-router`. Styling via NativeWind (Tailwind classes on RN components).

---

## Screen Template

Every screen follows this exact structure — no deviations:

```typescript
// apps/mobile/app/(tabs)/example.tsx
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

  // Loading state
  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color="#B8935A" />
      </View>
    );
  }

  // Error state
  if (isError) return <ErrorBanner message={error.message} onRetry={refetch} />;

  // Main render
  return (
    <>
      <Stack.Screen options={{ title: 'Example', headerShown: false }} />
      <ScrollView
        className="flex-1 bg-background"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-5 pt-12">
          {/* Content here */}
        </View>
      </ScrollView>
    </>
  );
}
```

---

## Zustand Store Access

Always read from Zustand — never directly from Clerk or RevenueCat in components:

```typescript
import { useAuthStore } from '@/store/auth.store';
import { useSubscriptionStore } from '@/store/subscription.store';
import { useReadingStore } from '@/store/reading.store';

const user       = useAuthStore(s => s.user);
const tier       = useSubscriptionStore(s => s.tier);

// Gate features via store helpers — never inline tier comparisons
const canScan     = useSubscriptionStore(s => s.canScan());
const canUseVoice = useSubscriptionStore(s => s.canAccessFeature('voice_reading'));
const canUseMode  = useSubscriptionStore(s => s.canAccessMode('spiritual'));

// Reading progress (streaming)
const isGenerating   = useReadingStore(s => s.isGenerating);
const streamingText  = useReadingStore(s => s.streamingText);
const progress       = useReadingStore(s => s.progress); // 0–100 for progress bar
```

---

## Design System Tokens (NativeWind)

```javascript
// packages/config/tailwind/index.js — token reference
colors: {
  primary:       '#0D3B2E',  // Forest green — primary brand
  gold:          '#B8935A',  // Warm gold — accents, CTAs
  cream:         '#F8F5EE',  // Cream — surface background
  charcoal:      '#1A1A1A',  // Near-black — body text
  background:    '#F8F5EE',
  surface:       '#FFFFFF',
  muted:         '#666666',
  border:        '#D4C9B0',
  'tier-mystic': '#B8935A',
  'tier-oracle': '#0D3B2E',
  'tier-sage':   '#7B5EA7',
},
fontFamily: {
  display: ['Cormorant Garamond', 'serif'],  // headings, reading titles
  body:    ['DM Sans', 'sans-serif'],        // body text
  mono:    ['JetBrains Mono', 'monospace'],  // scores, numbers
},
borderRadius: { card: '16px' },
```

```tsx
// ✅ Use Tailwind classes via className
<View className="bg-primary rounded-card p-4">
  <Text className="font-display text-2xl text-cream">Lyra</Text>
</View>

// ✅ Dynamic styles with cn()
import { cn } from '@hastara/ui/utils';
<View className={cn('rounded-card p-4', isPremium ? 'bg-gold' : 'bg-surface')} />

// ❌ Never use StyleSheet.create() — always use NativeWind
```

---

## Navigation Structure

```
app/
├── (tabs)/
│   ├── index.tsx          # Home — palm scan hub
│   ├── daily.tsx          # Daily oracle, tarot card, moon phase
│   ├── history.tsx        # Reading archive + analytics
│   ├── profile.tsx        # Stats, badges, settings
│   └── premium.tsx        # Paywall — free users only
├── reading/
│   └── [id].tsx           # Full reading result screen
├── advanced-analysis.tsx  # Infographic export — Oracle+ tier
├── compatibility.tsx      # Two-palm compatibility scan
├── onboarding/
│   ├── step-1.tsx         # Welcome
│   ├── step-2.tsx         # Birth data entry
│   ├── step-3.tsx         # Dominant hand selection
│   ├── step-4.tsx         # First palm scan
│   └── step-5.tsx         # Paywall introduction
└── auth/
    ├── sign-in.tsx
    └── sign-up.tsx
```

---

## Key Libraries & Usage

| Library | Version | Use |
|---------|---------|-----|
| `expo-camera` | ~15.0.x | Palm photo capture — wrapper in `lib/camera.ts` |
| `expo-image-manipulator` | ~12.0.x | Crop + resize before upload |
| `@shopify/react-native-skia` | 1.x | Palm contour overlay drawing |
| `lib/mediapipe.ts` | — | Hand landmark validation before upload (reject non-palm images) |
| `react-native-view-shot` | 4.x | Share card screenshot capture |
| `expo-av` | ~14.0.x | TTS audio playback for voice readings |
| `expo-notifications` | ~0.28.x | Push notifications — wrapper in `lib/notifications.ts` |
| `react-native-purchases` | 7.x | RevenueCat billing — wrapper in `lib/revenuecat.ts` |
| `react-native-reanimated` | 3.x | Animations (entry/exit, progress bars) |
| `victory-native` | 40.x | Line charts (luck score history) + radar charts (compatibility) |

---

## Component Sub-groups

```
components/
├── camera/
│   ├── PalmCamera.tsx          # Full-screen camera with palm guide overlay
│   └── ValidationOverlay.tsx   # Skia-drawn palm contour + quality feedback
├── reading/
│   ├── ReadingCard.tsx          # Card shown in history list
│   ├── PhaseAccordion.tsx       # Expandable reading phases
│   └── ShareCard.tsx            # Exportable share image (react-native-view-shot)
└── daily/
    ├── OracleCard.tsx           # Daily oracle text card
    ├── TarotCard.tsx            # Tarot card with flip animation
    └── MoonPhaseWidget.tsx      # Moon phase display + illumination arc
```
