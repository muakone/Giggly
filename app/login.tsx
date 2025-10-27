import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import { useUserStore } from "../store/useUserStore";

export default function LoginScreen() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const setUser = useUserStore((s: any) => s.setUser);

  async function submit() {
    if (!identifier || !password)
      return Alert.alert("Missing", "Please enter phone/email and password");

    if (isSignup) {
      // For sign up we accept either email or phone as the identifier.
      try {
        const payload: any = { password };
        if (identifier.includes("@")) payload.email = identifier;
        else payload.phone = identifier;

        const { data, error } = await supabase.auth.signUp(payload);
        if (error)
          return Alert.alert("Sign up failed", error.message || String(error));

        // on success, set a minimal user in local store and navigate home
        setUser({
          id: data?.user?.id ?? String(Date.now()),
          name: name || data?.user?.user_metadata?.name,
          phone: payload.phone ?? undefined,
          email: payload.email ?? undefined,
        });
        router.replace("/");
      } catch (err: any) {
        Alert.alert("Sign up error", err?.message ?? String(err));
      }
    } else {
      try {
        // sign in with password using email or phone
        const authPayload: any = { password };
        if (identifier.includes("@")) authPayload.email = identifier;
        else authPayload.phone = identifier;

        const { data, error } =
          await supabase.auth.signInWithPassword(authPayload);
        if (error)
          return Alert.alert("Sign in failed", error.message || String(error));

        setUser({
          id: data?.user?.id ?? String(Date.now()),
          name: data?.user?.user_metadata?.name ?? undefined,
          phone: data?.user?.phone ?? undefined,
          email: data?.user?.email ?? undefined,
        });
        router.replace("/");
      } catch (err: any) {
        Alert.alert("Sign in error", err?.message ?? String(err));
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          {isSignup ? "Create an account" : "Welcome back"}
        </Text>

        {isSignup && (
          <>
            <Text style={styles.label}>Full name</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              style={styles.input}
              placeholder="Your name"
            />
          </>
        )}

        <Text style={styles.label}>
          {isSignup ? "Phone or email" : "Phone or email"}
        </Text>
        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          style={styles.input}
          placeholder="you@domain.com or +1 555 555 5555"
          keyboardType="default"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
        />

        <TouchableOpacity style={styles.primary} onPress={submit}>
          <Text style={{ color: "white", fontWeight: "700" }}>
            {isSignup ? "Sign up" : "Sign in"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.switch}
          onPress={() => setIsSignup((s) => !s)}
        >
          <Text style={{ color: "#0ea5a4" }}>
            {isSignup
              ? "Have an account? Sign in"
              : "New here? Create an account"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "800", marginBottom: 18 },
  label: { fontWeight: "700", marginTop: 8 },
  input: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  primary: {
    backgroundColor: "#0ea5a4",
    padding: 14,
    borderRadius: 10,
    marginTop: 18,
    alignItems: "center",
  },
  switch: { marginTop: 12, alignItems: "center" },
});
