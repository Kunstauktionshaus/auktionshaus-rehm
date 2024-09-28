import BidderVerifyForm from "@components/BidderLoginForm";
import { getSession } from "@session";
import { redirect } from "next/navigation";

const BidderVerifyPage = async () => {
  const session = await getSession();
  if (session) {
    redirect("/bidder/dashboard");
  }
  return <BidderVerifyForm />;
};

export default BidderVerifyPage;
