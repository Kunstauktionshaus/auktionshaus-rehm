import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { setHours } from "date-fns";

export const dynamic = "force-dynamic";

const TERMINS_URL = process.env.PLANNING_TABLE_LINK_GR as string;

export async function GET(req: NextRequest) {
  try {
    const response = await axios.get(`${TERMINS_URL}?style=ids`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    const filteredAuctions = data.map(
      (auction: { A: string; B: Date; C: Date; E: Date }) => {
        const startViewing = setHours(auction.E, 10);
        const startDate = setHours(auction.B, 16);
        const endDate = setHours(auction.C, 23);

        return {
          auctionNumber: auction.A,
          startDate: startDate,
          endDate: endDate,
          startViewing: startViewing,
        };
      },
    );

    return NextResponse.json(filteredAuctions);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error,
    });
  }
}
