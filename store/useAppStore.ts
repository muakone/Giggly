import * as Zustand from "zustand";
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
  addGig: (g: Partial<Gig>) => {
    const built: Gig = {
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
    set((s: any) => ({ gigs: [built, ...s.gigs] }));
    // notify
    get().addNotification(`${built.title} posted`);
  },

  claimGig: (id: string) => {
    const gig = get().gigs.find((x: Gig) => x.id === id);
    if (!gig) return;
    // toggle claimed state
    set((s: any) => ({
      gigs: s.gigs.map((g: Gig) => (g.id === id ? { ...g, claimed: true } : g)),
    }));

    // create a pending transaction based on payout
    const digits = Number((gig.payout || "").replace(/[^0-9]/g, "") || 0);
    const tx: Transaction = {
      id: String(Date.now()),
      gigId: gig.id,
      label: `Claim: ${gig.title}`,
      amount: digits,
      date: new Date().toISOString(),
      status: "pending",
    };

    set((s: any) => ({ transactions: [tx, ...s.transactions] }));

    get().addNotification(
      `You claimed '${gig.title}' — ₦${digits.toLocaleString()}`
    );
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

  releasePending: (id?: string) => {
    // mark a single tx or all pending as available
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
