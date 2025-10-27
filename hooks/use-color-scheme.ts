// Override the default device color-scheme for this UI-only app.
// The project prefers a light, bright theme to match the design direction.
// Keep this centralized so we can change later if needed.
import { useColorScheme as _useColorScheme } from "react-native";

export function useColorScheme(): "light" | "dark" | null {
  // Intentionally force a light (white) theme across the app so all pages
  // follow a white background color scheme regardless of the OS setting.
  // We still call the native hook to preserve hook semantics.
  void _useColorScheme();
  return "light";
}
