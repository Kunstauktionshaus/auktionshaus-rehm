import { SessionObjectSchema } from "@schemas";
import { getSession } from "@session";
import { redirect } from "next/navigation";

const BidderDashboard = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/bidder/verify");
  }

  const bidderData = SessionObjectSchema.parse(session?.bidderData);

  return (
    <div>
      <p>{bidderData.name}</p>
      <p>{bidderData.surname}</p>
      <p>{bidderData.email}</p>

      <p>Items:</p>
      {bidderData.objects.length > 0 ? (
        bidderData.objects.map((object: any, index: number) => (
          <div key={index}>
            <div className="flex gap-2 mb-2">
              <span className="">{object.catalogNumber}</span>
              <span className="">{object.header}</span>
              <span>€ {object.price}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No items found.</p>
      )}
    </div>
  );
};

export default BidderDashboard;
