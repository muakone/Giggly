// Polyfills required for Supabase in React Native / Expo
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.EXPO_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY || process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "Supabase keys missing. Set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY to enable Supabase."
  );
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? "",
  SUPABASE_ANON_KEY ?? "",
  {
    auth: { persistSession: false },
  }
);

export default supabase;
