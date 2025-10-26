import { useRouter } from "expo-router";
import { useEffect } from "react";

// Explore was removed from the tab group; redirect to home.
export default function ExploreRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);

  return null;
}
