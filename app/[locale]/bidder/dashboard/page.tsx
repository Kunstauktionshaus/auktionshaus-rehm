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

      <div className="w-full ">
        {(bidderData.method === 0 || bidderData.method === 3) && (
          <BidderDeliveryForm
            bidderID={bidderData.id}
            shippingCase={bidderData.shippingCase}
          />
        )}
        {bidderData.method === 2 && (
          <div className="font-montserrat px-4 py-20 text-center">
            You selected shipping method. Your shipment is currently being
            processed, and you will receive an email with updates.
          </div>
        )}

        {bidderData.method === 1 && (
          <p>
            You selected pickup method on DATE. You have chosen to pick up items
            from the auction house. We look forward to seeing you!
          </p>
        )}

        {bidderData.method === 4 && (
          <p>
            You selected contact mailboxes method. Your request is being
            processed, and someone will get in touch with you shortly.
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
