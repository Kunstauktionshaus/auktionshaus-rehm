import RegisterForAuctionButton from "@components/shared/RegisrerForAuctionButton";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { useTranslations } from "next-intl";
import Image from "next/image";

const AuctionHeader = ({ auctionNumber }: { auctionNumber: string }) => {
  const t = useTranslations("AuctionPage");
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  const imageUrl = `${BASE_URL}/${auctionNumber}/covers/header.jpg`;

  return (
    <div className="relative w-full h-60 md:h-80 flex items-center bg-sky-blue-back overflow-hidden">
      <Image
        src={imageUrl}
        fill
        alt={`Auction ${auctionNumber}`}
        className="object-cover object-center z-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/0"></div>

      <div className="relative z-20 h-full flex flex-col justify-center items-left text-white p-4">
        <Link
          href={`/auctions`}
          className="absolute top-4 left-4 flex items-center text-sm hover:text-sky-blue"
        >
          <FiChevronLeft />
          <p className="px-2">View all auctions</p>
        </Link>
        <p className="text-3xl md:text-5xl font-bold mb-4">
          {t("auction")} {auctionNumber}
        </p>
        <RegisterForAuctionButton />
      </div>
    </div>
  );
};

export default AuctionHeader;
