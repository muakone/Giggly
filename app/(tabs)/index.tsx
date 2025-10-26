import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import GigCard from "../../components/CleanGigCard";
import FAB from "../../components/FAB";
import StatusStrip from "../../components/StatusStrip";
import useGigs from "../../hooks/useGigs";

export default function FeedScreen() {
  const { gigs, claimGig, toggleBookmark } = useGigs();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <StatusStrip />
      <FlatList
        data={gigs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GigCard
            gig={item}
            onClaim={() => claimGig(item.id)}
            onBookmark={() => toggleBookmark(item.id)}
          />
        )}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <FlatListItemSeparator />}
        ListHeaderComponent={() => (
          <View style={{ paddingHorizontal: 16 }}>
            <TouchablePost onPress={() => null} />
          </View>
        )}
      />

      <FAB />
    </SafeAreaView>
  );
}

function FlatListItemSeparator() {
  return <View style={{ height: 12 }} />;
}

function TouchablePost({ onPress }: { onPress?: () => void }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push("/post")}
      activeOpacity={0.9}
      style={postStyles.card}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={postStyles.title}>Post a gig</Text>
          <Text style={postStyles.subtitle}>
            Got something quick? Post and get people to claim it.
          </Text>
        </View>
        <View style={postStyles.ctaIcon}>
          <Text style={{ color: "#fff", fontWeight: "800" }}>+</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const postStyles = StyleSheet.create({
  card: {
    backgroundColor: "#0a7ea4",
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: "#0a7ea4",
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  title: { fontSize: 18, fontWeight: "900", marginBottom: 6, color: "#fff" },
  subtitle: { color: "#e6f7fb" },
  ctaIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#06b6d4",
    alignItems: "center",
    justifyContent: "center",
  },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f7fa" },
  // increase bottom padding so items don't hide behind the semi-floating tab bar
  list: { padding: 16, paddingTop: 8, paddingBottom: 160 },
});
