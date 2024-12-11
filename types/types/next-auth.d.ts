import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      currentBidderNumber: number;
      isRegisteredForAuction: boolean;
      bidderNumbers: number[];
      phone: string;
      consignerNr: number;
      consignerObjects: number[];
      company: { companyName: string; iban: string };
      mainAddress: {
        address: string;
        address2: string;
        plz: string;
        city: string;
        country: string;
      };
    } & DefaultSession["user"];
  }
}

declare module "next-auth" {
  interface User {
    id: number;
    surname: string;
    currentBidderNumber: number;
    isRegisteredForAuction: boolean;
    bidderNumbers: number[];
    phone: string;
    consignerNr: number;
    consignerObjects: number[];
    company: { companyName: string; iban: string };
    mainAddress: {
      address: string;
      address2: string;
      plz: string;
      city: string;
      country: string;
    };
  }
}
