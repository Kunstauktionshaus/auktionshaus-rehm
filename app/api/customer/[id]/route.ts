import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const CUSTOMERS_URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

const URL = process.env.PREBIDDING_TABLE_LINK_GR as string;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const customerId = params.id;
    const response = await axios.get(`${URL}/${customerId}?style=ids`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
