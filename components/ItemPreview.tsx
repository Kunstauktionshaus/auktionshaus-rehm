import { ObjectSchemaValues } from "@schemas/item";
import { useLocale } from "next-intl";

import HighlightedText from "./HighlightedText";
import Link from "next/link";
import ImagePreview from "./ImagePreview";
import { Suspense } from "react";
import { formatPrice } from "@utils/formatPrice";

interface ItemProps {
  item: ObjectSchemaValues;
  searchKeyword: string;
}

const ItemPreview: React.FC<ItemProps> = ({ item, searchKeyword }) => {
  const locale = useLocale();
  const header = locale === "en" ? item.headerEN : item.headerDE;

  return (
    <Link href={`/lots/${item.id}`}>
      <div className="bg-white shadow-lg  w-full font-montserrat relative p-4 flex flex-col gap-4   hover:shadow-gray-500">
        <div className="relative w-full h-[250px] md:h-[300px]">
          <Suspense fallback={<p>loading</p>}>
            <ImagePreview item={item} />
          </Suspense>
        </div>
        <h3 className="text-navy  font-semibold">Lot {item.catalogNumber}</h3>
        <div className="h-16 flex flex-col gap-2">
          <p className="uppercase text-xl text-teal font-bold line-clamp-2">
            <HighlightedText text={header} searchKeyword={searchKeyword} />
          </p>
        </div>
        <div className="w-full flex justify-between text-navy">
          <span>Start price: </span>
          <span>{formatPrice(item.catalogPrice)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ItemPreview;
