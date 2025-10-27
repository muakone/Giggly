import { describe, expect, it } from "vitest";
import { useAppStore } from "../store/useAppStore";

describe("useAppStore core flows", () => {
  it("adds a gig and it appears in gigs list", () => {
    const before = useAppStore.getState().gigs.length;
    useAppStore.getState().addGig({ title: "Test Gig", payout: "₦500" });
    const after = useAppStore.getState().gigs.length;
    expect(after).toBeGreaterThan(before);
  });

  it("claiming a gig creates a pending transaction", () => {
    // ensure a gig exists
    const state = useAppStore.getState();
    const gig = state.gigs[0];
    expect(gig).toBeDefined();

    const beforeTx = state.transactions.length;
    state.claimGig(gig.id);
    const afterTx = useAppStore.getState().transactions.length;
    expect(afterTx).toBeGreaterThan(beforeTx);

    const tx = useAppStore.getState().transactions[0];
    expect(tx.status).toBe("pending");
    expect(tx.gigId).toBe(gig.id);
  });

  it("releasePending marks pending transactions as available", () => {
    const state = useAppStore.getState();
    // create a pending tx
    state.addTransaction({ label: "Test", amount: 1000, status: "pending" });
    const pendingBefore = state.transactions.filter(
      (t: any) => t.status === "pending"
    ).length;
    state.releasePending();
    const pendingAfter = useAppStore
      .getState()
      .transactions.filter((t: any) => t.status === "pending").length;
    expect(pendingAfter).toBeLessThanOrEqual(pendingBefore - 1);
  });
});
