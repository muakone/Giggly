import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          App preferences, notifications, and account options (UI-only)
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  inner: { padding: 18 },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 8 },
  subtitle: { color: "#6b7280" },
});
