"use client";

import { format } from "date-fns";

interface ClearingAuctionProps {
  auction: any;
}
const ClearingAuction: React.FC<ClearingAuctionProps> = ({ auction }) => {
  return (
    <div>
      <p>Auction Number: {auction.auctionNumber}</p>
      <p>
        Viewing Starts:{" "}
        {format(new Date(auction.startViewing), "EEEE, dd MMMM yyyy HH:mm")}
      </p>
      <p>
        Starts:{" "}
        {format(new Date(auction.startDate), "EEEE, dd MMMM yyyy HH:mm")}
      </p>
      <p>
        Ends: {format(new Date(auction.endDate), "EEEE, dd MMMM yyyy HH:mm")}
      </p>
      <p>Status: {auction.status}</p>
    </div>
  );
};

export default ClearingAuction;
