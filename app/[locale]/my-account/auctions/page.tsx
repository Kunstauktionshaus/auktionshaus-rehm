"use client";

import { useBidders } from "@/context/BiddersContext";
import Link from "next/link";

const BiddersPage = () => {
  const { biddersData, loading, error } = useBidders();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {biddersData && biddersData.length > 0 ? (
        <div className="flex gap-4">
          {biddersData.map((bidder) => (
            <div key={bidder.id} className="border p-2">
              <p>Bidder Number:{bidder.bidderNumber}</p>
              <p>Auction Number:{bidder.auctionNumber}</p>
              <div>
                Objects:{" "}
                {bidder.objects.map((obj) => (
                  <div key={obj.id} className="flex gap-4">
                    <Link href={`/lots/${obj.id}`} className="border p-2">
                      <p>Catalog Number: {obj.catalogNumber}</p>
                      <p>Price: {obj.soldPrice}</p>
                      <p>Can be shipped: {obj.canBeShipped ? "yes" : "no"}</p>
                    </Link>
                  </div>
                ))}
              </div>
              <div>
                Prebidds:{" "}
                {bidder.prebids.map((prebid) => (
                  <div key={prebid.id} className="flex gap-4">
                    <p>Id: {prebid.id}</p>
                    <p>Catalog Number: {prebid.catalogNumber}</p>
                    <p>Catalog Price: {prebid.catalogPrice}</p>
                    <p>Your Max bid: {prebid.maxBid}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No bidders found.</p>
      )}
    </div>
  );
};

export default BiddersPage;
