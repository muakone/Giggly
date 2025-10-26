import { useRouter } from "expo-router";
import { useEffect } from "react";

// This file used to be a tab screen. The Notifications screen has been moved to the app root
// so it should no longer appear on the bottom tab bar. Redirect current route to home.
export default function NotificationsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/");
  }, [router]);
  return null;
}
