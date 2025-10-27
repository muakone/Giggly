import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CleanGigCard({
  gig,
  onClaim,
  onBookmark,
}: {
  gig: any;
  onClaim?: () => void;
  onBookmark?: () => void;
}) {
  const router = useRouter();
  const scale = useRef(new Animated.Value(0.98)).current;
  const [reduceMotion, setReduceMotion] = useState(false);
  const payoutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then((r) => setReduceMotion(r));
    if (!reduceMotion) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 9,
      }).start();
    } else {
      scale.setValue(1);
    }
  }, [reduceMotion, scale]);

  useEffect(() => {
    let loop: Animated.CompositeAnimation | null = null;
    if (gig?.boosted && !reduceMotion) {
      loop = Animated.loop(
        Animated.sequence([
          Animated.timing(payoutAnim, {
            toValue: 1.06,
            duration: 650,
            useNativeDriver: true,
          }),
          Animated.timing(payoutAnim, {
            toValue: 1,
            duration: 650,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
    } else {
      payoutAnim.setValue(1);
    }

    return () => {
      if (loop) loop.stop();
    };
  }, [gig?.boosted, payoutAnim, reduceMotion]);

  return (
    <Animated.View
      style={[
        styles.card,
        gig?.boosted ? styles.cardHighlight : null,
        { transform: [{ scale }] },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={() => router.push(`/gig/${gig.id}`)}
        accessibilityRole="button"
        accessibilityLabel={`${gig.title}. ${gig.payout}. ${gig.location || "Nearby"}`}
      >
        <View style={styles.row}>
          <View
            style={[styles.image, gig.boosted ? styles.imageBoosted : null]}
          >
            <Text style={styles.imageLetter}>
              {(gig.title || "U").charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.content}>
            <View style={styles.titleRow}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {gig.boosted ? (
                    <View style={styles.promoted}>
                      <Text style={styles.promotedText}>Promoted</Text>
                    </View>
                  ) : null}
                  <Text numberOfLines={1} style={styles.title}>
                    {gig.title}
                  </Text>
                </View>
              </View>

              <View style={styles.payoutOuter}>
                <Animated.View
                  pointerEvents="none"
                  style={[
                    styles.payoutGlow,
                    {
                      opacity: payoutAnim.interpolate({
                        inputRange: [1, 1.06],
                        outputRange: [0, 1],
                      }),
                      transform: [{ scale: payoutAnim }],
                    },
                  ]}
                />

                <Animated.View
                  style={[
                    styles.payoutWrap,
                    gig?.boosted ? styles.payoutBoosted : null,
                    { transform: [{ scale: payoutAnim }] },
                  ]}
                >
                  <Text style={styles.payout}>{gig.payout}</Text>
                </Animated.View>
              </View>
            </View>

            <Text numberOfLines={1} style={styles.meta}>
              {gig.location} • {gig.createdAt}
            </Text>
            <Text numberOfLines={2} style={styles.description}>
              {gig.description}
            </Text>

            <View style={styles.footerRow}>
              <View style={styles.tagsRow}>
                {(gig.tags || []).map((t: string) => (
                  <View key={t} style={styles.tag}>
                    <Text style={styles.tagText}>{t}</Text>
                  </View>
                ))}
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {gig?.applicants?.length ? (
                  <View style={styles.applicantsRow}>
                    {gig.applicants.slice(0, 4).map((a: string, i: number) => (
                      <View
                        key={i}
                        style={[
                          styles.applicant,
                          { marginLeft: i === 0 ? 0 : -10, zIndex: 10 - i },
                        ]}
                      >
                        <Text style={styles.applicantText}>
                          {(a || "U").slice(0, 1).toUpperCase()}
                        </Text>
                      </View>
                    ))}
                    {gig.applicants.length > 4 ? (
                      <View style={[styles.applicant, { marginLeft: -10 }]}>
                        <Text style={styles.applicantText}>
                          +{gig.applicants.length - 4}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                ) : null}

                <View style={styles.actionsRow}>
                  <TouchableOpacity
                    onPress={onClaim}
                    accessibilityRole="button"
                    accessibilityLabel={
                      gig.claimed ? "Claimed" : `Claim ${gig.title}`
                    }
                    style={[
                      styles.claimButton,
                      gig.claimed ? styles.claimed : null,
                    ]}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.claimText}>
                      {gig.claimed ? "Claimed" : "Claim"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.bookmark,
                      gig.bookmarked ? styles.bookmarked : null,
                    ]}
                    accessibilityRole="button"
                    onPress={onBookmark}
                  >
                    <Text style={{ fontSize: 16 }}>
                      {gig.bookmarked ? "🔖" : "🔖"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#eef3f7",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 78,
    height: 78,
    borderRadius: 12,
    marginRight: 14,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLetter: { fontSize: 24, fontWeight: "900", color: "#071124" },
  imageBoosted: { backgroundColor: "#fff7ed" },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  promoted: {
    backgroundColor: "#fff7ed",
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#ffedd5",
  },
  promotedText: {
    fontSize: 12,
    color: "#c2410c",
    fontWeight: "800",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "#071124",
  },
  payoutWrap: {
    backgroundColor: "#0ea5a4",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },
  payoutBoosted: {
    shadowColor: "#05b59b",
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 6,
  },
  payoutOuter: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
  },
  payoutGlow: {
    position: "absolute",
    width: 80,
    height: 44,
    borderRadius: 16,
    backgroundColor: "rgba(14,165,164,0.14)",
  },
  payout: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 13,
  },
  meta: {
    color: "#6b7280",
    marginTop: 6,
    fontSize: 12,
  },
  description: {
    marginTop: 8,
    color: "#374151",
    fontSize: 13,
  },
  footerRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tagsRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 18,
    marginRight: 8,
  },
  tagText: {
    fontSize: 12,
    color: "#374151",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  applicantsRow: {
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  applicant: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  applicantText: { fontSize: 12, fontWeight: "700", color: "#0f172a" },
  claimButton: {
    backgroundColor: "#0ea5a4",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    marginRight: 8,
  },
  claimed: { backgroundColor: "#94a3b8" },
  claimText: {
    color: "#fff",
    fontWeight: "600",
  },
  bookmark: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.02,
    shadowRadius: 6,
    elevation: 1,
    borderWidth: 1,
    borderColor: "#eef3f7",
  },
  bookmarked: { backgroundColor: "#fff1f2", borderColor: "#ffdde0" },
  // subtle card uplift for visual depth
  cardHighlight: {
    shadowColor: "#05b59b",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 6,
  },
});
