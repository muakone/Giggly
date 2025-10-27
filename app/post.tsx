import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useGigs from "../hooks/useGigs";
import { useUserStore } from "../store/useUserStore";

export default function PostScreen() {
  const [title, setTitle] = useState("");
  const [payout, setPayout] = useState("");
  const [tags, setTags] = useState("Delivery,Quick");
  const [desc, setDesc] = useState("");
  const router = useRouter();
  const user = useUserStore((s: any) => s.user);
  const { addGig } = useGigs();
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [boosted, setBoosted] = useState(false);
  const [image, setImage] = useState<any | null>(null);

  function handleSubmit() {
    if (!title || !payout)
      return Alert.alert("Missing", "Please enter title and payout");

    const newGig = {
      title,
      payout: payout.includes("₦") ? payout : `₦${payout}`,
      location: location || (user?.phone ? "Nearby" : "Remote"),
      tags: tags.split(",").map((t) => t.trim()),
      description: desc || "Posted via UI-only composer",
      boosted: !!boosted,
      image: image || require("../assets/images/react-logo.png"),
      contact: contact || undefined,
    };

    addGig(newGig as any);
    Alert.alert("Posted", "Your gig was created (UI-only)");
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ padding: 20 }}
      >
        <Text style={styles.header}>Create a quick gig</Text>

        <View style={styles.previewCard}>
          <Text style={styles.previewTitle}>
            {title || "Your gig title here"}
          </Text>
          <Text style={styles.previewMeta}>
            {payout || "₦0"} • {location || (user?.phone ? "Nearby" : "Remote")}
          </Text>
          <Text style={styles.previewDesc}>
            {desc || "A short description will show here."}
          </Text>
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder="Eg. Deliver 2 boxes"
        />

        <Text style={styles.label}>Payout</Text>
        <TextInput
          value={payout}
          onChangeText={setPayout}
          style={styles.input}
          placeholder="1200"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          value={location}
          onChangeText={setLocation}
          style={styles.input}
          placeholder="e.g. Yaba, Lagos or Remote"
        />

        <Text style={styles.label}>Contact (optional)</Text>
        <TextInput
          value={contact}
          onChangeText={setContact}
          style={styles.input}
          placeholder="Phone or email"
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Tags (comma separated)</Text>
        <TextInput
          value={tags}
          onChangeText={setTags}
          style={styles.input}
          placeholder="Delivery,Quick"
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          value={desc}
          onChangeText={setDesc}
          style={[styles.input, { height: 100 }]}
          placeholder="Add more details (optional)"
          multiline
        />

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <Text style={{ fontWeight: "700", marginRight: 12 }}>
            Boost this post
          </Text>
          <Switch value={boosted} onValueChange={setBoosted} />
        </View>

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}
        >
          <TouchableOpacity
            style={styles.imagePicker}
            onPress={() => setImage(require("../assets/images/react-logo.png"))}
          >
            <Text style={{ color: "#0f172a" }}>Add image</Text>
          </TouchableOpacity>
          {image ? (
            <Image
              source={image}
              style={{ width: 64, height: 64, marginLeft: 12, borderRadius: 8 }}
            />
          ) : null}
        </View>

        <TouchableOpacity style={styles.postBtn} onPress={handleSubmit}>
          <Text style={{ color: "white", fontWeight: "700" }}>Post gig</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "900", marginBottom: 12 },
  previewCard: {
    backgroundColor: "#f8fafc",
    padding: 14,
    borderRadius: 12,
    marginBottom: 18,
  },
  previewTitle: { fontSize: 16, fontWeight: "800" },
  previewMeta: { color: "#6b7280", marginTop: 6 },
  previewDesc: { marginTop: 8, color: "#374151" },
  label: { fontWeight: "700", marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  postBtn: {
    marginTop: 20,
    backgroundColor: "#0ea5a4",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 40,
  },
  imagePicker: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#fff",
  },
});
