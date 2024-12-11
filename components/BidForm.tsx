"use client";

import { getStepForPrice } from "@utils/verifyLimit";
import React, { useState } from "react";
import CustomSelect from "./shared/CustomSelect";
import { formatPrice } from "@utils/formatPrice";
import { useSession } from "next-auth/react";
import { ObjectSchemaValues } from "@schemas/item";
import { PrebidValues } from "@schemas/prebid-schema";
import { useBidders } from "@context/BiddersContext";

interface BidFormProps {
  item: ObjectSchemaValues;
}

const BidForm: React.FC<BidFormProps> = ({ item }) => {
  const { data: session } = useSession();
  const currentBidderNumber = session?.user.currentBidderNumber;
  const { refreshBiddersData } = useBidders();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const generateBids = (
    price: number,
    maxBids: number = 100,
    currentBids: number[] = [item.catalogPrice],
  ): number[] => {
    if (currentBids.length >= maxBids) {
      return currentBids;
    }

    const { step } = getStepForPrice(price);

    const nextPrice = price + step;
    currentBids.push(nextPrice);

    return generateBids(nextPrice, maxBids, currentBids);
  };

  const bids = generateBids(item.catalogPrice);
  const [selectedBid, setSelectedBid] = useState<number>(bids[0]);

  const handleBidChange = (value: string | number) => {
    setSelectedBid(Number(value));
  };

  const handlePlacePrebid = async () => {
    setIsSubmitting(true);
    const prebidData: PrebidValues = {
      auction: item.auction,
      catalogNumber: item.catalogNumber,
      bidderNumber: currentBidderNumber,
      maxBid: selectedBid,
    };
    try {
      const res = await fetch(`/api/customer/add-prebid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prebidData),
      });

      if (res.ok) {
        await refreshBiddersData();
        console.log("Prebid placed successfully and context refreshed.");
      } else {
        const errorResponse = await res.json();
        console.error("Failed to place prebid:", errorResponse.error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 bg-beige flex flex-col gap-2">
      <>
        <CustomSelect
          options={bids.map((bid) => ({
            label: `${formatPrice(bid)} EURO`,
            value: bid,
          }))}
          value={selectedBid}
          onChange={handleBidChange}
          label="Set Max Bid"
          placeholder="Choose your max bid"
        />

        <button
          onClick={() => handlePlacePrebid()}
          disabled={isSubmitting}
          className="bg-teal text-white p-2  hover:bg-teal-600 transition duration-200 disabled:bg-gray-300"
        >
          Place Prebid
        </button>
      </>
    </div>
  );
};

export default BidForm;
