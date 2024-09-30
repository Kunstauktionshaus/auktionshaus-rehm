import { getSession } from "@session";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bidder",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect("/bidder/verify");
  }

  return (
    <div className="w-full min-h-hw mt-10">
      <main className="w-full max-w-screen-xl mx-auto h-full p-4">
        {children}
      </main>
    </div>
  );
}
