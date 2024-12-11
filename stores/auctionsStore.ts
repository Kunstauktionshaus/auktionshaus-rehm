import { create } from "zustand";

interface Auction {
  auctionNumber: string;
  startDate: Date;
  endDate: Date;
  startViewing: Date;
  status: string;
}

interface AuctionStore {
  storedAuctions: Auction[] | [];
  updateStoredAuctions: (auctions: Auction[]) => void;
}

export const useAuctionStore = create<AuctionStore>((set) => ({
  storedAuctions: [],
  updateStoredAuctions: (storedAuctions) => set(() => ({ storedAuctions })),
}));
