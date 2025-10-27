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

type Msg = { id: string; from: string; text: string };

export default function ChatScreen() {
  const [text, setText] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: "1", from: "Alice", text: "Hi! Are you available for a quick task?" },
    { id: "2", from: "You", text: "Yes — what do you need?" },
  ]);

  function send() {
    if (!text.trim()) return;
    setMsgs((s) => [
      ...s,
      { id: String(Date.now()), from: "You", text: text.trim() },
    ]);
    setText("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, padding: 12 }}>
        <FlatList
          data={msgs}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View
              style={
                item.from === "You" ? styles.bubbleYou : styles.bubbleOther
              }
            >
              <Text style={{ fontWeight: "700" }}>{item.from}</Text>
              <Text>{item.text}</Text>
            </View>
          )}
        />

        <View style={styles.composer}>
          <TextInput
            value={text}
            onChangeText={setText}
            style={styles.input}
            placeholder="Write a message"
          />
          <TouchableOpacity onPress={send} style={styles.sendBtn}>
            <Text style={{ color: "white", fontWeight: "700" }}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bubbleYou: {
    alignSelf: "flex-end",
    backgroundColor: "#DCFCE7",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    maxWidth: "80%",
  },
  bubbleOther: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    padding: 10,
    borderRadius: 8,
    marginVertical: 6,
    maxWidth: "80%",
  },
  composer: { flexDirection: "row", alignItems: "center", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    borderRadius: 8,
  },
  sendBtn: {
    backgroundColor: "#2563EB",
    padding: 12,
    borderRadius: 8,
    marginLeft: 8,
  },
});
