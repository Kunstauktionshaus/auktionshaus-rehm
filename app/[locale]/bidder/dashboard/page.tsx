import BidderDeliveryForm from "@components/bidder/BidderDeliveryForm";
import BidderItems from "@components/bidder/BidderItems";
import { SessionObjectSchema } from "@schemas/zod";
import { getSession } from "@session";

const Dashboard = async () => {
  const session = await getSession();

  const bidderData = SessionObjectSchema.parse(session?.bidderData);
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-between gap-6">
      <div className="w-full md:w-5/12 flex flex-col gap-4 p-4 font-montserrat rounded">
        <p className="font-semibold text-lg">
          {bidderData.name} {bidderData.surname}
        </p>

        <div className="flex justify-center gap-4 items-center">
          <div className="w-full flex flex-col gap-2 items-center border border-sky-blue  rounded p-4">
            <span className="font-semibold text-lg">
              {bidderData.auctionNumber}
            </span>
            <span className="text-xs">Auction</span>
          </div>
          <div className="w-full flex flex-col gap-2 items-center border border-sky-blue  rounded p-4">
            <span className="font-semibold text-lg">
              {bidderData.bidderNumber}
            </span>
            <span className="text-xs">Bidder</span>
          </div>
        </div>
        <div className="mt-4">
          <BidderItems items={bidderData.objects} />
        </div>
        {bidderData.objects && bidderData.objects?.length > 0 && (
          <>
            {bidderData.isItemsPaid ? (
              <></>
            ) : (
              <div className="px-8 py-4 bg-teal text-white text-center uppercase">
                Invoice
              </div>
            )}
          </>
        )}
      </div>
      <BidderDeliveryForm
        bidderID={bidderData.id}
        method={bidderData.method}
        shippingCase={bidderData.shippingCase}
      />
    </div>
  );
};

export default Dashboard;
