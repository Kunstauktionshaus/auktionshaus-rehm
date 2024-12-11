"use client";

import { ObjectSchemaValues } from "@schemas/item";
import { formatPrice } from "@utils/formatPrice";
import { useSession } from "next-auth/react";
import { useLocale } from "next-intl";

interface LotDetailsProps {
  item: ObjectSchemaValues;
}

const LotDetails: React.FC<LotDetailsProps> = ({ item }) => {
  const locale = useLocale();
  const header = locale === "en" ? item.headerEN : item.headerDE;
  const description = locale === "en" ? item.descriptionEN : item.descriptionDE;

  const { data: session } = useSession();
  return (
    <div className="w-full flex flex-col gap-6 bg-sky-blue-back p-4">
      <div className="flex flex-col gap-2">
        <h2 className="p-2">Description</h2>
        <p className="p-2 border-b">{description}</p>
      </div>

      {item.soldPrice ? (
        <div className="flex gap-2 ">
          <span>Sold: </span>
          {session ? (
            <span>{formatPrice(item.soldPrice)}</span>
          ) : (
            <span>Log in to view</span>
          )}
        </div>
      ) : (
        <p className="">Start price: {formatPrice(item.catalogPrice)}</p>
      )}
    </div>
  );
};

export default LotDetails;
