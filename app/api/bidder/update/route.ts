import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

const URL = process.env.BIDDERS_TABLE_LINK_GR as string;

export async function PUT(req: NextRequest) {
  try {
    const { bidderID, formData } = await req.json();

    await axios.put(
      `${URL}/${bidderID}`,
      { fields: formData },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );
    return NextResponse.json("Bidder updated");
  } catch (error: any) {
    return NextResponse.json(
      { error: "Server error. Please try again later." },
      {
        status: 500,
      },
    );
  }
}
