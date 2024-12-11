import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import { NinoxEditUserAddressFormSchema } from "@schemas/edit-profile-schema";
import { getServerSession } from "next-auth";
import { authOptions } from "@lib/authOptions";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export async function PUT(req: NextRequest) {
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

    const customerId = session.user.id;
    const { formData } = await req.json();
    const [countryCode, countryName] = formData.mainAddress.country.split("-");
    const updatedData = NinoxEditUserAddressFormSchema.parse({
      W: formData.company.companyName,
      L: formData.company.iban,
      R: formData.mainAddress.address,
      W2: formData.mainAddress.address2,
      T: formData.mainAddress.plz,
      U: formData.mainAddress.city,
      C2: countryCode,
      B2: countryName,
      P: formData.phone,
    });

    const res = await axios.put(
      `${URL}/${customerId}`,
      { fields: updatedData },
      {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (res) {
      return NextResponse.json({ status: 200 });
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
