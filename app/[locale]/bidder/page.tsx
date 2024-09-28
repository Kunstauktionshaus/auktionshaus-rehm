import { getSession } from "@session";
import { redirect } from "next/navigation";

const BidderPage = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/bidder/verify");
  }

  redirect("/bidder/dashboard");
};

export default BidderPage;
