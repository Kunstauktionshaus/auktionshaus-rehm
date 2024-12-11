"use client";

import axios from "axios";
import { useSession } from "next-auth/react";

const RegisterForAuctionButton = () => {
  const { data: session, update } = useSession();

  const handleRegisterForAuction = async () => {
    try {
      const response = await axios.put("/api/customer/register-for-auction");

      if (response.status === 200) {
        await update({
          currentBidderNumber: response.data.currentBidderNumber,
          isRegisteredForAuction: response.data.isRegisteredForAuction,
          bidderNumbers: response.data.bidderNumbers,
        });

        console.log("Registration for auction was success");
      }
    } catch (error: any) {
      console.error("Error during registration for the auction:", error);
    }
  };
  return (
    <div>
      {session?.user.currentBidderNumber ? (
        <> Your bidder number: {session?.user.currentBidderNumber}</>
      ) : (
        <button
          onClick={handleRegisterForAuction}
          className="p-2 border-2 hover:border-honey hover:text-honey"
        >
          Register for auction
        </button>
      )}
    </div>
  );
};

export default RegisterForAuctionButton;
