import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useInbox from "../../hooks/useInbox";

export default function Inbox() {
  const { messages, sendMessage } = useInbox();
  const [text, setText] = useState("");

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <ThemedView style={styles.inner}>
        <ThemedText type="title" style={styles.title}>
          Inbox
        </ThemedText>
        <ThemedText type="default" style={styles.subtitle}>
          Messages and applicant chats (UI-only)
        </ThemedText>

        <FlatList
          data={messages}
          keyExtractor={(m) => m.id}
          style={{ marginTop: 12 }}
          renderItem={({ item }) => (
            <View style={styles.msgRow}>
              <View style={styles.avatar}>
                <Text style={{ fontWeight: "800" }}>
                  {item.from.slice(0, 1)}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: "700" }}>
                  {item.from}{" "}
                  <Text style={{ color: "#6b7280", fontWeight: "400" }}>
                    {item.time}
                  </Text>
                </Text>
                <Text>{item.text}</Text>
              </View>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={setText}
            placeholder="Type a message"
            placeholderTextColor="#9ca3af"
          />
          <TouchableOpacity
            style={styles.send}
            onPress={() => {
              if (text.trim()) {
                sendMessage("You", text);
                setText("");
              }
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "700" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  inner: { padding: 18, flex: 1 },
  title: { marginBottom: 6 },
  subtitle: { color: "#6b7280" },
  msgRow: { flexDirection: "row", paddingVertical: 12, alignItems: "center" },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  composer: { flexDirection: "row", alignItems: "center", marginTop: 12 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  send: {
    backgroundColor: "#0ea5a4",
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
});
