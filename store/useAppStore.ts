import * as Zustand from "zustand";
import { supabase } from "../lib/supabase";
import { useUserStore } from "./useUserStore";
let create: any =
  (Zustand as any).default ?? (Zustand as any).create ?? Zustand;
if (typeof create !== "function") {
  create = (Zustand as any).create ?? (Zustand as any).default ?? create;
}

type Gig = {
  id: string;
  title: string;
  payout: string;
  location?: string;
  tags?: string[];
  description?: string;
  createdAt?: string;
  image?: any;
  boosted?: boolean;
  claimed?: boolean;
  completed?: boolean;
  bookmarked?: boolean;
  applicants?: string[];
};

type Transaction = {
  id: string;
  gigId?: string;
  label: string;
  amount: number;
  date: string;
  status: "pending" | "available";
};

type Notification = { id: string; text: string; time?: string; read?: boolean };

const MOCK: Gig[] = [
  {
    id: "1",
    title: "Pack & Deliver - Market Run",
    payout: "₦1,200",
    location: "Ikeja, Lagos",
    tags: ["Delivery", "2h"],
    description:
      "Pick up at store and deliver to customer within 2 hours. Small parcel, handle with care.",
    createdAt: "2h",
    image: require("../assets/images/partial-react-logo.png"),
    boosted: true,
    applicants: ["Ada", "Jon", "Maya"],
  },
  {
    id: "2",
    title: "Event Setup Crew (2 people)",
    payout: "₦6,000",
    location: "Lekki, Lagos",
    tags: ["Event", "3h"],
    description:
      "Help set up chairs and AV for a small launch event. Tools provided.",
    createdAt: "4h",
    image: require("../assets/images/react-logo.png"),
  },
  {
    id: "3",
    title: "Graphic Design: Social Post (1x)",
    payout: "₦2,500",
    location: "Remote",
    tags: ["Design", "Remote"],
    description:
      "Create a single social media post image matching brand guidelines.",
    createdAt: "1d",
    image: require("../assets/images/icon.png"),
  },
];

