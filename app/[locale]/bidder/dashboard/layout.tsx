import { SessionObjectSchema } from "@schemas";
import { getSession } from "@session";
import { redirect } from "next/navigation";
import BidderNav from "@components/bidder/BidderNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bidder",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect("/bidder/verify");
  }

  const bidderData = SessionObjectSchema.parse(session?.bidderData);

  return (
    <div className="w-full min-h-hw mt-10 flex flex-col gap-6">
      <div className="w-full p-4 flex items-center justify-between">
        <div>
          <p className="font-montserrat font-bold text-xl">
            {bidderData.name} {bidderData.surname}
          </p>
          <p>{bidderData.email}</p>
        </div>
        <div>
          {" "}
          <p>Auction: {bidderData.auctionNumber}</p>
          <p>Bidder: {bidderData.bidderNumber}</p>
        </div>

        {/* <p>{bidderData.notEU ? "not EU" : "EU"}</p>
        <p>{bidderData.shippingCase}</p> */}
      </div>
      <div className="w-full max-w-screen-xl mx-auto h-full flex flex-col md:flex-row gap-6 p-2">
        <aside className="w-full md:w-3/12 flex flex-col gap-4 p-4 border border-beige shadow-lg rounded">
          <BidderNav />
        </aside>
        <main className="w-full h-full border border-beige shadow-lg rounded p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
