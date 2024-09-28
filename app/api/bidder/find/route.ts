import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { createSession } from "@session";
import {
  BidderFiltersSchema,
  ObjectsFiltersSchema,
  SessionObjectSchema,
} from "@schemas";

const URL = process.env.BIDDERS_TABLE_LINK_GR as string;
const OBJECTS_URL = process.env.OBJECTS_TABLE_LINK_GR as string;

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const filters = BidderFiltersSchema.parse({
      A: searchParams.get("auction"),
      B: searchParams.get("bidder"),
      E: searchParams.get("email"),
    });

    const objectsFilters = ObjectsFiltersSchema.parse({
      U2: searchParams.get("bidder"),
      C1: searchParams.get("auction"),
    });

    const bidder = await getBidder(filters);

    if (bidder.length > 0) {
      const objects = await getObjects(objectsFilters);

      const filteredObjects = objects.map((item: any) => ({
        id: item._id,
        catalogNumber: item.I,
        header: item.D,
        price: item.C3,
      }));

      const objectToSave = SessionObjectSchema.parse({
        id: bidder[0]._id,
        auctionNumber: bidder[0].A,
        bidderNumber: bidder[0].B,
        name: bidder[0].C,
        surname: bidder[0].D,
        email: bidder[0].E,
        priceForShipping: bidder[0].O,
        provisionSt: bidder[0].X2,
        provisionPl: bidder[0].H3,
        isItemsPaid: bidder[0].B2,
        objects: filteredObjects,
      });

      await createSession(objectToSave);

      return NextResponse.json("Bidder found");
    } else {
      return NextResponse.json({ error: "Bidder not found" }, { status: 404 });
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

async function getBidder(filters: any) {
  const response = await axios.get(URL, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    params: {
      filters: JSON.stringify(filters),
    },
  });
  return response.data;
}

async function getObjects(objectsFilters: any) {
  const response = await axios.get(OBJECTS_URL, {
    headers: {
      Authorization: `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json",
    },
    params: {
      filters: JSON.stringify(objectsFilters),
    },
  });
  return response.data;
}
