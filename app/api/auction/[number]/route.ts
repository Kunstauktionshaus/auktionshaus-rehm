import { ObjectsArraySchema } from "@schemas/item";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const OBJECTS_URL = process.env.OBJECTS_TABLE_LINK_GR as string;

export async function GET(
  req: NextRequest,
  { params }: { params: { number: string } },
) {
  const auction = params.number;
  try {
    const response = await axios.get(OBJECTS_URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify({ C1: auction }),
        perPage: 2000,
        order: "Katalognummer",
      },
    });

    const data = response.data;

    const filteredObjects = ObjectsArraySchema.parse(
      (data || [])
        .filter((item: { I: number }) => item.I)
        .map(
          (item: {
            _id: number;
            I: number;
            E: number;
            Y3: string;
            D: string;
            H: string;
            T3: string;
            G: number;
            C3: number;
          }) => ({
            id: item._id,
            catalogNumber: item.I,
            category: item.E,
            headerDE: item.D || "",
            headerEN: item.Y3 || "",
            descriptionDE: item.H || "",
            descriptionEN: item.T3 || "",
            catalogPrice: item.G,
            soldPrice: item.C3,
            auction: auction,
          }),
        ),
    );

    return NextResponse.json(filteredObjects, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=30",
      },
    });
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error,
    });
  }
}
