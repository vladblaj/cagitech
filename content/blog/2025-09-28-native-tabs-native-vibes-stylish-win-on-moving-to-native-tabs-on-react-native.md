---
title: Stylish win on moving to Expo Router Native Tabs
description: How I swapped Expo Router’s tabs for Swift Native Tabs in React
author: Vlad
date: 2025-09-28T23:24:00.000+03:00
tags:
  - react-native
  - expo
  - expo-router
  - navigation
  - mobile-ui
  - build-in-public
featured: false
---

# 🧭 Native Tabs, Native Vibes: A quick win moving from Expo Router Tabs to Native Tabs

I’ve been using `Tabs` from `expo-router`they re good, they are fast but they’re… a little *outdated*.
Then I tried **Native Tabs** and suddenly my app felt like it stopped cosplaying as native and actually looks and file like a native iOS App.

- Docs I followed: [Expo Native Tabs docs](https://docs.expo.dev/router/advanced/native-tabs/)
- Goal: keep my routes unchanged, upgrade the tab bar UX, stop wrestling with styling.

---

## The “Before” (Expo Router Tabs)

Solid, themeable, predictable—but lots of styling properties and a non-native feel:

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
---

## See It In Motion

**Old tabs (Plain JS):**  
<video src="/videos/native_tab_old.mov" controls playsinline width="480"></video>

**New tabs (Native):**  
<video src="/videos/native_tab_new.mov" controls playsinline width="480"></video>

### Why this looks cool (and feels right)

- **Native motion & haptics:** The tab switch uses platform animations and subtle haptics, so it *feels* like a first-party app instead of a skinned web view.
- **Material You on Android:** On Android 12+, the tab bar respects dynamic color, proper elevation shadows, and authentic ripples. It picks up the user’s wallpaper-derived palette, so it blends into the system like magic.

### Under the hood: actually native (SwiftUI / Compose)

`NativeTabs` isn’t a JS facsimile. On iOS it bridges to **real SwiftUI/UITabBarController-powered tabs** (think `TabView` behavior), and on Android it hooks into **Material-native tab components** (Jetpack Compose/`TabRow` territory).  
Translation: navigation, focus, accessibility, haptics, and transitions are handled by the **OS itself**, not a JavaScript view pretending to be native.


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

## Migration Notes That Saved Me Precious time

- Routes stay the same; you mostly swap the layout component.
- Keep your icon strategy consistent (SF Symbols on iOS, drawables on Android, or pick a cross-platform icon lib and wrap).
- If you theme with Unistyles or similar, you’ll likely touch far fewer styles.

---

## Verdict

If you want your app to *feel* native (and actually use a native component) without spending a week on the tab bar: **use Native Tabs**.

Happy shipping! 🚀
