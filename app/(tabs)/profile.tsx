import { useRouter } from "expo-router";
import { useEffect } from "react";

// Profile was moved to the app root to avoid showing in the bottom tab bar.
// Redirect any route under (tabs)/profile to the root home screen.
export default function ProfileRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
