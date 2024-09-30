import { BidderItemsArraySchema } from "@schemas";
import { getSession } from "@session";
import BidderItems from "@components/bidder/BidderItems";

const BidderItemsPage = async () => {
  const session = await getSession();

  const bidderItems = BidderItemsArraySchema.parse(session?.bidderData.objects);
  return (
    <div className="font-lato">
      <BidderItems items={bidderItems} />
    </div>
  );
};

export default BidderItemsPage;
