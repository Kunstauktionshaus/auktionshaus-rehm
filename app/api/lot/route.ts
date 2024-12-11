import { ObjectSchema } from "@schemas/item";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const OBJECTS_URL = process.env.OBJECTS_TABLE_LINK_GR as string;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const lotId = searchParams.get("lotId");

    if (!lotId) {
      return NextResponse.json({ status: 400, error: "lotId is required" });
    }

    const response = await axios.get(`${OBJECTS_URL}/${lotId}?style=ids`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    const data = response.data;
    const filteredObjects = ObjectSchema.parse({
      id: data._id,
      catalogNumber: data.I || 0,
      headerDE: data.D || "",
      headerEN: data.Y3 || "",
      descriptionDE: data.H || "",
      descriptionEN: data.T3 || "",
      catalogPrice: data.G || 0,
      soldPrice: data.C3,
      auction: data.C1,
    });
    return NextResponse.json(filteredObjects);
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message,
    });
  }
}
