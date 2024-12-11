import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "GR - Team",
};

export default async function TeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="w-full min-h-hw">{children}</div>;
}
