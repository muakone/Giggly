import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  AccessibilityInfo,
  Animated,
  Image,
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
          <Image source={gig.image} style={styles.image} />

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
                          { left: i * -8, zIndex: 10 - i },
                        ]}
                      >
                        <Text style={styles.applicantText}>
                          {(a || "U").slice(0, 1).toUpperCase()}
                        </Text>
                      </View>
                    ))}
                    {gig.applicants.length > 4 ? (
                      <View style={[styles.applicant, { left: 4 * -8 }]}>
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
                    style={styles.claimButton}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.claimText}>
                      {gig.claimed ? "Claimed" : "Claim"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.bookmark,
                      gig.bookmarked ? { backgroundColor: "#fff1f2" } : null,
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
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    marginRight: 12,
    backgroundColor: "#eef2ff",
  },
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
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
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
    width: 72,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(14,165,164,0.16)",
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
    borderRadius: 20,
    marginRight: 6,
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
    width: 64,
    height: 32,
    justifyContent: "center",
  },
  applicant: {
    position: "relative",
    width: 34,
    height: 34,
    borderRadius: 17,
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
  claimText: {
    color: "#fff",
    fontWeight: "600",
  },
  bookmark: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  // subtle card uplift for visual depth
  cardHighlight: {
    shadowColor: "#05b59b",
    shadowOpacity: 0.06,
    shadowRadius: 18,
    elevation: 6,
  },
});
