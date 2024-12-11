import AuctionItemsWrapper from "@components/auctions/AuctionItemsWrapper";
import { ObjectsArrayValues } from "@schemas/item";
import auctionData from "@data/auctions.json";
import Link from "next/link";

const Auction = async ({ params }: { params: { auction: string } }) => {
  const auctionNr = params.auction;
  const currentAuction = auctionData.current.number;
  const isCurrentAuction = +auctionNr === currentAuction;

  if (isCurrentAuction) {
    const data = await fetch(`http://localhost:3000/api/auction/${auctionNr}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const items: ObjectsArrayValues = (await data.json()) || [];

    return <AuctionItemsWrapper items={items} auctionNumber={auctionNr} />;
  }
  return (
    <>
      <p>Auction not found</p>
      <Link href={"/auctions"}>Go to auctions page</Link>
    </>
  );
};

export default Auction;
