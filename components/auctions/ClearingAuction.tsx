"use client";

import { format } from "date-fns";
import Link from "next/link";

interface ClearingAuctionProps {
  auction: any;
}
const ClearingAuction: React.FC<ClearingAuctionProps> = ({ auction }) => {
  return (
    <Link href={`/auctions/${auction.auctionNumber}`}>
      <div key={auction.auctionNumber}>
        <p>Auction Number: {auction.auctionNumber}</p>
        <p>Ends: {format(new Date(auction.endDate), "EEEE, dd MMMM yyyy")}</p>
      </div>
    </Link>
  );
};

export default ClearingAuction;