export const useAppStore: any = create((set: any, get: any) => ({
  gigs: MOCK,
  transactions: [],
  notifications: [],

  // GIGS
  addGig: async (g: Partial<Gig>) => {
    // Try to persist to Supabase if configured, otherwise fall back to local store.
    const user = useUserStore.getState().user;
    const payload: any = {
      title: g.title || "Untitled",
      description: g.description || "",
      payout: g.payout || "₦0",
      location: g.location || (user?.phone ? "Nearby" : "Remote"),
      tags: g.tags || ["General"],
      boosted: !!g.boosted,
      // created_at will be set by DB default if present
      user_id: user?.id ?? null,
    };

    try {
      if (supabase) {
        const res = await supabase
          .from("gigs")
          .insert([payload])
          .select()
          .single();
        if (!res.error && res.data) {
          const row = res.data as any;
          const built: Gig = {
            id: row.id || String(Date.now()),
            title: row.title,
            payout: row.payout || payload.payout,
            location: row.location,
            tags: row.tags || payload.tags,
            description: row.description,
            createdAt: row.created_at || new Date().toISOString(),
            image: g.image || require("../assets/images/react-logo.png"),
            boosted: !!row.boosted,
            claimed: false,
            bookmarked: false,
            applicants: [],
          };
          set((s: any) => ({ gigs: [built, ...s.gigs] }));
          get().addNotification(`${built.title} posted`);
          return built;
        }
      }
    } catch (err) {
      // fall through to local fallback
      console.warn("Supabase insert failed, using local store", err);
    }

    // Local fallback
    const builtLocal: Gig = {
      id: String(Date.now()),
      title: g.title || "Untitled",
      payout: g.payout || "₦0",
      location: g.location || "Remote",
      tags: g.tags || ["General"],
      description: g.description || "",
      createdAt: g.createdAt || "now",
      image: g.image || require("../assets/images/react-logo.png"),
      boosted: !!g.boosted,
      claimed: false,
      bookmarked: false,
      applicants: [],
    };
    set((s: any) => ({ gigs: [builtLocal, ...s.gigs] }));
    // notify
    get().addNotification(`${builtLocal.title} posted (local)`);
    return builtLocal;
  },

  claimGig: async (id: string) => {
    const gig = get().gigs.find((x: Gig) => x.id === id);
    if (!gig) return;
    const user = useUserStore.getState().user;

    // optimistic UI: mark claimed locally first
    set((s: any) => ({
      gigs: s.gigs.map((g: Gig) => (g.id === id ? { ...g, claimed: true } : g)),
    }));

    // compute numeric amount (best-effort)
    const digits = Number((gig.payout || "").replace(/[^0-9]/g, "") || 0);

    // try persisting to Supabase: update gig.claimed and insert a transaction
    try {
      if (supabase) {
        // update gig record
        const upd = await supabase
          .from("gigs")
          .update({ claimed: true })
          .eq("id", id)
          .select()
          .single();

        // insert transaction row
        const txPayload = {
          gig_id: id,
          label: `Claim: ${gig.title}`,
          amount: digits,
          actor_id: user?.id ?? null,
          status: "pending",
        } as any;

        const txRes = await supabase
          .from("transactions")
          .insert([txPayload])
          .select()
          .single();

        if (!txRes.error && txRes.data) {
          const row: any = txRes.data;
          const tx: Transaction = {
            id: row.id || String(Date.now()),
            gigId: id,
            label: row.label || txPayload.label,
            amount: Number(row.amount) || digits,
            date: row.created_at || new Date().toISOString(),
            status: row.status || "pending",
          };
          set((s: any) => ({ transactions: [tx, ...s.transactions] }));
          get().addNotification(
            `You claimed '${gig.title}' — ₦${digits.toLocaleString()}`
          );
          return tx;
        }
      }
    } catch (err) {
      console.warn("Supabase claim failed, falling back to local", err);
    }

    // Local fallback: create tx locally
    const txLocal: Transaction = {
      id: String(Date.now()),
      gigId: gig.id,
      label: `Claim: ${gig.title}`,
      amount: digits,
      date: new Date().toISOString(),
      status: "pending",
    };
    set((s: any) => ({ transactions: [txLocal, ...s.transactions] }));
    get().addNotification(
      `You claimed '${gig.title}' — ₦${digits.toLocaleString()} (local)`
    );
    return txLocal;
  },

  completeGig: (id: string) => {
    const gig = get().gigs.find((x: Gig) => x.id === id);
    if (!gig) return;
    set((s: any) => ({
      gigs: s.gigs.map((g: Gig) =>
        g.id === id ? { ...g, completed: true } : g
      ),
    }));
    get().addNotification(`Marked '${gig.title}' as completed`);
  },

  toggleBookmark: (id: string) =>
    set((s: any) => ({
      gigs: s.gigs.map((g: Gig) =>
        g.id === id ? { ...g, bookmarked: !g.bookmarked } : g
      ),
    })),

  getById: (id: string) => {
    return get().gigs.find((g: Gig) => g.id === id) || null;
  },

  // TRANSACTIONS
  addTransaction: (tx: Partial<Transaction>) => {
    const built: Transaction = {
      id: String(Date.now()),
      gigId: tx.gigId,
      label: tx.label || "Txn",
      amount: tx.amount || 0,
      date: tx.date || new Date().toISOString(),
      status: tx.status || "pending",
    };
    set((s: any) => ({ transactions: [built, ...s.transactions] }));
  },

  releasePending: async (id?: string) => {
    const user = useUserStore.getState().user;
    // try persist changes to Supabase first
    try {
      if (supabase) {
        if (id) {
          await supabase
            .from("transactions")
            .update({ status: "available" })
            .eq("id", id);
        } else {
          // release all pending transactions for the current user
          if (user && user.id) {
            await supabase
              .from("transactions")
              .update({ status: "available" })
              .eq("actor_id", user.id)
              .eq("status", "pending");
          }
        }
      }
    } catch (err) {
      console.warn(
        "Supabase releasePending failed, falling back to local",
        err
      );
    }

    // always update local state so UI reflects payout immediately
    set((s: any) => ({
      transactions: s.transactions.map((t: Transaction) =>
        id
          ? t.id === id && t.status === "pending"
            ? { ...t, status: "available" }
            : t
          : t.status === "pending"
            ? { ...t, status: "available" }
            : t
      ),
    }));
    get().addNotification("Pending transactions released to your balance");
  },

  // NOTIFICATIONS
  addNotification: (text: string) => {
    const n: Notification = {
      id: String(Date.now()),
      text,
      time: "now",
      read: false,
    };
    set((s: any) => ({ notifications: [n, ...s.notifications] }));
  },
  clearNotifications: () => set(() => ({ notifications: [] })),

  // helpers
  getBalance: () => {
    const txs: Transaction[] = get().transactions || [];
    return txs
      .filter((t) => t.status === "available")
      .reduce((s, t) => s + t.amount, 0);
  },
}));

export default useAppStore;
