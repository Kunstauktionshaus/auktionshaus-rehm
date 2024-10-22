import type { Metadata } from "next";
import "@styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Header from "@components/Header";
import Footer from "@components/Footer";
import SessionWrapper from "@components/SessionWrapper";

export const metadata: Metadata = {
  title: "Auktionhaus GR",
  description: "",
  alternates: {
    canonical: "/",
    media: {
      "only screen and (max-width: 600px)": "https://nextjs.org/mobile",
    },
    types: {
      "application/rss+xml": "https://nextjs.org/rss",
    },
  },
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <SessionWrapper>
      <html lang={locale} className="h-full">
        <body className="h-full">
          <NextIntlClientProvider messages={messages}>
            <div className="flex flex-col min-h-screen max-w-full mx-auto">
              <Header />
              <div className="flex flex-grow  justify-center w-full m-auto bg-white">
                {children}
              </div>
              <Footer />
            </div>
          </NextIntlClientProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
