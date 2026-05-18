---
description: Scaffold a shared UI component in packages/ui with .native.tsx and .web.tsx platform splits
argument-hint: <ComponentName>
---

Create a new shared UI component `$1` in `packages/ui/` with full platform splits.

## Files to create

### `packages/ui/$1.native.tsx`

React Native version using NativeWind `className`. No `StyleSheet.create`.

```tsx
import { View } from 'react-native';
import { cn } from './utils';

export interface $1Props {
  // define props here — no `any`, no inline object types
}

export function $1({ ...props }: $1Props) {
  return (
    <View className={cn('', '')}>
      {/* implementation */}
    </View>
  );
}
```

### `packages/ui/$1.web.tsx`

Web version using Tailwind `className`. Must accept identical props to the native version.

```tsx
import { cn } from './utils';

export interface $1Props {
  // identical to native — copy exactly
}

export function $1({ ...props }: $1Props) {
  return (
    <div className={cn('', '')}>
      {/* implementation */}
    </div>
  );
}
```

## After creating the files

Add exports to `packages/ui/index.ts`:
```ts
export { $1 } from './$1.native';  // or .web — use platform-aware export
export type { $1Props } from './$1.native';
```

## Hard rules

1. **PascalCase** for both filename and component name.
2. **Props interface named `$1Props`** — exported from both files.
3. **No `any`** anywhere in props or implementation.
4. **Mobile**: NativeWind `className` only — never `StyleSheet.create`.
5. **Web**: Tailwind `className` — never inline `style` objects.
6. **Identical prop surface** — both platform files must accept the same props.
7. **Design tokens** — use only tokens from `packages/config/tailwind/index.js`:
   - Colors: `primary` (#0D3B2E), `gold` (#B8935A), `cream` (#F8F5EE), `charcoal` (#1A1A1A), `background`, `surface`, `muted`, `border`
   - Tier: `tier-mystic`, `tier-oracle`, `tier-sage`
   - Fonts: `font-display` (Cormorant Garamond), `font-body` (DM Sans)
   - Radius: `rounded-card` (16px)
