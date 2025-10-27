import { Stack } from "expo-router";
import React from "react";

// Hide the default router header for gig detail routes and let the screen render
// its own custom header. This removes the black title bar that shows the file
// path (e.g. "gig/[id]").
export default function GigLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
