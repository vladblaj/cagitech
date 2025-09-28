---
title: "Native Tabs, Native Vibes: Stylish win on moving to Native Tabs on react
  native"
description: "How I swapped Expo Router’s tabs for Native Tabs in a React Native
  app: what changed, what broke (not much), and why it feels way more “at home”
  on iOS."
author: Vlad
date: 2025-09-28T22:22:00.000+03:00
tags:
  - react-native
  - expo
  - expo-router
  - navigation
  - mobile-ui
  - build-in-public
featured: false
---

# 🧭 Native Tabs, Native Vibes: Moving Expo Router Tabs to Native Tabs

I’ve been a user of `Tabs` from `expo-router`—they’re good, they’re fast, they’re… a little left behind.
Then I tried **Native Tabs** and suddenly my app felt like it stopped cosplaying as native and actually became native.

- Docs I followed: https://docs.expo.dev/router/advanced/native-tabs/
- Goal: keep my routes unchanged, upgrade the tab bar UX, stop wrestling with styling.

---

## The “Before” (JS Tabs)

Solid, themeable, predictable—but lots of styling knobs and a non-native feel:

```tsx
import { Tabs } from 'expo-router';
import { Chrome as Home, Clock, ChartBar as BarChart3, Settings } from 'lucide-react-native';
import { useUnistyles, StyleSheet } from 'react-native-unistyles';

const stylesDef = StyleSheet.create((theme) => ({
  tabBar: {
    backgroundColor: theme.colors.surface,
    borderTopColor: theme.colors.border,
    borderTopWidth: 1,
    paddingTop: 8,
    paddingBottom: 8,
    height: 70,
  },
  tabBarLabel: {
    fontSize: theme.typography.xs,
    fontWeight: '500',
    marginTop: 4,
  },
}));

export default function TabLayout() {
  const { theme } = useUnistyles();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: stylesDef.tabBar,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textMuted,
        tabBarLabelStyle: stylesDef.tabBarLabel,
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Today', tabBarIcon: ({ size, color }) => (<Home size={size} color={color} strokeWidth={2} />) }} />
      <Tabs.Screen name="history" options={{ title: 'History', tabBarIcon: ({ size, color }) => (<Clock size={size} color={color} strokeWidth={2} />) }} />
      <Tabs.Screen name="insights" options={{ title: 'Insights', tabBarIcon: ({ size, color }) => (<BarChart3 size={size} color={color} strokeWidth={2} />) }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ size, color }) => (<Settings size={size} color={color} strokeWidth={2} />) }} />
    </Tabs>
  );
}
```

---

## The “After” (Native Tabs)

Cleaner triggers, platform-true behavior, and snappier transitions:

```tsx
import { NativeTabs, Icon, Label } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Today</Label>
        <Icon sf="house.fill" drawable="custom_home_drawable" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <Icon sf="clock" drawable="custom_history_drawable" />
        <Label>History</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="insights">
        <Icon sf="chart.bar.fill" drawable="custom_insights_drawable" />
        <Label>Insights</Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
```

> iOS can use SF Symbols via `sf=""`; Android can use `drawable=""`. For custom icons, keep your assets in the platform projects or map them from your design system.

---

## See It In Motion

**Old tabs (JS):**  
<video src="/videos/native_tab_old.mov" controls playsinline width="480"></video>

**New tabs (Native):**  
<video src="/videos/native_tab_new.mov" controls playsinline width="480"></video>

### Why this looks cool (and feels right)

- **Native motion & haptics:** The tab switch uses platform animations and subtle haptics, so it *feels* like a first-party app instead of a skinned web view.
- **Material You on Android:** On Android 12+, the tab bar respects dynamic color, proper elevation shadows, and authentic ripples. It picks up the user’s wallpaper-derived palette, so it blends into the system like magic.
- **“Liquid glass” vibe:** You can give the tab bar a glassy, translucent look so content flows beneath it—think frosted glass with soft blur.

#### Quick “liquid glass” recipe

If you want that frosted effect, you can blur *behind* the bar.`Tabs` you can do:

```tsx
import { BlurView } from 'expo-blur';
import { Tabs } from 'expo-router';

<Tabs
  screenOptions={{
    headerShown: false,
    tabBarBackground: () => (
      <BlurView
        intensity={50}
        tint="light"              // "dark" also looks great with AMOLED
        style={{ flex: 1 }}
      />
    ),
    tabBarStyle: {
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,0.25)', // keeps the “liquid” translucency
      borderTopWidth: 0,
      elevation: 0,
      backdropFilter: 'blur(20px)' as any,       // iOS webview hint; harmless elsewhere
    },
  }}
>
  {/* ...your screens... */}
</Tabs>
```

With **Native Tabs**, deep theming hooks are still evolving, but you can get close:
- Use semi-transparent surfaces from your theme (e.g., `rgba(… ,0.25)`).
- Prefer system icons (SF Symbols on iOS, drawables on Android) for crisp, platform-true visuals.
- Let Android handle elevation instead of fake shadows; it renders more naturally with Material.

> TL;DR: Android gets dynamic color, real ripples, and proper elevation; iOS gets buttery transitions and crisp SF Symbols. Add a touch of translucency and you’ve got that sleek **liquid glass** finish without fighting CSS.

---

## Pros & Cons

**Why Native Tabs slapped (in a good way):**
- Real native feel + transitions out of the box
- Less styling boilerplate to mimic platform UI
- Triggers are simple to read/scan in code

**Trade-offs to keep in mind:**
- Still labeled `unstable` — expect API edges to change
- **Advanced styling leans on native patterns rather than CSS-like tweaks**
- Mixing custom vector icons with platform icons needs a tiny bit of setup

---

## Migration Notes That Saved Me Minutes

- Routes stay the same; you mostly swap the layout component.
- Keep your icon strategy consistent (SF Symbols on iOS, drawables on Android, or pick a cross-platform icon lib and wrap).
- If you theme with Unistyles or similar, you’ll likely touch far fewer styles.

---

## Verdict

If you want your app to *feel* native without spending a week on the tab bar: **use Native Tabs**.
My app now looks like it belongs on the phone, not like it snuck in through a webview wearing a mustache.

Happy shipping! 🚀
