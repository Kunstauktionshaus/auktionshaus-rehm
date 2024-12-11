import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const NINOX_URL = process.env.NINOX_BASE_LINK_GR as string;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { ids } = body;

  const ninoxQuery = `
  let ids := [${ids}];
  for id in ids do
  let bidders :=(select Bidders where Id = id)
  let objects := (select Objects
    where 'Bidder Number' = text(bidders.'Bidder Number') and
    text('zum Aufruf in Auktion') = text(bidders.'Auction Number'));
    let prebids := bidders.'Prebidding'

  {
    id : id
    auctionNumber : text(bidders.'Auction Number'),
    bidderNumber : text(bidders.'Bidder Number'),
    provisionSt : text(bidders.'Provision (standard)'),
    provisionPl : text(bidders.'Platform Provision'),
    deliveryMethod: text(bidders.'Delivery method'),
    shippingPrice: text(bidders.'Price for shipping'),
    trackingNumbers:{
      track1: text(bidders.'Tracking Number (Text)'),
      track2: text(bidders.'Tracking Number 2'),
      track3: text(bidders.'Tracking Number 3')
    },
    shippingCase: text(bidders.'Formula'),
    shippingStatus: text(bidders.'Shipping status'),
    isItemsPaid: bidders.'Items Paid',
    objects: for obj in objects do
    {
      id: replace(text(obj.Id), tableId("Objects"), ""),
      catalogNumber: obj.Katalognummer,
      soldPrice: obj.'Erlös',
      canBeShipped: obj.'can be shipped'
    }
  end
  prebids : for prebid in prebids do
  {
    id: replace(text(prebid.Id), tableId("Prebidding"), ""),
    catalogNumber: text(prebid.'Catalogue Number'),
    catalogPrice: prebid.'Catalogue Price',
    maxBid: prebid.'Maximum Bid',
    objectId: text(prebid.'Objects')

  }
  end

  }
  end
`;
  try {
    const response = await axios.get(`${NINOX_URL}/query?style=ids`, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },

      params: {
        query: ninoxQuery,
      },
    });

    const data = response.data;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 500,
        error: error.response?.data || error.message,
      },
      { status: 500 },
    );
  }
}
