import { NextResponse } from "next/server";
import { getHashedVerifyToken } from "@utils/tokenHandler";
import axios from "axios";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export async function POST(request: Request) {
  try {
    const { token, email } = await request.json();
    const verifyToken = getHashedVerifyToken(token);
    const now = new Date(Date.now());

    const filters = {
      I: email,
    };

    const customerResponse = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify(filters),
      },
    });

    const customer = customerResponse.data[0];
    const storedToken = customer.J2;
    const tokenExpiry = new Date(customer.T2);

    console.log(tokenExpiry);
    console.log(now);

    if (storedToken === verifyToken && tokenExpiry > now) {
      await axios.put(
        `${URL}/${customer._id}`,
        { fields: { G2: true, T2: "", J2: "" } },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      return NextResponse.json({ verified: true }, { status: 200 });
    } else {
      return NextResponse.json({ verified: false }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" + error },
      { status: 500 },
    );
  }
}
