import { useAppStore } from "@/store/useAppStore";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DebugScreen() {
  const gigs = useAppStore((s: any) => s.gigs);
  const transactions = useAppStore((s: any) => s.transactions);
  const notifications = useAppStore((s: any) => s.notifications);
  const addGig = useAppStore((s: any) => s.addGig);
  const claimGig = useAppStore((s: any) => s.claimGig);
  const releasePending = useAppStore((s: any) => s.releasePending);

  function postSample() {
    addGig({
      title: `Debug Gig ${Date.now() % 1000}`,
      payout: "₦1,500",
      location: "Debugville",
      tags: ["Debug"],
      description: "Created by debug runner",
    });
  }

  function claimFirst() {
    if (gigs.length === 0) return alert("No gigs to claim");
    claimGig(gigs[0].id);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={{ fontSize: 20, fontWeight: "800", marginBottom: 12 }}>
          Debug runner
        </Text>

        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity style={styles.btn} onPress={postSample}>
            <Text style={styles.btnText}>Post sample gig</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={claimFirst}>
            <Text style={styles.btnText}>Claim first gig</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btn} onPress={() => releasePending()}>
            <Text style={styles.btnText}>Release pending</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 18 }} />

        <Text style={{ fontWeight: "700", marginBottom: 6 }}>Gigs</Text>
        {gigs.map((g: any) => (
          <View key={g.id} style={styles.row}>
            <Text style={{ fontWeight: "700" }}>{g.title}</Text>
            <Text style={{ color: g.claimed ? "#94a3b8" : "#0f172a" }}>
              {g.claimed ? " (claimed)" : ""}
            </Text>
          </View>
        ))}

        <View style={{ height: 12 }} />

        <Text style={{ fontWeight: "700", marginBottom: 6 }}>Transactions</Text>
        {transactions.map((t: any) => (
          <View key={t.id} style={styles.row}>
            <Text>{t.label}</Text>
            <Text
              style={{ color: t.status === "pending" ? "#94a3b8" : "#0f172a" }}
            >
              {t.status}
            </Text>
          </View>
        ))}

        <View style={{ height: 12 }} />

        <Text style={{ fontWeight: "700", marginBottom: 6 }}>
          Notifications
        </Text>
        {notifications.map((n: any) => (
          <View key={n.id} style={styles.row}>
            <Text>{n.text}</Text>
            <Text style={{ color: "#94a3b8" }}>{n.time}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#0a7ea4",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  btnText: { color: "#fff", fontWeight: "700" },
  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
