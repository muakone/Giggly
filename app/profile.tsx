import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/useUserStore";

export default function Profile() {
  const user = useUserStore((s: any) => s.user);
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <ThemedText type="title">{user?.name ?? "Guest"}</ThemedText>
            <Text style={styles.phone}>{user?.phone ?? "Not signed in"}</Text>
          </View>
        </View>

        <View style={{ marginTop: 20 }}>
          <ThemedText type="defaultSemiBold">Account</ThemedText>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/wallet")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Wallet</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => alert("Settings coming soon")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginTop: 24 }}>
          <ThemedText type="defaultSemiBold">Wallet</ThemedText>
          <Text style={{ color: "#6b7280", marginTop: 8 }}>
            Balance: ₦0 (UI-only)
          </Text>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", alignItems: "center" },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#e0f2fe",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarLetter: { fontSize: 28, fontWeight: "800" },
  name: { fontSize: 18, fontWeight: "800" },
  phone: { color: "#6b7280" },
  linkRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eef2f7",
  },
  linkText: { fontSize: 16, fontWeight: "700" },
});
