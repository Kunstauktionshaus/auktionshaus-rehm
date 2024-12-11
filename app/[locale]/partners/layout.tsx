import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GR - Partners",
};

export default async function PartnersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full min-h-hw">{children}</div>;
}
