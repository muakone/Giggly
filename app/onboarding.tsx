import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserStore } from "../store/useUserStore";

const slides = [
  {
    title: "Find small gigs nearby",
    body: "Post or claim quick tasks and get paid — all in one place.",
    image:
      "https://images.unsplash.com/photo-1520975915448-24c8a7d2d0b8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Secure escrow-like flow",
    body: "When someone claims your gig, funds go to pending until release.",
    image:
      "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Simple messaging",
    body: "Chat with gig posters and coordinate details quickly.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function Onboarding() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const setSeen = useUserStore((s: any) => s.setSeenOnboarding);

  function next() {
    if (index < slides.length - 1) setIndex((i) => i + 1);
    else {
      // mark onboarding as seen then go to login
      setSeen(true);
      router.replace("/login");
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {slides[index].image ? (
          <Image
            source={{ uri: slides[index].image }}
            style={{
              width: 300,
              height: 180,
              borderRadius: 12,
              marginBottom: 18,
            }}
            resizeMode="cover"
          />
        ) : null}
        <Text style={styles.title}>{slides[index].title}</Text>
        <Text style={styles.body}>{slides[index].body}</Text>

        <View style={styles.controls}>
          <View style={styles.dots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[styles.dot, i === index && styles.dotActive]}
              />
            ))}
          </View>

          <TouchableOpacity style={styles.btn} onPress={next}>
            <Text style={styles.btnText}>
              {index < slides.length - 1 ? "Next" : "Get started"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  body: { fontSize: 16, color: "#444", textAlign: "center", maxWidth: 520 },
  controls: {
    position: "absolute",
    bottom: 40,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  dots: { flexDirection: "row", marginBottom: 12 },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 6,
  },
  dotActive: { backgroundColor: "#0ea5a4" },
  btn: {
    backgroundColor: "#0ea5a4",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
  btnText: { color: "white", fontWeight: "700" },
});
