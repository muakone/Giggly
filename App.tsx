import { ExpoRoot } from "expo-router";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

// UI-only app root: wrap the router with SafeAreaProvider so descendant screens
// can use SafeAreaView and useSafeAreaInsets. This ensures insets are applied
// consistently across Android/iOS and Expo Go.
export default function App(props: any) {
  return (
    <SafeAreaProvider>
      <ExpoRoot {...props} />
    </SafeAreaProvider>
  );
}
