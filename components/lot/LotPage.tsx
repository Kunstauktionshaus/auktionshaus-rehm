import { ObjectSchemaValues } from "@schemas/item";
import ImagesContainer from "./ImagesContainer";
import LotDetails from "./LotDetails";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import BidForm from "@components/BidForm";

interface LotPageProps {
  item: ObjectSchemaValues;
}

const LotPage: React.FC<LotPageProps> = ({ item }) => {
  const locale = useLocale();
  const header = locale === "en" ? item.headerEN : item.headerDE;
  const t = useTranslations("AuctionPage");

  return (
    <div className="w-full max-w-screen-3xl mx-auto p-10 flex flex-col gap-2">
      <Link
        href={`/auctions/${item.auction}`}
        className="flex items-center text-teal text-sm hover:text-navy "
      >
        <FiChevronLeft />
        <p className="px-2">
          {t("viewAll")} {item.auction}
        </p>
      </Link>
      <h1 className="text-xl md:text-2xl xl:text-4xl font-montserrat font-semibold text-navy p-2">
        Lot {item.catalogNumber}: {header}
      </h1>
      <div className="w-full flex flex-col lg:flex-row ">
        <div className="w-full lg:w-3/5">
          <ImagesContainer
            catalogNumber={item.catalogNumber}
            auctionNumber={item.auction}
          />
        </div>
        <div className="w-full lg:w-2/5">
          <LotDetails item={item} />
          <BidForm item={item} />
        </div>
      </div>
    </div>
  );
};

export default LotPage;
