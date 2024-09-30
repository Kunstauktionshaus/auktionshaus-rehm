import BidderDeliveryForm from "@components/bidder/BidderDeliveryForm";
import BidderItems from "@components/bidder/BidderItems";
import { SessionObjectSchema } from "@schemas";
import { getSession } from "@session";

const Dashboard = async () => {
  const session = await getSession();

  const bidderData = SessionObjectSchema.parse(session?.bidderData);
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-between gap-6">
      <div className="w-full md:w-4/12 flex flex-col gap-4 p-4 font-montserrat rounded">
        <div className=" flex flex-col gap-1">
          <p className="font-semibold">
            {bidderData.name} {bidderData.surname}
          </p>
          <p className="text-navy">{bidderData.email}</p>
        </div>
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
        <div className="px-8 py-4 bg-teal text-white text-center">Invoice</div>
      </div>
      <div className="w-full ">
        <BidderDeliveryForm
          bidderID={bidderData.id}
          isBidderNotEU={bidderData.notEU}
          shippingCase={bidderData.shippingCase}
        />
      </div>
    </div>
  );
};

export default Dashboard;
