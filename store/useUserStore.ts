import * as Zustand from "zustand";

// Metro / bundler environments can surface the `zustand` package in several shapes:
// - a default-exported function
// - a namespace object with `.create` function
// - an object with `.default` being the function
// Normalize to a callable `create` function for all these cases.
let create: any =
  (Zustand as any).default ?? (Zustand as any).create ?? Zustand;
if (typeof create !== "function") {
  // try alternate fallbacks
  create = (Zustand as any).create ?? (Zustand as any).default ?? create;
}

type User = {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
};

export const useUserStore: any = create((set: any) => ({
  user: null,
  setUser: (u: User | null) => set({ user: u }),
  // onboarding persistence flag: null = loading, false = not seen, true = seen
  seenOnboarding: null,
  setSeenOnboarding: (v: boolean) => {
    set({ seenOnboarding: v });
    (async () => {
      try {
        const pkg = "@react-native-async-storage/async-storage";
        const mod = await import(pkg as any);
        const AS = (mod as any).default ?? (mod as any);
        if (AS && AS.setItem) await AS.setItem("seenOnboarding", v ? "1" : "0");
      } catch (err) {
        // ignore if dynamic import fails or storage is unavailable
        console.warn("persist seenOnboarding failed", err);
      }
    })();
  },
}));

export default useUserStore;

// Hydrate the onboarding flag from persistent storage (best-effort).
// hydrate
(async () => {
  try {
    const pkg = "@react-native-async-storage/async-storage";
    const mod = await import(pkg as any);
    const AS = (mod as any).default ?? (mod as any);
    if (AS && AS.getItem) {
      const v = await AS.getItem("seenOnboarding");
      useUserStore.setState({ seenOnboarding: v === "1" });
    } else {
      useUserStore.setState({ seenOnboarding: false });
    }
  } catch (err) {
    // If AsyncStorage isn't available, default to false so onboarding shows.
    console.warn("hydrate seenOnboarding failed", err);
    useUserStore.setState({ seenOnboarding: false });
  }
})();
