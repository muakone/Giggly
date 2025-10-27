import { useAppStore } from "../store/useAppStore";

export default function useGigs() {
  const gigs = useAppStore((s: any) => s.gigs);
  const claimGig = useAppStore((s: any) => s.claimGig);
  const toggleBookmark = useAppStore((s: any) => s.toggleBookmark);
  const addGig = useAppStore((s: any) => s.addGig);
  const getById = useAppStore((s: any) => s.getById);
  const completeGig = useAppStore((s: any) => s.completeGig);

  // keep a lightweight loading flag for UI nicety
  const loading = false;

  return {
    gigs,
    loading,
    claimGig,
    toggleBookmark,
    addGig,
    getById,
    completeGig,
  } as const;
}
