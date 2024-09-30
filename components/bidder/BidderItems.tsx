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
    <div>
      <p>Your Items:</p>
      {items.length > 0 ? (
        items.map((item: BidderItem, index: number) => (
          <div key={index}>
            <div className="flex gap-2 mb-2">
              <span>{index + 1}</span>
              <span className="">{item.catalogNumber}</span>
              <span>
                {" "}
                {locale === "de"
                  ? item.headerDE
                  : item.headerEN
                  ? item.headerEN
                  : item.headerDE}
              </span>

              <span>€ {item.price}</span>
              <span>{item.canBeShipped ? "Yes" : "No"}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default BidderItems;
