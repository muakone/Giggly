import { Tabs } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const bg = Colors.light.background;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarInactiveTintColor: "#94a3b8",
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: true,
        // grounded bottom tab bar: anchored to bottom:0, white bg and only
        // top corners rounded so it visually rests on the device bottom.
        tabBarStyle: {
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 64 + (insets.bottom ?? 0),
          // round only the top corners
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          backgroundColor: bg,
          borderTopWidth: 1,
          borderTopColor: "rgba(10,126,164,0.06)",
          shadowColor: "#000",
          shadowOpacity: 0.04,
          shadowRadius: 6,
          elevation: 6,
          paddingBottom: insets.bottom ?? 12,
          alignItems: "center",
        },
        tabBarLabelStyle: { fontWeight: "700" },
        tabBarActiveBackgroundColor: "transparent",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="inbox"
        options={{
          title: "Inbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="mail" size={size ?? 20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: "Wallet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet" size={size ?? 20} color={color} />
          ),
        }}
      />
      {/* Post tab intentionally removed — Post screen is reachable from FAB or routes */}
    </Tabs>
  );
}
