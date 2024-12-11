import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export async function PUT(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        {
          status: 401,
        },
      );
    }

    const customerId = session.user.id;

    const res = await axios.put(
      `${URL}/${customerId}`,
      { fields: { A3: true } },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res) {
      const customer = await axios.get(`${URL}/${customerId}?style=ids`, {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      const registeredCustomerData = {
        currentBidderNumber: customer.data.Z2,
        isRegisteredForAuction: customer.data.A3,
        bidderNumbers: customer.data.X1,
      };

      return NextResponse.json(registeredCustomerData, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      {
        status: 500,
      },
    );
  }
}
