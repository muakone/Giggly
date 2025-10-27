import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_TX = [
  { id: "t1", label: "Gig: Flyer sharing", amount: 35000, date: "Today" },
  { id: "t2", label: "Gig: Dog sitter", amount: 5000, date: "Yesterday" },
  { id: "t3", label: "Gig: Data entry", amount: 2000, date: "2d ago" },
];

export default function Wallet() {
  const balance = MOCK_TX.reduce((s, t) => s + t.amount, 0);

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top"]}>
      <ThemedView style={{ flex: 1, padding: 16 }}>
        <View style={styles.topRow}>
          <ThemedText type="title">Wallet</ThemedText>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.smallBtn}
              onPress={() => alert("Top up (UI-only)")}
            >
              <Text style={styles.smallBtnText}>Top up</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.smallBtn, { marginLeft: 8 }]}
              onPress={() => alert("Withdraw (UI-only)")}
            >
              <Text style={styles.smallBtnText}>Withdraw</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardHighlight}>
          <Text style={styles.balance}>₦{balance.toLocaleString()}</Text>
          <Text style={styles.note}>Available balance</Text>
        </View>

        <ThemedText type="defaultSemiBold" style={{ marginTop: 18 }}>
          Recent activity
        </ThemedText>
        <FlatList
          data={MOCK_TX}
          keyExtractor={(i) => i.id}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <View style={styles.txRow}>
              <View>
                <Text style={styles.txLabel}>{item.label}</Text>
                <Text style={styles.txDate}>{item.date}</Text>
              </View>
              <Text style={styles.txAmount}>
                ₦{item.amount.toLocaleString()}
              </Text>
            </View>
          )}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  cardHighlight: {
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  balance: { fontSize: 28, fontWeight: "800", color: "#0f172a" },
  note: { marginTop: 8, color: "#64748b" },
  txRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#f1f5f9",
  },
  txLabel: { fontWeight: "700" },
  txDate: { color: "#64748b", marginTop: 4 },
  txAmount: { fontWeight: "800" },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
  },
  smallBtnText: { color: "#0a7ea4", fontWeight: "700" },
});
