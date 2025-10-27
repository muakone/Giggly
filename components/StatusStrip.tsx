import { useAppStore } from "@/store/useAppStore";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../constants/theme";

type Status = { id: string; name: string };

const MOCK: Status[] = [
  { id: "s1", name: "Ada" },
  { id: "s2", name: "Jon" },
  { id: "s3", name: "Maya" },
  { id: "s4", name: "Tunde" },
  { id: "s5", name: "Zain" },
  { id: "s6", name: "Lola" },
];

function Avatar({ name, index }: { name: string; index: number }) {
  const progress = useSharedValue(0);

  useEffect(() => {
    const t = setTimeout(
      () => {
        progress.value = withTiming(1, {
          duration: 420,
          easing: Easing.out(Easing.cubic),
        });
      },
      Math.min(600, index * 80)
    );
    return () => clearTimeout(t);
  }, [index, progress]);

  const aStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [
      { translateY: (1 - progress.value) * 8 },
      { scale: 0.95 + progress.value * 0.05 },
    ],
  }));

  // Offline-friendly initials avatar (no external network calls)
  const initial = (name || "U").slice(0, 1).toUpperCase();
  const bg = index % 2 === 0 ? "#dbeafe" : "#fde68a";

  return (
    <Animated.View style={[localStyles.avatarOuter, aStyle]}>
      <TouchableOpacity
        activeOpacity={0.85}
        style={[localStyles.avatarCircle, { backgroundColor: bg }]}
      >
        <Text style={localStyles.avatarLetter}>{initial}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function StatusStrip() {
  const router = useRouter();
  const notifications = useAppStore((s: any) => s.notifications || []);
  const transactions = useAppStore((s: any) => s.transactions || []);

  const unreadCount = notifications.filter((n: any) => !n.read).length;
  const pendingSum = transactions
    .filter((t: any) => t.status === "pending")
    .reduce((s: number, t: any) => s + (t.amount || 0), 0);
  return (
    <SafeAreaView
      style={{
        backgroundColor: Colors.light.tint,
        borderBottomLeftRadius: 18,
        borderBottomRightRadius: 18,
      }}
    >
      <View
        style={{ paddingHorizontal: 18, paddingTop: 18, paddingBottom: 18 }}
      >
        <View style={localStyles.headerRow}>
          <View>
            <Text style={localStyles.greeting}>Good afternoon</Text>
            <Text style={localStyles.hint}>Find quick gigs nearby</Text>
          </View>
          <View style={localStyles.iconRow}>
            <TouchableOpacity
              onPress={() => router.push("/inbox")}
              style={localStyles.iconBtn}
            >
              <Ionicons name="mail" size={20} color="#fff" />
              {unreadCount > 0 ? (
                <View style={localStyles.badge}>
                  <Text style={localStyles.badgeText}>{unreadCount}</Text>
                </View>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/wallet")}
              style={localStyles.iconBtn}
            >
              <Ionicons name="wallet" size={20} color="#fff" />
              {pendingSum > 0 ? (
                <View style={localStyles.badgeSmall}>
                  <Text style={localStyles.badgeTextSmall}>
                    ₦{pendingSum.toLocaleString()}
                  </Text>
                </View>
              ) : null}
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/notifications")}
              style={localStyles.iconBtn}
            >
              <Ionicons name="notifications" size={20} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.push("/profile")}
              style={localStyles.iconBtn}
            >
              <Ionicons name="person" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ height: 12 }} />

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={MOCK}
          keyExtractor={(i) => i.id}
          renderItem={({ item, index }) => (
            <View style={{ alignItems: "center", marginRight: 14 }}>
              <Avatar name={item.name} index={index} />
              <Text style={{ marginTop: 8, fontSize: 12, color: "#ffffffcc" }}>
                {item.name}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  avatarOuter: {
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  avatarLetter: { fontSize: 18, fontWeight: "800", color: "#0f172a" },
  searchRow: { flexDirection: "row", alignItems: "center" },
  searchBox: {
    flex: 1,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  searchText: { color: "#94a3b8" },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { color: "#fff", fontSize: 16, fontWeight: "800" },
  hint: { color: "#ffffffcc", fontSize: 12 },
  filterBox: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderRadius: 10,
  },
  // subtle bottom curve shadow
  containerCurve: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: -8,
    height: 24,
    backgroundColor: Colors.light.tint,
  },
  iconRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -6,
    minWidth: 20,
    paddingHorizontal: 6,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#ff4757",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: { color: "#fff", fontSize: 11, fontWeight: "800" },
  badgeSmall: {
    position: "absolute",
    top: -6,
    right: -8,
    paddingHorizontal: 6,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeTextSmall: { color: "#fff", fontSize: 10, fontWeight: "700" },
});
