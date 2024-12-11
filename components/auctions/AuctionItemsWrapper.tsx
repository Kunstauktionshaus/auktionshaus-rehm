"use client";
import { ObjectsArrayValues } from "@schemas/item";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useAuctionStore } from "@stores/auctionsStore";
import AuctionHeader from "./AuctionHeader";

import AuctionItems from "./AuctionItems";

const AuctionItemsWrapper = ({
  items,
  auctionNumber,
}: {
  items: ObjectsArrayValues;
  auctionNumber: string;
}) => {
  const { storedAuctions } = useAuctionStore();
  const t = useTranslations("AuctionPage");

  const [isLoadingStatus, setIsLoadingStatus] = useState(true);

  const auctionStatus =
    storedAuctions.find((auction) => auction.auctionNumber === auctionNumber)
      ?.status || undefined;

  useEffect(() => {
    setIsLoadingStatus(false);
  }, [auctionStatus]);

  return (
    <div className="w-full max-w-screen-3xl mx-auto flex flex-col gap-4 font-montserrat">
      <>
        <div>
          <AuctionHeader auctionNumber={auctionNumber} />

          {isLoadingStatus ? (
            <div className="w-full h-full flex gap-2 items-center justify-center">
              <span className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-2 border-t-teal border-gray-200"></span>
              <span>Loading...</span>
            </div>
          ) : (
            <AuctionItems items={items} />
          )}
        </div>
      </>
    </div>
  );
};

export default AuctionItemsWrapper;
