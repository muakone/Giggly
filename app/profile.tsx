import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/useUserStore";

export default function Profile() {
  const user = useUserStore((s: any) => s.user);
  const router = useRouter();

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <View
        style={[
          styles.headerWrap,
          { backgroundColor: Colors[colorScheme ?? "light"].tint },
        ]}
      >
        <SafeAreaView edges={["top"]} />
        <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <View style={styles.headerRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
            </Text>
          </View>
          <View style={{ marginLeft: 12, flex: 1 }}>
            <ThemedText type="title">{user?.name ?? "Guest"}</ThemedText>
            <Text style={styles.phone}>{user?.phone ?? "Not signed in"}</Text>
          </View>
          <TouchableOpacity
            onPress={() => alert("Edit profile (UI-only)")}
            style={styles.editBtn}
          >
            <Text style={{ color: "#0a7ea4", fontWeight: "700" }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: 22 }}>
          <ThemedText type="defaultSemiBold">Account</ThemedText>
          <View style={{ marginTop: 12 }}>
            <TouchableOpacity
              onPress={() => router.push("/wallet")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Wallet</Text>
              <Text style={styles.linkSub}>View balance & transactions</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Notifications</Text>
              <Text style={styles.linkSub}>Activity & alerts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => router.push("/settings")}
              style={styles.linkRow}
            >
              <Text style={styles.linkText}>Settings</Text>
              <Text style={styles.linkSub}>Preferences & account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", alignItems: "center" },
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
  editBtn: { paddingHorizontal: 12, paddingVertical: 8 },
  linkRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eef2f7",
  },
  linkText: { fontSize: 16, fontWeight: "700" },
  linkSub: { color: "#6b7280", marginTop: 6, fontSize: 13 },
  headerWrap: {
    // small top strip that matches the app's header tint
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  headerTitle: { color: "#fff", fontSize: 16, fontWeight: "800" },
});
