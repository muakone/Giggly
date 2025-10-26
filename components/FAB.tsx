import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/theme";

export default function FAB() {
  return (
    <View style={styles.container} pointerEvents="box-none">
      <Link href="/post">
        <Link.Trigger>
          <TouchableOpacity
            activeOpacity={0.85}
            style={[styles.button, { backgroundColor: Colors.light.tint }]}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </Link.Trigger>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { position: "absolute", right: 18, bottom: 28, zIndex: 50 },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
  },
  plus: { color: "#fff", fontWeight: "900", fontSize: 28 },
});
