import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const sendEmail = async (
  userEmail: string,
  subject: string,
  message: string,
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.YOUR_SERVER_HOST,
      port: Number(process.env.YOUR_SERVER_PORT),
      secure: false,
      auth: {
        user: process.env.YOUR_SERVER_EMAIL,
        pass: process.env.YOUR_SERVER_PASS,
      },
    });

    const mailOptions = {
      from: process.env.YOUR_SERVER_EMAIL,
      to: userEmail,
      subject,
      html: message,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    return NextResponse.json(
      { message: "Etwas ist schief gelaufen: " + error },
      { status: 500 },
    );
  }
};
