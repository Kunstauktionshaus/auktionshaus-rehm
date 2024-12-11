"use client";

import { useAuctionStore } from "@stores/auctionsStore";
import { isAfter, isBefore, isWithinInterval } from "date-fns";
import { useEffect, useState } from "react";

const AuctionsWrapper = ({ children }: { children: React.ReactNode }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { storedAuctions, updateStoredAuctions } = useAuctionStore();
  const [auctions, setAuctions] = useState<any[]>([]);

  const getAuctionStatus = (auction: any) => {
    const startDate = new Date(auction.startDate);
    const endDate = new Date(auction.endDate);
    const startViewing = new Date(auction.startViewing);

    if (isBefore(currentDate, startViewing)) {
      return "upcoming";
    } else if (
      isWithinInterval(currentDate, { start: startViewing, end: startDate })
    ) {
      return "viewing";
    } else if (
      isWithinInterval(currentDate, { start: startDate, end: endDate })
    ) {
      return "ongoing";
    } else if (isAfter(currentDate, endDate)) {
      return "clearing";
    }
  };

  const categorizeAuctions = (auctions: any[]) => {
    return auctions.map((auction: any) => {
      const newStatus = getAuctionStatus(auction);

      return {
        ...auction,
        status: newStatus,
      };
    });
  };

  const getAuctions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/termins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      setAuctions(data);
      updateStoredAuctions(categorizeAuctions(data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAuctions();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());

      const categorizedAuctions = categorizeAuctions(auctions);
      const hasStatusChanged = !categorizedAuctions.every(
        (auction: any, index: number) => {
          return auction.status === storedAuctions[index]?.status;
        },
      );

      if (hasStatusChanged) {
        updateStoredAuctions(categorizedAuctions);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [auctions]);

  return <div>{children}</div>;
};

export default AuctionsWrapper;
