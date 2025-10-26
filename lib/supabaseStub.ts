// Minimal supabase auth stub for UI-only flows.
// This file intentionally does not perform real network calls.
type AuthChangeCallback = (event: string, session: any) => void;

const listeners: AuthChangeCallback[] = [];

const supabaseStub = {
  auth: {
    // simulate signInWithOtp for phone/email — resolves with a mock user after a short delay
    signInWithOtp: async (opts: { email?: string; phone?: string }) => {
      const user = {
        id: String(Date.now()),
        email: opts.email,
        phone: opts.phone,
        name: opts.email?.split("@")[0] ?? "You",
      };
      setTimeout(() => {
        listeners.forEach((cb) => cb("SIGNED_IN", { user }));
      }, 500);
      return { data: { user }, error: null };
    },
    // signOut stub
    signOut: async () => {
      setTimeout(() => listeners.forEach((cb) => cb("SIGNED_OUT", null)), 200);
      return { error: null };
    },
    onAuthStateChange: (cb: AuthChangeCallback) => {
      listeners.push(cb);
      return { data: { subscription: { unsubscribe: () => {} } } };
    },
  },
  // gigs/table stubs (UI-only)
  from: (_table: string) => ({
    select: async () => ({ data: null, error: null }),
    insert: async () => ({ data: null, error: null }),
  }),
};

export default supabaseStub;
