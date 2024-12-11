import AccountNavComponent from "@components/layout/AccountNavigation";
import { authOptions } from "@lib/authOptions";
import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export const metadata: Metadata = {
  title: "GR - My Account",
};

export default async function AuctionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <>
      <div className="w-full min-h-hw">
        <div className="w-full h-full flex gap-4">
          <div className="hidden md:block">
            <AccountNavComponent />
          </div>

          <div className="w-full">{children}</div>
        </div>
      </div>
    </>
  );
}
