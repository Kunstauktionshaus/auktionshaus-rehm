import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";
import { NinoxPrebidSchema, PrebidValues } from "@schemas/prebid-schema";

const URL = process.env.PREBIDDING_TABLE_LINK_GR as string;

export async function POST(req: NextRequest) {
  const data: PrebidValues = await req.json();
  const newPrebid = NinoxPrebidSchema.parse({
    A: data.auction,
    E: data.bidderNumber,
    D: data.catalogNumber,
    F: data.maxBid,
  });

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

    const res = await axios.post(`${URL}?style=ids`, [{ fields: newPrebid }], {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });
    if (res) {
      return NextResponse.json(
        { message: "Prebid added successfully" },
        { status: 200 },
      );
    } else {
      return NextResponse.json({ message: "Failed" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      },
    );
  }
}
