import { useEffect, useState } from "react";

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
  {
    id: "4",
    title: "Quick Errand: Grocery Pickup",
    payout: "₦800",
    location: "Yaba, Lagos",
    tags: ["Errand", "30m"],
    description:
      "Pick up a small grocery list from the nearby store and deliver to apartment.",
    createdAt: "3h",
    image: require("../assets/images/react-logo.png"),
  },
  {
    id: "5",
    title: "Profile Photo Retouch",
    payout: "₦1,500",
    location: "Remote",
    tags: ["Photo", "Remote"],
    description: "Minor retouching on 1 headshot, crop and color correct.",
    createdAt: "6h",
    image: require("../assets/images/react-logo.png"),
    boosted: false,
    applicants: [],
  },
  {
    id: "6",
    title: "Assemble Flatpack Desk",
    payout: "₦4,200",
    location: "Surulere, Lagos",
    tags: ["Manual", "1.5h"],
    description: "Assemble and position a small desk at home. Tools provided.",
    createdAt: "8h",
    image: require("../assets/images/splash-icon.png"),
    boosted: true,
    applicants: ["Tunde"],
  },
];

export default function useGigs() {
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const t = setTimeout(() => {
      if (mounted) {
        setGigs(MOCK);
        setLoading(false);
      }
    }, 350);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, []);

  function claimGig(id: string) {
    setGigs((prev) =>
      prev.map((g) => (g.id === id ? { ...g, claimed: !g.claimed } : g))
    );
  }

  function toggleBookmark(id: string) {
    setGigs((prev) =>
      prev.map((g) => (g.id === id ? { ...g, bookmarked: !g.bookmarked } : g))
    );
  }

  function addGig(gig: Partial<Gig>) {
    const built: Gig = {
      id: String(Date.now()),
      title: gig.title || "Untitled",
      payout: gig.payout || "₦0",
      location: gig.location || "Remote",
      tags: gig.tags || ["General"],
      description: gig.description || "",
      createdAt: gig.createdAt || "now",
      image: gig.image || require("../assets/images/react-logo.png"),
      boosted: !!gig.boosted,
      claimed: false,
      bookmarked: false,
      applicants: [],
    };

    setGigs((prev) => [built, ...prev]);
  }

  function getById(id: string) {
    return gigs.find((g) => g.id === id);
  }

  return { gigs, loading, claimGig, toggleBookmark, addGig, getById } as const;
}
