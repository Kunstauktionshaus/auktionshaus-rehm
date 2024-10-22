import { NextResponse, NextRequest } from "next/server";
import axios from "axios";
import bcrypt from "bcrypt";

const URL = process.env.CUSTOMERS_TABLE_LINK_GR as string;

export async function POST(req: NextRequest) {
  const { email, code, password } = await req.json();
  const filters = {
    I: email,
  };
  try {
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`,
        "Content-Type": "application/json",
      },
      params: {
        filters: JSON.stringify(filters),
      },
    });

    if (!res.data[0]) {
      return NextResponse.json({ status: 404 });
    } else {
      const isCodeValid = res.data[0].F2 === code.trim();
      const id = res.data[0]._id;
      const hashedPassword = (await bcrypt.hash(password, 10)).toString();
      if (isCodeValid) {
        await axios.put(
          `${URL}/${id}`,
          { fields: { F2: "", E2: hashedPassword, G2: true } },
          {
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
          },
        );

        return NextResponse.json(res.data);
      } else {
        return NextResponse.json({ status: 403 });
      }
    }
  } catch (error: any) {
    return NextResponse.json({
      status: 500,
      error: error.message || "Internal Server Error",
    });
  }
}

// const transporter = nodemailer.createTransport({
//   host: "dedivirt896.your-server.de",
//   port: 587,
//   secure: false,
//   auth: {
//     user: "info@auktionshaus-rehm.de",
//     pass: "20-Hollaria+19",
//   },
// });

// const mailOptions = {
//   from: "info@auktionshaus-rehm.de",
//   to: "nazarenko.ylia@gmail.com",
//   subject: "Test",
//   text: "Test",
// };

// await transporter.sendMail(mailOptions);
