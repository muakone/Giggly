import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Colors } from "../../constants/theme";
import useGigs from "../../hooks/useGigs";

export default function GigDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const id = params.id as string;
  const { getById, claimGig } = useGigs();
  const gig = getById(id) || null;

  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: Colors.light.background }]}
    >
      {/* Header */}
      <View style={[styles.headerWrap, { backgroundColor: Colors.light.tint }]}>
        <View style={styles.headerInner}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
          >
            <Text style={styles.backText}>{"‹"}</Text>
          </TouchableOpacity>
          <Text numberOfLines={1} style={styles.headerTitleWhite}>
            {gig?.title ?? "Job"}
          </Text>
          <View style={{ width: 44 }} />
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 120 }}>
        <View style={{ marginTop: -40 }}>
          <View style={[styles.banner, { backgroundColor: Colors.light.tint }]}>
            <Text style={styles.bannerLetter}>
              {(gig?.title || "G").charAt(0).toUpperCase()}
            </Text>
          </View>
        </View>

        <Text style={styles.title}>{gig ? gig.title : `Gig #${id}`}</Text>
        <Text style={styles.meta}>
          {gig?.location ?? "Nearby"} • {gig?.createdAt ?? "now"}
        </Text>

        <View style={styles.tagsRow}>
          {(gig?.tags || ["General"]).map((t: string) => (
            <View key={t} style={styles.tag}>
              <Text style={styles.tagText}>{t}</Text>
            </View>
          ))}
        </View>

        {gig?.applicants?.length ? (
          <View style={styles.applicantsRowDetail}>
            <Text style={{ fontWeight: "700", marginRight: 8 }}>
              People Applied
            </Text>
            <View style={{ flexDirection: "row" }}>
              {gig.applicants.slice(0, 5).map((a: string, i: number) => (
                <View
                  key={i}
                  style={[
                    styles.smallAvatar,
                    { marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i },
                  ]}
                >
                  <Text style={{ fontSize: 12, fontWeight: "700" }}>
                    {(a || "U").slice(0, 1).toUpperCase()}
                  </Text>
                </View>
              ))}
              {gig.applicants.length > 5 ? (
                <View style={[styles.smallAvatar, { marginLeft: -10 }]}>
                  <Text style={{ fontSize: 12, fontWeight: "700" }}>
                    +{gig.applicants.length - 5}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        ) : null}

        <Text style={styles.description}>
          {gig?.description ?? "No description available."}
        </Text>
      </ScrollView>

      <View
        style={[
          styles.bottomBar,
          { paddingBottom: Math.max(12, insets.bottom) },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.leftButton,
            { backgroundColor: "#ff6fa3", marginRight: 8 },
          ]}
          onPress={() => {
            // claim the gig via the shared hook
            if (gig) {
              claimGig(gig.id);
              alert("Claimed (UI-only). Check your wallet for pending payout.");
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Apply</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.rightButton, { backgroundColor: Colors.light.tint }]}
          onPress={() => alert("Review (UI-only)")}
        >
          <Text style={{ color: "white", fontWeight: "700" }}>Review</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: "transparent",
  },
  backButton: {
    width: 44,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: { fontSize: 28, color: "#071124" },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#071124",
  },
  headerWrap: { paddingTop: 12, paddingBottom: 18 },
  headerInner: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  headerTitleWhite: {
    flex: 1,
    textAlign: "center",
    fontSize: 17,
    fontWeight: "700",
    color: "#fff",
  },
  banner: { height: 220, borderRadius: 12, marginBottom: 16, width: "100%" },
  bannerLetter: {
    fontSize: 64,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginTop: 64,
  },
  title: { fontSize: 20, fontWeight: "800", marginBottom: 6, color: "#071124" },
  meta: { color: "#6B7280", marginBottom: 12 },
  tagsRow: { flexDirection: "row", marginBottom: 12 },
  tag: {
    backgroundColor: "#F3F4F6",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    marginRight: 8,
  },
  tagText: { color: "#374151", fontWeight: "600" },
  description: { color: "#374151", lineHeight: 20 },
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    padding: 12,
    gap: 12,
    backgroundColor: "#fff",
  },
  leftButton: {
    flex: 1,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  rightButton: {
    flex: 1,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
  },
  applicantsRowDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  smallAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#e6f2ff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#fff",
  },
});
