"use client";

import { BidderItemsSchema } from "@schemas";
import { useLocale } from "next-intl";
import { z } from "zod";

type BidderItem = z.infer<typeof BidderItemsSchema>;
type BidderItemsProps = {
  items: BidderItem[];
};

const BidderItems: React.FC<BidderItemsProps> = ({ items }) => {
  const locale = useLocale();
  return (
    <div className="w-full flex flex-col gap-4">
      {items.length > 0 ? (
        <>
          <p className="font-semibold ">Your Items ({items.length})</p>
          {items.map((item: BidderItem, index: number) => (
            <div key={index}>
              <div className="w-full flex gap-4 justify-between border border-sky-blue rounded p-4 text-sm">
                <span className="font-semibold">{item.catalogNumber}</span>
                <span>
                  {locale === "de"
                    ? item.headerDE
                    : item.headerEN
                    ? item.headerEN
                    : item.headerDE}
                </span>

                <span>€ {item.price}</span>
              </div>
            </div>
          ))}
        </>
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default BidderItems;
