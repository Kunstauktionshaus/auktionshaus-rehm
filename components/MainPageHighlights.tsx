import Link from "next/link";
import Image from "next/image";
import { ObjectsArrayValues } from "@schemas/item";
import HighlightedItems from "./HighlightedItems";
import Foreword from "./Foreword";
import auctionData from "@data/auctions.json";

const Highlights = async () => {
  const currentAuction = auctionData.current.number;
  const data = await fetch(
    `http://localhost:3000/api/auction/${currentAuction}/highlight`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const highlightedItems: ObjectsArrayValues = await data.json();

  const BASE_URL = process.env.NEXT_PUBLIC_IMAGES_BASE_URL;
  return (
    <div className="w-full h-full flex flex-col gap-16 mb-6 px-6">
      <div className="w-full max-w-screen-2xl mx-auto mt-2 lg:mt-10 aspect-auto bg-white p-4 flex flex-col gap-4 items-center justify-center font-montserrat ">
        <p className="text-center text-2xl md:text-3xl lg:text-5xl text-black font-semibold">
          ART AUCTION HOUSE GEORG REHM
        </p>
        <p className="text-base lg:text-2xl text-navy text-center">
          Your art auction house in the 2000 years old Augsburg
        </p>
      </div>
      <div className="w-full max-w-screen-2xl mx-auto flex flex-col lg:flex-row gap-10">
        <Link
          href={`/auctions/${currentAuction}`}
          className="w-full aspect-[21/9] lg:aspect-video relative transition-transform transform hover:scale-105"
        >
          <Image
            src={`${BASE_URL}/${currentAuction}/covers/main.jpg`}
            fill
            alt={`Homepage image`}
            className="object-cover object-center z-0"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
            quality={100}
            priority
          />
        </Link>
        <Foreword />
      </div>

      <div className="w-full h-full max-w-screen-2xl mx-auto">
        <HighlightedItems items={highlightedItems} />
      </div>
      <div className="w-full max-w-screen-2xl mx-auto flex gap-2 justify-between items-center mt-10">
        <p className="text-4xl font-montserrat">Explore More</p>
      </div>
      <div className="w-full h-full max-w-screen-2xl mx-auto flex flex-col md:flex-row gap-8">
        <div className="w-full aspect-[21/9] lg:aspect-video bg-sky-blue flex items-center justify-center transition-transform transform hover:scale-105"></div>
        <div className="w-full aspect-[21/9] lg:aspect-video bg-sky-blue flex items-center justify-center transition-transform transform hover:scale-105"></div>
        <div className="w-full aspect-[21/9] lg:aspect-video bg-sky-blue flex items-center justify-center transition-transform transform hover:scale-105"></div>
        <div className="w-full aspect-[21/9] lg:aspect-video bg-sky-blue flex items-center justify-center transition-transform transform hover:scale-105"></div>
      </div>
    </div>
  );
};

export default Highlights;
