import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <ThemedView style={styles.inner}>
        <ThemedText type="title" style={styles.title}>
          Settings
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          App preferences, notifications, and account options (UI-only)
        </ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 18 },
  title: { marginBottom: 8 },
  subtitle: { color: "#6b7280" },
});
