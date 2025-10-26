import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_NOTIFS = [
  {
    id: "n1",
    text: 'Your claim for "Flyer sharing" is pending release',
    time: "2m",
  },
  { id: "n2", text: 'New gig near you: "Makeup artist needed"', time: "1h" },
  {
    id: "n3",
    text: "Tip: Verify your profile to get priority invites",
    time: "1d",
  },
];

export default function NotificationsScreen() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFS);

  function clearAll() {
    setNotifs([]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText type="title">Notifications</ThemedText>
          <TouchableOpacity onPress={clearAll}>
            <Text style={{ color: "#6b7280", fontWeight: "700" }}>Clear</Text>
          </TouchableOpacity>
        </View>

        {notifs.length === 0 ? (
          <View style={styles.empty}>
            <Text style={{ color: "#64748b" }}>
              You&apos;re all caught up — no notifications
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ marginTop: 12 }}
            data={notifs}
            keyExtractor={(i) => i.id}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <View style={styles.dot} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.text}>{item.text}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
              </View>
            )}
          />
        )}
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  empty: { marginTop: 24, alignItems: "center" },
  row: { flexDirection: "row", paddingVertical: 12, alignItems: "center" },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#0B8457",
    marginRight: 12,
  },
  text: { fontSize: 14 },
  time: { color: "#94a3b8", marginTop: 6 },
});
