import Link from "next/link";
import Image from "next/image";
import auctionData from "@data/auctions.json";
import { format } from "date-fns";
const Auctions = () => {
  const currentAuction = auctionData.current.number;
  const startDate = auctionData.current.startDate;
  const endDate = auctionData.current.endDate;
  const upcomingAuctions = auctionData.upcoming;
  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;

  return (
    <div className="w-full h-full max-w-screen-3xl mx-auto p-6 flex flex-col gap-6 text-xl">
      <p>Current Auctions</p>
      <hr />
      <Link
        href={`/auctions/${currentAuction}`}
        className="transition-transform transform hover:shadow-lg"
      >
        <div className="w-full h-80 flex">
          <div className="w-full aspect-[21/9] lg:aspect-video relative ">
            <Image
              src={`${BASE_URL}/${currentAuction}/covers/main.jpg`}
              fill
              alt={`Homepage image`}
              className="object-cover object-center z-0"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              quality={100}
              priority
            />
          </div>

          <div className="w-full h-full flex flex-col items-center justify-center border-2 border-sky-blue">
            <p>{format(startDate, "EEEE, dd MMMM")} - from 16:00</p>
            <p>{format(endDate, "EEEE, dd MMMM")} - from 14:30</p>
          </div>
        </div>
      </Link>

      <p>Upcoming Auctions</p>
      <hr />
      {upcomingAuctions.map((auction, index) => (
        <div key={index} className="w-full h-80 flex">
          <div className="w-full h-full bg-sky-blue flex gap-2 relative">
            <div className="absolute bottom-4 left-4 z-50 flex gap-2 items-baseline">
              <span className="text-white text-7xl font-montserrat font-semibold">
                {auction.number}
              </span>
              <span className="text-white">art auction</span>
            </div>
          </div>
          <div className="w-full  flex flex-col items-center justify-center border-2 border-sky-blue">
            <p>{format(startDate, "EEEE, dd MMMM")}</p>
            <p>{format(endDate, "EEEE, dd MMMM")}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Auctions;
