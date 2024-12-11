import { Metadata } from "next";
import React from "react";
import AuctionsWrapper from "../../../components/AuctionsWrapper";

export const metadata: Metadata = {
  title: "Auctions",
};

export default async function AuctionsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full min-h-hw">
      <AuctionsWrapper>{children}</AuctionsWrapper>
    </div>
  );
}
