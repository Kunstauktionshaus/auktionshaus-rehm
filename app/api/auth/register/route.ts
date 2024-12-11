import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt";
import {
  NinoxRegisterFormSchema,
  RegisterFormValues,
} from "@schemas/register-schema";
import {
  getHashedVerifyToken,
  getToken,
  getVerifyTokenExpired,
} from "@utils/tokenHandler";
import { verificationEmailTemplate } from "@utils/verificationEmailTemplate";
import { sendEmail } from "@utils/sendEmail";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export async function POST(req: NextRequest) {
  const data: RegisterFormValues = await req.json();
  const filters = {
    I: data.email,
  };

  try {
    if (data.password !== data.confirmPassword) {
      return NextResponse.json({
        status: 400,
        error: "Passwords do not match",
      });
    }

    const existingCustomer = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify(filters),
      },
    });

    if (existingCustomer.data[0]) {
      return NextResponse.json(
        { message: "Customer with this email already exist. Please log in." },
        {
          status: 403,
        },
      );
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const verifyToken = getToken();
      const hashedVerifyToken = getHashedVerifyToken(verifyToken);
      const verifyTokenExpired = getVerifyTokenExpired().toISOString();

      const [countryCode, countryName] = data.country.split("-");

      const newCustomer = NinoxRegisterFormSchema.parse({
        D: data.name,
        E: data.surname,
        W: data.company,
        L: data.iban,
        R: data.address,
        W2: data.address2,
        T: data.plz,
        U: data.city,
        C2: countryCode,
        B2: countryName,
        P: data.phone,
        I: data.email,
        E2: hashedPassword,
        I2: data.privacyPolicy,
        H2: data.terms,
        G2: false,
        J2: hashedVerifyToken,
        T2: verifyTokenExpired,
      });
      const res = await axios.post(URL, [{ fields: newCustomer }], {
        headers: {
          Authorization: `Bearer ${process.env.API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      const message = verificationEmailTemplate(verifyToken, "de");
      const subject = "E-Mail-Bestätigung";
      await sendEmail(data.email, subject, message);
      if (res) {
        return NextResponse.json(
          { message: "User created successfully" },
          { status: 201 },
        );
      } else {
        return NextResponse.json({ message: "Failed" }, { status: 500 });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}
