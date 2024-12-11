"use client";
import { compareAsc, compareDesc } from "date-fns";
import UpcomingAuction from "../UpcomingAuction";
import ClearingAuction from "./ClearingAuction";
import ActiveAuction from "./ActiveAuction";
import { useAuctionStore } from "@stores/auctionsStore";

const AuctionsContainer = () => {
  const { storedAuctions } = useAuctionStore();

  const activeAuctions = storedAuctions.filter(
    (auctions) =>
      auctions.status === "ongoing" || auctions.status === "viewing",
  );

  const upcomingAuctions = storedAuctions
    .filter((auction) => auction.status === "upcoming")
    .sort((a, b) => compareAsc(new Date(a.startDate), new Date(b.startDate)));

  const pastAuctions = storedAuctions.filter(
    (auctions) => auctions.status === "clearing",
  );

  const closestPastAuction = pastAuctions[0];

  return (
    <div className="w-full p-10 flex flex-col gap-10">
      {JSON.stringify(pastAuctions)}
      <div className="w-full border">
        {closestPastAuction && <ClearingAuction auction={closestPastAuction} />}
      </div>
      <div className="w-full bg-green">
        {activeAuctions.map((auction) => (
          <div key={auction.auctionNumber}>
            <ActiveAuction auction={auction} />
          </div>
        ))}
      </div>
      <div className="w-full flex flex-col gap-10">
        {upcomingAuctions.map((auction) => (
          <div key={auction.auctionNumber} className="w-full border">
            <UpcomingAuction auction={auction} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuctionsContainer;
