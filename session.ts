import { SessionObjectValues } from "@schemas/zod";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const secretKey = process.env.SESSION_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function createSession(bidderData: SessionObjectValues) {
  const expires = new Date(Date.now() + 24 * 60 * 60 * 100);
  const session = await encrypt({ bidderData, expires });

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
}

export async function getSession() {
  const sessionCookie = cookies().get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const session = await decrypt(sessionCookie);
    return session;
  } catch (error) {
    return null;
  }
}

export async function updateSession(newMethod: number) {
  const currentSession = await getSession();
  if (!currentSession) {
    return NextResponse.json({ status: 404, message: "Session not found" });
  }

  const updatedSession = {
    ...currentSession.bidderData,
    method: newMethod,
  };

  await createSession(updatedSession);

  return NextResponse.json({ status: 200, message: "Session updated" });
}
