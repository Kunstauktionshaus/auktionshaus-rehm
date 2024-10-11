import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { createSession } from "@session";
import {
  BidderFiltersSchema,
  BidderItem,
  BidderItemsArraySchema,
  BidderFiltersValues,
  ObjectsFiltersSchema,
  SessionObjectSchema,
  ObjectsFiltersValues,
} from "@schemas/zod";

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

      const filteredObjects = BidderItemsArraySchema.parse(
        (objects || []).map(
          (item: {
            _id: number;
            I: number;
            D: string;
            Y3: string;
            C3: number;
            E3: boolean;
          }) => ({
            id: item._id,
            catalogNumber: item.I,
            headerDE: item.D || "",
            headerEN: item.Y3,
            price: item.C3,
            canBeShipped: item.E3,
          }),
        ),
      );

      let shippingCase: number;

      if (bidder[0].P1) {
        shippingCase = 3;
      } else {
        const allShippable = filteredObjects?.every(
          (item: BidderItem) => item?.canBeShipped,
        );
        shippingCase = allShippable ? 1 : 2;
      }

      const objectToSave = SessionObjectSchema.parse({
        id: bidder[0]._id,
        method: bidder[0].N || 0,
        auctionNumber: bidder[0].A,
        bidderNumber: bidder[0].B,
        name: bidder[0].C,
        surname: bidder[0].D,
        notEU: bidder[0].P1,
        shippingCase: shippingCase,
        priceForShipping: bidder[0].O,
        provisionSt: bidder[0].X2,
        provisionPl: bidder[0].H3,
        isItemsPaid: bidder[0].B2,
        objects: filteredObjects,
      });

      await createSession(objectToSave);

      return NextResponse.json({ status: 200 });
    } else {
      return NextResponse.json({ status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error,
    });
  }
}

async function getBidder(filters: BidderFiltersValues) {
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

async function getObjects(objectsFilters: ObjectsFiltersValues) {
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
