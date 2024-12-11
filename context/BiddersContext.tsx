"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

interface ObjectData {
  id: string;
  catalogNumber: string;
  soldPrice: number;
  canBeShipped: boolean;
}

interface PrebidData {
  id: string;
  catalogNumber: number;
  catalogPrice: number;
  maxBid: number;
  objectId: string;
}

interface BidderData {
  id: number;
  auctionNumber: string;
  bidderNumber: string;
  provisionSt: string;
  provisionPl: string;
  deliveryMethod: string;
  shippingPrice: number;
  trackingNumbers: {
    track1: string;
    track2: string;
    track3: string;
  };
  shippingCase: string;
  shippingStatus: string;
  isItemsPaid: [boolean];
  objects: ObjectData[];
  prebids: PrebidData[];
}

interface BiddersContextValue {
  biddersData: BidderData[] | null;
  loading: boolean;
  error: string | null;
  refreshBiddersData: () => Promise<void>;
}

const BiddersContext = createContext<BiddersContextValue | undefined>(
  undefined,
);

export const BiddersProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session } = useSession();
  const bidderNumbers = useMemo(
    () => session?.user?.bidderNumbers || [],
    [session?.user?.bidderNumbers],
  );
  const [biddersData, setBiddersData] = useState<BidderData[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBiddersData = useCallback(async () => {
    setLoading(true);
    if (!session || !session.user) {
      setBiddersData(null);
      setLoading(false);
      return;
    }

    try {
      if (!bidderNumbers || bidderNumbers.length === 0) {
        setBiddersData(null);
        setError(null);
        return;
      }

      const response = await axios.post("/api/customer/bidders", {
        ids: bidderNumbers,
      });

      setBiddersData(response.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to load bidders data.");
    } finally {
      setLoading(false);
    }
  }, [bidderNumbers]);

  useEffect(() => {
    if (bidderNumbers) {
      fetchBiddersData();
    }
  }, [fetchBiddersData, bidderNumbers]);

  return (
    <BiddersContext.Provider
      value={{
        biddersData,
        loading,
        error,
        refreshBiddersData: fetchBiddersData,
      }}
    >
      {children}
    </BiddersContext.Provider>
  );
};

export const useBidders = () => {
  const context = useContext(BiddersContext);
  if (context === undefined) {
    throw new Error("useBidders must be used within a BiddersProvider");
  }
  return context;
};
