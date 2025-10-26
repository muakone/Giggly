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
}));

export default useUserStore;
