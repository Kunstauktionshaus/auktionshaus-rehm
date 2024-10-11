"use client";

import { BidderItemsSchema } from "@schemas/zod";
import { useLocale } from "next-intl";
import { z } from "zod";

type BidderItem = z.infer<typeof BidderItemsSchema>;
type BidderItemsProps = {
  items?: BidderItem[];
};

const BidderItems: React.FC<BidderItemsProps> = ({ items }) => {
  const locale = useLocale();
  return (
    <div className="w-full flex flex-col gap-2">
      {items && items.length > 0 ? (
        <>
          <p className="font-semibold ">Your Items ({items.length})</p>
          {items.map((item: BidderItem, index: number) => (
            <div key={index}>
              <div className="w-full flex gap-4 justify-between items-center border-b border-sky-blue rounded p-2 text-sm">
                <span className="font-semibold">{item?.catalogNumber}</span>
                <div className="w-full flex flex-col items-center gap-2">
                  <span>
                    {locale === "de"
                      ? item?.headerDE
                      : item?.headerEN
                      ? item?.headerEN
                      : item?.headerDE}
                  </span>
                  <span>€ {item?.price}</span>
                </div>
                <div>
                  {item?.canBeShipped ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.375 7.5l8.25-4.5 8.25 4.5m-16.5 0v9l8.25 4.5v-9m-8.25-4.5L12 12m0 9l8.25-4.5v-9M12 12l8.25-4.5"
                      />
                    </svg>
                  ) : (
                    <div className="relative w-6 h-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.375 7.5l8.25-4.5 8.25 4.5m-16.5 0v9l8.25 4.5v-9m-8.25-4.5L12 12m0 9l8.25-4.5v-9M12 12l8.25-4.5"
                        />
                      </svg>
                      <div className="absolute top-0 right-0 w-3 h-3 border border-orange-600 bg-white rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="orange"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
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
