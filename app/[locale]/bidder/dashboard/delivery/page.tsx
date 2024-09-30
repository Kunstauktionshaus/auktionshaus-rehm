import BidderDeliveryForm from "@components/bidder/BidderDeliveryForm";
import { SessionObjectSchema } from "@schemas";
import { getSession } from "@session";

const DeliveryPage = async () => {
  const session = await getSession();

  const bidderData = SessionObjectSchema.parse(session?.bidderData);

  return (
    <div className="font-lato text-grafit">
      <BidderDeliveryForm bidderID={bidderData.id} />
    </div>
  );
};

export default DeliveryPage;
