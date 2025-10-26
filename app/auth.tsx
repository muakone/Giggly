import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/useUserStore";

// UI-only Auth screen: do not call any network or integrations.
export default function AuthScreen() {
  const [phone, setPhone] = useState("");
  const router = useRouter();
  const setUser = useUserStore((s: any) => s.setUser);

  const sendOtp = () => {
    if (!phone || phone.length < 6) {
      Alert.alert("Invalid", "Please enter a valid phone number");
      return;
    }

    // Create a mock user locally (UI-only) and navigate to feed.
    const mockUser = {
      id: String(Date.now()),
      phone,
      name: phone.replace(/[^0-9]/g, "").slice(-6),
    };
    setUser(mockUser);
    router.replace("/");
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 12 }}>Welcome to Giggle</Text>
      <Text style={{ marginBottom: 8 }}>
        Enter phone number to continue (UI-only)
      </Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        placeholder="+234 801 234 5678"
        keyboardType="phone-pad"
        style={{
          borderWidth: 1,
          borderColor: "#eee",
          padding: 12,
          borderRadius: 8,
          marginBottom: 12,
        }}
      />

      <TouchableOpacity
        onPress={sendOtp}
        style={{ backgroundColor: "#F59E0B", padding: 12, borderRadius: 8 }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "600" }}
        >
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
